// O campo (folha 6): o rótulo em cima e o poço de 54 (--campo) com o texto
// digitado em 17/600. Em foco, o rótulo e o traço de baixo viram lima (Lei 1:
// o campo em foco conta como escolhido) e o traço acende da esquerda pra
// direita (TracoFoco.css). `focado` é o foco que a tela diz; no toque, o foco
// do próprio campo faz o mesmo — e só o dele: o olho dentro do poço não acende
// o campo (um foco só, foco.js). `oculto` é a senha escondida: os pontos com
// --ls-senha; sem ele, a senha visível (folha 6): o texto por extenso, com o
// espaçamento normal. Quando troca entre os dois, o texto esmaece no lugar, em
// --mov-rapido (animacao.md da T01); ao abrir, nada anima. `acao` é o botão só
// de ícone dentro do poço (o olho da senha, que vira o riscado).
//
// `lembrado` é a variante do usuário lembrado (folha 6, T01/16): o xis de
// limpar dentro do poço, no lugar do olho — de 18, em --tinta-secundaria, com o
// traço --traco-limpar —, e o poço sem o recheio da direita, como a folha e a
// T01/16 desenham. `rotuloLimpar` é o nome dele pro leitor; `aoLimpar`, o toque
// (a tela limpa o campo e esquece o usuário).
import { useId, useRef } from 'react'
import { SoIcone } from '../index.js'
import { useFocoDoCampo } from './foco.js'
import './TracoFoco.css'
import './Campo.css'

export function Campo({ rotulo, valor = '', aoMudar, focado = false, oculto = false, acao, lembrado = false, rotuloLimpar, aoLimpar, id, tipo = 'text', onFocus, onBlur, ...resto }) {
  const gerado = useId()
  const foco = useFocoDoCampo(focado, { onFocus, onBlur })
  const idCampo = id ?? gerado
  // a troca entre escondida e visível reinicia a animação trocando o nome dela (a e b),
  // sem remontar o campo — o foco e o cursor ficam onde estão
  const inicial = useRef(oculto); const mudou = useRef(false)
  if (inicial.current !== oculto) mudou.current = true
  const troca = mudou.current ? (oculto ? 'ds-troca-a' : 'ds-troca-b') : ''
  const botao = lembrado ? <SoIcone icone="limpar" tam={18} rotulo={rotuloLimpar} aoTocar={aoLimpar} /> : acao
  return (
    <div className={`ds-campo ${botao ? 'ds-campo-com-acao' : ''} ${lembrado ? 'ds-campo-lembrado' : ''} ${foco.aceso ? 'ds-foco' : ''}`}>
      <label htmlFor={idCampo} className="ds-campo-rotulo">{rotulo}</label>
      <div className="ds-campo-poco ds-traco-foco">
        <input
          id={idCampo}
          className={`ds-campo-entrada ${oculto ? 'ds-campo-oculto' : ''} ${troca}`}
          type={oculto ? 'password' : tipo}
          value={valor}
          onChange={aoMudar ? (e) => aoMudar(e.target.value) : undefined}
          readOnly={!aoMudar}
          {...resto}
          onFocus={foco.aoFocar}
          onBlur={foco.aoSair}
        />
        {botao && <span className="ds-campo-acao">{botao}</span>}
      </div>
    </div>
  )
}
