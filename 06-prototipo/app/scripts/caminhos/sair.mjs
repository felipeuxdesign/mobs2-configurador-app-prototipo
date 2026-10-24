// Os diálogos do menu (logica.md · ENCERRAR, decisão 64): o sair pergunta sempre e diz o que
// fica — a fila do aparelho, o mesmo número do cartão (2), a sessão que encerra antes e que
// entrar de novo precisa de rede. Com a sessão aberta, o primário passa pelos 4 passos da
// sessão abortada da T16 e segue pro destino gravado — o login com a fila preservada, ou a
// sincronização da empresa nova; com o checklist registrado (a 20), pelo encerramento completo,
// com o reinício e o autoteste; sem sessão, só sai. Os diálogos já são a confirmação deles, e
// dizem *sem terminar a instalação* (decisão 36): o Encerrar antes de terminar? não aparece no
// caminho — nenhum pergunta duas vezes. Na folha de trocar de empresa, o toque marca, e o
// Sincronizar troca (R-14).
const LOGIN_ATE_O_MENU = [
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
]
// o 5º dia do acesso: o aviso na primeira chegada ao menu, e o Entendi fecha (T04/12)
const O_AVISO = [
  { ve: 'Seu acesso vence em 2 dias' },
  { toca: 'Entendi' },
  { naoVe: 'Seu acesso vence em 2 dias' },
]
const SESSAO_ABERTA = [
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { marca: 'M2C-0417' },
  { toca: 'Conectar ao M2C-0417' },
  // a conexão abre o diagnóstico (T07): as sete passam, e a faixa desce
  { chega: 'T07' },
  { ve: 'ENCERRAR', ms: 12000 },
  { toca: 'Selecionar ativo' },
  { chega: 'T06' },
  { marca: 'RKT-8H42' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { toca: 'Vincular o módulo' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: null },
  { ve: 'RKT-8H42' },
  { ve: 'ENCERRAR' },
]
// os 4 passos, sem outra confirmação, e o app segue sozinho pro destino
const OS_QUATRO_PASSOS = [
  { chega: 'T16', momento: '03-momento-encerrando-sem-homologar', ms: 1000 },
  { naoVe: 'Encerrar antes de terminar?', ms: 300 },
  { ve: 'Sem homologar · só o que deixa o módulo seguro' },
  { ve: 'Encerrando · não desconecte' },
]

export default [
  { abre: '' },
  ...LOGIN_ATE_O_MENU,
  ...O_AVISO,
  ...SESSAO_ABERTA,
  // Sair da conta: as iniciais → a folha Conta → o diálogo
  { toca: 'Conta — Rafael Vieira' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { ve: 'Rafael Vieira' },
  { ve: 'r.vieira · Viação Atlântico Sul' },
  { toca: 'Sair da conta' },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  // a fila do aparelho, o número do cartão (2), a sessão que encerra antes, e o login que precisa de rede
  { ve: '2 itens ainda não chegaram ao servidor. Eles ficam no aparelho e continuam subindo.' },
  { ve: 'A sessão de configuração do M2C-0417 é encerrada antes, sem terminar a instalação.' },
  { ve: 'Pra entrar de novo, o login precisa de rede.' },
  { naoVe: 'sem homologar' },
  // o Cancelar volta à folha de onde o diálogo nasceu (T04·8)
  { toca: 'Cancelar' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { toca: 'Sair da conta' },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  { toca: 'Encerrar a sessão e sair' },
  ...OS_QUATRO_PASSOS,
  // fechado o 4º passo, o login, sem a sessão: sem Lembrar meu usuário, o celular não
  // lembra ninguém — o quadro da 15, os dois campos vazios (T01 · entradaDoFluxo)
  { chega: 'T01', momento: null, entre: [1500, 3500] },
  { ve: 'Esqueci a senha' },
  { desligado: 'Digite o usuário' },
  { digita: 'r.vieira', em: 'USUÁRIO' },
  ...LOGIN_ATE_O_MENU,
  { naoVe: 'ENCERRAR' },
  { ve: 'Sem sessão de configuração' },
  { naoVe: 'Seu acesso vence em 2 dias' },   // sair e entrar de novo não zera o aviso: ele é uma vez por dia
  // a fila preservada: sem sessão e com a fila, o diálogo pergunta também, e conta o mesmo do cartão
  // (os 2 que não chegaram da fila do aparelho), sem a frase da sessão; o primário só sai
  { ouve: 'Fila de saída, 2' },
  { toca: 'Conta — Rafael Vieira' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { ve: 'Quando vencer, o app pede a senha de novo, com rede.' },
  { toca: 'Sair da conta' },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  { ve: '2 itens ainda não chegaram ao servidor. Eles ficam no aparelho e continuam subindo.' },
  { naoVe: 'A sessão de configuração do' },
  { ve: 'Pra entrar de novo, o login precisa de rede.' },
  { ve: 'Sair da conta' },
  { naoToca: 'Encerrar a sessão e sair' },
  { toca: 'Cancelar' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { tecla: 'Escape' },   // a folha fecha pelo voltar
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  // 2ª passada: trocar de empresa com a sessão aberta — a tira diz pro leitor o que ela faz e qual é a empresa
  ...SESSAO_ABERTA,
  { toca: 'Trocar de empresa — Viação Atlântico Sul' },
  { chega: 'T04', momento: '07-momento-folha-trocar-de-empresa' },
  { ve: 'Trocar de empresa' },
  { ve: 'Trocar recarrega os ativos e o pacote desta empresa.' },
  { desligado: 'Escolha outra empresa' },
  // o toque marca (R-14): a outra fica marcada, e o primário acende com Sincronizar (a 21)
  { marca: 'Transportes Capibaribe' },
  { chega: 'T04', momento: '21-momento-folha-trocar-de-empresa-outra-marcada' },
  { naoVe: 'é encerrada antes da troca' },
  { toca: 'Sincronizar' },
  // o diálogo diz pra qual empresa (decisão 64)
  { ve: 'Trocar pra Transportes Capibaribe?' },
  { ve: 'A sessão de configuração do M2C-0417 é encerrada antes da troca, sem terminar a instalação.' },
  { ve: 'O que já foi enviado fica no módulo.' },
  { toca: 'Cancelar' },
  { naoVe: 'é encerrada antes da troca, sem terminar a instalação.' },
  // de volta à folha, a marca continua onde estava
  { ve: 'Trocar recarrega os ativos e o pacote desta empresa.' },
  { ve: 'Sincronizar' },
  { toca: 'Sincronizar' },
  { toca: 'Encerrar a sessão e trocar' },
  ...OS_QUATRO_PASSOS,
  // fechado o 4º passo, a sincronização da empresa nova
  { chega: 'T03', entre: [1500, 3500] },
  { ve: 'TRANSPORTES CAPIBARIBE' },
  // o pacote de 4 dias da Capibaribe pergunta antes de baixar (o roteiro idade-do-pacote)
  { ve: 'PACOTE DE 4 DIAS' },
  { toca: 'Sincronizar agora' },
  { ve: 'Baixando o pacote' },
  { chega: 'T03', momento: '02-momento-concluido', entre: [3000, 6000] },
  { ve: 'Pacote de hoje' },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  { ve: 'TRANSPORTES CAPIBARIBE' },
  { ve: 'Sem sessão de configuração' },
  { naoVe: 'ENCERRAR' },

  // ── a 17: sem sessão e sem nada na fila, o sair pergunta também (HU-T01-12) · o mundo do herói
  // sempre tem a fila do aparelho, e a 17 se alcança pelo endereço, no quadro dela ──
  { abre: '?tela=T04&momento=17-momento-folha-conta-sair-sem-pendencia' },
  { chega: 'T04', momento: '17-momento-folha-conta-sair-sem-pendencia' },
  { ve: 'Nenhuma sessão aberta e nada na fila.' },
  { ve: 'Pra entrar de novo, o login precisa de rede.' },
  { naoVe: 'itens ainda não chegaram' },
  // o Cancelar volta à folha da Conta, e o sair pergunta de novo
  { toca: 'Cancelar' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { abre: '?tela=T04&momento=17-momento-folha-conta-sair-sem-pendencia' },
  { toca: 'Sair da conta' },
  { chega: 'T01', momento: null },

  // ── a 20: com o checklist registrado, o sair roda o encerramento completo da T16 — o reinício e o
  // autoteste — e só depois o login · pelo endereço, a sessão do herói com o checklist registrado ──
  { abre: '?tela=T04&momento=20-momento-folha-conta-sair-com-checklist-registrado' },
  { chega: 'T04', momento: '20-momento-folha-conta-sair-com-checklist-registrado' },
  { ve: 'O checklist do M2C-0417 está registrado: a sessão encerra antes, com o reinício e o autoteste do módulo.' },
  { ve: '2 itens ainda não chegaram ao servidor. Eles ficam no aparelho e continuam subindo.' },
  { ve: 'Pra entrar de novo, o login precisa de rede.' },
  { toca: 'Encerrar a sessão e sair' },
  // o encerramento completo, sem o diálogo de antes e sem os 4 passos da abortada
  { chega: 'T16', momento: null },
  { naoVe: 'Encerrar antes de terminar?' },
  { naoVe: 'Sem homologar' },
  { ve: 'Encerrando · não desconecte' },
  { ve: 'O módulo reinicia sozinho. Leva alguns segundos.' },
  { chega: 'T16', momento: '07-momento-autoteste-correndo', ms: 8000 },
  // terminado o autoteste, o login
  { chega: 'T01', momento: null, ms: 8000 },
]
