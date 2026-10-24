// T12 · o que a tela lê do mock — funções puras, mesma entrada, mesma saída.
// · a lista: as instalações da empresa do contexto (pelo ativo), agrupadas por
//   idade pelo corte (T12·1 a, criteriosRegra.gruposIdade)
// · o veredito, o glifo e o tom de cada estado (T12·3 a)
// · o detalhe: o que o servidor recebeu (decisão 41) e as etapas da instalação —
//   as seis da i-01, ou só as linhas que o resumo sustenta (T12·2 a)
// · o mundo de cada estado da coluna, pela receita (receitas.js)
import { M } from '../../dados/mock.js'
import { ativosDaEmpresa, empresaDoContexto } from '../../dados/empresas.js'
import { TX } from './textos.js'

export const REF = {
  detalhe: '01-momento-detalhe-da-instalacao',
  vazia: '02-estado-nenhuma-instalacao',
  semRede: '03-estado-sem-rede',
  indisponivel: '04-estado-criterio-indisponivel',
  pendente: '05-estado-criterio-pendente',
}
const CASO_VAZIA = 'instalacoes-vazia'      // a consulta da empresa que volta vazia
const CASO_SEM_REDE = 'instalacoes-sem-rede' // a consulta anterior, declarada

export const ativoDe = (id) => M.ativos.find((a) => a.id === id)
export const instalacaoDe = (id) => M.instalacoes.find((i) => i.id === id)

// mais nova primeiro: pelos dias e, no mesmo dia, pela hora (texto HH:MM compara em ordem)
const maisNova = (a, b) => a.diasAtras - b.diasAtras || (a.hora < b.hora ? 1 : a.hora > b.hora ? -1 : 0)

// as instalações da empresa: as dos ativos do pacote dela (a Viação tem as 13 do mock;
// as duas empresas espelho andam com as da Viação · src/dados/empresas.js)
export function daEmpresa(empresaId) {
  const ids = new Set(ativosDaEmpresa(empresaId).map((a) => a.id))
  return M.instalacoes.filter((i) => ids.has(i.ativoId)).slice().sort(maisNova)
}

// os grupos por idade (T12·1 a): até `hoje` é HOJE, até `ontem` é ONTEM, até
// `esteMesAte` é ESTE MÊS, e acima é MAIS DE UM MÊS.
const GRUPOS = ['hoje', 'ontem', 'esteMes', 'maisDeUmMes']
function grupoDe(dias) {
  const g = M.criteriosRegra.gruposIdade
  if (dias <= g.hoje) return 'hoje'
  if (dias <= g.ontem) return 'ontem'
  if (dias <= g.esteMesAte) return 'esteMes'
  return 'maisDeUmMes'
}
export function agrupar(lista) {
  return GRUPOS.map((id) => ({ id, itens: lista.filter((i) => grupoDe(i.diasAtras) === id) })).filter((g) => g.itens.length > 0)
}

// o veredito pela natureza do estado (T12·3 a, folha 3): o glifo, o tom na linha
// da lista e o tom no cabeçalho do detalhe (o 'aprovada' em lima, T12/01; o
// 'aguardando validação' em --tinta-secundaria, T12/04 e 05)
const NATUREZA = {
  aprovada: { glifo: 'ok', tom: 'neutro', cabeca: 'veredito' },
  'aprovada-reprocessamento': { glifo: 'ok', tom: 'neutro', cabeca: 'veredito' },
  'aguardando-validacao': { glifo: 'relogio', tom: 'espera', cabeca: 'neutro' },
  'falha-recebimento-reconhecida': { glifo: 'xis', tom: 'falha', cabeca: 'falha' },
  reprovada: { glifo: 'xis', tom: 'falha', cabeca: 'falha' },
}
// na lista, o veredito curto (a reprocessada diz só *aprovada*); no cabeçalho do detalhe, o nome inteiro
export const vereditoDoEstado = (estado, naCabeca = false) => ({ texto: (naCabeca && TX.naCabeca[estado]) || TX.veredito[estado], ...NATUREZA[estado] })
export const vereditoDe = (i) => vereditoDoEstado(i.estado)

