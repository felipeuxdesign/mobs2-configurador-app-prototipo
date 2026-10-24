// T09 · os textos exatos (02-telas/T09-configurar-modulo/textos.md). Onde o
// texto traz um dado (o nome do bloco, a contagem por extenso, o conteúdo do
// bloco, a contagem de cada etapa, o que o módulo guarda), ele é montado do mock
// na hora e confere com o textos.md. O motivo escrito no caso bloco-recusado não
// é lido: a causa é a do textos.md.
import { caixaAlta, porExtenso, milhar } from '../../dados/formato.js'

// 'Ativo, Leitor, Eventos e Conexão' — a lista dos rótulos, o último com o 'e'
// o bloco com o artigo (a 16: *Falta reenviar o leitor e os eventos.*)
const COM_ARTIGO = { ativo: 'o ativo', cercas: 'as cercas', leitor: 'o leitor', eventos: 'os eventos', conexao: 'a conexão' }
const porExtensoMaiusculo = (n) => { const t = porExtenso(n); return t.charAt(0).toUpperCase() + t.slice(1) }
const emLista = (nomes) => (nomes.length > 1 ? `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}` : nomes.join(''))

export const T = {
  titulo: 'Configurar módulo',
  encerrar: 'ENCERRAR',
  pinos: 'ocupação de pinos confere',
  // o que cada bloco faz, na linha de baixo do elo, antes de ele gravar. A limpeza da
  // instalação nova diz o que faz, no jeito das outras etapas: minúscula, sem ponto, numa linha
  // (decisão 58, HU-T09-3)
  descricao: {
    limpeza: 'zera o módulo · a rede volta no último passo',
    ativo: 'quem é o veículo e a tradução da CAN',
    cercas: 'as regiões geográficas',
    leitor: 'como o cartão do motorista é lido',
    eventos: 'o que o módulo reporta e quando',
    conexao: 'para onde ele manda',
  },
  // o que cada etapa pronta diz, no lugar da descrição (decisão 57) · a limpeza completa e,
  // na manutenção, a do bloco (a rede do módulo continua; na conexão, ela volta no último passo)
  limpezaPronta: 'módulo zerado · a rede volta no último passo',
  // a limpeza de configuração (decisão 64, a 30: o reenvio de tudo, menos a conexão, da T11 · HU-T11-8): antes de
  // gravar, a letra da 30; gravando e pronta, sem referência, a gramática das outras
  limpezaConfiguracao: 'apaga a configuração · a rede do módulo continua',
  limpezaConfiguracaoPronta: 'a configuração apagada · a rede do módulo continua',
  apagandoConfiguracao: 'apagando a configuração',
  // a Conexão que não é reenviada (a 30): apagada, com o traço no poço
  ficaComoEsta: 'fica como está',
  naoReenviada: (conexao) => `${conexao} · não é reenviada`,
  limpezaDoBloco: {
    ativo: 'o ativo apagado · a rede do módulo continua',
    cercas: 'as cercas apagadas · a rede do módulo continua',
    leitor: 'o leitor apagado · a rede do módulo continua',
    eventos: 'os eventos apagados · a rede do módulo continua',
    conexao: 'a conexão apagada · a nova grava em seguida',   // a T09/34
  },
  ativoPronto: (placa, sinais) => `${placa} · ${sinais} sinais da CAN`,
  cercasProntas: (regioes, pontos) => (pontos > 0 ? `${regioes} · ${milhar(pontos)} pontos` : regioes),
  leitorPronto: (fios, ajustes) => `${fios} · ${ajustes} ajustes`,
  eventosProntos: (eventos, intervalo) => `${eventos} eventos · ${intervalo}`,
  // a etapa gravando e conferindo (a peça cadeia gravando): a contagem na unidade da etapa, à
  // esquerda, e o que falta, à direita · a limpeza é um comando só: *apagando tudo*, pelo tempo
  unidade: { sinais: 'sinais da CAN', pontos: 'pontos', ajustes: 'ajustes', eventos: 'eventos' },
  conta: (feitos, total, unidade) => `${milhar(feitos)} de ${milhar(total)} ${unidade}`,
  apagandoTudo: 'apagando tudo',
  // a limpeza só do bloco, na cadeia curta da manutenção: nenhuma referência desenha ela
  // gravando · a gramática do *apagando tudo*
  apagandoBloco: (bloco) => `apagando ${COM_ARTIGO[bloco]}`,
  faltam: (estimativa) => `faltam ${estimativa}`,
  // a etapa em que a cadeia parou (02, 03): a barra parada onde parou, e de onde ela retoma
  parouEm: (conta) => `parou em ${conta}`,
  retomaDaqui: 'retoma daqui',
  // o valor à direita do elo: o conteúdo do bloco, do cadastro do par (decisão 49 · o
  // módulo não guarda versão), e as palavras do processo
  // cada bloco termina em confere — aguardando, gravando, conferindo, confere, não confere
  confere: 'confere',
  naoConfere: 'não confere',
  aguardando: 'aguardando',
  conferindo: 'conferindo',
  // a Conexão: a operadora e a APN do chip (decisão 59), e o que o módulo prova depois de gravada
  conexao: (operadora, apn) => `${operadora} · ${apn}`,
  falouComServidor: 'O módulo falou com o servidor',
  conferindoServidor: (seg) => `conferindo · ${seg} s`,
  sim: 'sim',
  aindaNao: 'ainda não',
  oQueConferir: 'O QUE CONFERIR',
  // o *ainda não* se confere de novo (decisão 64, a 12): o link ao lado do rótulo, que volta ao conferindo (a 11)
  conferirDeNovo: 'Conferir de novo',
  // as causas do servidor-ainda-nao (a 12), pelo id do caso: o chip da operadora e o lugar do módulo
  causaDoServidor: {
    chip: (n, operadora) => ({ titulo: `${n} · Chip`, texto: `— da ${operadora}, no encaixe de cima, ativo` }),
    'lugar-do-modulo': (n) => ({ titulo: `${n} · Lugar do módulo`, texto: '— fora de caixa de metal' }),
  },
  primeiro: 'primeiro',    // a limpeza, antes de gravar (05, 06, 07, 27)
  gravando: 'gravando',    // a etapa que grava
  pausado: 'pausado',      // a etapa em que a cadeia parou
  // o conteúdo (decisões 49, 50 e 59): as regiões do ativo — nenhuma, no ônibus sem
  // cerca (T09/06) —, os fios do leitor, o intervalo do preset de eventos do modelo e a
  // operadora com a APN. '1 região' não tem referência: é a forma do singular, que nenhum
  // par do mock alcança
  regioes: (n) => (n === 0 ? 'nenhuma' : `${n} ${n === 1 ? 'região' : 'regiões'}`),
  intervalo: (seg) => `intervalo ${seg} s`,
  // a causa da recusa, por bloco: só a de Cercas tem texto aprovado
  causa: { cercas: 'os pontos das regiões não voltaram' },
  // as duas pré-condições, embaixo do título (HU-T09-2): os pinos e o espaço no módulo
  cabe: (registros, capacidade) => `cabe no módulo · ${registros} de ${capacidade} contadores`,
  // as travas do envio (06, 07, HU-T09-4): o aviso diz o número e o que nenhum módulo do modelo
  // guarda (decisão 64: outro igual não resolve), e fica no lugar das linhas de checagem. A dos
  // contadores e a da memória são a letra das referências; a dos eventos, a dos filtros da CAN e a das
  // regiões, a mesma frase (*São X. Nenhum VL06 guarda mais que Y.*, com o modelo do módulo)
  naoCabeTitulo: 'NÃO CABE NO MÓDULO',
  naoCabe: {
    contadores: (d) => `São ${milhar(d.pede)} contadores. Nenhum ${d.modelo} guarda mais que ${milhar(d.maximo)}.`,
    eventos: (d) => `São ${milhar(d.pede)} eventos. Nenhum ${d.modelo} guarda mais que ${milhar(d.maximo)}.`,
    filtros: (d) => `São ${milhar(d.pede)} filtros da CAN. Nenhum ${d.modelo} guarda mais que ${milhar(d.maximo)}.`,
    regioes: (d) => `São ${milhar(d.pede)} regiões. Nenhum ${d.modelo} guarda mais que ${milhar(d.maximo)}.`,
    memoria: (d) => `São ${milhar(d.pontos)} pontos de cerca e ${milhar(d.cartoes)} cartões. Nenhum ${d.modelo} guarda mais que ${milhar(d.maximo)}.`,
  },
  naoCabeValor: 'não cabe',
  // a folha das mensagens que o módulo ainda não enviou (a 27): antes da limpeza completa
  mensagens: {
    titulo: (n) => `A limpeza apaga as ${n} mensagens que o módulo ainda não enviou.`,
    texto: 'Com sinal, ele envia sozinho em poucos minutos.',
    esperar: 'Esperar o envio',
    gravarMesmoAssim: 'Gravar mesmo assim',
  },
  // os avisos da cadeia
  parou: 'A CADEIA PAROU',
  recusou: (rotulo, seguintes) => `${rotulo} foi recusado. Os ${porExtenso(seguintes)} seguintes nem começaram.`,
  // recusado de novo (decisão 64, a 31): o aviso, e a saída que grava a Conexão antes de sair (HU-T09-10)
  parouDeNovo: 'A CADEIA PAROU DE NOVO',
  recusouDeNovo: (rotulo, seguintes) => `${rotulo} foi recusado duas vezes. Os ${porExtenso(seguintes)} seguintes nem começaram.`,
  gravarSoConexao: 'Gravar só a conexão e encerrar',
  // a folha que confirma (a 32): a consequência, e os blocos que ficam por gravar (do recusado aos Eventos)
  soConexaoFolha: {
    titulo: 'Gravar só a conexão encerra sem terminar a instalação.',
    texto: (blocos) => { const l = emLista(blocos.map((b) => COM_ARTIGO[b])); return `O módulo volta a falar com o servidor, sem a configuração. ${l.charAt(0).toUpperCase()}${l.slice(1)} ficam por gravar, e o motivo fica registrado pro gestor.` },
  },
  // gravando só a conexão (a 33): o aviso neutro, e os que ficam por gravar
  soConexao: 'SÓ A CONEXÃO',
  soConexaoFrase: 'O módulo volta a falar com o servidor. Depois, a sessão encerra.',
  pulado: 'pulado',
  // a queda que não voltou no tempo limite do Reconectar (decisão 64, a 35): o que conferir e a quem acionar
  naoVoltou: 'O MÓDULO NÃO VOLTOU',
  naoVoltouFrase: 'Confira se ele está ligado e perto do celular. Se não voltar, acione o gestor: ele está zerado, sem a conexão.',
  // o envio que o técnico espera (decisão 64, a 29): a terceira linha embaixo do título, com o relógio
  enviando: (enviadas, total) => `o módulo enviando · ${enviadas} de ${total} mensagens`,
  pausou: (rotulo) => `A CADEIA PAUSOU NO ${caixaAlta(rotulo)}`,
  linkCaiu: (gravados) => `O link caiu. Os ${porExtenso(gravados)} primeiros blocos já conferem.`,
  semConexao: (rotulo) => `A ${caixaAlta(rotulo)} AINDA NÃO FOI GRAVADA`,
  semSinal: 'Sem ela o módulo fica sem sinal. Termine a gravação antes de sair.',
  // a manutenção (08, 09, HU-T09-5): um bloco por vez
  manutencao: 'MANUTENÇÃO',
  reenvieUm: 'Reenvie um bloco por vez. A limpeza apaga só o que você escolher.',
  // a manutenção aberta pelo menu, sem nada escolhido (decisão 64, a 28): o primário apagado diz o que falta
  escolhaUmBloco: 'Escolha um bloco',
  // a conferência corrige um bloco por vez — as cercas, e depois o leitor, os eventos
  // e a conexão. Os textos desses três seguem a gramática dos das cercas: nenhuma referência os desenha
  // todo bloco se reenvia, um por vez · o do ativo é a letra da T09/17
  reenviar: { ativo: 'Reenviar o ativo', cercas: 'Reenviar as cercas', leitor: 'Reenviar o leitor', eventos: 'Reenviar os eventos', conexao: 'Reenviar a conexão' },
  reenviando: { ativo: 'Reenviando só o ativo.', cercas: 'Reenviando só as cercas.', leitor: 'Reenviando só o leitor.', eventos: 'Reenviando só os eventos.', conexao: 'Reenviando só a conexão.' },
  // ── o arrastado nunca é reenviado sozinho ──
  // a folha de confirmação (13, 17, 18): a consequência, antes de enviar · a das cercas é do mock
  // (M.consequenciaReenvio); a do ativo e a do leitor, a letra das referências
  consequencia: {
    ativo: { titulo: 'Reenviar o ativo pede reenviar os eventos depois.', texto: 'Os eventos usam o ativo. Depois do ativo, o app pergunta por eles.' },
    leitor: { titulo: 'Reenviar o leitor pede reenviar os eventos depois.', texto: 'Os eventos usam o leitor. Depois do leitor, o app pergunta por eles.' },
  },
  cancelar: 'Cancelar',
  fechar: 'Fechar',
  // enviando (09): quem precisa ser reenviado depois — nunca *ficam como estão* com dependente pendente
  dependemDepois: (rotulos) => `${emLista(rotulos)} precisam ser reenviados depois. Você confirma em seguida.`,
  // depois de conferir (10, 14, 15): o bloco confere, e quantos dependem dele · sem dependente, só o confere
  // (a letra das três referências; os outros seguem a gramática delas)
  confereComDependentes: {
    ativo: (n) => `Ativo confere. ${n === 1 ? 'Um bloco depende dele.' : `${porExtensoMaiusculo(n)} blocos dependem dele.`}`,
    cercas: (n) => `Cercas conferem. ${n === 1 ? 'Um bloco depende delas.' : `${porExtensoMaiusculo(n)} blocos dependem delas.`}`,
    leitor: (n) => `Leitor confere. ${n === 1 ? 'Um bloco depende dele.' : `${porExtensoMaiusculo(n)} blocos dependem dele.`}`,
  },
  confereSo: { ativo: 'Ativo confere.', cercas: 'Cercas conferem.', leitor: 'Leitor confere.', eventos: 'Eventos conferem.', conexao: 'Conexão confere.' },
  // a pergunta por cada dependente, numerada, na ordem do script
  numerado: (n, rotulo) => `${n} · ${rotulo}`,
  liberaDepois: (rotulo) => `libera depois do ${rotulo.toLowerCase()}`,
  deixarParaDepois: 'Deixar para depois',
  // a 19 e a 20: o que a ação vira depois de decidida
  ficaParaDepois: 'fica para depois',
  reenviadoMarca: '· reenviado',
  // o que ficou para depois (16): na lista da manutenção, e no aviso
  faltaReenviarValor: 'falta reenviar',
  faltaReenviar: (blocos) => `Falta reenviar ${emLista(blocos.map((b) => COM_ARTIGO[b]))}.`,
  ficamComoEstao: (rotulos) => `${emLista(rotulos)} ficam como estão.`,
  // a faixa da cadeia concluída (04): o resultado, os passos contados da ordem
  conferidoNoModulo: 'CONFERIDO NO MÓDULO',
  passos: 'passos',
  deTotal: (total) => `de ${total}`,
  // o rodapé
  gravarNoModulo: 'Gravar no módulo',
  procurarOutro: 'Procurar outro módulo',
  gravandoNaoInterrompa: 'Gravando · não interrompa',
  saidaVolta: 'A saída volta quando a cadeia fechar',
  tentarDeNovo: 'Tentar de novo',
  reconectar: 'Reconectar',
  continuar: 'Continuar a gravação',
  voltar: 'Voltar ao menu',
  // a cadeia concluída (04) segue o caminho: a CAN lida (T07/01) · sem sinal da CAN no modelo, a calibração (sem referência)
  lerACan: 'Ler a CAN',
  calibrar: 'Calibrar',
}
