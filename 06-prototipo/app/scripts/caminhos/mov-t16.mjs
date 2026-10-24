// T16 · o movimento da sessão (02-telas/T16-sessao/animacao.md):
//   · o passo do encerramento (T16·1): o check do passo que fecha e o quadrado do que começa
//     esmaecem no poço em 150, um passo a cada 600 ms (RITMOS.encerramentoPassoMs); o trilho troca
//     direto, não acende; a legenda que passa ao passo que corre esmaece no lugar, e o
//     espaço muda direto;
//   · o reinício (01): automático, nunca pede o corte · o primário diz
//     *Reiniciando o módulo…* enquanto ele corre, e o texto apagado troca no lugar; o 01 e o 08
//     (a conexão que cai no reinício) abrem parados pelo endereço;
//   · a passagem pra Sessão encerrada, e pra encerrada sem homologar: o conteúdo esmaece em
//     150, como entre telas, pelo processo; a faixa aberta sobe em 200 por baixo da barra e revela a
//     sem sessão (T16·3), e nada do miolo desliza;
//   · a assertiva do autoteste (T16·2): o glifo e o valor lido esmaecem em 150, uma a cada
//     400 ms (RITMOS.autotesteAssertivaMs); com reduzir, em ordem, no mesmo ritmo;
//   · o autoteste correndo (07): sem veredito — os contadores embaixo do título
//     (aprovadas · não se aplica · pendente, nunca *x de y*), a da vez com o quadrado de agora e
//     *conferindo*, o Voltar ao menu desligado; na última, o quadro troca pro
//     fim (02): o conteúdo e o rodapé esmaecem, como entre telas, e nada desliza;
//   · entre quadros, só a troca esmaece: o rodapé nasce com o quadro;
//   · o Descartar da sessão interrompida (11, decisão 64): o diálogo e o véu nascem e somem em 150,
//     a caixa de 98% a 100%, como todo diálogo; o corte (09) e o módulo que não voltou (10) abrem
//     parados, pelo endereço e pela coluna.
// A tela abre parada pela URL (o 02 e o 04, que já acabaram; o 01 e o 08, no par da referência), em
// cada estado e no print; o 00 e o 03 pela URL correm desde o passo deles, sem animar a entrada.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const CHECK = esmaece('ds-glifo')
// o passo que fecha: o check lima no poço; e o quadrado de agora do que começa, que também esmaece (a
// peça) — separados, pra um não passar pelo outro
const FECHOU = esmaece('ds-glifo-cor-lima')
const COMECA = esmaece('ds-glifo-agora')
const LEGENDA = esmaece('ds-encerramento-legenda')
const VALOR = esmaece('ds-checagem-valor')
const TEXTO = esmaece('ds-primario-texto')                 // o texto do primário que troca no lugar
const FAIXA_SOBE = { prop: 'transform', ms: 200, em: 'ds-faixa-aberta', curva: C }
const TRILHO = [{ prop: 'transform', em: 'ds-trilho' }]    // o trilho da T16 não acende
const NADA_DESLIZA = [{ prop: 'transform', em: 'tela-miolo' }, { prop: 'transform', em: 'ds-encerramento' }]
const PASSO = [420, 780]
const PRIMEIRO = [100, 780]   // o primeiro passo depois do abre: a régua já gastou parte dele
const ASSERTIVA = [250, 550]
const M01 = '01-momento-reiniciando-o-modulo'
const M08 = '08-momento-reconectando-no-reinicio'
const M02 = '02-momento-instalacao-homologada'
const M03 = '03-momento-encerrando-sem-homologar'
const M04 = '04-momento-encerrada-sem-homologar'
const M07 = '07-momento-autoteste-correndo'
const M09 = '09-momento-o-corte-de-alimentacao'
const M11 = '11-momento-descartar-a-instalacao'
const ESTADOS = ['05-estado-homologacao-bloqueada', '06-estado-sessao-interrompida', '10-estado-o-modulo-nao-voltou-do-reinicio']
const DIALOGO = [esmaece('ds-dialogo'), { prop: 'transform', ms: 150, em: 'ds-dialogo', curva: C }, esmaece('ds-veu')]
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]

