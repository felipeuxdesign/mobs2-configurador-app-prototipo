// Compara um print com o PNG de referência, pixel a pixel.
// Uso: npm run comparar -- <print.png> <referencia.png> [diferenca.png]
// O render local desenha a fonte com pequenas diferenças do gerador do design;
// por isso a comparação conta também a diferença "estrutural" (limiar alto).
import { readFileSync, writeFileSync } from 'node:fs'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const [a, b, saida] = process.argv.slice(2)
if (!a || !b) { console.log('uso: npm run comparar -- <print.png> <referencia.png> [diferenca.png]'); process.exit(1) }
const A = PNG.sync.read(readFileSync(a)), B = PNG.sync.read(readFileSync(b))
if (A.width !== B.width || A.height !== B.height) { console.log(`tamanhos diferentes: ${A.width}×${A.height} × ${B.width}×${B.height}`); process.exit(1) }
const { width: w, height: h } = A
const diff = new PNG({ width: w, height: h })
const fino = pixelmatch(A.data, B.data, diff.data, w, h, { threshold: 0.1 })
const grosso = pixelmatch(A.data, B.data, null, w, h, { threshold: 0.5 })
if (saida) writeFileSync(saida, PNG.sync.write(diff))
const pct = n => (100 * n / (w * h)).toFixed(2) + '%'
console.log(`diferença fina: ${fino} px (${pct(fino)}) · estrutural: ${grosso} px (${pct(grosso)})`)
