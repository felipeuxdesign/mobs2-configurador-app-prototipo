// Por cima da tela (movimento.md, "Por cima da tela"; a
// peça: src/ds/chrome/PorCima.jsx, com a Folha, o Diálogo e o Veu). O mesmo peso em todo o app:
// a folha sobe em 200 e desce em 150, e o véu esmaece junto; o diálogo nasce e some em 150, de
// 98% a 100%. Quando a folha vira diálogo no mesmo véu (o Sair da conta, a empresa escolhida com a
// sessão aberta, o Encerrar a sessão das folhas do módulo e do ativo), o véu fica
// aceso, parado — nada anima nele —, a folha desce em 150 enquanto o diálogo nasce em 150; no
// Cancelar, o mesmo movimento ao contrário: o diálogo some em 150 enquanto a folha sobe em 200.
// A folha do módulo já escurece o topo: ao trocar por Encerrar antes de terminar?,
// o véu fica parado e nenhum pedaço extra esmaece. O
// arraste da lei 20 (o painel segue o dedo, e volta em 200 ou desce em 150). O foco é um só:
// o olho e o checkbox não acendem nem apagam campo nenhum; o traço de 2 é desenhado
// por cima da borda de 1: o foco, o escolhido e a falha não tiram texto nenhum do lugar.
// O registro sem resto: a variante existe na LinhaTocavel e no Link, sem quem a use. Com reduzir movimento, tudo direto.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const FOLHA_SOBE = { prop: 'transform', ms: 200, curva: C, em: 'ds-folha' }
const FOLHA_DESCE = { prop: 'transform', ms: 150, curva: C, em: 'ds-folha' }
const VEU_SOBE = { prop: 'opacity', ms: 200, curva: C, em: 'ds-veu ds-veu-folha' }
const VEU_SAI = { prop: 'opacity', ms: 150, curva: C, em: 'ds-veu ds-veu' }
const DIALOGO = [{ prop: 'opacity', ms: 150, curva: C, em: 'ds-dialogo' }, { prop: 'transform', ms: 150, curva: C, em: 'ds-dialogo' }]
// o véu da troca não anima nada: nem some, nem volta
const VEU_PARADO = [{ prop: 'opacity', em: 'ds-veu ds-veu' }]
const PEDACO = { prop: 'opacity', ms: 150, curva: C, em: 'ds-veu-cresce-pedaco' }
const TRACO = { prop: 'transform', ms: 150, curva: C, em: 'ds-traco-foco' }
const esc = { tecla: 'Escape' }
// o caminhão coletor na sessão (o KNB-5H39 com o M2C-0371), como a T06 o gravaria: a calibração viva (o mov-t10 faz o mesmo)
const SESSAO_DO_CAMINHAO = `
  const el = document.querySelector('.t10'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value
  despachar({ tipo: 'mesclar', parcial: { sessao: { ...estado.sessao, ativoId: 'a-09', moduloSerial: 'M2C-0371' } } })
  return true`
// o par divergente da T11, como a T05 e a T06 o gravariam, pelo estado único lido no menu (o voltar.mjs faz o mesmo)
const DIVERGENTE = `
  const el = document.querySelector('.t04'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value
  despachar({ tipo: 'mesclar', parcial: { sessao: { ...estado.sessao, ativoId: 'a-16', moduloSerial: 'M2C-0438' }, etapas: { ...estado.etapas, cadeia: null } } })
  despachar({ tipo: 'ir', tela: 'T11' })
  return true`
// no menu aberto pelo endereço, o aviso do acesso (T04/12) espera a primeira folha fechar
const entendi = [{ ve: 'Seu acesso vence em 2 dias' }, { dorme: 250 }, { toca: 'Entendi', anima: [...DIALOGO.slice(0, 1), VEU_SAI] }, { naoVe: 'Seu acesso vence em 2 dias' }, { dorme: 250 }]

