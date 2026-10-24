// T13 · o checklist montado do mock e do estado único — funções puras, nenhum
// número digitado. Cada item lê a etapa que o produziu (as telas T05 a T10 e
// a T14 gravam em estado.etapas; a T13 grava o que ela resolve em
// etapas.checklist):
//   A · identificação  ← a sessão, o diagnóstico do módulo (T07, etapas.preChecagem)
//                        e o vínculo do ativo (T06, etapas.ativo)
//   B · montagem       ← as fotos e as ressalvas desta tela; o Painel é foto a
//                        tirar, e só existe quando houve calibração (decisão 52)
//   C · hardware       ← o que o módulo lê (T07, o diagnóstico; o caso do módulo,
//                        se a coluna o monta) e a leitura nominal do módulo (AC-13):
//                        a alimentação, a posição do GPS, as entradas e o modem
//   D · configuração   ← a cadeia (T09, etapas.cadeia: o conteúdo de cada bloco,
//                        decisão 49), o Extended ID só leitura (decisão 45) e a
//                        calibração (T10, etapas.calibracao; o horímetro pulado
//                        diz 'não calibrado', sem bloquear)
//   E · ciclo de testes← o ciclo (T14, etapas.ciclo); não se responde aqui (HU-T13-8)
//   F · servidor       ← a fila desta sessão: só o que foi criado depois
//                        da abertura, pelos tipos da fila (AC-14)
// O que é um item resolvido (a regra do logica.md): o automático cuja fonte
// passa, o manual com foto ou com ressalva, e o que não se aplica (o horímetro
// pulado, conta como resolvido). O que não bloqueia (F) conta no título, mas não no 'Faltam'.
//
// O checklist (decisão 34): cada item é uma linha da seção aberta,
// e tem seta só o que se toca (Lei 16) — a foto por fazer (a câmera do app), o
// automático que falta (a tela que resolve, pelo `origem` do mock) e o que
// reprovou (o nível do item, 09). O resto é leitura: o que o app conferiu, o
// feito, os passos da E, a F.
import { M } from '../../dados/mock.js'
import { ativosDaEmpresa, pacoteDaEmpresa } from '../../dados/empresas.js'
import { milhar, decimal, caixaAlta } from '../../dados/formato.js'
import { RECEITAS } from '../../estado/receitas.js'
import { conteudoDo } from '../T09/cadeia.js'
import { faltaReenviarDe, motivoDe, manutencaoDoCaso } from '../../estado/reenvio.js'
import { T } from './textos.js'
import { T as T14 } from '../T14/textos.js'

