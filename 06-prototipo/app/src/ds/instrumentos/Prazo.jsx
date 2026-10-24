// O prazo (folha 5 · cronômetro e prazo cheio, T14): o tempo drena (Lei 6).
// O cabeçalho (o rótulo e a nota da fila), o tempo que resta em 62, a escala
// de 0 ao limite com o preenchido do que resta e o marcador nele, as duas
// marcas embaixo e, se houver, a frase do que está acontecendo.
// `restante` e `limite` em segundos; `tempo` é o texto do número (1:36).
import { useEffect, useState } from 'react'
import { Escala } from './Escala.jsx'
import './caixas.css'
import './Prazo.css'

// T14: duas propriedades nomeadas; sem elas, o prazo é o de sempre:
// · `falha` — o prazo estourou (T14/02): o número em vermelho. Sem o que resta,
//   a escala fica sem o preenchido, com o marcador no zero.
// · `detalhe` como lista — as frases do que o estado quer dizer, uma por linha
//   (uma frase { texto, tom: 'falha' } sai em --vermelho, a segunda falha do evento, T14/09),
//   na entrelinha da legenda ('A Seção F reprova.' e 'Os cinco passos…', T14/02).
// O movimento: com `segue` (o tique do prazo, em ms), a barra drena
// contínua — cada tique é um trecho linear da Escala, só por transform; o
// número troca no lugar. Com reduzir, o número troca e a barra salta, no
// mesmo ritmo. Sem `segue`, a barra fica no valor, parada.
// `fila` { resta, ms } (T14/01): a fila do módulo que drena, uma linha fina de 4
// embaixo da frase — o que resta por sair, em fração; com `ms`, esvazia até o zero nesse tempo,
// linear, só por transform (com reduzir, salta). Muda pro leitor: a frase já diz
// `marcador` (T14): onde o marcador branco fica, quando não é o fim do preenchido —
// com o evento chegado, o preenchido para na chegada e o marcador segue o tempo
export function Prazo({ rotulo, nota, tempo, restante, limite, legendas, detalhe, falha = false, segue, fila, marcador }) {
  const [resta, setResta] = useState(fila ? fila.resta : null)
  useEffect(() => {
    if (!fila?.ms) return undefined
    const q = requestAnimationFrame(() => requestAnimationFrame(() => setResta(0)))
    return () => cancelAnimationFrame(q)
  }, [fila?.ms]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={`ds-prazo ds-inst-cartao ${falha ? 'ds-prazo-falha' : ''}`}>
      <div className="ds-inst-cabeca">
        <span className="ds-inst-rotulo">{rotulo}</span>
        {nota != null && <span className="ds-inst-nota">{nota}</span>}
      </div>
      <div className="ds-prazo-numero"><span className="ds-prazo-tempo">{tempo}</span></div>
      <Escala tam="prazo" min={0} max={limite} valor={marcador ?? restante} faixa={restante > 0 ? { de: 0, ate: restante } : null} divisoes={4} fortes={[limite / 2]} segue={segue} />
      <div className="ds-inst-legendas"><span>{legendas.inicio}</span><span>{legendas.fim}</span></div>
      {detalhe != null && (Array.isArray(detalhe)
        ? <span className="ds-prazo-detalhe ds-prazo-frases">{detalhe.map((f) => (typeof f === 'string'
          ? <span key={f}>{f}</span>
          : <span key={f.texto} className={f.tom === 'falha' ? 'ds-prazo-frase-falha' : undefined}>{f.texto}</span>))}</span>
        : <span className="ds-prazo-detalhe">{detalhe}</span>)}
      {fila && (
        <div className="ds-prazo-fila" aria-hidden="true">
          <div className="ds-prazo-fila-resta" style={{ transform: `scaleX(${resta})`, transitionDuration: fila.ms ? `calc(${fila.ms}ms * var(--mov-fator))` : undefined }} />
        </div>
      )}
    </div>
  )
}
