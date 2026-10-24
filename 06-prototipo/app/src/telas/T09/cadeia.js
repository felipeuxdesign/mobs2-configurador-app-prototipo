// T09 · a cadeia lida do mock (M.cadeia): a ordem canônica dos seis passos, o
// rótulo de cada um, o conteúdo de cada bloco no par da faixa (o que vai ser
// gravado), o que cada etapa pronta diz, a unidade e a estimativa de cada etapa
// (decisão 57), o andamento da cadeia passo a passo, a conta do envio (as cinco
// dimensões da capacidade, decisões 47 e 59) e os casos da tela — os dois que param
// a cadeia (bloco-recusado, queda-na-cadeia), as duas travas do envio
// (conteudo-nao-cabe, pool-esgotado), o servidor que ainda não respondeu, as
// mensagens por enviar e a manutenção (modulo-ja-deste-ativo).
// Nada de número digitado: as contagens dos textos saem da ordem e do cadastro, e o
// tempo, de ritmos.js. Os únicos números escritos aqui são os dos quadros parados
// (QUADROS): o valor em que cada referência desenha a etapa da vez.
// A T13 (a Seção D), a T11 e a T16 leem o conteúdo de cada bloco daqui, pela mesma
// conta da T09: `conteudoDo` (o que vai ser gravado) e `prontoDo` (o que cada etapa gravou).
import { M } from '../../dados/mock.js'
import { regioesDoAtivo } from '../../dados/regioes.js'
import { faltaCerca } from '../../dados/formato.js'
import { ESTADOS } from '../../ds/index.js'
import { RITMOS } from '../../estado/ritmos.js'
import { T } from './textos.js'

