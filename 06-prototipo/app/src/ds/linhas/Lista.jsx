// A lista em cartão (folha 4): o recipiente das linhas — pré-checagem,
// passos, assertivas, histórico, empresas. Quem monta a tela decide a
// divisória de cada linha (a última às vezes fica, às vezes sai: T05 mantém,
// T02 e T04 tiram), pela prop `divisoria` da linha.
// recheio: 'padrao' (0 · 12) ou 'passos' (2 · 12, a lista da T14).
// Numa lista de escolha (as empresas), quem monta passa role="radiogroup" e o
// nome dela (aria-label): as linhas de escolha e de empresa são role="radio".
//
// A cascata · `surge`: a lista que a busca acabou de
// achar, na frente de quem olha (a T05/01 que volta da busca de novo). Cada linha
// surge esmaecendo, 150 cada (--mov-rapido), uma a cada --mov-escalonar-lista (80),
// de cima pra baixo; o cartão já está no lugar, e nada muda de lugar nem de altura.
// Quem monta a lista passa `surge` só na lista que nasce da busca: ao abrir — pela
// URL, pelo palco, num estado, no print —, a lista já está lá, parada. A cascata
// corre uma vez, quando a lista monta com ele (ou o ganha); o toque que marca uma
// linha depois não a repete. Com reduzir movimento, as linhas aparecem juntas.
// (A lista que se reorganiza quando a busca filtra é o `useReorganiza`, ao lado.)
import './Lista.css'

export function Lista({ recheio = 'padrao', surge = false, children, className = '', ...resto }) {
  return <div className={`ds-lista ${recheio === 'passos' ? 'ds-lista-passos' : ''} ${surge ? 'ds-lista-surge' : ''} ${className}`} {...resto}>{children}</div>
}
