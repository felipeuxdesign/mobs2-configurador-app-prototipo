// As peças só da T15 — desenhadas nas referências e sem linha no
// componentes.md: o cartão SUBINDO AGORA com a barra do
// envio (01), o erro que reenvia sozinho dentro do cartão que pede ação e a
// legenda dentro do cartão (01, 02). Montadas com os primitivos do DS: a caixa
// de poço, o Poco, o Glifo, o Icone e a Escala.
import { Escala, Icone, Poco, Glifo } from '../../ds/index.js'

// a legenda dentro do cartão: centrada embaixo do que sobe (01), à esquerda
// embaixo dos erros (02)
export function Legenda({ centro = false, children }) {
  return <span className={`t15-legenda ${centro ? 't15-legenda-centro' : ''}`}>{children}</span>
}

// O cartão SUBINDO AGORA (01): o mesmo lugar do cartão que pede ação, na caixa
// de poço, com o traço lima de 2 embaixo (Lei 1: exceção proposta).
// A seta faz o papel do glifo do cartão, solta ao lado do rótulo; o rótulo diz
// o que ela diz, e ela fica muda pro leitor. A barra enche com o que já subiu
// (Lei 6), e os riscos marcam os quartos (Lei 5: exceção declarada do envio).
export function Subindo({ rotulo, titulo, pct, unidade, tamanho, legenda }) {
  return (
    <div className="t15-subindo ds-caixa-poco">
      <div className="t15-subindo-cabeca">
        <Icone nome="subindo" tam={20} cor="tinta" />
        <span className="t15-subindo-rotulo">{rotulo}</span>
      </div>
      <div className="t15-subindo-item">
        <span className="t15-subindo-titulo">{titulo}</span>
        <div className="t15-subindo-numeros">
          <span className="t15-subindo-pct">{pct}<span className="t15-subindo-unidade">{unidade}</span></span>
          <span className="t15-subindo-tamanho">{tamanho}</span>
        </div>
        <Escala tam="envio" semLados min={0} max={100} valor={pct} faixa={{ de: 0, ate: pct }} divisoes={4} fortes={[50]} />
      </div>
      <Legenda centro>{legenda}</Legenda>
    </div>
  )
}

// O erro que reenvia sozinho, dentro do cartão com mais de um erro (02): o
// relógio no poço de 34, a placa e a causa com a próxima tentativa. Não tem
// botão: quem age é o app. O nome do glifo segue o dado, sem rede.
export function ItemQueReenvia({ titulo, causa, nomeGlifo }) {
  return (
    <div className="t15-reenvia">
      <Poco tam={34}><Glifo estado="relogio" poco={30} nome={nomeGlifo} /></Poco>
      <div className="t15-reenvia-texto">
        <span className="t15-reenvia-titulo">{titulo}</span>
        <span className="t15-reenvia-causa">{causa}</span>
      </div>
    </div>
  )
}
