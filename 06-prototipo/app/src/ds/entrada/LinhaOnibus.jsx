// A linha de ônibus (folha 6, T06): o quadrado de escolha no poço de 30, a
// placa e o modelo, e a frota à direita, na linha de escolha de 72. Tocável;
// escolhida, o quadrado enche de lima (folha 3: escolha numa lista). É uma escolha
// (role radio, aria-checked): na T06, tocar marca, e o primário avança (T06·1 b).
import { Tocavel, Poco, Quadrado } from '../index.js'
import './LinhaOnibus.css'

// A última linha da lista tem 72, como as outras, só sem a divisória
// (T06/00). A divisória sai pelo `divisoria`.
export function LinhaOnibus({ placa, modelo, rotuloFrota, frota, escolhido = false, aoTocar, rotulo, divisoria = true }) {
  return (
    <Tocavel
      className={`ds-linha-onibus ${divisoria ? '' : 'ds-sem-divisoria'}`}
      rotulo={rotulo}
      aoTocar={aoTocar}
      role="radio"
      aria-checked={escolhido}
    >
      <Poco tam={30}><Quadrado escolhido={escolhido} /></Poco>
      <span className="ds-linha-onibus-id">
        <span className="ds-linha-onibus-placa">{placa}</span>
        <span className="ds-linha-onibus-modelo">{modelo}</span>
      </span>
      <span className="ds-linha-onibus-frota">
        <span className="ds-linha-onibus-frota-rotulo">{rotuloFrota}</span>
        <span className="ds-linha-onibus-frota-numero">{frota}</span>
      </span>
    </Tocavel>
  )
}
