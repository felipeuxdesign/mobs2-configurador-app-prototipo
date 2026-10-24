// T15 · o Ressincronizar e reenviar: os itens com
// erro voltam pra fila, e o envio recomeça. O que isso mostra é só o que as
// referências e o mock sustentam: o cartão que pede ação sai, e o item
// entra na lista como 'na fila', com a espera de criadoAs às 14:30, na ordem
// do mais novo pro mais velho; o contador continua 4 (o f-11, o recebido em conflito,
// não conta no menu: chegou). Sair da tela não desfaz
// (HU-T15-2): pelo menu, o cartão da Fila de saída fica igual (2), a fila volta
// igual, e o diálogo Sair da conta conta o mesmo do cartão (2: o erro reenviado
// continua não chegado · decisão 64, o mesmo fato se diz igual). Da semente da T15.
// A fila é do aparelho (decisão 42): o rótulo é 'neste aparelho', e a recebida de
// 2 dias diz o dia, '10/03, 10:05'.
export default [
  { abre: '?tela=T15' },
  { chega: 'T15', estado: null },
  { ve: 'UM PRECISA DE VOCÊ' },
  { ve: 'O servidor recusou: o pacote de sincronização venceu.' },   // uma causa que o técnico resolve
  { ve: 'O RESTO ANDA SOZINHO' },
  { ve: '4 neste aparelho' },
  { ve: 'RSW-9L02 · recebida\n10/03, 10:05' },
  { ve: 'RVM-1E54 · recebida · em conflito,\no gestor foi avisado' },   // o conflito não é recusa
  { naoVe: 'há 2 dias' },
  { toca: 'Ressincronizar e reenviar' },
  // nada mais precisa do técnico: o cartão sai, e o que era erro está na fila
  { naoVe: 'UM PRECISA DE VOCÊ' },
  { naoToca: 'Ressincronizar e reenviar' },
  { naoVe: 'O RESTO ANDA SOZINHO' },
  { ve: 'NA FILA E RECEBIDAS' },
  { ve: 'KJC-7N23 · na fila' },
  { ve: 'há 145 min' },
  { ve: 'RSW-9L02 · na fila' },
  { ve: 'RSW-9L02 · recebida' },
  // a ordem da lista: na fila, do mais novo pro mais velho (14:12, depois 12:05), e depois a recebida
  { ve: 'RSW-9L02 · na fila\nhá 18 min\nEvidências\nKJC-7N23 · na fila\nhá 145 min\nEvidências\nRSW-9L02 · recebida' },
  // o contador conta os mostrados: continua 3
  { ve: '4 neste aparelho' },   // a fila é do aparelho (decisão 42)
  // nenhum vira o SUBINDO AGORA: o progresso e o tamanho só existem no f-04 do mock
  { naoVe: 'SUBINDO AGORA' },
  { fica: 'T15', ms: 600 },
  // sair da tela não desfaz: pelo menu, a fila volta com o item na fila
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  { toca: 'Entendi' },   // o 5º dia do acesso: o aviso na primeira chegada ao menu (T04/12)
  // o cartão da Fila de saída do menu não muda: o erro já contava como pendente (T04·1)
  { ve: '2\nFila de saída' },
  { toca: 'Fila de saída' },
  { chega: 'T15', estado: null },
  { ve: 'KJC-7N23 · na fila' },
  { naoVe: 'UM PRECISA DE VOCÊ' },
  { ve: 'NA FILA E RECEBIDAS' },
  { tecla: 'Escape' },   // o voltar do Android faz o mesmo que o Voltar ao menu
  { chega: 'T04' },
  // o diálogo Sair da conta conta o mesmo do cartão: o que não chegou da fila do aparelho (2) — o
  // erro reenviado voltou pra fila e continua sem chegar (decisão 64 · estado/fila.js)
  { toca: 'Conta — Rafael Vieira' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { toca: 'Sair da conta' },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  { ve: '2 itens ainda não chegaram ao servidor. Eles ficam no aparelho e continuam subindo.' },
  { toca: 'Cancelar' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { tecla: 'Escape' },
  { chega: 'T04', momento: null },
]