export const REF = {
  tela: '00-tela',
  A: '01-momento-a-identificacao-aberta',
  B: '02-momento-b-montagem-aberta',
  C: '03-momento-c-hardware-aberta',
  D: '04-momento-d-configuracao-aberta',
  E: '05-momento-e-teste-dinamico-aberta',
  F: '06-momento-f-servidor-aberta',
  responder: '07-momento-responder-item',
  naoConforme: '08-momento-nao-conforme-com-justificativa',
  reprovado: '09-estado-item-reprovado',
  secaoF: '10-estado-finalizar-com-a-secao-f-falhando',
  // o fim é o checklist registrado, aguardando o autoteste (a homologação é da T16)
  registrado: '11-momento-aguardando-autoteste',
  comRessalva: '12-momento-b-com-ressalva',
  eResolvida: '13-momento-e-resolvida',
  semLocalizacao: '14-estado-aguardando-autoteste-sem-localizacao',
  problemaFotografado: '15-momento-problema-fotografado',
  secaoCReprovada: '16-estado-secao-c-com-item-reprovado',
  // as outras três falhas da C (a lista e o detalhe)
  secaoCGps: '21-estado-secao-c-com-gps-reprovado',
  gpsReprovado: '22-estado-gps-reprovado',
  secaoCEntradas: '23-estado-secao-c-com-entradas-reprovadas',
  entradasReprovadas: '24-estado-entradas-reprovadas',
  secaoCModem: '25-estado-secao-c-com-modem-reprovado',
  modemReprovado: '26-estado-modem-reprovado',
  // o detalhe relê o módulo ali mesmo: relendo (só de referência) e os quatro relidos
  relendo: '29-momento-relendo-o-modulo',
  alimentacaoRelida: '30-momento-alimentacao-relida',
  gpsRelido: '31-momento-gps-relido',
  entradasRelidas: '32-momento-entradas-relidas',
  modemRelido: '33-momento-modem-relido',
  // o reler que não resolve: o valor novo, ainda vermelho, e o xis com o que ainda falta
  alimentacaoNaoResolvida: '34-momento-alimentacao-nao-resolvida',
  gpsNaoResolvido: '35-momento-gps-nao-resolvido',
  entradasNaoResolvidas: '36-momento-entradas-nao-resolvidas',
  modemNaoResolvido: '37-momento-modem-nao-resolvido',
  // a Seção D lida bloco a bloco (38) e o bip do leitor (39 a 42)
  dSendoLida: '38-momento-secao-d-sendo-lida',
  // o leitor e os eventos deixados para depois, revisar em seguida na D
  dRevisar: '43-estado-secao-d-com-revisar-em-seguida',
  bipTocando: '39-momento-bip-tocando',
  bipEsperando: '40-momento-bip-esperando-resposta',
  bipOuvido: '41-momento-bip-ouvido',
  bipNaoOuvido: '42-momento-bip-nao-ouvido',
  // a resposta se refaz (decisão 64): o bip não ouvido com o que aconteceu escrito, que passa a contar (50)
  bipComRessalva: '50-momento-bip-nao-ouvido-com-o-que-aconteceu',
  // a Seção F falhando, aberta, com a causa e o Disparar de novo: a tela atrás do diálogo da 10 (49)
  secaoFFalhando: '49-estado-secao-f-falhando',
  // o voltar com o que aconteceu escrito pergunta antes (51): o diálogo sobre a foto do problema (a 15)
  descartarRessalva: '51-momento-descartar-a-ressalva',
}
// o bip de cada quadro: tocando, esperando a resposta, ouvido, não ouvido (o 42 sem o que aconteceu, o 50 com)
export const BIP_DO_MOMENTO = { [REF.bipTocando]: 'tocando', [REF.bipEsperando]: 'esperando', [REF.bipOuvido]: 'ouvi', [REF.bipNaoOuvido]: 'naoOuvi', [REF.bipComRessalva]: 'naoOuvi' }
export const MOMENTO_DO_BIP = { tocando: REF.bipTocando, esperando: REF.bipEsperando, ouvi: REF.bipOuvido, naoOuvi: REF.bipNaoOuvido }
// quantos itens da D o 38 desenha lidos (Limpeza, Ativo e Cercas), com o Leitor lendo
export const D_NO_QUADRO_38 = 3
// a Seção C aberta com um item reprovado (a lista) e o detalhe dele, que vem logo
// depois na coluna (o `depoisDe` do índice)
export const LISTAS_DA_C = [REF.secaoCReprovada, REF.secaoCGps, REF.secaoCEntradas, REF.secaoCModem]
export const DETALHES_DA_C = [REF.reprovado, REF.gpsReprovado, REF.entradasReprovadas, REF.modemReprovado]
// o quadro de cada item relido que deu certo (30 a 33) e do que não
// resolveu (34 a 37), e, pra cada quadro da releitura, o item, quantas releituras ele já
// teve (o mock em sequência: a 1ª ainda reprova, a 2ª passa) e o detalhe de onde ela parte —
// o caso que monta o mundo (o 29 é o da Alimentação, a primeira, o que a referência desenha)
export const RELIDO_DO_ITEM = { 'c-alimentacao': REF.alimentacaoRelida, 'c-gps': REF.gpsRelido, 'c-entradas': REF.entradasRelidas, 'c-modem': REF.modemRelido }
export const NAO_RESOLVIDO_DO_ITEM = { 'c-alimentacao': REF.alimentacaoNaoResolvida, 'c-gps': REF.gpsNaoResolvido, 'c-entradas': REF.entradasNaoResolvidas, 'c-modem': REF.modemNaoResolvido }
const doQuadro = (mapa, vezes) => Object.fromEntries(Object.entries(mapa).map(([id, m]) => [m, { item: id, vezes }]))
export const RELEITURA_DO_QUADRO = { [REF.relendo]: { item: 'c-alimentacao', vezes: 0 }, ...doQuadro(NAO_RESOLVIDO_DO_ITEM, 1), ...doQuadro(RELIDO_DO_ITEM, 2) }
export const ITEM_DA_RELEITURA = Object.fromEntries(Object.entries(RELEITURA_DO_QUADRO).map(([m, r]) => [m, r.item]))
const DETALHE_DO_ITEM = { 'c-alimentacao': REF.reprovado, 'c-gps': REF.gpsReprovado, 'c-entradas': REF.entradasReprovadas, 'c-modem': REF.modemReprovado }
export const detalheDaReleitura = (momento) => DETALHE_DO_ITEM[ITEM_DA_RELEITURA[momento]] ?? null
// o veredito do item relido que deu certo, ao lado do check (textos.md · 30 a 33)
// (o GPS relido, com posição, diz os satélites, que ficam como informação — *relido às · 9 satélites*)
export const VEREDITO_DO_RELIDO = { 'c-alimentacao': () => T.dentroDaFaixa, 'c-gps': (c) => T.satelites(c.leitura?.satelites ?? 0), 'c-entradas': () => T.conforme, 'c-modem': () => T.sinalBom }
// as cinco fotos da Montagem: o 07 é o Módulo, e cada item seguinte
// tem o seu quadro, com os de antes fotografados (17 a 20) · o 2º é o lado de cima (decisão 60)
export const MOMENTO_DA_FOTO = {
  'b-lado-de-cima': '17-momento-foto-do-lado-de-cima',
  'b-chicote': '18-momento-foto-do-chicote',
  'b-leitor': '19-momento-foto-do-leitor',
  'b-painel-legivel': '20-momento-foto-do-painel',
}
export const FOTO_DO_MOMENTO = Object.fromEntries(Object.entries(MOMENTO_DA_FOTO).map(([id, m]) => [m, id]))
// a foto de cada item no quadro, depois do Tirar foto (decisão 63, 44 a 48): o item ainda não conta,
// e o Usar foto é que conta · o 44 é o Módulo (a 07 com a foto), e a 45 a 48 são a 17 a 20 com a foto
export const MOMENTO_DA_FOTO_TIRADA = {
  'b-modulo': '44-momento-foto-do-modulo-tirada',
  'b-lado-de-cima': '45-momento-foto-do-lado-de-cima-tirada',
  'b-chicote': '46-momento-foto-do-chicote-tirada',
  'b-leitor': '47-momento-foto-do-leitor-tirada',
  'b-painel-legivel': '48-momento-foto-do-painel-tirada',
}
export const FOTO_TIRADA_DO_MOMENTO = Object.fromEntries(Object.entries(MOMENTO_DA_FOTO_TIRADA).map(([id, m]) => [m, id]))
export const SECAO_DO_MOMENTO = {
  [REF.A]: 'A', [REF.B]: 'B', [REF.C]: 'C', [REF.D]: 'D', [REF.E]: 'E', [REF.F]: 'F', [REF.comRessalva]: 'B', [REF.eResolvida]: 'E',
  [REF.dSendoLida]: 'D', [REF.bipTocando]: 'E', [REF.bipEsperando]: 'E', [REF.bipOuvido]: 'E', [REF.bipNaoOuvido]: 'E', [REF.bipComRessalva]: 'E',
}

const CK = M.checklist
export const SECOES = CK.secoes
// o item do bip do leitor, na Seção E (o que se responde aqui)
export const BIP = CK.itens.find((i) => i.fonte === 'bip')?.id
export const itensDa = (s) => CK.itens.filter((i) => i.secao === s)
export const itemDe = (id) => CK.itens.find((i) => i.id === id)
export const secaoDe = (id) => CK.secoes.find((s) => s.id === id)
export const ativoDe = (id) => M.ativos.find((a) => a.id === id)
const moduloDe = (serial) => M.modulos.find((m) => m.serial === serial)
const modeloDe = (ativoId) => M.modelosAtivo.find((m) => m.id === ativoDe(ativoId)?.modeloAtivoId)
const grandezaDe = (id) => M.calibracao.grandezas.find((g) => g.id === id)
// o modelo do módulo da sessão (VL06, VL08): a faixa de tensão do fio de alimentação
const modeloDoModulo = (serial) => M.modelos.find((m) => m.id === moduloDe(serial)?.modeloId)
const HORA = M.HORA_NOMINAL

// o nome da seção no cartão ('A · Identificação'), e o rótulo de topo do nível
// do item, em caixa alta: o nome curto vale em toda tela ('B · MONTAGEM', T13/07;
// 'C · HARDWARE', T13/09; a tabela com os nomes dos requisitos está
// na ficha da T13) · o nome é o `rotulo` do mock (a E, *Ciclo de testes*, como as referências)
export const nomeDaSecao = (s) => T.secao(s.id, s.rotulo)
export const rotuloDoNivel = (s) => caixaAlta(nomeDaSecao(s))

// o momento da seção aberta, pelo que ela mostra: a B com ressalva (12) e a E
// resolvida (13) têm quadro próprio; homologado, nenhuma seção aberta tem
// referência, e a URL sai do momento
export function momentoDaSecao(s, ck, homologada) {
  if (homologada) return null
  // o bip não ouvido com o que aconteceu escrito passa a contar: o 50
  if (s === 'E' && ck.bip === 'naoOuvi' && ck.bipComTexto) return REF.bipComRessalva
  if (s === 'E' && ck.bip && MOMENTO_DO_BIP[ck.bip]) return MOMENTO_DO_BIP[ck.bip]
  if (s === 'B' && ck.porSecao.B.some((c) => c.estado === 'ressalva')) return REF.comRessalva
  if (s === 'E' && ck.secoes.find((x) => x.id === 'E').estado === 'aprovada') return REF.eResolvida
  return { A: REF.A, B: REF.B, C: REF.C, D: REF.D, E: REF.E, F: REF.F }[s]
}

