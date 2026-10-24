// Sempre em retrato (06-prototipo/CLAUDE.md, regra 11; palco.md e logica.md, O
// retrato): o celular deitado — o modo estreito com a janela mais larga que
// alta — não gira o app. O palco põe o celular de 360 × 800 no centro, em
// escala, como no palco largo, e o app segue se tocando. De pé de novo, o app
// volta à tela cheia; no computador, o palco largo fica como era.
export default [
  // de pé: a tela cheia do celular
  { abre: '?tela=T01' },
  { app: [360, 800] },
  // deitado: o app continua em pé, 360 × 800, no meio da janela
  { janela: [800, 360] },
  { app: [360, 800], centrado: true },
  { toca: 'Entrar' },
  { chega: 'T02' },
  { app: [360, 800], centrado: true },
  // o contexto é a empresa (decisão 56): a Viação marcada, e o Sincronizar à vista
  { marca: 'Viação Atlântico Sul' },
  { aVista: 'Sincronizar' },
  // um celular mais largo, deitado, e a janela estreita e baixa do computador: também em pé
  { janela: [880, 412] },
  { app: [360, 800], centrado: true },
  { janela: [700, 500] },
  { app: [360, 800], centrado: true },
  // de pé de novo: a tela cheia, e a empresa escolhida continua
  { janela: [360, 800] },
  { app: [360, 800] },
  { aVista: 'Sincronizar' },
  { janela: [412, 915] },
  { app: [412, 915] },
  // o computador: o palco largo, com o celular de 360 × 800 no centro, como era
  { janela: [1440, 900] },
  { app: [360, 800], centrado: true },
  // deitado, o estado aberto pelo endereço também fica em pé, parado
  { abre: '?tela=T05&estado=16-estado-bluetooth-desligado' },
  { janela: [800, 360] },
  { app: [360, 800], centrado: true },
  { janela: [360, 800] },
  { app: [360, 800] },
]
