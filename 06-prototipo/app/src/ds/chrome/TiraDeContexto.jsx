// A tira de contexto (folha 2): só no menu — a empresa, que abre a troca, e a
// conta, que abre a folha da conta. Os dois botões têm 44 de desenho e 48 de
// toque, por uma área invisível em volta — a da conta cresce só pra cima
// e pro lado, e a caixa dela fica a 8 do ENCERRAR de 44 (decisão 38). No toque, a empresa vai pra
// --tinta (duas camadas) e o avatar apaga, como o só-ícone.
// Com uma empresa só (decisão 56), não há troca: sem `aoTrocarEmpresa`, o nome fica
// sem a seta e não é botão — o mesmo texto, no mesmo lugar.
import { Icone } from '../primitivos/Icone.jsx'
import { Avatar } from './Avatar.jsx'
import { Camadas } from './Camadas.jsx'
import './TiraDeContexto.css'

export function TiraDeContexto({ empresa, aoTrocarEmpresa, rotuloEmpresa, iniciais, rotuloConta, aoAbrirConta }) {
  return (
    <div className="ds-tira-contexto">
      {aoTrocarEmpresa ? (
        <button type="button" className="ds-tira-contexto-empresa ds-com-camadas" aria-label={rotuloEmpresa} aria-haspopup="dialog" onClick={aoTrocarEmpresa}>
          <Camadas className="ds-tira-contexto-empresa-texto">{empresa}</Camadas>
          <Icone nome="abrir" tam={14} cor="marca-limite" />
        </button>
      ) : (
        <span className="ds-tira-contexto-empresa">
          <span className="ds-tira-contexto-empresa-texto">{empresa}</span>
        </span>
      )}
      <button type="button" className="ds-tira-contexto-conta" aria-label={rotuloConta} aria-haspopup="dialog" onClick={aoAbrirConta}>
        <Avatar iniciais={iniciais} tam="tira" />
      </button>
    </div>
  )
}
