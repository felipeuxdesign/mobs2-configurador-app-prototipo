// Os textos da T05, copiados do 02-telas/T05-conectar-modulo/textos.md —
// nunca redigitados. Onde o texto traz um dado (o serial, o firmware, a
// contagem), a função monta com o valor do mock que a tela passa; o resto é a
// letra da referência.
export const TX = {
  // a busca · 00, 01 e 02
  titulo: 'Conectar módulo',
  encontrados: (n) => (n === 1 ? 'encontrado' : 'encontrados'),
  nenhumOutro: 'NENHUM OUTRO POR PERTO',
  seNaoForEste: 'Se não for este, aproxime o aparelho do módulo e procure de novo.',
  escolhaNaMao: 'Escolha o que está na sua mão.',
  escolhaUm: 'Escolha um módulo para continuar',
  conectar: 'Conectar',
  conectarAo: (serial) => `Conectar ao ${serial}`,
  // 06 · conectando: a espera da conexão, no primário desligado
  conectandoAo: (serial) => `Conectando ao ${serial}…`,
  // 18 e 19 · as esperas da conexão: a frase embaixo do primário, neutra
  pareando: { legenda: 'Confirme no celular. É só na primeira vez com este módulo.', primario: (serial) => `Pareando com o ${serial}…` },
  reconectando: { legenda: 'A conexão caiu por ficar parada. O app reconecta sozinho.', primario: (serial) => `Reconectando ao ${serial}…` },
  // 07 · conectado: o módulo respondeu, e o traço se desenha embaixo da linha
  conectadoAo: (serial) => `Conectado ao ${serial}`,
  procurarDeNovo: 'Procurar de novo',
  voltarAoMenu: 'Voltar ao menu',

  // ── os estados ──
  // Os ordinais saem do número do mock, mas só o que o textos.md escreve (como
  // o 'OUTROS QUATRO' da busca): com outro número, a frase fica sem texto,
  // nunca uma palavra inventada.

  // 03 · nenhum encontrado (busca-vazia)
  nenhumEncontrado: 'nenhum encontrado',
  nenhumRespondeu: 'Nenhum módulo respondeu',
  aproxime: 'Aproxime o aparelho do módulo e confira se ele está alimentado.',
  // embaixo das causas, as variantes sem Bluetooth, da matriz (decisão 59): a frase é a das
  // duas — com outro número, fica sem texto, nunca uma palavra inventada
  semBluetoothNaoAparecem: (nomes) => (nomes.length === 2 ? `O ${nomes[0]} e o ${nomes[1]} não têm Bluetooth: não aparecem aqui, e o app não configura esses dois.` : null),
  tentativa: { 1: 'primeira', 2: 'segunda' },
  buscaDurou: (seg, tentativa) => (TX.tentativa[tentativa] ? `A busca durou ${seg} s · ${TX.tentativa[tentativa]} tentativa` : null),

  // 05 · procurando: a busca de novo, enquanto corre — a tentativa sai
  // da contagem da busca, e só o ordinal que o textos.md escreve
  procurando: 'procurando',
  procurandoTitulo: 'Procurando…',
  aparecemAqui: 'Os módulos por perto aparecem aqui assim que responderem.',
  qualTentativa: (tentativa) => (TX.tentativa[tentativa] ? `${TX.tentativa[tentativa]} tentativa` : null),

  // 04 · a conexão falhou (conexao-falha): a trava mora no escolhido
  naoRespondeu: 'não respondeu',   // na linha do módulo, em vermelho
  // 20 · o pareamento que o celular não confirmou no tempo limite (pareamento-nao-confirmado, decisão 64):
  // a linha do módulo diz, em vermelho, e a frase embaixo da lista diz o que fazer
  naoPareou: 'não pareou',
  pareamentoNaoConfirmado: 'O celular não confirmou o pareamento. Toque em Tentar de novo e confirme o aviso que o celular mostra.',
  oQueConferir: 'O QUE CONFERIR',
  conferir: [
    { titulo: '1 · Cabo e conector', texto: '— encaixe firme' },
    { titulo: '2 · Alimentação', texto: '— energia chegando' },
    { titulo: '3 · Cadastro', texto: '— serial e modelo conferem' },
  ],
  tentarDeNovo: 'Tentar de novo',

  // ── o mundo real · o que o celular impede antes da busca (celular.js) ──
  // 16 · o Bluetooth desligado (bluetooth-desligado)
  semBluetooth: 'sem Bluetooth',
  bluetoothDesligado: 'O Bluetooth está desligado',
  semEle: 'Sem ele, o app não acha o módulo. Ligue, e a busca começa sozinha.',
  ligarBluetooth: 'Ligar o Bluetooth',
  // 17 · a permissão negada (bluetooth-sem-permissao)
  semPermissao: 'sem permissão',
  faltaPermissao: 'Falta a permissão do Bluetooth',
  oAppUsa: 'O app usa só pra achar os módulos por perto. Sem ela, a busca não começa.',
  permitir: 'Permitir',
  // o Android não deixa perguntar de novo: o primário vira a saída (tela.md; a
  // letra é a da T10/11 e da lei de construir, 12 — nenhuma referência da T05 a desenha)
  abrirConfiguracoes: 'Abrir as configurações',
}
