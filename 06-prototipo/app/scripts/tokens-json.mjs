// Gera 03-design-system/tokens.json a partir do tokens.css, que é a norma.
// O JSON leva os valores do modo normal — o reduzir movimento fica só no CSS. O tema claro
// (o bloco [data-tema="claro"]) vai como extensão de cada cor: "mobs2.tema.claro".
// Uso: npm run tokens            → escreve o JSON
//      npm run tokens -- --checar → só confere (exit 1 se divergir)
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const cssPath = resolve(raiz, '03-design-system/tokens.css')
const jsonPath = resolve(raiz, '03-design-system/tokens.json')

const semComentario = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '')
function bloco(css, seletor) {
  const i = css.indexOf(seletor + ' {')
  return i < 0 ? '' : css.slice(i, css.indexOf('}', i))
}
function declaracoes(trecho) {
  const out = {}
  for (const m of trecho.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim()
  return out
}
export function tokensDoCss() {
  return declaracoes(bloco(semComentario(readFileSync(cssPath, 'utf8')), ':root'))
}
export function tokensDoClaro() {
  return declaracoes(bloco(semComentario(readFileSync(cssPath, 'utf8')), '[data-tema="claro"]'))
}

function tipo(nome, valor) {
  if (/^#|^rgba?\(/.test(valor)) return 'color'
  if (/^cubic-bezier/.test(valor)) return 'cubicBezier'
  if (/ms$/.test(valor)) return 'duration'
  if (nome === 'fonte' || nome === 'fonte-sistema') return 'fontFamily'  // a do app e a do sistema (a hora da barra de status, decisão 43)
  if (/px$/.test(valor)) return 'dimension'
  if (/^-?[\d.]+$/.test(valor)) return 'number'
  return 'string'
}

export function jsonDoCss() {
  const t = tokensDoCss()
  const claro = tokensDoClaro()
  const o = {}
  for (const [k, v] of Object.entries(t)) {
    o[k] = { $type: tipo(k, v), $value: v }
    if (k in claro) o[k].$extensions = { 'mobs2.tema.claro': claro[k] }
  }
  return JSON.stringify(o, null, 1) + '\n'
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const novo = jsonDoCss()
  if (process.argv.includes('--checar')) {
    const atual = readFileSync(jsonPath, 'utf8')
    if (atual !== novo) { console.log('tokens.json DIVERGE do tokens.css — rode npm run tokens'); process.exit(1) }
    console.log('tokens.json = tokens.css')
  } else {
    writeFileSync(jsonPath, novo)
    console.log('tokens.json gerado com', Object.keys(tokensDoCss()).length, 'tokens')
  }
}
