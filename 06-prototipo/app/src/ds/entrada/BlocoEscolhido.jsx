// O bloco escolhido (folha 6, T05 e T06): o poço grande com o rótulo, a
// identidade em 34 e o detalhe, e o traço de 2 embaixo — lima quando é o
// escolhido, vermelho quando o escolhido trava (a falha mora no escolhido,
// Lei 2). O que a trava acrescenta vem embaixo de um separador:
// · `passos` — o que conferir, alinhado à esquerda (T05: o módulo não respondeu)
// · `motivo` — as frases do porquê, centradas, com o separador curto (T06)
// O estado muda o conteúdo (Lei 3): o bloco é o mesmo, o recheio acompanha.
import './BlocoEscolhido.css'

// T06: duas propriedades nomeadas.
// · `tom` — 'escolhido' (o traço lima, o padrão) · 'neutro' (a trava que tem
//   saída: rótulo em --tinta-secundaria e traço --borda-neutra, T06/05) ·
//   'apagado' (o escolhido que o chassi desmente: rótulo em --tinta-apagada e
//   só a borda do poço, T06/02). `falha` continua valendo o tom da falha.
// · `justo` — o bloco não cresce: fica em cima da prova do vínculo, com 22 em
//   cima e embaixo (18 quando apagado), T06/01, 02 e 03.
export function BlocoEscolhido({ rotulo, identidade, detalhe, falha = false, tom = 'escolhido', justo = false, passos, motivo, className = '', ...resto }) {
  const extra = passos ? 'ds-escolhido-com-passos' : motivo ? 'ds-escolhido-com-motivo' : ''
  const cor = falha ? 'ds-escolhido-falha' : tom === 'neutro' || tom === 'apagado' ? `ds-escolhido-${tom}` : ''
  return (
    <div className={`ds-escolhido ${cor} ${justo ? 'ds-escolhido-justo' : ''} ${extra} ${className}`} {...resto}>
      <span className="ds-escolhido-rotulo">{rotulo}</span>
      <span className="ds-escolhido-identidade">{identidade}</span>
      {detalhe && <span className="ds-escolhido-detalhe">{detalhe}</span>}
      {(passos || motivo) && <span className="ds-escolhido-separador" aria-hidden="true" />}
      {passos?.map((p, i) => (
        <span key={i} className="ds-escolhido-passo">
          <span className="ds-escolhido-passo-titulo">{p.titulo}</span>{` ${p.texto}`}
        </span>
      ))}
      {motivo?.map((frase, i) => <span key={i} className="ds-escolhido-motivo">{frase}</span>)}
    </div>
  )
}
