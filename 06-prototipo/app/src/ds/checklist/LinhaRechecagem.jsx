// A linha da re-checagem (folha 7, T15): a Seção F esperando o servidor.
// Não é item de fila (HU-T15-5): o relógio no poço de 30, o ativo, o que
// falta e o prazo da re-checagem à direita.
import { Poco, Glifo } from '../index.js'
import './LinhaRechecagem.css'

export function LinhaRechecagem({ estado = 'relogio', titulo, legenda, prazo }) {
  return (
    <div className="ds-linha-rechecagem">
      <Poco tam={30}><Glifo estado={estado} poco={30} /></Poco>
      <span className="ds-linha-rechecagem-texto">
        <span className="ds-linha-rechecagem-titulo">{titulo}</span>
        <span className="ds-linha-rechecagem-legenda">{legenda}</span>
      </span>
      <span className="ds-linha-rechecagem-prazo">{prazo}</span>
    </div>
  )
}
