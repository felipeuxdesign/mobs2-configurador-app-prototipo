// As 15 telas e o índice das 204 referências (02-telas/indice.json, lido de
// onde está). O painel em duas partes (decisão 25, quadro 04).
import indice from '../../../../02-telas/indice.json'

// os nomes como o painel do quadro 04 escreve · a T07 é o Diagnóstico do módulo, e não há T08
export const NOMES = {
  T01: 'Login', T02: 'Selecionar contexto', T03: 'Sincronizar', T04: 'Menu', T05: 'Conectar módulo',
  T06: 'Selecionar ativo', T07: 'Diagnóstico do módulo', T09: 'Configurar módulo',
  T10: 'Calibração', T11: 'Conferir configuração', T12: 'Últimas instalações', T13: 'Checklist',
  T14: 'Ciclo de testes', T15: 'Fila de saída', T16: 'Sessão',
}
// o diagnóstico vem antes do vínculo, como a cena 04 desenha; a T07 só no caminho
export const CAMINHO = ['T01', 'T02', 'T03', 'T04', 'T05', 'T07', 'T06', 'T09', 'T10', 'T14', 'T13', 'T16']
export const CONSULTAS = ['T15', 'T11', 'T12']
export const REFERENCIAS = indice.itens
// a coluna: quem entra é o campo `coluna` do indice.json — falso pros estados que abrem
// por um toque (as duas de trocar de empresa da T04: a 08 e a 09), e, sem o campo, o estado entra. Fora
// da coluna, o estado continua abrindo pelo endereço
// os estados da coluna, e o que nasce de dentro de um estado, logo depois dele (`depoisDe`, no
// indice.json): o momento (com `coluna` verdadeiro) e
// o estado também — a T13/09, o detalhe, depois da T13/16, a lista · abre parado, como os estados ·
// a família em cadeia (o detalhe, o não resolvido, o relido), cada um depois do anterior,
// e a coluna os recua um nível (Coluna.jsx)
export const estadosDa = (tela) => {
  const naColuna = REFERENCIAS.filter((r) => r.tela === tela && (r.tipo === 'estado' ? r.coluna !== false : r.coluna === true))
  const filhosDe = (id) => naColuna.filter((r) => r.depoisDe === id)
  const comFilhos = (r) => [r, ...filhosDe(r.id).flatMap(comFilhos)]
  const raizes = naColuna.filter((r) => !r.depoisDe)
  return [...raizes.filter((r) => !r.colunaNoFim), ...raizes.filter((r) => r.colunaNoFim)].flatMap(comFilhos)
}
// Consultas de cenários especiais, sempre paradas; os tipos normativos continuam no índice.
export const consultaDa = (tela, nome) => REFERENCIAS.some((r) => r.tela === tela && r.nome === nome && r.consulta === true)
export const momentosDa = (tela) => REFERENCIAS.filter((r) => r.tela === tela && r.tipo === 'momento')
// a regra dos seis (palco.md): com mais de seis estados na coluna, eles se agrupam — só a T07, pelo `grupo` do indice.json
export const GRUPOS = { T07: [['modulo', 'O módulo'], ['can', 'A CAN']] }
