// A faixa de sessão e a barra do sistema (movimento.md; a peça:
// src/ds/chrome/Faixa.jsx, e os gatilhos: o `ausente` da T07 e o `revela` da T16).
// · A faixa que nasce (T07, quando as sete linhas do diagnóstico passam sem trava): desce
//   de cima em --mov-padrao (200), na --mov-curva, por baixo da barra do sistema; o miolo acompanha só
//   por deslocamento, com o lugar já aberto. A T05 só conecta: a faixa não desce no toque.
// · A faixa que encerra (T16, quando a sessão fecha): a aberta sobe em 200, por baixo da barra, e
//   revela a sem sessão, que já está no lugar — nada do miolo se move.
// · O ENCERRAR que se apaga e volta (a lei 17): a tinta troca direto, sem piscar — nada anima na
//   faixa, nem a camada do pressionado.
// · A barra do sistema é do Android (decisão 43): não se move, nem por transform nem por opacity; a
//   cor dela troca direto.
// Nada disso na abertura: a tela que abre já com a faixa (pela URL, no print) abre parada. Com reduzir
// movimento, nada se move, e os processos seguem no mesmo ritmo. Na vitrine, as peças tocáveis (a
// faixa que nasce não tem espécime).
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const DESCE = { prop: 'transform', ms: 200, curva: C, em: 'ds-faixa ds-faixa-aberta' }
const MIOLO = { prop: 'transform', ms: 200, curva: C, em: 'tela-miolo' }
const SOBE = { prop: 'transform', ms: 200, curva: C, em: 'ds-faixa-saindo' }
// a barra não se move, e o rodapé fica onde está
const BARRA = [{ prop: 'opacity', em: 'ds-barra-sistema' }, { prop: 'transform', em: 'ds-barra-sistema' }]
const PARADOS = [...BARRA, { prop: 'transform', em: 'ds-rodape' }]
// o ENCERRAR que se apaga e volta: nada na faixa, nem a camada do pressionado soltando por cima
const SEM_PISCAR = [{ prop: 'opacity', em: 'ds-chrome-camadas' }, { prop: 'transform', em: 'ds-faixa' }, { prop: 'opacity', em: 'ds-faixa' }]
// o diagnóstico do herói: os 150 da troca e sete linhas, uma a cada 600 ms (RITMOS.diagnosticoLinhaMs), do toque à faixa
const DIAG = [4500, 5800]   // nove linhas (o chip e as mensagens)
// os sete passos do encerramento, um a cada 600 ms (RITMOS.encerramentoPassoMs), do abre à sem sessão
const PASSOS = [3700, 4700]
// o caminhão coletor na sessão (o KNB-5H39 com o M2C-0371), como a T06 o gravaria: a calibração viva (o mov-t10 faz o mesmo)
const SESSAO_DO_CAMINHAO = `
  const el = document.querySelector('.t10'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value
  despachar({ tipo: 'mesclar', parcial: { sessao: { ...estado.sessao, ativoId: 'a-09', moduloSerial: 'M2C-0371' } } })
  return true`

