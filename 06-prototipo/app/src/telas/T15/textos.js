// T15 · os textos da tela, exatamente como no 02-telas/T15-fila-de-saida/textos.md.
// Onde o texto traz um dado (a contagem, a placa, a hora, as tentativas, o
// tamanho, a janela da re-checagem), a moldura é daqui e o dado vem do mock,
// na hora de montar.
export const T = {
  titulo: 'Fila de saída',
  nesteAparelho: 'neste aparelho', // a fila é do aparelho, e não da empresa (decisão 42, HU-T01-4)
  encerrar: 'ENCERRAR',
  semSessao: 'Sem sessão de configuração',
  semAtivo: 'sem ativo',                                     // a faixa com o módulo e sem o ônibus (T05, T06)
  voltar: 'Voltar ao menu',
  // o cartão do topo: o que precisa do técnico, pela contagem de erros (00, 02)
  rotuloDosErros: { 1: 'UM PRECISA DE VOCÊ', 2: 'DUAS COM ERRO' },
  ressincronizar: 'Ressincronizar e reenviar',
  // sem rede (a 05): ressincronizar baixa um pacote novo, e espera a rede, apagado (decisão 64)
  ressincronizarEsperaRede: 'Ressincronizar espera a rede',
  entre: ' · ',                                              // o tipo e a placa, no título do item
  recusou: (motivo) => ['o servidor recusou', motivo],
  recusouFrase: (motivo) => `O servidor recusou: ${motivo}.`,   // a recusa sozinha, numa frase (00)   // duas linhas de verdade     // T15·1 (a): só com mais de um erro no cartão
  semRede: (tentativas, proxima) => `sem rede · ${tentativas} tentativas feitas, próxima às ${proxima}`,
  soAPrimeira: 'Só a primeira precisa de você. A segunda reenvia sozinha.',
  // o cartão do topo sem erro: o item que sobe agora (01)
  subindo: 'SUBINDO AGORA',
  pct: '%',
  deTamanho: (mb) => `de ${mb} MB`,
  nadaPrecisa: 'Nada aqui precisa de você.',
  // a lista embaixo do cartão
  oResto: 'O RESTO ANDA SOZINHO',                            // embaixo do cartão com erro (00, 02)
  naFilaERecebidas: 'NA FILA E RECEBIDAS',                   // embaixo do item que sobe (01)
  naFila: (placa) => `${placa} · na fila`,
  recebida: (placa) => `${placa} · recebida`,
  // o conflito não é recusa — recebida, em conflito, e o aviso do mock (00)
  recebidaEmConflito: (placa, aviso) => `${placa} · recebida · em conflito,\n${aviso}`,   // duas linhas de verdade
  haMin: (n) => `há ${n} min`,
  agora: 'agora',   // o que entrou na fila agora, às 14:30
  ontem: (hora) => `ontem ${hora}`,
  // o recebido de mais de um dia: o dia e a hora (a 00, '10/03, 10:05').
  // A 02 diz 'ontem 10:05' pro mesmo f-08: diferença conhecida da referência
  naData: ({ dia, mes }, hora) => `${dia}/${mes}, ${hora}`,
  haDias: (n) => `há ${n} dias`,                             // o item na fila de outro dia (nenhum no mock) e o recebido sem data
  // a fila vazia (03, 04)
  vazio: 'Nada esperando envio',
  ultimoSubiu: (hora) => `O último item subiu às ${hora}.`,
  // a Seção F em re-checagem (04)
  rechecagem: 'EM RE-CHECAGEM · SEÇÃO F',
  recebimentoPendente: 'recebimento pendente',
  confereEm: (horas) => `confere em ${horas} h`,
}
