// O foco do campo, um só (TracoFoco.css): o campo acende quando a
// tela diz (`focado`, o foco do estado da tela) ou quando o próprio campo recebe o
// toque (o teclado abre nele). Nunca pelo que está dentro do poço e não é o campo:
// o olho da senha, o xis do usuário lembrado — o foco do navegador neles não
// acende nada (o foco de teclado desenhado, que a lei proíbe). Tocar no olho ou no
// checkbox não muda o campo aceso. Sem relógio: o foco e a saída do próprio campo.
import { useState } from 'react'

export function useFocoDoCampo(focado, { onFocus, onBlur } = {}) {
  const [proprio, setProprio] = useState(false)
  return {
    aceso: Boolean(focado) || proprio,
    aoFocar: (e) => { setProprio(true); onFocus?.(e) },
    aoSair: (e) => { setProprio(false); onBlur?.(e) },
  }
}