export default [
  // ── abre parada: pela URL, o que já acabou, e cada estado; no print, cada quadro ──
  { abre: `?tela=T16&momento=${M02}` },
  ...PARADA,
  { ve: 'INSTALAÇÃO HOMOLOGADA' },
  { abre: `?tela=T16&momento=${M04}` },
  ...PARADA,
  // a 07 pela URL: parada nos Pontos de cerca
  { abre: `?tela=T16&momento=${M07}` },
  ...PARADA,
  { ve: '2 aprovadas · 1 não se aplica' },
  { ve: 'ID no cadastro\nconferindo' },
  { naoVe: 'INSTALAÇÃO HOMOLOGADA' },
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T16&estado=${e}` }, ...PARADA]),
  // o corte (09) e o descartar (11) pelo endereço: parados, o diálogo nascido aberto
  { abre: `?tela=T16&momento=${M09}` },
  ...PARADA,
  { abre: `?tela=T16&momento=${M11}` },
  ...PARADA,
  ...['', `&momento=${M01}`, `&momento=${M02}`, `&momento=${M03}`, `&momento=${M04}`, `&momento=${M07}`, `&momento=${M08}`, `&momento=${M09}`, `&momento=${M11}`, ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T16${q}&print=1` }, ...PARADA]),

  // ── o Descartar da sessão interrompida (11): o voltar fecha o diálogo, e ele some com o véu em 150;
  // o Descartar o abre de novo, nascendo em 150 com o véu, de 98% a 100% ──
  { abre: `?tela=T16&momento=${M11}` },
  { quieto: true },
  { tecla: 'Escape' },
  { anima: [esmaece('ds-dialogo'), esmaece('ds-veu')] },
  { chega: 'T16', momento: null },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Descartar', anima: DIALOGO, naoAnima: [esmaece('tela-miolo')] },
  { chega: 'T16', momento: M11 },
  { dorme: 250 },
  { quieto: true },

  // ── os sete passos, desde o passo 1: a entrada fica parada ──
  { abre: '?tela=T16' },
  { quieto: true },
  { ve: '1 de 8' },
  { desligado: 'Encerrando · não desconecte' },
  // o passo 1 fecha: o check esmaece, e o 2, o reinício, começa sozinho com a legenda dele,
  // e o primário diz *Reiniciando o módulo…*, o texto apagado trocando no lugar
  { ve: '2 de 8', entre: PRIMEIRO },
  { anima: [FECHOU, COMECA, LEGENDA, TEXTO], naoAnima: TRILHO },
  { desligado: 'Reiniciando o módulo…' },
  // o 2 fecha, e a legenda passa à releitura: esmaece no lugar, e nada desliza
  { ve: '3 de 8', entre: PASSO },
  { anima: [FECHOU, COMECA, LEGENDA], naoAnima: [...TRILHO, ...NADA_DESLIZA] },
  { ve: '4 de 8', entre: PASSO },
  { anima: [FECHOU, COMECA, LEGENDA], naoAnima: TRILHO },
  { dorme: 250 },
  { quieto: true },
  // a sessão fecha: o conteúdo esmaece pra Sessão encerrada, pelo processo, e a faixa aberta sobe
  { ve: 'Sessão encerrada', entre: [1800, 3000] },
  { anima: [...TROCA, FAIXA_SOBE], naoAnima: NADA_DESLIZA },
  { chega: 'T16', momento: M07 },
  { ve: 'Sem sessão de configuração' },
  // o autoteste correndo (07): sem o veredito, e o Voltar ao menu no lugar, desligado
  { naoVe: 'INSTALAÇÃO HOMOLOGADA' },
  { desligado: 'Voltar ao menu' },
  { dorme: 150 },
  // cada assertiva: o glifo e o valor esmaecem; os contadores trocam no lugar, embaixo do título
  { ve: '1 aprovada', entre: [100, 550] },
  { anima: [CHECK, VALOR], naoAnima: [esmaece('tela-miolo')] },
  { ve: '2 aprovadas', entre: ASSERTIVA },
  { anima: [CHECK, VALOR] },
  { ve: '2 aprovadas · 1 não se aplica', entre: ASSERTIVA },
  { anima: [CHECK, VALOR] },
  // a sétima: o quadro troca pro fim (02) — a prova e o Voltar ao menu aceso vêm com ele
  { ve: 'INSTALAÇÃO HOMOLOGADA', entre: [1400, 1900] },
  { anima: TROCA, naoAnima: NADA_DESLIZA },
  { chega: 'T16', momento: M02 },
  // o traço do veredito se desenha, uma vez: 300 ms, só por transform
  { anima: [{ prop: 'transform', ms: 300, em: 'ds-prova-traco', curva: C }] },
  { dorme: 400 },
  { quieto: true },
  { toca: 'Voltar ao menu', anima: [esmaece('tela-miolo')] },   // o menu não tem rodapé
  { chega: 'T04' },

  // ── o reinício (01) e a reconexão (08) pelo endereço: parados, no par da referência ──
  { abre: `?tela=T16&momento=${M01}` },
  ...PARADA,
  { desligado: 'Reiniciando o módulo…' },
  { fica: 'T16', ms: 1300 },
  { abre: `?tela=T16&momento=${M08}` },
  ...PARADA,
  { desligado: 'Reconectando…' },

  // ── os 4 passos sem homologar (03 → 04): o check e a legenda; a troca pra encerrada sem homologar ──
  { abre: `?tela=T16&momento=${M03}` },
  { quieto: true },
  { ve: '0 de 4' },
  { ve: '1 de 4', entre: PRIMEIRO },
  { anima: [FECHOU, COMECA, LEGENDA], naoAnima: TRILHO },
  { ve: '2 de 4', entre: PASSO },
  { anima: [FECHOU, COMECA, LEGENDA] },
  { chega: 'T16', momento: M04, entre: [900, 1600] },
  { anima: [...TROCA, FAIXA_SOBE], naoAnima: NADA_DESLIZA },
  { ve: 'SEM HOMOLOGAR' },
  { dorme: 300 },
  { quieto: true },
  { toca: 'Voltar ao menu', anima: [esmaece('tela-miolo')] },   // o menu não tem rodapé
  { chega: 'T04' },

  // ── com reduzir movimento: o mesmo ritmo, em ordem, e nada anda ──
  { reduzir: true },
  { abre: '?tela=T16' },
  { quieto: true },
  { ve: '2 de 8', entre: PRIMEIRO },
  { quieto: true },
  { ve: '3 de 8', entre: PASSO },
  { quieto: true },
  { ve: 'Sessão encerrada', entre: [2000, 3100] },
  { quieto: true },
  { desligado: 'Voltar ao menu' },
  { ve: '1 aprovada', entre: [100, 550] },
  { quieto: true },
  { ve: '2 aprovadas', entre: ASSERTIVA },
  { quieto: true },
  { toca: 'Voltar ao menu', entre: [1900, 3000] },
  { chega: 'T04' },
  { quieto: true },
  { abre: `?tela=T16&momento=${M01}` },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna e a volta ao fluxo abrem parados ──
  { abre: `?tela=T16&momento=${M02}` },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Homologação bloqueada' },
  { chega: 'T16', estado: ESTADOS[0] },
  ...PARADA,
  { palco: 'Sessão interrompida' },
  { chega: 'T16', estado: ESTADOS[1] },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T16', estado: null },
  ...PARADA,
]
