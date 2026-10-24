// Sempre em retrato (06-prototipo/CLAUDE.md, regra 11): o app não gira. No modo
// estreito com a janela mais larga que alta — o celular deitado —, o palco põe
// o celular de 360 × 800 no centro, com a moldura e em escala pra caber, como
// no palco largo, sem a coluna (Palco.jsx, palco.md). Sem o navegador, pro
// teste no node (scripts/testar-regras.mjs).
//
// O teclado aberto só encolhe a altura da página (o interactive-widget do
// index.html): com um campo do app em foco e a largura igual, o deitado fica
// como estava — senão, num celular baixo, abrir o teclado deitaria o app. O
// giro de verdade sempre troca a largura.
export function deitado(antes, agora, campoEmFoco) {
  if (antes && campoEmFoco && agora.w === antes.w) return antes.deitado
  return agora.w > agora.h
}

// A altura em que o celular em escala cabe (o palco largo, e o deitado): o
// teclado aberto não encolhe o celular. É a mesma conta do deitado — um campo
// do app em foco e a largura igual —, e com ela a altura fica a de antes do
// teclado: o celular fica do tamanho que tinha, e a peça do teclado
// (src/estado/teclado.js) encolhe o app até o que sobra acima dele, dentro da
// moldura, como no Safari, que não encolhe a página. Sem isso, o Chrome de um
// tablet ou do celular deitado reescalaria o celular pra caber nos poucos px
// acima do teclado (deitado, de 0,38 pra 0,14). O teclado que fecha devolve a
// altura da janela.
export function alturaDoPalco(antes, agora, campoEmFoco) {
  if (antes && campoEmFoco && agora.w === antes.w && agora.h < antes.alto) return antes.alto
  return agora.h
}
