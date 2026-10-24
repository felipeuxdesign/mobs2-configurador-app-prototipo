// T07 · os textos da tela, exatamente como no 02-telas/T07-diagnostico-do-modulo/textos.md
// — nunca redigitados. Onde o texto traz um dado (a contagem, a porcentagem, as
// versões homologadas, o motivo, o esperado, o nome do modelo do ativo, as mensagens),
// a moldura é daqui e o dado vem do mock, na hora de montar.
export const T = {
  titulo: 'Diagnóstico do módulo',
  de: (total) => `de ${total}`,
  semAtivo: 'sem ativo',
  encerrar: 'ENCERRAR',

  // as duas seções · a CAN só aparece lida, depois do bloco do ativo (decisão 61)
  oModulo: 'O MÓDULO',
  aCanDo: (modelo) => `A CAN · ${modelo}`,       // o nome do modelo do ativo, em caixa alta (01, 08, 09, 10)

  // o módulo depois da configuração: uma linha só (01, 08, 09, 10)
  conferido: 'Conferido na conexão',
  deTotal: (n, total) => `${n} de ${total}`,

  // o aviso que abre as travas sem saída escrita (02, 03): o serial e o modelo, do cadastro
  serialForaDoCadastro: 'SERIAL FORA DO CADASTRO',
  pecaAoGestor: (serial) => `Peça ao gestor pra cadastrar o ${serial}.`,
  modeloSemSuporteTitulo: 'MODELO SEM SUPORTE',
  appNaoConfigura: (modelo) => `O app ainda não configura o ${modelo}.`,

  // o que trava (02, 03, 04)
  naoEstaNoCadastro: 'não está no cadastro',
  modeloSemSuporte: 'modelo sem suporte nesta versão',
  semCadastro: 'sem cadastro',
  naLista: (lista) => `na lista: ${lista.join(' e ')}`,   // o firmware fora da lista (04, 05)

  // o que só informa (05, 07)
  semElaNaoAtualiza: 'sem ela, o firmware não atualiza',
  semRede: 'sem rede',
  // o que só informa — as mensagens no módulo
  faixa: (f) => `faixa ${f}`,   // a faixa de operação do modelo, embaixo da alimentação
  mensagens: (n) => `${n} mensagens ainda não enviadas`,
  // a sessão anterior mal encerrada (13): o canal de programação encontrado aberto
  malEncerradaTitulo: 'SESSÃO ANTERIOR MAL ENCERRADA',
  malEncerradaFrase: 'O app fechou o acesso que ficou aberto. Pode seguir.',
  daPraSeguir: 'dá pra seguir · o checklist registra',

  // a CAN (08, 09)
  semLeitura: (motivo) => `sem leitura · ${motivo}`,
  foraDoEsperado: (esperado) => `fora do esperado · ${esperado}`,

  // o que corre: a linha que lê, a que espera (06, 10)
  lendo: 'lendo',
  vazio: '—',
  atualizandoPct: (pct) => `atualizando · ${pct}%`,
  // 14 · a atualização que não terminou: a linha do firmware diz onde parou, e o rodapé, o que conferir
  naoTerminou: 'não terminou',
  parouEm: (pct) => `parou em ${pct}%`,
  confiraLigado: 'Confira se o módulo está ligado e perto do celular.',
  tentarDeNovo: 'Tentar de novo',

  // o rodapé
  selecionarAtivo: 'Selecionar ativo',
  voltarAoMenu: 'Voltar ao menu',
  procurarOutro: 'Procurar outro módulo',
  atualizarFirmware: 'Atualizar firmware',
  comConexaoGravada: 'Com a conexão conferida, o firmware atualiza pelo módulo.',
  gravarConexao: 'Gravar a conexão',
  atualizando: 'Atualizando · não desligue o módulo',
  recomeca: 'O diagnóstico recomeça quando terminar',
  lerDeNovo: 'Ler de novo',
  // a CAN lida (01, 08, 09) segue o caminho: a calibração (decisão 64) · o Voltar ao menu fica no voltar do Android
  calibrar: 'Calibrar',
  lendoNaoSaia: 'Lendo · não saia da tela',
}
