// T09 · Configurar módulo (02-telas/T09-configurar-modulo): grava no módulo o
// que ele precisa — as seis etapas da cadeia, na instalação nova; um bloco, na
// manutenção —, uma de cada vez, cada uma relida antes da próxima. Enquanto a
// Conexão não grava, o técnico não sai.
// · A entrada (decisão 47): a tela abre parada, pelo modo que o vínculo
//   decidiu (etapas.ativo.modo, a T06). Na instalação nova, o que vai ser gravado
//   (05): a limpeza em primeiro, dizendo o que faz (zera o módulo, e a rede volta no
//   último passo · decisão 58), os blocos com o conteúdo do par, e as duas
//   pré-condições — os pinos e o espaço, calculado sobre o que vai ser gravado. Se
//   o que vai ser gravado passa da capacidade do módulo, numa das cinco dimensões
//   (06, os contadores; 07, os pontos de cerca com os cartões), a gravação não começa:
//   o aviso fica no lugar das duas linhas de checagem, e o Procurar outro módulo abre
//   o diálogo Encerrar antes de terminar? (a sessão está aberta: o módulo não troca),
//   e encerrada a sessão, segue pra busca (T05/01). Pelo Reenviar tudo, menos a conexão
//   da T11, o que vai ser gravado sem a Conexão (30): a limpeza de configuração, e a
//   cadeia fecha nos cinco. Na manutenção, o escolher o bloco (08; pelo menu, sem
//   bloco, a 28). Aberta com a cadeia em curso (o Retomar da T16), segue da etapa em
//   que parou; concluída, abre concluída. O endereço acompanha o quadro (05, 08).
// · Gravar no módulo, com mensagens que o módulo ainda não enviou (o número que o
//   diagnóstico leu), abre antes a folha das mensagens (27): Esperar o envio fecha e
//   fica no 05, com a linha do envio (29, parada em 5 de 12: o mock não tem o ritmo do
//   envio), e o Gravar no módulo abre a folha de novo com as que faltam; Gravar mesmo
//   assim fecha, e a cadeia começa depois que a folha desce. Sem mensagens, a cadeia
//   começa direto. Só na instalação nova.
// · A cadeia corre sozinha, etapa por etapa (decisão 57), na ordem canônica do mock
//   (M.cadeia.ordem), em passos de RITMOS.cadeiaPassoMs (cadeia.js · avanca): cada
//   etapa grava, com a barra e a contagem na unidade dela, e relê (*conferindo*), na
//   mesma barra; conferida, entra o check e o que ela gravou, e a seguinte começa no
//   mesmo passo. A Limpeza é um comando só, sem releitura; a Conexão gravada espera
//   o servidor (11), e o sim fecha a cadeia (04). O contador ao lado do título conta
//   as etapas que conferiram. O endereço acompanha a etapa (21 a 26, a 00 é o
//   Leitor, 11, 04). As 21 a 26 e a 00 pelo endereço, pela coluna e no print abrem
//   paradas no valor da referência (cadeia.js · QUADROS); ao vivo, a etapa anda pelos
//   passos dela.
// · Cada elo mostra o conteúdo do bloco no par da faixa, do cadastro dele (o do
//   caso, nunca o do herói · decisão 49): antes de gravar, o que vai ser gravado;
//   pronto, o que gravou.
// · A concluída (04): o espaço da faixa abre embaixo da linha dos pinos, e a faixa
//   *CONFERIDO NO MÓDULO · 6 passos* esmaece no lugar; o contador vira lima. Nada
//   rola sozinho: a cadeia cabe na tela. Ler a CAN → T07, a CAN lida, e de lá a
//   calibração; o ativo sem sinal na biblioteca da CAN, Calibrar → T10; sem a Conexão
//   (o reenvio da T11), Voltar ao menu. O *ainda não* do servidor (12) fica no estado
//   único, e o Conferir de novo pede a prova outra vez (11).
// · Tentar sair no meio (ENCERRAR, ou o Voltar ao menu com a cadeia parada) →
//   a recuperação, até a Conexão gravar; nela, o ENCERRAR não faz nada.
//   Continuar a gravação retoma da mesma contagem. Antes de gravar (05 a 08) e
//   depois da Conexão, o ENCERRAR é o de sempre: antes de homologar, o diálogo
//   Encerrar antes de terminar? por cima da tela (decisão 36), e a sessão abortada;
//   depois, o encerramento. Na cadeia curta, ele fica apagado, como o voltar
//   (lei 17): a recuperação não se aplica, e o processo termina sozinho. No
//   recusado de novo (31), o ENCERRAR e o voltar abrem a folha que grava só a
//   conexão (32); confirmada, só a Conexão grava, e espera o servidor (33), e a
//   sessão abortada roda os 4 passos (T16/03).
// · Os estados da coluna, parados, pela receita: o 01 pelo caso bloco-recusado,
//   o 02 e o 03 pelo queda-na-cadeia, o 06 pelo conteudo-nao-cabe, o 07
//   pelo pool-esgotado, o 12 pelo servidor-ainda-nao, o 27 pelo mensagens-pendentes, o
//   31 pelo bloco-recusado-de-novo e o 35 pelo modulo-nao-voltou, cada um na sessão do
//   caso. No fluxo, a recusa e a queda param a cadeia uma vez (a recusa de novo, duas),
//   quando o par da faixa é o do caso; as travas do envio são a regra do cadastro, e
//   valem toda vez. Tentar de novo refaz a etapa recusada; Reconectar retoma da mesma
//   contagem (HU-T09-7, 8).
// · O estado muda o conteúdo; onde a referência remonta (a altura do elo, o
//   contador, as linhas de checagem que o aviso das travas substitui), ela é fiel.
// · O movimento, o mesmo vocabulário das outras telas, e nada ao abrir:
//   - a cadeia só corre depois da troca que a trouxe: no Gravar no módulo e no
//     Reenviar, o quadro troca inteiro e o conteúdo esmaece, como entre telas, e o
//     primeiro passo vem depois do esmaecer; pelo endereço, logo;
//   - a barra da etapa anda um trecho linear por passo, só por scaleX, e a contagem e o
//     *faltam* trocam no lugar; na releitura, a barra volta ao zero direto e anda de novo
//     (a peça, cadeia gravando);
//   - a etapa conferida: o check esmaece no poço, a linha do que gravou entra no lugar da
//     barra, esmaecendo, e o trilho acende de cima pra baixo (a Cadeia e o Trilho);
//   - o aviso que nasce ao vivo — a recuperação, e a recusa e a queda — esmaece no
//     lugar, em 150 (Aviso · surge); o espaço, a altura dos elos e o contador trocam direto;
//   - a faixa da cadeia concluída na frente de quem olha esmaece no lugar, em 200;
//   - o primário que acende — a cadeia que conclui ou para, e a recuperação —
//     acende com o texto da saída: o texto novo esmaece no lugar, e o roxo troca
//     direto (a peça); o que se apaga (retomar) perde o roxo de uma vez, e o texto
//     novo esmaece no lugar;
//   - a folha das mensagens e a de confirmação sobem e descem como toda folha.
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Precondicao, Aviso, Cadeia, Rodape, Lista, LinhaEscolha, Veu,
  useFimDaTroca, useTrocaDeQuadro,
} from '../../ds/index.js'
import { usePresenca } from '../../ds/chrome/PorCima.jsx'
import { dependentesDe, temDependente, motivoDe, faltaReenviarDe, comFalta, reenviado, manutencaoDoCaso } from '../../estado/reenvio.js'
import { FolhaDeConfirmacao } from './FolhaDeConfirmacao.jsx'
import { Pergunta } from './Pergunta.jsx'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar, ENCERRAR_SEM_HOMOLOGAR } from '../../estado/encerrar.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import {
  REF, CASO_RECUSA, CASO_QUEDA, CASO_NAO_CABE, CASO_POOL, CASO_SERVIDOR, CASO_MENSAGENS, CASO_RECUSA_DE_NOVO, CASO_NAO_VOLTOU,
  ENVIADAS_DO_QUADRO, ORDEM, TOTAL, CONEXAO, QUADROS, CURTA,
  BLOCOS_DA_MANUTENCAO, rotuloDe, placaDe, parDoCaso, paradaDoCaso, casoDoPar,
  conteudoDo, envioDo, travaDo, emManutencao, depoisDaCurta, elosDo, elosDaCurta, avanca, etapaDa, momentoDaEtapa,
  passosDa, unidadesDo, mensagensDo, PASSOS_SERVIDOR,
  QUADRO_DA_MANUTENCAO, MOMENTO_DA_FOLHA, MOMENTO_DA_PERGUNTA,
} from './cadeia.js'
import { T } from './textos.js'
import './t09.css'

