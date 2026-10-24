// A linha da fila de saída · esperando (folha 4, T15): o que ainda não subiu.
// É a LinhaFila no estado 'espera' (uma peça só pros dois
// estados); este nome fica pra quem monta a lista da fila.
//
// titulo ('Calibração'), detalhe ('RSW-9L02 · na fila'), quando ('há 18 min'),
// nomeGlifo (o nome pro leitor de tela; 'ainda não', se faltar), divisoria
import { LinhaFila } from './LinhaFila.jsx'

export function LinhaFilaEsperando({ titulo, detalhe, quando, nomeGlifo, divisoria = true, className = '' }) {
  return <LinhaFila estado="espera" titulo={titulo} legenda={detalhe} quando={quando} nomeGlifo={nomeGlifo} divisoria={divisoria} className={className} />
}
