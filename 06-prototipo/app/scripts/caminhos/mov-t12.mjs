// T12 · o movimento das últimas instalações (02-telas/T12-ultimas-instalacoes/animacao.md):
//   · a lista e o detalhe são desenhos diferentes — o título, o miolo e o rodapé trocam inteiros —, e
//     quando um vira o outro (o toque numa instalação, o Voltar às instalações, o voltar do Android),
//     o conteúdo esmaece em 150, como entre telas (a troca de quadro); é o total — o "1→0→1"
//     não existe —, e a barra e a faixa ficam paradas;
//   · nada mais se move: o que o servidor recebeu nasce com o detalhe, parado;
//   · do menu e de volta, a troca entre telas (o topo muda: só o miolo esmaece no menu).
// A tela abre parada pela URL, em cada momento e estado, no print e no palco. Com reduzir movimento,
// a troca é direta.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
// o topo não se move: nada na barra do sistema nem na faixa
const TOPO = [{ prop: 'opacity', em: 'ds-barra-sistema' }, { prop: 'transform', em: 'ds-barra-sistema' },
  { prop: 'opacity', em: 'ds-faixa' }, { prop: 'transform', em: 'ds-faixa' }]
// o recebimento nasce com o detalhe: nenhuma linha dele esmaece por dentro da troca
const RECEBIMENTO = [{ prop: 'opacity', em: 'ds-checagem' }, { prop: 'opacity', em: 'ds-glifo' }]
// o rodapé nasce com o quadro: o roxo do pressionado não solta por cima do botão novo
const SEM_ROXO = [{ prop: 'opacity', ms: 100, em: 'ds-primario' }]
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
const DETALHE = '01-momento-detalhe-da-instalacao'
const ESTADOS = ['02-estado-nenhuma-instalacao', '03-estado-sem-rede', '04-estado-criterio-indisponivel', '05-estado-criterio-pendente']

export default [
  // ── abre parada: pela URL, em cada momento e estado, e no print ──
  { abre: '?tela=T12' },
  ...PARADA,
  { ve: 'HOJE' },
  { abre: `?tela=T12&momento=${DETALHE}` },
  ...PARADA,
  { ve: 'O QUE O SERVIDOR RECEBEU' },
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T12&estado=${e}` }, ...PARADA]),
  ...['', `&momento=${DETALHE}`, ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T12${q}&print=1` }, ...PARADA]),

  // ── o toque numa instalação: a troca de quadro, e nada mais se move ──
  { abre: '?tela=T12' },
  { quieto: true },
  { toca: 'RKT-8H42', anima: TROCA, naoAnima: [...TOPO, ...RECEBIMENTO] },
  { chega: 'T12', momento: DETALHE },
  { ve: 'O QUE O SERVIDOR RECEBEU' },
  { ve: '3 posições em 1 min 12 s' },
  { dorme: 250 },
  { quieto: true },
  // o Voltar às instalações: a mesma troca, de volta
  { toca: 'Voltar às instalações', anima: TROCA, naoAnima: [...TOPO, ...SEM_ROXO] },
  { chega: 'T12', momento: null },
  { ve: 'HOJE' },
  { dorme: 250 },
  { quieto: true },
  // outra instalação, e o voltar do Android (o Esc), que faz o mesmo que a saída do rodapé
  { toca: 'PCX-9A17', anima: TROCA, naoAnima: [...TOPO, ...RECEBIMENTO] },
  { chega: 'T12', momento: DETALHE },
  { dorme: 250 },
  { quieto: true },
  { tecla: 'Escape' },
  { anima: TROCA, naoAnima: TOPO },
  { chega: 'T12', momento: null },
  { dorme: 250 },
  { quieto: true },

  // ── a troca entre telas: pro menu e de volta (o topo muda, e só o conteúdo esmaece) ──
  { toca: 'Voltar ao menu', anima: [esmaece('tela-miolo')], naoAnima: TOPO },
  { chega: 'T04' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Entendi' },   // o aviso do acesso, que o menu mostra na primeira vez (T04/12)
  { dorme: 250 },
  { toca: 'Últimas instalações', anima: TROCA },
  { chega: 'T12', momento: null },
  { dorme: 250 },
  { quieto: true },

  // ── com reduzir movimento: a troca é direta ──
  { reduzir: true },
  { abre: '?tela=T12' },
  { quieto: true },
  { toca: 'RKT-8H42' },
  { quieto: true },
  { chega: 'T12', momento: DETALHE },
  { quieto: true },
  { toca: 'Voltar às instalações' },
  { quieto: true },
  { chega: 'T12', momento: null },
  { tecla: 'Escape' },
  { chega: 'T04' },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna, a volta ao fluxo e o pulo abrem parados ──
  { abre: '?tela=T12' },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Critério pendente' },
  { chega: 'T12', estado: '05-estado-criterio-pendente' },
  ...PARADA,
  { palco: 'Sem rede' },
  { chega: 'T12', estado: '03-estado-sem-rede' },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T12', estado: null },
  ...PARADA,
  { abre: '?tela=T04' },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },   // o painel desliza da esquerda: o toque espera ele parar no lugar
  { palco: 'T12' },
  { chega: 'T12' },
  ...PARADA,
]
