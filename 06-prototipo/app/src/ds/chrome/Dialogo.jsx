// O diálogo (folha 2): só pra ação que encerra trabalho. A caixa
// --fundo-faixa com borda --borda-poco, o título de 20, as frases e as ações
// (o primário e, se houver, a saída). Três desenhos, cada um como a referência
// desenha:
//   diálogo            · a saída de 44 (`saidaDe44`), ações a 6 do texto e o Cancelar
//                        a 8 do primário, comendo 4 embaixo (T04/06)
//   diálogo sem saída  · uma ação só, sem `saida` (T01/09)
//   diálogo com ciência · o checkbox da `ciencia`; o primário espera o check (T13/10)
// O toque (decisão 38): a saída fica a 8 do primário, com o desenho de 44, e o
// toque de 48 cresce só pra baixo, pro lado livre — a saída de sempre
// come 5 embaixo, como o link do rodapé (T04/09, 13, T13/10), e a de 44, 4.
// `margem`: o ar em volta da caixa, 16 (T01, T13), 20 (os diálogos da folha da
// T04, 06 e 09) ou 24 (o aviso do acesso, sem saída, sobre o menu inteiro, T04/12;
// o Encerrar antes de terminar?, T04/13 e por cima de cada tela com a faixa; outro
// usuário no aparelho, T01/18, sobre a T02), dentro do Veu (de 'dialogo'). Nasce esmaecendo e crescendo de 98% a 100% em 150ms.
// Pro leitor: diálogo modal, com o nome no título que já se vê.
import { useContext, useId } from 'react'
import { Primario } from '../primitivos/Primario.jsx'
import { Link } from '../primitivos/Link.jsx'
import { Checkbox } from '../primitivos/Checkbox.jsx'
import { PresencaPorCima } from './PorCima.jsx'
import './Dialogo.css'

export function Dialogo({
  titulo, children, primario, aoPrimario, primarioDesabilitado = false, rotuloPrimario,
  saida, aoSair, saidaDe44 = false, ciencia, ciente = false, aoMudarCiencia,
  margem = 16, aberto: abertoDaTela,
}) {
  // aberto: a tela diz, ou, sem ela, a presença em volta (PorCima.jsx); sem nenhuma das duas, aberto
  const presenca = useContext(PresencaPorCima)
  const aberto = abertoDaTela ?? presenca?.aberta ?? true
  const id = useId()
  const esperaCheck = Boolean(ciencia) && !ciente
  return (
    <div className={`ds-dialogo-lugar ds-dialogo-lugar-${margem}`}>
      <div role="dialog" aria-modal="true" aria-labelledby={id} className={`ds-dialogo ${aberto ? '' : 'ds-dialogo-fechado'}`}>
        <h2 id={id} className="ds-dialogo-titulo">{titulo}</h2>
        {children}
        {ciencia && <Checkbox marcado={ciente} aoMudar={aoMudarCiencia}>{ciencia}</Checkbox>}
        <div className={`ds-dialogo-acoes ${saidaDe44 ? 'ds-dialogo-acoes-44' : ''}`}>
          {/* no diálogo com ciência, o primário que espera o check acende por uma camada quando ele é marcado */}
          <Primario desabilitado={primarioDesabilitado || esperaCheck} aoTocar={aoPrimario} rotulo={rotuloPrimario} acende={Boolean(ciencia)}>{primario}</Primario>
          {saida && <Link aoTocar={aoSair}>{saida}</Link>}
        </div>
      </div>
    </div>
  )
}

// a peça que o PorCima reconhece: o diálogo nasce no meio (a folha sobe do pé)
Dialogo.porCima = 'dialogo'

// a frase do diálogo: 14/500 em --tinta-forte
export function Frase({ children }) {
  return <p className="ds-dialogo-frase">{children}</p>
}

// o número ou o serial dentro da frase: 700 em --tinta
export function Destaque({ children }) {
  return <strong className="ds-dialogo-destaque">{children}</strong>
}
