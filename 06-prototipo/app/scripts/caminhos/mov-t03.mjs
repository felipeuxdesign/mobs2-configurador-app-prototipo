// O movimento da T03 · Sincronizar (02-telas/T03-sincronizar/animacao.md). A baixa é o processo declarado: no fluxo ela corre desde que
// a tela abre, um item por tique (4 s no total: na Viação, 49 itens, um a cada ~82 ms), e nada se
// move ao abrir — o primeiro tique vem um passo depois. Os cinco grupos do pacote da empresa (decisões 45
// e 56), os ativos primeiro: enquanto eles baixam, a barra dos ativos enche linear, um trecho por item,
// com o marcador junto, só por transform (a Escala com `segue`); a contagem e o *faltam* trocam no
// lugar. O check de cada conteúdo que termina nasce no poço, por opacity, em 150 (a LinhaContagem). A fase é o quadro: a baixa que termina (00 → 02), a
// que para (00 → 01) e o Reconectar (01 → 00) esmaecem o conteúdo em 150, como entre telas. O
// Reconectar que vira o Baixando apagado solta o roxo de uma vez. Com reduzir
// movimento, nada anda, e a baixa leva os mesmos 4 s. Pela URL, no palco, num estado e no
// print, a tela abre parada.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const MIOLO = { prop: 'opacity', ms: 150, curva: C, em: 'tela-miolo' }
const RODAPE = { prop: 'opacity', ms: 150, curva: C, em: 'ds-rodape' }
const CHECK = { prop: 'opacity', ms: 150, curva: C, em: 'ds-glifo' }
// o passo da baixa na Viação: 4000 ÷ 49 ≈ 82 ms (o caminho confere a duração arredondada)
const BARRA = [
  { prop: 'transform', ms: 82, curva: 'linear', em: 'ds-escala-agulha' },
  { prop: 'transform', ms: 82, curva: 'linear', em: 'ds-escala-faixa' },
]
// na Expresso Caruaruense (43 itens), o passo é outro: só a propriedade e onde
const BARRA_EXPRESSO = [{ prop: 'transform', curva: 'linear', em: 'ds-escala-agulha' }, { prop: 'transform', curva: 'linear', em: 'ds-escala-faixa' }]
const ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]
// o que a barra não pode animar: nada de largura nem posição (só transform)
const LAYOUT = [{ prop: 'width' }, { prop: 'left' }, { prop: 'height' }, { prop: 'top' }]
// a Expresso, de pacote vencido, pela T02: a T03 pergunta antes, e o Sincronizar agora baixa
const ATE_A_BAIXA_DA_EXPRESSO = [
  { abre: '?tela=T02' },
  { marca: 'Expresso Caruaruense' },
  { dorme: 200 },
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { ve: 'ENQUANTO NÃO SINCRONIZAR' },
  { dorme: 200 },
]

