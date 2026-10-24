// O vazio declarado (folha 4): quando não há nada, a tela diz o que isso
// significa — tracejado, título e uma frase, sem ícone (T12, T15; e a busca
// sem resultado, com o termo no título, T02/03 e T06/08).
import './caixas.css'
import './Vazio.css'

// (o vazio da busca de módulos da T05/03 não é este: é peça da tela, em
// src/telas/T05/pecas.jsx, como o tela.md dela diz)
export function Vazio({ titulo, frase }) {
  return (
    <div className="ds-vazio ds-caixa-apagada">
      <span className="ds-vazio-titulo">{titulo}</span>
      {frase != null && <p className="ds-vazio-frase">{frase}</p>}
    </div>
  )
}
