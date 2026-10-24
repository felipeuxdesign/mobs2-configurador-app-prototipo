// Decisão 36 · ENCERRAR antes de homologar (logica.md, ENCERRAR): o diálogo
// Encerrar antes de terminar? antes dos 4 passos — por cima da própria tela, na T07
// (o diagnóstico), na T06, na T09 e na T13, e por cima do menu, o momento 13 da T04, também pelo
// Encerrar a sessão das folhas do módulo e do ativo. O Continuar a instalação
// fecha e deixa o técnico onde estava; o voltar (o Esc) também, antes da saída
// da tela; o Encerrar mesmo assim roda os 4 passos, a Sessão encerrada sem
// homologar, e o menu sem sessão. Só por toque, do login.
const ATE_A_FAIXA = [
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { marca: 'M2C-0417' },
  { toca: 'Conectar ao M2C-0417' },
  // a conexão abre o diagnóstico (T07): as sete passam, e a faixa desce
  { chega: 'T07', momento: null },
  { ve: 'ENCERRAR', ms: 12000 },
  { ve: '8 de 8' },
]
const O_DIALOGO = [
  { ve: 'Encerrar antes de terminar?' },
  { ve: 'A instalação ainda não terminou. O módulo fica seguro, e o que já foi enviado fica nele.' },
  { ve: 'Continuar a instalação' },
]
// Numa tela que não é o menu, o diálogo abre por cima dela, sem endereço: a URL
// fica a da tela. O Continuar fecha, e o técnico fica; o Esc fecha só o diálogo
// (a saída da tela espera); e o Encerrar mesmo assim leva aos 4 passos.
// O movimento é o dos diálogos: o véu e a caixa esmaecem, e a caixa cresce, em 150
// (conferido logo depois do toque, enquanto anda: o diálogo entra fechado e abre no
// quadro seguinte, e numa máquina carregada esse quadro pode vir depois dos dois do toque).
const ABRE = { anima: [{ prop: 'opacity', ms: 150, em: 'ds-veu' }, { prop: 'opacity', ms: 150, em: 'ds-dialogo' }, { prop: 'transform', ms: 150, em: 'ds-dialogo' }] }
const FECHA = { anima: [{ prop: 'opacity', ms: 150, em: 'ds-dialogo' }, { prop: 'opacity', ms: 150, em: 'ds-veu' }] }
const NA_TELA = (tela, momento) => [
  { toca: 'ENCERRAR' },
  ABRE,
  ...O_DIALOGO,
  { chega: tela, momento },
  { naoToca: 'ENCERRAR' },   // o que fica atrás do véu não se toca
  { dorme: 200 },            // o diálogo acabou de abrir; fechar, então, também leva os 150
  { toca: 'Continuar a instalação' },
  FECHA,
  { naoVe: 'Encerrar antes de terminar?' },
  { fica: tela, ms: 300 },
  { chega: tela, momento },
  { toca: 'ENCERRAR' },
  { ve: 'Encerrar antes de terminar?' },
  { tecla: 'Escape' },
  { naoVe: 'Encerrar antes de terminar?' },
  { fica: tela, ms: 300 },
  { chega: tela, momento },
  { toca: 'ENCERRAR' },
  ...O_DIALOGO,
  { toca: 'Encerrar mesmo assim' },
]
// os 4 passos, um a cada 600 ms (encerramentoPassoMs): o técnico já confirmou, e nada mais pergunta
const OS_QUATRO_PASSOS = [
  { chega: 'T16', momento: '03-momento-encerrando-sem-homologar', ms: 1000 },
  // o primeiro dos quatro corre dizendo o que faz (as legendas do tela.md)
  { ve: 'Devolve o módulo ao repouso que ele tinha antes da sessão.', ms: 500 },
  { naoVe: 'Cancelar', ms: 300 },
  { naoVe: 'Encerrar antes de terminar?', ms: 300 },
  { ve: 'Sem homologar · só o que deixa o módulo seguro' },
  { ve: 'Encerrando · não desconecte' },
  { ve: 'A saída volta quando o módulo desconectar' },
  { ve: 'pulado' },
  // o pulado não é o não se aplica: o traço dele
  // fica mudo pro leitor, e a situação ao lado diz 'pulado'; os outros glifos continuam com nome
  { naoOuve: 'não se aplica' },
  { ouve: 'o passo que corre' },
  // o segundo dos quatro, com a legenda dele
  { ve: 'Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar.', entre: [0, 1000] },
  { fica: 'T16', ms: 300 },
  { tecla: 'Escape' },   // no encerramento, o voltar não faz nada
  // o terceiro e o quarto, cada um com a sua, um a cada 600 ms
  { ve: 'Guarda o que foi feito aqui, pra ir ao servidor junto com a instalação.', entre: [0, 1000] },
  { ve: 'Solta o Bluetooth. O módulo fica livre pra outro aparelho.', entre: [300, 1000] },
  { chega: 'T16', momento: '04-momento-encerrada-sem-homologar', entre: [300, 1000] },
  { ve: 'Sem sessão de configuração' },
  { naoVe: 'ENCERRAR' },
  { ve: 'SEM HOMOLOGAR' },
  { ve: 'A instalação continua aberta. O que foi enviado fica no módulo.' },   // enviado, não gravado
  { ve: 'restaurado' },
  { ve: 'fechado' },
  { ve: 'na fila' },
  { ve: 'desconectado' },   // a Desconexão
  // o que não rodou é uma frase só, sem o rótulo em caixa alta (T16/04)
  { ve: 'Não rodaram: contadores, reinício, releitura e o autoteste.' },
  { naoVe: 'NÃO RODARAM' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  { ve: 'Sem sessão de configuração' },
  { naoVe: 'ENCERRAR' },
  { ve: 'toque para procurar' },
]
const O_ONIBUS = [
  { marca: 'RKT-8H42' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { toca: 'Vincular o módulo' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { ve: 'RKT-8H42' },
]
const T09_05 = '05-momento-o-que-vai-ser-gravado'
// no menu, o diálogo é o momento 13: a URL abre e fecha, e o Continuar volta ao quadro do menu
const NO_MENU = '13-momento-encerrar-antes-de-homologar'

export default [
  { abre: '' },
  { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  { chega: 'T02' },
  // o contexto é a empresa (decisão 56): a Viação, e o Sincronizar baixa o pacote dela
  { marca: 'Viação Atlântico Sul' },
  { toca: 'Sincronizar' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  // o 5º dia do acesso: o aviso na primeira chegada ao menu, e o Entendi fecha (T04/12)
  { ve: 'Seu acesso vence em 2 dias' },
  { toca: 'Entendi' },
  { naoVe: 'Seu acesso vence em 2 dias' },

  // 1ª passada: a T06 (sem ativo) e a T09 antes de gravar (com o ônibus), por cima da própria tela
  ...ATE_A_FAIXA,
  { toca: 'Selecionar ativo' },
  { chega: 'T06', momento: null },
  { toca: 'ENCERRAR' },
  ...O_DIALOGO,
  { toca: 'Continuar a instalação' },
  { naoVe: 'Encerrar antes de terminar?' },
  { chega: 'T06', momento: null },
  { toca: 'ENCERRAR' },
  { ve: 'Encerrar antes de terminar?' },
  { tecla: 'Escape' },   // o voltar fecha o diálogo, e não o Voltar ao menu da T06
  { naoVe: 'Encerrar antes de terminar?' },
  { fica: 'T06', ms: 300 },
  { ve: 'Escolha o veículo que está na sua frente.' },
  ...O_ONIBUS,
  ...NA_TELA('T09', T09_05),
  ...OS_QUATRO_PASSOS,

  // 2ª passada: a sessão recém-nascida, sem ativo, no próprio diagnóstico
  ...ATE_A_FAIXA,
  { ve: 'sem ativo' },
  ...NA_TELA('T07', null),
  ...OS_QUATRO_PASSOS,

  // 3ª passada: no menu, com o módulo e o ônibus — o ENCERRAR da faixa e o Encerrar a
  // sessão das folhas do módulo e do ativo abrem o mesmo diálogo, por cima do menu
  ...ATE_A_FAIXA,
  { toca: 'Selecionar ativo' },
  { chega: 'T06' },
  ...O_ONIBUS,
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: null },
  { toca: 'ENCERRAR' },
  ABRE,
  { chega: 'T04', momento: NO_MENU },
  ...O_DIALOGO,
  { naoToca: 'Fila de saída' },   // o menu atrás do véu não se toca, nem a tira
  { naoToca: 'Conta — Rafael Vieira' },
  { toca: 'Continuar a instalação' },
  { chega: 'T04', momento: null },
  { naoVe: 'Encerrar antes de terminar?' },
  { toca: 'ENCERRAR' },
  { chega: 'T04', momento: NO_MENU },
  { tecla: 'Escape' },
  { chega: 'T04', momento: null },
  { naoVe: 'Encerrar antes de terminar?' },
  // a folha do módulo travado na sessão: o Encerrar a sessão fecha a folha e abre o diálogo
  { toca: 'CONECTAR MÓDULO, M2C-0417' },
  { chega: 'T04', momento: '10-momento-folha-modulo-conectado' },
  { ve: 'TRAVADO NA SESSÃO' },
  { toca: 'Encerrar a sessão' },
  { chega: 'T04', momento: NO_MENU },
  { naoVe: 'TRAVADO NA SESSÃO' },
  ...O_DIALOGO,
  { toca: 'Continuar a instalação' },
  { chega: 'T04', momento: null },
  // a folha do ativo da sessão: o mesmo
  { toca: 'ATIVO SELECIONADO, RKT-8H42' },
  { chega: 'T04', momento: '11-momento-folha-ativo-da-sessao' },
  { ve: 'Ativo da sessão' },
  { ve: 'Enquanto a sessão estiver aberta, o ativo não troca. Pra trocar de ativo, encerre a sessão.' },
  { toca: 'Encerrar a sessão' },
  { chega: 'T04', momento: NO_MENU },
  { naoVe: 'Ativo da sessão' },
  ...O_DIALOGO,
  { tecla: 'Escape' },
  { chega: 'T04', momento: null },
  // o checklist, com a faixa: o diálogo por cima dele, e o Encerrar mesmo assim
  { toca: 'Finalizar com checklist' },
  { chega: 'T13', momento: null },
  ...NA_TELA('T13', null),
  ...OS_QUATRO_PASSOS,

  // 4ª passada: do menu sem ativo, a folha do módulo, e o Encerrar mesmo assim do diálogo dela
  ...ATE_A_FAIXA,
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: '02-momento-modulo-sem-ativo' },
  { ve: 'sem ativo' },
  { toca: 'CONECTAR MÓDULO, M2C-0417' },
  { chega: 'T04', momento: '10-momento-folha-modulo-conectado' },
  { ve: 'Módulo conectado' },
  { ve: 'VL06 · CAN-BT · firmware 8.04' },
  { ve: 'TRAVADO NA SESSÃO' },
  { ve: 'Enquanto a sessão estiver aberta, o módulo não troca. Pra trocar de módulo, encerre a sessão.' },
  { toca: 'Encerrar a sessão' },
  { chega: 'T04', momento: NO_MENU },
  ...O_DIALOGO,
  { toca: 'Encerrar mesmo assim' },
  ...OS_QUATRO_PASSOS,
]
