// O link (folha 1): 48 de toque, 15/500 em --tinta-secundaria; no toque, vira
// --tinta. A cor não anima (só transform e opacity): são duas camadas, e a do
// toque entra por opacity e solta em 100ms. No rodapé e no diálogo
// (decisão 38), quem usa dá o desenho de 44, a 8 do primário, e o toque de 48
// cresce só pra baixo (Rodape.css, Dialogo.css).
import { useState } from 'react'
import { Glifo } from './Glifo.jsx'
import './Link.css'

// T03: quando o texto é uma frase, a camada do toque o repete por CSS
// (data-texto), e o texto do documento fica um só — o que o leitor e a régua
// dos textos leem. O desenho é o mesmo.
//
// T14/06: `registrado` — o link depois do toque vira o registro do
// pedido, no mesmo lugar e do mesmo tamanho (os 48): não é tocável (nem
// botão pro leitor de tela, é um aviso de status), e mostra o glifo `estado` (o
// relógio, de 14) e o que ficou feito, os dois em --tinta-apagada, a 8 um do
// outro. Como a linha de ação registrada da T06: quando vira na frente de quem
// olha, o conteúdo esmaece em 150ms; aberto já registrado, aparece parado.
//
// A lei 17: `desabilitado` — o link que não pode agir agora
// fica no lugar, em --tinta-apagada e sem o pressionado, desabilitado de
// verdade (o Voltar ao menu enquanto o semear da T10 corre).
export function Link({ children, aoTocar, rotulo, desabilitado = false, registrado = false, estado = 'relogio', nomeGlifo, className = '', trocaTexto = false }) {
  // o que o link era na última vez: só a troca pro registro esmaece, nunca a abertura
  const [antes, setAntes] = useState(registrado)
  const [trocou, setTrocou] = useState(false)
  if (antes !== registrado) { setAntes(registrado); setTrocou(registrado) }
  const frase = typeof children === 'string' ? children : undefined
  // `trocaTexto` (o link que muda com o primário — o Tirar de novo da T13, decisão 63): o texto
  // novo esmaece no lugar, em --mov-rapido, como o do primário; o de antes sai de uma vez
  const [vez, setVez] = useState({ texto: frase, n: 0 })
  if (frase !== vez.texto) setVez({ texto: frase, n: vez.n + 1 })
  const nasce = trocaTexto && vez.n > 0
  if (registrado) {
    return (
      <span role="status" className={`ds-link ds-link-registro ${trocou ? 'ds-link-registro-entra' : ''} ${className}`}>
        <Glifo estado={estado} poco={24} nome={nomeGlifo} />
        <span className="ds-link-registro-texto">{children}</span>
      </span>
    )
  }
  return (
    <button type="button" className={`ds-link ${className}`} aria-label={rotulo} disabled={desabilitado} onClick={aoTocar}>
      <span key={trocaTexto ? vez.n : undefined} className={`ds-link-texto${nasce ? ' ds-link-texto-nasce' : ''}`}>{children}</span>
      <span className="ds-link-toque" aria-hidden="true" data-texto={frase}>{frase == null ? children : null}</span>
    </button>
  )
}
