// Os quatro ícones do palco (a moldura de apresentação, não o app): o quadrado do canto (a grade),
// o X do painel, a seta do Voltar ao fluxo e o sol do Modo claro. O projeto não usa o lucide-react:
// os desenhos são os do Lucide 1.47 (o layout-grid, o x, o undo-2 e
// o sun), copiados aqui com os mesmos atributos — a caixa de 24, o traço 2 e as pontas
// redondas · o tamanho vem da classe do palco (palco-icone-14, 16, 18). Não são ícones do app: o jogo
// de ícones (03-design-system/icones) é só do app.
const BASE = { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' }

export function Grade({ className = '' }) {
  return (
    <svg {...BASE} className={className}>
      <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}
export function Xis({ className = '' }) {
  return <svg {...BASE} className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
}
export function Volta({ className = '' }) {
  return <svg {...BASE} className={className}><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" /></svg>
}
export function Sol({ className = '' }) {
  return (
    <svg {...BASE} className={className}>
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}