// ── a semente da T13: o herói depois da calibração, antes do ciclo ──
// Pular pro checklist pelo palco monta só a sessão (sementes.js); o que as
// telas T05 a T10 gravariam no caminho vem daqui, pelo cadastro do par. Vale
// quando a sessão não passou pela T05 neste estado único (a pré-checagem não
// foi gravada): é o palco que semeou. No fluxo, cada etapa é a que a tela gravou.
function etapasDoCaminho(ativoId, moduloSerial) {
  const modelo = modeloDe(ativoId)
  // a calibração semeia o que o painel do ativo tem (sem o número, a T10 não semeia):
  // no herói, o hodômetro e o horímetro (T13/04). Sem nenhuma, não houve calibração
  const partidas = (M.calibracao.porModelo[modelo?.id]?.calibraveis ?? []).filter((g) => grandezaDe(g).natureza === 'partida' && M.calibracao.painel[ativoId]?.[g] != null)
  return {
    preChecagem: { daSemente: true },
    ativo: { ativoId, as: HORA },
    can: { lida: true },
    cadeia: { confirmados: M.cadeia.ordem.length },
    calibracao: partidas.length
      ? { ativoId, moduloSerial, concluida: true, semeadas: Object.fromEntries(partidas.map((g) => [g, { painel: M.calibracao.painel[ativoId][g], as: HORA }])) }
      : null,
  }
}
const daSemente = (etapas) => etapas.preChecagem == null

// o ciclo que a T14 grava quando os passos e o evento fecham (T14/05): o 13 aberto pela URL é
// o fluxo depois disso, e a coluna do 10 e do 14 chega com ele · o cartão, conferido
export function cicloConcluido(ativoId, moduloSerial) {
  const doCiclo = itensDa('E').filter((i) => i.origem === 'ciclo')
  const passos = Object.fromEntries(doCiclo.map((i) => [i.id, 'aprovada']))
  return {
    ativoId, moduloSerial, passos, feitos: doCiclo.length, total: doCiclo.length,
    evento: 'conferido', tentativa: 1, cartao: null, concluido: true, fechado: false,
  }
}
// as fotos de B tiradas: o que bloqueia fechou (o 10, o 14 e o 11 pela URL)
const fotosDeB = () => Object.fromEntries(itensDa('B').map((i) => [i.id, HORA]))

// ── o mundo: a sessão, as etapas, a fila e os casos que valem ──
// No estado da coluna, o do caso da receita: o 09 no a-02 do
// can-estatico-bateria (a alimentação do M2C-0301 abaixo da faixa · o 16, a Seção C
// aberta com ele), o 10 no a-09 do
// pronto-para-fechar (o ciclo completo, as fotos tiradas e o servidor que não
// respondeu), o 14 na sessão do herói homologada, com a localização negada
// (localizacao-negada é caso do celular, e não diz ativo). No fluxo, o estado único.
// As releituras (o Reler o módulo do detalhe): depois de N, os casos da C
// devolvem a N-ésima das `releituras` do mock (a 1ª ainda reprova, a 2ª passa) — a releitura lê
// o módulo inteiro, e todo item da C volta atualizado.
// O Painel só entra quando houve calibração, e o ônibus do herói não
// calibra nada — a foto do Painel (o 20) é do caminhão coletor, o ativo da empresa que calibra (o
// KNB-5H39). Pelo endereço, o 20 abre na sessão dele, como a T16/01 abre no par da referência
export const QUADRO_DO_PAINEL = '20-momento-foto-do-painel'
// a foto do painel tirada (48) é a do mesmo caminhão, e também abre na sessão dele
export const QUADRO_DO_PAINEL_TIRADA = '48-momento-foto-do-painel-tirada'
export function sessaoDoQuadro(unico, momento, semente) {
  if (momento !== QUADRO_DO_PAINEL && momento !== QUADRO_DO_PAINEL_TIRADA) return unico
  const a = ativosDaEmpresa(semente.contexto.empresaId).find((x) => x.moduloSerial
    && (M.calibracao.porModelo[x.modeloAtivoId]?.calibraveis ?? []).some((g) => M.calibracao.painel[x.id]?.[g] != null))
  return a && unico.sessao?.ativoId !== a.id ? { ...unico, sessao: { ...semente.sessao, ativoId: a.id, moduloSerial: a.moduloSerial } } : unico
}
export function mundoDe({ unico, est, semente, releituras = 0 }) {
  const receita = est ? RECEITAS[`T13/${est}`] : null
  if (receita) {
    const casoId = receita.casos[0]
    const caso = M.casos[casoId]
    const a = caso.ativoId ? ativoDe(caso.ativoId) : ativoDe(semente.sessao.ativoId)
    const sessao = { ...semente.sessao, ativoId: a.id, moduloSerial: a.moduloSerial }
    const etapas = { ...etapasDoCaminho(a.id, a.moduloSerial) }
    // o 43: as cercas reenviadas, o leitor e os eventos deixados para depois
    const manutencao = manutencaoDoCaso(casoId)
    if (manutencao) etapas.manutencao = manutencao
    let registro = registroVazio(a.id)
    if (est === REF.secaoF || est === REF.secaoFFalhando || est === REF.semLocalizacao || est === REF.dRevisar) {
      // o ciclo completo pro Finalizar acender, e as fotos de B tiradas: o que bloqueia fechou (o caso)
      // · no 43, só o bloco deixado para depois segura o Finalizar: a B e a E feitas, com o bip ouvido (23 de 27)
      // · no 49 e no 10, a Seção F falhando com o resto resolvido: o bip ouvido também (a E, 5 de 5)
      etapas.ciclo = cicloConcluido(a.id, a.moduloSerial)
      registro = { ...registro, fotos: fotosDeB() }
      if (est === REF.dRevisar || est === REF.secaoF || est === REF.secaoFFalhando) registro = { ...registro, bip: 'ouvi' }
    }
    // o 14: o Finalizar tocado, com a localização negada (HU-T13-7: o relatório vai sem ela) · o bip ouvido
    if (est === REF.semLocalizacao) registro = { ...registro, homologada: true, homologadaAs: HORA, bip: 'ouvi' }
    const semLocalizacao = caso.permissao === 'localizacao' && caso.resposta === 'negada'
    return { sessao, etapas, fila: [...M.filaSaida], casosConsumidos: [], registro, casos: [casoId], semLocalizacao, releituras }
  }
  const sessao = unico.sessao?.ativoId ? unico.sessao : semente.sessao
  const proprias = unico.etapas
  const etapas = daSemente(proprias)
    ? { ...etapasDoCaminho(sessao.ativoId, sessao.moduloSerial), ...Object.fromEntries(Object.entries(proprias).filter(([, v]) => v != null)) }
    : proprias
  const guardado = proprias.checklist?.ativoId === sessao.ativoId ? proprias.checklist : null
  return {
    sessao, etapas, fila: [...M.filaSaida, ...unico.fila], casosConsumidos: unico.casosConsumidos,
    registro: guardado ? { ...registroVazio(sessao.ativoId), ...guardado } : registroVazio(sessao.ativoId),
    casos: [], semLocalizacao: false, releituras,
  }
}

