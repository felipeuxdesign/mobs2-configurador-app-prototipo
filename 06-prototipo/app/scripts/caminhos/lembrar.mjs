// O usuário lembrado, só por toque (T01 tela.md, HU-T01-3):
// o técnico marca Lembrar meu usuário e entra; ao sair da conta, o login volta com o
// usuário lembrado — o xis dentro do campo, a caixa marcada e o Entrar dizendo
// Digite a senha (o quadro da 16). O xis limpa o campo e esquece o usuário, e a
// caixa fica: entrando de novo, ele é lembrado outra vez. Desmarcada, o login
// seguinte não lembra ninguém: o quadro da 15, os dois campos vazios, sem o xis, e
// o Entrar dizendo Digite o usuário — a senha nunca fica. A T01/00, com os dois
// preenchidos, é só o começo do palco. A 15 e a 16 pela coluna ficam paradas (voltar.mjs).
const ATE_O_MENU = [
  { toca: 'Entrar' },
  { chega: 'T02' },
  // o contexto é a empresa (decisão 56): a Viação, e o Sincronizar baixa o pacote dela
  { marca: 'Viação Atlântico Sul' },
  { toca: 'Sincronizar' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
]
// sair da conta sem sessão: a fila do mock tem itens, e o diálogo diz isso (T04·5 a)
const SAIR = [
  { toca: 'Conta — Rafael Vieira' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { toca: 'Sair da conta' },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  { dorme: 300 },
  { toca: 'Sair da conta' },   // sem sessão e com a fila, o primário do diálogo só sai (T04)
  { chega: 'T01', momento: null },
]

export default [
  { abre: '' },
  // o palco começa na T01/00: os dois campos preenchidos, sem o xis
  { chega: 'T01', momento: null },
  { naoToca: 'Limpar o usuário' },
  { toca: 'Lembrar meu usuário' },
  { digita: 'Varzea26', em: 'SENHA' },
  ...ATE_O_MENU,
  // o aviso do acesso, na primeira chegada ao menu (T04/12)
  { toca: 'Entendi' },
  { naoVe: 'Seu acesso vence em 2 dias' },
  ...SAIR,
  // o usuário lembrado: o xis, a senha vazia e o Entrar dizendo o que falta (a 16)
  { desligado: 'Digite a senha' },
  { toca: 'Limpar o usuário' },
  // o xis limpa o campo e esquece o usuário: o Entrar diz Digite o usuário, e o xis sai
  { desligado: 'Digite o usuário' },
  { naoToca: 'Limpar o usuário' },
  { digita: 'r.vieira', em: 'USUÁRIO' },
  { desligado: 'Digite a senha' },
  { naoToca: 'Limpar o usuário' },
  { digita: 'Varzea26', em: 'SENHA' },
  // a caixa ficou como o técnico deixou, marcada: entrando, o usuário é lembrado de novo
  ...ATE_O_MENU,
  ...SAIR,
  { desligado: 'Digite a senha' },
  // desmarcada, o login seguinte não lembra ninguém: o quadro da 15 — os dois campos
  // vazios, sem o xis, e o Entrar dizendo Digite o usuário, com a senha ou sem ela
  { toca: 'Lembrar meu usuário' },
  { digita: 'Varzea26', em: 'SENHA' },
  ...ATE_O_MENU,
  ...SAIR,
  { desligado: 'Digite o usuário' },
  { naoToca: 'Limpar o usuário' },
  { digita: 'Varzea26', em: 'SENHA' },
  { desligado: 'Digite o usuário' },
  { digita: 'r.vieira', em: 'USUÁRIO' },
  { naoVe: 'Digite o usuário' },
  { naoToca: 'Limpar o usuário' },
  { toca: 'Entrar' },
  { chega: 'T02' },
]