// a linha de baixo da lista: o módulo e a hora, em HOJE e ONTEM; o módulo e há
// quantos dias, no resto — e aí em 12, como a referência desenha
export function detalheDaLinha(i) {
  const comHora = i.diasAtras <= M.criteriosRegra.gruposIdade.ontem
  return {
    texto: i.moduloSerial + TX.entre + (comHora ? i.hora : TX.haDias(i.diasAtras)),
    tam: comHora ? undefined : 'legenda',
  }
}

// ── o detalhe ──
// a linha embaixo da placa: a de hoje e a de ontem como as referências desenham
// ('M2C-0417 · hoje, 11:47 · Rafael Vieira', T12/01; 'M2C-0312 · ontem, 16:05',
// T12/04 e 05); as mais velhas não têm
// texto aprovado pro 'quando' ('há 9 dias, 13:58' não existe no textos.md), então
// repetem a linha de baixo da lista, que é texto aprovado ('M2C-0362 · há 9
// dias')
// quem instalou: só a instalação com a história inteira (as etapas) tem autor, e o
// autor é o do dado — o herói do mock (M.tecnico, 'Rafael Vieira'), a i-01 —,
// nunca quem está logado agora: com outro usuário no aparelho (T01/18, HU-T01-4,
// decisão 42) o nome segue o do herói.
// As outras chegam do servidor só com o resumo, que não diz quem
// instalou: sem nome (sem inventar autor). A i-02, a PCX-9A17 da T12/04 e
// 05, tem as etapas, e com elas o nome
export function linhaDoDetalhe(i) {
  const g = M.criteriosRegra.gruposIdade
  if (i.diasAtras > g.ontem) return detalheDaLinha(i).texto
  const partes = [i.moduloSerial, i.diasAtras <= g.hoje ? TX.hoje(i.hora) : TX.ontem(i.hora)]
  if (i.etapas) partes.push(M.tecnico.nome)
  return partes.join(TX.entre)
}

// ── o que o servidor recebeu (decisão 41, HU-T12-1, 4 e 6) ──
// Os três critérios, cada um com o veredito e o porquê numa linha. O dado é o
// `recebimento` da instalação (a i-01) ou o do caso (a PCX-9A17 dos estados 04
// e 05). A instalação sem `recebimento` — as outras doze do mock — tem o
// veredito da regra dos critérios do mock (criteriosRegra.porEstado, com a
// exceção da i-09), e fica sem o porquê: o mock não tem o número dela, e nada se
// inventa (padrão do protótipo). Pela decisão 54, o
// servidor confere o posicionamento e os eventos — a viagem não, porque o ciclo
// de testes é parado. O mock ainda traz `viagens` no recebimento da i-01 e dos
// dois casos: fica sem leitor (pode sair do mock)
const CRITERIOS = ['posicionamento', 'eventos']
// a natureza de cada veredito, pro glifo e a tinta da linha (LinhaChecagem
// 'recebimento'): o que chegou é o check; o parâmetro que o pacote não declara é
// o traço; o servidor que não respondeu — e a posição que chegou tarde — é o
// relógio; o que não chegou ou saiu do parâmetro é o xis. Nunca o check por omissão
const NATUREZA_DO_CRITERIO = {
  conforme: 'aprovada', completa: 'aprovada', indisponivel: 'indisponivel', pendente: 'pendente', atrasado: 'pendente',
  ausente: 'reprovada', 'fora do parâmetro': 'reprovada', incompleta: 'reprovada',
}
const regraDe = (i) => ({ ...M.criteriosRegra.porEstado[i.estado], ...(M.criteriosRegra.excecoes?.[i.id] ?? {}) })
// o tempo do porquê, sem Intl: 72 → '1 min 12 s', 24 → '24 s'
function duracao(seg) {
  const m = Math.floor(seg / 60); const s = seg % 60
  if (!m) return TX.seg(s)
  return s ? `${TX.min(m)} ${TX.seg(s)}` : TX.min(m)
}
function porqueDe(id, c) {
  if (c.estado === 'pendente') return TX.confereDeNovo(c.motivo, c.confereDeNovoPorHoras)
  if (c.estado === 'indisponivel') return c.motivo
  if (id === 'posicionamento') return TX.posicoesEm(c.posicoes, duracao(c.emSeg))
  return TX.testeChegouEm(duracao(c.recebidoAosSeg))
}
export function criteriosDe(i, recebimento = i.recebimento) {
  const regra = regraDe(i)
  return CRITERIOS.map((id) => {
    const c = recebimento?.[id]
    const estado = c?.estado ?? regra[id]
    return {
      id, titulo: TX.criterios[id], valor: TX.vereditoDoCriterio[estado] ?? estado,
      natureza: NATUREZA_DO_CRITERIO[estado] ?? 'indisponivel', porque: c ? porqueDe(id, c) : undefined,
    }
  })
}
// o status geral sai dos critérios: com um indisponível ou pendente, a instalação
// espera — 'aguardando validação' (decisão 41); senão, o estado dela
export const estadoGeral = (i, criterios) =>
  (criterios.some((c) => c.natureza === 'indisponivel' || c.natureza === 'pendente') ? 'aguardando-validacao' : i.estado)

