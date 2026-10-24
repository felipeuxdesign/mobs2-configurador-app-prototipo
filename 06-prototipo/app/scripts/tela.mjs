// A bancada das telas (a mesma régua dos espécimes, em 360 × 800 a 2×): o HTML
// da referência e o app no modo print, fotografados no MESMO Chrome headless.
// Assim a diferença de fonte entre geradores some, e a meta é 0%. O PNG da
// referência continua sendo o gabarito: a bancada dá também a diferença
// contra ele, que inclui a rasterização do gerador do design.
//
// Uso (com o `npm run dev` rodando em :5173):
//   node scripts/tela.mjs compara T01 00-tela
//   node scripts/tela.mjs compara T01 01-estado-usuario-ou-senha-incorretos
//   node scripts/tela.mjs todos T01          → todas as referências da tela
//   node scripts/tela.mjs todas [base.json]  → as 16 telas; com a base, o que piorou
// Saída: prints/telas/<T>/<ref>-{html,app,diff}.png e uma linha por referência;
// o `todos` grava prints/telas/<T>/relatorio.json, e o `todas`, prints/telas/relatorio.json.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { foto as fotoCromo } from './cromo.mjs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
const DEV = process.env.DEV || 'http://localhost:5173'

// as fotos saem pelo fotógrafo, se estiver no ar, ou pelo Chrome de linha de comando (cromo.mjs)
function foto(url, saida) { fotoCromo(url, saida, { w: 360, h: 800, escala: 2 }); return PNG.sync.read(readFileSync(saida)) }

const pastaDa = (t) => readdirSync(resolve(raiz, '02-telas')).find((d) => d.startsWith(t + '-'))
const referencias = (t) => readdirSync(resolve(raiz, '02-telas', pastaDa(t), 'referencias/html')).filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, '')).sort()

function urlDoApp(t, ref) {
  const q = new URLSearchParams({ print: '1', tela: t })
  const m = ref.match(/^\d\d-(estado|momento)-/)
  if (m) q.set(m[1], ref)
  return `${DEV}/?${q}`
}

function difere(A, B, saida) {
  if (A.width !== B.width || A.height !== B.height) return { erro: `tamanhos ${A.width}×${A.height} × ${B.width}×${B.height}` }
  const { width: w, height: h } = A
  const diff = new PNG({ width: w, height: h })
  const fino = pixelmatch(A.data, B.data, diff.data, w, h, { threshold: 0.1 })
  const grosso = pixelmatch(A.data, B.data, null, w, h, { threshold: 0.5 })
  if (saida) writeFileSync(saida, PNG.sync.write(diff))
  const pct = (n) => +(100 * n / (w * h)).toFixed(2)
  return { fino: pct(fino), estrutural: pct(grosso) }
}

export function compara(t, ref) {
  const pasta = pastaDa(t); const OUT = resolve(app, 'prints/telas', t); mkdirSync(OUT, { recursive: true })
  const html = foto('file://' + resolve(raiz, '02-telas', pasta, 'referencias/html', ref + '.html'), resolve(OUT, ref + '-html.png'))
  const appPng = foto(urlDoApp(t, ref), resolve(OUT, ref + '-app.png'))
  const png = PNG.sync.read(readFileSync(resolve(raiz, '02-telas', pasta, 'referencias/png', ref + '.png')))
  return { tela: t, ref, html: difere(html, appPng, resolve(OUT, ref + '-diff.png')), png: difere(png, appPng) }
}

const linha = (r) => `${r.tela}/${r.ref} · contra o HTML ${r.html.erro ?? r.html.fino + '% (estrutural ' + r.html.estrutural + '%)'} · contra o PNG ${r.png.erro ?? r.png.fino + '%'}`
const [cmd, t, ref] = process.argv.slice(2)
if (cmd === 'compara' && t && ref) console.log(linha(compara(t, ref)))
else if (cmd === 'todos' && t) {
  const res = referencias(t).map((r) => { try { const x = compara(t, r); console.log(linha(x)); return x } catch (e) { console.log(`${t}/${r} · ERRO ${e.message}`); return { tela: t, ref: r, erro: e.message } } })
  writeFileSync(resolve(app, 'prints/telas', t, 'relatorio.json'), JSON.stringify(res, null, 1))
} else if (cmd === 'todas') {
  // as 16 telas, quatro de cada vez (as abas do fotógrafo), num relatório só;
  // com uma linha de base, diz o que piorou contra o HTML
  const telas = readdirSync(resolve(raiz, '02-telas')).map((d) => d.match(/^(T\d\d)-/)?.[1]).filter(Boolean).sort()
  const fila = [...telas]; const roda = () => new Promise((ok) => {
    const x = fila.shift(); if (!x) return ok()
    const p = spawn(process.execPath, [fileURLToPath(import.meta.url), 'todos', x], { stdio: ['ignore', 'ignore', 'inherit'] })
    p.on('exit', () => { console.log(`${x} fotografada`); roda().then(ok) })
  })
  await Promise.all([roda(), roda(), roda(), roda()])
  const tudo = telas.flatMap((x) => JSON.parse(readFileSync(resolve(app, 'prints/telas', x, 'relatorio.json'), 'utf8')))
  writeFileSync(resolve(app, 'prints/telas/relatorio.json'), JSON.stringify(tudo, null, 1))
  const zero = tudo.filter((r) => r.html?.fino === 0).length, erros = tudo.filter((r) => r.erro || r.html?.erro)
  console.log(`\n${tudo.length} referências · ${zero} em 0% contra o HTML · ${erros.length} com erro · prints/telas/relatorio.json`)
  const base = t ? JSON.parse(readFileSync(resolve(app, t), 'utf8')) : null
  if (base) {
    const antes = new Map(base.map((r) => [`${r.tela}/${r.ref}`, r.html?.fino]))
    const pior = tudo.filter((r) => antes.has(`${r.tela}/${r.ref}`) && (r.html?.fino ?? 100) > antes.get(`${r.tela}/${r.ref}`) + 0.01)
    const melhor = tudo.filter((r) => antes.has(`${r.tela}/${r.ref}`) && (r.html?.fino ?? 100) < antes.get(`${r.tela}/${r.ref}`) - 0.01)
    for (const r of pior) console.log(`PIOROU  ${r.tela}/${r.ref} · ${antes.get(`${r.tela}/${r.ref}`)}% → ${r.html?.fino ?? r.erro}%`)
    for (const r of melhor) console.log(`MELHOROU ${r.tela}/${r.ref} · ${antes.get(`${r.tela}/${r.ref}`)}% → ${r.html.fino}%`)
    console.log(pior.length ? `${pior.length} referências pioraram contra a base ${t}` : `nenhuma referência piorou contra a base ${t}`)
    process.exitCode = pior.length || erros.length ? 1 : 0
  }
} else console.log('uso: node scripts/tela.mjs compara <T01> <referência> | todos <T01> | todas [base.json]')
