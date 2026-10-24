// O contador no canto do cartão (folha 4 · com pendência, folha 7 · contador
// no menu): quantos itens esperam, sem abrir a ferramenta (HU-T04-3).
import './Contador.css'

export function Contador({ valor }) {
  return <span className="ds-contador">{valor}</span>
}