// o que a T13 grava em etapas.checklist (logica.md · os contadores do menu)
// · `homologada`: o Finalizar tocado — o
//   checklist registrado, aguardando o autoteste; quem homologa é a T16
// · `bip`: o teste do bip do leitor — null, 'ouvi' ou 'naoOuvi' · `justificativas`:
//   o que o técnico escreveu no item não conforme da E (o bip não ouvido, o cartão que não confere)
export function registroVazio(ativoId) {
  return { ativoId, aberto: true, fotos: {}, ressalvas: {}, pendentes: null, homologada: false, homologadaAs: null, ciencia: null, bip: null, justificativas: {} }
}

// o quadro que a URL pede: o fluxo depois dos toques que levam lá — o 11,
// as fotos de B tiradas, o ciclo feito e o Finalizar tocado; o 12, o Módulo
// salvo com a ressalva de exemplo e a foto do problema (decisão 39); o 13, o
// ciclo que a T14 fechou
export function registroDoQuadro(momento, base, ck) {
  const r = base.registro
  if (momento === REF.registrado && !r.homologada) {
    const fotos = { ...r.fotos }
    for (const c of ck.porSecao.B) if (c.estado === 'pendente') fotos[c.id] = HORA
    return { ...r, fotos, homologada: true, homologadaAs: HORA, bip: r.bip ?? 'ouvi' }
  }
  // o 13: a E resolvida, com o bip ouvido · o 41 e o 42: o bip respondido; o 42 com o campo vazio
  if (momento === REF.eResolvida && !r.bip) return { ...r, bip: 'ouvi' }
  if (momento === REF.bipOuvido) return { ...r, bip: 'ouvi' }
  if (momento === REF.bipNaoOuvido) return { ...r, bip: 'naoOuvi' }
  // o 50: o não ouvi com o que aconteceu escrito (o da referência), que passa a contar
  if (momento === REF.bipComRessalva) return { ...r, bip: 'naoOuvi', justificativas: { ...r.justificativas, [BIP]: T.exemploDoBip } }
  if (momento === REF.comRessalva && !Object.keys(r.ressalvas).length) {
    const id = ck.porSecao.B.find((c) => c.estado === 'pendente')?.id
    if (id) return { ...r, ressalvas: { ...r.ressalvas, [id]: { justificativa: CK.exemploJustificativa, as: HORA, foto: HORA } } }
  }
  // o 17 ao 20 (e o 45 ao 48, com a foto do da vez no quadro): os itens da B antes do da vez,
  // fotografados, como o Usar foto do item anterior os deixaria
  const daVez = FOTO_DO_MOMENTO[momento] ?? FOTO_TIRADA_DO_MOMENTO[momento]
  if (daVez) {
    const lista = ck.porSecao.B; const i = lista.findIndex((c) => c.id === daVez)
    const fotos = { ...r.fotos }
    for (const c of lista.slice(0, i)) if (c.estado === 'pendente') fotos[c.id] = HORA
    return { ...r, fotos }
  }
  return r
}

// ── C · a leitura: o que o módulo lê, como a T07 lê, ou o caso do módulo da
// sessão que a declara · a alimentação, pelo caso que a declara (o
// can-estatico-bateria baixa a alimentação do M2C-0301, não a bateria da CAN),
// contra a faixa do modelo do módulo · o GPS, as entradas e o modem, pelo caso
// que a coluna monta (gps-fraco, entrada-ignicao, modem-sem-sinal) ──
// o caso depois de N Reler o módulo: o que a N-ésima releitura devolve, por
// cima · passada a lista, a última
function relidoDo(mundo, caso) {
  const lista = caso.releituras ?? []
  if (!mundo.releituras || !lista.length) return caso
  return { ...caso, ...lista[Math.min(mundo.releituras, lista.length) - 1] }
}
function alimentacaoDoCaso(mundo) {
  const { moduloSerial } = mundo.sessao
  const k = Object.keys(M.casos).find((x) => M.casos[x].alimentacao != null && M.casos[x].moduloSerial === moduloSerial)
  return k && !mundo.casosConsumidos.includes(k) ? relidoDo(mundo, M.casos[k]).alimentacao : null
}
// os casos da Seção C que só a coluna monta (o herói no fluxo não muda):
// o GPS fraco, a entrada que não bate e o modem sem sinal, no módulo da sessão
function casoDaC(mundo, campo) {
  const k = mundo.casos.find((x) => M.casos[x]?.[campo] != null && M.casos[x].moduloSerial === mundo.sessao.moduloSerial)
  return k ? relidoDo(mundo, M.casos[k]) : null
}
// "13,8 V" → { texto: '13,8', unidade: 'V', num: 13.8 }
function partes(lido) {
  if (lido == null) return null
  const [texto, ...resto] = String(lido).split(' ')
  const num = Number(texto.replace(/\./g, '').replace(',', '.').replace('−', '-'))
  return { texto, unidade: resto.join(' ') || null, num, casas: (texto.split(',')[1] ?? '').length }
}
const dentro = (f, v) => v >= f.min && (f.max == null || v <= f.max)

// T13·5 · a escala do instrumento do item reprovado (09), pela regra escrita no
// tela.md: a alimentação numa régua de 5 em 5, um passo pra fora da faixa do
// modelo do módulo — o VL06, 9 a 40 V, na régua de 5 a 45, a faixa de 10% a
// 87,5% da barra (09, 29, 30, 34). As posições saem da conta. O GPS, as
// entradas e o modem não têm régua: o valor escrito (22, 24, 26)
export function escalaDo(id, faixa) {
  if (id === 'alimentacao') {
    const min = Math.floor(faixa.min / 5) * 5; const max = Math.ceil(faixa.max / 5) * 5
    return { min: min === faixa.min ? min - 5 : min, max: max === faixa.max ? max + 5 : max, passo: 5 }
  }
  return { min: faixa.min, max: faixa.max ?? faixa.min }
}

