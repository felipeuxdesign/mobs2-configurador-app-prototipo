// A entrada da T10 segue o ônibus do fluxo normal; os quadros do caminhão agora são consultas.
// O palco não oferece um percurso alternativo de calibração. Processos consultados ficam quietos.
const PARADA = [{ quieto: true }, { dorme: 2200 }, { quieto: true }]
// o caminhão coletor na sessão (o KNB-5H39 com o M2C-0371), como a T06 o gravaria: a calibração viva (o teclado.mjs faz o mesmo)
const SESSAO_DO_CAMINHAO = `
  const el = document.querySelector('.t10'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value
  despachar({ tipo: 'mesclar', parcial: { sessao: { ...estado.sessao, ativoId: 'a-09', moduloSerial: 'M2C-0371' } } })
  return true`
// o texto que troca no primário esmaece no lugar (a peça)
const TEXTO = { prop: 'opacity', ms: 150, em: 'ds-primario-texto' }
const consultas = [
  ['00-tela', 'Hodômetro'],
  ['01-momento-hodometro-semeado', 'relido às 14:30'],
  ['05-momento-hodometro-digitado', 'Semear o hodômetro'],
  ['06-momento-gravando-no-modulo', 'Gravando no módulo'],
  ['07-momento-relendo', 'Relendo'],
  ['08-momento-horimetro', 'Horímetro'],
  ['09-momento-calibracao-completa', 'Calibração completa'],
  ['12-momento-corrigindo-o-semeado', 'corrija e semeie de novo'],
]
export default [
  { abre: '?tela=T10' },
  { ve: 'Nada a calibrar' },
  { ve: 'RKT-8H42' },
  ...PARADA,
  { toca: 'Fazer o ciclo de testes' },
  { chega: 'T14' },
  // ── o caminhão vivo: a régua diz o lado, e o semeado se corrige na hora (decisão 64) ──
  { abre: '?tela=T10' },
  { executa: SESSAO_DO_CAMINHAO },
  { ve: 'KNB-5H39' },
  { ve: 'Hodômetro' },
  { digita: '87600', em: 'O PAINEL MOSTRA' },
  { ve: 'o painel está 4 km atrás' },      // o painel atrás do que o módulo conta (87.604)
  { digita: '87712', em: 'O PAINEL MOSTRA' },
  { ve: 'o painel está 108 km à frente' },
  { naoVe: 'diferença de' },
  { toca: 'Semear o hodômetro' },
  { desligado: 'Gravando no módulo…' },
  { desligado: 'Relendo…', ms: 3000 },
  { ve: 'relido às 14:30 · confere com o painel', ms: 6000 },
  { chega: 'T10', momento: '01-momento-hodometro-semeado' },
  { ve: 'toque pra corrigir' },
  { dorme: 400 },
  // o painel inteiro se toca: volta a ser o campo, em foco, e o primário diz Semear de novo (a 12)
  { toca: 'toque pra corrigir', anima: [TEXTO] },
  { chega: 'T10', momento: '12-momento-corrigindo-o-semeado' },
  { ve: 'corrija e semeie de novo' },
  { ve: 'semeado às 14:30' },
  { naoVe: 'toque pra corrigir' },
  { digita: '87720', em: 'O PAINEL MOSTRA' },
  { ve: 'o painel está 8 km à frente' },     // contra o que o módulo conta agora, o semeado
  { toca: 'Semear de novo' },
  { desligado: 'Gravando no módulo…' },
  { ve: 'relido às 14:30 · confere com o painel', ms: 6000 },
  { ve: '87.720' },
  { chega: 'T10', momento: '01-momento-hodometro-semeado' },
  { ve: 'toque pra corrigir' },
  // as consultas: o caminhão parado, e o convite sem toque
  ...consultas.flatMap(([estado, texto]) => [
    { abre: `?tela=T10&estado=${estado}` },
    { chega: 'T10', estado },
    { ve: 'KNB-5H39' },
    { ve: texto },
    ...PARADA,
    { naoToca: 'ENCERRAR' },
    { naoToca: 'toque pra corrigir' },
    { tecla: 'Escape' },
    { chega: 'T10', estado },
  ]),
]
