// A checagem do projeto: a cobertura do mock, os tokens, a higiene do código.
// Uso: npm run checar  → exit 0 aprovado / 1 reprovado.
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join, relative } from 'node:path'
import { jsonDoCss } from './tokens-json.mjs'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
let falhas = 0
const chk = (nome, ok, det) => { console.log((ok ? 'OK     ' : 'FALHA  ') + nome + (det ? ' — ' + det : '')); if (!ok) falhas++ }

// 1 · a checagem de cobertura do mock
try {
  const saida = execFileSync('node', [resolve(raiz, '04-dados/checar-cobertura.js')], { encoding: 'utf8' })
  const ok = saida.split('\n').filter(l => l.startsWith('OK')).length
  chk('cobertura do mock', /COBERTURA APROVADA/.test(saida), ok + ' checagens')
} catch (e) { chk('cobertura do mock', false, 'reprovou'); console.log(e.stdout) }

// 2 · tokens.json gerado do tokens.css
chk('tokens.json = tokens.css', readFileSync(resolve(raiz, '03-design-system/tokens.json'), 'utf8') === jsonDoCss())

// 2b · as sementes e as receitas dos estados do indice.json — a conta vem do teste
try {
  const saida = execFileSync('node', [resolve(app, 'scripts/testar-estado.mjs')], { encoding: 'utf8' })
  const n = saida.match(/os (\d+) estados do indice\.json/)?.[1] ?? '?'
  chk('sementes e receitas', /TESTE APROVADO/.test(saida), n + ' estados, todo id no mock, todo estado com rótulo na coluna')
} catch (e) { chk('sementes e receitas', false, 'reprovou'); console.log(e.stdout) }

// 2c · as regras do mundo real no node: a conta do teclado e o retrato do palco (06-prototipo/CLAUDE.md, 10 e 11)
try {
  const saida = execFileSync('node', [resolve(app, 'scripts/testar-regras.mjs')], { encoding: 'utf8' })
  const n = saida.split('\n').filter((l) => l.startsWith('OK')).length
  chk('o teclado e o retrato', /TESTE APROVADO/.test(saida), n + ' contas')
} catch (e) { chk('o teclado e o retrato', false, 'reprovou'); console.log(e.stdout) }

// 2d · os toques do mundo real que só abrem pela coluna: o login sem conexão (T01/14) e o Bluetooth (T05/16, 17)
try {
  const saida = execFileSync('node', [resolve(app, 'scripts/testar-login-e-bluetooth.mjs')], { encoding: 'utf8' })
  const n = saida.split('\n').filter((l) => l.startsWith('OK')).length
  chk('o login sem conexão e o Bluetooth', /TESTE APROVADO/.test(saida), n + ' toques')
} catch (e) { chk('o login sem conexão e o Bluetooth', false, 'reprovou'); console.log(e.stdout) }

// 2e · a câmera sem a permissão (a do checklist; a T10 não tem câmera), que nenhum estado abre: o Abrir as configurações
try {
  const saida = execFileSync('node', [resolve(app, 'scripts/testar-camera.mjs')], { encoding: 'utf8' })
  const n = saida.split('\n').filter((l) => l.startsWith('OK')).length
  chk('a câmera sem a permissão', /TESTE APROVADO/.test(saida), n + ' conferências')
} catch (e) { chk('a câmera sem a permissão', false, 'reprovou'); console.log(e.stdout) }

// 2f · o contexto é a empresa (T02/00 e 01, decisão 56): o mundo do herói e o de uma empresa só, e o que cada toque faz, nas funções da T02
try {
  const saida = execFileSync('node', [resolve(app, 'scripts/testar-empresa.mjs')], { encoding: 'utf8' })
  const n = saida.split('\n').filter((l) => l.startsWith('OK')).length
  chk('a escolha da empresa', /TESTE APROVADO/.test(saida), n + ' toques')
} catch (e) { chk('a escolha da empresa', false, 'reprovou'); console.log(e.stdout) }

// 2g · a folha Trocar de empresa do topo do menu (T04/07 a 09, decisão 56): com e sem sessão, com o envio subindo, até a T03 da escolhida, nas funções da T04
try {
  const saida = execFileSync('node', [resolve(app, 'scripts/testar-trocar-empresa.mjs')], { encoding: 'utf8' })
  const n = saida.split('\n').filter((l) => l.startsWith('OK')).length
  chk('o Trocar de empresa', /TESTE APROVADO/.test(saida), n + ' conferências')
} catch (e) { chk('o Trocar de empresa', false, 'reprovou'); console.log(e.stdout) }

// 2h · o login (T01/12, 13, 17 e 18): o teto de envios, o Digite o código, a folha do e-mail, outro usuário
try {
  const saida = execFileSync('node', [resolve(app, 'scripts/testar-login.mjs')], { encoding: 'utf8' })
  const n = saida.split('\n').filter((l) => l.startsWith('OK')).length
  chk('o teto de envios e outro usuário', /TESTE APROVADO/.test(saida), n + ' conferências')
} catch (e) { chk('o teto de envios e outro usuário', false, 'reprovou'); console.log(e.stdout) }

// 3 · higiene de app/src: relógio, acaso, locale, valor solto
function arquivos(d) {
  return readdirSync(d).flatMap(n => { const p = join(d, n); return statSync(p).isDirectory() ? arquivos(p) : [p] })
}
const src = arquivos(resolve(app, 'src')).filter(p => /\.(jsx?|css)$/.test(p))
const semComentario = s => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1')
const achados = { relogio: [], locale: [], hex: [], px: [] }
for (const p of src) {
  const s = semComentario(readFileSync(p, 'utf8')); const r = relative(app, p)
  if (/Math\.random|Date\.now|new Date\s*\(|performance\.now/.test(s)) achados.relogio.push(r)
  if (/toLocale\w*String|\bIntl\./.test(s)) achados.locale.push(r)
  if (/#[0-9a-fA-F]{3,8}\b/.test(s.replace(/href="#[^"]*"/g, '').replace(/['"]#[a-z-]+['"]/g, ''))) achados.hex.push(r)
  // a cor escrita direto não troca com o tema — rgb, rgba, hsl e hsla também (o palco-tokens é do palco, fora do app)
  else if (!/palco-tokens\.css$/.test(p) && /\b(rgba?|hsla?)\(/.test(s)) achados.hex.push(r + ' (rgb/hsl)')
  if (/\.css$/.test(p) && !/(palco-tokens|tokens-propostos)\.css$/.test(p)) {
    const px = s.split('\n').filter(l => /\d+(\.\d+)?px/.test(l) && !/var\(--/.test(l))
    if (px.length) achados.px.push(r + ' (' + px.length + ')')
  }
}
chk('zero relógio e acaso em app/src (Math.random, Date.now, new Date, performance.now)', !achados.relogio.length, achados.relogio.join(', '))
chk('zero locale em app/src (toLocaleString, Intl)', !achados.locale.length, achados.locale.join(', '))
chk('zero cor solta em app/src (hex, rgb, rgba, hsl)', !achados.hex.length, achados.hex.join(', '))
chk('zero px solto no CSS do app (fora do palco-tokens)', !achados.px.length, achados.px.join(', '))

console.log(falhas ? '\nCHECAR REPROVADO — ' + falhas + ' falha(s)' : '\nCHECAR APROVADO')
process.exitCode = falhas ? 1 : 0
