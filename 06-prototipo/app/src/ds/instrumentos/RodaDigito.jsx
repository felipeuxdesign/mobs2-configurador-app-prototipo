// A roda de dígito — o primitivo do tambor. Uma janela com overflow
// hidden; dentro, a fita com os dígitos 0–9 duas vezes. A roda rola sempre
// pra frente: de 7 pra 2 ela passa pelo 8, 9 e 0 (vai até a casa 12 da fita).
// O translateY é em múltiplos da altura da janela (100% da fita é uma casa),
// em --mov-lento, com o atraso da ordem dela (`ordem` 0 é a unidade) vezes
// --mov-escalonar-tambor: a unidade rola primeiro, e a onda vai pra esquerda.
// Parada, a roda é só o dígito, igual à folha. Duas peles: `texto` (a janela
// é da altura da linha, no meio do texto — o valor em poço da T10) e
// `celula` (a janela é a célula inteira — o hodômetro da T07).
import './RodaDigito.css'

export const FITA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// as casas da fita de um dígito a outro, sempre pra frente
export function passos(de, ate) { return (ate - de + 10) % 10 }

export function RodaDigito({ digito, de = null, ordem = 0, rodada = 0, pele = 'texto' }) {
  if (de == null) return digito
  const casaDe = de, casaAte = de + passos(de, digito)
  return (
    <span className={`ds-roda ds-roda-${pele}`}>
      <span className="ds-roda-segura">{digito}</span>
      <span
        key={rodada}
        className="ds-roda-fita"
        aria-hidden="true"
        style={{ '--de': `${-100 * casaDe}%`, '--ate': `${-100 * casaAte}%`, '--ordem': ordem }}
      >
        {FITA.map((d, i) => <span key={i} className="ds-roda-casa">{d}</span>)}
      </span>
    </span>
  )
}
