// O palco · as famílias na coluna (palco.md): o que nasce de outro quadro vem
// recuado embaixo dele, e a ordem conta a história — na T13, o detalhe, o não resolvido e o
// relido de cada falha da Seção C, com os nomes curtos (a T02 não tem família desde que a
// lista longa saiu, decisão 56). O momento da família abre pela coluna, parado, e o endereço
// que a coluna escreve reabre o mesmo quadro.
export default [
  { abre: '?tela=T13&estado=22-estado-gps-reprovado' },
  { janela: [1440, 900] },
  { chega: 'T13', estado: '22-estado-gps-reprovado' },
  { palco: 'Alimentação não resolvida' },
  { chega: 'T13', estado: '34-momento-alimentacao-nao-resolvida' },
  { ve: 'relido às 14:30 · ainda 0,2 V abaixo do mínimo' },   // 8,8 V na 1ª releitura, contra os 9,0 do VL06
  { palco: 'Modem relido' },
  { chega: 'T13', estado: '33-momento-modem-relido' },
  { ve: 'relido às 14:30 · sinal bom' },
  // sem a correção do cartão: o homologado sem localização é o aguardando autoteste
  { palco: 'Registrado sem localização' },
  { chega: 'T13', estado: '14-estado-aguardando-autoteste-sem-localizacao' },
  { ve: 'o relatório vai sem localização' },
  { abre: '?tela=T13&estado=35-momento-gps-nao-resolvido' },
  { chega: 'T13', estado: '35-momento-gps-nao-resolvido' },
  { ve: 'relido às 14:30 · ainda sem posição' },   // o GPS pela posição
]
