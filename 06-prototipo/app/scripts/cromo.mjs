// O Chrome das réguas, num lugar só. Se o fotógrafo (scripts/fotografo.mjs)
// está no ar, as fotos vão pra ele e saem em paralelo; se não, cai no Chrome de
// linha de comando, uma instância de cada vez, com a trava de pasta (o Chrome
// headless trava com instâncias paralelas nesta máquina). As funções são
// síncronas, como as réguas que as chamam.
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, statSync, readFileSync, utimesSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

export const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const TMP = resolve(app, 'prints/tmp'); mkdirSync(TMP, { recursive: true })
const TRAVA = resolve(TMP, 'chrome.trava')
// um fotógrafo por escala: 2 (as telas) em 5190, 1 (as folhas e a vitrine) em 5191
const PORTAS = { 2: 5190, 1: 5191 }
export const dorme = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)

export function comTrava(fn) {
  for (;;) {
    try { mkdirSync(TRAVA); break } catch {
      try { if (Date.now() - statSync(TRAVA).mtimeMs > 120000) rmSync(TRAVA, { recursive: true, force: true }) } catch {}
      dorme(200)
    }
  }
  try { return fn() } finally { rmSync(TRAVA, { recursive: true, force: true }) }
}
// o Chrome headless às vezes cai na primeira tentativa: mais duas antes de desistir
function tenta(fn) { for (let i = 0; ; i++) { try { return fn() } catch (e) { if (i >= 2) throw e; dorme(1000) } } }

const noAr = {}
export function fotografoNoAr(escala = 2) {
  if (process.env.SEM_FOTOGRAFO === '1' || !PORTAS[escala]) return false
  if (noAr[escala] === undefined) {
    try { noAr[escala] = JSON.parse(execFileSync('curl', ['-s', '-m', '2', `http://127.0.0.1:${PORTAS[escala]}/saude`], { encoding: 'utf8' })).escala === escala } catch { noAr[escala] = false }
  }
  return noAr[escala]
}
function pede(escala, rota, corpo) {
  const r = JSON.parse(execFileSync('curl', ['-s', '-m', '90', '-X', 'POST', '-H', 'content-type: application/json', '--data-binary', '@-', `http://127.0.0.1:${PORTAS[escala]}${rota}`],
    { encoding: 'utf8', input: JSON.stringify(corpo), maxBuffer: 64 * 1024 * 1024 }))
  if (!r.ok) throw new Error('fotógrafo: ' + r.erro)
  return r
}

// grava um PNG de `url` em `saida`, com a janela w × h e a escala dada
export function foto(url, saida, { w = 360, h = 800, escala = 2 } = {}) {
  if (fotografoNoAr(escala)) return tenta(() => pede(escala, '/foto', { url, w, h, escala, saida }))
  return tenta(() => comTrava(() => execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    `--window-size=${w},${h}`, `--force-device-scale-factor=${escala}`, '--virtual-time-budget=3000', '--screenshot=' + saida, url],
  { stdio: 'ignore', timeout: 90000, killSignal: 'SIGKILL' })))
}

// o DOM de `url` depois de pronto (o que o --dump-dom devolve)
export function dom(url, { w = 360, h = 800, pre = true } = {}) {
  const e = fotografoNoAr(1) ? 1 : fotografoNoAr(2) ? 2 : 0
  if (e) return tenta(() => pede(e, '/dom', { url, w, h, escala: e, pre })).html
  return tenta(() => comTrava(() => execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    `--window-size=${w},${h}`, '--virtual-time-budget=3000', '--dump-dom', url],
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024, timeout: 90000, killSignal: 'SIGKILL' })))
}

// pra quem precisa segurar o Chrome da linha de comando por mais de 2 min
export function renovaTrava() { try { const t = Date.now() / 1000; utimesSync(TRAVA, t, t) } catch {} }
