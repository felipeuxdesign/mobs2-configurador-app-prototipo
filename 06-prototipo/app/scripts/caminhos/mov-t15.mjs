// T15 · o movimento da fila de saída (02-telas/T15-fila-de-saida/animacao.md):
//   · o envio não anda (T15·1 e T15·2): sem ritmo declarado, a barra do item que sobe
//     fica parada no 01, e nenhum item se envia — nada se move sozinho, nem depois de esperar;
//   · o Ressincronizar e reenviar: o layout vai
//     direto pro fim; o cartão que pede ação sai esmaecendo por cima, fora do fluxo; o rótulo e a
//     lista sobem do lugar de antes ao novo, e a recebida desce dentro do cartão, só por transform,
//     em 150; o item que volta pra fila (o KJC-7N23) esmaece no lugar dele; nenhuma altura anima.
// A tela abre parada pela URL, em cada estado e no print. Com reduzir, nada anda.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const desliza = (em) => ({ prop: 'transform', ms: 150, em, curva: C })
const REORGANIZA = [esmaece('ds-reorganiza-sai'), desliza('t15-rotulo'), desliza('ds-lista'), esmaece('ds-linha-fila'), desliza('ds-linha-fila')]
const SEM_ALTURA = [{ prop: 'height', em: 'ds-lista' }, { prop: 'height', em: 'tela-miolo' }]
const ESTADOS = ['01-estado-sem-erro', '02-estado-dois-erros', '03-estado-fila-vazia', '04-estado-secao-f-em-re-checagem']
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]

export default [
  // ── abre parada: pela URL, em cada estado, e no print ──
  { abre: '?tela=T15' },
  ...PARADA,
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T15&estado=${e}` }, ...PARADA]),
  ...['', ...ESTADOS.map((e) => `&estado=${e}`)].flatMap((q) => [{ abre: `?tela=T15${q}&print=1` }, ...PARADA]),
  // o envio não anda: a barra do item que sobe fica nos 62%, e nada se move depois de esperar
  { abre: `?tela=T15&estado=${ESTADOS[0]}` },
  { ve: 'SUBINDO AGORA' },
  { dorme: 1500 },
  { quieto: true },

  // ── o Ressincronizar e reenviar: o cartão sai por cima, o resto sobe, o que volta esmaece no lugar ──
  { abre: '?tela=T15' },
  { quieto: true },
  { ve: 'UM PRECISA DE VOCÊ' },
  { toca: 'Ressincronizar e reenviar', anima: REORGANIZA, naoAnima: SEM_ALTURA },
  { naoVe: 'UM PRECISA DE VOCÊ' },
  { ve: 'NA FILA E RECEBIDAS' },
  { ve: 'RSW-9L02 · na fila\nhá 18 min\nEvidências\nKJC-7N23 · na fila\nhá 145 min\nEvidências\nRSW-9L02 · recebida' },
  { dorme: 300 },
  { quieto: true },
  { dorme: 1200 },
  { quieto: true },   // o envio não anda: o que voltou pra fila fica na fila
  { toca: 'Voltar ao menu', anima: [esmaece('tela-miolo')] },   // o menu não tem rodapé
  { chega: 'T04' },

  // ── com reduzir movimento: a troca é direta ──
  { reduzir: true },
  { abre: '?tela=T15' },
  { quieto: true },
  { toca: 'Ressincronizar e reenviar' },
  { quieto: true },
  { ve: 'NA FILA E RECEBIDAS' },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna e a volta ao fluxo abrem parados ──
  { abre: '?tela=T15' },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Dois erros' },
  { chega: 'T15', estado: ESTADOS[1] },
  ...PARADA,
  { palco: 'Sem erro' },
  { chega: 'T15', estado: ESTADOS[0] },
  ...PARADA,
  // sem rede (decisão 64): o Ressincronizar espera a rede, apagado, e o resto da fila fica como está
  { palco: 'Sem rede' },
  { chega: 'T15', estado: '05-estado-sem-rede' },
  ...PARADA,
  { ve: 'Ressincronizar espera a rede' },
  { naoVe: 'Ressincronizar e reenviar' },
  { ve: 'O RESTO ANDA SOZINHO' },
  { palco: 'Voltar ao fluxo' },
  { chega: 'T15', estado: null },
  ...PARADA,
]
