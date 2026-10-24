// T06 · o que a tela lê do mock, na hora de montar. Nada aqui é digitado: os
// ônibus, os modelos, a empresa, o pacote dela e os casos vêm de M, e as frases
// com dado se montam com o texto do textos.md em volta do valor.
import { M } from '../../dados/mock.js'
import { chaveDeBusca } from '../../dados/formato.js'
import { ativosDaEmpresa, empresaDe, pacoteDaEmpresa, pacotePorId } from '../../dados/empresas.js'

// os quadros da T06, pelo nome dos arquivos das referências. O nome do 01 fica
// 'confirmar-o-veiculo': o título é *Confirmar o vínculo* (decisão 46), e
// o endereço ?momento= é o do arquivo e do indice.json
export const REF = {
  confirmar: '01-momento-confirmar-o-veiculo',
  fora: '04-estado-fora-do-pacote',
  semSaida: '06-estado-conflito-de-pinos-sem-saida',
  semResultado: '08-momento-busca-sem-resultado', // a busca que não acha nenhum ônibus do pacote
  esconde: '09-momento-busca-esconde-a-escolha',  // a busca que acha outros ônibus e esconde o marcado
  outroAtivo: '10-estado-modulo-em-outro-ativo',  // o módulo já está vinculado a outro ativo
  jaDeste: '11-estado-modulo-ja-deste-ativo',     // o módulo já é deste ativo: é manutenção
}

// o ônibus de outra empresa (o caso ativo-fora-pacote, a 04): está no cadastro do M2,
// mas não veio no pacote — ele mora só no caso, e os 24 do mock são todos da Viação
const CASO_FORA = 'ativo-fora-pacote'
const foraDoPacote = () => M.casos[CASO_FORA]?.ativo ?? null
export const ativoDe = (id) => M.ativos.find((a) => a.id === id) ?? (foraDoPacote()?.id === id ? foraDoPacote() : undefined)
export const modeloDe = (ativo) => M.modelosAtivo.find((m) => m.id === ativo.modeloAtivoId)
const moduloDe = (serial) => M.modulos.find((m) => m.serial === serial)

// a lista: os ônibus do pacote da empresa do contexto, na ordem do mock — na Viação, os 24
// (as duas empresas espelho andam com os mesmos 24: src/dados/empresas.js)
export const doPacote = (empresaId) => ativosDaEmpresa(empresaId)

// o contador 'no pacote': o que o pacote da empresa diz que trouxe — 24 na Viação; nas
// empresas espelho, o do pacote delas (34, 18), com a lista dos 24 da Viação (diferença conhecida)
export function contagemDoPacote(contexto, empresaId) {
  const p = (contexto.pacote && pacotePorId(contexto.pacote.id)) ?? pacoteDaEmpresa(empresaId)
  return p?.contem.ativos
}

// o ônibus que o momento 01 mostra quando se abre pela URL: o do módulo da
// sessão, se ele está no pacote (o herói: M2C-0417 → RKT-8H42 — o módulo
// PREVISTO no cadastro, decisão 46); senão, o primeiro
export function ativoDoModulo(empresaId, sessao) {
  const lista = doPacote(empresaId)
  return (lista.find((a) => a.moduloSerial === sessao.moduloSerial) ?? lista[0])?.id ?? null
}

// ── a busca (T06·5 a): placa, frota, módulo esperado e chassi, sem caixa, sem
// acento e sem o hífen da placa. A placa de um ônibus de outra empresa abre o fora do pacote.
// A busca não se refaz: o chassi segue no cadastro e acha, e
// nenhuma tela o mostra (decisão 46 · a nota no protótipo da tela.md)
const limpa = (s) => chaveDeBusca(s ?? '').replace(/[^a-z0-9]/g, '')
export function filtrar(lista, texto) {
  const q = limpa(texto)
  if (!q) return lista
  return lista.filter((a) => [a.placa, a.frota, a.moduloSerial, a.chassi].some((v) => v && limpa(v).includes(q)))
}
// o ônibus de outra empresa que a placa digitada acha: o do caso, quando a empresa dele
// não é a do contexto (os 24 do mock são do pacote)
export function placaDeOutroPacote(texto, empresaId) {
  const q = limpa(texto); const fora = foraDoPacote()
  return q && fora && fora.empresaId !== empresaId && limpa(fora.placa) === q ? fora : null
}

