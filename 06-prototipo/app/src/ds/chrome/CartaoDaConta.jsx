// O cartão da conta (folha 2, dentro da folha da conta · T04/05): o avatar de
// 52, o nome e, embaixo, o usuário e a empresa.
import { Avatar } from './Avatar.jsx'
import './CartaoDaConta.css'

export function CartaoDaConta({ iniciais, nome, detalhe }) {
  return (
    <div className="ds-cartao-conta">
      <Avatar iniciais={iniciais} tam="conta" />
      <span className="ds-cartao-conta-textos">
        <span className="ds-cartao-conta-nome">{nome}</span>
        <span className="ds-cartao-conta-detalhe">{detalhe}</span>
      </span>
    </div>
  )
}
