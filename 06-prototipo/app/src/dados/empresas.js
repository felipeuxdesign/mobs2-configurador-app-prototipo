// As empresas do técnico e o pacote de cada uma, num lugar só, lidos do mock na
// hora de montar, nada copiado. O contexto é a empresa (decisão 56): o pacote é
// o da empresa inteira, e o app não tem unidade nem garagem.
// São dois mundos:
//  · o do herói: as três empresas de M.empresas, cada uma com o pacote dela
//    (M.pacotes, pelo pacoteId). É o do Entrar da T01, e o único que o palco abre;
//  · o de uma empresa só (o caso `uma-empresa`): o app pula a T02 — o Entrar vai
//    direto à T03, com o pacote dela — e, no menu, o nome dela fica sem a seta e
//    não é botão. Nenhuma referência desenha: ele se prova no node
//    (scripts/testar-empresa.mjs e testar-trocar-empresa.mjs), nas funções que as
//    telas usam.
// O mundo vai no estado único (contexto.mundo); sem ele, o do herói.
// A Viação Atlântico Sul (M.empresa) tem o mundo inteiro do protótipo: os 24
// ativos, as 13 instalações, os casos. As outras duas andam como espelho dela
// depois da T03: o pacote é o delas — a idade, a hora, os ativos que ele diz
// trazer (34 e 18), a versão —, e o resto, a lista da T06 e as instalações da
// T12, é o da Viação (diferença conhecida: o mock não tem a frota delas).
// A T02 lê daqui a linha de cada empresa, a T03 baixa daqui o pacote, a T04 lê o
// nome da empresa do contexto e a folha de trocar, a T06 a lista e o contador
// 'no pacote', a T12 as instalações, e a T13 e a T16, o pacote e os ativos da empresa.
import { M } from './mock.js'

export const HEROI = 'heroi'
export const UMA_EMPRESA = 'uma-empresa'

/** o mundo que o estado único guarda (contexto.mundo); sem ele, o do herói */
export const mundoDo = (contexto) => contexto?.mundo ?? HEROI
/** as empresas do técnico, no mundo: as três do herói, ou a do caso uma-empresa */
export const empresasDo = (mundo) => (mundo === UMA_EMPRESA ? M.casos[UMA_EMPRESA].empresas : M.empresas)
/** com mais de uma empresa, a troca existe: a T02 e o nome no topo do menu, que abre a folha */
export const variasEmpresas = (mundo) => empresasDo(mundo).length > 1

export const empresaDe = (id) => M.empresas.find((e) => e.id === id) ?? null
/** a empresa do contexto; sem ela, a do contexto do mock (a Viação) */
export const empresaDoContexto = (contexto) => empresaDe(contexto?.empresaId ?? M.contextoAtivo.empresaId)

export const pacotePorId = (id) => M.pacotes.find((p) => p.id === id) ?? null
/** o pacote da empresa: o que ela aponta (pacoteId) */
export const pacoteDaEmpresa = (empresaId) => pacotePorId(empresaDe(empresaId)?.pacoteId)

/** os ativos do pacote da empresa: os 24 do mock, todos da Viação. As duas empresas
 *  espelho andam com os mesmos 24 (o mock não tem a frota delas · diferença conhecida) */
export const ativosDaEmpresa = () => M.ativos

/** o contexto que a empresa escolhida monta: ela, sem pacote ainda (a T03 baixa) */
export const contextoDaEmpresa = (contexto, empresaId) => ({ ...contexto, empresaId, pacote: null })