// o par módulo × ativo da sessão; sem sessão, o da semente
const parDaSessao = (s) => (s?.ativoId ? { ativoId: s.ativoId, moduloSerial: s.moduloSerial } : { ativoId: SEMENTES.T09.sessao.ativoId, moduloSerial: SEMENTES.T09.sessao.moduloSerial })

// o caso de cada estado da coluna (a receita)
const CASO_DO_ESTADO = {
  [REF.recusado]: CASO_RECUSA, [REF.queda]: CASO_QUEDA, [REF.recuperacao]: CASO_QUEDA,
  [REF.naoCabe]: CASO_NAO_CABE, [REF.cercasDemais]: CASO_POOL, [REF.semServidor]: CASO_SERVIDOR, [REF.mensagens]: CASO_MENSAGENS,
  // decisão 64: os quadros novos da coluna, cada um no caso dele
  [REF.recusadoDeNovo]: CASO_RECUSA_DE_NOVO, [REF.folhaSoConexao]: CASO_RECUSA_DE_NOVO, [REF.gravandoSoConexao]: CASO_RECUSA_DE_NOVO,
  [REF.naoVoltou]: CASO_NAO_VOLTOU, [REF.esperandoEnvio]: CASO_MENSAGENS,
}
// o caso que nasce de outro já vale o dele: a recusa de novo é depois da recusa, e a queda que não volta, da queda
const CONSUMIDOS_DO_CASO = { [CASO_RECUSA_DE_NOVO]: [CASO_RECUSA, CASO_RECUSA_DE_NOVO], [CASO_NAO_VOLTOU]: [CASO_QUEDA, CASO_NAO_VOLTOU] }
// a lista da T05, sem nada escolhido: aonde o Procurar outro módulo leva, depois dos 4 passos (decisão 64)
const T05_LISTA = '01-momento-nenhum-escolhido'

// a passada que começa: a gravação da etapa, do zero, parada até o primeiro passo
const DO_ZERO = { passada: 'gravando', passos: 0, anda: false, quadro: null }

