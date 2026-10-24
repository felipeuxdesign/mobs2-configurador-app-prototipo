// As duas camadas do texto tocável do chrome (o ENCERRAR da faixa, a empresa
// da tira): a cor não anima (só transform e opacity), então o texto vem duas
// vezes, e a camada do toque, em --tinta, entra por opacity e solta em 100ms —
// o mesmo desenho do Link. O botão que usa leva a classe
// `ds-com-camadas`. A camada de cima é muda pro leitor.
import './Camadas.css'

// T04: como no Link, quando o texto é uma frase a camada do toque o
// repete por CSS (data-texto), e o texto do documento fica um só — o que o
// leitor e a régua dos textos leem. O desenho é o mesmo.
export function Camadas({ children, className = '' }) {
  const frase = typeof children === 'string' ? children : undefined
  return (
    <span className={`ds-chrome-camadas ${className}`}>
      <span className="ds-chrome-camadas-normal">{children}</span>
      <span className="ds-chrome-camadas-toque" aria-hidden="true" data-texto={frase}>{frase == null ? children : null}</span>
    </span>
  )
}
