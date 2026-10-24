// O prazo do acesso (folha 2, dentro da folha da conta · T04/05): num poço, o
// rótulo, o número que resta e a unidade; a barra do prazo, a escala de 0 ao
// total com o que resta no meio, e a frase do que fazer. Preenchido é o que
// resta (Lei 6): a faixa vermelha vai de 0 ao que resta, e o traço branco
// marca o agora. A fração é a do dado, arredondada ao % inteiro como a folha
// desenha (2 de 7 → 29%). Os riscos marcam os quartos da escala.
import './PrazoDaConta.css'

const QUARTOS = [1, 2, 3]

export function PrazoDaConta({ rotulo, restam, total, unidade, resta, legenda }) {
  const fracao = `${Math.round((100 * restam) / total)}%`
  return (
    <div className="ds-prazo-conta">
      <div className="ds-prazo-conta-cabeca">
        <span className="ds-prazo-conta-rotulo">{rotulo}</span>
        <span className="ds-prazo-conta-valor">{restam}<span className="ds-prazo-conta-unidade">{unidade}</span></span>
      </div>
      <div className="ds-prazo-conta-barra" style={{ '--prazo-resta': fracao }} aria-hidden="true">
        <div className="ds-prazo-conta-resta" />
        <div className="ds-prazo-conta-agora" />
        {QUARTOS.map((q) => (
          <span key={q} className={`ds-prazo-conta-risco ${q === 2 ? 'ds-prazo-conta-risco-meio' : ''}`} style={{ left: `${q * 25}%` }} />
        ))}
      </div>
      <div className="ds-prazo-conta-escala">
        <span>{0}</span>
        <span className="ds-prazo-conta-escala-resta">{resta}</span>
        <span>{total}</span>
      </div>
      <span className="ds-prazo-conta-legenda">{legenda}</span>
    </div>
  )
}
