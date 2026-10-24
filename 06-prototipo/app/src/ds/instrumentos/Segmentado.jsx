// O segmentado (folha 5): um segmento por passo. O cabeçalho do passo — o
// rótulo e o contador (o número em branco, o total apagado) —, os segmentos
// e, embaixo, o que vem depois. O segmento do passo atual é branco e mais
// alto; o feito é lima apagado (--lima-feito); o pendente, a borda.
// `segmentos`: um por passo, 'atual' · 'feito' · 'pendente' — e 'atual-feito'
// (T10/01): o passo atual já feito, alto como o atual e lima apagado —
// e 'atual-falha' (T13/09): o passo atual reprovado, alto como o
// atual e em vermelho (a falha mora no elemento que falhou, Lei 2).
// Sem `segmentos`, só o cabeçalho com o rótulo (T13/09): a barrinha
// fica só onde se percorre, e o detalhe de um item automático diz só a seção.
import './Segmentado.css'

// `folga`: o vão entre o cabeçalho, os segmentos e a legenda — 6 (a folha 5)
// ou 8 (a recuperação da T01, como as referências dela desenham).
export function Segmentado({ rotulo, contagem, total, segmentos, legenda, folga = 6 }) {
  return (
    <div className={`ds-segmentado ${folga === 8 ? 'ds-segmentado-folga-8' : ''}`}>
      <div className="ds-segmentado-cabeca">
        <span className="ds-segmentado-rotulo">{rotulo}</span>
        {contagem != null && <span className="ds-segmentado-contador">{contagem} <span className="ds-segmentado-total">{total}</span></span>}
      </div>
      {segmentos && (
        <div className="ds-segmentado-segmentos" aria-hidden="true">
          {segmentos.map((s, i) => <span key={i} className={`ds-segmento ds-segmento-${s}`} />)}
        </div>
      )}
      {legenda != null && <span className="ds-segmentado-legenda">{legenda}</span>}
    </div>
  )
}