export const REF = {
  recusado: '01-estado-bloco-recusado',
  queda: '02-estado-queda-na-cadeia',
  recuperacao: '03-estado-recuperacao-ate-a-conexao-gravar',
  concluida: '04-momento-cadeia-concluida',
  antes: '05-momento-o-que-vai-ser-gravado',
  naoCabe: '06-estado-a-configuracao-nao-cabe',
  cercasDemais: '07-estado-pontos-de-cerca-demais',
  escolher: '08-momento-manutencao-escolher-o-bloco',
  reenviando: '09-momento-manutencao-reenviando',
  reenviado: '10-momento-manutencao-concluida', // a cadeia curta fechada: o bloco relido
  // depois da Conexão, o módulo prova que falou com o servidor —
  // conferindo (11), sim (04) ou ainda não, com o que conferir (12)
  conferindoServidor: '11-momento-conferindo-o-servidor',
  semServidor: '12-estado-o-modulo-ainda-nao-falou-com-o-servidor',
  // a folha de confirmação (13 as cercas, 17 o ativo, 18 o leitor), a
  // pergunta pelos dependentes (10 as cercas, 14 o ativo, 15 o leitor) e o que ficou para depois (16)
  folhaCercas: '13-momento-manutencao-folha-de-confirmacao',
  ativoPergunta: '14-momento-manutencao-o-ativo-pergunta-pelos-eventos',
  leitorPergunta: '15-momento-manutencao-o-leitor-pergunta-pelos-eventos',
  faltaReenviar: '16-estado-manutencao-falta-reenviar',
  folhaAtivo: '17-momento-manutencao-folha-do-ativo',
  folhaLeitor: '18-momento-manutencao-folha-do-leitor',
  // o Deixar para depois acontecendo — o leitor fica para depois (19, estado) ou volta reenviado,
  // conferido (20, momento); nos dois, o Reenviar dos eventos acende
  leitorDepois: '19-estado-manutencao-leitor-fica-para-depois',
  leitorReenviado: '20-momento-manutencao-leitor-confere-eventos-liberados',
  // a cadeia gravando, etapa por etapa (decisão 57): a 00 é o meio dela, o Leitor gravando,
  // entre a 24 e a 25
  gravandoLimpeza: '21-momento-gravando-a-limpeza',
  gravandoAtivo: '22-momento-gravando-o-ativo',
  gravandoCercas: '23-momento-gravando-as-cercas',
  conferindoCercas: '24-momento-conferindo-as-cercas',
  gravandoEventos: '25-momento-gravando-os-eventos',
  gravandoConexao: '26-momento-gravando-a-conexao',
  // a folha das mensagens que o módulo ainda não enviou, por cima do que vai ser gravado (decisão 58)
  mensagens: '27-estado-mensagens-que-o-modulo-nao-enviou',
  // decisão 64: a manutenção aberta pelo menu, sem nada escolhido (28) · o envio das mensagens, contando
  // (29) · o reenvio de tudo, menos a conexão, pela T11 (30) · o recusado de novo (31), a folha que confirma
  // gravar só a conexão (32) e a Conexão gravando sozinha (33) · a Conexão da manutenção esperando o
  // servidor (34) · a queda que não voltou no tempo limite (35)
  nadaEscolhido: '28-momento-manutencao-pelo-menu-nada-escolhido',
  esperandoEnvio: '29-momento-esperando-o-envio',
  menosConexao: '30-momento-o-que-vai-ser-gravado-menos-a-conexao',
  recusadoDeNovo: '31-estado-bloco-recusado-de-novo',
  folhaSoConexao: '32-momento-folha-gravar-so-a-conexao',
  gravandoSoConexao: '33-momento-gravando-so-a-conexao',
  servidorNaManutencao: '34-momento-manutencao-conexao-conferindo-o-servidor',
  naoVoltou: '35-estado-o-modulo-nao-voltou',
}
// o quadro de cada momento da manutenção: a lista (com a folha aberta, 13, 17 e 18), a curta
// correndo (09) e a curta conferida, com a pergunta (10, 14 e 15)
export const QUADRO_DA_MANUTENCAO = {
  [REF.escolher]: { fase: 'escolher', bloco: 'cercas' },
  [REF.folhaCercas]: { fase: 'escolher', bloco: 'cercas', folha: 'cercas' },
  [REF.folhaAtivo]: { fase: 'escolher', bloco: 'ativo', folha: 'ativo' },
  [REF.folhaLeitor]: { fase: 'escolher', bloco: 'leitor', folha: 'leitor' },
  // a 09: a limpeza das cercas conferida, e as cercas gravando, paradas no quadro (72 de 120 pontos)
  [REF.reenviando]: { fase: 'curta', bloco: 'cercas', quadro: { feitos: 72 } },
  [REF.reenviado]: { fase: 'curtaFeita', bloco: 'cercas' },
  [REF.ativoPergunta]: { fase: 'curtaFeita', bloco: 'ativo' },
  [REF.leitorPergunta]: { fase: 'curtaFeita', bloco: 'leitor' },
  [REF.leitorDepois]: { fase: 'curtaFeita', bloco: 'cercas', decisoes: { leitor: 'depois' } },
  [REF.leitorReenviado]: { fase: 'curtaFeita', bloco: 'cercas', decisoes: { leitor: 'reenviado' } },
}
export const MOMENTO_DA_FOLHA = { cercas: REF.folhaCercas, ativo: REF.folhaAtivo, leitor: REF.folhaLeitor }
export const MOMENTO_DA_PERGUNTA = { cercas: REF.reenviado, ativo: REF.ativoPergunta, leitor: REF.leitorPergunta }
export const CASO_SERVIDOR = 'servidor-ainda-nao'
export const CASO_RECUSA = 'bloco-recusado'
export const CASO_QUEDA = 'queda-na-cadeia'
export const CASO_NAO_CABE = 'conteudo-nao-cabe'
export const CASO_POOL = 'pool-esgotado'
export const CASO_MENSAGENS = 'mensagens-pendentes'
// decisão 64: os dois casos que nascem dos da cadeia (o `base`): a recusa que se repete no Tentar de
// novo (a 31) e a queda que não volta no tempo limite (a 35)
export const CASO_RECUSA_DE_NOVO = 'bloco-recusado-de-novo'
export const CASO_NAO_VOLTOU = 'modulo-nao-voltou'
// o caso com o que o `base` dele traz (o par, o bloco, onde parou)
export const casoComBase = (k) => { const c = M.casos[k]; return c?.base ? { ...M.casos[c.base], ...c } : c }
// o envio das mensagens que o técnico espera (a 29): sem ritmo declarado (movimento.md), a contagem fica
// no quadro da referência, *5 de 12* — o único número daqui que não sai do mock: o da referência
export const ENVIADAS_DO_QUADRO = 5

const { ordem: ORDEM, rotulos, etapas: ETAPAS } = M.cadeia
export { ORDEM }
export const TOTAL = ORDEM.length
export const LIMPEZA = ORDEM[0]
// a Conexão é o bloco que segura a saída (HU-T09-10)
export const CONEXAO = 'conexao'
export const rotuloDe = (bloco) => rotulos[bloco]
const ativoDe = (id) => M.ativos.find((a) => a.id === id)
export const placaDe = (ativoId) => ativoDe(ativoId)?.placa

// o par módulo × ativo de um caso; o caso sem o módulo (pool-esgotado) usa o do
// cadastro do ativo (a-05 → M2C-0348)
export function parDoCaso(casoId) {
  const c = casoComBase(casoId)
  return { ativoId: c.ativoId, moduloSerial: c.moduloSerial ?? ativoDe(c.ativoId)?.moduloSerial }
}

