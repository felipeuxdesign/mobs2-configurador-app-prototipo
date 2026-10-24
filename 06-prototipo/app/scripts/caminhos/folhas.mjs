// A folha que fecha (lei 20): a folha de opções fecha no xis,
// e toda folha também fecha tocando fora, arrastando pra baixo e no voltar do
// Android (no computador, o Esc). As folhas do app: a Não recebi o código (T01/04
// e 11) e as quatro do menu — Conta (T04/05), Trocar de empresa (T04/07), Módulo
// conectado (T04/10) e Ativo da sessão (T04/11). Cada uma abre pelo endereço (o
// momento é o app vivo) e fecha dos quatro jeitos.
// O arraste (Folha.jsx): o painel acompanha o dedo, só por transform; soltando
// antes de --folha-arraste-limite (56), volta, no subir da folha (200); passando,
// fecha, no fechar da folha (150). O arraste que começa em cima de uma linha
// tocável não toca nela: a Transportes Capibaribe não troca de empresa, o Encerrar a
// sessão não encerra, o Reenviar o código não reenvia, o Usar outro dado não volta.
const volta = [{ prop: 'transform', ms: 200, em: 'ds-folha' }]
const fecha = [{ prop: 'transform', ms: 150, em: 'ds-folha' }, { prop: 'opacity', ms: 150, em: 'ds-veu' }]
const esc = { tecla: 'Escape' }
// no menu aberto pelo endereço, o aviso do acesso (T04/12) espera a primeira folha fechar, e o Entendi fecha
const entendi = [{ ve: 'Seu acesso vence em 2 dias' }, { toca: 'Entendi' }, { naoVe: 'Seu acesso vence em 2 dias' }]

