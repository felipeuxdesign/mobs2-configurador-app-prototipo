// T10 · o que a calibração lê do mock (04-dados/mocks.js · calibracao), na hora
// de montar. Funções puras; nenhum número inventado — o do painel é o que o
// técnico digita (decisão 33), e nos quadros abertos pela URL, o do mock.
//
// · As grandezas do par (T10·1, HU-T10-8): as calibráveis são o cadastro do
//   modelo do ativo (porModelo), na ordem dele; o módulo sem leitura de pulsos
//   (matrizCapacidades.pulsos false) derruba as de ajuste — rotação e
//   velocidade, que o módulo calcula dos pulsos (o comentário do mock) — com o
//   motivo `motivoSemPulsos`.
// · O que não se aplica (T10·5): os indisponíveis do cadastro e os derrubados
//   pelo módulo, na ordem das grandezas do mock. O rótulo perde o 'NESTE
//   MODELO' quando algum motivo vem do módulo (a regra está no estados.md).
// · Os números: o módulo conta bruto ÷ fatorEnvio; o painel é o digitado; a
//   diferença, a distância entre os dois; o 'semeado há N dias' só com 1 dia
//   ou mais (o 0 do herói é desta sessão).
// · A releitura (HU-T10-5): o módulo devolve o semeado + `desvio`, na unidade
//   do reporte; confere quando o desvio cabe em granularidade + decorrido. O
//   número relido, de volta na unidade da tela, é o que o poço mostra. No
//   estado da coluna 10, o módulo devolve o `relidoBruto` do caso
//   releitura-nao-confere (na unidade de envio, como o bruto).
// · Os opcionais (decisão 52): o cadastro do modelo diz quais grandezas se
//   podem pular (porModelo.opcionais) — no herói, o horímetro.
// · O mundo de cada estado da coluna (receitas.js): o par ativo × módulo que o
//   dado da receita aponta, com a sessão dele na faixa.
// · O quadro da URL: cada passo do fluxo que tem referência diz o momento dela.
import { M } from '../../dados/mock.js'
import { ativosDaEmpresa } from '../../dados/empresas.js'
import { RECEITAS } from '../../estado/receitas.js'

export const REF = {
  tela: '00-tela',
  semeado: '01-momento-hodometro-semeado',
  coletor: '02-estado-rotacao-caminhao-coletor',
  jaSemeado: '03-estado-ja-semeado',
  semPulsos: '04-estado-modulo-sem-pulsos',
  digitado: '05-momento-hodometro-digitado',
  gravando: '06-momento-gravando-no-modulo', // o semear do hodômetro: o primário desligado, um texto e depois o outro
  relendo: '07-momento-relendo',
  horimetro: '08-momento-horimetro',
  completa: '09-momento-calibracao-completa',
  corrigindo: '12-momento-corrigindo-o-semeado', // o painel semeado tocado: aberto de novo, e o Semear de novo
  naoConfere: '10-estado-releitura-nao-confere',
  nadaACalibrar: '11-estado-nada-a-calibrar',
}
// o ativo cujo modelo não calibra nada (o ônibus lê rotação e hodômetro da
// CAN): a frase do cadastro, ou null
export function nadaACalibrar(ativoId) {
  const a = ativoDe(ativoId)
  return (a && C.porModelo[a.modeloAtivoId]?.nadaACalibrar) ?? null
}

const C = M.calibracao
export const grandezaDe = (id) => C.grandezas.find((g) => g.id === id)
export const ativoDe = (id) => M.ativos.find((a) => a.id === id)
const moduloDe = (serial) => M.modulos.find((m) => m.serial === serial)
function lePulsos(serial) {
  const m = moduloDe(serial)
  const linha = m && M.matrizCapacidades.find((r) => r.modeloId === m.modeloId && r.variante === m.variante)
  return linha ? linha.pulsos : true
}

// as grandezas do par ativo × módulo: as que se calibram e as que não se aplicam
export function grandezasDoPar(ativoId, moduloSerial) {
  const a = ativoDe(ativoId)
  const pm = a && C.porModelo[a.modeloAtivoId]
  if (!pm) return { calibraveis: [], opcionais: [], naoSeAplicam: [], doModulo: false }
  const derrubadas = lePulsos(moduloSerial) ? [] : pm.calibraveis.filter((g) => grandezaDe(g).natureza === 'ajuste')
  const motivo = {}
  for (const i of pm.indisponiveis ?? []) motivo[i.grandeza] = { motivo: i.motivo, doModulo: false }
  for (const g of derrubadas) motivo[g] = { motivo: C.motivoSemPulsos, doModulo: true }
  const naoSeAplicam = C.grandezas.filter((g) => motivo[g.id]).map((g) => ({ id: g.id, nome: g.rotulo, ...motivo[g.id] }))
  const calibraveis = pm.calibraveis.filter((g) => !derrubadas.includes(g))
  return {
    calibraveis,
    opcionais: (pm.opcionais ?? []).filter((g) => calibraveis.includes(g)),
    naoSeAplicam,
    doModulo: naoSeAplicam.some((l) => l.doModulo),
  }
}

