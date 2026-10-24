// As sementes (logica.md): a fotografia e as consultas usam o
// estado mínimo que ela precisa. Só ids e valores lidos de M — nada digitado.
// Estas sementes preservam as referências; semeado({ fluxo: true }) monta a entrada normal do palco para T02, T10 e T11.
import { M } from '../dados/mock.js'

const HEROI = { moduloSerial: 'M2C-0417', ativoId: 'a-01' }
// as linhas do diagnóstico que contam (as mensagens no módulo só informam)
const CONTAM = M.diagnostico.modulo.filter((l) => !l.soInforma).length
const pacote = (id) => { const p = M.pacotes.find((x) => x.id === id); return { id: p.id, diasAtras: p.diasAtras, hora: p.hora } }
const sessao = (ativoId = HEROI.ativoId, moduloSerial = HEROI.moduloSerial) => ({ moduloSerial, ativoId, saude: 'ok', abertaAs: M.HORA_NOMINAL, meio: 'bluetooth' })
// o contexto é a empresa (decisão 56): a Viação Atlântico Sul, a do contexto do mock, com o pacote dela
const viacao = { empresaId: 'emp-01', pacote: pacote('pac-emp-01') }

export const SEMENTES = {
  T01: {},
  // a T02 pelo endereço, ou pelo pulo do palco, é a tela, a 00: as três empresas do herói,
  // nada escolhido (o contexto sem empresa)
  T02: {},
  T03: { contexto: { empresaId: 'emp-01', pacote: null } },
  T04: { contexto: viacao, sessao: sessao() },
  T05: { contexto: viacao },
  T06: { contexto: viacao, sessao: sessao(null) },
  // a T07: a sessão do herói, ainda sem ativo, e o diagnóstico do módulo dele feito — os
  // oito que contam certos (tela.md); pela URL, a tela abre no 00, parada
  T07: { contexto: viacao, sessao: sessao(null), etapas: { preChecagem: { checagens: CONTAM, passaram: CONTAM, aprovadas: CONTAM, moduloSerial: HEROI.moduloSerial } } },
  T09: { contexto: viacao, sessao: sessao() },
  // a T10 pelo endereço: o caminhão coletor, o exemplo que calibra — o
  // ônibus do herói não calibra nada, e no fluxo cai no *Nada a calibrar* (a 11)
  T10: { contexto: viacao, sessao: sessao('a-09', 'M2C-0371') },
  T11: { contexto: viacao, sessao: sessao('a-16', 'M2C-0438') },
  T12: { contexto: viacao, sessao: sessao() },
  T13: { contexto: viacao, sessao: sessao() },
  T14: { contexto: viacao, sessao: sessao() },
  T15: { contexto: viacao, sessao: sessao() },
  T16: { contexto: viacao, sessao: sessao(), etapas: { checklist: { homologada: true } } },
}
