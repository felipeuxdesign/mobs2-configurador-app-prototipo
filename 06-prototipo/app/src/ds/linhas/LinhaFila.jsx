// A linha da fila de saída (T15) — uma peça só pros dois estados, com o
// mesmo desenho por dentro. O veredito no poço da linha (32 na de 50, 30 na de 62)
// com o glifo de 17, o que é e de quem embaixo, o quando à direita.
//   estado 'espera' · o que ainda não subiu (folha 4): o círculo em
//                     --tinta-secundaria (a espera da fila é fato, não apagado)
//   os outros       · o que já subiu (folha 7): o glifo do estado ('ok', 'xis'…)
// A altura muda com o estado — 50 esperando, 62 depois de subir —, porque as
// folhas 4 e 7 desenham assim. Isso bate na Lei 3 e é uma diferença
// conhecida, em aberto: se ficar uma altura só, a regra
// .ds-linha-fila-espera sai.
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import './LinhaFila.css'

// `posicao` (T15): na lista da fila, a altura é regra de
// posição — 'meio', 50 com a divisória, em qualquer estado (a recebida do meio
// da T15/01); 'fim', a última, 62. Sem ela, a altura segue o estado, como acima.
// O poço segue a altura (o poço na linha): a linha de 50
// leva o poço de 32; a de 62, que a lei não mede, fica com o de 30, como as
// referências e as folhas 4 e 7 desenham. O glifo fica em 17 nos dois.
export function LinhaFila({ estado = 'ok', titulo, legenda, quando, nomeGlifo, divisoria = false, posicao, className = '' }) {
  const de50 = posicao ? posicao === 'meio' : estado === 'espera'
  return (
    <div className={`ds-linha-fila ds-linha-fila-${estado} ${divisoria ? 'ds-linha-fila-divisoria' : ''} ${posicao ? `ds-linha-fila-${posicao}` : ''} ${className}`}>
      <Poco tam={de50 ? 32 : 30}><Glifo estado={estado} poco={28} nome={nomeGlifo} /></Poco>
      <span className="ds-linha-fila-texto">
        <span className="ds-linha-fila-titulo">{titulo}</span>
        <span className="ds-linha-fila-legenda">{legenda}</span>
      </span>
      <span className="ds-linha-fila-quando">{quando}</span>
    </div>
  )
}
