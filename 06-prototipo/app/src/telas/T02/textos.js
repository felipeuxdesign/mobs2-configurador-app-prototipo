// Os textos da T02, copiados do 02-telas/T02-selecionar-contexto/textos.md —
// nunca redigitados. Onde o texto traz um dado (a contagem de empresas, os
// ativos do pacote), a função monta com o valor do mock que a tela passa; o
// resto é a letra da referência. A palavra é empresa (a lei 18, decisão 56).
export const TX = {
  // 00 e 01 · as empresas do técnico (no singular, *1 EMPRESA*: o mundo de uma empresa
  // só pula a tela, e nenhuma referência o desenha)
  empresas: (n) => `${n} ${n === 1 ? 'EMPRESA' : 'EMPRESAS'}`,
  titulo: 'Pra qual empresa hoje?',
  ativos: (n) => `${n} ativos`,
  escolhaEmpresa: 'Escolha uma empresa',
  sincronizar: 'Sincronizar',
  // o diálogo de quem entra depois de outro usuário, sobre as empresas — a T01/18
  // (02-telas/T01-login/textos.md). O usuário anterior e os itens da fila dele são o
  // dado; no singular, *1 item* (o singular vale)
  outraSessao: 'Outra sessão neste aparelho',
  sessaoEncerrada: (usuario, n) => `A sessão de ${usuario} foi encerrada. A fila dele continua subindo: ${n} ${n === 1 ? 'item' : 'itens'}.`,
  entendi: 'Entendi',
}
