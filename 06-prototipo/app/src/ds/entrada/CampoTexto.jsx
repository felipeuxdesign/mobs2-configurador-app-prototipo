// O campo de texto longo (folha 6, a justificativa da T13): o rótulo de bloco
// em cima e o poço que cresce com o que o técnico escreve, a partir de 48.
// O foco é o do Campo: rótulo e traço de baixo em lima, o traço acendendo da
// esquerda pra direita (TracoFoco.css). O poço não muda de altura nem de
// desenho no foco: o traço de 2 é desenhado por cima da borda de 1.
// `focado` é o foco que a tela diz; no toque, o foco do próprio campo (foco.js).
import { useId } from 'react'
import { useFocoDoCampo } from './foco.js'
import './TracoFoco.css'
import './CampoTexto.css'

// `placeholder` (T13/42): o que o campo vazio pede, em --marca-limite
export function CampoTexto({ rotulo, valor = '', aoMudar, focado = false, id, placeholder }) {
  const gerado = useId()
  const idCampo = id ?? gerado
  const foco = useFocoDoCampo(focado)
  return (
    <div className={`ds-campo-texto ${foco.aceso ? 'ds-foco' : ''}`}>
      <label htmlFor={idCampo} className="ds-campo-texto-rotulo">{rotulo}</label>
      <div className="ds-campo-texto-poco ds-traco-foco">
        <textarea
          id={idCampo}
          className="ds-campo-texto-entrada"
          rows={1}
          value={valor}
          placeholder={placeholder}
          onChange={aoMudar ? (e) => aoMudar(e.target.value) : undefined}
          readOnly={!aoMudar}
          onFocus={foco.aoFocar}
          onBlur={foco.aoSair}
        />
      </div>
    </div>
  )
}
