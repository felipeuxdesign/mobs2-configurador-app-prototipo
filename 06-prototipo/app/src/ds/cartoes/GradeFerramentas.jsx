// A grade do menu (T04): duas colunas de cartões de ferramenta; o cartão
// largo ocupa a linha inteira. `folga`: o espaço entre os cartões — 12 na
// folha 4, 10 no menu da T04.
import './GradeFerramentas.css'

export function GradeFerramentas({ folga = 12, children }) {
  return <div className={`ds-grade-ferramentas ${folga === 10 ? 'ds-grade-ferramentas-10' : ''}`}>{children}</div>
}