// O quadro em que a tela abre. Num estado da coluna, o do caso, parado (a
// receita). Pelo endereço de um momento, o dele. Sem momento: no print, o quadro
// da 00 (o Leitor gravando); no fluxo, a cadeia de onde o estado único diz que ela
// está (o Retomar da T16), a concluída, ou — nada gravado ainda — a entrada pelo
// modo: o que vai ser gravado (05) ou o escolher o bloco (08).
//   fase · antes · escolher · gravando · servidor · recusado · pausado · recuperacao · concluida ·
//          semServidor · curta · curtaFeita
// os confirmados de cada fase da curta: a 09 é o quadro de 1 (a limpeza conferida, o bloco gravando)
const CONFIRMADOS_DA_CURTA = { escolher: 0, curta: 1, curtaServidor: 1, curtaFeita: CURTA }
function daManutencao(q, par, falta = null) {
  return {
    par, confirmados: CONFIRMADOS_DA_CURTA[q.fase], fase: q.fase, parou: null, bloco: q.bloco, folha: q.folha ?? null, decisoes: q.decisoes ?? {}, pai: null, faltaFixa: falta,
    ...DO_ZERO, quadro: q.quadro ?? null, servidor: q.servidor ?? null,
  }
}
function inicio(momento, est, unico) {
  // A manutenção da coluna consulta o caso inteiro, sem herdar bloco ou avanço do fluxo (a folha de
  // cada bloco, a pergunta pelos dependentes e o que ficou para depois)
  const parDaManutencao = parDoCaso('modulo-ja-deste-ativo')
  // o 19: o leitor deixado para depois é a pendência do caso, na lista do que falta
  if (est === REF.leitorDepois) return daManutencao(QUADRO_DA_MANUTENCAO[est], parDaManutencao, [{ bloco: 'leitor', por: 'cercas' }])
  if (QUADRO_DA_MANUTENCAO[est]) return daManutencao(QUADRO_DA_MANUTENCAO[est], parDaManutencao, [])
  // os quadros novos (decisão 64), pela coluna (o estado) ou pelo endereço e no print (o momento)
  const q = est ?? momento
  // a manutenção aberta pelo menu, sem nada escolhido (a 28, a consulta)
  if (q === REF.nadaEscolhido) return daManutencao({ fase: 'escolher', bloco: null }, parDaManutencao, [])
  // a Conexão reenviada esperando o servidor (a 34, a consulta): o último segundo da espera, como a 11
  if (q === REF.servidorNaManutencao) return daManutencao({ fase: 'curtaServidor', bloco: CONEXAO, servidor: PASSOS_SERVIDOR - 1 }, parDaManutencao, [])
  // o recusado de novo (31), a folha que confirma gravar só a conexão (32) e a Conexão gravando sozinha (33)
  if (q === REF.recusadoDeNovo || q === REF.folhaSoConexao || q === REF.gravandoSoConexao) {
    const p = paradaDoCaso(CASO_RECUSA_DE_NOVO)
    const base = { par: parDoCaso(CASO_RECUSA_DE_NOVO), confirmados: ORDEM.indexOf(p.bloco), ...DO_ZERO }
    if (q === REF.gravandoSoConexao) return { ...base, fase: 'gravando', so: CONEXAO, parou: null, quadro: QUADROS[REF.gravandoConexao].quadro }
    return { ...base, fase: 'recusado', parou: p.parou, deNovo: true, folha: q === REF.folhaSoConexao ? 'soConexao' : null }
  }
  // a queda que não volta no tempo limite do Reconectar (35): a cadeia parada como a 02
  if (q === REF.naoVoltou) {
    const p = paradaDoCaso(CASO_QUEDA)
    const par = parDoCaso(CASO_NAO_VOLTOU)
    const passos = Math.ceil((p.parouEm / unidadesDo(par)[p.bloco].total) * passosDa('gravando') - 1e-9)
    return { par, confirmados: ORDEM.indexOf(p.bloco), fase: 'pausado', parou: p.parou, naoVoltou: true, ...DO_ZERO, passos }
  }
  // o envio que o técnico espera (29): o que vai ser gravado do módulo com mensagens, e a linha do envio
  // (o número das mensagens é o do caso: pela coluna e pelo endereço, o diagnóstico não leu nada)
  if (q === REF.esperandoEnvio) return { par: parDoCaso(CASO_MENSAGENS), confirmados: 0, fase: 'antes', parou: null, esperando: true, mensagensDoQuadro: M.casos[CASO_MENSAGENS].mensagens, ...DO_ZERO }
  // o reenvio de tudo, menos a conexão (30, a consulta): o par que confere, e a Conexão fica como está
  if (q === REF.menosConexao) return { par: parDoCaso('conferencia-confere'), confirmados: 0, fase: 'antes', parou: null, semConexao: true, ...DO_ZERO }
  if (est === REF.faltaReenviar) {
    const falta = manutencaoDoCaso('falta-reenviar').faltaReenviar
    return daManutencao({ fase: 'escolher', bloco: falta[0].bloco }, parDaManutencao, falta)
  }
  // o bloco que a conferência (T11) ou o checklist (T13) pede vem escolhido, pelo estado; sem pedido,
  // o primeiro que ficou para depois, ou as cercas · `agora`: o técnico já confirmou na T11, e a curta corre
  const falta = faltaReenviarDe(unico.etapas)
  const pedido = unico.etapas.ativo?.bloco
  // pelo menu, sem pedido e sem pendência, nada escolhido (a 28): quem escolhe é o técnico (R-14)
  const bloco = pedido && T.reenviar[pedido] ? pedido : falta[0]?.bloco ?? null
  if (est === REF.recusado) {
    const p = paradaDoCaso(CASO_RECUSA)
    return { par: parDoCaso(CASO_RECUSA), confirmados: ORDEM.indexOf(p.bloco), fase: 'recusado', parou: p.parou, ...DO_ZERO }
  }
  // a 02 e a 03: a cadeia parada no Leitor, na contagem em que o link caiu (o parouEm do caso)
  if (est === REF.queda || est === REF.recuperacao) {
    const p = paradaDoCaso(CASO_QUEDA)
    const par = parDoCaso(CASO_QUEDA)
    const N = passosDa('gravando')
    const passos = Math.ceil((p.parouEm / unidadesDo(par)[p.bloco].total) * N - 1e-9)
    return { par, confirmados: ORDEM.indexOf(p.bloco), fase: est === REF.queda ? 'pausado' : 'recuperacao', parou: p.parou, ...DO_ZERO, passos }
  }
  if (est === REF.naoCabe || est === REF.cercasDemais) return { par: parDoCaso(CASO_DO_ESTADO[est]), confirmados: 0, fase: 'antes', parou: null, ...DO_ZERO }
  // a 27: o que vai ser gravado do módulo com mensagens por enviar, com a folha aberta por cima
  if (est === REF.mensagens) return { par: parDoCaso(CASO_MENSAGENS), confirmados: 0, fase: 'antes', parou: null, folha: 'mensagens', ...DO_ZERO }
  // a 12: a cadeia conferida, e o módulo do caso ainda não falou com o servidor — o caso
  // diz só o módulo, que é o do herói: o ônibus é o da semente
  if (est === REF.semServidor) return { par: { ativoId: SEMENTES.T09.sessao.ativoId, moduloSerial: M.casos[CASO_SERVIDOR].moduloSerial }, confirmados: TOTAL, fase: 'semServidor', parou: null, ...DO_ZERO }
  const par = parDaSessao(unico.sessao)
  if (QUADRO_DA_MANUTENCAO[momento]) return daManutencao(QUADRO_DA_MANUTENCAO[momento], par)
  if (emManutencao(unico) && pedido && unico.etapas.ativo?.agora) return daManutencao({ fase: 'curta', bloco }, par)
  if (emManutencao(unico) && pedido) return daManutencao({ fase: 'escolher', bloco }, par)
  // a 11: a Conexão gravada, e o módulo conferindo se falou com o servidor — o último segundo da espera (12 s)
  if (momento === REF.conferindoServidor) return { par, confirmados: TOTAL - 1, fase: 'servidor', parou: null, ...DO_ZERO, servidor: PASSOS_SERVIDOR - 1 }
  if (momento === REF.concluida) return { par, confirmados: TOTAL, fase: 'concluida', parou: null, ...DO_ZERO }
  if (momento === REF.antes) return { par, confirmados: 0, fase: 'antes', parou: null, ...DO_ZERO }
  // a cadeia gravando, parada no quadro: as 21 a 26 pelo endereço, e a 00 no print
  const quadro = QUADROS[momento] ?? (EM_QUADRO && !momento ? QUADROS['00-tela'] : null)
  if (quadro) return { par, fase: 'gravando', parou: null, ...DO_ZERO, ...quadro }
  const gravados = unico.etapas.cadeia?.confirmados
  // o reenvio de tudo, menos a conexão, que a T11 pediu (a 30): a cadeia fecha nos Eventos
  const semConexao = !!unico.etapas.cadeia?.semConexao
  const fecha = semConexao ? TOTAL - 1 : TOTAL
  // o pedido da T11 vale também num vínculo de manutenção: é a cadeia sem a Conexão, não um bloco
  const pedidoSemConexao = semConexao && !(gravados > 0)
  // na manutenção, o módulo já tem a configuração: a cadeia gravada não é a entrada — a lista é;
  // só uma cadeia que ficou pela metade retoma
  if (emManutencao(unico) && !pedidoSemConexao && !(gravados > 0 && gravados < fecha)) return daManutencao({ fase: 'escolher', bloco }, par)
  // a prova do servidor que não veio (a 12) fica no estado único: a T09 reaberta volta nela, com o Conferir de novo
  if (unico.etapas.cadeia?.servidor === 'ainda-nao' && !emManutencao(unico)) return { par, confirmados: TOTAL, fase: 'semServidor', parou: null, ...DO_ZERO }
  // a cadeia que ficou pela metade retoma na etapa que parou, do começo dela
  if (gravados > 0) return { par, confirmados: Math.min(gravados, fecha), fase: gravados >= fecha ? 'concluida' : 'gravando', parou: null, semConexao, ...DO_ZERO }
  return emManutencao(unico) && !pedidoSemConexao
    ? daManutencao({ fase: 'escolher', bloco }, par)
    : { par, confirmados: 0, fase: 'antes', parou: null, semConexao, ...DO_ZERO }
}