// onde o caso para a cadeia, e como: o módulo recusa o bloco, ou o link cai nele
export function paradaDoCaso(casoId) {
  if (casoId === CASO_RECUSA) return { bloco: M.casos[CASO_RECUSA].bloco, parou: 'recusa' }
  // a recusa que se repete: o mesmo bloco, recusado no Tentar de novo (a 31)
  if (casoId === CASO_RECUSA_DE_NOVO) return { bloco: casoComBase(casoId).bloco, parou: 'recusa', deNovo: true }
  if (casoId === CASO_QUEDA) return { bloco: M.casos[CASO_QUEDA].noBloco, parou: 'queda', parouEm: M.casos[CASO_QUEDA].parouEm }
  return null
}

// o caso que vale pra cadeia deste par, se ainda não foi consumido nesta sessão:
// o do par módulo × ativo da faixa, como o pacote da T03 · a recusa, e depois dela, no Tentar de
// novo, a recusa que se repete (bloco-recusado-de-novo, decisão 64: a 01 e depois a 31)
export function casoDoPar(par, consumidos) {
  return [CASO_RECUSA, CASO_RECUSA_DE_NOVO, CASO_QUEDA].find((k) => {
    const c = casoComBase(k)
    return c && c.ativoId === par.ativoId && c.moduloSerial === par.moduloSerial && !consumidos.includes(k)
  }) ?? null
}

// ── o cadastro do par: o modelo do ativo, e a linha da matriz do módulo ──
const modeloDoAtivo = (ativoId) => M.modelosAtivo.find((m) => m.id === ativoDe(ativoId)?.modeloAtivoId)
function linhaDoModulo(serial) {
  const mod = M.modulos.find((m) => m.serial === serial)
  return mod ? M.matrizCapacidades.find((l) => l.modeloId === mod.modeloId && l.variante === mod.variante) : null
}
// o modelo do módulo e o que nenhum módulo dele guarda além (decisão 64): o maior de cada dimensão entre
// as variantes do modelo na matriz — no VL06, as quatro guardam o mesmo, e outro VL06 não resolve
function modeloDoModulo(serial) {
  const mod = M.modulos.find((m) => m.serial === serial)
  const nome = M.modelos.find((m) => m.id === mod?.modeloId)?.nome ?? null
  const linhas = mod ? M.matrizCapacidades.filter((l) => l.modeloId === mod.modeloId) : []
  const maximo = (campo) => (linhas.length ? Math.max(...linhas.map((l) => l[campo] ?? 0)) : null)
  return { nome, maximo }
}
// os sinais da biblioteca da CAN do modelo (decisão 59): a do diagnóstico, quando o modelo é o
// dela (os 6 do ma-01, os que contam); nos outros, os sinais do cadastro do modelo
function sinaisDaCan(modelo) {
  if (!modelo) return 0
  const lib = M.diagnostico.can
  return lib?.modeloAtivoId === modelo.id ? lib.sinais.filter((s) => !s.soInforma).length : (modelo.sinaisCan ?? []).length
}

// as regiões que vão pro módulo (decisão 50: o app conta regiões) e os pontos delas (decisão 57):
// as do ativo, pela regra de src/dados/regioes.js (as do ativoId mais as do tambemAtivos) —
// 4 regiões e 120 pontos no herói e no PCX-9A17 da queda, nenhuma nos outros
export function regioesDo(ativoId) {
  const rs = regioesDoAtivo(ativoId)
  return { total: rs.length, pontos: rs.reduce((s, r) => s + (r.pontos ?? 0), 0) }
}

// O conteúdo de cada bloco no par (decisão 49: o do caso, nunca o do herói) — o que vai ser
// gravado (05), com o mesmo vocabulário da conferência: o modelo do ativo, as regiões dele, os
// fios do leitor do cadastro do modelo, o intervalo do preset de eventos do modelo e a operadora
// com a APN do chip (decisão 59). No herói, é o CADEIA.conteudo do mock. A T11, a T13 e a T16 leem daqui.
export function conteudoDo(par) {
  const modelo = modeloDoAtivo(par.ativoId)
  const preset = M.presetsEvento.find((p) => p.id === modelo?.presetEventoId)
  const cx = M.conexoes[0]
  return {
    ativo: modelo?.modelo,
    cercas: T.regioes(regioesDo(par.ativoId).total),
    leitor: modelo?.leitor?.fios,
    eventos: preset ? T.intervalo(preset.intervaloRastreamentoSeg) : undefined,
    conexao: cx ? T.conexao(cx.operadora, cx.apn) : undefined,
  }
}

// A contagem de cada etapa (decisão 57), do mundo: os sinais da biblioteca da CAN, os pontos das
// regiões do ativo, os 4 ajustes do leitor, os eventos embarcados e os 3 ajustes da conexão · a
// Limpeza não tem (null): um comando só
export function unidadesDo(par) {
  const modelo = modeloDoAtivo(par.ativoId)
  const total = {
    ativo: sinaisDaCan(modelo),
    cercas: regioesDo(par.ativoId).pontos,
    leitor: ETAPAS.leitor.total,
    eventos: M.eventosEmbarcados.length,
    conexao: ETAPAS.conexao.ajustes.length,
  }
  return Object.fromEntries(ORDEM.map((b) => [b, b === LIMPEZA ? null : { total: total[b], unidade: T.unidade[ETAPAS[b].conta] }]))
}

