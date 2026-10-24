// Consulta pela coluna e pelo link: o app não toca, não anda, não grava e devolve o percurso.
import assert from 'node:assert/strict'
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'

const app = resolve(import.meta.dirname, '..')
globalThis.window = {}
createRequire(import.meta.url)(resolve(app, '../../04-dados/mocks.js'))
const M = window.M2CF_MOCKS
const indice = JSON.parse(readFileSync(resolve(app, '../../02-telas/indice.json')))
const consultas = indice.itens.filter((r) => r.consulta)
const [porta, caminho] = readFileSync(resolve(app, 'prints/tmp/fotografo-perfil-2/DevToolsActivePort'), 'utf8').trim().split('\n')
const ws = new WebSocket(`ws://127.0.0.1:${porta}${caminho}`)
await new Promise((ok, falha) => { ws.addEventListener('open', ok, { once: true }); ws.addEventListener('error', falha, { once: true }) })
let id = 0
const pendentes = new Map()
ws.addEventListener('message', ({ data }) => {
  const r = JSON.parse(data), p = pendentes.get(r.id)
  if (!p) return
  pendentes.delete(r.id)
  r.error ? p.reject(new Error(JSON.stringify(r.error))) : p.resolve(r.result)
})
const cdp = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
  const n = ++id; pendentes.set(n, { resolve, reject })
  ws.send(JSON.stringify({ id: n, method, params, ...(sessionId ? { sessionId } : {}) }))
})
const dorme = (ms) => new Promise((ok) => setTimeout(ok, ms))
const { targetId } = await cdp('Target.createTarget', { url: 'about:blank', newWindow: true })
const { sessionId: s } = await cdp('Target.attachToTarget', { targetId, flatten: true })
const na = async (expression) => {
  const r = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, s)
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails))
  return r.result.value
}
const abrir = async (q) => {
  await cdp('Page.navigate', { url: `http://localhost:5173/${q}` }, s)
  for (let n = 0; n < 100; n++) {
    if (await na("document.readyState === 'complete' && !!document.querySelector('.coluna')")) break
    await dorme(50)
  }
  await na('document.fonts.ready.then(() => true)'); await dorme(450)
}
// O estado único no provider, para provar que uma consulta não grava no percurso guardado.
const estado = () => na(`(() => {
  const el = document.getElementById('raiz'); const k = Object.keys(el).find(k => k.startsWith('__reactContainer'));
  const pilha = [el[k].stateNode.current];
  while (pilha.length) { const f = pilha.pop(); if (!f) continue;
    if (f.memoizedProps?.value?.estado) { const e = f.memoizedProps.value.estado; const { geracao, antes, ...resto } = e; return resto; }
    pilha.push(f.child, f.sibling);
  }
  throw new Error('provider não encontrado');
})()`)
const quadro = () => na(`(() => {
  const raiz = document.querySelector('.celular-tela');
  return { texto: raiz.innerText.replace(/\\s+/g, ' '), url: location.search, inerte: raiz.hasAttribute('inert'), selecionado: document.querySelector('.coluna-linha-aberta')?.innerText ?? null };
})()`)
const tocar = async (label) => {
  const p = await na(`(() => { const e = [...document.querySelectorAll('button')].find(e => !e.closest('.celular-tela') && (e.innerText.trim() === ${JSON.stringify(label)} || e.getAttribute('aria-label') === ${JSON.stringify(label)} || e.querySelector('.painel-codigo')?.textContent === ${JSON.stringify(label)})); if (!e) throw new Error('botão do palco ausente: ' + ${JSON.stringify(label)}); const r = e.getBoundingClientRect(); return { x: r.x + r.width/2, y: r.y+r.height/2 }; })()`)
  await cdp('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...p }, s)
  await cdp('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...p }, s)
  await dorme(450)
}
const bloquear = async () => {
  const antes = await estado(), q = await quadro()
  assert.equal(q.inerte, true)
  const p = await na("(() => { const r=document.querySelector('.celular').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}; })()")
  await cdp('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...p }, s)
  await cdp('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...p }, s)
  await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }, s)
  await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }, s)
  await dorme(2200)
  assert.deepEqual(await estado(), antes, 'consulta gravou ou navegou')
  assert.deepEqual(await quadro(), q, 'consulta mudou com toque, Esc ou tempo')
}
const resultados = []
const saida = resolve(app, 'prints/consultas-paradas')   // as fotos são prova local, fora do repositório
mkdirSync(saida, { recursive: true })
const fotografar = async (nome) => {
  const { data } = await cdp('Page.captureScreenshot', { format: 'png' }, s)
  writeFileSync(resolve(saida, `${nome}.png`), Buffer.from(data, 'base64'))
}
const tocarApp = async (nome) => {
  const p = await na(`(() => { const e = [...document.querySelectorAll('.celular-tela button')].find(e => !e.disabled && !e.closest('[inert]') && (e.innerText.trim().startsWith(${JSON.stringify(nome)}) || e.getAttribute('aria-label') === ${JSON.stringify(nome)})); if (!e) throw new Error('ação ausente: ' + ${JSON.stringify(nome)}); const r=e.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`)
  for (const type of ['mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, button: 'left', clickCount: 1, ...p }, s)
  await dorme(500)
}
try {
  await cdp('Page.enable', {}, s)
  await cdp('Emulation.setFocusEmulationEnabled', { enabled: true }, s)
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }, s)
  for (const r of consultas) {
    await abrir(`?tela=${r.tela}&estado=${r.nome}`)
    const q = await quadro()
    assert.equal(new URLSearchParams(q.url).get('estado'), r.nome)
    assert.ok(q.texto.trim().length)
    assert.equal(await na(`document.querySelector('.coluna-linha-aberta')?.textContent.trim()`), r.rotulo)
    await bloquear()
    if (['T11/00-tela', 'T09/08-momento-manutencao-escolher-o-bloco', 'T10/00-tela', 'T13/29-momento-relendo-o-modulo'].includes(r.id)) await fotografar(r.tela)
    // nenhum nome cortado na largura, e a linha aberta inteira na vista — a coluna mais alta que o celular (a T09) rola,
    // e a linha aberta vem pra vista (Coluna.jsx)
    const medidas = await na(`(() => { const coluna=document.querySelector('.coluna'); const c=coluna.getBoundingClientRect(); return [...coluna.querySelectorAll('.coluna-nome')].map(e => { const r=e.getBoundingClientRect(); const aberta=!!e.closest('.coluna-linha-aberta'); return {nome:e.textContent, cabe:r.right<=c.right+1 && (!aberta || (r.top>=c.top-1 && r.bottom<=c.bottom+1)), altura:r.height}; }); })()`)
    assert.ok(medidas.every((m) => m.cabe), 'consulta cortada na coluna')
    if (r.tipo === 'momento') {
      await abrir(`?tela=${r.tela}&momento=${r.nome}`)
      const link = await quadro()
      assert.equal(new URLSearchParams(link.url).get('estado'), r.nome)
      assert.equal(link.texto, q.texto)
    }
    resultados.push({ id: r.id, consulta: 'parada · toque/Esc/tempo bloqueados · link igual' })
    console.log('OK', r.id)
  }
  // Mesmo com a cadeia inteira concluída, a consulta continua divergente e preserva o avanço.
  await abrir('?tela=T09')
  await tocarApp('Gravar no módulo')
  for (let n = 0; n < 100 && (await estado()).etapas.cadeia?.confirmados < M.cadeia.ordem.length; n++) await dorme(200)
  for (let n = 0; n < 100 && (await estado()).tela.momento !== '04-momento-cadeia-concluida'; n++) await dorme(200)
  assert.equal((await estado()).etapas.cadeia.confirmados, M.cadeia.ordem.length)
  // a cadeia concluída segue pro Ler a CAN; o menu fica no voltar do Android (decisão 64)
  await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }, s)
  await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }, s)
  await dorme(500)
  await tocarApp('Entendi'); await tocarApp('Conferir configuração'); await dorme(1800)
  const concluido = await estado()
  await tocar('Não bate com o cadastro')
  assert.match((await quadro()).texto, /M2C-0438/); assert.match((await quadro()).texto, /4 de 5/)   // a T11 tem cinco blocos (com o Ativo)
  await tocar('Voltar ao fluxo'); await dorme(1800)
  assert.deepEqual(await estado(), concluido)
  resultados.push({ cadeiaConcluida: 'consulta mantém 4 divergências e devolve os blocos concluídos' })
  console.log('OK consulta depois da cadeia concluída')
  // Uma sessão normal guardada sobrevive à troca entre todos os exemplos da própria tela
  // (a T02 não tem mais consultas paradas: as duas referências dela são a tela e um momento, decisão 56).
  for (const tela of ['T09', 'T10', 'T11', 'T13']) {
    await abrir(`?tela=${tela}`)
    await dorme(tela === 'T11' ? 1800 : 400)
    const antes = await estado()
    if (tela === 'T10') assert.match((await quadro()).texto, /Nada a calibrar neste ativo/)
    if (tela === 'T11') assert.match((await quadro()).texto, /CONFERE COM O CADASTRO/)
    for (const r of consultas.filter((r) => r.tela === tela)) await tocar(r.rotulo)
    await tocar('Voltar ao fluxo')
    await dorme(tela === 'T11' ? 1800 : 400)
    assert.deepEqual(await estado(), antes, `retorno de ${tela} alterou sessão/etapas/casos/URL`)
    assert.equal((await quadro()).inerte, false)
    resultados.push({ tela, retorno: 'mesma sessão · mesmas etapas · mesmos casos · mesmo endereço' })
    console.log('OK retorno', tela)
  }
  // O painel segue as mesmas entradas normais; escolher uma tela não abre um exemplo especial.
  await abrir('?tela=T04'); await tocar('Telas do protótipo')
  for (const [tela, texto] of [['T02', 'Pra qual empresa hoje'], ['T10', 'Nada a calibrar neste ativo'], ['T11', 'CONFERE COM O CADASTRO']]) {
    await tocar(tela); await dorme(tela === 'T11' ? 1800 : 400)
    assert.match((await quadro()).texto, new RegExp(texto)); assert.equal((await quadro()).inerte, false)
    resultados.push({ tela, painel: 'entrada normal interativa' }); console.log('OK painel', tela)
  }
  writeFileSync(resolve(saida, 'verificacao.json'), JSON.stringify(resultados, null, 2) + '\n')
  console.log(`CONSULTAS APROVADAS · ${consultas.length} quadros, 4 retornos, 3 entradas`)
} finally { await cdp('Target.closeTarget', { targetId }); ws.close() }
