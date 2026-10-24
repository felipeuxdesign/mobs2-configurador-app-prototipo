// O aviso do app parado (palco.md · O celular, nos dois jeitos · decisão 43): num
// estado, a moldura é a mesma do fluxo, e o que avisa que o app está parado é o
// Voltar ao fluxo da coluna — no estreito, o quadrado —, que pisca uma vez quando
// se toca no app. Só no toque: abrir um estado, trocar de estado pela coluna,
// voltar ao fluxo e passar a janela de larga a estreita (ou de volta) não piscam.
// O contador da piscada volta a 0: o botão que nasce depois de uma piscada (o
// Voltar ao fluxo do estado seguinte, o quadrado no estreito) não nasce piscando.
export default [
  { abre: '?tela=T04' },
  { janela: [1440, 900] },
  { ve: 'Fila de saída' },
  // um estado pela coluna: nada pisca ao abrir; o toque no app pisca o Voltar ao fluxo, e cada toque, de novo
  { palco: 'Checklist pendente' },
  { chega: 'T04', estado: '04-estado-checklist-pendente' },
  { pisca: false },
  { tocaNoApp: true },
  { pisca: true },
  { dorme: 500 },
  { tocaNoApp: true },
  { pisca: true },
  { dorme: 500 },
  // de volta ao fluxo, e outro estado: o Voltar ao fluxo dele nasce quieto
  { palco: 'Voltar ao fluxo' },
  { chega: 'T04', estado: null },
  { pisca: false },
  { palco: 'Checklist pendente' }, // as folhas de trocar ficam fora da coluna
  { chega: 'T04', estado: '04-estado-checklist-pendente' },
  { pisca: false },
  { tocaNoApp: true },
  { pisca: true },
  { dorme: 500 },
  // de um estado a outro, direto pela coluna, depois de uma piscada: também quieto
  { palco: 'Acesso vencendo' },
  { chega: 'T04', estado: '12-estado-acesso-vencendo' },
  { pisca: false },
  // a janela estreita: o quadrado não nasce piscando pela piscada do largo; o toque no app pisca ele
  { tocaNoApp: true },
  { pisca: true },
  { dorme: 500 },
  { janela: [600, 900] },
  { pisca: false },
  { tocaNoApp: true },
  { pisca: true },
  { dorme: 500 },
  // e de volta à larga: a coluna volta com o Voltar ao fluxo quieto
  { janela: [1440, 900] },
  { pisca: false },
  { palco: 'Voltar ao fluxo' },
  { chega: 'T04', estado: null },
  { pisca: false },
  // um toque na larga, a janela estreita e de volta à larga, sem tocar no meio: o Voltar ao fluxo volta quieto
  // (a coluna não remonta com a piscada do toque de antes, nem pisca sozinha)
  { palco: 'Checklist pendente' },
  { chega: 'T04', estado: '04-estado-checklist-pendente' },
  { tocaNoApp: true },
  { pisca: true },
  { dorme: 500 },
  { janela: [600, 900] },
  { pisca: false },
  { janela: [1440, 900] },
  { pisca: false },
  // e ao contrário: um toque no estreito pisca o quadrado; à larga e de volta à estreita, sem toque, ele fica quieto
  { janela: [600, 900] },
  { tocaNoApp: true },
  { pisca: true },
  { dorme: 500 },
  { janela: [1440, 900] },
  { pisca: false },
  { janela: [600, 900] },
  { pisca: false },
  { janela: [1440, 900] },
  { palco: 'Voltar ao fluxo' },
  { chega: 'T04', estado: null },
  { pisca: false },
  // o estado pelo endereço, depois de tudo isso: quieto até o toque
  { abre: '?tela=T04&estado=04-estado-checklist-pendente' },
  { pisca: false },
  { tocaNoApp: true },
  { pisca: true },
]
