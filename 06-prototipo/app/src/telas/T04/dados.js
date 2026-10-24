// O que a T04 lê do mock e do estado único — funções puras, sem texto de
// interface além do que o textos.md traz com o dado dentro. Nenhum número
// digitado: toda contagem sai de M.
import { M } from '../../dados/mock.js'
import { caixaAlta, idadeNaFolha } from '../../dados/formato.js'
import { filaDoMundo, naoChegouDoAparelho } from '../../estado/fila.js'
import { mundoDo, empresasDo, variasEmpresas, empresaDoContexto, pacoteDaEmpresa, contextoDaEmpresa } from '../../dados/empresas.js'
import { dadosDoModelo } from '../T06/dados.js'

// os nomes das referências (02-telas/T04-menu/referencias)
export const REF = {
  semModulo: '01-momento-sem-modulo',
  semAtivo: '02-momento-modulo-sem-ativo',
  falha: '03-estado-faixa-modulo-com-falha',
  checklist: '04-estado-checklist-pendente',
  conta: '05-momento-folha-conta',
  sair: '06-momento-folha-conta-sair-com-sessao-aberta',
  empresa: '07-momento-folha-trocar-de-empresa',
  envio: '08-estado-folha-trocar-de-empresa-envio-em-andamento',
  trocar: '09-estado-folha-trocar-de-empresa-com-modulo-conectado',
  modulo: '10-momento-folha-modulo-conectado',
  ativo: '11-momento-folha-ativo-da-sessao',
  acesso: '12-estado-acesso-vencendo',
  encerrar: '13-momento-encerrar-antes-de-homologar',
  semConexao: '15-estado-sem-conexao',
  filaParada: '16-estado-fila-parada',   // a fila parada há mais de 30 min (o limite é provisório)
  sairSemPendencia: '17-momento-folha-conta-sair-sem-pendencia',      // o sair sem sessão e sem fila: pergunta também
  reconectando: '18-momento-reconectando-ao-modulo',                  // o toque no cartão do módulo que perdeu o link
  checklistRegistrado: '19-momento-checklist-registrado',             // a volta ao menu com o checklist registrado (T13/11)
  sairRegistrado: '20-momento-folha-conta-sair-com-checklist-registrado', // o sair com o checklist registrado: o encerramento completo
  outraMarcada: '21-momento-folha-trocar-de-empresa-outra-marcada',   // a folha de trocar com outra empresa marcada
}

// o que está por cima do menu em cada referência: a folha da conta, o
// diálogo de sair, a folha de trocar de empresa (07, e a 08, com o envio
// subindo), o diálogo de trocar (09), as folhas do módulo e do ativo que a
// sessão prendeu (HU-T16-2) e o diálogo do ENCERRAR antes de homologar (13, decisão 36)
export const SOBRE = {
  [REF.conta]: 'conta', [REF.sair]: 'sair', [REF.sairSemPendencia]: 'sair', [REF.sairRegistrado]: 'sair',
  [REF.empresa]: 'empresa', [REF.outraMarcada]: 'empresa', [REF.envio]: 'empresa', [REF.trocar]: 'trocar',
  [REF.modulo]: 'modulo', [REF.ativo]: 'ativo', [REF.encerrar]: 'encerrar',
}
export const MOMENTO_DA_FOLHA = { conta: REF.conta, sair: REF.sair, empresa: REF.empresa, modulo: REF.modulo, ativo: REF.ativo, encerrar: REF.encerrar }

