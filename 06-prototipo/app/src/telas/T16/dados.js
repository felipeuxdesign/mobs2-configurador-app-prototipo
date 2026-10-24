// T16 · o que a sessão lê do mock: o passo 2 (o driver reinicia por comando ou
// pede o corte, T16·1), as 8 assertivas do encerramento com o valor lido
// (M.autotesteEncerramento, HU-T16-4), os blocos da cadeia, e os dois casos dos
// estados (autoteste-falhando, sessao-interrompida). Nada de número digitado: as
// contagens saem das listas do mock e da lista dos passos.
import { M } from '../../dados/mock.js'
import { ativosDaEmpresa } from '../../dados/empresas.js'
import { milhar } from '../../dados/formato.js'
import { ESTADOS } from '../../ds/index.js'
import { conteudoDo } from '../T09/cadeia.js'
import { PASSOS, T } from './textos.js'

export const REF = {
  // o reinício automático (01) e a conexão que cai nele (08); a
  // instalação homologada (02) e a homologação bloqueada (05)
  reiniciando: '01-momento-reiniciando-o-modulo',
  reconectando: '08-momento-reconectando-no-reinicio',
  encerrada: '02-momento-instalacao-homologada',
  semHomologar: '03-momento-encerrando-sem-homologar',
  encerradaSemHomologar: '04-momento-encerrada-sem-homologar',
  falhando: '05-estado-homologacao-bloqueada',
  interrompida: '06-estado-sessao-interrompida',
  autoteste: '07-momento-autoteste-correndo', // as assertivas acendendo, sem o veredito (lei 24)
  corte: '09-momento-o-corte-de-alimentacao',          // o passo 2 no módulo que não reinicia por comando (o VL08)
  naoVoltou: '10-estado-o-modulo-nao-voltou-do-reinicio', // o módulo que não voltou do reinício no tempo limite (decisão 64)
  descartar: '11-momento-descartar-a-instalacao',      // o Descartar da sessão interrompida pergunta antes (decisão 64)
}
export const CASO_FALHA = 'autoteste-falhando'
export const CASO_INTERROMPIDA = 'sessao-interrompida'
export const CASO_SEM_VOLTA = 'reinicio-sem-volta'   // o módulo do herói que não voltou do reinício (a 10)
export const CASO_CORTE = 'pronto-para-fechar'       // o caminhão, com o VL08, que não reinicia por comando (a 09)

// ── os passos ──
const indice = (id) => PASSOS.findIndex((p) => p.id === id)
export const REINICIO = indice('reinicio')     // o passo 2, o reinício automático
export const AUTOTESTE = indice('autoteste')   // o passo 8: ao fechar o 7, a tela passa pra Sessão encerrada (T16·4)
export const QUADRO_00 = indice('releitura')   // a 00: dois feitos, a releitura correndo
// os quatro que deixam o módulo seguro, e rodam sem homologar (os 4 passos da sessão abortada)
export const SEGUROS = PASSOS.filter((p) => p.seguro)
export const QUADRO_03 = SEGUROS.findIndex((p) => p.id === 'canal') // a 03: o Repouso restaurado, o Canal correndo

