// A conta do pacote da T03, lida do mock na hora de montar. Nenhum
// número mora aqui: a ordem da baixa, o ritmo, a estimativa, a versão e a
// idade saem de M.pacotes, M.empresas, M.casos e de ritmos.js. O pacote é o da
// empresa inteira (decisão 56, src/dados/empresas.js): na Viação, 49 itens.
import { M } from '../../dados/mock.js'
import { RITMOS } from '../../estado/ritmos.js'
import { faltaCerca } from '../../dados/formato.js'
import { empresaDe, pacoteDaEmpresa, pacotePorId } from '../../dados/empresas.js'

export { empresaDe, pacoteDaEmpresa, pacotePorId }

// O caso da falha de rede: a primeira sincronização deste pacote cai
// no item `falhaNoTick` — os de antes ficam baixados, ele não. É a da Expresso
// Caruaruense, com o pacote do aparelho vencido (a 05): no fluxo, a primeira baixa
// dela cai. A da Viação, com o pacote de ontem valendo (a 01), só pela coluna: no
// fluxo, a primeira baixa do herói não cai (decisão 64)
export const CASO_FALHA = 'sync-falha-rede'
export const CASO_FALHA_VALIDO = 'sync-falha-rede-pacote-valido'
export const casoFalha = (k = CASO_FALHA) => M.casos[k]

// o pacote do aparelho pela idade, no link da falha com ele valendo (T03/01): *o pacote de
// ontem* · o de hoje e o de n dias, sem referência, no mesmo jeito da linha da T02
export const oPacoteDe = (p) => (p.diasAtras === 0 ? 'o pacote de hoje' : p.diasAtras === 1 ? 'o pacote de ontem' : `o pacote de ${p.diasAtras} dias`)

// As receitas dos estados da idade (receitas.js: `pacotes`): o pacote que
// avisa (entre avisoDias e bloqueioDias, T03·3 → pac-emp-02, a Transportes
// Capibaribe) e o que bloqueia (passou de bloqueioDias → pac-emp-03, a Expresso Caruaruense).
export const avisa = (p) => p.diasAtras >= p.limiares.avisoDias && p.diasAtras <= p.limiares.bloqueioDias
export const bloqueia = (p) => p.diasAtras > p.limiares.bloqueioDias
export const pacoteQueAvisa = () => M.pacotes.find(avisa)
export const pacoteQueBloqueia = () => M.pacotes.find(bloqueia)

// Os cinco grupos do pacote (decisão 45), contados do `contem` dele: Ativos,
// Conexões, Modelos de ativo, Eventos e Cercas — a lista, nessa ordem, como a
// referência. A ordem da baixa (T03·1) é a da lista: os ativos baixam primeiro,
// como a 00 e a 01 desenham (6 de 24, e o resto em —); a dos outros quatro
// nenhuma referência desenha, e segue a da lista.
export const ORDEM_LISTA = ['ativos', 'conexoes', 'modelosAtivo', 'eventos', 'cercas']
const ORDEM_BAIXA = ORDEM_LISTA

export const totalDe = (p) => ORDEM_BAIXA.reduce((s, k) => s + p.contem[k], 0)

// um tick é um item: o ritmo de 4 s dividido pelo total do pacote (4000 ÷ 49 ≈ 82 ms na Viação)
export const tickMs = (p) => RITMOS.sincronizacaoTotalMs / totalDe(p)

// quanto de cada conteúdo já baixou com `baixados` itens, e em que pé está:
// 'ok' baixou tudo · 'agora' é o que baixa · 'espera' ainda não começou.
// O pé de cada grupo é o lugar dele na ordem: os de antes do que baixa já
// baixaram, os de depois esperam — também um grupo que o pacote trouxesse vazio,
// que só fica pronto quando a baixa passa por ele
export function conteudos(p, baixados) {
  let resto = baixados
  const feito = {}
  for (const k of ORDEM_BAIXA) { feito[k] = Math.min(resto, p.contem[k]); resto -= feito[k] }
  const agora = ORDEM_BAIXA.findIndex((k) => feito[k] < p.contem[k])
  const ate = agora < 0 ? ORDEM_BAIXA.length : agora
  return Object.fromEntries(ORDEM_BAIXA.map((k, i) => [k, {
    feito: feito[k], de: p.contem[k],
    estado: i < ate ? 'ok' : i === ate ? 'agora' : 'espera',
  }]))
}

// "faltam ~1 min": o que falta × a estimativa do servidor por item (na 00, 43 × 1,6 =
// 68,8 s), arredondado pela regra do *faltam* (formato.js · faltaCerca, a mesma da T09)
export const faltam = (p, baixados) => faltaCerca((totalDe(p) - baixados) * p.segPorItem)

// A versão do pacote (T03·2 b): 'pct-' + a empresa sem hífen + '-' + a data do pacote
export const versao = (empresaId, data) => 'pct-' + empresaId.replace('-', '') + '-' + data

// 2026-03-11 → 11/03
export const diaMes = (data) => { const [, m, d] = data.split('-'); return d + '/' + m }

// O pacote novo, baixado agora (T03·7): de hoje, na hora nominal
export const HOJE = M.diasAntes(0)
export const pacoteNovo = (p) => ({ id: p.id, diasAtras: 0, hora: M.HORA_NOMINAL, versao: versao(p.empresaId, HOJE) })

// A régua da idade (T03·4): de 0 a bloqueioDias + 1, o limite em bloqueioDias
export const fimDaIdade = (p) => p.limiares.bloqueioDias + 1
