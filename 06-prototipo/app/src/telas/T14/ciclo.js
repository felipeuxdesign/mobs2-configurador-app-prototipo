// T14 · o ciclo lido do mock (M.ciclo, M.casos, M.checklist, M.modelosAtivo):
// os passos do par, o prazo e os dois degraus do evento, a fila do módulo, e os
// três casos que a tela lê. A cadência (quanto vale um segundo de prazo, quando
// cada passo acende, quanto a fila leva pra drenar) é do ritmos.js (T14·1).
// Nada de número digitado: contagens, horas e prazos saem daqui.
import { M } from '../../dados/mock.js'
import { RITMOS } from '../../estado/ritmos.js'
import { SEMENTES } from '../../estado/sementes.js'
import { T } from './textos.js'

export const REF = {
  antes: '01-momento-antes-do-disparo',
  estourado: '02-estado-prazo-estourado',
  segundaFalha: '09-estado-segunda-falha-do-evento',   // o evento que não chega nas duas tentativas
  fora: '03-estado-dinamico-fora-do-esperado',
  concluido: '05-momento-ciclo-concluido',
  // o cartão em três momentos — a vez dele é a 00, o módulo
  // leu (08), e a resposta do técnico: não confere (10) ou confere, e a vez da ignição desligada (11)
  leuCartao: '08-momento-o-modulo-leu-o-cartao',
  naoConfere: '10-momento-cartao-nao-confere',
  vezDaIgnicao: '11-momento-vez-da-ignicao-desligada',
  semLeitor: '12-estado-ativo-sem-leitor',
}
export const CASO_SEM_RESPOSTA = 'evento-sem-resposta'
// T14/09: o mesmo par, e a 2ª tentativa também estoura (`tentativasQueEstouram`)
// · padrão provisório · só pela coluna: no fluxo, o par segue o evento-sem-resposta
export const CASO_DE_NOVO = 'evento-nao-chega-de-novo'
// decisão 54: o 03 é a rotação zerada, o motor desligado com a
// ignição ligada — o can-fora-esperado (a velocidade em 0) não é da T14: com o
// ônibus parado, a velocidade só entra com tacógrafo digital, e o a-02 não tem
export const CASO_MOTOR = 'motor-desligado-no-ciclo'
// o ativo sem leitor (T14/12), o ciclo em 3 passos · só pela coluna
export const CASO_SEM_LEITOR = 'sem-leitor'
const CASO_PENDENCIAS = 'modulo-com-pendencias'

// a chave de um passo, pra ler o caso: o título sem acento e em caixa baixa —
// 'Rotação' → 'rotacao', o id do sinal da CAN que o passo prova (sinaisCan) e o
// `passo` do motor-desligado-no-ciclo
const chaveDe = (titulo) => titulo.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// os passos canônicos: os da Seção E do checklist que o ciclo prova, que são os da i-01
// (mocks.js, PASSOS_CICLO) — com o id do item, que é como o checklist os lê, e a condição
// (no máximo quatro, cada um só quando se aplica · o bip é do checklist)
const CANONICOS = M.checklist.itens.filter((i) => i.secao === 'E' && i.origem === 'ciclo')
  .map((i) => ({ id: i.id, titulo: i.pergunta, chave: chaveDe(i.pergunta), condicao: i.condicao }))
// o passo da velocidade: entra depois da rotação, só quando o
// modelo do ativo tem tacógrafo digital (tacografoDigital). Nenhuma referência o
// desenha — o herói não tem —, e ele se monta pelo dado: o nome é o do sinal da
// CAN do modelo (sinaisCan, 'Velocidade'), e o id, fora da Seção E, é o do sinal
// com o prefixo dos passos ('e-velocidade'): o checklist tem 6 itens na E e não
// o lê (diferença conhecida: falta a linha dele na E)
const SINAL_DO_TACOGRAFO = 'velocidade'
const DEPOIS_DE = 'rotacao'
export const ID_VELOCIDADE = `e-${SINAL_DO_TACOGRAFO}`

export const ativoDe = (id) => M.ativos.find((a) => a.id === id)
const modeloDe = (ativoId) => M.modelosAtivo.find((m) => m.id === ativoDe(ativoId)?.modeloAtivoId)