// os estados 04 e 05: a instalação mais nova do ativo do caso (a-03, a PCX-9A17,
// a i-02), com o que o servidor recebeu, do caso
const CASO_DO_CRITERIO = { [REF.indisponivel]: 'criterio-indisponivel', [REF.pendente]: 'criterio-pendente' }
export function detalheDoCaso(est) {
  const c = M.casos[CASO_DO_CRITERIO[est]]
  if (!c) return null
  const instalacao = M.instalacoes.filter((i) => i.ativoId === c.ativoId).slice().sort(maisNova)[0]
  return instalacao ? { instalacao, recebimento: c.recebimento } : null
}

const par = (s) => s.split('/').map(Number) // '6/6' → [6, 6]

// O diagnóstico da instalação (decisão 44 · T12/01: 'Diagnóstico · 7 de 7').
// A i-01 só guarda a pré-checagem de antes (preChecagem 12 de 12, que passou inteira):
// as linhas vêm do diagnóstico do módulo do mock, M.diagnostico.modulo — as 7 —, e as que
// conferiram são as que o herói lê sem trava (todas: a i-01 é a instalação dele, e ela
// passou). Diferença conhecida da referência: a fonte certa é o diagnostico da i-01
// nas etapas, no lugar da preChecagem. Quando houver, a linha lê dele
function diagnosticoDe(e) {
  if (e.diagnostico) return e.diagnostico
  // as mensagens no módulo só informam, e não contam
  const linhas = M.diagnostico.modulo.filter((l) => !l.soInforma)
  const passou = e.preChecagem && e.preChecagem.passaram === e.preChecagem.checagens
  return { linhas: linhas.length, conferiram: passou ? linhas.filter((l) => l.heroi != null).length : 0 }
}
// A calibração da instalação (decisão 52 · T12/01: 'hodômetro e
// horímetro'): as grandezas que o modelo do ativo calibra (calibracao.porModelo,
// as calibráveis de partida, na ordem do cadastro), com o nome em caixa baixa —
// sem a foto, que não é da calibração. Diferença conhecida da referência: a i-01 do
// mock ainda guarda `calibracao: { grandeza: 'hodômetro', foto: true }`, de quando
// a calibração tinha foto; quando ela tiver as grandezas dela (`grandezas`), a linha lê dela
const ateUltimo = (nomes) => (nomes.length > 1 ? `${nomes.slice(0, -1).join(', ')}${TX.e}${nomes.at(-1)}` : nomes[0])
function calibracaoDe(i) {
  const cal = i.etapas.calibracao
  if (cal.nadaACalibrar) return TX.nadaACalibrar // o ônibus do herói não tem o que calibrar
  if (cal.grandezas) return ateUltimo(cal.grandezas)
  const modelo = M.ativos.find((a) => a.id === i.ativoId)?.modeloAtivoId
  const ids = M.calibracao.porModelo[modelo]?.calibraveis ?? []
  const nomes = M.calibracao.grandezas.filter((g) => ids.includes(g.id) && g.natureza === 'partida').map((g) => g.rotulo.toLowerCase())
  return nomes.length ? ateUltimo(nomes) : cal.grandeza
}
const contagem = (titulo, feito, total, extra = {}) => ({ titulo, valor: TX.deN(feito, total), ok: feito === total, ...extra })