// O que cada etapa pronta diz, no lugar da descrição (decisão 57): o que gravou — a placa do par e
// os sinais da CAN, as regiões e os pontos, os fios e os ajustes, os eventos e o intervalo, a
// operadora e a APN · a Limpeza completa (instalação nova) ou só a do bloco (manutenção)
export function prontoDo(par, blocoDaManutencao = null, { semConexao = false } = {}) {
  const c = conteudoDo(par)
  const u = unidadesDo(par)
  const preset = M.presetsEvento.find((p) => p.id === modeloDoAtivo(par.ativoId)?.presetEventoId)
  return {
    // a limpeza completa (instalação nova), a do bloco (manutenção) ou a de configuração (sem a Conexão, a 30)
    limpeza: blocoDaManutencao ? T.limpezaDoBloco[blocoDaManutencao] : semConexao ? T.limpezaConfiguracaoPronta : T.limpezaPronta,
    ativo: T.ativoPronto(placaDe(par.ativoId), u.ativo.total),
    cercas: T.cercasProntas(c.cercas, u.cercas.total),
    leitor: T.leitorPronto(c.leitor, u.leitor.total),
    eventos: preset ? T.eventosProntos(u.eventos.total, T.intervalo(preset.intervaloRastreamentoSeg)) : undefined,
    conexao: c.conexao,
  }
}

// ── o andamento (decisão 57, movimento.md · os processos) ──
// Cada etapa grava (RITMOS.cadeiaGravandoMs) e relê (cadeiaConferindoMs), em passos de
// RITMOS.cadeiaPassoMs; a Limpeza só grava; a Conexão gravada espera o servidor
// (cadeiaServidorMs), sem barra. Numa passada, `passos` conta os passos já feitos (0 a N) e
// `anda` diz se um passo está em curso: a barra vai de passos/N a (passos + 1)/N durante
// ele, e a contagem diz o que já foi, o total vezes passos/N, arredondado pra baixo (as
// cercas, de 10 em 10 gravando e de 15 em 15 conferindo).
export const passosDa = (passada) => Math.round((passada === 'conferindo' ? RITMOS.cadeiaConferindoMs : RITMOS.cadeiaGravandoMs) / RITMOS.cadeiaPassoMs)
export const PASSOS_SERVIDOR = Math.round(RITMOS.cadeiaServidorMs / RITMOS.cadeiaPassoMs)
// o tempo que o servidor leva, contando 10 vezes mais rápido: o segundo em curso do passo s (até 12 s)
export const segundosDoServidor = (s) => Math.round(((s + 1) * RITMOS.cadeiaPassoMs * RITMOS.cadeiaServidorFator) / 1000)

// O *faltam* é estimativa, não relógio: o que falta na passada vezes a estimativa por unidade
// do mock (na releitura, a dela, ou a da gravação); a Limpeza, o tempo total vezes o que falta.
// O arredondamento é o da T03, a mesma regra num lugar só (formato.js · faltaCerca): até 10 s, no
// segundo; até 59 s, na dezena; de 60 s pra cima, no minuto
export const estimativa = faltaCerca
export function faltamSeg(etapa, passada, feitos, total, fracao) {
  const e = ETAPAS[etapa]
  if (e.segTotal != null) return e.segTotal * (1 - fracao)
  return (total - feitos) * (passada === 'conferindo' ? e.segConferindo ?? e.seg : e.seg)
}

// Os quadros parados (as referências): o valor em que cada uma desenha a etapa da vez. Ao vivo, a
// contagem anda pelos passos e não passa exatamente por eles (72 de 120 fica entre 70 e 80): pelo
// endereço, pela coluna e no print, a etapa abre parada no valor da referência
// `confirmados`: as etapas que conferiram · `quadro`: os feitos na unidade da etapa (a Limpeza, a fração)
export const QUADROS = {
  [REF.gravandoLimpeza]: { confirmados: 0, passada: 'gravando', quadro: { fracao: 0.4 } },
  [REF.gravandoAtivo]: { confirmados: 1, passada: 'gravando', quadro: { feitos: 4 } },
  [REF.gravandoCercas]: { confirmados: 2, passada: 'gravando', quadro: { feitos: 72 } },
  [REF.conferindoCercas]: { confirmados: 2, passada: 'conferindo', quadro: { feitos: 80 } },
  // a 00, a tela: o meio da cadeia, o Leitor gravando
  '00-tela': { confirmados: 3, passada: 'gravando', quadro: { feitos: 2 } },
  [REF.gravandoEventos]: { confirmados: 4, passada: 'gravando', quadro: { feitos: 5 } },
  [REF.gravandoConexao]: { confirmados: 5, passada: 'gravando', quadro: { feitos: 2 } },
}
// o momento de cada etapa da cadeia correndo, pro endereço acompanhar: a 00 é o Leitor; as
// releituras sem quadro próprio ficam no da etapa
export function momentoDaEtapa(bloco, passada) {
  if (bloco === 'cercas') return passada === 'conferindo' ? REF.conferindoCercas : REF.gravandoCercas
  return { limpeza: REF.gravandoLimpeza, ativo: REF.gravandoAtivo, leitor: null, eventos: REF.gravandoEventos, conexao: REF.gravandoConexao }[bloco]
}

