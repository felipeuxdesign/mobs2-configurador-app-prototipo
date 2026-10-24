// A régua dos textos: o que o app escreve em cada referência, na ordem do
// documento, contra o textos.md da tela (a norma do texto). Lê o app no modo
// print com &textos=1, pelo --dump-dom do Chrome headless.
// Uso (com o `npm run dev` rodando): node scripts/textos.mjs T01 [referência]
import { readFileSync, readdirSync } from 'node:fs'
import { dom } from './cromo.mjs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..'); const raiz = resolve(app, '../..')
const DEV = process.env.DEV || 'http://localhost:5173'
const pastaDa = (t) => readdirSync(resolve(raiz, '02-telas')).find((d) => d.startsWith(t + '-'))

export function textosDoMd(t) {
  const md = readFileSync(resolve(raiz, '02-telas', pastaDa(t), 'textos.md'), 'utf8'); const out = {}
  for (const bloco of md.split(/^## /m).slice(1)) {
    const nome = bloco.match(/^`([^`]+)`/)?.[1]; if (!nome) continue
    const corpo = bloco.split('\n').slice(1).join('\n')
    out[nome] = [...corpo.matchAll(/`([^`]*)`/g)].map((m) => m[1])
  }
  return out
}
function textosDoApp(t, ref) {
  const q = new URLSearchParams({ print: '1', textos: '1', tela: t }); const m = ref.match(/^\d\d-(estado|momento)-/); if (m) q.set(m[1], ref)
  const html = dom(`${DEV}/?${q}`, { w: 360, h: 800 })
  const pre = html.match(/<pre id="m2cf-out"[^>]*>([\s\S]*?)<\/pre>/); if (!pre) throw new Error('sem textos')
  return JSON.parse(pre[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'))
}
export function confere(t, ref, norma) {
  const { lista: tem, rolam } = textosDoApp(t, ref)
  if (rolam.length) console.log(`AVISO  ${t}/${ref} — o quadro rola: ${rolam.join(' · ')}`)
  const iguais = JSON.stringify(tem) === JSON.stringify(norma)
  if (iguais) return { ref, ok: true }
  const falta = norma.filter((x, i) => tem.indexOf(x) < 0 || norma.slice(0, i).filter((y) => y === x).length >= tem.filter((y) => y === x).length)
  const sobra = tem.filter((x, i) => norma.indexOf(x) < 0 || tem.slice(0, i).filter((y) => y === x).length >= norma.filter((y) => y === x).length)
  return { ref, ok: false, ordem: !falta.length && !sobra.length, falta, sobra, tem }
}
const [t, so] = process.argv.slice(2)
if (!t) { console.log('uso: node scripts/textos.mjs T01 [referência]'); process.exit(1) }
const md = textosDoMd(t); let falhas = 0
for (const ref of Object.keys(md).filter((r) => !so || r === so)) {
  let r; try { r = confere(t, ref, md[ref]) } catch (e) { r = { ref, ok: false, erro: e.message } }
  if (!r.ok) falhas++
  console.log(r.ok ? `OK     ${t}/${ref}` : `FALHA  ${t}/${ref}${r.erro ? ' — ' + r.erro : r.ordem ? ' — os textos batem, a ordem não' : ''}${r.falta?.length ? '\n         falta: ' + r.falta.map((x) => '`' + x + '`').join(' · ') : ''}${r.sobra?.length ? '\n         sobra: ' + r.sobra.map((x) => '`' + x + '`').join(' · ') : ''}`)
}
console.log(falhas ? `\n${falhas} referência(s) com texto diferente` : '\nTEXTOS CONFEREM'); process.exitCode = falhas ? 1 : 0