export default [
  // ── abre parada, em cada quadro: pelo print, pelo endereço e pela coluna ──
  { abre: '?tela=T03&print=1' },
  { ve: '6 de 49 no total' },
  { ve: 'faltam ~1 min' },
  { quieto: true },
  { dorme: 400 },
  { quieto: true },
  { ve: '6 de 49 no total' },                         // no print, a baixa para no quadro da 00
  { abre: '?tela=T03&momento=02-momento-concluido' },
  { ve: 'Pacote de hoje' },
  { ve: 'de 49' },
  { quieto: true },
  { abre: '?tela=T03&estado=01-estado-falha-de-rede' },
  { ve: 'A BAIXA PAROU ONDE ESTAVA' },
  { quieto: true },
  { abre: '?tela=T03&estado=03-estado-pacote-de-4-dias' },
  { ve: 'PACOTE DE 4 DIAS' },
  { quieto: true },
  { abre: '?tela=T03&estado=04-estado-pacote-vencido' },
  { ve: 'ENQUANTO NÃO SINCRONIZAR' },
  { quieto: true },

  // ── T03·1 e T03·2 · a baixa correndo, pela URL: abre parada, e o primeiro tique vem depois ──
  { abre: '?tela=T03' },
  { ve: 'Baixando o pacote' },
  // os ativos baixam primeiro: cada item é um trecho linear de ~82, com o marcador e o preenchido juntos
  { ve: '2 de 49 no total', ms: 1000 },
  { anima: BARRA, naoAnima: [...LAYOUT, CHECK] },
  { ve: '6 de 49 no total', entre: [250, 550] },
  { anima: BARRA, naoAnima: LAYOUT },
  // o 24º ativo: a barra chega ao fim no último trecho, e o check dos ativos nasce no poço
  { ve: '24 de 49 no total', entre: [1250, 1750] },
  { anima: [CHECK, ...BARRA] },
  // as conexões (2): a barra dos ativos já cheia, parada, e o check delas nasce no poço, em 150
  { ve: '26 de 49 no total', entre: [80, 350] },
  { anima: [CHECK], naoAnima: BARRA },
  // os modelos de ativo (3)
  { ve: '29 de 49 no total', entre: [150, 450] },
  { anima: [CHECK], naoAnima: BARRA },
  // os eventos (12): no meio deles, nada anima
  { ve: '35 de 49 no total', entre: [350, 700] },
  { naoAnima: [...BARRA, CHECK] },
  { ve: '41 de 49 no total', entre: [350, 700] },
  { anima: [CHECK], naoAnima: BARRA },
  // as cercas (8) · T03·3 e a troca de fase (00 → 02): o conteúdo esmaece como entre telas, e o check do último nasce no poço
  { ve: 'Pacote de hoje', entre: [500, 900] },
  { anima: [MIOLO, RODAPE, CHECK] },
  { chega: 'T03', momento: '02-momento-concluido' },
  { dorme: 300 },
  { quieto: true },
  // do concluído ao menu: a troca entre telas (o menu não tem rodapé)
  { toca: 'Ir para o menu', anima: [MIOLO] },
  { chega: 'T04' },

  // ── a baixa que para ao vivo (o caso sync-falha-rede: a primeira do pacote da Expresso Caruaruense) ──
  ...ATE_A_BAIXA_DA_EXPRESSO,
  { toca: 'Sincronizar agora', anima: [MIOLO, RODAPE] },   // a troca de fase: o idade vira a baixa
  { dorme: 200 },
  // os ativos da Expresso baixam primeiro: a barra anda, só por transform
  { anima: BARRA_EXPRESSO, naoAnima: LAYOUT },
  // 00 → 01: a baixa cai no 4º item (3 de 18 ativos); o rodapé troca inteiro, e o conteúdo esmaece; o aviso vem dentro da troca, sem esmaecer de novo
  { ve: 'A BAIXA PAROU ONDE ESTAVA', entre: [100, 1400] },
  { anima: [MIOLO, RODAPE], naoAnima: [{ prop: 'opacity', em: 'ds-aviso' }] },
  { dorme: 300 },
  { quieto: true },
  // 01 → 00: o Reconectar segue de onde parou; o Baixando apagado não fica com o roxo
  { toca: 'Reconectar', anima: [MIOLO, RODAPE], naoAnima: ROXO },
  { ve: 'Baixando o pacote' },
  { ve: 'Pacote de hoje', ms: 6000, entre: [3300, 4500] },   // os 40 que faltam, a ~93 ms (4000 ÷ 43)
  { anima: [MIOLO, RODAPE, CHECK] },
  { dorme: 300 },
  { quieto: true },
  // a falha de novo: o pacote do aparelho venceu (a 05), e o Trocar de empresa — a troca entre telas, e a T02
  // com a atual marcada (decisão 64)
  ...ATE_A_BAIXA_DA_EXPRESSO,
  { toca: 'Sincronizar agora' },
  { ve: 'A BAIXA PAROU ONDE ESTAVA', ms: 3000 },
  { ve: 'O pacote que está no aparelho venceu: sem a baixa, os 18 ativos ficam indisponíveis.' },
  { naoVe: 'Continuar com' },
  { dorme: 300 },
  { toca: 'Trocar de empresa', anima: [MIOLO, RODAPE] },
  { chega: 'T02', momento: '01-momento-escolhida' },
  // a falha com o pacote do aparelho valendo (a 01, a Viação, só pela coluna): o link segue com ele, parado
  { abre: '?tela=T03&estado=01-estado-falha-de-rede' },
  { quieto: true },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },
  { ve: '6 de 24' },
  { ve: 'Continuar com o pacote de ontem' },
  { naoVe: 'O pacote que está no aparelho venceu' },
  // o pacote de 4 dias (a 03) diz quando bloqueia
  { abre: '?tela=T03&estado=03-estado-pacote-de-4-dias' },
  { ve: 'Dá pra trabalhar. Depois de 7 dias ele bloqueia: sincronize quando tiver rede.' },

  // ── com reduzir movimento: nada anda, e a baixa leva os mesmos 4 s ──
  { reduzir: true },
  { abre: '?tela=T03' },
  { quieto: true },
  { ve: '4 de 49 no total', ms: 3000 },
  { quieto: true },
  { ve: '20 de 49 no total', entre: [1150, 1500] },   // 16 passos de ~82
  { quieto: true },
  { ve: 'Pacote de hoje', entre: [2150, 2650] },      // os 29 do fim
  { quieto: true },
  { toca: 'Ir para o menu' },
  { chega: 'T04' },
  { quieto: true },
  ...ATE_A_BAIXA_DA_EXPRESSO,
  { toca: 'Sincronizar agora' },
  { quieto: true },
  { ve: 'A BAIXA PAROU ONDE ESTAVA', ms: 3000 },
  { quieto: true },
  { toca: 'Reconectar' },
  { quieto: true },
  { ve: 'Pacote de hoje', ms: 6000 },
  { quieto: true },
  { reduzir: false },
]
