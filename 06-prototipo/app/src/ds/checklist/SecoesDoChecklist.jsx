// A lista das seis seções do checklist (T13): os cartões um embaixo do outro,
// a 8. Quando uma seção abre ou fecha (a `aberta` muda), o cartão cresce no
// lugar e as de baixo descem — ou sobem — por transform, em --mov-padrao
// (T13 animacao.md, movimento.md: nada que mexa no layout se anima). O
// layout pula direto pro lugar novo; cada cartão que mudou de lugar parte do
// lugar de antes (translateY) e chega ao novo. A primeira pintura não anima.
import { useLayoutEffect, useRef } from 'react'
import './SecaoDoChecklist.css'

// onde cada cartão está, na ordem da lista: o topo dentro dela (o que rolou não conta).
// Dentro dela de verdade: o offsetTop conta do pai posicionado, e o que abre espaço em
// cima da lista no mesmo toque — o veredito do Finalizar — faria as seis deslizarem; o espaço de fora abre direto, e só a seção que abre ou fecha move as de baixo
const topoNa = (c, lista) => (c.offsetParent === lista ? c.offsetTop : c.offsetTop - lista.offsetTop)
const lugares = (lista) => [...lista.children].map((c) => topoNa(c, lista))

export function SecoesDoChecklist({ aberta = null, children }) {
  const ref = useRef(null)
  const antes = useRef(aberta)
  const fotos = useRef(null)
  // a foto de antes sai antes do DOM mudar: no render em que a `aberta` muda, o DOM ainda é o de antes
  if (antes.current !== aberta && ref.current && !fotos.current) fotos.current = lugares(ref.current)
  useLayoutEffect(() => {
    if (antes.current === aberta) return
    antes.current = aberta
    const velhos = fotos.current; fotos.current = null
    const lista = ref.current
    if (!velhos || !lista) return
    const agora = lugares(lista)
    const mexem = [...lista.children].map((c, i) => [c, velhos[i] - agora[i]]).filter(([, d]) => d != null && !Number.isNaN(d) && d !== 0)
    for (const [c, d] of mexem) { c.style.transition = 'none'; c.style.transform = `translateY(${d}px)` }
    void lista.offsetHeight   // o lugar de antes pinta; depois, a transição do CSS leva ao novo
    for (const [c] of mexem) { c.style.transition = ''; c.style.transform = '' }
  }, [aberta])
  return <div className="ds-secoes-ck" ref={ref}>{children}</div>
}
