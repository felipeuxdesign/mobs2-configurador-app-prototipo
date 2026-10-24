// O botão de saída da folha (folha 2, o Sair da conta · T04/05): 52 de alto,
// com as cores do botão secundário (um desenho só: o fill
// --fundo-botao e a borda --borda-botao), texto 15/700 em --tinta. Tocável
// inteiro: no toque, a camada --elevado por cima, sem sangrar.
import { Tocavel } from '../primitivos/Tocavel.jsx'
import './BotaoDaFolha.css'

export function BotaoDaFolha({ children, aoTocar, rotulo, forcaToque = false }) {
  return (
    <Tocavel className={`ds-botao-folha ${forcaToque ? 'ds-forca-toque' : ''}`} rotulo={rotulo} aoTocar={aoTocar}>
      <span>{children}</span>
    </Tocavel>
  )
}
