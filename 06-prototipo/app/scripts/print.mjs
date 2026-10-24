// Fotografa o app a 360 × 800 com escala 2 (720 × 1600, o tamanho dos PNG
// de referência), pelo Chrome da máquina, headless. A foto sai pelo
// fotógrafo, se estiver no ar, ou pelo Chrome de linha de comando com a trava
// (scripts/cromo.mjs): o Chrome headless trava com instâncias em paralelo.
// Uso: npm run print -- "<url>" <saida.png> [largura altura escala]
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { foto } from './cromo.mjs'

const [url, saida, w = '360', h = '800', escala = '2'] = process.argv.slice(2)
if (!url || !saida) { console.log('uso: npm run print -- "<url>" <saida.png> [largura altura escala]'); process.exit(1) }
const out = resolve(saida)
mkdirSync(dirname(out), { recursive: true })
foto(url, out, { w: +w, h: +h, escala: +escala })
console.log('print:', out)
