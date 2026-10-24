// A troca entre telas e entre quadros inteiros (movimento.md,
// "Entre telas"; a peça: src/ds/chrome/Troca.jsx, e o gatilho entre telas: src/App.jsx).
// Quando um toque leva a outra tela, só o conteúdo da nova — o miolo e o rodapé — esmaece de
// 0 a 1 em --mov-rapido (150), na --mov-curva; a barra do sistema, a tira e a faixa ficam de
// fora e trocam direto quando o topo muda (o menu). O voltar do Android (o Esc) é o toque na
// saída do rodapé, e esmaece igual. Nada se move no que não é toque: a primeira abertura, o
// recarregar, o print, o pulo do palco, o estado da coluna, a volta ao fluxo, o login pelo painel e o
// processo que leva sozinho a outra tela (os 4 passos da T16, que seguem pro login). Com
// reduzir movimento, a troca é direta. Na vitrine, a troca de quadro (a Troca por chave, que
// as telas ligam na fase seguinte): a primeira chave abre parada, e cada troca esmaece.
// O que tem de ficar parado — o topo — não aparece em nenhum `anima`: o movimento.json deste
// roteiro não tem nada em ds-barra-sistema, ds-faixa nem ds-tira-contexto.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const MIOLO = { prop: 'opacity', ms: 150, curva: C, em: 'tela-miolo' }
const RODAPE = { prop: 'opacity', ms: 150, curva: C, em: 'ds-rodape' }
const TEXTO = { prop: 'opacity', ms: 150, curva: C, em: 'ds-primario-texto' }

export default [
  // ── a primeira abertura: o login abre parado ──
  { abre: '' },
  { chega: 'T01', momento: null },
  { quieto: true },
  // ── o toque que leva a outra tela: o login → as empresas → a sincronização, sem sessão (a barra da página fica) ──
  { digita: 'Varzea26', em: 'SENHA' },
  // a espera do Entrar: o primário diz Entrando…, desabilitado,
  // e a T02 chega 1,2 s depois, com a troca entre telas — a resposta do toque
  { toca: 'Entrar', anima: [TEXTO] },
  { desligado: 'Entrando…' },
  { chega: 'T02', entre: [800, 1700] },
  { anima: [MIOLO, RODAPE] },
  { dorme: 200 },   // o esmaecer acaba antes do próximo toque: o movimento.json de cada toque é só dele
  // o contexto é a empresa (decisão 56): a T02 é um quadro só, e o Sincronizar leva à T03
  { marca: 'Viação Atlântico Sul' },
  { dorme: 200 },
  { toca: 'Sincronizar', anima: [MIOLO, RODAPE] },
  { chega: 'T03' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  // ── o topo muda: a tira e a faixa do menu entram direto, e só o miolo esmaece (o menu não tem rodapé) ──
  { toca: 'Ir para o menu', anima: [MIOLO] },
  { chega: 'T04' },
  { ve: 'Seu acesso vence em 2 dias' },
  { dorme: 200 },
  { quieto: true },
  { toca: 'Entendi' },
  { naoVe: 'Seu acesso vence em 2 dias' },
  { dorme: 200 },
  // do menu a uma consulta e de volta: o topo muda de novo, e o conteúdo esmaece nas duas
  { toca: 'Últimas instalações', anima: [MIOLO, RODAPE] },
  { chega: 'T12' },
  { dorme: 200 },
  { toca: 'Voltar ao menu', anima: [MIOLO] },
  { chega: 'T04' },
  { dorme: 200 },
  { toca: 'Fila de saída', anima: [MIOLO, RODAPE] },
  { chega: 'T15' },
  { dorme: 200 },
  // o voltar do Android (o Esc): o mesmo que a saída do rodapé, o mesmo esmaecer
  { tecla: 'Escape' },
  { anima: [MIOLO] },
  { chega: 'T04' },
  { dorme: 200 },
  // ── com reduzir movimento, a troca é direta ──
  { reduzir: true },
  { toca: 'Últimas instalações' },
  { chega: 'T12' },
  { quieto: true },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  { quieto: true },
  { reduzir: false },
  // ── o recarregar: a página recomeça do login, parada ──
  { recarrega: true },
  { chega: 'T01' },
  { quieto: true },
  // ── o print: nada se move ──
  { abre: '?tela=T04&print=1' },
  { quieto: true },
  { abre: '?tela=T12&momento=01-momento-detalhe-da-instalacao&print=1' },
  { quieto: true },
  // ── o processo que leva sozinho a outra tela não é toque: os 4 passos da T16 seguem pro login parados ──
  { abre: '?tela=T04' },
  { quieto: true },
  { toca: 'Entendi' },
  { dorme: 200 },
  { toca: 'Conta — Rafael Vieira' },
  { toca: 'Sair da conta' },
  { toca: 'Encerrar a sessão e sair', anima: [MIOLO, RODAPE] },
  { chega: 'T16', momento: '03-momento-encerrando-sem-homologar', ms: 1000 },
  { chega: 'T01', momento: null, entre: [1500, 3500] },
  { quieto: true },
  // ── o palco, na janela larga: o pulo, o estado da coluna, a volta ao fluxo e o login pelo painel abrem parados ──
  { abre: '?tela=T04' },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Checklist pendente' },
  { chega: 'T04', estado: '04-estado-checklist-pendente' },
  { quieto: true },
  { palco: 'Voltar ao fluxo' },
  { chega: 'T04', estado: null },
  { quieto: true },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },   // o painel desliza da esquerda: o toque espera ele parar no lugar
  { palco: 'T12' },
  { chega: 'T12' },
  { quieto: true },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },
  { palco: 'T01' },      // o login pelo painel zera o estado (sem o Recomeçar do login)
  { chega: 'T01', momento: null },
  { quieto: true },
  { palco: 'Fechar' },   // escolher uma tela deixa o painel aberto: o X dele fecha
  { dorme: 400 },
  // e na janela larga o toque segue igual: do login às empresas
  { digita: 'Varzea26', em: 'SENHA' },
  // a espera do Entrar: o primário diz Entrando…, desabilitado,
  // e a T02 chega 1,2 s depois, com a troca entre telas — a resposta do toque
  { toca: 'Entrar', anima: [TEXTO] },
  { desligado: 'Entrando…' },
  { chega: 'T02', entre: [800, 1700] },
  { anima: [MIOLO, RODAPE] },
  // ── a vitrine: a troca de quadro por chave, tocável ──
  { janela: [360, 800] },
  { abre: '?vitrine=1&especime=mov-troca-quadro' },
  { quieto: true },
  { toca: 'RKT-8H42', anima: [MIOLO, RODAPE] },
  { ve: 'Voltar às instalações' },
  { dorme: 200 },
  { toca: 'Voltar às instalações', anima: [MIOLO, RODAPE] },
  { ve: 'Últimas instalações' },
  { dorme: 200 },
  { reduzir: true },
  { toca: 'RKT-8H42' },
  { quieto: true },
  { reduzir: false },
]