// a condição de cada passo, no modelo do ativo: a rotação só se o
// ativo lê rotação (o sinal na CAN do modelo); o cartão só se há leitor — e o caso sem-leitor o tira
const VALE = {
  rotacao: (modelo) => !!modelo?.sinaisCan?.some((s) => s.id === 'rotacao'),
  leitor: (modelo, semLeitor) => !semLeitor && !!modelo?.leitor,
}
// os passos do par: os que se aplicam, e a velocidade depois da rotação com tacógrafo digital
export function passosDo(par, { semLeitor = false } = {}) {
  const modelo = modeloDe(par.ativoId)
  const valem = CANONICOS.filter((p) => !p.condicao || VALE[p.condicao]?.(modelo, semLeitor))
  if (!modelo?.tacografoDigital) return valem
  const sinal = modelo.sinaisCan?.find((s) => s.id === SINAL_DO_TACOGRAFO)
  if (!sinal) return valem
  const em = valem.findIndex((p) => p.chave === DEPOIS_DE) + 1
  const velocidade = { id: ID_VELOCIDADE, titulo: sinal.rotulo, chave: SINAL_DO_TACOGRAFO }
  return [...valem.slice(0, em), velocidade, ...valem.slice(em)]
}
// os passos do herói (o print, a vitrine): os quatro
export const PASSOS = CANONICOS
export const PRAZO = M.ciclo.prazoEventoSeg
export const EVENTO = M.ciclo.evento

// o tique do prazo: 1 s real vale RITMOS.prazoFator s de prazo, então um segundo
// de prazo passa a cada 250 ms. O processo inteiro anda nesse tique.
export const TIQUE_MS = 1000 / RITMOS.prazoFator
// o passo k acende a k × cicloPassoMs do disparo (T14·1): no tique do prazo, 12 por passo
// (a ignição desligada do herói, o 4º, a +12 s, o tique 48) · o cartão é do técnico: a vez dele
// começa no disparo, e o módulo lê no tique do passo seguinte (+3 s) — a 00 e a 08, nos 60%
export const tiqueDoPasso = (i) => ((i + 1) * RITMOS.cicloPassoMs) / TIQUE_MS
// o quadro da 00: o instante antes de o evento chegar (120 − 24 = 96, o 1:36)
export const QUADRO_00 = EVENTO.recebidoAosSeg
// o quadro da 05: o último passo aceso, com o evento já conferido
export const quadro05 = (passos) => Math.max(tiqueDoPasso(passos.length - 1), EVENTO.conferidoAosSeg + 1)

// a hora em que o servidor recebeu: o disparo é às 14:30 em ponto (a hora do protótipo)
export const horaDoRecebido = () => `${M.HORA_NOMINAL}:${String(EVENTO.recebidoAosSeg).padStart(2, '0')}`

// o par módulo × ativo da sessão; sem sessão, o da semente (o herói)
export const parDaSessao = (s) => {
  const x = s?.ativoId ? s : SEMENTES.T14.sessao
  return { ativoId: x.ativoId, moduloSerial: x.moduloSerial }
}
// o par de um caso: o módulo é o do caso, ou o do ativo no cadastro
export const parDoCaso = (k) => {
  const c = M.casos[k]
  return { ativoId: c.ativoId, moduloSerial: c.moduloSerial ?? ativoDe(c.ativoId).moduloSerial }
}

// o que o módulo leu no cartão do motorista (T14/08, 'leu 9412857'): o número do primeiro
// cartão do mock (M.identificadores, o 0009412857), como o leitor o manda, sem os zeros à
// esquerda — o mock não declara o lido · o app não
// compara com cadastro nenhum: quem confere é o técnico, com o número impresso no cartão
export const CARTAO_LIDO = M.identificadores.cartoes[0].codigoEsperado.replace(/^0+/, '')

// os casos que valem neste par (o da faixa). O motor desligado é fato do
// veículo: vale toda vez. O evento sem resposta vale uma vez por sessão: a 1ª
// tentativa estoura, a 2ª confirma.
export function casosDoPar(par, consumidos = []) {
  const bate = (k) => {
    const c = M.casos[k]
    return c.ativoId === par.ativoId && (c.moduloSerial == null || c.moduloSerial === par.moduloSerial)
  }
  return {
    semResposta: bate(CASO_SEM_RESPOSTA) && !consumidos.includes(CASO_SEM_RESPOSTA),
    motor: bate(CASO_MOTOR) ? M.casos[CASO_MOTOR] : null,
  }
}