// abre a folha pelo endereço, e confere que ela está lá
const abre = (endereco, folha, dentro) => [{ abre: endereco }, { ve: dentro }, { arrasta: folha, dy: 0 }]
export default [
  // ── T01 · Não recebi o código (a folha de opções da recuperação) ──
  // esperando o reenvio (04): as linhas estão desabilitadas, e a folha arrasta igual
  ...abre('?tela=T01&momento=04-momento-nao-recebi-o-codigo', 'Não recebi o código', 'Reenviar o código'),
  { arrasta: 'Não recebi o código', dy: 6 },                       // menos que a folga: é toque, o painel fica
  { ve: 'Reenviar o código' },
  { arrasta: 'Não recebi o código', dy: 40, anima: volta },        // antes do limite: volta
  { fica: 'T01', ms: 300 },
  { chega: 'T01', momento: '04-momento-nao-recebi-o-codigo' },
  { ve: 'Usar outro dado' },
  { arrasta: 'Não recebi o código', dy: 120, anima: fecha },       // passou do limite: fecha
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { naoVe: 'Usar outro dado' },
  // tocar fora
  { toca: 'Não recebi o código' },
  { chega: 'T01', momento: '04-momento-nao-recebi-o-codigo' },
  { ve: 'Usar outro dado' },
  { tocaFora: 'Não recebi o código', anima: fecha },
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { naoVe: 'Usar outro dado' },
  // o voltar
  { toca: 'Não recebi o código' },
  { ve: 'Usar outro dado' },
  esc,
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { naoVe: 'Usar outro dado' },
  // o xis — com a folha parada: o teclado do aparelho, que o código reabre ao voltar da folha (decisão 62),
  // desce por cima dela enquanto ela sobe, e o dedo toca o xis depois
  { toca: 'Não recebi o código' },
  { ve: 'Usar outro dado' },
  { dorme: 250 },
  { toca: 'Fechar' },
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { naoVe: 'Usar outro dado' },
  // reenvio liberado (11): as linhas acesas; o arraste que começa numa delas não reenvia
  ...abre('?tela=T01&momento=11-momento-nao-recebi-reenvio-liberado', 'Não recebi o código', 'Reenviar o código'),
  { arrasta: 'Não recebi o código', de: 'Reenviar o código', dy: 40, anima: volta },
  { fica: 'T01', ms: 300 },
  { chega: 'T01', momento: '11-momento-nao-recebi-reenvio-liberado' },
  { ve: 'Usar outro dado' },
  { arrasta: 'Não recebi o código', de: 'Usar outro dado', dy: 120, anima: fecha },
  { naoVe: 'Usar outro dado' },
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' }, // não reenviou (T01/12 e 13)
  { naoVe: 'Para onde mandamos' },                                 // nem voltou pra primeira etapa

  // ── T04 · Conta ──
  ...abre('?tela=T04&momento=05-momento-folha-conta', 'Conta', 'Sair da conta'),
  { arrasta: 'Conta', dy: 40, anima: volta },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { arrasta: 'Conta', de: 'Sair da conta', dy: 30, anima: volta }, // o Sair da conta não abre o diálogo
  { fica: 'T04', ms: 300 },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { naoVe: 'Encerrar a sessão e sair' },
  { arrasta: 'Conta', de: 'Sair da conta', dy: 90, anima: fecha },
  { naoVe: 'Sair da conta' },
  { naoVe: 'Encerrar a sessão e sair' },
  ...entendi,
  { toca: 'Conta — Rafael Vieira' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { tocaFora: 'Conta', anima: fecha },
  { naoVe: 'Sair da conta' },
  { toca: 'Conta — Rafael Vieira' },
  { ve: 'Sair da conta' },
  esc,
  { naoVe: 'Sair da conta' },
  { toca: 'Conta — Rafael Vieira' },
  { ve: 'Sair da conta' },
  { toca: 'Fechar' },
  { naoVe: 'Sair da conta' },

  // ── T04 · Trocar de empresa: o arraste em cima da Transportes Capibaribe não troca ──
  ...abre('?tela=T04&momento=07-momento-folha-trocar-de-empresa', 'Trocar de empresa', 'Transportes Capibaribe'),
  { arrasta: 'Trocar de empresa', de: 'Transportes Capibaribe', dy: 40, anima: volta },
  { fica: 'T04', ms: 400 },
  { chega: 'T04', momento: '07-momento-folha-trocar-de-empresa' },
  { arrasta: 'Trocar de empresa', de: 'Transportes Capibaribe', dy: 120, anima: fecha },
  { fica: 'T04', ms: 400 },
  { naoVe: 'Trocar recarrega os ativos' },
  ...entendi,
  { toca: 'Trocar de empresa' },
  { ve: 'Trocar recarrega os ativos' },
  { tocaFora: 'Trocar de empresa', anima: fecha },
  { naoVe: 'Trocar recarrega os ativos' },
  { toca: 'Trocar de empresa' },
  { ve: 'Trocar recarrega os ativos' },
  esc,
  { naoVe: 'Trocar recarrega os ativos' },
  { toca: 'Trocar de empresa' },
  { ve: 'Trocar recarrega os ativos' },
  { toca: 'Fechar' },
  { naoVe: 'Trocar recarrega os ativos' },

  // ── T04 · Módulo conectado e Ativo da sessão: o arraste em cima do Encerrar a sessão não encerra ──
  ...abre('?tela=T04&momento=10-momento-folha-modulo-conectado', 'Módulo conectado', 'TRAVADO NA SESSÃO'),
  { arrasta: 'Módulo conectado', de: 'Encerrar a sessão', dy: 40, anima: volta },
  { fica: 'T04', ms: 300 },
  { naoVe: 'Encerrar antes de terminar?' },
  { arrasta: 'Módulo conectado', de: 'Encerrar a sessão', dy: 120, anima: fecha },
  { fica: 'T04', ms: 300 },
  { naoVe: 'TRAVADO NA SESSÃO' },
  { naoVe: 'Encerrar antes de terminar?' },
  ...entendi,
  { toca: 'CONECTAR MÓDULO' },
  { ve: 'TRAVADO NA SESSÃO' },
  { tocaFora: 'Módulo conectado', anima: fecha },
  { naoVe: 'TRAVADO NA SESSÃO' },
  { toca: 'CONECTAR MÓDULO' },
  { ve: 'TRAVADO NA SESSÃO' },
  esc,
  { naoVe: 'TRAVADO NA SESSÃO' },
  { toca: 'CONECTAR MÓDULO' },
  { ve: 'TRAVADO NA SESSÃO' },
  { toca: 'Fechar' },
  { naoVe: 'TRAVADO NA SESSÃO' },
  ...abre('?tela=T04&momento=11-momento-folha-ativo-da-sessao', 'Ativo da sessão', 'TRAVADO NA SESSÃO'),
  { tocaFora: 'Ativo da sessão', anima: fecha },
  { naoVe: 'TRAVADO NA SESSÃO' },
  ...abre('?tela=T04&momento=11-momento-folha-ativo-da-sessao', 'Ativo da sessão', 'TRAVADO NA SESSÃO'),
  esc,
  { naoVe: 'TRAVADO NA SESSÃO' },
  ...abre('?tela=T04&momento=11-momento-folha-ativo-da-sessao', 'Ativo da sessão', 'TRAVADO NA SESSÃO'),
  { arrasta: 'Ativo da sessão', dy: 120, anima: fecha },
  { naoVe: 'TRAVADO NA SESSÃO' },
  ...abre('?tela=T04&momento=11-momento-folha-ativo-da-sessao', 'Ativo da sessão', 'TRAVADO NA SESSÃO'),
  { toca: 'Fechar' },
  { naoVe: 'TRAVADO NA SESSÃO' },

  // ── com reduzir movimento, o painel segue o dedo igual, e a volta e o fecho são diretos ──
  { reduzir: true },
  ...abre('?tela=T01&momento=04-momento-nao-recebi-o-codigo', 'Não recebi o código', 'Reenviar o código'),
  { arrasta: 'Não recebi o código', dy: 40 },
  { quieto: true },
  { ve: 'Usar outro dado' },
  { arrasta: 'Não recebi o código', dy: 120 },
  { naoVe: 'Usar outro dado' },
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { reduzir: false },

  // ── o diálogo não é folha: o toque no véu não fecha a confirmação (quem fecha é o Cancelar) ──
  { abre: '?tela=T04&momento=06-momento-folha-conta-sair-com-sessao-aberta' },
  { ve: 'Encerrar a sessão e sair' },
  { tocaFora: 'Sair da conta' },
  { fica: 'T04', ms: 300 },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  { ve: 'Encerrar a sessão e sair' },
  { toca: 'Cancelar' },
  { ve: 'Sair da conta' },
]
