// Os momentos difíceis de pegar ao vivo, na coluna (palco.md): a Seção E resolvida
// e a foto do painel do caminhão, a câmera e a foto tirada (T13), o reinício e o reconectando (T16) e o conferindo (T11) abrem
// parados pela coluna, no quadro da fotografia, e voltam ao fluxo
export default [
  { abre: '?tela=T13' }, { janela: [1440, 900] }, { dorme: 800 },
  { palco: 'Seção E resolvida' }, { chega: 'T13', estado: '13-momento-e-resolvida' }, { ve: 'o ciclo passou' }, { dorme: 1200 }, { quieto: true },
  { palco: 'Caminhão · a foto do painel' }, { chega: 'T13', estado: '20-momento-foto-do-painel' }, { ve: 'KNB-5H39' }, { dorme: 1200 }, { quieto: true },
  // a foto do painel tirada (decisão 63): a foto do caminhão no quadro, parada, sem esmaecer ao abrir
  { palco: 'Caminhão · a foto do painel tirada' }, { chega: 'T13', estado: '48-momento-foto-do-painel-tirada' }, { ve: 'KNB-5H39' }, { ve: 'Foto tirada às 14:30' },
  { ouve: 'A foto do painel, tirada às 14:30' }, { dorme: 1200 }, { quieto: true },
  { palco: 'Voltar ao fluxo' }, { chega: 'T13', estado: null },
  { abre: '?tela=T16' }, { dorme: 800 },
  { palco: 'Reiniciando o módulo' }, { chega: 'T16', estado: '01-momento-reiniciando-o-modulo' }, { dorme: 3000 }, { chega: 'T16', estado: '01-momento-reiniciando-o-modulo' },
  { palco: 'Reconectando no reinício' }, { chega: 'T16', estado: '08-momento-reconectando-no-reinicio' }, { dorme: 3000 }, { chega: 'T16', estado: '08-momento-reconectando-no-reinicio' },
  { palco: 'Voltar ao fluxo' }, { chega: 'T16', estado: null },
  { abre: '?tela=T11' }, { dorme: 800 },
  { palco: 'Conferindo' }, { chega: 'T11', estado: '04-momento-conferindo' }, { dorme: 3000 }, { ve: 'CONFERINDO' }, { quieto: true },
  { palco: 'Voltar ao fluxo' }, { chega: 'T11', estado: null },
  // os momentos novos na coluna (decisão 64), parados, cada um no lugar que o índice diz: a folha no teto,
  // logo depois da 17 (T01) · o reconectando, depois da 03, e o sair sem pendência, no fim (T04) · o corte do
  // caminhão, no fim, e o descartar, depois da 06 (T16)
  { abre: '?tela=T01' }, { dorme: 800 },
  { palco: 'Teto · não recebi o código' }, { chega: 'T01', estado: '23-momento-folha-nao-recebi-no-teto' },
  { ve: 'Os 3 envios desta hora acabaram: as duas saídas liberam às 15:12. O código já enviado segue valendo.' }, { dorme: 1200 }, { quieto: true },
  { palco: 'Voltar ao fluxo' }, { chega: 'T01', estado: null },
  { abre: '?tela=T04' }, { dorme: 800 },
  { palco: 'Reconectando ao módulo' }, { chega: 'T04', estado: '18-momento-reconectando-ao-modulo' }, { ve: 'reconectando…' }, { dorme: 3000 },
  { chega: 'T04', estado: '18-momento-reconectando-ao-modulo' }, { quieto: true },
  { palco: 'Sair sem pendência' }, { chega: 'T04', estado: '17-momento-folha-conta-sair-sem-pendencia' }, { ve: 'Nenhuma sessão aberta e nada na fila.' }, { dorme: 1200 }, { quieto: true },
  { palco: 'Voltar ao fluxo' }, { chega: 'T04', estado: null },
  { abre: '?tela=T16' }, { dorme: 800 },
  { palco: 'Caminhão · o corte de alimentação' }, { chega: 'T16', estado: '09-momento-o-corte-de-alimentacao' }, { ve: 'com você' }, { dorme: 3000 },
  { chega: 'T16', estado: '09-momento-o-corte-de-alimentacao' }, { quieto: true },
  { palco: 'Descartar a instalação' }, { chega: 'T16', estado: '11-momento-descartar-a-instalacao' }, { ve: 'Descartar a instalação?' }, { dorme: 1200 }, { quieto: true },
  { palco: 'Voltar ao fluxo' }, { chega: 'T16', estado: null },
]
