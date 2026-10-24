// A barra do checklist (folha 5 · decisão 34): a
// barra fina embaixo do título, no lugar do placar. O lima é o que já passou
// (Lei 6: o placar enche); o número fica no título, e a barra não repete ele
// pro leitor de tela. Um item passa: o lima avança até o novo total, por
// transform (scaleX), em --mov-lento (T13 animacao.md); a abertura não anima.
// `de`: a volta do nível do item às seções, que remonta a barra. Com
// ele, a barra nasce no que tinha quando o item abriu (`de` feitos) e avança
// até o novo, na frente de quem olha, em --mov-lento, desacelerando — o
// movimento não parte do zero. Sem ele, ou com o mesmo valor, nasce parada.
// Com reduzir, nasce no valor novo.
// O `de` vale ao nascer, e o avanço fica com a peça enquanto ela vive: o Finalizar
// que chega no meio dele (o toque logo depois da volta) não corta a animação nem salta
// o lima pro fim — a animação, que não recomeça, segue até o valor novo; depois dela, o que muda anda pela transição de sempre.
import { useState } from 'react'
import './BarraDoChecklist.css'

const fracao = (n, total) => (total > 0 ? Math.min(1, Math.max(0, n / total)) : 0)

export function BarraDoChecklist({ feitos, total, de, className = '' }) {
  const parte = fracao(feitos, total)
  const [{ partiu, avanca }] = useState(() => {
    const p = de != null ? fracao(de, total) : null
    return { partiu: p, avanca: p != null && p !== parte }
  })
  return (
    <div className={`ds-barra-ck ${className}`} aria-hidden="true">
      <span className={`ds-barra-ck-passou ${avanca ? 'ds-barra-ck-avanca' : ''}`}
        style={{ '--ds-barra-ck-parte': parte, ...(avanca && { '--ds-barra-ck-de': partiu }) }} />
    </div>
  )
}
