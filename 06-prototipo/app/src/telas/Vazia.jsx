// A tela que ainda não existe: o nome dela e, num estado, o rótulo.
import { NOMES, REFERENCIAS } from '../palco/telas.js'
import './vazia.css'

export function Vazia({ tela, estado, momento }) {
  const ref = REFERENCIAS.find((r) => r.tela === tela && r.nome === (estado || momento))
  return (
    <div className="tela-vazia">
      <span className="tela-vazia-codigo">{tela}</span>
      <span className="tela-vazia-nome">{NOMES[tela]}</span>
      {ref && <span className="tela-vazia-ref">{ref.rotulo ?? ref.titulo}</span>}
    </div>
  )
}
