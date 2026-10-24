// T05 · o movimento de conectar o módulo (02-telas/T05-conectar-modulo/animacao.md). A T05 só conecta (decisão 44): não
// há pré-checagem, e o que o módulo informa vem no diagnóstico (T07).
//   · o marcador de escolha: tocar num módulo da lista, o quadrado lima surge; o primário
//     diz o serial dele, e o texto novo esmaece no lugar, com o roxo direto (como a T02).
//     Na 01, todos se escolhem — o M2C-0999 também; na 00 e na 04 também (ele
//     é uma linha como as outras, com o que informa na busca);
//   · a busca de novo: da lista (01), o conteúdo esmaece pro quadro da busca (00) em 150;
//     aos 1,2 s (RITMOS.buscaMs), a lista volta — a frase e o rodapé esmaecem, e as cinco linhas
//     surgem em cascata, 150 cada, de 80 em 80. Do quadro da 00, o toque não troca o desenho;
//   · conectar: a sessão nasce, e a tela vai pra T07 com a troca entre telas — o conteúdo
//     esmaece em 150, e a barra fica parada. A faixa não desce na conexão: desce na T07, quando as
//     nove linhas passam sem trava. O M2C-0999 conecta como
//     os outros, e a T07 trava pelo serial fora do cadastro (T07/02), lido da sessão;
//   · entre quadros, só a troca esmaece: o texto do primário não esmaece de novo por dentro dela.
// A tela abre parada pela URL, em cada momento e estado, e no print. Com reduzir, o mesmo ritmo, e
// nada anda.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em, extra = {}) => ({ prop: 'opacity', ms: 150, em, curva: C, ...extra })
const desliza = (em, ms = 150) => ({ prop: 'transform', ms, em, curva: C })
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const MARCA = [esmaece('ds-quadrado-cheio'), desliza('ds-quadrado-cheio')]
const TEXTO = esmaece('ds-primario-texto')                 // o texto do primário que troca no lugar
const CASCATA = [0, 80, 160, 240, 320].map((atraso) => esmaece('ds-linha-modulo', { atraso }))
const SEM_ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]
// a barra do sistema é do Android (decisão 43): não se move; e a faixa não nasce na conexão
const PARADOS = [{ prop: 'opacity', em: 'ds-barra-sistema' }, { prop: 'transform', em: 'ds-barra-sistema' }, { prop: 'transform', em: 'ds-faixa' }]
const M01 = '01-momento-nenhum-escolhido'
const M05 = '05-momento-procurando'

const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
const MOMENTOS = [M01, '02-momento-um-encontrado']
const ESTADOS = ['03-estado-nenhum-encontrado', '04-estado-conexao-falhou', '16-estado-bluetooth-desligado', '17-estado-bluetooth-sem-permissao']

