// Os dados do modelo (folha 4 · decisão 46): o bloco de
// baixo do vínculo, no lugar do chassi. A caixa de poço com os dados do modelo
// do ativo, um embaixo do outro — o rótulo em cima, o valor grande —, com o
// separador entre eles, e a frase do vínculo embaixo (T06/01, 10 e 11). Não
// compara nada e não acende nada: é leitura do cadastro, sem veredito (Lei 1).
// O estado muda o conteúdo (Lei 3): o que muda de um quadro pro outro é só a
// frase — *fica neste ativo*, *passa a ficar*, *o vínculo já existe*.
// `dados`: [{ rotulo, valor }], na ordem da tela (o fabricante e o modelo) ·
// `frase`: a do vínculo, opcional · `antesDoRodape`: a folga de 16 até o
// rodapé, quando o bloco fecha o conteúdo, como a folha e a T06 desenham (a
// mesma da Nota). A caixa cresce até onde a tela deixa (flex-grow), e os dados
// ficam no meio dela.
import { Fragment } from 'react'
import './caixas.css'
import './DadosDoModelo.css'

export function DadosDoModelo({ dados, frase, antesDoRodape = false, className = '' }) {
  return (
    <div className={`ds-dados-modelo ds-caixa-poco ${antesDoRodape ? 'ds-dados-modelo-antes-do-rodape' : ''} ${className}`}>
      {dados.map((d, i) => (
        <Fragment key={d.rotulo}>
          {i > 0 && <span className="ds-dados-modelo-separador" aria-hidden="true" />}
          <div className="ds-dados-modelo-dado">
            <span className="ds-dados-modelo-rotulo">{d.rotulo}</span>
            <span className="ds-dados-modelo-valor">{d.valor}</span>
          </div>
        </Fragment>
      ))}
      {frase != null && <span className="ds-dados-modelo-frase">{frase}</span>}
    </div>
  )
}