// a fila guardada no módulo, que drena antes do disparo: a de todo módulo, ou a
// do modulo-com-pendencias quando o serial da sessão é o dele (mocks.js)
export function filaDoModulo(serial) {
  const p = M.casos[CASO_PENDENCIAS]
  return p.moduloSerial === serial ? { mensagens: p.mensagens, diagnostico: p.diagnostico } : M.ciclo.mensagensGuardadas
}

// o passo do cartão, o da ignição desligada (a vez que explica a espera, T14/10 e 11)
export const CHAVE = { cartao: 'cartao do motorista', ignicaoDesligada: 'ignicao desligada' }
const ehCartao = (p) => p.chave === CHAVE.cartao
// o veredito de um passo quando ele acontece: reprovado no passo que o motor desligado
// prova (a rotação, `passo` do caso); o cartão não tem veredito do app — o módulo lê
// ('lido'), e quem confere é o técnico (a resposta, `cartao`); aprovado nos outros
export function veredito(p, casos, cartao = null) {
  if (casos.motor && p.chave === casos.motor.passo) return 'reprovada'
  if (ehCartao(p)) return cartao ?? 'lido'
  return 'aprovada'
}
// a causa embaixo do passo reprovado: '0 rpm · ligue o motor' (03)
export function causaDo(p, casos) {
  if (casos.motor && p.chave === casos.motor.passo) return T.causaDoPasso(casos.motor)
  return undefined
}

// o tique em que um passo acontece: o seu, e o cartão, o do passo seguinte (o módulo lê
// 3 s depois de ele virar a vez); a ignição desligada depois do cartão, 3 s depois da resposta ·
// `cartaoDesde`: o Passar de novo (a 10, decisão 64) devolveu a vez ao cartão nesse tique, e o módulo lê 3 s depois
export const tiqueDe = (lista, i, respondidoEm = null, cartaoDesde = null) => {
  const p = lista[i]
  if (ehCartao(p)) return cartaoDesde == null ? tiqueDoPasso(i + 1) : cartaoDesde + RITMOS.cicloPassoMs / TIQUE_MS
  const cartao = lista.findIndex(ehCartao)
  if (cartao >= 0 && i > cartao) return respondidoEm == null ? Infinity : Math.max(tiqueDoPasso(i), respondidoEm + RITMOS.cicloPassoMs / TIQUE_MS + 1)
  return tiqueDoPasso(i)
}
// os passos num tique do prazo: os que a semente traz feitos (T14·1), os que já
// aconteceram, e o resto por fazer
export const passosAte = (lista, casos, tique, resposta = {}) => lista.map((p, i) =>
  (i < RITMOS.cicloPassosNaEntrada || tique >= tiqueDe(lista, i, resposta.em) ? veredito(p, casos, resposta.cartao) : 'pendente'))
export const passosNaEntrada = (lista, casos) => passosAte(lista, casos, 0)
// a T14/01 desenha a fila com 45% por sair (o quadro do meio da drenagem)
export const FILA_NO_QUADRO_01 = 0.45
// O passo da vez (a T14 na gramática do poço): o primeiro por fazer, depois do
// disparo, com o quadrado de agora e a ação do técnico — o cartão lido também é a vez, até a
// resposta; antes do disparo e na falha do motor (o ciclo não anda sem ele), nenhum
export function passoDaVez(passos, casos, disparado) {
  if (!disparado || (casos.motor && passos.includes('reprovada'))) return -1
  const lido = passos.indexOf('lido')
  return lido >= 0 ? lido : passos.indexOf('pendente')
}
// todos os passos feitos (o 02, o 05 e o 12): o cartão, conferido
export const passosFeitos = (lista, casos) => lista.map((p) => veredito(p, casos, 'aprovada'))
// os passos gravados em etapas.ciclo (pelo id), na ordem do par
export const passosDoRegistro = (reg, lista) => lista.map((p) => reg.passos?.[p.id] ?? 'pendente')
