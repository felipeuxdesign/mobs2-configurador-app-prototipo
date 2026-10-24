// O fotógrafo: UM Chrome headless, aberto uma vez, com várias abas em paralelo.
// Nesta máquina, várias instâncias do Chrome ao mesmo tempo travam;
// abrir uma instância por foto deixa tudo em fila e gasta 2–3 s só pra abrir.
// Com um Chrome só e um conjunto de abas, as fotos saem em paralelo e rápidas.
// As réguas (print, especime, tela, textos) usam o fotógrafo quando ele está
// no ar (scripts/cromo.mjs) e caem no Chrome de linha de comando quando não.
//
// Uso: node scripts/fotografo.mjs            (escala 2, as telas; fica no ar; ABAS=4 por padrão)
//      ESCALA=1 node scripts/fotografo.mjs   (escala 1, as folhas e a vitrine)
// A escala é a do Chrome (--force-device-scale-factor), como no CLI: a emulada
// rasteriza SVG e texto um pouco diferente na escala 2 (medido: 336 px na T01).
// HTTP em 127.0.0.1:5190 (escala 2) ou 5191 (escala 1):
//   GET  /saude                               → { ok, abas, fila }
//   POST /foto { url, w, h, escala, saida, pre? } → grava o PNG em `saida`; devolve { ok, pre? }
//   POST /dom  { url, w, h }                  → { ok, html } (o DOM depois de pronto, como o --dump-dom)
// "Pronto" = o load, as fontes carregadas e um respiro de ESPERA ms.
// Com `pre: true`, espera também o <pre id="m2cf-out"> que as páginas de medida escrevem.
import { spawn } from 'node:child_process'
import http from 'node:http'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PERFIL = resolve(app, 'prints/tmp/fotografo-perfil-' + (process.env.ESCALA || 2))
const ESCALA = Number(process.env.ESCALA || 2)
const PORTA = Number(process.env.PORTA_FOTOGRAFO || (ESCALA === 1 ? 5191 : 5190))
const ABAS = Number(process.env.ABAS || 4)
const ESPERA = Number(process.env.ESPERA || 500)
const LIMITE = Number(process.env.LIMITE || 45000)

rmSync(PERFIL, { recursive: true, force: true }); mkdirSync(PERFIL, { recursive: true })
const cromo = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--no-first-run',
  '--no-default-browser-check', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows',
  '--force-device-scale-factor=' + ESCALA, '--remote-debugging-port=0', '--user-data-dir=' + PERFIL, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] })
const endpoint = await new Promise((ok, falha) => {
  let buf = ''; const t = setTimeout(() => falha(new Error('o Chrome não abriu')), 20000)
  cromo.stderr.on('data', (d) => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); ok(m[1]) } })
  cromo.on('exit', (c) => falha(new Error('o Chrome saiu: ' + c)))
})
const encerrar = () => { try { cromo.kill() } catch {} ; process.exit(0) }
process.on('SIGINT', encerrar); process.on('SIGTERM', encerrar)
cromo.on('exit', () => process.exit(1))

// o protocolo do DevTools, direto pelo WebSocket do Node
const ws = new WebSocket(endpoint)
await new Promise((ok) => ws.addEventListener('open', ok, { once: true }))
let seq = 0; const pendentes = new Map(); const ouvintes = new Set()
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data)
  if (m.id && pendentes.has(m.id)) { const p = pendentes.get(m.id); pendentes.delete(m.id); m.error ? p.falha(new Error(m.error.message)) : p.ok(m.result) }
  else if (m.method) for (const f of ouvintes) f(m)
})
const cdp = (method, params = {}, sessionId) => new Promise((ok, falha) => { const id = ++seq; pendentes.set(id, { ok, falha }); ws.send(JSON.stringify({ id, method, params, sessionId })) })
const evento = (sessionId, method, ms) => new Promise((ok, falha) => {
  const f = (m) => { if (m.sessionId === sessionId && m.method === method) { ouvintes.delete(f); clearTimeout(t); ok(m.params) } }
  const t = setTimeout(() => { ouvintes.delete(f); falha(new Error('sem ' + method)) }, ms); ouvintes.add(f)
})

