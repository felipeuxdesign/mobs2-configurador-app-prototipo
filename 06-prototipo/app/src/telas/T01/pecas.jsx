// As peças só da T01: desenhadas nas referências dela e sem linha no
// componentes.md. Montadas com o que o design system já
// tem — o Tocavel, a caixa de poço, o Icone, o traço de foco — e medidas
// contra as referências. A unificação com as peças das folhas está em aberto.
import { Tocavel, Icone, ESTADOS } from '../../ds/index.js'
import '../../ds/cartoes/caixas.css'
import '../../ds/entrada/TracoFoco.css'

// A aba do canal (02, 20, 21): Telefone ou E-mail, lado a lado, na caixa
// de poço de 52. A escolhida acende o traço de baixo e o rótulo em lima — nenhum
// contato aparece nela (o técnico digita o dado embaixo).
export function AbaDoCanal({ rotulo, escolhido = false, aoTocar }) {
  return (
    <Tocavel role="radio" aria-checked={escolhido} aoTocar={aoTocar}
      className={`t01-aba ds-caixa-poco ${escolhido ? 't01-aba-escolhida' : ''}`}>
      <span className="t01-aba-rotulo">{rotulo}</span>
    </Tocavel>
  )
}

// O seletor de país (02, 20): a sigla, o código e a seta pra abrir a folha (a 22).
export function SeletorDoPais({ sigla, codigo, rotulo, aoTocar }) {
  return (
    <Tocavel className="t01-pais ds-caixa-poco" rotulo={rotulo} aoTocar={aoTocar}>
      <span className="t01-pais-sigla" aria-hidden="true">{sigla}</span>
      <span className="t01-pais-codigo" aria-hidden="true">{codigo}</span>
      <Icone nome="abrir-lista" tam={14} cor="apagada" />
    </Tocavel>
  )
}

// O campo do dado (02, 20, 21): o poço de 56, sem rótulo — o nome pro leitor vem
// do canal —, o texto em 700: o telefone em 17 e o e-mail em 16, como a 21 desenha,
// com os números tabulares. O traço de baixo diz o formato: lima quando
// confere (o foco desenhado, como a 20 e a 21), vermelho quando não (a 02), com o
// motivo colado embaixo, fora daqui.
export function CampoDoDado({ valor, aoMudar, rotulo, tipo, falha = false }) {
  return (
    <span className={`t01-dado ds-caixa-poco ds-traco-foco ${falha ? 't01-dado-falha' : 'ds-foco'}`}>
      <input className={`t01-dado-entrada ${tipo === 'email' ? 't01-dado-entrada-email' : ''}`} type={tipo === 'email' ? 'email' : 'tel'} inputMode={tipo === 'email' ? 'email' : 'tel'}
        value={valor} aria-label={rotulo} aria-invalid={falha || undefined} onChange={(e) => aoMudar(e.target.value)}
        autoComplete={tipo === 'email' ? 'email' : 'tel-national'} autoCapitalize="none" spellCheck={false} />
    </span>
  )
}

// A linha do país, na folha do seletor (22): o nome, o código e o check lima do
// escolhido, numa linha de 48. O escolhido tem o nome em --tinta; os outros, em --tinta-forte.
export function LinhaPais({ pais, codigo, escolhido = false, aoTocar }) {
  return (
    <Tocavel role="radio" aria-checked={escolhido} className={`t01-linha-pais ${escolhido ? 't01-linha-pais-escolhida' : ''}`} aoTocar={aoTocar}>
      <span className="t01-linha-pais-nome">{pais}</span>
      <span className="t01-linha-pais-codigo">{codigo}</span>
      <span className="t01-linha-pais-marca">{escolhido && <Icone nome="check" tam={18} cor="lima" />}</span>
    </Tocavel>
  )
}

// O cartão do código (03, 05, 06, 07, 12, 13, 17): o prazo que resta ou as tentativas.
// `falha` acende o traço vermelho embaixo e o rótulo (a falha mora no
// elemento, Lei 2); `numeroFalha` pinta só o número (o vencido, 06: VALE POR 0:00).
export function CartaoDoCodigo({ rotulo, numero, frase, falha = false, numeroFalha = false }) {
  return (
    <div className={`t01-cartao-codigo ds-caixa-poco ${falha ? 'ds-caixa-falha t01-cartao-codigo-falha' : ''}`}>
      <span className="t01-cartao-codigo-rotulo">{rotulo}</span>
      <span className={`t01-cartao-codigo-numero ${numeroFalha ? 't01-cartao-codigo-numero-falha' : ''}`}>{numero}</span>
      {frase != null && <span className="t01-cartao-codigo-frase">{frase}</span>}
    </div>
  )
}

// A linha do código conferido (08): o check solto (Lei 4, a exceção dos
// requisitos da senha), o que foi conferido e o código.
export function LinhaConferido({ texto, valor }) {
  return (
    <div className="t01-conferido-lugar">
      <div className="t01-conferido">
        <span className="t01-conferido-marca" role="img" aria-label={ESTADOS.ok.nome}>
          <Icone nome="requisito" tam={16} cor="lima" />
        </span>
        <span className="t01-conferido-texto">{texto}</span>
        <span className="t01-conferido-valor">{valor}</span>
      </div>
    </div>
  )
}

// O campo da senha nova (08): sem rótulo e sem olho, o texto à vista em
// 20/700, o traço de foco do campo (TracoFoco.css). Pro leitor, o nome é o
// título que já se vê.
export function CampoSenhaNova({ valor, aoMudar, rotuladoPor }) {
  return (
    <div className="t01-senha-nova-lugar ds-foco">
      <div className="t01-senha-nova ds-caixa-poco ds-traco-foco">
        <input className="t01-senha-nova-entrada" type="text" value={valor} aria-labelledby={rotuladoPor}
          onChange={(e) => aoMudar(e.target.value)} autoComplete="new-password" autoCapitalize="none" spellCheck={false} />
      </div>
    </div>
  )
}