export default [
  // ── a faixa que nasce, na T07: a busca da T05 abre parada, sem faixa, e o Conectar não a desce ──
  { abre: '?tela=T05' },
  { chega: 'T05', momento: null },
  { quieto: true },
  { naoVe: 'ENCERRAR' },
  { toca: 'Conectar ao M2C-0417', naoAnima: [{ prop: 'transform', em: 'ds-faixa' }] },
  { chega: 'T07', momento: null },
  { naoVe: 'ENCERRAR' },
  // as sete passam: a faixa desce, o miolo acompanha; a barra fica. O rodapé da T07 passa de uma
  // ação a duas e sobe junto, só por deslocamento (o desvio 10 da T07, tela.md): aqui ele anda
  { ve: 'ENCERRAR', entre: DIAG },
  { anima: [DESCE, MIOLO], naoAnima: BARRA },
  { naoVe: 'M2C-0417 · RKT-8H42' },   // o rótulo do topo sai: o serial está na faixa
  { ve: '8 de 8' },
  { dorme: 300 },
  { quieto: true },
  // a faixa que nasceu segue a outra tela parada: o topo não se move entre telas
  { toca: 'Selecionar ativo', naoAnima: [{ prop: 'transform', em: 'ds-faixa' }, ...PARADOS] },
  { chega: 'T06' },
  { dorme: 300 },
  // ── a T07 que abre já com a faixa, pelo endereço e no print: parada ──
  { abre: '?tela=T07' },
  { ve: 'ENCERRAR' },
  { quieto: true },
  { abre: '?tela=T07&print=1' },
  { quieto: true },
  // ── com reduzir movimento: a faixa aparece, no mesmo ritmo, e nada se move ──
  { reduzir: true },
  { abre: '?tela=T05' },
  { toca: 'Conectar ao M2C-0417' },
  { chega: 'T07', momento: null },
  { naoVe: 'M2C-0417 · RKT-8H42' },   // a leitura (a 11): nada em cima do título, enquanto a faixa não nasce
  { ve: 'ENCERRAR', ms: 8000 },
  { quieto: true },
  { reduzir: false },

  // ── a faixa que encerra, na T16: os sete passos correm desde o abre, e a aberta sobe ──
  { abre: '?tela=T16' },
  { quieto: true },
  { ve: 'Encerrando · não desconecte' },
  { ve: 'Sem sessão de configuração', entre: [PASSOS[0] - 100, PASSOS[1]] },
  { anima: [SOBE], naoAnima: [{ prop: 'transform', em: 'tela-miolo' }, ...PARADOS] },
  { dorme: 300 },
  { naoAnima: [{ prop: 'transform', em: 'ds-faixa' }] },
  // a sem sessão da T16 pelo endereço: parada, sem a aberta por cima
  { abre: '?tela=T16&momento=02-momento-instalacao-homologada' },
  { ve: 'Sem sessão de configuração' },
  { naoAnima: [{ prop: 'transform', em: 'ds-faixa' }] },
  { abre: '?tela=T16&print=1' },
  { quieto: true },
  // a sessão que fecha sem homologar: os quatro passos seguros, e a aberta sobe do mesmo jeito
  { abre: '?tela=T16&momento=03-momento-encerrando-sem-homologar' },
  { naoVe: 'Sem sessão de configuração' },
  { ve: 'Sem sessão de configuração', entre: [0, 8000] },
  { anima: [SOBE], naoAnima: [{ prop: 'transform', em: 'tela-miolo' }, ...PARADOS] },
  { dorme: 300 },
  // com reduzir movimento: a troca é direta, no mesmo ritmo
  { reduzir: true },
  { abre: '?tela=T16' },
  { ve: 'Sem sessão de configuração', entre: PASSOS },
  { quieto: true },
  { reduzir: false },

  // ── o ENCERRAR que se apaga e volta (a lei 17): a recuperação da T09 e o semear da T10 ──
  // a T09 abre no que vai ser gravado (05): o Gravar no módulo liga a cadeia
  { abre: '?tela=T09' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { toca: 'Gravar no módulo' },
  { chega: 'T09', momento: null },
  { toca: 'ENCERRAR', naoAnima: SEM_PISCAR },   // antes de a Conexão gravar, o ENCERRAR abre a recuperação e se apaga
  { desligado: 'ENCERRAR' },
  { toca: 'Continuar a gravação', naoAnima: SEM_PISCAR },
  { toca: 'ENCERRAR', naoAnima: SEM_PISCAR },   // voltou aceso: toca de novo, e se apaga de novo
  { desligado: 'ENCERRAR' },
  // o semear é do caminhão coletor (decisão 52): a sessão dele, e o painel digitado
  { abre: '?tela=T10' },
  { executa: SESSAO_DO_CAMINHAO },
  { digita: '87712', em: 'O PAINEL MOSTRA' },
  { toca: 'Semear o hodômetro', naoAnima: SEM_PISCAR },
  { desligado: 'ENCERRAR' },
  { chega: 'T10', momento: '01-momento-hodometro-semeado', ms: 6000 },
  { naoAnima: SEM_PISCAR },
  { toca: 'ENCERRAR' },   // aceso de novo, com o pressionado de sempre: o diálogo Encerrar antes de terminar?
  { ve: 'Encerrar antes de terminar?' },

  // ── a vitrine: as duas peças, tocáveis ──
  { abre: '?vitrine=1&especime=mov-faixa-encerra' },
  { quieto: true },
  { toca: 'bancada · a sessão encerra', anima: [SOBE], naoAnima: [{ prop: 'transform', em: 'tela-miolo' }, ...PARADOS] },
  { dorme: 300 },
  { quieto: true },
  { naoVe: 'RKT-8H42' },   // a aberta saiu: só a sem sessão fica
  { toca: 'bancada · abre no fim', naoAnima: [{ prop: 'transform' }] },
  { quieto: true },
  { toca: 'bancada · abre no começo' },
  { reduzir: true },
  { toca: 'bancada · a sessão encerra' },
  { quieto: true },
  { reduzir: false },
  { abre: '?vitrine=1&especime=mov-faixa-encerrar' },
  { toca: 'bancada · o processo começa', naoAnima: SEM_PISCAR },
  { desligado: 'ENCERRAR' },
  { quieto: true },
  { toca: 'bancada · o processo termina', naoAnima: SEM_PISCAR },
  { toca: 'ENCERRAR' },
]
