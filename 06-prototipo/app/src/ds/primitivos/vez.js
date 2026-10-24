// A troca depois de montar (o movimento fino): o que muda na frente de quem
// olha mostra a mudança; o que nasce já mudado fica parado — nada anima a entrada
// de uma tela (movimento.md), nem pela URL, nem pelo palco, nem num estado da
// coluna, nem no print. Sem relógio: a peça só sabe o que ela mesma já viu.
import { useRef } from 'react'

// useVez(valor) → { valor, antes, vez }
// · vez: quantas vezes o valor trocou desde que a peça montou — 0 ao abrir, e a
//   peça que nasce não anima. Quem usa põe a `vez` na chave do que troca (o
//   elemento nasce de novo, e a animação de CSS dele corre de novo a cada troca) e
//   a classe do movimento só com `vez > 0`. A classe fica até a próxima troca: um
//   desenho de novo no meio do movimento não o corta.
// · antes: o valor de antes da última troca (undefined ao abrir).
export function useVez(valor) {
  const r = useRef(null)
  if (r.current === null) r.current = { valor, antes: undefined, vez: 0 }
  else if (!Object.is(valor, r.current.valor)) r.current = { valor, antes: r.current.valor, vez: r.current.vez + 1 }
  return r.current
}

// useChega(texto, leitura) → { vez, nasce }: o texto que chega junto com a
// leitura. `leitura` é um useVez do que diz que a leitura chegou (o estado da
// linha, o fim do `lendo`). O texto que troca no mesmo desenho em que a leitura
// troca esmaece (nasce); o que troca sozinho — a porcentagem que anda, o número
// que conta — troca no lugar, direto (movimento.md: o número troca no lugar).
export function useChega(texto, leitura) {
  const r = useRef(null)
  if (r.current === null) r.current = { texto, vez: 0, nasce: false, leitura: leitura.vez }
  else if (!Object.is(texto, r.current.texto)) {
    r.current = { texto, vez: r.current.vez + 1, nasce: leitura.vez !== r.current.leitura, leitura: leitura.vez }
  } else r.current.leitura = leitura.vez
  return r.current
}
