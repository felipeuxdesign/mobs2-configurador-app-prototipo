// Por cima da tela (folha 2 · movimento.md, "Por cima da tela"):
// o véu e, nele, a folha ou o diálogo, numa peça só, com o mesmo peso em todo o app:
//   a folha    sobe em --mov-padrao (200) e desce em --mov-rapido (150)       Folha.css
//   o diálogo  nasce e some em --mov-rapido (150), de 98% a 100%              Dialogo.css
//   o véu      esmaece junto: 200 com a folha que sobe, 150 no resto          Veu.css
// O desenho de cada movimento é da própria peça; aqui mora só quando cada uma está aberta.
//
// Duas formas, a mesma presença:
// · usePresenca(aberto) → { montado, visivel } — uma coisa só por cima (a folha do login, o
//   diálogo da senha alterada, o aviso de outra sessão da T02, a folha Outras ações da T11).
// · usePorCima(qual) + <PorCima camada lugar>{a folha ou o diálogo de `qual`}</PorCima> — as
//   coisas que se revezam no mesmo véu (o menu, T04, e o Encerrar antes de terminar? de toda tela
//   com a faixa). `qual` é o nome do que está por cima agora, ou null. O véu fica, parado,
//   quando uma coisa dá lugar a outra (a folha que vira diálogo): a que sai
//   faz o movimento de sair e a que entra, o de entrar, ao mesmo tempo. A volta é o mesmo
//   movimento ao contrário, no mesmo tempo: o Cancelar do diálogo esmaece ele em 150
//   enquanto a folha sobe de novo em 200. O que sai continua desenhado como estava (a peça
//   guarda o último desenho de cada um), mudo pro leitor e sem toque, fora do fluxo, por baixo
//   do que entra, até acabar de sair. `lugar` é a caixa em volta do véu (a classe da tela que
//   conserva a região de composição), de cada coisa. O fundo pode se estender acima dela
//   por --veu-topo (o padding de cima do véu); a medida considera essa extensão. Na T04, folha e diálogo já cobrem
//   todo o fundo, e a troca mantém o véu parado. Se outra composição ampliar o fundo,
//   só o pedaço novo esmaece junto com o diálogo.
//
// O ciclo de cada coisa: entra montada fechada, e abre no mesmo quadro, logo depois de o
// fechado ser calculado (a troca de classe vira a transição da peça); sai fechando, e desmonta
// no fim do fechar (--mov-rapido, lido do tokens.css). Aberta desde o começo — pelo endereço,
// num estado da coluna, no print —, nasce aberta, parada: nada anima a entrada de uma tela.
// Com reduzir movimento, os tempos são 0, e tudo troca direto. Nada de relógio: o fim do
// fechar é um setTimeout com o tempo do token.
import { createContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Veu } from './Veu.jsx'
import './PorCima.css'

// o tempo do token, em ms: o build de produção escreve o 150ms como .15s
const tempo = (token) => { const v = getComputedStyle(document.documentElement).getPropertyValue(token).trim(); const n = parseFloat(v); return Number.isFinite(n) ? (/ms$/.test(v) ? n : n * 1000) : 0 }

// Aberta ou não: a Folha e o Diálogo leem daqui quando a tela não diz (`aberta` / `aberto`)
export const PresencaPorCima = createContext(null)

// cada camada: { qual, fase } — 'fechada' (montada, abre neste quadro) · 'aberta' · 'saindo'
function comecar(qual) {
  return { qual, camadas: qual != null ? [{ qual, fase: 'aberta' }] : [], veu: qual != null }
}
function trocar(s, qual) {
  // o que estava aberto (ou entrando) sai; o que já saía continua saindo
  let camadas = s.camadas.map((c) => (c.qual === qual || c.fase === 'saindo' ? c : { ...c, fase: 'saindo' }))
  if (qual == null) return { qual, camadas, veu: false }
  // o que ainda saía e é pedido de novo volta de onde está (a transição da peça reverte)
  if (camadas.some((c) => c.qual === qual)) {
    camadas = camadas.map((c) => (c.qual === qual ? { ...c, fase: 'aberta' } : c))
    return { qual, camadas, veu: true }
  }
  // o novo entra fechado; o véu que já estava aceso fica aceso (a troca no mesmo véu)
  return { qual, camadas: [...camadas, { qual, fase: 'fechada' }], veu: s.veu }
}

