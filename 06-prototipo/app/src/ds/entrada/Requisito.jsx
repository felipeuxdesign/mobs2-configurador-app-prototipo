// Os requisitos da senha (folha 6, T01): cada regra numa linha de 40, com a
// marca à esquerda — o círculo apagado enquanto falta, o check lima quando a
// senha cumpre (Lei 4: exceção declarada, o check vive solto). Ao cumprir, o
// check entra e o texto clareia em 150ms (T01 animacao.md): cor não anima,
// então são duas camadas que trocam por opacity. `nota` é o que só se confere
// depois (T01: "confere ao salvar"). Requisitos é a lista: tira a divisória
// da última linha.
import { Glifo, Icone, ESTADOS } from '../index.js'
import './Requisito.css'

export function Requisito({ texto, cumprido = false, nota }) {
  return (
    <div className={`ds-requisito ${cumprido ? 'ds-requisito-cumprido' : ''}`}>
      <span className="ds-requisito-marca">
        <span className="ds-requisito-falta" aria-hidden={cumprido || undefined}><Glifo estado="requisito-falta" poco={26} /></span>
        <span className="ds-requisito-check" role="img" aria-label={ESTADOS.ok.nome} aria-hidden={!cumprido || undefined}>
          <Icone nome="requisito" tam={16} cor="lima" />
        </span>
      </span>
      {/* T01: o texto do documento é um só (o que o leitor e a régua dos
          textos leem); a camada clara o repete por CSS (data-texto), como o Link */}
      <span className="ds-requisito-texto">
        <span className="ds-requisito-texto-falta">{texto}</span>
        <span className="ds-requisito-texto-cumprido" aria-hidden="true" data-texto={texto} />
      </span>
      {nota && <span className="ds-requisito-nota">{nota}</span>}
    </div>
  )
}

export function Requisitos({ children }) {
  return <div className="ds-requisitos">{children}</div>
}
