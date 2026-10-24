// T16 · os textos exatos (02-telas/T16-sessao/textos.md). Onde o texto traz um
// dado (a placa, o serial, a hora, os blocos, a contagem, o contador lido), ele
// é montado do mock na hora, em dados.js, e confere com o textos.md.
// Os rótulos das assertivas e os valores fixos (fechado, restaurado, na fila)
// vêm do M.autotesteEncerramento, e são os mesmos do textos.md.
// A causa do caso autoteste-falhando não é lida: a frase é a do textos.md
// (a frase de interface é texto).

// Os oito passos do encerramento, na ordem da referência. `feito` é o que o
// passo diz depois de concluir; `corre` e `legenda`, o que ele diz enquanto
// corre. As oito legendas vêm do tela.md, com
// o ponto final das três que as referências desenham (00, 01 e 03): a lista
// do tela.md tira o ponto de todas. Onde a pasta ainda não tem o texto (a
// palavra que corre nos passos 1, 2, 4, 6 e 7, e o feito da releitura), o
// passo fica sem ele.
// · O passo 2, o reinício: automático — *reiniciando*, com a
//   legenda dele, e *de volta* depois; se a conexão cai no meio, *reconectando* (a 08), nunca falha
// · A legenda do Autoteste fica no dado e não aparece: o passo 8 é a tela
//   seguinte, a Sessão encerrada (T16·4), e nenhuma referência o desenha
//   correndo na cadeia.
// `seguro`: os quatro que deixam o módulo seguro e rodam mesmo sem homologar
// (dominio.md §4.2, decisão 26).
export const PASSOS = [
  {
    id: 'contadores', nome: 'Contadores e estado', feito: 'confere',
    legenda: 'Grava os contadores e o estado no módulo, pra nada se perder no reinício.',
  },
  {
    id: 'reinicio', nome: 'Reinício do módulo', feito: 'de volta', corre: 'reiniciando',
    legenda: 'O módulo reinicia sozinho. Leva alguns segundos.',
  },
  {
    id: 'releitura', nome: 'Releitura completa', corre: 'relendo',
    legenda: 'Ele lê de volta a configuração que está no módulo. É isto que prova que ela sobreviveu ao reinício.',
  },
  {
    id: 'repouso', nome: 'Repouso do módulo', feito: 'restaurado', seguro: true,
    legenda: 'Devolve o módulo ao repouso que ele tinha antes da sessão.',
  },
  {
    id: 'canal', nome: 'Canal de programação', feito: 'fechado', seguro: true, corre: 'fechando',
    legenda: 'Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar.',
  },
  {
    id: 'registro', nome: 'Registro da sessão', feito: 'na fila', seguro: true,
    legenda: 'Guarda o que foi feito aqui, pra ir ao servidor junto com a instalação.',
  },
  {
    id: 'desconexao', nome: 'Desconexão', feito: 'desconectado', seguro: true,
    legenda: 'Solta o Bluetooth. O módulo fica livre pra outro aparelho.',
  },
  { id: 'autoteste', nome: 'Autoteste', legenda: 'Confere as assertivas uma por uma, cada uma com o valor lido.' },
]