// ── o sair da conta (HU-T01-12, decisão 64): pergunta sempre, e diz o que fica ──
// O momento do diálogo: com o checklist registrado, a 20 (o encerramento completo); sem
// sessão e sem nada na fila, a 17; com a sessão ou a fila, a 06
export function momentoDoSair({ sessao, pendentes, registrado }) {
  if (sessao && registrado) return REF.sairRegistrado
  if (!sessao && !pendentes) return REF.sairSemPendencia
  return REF.sair
}
// as frases do diálogo, na ordem da referência — cada uma com o dado que ela destaca:
// o que não chegou da fila do aparelho (o número do cartão), a sessão que encerra antes (o
// módulo), e a última, sempre: entrar de novo precisa de rede
export function frasesDoSair({ sessao, pendentes, registrado }) {
  const frases = []
  if (pendentes > 0) frases.push({ destaque: String(pendentes), depois: ' itens ainda não chegaram ao servidor. Eles ficam no aparelho e continuam subindo.' })
  if (!sessao && !pendentes) frases.push({ texto: 'Nenhuma sessão aberta e nada na fila.' })
  if (sessao && registrado) frases.push({ antes: 'O checklist do ', destaque: sessao.moduloSerial, depois: ' está registrado: a sessão encerra antes, com o reinício e o autoteste do módulo.' })
  else if (sessao) frases.push({ antes: 'A sessão de configuração do ', destaque: sessao.moduloSerial, depois: ' é encerrada antes, sem terminar a instalação.' })
  frases.push({ texto: 'Pra entrar de novo, o login precisa de rede.' })
  return frases
}
// o primário: com a sessão, ela encerra antes (os 4 passos, ou o encerramento completo
// com o checklist registrado); sem ela, só sai — o mesmo texto da 17
export const primarioDoSair = (sessao) => (sessao ? 'Encerrar a sessão e sair' : 'Sair da conta')
// o que o primário faz: 'completo' (o encerramento da T16, com o reinício e o autoteste),
// 'abortado' (os 4 passos da sessão abortada) ou 'sai' (direto pro login)
export const depoisDoSair = ({ sessao, registrado }) => (sessao ? (registrado ? 'completo' : 'abortado') : 'sai')

// o checklist registrado, aguardando o autoteste (a T13/11): o campo legado `homologada`
export const registrado = (etapas) => Boolean(etapas?.checklist?.homologada)
// o próximo passo no cartão do Finalizar com checklist (a 19)
export const CAUSA_REGISTRADO = 'registrado · falta encerrar a sessão'
// as folhas sobem do pé (os diálogos, não); as do módulo e do ativo abrem
// embaixo da faixa, com o fundo estendido sobre o topo (T04/10, 11)
export const FOLHAS = ['conta', 'empresa', 'modulo', 'ativo']
export const SOB_A_FAIXA = ['modulo', 'ativo']

const ativo = (id) => M.ativos.find((a) => a.id === id)
export const placaDe = (id) => ativo(id)?.placa

// O que a sessão prendeu, pro cartão da folha (T04/10, 11): a identidade e as
// linhas do detalhe, do mock. As palavras em volta do dado (firmware, frota)
// são as do textos.md.
// o módulo: 'VL06 · CAN-BT · firmware 8.04'
export function moduloPreso(serial) {
  const m = M.modulos.find((x) => x.serial === serial)
  if (!m) return { identidade: serial, detalhes: [] }
  const modelo = M.modelos.find((x) => x.id === m.modeloId)
  return { identidade: serial, detalhes: [`${modelo.nome} · ${m.variante} · firmware ${m.firmware}`] }
}
// o ativo (decisão 46: o modelo, não o chassi): 'frota 1003' e
// 'Mercedes-Benz · OF-1621 · ônibus urbano' — o fabricante e o modelo com o tipo,
// pela mesma conta dos dados do modelo da T06 (o tipo sai do nome do modelo de
// ativo sem o código: o mock não o declara · diferença conhecida da referência)
export function ativoPreso(id) {
  const a = ativo(id)
  if (!a) return { identidade: undefined, detalhes: [] }
  const { fabricante, modelo } = dadosDoModelo(a)
  return { identidade: a.placa, detalhes: [`frota ${a.frota}`, `${fabricante} · ${modelo}`] }
}

// A rede do menu (decisão 48): o herói começa com rede, e o Últimas instalações
// fica ligado; o 15 abre pela coluna sem ela, montado pelo caso sem-conexao-no-menu.
// Só o Últimas instalações depende dela (HU-T04-6)
export const CASO_SEM_REDE = 'sem-conexao-no-menu'
export function temRede(unico, est) {
  if (est === REF.semConexao) return M.casos[CASO_SEM_REDE].rede
  return unico.situacao.rede === 'conectada'
}

// as iniciais do técnico: a primeira letra do primeiro e do último nome
export function iniciais(nome) {
  const p = nome.trim().split(/\s+/)
  return caixaAlta(p[0][0] + (p.length > 1 ? p[p.length - 1][0] : ''))
}

// a fila do mock inteira mais o que a sessão criou (estado único) — e o erro que o
// técnico reenviou na T15 já de volta na fila (estado/fila.js)
export const filaToda = (unico) => filaDoMundo(unico)

