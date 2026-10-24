// O movimento da T02 · Selecionar contexto (02-telas/T02-selecionar-contexto/animacao.md).
// Tocar numa empresa marca: o quadrado lima surge no poço, em opacidade e escala de 80% a
// 100%, em 150, e o da que perde a marca faz o mesmo ao contrário — a de pacote vencido
// também (a LinhaEscolha). Na primeira escolha, o primário acende: o texto troca de *Escolha
// uma empresa* pra *Sincronizar*, no lugar, esmaecendo em 150, e o roxo troca direto, sem
// a camada; trocar a escolha não muda o texto, e nada mais anima nele. O Sincronizar leva à
// T03 com a troca entre telas. Pela URL, no palco e no print, a tela abre parada; com reduzir
// movimento, tudo direto. A lista filtrada saiu com a busca (decisão 56).
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const desliza = (em) => ({ prop: 'transform', ms: 150, em, curva: C })
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const MIOLO = esmaece('tela-miolo')
const RODAPE = esmaece('ds-rodape')
const MARCA = [esmaece('ds-quadrado-cheio'), desliza('ds-quadrado-cheio')]
const TEXTO = esmaece('ds-primario-texto')
const ACENDE = esmaece('ds-primario-antes')
const ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]

export default [
  // ── abre parada, nos dois quadros: pelo print e pelo endereço ──
  { abre: '?tela=T02&print=1' },
  { quieto: true },
  { abre: '?tela=T02' },
  { ve: 'Escolha uma empresa' },
  { quieto: true },
  { abre: '?tela=T02&momento=01-momento-escolhida' },
  { ve: 'Sincronizar' },
  { quieto: true },
  { abre: '?tela=T02&momento=01-momento-escolhida&print=1' },
  { quieto: true },

  // ── a primeira escolha: o lima surge, e o primário acende com o texto que troca no lugar ──
  { abre: '?tela=T02' },
  { dorme: 200 },
  { toca: 'Viação Atlântico Sul', anima: [...MARCA, TEXTO], naoAnima: [ACENDE] },
  { chega: 'T02', momento: '01-momento-escolhida' },
  { ve: 'Sincronizar' },
  { dorme: 200 },
  { quieto: true },
  // trocar a escolha: o lima surge na nova e sai da de antes; o texto não muda, e nada anima no primário
  { toca: 'Transportes Capibaribe', anima: [...MARCA, esmaece('ds-quadrado')], naoAnima: [TEXTO, ACENDE, ...ROXO] },
  { dorme: 200 },
  // a de pacote vencido também se escolhe, com o mesmo gesto
  { toca: 'Expresso Caruaruense', anima: [...MARCA, esmaece('ds-quadrado')], naoAnima: [TEXTO, ACENDE] },
  { dorme: 200 },
  // tocar de novo na escolhida não desmarca, e nada anima
  { toca: 'Expresso Caruaruense', naoAnima: [esmaece('ds-quadrado-cheio'), TEXTO] },
  { dorme: 200 },
  { toca: 'Viação Atlântico Sul', anima: [...MARCA, esmaece('ds-quadrado')], naoAnima: [TEXTO] },
  { dorme: 200 },
  // o Sincronizar: a troca entre telas, e a T03 abre baixando
  { toca: 'Sincronizar', anima: [MIOLO, RODAPE] },
  { chega: 'T03' },

  // ── do login: a espera do Entrar, e a T02 chega com a troca entre telas ──
  { abre: '' },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar', anima: [TEXTO] },
  { desligado: 'Entrando…' },
  { chega: 'T02', momento: null, entre: [800, 1700] },
  { anima: [MIOLO, RODAPE] },
  { ve: 'Escolha uma empresa' },
  { dorme: 200 },
  { quieto: true },
  { toca: 'Transportes Capibaribe', anima: [...MARCA, TEXTO], naoAnima: [ACENDE] },
  { chega: 'T02', momento: '01-momento-escolhida' },
  { dorme: 200 },
  { quieto: true },
  // o voltar do Android não faz nada: nada anima
  { tecla: 'Escape' },
  { quieto: true },
  { chega: 'T02', momento: '01-momento-escolhida' },

  // ── com reduzir movimento: tudo direto ──
  { reduzir: true },
  { abre: '?tela=T02' },
  { toca: 'Viação Atlântico Sul' },
  { quieto: true },
  { ve: 'Sincronizar' },
  { toca: 'Expresso Caruaruense' },
  { quieto: true },
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { quieto: true },
  { reduzir: false },
]
