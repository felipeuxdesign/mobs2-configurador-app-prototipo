// A bancada dos espécimes: compara um espécime da vitrine com o espécime da folha,
// os dois renderizados no MESMO Chrome headless, a 1× (as folhas são 1×).
// Assim a diferença de fonte entre geradores some, e o que sobra é desenho.
//
// Uso (com o `npm run dev` rodando em :5173):
//   node scripts/especime.mjs compara <folha 1..8> "<rótulo na folha>" <id na vitrine>
//   node scripts/especime.mjs todos            → compara todos os espécimes registrados
// Saída: prints/especimes/<id>-folha.png, -vitrine.png, -diff.png e uma linha de resultado
// (no `todos`, também prints/especimes/relatorio.json).
//
// O pixel inteiro: na folha, a moldura do espécime cai em y (às vezes x)
// fracionário — 248,5 · 1581,53 · 2268,70 —, e na vitrine ela fica em (0,0). O Chrome
// arredonda borda, texto e SVG a partir da posição absoluta, então o mesmo desenho sai
// meio pixel diferente e a bancada acusava até 2% sem diferença nenhuma. Agora, antes
// da foto, cada moldura é levada ao pixel inteiro mais perto por position: relative com
// left/top iguais à fração (não mexe no fluxo nem nas vizinhas), e o recorte cai exato.
// A medida da vitrine sai depois das fontes (Vitrine.jsx), nunca com a fonte reserva.
//
// A velocidade: no `todos`, cada folha é medida e fotografada UMA vez pra todos os
// espécimes dela, e a vitrine também (o lote, ?especimes=a,b,c, as molduras uma
// embaixo da outra em x = 0): 4 chamadas ao Chrome por folha, no lugar de 4 por
// espécime — os 121 em 35 s a 2 min, contra uns 12 min. O `compara` segue um
// por um. Medido nos 121: o lote dá o mesmo número que o espécime sozinho em todos
// (0 pixel acima do limiar entre os dois; o que muda é ruído de 1–2 níveis no
// antialias). Se o lote falhar, a vitrine cai pro um por um.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { fotografoNoAr, foto, dom } from './cromo.mjs'

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
const TMP = resolve(app, 'prints/tmp'); const OUT = resolve(app, 'prints/especimes')
mkdirSync(TMP, { recursive: true }); mkdirSync(OUT, { recursive: true })
const DEV = process.env.DEV || 'http://localhost:5173'

