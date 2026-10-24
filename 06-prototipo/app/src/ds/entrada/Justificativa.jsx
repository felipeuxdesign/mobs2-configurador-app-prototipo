// A justificativa (folha 6, T13): o não conforme com o porquê. É o Checkbox
// (primitivo) com a opção e, quando marcado, o campo de texto longo embaixo —
// o estado só abre espaço pro que ele acrescenta (Lei 3).
// Decisão 39 (folha 6, T13/07, 08 e 15): o não conforme é
// uma caixa nas duas telas do item.
// A caixa tem o título e a linha de baixo (`legenda`: *marque e conte o que
// aconteceu*, desmarcada; *conte embaixo o que aconteceu*, marcada — quem monta
// passa a do estado), e o rótulo do campo é *O QUE ACONTECEU*: os textos vêm da tela, do textos.md.
// O movimento fino: marcar depois de a peça abrir,
// o campo que abre embaixo esmaece no lugar, em --mov-rapido, desacelerando; o
// espaço abre direto. Desmarcar faz o mesmo ao contrário: o campo de antes fica
// desenhado no lugar em que estava, por cima, fora do fluxo, mudo e sem toque, e
// esmaece até sumir — o espaço fecha direto. O quadrado é o do Checkbox. Quem
// move a caixa inteira, quando ela muda de lugar na tela, é a tela (a T13, pela
// lista que se reorganiza): o campo vai junto com ela. Aberta já marcada (a URL,
// a coluna, o print), parada; com reduzir movimento, direto.
import { useLayoutEffect, useRef } from 'react'
import { Checkbox } from '../index.js'
import { CampoTexto } from './CampoTexto.jsx'
import './Justificativa.css'

// o tempo e a curva, dos tokens: com reduzir movimento, o tempo é 0
const tempo = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? (/ms$/.test(v) ? n : n * 1000) : 0 }
const tokens = () => {
  const css = getComputedStyle(document.documentElement)
  return { ms: tempo(css.getPropertyValue('--mov-rapido').trim()), curva: css.getPropertyValue('--mov-curva').trim() }
}
const campoDa = (caixa) => caixa?.querySelector(':scope > .ds-campo-texto:not(.ds-justificativa-sai)') ?? null

export function Justificativa({ opcao, legenda, marcado = false, aoMarcar, rotulo, valor, aoEscrever, focado = false }) {
  const caixa = useRef(null)
  const aberta = useRef(false)   // o primeiro quadro já pintou
  const antes = useRef(marcado)
  const sai = useRef(null)       // o campo que vai sair, visto antes de a tela desenhar a mudança
  // desmarcou: antes de o campo sair do DOM, onde ele está e o que ele mostra
  if (aberta.current && antes.current && !marcado && !sai.current) {
    const el = campoDa(caixa.current)
    if (el) {
      const c = caixa.current.getBoundingClientRect(), r = el.getBoundingClientRect()
      const escala = (caixa.current.offsetWidth ? c.width / caixa.current.offsetWidth : 1) || 1
      sai.current = { el, top: (r.top - c.top) / escala, left: (r.left - c.left) / escala, width: r.width / escala, height: r.height / escala }
    }
  }
  useLayoutEffect(() => {
    const q = requestAnimationFrame(() => { aberta.current = true })
    return () => cancelAnimationFrame(q)
  }, [])
  useLayoutEffect(() => {
    const era = antes.current
    antes.current = marcado
    const saindo = sai.current
    sai.current = null
    if (era === marcado || !aberta.current) return
    const { ms, curva } = tokens()
    if (ms <= 0) return
    const anim = { duration: ms, easing: curva }
    const el = caixa.current
    if (marcado) { campoDa(el)?.animate([{ opacity: 0 }, { opacity: 1 }], anim); return }
    if (!saindo || !el) return
    // a cópia do campo de antes, parada no lugar dele, por cima, esmaecendo
    const c = saindo.el.cloneNode(true)
    for (const n of [c, ...c.querySelectorAll('[id]')]) n.removeAttribute('id')
    const texto = saindo.el.querySelector('textarea'), copia = c.querySelector('textarea')
    if (texto && copia) copia.value = texto.value
    c.classList.add('ds-justificativa-sai')
    c.setAttribute('aria-hidden', 'true')
    c.inert = true
    Object.assign(c.style, { top: `${saindo.top}px`, left: `${saindo.left}px`, width: `${saindo.width}px`, height: `${saindo.height}px`, opacity: '0' })
    el.classList.add('ds-justificativa-com-saida')
    el.appendChild(c)
    const fim = () => { c.remove(); if (!el.querySelector('.ds-justificativa-sai')) el.classList.remove('ds-justificativa-com-saida') }
    c.animate([{ opacity: 1 }, { opacity: 0 }], anim).finished.then(fim, fim)
  }, [marcado])
  return (
    <div className="ds-justificativa" ref={caixa}>
      <Checkbox marcado={marcado} aoMudar={aoMarcar} legenda={legenda}>{opcao}</Checkbox>
      {marcado && <CampoTexto rotulo={rotulo} valor={valor} aoMudar={aoEscrever} focado={focado} />}
    </div>
  )
}