export const T = {
  // os títulos (um por tela)
  encerrar: 'Encerrar sessão',
  encerrada: 'Sessão encerrada',
  interrompida: 'Sessão interrompida',
  deTotal: (total) => `de ${total}`,
  semSessao: 'Sem sessão de configuração',

  // a cadeia do encerramento
  aindaNao: '—',
  lendo: 'lendo',                // a assertiva da vez, no autoteste (a 07)                 // o passo que ainda não chegou
  pulado: 'pulado',              // sem homologar: o que não roda
  semHomologar: 'Sem homologar · só o que deixa o módulo seguro',
  // a conexão que cai no reinício (a 08): o app reconecta sozinho
  reconectando: { corre: 'reconectando', legenda: 'A conexão caiu no reinício. O app reconecta sozinho.' },
  // o módulo que não reinicia por comando (o VL08, a 09): o corte, com o técnico, uma vez
  corte: { corre: 'com você', legenda: 'Este módulo não reinicia por comando. Desligue a alimentação dele e ligue de novo, uma vez só.' },
  // o módulo que não voltou do reinício no tempo limite (a 10, decisão 64)
  naoVoltou: { corre: 'não voltou', legenda: 'O módulo não voltou depois do reinício. Confira se ele está ligado e perto do celular.' },

  // o rodapé enquanto corre
  encerrandoNaoDesconecte: 'Encerrando · não desconecte',
  reiniciandoOModulo: 'Reiniciando o módulo…',
  reconectandoRodape: 'Reconectando…',
  esperandoReligar: 'Esperando o módulo religar…',   // o corte (a 09): o primário apagado espera o módulo
  tentarDeNovo: 'Tentar de novo',                    // o módulo que não voltou (a 10): espera de novo, do mesmo passo
  encerrarSemHomologar: 'Encerrar sem homologar',
  saidaAutoteste: 'A saída volta quando o autoteste terminar',
  saidaDesconectar: 'A saída volta quando o módulo desconectar',

  // a sessão encerrada: a homologação mora aqui, com o horário · a
  // única tela com a palavra *homologada* · as sete assertivas em três contadores, nunca *x de y*
  homologada: 'INSTALAÇÃO HOMOLOGADA',
  as: (hora) => `às ${hora}`,
  sobreviveu: 'a configuração sobreviveu ao reinício',
  confere: 'confere',
  naoSeAplica: 'não se aplica',
  aprovadas: (n) => (n === 1 ? 'aprovada' : 'aprovadas'),
  naoSeAplicam: (n) => (n === 1 ? 'não se aplica' : 'não se aplicam'),
  pendentes: (n) => (n === 1 ? 'pendente' : 'pendentes'),
  conferindo: 'conferindo',
  // a nota da 02 numa linha (decisão 61): a linha do evento já diz o prazo, e a tela cabe sem rolar
  notaCartao: 'O evento do cartão não impede a homologação.',
  // a prova da cadeia na interrompida (decisão 49)
  blocos: (n) => `${n} blocos`,
  bloqueada: 'A HOMOLOGAÇÃO FICA BLOQUEADA',
  causaContadores: 'Os contadores voltaram zerados — o módulo perdeu a leitura no reinício. A sessão fechou, mas a instalação não pode ser aprovada assim.',
  acioneOGestor: 'Acione o gestor.',   // a quem acionar, embaixo da causa (a 05, decisão 64)

  // a sessão encerrada sem homologar
  semHomologarRotulo: 'SEM HOMOLOGAR',
  continuaAberta: 'A instalação continua aberta. O que foi enviado fica no módulo.',
  // a nota do que não rodou é uma frase só, sem o rótulo em caixa alta (T16/04)
  naoRodaram: 'Não rodaram: contadores, reinício, releitura e o autoteste.',

  // a sessão interrompida
  iniciada: (placa, serial, quando, hora) => `${placa} · ${serial} · iniciada ${quando} às ${hora}`,
  hoje: 'hoje',
  confereBloco: 'confere',        // a limpeza confirmada, como na T09 (cada bloco termina em confere)
  parouAqui: 'parou aqui',
  // o que já foi gravado (decisão 49): os blocos confirmados com o artigo, sem a limpeza
  comArtigo: { ativo: 'o ativo', cercas: 'as cercas' },
  // (só o plural tem texto: um bloco só, sem legenda)
  jaGravados: (blocos) => `${blocos.slice(0, -1).join(', ')} e ${blocos[blocos.length - 1]} já conferem`,
  retomar: 'Retomar',
  descartar: 'Descartar',
  // o Descartar pergunta antes (a 11, decisão 64): o módulo zerado e sem a conexão ganha a conexão antes do descarte
  descartarTitulo: 'Descartar a instalação?',
  zeradoSemConexao: (serial) => `O ${serial} foi zerado e ainda está sem a conexão. Antes de descartar, o app grava só a conexão, pra ele voltar a falar com o servidor.`,
  descarteRegistrado: 'O que já foi enviado fica no módulo, e o descarte fica registrado.',
  retomarAInstalacao: 'Retomar a instalação',
  gravarEDescartar: 'Gravar a conexão e descartar',

  voltarAoMenu: 'Voltar ao menu',
}
