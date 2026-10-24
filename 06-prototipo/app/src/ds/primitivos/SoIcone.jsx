// O botão só de ícone (folha 6): o olho, o X. Desenho de 44; o toque tem 48,
// por uma área invisível em volta, sem mudar o desenho (Lei do toque de 48).
import { useRef } from 'react'
import { Icone } from './Icone.jsx'
import './SoIcone.css'

// Quando o ícone troca (o olho ↔ o olho riscado, T01), o novo entra esmaecendo no lugar,
// em --mov-rapido; ao abrir a tela, nada anima (a primeira vez não conta como troca).
export function SoIcone({ icone, rotulo, aoTocar, tam = 20, cor = 'secundaria', pressionado }) {
  const primeiro = useRef(icone); const mudou = useRef(false)
  if (primeiro.current !== icone) mudou.current = true
  const trocou = mudou.current
  return (
    <button type="button" className="ds-so-icone" aria-label={rotulo} aria-pressed={pressionado} onClick={aoTocar}>
      <span key={icone} className={`ds-so-icone-glifo ${trocou ? 'ds-troca-esmaece' : ''}`}><Icone nome={icone} tam={tam} cor={cor} /></span>
    </button>
  )
}