// O Chrome headless não aguenta instâncias paralelas nesta máquina (trava):
// uma trava de pasta faz as fotos rodarem uma de cada vez, mesmo com vários
// processos (vários agentes) chamando a bancada ao mesmo tempo.
const TRAVA = resolve(TMP, 'chrome.trava')
const dorme = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
function comTrava(fn) {
  for (let i = 0; ; i++) {
    try { mkdirSync(TRAVA); break } catch {
      try { if (Date.now() - statSync(TRAVA).mtimeMs > 120000) rmSync(TRAVA, { recursive: true, force: true }) } catch {}
      dorme(200)
    }
  }
  try { return fn() } finally { rmSync(TRAVA, { recursive: true, force: true }) }
}
// Com o fotógrafo de escala 1 no ar (ESCALA=1 node scripts/fotografo.mjs), a
// foto e o DOM saem por ele, em paralelo e sem a trava; sem ele, pelo Chrome
// de linha de comando abaixo. Medido: as duas vias dão o mesmo PNG, pixel a pixel.
function chrome(args) {
  if (fotografoNoAr(1)) {
    const url = args[args.length - 1]
    const [w, h] = args.find((a) => a.startsWith('--window-size=')).slice(14).split(',').map(Number)
    const shot = args.find((a) => a.startsWith('--screenshot='))
    if (shot) { foto(url, shot.slice(13), { w, h, escala: 1 }); return '' }
    return dom(url, { w, h, pre: true })
  }
  return chromeCli(args)
}
// o Chrome travado não morre com SIGTERM: no tempo esgotado vai SIGKILL, e mais duas tentativas
function chromeCli(args) {
  for (let i = 0; ; i++) {
    try {
      return comTrava(() => execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--virtual-time-budget=4000', ...args],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024, timeout: 90000, killSignal: 'SIGKILL' }))
    } catch (e) { if (i >= 2) throw e; dorme(1000) }
  }
}
function lerPre(dom) { const m = dom.match(/<pre id="m2cf-out"[^>]*>([\s\S]*?)<\/pre>/); if (!m) throw new Error('sem medida'); return JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')) }
function recorta(png, r) {
  const x = Math.round(r.x), y = Math.round(r.y), w = Math.round(r.w), h = Math.round(r.h)
  const out = new PNG({ width: w, height: h })
  PNG.bitblt(png, out, x, y, Math.min(w, png.width - x), Math.min(h, png.height - y), 0, 0)
  return out
}
const limpa = (...arqs) => { for (const a of arqs) rmSync(a, { force: true }) }

const arquivoDaFolha = (n) => readdirSync(resolve(raiz, '03-design-system/referencias/html')).find((f) => f.startsWith(`folha-${n}-`))

// O script que vai no fim da folha: espera o load e as fontes, acha a moldura de cada
// rótulo (o <span> de 1,4px de letra seguido da caixa tracejada), leva cada uma ao pixel
// inteiro e escreve a medida. Roda igual na chamada que mede e na que fotografa.
const scriptDaFolha = (rotulos) => `<script>(()=>{const alvos=${JSON.stringify(rotulos)};
  new Promise(ok=>document.readyState==='complete'?ok():addEventListener('load',ok,{once:true}))
  .then(()=>{void document.body.offsetHeight;return document.fonts.ready}).then(()=>{
    const spans=[...document.querySelectorAll('span')];
    const acha=(a)=>{const s=spans.find(e=>e.textContent.trim()===a&&getComputedStyle(e).letterSpacing==='1.4px'&&e.nextElementSibling&&/dashed/.test(e.nextElementSibling.style.border));return s?s.nextElementSibling:null};
    const molduras=alvos.map(acha), feitas=new Map();
    const res=molduras.map((m)=>{
      if(!m)return{erro:'rótulo não achado'};
      if(!feitas.has(m)){
        const r=m.getBoundingClientRect(),x=r.x+scrollX,y=r.y+scrollY,dx=Math.round(x)-x,dy=Math.round(y)-y;
        // só a moldura estática: um filho absoluto preso a um ancestral de fora mudaria de lugar
        const presa=[...m.querySelectorAll('*')].some(d=>{const p=getComputedStyle(d).position;return (p==='absolute'||p==='fixed')&&d.offsetParent&&!m.contains(d.offsetParent)&&d.offsetParent!==m});
        const pode=getComputedStyle(m).position==='static'&&!presa;
        if(pode&&(dx||dy)){m.style.position='relative';m.style.left=dx+'px';m.style.top=dy+'px'}
        feitas.set(m,{fx:x-Math.floor(x),fy:y-Math.floor(y),inteira:pode||(!dx&&!dy)});
      }
      const s=m.getBoundingClientRect();return{x:s.x+scrollX,y:s.y+scrollY,w:s.width,h:s.height,...feitas.get(m)}});
    const o=document.createElement('pre');o.id='m2cf-out';o.style.display='none';
    o.textContent=JSON.stringify({H:document.documentElement.scrollHeight,r:res});document.body.appendChild(o)})})()</script>`

// mede e fotografa uma folha pra vários rótulos de uma vez: devolve um PNG (ou erro) por rótulo
function especimesDaFolha(n, rotulos) {
  const arq = arquivoDaFolha(n)
  if (!arq) throw new Error(`folha ${n}: arquivo não achado`)
  let html = readFileSync(resolve(raiz, '03-design-system/referencias/html', arq), 'utf8')
  html = html.replace(/\.\.\/\.\.\/\.\.\/05-recursos\//g, 'file://' + raiz + '/05-recursos/')
  const tmp = resolve(TMP, `folha-${n}-${process.pid}.html`), shot = resolve(TMP, `folha-${n}-${process.pid}.png`)
  writeFileSync(tmp, html.replace('</body>', scriptDaFolha(rotulos) + '</body>'))
  try {
    const m = lerPre(chrome(['--window-size=1440,900', '--dump-dom', 'file://' + tmp]))
    chrome([`--window-size=1440,${Math.ceil(m.H)}`, '--screenshot=' + shot, 'file://' + tmp])
    const png = PNG.sync.read(readFileSync(shot))
    return m.r.map((r, i) => (r.erro ? { erro: `folha ${n}: ${r.erro} — "${rotulos[i]}"` } : { png: recorta(png, r), r }))
  } finally { limpa(tmp, shot) }
}

export function especimeDaFolha(n, rotulo, id) {
  const [e] = especimesDaFolha(n, [rotulo])
  if (e.erro) throw new Error(e.erro)
  writeFileSync(resolve(OUT, `${id}-folha.png`), PNG.sync.write(e.png))
  return e.png
}

export function especimeDaVitrine(id) {
  const url = `${DEV}/?vitrine=1&especime=${encodeURIComponent(id)}&medir=1`
  const r = lerPre(chrome(['--window-size=360,1200', '--dump-dom', url]))
  if (r.erro) throw new Error(`vitrine: ${r.erro} — ${id}`)
  const shot = resolve(TMP, `vitrine-${id}-${process.pid}.png`)
  try {
    chrome([`--window-size=${Math.ceil(r.w)},${Math.ceil(r.h) + 2}`, '--screenshot=' + shot, url])
    const png = recorta(PNG.sync.read(readFileSync(shot)), { x: 0, y: 0, w: r.w, h: r.h })
    writeFileSync(resolve(OUT, `${id}-vitrine.png`), PNG.sync.write(png))
    return png
  } finally { limpa(shot) }
}

// o lote da vitrine: vários espécimes numa página, cada moldura no pixel inteiro
function especimesDaVitrine(ids) {
  const url = `${DEV}/?vitrine=1&especimes=${ids.map(encodeURIComponent).join(',')}&medir=1`
  const m = lerPre(chrome(['--window-size=1440,900', '--dump-dom', url]))
  const shot = resolve(TMP, `vitrine-lote-${process.pid}.png`)
  try {
    const fundo = Math.max(...m.r.filter((r) => !r.erro).map((r) => r.y + r.h), 1)
    chrome([`--window-size=${Math.max(1440, Math.ceil(m.W))},${Math.ceil(fundo) + 2}`, '--screenshot=' + shot, url])
    const png = PNG.sync.read(readFileSync(shot))
    return m.r.map((r) => (r.erro ? { erro: `vitrine: ${r.erro} — ${r.id}` } : { png: recorta(png, r) }))
  } finally { limpa(shot) }
}

function diferenca(n, rotulo, id, a, b) {
  const w = Math.min(a.width, b.width), h = Math.min(a.height, b.height)
  const A = recorta(a, { x: 0, y: 0, w, h }), B = recorta(b, { x: 0, y: 0, w, h })
  const diff = new PNG({ width: w, height: h })
  const fino = pixelmatch(A.data, B.data, diff.data, w, h, { threshold: 0.1 })
  writeFileSync(resolve(OUT, `${id}-diff.png`), PNG.sync.write(diff))
  const pct = (100 * fino / (w * h)).toFixed(2)
  const tam = a.width === b.width && a.height === b.height ? 'mesmo tamanho' : `folha ${a.width}×${a.height} · vitrine ${b.width}×${b.height}`
  return { id, folha: n, rotulo, diferenca: +pct, tam }
}

export function compara(n, rotulo, id) {
  const a = especimeDaFolha(n, rotulo, id), b = especimeDaVitrine(id)
  return diferenca(n, rotulo, id, a, b)
}

// todos, folha a folha: a folha uma vez, a vitrine uma vez (se o lote falhar, um por um)
function todos(lista) {
  const res = new Map()
  const folhas = [...new Set(lista.map((e) => String(e.folha)))]
  for (const f of folhas) {
    const itens = lista.filter((e) => String(e.folha) === f)
    let daFolha, daVitrine
    try { daFolha = especimesDaFolha(f, itens.map((e) => e.rotulo)) } catch (err) { daFolha = itens.map(() => ({ erro: String(err.message) })) }
    try { daVitrine = especimesDaVitrine(itens.map((e) => e.id)) } catch { daVitrine = itens.map(() => null) }
    itens.forEach((e, i) => {
      let r
      try {
        if (daFolha[i].erro) throw new Error(daFolha[i].erro)
        writeFileSync(resolve(OUT, `${e.id}-folha.png`), PNG.sync.write(daFolha[i].png))
        let b
        if (daVitrine[i] && daVitrine[i].png) { b = daVitrine[i].png; writeFileSync(resolve(OUT, `${e.id}-vitrine.png`), PNG.sync.write(b)) }
        else b = especimeDaVitrine(e.id)
        r = diferenca(e.folha, e.rotulo, e.id, daFolha[i].png, b)
      } catch (err) { r = { id: e.id, folha: e.folha, rotulo: e.rotulo, erro: String(err.message) } }
      res.set(e.id, r)
      console.log(r.erro ? `${r.id} · ERRO ${r.erro}` : `${r.id} · ${r.diferenca}% · ${r.tam}`)
    })
  }
  return lista.map((e) => res.get(e.id))
}

const [cmd, ...args] = process.argv.slice(2)
if (cmd === 'compara') {
  const [n, rotulo, id] = args
  const r = compara(n, rotulo, id)
  console.log(`${r.id} · ${r.diferenca}% diferente · ${r.tam}`)
} else if (cmd === 'todos') {
  const lista = lerPre(chrome(['--window-size=360,800', '--dump-dom', `${DEV}/?vitrine=1&lista=1`]))
  writeFileSync(resolve(OUT, 'relatorio.json'), JSON.stringify(todos(lista), null, 1))
} else {
  console.log('uso: node scripts/especime.mjs compara <folha> "<rótulo>" <id> | todos')
}
