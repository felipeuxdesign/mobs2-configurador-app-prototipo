// A linha tocável solta (folha 1): o estado de toque de toda linha — normal
// e pressionado (R-12). Sem hover; o pressionado entra no toque e solta em 100ms.
//
// titulo, valor, estado (o glifo do Glifo no poço de 26; 'espera' por padrão),
// aoTocar, rotulo (o nome pro leitor de tela; o texto visível, se faltar),
// forcaToque: fotografa o pressionado parado (ds-forca-toque)
import { useState } from 'react'
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import './LinhaTocavel.css'

// variante (T06/02): 'padrao' (a folha 1) ou 'acao' — a linha de
// ação solta, de 50 e sem poço: o que se pede em 14/600 e, à direita, o que
// acompanha em 12 apagado (T06/02 'anexa os dois'; a T13/07 não a usa: pela
// decisão 39, o não conforme é a caixa da Justificativa)
//
// registrado (T06/07): a linha de ação depois do toque vira o registro do
// pedido, no mesmo cartão de 50 — não é tocável (nem botão pro leitor de
// tela): o glifo `estado`, de 14, no poço de 32 (o poço na linha: o cartão de 50
// que age como linha leva o de 32) e,
// empilhados, o que ficou feito
// (titulo, 15/600) e o que acontece agora (valor, 12 secundário). Quando a
// linha vira o registro na frente de quem olha, o conteúdo novo esmaece em
// 150ms (T06 animacao.md); aberta já registrada (a URL, o print), aparece parada.
export function LinhaTocavel({ titulo, valor, estado = 'espera', nomeGlifo, aoTocar, rotulo, desabilitado = false, forcaToque = false, variante = 'padrao', registrado = false, className = '' }) {
  const acao = variante === 'acao'
  // o que a linha era na última vez: só a troca pro registro esmaece, nunca a abertura
  const [antes, setAntes] = useState(registrado)
  const [trocou, setTrocou] = useState(false)
  if (antes !== registrado) { setAntes(registrado); setTrocou(registrado) }
  if (acao && registrado) {
    return (
      <div role="status" className={`ds-linha-tocavel ds-linha-tocavel-acao ds-linha-tocavel-registro ${trocou ? 'ds-linha-tocavel-registro-entra' : ''} ${className}`}>
        <Poco tam={32}><Glifo estado={estado} poco={24} nome={nomeGlifo} /></Poco>
        <span className="ds-linha-tocavel-registro-texto">
          <span className="ds-linha-tocavel-registro-titulo">{titulo}</span>
          {valor != null && <span className="ds-linha-tocavel-registro-valor">{valor}</span>}
        </span>
      </div>
    )
  }
  return (
    <Tocavel className={`ds-linha-tocavel ${acao ? 'ds-linha-tocavel-acao' : ''} ${forcaToque ? 'ds-forca-toque' : ''} ${className}`} rotulo={rotulo} aoTocar={aoTocar} desabilitado={desabilitado}>
      {!acao && <Poco tam={26}><Glifo estado={estado} poco={26} nome={nomeGlifo} /></Poco>}
      <span className="ds-linha-tocavel-titulo">{titulo}</span>
      {valor != null && <span className="ds-linha-tocavel-valor">{valor}</span>}
    </Tocavel>
  )
}