// ── o que cada seção lê ──
function passou(etapa) { return !!etapa && (etapa.daSemente || etapa.passaram === etapa.checagens) }
function confirmadosDaCadeia(etapas) { return etapas.cadeia?.confirmados ?? 0 }
// houve calibração na sessão: a T10 semeou ao menos uma grandeza neste ativo
function calibracaoDa(mundo) { const c = mundo.etapas.calibracao; return c && c.ativoId === mundo.sessao.ativoId ? c : null }
function calibrada(mundo) { return Object.keys(calibracaoDa(mundo)?.semeadas ?? {}).length > 0 }
// a grandeza pulada: a T10 a marcou em `puladas`, ou a calibração concluiu sem
// semear a que o modelo tem como opcional (o Pular o horímetro, decisão 52)
function pulada(mundo, g) {
  const c = calibracaoDa(mundo)
  if (!c || c.semeadas?.[g]) return false
  if ((c.puladas ?? []).includes(g)) return true
  const opcionais = M.calibracao.porModelo[modeloDe(mundo.sessao.ativoId)?.id]?.opcionais ?? []
  return !!c.concluida && opcionais.includes(g)
}
// E · o ciclo que a T14 gravou (etapas.ciclo), se é do ativo da sessão: cada
// passo pelo id do item da Seção E ('aprovada' · 'reprovada' · 'pendente')
function cicloDaSessao(mundo) {
  const c = mundo.etapas.ciclo
  return c && (!c.ativoId || c.ativoId === mundo.sessao.ativoId) ? c : null
}
function passoDoCiclo(mundo, item) {
  if (mundo.registro.homologada) return 'aprovada' // só se homologa com o ciclo feito
  const c = cicloDaSessao(mundo)
  if (!c) return 'pendente'
  if (c.completo || c.concluido) return 'aprovada'
  return c.passos?.[item.id] ?? 'pendente'
}
// F · a fila desta sessão: os itens do ativo criados depois da abertura
// F falha quando o servidor diz que não: o ativo que ficou sem resposta
// (pronto-para-fechar), o evento de teste que não chegou no prazo (T14/02: 'A
// Seção F reprova.') ou um item desta sessão que o servidor recusou
function secaoFFalhando(mundo) {
  const pf = M.casos['pronto-para-fechar']
  if (pf && pf.ativoId === mundo.sessao.ativoId && pf.recebimento === 'sem resposta') return true
  return cicloDaSessao(mundo)?.evento === 'nao-chegou'
}

// ── cada item: o estado, o tipo da linha e o que ela diz ──
// estado: ok · ressalva · nsa (não se aplica) · pendente · aguarda · reprovado
// tipo: leitura (sem seta) · tocar (com seta, e o destino) · feito · ressalva
// destino: { tela } (a tela que resolve) · 'item' (a câmera do app, 07) · 'reprovado' (o 09)
const base = (item, c) => ({ id: item.id, secao: item.secao, nome: item.rotulo, tipo: 'leitura', ...c })
const lido = (item, valor, leitura) => base(item, { estado: 'ok', valor, ...(leitura ? { leitura } : {}) })
const LINHA_DO_DIAGNOSTICO = (id) => M.diagnostico.modulo.find((l) => l.id === id)
const MODEM_NA_REDE = LINHA_DO_DIAGNOSTICO('modem').heroi
const naoSeAplica = (item) => base(item, { estado: 'nsa', valor: T.vazio, apagado: true })
// o automático que falta leva à tela que resolve, pelo `origem` do mock (decisão 34)
const TELA_DA_ORIGEM = { conectar: 'T05', ativo: 'T06', can: 'T07', configurar: 'T09', calibracao: 'T10' }
const ICONE_DA_ORIGEM = { conectar: 'conectar', ativo: 'ativo', can: 'refazer', configurar: 'configurar', calibracao: 'calibracao' }
function falta(item) {
  const tela = TELA_DA_ORIGEM[item.origem]
  if (!tela) return base(item, { estado: 'aguarda', valor: T.vazio, apagado: true })
  return base(item, { estado: 'pendente', tipo: 'tocar', icone: ICONE_DA_ORIGEM[item.origem], legenda: T.aFazer, destino: { tela } })
}
// o que reprovou: com a leitura, a linha de leitura com o valor em vermelho e a
// seta, que abre o nível do item (09 · a 16: item automático
// reprovado tem a seta; passou, é leitura, sem seta); sem ela, a tela que resolve
function reprovou(item, valor, leitura) {
  if (leitura) return base(item, { estado: 'reprovado', valor, leitura, destino: 'reprovado' })
  return base(item, { estado: 'reprovado', tipo: 'tocar', legenda: valor, destino: { tela: TELA_DA_ORIGEM[item.origem] } })
}

// A · três itens: o chassi saiu (decisão 46)
function itemA(mundo, item) {
  const { sessao, etapas } = mundo
  const conectado = passou(etapas.preChecagem)
  const vinculado = etapas.ativo?.ativoId === sessao.ativoId
  if (item.id === 'a-serial') return conectado ? lido(item, sessao.moduloSerial) : falta(item)
  if (item.id === 'a-firmware') return conectado ? lido(item, moduloDe(sessao.moduloSerial)?.firmware) : falta(item)
  // o pacote de sincronização: o da empresa do contexto, com a data e a hora dele
  if (item.id === 'a-pacote') {
    const p = pacoteDaEmpresa(mundo.empresaId ?? M.contextoAtivo.empresaId)
    return p ? lido(item, T.dataDoPacote(p.data, p.hora)) : falta(item)
  }
  return vinculado ? lido(item, ativoDe(sessao.ativoId)?.placa) : falta(item)
}

// B · o Painel é foto a tirar, como os outros quatro (decisão 52); sem calibração na
// sessão ele nem aparece (itensDeB). A linha no formato
// das outras seções (lei 23) — a leitura de 44, o nome à esquerda e o estado à direita
// (*foto a tirar*, com a câmera no poço e a seta; *com ressalva*, com o check) · o motivo
// da ressalva sai da linha e fica onde é anotado e revisto (08 e 15)
function itemB(mundo, item) {
  const { registro } = mundo
  const b = (c) => base(item, { pergunta: item.pergunta, ...c })
  if (registro.ressalvas[item.id]) return b({ estado: 'ressalva', valor: T.comRessalva, valorDeEstado: true })
  // a foto tirada aqui: o check, e nenhum texto aprovado diz de onde ela veio
  if (registro.fotos[item.id]) return b({ estado: 'ok' })
  return b({ estado: 'pendente', icone: 'camera', valor: T.fotoATirar, valorDeEstado: true, destino: 'item' })
}