// o quadro desenhado: quando um vira o outro na frente de quem olha, o conteúdo esmaece
const QUADRO = { antes: 'antes', escolher: 'escolher', curta: 'curta', curtaServidor: 'curta', curtaFeita: 'curta' }
const quadroDa = (fase) => QUADRO[fase] ?? 'cadeia'
// o momento que o endereço diz em cada quadro de entrada: o que vai ser gravado (05), esperando o envio
// (29) ou sem a Conexão (30); o escolher o bloco (08), ou nada escolhido (28)
function momentoDaEntrada(f) {
  if (f.fase === 'antes') return f.esperando ? REF.esperandoEnvio : f.semConexao ? REF.menosConexao : REF.antes
  if (f.fase === 'escolher') return f.bloco ? REF.escolher : REF.nadaEscolhido
  return undefined
}
const CORRE = ['gravando', 'curta', 'curtaServidor', 'servidor']

export default function T09({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const [fluxo, setFluxo] = useState(() => inicio(momento, est, unico))
  const vivo = useRef(null)
  vivo.current = { fluxo, unico, momento }
  // o que nasce ao vivo: no fluxo, a tela abre gravando ou concluída — o aviso e a
  // faixa que aparecem depois são da frente de quem olha; no print e na coluna, parados
  const aoVivo = !EM_QUADRO && est == null
  const [abriuConcluida] = useState(() => fluxo.fase === 'concluida')
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })

  // o endereço acompanha o quadro da entrada: a T09 aberta pelo fluxo, sem momento,
  // passa a dizer o 05 ou o 08 — o ir que só acerta o endereço fica na mesma tela
  useEffect(() => {
    if (est != null) return
    const quer = momentoDaEntrada(vivo.current.fluxo)
    if (quer && vivo.current.momento !== quer) despachar({ tipo: 'ir', tela: 'T09', momento: quer })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // a cadeia anda um passo por batida (cadeia.js · avanca); para no print, num estado da
  // coluna e fora da gravação. Quando o par da faixa é o de um caso, a cadeia para nele,
  // uma vez só: a queda do link no Leitor, ou a recusa das Cercas. A curta anda as duas dela
  const correndo = !EM_QUADRO && est == null && CORRE.includes(fluxo.fase)
  // a cadeia só corre depois da troca que a trouxe; ao retomar e pelo endereço, logo
  const fimDaTroca = useFimDaTroca()
  useEffect(() => {
    if (!correndo) return undefined
    const batida = () => {
      const { fluxo: f, unico: u } = vivo.current
      if (!CORRE.includes(f.fase)) return
      const caso = f.fase === 'gravando' ? casoDoPar(f.par, u.casosConsumidos) : null
      const { fluxo: g, consumir } = avanca(f, f.par, caso)
      if (consumir) despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...u.casosConsumidos, consumir] } })
      // o dependente reenviado pela pergunta (a 20): conferido, ele sai do que falta, e a tela
      // volta à pergunta de onde saiu, com ele *confere · reenviado* — as ações dão lugar ao check
      if (g.fase === 'curtaFeita' && f.pai) {
        despachar({ tipo: 'mesclar', parcial: { etapas: reenviado(u.etapas, f.bloco) } })
        setFluxo({ ...g, bloco: f.pai.bloco, decisoes: { ...f.pai.decisoes, [f.bloco]: 'reenviado' }, pai: null, voltou: f.bloco })
        return
      }
      setFluxo(g)
    }
    let ligada = true, relogio = null
    fimDaTroca().then(() => { if (ligada) relogio = setInterval(batida, RITMOS.cadeiaPassoMs) })
    return () => { ligada = false; clearInterval(relogio) }
  }, [correndo, despachar]) // eslint-disable-line react-hooks/exhaustive-deps

  // cada etapa conferida da cadeia grava no estado único quantas conferiram (o módulo não
  // guarda versão, decisão 49); a cadeia curta, ao fim, o bloco que reenviou
  const quadro = quadroDa(fluxo.fase)
  useEffect(() => {
    if (est != null) return
    const u = vivo.current.unico
    if (fluxo.fase === 'curtaFeita') {
      // o bloco conferido sai do que falta reenviar, e entra no que já foi
      if (u.etapas.cadeia?.reenviado !== fluxo.bloco || faltaReenviarDe(u.etapas).some((x) => x.bloco === fluxo.bloco)) {
        despachar({ tipo: 'mesclar', parcial: { etapas: { ...reenviado(u.etapas, fluxo.bloco), cadeia: { ...(u.etapas.cadeia ?? {}), reenviado: fluxo.bloco } } } })
      }
      return
    }
    if (quadro !== 'cadeia' || fluxo.confirmados === 0 || fluxo.so) return
    // sem a Conexão (a 30), a marca fica com a contagem: a cadeia fecha nos Eventos, e concluída conta
    // também a Conexão que ficou como está, que está no módulo — quem lê os seis (o checklist, a T07) a vê
    // conferida · a prova do servidor que não veio (a 12) também fica, até o Conferir de novo
    const conta = fluxo.semConexao && fluxo.fase === 'concluida' ? TOTAL : fluxo.confirmados
    const marca = fluxo.semConexao ? { confirmados: conta, semConexao: true }
      : fluxo.fase === 'semServidor' ? { confirmados: fluxo.confirmados, servidor: 'ainda-nao' } : { confirmados: fluxo.confirmados }
    const c = u.etapas.cadeia ?? {}
    if (c.confirmados === marca.confirmados && !!c.semConexao === !!marca.semConexao && (c.servidor ?? null) === (marca.servidor ?? null)) return
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, cadeia: marca } } })
  }, [fluxo.confirmados, fluxo.fase, est, despachar]) // eslint-disable-line react-hooks/exhaustive-deps

  // o endereço acompanha a cadeia: a etapa da vez (21 a 26; a 00 é o Leitor), o servidor (11) e a
  // concluída (04) — e, na cadeia curta, a 09 e a pergunta de cada bloco (10, 14, 15)
  const etapa = fluxo.fase === 'gravando' ? etapaDa(fluxo) : null
  useEffect(() => {
    if (est != null) return
    // a curta conferida: a pergunta de cada bloco tem o seu quadro (10, 14, 15); a dos eventos e a da
    // conexão, que nenhuma referência desenha, ficam no endereço da curta
    // o leitor que volta reenviado à pergunta das cercas é a 20
    const daPergunta = fluxo.bloco === 'cercas' && fluxo.decisoes?.leitor === 'reenviado' ? REF.leitorReenviado : MOMENTO_DA_PERGUNTA[fluxo.bloco] ?? undefined
    // decisão 64: a só conexão é a 33 (gravando e esperando o servidor); a Conexão da manutenção esperando o
    // servidor, a 34; sem a Conexão, a concluída não tem quadro próprio (fica no endereço da cadeia); e os
    // quadros de entrada seguem o que mudou neles — o envio que o técnico espera (29), o bloco escolhido (28 → 08)
    const quer = fluxo.folha ? undefined
      : fluxo.fase === 'antes' || fluxo.fase === 'escolher' ? momentoDaEntrada(fluxo)
        : fluxo.so ? REF.gravandoSoConexao
          : fluxo.fase === 'concluida' ? (fluxo.semConexao ? undefined : REF.concluida) : fluxo.fase === 'curtaFeita' ? daPergunta
            : fluxo.fase === 'curtaServidor' ? REF.servidorNaManutencao
              : fluxo.fase === 'servidor' ? REF.conferindoServidor : fluxo.fase === 'gravando' ? momentoDaEtapa(etapa, fluxo.passada) ?? null : undefined
    if (quer !== undefined && (vivo.current.momento ?? null) !== quer) despachar({ tipo: 'ir', tela: 'T09', momento: quer })
  }, [fluxo.fase, fluxo.bloco, fluxo.decisoes, fluxo.folha, fluxo.esperando, fluxo.so, etapa, fluxo.passada, est, despachar])
  // gravada e conferida só a Conexão (a 33): o registro do que ficou por gravar (o motivo, pro gestor), e os 4
  // passos da sessão abortada (T16/03) · o módulo zerado volta a falar com o servidor (HU-T09-10)
  useEffect(() => {
    if (est != null || fluxo.fase !== 'soFeita') return
    const u = vivo.current.unico
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, cadeia: { confirmados: fluxo.confirmados, soConexao: { recusado: ORDEM[fluxo.confirmados], porGravar: ORDEM.slice(fluxo.confirmados, -1) } } } } })
    despachar({ tipo: 'ir', tela: 'T16', momento: ENCERRAR_SEM_HOMOLOGAR })
  }, [fluxo.fase, est, despachar]) // eslint-disable-line react-hooks/exhaustive-deps
  // o pedido já confirmado (o `agora` da T11) vale uma vez: a curta já está correndo
  useEffect(() => {
    const u = vivo.current.unico
    if (est == null && u.etapas.ativo?.agora) despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, ativo: { ...u.etapas.ativo, agora: false } } } })
    if (est == null && fluxo.fase === 'curta' && vivo.current.momento !== REF.reenviando) despachar({ tipo: 'ir', tela: 'T09', momento: REF.reenviando })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // a troca de quadro: o que vai ser gravado → a cadeia, o escolher → a curta
  useTrocaDeQuadro(quadro)

  // os toques. Num estado da coluna o celular não toca; se tocasse, o quadro
  // vira fluxo na sessão do caso, e a recusa e a queda ficam consumidas
  function paraOFluxo() {
    if (est == null) return
    const u = vivo.current.unico
    const caso = CASO_DO_ESTADO[est]
    const parcial = { sessao: { ...(u.sessao ?? SEMENTES.T09.sessao), ...fluxo.par } }
    const consumidos = CONSUMIDOS_DO_CASO[caso] ?? (caso === CASO_RECUSA || caso === CASO_QUEDA ? [caso] : [])
    const novos = consumidos.filter((k) => !u.casosConsumidos.includes(k))
    if (novos.length) parcial.casosConsumidos = [...u.casosConsumidos, ...novos]
    despachar({ tipo: 'mesclar', parcial })
    ir('T09')
  }
  // Gravar no módulo: a cadeia, pela Limpeza; o endereço passa à 21 (o efeito do endereço)
  function gravar() {
    setFluxo((f) => ({ ...f, fase: 'gravando', confirmados: 0, parou: null, folha: null, esperando: false, ...DO_ZERO }))
  }
  // com mensagens que o módulo ainda não enviou, a folha pergunta antes (27); sem, a cadeia · esperando o
  // envio (29), as que ainda faltam: a contagem fica no quadro da referência (sem ritmo, ENVIADAS_DO_QUADRO)
  const mensagens = fluxo.mensagensDoQuadro ?? mensagensDo(fluxo.par, unico.etapas, est)
  const porEnviar = fluxo.esperando ? Math.max(0, mensagens - ENVIADAS_DO_QUADRO) : mensagens
  function pedirGravacao() {
    if (porEnviar > 0) { setFluxo((f) => ({ ...f, folha: 'mensagens' })); return }
    gravar()
  }
  // Esperar o envio (decisão 64, a 29): a folha desce, e a linha do envio conta embaixo da do espaço · o
  // xis, tocar fora, arrastar e o voltar fazem o mesmo: o módulo envia sozinho, com ou sem a espera
  function esperarOEnvio() {
    setFluxo((f) => ({ ...f, folha: null, esperando: true }))
  }
  // Gravar mesmo assim: a folha desce, e a cadeia começa depois dela (o efeito da presença, embaixo)
  const gravarDepois = useRef(false)
  function gravarMesmoAssim() {
    paraOFluxo()
    gravarDepois.current = true
    setFluxo((f) => ({ ...f, folha: null }))
  }
  // Reenviar um bloco: a cadeia curta, pela limpeza só dele (09) · nenhum outro vai junto
  function reenviar(bloco) {
    setFluxo((f) => ({ ...f, bloco: bloco ?? f.bloco, fase: 'curta', confirmados: 0, parou: null, folha: null, decisoes: {}, pai: null, voltou: null, ...DO_ZERO }))
    ir('T09', { momento: REF.reenviando })
  }
  // o Reenviar de um dependente, na pergunta: a curta só dele, e a volta à mesma pergunta
  function reenviarDependente(b) {
    setFluxo((f) => ({ ...f, pai: { bloco: f.bloco, decisoes: f.decisoes }, bloco: b, fase: 'curta', confirmados: 0, parou: null, folha: null, decisoes: {}, voltou: null, ...DO_ZERO }))
    ir('T09', { momento: REF.reenviando })
  }
  // O bloco que tem dependente pede a confirmação antes (a folha, 13, 17 e
  // 18); o que não tem vai direto. A folha confirmada reenvia; o Cancelar só fecha
  function pedirReenvio() {
    const { bloco: b } = vivo.current.fluxo
    if (!temDependente(b)) { reenviar(b); return }
    setFluxo((f) => ({ ...f, folha: b }))
    ir('T09', { momento: MOMENTO_DA_FOLHA[b] })
  }
  // fechar a folha: a de confirmação volta ao escolher o bloco (08); a das mensagens fica no 05
  const fecharFolha = () => {
    const daFolha = vivo.current.fluxo.folha
    if (daFolha === 'mensagens') { esperarOEnvio(); return }
    setFluxo((f) => ({ ...f, folha: null }))
    // a de gravar só a conexão volta ao recusado de novo (31), que não tem endereço; a de confirmação, ao escolher (08)
    ir('T09', daFolha === 'soConexao' ? {} : { momento: REF.escolher })
  }
  // a pergunta pelos dependentes (10, 14, 15): Reenviar corre a curta dele, sem folha — a pergunta é
  // a confirmação; Deixar para depois marca *falta reenviar*, aqui, na T11 e na T13
  const deixar = (b) => {
    const de = vivo.current.fluxo.bloco
    setFluxo((f) => ({ ...f, decisoes: { ...f.decisoes, [b]: 'depois' } }))
    if (est == null) despachar({ tipo: 'mesclar', parcial: { etapas: comFalta(vivo.current.unico.etapas, [{ bloco: b, por: de }]) } })
  }
  // sair da pergunta não perde nada: o que não foi decidido vira pendência
  function sairDaPergunta() {
    const { bloco: de, decisoes } = vivo.current.fluxo
    const abertos = dependentesDe(de).filter((b) => !decisoes[b]).map((b) => ({ bloco: b, por: de }))
    if (abertos.length && est == null) despachar({ tipo: 'mesclar', parcial: { etapas: comFalta(vivo.current.unico.etapas, abertos) } })
    ir('T04')
  }
  // Tentar de novo: a etapa recusada, do começo · Reconectar e Continuar a gravação: da mesma contagem
  function retomar() {
    paraOFluxo()
    setFluxo((f) => (f.fase === 'recusado' ? { ...f, fase: 'gravando', parou: null, deNovo: false, ...DO_ZERO } : { ...f, fase: 'gravando', parou: null, naoVoltou: false, anda: false }))
  }
  // recusado de novo (decisão 64, a 31): a saída que grava a Conexão antes de sair pergunta antes (a 32) — o
  // link, o ENCERRAR e o voltar abrem a mesma folha (HU-T09-10)
  function abrirSoConexao() {
    setFluxo((f) => ({ ...f, folha: 'soConexao' }))
    ir('T09', { momento: REF.folhaSoConexao })
  }
  // confirmado (a 33): só a Conexão grava, e os que ficam por gravar, pulados; com a prova do servidor, os 4 passos
  function gravarSoConexao() {
    paraOFluxo()
    setFluxo((f) => ({ ...f, folha: null, fase: 'gravando', so: CONEXAO, parou: null, deNovo: false, ...DO_ZERO }))
    ir('T09', { momento: REF.gravandoSoConexao })
  }
  // o *ainda não* se confere de novo (decisão 64, a 12): o técnico conferiu o chip e o lugar, e pede a prova de
  // novo — a Conexão volta a conferindo (a 11), e a cadeia fecha com o sim
  function conferirDeNovo() {
    paraOFluxo()
    setFluxo((f) => ({ ...f, fase: 'servidor', confirmados: TOTAL - 1, servidor: 0, parou: null, ...DO_ZERO, passada: null }))
  }
  // tentar sair antes da Conexão gravar: a recuperação, com a cadeia parada onde estava — o passo
  // em curso termina, e a barra para no fim dele
  function recuperar() {
    paraOFluxo()
    setFluxo((f) => ({ ...f, fase: 'recuperacao', parou: f.parou ?? 'pedido', passos: f.anda ? f.passos + 1 : f.passos, anda: false }))
  }
  const voltarAoMenu = () => ir('T04')
  // a cadeia concluída segue o caminho sem passar pelo menu (decisão 64, fluxos.md): a CAN que o bloco
  // do ativo acabou de liberar (HU-T07-5), lida na T07 (a 01), e de lá a calibração · o ativo cujo
  // modelo não tem sinal na biblioteca da CAN não tem o que ler: direto pra calibração (sem referência)
  const lerACan = () => ir('T07')
  const calibrar = () => ir('T10')
  // o ENCERRAR de sempre (decisão 36, src/estado/encerrar.jsx): antes de homologar,
  // o diálogo Encerrar antes de terminar? por cima desta tela; depois, direto, pra T16.
  // O Procurar outro módulo das travas do envio é o mesmo diálogo: com a sessão
  // aberta, o módulo não troca
  const enc = useEncerrar()
  const PRENDE = ['gravando', 'recusado', 'pausado']
  // os processos que terminam sozinhos: ali o ENCERRAR e o voltar não fazem nada (lei 17)
  const SOZINHO = ['recuperacao', 'curta', 'curtaServidor', 'servidor', 'soFeita']
  function encerrar() {
    const { fase, so, deNovo } = vivo.current.fluxo
    if (SOZINHO.includes(fase) || so) return
    // no recusado de novo, a folha que grava só a conexão, e não a recuperação, que esbarraria no bloco recusado
    if (fase === 'recusado' && deNovo) { abrirSoConexao(); return }
    if (PRENDE.includes(fase)) { recuperar(); return }
    // antes de gravar, e depois da Conexão: o ENCERRAR de cima
    enc.encerrar()
  }

  const { par, confirmados: k, fase } = fluxo
  // O voltar do Android (logica.md): antes de gravar (05 a 08), na concluída (04) e
  // na curta relida, o Voltar ao menu, a saída do rodapé; antes de a Conexão gravar —
  // correndo (00), recusado (01), pausado (02) —, a recuperação, como o Voltar ao menu
  // com a cadeia parada; na recuperação, que só oferece continuar, e na cadeia curta e no
  // servidor, que terminam sozinhos, não faz nada · com uma folha aberta, fecha a folha
  useVoltar(fluxo.folha ? fecharFolha : fase === 'recusado' && fluxo.deNovo ? abrirSoConexao : fluxo.so ? null
    : PRENDE.includes(fase) ? recuperar : SOZINHO.includes(fase) ? null
      : fase === 'curtaFeita' ? sairDaPergunta : voltarAoMenu)
  // o que ficou para depois: o do caso, numa consulta da coluna; o do estado único, no fluxo
  const falta = fluxo.faltaFixa ?? faltaReenviarDe(unico.etapas)
  const faltaDe = (b) => falta.find((x) => x.bloco === b)
  // as folhas (13, 17, 18 e 27): sobem e descem como toda folha; a que fecha fica desenhada até sair
  const folha = usePresenca(Boolean(fluxo.folha))
  const ultimaFolha = useRef(fluxo.folha)
  if (fluxo.folha) ultimaFolha.current = fluxo.folha
  // o Gravar mesmo assim: a cadeia começa quando a folha acaba de descer
  useEffect(() => {
    if (folha.montado || !gravarDepois.current) return
    gravarDepois.current = false
    gravar()
  }, [folha.montado]) // eslint-disable-line react-hooks/exhaustive-deps
  // a pergunta: nasce embaixo do check, ao vivo (a curta que acaba de conferir); pelo endereço, parada
  const [abriuNaPergunta] = useState(() => fluxo.fase === 'curtaFeita')

  const conteudo = conteudoDo(par)
  const bloco = ORDEM[k]
  // gravando só a conexão (a 33): a cadeia parada da recusa, com a Conexão gravando embaixo
  const parada = fase === 'recusado' || fase === 'pausado' || fase === 'recuperacao' || !!fluxo.so
  // sem a Conexão (a 30), a cadeia conta cinco: *N de 5*
  const total = fluxo.semConexao ? TOTAL - 1 : TOTAL
  const pinos = <Precondicao>{T.pinos}</Precondicao>

  let miolo
  let rodape
  // o rodapé da cadeia: o mesmo primário em toda fase — o texto que troca esmaece no lugar, e o
  // roxo troca direto; com o mesmo texto, acenderia por uma camada (a peça)
  const mov = { primarioAcende: true, primarioTrocaTexto: true }
  if (fase === 'antes') {
    // ── o que vai ser gravado (05, 27) e as travas do envio (06, 07): o aviso fica no lugar das
    // duas linhas de checagem, que somem, e a tela não rola ──
    const envio = envioDo(par)
    const trava = travaDo(envio)
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.titulo} />
        {trava
          ? <Aviso tom="falha" glifo="xis" titulo={T.naoCabeTitulo} frase={T.naoCabe[trava.id](trava)} />
          : <>{pinos}<Precondicao estado="ok">{T.cabe(envio.contadores.pede, envio.contadores.guarda)}</Precondicao></>}
        {/* o envio que o técnico espera (29): a linha a mais, com o relógio, embaixo da do espaço · sem ritmo
            declarado, a contagem fica no quadro da referência */}
        {!trava && fluxo.esperando && porEnviar > 0 && <Precondicao estado="relogio">{T.enviando(ENVIADAS_DO_QUADRO, mensagens)}</Precondicao>}
        <Cadeia elos={elosDo(fluxo, par, envio)} justa semFecho />
      </>
    )
    // o Procurar outro módulo, com a sessão aberta: o diálogo, e os 4 passos seguem pra busca (decisão 64)
    const procurarOutro = () => enc.encerrar({ destino: { tela: 'T05', momento: T05_LISTA } })
    rodape = trava
      ? <Rodape primario={T.procurarOutro} aoPrimario={procurarOutro} link={T.voltar} aoLink={voltarAoMenu} />
      : <Rodape primario={T.gravarNoModulo} aoPrimario={pedirGravacao} link={T.voltar} aoLink={voltarAoMenu} />
  } else if (fase === 'escolher') {
    // ── a manutenção: escolher o bloco (08) · o que ficou para depois, marcado, com o motivo (16) ──
    const ultimo = BLOCOS_DA_MANUTENCAO.length - 1
    const aviso = falta.length ? T.faltaReenviar(falta.map((x) => x.bloco)) : T.reenvieUm
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.titulo} />
        <Aviso tom="neutro" glifo="info" titulo={T.manutencao} frase={aviso} />
        <Lista role="radiogroup" aria-label={T.titulo}>
          {BLOCOS_DA_MANUTENCAO.map((b, i) => {
            const f = faltaDe(b)
            return (
              <LinhaEscolha key={b} nome={rotuloDe(b)} detalhe={f ? motivoDe(b, f.por) : T.descricao[b]}
                valor={f ? T.faltaReenviarValor : conteudo[b]} valorTom={f ? 'forte' : 'secundaria'}
                estado={b === fluxo.bloco ? 'escolhida' : 'disponivel'}
                aoTocar={() => setFluxo((x) => ({ ...x, bloco: b }))} divisoria={i < ultimo} />
            )
          })}
        </Lista>
      </>
    )
    // nada escolhido (a 28): o primário apagado diz o que falta; o toque numa linha marca e acende o Reenviar dela
    rodape = fluxo.bloco
      ? <Rodape primario={T.reenviar[fluxo.bloco]} aoPrimario={pedirReenvio} primarioAcende primarioTrocaTexto link={T.voltar} aoLink={voltarAoMenu} />
      : <Rodape primario={T.escolhaUmBloco} primarioDesabilitado primarioAcende primarioTrocaTexto link={T.voltar} aoLink={voltarAoMenu} />
  } else if (fase === 'curta' || fase === 'curtaServidor' || fase === 'curtaFeita') {
    // ── a manutenção: a cadeia curta (09) — a limpeza só do bloco, e o bloco, cada um com a barra e
    // a contagem · conferida, a pergunta pelos dependentes, um por vez, na ordem do script (10, 14, 15) ──
    const dependentes = dependentesDe(fluxo.bloco)
    // o Reenviar de um só liga quando o de cima confere ou fica para depois (a 19 e a 20)
    const decididos = (i) => dependentes.slice(0, i).every((b) => fluxo.decisoes[b])
    const itens = dependentes.map((b, i) => {
      const anterior = !decididos(i) ? dependentes[i - 1] : null
      const motivo = motivoDe(b, fluxo.bloco)
      return {
        bloco: b, rotulo: rotuloDe(b), decisao: fluxo.decisoes[b] ?? null, liberado: decididos(i), acendeu: i > 0 && aoVivo,
        voltou: aoVivo && fluxo.voltou === b,
        motivo: anterior ? `${motivo} · ${T.liberaDepois(rotuloDe(anterior))}` : motivo,
      }
    })
    const frase = fase === 'curta' || fase === 'curtaServidor' ? T.reenviando[fluxo.bloco]
      : dependentes.length ? T.confereComDependentes[fluxo.bloco](dependentes.length) : T.confereSo[fluxo.bloco]
    miolo = (
      <>
        {/* o contador da curta: 1 de 2, 2 de 2, neutro */}
        <CabecalhoConteudo titulo={T.titulo} contagem={k} unidade={T.deTotal(CURTA)} />
        <Aviso tom="neutro" glifo="info" titulo={T.manutencao} frase={frase} />
        <Cadeia elos={elosDaCurta(fluxo, par)} altura="correndo" curta />
        {fase === 'curta' && <p className="t09-ficam">{depoisDaCurta(fluxo.bloco, dependentes, falta.map((x) => x.bloco))}</p>}
        {fase === 'curtaFeita' && dependentes.length > 0 && (
          <Pergunta itens={itens} surge={aoVivo && !abriuNaPergunta && !fluxo.voltou} aoReenviar={reenviarDependente} aoDeixar={deixar} aoVivo={aoVivo} />
        )}
      </>
    )
    // conferida: com dependente, o Voltar ao menu vira link — sair não perde nada, o que ficar vira pendência
    rodape = fase === 'curta' || fase === 'curtaServidor'
      ? <Rodape {...mov} primario={T.gravandoNaoInterrompa} primarioDesabilitado explicacao={T.saidaVolta} />
      : dependentes.length ? <Rodape link={T.voltar} aoLink={sairDaPergunta} />
        : <Rodape {...mov} primario={T.voltar} aoPrimario={voltarAoMenu} pe="link" />
  } else {
    // ── a cadeia: gravando (00, 21 a 26), o servidor (11), parada (01, 02, 03), concluída (04) e o
    // servidor que não respondeu (12) · o contador ao lado do título conta as etapas que conferiram:
    // lima na concluída, neutro nas outras ──
    const cabeca = <CabecalhoConteudo titulo={T.titulo} contagem={k} unidade={T.deTotal(total)} tom={fase === 'concluida' ? 'veredito' : 'neutro'} />
    // o aviso: cada um é um aviso novo (a chave é a fase), e o que nasce ao vivo esmaece no lugar
    let aviso = null
    if (fase === 'recusado' && fluxo.deNovo) aviso = <Aviso key="recusado-de-novo" surge={aoVivo} tom="falha" glifo="xis" titulo={T.parouDeNovo} frase={T.recusouDeNovo(rotuloDe(bloco), TOTAL - k - 1)} />
    else if (fase === 'recusado') aviso = <Aviso key={fase} surge={aoVivo} tom="falha" glifo="xis" titulo={T.parou} frase={T.recusou(rotuloDe(bloco), TOTAL - k - 1)} />
    // gravando só a conexão (a 33): o aviso neutro troca no lugar do da recusa
    else if (fluxo.so) aviso = <Aviso key="so" surge={aoVivo} tom="neutro" glifo="info" titulo={T.soConexao} frase={T.soConexaoFrase} />
    // a queda que não volta (a 35): o que conferir e a quem acionar, no lugar do aviso da pausa
    else if (fase === 'pausado' && fluxo.naoVoltou) aviso = <Aviso key="nao-voltou" surge={aoVivo} tom="neutro" glifo="sem-sinal-neutro" titulo={T.naoVoltou} frase={T.naoVoltouFrase} />
    else if (fase === 'pausado') aviso = <Aviso key={fase} surge={aoVivo} tom="neutro" glifo="sem-sinal-neutro" titulo={T.pausou(rotuloDe(bloco))} frase={T.linkCaiu(k)} />
    else if (fase === 'recuperacao') aviso = <Aviso key={fase} surge={aoVivo} tom="neutro" glifo="pausa" titulo={T.semConexao(rotuloDe(CONEXAO))} frase={T.semSinal} />
    // a altura do elo é a de cada quadro: gravando 78, recusada 70, pausada 68, a do servidor e a concluída 72
    const altura = fase === 'gravando' && !fluxo.so ? 'gravando' : fase === 'pausado' || fase === 'recuperacao' ? 'pausada' : undefined
    miolo = (
      <>
        {cabeca}
        {pinos}
        {/* a cadeia concluída diz o resultado numa faixa, logo embaixo da linha dos pinos (a 04): a peça
            com contagem na versão que confere · ao vivo, o espaço abre direto, e ela esmaece no lugar em 200 */}
        {fase === 'concluida' && <div className="t09-faixa"><Aviso tom="veredito" surge={aoVivo && !abriuConcluida} titulo={T.conferidoNoModulo} numero={total} unidade={T.passos} /></div>}
        {aviso}
        <Cadeia elos={elosDo(fluxo, par, null, { aoConferirDeNovo: EM_QUADRO ? undefined : conferirDeNovo })} justa={fase === 'recusado' || !!fluxo.so} altura={altura} />
      </>
    )
    // não se sai do meio — no recusado e na queda, só o Tentar de novo e o Reconectar · recusado de novo, a
    // saída que grava a Conexão antes (a 31) · gravando só a conexão, sem a explicação (a 33)
    if (fluxo.so) rodape = <Rodape {...mov} primario={T.gravandoNaoInterrompa} primarioDesabilitado />
    else if (fase === 'gravando' || fase === 'servidor') rodape = <Rodape {...mov} primario={T.gravandoNaoInterrompa} primarioDesabilitado explicacao={T.saidaVolta} />
    else if (fase === 'recusado' && fluxo.deNovo) rodape = <Rodape {...mov} primario={T.tentarDeNovo} aoPrimario={retomar} link={T.gravarSoConexao} aoLink={abrirSoConexao} />
    else if (fase === 'recusado') rodape = <Rodape {...mov} primario={T.tentarDeNovo} aoPrimario={retomar} />
    else if (fase === 'pausado') rodape = <Rodape {...mov} primario={T.reconectar} aoPrimario={retomar} />
    else if (fase === 'recuperacao') rodape = <Rodape {...mov} primario={T.continuar} aoPrimario={retomar} />
    // sem a Conexão (o reenvio que a T11 pediu), a volta é a do menu, de onde a conferência confere de novo
    else if (fase === 'concluida' && fluxo.semConexao) rodape = <Rodape {...mov} primario={T.voltar} aoPrimario={voltarAoMenu} />
    else if (fase === 'concluida') rodape = unidadesDo(par).ativo.total > 0
      ? <Rodape {...mov} primario={T.lerACan} aoPrimario={lerACan} />
      : <Rodape {...mov} primario={T.calibrar} aoPrimario={calibrar} />
    else rodape = <Rodape {...mov} primario={T.voltar} aoPrimario={voltarAoMenu} />
  }

  const daFolha = ultimaFolha.current
  return (
    <div className="t09">
      <BarraDoSistema fundo="faixa" veu={folha.visivel ? 'folha' : enc.veu} />
      {/* o ENCERRAR faz o mesmo que o voltar: antes de a Conexão gravar, abre a recuperação; na recuperação e na cadeia curta, fica apagado (a lei 17) */}
      <div className="t09-topo" inert={folha.montado ? '' : undefined}>
        <Faixa serial={par.moduloSerial} placa={placaDe(par.ativoId)} acao={T.encerrar} aoEncerrar={encerrar} acaoDesabilitada={fase === 'recuperacao' || fase === 'curta' || fase === 'curtaServidor' || !!fluxo.so} />
      </div>
      {/* o miolo nasce com o quadro: as peças de dentro não esmaecem de novo por dentro da troca */}
      <div key={`miolo·${quadro}`} className={`tela-miolo t09-miolo ${parada ? 't09-miolo-justo' : ''}`} inert={folha.montado ? '' : undefined}>
        {miolo}
      </div>
      {/* o rodapé nasce com o quadro: dentro da troca, o texto do primário não esmaece de novo */}
      <div className="t09-pe" inert={folha.montado ? '' : undefined}>
        <Fragment key={`rodape·${quadro}`}>{rodape}</Fragment>
      </div>
      {/* as folhas: a de confirmação do reenvio (13, 17, 18) e a das mensagens (27), por cima da tela,
          que fica atrás do véu, inerte */}
      {folha.montado && (
        <div className="t09-sobre t-confirmacao">
          <Veu de="folha" visivel={folha.visivel}>
            {daFolha === 'mensagens'
              ? <FolhaDeConfirmacao titulo={T.mensagens.titulo(porEnviar)} texto={T.mensagens.texto} aberta={folha.visivel}
                  primario={T.mensagens.esperar} aoPrimario={esperarOEnvio} link={T.mensagens.gravarMesmoAssim} aoLink={gravarMesmoAssim} aoFechar={fecharFolha} />
              : daFolha === 'soConexao'
                ? <FolhaDeConfirmacao titulo={T.soConexaoFolha.titulo} texto={T.soConexaoFolha.texto(ORDEM.slice(k, -1))} aberta={folha.visivel}
                    primario={T.gravarSoConexao} aoPrimario={gravarSoConexao} link={T.cancelar} aoLink={fecharFolha} aoFechar={fecharFolha} />
                : <FolhaDeConfirmacao bloco={daFolha} aberta={folha.visivel} aoConfirmar={() => reenviar(daFolha)} aoFechar={fecharFolha} />}
          </Veu>
        </div>
      )}
      {enc.sobre}
    </div>
  )
}
