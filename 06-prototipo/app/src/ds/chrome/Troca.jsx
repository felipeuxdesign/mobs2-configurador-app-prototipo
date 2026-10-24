// A troca (movimento.md, "Entre telas"). Quando o
// desenho inteiro troca — outra tela, ou um quadro inteiro dentro da mesma —,
// o conteúdo novo esmaece de 0 a 1 em --mov-rapido, na --mov-curva, e o velho
// sai de uma vez: nada desliza, nada se cruza, e o layout não se mexe (só a
// opacity anda). É a troca curta e discreta: a prova que nasce depois dela é
// que aparece.
//
// O conteúdo é o miolo (.tela-miolo) e o rodapé (.ds-rodape) da tela, e o que
// estiver solto fora deles, no fluxo (o título Menu escondido da T04). Ficam de fora:
// · o topo — a barra do sistema, a tira e a faixa —, que troca direto quando
//   o topo muda (o menu, a T03 → T04, a T15 sem sessão) e fica parado
//   entre as telas com o mesmo topo;
// · o teclado do aparelho (T01/03), cenário do sistema como a barra, que tem o
//   movimento dele (TecladoDoAparelho.jsx);
// · o que vem por cima — o véu, com a folha ou o diálogo, o lugar dele fora do
//   fluxo, e o indicador de rolagem —, que tem o movimento dele.
//
// Quem pede:
// · a troca entre telas é do App (src/App.jsx), e só quando um toque leva a
//   outra tela: o toque do técnico, e o voltar do Android (no
//   computador, o Esc), que faz o mesmo que a saída do rodapé. O `emToque`
//   diz se o que se desenha agora veio de um toque. Nunca no pulo do palco,
//   num estado da coluna, na volta ao fluxo, no Recomeçar, no recarregar, na
//   primeira abertura, no print, no processo que leva sozinho a outra tela,
//   nem no `ir` que só acerta o endereço (a mesma tela);
// · a troca de quadro é da tela: `useTrocaDeQuadro(chave)`, ou
//   `<TrocaDeQuadro chave>`, com a chave do quadro que ela desenha — o quadro, nunca o
//   endereço, que a tela acerta depois de abrir. Esmaece quando a chave muda
//   depois de a tela abrir, por toque ou por processo. A primeira chave, e a
//   que muda antes do primeiro quadro pintado (a tela que se acerta ao abrir),
//   abrem paradas: nada anima a entrada de uma tela;
// · `useFimDaTroca()` dá à tela a espera pelo fim da troca que a trouxe (o
//   relógio que só liga depois dela): uma promessa que se cumpre
//   quando o conteúdo acaba de esmaecer, ou logo, se nada esmaece.
// Quem diz onde a tela mora é a `RaizDaTroca` (o App; na vitrine, o espécime):
// sem ela, nada esmaece. `parada` (o print, EM_QUADRO) não deixa nada se mover.
//
// (O `useTroca` de src/ds/primitivos/troca.js é outra peça: o valor que troca
// no lugar, dentro de uma peça. Esta é o desenho inteiro.)
//
// Com reduzir movimento, --mov-rapido é 0 e a troca é direta: nenhuma animação
// nasce. A troca que nasce enquanto outra corre recomeça do 0.
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react'

// o teclado do aparelho (T01/03) é cenário do sistema, como a barra: não esmaece com o conteúdo
const TOPO = '.ds-barra-sistema, .ds-faixa, .ds-topo-menu, .ds-tira-contexto, .ds-teclado'
const POR_CIMA = '.ds-veu, .ds-rolagem'
const PARTE = '.tela-miolo, .ds-rodape'
const DESCE = `${TOPO}, ${POR_CIMA}, ${PARTE}`
const foraDoFluxo = (el) => /^(absolute|fixed)$/.test(getComputedStyle(el).position)

// o conteúdo da tela, procurado a partir da raiz: desce por quem guarda o topo,
// o que vem por cima ou as partes, e para no miolo, no rodapé e no que é solto
export function conteudoDa(raiz) {
  const achados = []
  const anda = (no) => {
    for (const f of no.children) {
      if (f.matches(TOPO) || f.matches(POR_CIMA)) continue
      if (f.matches(PARTE)) achados.push(f)
      else if (f.querySelector(DESCE)) anda(f)
      else if (!foraDoFluxo(f)) achados.push(f)
    }
  }
  if (raiz) anda(raiz)
  return achados
}