function itemC(mundo, item) {
  const { etapas } = mundo
  const L = M.leituraNominalModulo
  // a alimentação: a tensão que o módulo lê no fio de alimentação,
  // contra a faixa do modelo do módulo (o VL06, 9,0 a 40,0 V) · o herói, a do diagnóstico (24,3 V)
  if (item.id === 'c-alimentacao') {
    if (!passou(etapas.preChecagem)) return falta(item)
    const ft = modeloDoModulo(mundo.sessao.moduloSerial)?.faixaTensao
    if (!ft) return naoSeAplica(item)
    const p = partes(alimentacaoDoCaso(mundo) ?? LINHA_DO_DIAGNOSTICO('alimentacao').heroi)
    if (!p || !Number.isFinite(p.num)) return reprovou(item, T.vazio, null)
    const sinal = { id: 'alimentacao', faixa: { min: ft[0], max: ft[1] } }
    const valor = [p.texto, p.unidade].filter(Boolean).join(' ')
    return dentro(sinal.faixa, p.num) ? lido(item, valor, { sinal, ...p }) : reprovou(item, valor, { sinal, ...p })
  }
  // o GPS (decisão 60): o critério é a posição — com posição aprova, sem posição reprova —, e
  // os satélites e a antena ficam como informação, na frase do detalhe (*0 satélites · antena
  // conectada*, 22) · o herói, com posição (a leitura nominal), com os satélites do diagnóstico ·
  // o caso da coluna (gps-fraco) e as releituras dele trocam a posição e os satélites · a antena
  // fica dentro do módulo: em curto ou desconectada é defeito do módulo, e o item diz *antena com
  // defeito* (a regra do tela.md, sem referência e sem caso no mock; o O que conferir de trocar o
  // módulo não tem texto, e o detalhe fica sem ele)
  if (item.id === 'c-gps') {
    if (!passou(etapas.preChecagem)) return falta(item)
    const caso = casoDaC(mundo, 'posicao') ?? casoDaC(mundo, 'antena')
    const posicao = caso?.posicao ?? L.posicao
    const satelites = caso?.satelites ?? partes(LINHA_DO_DIAGNOSTICO('gps').info).num
    const antena = caso?.antena ?? T.antenaConectada
    const frase = T.infoDoGps(satelites, antena)
    if (antena !== T.antenaConectada) {
      return reprovou(item, T.antenaComDefeito, { texto: T.antenaComDefeito, frase, satelites, ainda: T.ainda(T.antenaComDefeito), defeito: true })
    }
    const leitura = { texto: posicao, frase, satelites, ainda: T.ainda(posicao) }
    return posicao === T.comPosicao ? lido(item, posicao, leitura) : reprovou(item, posicao, leitura)
  }
  if (item.id === 'c-entradas') {
    if (etapas.ativo?.ativoId !== mundo.sessao.ativoId) return falta(item)
    // a entrada que não bate: o que o módulo leu e o esperado, sem régua
    const caso = casoDaC(mundo, 'entradas')
    if (caso) {
      const [entrada] = Object.keys(caso.entradas).filter((k) => k !== 'esperado')
      const valor = T.entradaLida(T.entradas[entrada], caso.entradas[entrada])
      // relida e batendo com o esperado (32): conforme, e o detalhe diz o lido
      if (caso.entradas[entrada] === caso.entradas.esperado) return lido(item, T.conforme, { texto: valor })
      return reprovou(item, valor, { texto: valor, frase: T.esperadoDaEntrada(caso.entradas.esperado), ainda: T.entradaAinda(T.entradas[entrada], caso.entradas[entrada]) })
    }
    return L.entradasUsadas <= L.entradasTotal ? lido(item, T.conforme) : reprovou(item, `${L.entradasUsadas} ${T.de(L.entradasTotal)}`, null)
  }
  // o modem e o sinal: a palavra, sem o dBm (decisão 34, T13-N5)
  if (!passou(etapas.preChecagem)) return falta(item)
  // o modem sem sinal (o caso da T07/07): a palavra e o porquê, sem régua
  const modem = casoDaC(mundo, 'modem')
  // relido na rede (33): o que o diagnóstico lê no módulo que está bem (o `heroi` da T07)
  if (modem && modem.modem === MODEM_NA_REDE) return lido(item, T.sinalBom, { texto: modem.modem })
  if (modem) return reprovou(item, modem.modem, { texto: modem.modem, frase: T.semAlcance, ainda: T.ainda(modem.modem) })
  return dentro(L.modemFaixa, L.modemDbm) ? lido(item, T.sinalBom) : reprovou(item, T.vazio, null)
}

// D · o que a cadeia gravou, pelo conteúdo de cada bloco (decisão 49 — o módulo não
// guarda versão), lido pela mesma conta da T09 (conteudoDo, src/telas/T09/cadeia.js, a
// mesma da T11 e da T16): o modelo do ativo, as regiões, os fios do leitor do cadastro
// do modelo, o intervalo dos eventos e a operadora com a APN do chip (decisão 59) · o
// bloco gravado confere quando o conteúdo dele existe no cadastro do par, e a linha diz
// *confere*, como as referências (T13/04) · a Limpeza não tem conteúdo: um comando só
function itemD(mundo, item) {
  // uma linha por bloco, cada uma confere · depois, o autoteste do
  // próprio módulo, o canal de programação protegido e o ID que confere com o cadastro
  const { etapas, sessao } = mundo
  const conf = confirmadosDaCadeia(etapas)
  const { ordem } = M.cadeia
  const gravou = (bloco) => conf > ordem.indexOf(bloco)
  const conteudo = conteudoDo({ ativoId: sessao.ativoId, moduloSerial: sessao.moduloSerial })
  const confere = (bloco) => gravou(bloco) && (bloco === 'limpeza' || conteudo[bloco] != null)
  const [tipo, alvo] = String(item.fonte).split(':')
  // o Autoteste roda no encerramento, depois de Finalizar — até lá a linha
  // diz *roda ao encerrar*, com o relógio, e não conta (o `conta: false` do mock)
  if (item.conta === false) return base(item, { estado: 'espera', valor: item.valor, naoConta: true })
  if (tipo === 'bloco') {
    // o bloco deixado para depois numa manutenção: revisar em seguida, com o motivo e o Reenviar (43)
    const pendente = faltaReenviarDe(etapas).find((x) => x.bloco === alvo)
    if (pendente && gravou(alvo)) {
      return base(item, { estado: 'revisar', bloco: alvo, linhas: [{ texto: T.revisarEmSeguida, tom: 'forte' }, { texto: motivoDe(alvo, pendente.por) }] })
    }
    return confere(alvo) ? { ...lido(item, T.confere), conteudo: conteudo[alvo] ?? null } : falta(item)
  }
  if (item.fonte === 'canal') return gravou('conexao') ? lido(item, item.valor) : falta(item)
  return gravou('conexao') ? lido(item, T.confere) : falta(item)
}

// E · leitura só: o passo aprovado diz 'confere'; o que falta, 'a fazer'. A
// ação da seção é uma só, o Fazer o ciclo de testes (T13·4, HU-T13-8)
function itemE(mundo, item) {
  // o bip do leitor: respondido aqui, com o Testar bip — ouvido confere; não ouvido é não
  // conforme, com o campo do que aconteceu, e só conta com ele escrito (HU-T13-4, decisão 64): sem
  // o texto, ainda não conta (*não ouvi*, o xis, a 42); escrito, conta (*não ouvi · com ressalva*, o
  // check, a 50) · respondido, a resposta desce pra baixo do nome, e o Testar de novo refaz (41, 42, 50)
  if (item.fonte === 'bip') {
    const bip = mundo.registro.bip
    const escrito = (mundo.registro.justificativas?.[item.id] ?? '').trim() !== ''
    if (bip === 'ouvi') return base(item, { estado: 'ok', resposta: { texto: T.ouvi }, valor: T.ouvi, bip })
    if (bip === 'naoOuvi' && escrito) return base(item, { estado: 'naoConforme', resposta: { texto: T.naoOuviComRessalva }, valor: T.naoOuviComRessalva, bip, escrito })
    if (bip === 'naoOuvi') return base(item, { estado: 'naoOuvido', resposta: { texto: T.naoOuvi, tom: 'falha' }, valor: T.naoOuvi, bip })
    return base(item, { estado: 'pendente', bip: null })
  }
  const passo = passoDoCiclo(mundo, item)
  if (passo === 'aprovada') return lido(item, T.confere)
  // o cartão que o técnico disse que não confere (T14/10): não conforme, com a justificativa aqui
  if (passo === 'reprovada' && cicloDaSessao(mundo)?.cartao?.resposta === 'reprovada') {
    return base(item, { estado: 'naoConforme', valor: T.naoConfere, cartao: true })
  }
  // *a fazer* em --tinta (as referências acendem o que o técnico ainda faz)
  return base(item, { estado: passo === 'reprovada' ? 'reprovado' : 'pendente', valor: T.aFazer })
}

