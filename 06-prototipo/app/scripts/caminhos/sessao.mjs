// T16 · as legendas do encerramento. Na sessão do herói, cada passo que corre diz o que
// faz, um a cada 600 ms (encerramentoPassoMs), até a Sessão encerrada: o 2, o reinício por
// comando, diz *reiniciando* com a legenda dele, e o primário *Reiniciando o módulo…*. O 01 e o 08
// se alcançam pelo endereço do momento, parados, no herói (RKT-8H42 · M2C-0417), como a referência
// desenha: o reinício, e a conexão que caiu no meio dele, que o app reconecta sozinho. Os desfechos
// (decisão 64): o corte no VL08 do caminhão (09), uma vez, com o técnico; o módulo que não voltou do
// reinício (10), com o que conferir e as duas saídas; e o Descartar da sessão interrompida, que
// pergunta antes e grava a conexão (11).
const LEGENDA = {
  contadores: 'Grava os contadores e o estado no módulo, pra nada se perder no reinício.',
  reinicio: 'O módulo reinicia sozinho. Leva alguns segundos.',
  reconectando: 'A conexão caiu no reinício. O app reconecta sozinho.',
  corte: 'Este módulo não reinicia por comando. Desligue a alimentação dele e ligue de novo, uma vez só.',
  naoVoltou: 'O módulo não voltou depois do reinício. Confira se ele está ligado e perto do celular.',
  releitura: 'Ele lê de volta a configuração que está no módulo. É isto que prova que ela sobreviveu ao reinício.',
  repouso: 'Devolve o módulo ao repouso que ele tinha antes da sessão.',
  canal: 'Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar.',
  registro: 'Guarda o que foi feito aqui, pra ir ao servidor junto com a instalação.',
  desconexao: 'Solta o Bluetooth. O módulo fica livre pra outro aparelho.',
}
export default [
  // o 01 pelo endereço: o reinício, parado
  { abre: '?tela=T16&momento=01-momento-reiniciando-o-modulo' },
  { chega: 'T16', momento: '01-momento-reiniciando-o-modulo' },
  { ve: LEGENDA.reinicio, ms: 500 },
  { ve: 'reiniciando' },
  { ve: 'RKT-8H42' },
  { desligado: 'Reiniciando o módulo…' },
  { naoVe: 'com você' },
  { tecla: 'Escape' },   // no encerramento, o voltar não faz nada
  { fica: 'T16', ms: 1300 },
  { ve: LEGENDA.reinicio },
  // o 08 pelo endereço: a conexão caiu no reinício, e o app reconecta sozinho — nunca falha
  { abre: '?tela=T16&momento=08-momento-reconectando-no-reinicio' },
  { chega: 'T16', momento: '08-momento-reconectando-no-reinicio' },
  { ve: LEGENDA.reconectando },
  { ve: 'reconectando' },
  { desligado: 'Reconectando…' },
  { naoVe: LEGENDA.reinicio },
  // o herói: os sete passos correm desde o 1, cada um com a sua legenda, um a cada 600 ms
  { abre: '?tela=T16' },
  { chega: 'T16', momento: null },
  { ve: LEGENDA.contadores },
  { desligado: 'Encerrando · não desconecte' },
  { ve: LEGENDA.reinicio, entre: [0, 1000] },
  { ve: 'reiniciando' },
  { desligado: 'Reiniciando o módulo…' },
  { naoVe: LEGENDA.contadores },
  { ve: LEGENDA.releitura, entre: [300, 1000] },
  { ve: 'de volta' },
  { desligado: 'Encerrando · não desconecte' },
  { naoVe: LEGENDA.reinicio },
  { ve: LEGENDA.repouso, entre: [300, 1000] },
  { naoVe: LEGENDA.releitura },
  { ve: LEGENDA.canal, entre: [300, 1000] },
  { ve: LEGENDA.registro, entre: [300, 1000] },
  { ve: LEGENDA.desconexao, entre: [300, 1000] },
  // fechado o sétimo, a Sessão encerrada, sem legenda de passo nenhum: o autoteste correndo (07),
  // e a 02 quando a última assertiva chega
  { chega: 'T16', momento: '07-momento-autoteste-correndo', entre: [300, 1000] },
  { ve: 'Sessão encerrada' },
  { chega: 'T16', momento: '02-momento-instalacao-homologada', entre: [2400, 4000] },
  { naoVe: LEGENDA.desconexao },
  { ve: 'INSTALAÇÃO HOMOLOGADA' },
  { ve: 'Sem sessão de configuração' },

  // ── a 09 pelo endereço: o módulo que não reinicia por comando (o VL08 do caminhão) pede o corte, uma vez ──
  { abre: '?tela=T16&momento=09-momento-o-corte-de-alimentacao' },
  { chega: 'T16', momento: '09-momento-o-corte-de-alimentacao' },
  { ve: LEGENDA.corte },
  { ve: 'com você' },
  { ve: 'KNB-5H39' },
  { desligado: 'Esperando o módulo religar…' },
  { ve: 'A saída volta quando o autoteste terminar' },
  { naoVe: LEGENDA.reinicio },
  { tecla: 'Escape' },   // no encerramento, o voltar não faz nada
  { fica: 'T16', ms: 900 },
  // ── a 10 pela coluna: o módulo do herói que não voltou do reinício no tempo limite, parado ──
  { abre: '?tela=T16&estado=10-estado-o-modulo-nao-voltou-do-reinicio' },
  { chega: 'T16', estado: '10-estado-o-modulo-nao-voltou-do-reinicio' },
  { ve: LEGENDA.naoVoltou },
  { ve: 'não voltou' },
  { ve: 'RKT-8H42' },
  { ve: 'Tentar de novo' },
  { ve: 'Encerrar sem homologar' },
  { naoVe: 'Reiniciando o módulo…' },
  // ── a 11: o Descartar da sessão interrompida pergunta antes (HU-T09-10, HU-T16-7) ──
  { abre: '?tela=T16&momento=11-momento-descartar-a-instalacao' },
  { chega: 'T16', momento: '11-momento-descartar-a-instalacao' },
  { ve: 'Descartar a instalação?' },
  { ve: 'O M2C-0411 foi zerado e ainda está sem a conexão. Antes de descartar, o app grava só a conexão, pra ele voltar a falar com o servidor.' },
  { ve: 'O que já foi enviado fica no módulo, e o descarte fica registrado.' },
  { ve: 'Retomar a instalação' },
  // o voltar fecha o diálogo e volta à 06, sem escolher pelo técnico
  { tecla: 'Escape' },
  { naoVe: 'Descartar a instalação?' },
  { ve: 'Sessão interrompida' },
  { chega: 'T16', momento: null },
  // o Descartar pergunta de novo; o Gravar a conexão e descartar vai ao menu sem sessão, e o descarte
  // fica registrado na fila do aparelho (o cartão conta 3: os 2 de antes e o registro do descarte)
  { toca: 'Descartar' },
  { chega: 'T16', momento: '11-momento-descartar-a-instalacao' },
  { ve: 'Descartar a instalação?' },
  { toca: 'Gravar a conexão e descartar' },
  { chega: 'T04' },
  { toca: 'Entendi' },   // o 5º dia do acesso: o aviso na primeira chegada ao menu (T04/12)
  { ve: 'Sem sessão de configuração' },
  { ouve: 'Fila de saída, 3' },
  // o Retomar a instalação do diálogo é o Retomar: a cadeia da T09, no bloco que parou
  { abre: '?tela=T16&momento=11-momento-descartar-a-instalacao' },
  { toca: 'Retomar a instalação' },
  { chega: 'T09' },
]
