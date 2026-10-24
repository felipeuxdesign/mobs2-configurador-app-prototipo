// A peça que só a T04 desenha: o cartão do que a sessão prendeu, no
// alto da folha do módulo conectado (10) e da folha do ativo da sessão (11).
// O ícone de ferramenta em lima num poço de 44, a identidade (o serial ou a
// placa) e, embaixo, as linhas do detalhe que o mock dá. Não se toca: é o
// fato; quem age é o `Encerrar a sessão` da folha. Montado com as peças do
// design system (Poco, Icone); o texto vem de quem monta.
import { Poco, Icone } from '../../ds/index.js'
import './pecas.css'

export function CartaoPreso({ icone, identidade, detalhes }) {
  return (
    <div className="t04-preso">
      <Poco tam={44}><Icone nome={icone} cor="lima" className="t04-preso-icone" /></Poco>
      <span className="t04-preso-textos">
        <span className="t04-preso-identidade">{identidade}</span>
        {detalhes.map((d) => <span key={d} className="t04-preso-detalhe">{d}</span>)}
      </span>
    </div>
  )
}
