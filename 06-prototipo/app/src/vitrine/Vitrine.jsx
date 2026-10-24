// A vitrine do design system: cada peça, uma vez, na moldura de
// espécime das folhas — pra fotografar e comparar com a folha dela.
// Não é o app nem o palco. Cada família registra os seus espécimes num
// arquivo de ./especimes/, exportando `especimes`, agrupados pelas nove folhas.
// A moldura: recheio 16 (a das folhas), 0 com `chrome` e 15 com `tela` — o recorte de
// uma tela, que a folha desenha com o recheio de 15 e o cartão com a largura dela (328).
//
// Pra bancada (scripts/especime.mjs):
//   ?vitrine=1&lista=1                       → a lista dos espécimes comparáveis
//   ?vitrine=1&especime=<id>&medir=1         → um espécime em (0,0) e a medida da moldura
//   ?vitrine=1&especimes=<id>,<id>…&medir=1  → o lote: vários espécimes numa página só,
//     cada moldura levada ao pixel inteiro, e a medida de cada uma
// A medida sai num <pre id="m2cf-out"> que o --dump-dom lê, e só depois de a página
// ficar pronta: o load e as fontes. Antes disso a moldura mede com a fonte reserva.
import { useEffect, useRef } from 'react'
import '../ds/index.js'
import './vitrine.css'

const modulos = import.meta.glob('./especimes/*.jsx', { eager: true })
export const TODOS = Object.values(modulos).flatMap((m) => m.especimes ?? [])

function Moldura({ e }) {
  const tipo = e.chrome ? 'vitrine-moldura-chrome' : e.tela ? 'vitrine-moldura-tela' : ''
  return <div className={`vitrine-moldura ${tipo}`} data-especime={e.id}>{e.render()}</div>
}

// o load, depois o layout (é ele que pede as fontes) e as fontes carregadas
const pronta = () => new Promise((ok) => (document.readyState === 'complete' ? ok() : window.addEventListener('load', ok, { once: true })))
  .then(() => { void document.body.offsetHeight; return document.fonts.ready })

// leva a moldura ao pixel inteiro mais perto, sem mexer no fluxo (position: relative)
function inteira(m) {
  const r = m.getBoundingClientRect()
  const dx = Math.round(r.x) - r.x, dy = Math.round(r.y) - r.y
  if (dx || dy) { m.style.position = 'relative'; m.style.left = `${dx}px`; m.style.top = `${dy}px` }
  const s = m.getBoundingClientRect()
  return { x: s.x + window.scrollX, y: s.y + window.scrollY, w: s.width, h: s.height }
}

export function Vitrine() {
  const q = new URLSearchParams(window.location.search)
  const id = q.get('especime')
  const lote = q.get('especimes')?.split(',').filter(Boolean)
  const ref = useRef(null)
  useEffect(() => {
    if (!q.has('medir') && !q.has('lista')) return
    let vivo = true
    const escreve = (dado) => {
      if (!vivo) return
      const out = document.createElement('pre'); out.id = 'm2cf-out'; out.style.display = 'none'
      out.textContent = JSON.stringify(dado); document.body.appendChild(out)
    }
    if (q.has('lista')) { escreve(TODOS.filter((e) => !e.semBancada).map(({ id, folha, rotulo }) => ({ id, folha, rotulo }))); return }
    pronta().then(() => {
      if (lote) {
        const r = lote.map((x) => { const m = ref.current.querySelector(`.vitrine-moldura[data-especime="${CSS.escape(x)}"]`); return m ? { id: x, ...inteira(m) } : { id: x, erro: 'sem o espécime' } })
        escreve({ H: document.documentElement.scrollHeight, W: document.documentElement.scrollWidth, r })
      } else {
        const m = ref.current.querySelector('.vitrine-moldura')
        if (!m) return escreve({ erro: 'sem o espécime' })
        const r = m.getBoundingClientRect(); escreve({ x: r.x, y: r.y, w: r.width, h: r.height })
      }
    })
    return () => { vivo = false }
  }, [])
  if (lote) {
    return (
      <div className="vitrine vitrine-lote" ref={ref}>
        {lote.map((x) => { const e = TODOS.find((t) => t.id === x); return e ? <Moldura key={x} e={e} /> : null })}
      </div>
    )
  }
  if (id) {
    const e = TODOS.find((x) => x.id === id)
    return <div className="vitrine vitrine-um" ref={ref}>{e ? <Moldura e={e} /> : <p>sem o espécime {id}</p>}</div>
  }
  const folhas = [...new Set(TODOS.map((e) => e.folha))].sort((a, b) => a - b)
  return (
    <div className="vitrine" ref={ref}>
      {folhas.map((f) => (
        <section key={f} className="vitrine-folha">
          <h2 className="vitrine-titulo">Folha {f}</h2>
          <div className="vitrine-grade">
            {TODOS.filter((e) => e.folha === f).map((e) => (
              <div key={e.id} className="vitrine-especime">
                <span className="vitrine-rotulo">{e.nome ?? e.rotulo}</span>
                <Moldura e={e} />
                {e.legenda && <span className="vitrine-legenda">{e.legenda}</span>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