// O contador do cartão da Fila de saída (decisão 42): o que ainda não chegou da
// fila do aparelho, a que a T15 mostra (estado/fila.js · filaDoAparelho: a fila da
// entrada, M.filaDoAparelho, mais o que a sessão criar). A fila é do aparelho, e
// não da empresa: trocar de empresa não muda o número. Na entrada, 2 — o recusado e
// o que está na fila. O recebido em conflito também chegou: o servidor aceitou, e
// avisou o gestor
export const pendentesDoAparelho = (unico) => naoChegouDoAparelho(unico).length
// o que está na fila, numa lista (a T15, o que espera)
export const naFila = (fila) => fila.filter((f) => f.estado === 'na-fila').length
// o que está subindo agora (T04/08), na fila do mock inteira
export const enviando = (fila) => fila.filter((f) => f.estado === 'enviando').length

// T04·2 (b) · o contador do checklist: os itens que o técnico resolve na mão
// ou no veículo (as seções manuais e a dinâmica — B e E, a conta da T13/00)
export function checklistPendentes(etapa) {
  if (etapa?.homologada) return 0
  // a T13 grava a conta a cada item resolvido (etapas.checklist.pendentes); sem ela, os itens de B e E
  if (etapa?.pendentes != null) return etapa.pendentes
  const secoes = new Set(M.checklist.secoes.filter((s) => s.natureza === 'manual' || s.natureza === 'dinamico').map((s) => s.id))
  return M.checklist.itens.filter((i) => secoes.has(i.secao)).length
}

// o prazo da sessão de acesso (M.situacao.sessaoAcesso): o que resta de quanto
export function prazoDoAcesso(acesso) {
  return { restam: acesso.validadeDias - acesso.abertaDiasAtras, total: acesso.validadeDias }
}
// o aviso da fila parada (T04/16): há quanto tempo e quantos envios
// esperam, do caso fila-parada; o número por extenso, como o textos.md diz (*Dois envios*)
const POR_EXTENSO = ['Nenhum', 'Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove']
export const avisoDaFila = (fila) => ({
  titulo: `A fila está parada há ${fila.paradaHa}`,
  frase: fila.esperando === 1 ? 'Um envio espera a rede. Ele sobe sozinho quando ela voltar.'
    : `${POR_EXTENSO[fila.esperando] ?? fila.esperando} envios esperam a rede. Eles sobem sozinhos quando ela voltar.`,
})
// o aviso do acesso vencendo (T04/12): do dia do aviso (avisoNoDia) até o
// último dia da validade, o que resta; fora disso, nada (null)
export function avisoDoAcesso(acesso) {
  const noAviso = acesso.abertaDiasAtras >= acesso.avisoNoDia && acesso.abertaDiasAtras < acesso.validadeDias
  return noAviso ? prazoDoAcesso(acesso) : null
}

// ── a empresa (decisão 56; logica.md · O contexto é a empresa) ──

/** a empresa da tira de contexto: a do contexto; sem ela, a do contexto do mock (a Viação) */
export const empresaDoMenu = (contexto) => empresaDoContexto(contexto)
/** o nome da empresa no topo abre a folha Trocar de empresa (a 07) só com mais de uma
 *  empresa: com uma só (o caso uma-empresa), ele fica sem a seta e não é botão */
export const tiraTroca = (contexto) => variasEmpresas(mundoDo(contexto))

/** as empresas da folha Trocar de empresa (07, 08, 21), cada uma com o pacote dela (M.pacotes):
 *  a idade e quantos ativos ele traz. A idade deriva na tela, pelos limiares do próprio
 *  pacote (formato.js · idadeNaFolha): *carregado ontem, 07:10* · *carregado há 4 dias* ·
 *  vencido, a idade e que venceu, *carregado há 8 dias, vencido*, como a T02 diz *pacote de
 *  8 dias, vencido* (decisão 64). A de pacote vencido se escolhe, como na T02: a T03/04 diz o que fazer */
export function empresasDaFolha(contexto) {
  return empresasDo(mundoDo(contexto)).map((e) => {
    const p = pacoteDaEmpresa(e.id)
    return { id: e.id, nome: e.nome, ativos: p.contem.ativos, pacote: idadeNaFolha(p.diasAtras, p.hora, p.limiares.bloqueioDias) }
  })
}
/** cada linha da folha: a marcada leva o quadrado lima (a atual, ao abrir; a outra que o
 *  técnico tocou, a 21); com evidência subindo (08), as outras esperam o envio terminar — o
 *  traço no poço, *espera o envio terminar* no lugar do pacote, sem toque (HU-T02-4); as
 *  outras, livres */
