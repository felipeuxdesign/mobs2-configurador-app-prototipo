// O reenvio de um bloco na manutenção: o script tem uma ordem
// só — Limpeza, Ativo, Cercas, Leitor, Eventos, Conexão (M.cadeia.ordem) — e o arrastado
// nunca é reenviado sozinho. Quem depende de quem é do mock (M.dependentes); o app pergunta
// por cada dependente, um por vez, na ordem do script, e o que o técnico deixa para depois
// vira pendência: `etapas.manutencao.faltaReenviar`, uma lista de { bloco, por } na ordem
// do script — `por` é o bloco reenviado que o arrastou (o motivo: M.motivosDependente).
// As três telas leem a mesma lista: a T09 (o *falta reenviar* da 16), a T11 (o *revisar em
// seguida* da 05) e a T13 (a Seção D da 43, e o Finalizar desligado enquanto houver).
import { M } from '../dados/mock.js'

const { ordem: ORDEM } = M.cadeia
// os blocos do script, sem a limpeza: a ordem de toda lista de blocos
export const BLOCOS_DO_SCRIPT = ORDEM.filter((b) => b !== 'limpeza')
export const naOrdem = (blocos) => BLOCOS_DO_SCRIPT.filter((b) => blocos.includes(b))
// os que dependem de um bloco, na ordem do script
export const dependentesDe = (bloco) => naOrdem(M.dependentes[bloco] ?? [])
export const temDependente = (bloco) => dependentesDe(bloco).length > 0
// o porquê de um dependente, pelo bloco que o arrastou (*usa os cartões que as cercas apagaram*)
export const motivoDe = (bloco, por) => M.motivosDependente[`${por}>${bloco}`] ?? null

export const faltaReenviarDe = (etapas) => etapas?.manutencao?.faltaReenviar ?? []

// a lista nova, na ordem do script: o que entra fica com o `por` que já tinha, se já estava
function ordenada(lista) {
  return BLOCOS_DO_SCRIPT.map((b) => lista.find((x) => x.bloco === b)).filter(Boolean)
}
export function comFalta(etapas, itens) {
  const antes = faltaReenviarDe(etapas)
  const novos = itens.filter((x) => !antes.some((a) => a.bloco === x.bloco))
  return { ...etapas, manutencao: { ...(etapas.manutencao ?? {}), faltaReenviar: ordenada([...antes, ...novos]) } }
}
// o bloco reenviado sai da pendência, e entra na lista do que já foi reenviado nesta sessão
export function reenviado(etapas, bloco) {
  const m = etapas.manutencao ?? {}
  const reenviados = (m.reenviados ?? []).includes(bloco) ? m.reenviados : [...(m.reenviados ?? []), bloco]
  return { ...etapas, manutencao: { ...m, reenviados, faltaReenviar: faltaReenviarDe(etapas).filter((x) => x.bloco !== bloco) } }
}

// O mundo de um caso que declara a pendência (o falta-reenviar: as cercas reenviadas, o leitor
// e os eventos deixados para depois · o cercas-reenviadas: os dois ainda por decidir)
export function manutencaoDoCaso(casoId) {
  const c = M.casos[casoId]
  if (!c?.reenviado) return null
  const falta = c.faltaReenviar ?? c.pendentes ?? []
  return { reenviados: [c.reenviado], faltaReenviar: naOrdem(falta).map((bloco) => ({ bloco, por: c.reenviado })) }
}

// Pedir o reenvio de um bloco (o Corrigir e o Reenviar da T11, o Reenviar da Seção D da T13):
// a T09 abre na manutenção com ele escolhido — o modo e o bloco vão no registro do vínculo
// (etapas.ativo), e o modo que o vínculo tinha fica guardado pra cadeia inteira · `agora`: o
// técnico já confirmou (o Corrigir este bloco da T11, depois da folha quando o bloco tem
// dependente), e a T09 abre já reenviando, sem a lista
export function pedirReenvio(etapas, bloco, { agora = false } = {}) {
  const anotada = etapas.conferencia ?? {}
  const modoDoVinculo = 'modoDoVinculo' in anotada ? anotada.modoDoVinculo : etapas.ativo?.modo ?? null
  return {
    ...etapas,
    ativo: { ...(etapas.ativo ?? {}), modo: 'manutencao', bloco, agora },
    cadeia: { ...(etapas.cadeia ?? {}), reenviado: null },
    conferencia: { ...anotada, modoDoVinculo },
  }
}