// a etapa da vez: a da cadeia inteira, ou a da curta (a limpeza do bloco, e o bloco)
// · gravando só a conexão (decisão 64, a 33): a Conexão, com as que conferiram antes da recusa
export const etapaDa = (f) => (f.so ? f.so : f.fase === 'curta' ? [LIMPEZA, f.bloco][f.confirmados] : ORDEM[f.confirmados])
const fracaoDoQuadro = (q, u) => q.fracao ?? q.feitos / u.total

// A barra e a contagem da etapa da vez (a peça cadeia gravando): `parada`, a cadeia que
// parou (a barra onde parou, *parou em* e *retoma daqui*)
export function barraDa(bloco, f, par, { parada = false } = {}) {
  const u = unidadesDo(par)[bloco]
  const N = passosDa(f.passada)
  const fracao = f.quadro ? fracaoDoQuadro(f.quadro, u) : f.passos / N
  const feitos = u ? (f.quadro ? f.quadro.feitos : Math.floor((u.total * f.passos) / N)) : null
  const anda = !parada && !f.quadro && f.anda
  const curta = f.fase === 'curta'
  // a limpeza só do bloco (a curta) e a de configuração (o reenvio sem a Conexão, a 30) não têm
  // estimativa no mock: a contagem fica sem o que falta
  const semEstimativa = !u && (curta || f.semConexao)
  let conta = u ? T.conta(feitos, u.total, u.unidade) : curta ? T.apagandoBloco(f.bloco) : f.semConexao ? T.apagandoConfiguracao : T.apagandoTudo
  if (parada && u) conta = T.parouEm(conta)
  const falta = parada ? T.retomaDaqui : semEstimativa ? null : T.faltam(estimativa(faltamSeg(bloco, f.passada, feitos, u?.total, fracao)))
  return {
    chave: `${bloco}·${f.passada}`,
    valor: anda ? (f.passos + 1) / N : fracao,
    desde: anda && f.passos === 0 ? 0 : undefined,
    passoMs: parada || f.quadro ? null : RITMOS.cadeiaPassoMs,
    conta, falta,
  }
}

// O passo seguinte da cadeia correndo — a inteira (gravando, servidor) e a curta. Devolve o fluxo
// novo e, quando o caso do par para a cadeia, o caso consumido. A cadeia para uma vez, quando o par
// da faixa é o do caso: a queda no meio da gravação do Leitor (a contagem do caso, *parou em 2 de
// 4 ajustes*), a recusa quando as Cercas relidas não conferem.
export function avanca(f, par, caso) {
  if (f.fase === 'servidor' || f.fase === 'curtaServidor') {
    const s = f.servidor + 1
    if (s < PASSOS_SERVIDOR) return { fluxo: { ...f, servidor: s } }
    // o módulo falou com o servidor: a cadeia inteira fecha (04); a só conexão vai pros 4 passos (33);
    // a Conexão reenviada na manutenção confere (34 → a curta feita)
    if (f.so) return { fluxo: { ...f, fase: 'soFeita', servidor: null } }
    if (f.fase === 'curtaServidor') return { fluxo: { ...f, fase: 'curtaFeita', confirmados: CURTA, servidor: null } }
    return { fluxo: { ...f, fase: 'concluida', confirmados: TOTAL, servidor: null } }
  }
  const etapa = etapaDa(f)
  const u = unidadesDo(par)[etapa]
  const N = passosDa(f.passada)
  // o passo que começa: do quadro parado, o primeiro depois do valor dele; da pausa, o mesmo; e o seguinte
  const P = f.quadro ? Math.ceil(fracaoDoQuadro(f.quadro, u) * N - 1e-9) : f.anda ? f.passos + 1 : f.passos
  const parada = caso && f.fase === 'gravando' ? paradaDoCaso(caso) : null
  if (parada?.parou === 'queda' && parada.bloco === etapa && f.passada === 'gravando') {
    const Pq = Math.ceil((parada.parouEm / u.total) * N - 1e-9)
    if (P >= Pq) return { fluxo: { ...f, fase: 'pausado', parou: 'queda', passos: Pq, anda: false, quadro: null }, consumir: caso }
  }
  if (P < N) return { fluxo: { ...f, passos: P, anda: true, quadro: null } }
  // a passada acabou: a releitura, o servidor, ou a etapa confere · a Conexão, gravada, espera o
  // servidor — na cadeia inteira, na só conexão e na manutenção (decisão 64, a 34)
  const curta = f.fase === 'curta'
  if (f.passada === 'gravando' && etapa !== LIMPEZA && etapa !== CONEXAO) {
    return { fluxo: { ...f, passada: 'conferindo', passos: 0, anda: true, quadro: null } }
  }
  if (etapa === CONEXAO) return { fluxo: { ...f, fase: curta ? 'curtaServidor' : 'servidor', servidor: 0, passada: null, passos: 0, anda: false, quadro: null } }
  if (parada?.parou === 'recusa' && parada.bloco === etapa) return { fluxo: { ...f, fase: 'recusado', parou: 'recusa', deNovo: !!parada.deNovo, quadro: null }, consumir: caso }
  const confirmados = f.confirmados + 1
  const fim = curta && confirmados >= CURTA
  // sem a Conexão (a 30), a cadeia fecha nos Eventos: a Conexão fica como está, e a prova do servidor não roda
  if (f.semConexao && confirmados >= TOTAL - 1) return { fluxo: { ...f, confirmados, fase: 'concluida', passada: 'gravando', passos: 0, anda: false, quadro: null } }
  return { fluxo: { ...f, confirmados, fase: fim ? 'curtaFeita' : f.fase, passada: 'gravando', passos: 0, anda: !fim, quadro: null } }
}

