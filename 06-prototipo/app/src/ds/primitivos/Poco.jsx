// O poço — o lugar onde se lê o veredito (Lei 4). Tamanhos da folha 3:
// 22 · 24 · 26 · 28 · 30 · 32 · 34 · 44. O conteúdo vem centrado.
import './Poco.css'

export function Poco({ tam = 24, children, className = '', ...resto }) {
  return <span className={`ds-poco ds-poco-${tam} ${className}`} {...resto}>{children}</span>
}
