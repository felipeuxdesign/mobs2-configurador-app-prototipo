// O caminho do README: o caminho do herói do login à cadeia gravada e à CAN lida, e o fim
// da visita, com a instalação homologada, no ritmo de quem olha — cada toque espera um instante antes, pra quem vê o GIF
// acompanhar o dedo. É o que o README mostra no topo (GRAVA=… GRAVA_JANELA=1280x900,
// e o scripts/gif.py monta). Como roteiro, confere o mesmo que o heroi.mjs confere
// nesse trecho, e passa no `caminho.mjs todos` como os outros.
const olha = (ms = 900) => ({ dorme: ms })
export default [
  { abre: '' },
  { chega: 'T01', momento: null },
  { ouve: '9:30 · Wi-Fi, sinal e bateria' }, // a hora vem desenhada na barra oficial
  olha(1200),
  { digita: 'Varzea26', em: 'SENHA' },
  olha(700),
  { toca: 'Entrar' },
  { desligado: 'Entrando…' },
  // o contexto é a empresa (decisão 56): a Viação, e o Sincronizar baixa o pacote dela
  { chega: 'T02', momento: null },
  { ve: 'Pra qual empresa hoje?' },
  olha(),
  { marca: 'Viação Atlântico Sul' },
  olha(700),
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { chega: 'T03', momento: '02-momento-concluido', entre: [3000, 6000] },
  olha(),
  { toca: 'Ir para o menu' },
  { chega: 'T04' },
  { ve: 'Seu acesso vence em 2 dias' },
  olha(1400),
  { toca: 'Entendi' },
  olha(),
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  olha(),
  { marca: 'M2C-0417' },
  olha(700),
  { toca: 'Conectar ao M2C-0417' },
  // o diagnóstico do módulo: as sete linhas acendem, e a faixa desce
  { chega: 'T07', momento: null },
  { ve: 'ENCERRAR', entre: [3500, 6500] },
  { ve: '8 de 8' },
  olha(1200),
  { toca: 'Selecionar ativo' },
  { chega: 'T06' },
  olha(),
  { marca: 'RKT-8H42' },
  olha(700),
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'O M2C-0417 fica neste ativo, na Viação Atlântico Sul.' },
  olha(1400),
  { toca: 'Vincular o módulo' },
  // o que vai ser gravado, e a cadeia
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  olha(1400),
  { toca: 'Gravar no módulo' },
  // cada etapa grava e confere, com a barra e a contagem: a Limpeza, o Ativo, as Cercas, o Leitor, os Eventos
  { chega: 'T09', momento: '21-momento-gravando-a-limpeza' },
  // a Conexão gravada, o módulo confere que falou com o servidor
  { chega: 'T09', momento: '11-momento-conferindo-o-servidor', entre: [9200, 11500] },
  { chega: 'T09', momento: '04-momento-cadeia-concluida', entre: [900, 1700] },
  { ve: 'CONFERIDO NO MÓDULO\n6 passos' },
  { ve: '6 de 6' },
  olha(2500),
  // a CAN lida ao vivo, pelo Ler a CAN da cadeia concluída — o caminho segue sem o menu (decisão 64): os
  // sinais do motor ligado trocam o número a cada segundo
  { toca: 'Ler a CAN' },
  { chega: 'T07', momento: '01-momento-can-lida' },
  { ve: 'Rotação' },
  olha(3600),
  // e o fim da visita: o encerramento, o autoteste e o traço do veredito se desenhando
  { abre: '?tela=T16' },
  { chega: 'T16', momento: '02-momento-instalacao-homologada', ms: 15000 },
  { ve: 'INSTALAÇÃO HOMOLOGADA' },
  olha(2500),
]
