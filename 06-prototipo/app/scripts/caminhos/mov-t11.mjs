// T11 · o movimento da conferência (02-telas/T11-conferir-configuracao/animacao.md):
//   · conferindo (T11·2): a tela confere ao abrir, sobre o desenho do quadro a que chega — cada
//     linha com o relógio no poço vira o glifo dela, uma a cada 400 ms (RITMOS.conferenciaLinhaMs);
//     o relógio só liga depois da troca entre telas: pelo menu, o primeiro aos 550
//     (150 + 400); pelo endereço, aos 400;
//   · as linhas de conferência (T11·3): o glifo esmaece no poço em 150, e na 00 a linha do módulo
//     junto; com reduzir, em ordem, no mesmo ritmo, sem o esmaecer;
//   · o veredito (T11·1): a caixa dele está no lugar desde
//     que a tela abre, neutra, com a contagem acompanhando os cinco blocos do script (1 de 5 … 4 de 5,
//     nada conta de zero · Ativo, Cercas, Leitor, Eventos e Conexão);
//     na quinta linha, a palavra e a cor entram em 150 — a palavra por opacity, o cinza do traço sai
//     por uma camada, o xis esmaece no poço (o 02 não mostra a versão lida no módulo). Nada muda de lugar
//     nem de altura (o marcaLugar / mesmoLugar), e o veredito só fala no fim.
// Nascida lida — no print, num estado da coluna, na folha aberta pelo endereço —, parada. A folha
// Outras ações (lei 20) é do conferencia.mjs e do mov-porcima; as de confirmação (a 06, e a 07 da
// Conexão de outra operadora), consultas, nascem abertas no print, e sobem no conferencia.mjs.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const GLIFO = esmaece('ds-glifo')
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const CHEGA_CONFERE = [esmaece('ds-aviso-titulo'), esmaece('ds-aviso-capa')]
const LINHA = [300, 560]   // 400 por linha, medido a partir do passo de antes
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
const CONFERE = '02-momento-tudo-confere'
const OUTRAS = '03-momento-outras-acoes'
const ESTADOS = ['01-estado-conteudo-que-o-app-nao-reconhece', '05-estado-revisar-em-seguida']
const CONFIRMACOES = ['06-momento-folha-de-confirmacao', '07-momento-folha-de-confirmacao-da-conexao']