// o que o módulo conta, na unidade da tela (bruto ÷ fatorEnvio) · null sem dado
export function moduloConta(ativoId, g) {
  const b = C.bruto[ativoId]?.[g]; const f = grandezaDe(g).fatorEnvio
  return b == null || !f ? null : Math.floor(b / f)
}
// o que o painel mostra, no mock · null sem dado. No fluxo, é o que o técnico
// digita; o do mock é o dos quadros abertos pela URL (e o que o roteiro digita)
export const painelMostra = (ativoId, g) => C.painel[ativoId]?.[g] ?? null
// há quantos dias foi semeado · null quando nunca, ou quando foi nesta sessão
export function semeadoHa(ativoId, g) {
  const d = C.ultimas[ativoId]?.[g]
  return d != null && d >= 1 ? d : null
}

// a releitura depois de semear `painel` (o digitado, na unidade da tela): o
// número que o módulo devolve, se confere, e o desvio na unidade do reporte.
// `relidoBruto` (o caso releitura-nao-confere): o que o módulo devolve, na
// unidade de envio; sem ele, o semeado + o desvio da tolerância.
export function releitura(g, painel, relidoBruto) {
  const t = C.tolerancia[g]; const gr = grandezaDe(g)
  if (painel == null || !t) return null
  const desvio = relidoBruto != null ? (relidoBruto / gr.fatorEnvio - painel) * t.porUnidade : t.desvio
  const devolvido = painel * t.porUnidade + desvio
  return { valor: Math.floor(devolvido / t.porUnidade), desvio, confere: Math.abs(desvio) <= t.granularidade + t.decorrido }
}

// o número digitado: só os dígitos, sem zero à esquerda
export const digitos = (s) => String(s ?? '').replace(/\D/g, '').replace(/^0+(?=\d)/, '')

// ── o mundo de cada estado (receitas.js): o ativo que o dado da receita aponta ──
export function mundoDoEstado(est, empresaId) {
  const receita = RECEITAS[`T10/${est}`]
  if (!receita) return null
  // os ativos do pacote da empresa (decisão 56: o contexto é a empresa), os que têm módulo
  const daEmpresa = ativosDaEmpresa(empresaId).filter((a) => a.moduloSerial)
  let ativo = null
  let caso = null
  if (est === REF.coletor) {
    // calibracao.porModelo · o modelo calibra a rotação: o primeiro ativo dele na empresa, com o módulo que
    // lê pulsos (o caminhão coletor, depois do hodômetro)
    ativo = daEmpresa.find((a) => grandezasDoPar(a.id, a.moduloSerial).calibraveis.some((g) => grandezaDe(g).natureza === 'ajuste'))
  } else if (est === REF.jaSemeado) {
    // calibracao.ultimas · o hodômetro já foi semeado antes: o primeiro ônibus da empresa semeado há 1 dia ou mais
    ativo = daEmpresa.find((a) => semeadoHa(a.id, 'hodometro') != null)
  } else if (est === REF.semPulsos) {
    // o caso do modelo sem a grandeza (grandeza-indisponivel) + calibracao.bruto: o ativo desse modelo cujo módulo não lê pulsos
    const c = M.casos[receita.casos[0]]
    ativo = Object.keys(C.bruto).map(ativoDe).find((a) => a.modeloAtivoId === c.modeloAtivoId && !lePulsos(a.moduloSerial))
  } else if (est === REF.nadaACalibrar) {
    // a 11: calibracao.porModelo · o primeiro ônibus da empresa cujo modelo não calibra nada (o do herói)
    ativo = daEmpresa.find((a) => nadaACalibrar(a.id) != null)
  } else if (est === REF.naoConfere) {
    // o caso releitura-nao-confere: o ativo e a grandeza dele, e o que o módulo releu
    caso = M.casos[receita.casos[0]]
    ativo = ativoDe(caso.ativoId)
  }
  if (!ativo) return null
  const { calibraveis } = grandezasDoPar(ativo.id, ativo.moduloSerial)
  // T10·1 (a): a 03 abre com o passo atual no hodômetro, fiel à referência; as outras, na ordem do cadastro
  const ordem = est === REF.jaSemeado ? ['hodometro', ...calibraveis.filter((g) => g !== 'hodometro')] : calibraveis
  return { ativoId: ativo.id, moduloSerial: ativo.moduloSerial, ordem, caso }
}

// ── o quadro da URL: o momento que o passo do fluxo desenha, ou nenhum ──
// Hodômetro: digitado (05, e enquanto grava e relê), semeado (01). Horímetro,
// o passo seguinte: a entrada (08) e a calibração completa (09). O digitado do
// horímetro é o do hodômetro com outro número, e não tem referência: a URL sai
// do momento, como a entrada do hodômetro, que é a própria tela (00).
export function quadroDe({ ordem, atual, passos }) {
  const g = ordem[atual]; const p = passos[g]
  if (!p) return null
  const todas = ordem.every((x) => passos[x]?.fase === 'semeada')
  if (g === 'hodometro') {
    if (p.fase === 'semeada') return REF.semeado
    if (p.fase === 'corrigindo') return REF.corrigindo
    if (p.fase === 'nao-confere') return null
    if (p.fase === 'gravando') return REF.gravando
    if (p.fase === 'relendo') return REF.relendo
    if (p.digitado) return REF.digitado
    return null
  }
  if (g === 'horimetro' && atual > 0) {
    if (p.fase === 'semeada' && todas) return REF.completa
    if (p.fase === 'pronta' && !p.digitado) return REF.horimetro
  }
  return null
}
