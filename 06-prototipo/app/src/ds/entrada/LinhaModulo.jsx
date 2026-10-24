// A linha de módulo (folha 6, T05): o serial à esquerda e a variante à
// direita, na linha dupla de 50. Tocável (o pressionado sobe pra --elevado).
// `apagada` é o módulo que não se escolhe (T05: o não cadastrado): o serial
// cai pra --tinta-apagada e a linha não é tocável.
// T05: duas propriedades nomeadas; sem elas, a linha é a de sempre:
// · `escolha` — a lista de escolha da T05/01: 72 de alto, o marcador de
//   escolha (o Quadrado vazado de 11, decisão 29) no poço de 30 (o traço, mudo, no apagado), o serial em cima
//   da variante e, à direita, `rotuloValor` em cima de `valor`, quando vierem (a T05
//   não os passa: o firmware é do diagnóstico). É rádio (aria-checked), e o marcador fica mudo.
// · `fim` — a última linha da lista, com a folga que a referência desenha no
//   pé do cartão: 56 na busca (T05/00, 04) e 76 na escolha (T05/01).
import { Tocavel, Poco, Glifo, Quadrado } from '../index.js'
import './LinhaModulo.css'
import '../primitivos/Traco.css'

// `marcado`: na lista de escolha, tocar marca o módulo (o quadrado lima)
//   e quem avança é o primário — a linha não navega.
// `falha` (T05/04): a linha do módulo que não respondeu diz isso à direita, em vermelho
// `confirmada` (T05/07): o traço lima embaixo da linha, a conexão confirmada; com
// `desenha`, ele se desenha da esquerda pra direita (o traço que se desenha, movimento.md)
export function LinhaModulo({ serial, variante, aoTocar, rotulo, apagada = false, divisoria = true, escolha = false, marcado = false, rotuloValor, valor, falha, confirmada = false, desenha = false, fim = false }) {
  const classe = [
    'ds-linha-modulo', escolha ? 'ds-linha-modulo-escolha' : '', confirmada ? 'ds-linha-modulo-confirmada' : '', apagada ? 'ds-linha-modulo-apagada' : '',
    divisoria ? '' : 'ds-sem-divisoria', fim ? 'ds-linha-modulo-fim' : '',
  ].filter(Boolean).join(' ')
  const conteudo = escolha ? (
    <>
      <Poco tam={30} aria-hidden="true">{apagada ? <Glifo estado="traco" /> : <Quadrado escolhido={marcado} />}</Poco>
      <span className="ds-linha-modulo-corpo">
        <span className="ds-linha-modulo-serial">{serial}</span>
        <span className="ds-linha-modulo-variante">{variante}</span>
      </span>
      {falha != null && <span className="ds-linha-modulo-falha">{falha}</span>}
      {confirmada && <span className={`ds-linha-modulo-traco ${desenha ? 'ds-traco-desenha' : ''}`} aria-hidden="true" />}
      {valor != null && (
        <span className="ds-linha-modulo-coluna">
          <span className="ds-linha-modulo-rotulo">{rotuloValor}</span>
          <span className="ds-linha-modulo-valor">{valor}</span>
        </span>
      )}
    </>
  ) : (
    <>
      <span className="ds-linha-modulo-serial">{serial}</span>
      <span className="ds-linha-modulo-variante">{variante}</span>
    </>
  )
  if (apagada) return <div className={classe}>{conteudo}</div>
  const radio = escolha ? { role: 'radio', 'aria-checked': marcado } : {}
  return <Tocavel className={classe} rotulo={rotulo} aoTocar={aoTocar} {...radio}>{conteudo}</Tocavel>
}