export default [
  // ── abre parada: pela URL, em cada momento e em cada estado, e no print ──
  { abre: '?tela=T05' },
  ...PARADA,
  ...MOMENTOS.flatMap((m) => [{ abre: `?tela=T05&momento=${m}` }, ...PARADA]),
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T05&estado=${e}` }, ...PARADA]),
  // no print, cada quadro de referência: nada se move
  { abre: '?tela=T05&print=1' },
  ...PARADA,
  ...MOMENTOS.flatMap((m) => [{ abre: `?tela=T05&momento=${m}&print=1` }, ...PARADA]),
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T05&estado=${e}&print=1` }, ...PARADA]),

  // ── a lista (01): marcar, e o primário diz o serial ──
  { abre: `?tela=T05&momento=${M01}` },
  { quieto: true },
  { desligado: 'Conectar' },
  { toca: 'M2C-0417', anima: [...MARCA, TEXTO], naoAnima: [esmaece('ds-linha-modulo')] },   // marcar não repete a cascata
  { ve: 'Conectar ao M2C-0417' },
  { dorme: 250 },
  { toca: 'M2C-0394', anima: [...MARCA, esmaece('ds-quadrado'), TEXTO] },   // a que perde a marca: o mesmo ao contrário
  { ve: 'Conectar ao M2C-0394' },
  { dorme: 250 },
  // o M2C-0999, fora do cadastro, se escolhe como os outros
  { toca: 'M2C-0999', anima: [...MARCA, esmaece('ds-quadrado'), TEXTO] },
  { ve: 'Conectar ao M2C-0999' },
  { dorme: 250 },
  { quieto: true },

  // ── a busca de novo: 01 → o *Procurando…* (05) → 01, com a cascata ──
  { toca: 'Procurar de novo', anima: TROCA, naoAnima: [TEXTO] },   // entre quadros, só a troca
  { chega: 'T05', momento: M05 },
  { ve: 'Procurando…' },
  { dorme: 250 },
  { quieto: true },   // o *Procurando…* fica parado na tela
  { chega: 'T05', momento: M01, entre: [700, 1150] },
  { anima: [...TROCA, ...CASCATA], naoAnima: [TEXTO] },
  { desligado: 'Conectar' },   // volta sem nada escolhido
  { dorme: 600 },
  { quieto: true },
  // da 00 (a tela), o mesmo: o *Procurando…*, e a volta da lista, com a cascata
  { abre: '?tela=T05' },
  { quieto: true },
  // na 00, o fora do cadastro é uma linha como as outras, com o que ele informa · só módulo com
  // Bluetooth na busca: o M2C-0362 no VL06 CAN-BT, o M2C-0394 no VL06 FULL
  { ve: 'M2C-0999\nVL06 · CAN-BT' },
  { ve: 'M2C-0362\nVL06 · CAN-BT' },
  { ve: 'M2C-0394\nVL06 · FULL' },
  { naoVe: 'não cadastrado' },
  { toca: 'M2C-0999' },   // tocável: troca o escolhido no lugar
  { ve: 'Conectar ao M2C-0999' },
  { dorme: 300 },
  { toca: 'Procurar de novo', anima: TROCA },
  { chega: 'T05', momento: M05 },
  { chega: 'T05', momento: M01, entre: [700, 1250] },
  { anima: [...TROCA, ...CASCATA] },
  { dorme: 600 },
  { quieto: true },

  // ── conectar: a sessão nasce, e a troca entre telas leva à T07, sem a faixa descer aqui ──
  { toca: 'M2C-0417' },
  { dorme: 250 },
  { toca: 'Conectar ao M2C-0417', naoAnima: [...SEM_ROXO, ...PARADOS] },
  { ve: 'Conectando ao M2C-0417…' },   // o Conectando… (06), o primário desligado
  { desligado: 'Conectando ao M2C-0417…' },
  { desligado: 'Procurar de novo' },
  { chega: 'T05', momento: '06-momento-conectando' },
  // o módulo respondeu: o Conectado ao …, e o traço se desenha embaixo da linha
  { chega: 'T05', momento: '07-momento-conectado', entre: [900, 1700] },
  { chega: 'T07', entre: [900, 1700] },
  { naoVe: 'Escolha o que está na sua mão.' },
  { naoVe: 'ENCERRAR' },   // a faixa desce na T07, quando as nove linhas passam sem trava — não no toque
  // da 00, o mesmo: o escolhido conecta
  { abre: '?tela=T05' },
  { quieto: true },
  { toca: 'Conectar ao M2C-0417', anima: [esmaece('ds-primario-texto')], naoAnima: [...PARADOS, esmaece('tela-miolo')] },   // da 00, o mesmo quadro: só o texto do primário troca
  { ve: 'Conectando ao M2C-0417…' },   // o Conectando… (06), o primário desligado
  { desligado: 'Conectando ao M2C-0417…' },
  { desligado: 'Procurar de novo' },
  { chega: 'T05', momento: '06-momento-conectando' },
  // o módulo respondeu: o Conectado ao …, e o traço se desenha embaixo da linha
  { chega: 'T05', momento: '07-momento-conectado', entre: [900, 1700] },
  { chega: 'T07', entre: [900, 1700] },
  // o M2C-0999 conecta como os outros, e a T07 trava pelo serial fora do cadastro, lido da sessão (T07/02)
  { abre: `?tela=T05&momento=${M01}` },
  { toca: 'M2C-0999' },
  { dorme: 250 },
  { toca: 'Conectar ao M2C-0999', naoAnima: PARADOS },
  { ve: 'Conectando ao M2C-0999…' },   // o Conectando… (06), o primário desligado
  { desligado: 'Conectando ao M2C-0999…' },
  { desligado: 'Procurar de novo' },
  { chega: 'T05', momento: '06-momento-conectando' },
  // o módulo respondeu: o Conectado ao …, e o traço se desenha embaixo da linha
  { chega: 'T05', momento: '07-momento-conectado', entre: [900, 1700] },
  { chega: 'T07', entre: [900, 1700] },
  { ve: 'Peça ao gestor pra cadastrar o M2C-0999.', ms: 8000 }, // o topo só com o serial, e o aviso da trava
  { naoVe: 'ENCERRAR' },

  // ── com reduzir movimento: o mesmo ritmo, e nada anda ──
  { reduzir: true },
  { abre: `?tela=T05&momento=${M01}` },
  { quieto: true },
  { toca: 'M2C-0417' },
  { quieto: true },
  { toca: 'Procurar de novo' },
  { quieto: true },
  { chega: 'T05', momento: M05 },
  { chega: 'T05', momento: M01, entre: [700, 1250] },
  { quieto: true },
  { toca: 'M2C-0999' },
  { quieto: true },
  { toca: 'Conectar ao M2C-0999', naoAnima: [...TROCA, ...PARADOS] },
  { chega: 'T05', momento: '06-momento-conectando' },
  // o módulo respondeu: o Conectado ao …, e o traço se desenha embaixo da linha
  { chega: 'T05', momento: '07-momento-conectado', entre: [900, 1700] },
  { chega: 'T07', entre: [900, 1700] },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna e a volta ao fluxo abrem parados ──
  { abre: '?tela=T05' },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Nenhum encontrado' },
  { chega: 'T05', estado: '03-estado-nenhum-encontrado' },
  ...PARADA,
  // embaixo das causas, as variantes sem Bluetooth, que a busca nunca acha (decisão 59)
  { ve: 'O VL06 ECO e o VL06 CAN não têm Bluetooth: não aparecem aqui, e o app não configura esses dois.' },
  { palco: 'Conexão falhou' },
  { chega: 'T05', estado: '04-estado-conexao-falhou' },
  ...PARADA,
  { palco: 'Bluetooth desligado' },
  { chega: 'T05', estado: '16-estado-bluetooth-desligado' },
  ...PARADA,
  // toda espera tem fim (decisão 64): o pareamento que o celular não confirmou, parado pela coluna
  { palco: 'Pareamento não confirmado' },
  { chega: 'T05', estado: '20-estado-pareamento-nao-confirmado' },
  ...PARADA,
  { ve: 'não pareou' },
  { ve: 'O celular não confirmou o pareamento. Toque em Tentar de novo e confirme o aviso que o celular mostra.' },
  { naoToca: 'Tentar de novo' },
  { palco: 'Voltar ao fluxo' },
  { chega: 'T05', estado: null },
  ...PARADA,
]
