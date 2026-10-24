// O cartão que pede ação (folha 6, T06 e T15): o erro que precisa do
// técnico. O mesmo poço do bloco escolhido, com o traço vermelho; em cima o
// X e o rótulo em vermelho, no meio o que falhou e por quê, embaixo a ação —
// o botão secundário. O X é o glifo de falha solto ao lado do rótulo, em 22.
import { emLinhas } from '../primitivos/linhas.jsx'
import { Glifo } from '../index.js'
import { BotaoSecundario } from './BotaoSecundario.jsx'
import './CartaoAcao.css'

// `compacto` (T15/02): o cartão com mais de um erro. O que pede
// ação fica menor (título de 17, causa de 13, o botão compacto de 46) e junto
// do botão, num bloco com a divisória embaixo; depois dele, o que a tela
// passa em `children` (os outros erros e a legenda, peças da T15).
// `acaoDesabilitada` (T15/05): a ação que espera — sem rede, o Ressincronizar diz o que espera, apagado e
// desabilitado de verdade (o desligado do botão secundário)
export function CartaoAcao({ rotulo, titulo, descricao, acao, aoAgir, rotuloAcao, compacto = false, acaoDesabilitada = false, children }) {
  const corpo = (
    <div className="ds-cartao-acao-corpo">
      <span className="ds-cartao-acao-titulo">{titulo}</span>
      <span className="ds-cartao-acao-descricao">{emLinhas(descricao)}</span>
    </div>
  )
  const botao = <BotaoSecundario aoTocar={aoAgir} rotulo={rotuloAcao} compacto={compacto} desabilitado={acaoDesabilitada}>{acao}</BotaoSecundario>
  return (
    <div className={`ds-cartao-acao ${compacto ? 'ds-cartao-acao-compacto' : ''}`}>
      <div className="ds-cartao-acao-cabeca">
        <Glifo estado="xis" className="ds-cartao-acao-glifo" />
        <span className="ds-cartao-acao-rotulo">{rotulo}</span>
      </div>
      {compacto
        ? <div className="ds-cartao-acao-item">{corpo}{botao}</div>
        : <>{corpo}{botao}</>}
      {children}
    </div>
  )
}
