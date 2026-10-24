// A faixa de sessão (folha 2) — uma peça só: 52 (--faixa-sessao),
// flex-shrink 0 e borda de baixo --separador, igual em toda tela com sessão.
// O estado muda o conteúdo, nunca o desenho (Lei 3):
//   aberta     · LED lima, serial, placa e a ação (o ENCERRAR)
//   sem-sessao · LED apagado e só o fato, sem borda
//   falha      · o serial sai, LED e fato em vermelho, traço vermelho de 2 embaixo
// Sem `acao`, é a faixa sem ação (a do encerramento, T16): a mesma casca de
// 52, com a borda. No menu (lugar 'menu') ela tem os mesmos 52, com a
// linha de baixo e a borda de cima --borda-rodape, embaixo da tira; em falha, a
// linha vermelha de 2 nos mesmos 52 (a faixa é uma peça
// só, sem traço sobreposto). Sem sessão, no menu, fica a do T04/01, 50
// com a borda de cima e a linha embaixo. 'sem ativo' na placa fica em
// --tinta-apagada. O ENCERRAR tem o desenho de 44 (decisão 38): no
// menu, a 8 da conta; o toque de 48 cresce só pra baixo, dentro da faixa, e na
// faixa do menu em falha ele desce 1, pro mesmo lugar da sem falha (T04/03).
//
// O movimento (movimento.md): a faixa é o topo, e entre telas
// ela fica parada. Dentro da tela, ela se move em dois momentos, os dois
// por baixo da barra do sistema — que é do Android (decisão 43, lei 22) e não se
// move: fica por cima de tudo o que o app desenha, e a cor dela troca direto,
// como a do aparelho —, em --mov-padrao, na --mov-curva, só por transform:
// · a faixa que nasce (a T05 quando a pré-checagem aprova): até ali a
//   tela passa `ausente` — a peça fica montada no lugar dela, sem caixa. Quando
//   deixa de ser ausente com a tela já aberta, o layout vai direto pro fim (o
//   lugar dela já aberto) e ela desce de cima, de -100% a 0; o que ela empurrou
//   no fluxo — o miolo, e dentro dele o que andou diferente do resto — vai do
//   lugar em que estava ao novo só por deslocamento, no mesmo tempo e na mesma
//   curva: nada salta. O quanto cada parte andou é medido (o deslocamento que a
//   maior parte do que ela tem dentro teve), nunca escrito aqui;
// · a faixa que encerra (a T16 quando a sessão fecha): a tela passa
//   `revela` na faixa sem sessão. Quando ela chega no lugar da aberta, com a tela
//   já aberta, a aberta fica por cima, sobe de 0 a -100% e some, e revela a sem
//   sessão, que já está no lugar: nada do layout se move.
// Nada disso anima a entrada: a tela que abre já com a faixa (pela URL, pelo
// palco, num estado da coluna, no print) abre parada, e só o que muda depois do
// primeiro quadro pintado se move. Com reduzir movimento, --mov-padrao é 0: a
// faixa aparece e a troca é direta, sem nenhuma animação.
// O ENCERRAR que se apaga e volta (a lei 17) troca de tinta direto, sem piscar:
// a cor não anima, e a camada do pressionado sai de uma vez no desabilitado
// (Faixa.css) — nem o roxo, nem a tinta soltando por cima da tinta apagada.
import { useLayoutEffect, useRef, useState } from 'react'
import { Led } from '../primitivos/Marcador.jsx'
import { Camadas } from './Camadas.jsx'
import './Faixa.css'

const LED = { aberta: 'viva', 'sem-sessao': 'sem-sessao', falha: 'falha' }

// ── o movimento: o tempo e a curva dos tokens (com reduzir movimento, o tempo é 0) ──
const tempo = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? (/ms$/.test(v) ? n : n * 1000) : 0 }
function movimento() {
  const css = getComputedStyle(document.documentElement)
  return { ms: tempo(css.getPropertyValue('--mov-padrao').trim()), curva: css.getPropertyValue('--mov-curva').trim() }
}
const foraDoFluxo = (el) => /^(absolute|fixed)$/.test(getComputedStyle(el).position)
// o que vem embaixo da faixa, no fluxo da tela: o que ela empurra quando nasce
function empurrados(faixa) {
  const r = []
  for (let e = faixa.nextElementSibling; e; e = e.nextElementSibling) if (!foraDoFluxo(e)) r.push(e)
  return r
}
// onde cada coisa está, a partir do topo da tela (o que rola a página não conta),
// até três níveis pra dentro de cada parte
const NIVEIS = 3
function posicoes(faixa) {
  const base = faixa.parentElement.getBoundingClientRect().top
  const m = new Map()
  const anda = (el, n) => { m.set(el, el.getBoundingClientRect().top - base); if (n < NIVEIS) for (const f of el.children) anda(f, n + 1) }
  for (const p of empurrados(faixa)) anda(p, 0)
  return m
}
// o quanto uma parte andou: o deslocamento que a maior parte do que ela tem
// dentro (e ela mesma) teve, em meio pixel — o que nasceu agora não vota, e o
// que saiu não está mais lá; null quando nada do que ela tem estava lá antes
function deslocamento(el, antes, base) {
  const votos = new Map()
  const anda = (e, n) => {
    const t = antes.get(e)
    if (t !== undefined) { const dy = Math.round((t - (e.getBoundingClientRect().top - base)) * 2) / 2; votos.set(dy, (votos.get(dy) ?? 0) + 1) }
    if (n < NIVEIS) for (const f of e.children) anda(f, n + 1)
  }
  anda(el, 0)
  let melhor = null, n = 0
  for (const [dy, k] of votos) if (k > n) { melhor = dy; n = k }
  return melhor
}
const vai = (el, de, ate, ms, curva) => el.animate([{ transform: de }, { transform: ate }], { duration: ms, easing: curva })

