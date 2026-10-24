// A linha de opção (folha 6, usada na folha com opções da folha 2): o ícone
// num poço de 30, o que ela faz, o detalhe e o chevron pra onde leva. Linha de
// 72 (--linha-escolha), tocável inteira: no toque sobe pra --elevado.
// O detalhe fica numa linha só e, se não couber, corta com reticências (as
// folhas 2 e 6 novas, decisão 31).
// As linhas moram no CartaoDeOpcoes, com a divisória entre elas. O cartão é a
// Lista da família linhas, não um cartão desenhado de novo.
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Lista } from '../linhas/Lista.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Icone } from '../primitivos/Icone.jsx'
import './LinhaDeOpcao.css'

export function CartaoDeOpcoes({ children }) {
  return <Lista className="ds-cartao-opcoes">{children}</Lista>
}

// icone: um nome do Icone (reenviar, email…)
//
// espera (T01/04 e 11): a linha que espera o reenvio. Sem a propriedade, a
// linha de sempre. Com ela, `espera` é a contagem que se lê no lugar da seta
// ('0:44') — e a linha fica apagada e desabilitada de verdade (sem toque, sem o
// pressionado, 'indisponível' pro leitor) — ou null, quando liberou: a seta e a
// linha acesa. Liberar na frente de quem olha acende a linha em --mov-rapido,
// esmaecendo (T01 animacao.md): a cor não anima, então o que acende são duas
// camadas, a apagada embaixo e a acesa por cima, que troca por opacity. A
// camada apagada do texto é uma cópia vazia, fora do leitor (aria-hidden), que
// o CSS preenche (data-texto), como no Link: o documento e o leitor ficam com
// um texto só. Aberta já esperando ou já liberada, nada anima.
//
// variante 'efeito' (a folha Outras ações, T11/03, decisão 40): a linha da ação que tem o efeito escrito embaixo. Usa a mesma densidade
// da folha do código: 72 no mínimo, recheio 10, folga 12, ícone de 18 no poço
// de 30, título em 16/600 e efeito em 13/500. O efeito pode quebrar linha,
// inteiro, e a seta fica em --tinta-secundaria. Não há variante compacta.
// `seta`: a da T01 é o seguir, de 24 (T01/11); a das outras folhas, a seta das linhas
export function LinhaDeOpcao({ icone, titulo, detalhe, aoTocar, rotulo, forcaToque = false, espera, variante, seta = 'avancar' }) {
  if (espera === undefined) {
    const efeito = variante === 'efeito'
    return (
      <Tocavel className={`ds-linha-opcao ${efeito ? 'ds-linha-opcao-efeito' : ''} ${forcaToque ? 'ds-forca-toque' : ''}`} rotulo={rotulo} aoTocar={aoTocar}>
        <Poco tam={30}><Icone nome={icone} tam={18} cor="secundaria" /></Poco>
        <span className="ds-linha-opcao-textos">
          <span className="ds-linha-opcao-titulo">{titulo}</span>
          <span className="ds-linha-opcao-detalhe">{detalhe}</span>
        </span>
        <Icone nome={seta} tam={16} cor={efeito ? 'secundaria' : 'apagada'} />
      </Tocavel>
    )
  }
  const esperando = espera != null
  return (
    <Tocavel className={`ds-linha-opcao ds-linha-opcao-espera ${esperando ? 'ds-linha-opcao-esperando' : ''} ${forcaToque ? 'ds-forca-toque' : ''}`}
      rotulo={rotulo} aoTocar={aoTocar} desabilitado={esperando}>
      <Poco tam={30}>
        <span className="ds-linha-opcao-camadas">
          <Icone nome={icone} tam={18} cor="marca-limite" className="ds-linha-opcao-apagada" />
          <Icone nome={icone} tam={18} cor="secundaria" className="ds-linha-opcao-acesa" />
        </span>
      </Poco>
      <span className="ds-linha-opcao-textos">
        <span className="ds-linha-opcao-titulo">
          <span className="ds-linha-opcao-acesa">{titulo}</span>
          <span className="ds-linha-opcao-apagada ds-linha-opcao-copia" aria-hidden="true" data-texto={titulo} />
        </span>
        <span className="ds-linha-opcao-detalhe">
          <span className="ds-linha-opcao-acesa">{detalhe}</span>
          <span className="ds-linha-opcao-apagada ds-linha-opcao-copia" aria-hidden="true" data-texto={detalhe} />
        </span>
      </span>
      <span className="ds-linha-opcao-fim">
        {esperando && <span className="ds-linha-opcao-contagem">{espera}</span>}
        <Icone nome={seta} tam={16} cor="apagada" className="ds-linha-opcao-acesa" />
      </span>
    </Tocavel>
  )
}