// ── os dados do modelo (o bloco de baixo do vínculo, decisão 46): o fabricante e
// o modelo, do cadastro do modelo do ativo. O MODELO das referências é o código
// e o tipo — *OF-1621 · ônibus urbano* —, e o mock não tem um campo do tipo: ele
// sai do nome do modelo sem o código, com a primeira letra minúscula, como as
// três referências escrevem (Ônibus urbano OF-1621 → ônibus urbano; Caminhão
// coletor 17.230 → caminhão coletor; Retroescavadeira 580N → retroescavadeira).
// Nenhuma palavra se inventa: a diferença conhecida da referência fica na tela.md
export function dadosDoModelo(ativo) {
  const m = modeloDe(ativo)
  const nome = m.nome.endsWith(m.modelo) ? m.nome.slice(0, -m.modelo.length).trim() : m.nome
  const tipo = nome.charAt(0).toLowerCase() + nome.slice(1)
  return { fabricante: m.fabricante, modelo: `${m.modelo} · ${tipo}` }
}

// ── as checagens, na ordem: pacote → pinos → vínculo (T06·3, com o vínculo no
// lugar do chassi, decisão 46) ──

// o caso de pinos do mock. O conflito vale quando o par da faixa é o do caso (quem decide é o
// par módulo × ativo) · a configuração é só sem fio, e o conflito é
// sempre erro de projeto de instalação — trocar o meio nunca resolve, e não há o com saída (05)
const CASO_PINOS = 'conflito-pinos-sem-saida'
function conflitoDe(ativoId, sessao) {
  const c = M.casos[CASO_PINOS]
  return c && c.ativoId === ativoId && c.moduloSerial === sessao.moduloSerial ? c : null
}

const PASSOS = ['pacote', 'pinos', 'vinculo']

// O que a confirmação mostra pro ônibus. `desde`: num estado da coluna, o caso
// diz qual checagem falha, e as de antes passam no mundo dele. `vinculo`: o caso
// do vínculo do mundo do estado (10, 11). No fluxo, o vínculo é sempre novo — a
// instalação nova, o padrão: os dois casos do vínculo caem no par do herói,
// e só abrem pela coluna, nunca pelo serial (logica.md · As portas naturais)
//   · 'novo'        — o módulo fica neste ativo (01)
//   · 'outro-ativo' — o módulo está em outro ativo: a tela avisa (10)
//   · 'ja-deste'    — o módulo já é deste ativo: é manutenção (11)
//   · 'fora'        — o ônibus é de outra empresa: a trava, com a empresa dele (04)
export function avaliar(ativo, { empresaId, sessao }, desde = 'pacote', vinculo = null) {
  const i = PASSOS.indexOf(desde)
  if (i <= 0 && ativo.empresaId && ativo.empresaId !== empresaId) return { passo: 'fora', empresa: empresaDe(ativo.empresaId).nome, empresaId: ativo.empresaId }
  if (i <= 1) {
    const caso = conflitoDe(ativo.id, sessao)
    if (caso) return { passo: 'sem-saida', caso }
  }
  if (vinculo?.vinculadoAoAtivoId) return { passo: 'outro-ativo', caso: vinculo, onde: ativoDe(vinculo.vinculadoAoAtivoId) }
  if (vinculo?.modo === 'manutencao') return { passo: 'ja-deste', caso: vinculo }
  return { passo: 'novo' }
}

// ── o mundo de cada estado da coluna (receitas.js): o ônibus, a checagem que
// falha e a sessão do caso. Quando o caso traz o módulo, a faixa é a dele;
// quando não traz, fica a da semente.
export function mundoDoEstado(est, base) {
  const pinos = (k) => {
    const c = M.casos[k]
    return { ativoId: c.ativoId, desde: 'pinos', empresaId: base.empresaId, sessao: { ...base.sessao, moduloSerial: c.moduloSerial } }
  }
  // os dois do vínculo: o módulo é o do caso, o M2C-0417 da faixa, e o ônibus é o
  // dele — no 11, o ativo do caso; no 10, que não traz ativo (o caso só diz onde o
  // módulo está, o a-18), o ônibus do módulo no pacote, o RKT-8H42, como as duas
  // referências desenham (o mesmo do 01 aberto pela URL)
  const vinculo = (k) => {
    const c = M.casos[k]
    const sessao = { ...base.sessao, moduloSerial: c.moduloSerial }
    return { ativoId: c.ativoId ?? ativoDoModulo(base.empresaId, sessao), desde: 'vinculo', vinculo: c, empresaId: base.empresaId, sessao }
  }
  switch (est) {
    case REF.fora: {
      // o ônibus do caso, contra o pacote do caso (o da Viação)
      const c = M.casos[CASO_FORA]
      return { ativoId: c.ativo.id, desde: 'pacote', empresaId: pacotePorId(c.pacoteId).empresaId, sessao: base.sessao }
    }
    case REF.semSaida: return pinos('conflito-pinos-sem-saida')
    case REF.outroAtivo: return vinculo('modulo-em-outro-ativo')
    case REF.jaDeste: return vinculo('modulo-ja-deste-ativo')
    default: return null
  }
}
