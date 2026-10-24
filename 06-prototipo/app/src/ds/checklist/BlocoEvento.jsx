// O bloco do evento de teste (folha 7, T14): o que foi disparado e recebido.
// Um rótulo de bloco e as linhas; cada linha diz o fato e, à direita, o que
// se sabe dele. Os glifos daqui vivem soltos, sem poço (Lei 4, exceção T14).
//   estado 'feito'   → o valor (o horário, "6 de 6")
//   estado 'aguarda' → o relógio: espera o servidor. O nome pro leitor segue o
//                      dado: 'em andamento', ou o `nome` que a linha trouxer
//                      (T14: 'ainda não', antes do disparo)
//   estado 'pronto'  → o traço: é o próximo a acontecer
//   estado 'parado'  → o traço, apagado: não vai acontecer
//   estado 'falha'   → o fato e o valor em vermelho
// O relógio vira o horário esmaecendo (150ms · T14 animacao.md).
import { Glifo } from '../index.js'
import './BlocoEvento.css'

function LinhaEvento({ texto, estado = 'aguarda', valor, nome }) {
  const temValor = estado === 'feito' || estado === 'falha'
  return (
    <div className={`ds-evento-linha ds-evento-${estado}`}>
      <span className="ds-evento-texto">{texto}</span>
      <span className="ds-evento-direita">
        {/* T14: feito, o relógio fica no lugar (invisível, pro valor entrar
            por opacidade) e mudo — o leitor ouve o valor, não um 'em andamento' velho */}
        {(estado === 'aguarda' || estado === 'feito') && (
          <span className="ds-evento-relogio" aria-hidden={estado === 'feito' ? 'true' : undefined}><Glifo estado="relogio" poco={26} nome={nome} /></span>
        )}
        {(estado === 'pronto' || estado === 'parado') && <span className="ds-evento-traco" aria-hidden="true" />}
        <span className="ds-evento-valor">{temValor ? valor : null}</span>
      </span>
    </div>
  )
}

export function BlocoEvento({ rotulo, linhas = [] }) {
  return (
    <div className="ds-evento">
      <span className="ds-evento-rotulo">{rotulo}</span>
      {linhas.map((l) => <LinhaEvento key={l.texto} {...l} />)}
    </div>
  )
}
