// O primário (folha 1): 56 de alto, roxo com o texto lima (Lei 1 e 8).
// Pressionado: o roxo clareia e afunda 2%. Desabilitado: sem roxo, diz o que
// está acontecendo. Um por tela.
import { useLayoutEffect, useRef, useState } from 'react'
import { emToque } from '../chrome/Troca.jsx'
import { RITMOS } from '../../estado/ritmos.js'
import './Primario.css'

// `inerte` (T10·4): não responde por um instante, com o mesmo desenho e o
// mesmo texto — o semear da calibração, enquanto o número rola e o módulo relê.
//
// O movimento fino. O primário que troca depois de a tela montar mostra a
// troca no lugar; aberto já no quadro (a URL, o palco, a coluna, o print), parado.
// A tela diz quando (a linha dela pede); a peça diz como, igual em todo lugar,
// por uma regra só: com o mesmo texto, camada; com
// outro texto, o texto esmaece e o roxo troca direto.
// · `acende`: o botão que acende com o mesmo texto — o desabilitado que
//   passa a aceso, o Confirmo da T06, o Estou ciente da T13, o fim de um processo
//   — acende por uma camada: o rosto apagado de antes fica por cima e esmaece em
//   --mov-rapido, e o aceso aparece por baixo; é a cor que passa. Quando o texto
//   troca junto (o fim da pré-checagem da T05, da cadeia da T09, do semear da
//   T10, a falha da leitura da T07), não há camada: é o gesto do `trocaTexto`,
//   que a peça faz sozinha.
// · `trocaTexto` (o botão que diz o que falta — a T01, a T02, a T13):
//   o texto novo esmaece no lugar, em --mov-rapido; o de antes sai de uma vez, e o
//   roxo troca direto.
// · sempre: o botão que se desabilita no mesmo toque perde o roxo do
//   pressionado de uma vez — o desabilitado não tem roxo —, e só o afundar solta.
//   O que se desabilita troca direto, sem camada: é a resposta ao toque.
// O rosto de antes é só desenho (o texto dele no CSS, como o Link): não se lê.
//
// Um toque não vale por dois (decisão 64, movimento.md · Por cima da tela): o
// primário que nasce dentro de um toque — o da folha que o toque abriu, ou o texto
// novo que o toque pôs no mesmo botão — só responde RITMOS.toqueDuploMs depois de
// nascer, o tempo do toque duplo do Android: até lá, o toque não faz nada, nem o
// pressionado, e o segundo toque do dedo não cai no que nasceu embaixo dele (o
// Finalizar instalação que vira Encerrar sessão, T13/11; o Reenviar as cercas
// que abre a folha com o mesmo Reenviar as cercas, T09/13). Não é movimento:
// vale também com reduzir movimento. O que nasce de um processo, ou abrindo a
// tela, responde na hora. Enquanto espera, o botão leva `data-nascendo`.
// `esperaToqueDuplo`: a tela diz que o nascimento é a resposta a um toque mesmo
// quando ele chega um instante depois dele (o texto que troca no fim de um gesto
// curto que o toque começou): a espera vale sem o toque em curso.
export function Primario({ children, aoTocar, desabilitado = false, inerte = false, rotulo, forcaToque = false, acende = false, trocaTexto = false, esperaToqueDuplo = false }) {
  const texto = typeof children === 'string' ? children : null
  // o primário que a tela liga pra mostrar a troca (um dos dois gestos): o texto que troca nele esmaece no lugar
  const gesto = acende || trocaTexto
  // o que a peça já viu: cada troca do rosto (aceso ↔ apagado) e do texto conta uma vez, desde que montou
  const r = useRef(null)
  if (r.current === null) r.current = { texto, desabilitado, vezRosto: 0, vezTexto: 0, capa: false, textoDaCapa: null, textoNasce: false }
  else {
    const antes = r.current
    const trocouRosto = desabilitado !== antes.desabilitado
    const trocouTexto = !Object.is(texto, antes.texto)
    const agora = { ...antes, texto, desabilitado }
    if (trocouRosto) {
      agora.vezRosto = antes.vezRosto + 1
      // acendeu com o mesmo texto: o apagado passou a aceso, e a camada do rosto de antes leva o texto dele
      agora.capa = acende && antes.desabilitado && !desabilitado && !trocouTexto
      agora.textoDaCapa = antes.texto
    }
    if (trocouTexto) {
      agora.vezTexto = antes.vezTexto + 1
      // com outro texto, o novo esmaece no lugar e o roxo troca direto — acendendo ou não
      agora.textoNasce = gesto && texto != null
    }
    r.current = agora
  }
  const { vezRosto, vezTexto, capa, textoDaCapa, textoNasce } = r.current
  // nasceu agora, dentro de um toque: espera o toque duplo passar
  const [nascendo, setNascendo] = useState(false)
  useLayoutEffect(() => {
    // o texto que troca de novo fora de um toque (a digitação, um processo) já não nasce do toque: a espera acaba
    if (!emToque() && !esperaToqueDuplo) { setNascendo(false); return undefined }
    setNascendo(true)
    const espera = setTimeout(() => setNascendo(false), RITMOS.toqueDuploMs)
    return () => clearTimeout(espera)
  }, [texto])
  return (
    <button
      type="button"
      className={`ds-primario ${desabilitado ? 'ds-primario-desabilitado' : ''} ${forcaToque ? 'ds-forca-toque' : ''} ${nascendo ? 'ds-primario-nascendo' : ''}`}
      disabled={desabilitado || inerte}
      aria-label={rotulo}
      data-nascendo={nascendo ? '' : undefined}
      onClick={desabilitado || inerte || nascendo ? undefined : aoTocar}
    >
      <span key={gesto ? vezTexto : undefined} className={`ds-primario-texto${textoNasce ? ' ds-primario-texto-nasce' : ''}`}>{children}</span>
      {capa && <span key={vezRosto} className="ds-primario-antes" aria-hidden="true" data-texto={textoDaCapa ?? undefined} />}
    </button>
  )
}
