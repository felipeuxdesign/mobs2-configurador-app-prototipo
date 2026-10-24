// A superfície tocável: o que responde é o pressionado (R-12), no clique
// como no toque; nada reage a passar o mouse. O pressionado é uma camada por
// cima (--elevado) que entra no toque e solta em 100ms (movimento.md).
// Todo tocável tem nome pro leitor de tela (06-prototipo/CLAUDE.md, regra 6).
import './Tocavel.css'

export function Tocavel({ como = 'button', rotulo, aoTocar, desabilitado = false, className = '', children, ...resto }) {
  const Comp = como
  const props = Comp === 'button'
    ? { type: 'button', disabled: desabilitado }
    : { role: resto.role ?? 'button', 'aria-disabled': desabilitado || undefined, tabIndex: desabilitado ? -1 : 0 }
  return (
    <Comp
      {...props}
      {...resto}
      aria-label={rotulo}
      className={`ds-tocavel ${desabilitado ? 'ds-tocavel-desabilitado' : ''} ${className}`}
      onClick={desabilitado ? undefined : aoTocar}
    >
      {children}
    </Comp>
  )
}