// F · leitura só, sem ação: espera o servidor. Homologado, o relatório está na
// fila e ela confere; nenhuma referência desenha os itens assim, e os
// valores saem do mock
function itemF(mundo, item) {
  // a posição e o evento de teste — esperando, confere ou não chegou ·
  // como as referências desenham, o servidor confirma depois do Finalizar (a 11: *o servidor
  // confirmou*); antes, esperando, mesmo com o ciclo feito (a 13) · falhando (a 49, decisão 64), a F
  // diz a causa e leva à tela que corrige: a Posição confere, e o Evento de teste *não chegou ao
  // servidor*, com o Disparar de novo, que leva ao ciclo (T14)
  if (secaoFFalhando(mundo)) {
    if (item.fonte === 'servidor:evento') return base(item, { estado: 'reprovado', resposta: { texto: T.naoChegouAoServidor, tom: 'falha' }, valor: T.naoChegou, disparar: true })
    return { ...lido(item, T.confere), destaque: 'nome' }
  }
  return mundo.registro.homologada ? lido(item, T.confere) : base(item, { estado: 'aguarda', valor: T.esperando, apagado: true })
}

// quem age, embaixo do nome da seção (decisão 34): o
// que o app confere, o que o técnico fotografa, o ciclo, o servidor. Com 1, o
// singular (*você fotografa 1 item*, *1 foto
// tirada*). O que ele fotografa conta os itens da seção, não os que faltam (a
// T13/12: com o Módulo salvo com ressalva, *você fotografa 5 itens*).
// As fotos tiradas contam o item fotografado aqui e o salvo com a
// ressalva, que tem a foto do problema (decisão 39);
// sem nenhuma, a linha fica sem ela
function quemAgeDa(s, itens, homologada) {
  const feitos = itens.filter(resolvido).length
  if (s.natureza === 'automatico') return itens.some((c) => c.estado === 'lendo' || (c.estado === 'aguarda' && c.lendo)) ? T.lendoDoModulo : homologada ? T.appConferiu : T.appConfere
  if (s.natureza === 'manual') {
    if (itens.some((c) => c.estado === 'pendente')) return T.voceFotografa(itens.length)
    const fotos = itens.filter((c) => c.estado === 'ok' || c.estado === 'ressalva').length
    return fotos ? T.fotosTiradas(fotos) : null
  }
  if (s.natureza === 'dinamico') return feitos === itens.length ? T.cicloPassou : T.voceFazCiclo
  // a F falhando diz que não passou, e que não bloqueia (a 49)
  if (itens.some((c) => c.estado === 'reprovado')) return T.naoPassou
  return feitos === itens.length ? T.servidorConfirmou : T.esperaServidor
}

// ── o checklist inteiro: os itens, as seções, a contagem e o que falta ──
// o não conforme da E (o bip não ouvido, o cartão que não confere) está respondido:
// conta como feito, com o xis e o que aconteceu, e não reprova a seção
export const resolvido = (c) => c.estado === 'ok' || c.estado === 'ressalva' || c.estado === 'nsa' || c.estado === 'naoConforme'
// o leitor do ônibus da sessão: o do cadastro do modelo, menos quando o caso da coluna o
// tira (`leitor: false` — o can-estatico-bateria, o ônibus da bateria fraca que a T13/16 desenha
// sem leitor: 3 fotos e 23 itens)
const leitorDa = (mundo) => ((mundo.casos ?? []).some((k) => M.casos[k]?.leitor === false && M.casos[k].ativoId === mundo.sessao.ativoId)
  ? null : modeloDe(mundo.sessao.ativoId)?.leitor)
