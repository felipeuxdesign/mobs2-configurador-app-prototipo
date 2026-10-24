// A linha com contagem (folha 6, T03): o que o pacote baixa, um tipo por
// linha de 58, com o poço de 26, o nome e a contagem à direita. O estado muda
// o que a linha diz (Lei 3):
// · `agora`  — o que está baixando: o quadrado branco no poço, tudo em --tinta
// · `ok`     — o que já baixou: o check lima, a contagem em --tinta-secundaria
// · `espera` — o que ainda não começou: o círculo apagado, tudo em --tinta-apagada
import { Poco, Glifo } from '../index.js'
import './LinhaContagem.css'

// nomeGlifo (T03): o nome pro leitor segue o estado do dado, não o
// desenho — na baixa que parou, o quadrado de 'agora' diz 'parou'
// O check que nasce no poço: o glifo que troca depois de a
// linha montar — o quadrado de agora, o check do tipo que terminou — esmaece no
// lugar, em 150 (o Glifo, esmaece); aberta já baixada, parada. A contagem troca no
// lugar, direto (T03: o número troca no lugar), e a tinta troca direto.
export function LinhaContagem({ nome, contagem, estado = 'espera', divisoria = true, nomeGlifo }) {
  return (
    <div className={`ds-linha-contagem ds-linha-contagem-${estado} ${divisoria ? '' : 'ds-sem-divisoria'}`}>
      <Poco tam={26}><Glifo estado={estado} poco={26} nome={nomeGlifo} esmaece /></Poco>
      <span className="ds-linha-contagem-nome">{nome}</span>
      <span className="ds-linha-contagem-valor">{contagem}</span>
    </div>
  )
}