export function usePorCima(qual) {
  const [s, setS] = useState(() => comecar(qual))
  // o pedido mudou: a troca entra neste mesmo desenho, antes de ele chegar à tela (o React
  // desenha de novo na hora, com o estado novo, e joga fora este)
  if (!Object.is(s.qual, qual)) setS(trocar(s, qual))

  // o que entrou fechado abre no mesmo quadro, depois de o fechado ser calculado
  useLayoutEffect(() => {
    if (!s.camadas.some((c) => c.fase === 'fechada')) return
    void document.body.offsetHeight
    setS((x) => ({ ...x, camadas: x.camadas.map((c) => (c.fase === 'fechada' ? { ...c, fase: 'aberta' } : c)), veu: true }))
  }, [s])

  // o que sai desmonta no fim do fechar (o fechar da folha, do diálogo e do véu é o mesmo, 150)
  useEffect(() => {
    const saindo = s.camadas.filter((c) => c.fase === 'saindo')
    if (!saindo.length) return undefined
    const t = setTimeout(() => setS((x) => ({ ...x, camadas: x.camadas.filter((c) => !saindo.includes(c)) })), tempo('--mov-rapido'))
    return () => clearTimeout(t)
  }, [s.camadas])

  const { camadas } = s
  const ultima = camadas[camadas.length - 1]
  return {
    qual: s.qual,
    camadas,
    veu: s.veu,
    montado: camadas.length > 0,
    // o que diz o lugar do véu: o que está por cima, ou, fechando, o último que saiu
    topo: s.qual ?? ultima?.qual ?? null,
  }
}

// uma coisa só por cima: montada enquanto entra, fica ou sai; visível enquanto aberta
export function usePresenca(aberto) {
  const c = usePorCima(aberto ? 'aberta' : null)
  return { montado: c.montado, visivel: c.camadas.some((x) => x.fase === 'aberta') }
}

// a folha ou o diálogo: a peça diz o que é (Folha.porCima, Dialogo.porCima)
const tipoDe = (el) => el?.type?.porCima ?? 'dialogo'

export function PorCima({ camada, lugar, children }) {
  const guardados = useRef(new Map())   // qual → { el, lugar }: o último desenho de cada coisa
  const { qual, camadas, veu } = camada
  if (qual != null && children) guardados.current.set(qual, { el: children, lugar })
  for (const k of [...guardados.current.keys()]) if (!camadas.some((c) => c.qual === k)) guardados.current.delete(k)

  const entra = camadas.find((c) => c.fase !== 'saindo')
  const topo = guardados.current.get(camada.topo) ?? guardados.current.get(camadas[camadas.length - 1]?.qual)
  const troca = Boolean(entra) && camadas.some((c) => c.fase === 'saindo')
  const lugarAgora = topo?.lugar

  // Se o fundo pintado cresce na troca, só o pedaço novo esmaece.
  const caixa = useRef(null)
  const antes = useRef(null)
  const [corte, setCorte] = useState(null)
  useLayoutEffect(() => {
    const el = caixa.current
    const veuEl = el?.querySelector('.ds-veu')
    // o véu sobe sobre o chrome pela margem negativa e devolve a medida em padding (Veu.css)
    const extensao = veuEl ? parseFloat(getComputedStyle(veuEl).paddingTop) || 0 : 0
    // Mede o fundo pintado: folhas do menu já cobrem o topo inteiro.
    const agora = el ? { lugar: lugarAgora, top: el.offsetTop + el.clientTop - extensao, bottom: el.offsetTop + el.offsetHeight } : null
    const a = antes.current
    antes.current = agora
    if (!troca) { if (corte != null) setCorte(null); return }
    if (a && agora && a.lugar !== agora.lugar && agora.top < a.top && agora.bottom === a.bottom) setCorte(a.top - agora.top)
  })

  if (!camadas.length || !topo) return null
  const de = tipoDe(entra ? guardados.current.get(entra.qual)?.el : topo.el)
  const veuDesenhado = (
    <Veu de={de} visivel={veu} troca={troca} corte={troca ? corte : null}>
      {camadas.map((c) => {
        const g = guardados.current.get(c.qual)
        if (!g) return null
        // o que sai enquanto outro entra sai do fluxo, por baixo do novo, no lugar em que estava
        const foraDoFluxo = troca && c.fase === 'saindo'
        const saindo = c.fase === 'saindo'
        return (
          <PresencaPorCima.Provider key={c.qual} value={{ aberta: c.fase === 'aberta' }}>
            <div className={`ds-por-cima ${foraDoFluxo ? `ds-por-cima-sai ds-por-cima-sai-${tipoDe(g.el)}` : ''}`}
              inert={saindo ? '' : undefined} aria-hidden={saindo ? 'true' : undefined}>
              {g.el}
            </div>
          </PresencaPorCima.Provider>
        )
      })}
    </Veu>
  )
  return lugarAgora ? <div ref={caixa} className={lugarAgora}>{veuDesenhado}</div> : veuDesenhado
}