// O envio (decisões 47 e 59, HU-T09-2 e 4): o que vai ser gravado contra o que o módulo guarda,
// nas cinco dimensões da capacidade da variante — os contadores que o modelo do ativo pede
// (`conteudoRegistros`), os eventos embarcados, os filtros da CAN (um por sinal da biblioteca), as
// regiões do ativo, e a memória que os pontos de cerca e os cartões dividem. É a regra; os casos
// só nomeiam onde ela aparece: o ma-01 pede 131 contadores num FULL que guarda 127
// (conteudo-nao-cabe, T09/06); o a-05 tem 5.980 pontos de cerca e 240 cartões contra os 6.143 da
// memória (pool-esgotado, T09/07). A trava é a primeira dimensão que não cabe, nessa ordem; o elo
// do bloco dela falha (*não cabe*: as cercas, nas regiões e na memória; os eventos; o ativo, nos
// filtros), e os contadores não têm elo. Sem linha na matriz (o módulo que trava no diagnóstico,
// e nunca chega aqui), nada trava.
export function envioDo(par) {
  const modelo = modeloDoAtivo(par.ativoId)
  const linha = linhaDoModulo(par.moduloSerial)
  const doPar = (k) => (M.casos[k]?.ativoId === par.ativoId ? M.casos[k] : null)
  const naoCabe = doPar(CASO_NAO_CABE); const pool = doPar(CASO_POOL)
  const regioes = regioesDo(par.ativoId)
  const pontos = pool?.pontosCerca ?? regioes.pontos
  const cartoes = pool?.cartoes ?? M.identificadores.cartoes.length
  const dims = [
    { id: 'contadores', bloco: null, pede: naoCabe?.conteudoRegistros ?? modelo?.conteudoRegistros, guarda: naoCabe?.capacidadeRegistros ?? linha?.capacidadeRegistros },
    { id: 'eventos', bloco: 'eventos', pede: M.eventosEmbarcados.length, guarda: linha?.eventosMax },
    { id: 'filtros', bloco: 'ativo', pede: sinaisDaCan(modelo), guarda: linha?.filtrosCanMax },
    { id: 'regioes', bloco: 'cercas', pede: regioes.total, guarda: linha?.regioesMax },
    { id: 'memoria', bloco: 'cercas', pede: pontos + cartoes, pontos, cartoes, guarda: linha?.pontosCercaMax },
  ]
  const estoura = dims.find((d) => d.pede != null && d.guarda != null && d.pede > d.guarda) ?? null
  // o aviso diz o que nenhum módulo do modelo guarda (*Nenhum VL06 guarda mais que 127.*): o limite é o do
  // modelo, igual nas variantes, e a frase diz isso pra o técnico não procurar outro igual (T09/06 e 07)
  const doModulo = modeloDoModulo(par.moduloSerial)
  const CAMPO = { contadores: 'capacidadeRegistros', eventos: 'eventosMax', filtros: 'filtrosCanMax', regioes: 'regioesMax', memoria: 'pontosCercaMax' }
  if (estoura) Object.assign(estoura, { modelo: doModulo.nome, maximo: Math.max(estoura.guarda, doModulo.maximo(CAMPO[estoura.id]) ?? 0) })
  return { contadores: dims[0], dims, estoura }
}
// a trava do envio: a dimensão que estourou (06: os contadores; 07: a memória), ou nenhuma
export const travaDo = (envio) => envio.estoura

