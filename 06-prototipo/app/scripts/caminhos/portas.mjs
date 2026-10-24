// As portas naturais (logica.md, "As portas naturais"; R-11) e a R-14 em
// toda lista de escolha: tocar na linha só marca, e só o botão avança.
// Na T05, marcar e conectar o M2C-0999, o fora do cadastro: a conexão abre o diagnóstico
// (T07), que trava no serial (o quadro da T07/02). Só por toque, do login.
// Não há portas da pré-checagem na T05 nem a do chassi na T06.
const A_LISTA = [
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { ve: 'Escolha o que está na sua mão.' },
  { desligado: 'Conectar' },
  { ve: 'M2C-0999' },   // na 01, o fora do cadastro se escolhe como os outros
]
export default [
  { abre: '' },
  { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  // T02 · R-14: a empresa marca, e só o primário sincroniza (decisão 56): a primeira
  // escolha acende o Sincronizar; outra escolha troca a marca, e o texto não muda
  { chega: 'T02', momento: null },
  { desligado: 'Escolha uma empresa' },
  { marca: 'Transportes Capibaribe' },
  { chega: 'T02', momento: '01-momento-escolhida' },
  { fica: 'T02', ms: 600 },
  { ve: 'Sincronizar' },
  { marca: 'Expresso Caruaruense' },   // a de pacote vencido também se escolhe
  { fica: 'T02', ms: 600 },
  { ve: 'Sincronizar' },
  { marca: 'Viação Atlântico Sul' },
  { fica: 'T02', ms: 600 },
  { marca: 'Viação Atlântico Sul' },   // tocar de novo não desmarca
  { fica: 'T02', ms: 400 },
  { executa: `const r = [...document.querySelectorAll('[role=radio]')].find((e) => e.textContent.startsWith('Viação Atlântico Sul')); return r?.getAttribute('aria-checked') === 'true' || 'a Viação não está marcada'` },
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  // o 5º dia do acesso: o aviso na primeira chegada ao menu, e o Entendi fecha (T04/12)
  { ve: 'Seu acesso vence em 2 dias' },
  { toca: 'Entendi' },
  { naoVe: 'Seu acesso vence em 2 dias' },

  // T05 · R-14: o módulo marca, o primário diz o serial do marcado, e só ele conecta · a marca
  // é a 00, a tela: a URL passa a dizer a 00
  ...A_LISTA,
  { marca: 'M2C-0417' },
  { fica: 'T05', ms: 600 },
  { chega: 'T05', momento: null },
  { ve: 'Conectar ao M2C-0417' },
  { marca: 'M2C-0394' },
  { fica: 'T05', ms: 600 },
  { chega: 'T05', momento: null },
  { ve: 'Conectar ao M2C-0394' },
  { naoVe: 'Conectar ao M2C-0417' },

  // a porta do M2C-0999: fora do cadastro, ele se marca e conecta como os outros; o
  // diagnóstico (T07) trava pelo serial, a faixa não desce, e o Procurar outro módulo
  // volta à lista sem nada escolhido (o quadro da T07/02)
  { marca: 'M2C-0999' },
  { fica: 'T05', ms: 600 },
  { chega: 'T05', momento: null },
  { ve: 'Conectar ao M2C-0999' },
  { naoVe: 'Conectar ao M2C-0394' },
  { toca: 'Conectar ao M2C-0999' },
  { chega: 'T07', momento: null },
  { ve: 'Peça ao gestor pra cadastrar o M2C-0999.' }, // o aviso da trava
  { ve: 'não está no cadastro', ms: 8000 },
  { ve: 'Procurar outro módulo', ms: 8000 },
  { naoVe: 'ENCERRAR' },
  { naoToca: 'Selecionar ativo' },
  { fica: 'T07', ms: 600 },
  { toca: 'Procurar outro módulo' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { desligado: 'Conectar' },

  // T06 · R-14: o ônibus marca, só o Usar este ativo confirma, e só o Vincular o módulo vincula
  { marca: 'M2C-0417' },
  { toca: 'Conectar ao M2C-0417' },
  { chega: 'T07', momento: null },
  { toca: 'Selecionar ativo', ms: 12000 },
  { chega: 'T06', momento: null },
  { ve: 'Escolha o veículo que está na sua frente.' },
  { desligado: 'Usar este ativo' },
  { marca: 'RKT-8H42' },
  { fica: 'T06', ms: 600 },
  { chega: 'T06', momento: null },
  { naoVe: 'Confirmar o vínculo' },
  { marca: 'QJF-2C61' },
  { fica: 'T06', ms: 600 },
  { chega: 'T06', momento: null },
  { naoVe: 'Confirmar o vínculo' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'Confirmar o vínculo' },
  { ve: 'QJF-2C61' },
  { fica: 'T06', ms: 600 },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  // Escolher outro volta à lista; outro ônibus, a confirmação dele
  { toca: 'Escolher outro' },
  { chega: 'T06', momento: null },
  { marca: 'RKT-8H42' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'RKT-8H42' },
  { ve: 'O M2C-0417 fica neste ativo, na Viação Atlântico Sul.' },
  { toca: 'Vincular o módulo' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { ve: 'RKT-8H42' },

  // T05 · a 00, pelo endereço: a lista com o M2C-0417 marcado; tocar noutro
  // troca a marca no lugar, e o primário diz o serial dele — também não conecta (tela.md)
  { abre: '?tela=T05' },
  { chega: 'T05', momento: null },
  { ve: 'Escolha o que está na sua mão.' },
  { naoVe: 'ESCOLHIDO' },
  { naoVe: 'FIRMWARE' },
  { ve: 'Conectar ao M2C-0417' },
  { marca: 'M2C-0362' },
  { fica: 'T05', ms: 600 },
  { chega: 'T05', momento: null },
  { ve: 'Conectar ao M2C-0362' },
  { naoVe: 'Conectar ao M2C-0417' },
  { toca: 'Conectar ao M2C-0362' },
  { chega: 'T07', momento: null },
  { ve: 'Diagnóstico do módulo' },
]
