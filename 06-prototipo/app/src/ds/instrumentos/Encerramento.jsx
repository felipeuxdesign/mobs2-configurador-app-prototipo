// O encerramento (folha 5 · a cadeia do encerramento, oito passos): os
// passos que fecham a sessão, ligados pelo trilho, no poço de 32. Cada passo:
// o nome e, à direita, a situação (gravados, voltou, relendo, —, pulado).
// A legenda só aparece no passo que corre (quem passa `legenda` é a tela).
// Estados de passo: ok · agora (o que corre) · energia (é com você: o único
// passo em que o técnico age) · espera · pulado (sem homologar: o traço) ·
// xis (a assertiva que falhou).
// `justo`: a tela abre espaço pro corte ou pro sem homologar — o passo baixa
// de --encerramento-passo pra --encerramento-passo-justo.
// O movimento fino: a legenda que
// passa ao passo que corre, depois de a peça abrir, esmaece no lugar, em
// --mov-rapido, desacelerando — é o que é novo. O espaço muda direto, como toda
// linha que ganha o que acrescenta (Lei 3): a do passo que fechou sai
// de uma vez, e as de baixo não deslizam. Aberta já no passo (a URL, o palco, a
// coluna, o print), parada. O check do passo que fecha é do Trilho (o Glifo).
import { useLayoutEffect, useRef } from 'react'
import { Trilho } from './Trilho.jsx'
import './Encerramento.css'

// a legenda guarda, desde que nasce, se nasceu depois de a peça abrir
function Legenda({ texto, nasce }) {
  const surge = useRef(nasce)
  return <span className={`ds-encerramento-legenda${surge.current ? ' ds-encerramento-legenda-surge' : ''}`}>{texto}</span>
}

// T16/06: +estado 'pausa' — a cadeia da sessão interrompida, no
// desenho do encerramento: o bloco em que ela parou leva a pausa no poço, o
// nome e o 'parou aqui' em --tinta, como o que corre, e o trilho de baixo fica
// na divisória (o que vem depois não passou).
const TOM = { ok: 'feito', agora: 'corre', energia: 'corre', xis: 'falha', pausa: 'corre' }

export function Encerramento({ passos, justo = false }) {
  // aberta: o primeiro quadro já pintou (o que se acerta antes dele abre parado)
  const aberta = useRef(false)
  useLayoutEffect(() => {
    const q = requestAnimationFrame(() => { aberta.current = true })
    return () => cancelAnimationFrame(q)
  }, [])
  return (
    <div className={`ds-encerramento ${justo ? 'ds-encerramento-justo' : ''}`}>
      {passos.map((p, i) => {
        const ultimo = i === passos.length - 1
        return (
          <div key={p.nome} className={`ds-encerramento-passo ds-encerramento-${TOM[p.estado] ?? 'resto'} ${ultimo ? 'ds-encerramento-ultimo' : ''}`}>
            <Trilho estado={p.estado} poco={32} ultimo={ultimo} nomeGlifo={p.nomeGlifo} />
            <div className="ds-encerramento-texto">
              <span className="ds-encerramento-coluna">
                <span className="ds-encerramento-nome">{p.nome}</span>
                {p.legenda != null && <Legenda texto={p.legenda} nasce={aberta.current} />}
              </span>
              <span className="ds-encerramento-situacao">{p.situacao}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
