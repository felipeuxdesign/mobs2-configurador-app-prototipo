// A conta do teclado (06-prototipo/CLAUDE.md, regra 10), sem o navegador: a
// peça que a usa é teclado.js, e o teste roda no node (scripts/testar-regras.mjs).

// O que abre o teclado: o campo onde se escreve — o texto, a senha, o número,
// a busca, a justificativa. O marcador, o botão e o campo só de leitura, não.
const SEM_TECLADO = new Set(['checkbox', 'radio', 'button', 'submit', 'reset', 'range', 'color', 'file', 'image', 'hidden'])
export function abreTeclado(e) {
  if (!e || e.disabled || e.readOnly) return false
  if (e.isContentEditable) return true
  if (e.tagName === 'TEXTAREA') return true
  return e.tagName === 'INPUT' && !SEM_TECLADO.has(String(e.type || 'text').toLowerCase())
}

// O que o teclado deixa ver da caixa do app.
// · `caixa`: onde o app mora (o pai dele), na página — { top, bottom, height }
// · `alto`: a altura do pai no layout. No palco, o celular está em escala, e a
//   caixa na página é menor que o layout; no modo estreito, as duas são iguais
// · `vv`: a janela que se vê (window.visualViewport) — { offsetTop, height, scale }
// Devolve null quando o teclado não cobre nada, e o app fica como está; ou
// { topo, altura }, em px do app: o app desce `topo` (o navegador rolou a
// página pra mostrar o campo) e encolhe pra `altura`, o que sobra acima do
// teclado. Com o zoom de pinça (scale ≠ 1), a janela que se vê encolhe sem
// teclado nenhum: nada muda.
export function sobraDoTeclado(caixa, alto, vv) {
  if (!vv || !alto || !caixa.height || Math.abs(vv.scale - 1) > 0.01) return null
  const escala = caixa.height / alto
  const topo = Math.max(caixa.top, vv.offsetTop)
  const pe = Math.min(caixa.bottom, vv.offsetTop + vv.height)
  if (pe <= topo || pe - topo >= caixa.height - 1) return null
  return { topo: (topo - caixa.top) / escala, altura: (pe - topo) / escala }
}

// Quanto rolar o miolo (`rolo`) pra mostrar o `alvo` — o campo em foco e o
// rótulo dele — inteiro. Os dois retângulos são os da página ({ top, bottom }),
// e a `escala` é a da caixa na página sobre o layout. Positivo desce, negativo
// sobe, 0 é que já se vê. Se o alvo não cabe no miolo, o topo dele manda: o
// rótulo fica à vista.
export function rolarPraMostrar(rolo, alvo, escala = 1) {
  if (alvo.top < rolo.top) return (alvo.top - rolo.top) / escala
  if (alvo.bottom > rolo.bottom) return Math.min(alvo.bottom - rolo.bottom, alvo.top - rolo.top) / escala
  return 0
}