export default [
  // ── nascida lida, parada: no print, nos estados da coluna e na folha aberta pelo endereço ──
  ...['', `&momento=${CONFERE}`, `&momento=${OUTRAS}`, ...ESTADOS.map((e) => `&estado=${e}`), ...CONFIRMACOES.map((m) => `&momento=${m}`)]
    .flatMap((q) => [{ abre: `?tela=T11${q}&print=1` }, ...PARADA]),
  { abre: '?tela=T11&print=1' },
  { ve: 'NÃO BATE COM O CADASTRO' },
  { ve: '4 de 5' },
  { abre: `?tela=T11&estado=${ESTADOS[0]}` }, ...PARADA, { ve: 'NÃO BATE COM O CADASTRO' },
  { abre: `?tela=T11&estado=${ESTADOS[1]}` }, ...PARADA, { ve: 'REVISAR EM SEGUIDA' },
  { abre: `?tela=T11&momento=${OUTRAS}` },
  ...PARADA,
  { ve: 'NÃO BATE COM O CADASTRO' },

  // O endereço simples usa o herói; o par divergente só abre como consulta parada.
  { abre: '?tela=T11&estado=00-tela' },
  ...PARADA,
  { ve: 'NÃO BATE COM O CADASTRO' },
  { naoToca: 'Corrigir este bloco' },

  // ── o 02 pelo menu: a troca entre telas, e o relógio só depois dela ──
  { abre: '?tela=T04' },
  { toca: 'Entendi' },
  { dorme: 250 },
  { toca: 'Conferir configuração', anima: TROCA, naoAnima: [GLIFO] },
  { chega: 'T11', momento: CONFERE },
  { dorme: 300 },
  { quieto: true },                                         // a troca acabou, e o primeiro bloco ainda não
  { naoVe: 'CONFERE COM O CADASTRO' },
  { ve: '1 de 5', entre: [100, 400] },                      // aos 550 do toque: 150 da troca + 400
  { anima: [GLIFO] },
  { ve: '3 de 5', entre: [650, 1000] },                     // a terceira linha (o Leitor, na ordem do script)
  { ve: '4 de 5', entre: LINHA },
  { ve: 'CONFERE COM O CADASTRO', entre: LINHA },
  { anima: CHEGA_CONFERE },                                 // o lima do traço por camada
  { naoVe: 'igual à do cadastro' },                         // a T11 não mostra a versão lida no módulo
  { dorme: 250 },
  { quieto: true },
  // a saída: a troca entre telas, de volta ao menu (o topo muda: só o miolo esmaece)
  { toca: 'Voltar ao menu', anima: [esmaece('tela-miolo')] },
  { chega: 'T04' },
  { dorme: 250 },

  // ── o 02 pelo endereço: o primeiro aos 400 ──
  // o Outras ações desligado da leitura acende no mesmo lugar, embaixo do
  // Voltar ao menu (o mesmoLugar guarda o texto dele), e abre a folha
  { abre: `?tela=T11&momento=${CONFERE}` },
  { quieto: true },
  { ve: 'Voltar ao menu\nOutras ações' },
  { desligado: 'Voltar ao menu' },
  { desligado: 'Outras ações' },
  { marcaLugar: true },
  { ve: '1 de 5', entre: [100, 520] },
  { anima: [GLIFO] },
  { ve: 'CONFERE COM O CADASTRO', entre: [1350, 1850] },
  { anima: CHEGA_CONFERE },
  { dorme: 250 },
  { quieto: true },
  { mesmoLugar: true },
  { naoVe: 'As ações liberam quando a leitura terminar.' },
  { ve: 'Voltar ao menu\nOutras ações' },
  { toca: 'Outras ações' },
  { ve: 'Apenas registrar o diagnóstico' },
  { tecla: 'Escape' },
  { dorme: 400 },
  { naoVe: 'Apenas registrar o diagnóstico' },

  // ── com reduzir movimento: em ordem, no mesmo ritmo, sem o esmaecer; a palavra e a cor entram direto ──
  { reduzir: true },
  { abre: '?tela=T11' },
  { quieto: true },
  { ve: '1 de 5', entre: [100, 520] },
  { quieto: true },
  { ve: '2 de 5', entre: LINHA },
  { quieto: true },
  { ve: '3 de 5', entre: LINHA },
  { quieto: true },
  { ve: '4 de 5', entre: LINHA },
  { quieto: true },
  { ve: 'CONFERE COM O CADASTRO', entre: LINHA },
  { quieto: true },
  { ve: '5 de 5' },
  { abre: '?tela=T04' },
  { toca: 'Entendi' },
  { toca: 'Conferir configuração' },
  { quieto: true },
  { chega: 'T11', momento: CONFERE },
  { ve: '1 de 5', entre: [200, 560] },
  { quieto: true },
  { ve: 'CONFERE COM O CADASTRO', entre: [1350, 1950] },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna abre parado; a volta ao fluxo e o pulo, a leitura dali ──
  { abre: '?tela=T11&print=1' },
  { abre: '?tela=T11' },
  { janela: [1440, 900] },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  { dorme: 250 },
  { palco: 'Revisar em seguida' },
  { chega: 'T11', estado: ESTADOS[1] },
  ...PARADA,
  { palco: 'Conteúdo não reconhecido' },
  { chega: 'T11', estado: ESTADOS[0] },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T11', estado: null },
  { quieto: true },
  { ve: '1 de 5', entre: [150, 560] },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  { abre: '?tela=T04' },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },   // o painel desliza da esquerda: o toque espera ele parar no lugar
  { palco: 'T11' },
  { chega: 'T11' },
  { quieto: true },
  { ve: '1 de 5', entre: [150, 560] },
]