// ── o par da faixa ──
export const placaDe = (ativoId) => M.ativos.find((a) => a.id === ativoId)?.placa
export const moduloDoAtivo = (ativoId) => M.ativos.find((a) => a.id === ativoId)?.moduloSerial
const modeloDoModulo = (serial) => {
  const mod = M.modulos.find((m) => m.serial === serial)
  return mod ? M.modelos.find((m) => m.id === mod.modeloId) : null
}
// O 01 e o 08: a referência desenha o reinício no herói — o RKT-8H42 com o M2C-0417, um VL06,
// que reinicia por comando —, e o protótipo abre os dois nele, pelo endereço: na empresa do
// contexto, o primeiro ativo cujo módulo reinicia por comando. No fluxo, o reinício por comando é
// automático, e o passo corre dentro do encerramento, sem quadro próprio
export const reiniciaPorComando = (serial) => modeloDoModulo(serial)?.reinicioPorComando !== false
export function parDoReinicio(empresaId) {
  const a = ativosDaEmpresa(empresaId).find((x) => x.moduloSerial && reiniciaPorComando(x.moduloSerial))
  return a ? { ativoId: a.id, moduloSerial: a.moduloSerial } : null
}
// A 09: o módulo que não reinicia por comando pede o corte (HU-T16-3) — o caminhão do caso
// pronto-para-fechar, o KNB-5H39 com o M2C-0371, um VL08
export function parDoCorte() {
  const c = M.casos[CASO_CORTE]
  return { ativoId: c.ativoId, moduloSerial: c.moduloSerial }
}
// A 10: o módulo do herói que não voltou do reinício no tempo limite (o caso reinicio-sem-volta)
export function parSemVolta() {
  const c = M.casos[CASO_SEM_VOLTA]
  return { ativoId: c.ativoId, moduloSerial: c.moduloSerial }
}
// ── a cadeia do encerramento ──
// Com o checklist registrado: os passos 1 a 7 correm, um por vez (`k` é o que
// corre), cada um com a legenda dele embaixo do nome (o tela.md · a peça só mostra a
// legenda no passo que corre); o 8, o autoteste, é a tela seguinte (T16·4). O passo 2,
// o reinício: por comando, é automático, *reiniciando*; com a conexão caída (`reconectando`),
// ele diz *reconectando* e a legenda da queda (a 08) · no módulo que não reinicia por comando
// (`corte`, o VL08), o glifo da energia, *com você* e a legenda do corte (a 09) · o módulo que
// não voltou no tempo limite (`naoVoltou`), o xis, *não voltou* e o que conferir (a 10)
export function passosEncerrando(k, opcoes = {}) {
  const { reconectando = false, corte = false, naoVoltou = false } = typeof opcoes === 'boolean' ? { reconectando: opcoes } : opcoes
  return PASSOS.map((p, i) => {
    if (i < k) return { estado: 'ok', nome: p.nome, situacao: p.feito ?? '' }
    if (i === k) {
      if (i === REINICIO && naoVoltou) return { estado: 'xis', nome: p.nome, situacao: T.naoVoltou.corre, legenda: T.naoVoltou.legenda }
      if (i === REINICIO && corte) return { estado: 'energia', nome: p.nome, situacao: T.corte.corre, legenda: T.corte.legenda }
      if (reconectando && i === REINICIO) return { estado: 'agora', nome: p.nome, situacao: T.reconectando.corre, legenda: T.reconectando.legenda }
      return { estado: 'agora', nome: p.nome, situacao: p.corre ?? '', legenda: p.legenda }
    }
    return { estado: 'espera', nome: p.nome, situacao: T.aindaNao }
  })
}
// Sem homologar: só os quatro seguros correm (`feitos` é quantos já fecharam),
// cada um com a legenda dele enquanto corre; os outros ficam pulados, com o
// traço solto da folha 5 no poço e o texto 'pulado' (a 03).
// São três estados, e não um: o 'não se
// aplica' é só da assertiva do autoteste que não vale pro ativo (a 02 e a 05,
// o círculo com o traço, em assertivas()); o 'pulado' é o passo que o encerrar
// sem homologar pula (a 03, aqui); e o traço '—' é o passo que ainda não chegou
// (a 00 e a 01, o 'espera').
// `semModulo` (o Encerrar sem homologar da 10): sem o módulo, o repouso e o canal não fecham —
// pulados, como os que não rodam —, e o registro e a desconexão correm (HU-T16-8: o próximo que
// conectar acha o canal aberto e fecha antes de começar, T07/13 · sem referência)
export const SEM_MODULO = ['repouso', 'canal']
export const segurosDe = (semModulo) => (semModulo ? SEGUROS.filter((p) => !SEM_MODULO.includes(p.id)) : SEGUROS)
export function passosAbortando(feitos, semModulo = false) {
  const seguros = segurosDe(semModulo)
  return PASSOS.map((p) => {
    const j = seguros.indexOf(p)
    if (j < 0) return { estado: 'pulado', nome: p.nome, situacao: T.pulado }
    if (j < feitos) return { estado: 'ok', nome: p.nome, situacao: p.feito }
    if (j === feitos) return { estado: 'agora', nome: p.nome, situacao: p.corre ?? '', legenda: p.legenda }
    return { estado: 'espera', nome: p.nome, situacao: T.aindaNao }
  })
}