// o tempo e a curva, dos tokens: com reduzir movimento, o tempo é 0
const tempo = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? (/ms$/.test(v) ? n : n * 1000) : 0 }
const correndo = new WeakMap()   // o esmaecer vivo de cada parte do conteúdo

export function esmaecerConteudo(raiz) {
  if (!raiz) return
  const css = getComputedStyle(document.documentElement)
  const ms = tempo(css.getPropertyValue('--mov-rapido').trim())
  const curva = css.getPropertyValue('--mov-curva').trim()
  for (const el of conteudoDa(raiz)) {
    correndo.get(el)?.cancel()
    correndo.delete(el)
    if (ms <= 0) continue
    const a = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms, easing: curva })
    correndo.set(el, a)
    a.finished.then(() => { if (correndo.get(el) === a) correndo.delete(el) }, () => {})
  }
}

// a espera pelo fim do esmaecer que corre no conteúdo (nenhum: cumpre logo)
export function fimDaTroca(raiz) {
  const vivas = raiz ? conteudoDa(raiz).map((el) => correndo.get(el)).filter(Boolean) : []
  return Promise.all(vivas.map((a) => a.finished.catch(() => {}))).then(() => undefined)
}

// O toque em curso: o último evento de entrada, enquanto o navegador ainda o
// despacha. O React desenha o que um toque pede logo depois do ouvinte, numa
// microtarefa, com o evento ainda em curso (eventPhase diferente de 0); o que
// um relógio pede (um processo, o endereço que se acerta depois) chega com o
// evento já despachado. Sem relógio nenhum: a mesma entrada, a mesma saída.
const ENTRADAS = ['pointerdown', 'pointerup', 'click', 'keydown', 'keyup', 'change', 'submit']
let entrada = null
let ouvintes = 0
const anota = (e) => { entrada = e }
export const emToque = () => entrada != null && entrada.eventPhase !== 0
// A resposta a um toque que chega depois de uma espera (a espera do Entrar do login): o toque foi do técnico, e a tela nova que ele pede chega
// quando o servidor responde. Quem espera marca antes de levar à outra tela, e a troca
// entre telas a trata como o toque que ela é (o App consome a marca uma vez só)
let resposta = false
export const respostaDoToque = () => { resposta = true }
export const consumirResposta = () => { const r = resposta; resposta = false; return r }
function ouvir() {
  if (ouvintes++ === 0) for (const t of ENTRADAS) window.addEventListener(t, anota, true)
  return () => {
    if (--ouvintes > 0) return
    for (const t of ENTRADAS) window.removeEventListener(t, anota, true)
    entrada = null
  }
}

const Contexto = createContext(null)

// onde a tela mora: `raiz` é o ref da caixa que tem a tela dentro (o .app)
export function RaizDaTroca({ raiz, parada = false, children }) {
  useEffect(() => ouvir(), [])
  const valor = useMemo(() => ({ raiz, parada }), [raiz, parada])
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}

// a troca de quadro dentro da mesma tela: a chave é o quadro desenhado
export function useTrocaDeQuadro(chave) {
  const ctx = useContext(Contexto)
  const antes = useRef(chave)
  const aberta = useRef(false)   // o primeiro quadro já pintou
  useLayoutEffect(() => {
    const q = requestAnimationFrame(() => { aberta.current = true })
    return () => cancelAnimationFrame(q)
  }, [])
  useLayoutEffect(() => {
    if (Object.is(antes.current, chave)) return
    antes.current = chave
    if (aberta.current && ctx && !ctx.parada) esmaecerConteudo(ctx.raiz.current)
  }, [chave, ctx])
}

// o mesmo, escrito no desenho: não põe caixa nenhuma, os filhos passam direto
export function TrocaDeQuadro({ chave, children = null }) {
  useTrocaDeQuadro(chave)
  return children
}

// a espera pelo fim da troca que trouxe a tela (ou a do quadro): chame no efeito
export function useFimDaTroca() {
  const ctx = useContext(Contexto)
  return useCallback(() => fimDaTroca(ctx?.raiz.current), [ctx])
}