// as linhas da instalação (T12·2 a): as seis etapas da i-01 e da i-02, lidas
// das etapas; nas outras, só as três que o resumo sustenta, nada se inventa. O
// recebimento é a seção de cima
// (decisão 41)
export function linhasDoDetalhe(i) {
  const E = TX.etapas
  const e = i.etapas
  if (e) {
    const relidos = e.cadeia.filter((b) => b.readBack === 'confirmado').length
    const diag = diagnosticoDe(e)
    const a = e.autoteste
    return [
      contagem(E.diagnostico, diag.conferiram, diag.linhas),
      { titulo: E.configuracao, valor: TX.passos(relidos), ok: relidos === e.cadeia.length },
      { titulo: E.calibracao, valor: calibracaoDe(i), ok: true },
      contagem(E.ciclo, e.cicloDinamico.confirmados, e.cicloDinamico.passos.length),
      contagem(E.checklist, e.checklist.concluidos, e.checklist.itens),
      autoteste(TX.contadores(a.aprovadas, a.naoSeAplicam, a.pendentes), a.falhou),
    ]
  }
  const r = i.resumo
  const [bf, bt] = par(r.blocos), [cf, ct] = par(r.checklist)
  return [
    bf === bt ? { titulo: E.configuracao, valor: TX.passos(bf), ok: true } : contagem(E.configuracao, bf, bt),
    contagem(E.checklist, cf, ct),
    // os três contadores vêm escritos no resumo do mock; a assertiva que falhou (i-05), como a causa
    autoteste(r.autoteste, r.assertivaFalhou),
  ]
}
// o autoteste (T12/01, 04, 05): os três contadores embaixo do
// nome, sem valor à direita — a linha do porquê, como o que o servidor recebeu
function autoteste(contadores, falhou) {
  return { titulo: TX.etapas.autoteste, porque: contadores, ok: !falhou, ...(falhou ? { causa: falhou } : {}) }
}

// ── o mundo de cada estado da coluna, pela receita (receitas.js) ──
// · a 02: a consulta do caso, que volta vazia, e sem sessão
// · a 03: a mesma lista da empresa, como a última consulta, com a hora do caso
// · no fluxo: a empresa do contexto; sem rede no aparelho, a última consulta
export function mundoDe(est, unico) {
  const empresaId = empresaDoContexto(unico.contexto).id
  if (est === REF.vazia) {
    const c = M.casos[CASO_VAZIA]
    return { sessao: c.sessao, lista: M.instalacoes.filter((i) => c.instalacaoIds.includes(i.id)), consultaDas: null }
  }
  const semRede = est === REF.semRede || unico.situacao.rede !== 'conectada'
  return { sessao: unico.sessao, lista: daEmpresa(empresaId), consultaDas: semRede ? M.casos[CASO_SEM_REDE].consultadoAs : null }
}