// ── o Descartar da sessão interrompida pergunta antes (a 11, HU-T09-10 e HU-T16-7) ──
// Antes da Conexão gravada, o módulo foi zerado e está sem ela: o diálogo diz que o app grava
// só a conexão antes de descartar, e o link é *Gravar a conexão e descartar*; depois dela, o
// módulo já fala com o servidor: o diálogo fica com a segunda frase, e o link é *Descartar* (sem
// referência). O descarte fica registrado: um *Registro da sessão* na fila do aparelho, o tipo
// que guarda o que foi feito, pra ir ao servidor (M.tiposFila)
export function descarteDe(c) {
  const conexaoGravada = c.confirmados >= ORDEM.length
  return {
    frases: conexaoGravada ? [T.descarteRegistrado] : [T.zeradoSemConexao(c.moduloSerial), T.descarteRegistrado],
    link: conexaoGravada ? T.descartar : T.gravarEDescartar,
    gravaConexao: !conexaoGravada,
  }
}
export const itemDoDescarte = (c) => ({
  id: `descarte-${c.ativoId}`, tipo: M.tiposFila.find((t) => t.rotuloCurto === 'Registro da sessão').tipo, ativoId: c.ativoId,
  diasAtras: 0, data: M.diasAntes(0), criadoAs: M.HORA_NOMINAL, estado: 'na-fila',
})

// ── os blocos da cadeia (decisão 49 · o módulo não guarda versão): a prova da
// sessão encerrada conta os blocos relidos, da ordem canônica — '6 blocos'
const { ordem: ORDEM, rotulos: ROTULOS } = M.cadeia
export const blocosRelidos = () => T.blocos(ORDEM.length)
// o espécime mov-check da vitrine ainda importa pelo nome de antes: ele passa a dizer os 6
// blocos, e o nome sai quando a vitrine importar o blocosRelidos
export const versaoCompleta = blocosRelidos

// ── as sete assertivas do encerramento (M.autotesteEncerramento),
// cada uma com o valor lido — nunca um OK agregado (HU-T16-4) ──
const ENC = M.autotesteEncerramento
// a 07: o autoteste parado no ID no cadastro — três prontas, a da vez conferindo
export const QUADRO_07 = ENC.findIndex((a) => a.id === 'id-cadastro')
export const TOTAL_ASSERTIVAS = ENC.length
const AINDA_NAO = ESTADOS.espera.nome

// o contador que voltou do reinício: o que está no painel do ônibus, que a
// calibração semeou (M.calibracao.painel), em cada grandeza que ele tem —
// no herói, 482.317 km · 9.640 h. Ônibus sem contador no mock: nada (null).
function contadores(ativoId) {
  const painel = M.calibracao.painel[ativoId]
  if (!painel) return null
  return M.calibracao.grandezas.filter((g) => painel[g.id] != null).map((g) => `${milhar(painel[g.id])} ${g.unidade}`).join(' · ')
}

// A falha do autoteste (HU-T16-5): no ativo do caso, a assertiva do
// noEncerramento volta com o valor lido do caso — no a-14, 'Contadores · 0 km'.
// No fluxo, ela vale pro par da faixa que é o do caso; no estado 05, pela receita.
function falhaDo(ativoId) {
  const c = M.casos[CASO_FALHA]
  return c && c.ativoId === ativoId ? c.noEncerramento : null
}