export const estadoDaLinha = (e, marcadaId, subindo) => (e.id === marcadaId ? 'atual' : subindo ? 'espera' : 'disponivel')
/** a folha marca (R-14, decisão 64): o toque numa empresa livre a marca, e tocar de novo na
 *  atual devolve a marca a ela · o que espera o envio não se toca */
export const marcar = (marcadaId, id, subindo) => (subindo ? marcadaId : id)
/** o primário da folha, embaixo da lista: com o envio subindo, espera, apagado; com a atual
 *  marcada, apagado, *Escolha outra empresa*; com outra marcada, *Sincronizar* (a 21) */
export function primarioDaFolha({ marcadaId, atualId, subindo }) {
  if (subindo) return { texto: 'Espera o envio terminar', desabilitado: true }
  if (marcadaId === atualId) return { texto: 'Escolha outra empresa', desabilitado: true }
  return { texto: 'Sincronizar', desabilitado: false }
}
/** o momento da folha: a 07 com a atual marcada, a 21 com outra */
export const momentoDaFolha = (marcadaId, atualId) => (marcadaId === atualId ? REF.empresa : REF.outraMarcada)
/** o título do diálogo de trocar (a 09): pra qual empresa */
export const tituloDoTrocar = (nome) => `Trocar pra ${nome}?`

// Trocar de empresa: o alvo é { empresaId }. Com a sessão aberta, o diálogo de trocar
// (o 09: a sessão encerra antes, sem terminar a instalação · HU-T02-3); sem ela, direto
// pra T03, que baixa o pacote da escolhida (o de 4 dias e o vencido perguntam antes,
// T03/03 e 04). O contexto de antes vai junto (o mundo), com a empresa nova e sem pacote
export function destinoDaTroca(alvo, contexto = {}) {
  return { tela: 'T03', contexto: contextoDaEmpresa(contexto, alvo.empresaId) }
}
// o Sincronizar da folha: com a sessão aberta, o diálogo (confirma); sem ela, o destino (vai)
export const depoisDoTrocar = (sessao, alvo, contexto) => (sessao ? { confirma: alvo } : { vai: destinoDaTroca(alvo, contexto) })

// ── o módulo da sessão que perde o link (a 03 e a 18, HU-T05-4) ──
// O cartão do módulo: sem sessão, o próximo passo, *toque para procurar*; com o link
// perdido, o próximo passo de novo, *toque para reconectar* (o lima de escolha); tocado,
// *reconectando…*, sem o lima e sem toque, até o módulo voltar; com a sessão de pé, o serial,
// e o toque abre a folha do que a sessão prendeu (a 10). O poço é o de 34 nos que pedem o passo
// (o mesmo do menu sem sessão), e o de 30 com a sessão de pé
export function cartaoDoModulo({ sessao, reconectando = false }) {
  if (!sessao) return { estado: 'decide', valor: 'toque para procurar', poco: 34, toque: 'procurar' }
  if (sessao.saude === 'falha') {
    return reconectando
      ? { estado: 'disponivel', valor: 'reconectando…', poco: 34, toque: null }
      : { estado: 'decide', valor: 'toque para reconectar', poco: 34, toque: 'reconectar' }
  }
  return { estado: 'disponivel', valor: sessao.moduloSerial, poco: 30, toque: 'folha' }
}
// as ferramentas que precisam do módulo esperam por ele quando o link caiu: *espera módulo*,
// como no menu sem módulo · sem a sessão, o que falta é o módulo, ou o módulo e o ativo; com
// ela sem o ativo, o ativo
export const linkPerdido = (sessao) => sessao?.saude === 'falha'
export function causaDaFerramenta(f, sessao) {
  if (!sessao) return f.soModulo ? 'espera módulo' : 'espera módulo e ativo'
  if (linkPerdido(sessao)) return 'espera módulo'
  return 'espera ativo'
}
export const ferramentaLiberada = (f, sessao) => (linkPerdido(sessao) ? false : f.soModulo ? Boolean(sessao) : Boolean(sessao?.ativoId))
