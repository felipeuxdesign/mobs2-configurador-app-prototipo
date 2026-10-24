// Os três instrumentos da T03, no poço (a caixa de poço do design system,
// cartoes/caixas.css): o download correndo (00), o concluído (02) e a idade
// do pacote (03, 04), o elemento-assinatura. Nenhum dos três tem linha no
// componentes.md: são peças desta tela. A barra do download é o
// desenho do placar (Escala, folha 5) sem as bordas dos lados.
import { Escala } from '../../ds/index.js'

// o número de 40 com a unidade junto; `unidadeP` é a unidade de 17 (02, 03, 04)
function Numero({ valor, unidade, unidadeP = false }) {
  return (
    <span className="t03-numero">
      {valor}<span className={`t03-numero-unidade ${unidadeP ? 't03-numero-unidade-p' : ''}`}>{unidade}</span>
    </span>
  )
}

// o download (00): o rótulo, o que baixou do conteúdo acompanhado, a barra e a legenda.
// `segue`: o passo da baixa, em ms (ritmos.js) — a barra dos ativos enche
// linear, um trecho por item, com o marcador junto (Escala · segue); com reduzir, cada
// item salta pro valor dele, no mesmo ritmo. Montar nunca anima
export function Download({ rotulo, feito, de, unidade, total, faltam, segue }) {
  return (
    <div className="t03-instrumento t03-instrumento-download ds-caixa-poco">
      <span className="t03-instrumento-rotulo">{rotulo}</span>
      <Numero valor={feito} unidade={unidade} />
      <Escala tam="placar" semLados min={0} max={de} valor={feito} segue={segue}
        faixa={feito > 0 ? { de: 0, ate: feito } : undefined} divisoes={4} fortes={[de / 2]} />
      <div className="t03-legendas">
        <span>{total}</span><span>{faltam}</span>
      </div>
    </div>
  )
}

// o concluído (02): o rótulo em lima, o total baixado e a validade, o traço lima embaixo
export function Concluido({ rotulo, feito, unidade, frase }) {
  return (
    <div className="t03-instrumento t03-instrumento-concluido ds-caixa-poco">
      <span className="t03-instrumento-rotulo t03-lima">{rotulo}</span>
      <Numero valor={feito} unidade={unidade} unidadeP />
      <span className="t03-instrumento-frase">{frase}</span>
    </div>
  )
}

// a idade do pacote (03, 04): a régua de 0 ao fim, o preenchido é o tempo que
// passou (Lei 6) e o traço do limite; vencido, o rótulo, o limite e o traço
// de baixo acendem em vermelho (Lei 2)
export function Idade({ rotulo, dias, unidade, fim, limite, vencido, legendas }) {
  const pct = (v) => (100 * Math.min(v, fim)) / fim
  return (
    <div className={`t03-instrumento t03-instrumento-idade ds-caixa-poco ${vencido ? 'ds-caixa-falha' : ''}`}>
      <span className={`t03-instrumento-rotulo ${vencido ? 't03-vermelho' : ''}`}>{rotulo}</span>
      <Numero valor={dias} unidade={unidade} unidadeP />
      <div className={`t03-idade ${vencido ? 't03-idade-vencido' : ''}`} aria-hidden="true">
        <div className="t03-idade-preenchido" style={{ '--p': pct(dias) }} />
        <span className="t03-idade-limite" style={{ '--p': pct(limite) }} />
      </div>
      <div className="t03-legendas">
        <span>{legendas.inicio}</span><span className={vencido ? 't03-vermelho' : ''}>{legendas.meio}</span><span>{legendas.fim}</span>
      </div>
    </div>
  )
}