// cada item só quando se aplica — o leitor, o buzzer dele, a rotação
// na CAN do modelo do ativo, e as pendências só com o ID reescrito (nenhuma sessão do mock reescreve)
const CONDICAO = {
  leitor: (mundo) => !!leitorDa(mundo),
  buzzer: (mundo) => !!leitorDa(mundo)?.buzzer,
  rotacao: (mundo) => !!modeloDe(mundo.sessao.ativoId)?.sinaisCan?.some((x) => x.id === 'rotacao'),
  reescritaId: () => false,
}
const seAplica = (mundo, i) => !i.condicao || !CONDICAO[i.condicao] || CONDICAO[i.condicao](mundo)
// os itens de B que existem nesta sessão: o Painel só quando houve calibração —
// sem ela, a B do herói tem 4 (Módulo, Lado de cima, Chicote e Leitor) —, e o Leitor só com leitor
// no ônibus (o da bateria fraca, sem leitor, tem 3: T13/16)
export const itensDeB = (mundo) => itensDa('B').filter((i) => (i.condicao !== 'calibracao' || calibrada(mundo)) && seAplica(mundo, i))
const itensDaSessao = (mundo, s) => (s === 'B' ? itensDeB(mundo) : itensDa(s).filter((i) => seAplica(mundo, i)))
// quantos passos o ciclo da T14 tem nesta sessão (a ação da E: *até 4 passos*)
const passosDoCiclo = (mundo) => itensDaSessao(mundo, 'E').filter((i) => i.origem === 'ciclo').length
export function checklist(mundo) {
  const porSecao = {}
  for (const s of ['A', 'B', 'C', 'D', 'E', 'F']) {
    porSecao[s] = itensDaSessao(mundo, s).map((item) => (
      s === 'A' ? itemA(mundo, item) : s === 'B' ? itemB(mundo, item) : s === 'C' ? itemC(mundo, item) : s === 'D' ? itemD(mundo, item)
        : s === 'E' ? itemE(mundo, item) : itemF(mundo, item)
    ))
  }
  // a Seção D lida bloco a bloco ao abrir o checklist (T13/38): `dLidos` diz quantos já
  // chegaram — o seguinte está lendo, e os outros esperam; null, todos lidos
  if (mundo.dLidos != null) {
    porSecao.D = porSecao.D.map((c, i) => (c.estado !== 'ok' || i < mundo.dLidos ? c
      : i === mundo.dLidos ? { ...c, estado: 'lendo', valor: T.lendo, leitura: undefined }
        : { ...c, estado: 'aguarda', valor: T.vazio, apagado: true, lendo: true }))
  }
  // o que conta: tudo menos o Autoteste da D, que roda ao encerrar
  const contam = (lista) => lista.filter((c) => !c.naoConta)
  const total = contam(Object.values(porSecao).flat()).length
  const homologada = !!mundo.registro.homologada
  const secoes = SECOES.map((s) => {
    const itens = porSecao[s.id]
    const feitos = contam(itens).filter(resolvido).length
    let estado
    if (itens.some((c) => c.estado === 'reprovado')) estado = 'reprovada'
    else if (itens.some((c) => c.estado === 'lendo' || c.lendo)) estado = 'lendo'
    else if (feitos === contam(itens).length) estado = 'aprovada'
    else estado = s.natureza === 'servidor' ? 'aguarda' : 'pendente'
    // a E tem uma ação só, enquanto falta passo do ciclo: Fazer o ciclo de testes → T14
    const faltaPasso = itens.some((c) => c.estado !== 'ok' && c.estado !== 'naoConforme' && itemDe(c.id).origem === 'ciclo')
    const acao = s.natureza === 'dinamico' && faltaPasso
      ? { nome: T.fazerCiclo, legenda: T.osPassos(passosDoCiclo(mundo)), icone: 'ciclo', destino: { tela: 'T14' } }
      : null
    return { ...s, itens, feitos, total: contam(itens).length, estado, quemAge: quemAgeDa(s, contam(itens), homologada), acao }
  })
  const todos = contam(secoes.flatMap((s) => s.itens))
  const feitos = todos.filter(resolvido).length
  const faltam = secoes.filter((s) => s.bloqueia).reduce((n, s) => n + s.total - s.feitos, 0)
  // o contador do menu (T04·2): B e E, os que o técnico resolve, ainda por resolver
  const pendentesDoMenu = secoes.filter((s) => s.natureza === 'manual' || s.natureza === 'dinamico').reduce((n, s) => n + s.total - s.feitos, 0)
  // o Finalizar desligado diz por quê: a D ainda sendo lida, um item
  // automático reprovado (a seção dele), ou quantos obrigatórios faltam
  const lendo = secoes.find((x) => x.estado === 'lendo' && x.natureza === 'automatico')
  const comReprovado = secoes.find((x) => x.bloqueia && x.natureza === 'automatico' && x.estado === 'reprovada')
  // o bloco deixado para depois desliga o Finalizar, com a causa embaixo (43)
  const aReenviar = porSecao.D.filter((c) => c.estado === 'revisar').map((c) => c.bloco)
  const falhandoF = secaoFFalhando(mundo)
  // com o que bloqueia resolvido e a F falhando, o Finalizar acende e diz o que ele pede: a ciência (a 49)
  const motivo = lendo ? T.secaoSendoLida(lendo.id) : comReprovado ? T.secaoComReprovado(comReprovado.id)
    : aReenviar.length ? T.faltaReenviar(aReenviar) : faltam > 0 ? T.faltam(faltam)
      : falhandoF && !homologada ? T.secaoFPedeCiencia : null
  const bloqueiam = faltam + (lendo || comReprovado || aReenviar.length ? 1 : 0)
  // o bip: o momento da E aberta segue o estado dele · `bipComTexto`, o não ouvi com o que aconteceu escrito (o 50)
  const doBip = porSecao.E.find((c) => itemDe(c.id).fonte === 'bip')
  const bip = doBip?.bip ?? null
  return { secoes, porSecao, feitos, total, faltam, bloqueiam, motivo, pendentesDoMenu, falhandoF, bip, bipComTexto: !!doBip?.escrito, aReenviar }
}

// ── o nível do item manual (07, 08): a posição, os segmentos e o que vem depois ──
export function nivelDoItem(ck, id) {
  const item = itemDe(id)
  const secao = ck.secoes.find((s) => s.id === item.secao)
  const i = secao.itens.findIndex((c) => c.id === id)
  const segmentos = secao.itens.map((c, k) => {
    if (k === i) return c.estado === 'reprovado' ? 'atual-falha' : 'atual'
    return resolvido(c) ? 'feito' : 'pendente'
  })
  const seguinte = secao.itens.slice(i + 1).find((c) => !resolvido(c))
  return { item, secao, posicao: i + 1, total: secao.total, segmentos, depois: seguinte ? itemDe(seguinte.id).pergunta : null }
}
// o primeiro manual por resolver (o 07 e o 08 abertos pela URL ou pelo palco)
export const primeiroPendente = (ck, s = 'B') => ck.porSecao[s].find((c) => c.estado === 'pendente')?.id ?? itensDa(s)[0].id
// o próximo por resolver depois de um, na ordem da seção (o 'Depois:')
export const proximoPendente = (ck, id) => {
  const s = itemDe(id).secao; const lista = ck.porSecao[s]; const i = lista.findIndex((c) => c.id === id)
  return [...lista.slice(i + 1), ...lista.slice(0, i)].find((c) => c.estado === 'pendente')?.id ?? null
}

// ── o item reprovado (09): o instrumento pela regra da T13·5 e a frase ──
export function instrumentoDoItem(c) {
  // o que não é número (o GPS, as entradas e o modem): o valor escrito e o porquê, sem régua
  // `ainda`: o que ainda falta, na frase do não resolvido (34 a 37)
  if (!c.leitura.sinal) return { texto: c.leitura.texto, frase: c.leitura.frase, ainda: c.leitura.ainda }
  // a alimentação (09, 29, 30, 34): a régua de 5 a 45, as divisões de 5 em 5 e as duas marcas fortes na faixa
  const { sinal, texto, unidade, num, casas } = c.leitura
  const f = sinal.faixa
  const e = escalaDo(sinal.id, f)
  const dif = num < f.min ? f.min - num : null
  return {
    valor: texto, unidade,
    escala: { min: e.min, max: e.max, valor: num, faixa: { de: f.min, ate: f.max ?? e.max }, divisoes: e.passo ? (e.max - e.min) / e.passo : Math.round(e.max - e.min), fortes: [f.min, f.max ?? e.max] },
    legendas: { min: decimal(e.min, casas), faixa: T.faixa(decimal(f.min, casas), decimal(f.max ?? e.max, casas)), max: decimal(e.max, casas) },
    frase: dif != null ? T.abaixo(decimal(dif, casas), unidade) : null,
    ainda: dif != null ? T.ainda(T.abaixo(decimal(dif, casas), unidade)) : null,
  }
}

// ── o que o Finalizar gera (HU-T13-7): o relatório da instalação na fila,
// criado agora (14:30), o que a Seção F desta sessão lê ──
export function filaDoFinalizar(mundo) {
  const { ativoId } = mundo.sessao
  // as evidências e o checklist (os tipos da fila do mock · a fila de envio é da T15)
  const tipos = M.tiposFila.filter((t) => /^(Evidências|Checklist)/.test(t.tipo)).map((t) => t.tipo)
  return tipos.map((tipo, i) => ({
    id: `sessao-${ativoId}-${i + 1}`, tipo, ativoId, diasAtras: 0, data: M.diasAntes(0), criadoAs: HORA, estado: 'na-fila',
  }))
}