// as mensagens que o módulo ainda não enviou (decisão 58): o número que o diagnóstico leu do
// módulo da sessão (etapas.preChecagem.mensagens, a T07) · pela coluna, o do caso mensagens-pendentes
export function mensagensDo(par, etapas, est) {
  if (est === REF.mensagens) return M.casos[CASO_MENSAGENS]?.mensagens ?? 0
  const pc = etapas.preChecagem
  return pc?.moduloSerial === par.moduloSerial ? pc.mensagens ?? 0 : 0
}

// as causas do servidor que ainda não respondeu (a 12), pelos ids do caso, numeradas
export function causasDoServidor() {
  const operadora = M.conexoes[0]?.operadora
  return M.casos[CASO_SERVIDOR].causas.map((id, i) => T.causaDoServidor[id](i + 1, operadora))
}

// A manutenção (HU-T09-5, decisão 46): o modo vem do vínculo (etapas.ativo.modo,
// que a T06 grava), e o caso modulo-ja-deste-ativo o abre pela coluna da T06.
// Os blocos que se escolhem: os cinco depois da limpeza, na ordem do script. Todos
// se reenviam, um por vez (as referências desenham as cercas, o ativo e o
// leitor; o dos eventos e o da conexão seguem a gramática deles), e o 08 abre com as cercas escolhidas
export const emManutencao = (unico) => unico.etapas.ativo?.modo === 'manutencao'
export const BLOCOS_DA_MANUTENCAO = ORDEM.filter((b) => b !== LIMPEZA)
export const REENVIAVEIS = BLOCOS_DA_MANUTENCAO.filter((b) => T.reenviar[b])
// o escolhido de saída: as cercas, como a 08 desenha
export const BLOCO_DA_MANUTENCAO = 'cercas'
// embaixo da curta (09): com dependente, quem precisa ser reenviado depois (nunca
// *ficam como estão* com dependente pendente); sem, os outros blocos ficam como estão — menos os
// que ainda faltam reenviar
export function depoisDaCurta(bloco, dependentes, falta) {
  if (dependentes.length) return T.dependemDepois(dependentes.map((b) => rotulos[b]))
  return T.ficamComoEstao(BLOCOS_DA_MANUTENCAO.filter((b) => b !== bloco && !falta.includes(b)).map((b) => rotulos[b]))
}

// o nome pro leitor de tela segue o estado do dado: o traço e o relógio dos
// que ainda vão gravar dizem "ainda não", não "não se aplica"; e o bloco em que a
// cadeia pausou diz "parou", seja o sem-sinal da queda (02, 03), seja a pausa de
// quem tentou sair (o valor é "pausado" nos dois), como o passo parado da T03
const AINDA_NAO = ESTADOS.espera.nome
const PAROU = ESTADOS.pausa.nome

