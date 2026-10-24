// A ponte com 04-dados/mocks.js. O mock é um script que escreve
// window.M2CF_MOCKS; entra por import de efeito colateral, sem cópia
// (publicar.md). Congelado: escrever nele é erro — o estado único
// copia explicitamente o que muda.
import '../../../../04-dados/mocks.js'

function congelar(o) {
  Object.freeze(o)
  for (const k of Object.keys(o)) {
    const v = o[k]
    if (v && typeof v === 'object' && !Object.isFrozen(v)) congelar(v)
  }
  return o
}

export const M = congelar(window.M2CF_MOCKS)