// ── o caminho da empresa (empresa.mjs): até a folha Trocar de empresa, com a sessão aberta ──
const ATE_A_FOLHA_DA_EMPRESA = [
  { abre: '?tela=T02&momento=01-momento-escolhida' },
  { toca: 'Sincronizar' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  { toca: 'Entendi' },
  { naoVe: 'Seu acesso vence em 2 dias' },
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { marca: 'M2C-0417' },
  { toca: 'Conectar ao M2C-0417' },
  { chega: 'T07' },   // a conexão abre o diagnóstico: as sete passam, e a faixa desce
  { ve: 'ENCERRAR', ms: 12000 },
  { toca: 'Selecionar ativo' },
  { chega: 'T06' },
  { marca: 'RKT-8H42' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { toca: 'Vincular o módulo' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: null },
  { dorme: 250 },
  { toca: 'Trocar de empresa — Viação Atlântico Sul', anima: [FOLHA_SOBE, VEU_SOBE] },
  { chega: 'T04', momento: '07-momento-folha-trocar-de-empresa' },
  { ve: 'Trocar recarrega os ativos e o pacote desta empresa.' },
  { dorme: 300 },
]

export default [
  // ── T04 · a folha da conta vira o diálogo de sair, e volta: o véu fica parado ──
  { abre: '?tela=T04&momento=05-momento-folha-conta' },
  { ve: 'Sair da conta' },
  { quieto: true },                                            // aberta pelo endereço: nasce aberta, parada
  { toca: 'Sair da conta', anima: [FOLHA_DESCE, ...DIALOGO], naoAnima: VEU_PARADO },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  { ve: 'Encerrar a sessão e sair' },
  { naoVe: 'Quando vencer, o app pede a senha de novo, com rede.' },              // a folha acabou de sair
  { dorme: 250 },
  { quieto: true },
  { toca: 'Cancelar', anima: [DIALOGO[0], FOLHA_SOBE], naoAnima: VEU_PARADO },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { naoVe: 'Encerrar a sessão e sair' },
  { ve: 'Sair da conta' },
  { dorme: 250 },
  { quieto: true },
  // o voltar do diálogo é o Cancelar: o mesmo movimento
  { toca: 'Sair da conta' },
  { ve: 'Encerrar a sessão e sair' },
  { dorme: 250 },
  esc,
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { ve: 'Quando vencer, o app pede a senha de novo, com rede.' },
  { dorme: 250 },
  // e a folha sai de vez: desce em 150, com o véu
  { toca: 'Fechar', anima: [FOLHA_DESCE, VEU_SAI] },
  { naoVe: 'Sair da conta' },
  ...entendi,
  { quieto: true },

  // ── T04 · a folha Trocar de empresa vira o diálogo de trocar (com a sessão aberta), e volta ──
  { abre: '?tela=T04&momento=07-momento-folha-trocar-de-empresa' },
  { ve: 'Transportes Capibaribe' },
  { quieto: true },
  // a empresa só marca (R-14), e quem troca é o Sincronizar embaixo da lista (decisão 64)
  { marca: 'Transportes Capibaribe' },
  { dorme: 300 },
  { toca: 'Sincronizar', anima: [FOLHA_DESCE, ...DIALOGO], naoAnima: VEU_PARADO },
  { ve: 'Encerrar a sessão e trocar' },
  { naoVe: 'Trocar recarrega os ativos' },
  { dorme: 250 },
  { toca: 'Cancelar', anima: [DIALOGO[0], FOLHA_SOBE], naoAnima: VEU_PARADO },
  { ve: 'Trocar recarrega os ativos' },
  { naoVe: 'Encerrar a sessão e trocar' },
  { dorme: 250 },
  { quieto: true },
  // tocar fora da folha fecha (lei 20): desce em 150, com o véu
  { tocaFora: 'Trocar de empresa', anima: [FOLHA_DESCE, VEU_SAI] },
  { naoVe: 'Trocar recarrega os ativos' },
  ...entendi,

  // ── T04 · a folha do módulo vira Encerrar antes de terminar? com o topo já escurecido ──
  { abre: '?tela=T04&momento=10-momento-folha-modulo-conectado' },
  { ve: 'TRAVADO NA SESSÃO' },
  { quieto: true },
  { toca: 'Encerrar a sessão', anima: [FOLHA_DESCE, ...DIALOGO], naoAnima: [...VEU_PARADO, PEDACO] },
  { chega: 'T04', momento: '13-momento-encerrar-antes-de-homologar' },
  { ve: 'Encerrar antes de terminar?' },
  { naoVe: 'TRAVADO NA SESSÃO' },
  { dorme: 250 },
  { quieto: true },                                           // no fim da troca, o véu é um só: nada ficou animando
  { naoToca: 'ENCERRAR' },                                    // a faixa ficou embaixo do véu
  // o Continuar a instalação: a folha não volta — o diálogo e o véu esmaecem juntos, e o técnico fica no menu
  { toca: 'Continuar a instalação', anima: [DIALOGO[0], VEU_SAI] },
  { chega: 'T04', momento: null },
  { naoVe: 'Encerrar antes de terminar?' },
  ...entendi,
  // o mesmo, pela folha do ativo
  { toca: 'ATIVO SELECIONADO, RKT-8H42', anima: [FOLHA_SOBE, VEU_SOBE] },
  { ve: 'Ativo da sessão' },
  { dorme: 300 },
  { toca: 'Encerrar a sessão', anima: [FOLHA_DESCE, ...DIALOGO], naoAnima: [...VEU_PARADO, PEDACO] },
  { ve: 'Encerrar antes de terminar?' },
  { dorme: 250 },
  esc,
  { naoVe: 'Encerrar antes de terminar?' },
  { dorme: 250 },

  // ── o arraste da folha (lei 20): o painel segue o dedo, só por transform; antes do limite volta em 200, depois desce em 150 ──
  { toca: 'CONECTAR MÓDULO, M2C-0417', anima: [FOLHA_SOBE, VEU_SOBE] },
  { ve: 'TRAVADO NA SESSÃO' },
  { arrasta: 'Módulo conectado', dy: 40, anima: [FOLHA_SOBE] },
  { dorme: 250 },
  { quieto: true },
  { arrasta: 'Módulo conectado', dy: 120, anima: [FOLHA_DESCE, VEU_SAI] },
  { naoVe: 'TRAVADO NA SESSÃO' },
  { dorme: 250 },
  { quieto: true },

  // ── o Encerrar antes de terminar? por cima de outra tela: nasce em 150 com o véu, e some igual ──
  { abre: '?tela=T12' },
  { ve: 'ENCERRAR' },
  { quieto: true },
  { toca: 'ENCERRAR', anima: [...DIALOGO, { prop: 'opacity', ms: 150, curva: C, em: 'ds-veu ds-veu-dialogo' }] },
  { ve: 'Encerrar antes de terminar?' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Continuar a instalação', anima: [DIALOGO[0], VEU_SAI] },
  { naoVe: 'Encerrar antes de terminar?' },
  { chega: 'T12' },

  // ── a folha Outras ações da T11 e a do login: sobem em 200 com o véu, e descem em 150 ──
  // a T11 do herói confere e bate: o par divergente (o a-16 com o M2C-0438) se semeia no menu
  { abre: '?tela=T04' }, { chega: 'T04' }, { executa: DIVERGENTE }, { chega: 'T11' },
  { ve: 'NÃO BATE COM O CADASTRO', ms: 5000 },
  { toca: 'Outras ações', anima: [FOLHA_SOBE, VEU_SOBE] },
  { chega: 'T11', momento: '03-momento-outras-acoes' },
  { dorme: 300 },
  { toca: 'Fechar', anima: [FOLHA_DESCE, VEU_SAI] },
  { chega: 'T11', momento: null },
  { abre: '?tela=T01&momento=03-momento-recuperar-digitar-codigo' },
  { quieto: true },
  { toca: 'Não recebi o código', anima: [FOLHA_SOBE, VEU_SOBE] },
  { ve: 'Usar outro dado' },
  { dorme: 300 },
  { toca: 'Fechar', anima: [FOLHA_DESCE, VEU_SAI] },
  { naoVe: 'Usar outro dado' },

  // ── o foco é um só e o traço de 2 não tira nada do lugar: o login ──
  { abre: '?tela=T01' },
  { chega: 'T01', momento: null },
  { quieto: true },                                          // a senha nasce acesa, parada
  { marcaLugar: true },
  { toca: 'USUÁRIO', anima: [TRACO] },                       // o usuário acende e a senha apaga: a capa dos dois, 150
  { mesmoLugar: true },
  { dorme: 250 },
  { toca: 'Mostrar a senha', naoAnima: [{ prop: 'transform', em: 'ds-traco-foco' }] },   // o olho, dentro do poço da senha, não acende a senha
  { dorme: 250 },
  { toca: 'Lembrar meu usuário', naoAnima: [{ prop: 'transform', em: 'ds-traco-foco' }] },   // o checkbox não apaga o usuário
  { dorme: 250 },
  { mesmoLugar: true },
  { toca: 'SENHA', anima: [TRACO] },
  { mesmoLugar: true },
  { dorme: 250 },
  { quieto: true },
  // o código: o traço lima pula de célula em célula, e o dígito que ficou para trás não sai do lugar · o teclado
  // do aparelho (decisão 62), aberto ao chegar, fecha antes pelo voltar: o código errado chega com ele fechado,
  // como a 05 desenha — o teclado que fecha muda o tamanho do miolo, e não é a falha que tira texto do lugar
  { abre: '?tela=T01&momento=03-momento-recuperar-digitar-codigo' },
  esc,
  { dorme: 250 },
  { digita: '4', em: 'Digite o código' },
  { dorme: 200 },
  { marcaLugar: true },
  { digita: '48291', em: 'Digite o código' },
  { dorme: 200 },
  { mesmoLugar: true },
  { digita: '482911', em: 'Digite o código' },
  { mesmoLugar: true },
  { toca: 'Confirmar' },                                      // errado: as seis ficam com o traço vermelho, e o cartão em falha
  { ve: 'Código inválido' },
  { mesmoLugar: true },
  // o canal escolhido (T01/02): o traço lima troca de aba, e a aba troca o
  // conteúdo da primeira etapa — o e-mail não tem o seletor de país (a 21) —, e o
  // telefone volta como estava, no mesmo lugar
  { abre: '?tela=T01&momento=02-momento-recuperar-escolher-canal' },
  { marcaLugar: true },
  { toca: 'E-MAIL' },
  { chega: 'T01', momento: '21-momento-o-e-mail-como-canal' },
  { toca: 'TELEFONE' },
  { chega: 'T01', momento: '02-momento-recuperar-escolher-canal' },
  { mesmoLugar: true },
  // a busca da lista do pacote (T06) e o campo do painel (T10): o foco do próprio campo acende, sem tirar nada do lugar
  { abre: '?tela=T06' },
  { dorme: 200 },
  { marcaLugar: true },
  { foca: 'Buscar placa, frota ou módulo' },
  { mesmoLugar: true },
  { abre: '?tela=T10' },
  { executa: SESSAO_DO_CAMINHAO },   // o campo do painel é do caminhão: o ônibus não calibra nada (decisão 52)
  { dorme: 200 },
  { marcaLugar: true },
  { foca: 'O PAINEL MOSTRA' },
  { anima: [TRACO] },
  { mesmoLugar: true },

  // ── com reduzir movimento: a troca no mesmo véu, a folha, o diálogo e o foco, tudo direto ──
  { reduzir: true },
  { abre: '?tela=T04&momento=05-momento-folha-conta' },
  { ve: 'Sair da conta' },
  { toca: 'Sair da conta' },
  { quieto: true },
  { ve: 'Encerrar a sessão e sair' },
  { naoVe: 'Quando vencer, o app pede a senha de novo, com rede.', ms: 300 },
  { toca: 'Cancelar' },
  { quieto: true },
  { ve: 'Quando vencer, o app pede a senha de novo, com rede.' },
  { naoVe: 'Encerrar a sessão e sair', ms: 300 },
  { toca: 'Fechar' },
  { quieto: true },
  { naoVe: 'Sair da conta', ms: 300 },
  { abre: '?tela=T04&momento=10-momento-folha-modulo-conectado' },
  { toca: 'Encerrar a sessão' },
  { quieto: true },
  { ve: 'Encerrar antes de terminar?' },
  { toca: 'Continuar a instalação' },
  { quieto: true },
  { abre: '?tela=T01' },
  { toca: 'USUÁRIO' },
  { quieto: true },
  { reduzir: false },

  // ── T04/14 · o Trocar de empresa da folha, com a sessão aberta: o mesmo véu, parado ──
  ...ATE_A_FOLHA_DA_EMPRESA,
  { marca: 'Expresso Caruaruense' },
  { dorme: 300 },
  { toca: 'Sincronizar', anima: [FOLHA_DESCE, ...DIALOGO], naoAnima: VEU_PARADO },
  { ve: 'é encerrada antes da troca, sem terminar a instalação.' },
  { dorme: 250 },
  { toca: 'Cancelar', anima: [DIALOGO[0], FOLHA_SOBE], naoAnima: VEU_PARADO },
  { ve: 'Trocar recarrega os ativos e o pacote desta empresa.' },
  { dorme: 250 },
  { quieto: true },
]
