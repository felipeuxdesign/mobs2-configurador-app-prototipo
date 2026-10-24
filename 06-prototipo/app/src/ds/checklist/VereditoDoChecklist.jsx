// O veredito do checklist (folha 7 · decisão 34): o
// topo do checklist homologado, embaixo da barra — o cartão de 58, o check lima
// no poço de 32, o veredito em lima (Lei 1) e o relatório embaixo, em 12.
// Não se toca: é o resultado. O texto vem de quem monta (textos.md).
// surge: o veredito que nasce do toque no Finalizar esmaece no lugar, em
// --mov-rapido (T13 animacao.md); aberto já homologado (a URL, a coluna), parado.
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import './VereditoDoChecklist.css'

export function VereditoDoChecklist({ titulo, relatorio, surge = false }) {
  return (
    <div className={`ds-veredito-ck ${surge ? 'ds-veredito-ck-surge' : ''}`} role="status">
      <Poco tam={32}><Glifo estado="ok" poco={30} /></Poco>
      <span className="ds-veredito-ck-texto">
        <span className="ds-veredito-ck-titulo">{titulo}</span>
        {relatorio && <span className="ds-veredito-ck-relatorio">{relatorio}</span>}
      </span>
    </div>
  )
}