// os seis elos do quadro, na ordem canônica. `f`: o fluxo — { confirmados, fase, parou, passada,
// passos, anda, quadro, servidor }
//   antes       · o que vai ser gravado: o relógio em cada elo, a limpeza em primeiro e o
//                 conteúdo nos outros (05, 27); na trava, o elo do bloco que não cabe falha (07)
//   gravando    · os conferidos com o que gravaram, a etapa da vez com a barra e a contagem, e os
//                 que esperam (00, 21 a 26)
//   servidor    · a Conexão gravada, conferindo se o módulo falou com o servidor (11)
//   recusado    · os conferidos, o recusado com a causa e os não alcançados (01)
//   pausado     · os conferidos, a etapa que parou com a barra parada, e os pendentes em traço (02)
//   recuperacao · o mesmo quadro parado, com a saída presa até a Conexão (03)
//   concluida   · os seis conferidos, cada um com o que gravou (04) · semServidor, a 12
// Decisão 64: `f.semConexao` (a 30, o reenvio de tudo, menos a conexão, da T11) — a Limpeza é a de
// configuração, e a Conexão fica como está, apagada, com o traço no poço, em toda fase · `f.so` (a 33, o
// gravar só a conexão do recusado de novo) — a Conexão grava, e os que ficam por gravar dizem *pulado* ·
// `opcoes.aoConferirDeNovo` (a 12): o *Conferir de novo* ao lado do *O QUE CONFERIR*
export function elosDo(f, par, envio, { aoConferirDeNovo } = {}) {
  const { confirmados: k, fase, parou } = f
  const conteudo = conteudoDo(par)
  const pronto = prontoDo(par, null, { semConexao: f.semConexao })
  const servidor = fase === 'servidor' || fase === 'semServidor' || fase === 'concluida' || fase === 'soFeita'
  return ORDEM.map((b, i) => {
    const base = { nome: rotulos[b], descricao: b === LIMPEZA && f.semConexao ? T.limpezaConfiguracao : T.descricao[b] }
    // sem a Conexão (a 30): ela fica como está, do que vai ser gravado à concluída
    if (f.semConexao && b === CONEXAO) return { ...base, estado: 'traco', valor: T.ficaComoEsta, descricao: T.naoReenviada(conteudo.conexao) }
    if (fase === 'antes') {
      if (envio?.estoura?.bloco === b) return { ...base, estado: 'xis', valor: T.naoCabeValor, descricaoNeutra: true }
      return { ...base, estado: 'relogio', valor: b === LIMPEZA ? T.primeiro : conteudo[b], nomeGlifo: AINDA_NAO }
    }
    const feito = { ...base, estado: 'ok', valor: T.confere, descricao: pronto[b] }
    // gravando só a conexão (a 33): o bloco recusado continua recusado, e os que ficam por gravar, pulados
    if (f.so && b !== CONEXAO && i >= k) {
      if (i === k) return { ...base, estado: 'xis', valor: T.naoConfere, descricao: T.causa[b] ?? null }
      return { ...base, estado: 'traco', valor: T.pulado, nomeGlifo: AINDA_NAO }
    }
    // a Conexão, depois de gravada: o módulo falou com o servidor? (11, 04, 12)
    if (servidor && b === CONEXAO) {
      const falha = fase === 'semServidor'
      const conferir = falha ? { rotulo: T.oQueConferir, causas: causasDoServidor(), acao: { texto: T.conferirDeNovo, aoTocar: aoConferirDeNovo } } : null
      const extra = {
        nome: T.falouComServidor,
        valor: fase === 'servidor' ? T.conferindoServidor(segundosDoServidor(f.servidor)) : falha ? T.aindaNao : T.sim,
        tipo: fase === 'servidor' ? 'conferindo' : falha ? 'ainda-nao' : 'sim',
        tom: falha ? 'falha' : null,
        conferir,
      }
      return fase === 'servidor' ? { ...feito, estado: 'agora', valor: T.conferindo, extra } : { ...feito, extra }
    }
    if (i < k) return feito
    if (fase === 'gravando') {
      if (i === k || (f.so && b === CONEXAO)) return { ...base, estado: 'agora', valor: f.passada === 'conferindo' ? T.conferindo : T.gravando, descricao: null, barra: barraDa(b, f, par) }
      return { ...base, estado: 'espera', valor: T.aguardando }
    }
    if (i === k) {
      if (parou === 'recusa') return { ...base, estado: 'xis', valor: T.naoConfere, descricao: T.causa[b] ?? null }
      return { ...base, estado: parou === 'queda' ? 'sem-sinal-neutro' : 'pausa', valor: T.pausado, nomeGlifo: PAROU, descricao: null, barra: barraDa(b, f, par, { parada: true }) }
    }
    // com a cadeia parada, recusada (01, 31), pausada (02, 35) ou na recuperação (03), os que ainda vão
    // gravar levam o traço: não estão na fila de ninguém · o círculo vazio é só da que corre
    return { ...base, estado: 'traco', valor: T.aguardando, nomeGlifo: AINDA_NAO }
  })
}

// A cadeia curta da manutenção (09): a limpeza só do bloco escolhido, e o bloco, cada um com a
// barra e a contagem como na cadeia inteira (as cercas contam os pontos, a 09). `confirmados` de
// 0 a 2: a 09 é o quadro de 1 — a limpeza conferida, as cercas gravando
export const CURTA = 2
export function elosDaCurta(f, par) {
  const k = f.confirmados
  const conteudo = conteudoDo(par)
  const pronto = prontoDo(par, f.bloco)
  return [LIMPEZA, f.bloco].map((b, i) => {
    const base = { nome: rotulos[b], descricao: T.descricao[b] }
    // a Conexão reenviada espera o servidor, como na instalação nova (decisão 64, a 34), e só fecha com a prova
    if (b === CONEXAO && (f.fase === 'curtaServidor' || f.fase === 'curtaFeita')) {
      const espera = f.fase === 'curtaServidor'
      const extra = { nome: T.falouComServidor, valor: espera ? T.conferindoServidor(segundosDoServidor(f.servidor)) : T.sim, tipo: espera ? 'conferindo' : 'sim' }
      return { ...base, estado: espera ? 'agora' : 'ok', valor: espera ? T.conferindo : T.confere, descricao: pronto[b], extra }
    }
    if (i < k) return { ...base, estado: 'ok', valor: T.confere, descricao: pronto[b] }
    if (i === k) return { ...base, estado: 'agora', valor: f.passada === 'conferindo' ? T.conferindo : T.gravando, descricao: null, barra: barraDa(b, f, par) }
    return { ...base, estado: 'espera', valor: conteudo[b] }
  })
}
