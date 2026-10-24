// A URL: todo lugar do protótipo tem endereço (logica.md).
// ?tela=T07 · ?tela=T07&estado=01-estado-fora-da-faixa · ?tela=T05&momento=02-momento-um-encontrado · &painel=1 (o painel aberto)
// A troca usa replaceState: o voltar do navegador sai do protótipo.
import { NOMES, REFERENCIAS, consultaDa } from './telas.js'

// recarregar a página recomeça do login, no computador também: o endereço continua
// acompanhando a navegação — é ele que se copia pra mandar uma tela —, mas a página recarregada abre o
// login, como o Recomeçar do login. Um link aberto de novo ainda abre a tela dele; o print, a vitrine e
// as réguas abrem cada endereço de novo, e nunca recarregam.
export function recarregou() {
  try { return performance.getEntriesByType('navigation')[0]?.type === 'reload' } catch { return false }
}

export function lerUrl() {
  const q = new URLSearchParams(window.location.search)
  const tela = NOMES[q.get('tela')] ? q.get('tela') : 'T01'
  const valido = (tipo, nome) => nome && REFERENCIAS.some((r) => r.tela === tela && r.tipo === tipo && r.nome === nome)
  // o momento da família, na coluna (`coluna` e `depoisDe`), abre como estado: a coluna
  // o escreve no `estado`, e o link copiado dele reabre o mesmo quadro, parado
  const daColuna = (nome) => nome && REFERENCIAS.some((r) => r.tela === tela && r.coluna === true && r.nome === nome)
  const print = q.get('print') === '1'
  const consulta = !print && consultaDa(tela, q.get('momento')) ? q.get('momento') : null
  return {
    tela,
    estado: valido('estado', q.get('estado')) || daColuna(q.get('estado')) ? q.get('estado') : consulta,
    momento: !consulta && valido('momento', q.get('momento')) ? q.get('momento') : null,
    print,
    textos: q.get('textos') === '1',
  }
}

// o painel também vai no endereço (a URL leva o painel): aberto, &painel=1; fechado, sai —
// assim o link copiado com o painel fechado não abre o painel em quem recebe
export function escreverUrl({ tela, estado, momento, painel }) {
  const q = new URLSearchParams(window.location.search)
  q.set('tela', tela)
  estado ? q.set('estado', estado) : q.delete('estado')
  momento ? q.set('momento', momento) : q.delete('momento')
  painel ? q.set('painel', '1') : q.delete('painel')
  window.history.replaceState(null, '', '?' + q.toString())
}
