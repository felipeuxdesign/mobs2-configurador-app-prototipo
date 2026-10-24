// O topo do menu inteiro (folha 2): a tira de contexto e a faixa do menu
// juntas, sobre o fundo --poco da tira; a linha de baixo é a da faixa (a
// faixa é uma peça só, 52 com a linha). Quem monta
// passa a TiraDeContexto e a Faixa (lugar 'menu') como filhos.
import './TopoDoMenu.css'

export function TopoDoMenu({ children }) {
  return <div className="ds-topo-menu">{children}</div>
}
