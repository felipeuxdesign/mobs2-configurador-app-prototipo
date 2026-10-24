// O tema (leis R-16 a R-19): o app nasce escuro, e o claro é escolha do técnico, na
// linha *Modo claro* da folha da Conta (T04/05). O aparelho lembra da escolha — inclusive no login,
// antes de entrar, na próxima vez que o app abrir: no protótipo, no armazenamento do navegador.
// Ligar o claro é pôr data-tema="claro" na raiz do app (App.jsx); desligar, tirar. Só as cores
// mudam, pelos tokens (o bloco [data-tema="claro"] do tokens.css).
// A troca: o app inteiro troca as cores no lugar, em --mov-lento (300, desacelera), com a folha
// ainda aberta — nada se move. A raiz ganha data-tema-trocando enquanto dura (base.css); com
// reduzir movimento, o --mov-lento é 0 e a troca é direta.
import { useSyncExternalStore } from 'react'

const CHAVE = 'mobs2-configurador.tema'

function lerGuardado() {
  // a fotografia (?print=1) pode pedir o claro pelo endereço, &tema=claro: o print sai no tema
  // pedido, sem depender do que o navegador guardou
  try {
    const q = new URLSearchParams(window.location.search)
    if (q.get('print') === '1' && q.get('tema')) return q.get('tema') === 'claro' ? 'claro' : 'escuro'
  } catch { /* sem endereço: segue o guardado */ }
  try { return window.localStorage.getItem(CHAVE) === 'claro' ? 'claro' : 'escuro' } catch { return 'escuro' }
}

let tema = typeof window === 'undefined' ? 'escuro' : lerGuardado()
let trocando = false
let fimDaTroca = null
const ouvintes = new Set()
const avisar = () => ouvintes.forEach((f) => f())

function duracaoDaTroca() {
  try {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--mov-lento').trim()
    const n = parseFloat(v)
    // em ms: o build de produção escreve o 300ms como .3s
    return Number.isFinite(n) ? (/ms$/.test(v) ? n : n * 1000) : 0
  } catch { return 0 }
}

export function definirTema(novo) {
  if (novo === tema) return
  tema = novo
  try { window.localStorage.setItem(CHAVE, novo) } catch { /* sem armazenamento: vale até fechar */ }
  const ms = duracaoDaTroca()
  clearTimeout(fimDaTroca)
  trocando = ms > 0
  avisar()
  if (trocando) fimDaTroca = setTimeout(() => { trocando = false; avisar() }, ms)
}

const assinar = (f) => { ouvintes.add(f); return () => ouvintes.delete(f) }
const foto = () => (trocando ? `${tema}·trocando` : tema)

// { tema: 'escuro' | 'claro', trocando: boolean }
export function useTema() {
  const f = useSyncExternalStore(assinar, foto, () => 'escuro')
  const [t, tr] = f.split('·')
  return { tema: t, trocando: !!tr }
}