export function assertivas(ativoId) {
  const falha = falhaDo(ativoId)
  return ENC.map((a) => {
    const base = { id: a.id, titulo: a.rotulo }
    if (falha && falha.assertiva === a.id) return { ...base, estado: 'reprovada', valor: falha.lido }
    // o reset de leitura: só quando foi usado; senão, não se aplica, com o motivo — e
    // não conta como aprovada
    if (a.condicional) return { ...base, estado: 'nao-se-aplica', glifo: 'traco-circulo', valor: T.naoSeAplica, porque: a.motivo }
    // o evento do cartão não bloqueia: depende do servidor — pendente, confere em até 24 h
    if (a.bloqueia === false) return { ...base, estado: 'ainda-nao', glifo: 'relogio', nomeGlifo: AINDA_NAO, valor: a.valor, porque: a.nota }
    if (a.fonte === 'versao') return { ...base, estado: 'aprovada', valor: T.confere }
    if (a.fonte === 'contador') {
      // sem o contador lido, a assertiva não aprova — espera, com o
      // traço, como a 'ainda não' da folha 4. Nunca o check sem o valor lido
      // (HU-T16-4; mocks.js: 'nunca verde por omissão'), e nunca número inventado.
      const lido = contadores(ativoId)
      return lido ? { ...base, estado: 'aprovada', valor: lido } : { ...base, estado: 'ainda-nao', valor: T.aindaNao }
    }
    return { ...base, estado: 'aprovada', valor: a.valor } // o fato é o próprio estado do módulo: confere, fechado, restaurado
  })
}
// os três contadores separados: aprovadas, não se aplicam e pendentes — das que já
// acenderam; cada um só quando tem alguma · nunca *7 de 8*
export function contadoresDas(lista) {
  const n = (e) => lista.filter((a) => a.estado === e).length
  return [
    { n: n('aprovada'), texto: T.aprovadas(n('aprovada')) },
    { n: n('nao-se-aplica'), texto: T.naoSeAplicam(n('nao-se-aplica')) },
    { n: n('ainda-nao'), texto: T.pendentes(n('ainda-nao')) },
  ].filter((c) => c.n > 0)
}
// a causa de cada assertiva que pode reprovar: só a dos contadores tem texto aprovado
export const CAUSA = { contadores: T.causaContadores }

// ── a sessão interrompida (06): os seis blocos da T09 no desenho da cadeia do
// encerramento; os confirmados feitos, o seguinte parado e o resto esperando ──
// Os confirmados mostram o conteúdo do bloco no par do caso, o mesmo da T09
// (decisão 49 · o do caso, nunca o do herói: o QAH-1M67 tem as 4 regiões
// dele); a limpeza, 'feita'. A legenda do bloco que parou diz o
// que já foi gravado, montada dos confirmados do caso, sem a limpeza: 'o ativo e
// as cercas já estão gravados' (só o ativo e as cercas têm a forma com artigo no
// textos.md; outro bloco, sem texto, fica de fora)
const LIMPEZA = ORDEM[0]
export function interrompida() {
  const c = M.casos[CASO_INTERROMPIDA]
  const quando = c.diasAtras === 0 ? T.hoje : null // o caso é de hoje; outra idade não tem texto aprovado
  const conteudo = conteudoDo({ ativoId: c.ativoId, moduloSerial: c.moduloSerial })
  const gravados = ORDEM.slice(0, c.confirmados).filter((b) => b !== LIMPEZA && T.comArtigo[b]).map((b) => T.comArtigo[b])
  const blocos = ORDEM.map((b, i) => {
    if (i < c.confirmados) return { estado: 'ok', nome: ROTULOS[b], situacao: b === LIMPEZA ? T.confereBloco : conteudo[b] }
    if (i === c.confirmados) return { estado: 'pausa', nome: ROTULOS[b], situacao: T.parouAqui, legenda: gravados.length > 1 ? T.jaGravados(gravados) : undefined }
    return { estado: 'espera', nome: ROTULOS[b], situacao: T.aindaNao }
  })
  return {
    caso: c,
    confirmados: c.confirmados,
    total: ORDEM.length,
    subtitulo: quando ? T.iniciada(placaDe(c.ativoId), c.moduloSerial, quando, c.iniciadaAs) : `${placaDe(c.ativoId)} · ${c.moduloSerial}`,
    blocos,
  }
}
