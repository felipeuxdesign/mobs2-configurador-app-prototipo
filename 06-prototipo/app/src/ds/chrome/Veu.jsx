// O véu (folha 2, por cima da tela): o fundo escuro atrás da folha e do
// diálogo. Conserva a região de composição (flex-grow), com a folha no pé
// ou o diálogo no meio. --veu-topo estende só o fundo sobre o chrome.
// Esmaece junto: com a folha entra em 200ms, com o
// diálogo em 150ms, e sai em 150ms (movimento.md). A barra do sistema escurece
// junto pelo `veu` dela.
import { createContext, useRef } from 'react'
import './Veu.css'

// A lei 20: toda folha fecha tocando fora. A Folha que mora
// no véu se registra aqui (FechaPeloVeu) com o fechar dela — o mesmo do X —, e
// tocar no véu, fora da folha, chama esse fechar. Só o véu responde: o toque
// dentro da folha não chega aqui. Pro leitor de tela, quem fecha é o X da
// folha (e o voltar do sistema), e o véu continua sem papel.
export const FechaPeloVeu = createContext(null)

// de: 'folha' (no pé) · 'dialogo' (no meio)
// `aoTocarFora` (T04/10 e 11): o que o toque no véu faz, no lugar do fechar
// da folha. Na folha, sem ela, vale o fechar que a Folha registrou (a lei 20). No
// diálogo, sem ela, o toque no véu não faz nada: quem fecha a confirmação é o
// Cancelar (lei 20) ou a saída dele.
// A troca no mesmo véu (PorCima.jsx): `troca` diz que uma coisa sai
// enquanto outra entra — o véu vira a caixa do que sai, que fica fora do fluxo,
// por baixo do que entra (.ds-veu-troca), e continua aceso, parado. `corte`: na
// troca em que o fundo pintado cresce pra cima, os px que ele ainda não cobria:
// o resto fica como estava, e só esse pedaço esmaece no tempo do diálogo.
// Na T04, folha e diálogo já cobrem todo o fundo, sem crescimento na troca.
export function Veu({ de = 'folha', visivel = true, aoTocarFora, troca = false, corte = null, children }) {
  const daFolha = useRef(null)
  const fora = (e) => {
    if (e.target !== e.currentTarget) return
    const fecha = aoTocarFora ?? (de === 'folha' ? daFolha.current : null)
    fecha?.()
  }
  const cresce = corte != null && corte > 0
  return (
    <FechaPeloVeu.Provider value={daFolha}>
      <div className={`ds-veu ds-veu-${de} ${visivel ? '' : 'ds-veu-oculto'} ${troca ? 'ds-veu-troca' : ''} ${cresce ? 'ds-veu-cresce' : ''}`}
        style={cresce ? { '--veu-corte': `${corte}px` } : undefined} onClick={fora}>
        {cresce && <span className="ds-veu-cresce-pedaco" aria-hidden="true" />}
        {children}
      </div>
    </FechaPeloVeu.Provider>
  )
}
