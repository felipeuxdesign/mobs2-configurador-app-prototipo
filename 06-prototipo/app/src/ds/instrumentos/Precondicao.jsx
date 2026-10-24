// A pré-condição (folha 5 · a pré-condição dos pinos): a primeira linha da
// configuração, embaixo do título (T09, HU-T09-2). O glifo de 14 solto e a
// frase. Ela sobe 6 pra dentro do respiro do título, como a folha a põe.
// Decisão 47 (HU-T09-2): a segunda linha é o espaço no módulo, e a
// que falha — o xis, a configuração que não cabe (T09/06) — vai inteira em
// vermelho, o glifo e a frase (a falha mora no elemento, Lei 2).
import { Glifo } from '../index.js'
import './Precondicao.css'

export function Precondicao({ estado = 'ok', nomeGlifo, children }) {
  return (
    <span className={`ds-precondicao ${estado === 'xis' ? 'ds-precondicao-falha' : ''}`}>
      <Glifo estado={estado} poco={24} nome={nomeGlifo} />
      {children}
    </span>
  )
}