async function novaAba() {
  // cada aba numa janela própria e com o foco emulado: sem isso o Chrome trata
  // as abas de trás como escondidas e para de desenhar (a foto não sai)
  const { targetId } = await cdp('Target.createTarget', { url: 'about:blank', newWindow: true })
  const { sessionId } = await cdp('Target.attachToTarget', { targetId, flatten: true })
  await cdp('Page.enable', {}, sessionId); await cdp('Runtime.enable', {}, sessionId)
  await cdp('Emulation.setFocusEmulationEnabled', { enabled: true }, sessionId)
  return { targetId, sessionId }
}
const livres = []; for (let i = 0; i < ABAS; i++) livres.push(await novaAba())
const fila = []
const comAba = (fn) => new Promise((ok, falha) => { fila.push({ fn, ok, falha }); gira() })
function gira() {
  while (livres.length && fila.length) {
    const aba = livres.shift(); const { fn, ok, falha } = fila.shift(); let feito = false
    // a aba que estoura o tempo pode ter ficado presa: fecha e põe uma nova no lugar
    const t = setTimeout(async () => {
      if (feito) return; feito = true; falha(new Error('tempo esgotado'))
      try { await cdp('Target.closeTarget', { targetId: aba.targetId }) } catch {}
      livres.push(await novaAba()); gira()
    }, LIMITE)
    fn(aba).then(ok, falha).finally(async () => {
      if (feito) return; feito = true; clearTimeout(t)
      try { await cdp('Page.navigate', { url: 'about:blank' }, aba.sessionId); livres.push(aba) } catch { livres.push(await novaAba()) }
      gira()
    })
  }
}

const avalia = async (s, expression) => (await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, s)).result.value
async function abre({ sessionId: s }, { url, w, h, escala = ESCALA, pre }) {
  if (escala !== ESCALA) throw new Error(`este fotógrafo é de escala ${ESCALA}; pediram ${escala}`)
  // deviceScaleFactor 0 = não emular a escala: vale a do Chrome, como no --force-device-scale-factor do CLI
  await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 0, mobile: false }, s)
  const carregou = evento(s, 'Page.loadEventFired', LIMITE)
  await cdp('Page.navigate', { url }, s); await carregou
  await avalia(s, `document.fonts.ready.then(() => new Promise(r => setTimeout(r, ${ESPERA})))`)
  if (pre) await avalia(s, `new Promise((r, f) => { const t0 = performance.now(); (function v() { const e = document.getElementById('m2cf-out'); if (e) r(true); else if (performance.now() - t0 > 8000) f('sem pre'); else setTimeout(v, 50) })() })`)
}

async function foto(corpo) {
  return comAba(async (aba) => {
    await abre(aba, corpo)
    if (process.env.VISIVEL === '1') console.log('visibilidade', await avalia(aba.sessionId, 'document.visibilityState'))
    const { data } = await cdp('Page.captureScreenshot', { format: 'png' }, aba.sessionId)
    mkdirSync(dirname(corpo.saida), { recursive: true }); writeFileSync(corpo.saida, Buffer.from(data, 'base64'))
    const pre = corpo.pre ? await avalia(aba.sessionId, `document.getElementById('m2cf-out')?.textContent ?? null`) : undefined
    return { ok: true, pre }
  })
}
async function dom(corpo) {
  return comAba(async (aba) => { await abre(aba, corpo); return { ok: true, html: await avalia(aba.sessionId, 'document.documentElement.outerHTML') } })
}

http.createServer((req, res) => {
  const responde = (c, o) => { res.writeHead(c, { 'content-type': 'application/json' }); res.end(JSON.stringify(o)) }
  if (req.method === 'GET' && req.url === '/saude') return responde(200, { ok: true, escala: ESCALA, abas: ABAS, livres: livres.length, fila: fila.length })
  let b = ''; req.on('data', (d) => { b += d }); req.on('end', async () => {
    try {
      const corpo = JSON.parse(b || '{}')
      if (req.url === '/foto') return responde(200, await foto(corpo))
      if (req.url === '/dom') return responde(200, await dom(corpo))
      responde(404, { ok: false, erro: 'rota' })
    } catch (e) { responde(500, { ok: false, erro: String(e.message ?? e) }) }
  })
}).listen(PORTA, '127.0.0.1', () => console.log(`fotógrafo no ar em 127.0.0.1:${PORTA} · escala ${ESCALA} · ${ABAS} abas`))