// a faixa que nasce: tudo medido antes de qualquer coisa se mover; a
// faixa desce de -100% a 0, e cada parte empurrada vai de onde estava a 0 — e,
// dentro dela, o filho que andou diferente dela, pela diferença
function descer(faixa, antes, ms, curva) {
  const base = faixa.parentElement.getBoundingClientRect().top
  const passos = []
  for (const p of empurrados(faixa)) {
    const dp = deslocamento(p, antes, base)
    if (dp == null) continue
    if (Math.abs(dp) >= 1) passos.push([p, dp])
    for (const f of p.children) {
      if (foraDoFluxo(f)) continue
      const df = deslocamento(f, antes, base)
      if (df != null && Math.abs(df - dp) >= 1) passos.push([f, df - dp])
    }
  }
  vai(faixa, 'translateY(-100%)', 'none', ms, curva)
  for (const [el, dy] of passos) vai(el, `translateY(${dy}px)`, 'none', ms, curva)
}

// o que a faixa diz à esquerda: o LED, e o serial com a placa (aberta) ou só o fato
function identidade(estado, { serial, placa, semAtivo, fato }) {
  return (
    <div className="ds-faixa-id">
      <Led estado={LED[estado]} />
      {estado === 'aberta' ? (
        <>
          <span className="ds-faixa-serial">{serial}</span>
          <span className="ds-faixa-divisor" aria-hidden="true" />
          <span className={`ds-faixa-placa ${semAtivo ? 'ds-faixa-sem-ativo' : ''}`}>{placa}</span>
        </>
      ) : (
        <span className="ds-faixa-fato">{fato}</span>
      )}
    </div>
  )
}

// `acaoDesabilitada` (a lei 17, *desabilitado é tinta apagada*): nos processos, o ENCERRAR
// faz o mesmo que o voltar do Android; onde o voltar não faz nada (a releitura da CAN, o semear, a
// recuperação da T09 — T08, T10 e T09), ele fica desabilitado de verdade e em --tinta-apagada, sem o
// pressionado; o motivo já está escrito na tela. Na pré-checagem correndo a faixa ainda não existe: ela só
// aparece depois que a pré-checagem aprova (logica.md, O voltar do Android)
// `ausente`: a faixa que ainda não nasceu nesta tela — montada, sem caixa; quando deixa de ser, desce.
// `revela`: na faixa sem sessão que chega no lugar da aberta — a aberta sobe por cima dela e some.
export function Faixa({ estado = 'aberta', lugar = 'tela', serial, placa, semAtivo = false, fato, acao, aoEncerrar, rotuloAcao, forcaToque = false, acaoDesabilitada = false, ausente = false, revela = false }) {
  const ref = useRef(null)
  const fantasma = useRef(null)
  const pintada = useRef(false)   // o primeiro quadro da tela já pintou: o que muda depois é o que se move
  const antes = useRef(null)      // onde estava o que vem embaixo, enquanto a faixa não nasce
  const anterior = useRef({ ausente, estado, serial, placa, semAtivo, acao })
  const [saindo, setSaindo] = useState(null)   // a aberta que sobe

  useLayoutEffect(() => {
    const q = requestAnimationFrame(() => { pintada.current = true })
    return () => cancelAnimationFrame(q)
  }, [])
  useLayoutEffect(() => {
    const el = ref.current
    const a = anterior.current
    anterior.current = { ausente, estado, serial, placa, semAtivo, acao }
    if (ausente) { antes.current = posicoes(el); return }
    const medido = antes.current
    antes.current = null
    const { ms, curva } = movimento()
    if (!pintada.current || ms <= 0) return
    if (a.ausente && medido) descer(el, medido, ms, curva)
    else if (revela && lugar === 'tela' && a.estado === 'aberta' && estado === 'sem-sessao') setSaindo({ serial: a.serial, placa: a.placa, semAtivo: a.semAtivo, acao: a.acao })
  })
  useLayoutEffect(() => {
    if (!saindo) return undefined
    const { ms, curva } = movimento()
    const an = vai(fantasma.current, 'none', 'translateY(-100%)', ms, curva)
    an.finished.then(() => setSaindo(null), () => {})
    return () => an.cancel()
  }, [saindo])

  if (ausente) return <div ref={ref} className="ds-faixa ds-faixa-ausente" aria-hidden="true" />
  return (
    <div ref={ref} className={`ds-faixa ds-faixa-${estado} ${lugar === 'menu' ? 'ds-faixa-menu' : ''}${saindo ? ' ds-faixa-revela' : ''}`}>
      {identidade(estado, { serial, placa, semAtivo, fato })}
      {acao && (
        <button type="button" className={`ds-faixa-acao ds-com-camadas ${forcaToque ? 'ds-forca-toque' : ''} ${acaoDesabilitada ? 'ds-faixa-acao-desabilitada' : ''}`}
          aria-label={rotuloAcao} onClick={acaoDesabilitada ? undefined : aoEncerrar} disabled={acaoDesabilitada || undefined}>
          <Camadas>{acao}</Camadas>
        </button>
      )}
      {saindo && (
        // a aberta de antes, por cima: muda pro leitor e fora do toque, só até sair
        <div ref={fantasma} className="ds-faixa ds-faixa-aberta ds-faixa-saindo" aria-hidden="true" inert="">
          {identidade('aberta', saindo)}
          {saindo.acao && <span className="ds-faixa-acao"><Camadas>{saindo.acao}</Camadas></span>}
        </div>
      )}
    </div>
  )
}
