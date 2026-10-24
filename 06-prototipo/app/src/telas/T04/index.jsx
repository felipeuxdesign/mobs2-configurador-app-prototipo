// T04 · Menu (02-telas/T04-menu): a grade de nove cartões em que cada
// ferramenta diz, no próprio cartão, o que falta pra ela funcionar. Em cima, a
// tira de contexto — a empresa e a conta — e a faixa da sessão; por cima, as
// folhas da conta, de trocar de empresa, do módulo e do ativo da sessão, os
// diálogos de sair e de trocar, o do ENCERRAR antes de homologar (13, decisão
// 36) e o aviso do acesso vencendo (12). Tudo lê do estado único e do mock: o
// estado muda o que os blocos dizem, nunca onde eles ficam (Lei 3).
import { useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, TopoDoMenu, TiraDeContexto, Faixa, GradeFerramentas, CartaoFerramenta,
  Folha, CartaoDaConta, PrazoDaConta, BotaoDaFolha, Interruptor, Dialogo, Frase, Destaque,
  Aviso, Nota, Lista, LinhaEmpresa, PorCima, usePorCima, Primario,
} from '../../ds/index.js'
import { useEstado, estadoVazio } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useTema, definirTema } from '../../estado/tema.js'
import { useEncerrar, ENCERRAR_SEM_HOMOLOGAR } from '../../estado/encerrar.jsx'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import { CartaoPreso } from './pecas.jsx'
import {
  REF, SOBRE, MOMENTO_DA_FOLHA, FOLHAS, SOB_A_FAIXA, placaDe, iniciais, filaToda, pendentesDoAparelho,
  enviando, checklistPendentes, prazoDoAcesso, avisoDoAcesso, avisoDaFila, moduloPreso, ativoPreso,
  empresaDoMenu, tiraTroca, empresasDaFolha, estadoDaLinha, destinoDaTroca, depoisDoTrocar, temRede,
  momentoDoSair, frasesDoSair, primarioDoSair, depoisDoSair, registrado, CAUSA_REGISTRADO,
  marcar, primarioDaFolha, momentoDaFolha, tituloDoTrocar, cartaoDoModulo, causaDaFerramenta, ferramentaLiberada,
} from './dados.js'
import './t04.css'

// as cinco ferramentas que dependem do módulo e do ativo, na ordem da grade (decisão
// 44): o Diagnóstico do módulo no lugar do Dados da CAN, e sem o Refazer leitura.
// O Diagnóstico só precisa do módulo (T04/02: liberado, com o módulo sem ativo); as outras,
// do módulo e do ativo. O Finalizar com checklist ocupa a linha (CartaoFerramenta · linha)
const FERRAMENTAS = [
  { icone: 'can', titulo: 'Diagnóstico do módulo', tela: 'T07', soModulo: true },
  { icone: 'configurar', titulo: 'Configurar módulo', tela: 'T09' },
  { icone: 'calibracao', titulo: 'Calibração', tela: 'T10' },
  { icone: 'conferir', titulo: 'Conferir configuração', tela: 'T11' },
  { icone: 'checklist', titulo: 'Finalizar com checklist', tela: 'T13', contaChecklist: true, linha: true },
]
const HEROI = SEMENTES.T04.sessao

// O palco abre o momento com a semente da T04 (a sessão do herói). O 01 e o 02
// pedem outro mundo: sem sessão, e com o módulo sem o ativo. A tela ajusta o
// estado único uma vez, ao montar. Num estado da coluna, nada.
function ajusteDoMomento(momento, unico) {
  const a = {}
  if (momento === REF.semModulo && unico.sessao) a.sessao = null
  if (momento === REF.semAtivo && unico.sessao?.ativoId) a.sessao = { ...unico.sessao, ativoId: null }
  // no print, a conta e a troca de empresa (05, 07, 21) abrem sobre o menu sem sessão (o 01), a tela
  // de onde a referência as tira; no fluxo, a folha abre sobre o menu que estava
  if (EM_QUADRO && (momento === REF.conta || momento === REF.empresa || momento === REF.outraMarcada) && unico.sessao) a.sessao = null
  // a 19 e a 20 pelo endereço: o checklist registrado, aguardando o autoteste (a T13/11), na sessão do herói
  if ((momento === REF.checklistRegistrado || momento === REF.sairRegistrado) && !registrado(unico.etapas)) {
    a.etapas = { ...unico.etapas, checklist: { ...(unico.etapas.checklist ?? {}), homologada: true } }
  }
  return Object.keys(a).length ? a : null
}

// Num estado, o mundo é o do caso (receitas.js): a falha do 03 é só
// "o link caiu", na sessão do herói; o 04, o 09 e o 15 (sem rede, com a faixa do
// herói, como a referência desenha) também pedem a sessão inteira.
function sessaoDoEstado(sessao, est) {
  // no print, o 08 abre sobre o menu sem sessão, como a referência desenha
  if (EM_QUADRO && est === REF.envio) return null
  // a consulta parada *Sem módulo* da coluna: o menu antes de conectar, sem sessão · e o sair sem
  // pendência (a 17), sobre o menu sem sessão
  if (est === REF.semModulo || est === REF.sairSemPendencia) return null
  const perdeu = est === REF.falha || est === REF.reconectando
  const precisa = perdeu || est === REF.checklist || est === REF.trocar || est === REF.semConexao
  const base = precisa && !sessao?.ativoId ? HEROI : sessao
  return perdeu && M.casos['link-perdido'] ? { ...base, saude: 'falha' } : base
}

export default function T04({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const { tema } = useTema()
  const [ajuste] = useState(() => (est ? null : ajusteDoMomento(momento, unico)))
  const [aplicado, setAplicado] = useState(!ajuste)
  // o diálogo de trocar (o 09), no fluxo: pra qual empresa ({ empresaId })
  const [trocarPara, setTrocarPara] = useState(null)
  // a folha Trocar de empresa marca (R-14, decisão 64): a empresa marcada, quando não é a atual
  const [marcadaViva, setMarcadaViva] = useState(null)
  // o toque no cartão do módulo que perdeu o link: reconectando (a 18), até o módulo voltar
  const [reconectandoVivo, setReconectandoVivo] = useState(false)
  const religa = useRef(null)
  useEffect(() => () => clearTimeout(religa.current), [])
  useEffect(() => {
    if (ajuste) { despachar({ tipo: 'mesclar', parcial: ajuste }); setAplicado(true) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const mundo = aplicado ? unico : { ...unico, ...ajuste }
  // o quadro que o endereço pede: o estado da coluna, ou um dos dois momentos que a coluna também
  // abre e que o mundo do herói não alcança sozinho — o sair sem pendência (17: sem sessão e sem
  // fila) e o reconectando (18: o link perdido) —, que pelo endereço montam o mesmo quadro
  const pedido = est ?? (momento === REF.sairSemPendencia || momento === REF.reconectando ? momento : null)
  const sessao = pedido ? sessaoDoEstado(mundo.sessao, pedido) : mundo.sessao
  const completa = Boolean(sessao?.ativoId)
  // a empresa do contexto (a tira e a atual da folha), e se o nome dela abre a folha:
  // com uma empresa só, não (dados.js · tiraTroca)
  const empresa = empresaDoMenu(mundo.contexto)
  const troca = tiraTroca(mundo.contexto)
  const fila = filaToda(mundo)
  // T04·3 (a): no fluxo, a folha abre sem envio em curso; o 08 só pelo endereço
  const subindo = est === REF.envio ? enviando(fila) : 0
  // o checklist registrado, aguardando o autoteste (a 19, a 20)
  const reg = registrado(mundo.etapas)
  // o contador da Fila de saída e o diálogo de sair contam o mesmo: o que não chegou da fila do
  // aparelho (decisão 64, dados.js) · a 17 é o sair sem nada na fila (o caso fila-vazia)
  const pendentesFila = pedido === REF.sairSemPendencia ? M.casos['fila-vazia'].itens.length : pendentesDoAparelho(mundo)
  const reconectando = pedido === REF.reconectando || (est == null && reconectandoVivo)
  // T04·2 (b): o contador do checklist só depois de aberto uma vez
  const checklistAberto = mundo.etapas.checklist != null || est === REF.checklist
  const rede = temRede(mundo, est)

  // o que está por cima do menu: pela referência do estado, pelo momento, ou o diálogo de trocar
  const sobre = est ? (SOBRE[est] ?? null) : (trocarPara ? 'trocar' : (SOBRE[momento] ?? null))
  const base = !sessao ? REF.semModulo : !completa ? REF.semAtivo : reconectando ? REF.reconectando : reg ? REF.checklistRegistrado : null

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const abrir = (qual) => {
    setTrocarPara(null)
    if (qual === 'empresa') setMarcadaViva(null)   // a folha abre com a atual marcada (a 07)
    ir('T04', { momento: qual === 'sair' ? momentoDoSair({ sessao, pendentes: pendentesFila, registrado: reg }) : MOMENTO_DA_FOLHA[qual] })
  }
  const fechar = () => { setTrocarPara(null); ir('T04', { momento: base ?? undefined }) }
  const vazio = estadoVazio()

  // O ENCERRAR da faixa e o Encerrar a sessão das folhas do módulo e do ativo
  // (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar antes de terminar? por cima do menu — o momento 13, que tem endereço:
  // a URL abre e fecha, e o Continuar a instalação volta ao quadro do
  // menu. Depois de homologar, direto, pros passos do encerramento.
  const enc = useEncerrar({ aberto: sobre === 'encerrar', aoAbrir: () => abrir('encerrar'), aoFechar: fechar })

  // Por cima do menu, um véu só (src/ds/chrome/PorCima.jsx): as folhas, os diálogos de
  // sair e de trocar e o do ENCERRAR se revezam nele. A folha sobe do pé em 200 e desce
  // em 150, o diálogo nasce e some em 150 (movimento.md, animacao.md); ao fechar, o que
  // estava aberto continua na tela até terminar de sair. Quando um diálogo toma o lugar
  // da folha (o Sair da conta, o trocar, o do ENCERRAR), o véu fica aceso, parado: a
  // folha desce enquanto o diálogo nasce, e no Cancelar o diálogo esmaece enquanto a
  // folha sobe de novo. Aberto pela URL ou no print, nasce aberto, sem movimento.
  const folhaPedida = FOLHAS.includes(sobre) ? sobre : null
  const camada = usePorCima(sobre)

  // O aviso do acesso vencendo (logica.md · O aviso do acesso, T04/12): no dia
  // do aviso, o diálogo aparece na primeira chegada ao menu — pelo fluxo ou pela
  // semente (o pulo do palco, o endereço) —, com nada por cima, uma vez. O
  // Entendi fecha e grava no estado único que ele foi visto; o Recomeçar do
  // login e o pulo do palco zeram o estado, e ele volta. Num estado da coluna,
  // só no 12; no print, também só no 12, o quadro que a referência desenha.
  // Os dias saem do mock (M.situacao.sessaoAcesso). Nasce aberto, com o menu;
  // fecha pelo movimento da peça (o diálogo e o véu esmaecem em 150). Se ele
  // esperava uma folha ou o diálogo do ENCERRAR (o endereço deles), só é pedido
  // depois de ela terminar de descer, ou de ele esmaecer: entra pela presença da
  // peça, sem o véu dele aparecer de uma vez em cima do que some, e o voltar
  // nesse meio não o fecha.
  const prazoDoAviso = avisoDoAcesso(mundo.situacao.sessaoAcesso)
  const avisoPedido = prazoDoAviso != null && (est ? est === REF.acesso
    : !EM_QUADRO && !sobre && !camada.montado && !mundo.avisoDoAcessoVisto)
  // o aviso da fila parada (T04/16): no molde do acesso vencendo, por cima do
  // menu inteiro · só pela coluna, parado — no protótipo o relógio não anda, e a fila não
  // fica 30 min parada (o limite de 30 min é provisório)
  const filaParada = est === REF.filaParada ? avisoDaFila(M.casos['fila-parada'].fila) : null
  const presencaDoAviso = usePorCima(avisoPedido ? 'acesso' : filaParada ? 'fila' : null)

  // a URL segue o quadro do menu: sem sessão é o 01, sem ativo é o 02
  useEffect(() => {
    if (est || !aplicado || SOBRE[momento]) return
    if ((momento ?? null) !== base) despachar({ tipo: 'ir', tela: 'T04', momento: base ?? undefined })
  }, [est, aplicado, momento, base, despachar])

  // os primários dos diálogos de sair e de trocar encerram a sessão
  // pelos 4 passos da sessão abortada da T16 (03) e seguem pro destino depois
  // deles: o destino fica gravado no estado único (etapas.encerramento.destino),
  // e a T16 o aplica ao fechar o 4º passo. Os dois diálogos já são a confirmação
  // deles, e dizem *sem homologar*: nenhum caminho pergunta duas vezes (decisão 36).
  const encerrarE = (destino) => {
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...mundo.etapas, encerramento: { destino } } } })
    ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR })
  }
  // com o checklist registrado (a 20, e o trocar sem referência), o encerramento é o completo da
  // T16 — o reinício e o autoteste, como o ENCERRAR depois do registro (decisão 36) —, e só depois o destino
  const encerrarCompletoE = (destino) => {
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...mundo.etapas, encerramento: { destino } } } })
    ir('T16')
  }

  // Sair da conta (HU-T01-12, decisão 64): sempre pelo diálogo, que diz o que fica — a 06 com a
  // sessão ou a fila, a 17 sem nenhuma das duas, a 20 com o checklist registrado. O primário: com
  // a sessão, os 4 passos da sessão abortada da T16 (ou o encerramento completo, com o checklist
  // registrado) e o login, com a fila preservada; sem ela, o login direto
  const sairDeVez = () => {
    despachar({ tipo: 'mesclar', parcial: { sessao: null, contexto: vazio.contexto, etapas: vazio.etapas } })
    ir('T01')
  }
  const pedirSaida = () => abrir('sair')
  const sairPeloDialogo = () => {
    const como = depoisDoSair({ sessao, registrado: reg })
    if (como === 'completo') encerrarCompletoE({ tela: 'T01', contexto: vazio.contexto })
    else if (como === 'abortado') encerrarE({ tela: 'T01', contexto: vazio.contexto })
    else sairDeVez()
  }
  // Trocar de empresa (a folha 07 · decisões 56 e 64): o toque marca outra empresa, e o
  // Sincronizar troca — com a sessão aberta, pelo diálogo de trocar (o 09); sem ela, direto
  // (dados.js · depoisDoTrocar). No diálogo, o primário passa pelo encerramento sem homologar da
  // T16 (ou o completo, com o checklist registrado) e segue pro destino: a T03 da escolhida, que
  // baixa o pacote dela (o de 4 dias e o vencido perguntam antes, T03/03 e 04); o mundo vai junto
  const trocarEncerrando = (alvo) => (reg ? encerrarCompletoE : encerrarE)(destinoDaTroca(alvo, mundo.contexto))
  const trocar = (alvo) => {
    const { confirma, vai } = depoisDoTrocar(sessao, alvo, mundo.contexto)
    if (confirma) { setTrocarPara(confirma); return }
    despachar({ tipo: 'mesclar', parcial: { sessao: null, etapas: vazio.etapas, contexto: vai.contexto } })
    ir(vai.tela)
  }
  // a folha: as empresas do técnico, a marcada (a atual ao abrir; pelo endereço da 21, a primeira das
  // outras) e o primário embaixo, que troca pra marcada
  const lista = empresasDaFolha(mundo.contexto)
  const marcadaId = subindo ? empresa.id
    : marcadaViva ?? (momento === REF.outraMarcada || est === REF.outraMarcada ? lista.find((e) => e.id !== empresa.id)?.id : null) ?? empresa.id
  const marcarEmpresa = (id) => {
    const nova = marcar(marcadaId, id, subindo)
    setMarcadaViva(nova)
    ir('T04', { momento: momentoDaFolha(nova, empresa.id) })
  }
  const sincronizar = () => trocar({ empresaId: marcadaId })

  // o módulo que perdeu o link (a 03): o toque reconecta (a 18) · no protótipo, o módulo volta
  // depois do tempo da espera de conectar (RITMOS.buscaMs, o mesmo da T05), e o menu volta ao da
  // sessão (a 00); não volta no tempo limite só pela coluna, e nenhuma espera estoura no fluxo
  const reconectar = () => {
    setReconectandoVivo(true)
    ir('T04', { momento: REF.reconectando })
    religa.current = setTimeout(() => {
      setReconectandoVivo(false)
      despachar({ tipo: 'mesclar', parcial: { sessao: { ...unico.sessao, saude: 'ok' } } })
      ir('T04', { momento: undefined })
    }, RITMOS.buscaMs)
  }

  const tecnico = mundo.tecnico.nome
  const sigla = iniciais(tecnico)
  const pendentesChecklist = completa && checklistAberto ? checklistPendentes(mundo.etapas.checklist) : 0

  // ── o topo ──
  const faixa = !sessao
    ? <Faixa lugar="menu" estado="sem-sessao" fato="Sem sessão de configuração" />
    : sessao.saude === 'falha'
      ? <Faixa lugar="menu" estado="falha" fato="Módulo com falha" acao="ENCERRAR" aoEncerrar={enc.encerrar} />
      : <Faixa lugar="menu" serial={sessao.moduloSerial} placa={completa ? placaDe(sessao.ativoId) : 'sem ativo'} semAtivo={!completa}
          acao="ENCERRAR" aoEncerrar={enc.encerrar} />

  // ── os dois cartões largos: o módulo e o ativo. Com a sessão aberta, os dois
  // não trocam (HU-T16-2): o toque abre a folha do que ela prendeu (10, 11) ──
  const poco = sessao ? 30 : 34
  // o cartão do módulo diz o próximo passo: procurar, reconectar (o link perdido) ou o serial da
  // sessão, que abre a folha do que ela prendeu (dados.js · cartaoDoModulo)
  const cm = cartaoDoModulo({ sessao, reconectando })
  const TOQUE_DO_MODULO = {
    procurar: () => ir('T05', { momento: '01-momento-nenhum-escolhido' }),
    reconectar,
    folha: () => abrir('modulo'),
  }
  const conectar = <CartaoFerramenta largo estado={cm.estado} icone="conectar" poco={cm.poco} titulo="CONECTAR MÓDULO" valor={cm.valor}
    aoTocar={cm.toque ? TOQUE_DO_MODULO[cm.toque] : undefined} desabilitado={!cm.toque} />
  const ativo = !sessao
    ? <CartaoFerramenta largo estado="espera" poco={poco} titulo="ATIVO SELECIONADO" valor="nenhum" />
    : !completa
      ? <CartaoFerramenta largo estado="decide" icone="ativo" poco={poco} titulo="ATIVO SELECIONADO" valor="toque para escolher" aoTocar={() => ir('T06')} />
      : <CartaoFerramenta largo icone="ativo" poco={poco} titulo="ATIVO SELECIONADO" valor={placaDe(sessao.ativoId)} aoTocar={() => abrir('ativo')} />
  // o que cada ferramenta espera: o Diagnóstico, só o módulo; as outras, o módulo e o ativo · com o
  // link perdido, todas esperam o módulo (a 03, dados.js)
  const liberada = (f) => ferramentaLiberada(f, sessao)
  const causaDe = (f) => causaDaFerramenta(f, sessao)

  // ── por cima: as folhas e os diálogos ──
  // A folha fecha pelo X, pelo toque no véu, fora dela, e pelo voltar do
  // sistema (logica.md). Dentro, o conteúdo de cada uma; o véu, a presença e a
  // troca entre elas são do PorCima (a folha diz a ele o fechar do toque fora).
  let porCima = null
  if (sobre === 'conta') {
    const { restam, total } = prazoDoAcesso(mundo.situacao.sessaoAcesso)
    porCima = (
      <Folha titulo="Conta" rotuloFechar="Fechar" minima aoFechar={fechar}>
        <CartaoDaConta iniciais={sigla} nome={tecnico} detalhe={`${mundo.tecnico.usuario} · ${M.empresa.nome}`} />
        <PrazoDaConta rotulo="ACESSO VENCE EM" restam={restam} total={total} unidade="dias"
          resta={`RESTAM ${restam} DE ${total} DIAS`} legenda="Quando vencer, o app pede a senha de novo, com rede." />
        {/* R-16: o Modo claro, entre o prazo e o Sair · desligado de fábrica, lembrado no
            aparelho · o app troca as cores no lugar, com a folha ainda aberta (estado/tema.js) */}
        <Interruptor rotulo="Modo claro" ligado={tema === 'claro'} aoTrocar={(l) => definirTema(l ? 'claro' : 'escuro')} />
        <BotaoDaFolha aoTocar={pedirSaida}>Sair da conta</BotaoDaFolha>
      </Folha>
    )
  } else if (sobre === 'modulo' || sobre === 'ativo') {
    // 10 · 11 · o que a sessão prendeu, travado nela (HU-T16-2); o Encerrar
    // a sessão é o ENCERRAR da faixa (logica.md · módulo e ativo travados):
    // antes de homologar, a folha desce e o diálogo nasce por cima do menu (o 13)
    const doModulo = sobre === 'modulo'
    const preso = doModulo ? moduloPreso(sessao?.moduloSerial) : ativoPreso(sessao?.ativoId)
    porCima = (
      <Folha titulo={doModulo ? 'Módulo conectado' : 'Ativo da sessão'} rotuloFechar="Fechar" aoFechar={fechar}>
        <CartaoPreso icone={doModulo ? 'conectar-na-folha' : 'ativo'} identidade={preso.identidade} detalhes={preso.detalhes} />
        <Nota tom="fato" titulo="TRAVADO NA SESSÃO" frase={doModulo
          ? 'Enquanto a sessão estiver aberta, o módulo não troca. Pra trocar de módulo, encerre a sessão.'
          : 'Enquanto a sessão estiver aberta, o ativo não troca. Pra trocar de ativo, encerre a sessão.'} />
        <BotaoDaFolha aoTocar={enc.encerrar}>Encerrar a sessão</BotaoDaFolha>
      </Folha>
    )
  } else if (sobre === 'sair') {
    // 06 · 17 · 20 · o sair pergunta sempre, e diz o que fica: a fila do aparelho (o número do cartão),
    // a sessão que encerra antes e como, e que entrar de novo precisa de rede (dados.js · frasesDoSair)
    const frases = frasesDoSair({ sessao, pendentes: pendentesFila, registrado: reg })
    porCima = (
      <Dialogo titulo="Sair da conta" primario={primarioDoSair(sessao)} aoPrimario={sairPeloDialogo}
        saida="Cancelar" aoSair={() => abrir('conta')} saidaDe44 margem={20}>
        {frases.map((f) => (
          <Frase key={f.texto ?? f.depois}>{f.texto ?? <>{f.antes}<Destaque>{f.destaque}</Destaque>{f.depois}</>}</Frase>
        ))}
      </Dialogo>
    )
  } else if (sobre === 'empresa') {
    // 07 · 08 · 21 · a folha Trocar de empresa: as empresas do técnico, cada uma com o pacote
    // e os ativos, a marcada com o quadrado lima, e o primário embaixo (R-14: o toque marca, e o
    // Sincronizar troca). A de pacote vencido se escolhe; no 08, com a evidência subindo, o aviso no
    // lugar da frase, as outras esperam o envio terminar, sem toque, e o primário espera também
    const pf = primarioDaFolha({ marcadaId, atualId: empresa.id, subindo })
    porCima = (
      <Folha titulo="Trocar de empresa" rotuloFechar="Fechar" folga={12} aoFechar={fechar}
        subtitulo={subindo ? undefined : 'Trocar recarrega os ativos e o pacote desta empresa.'}>
        {subindo === 1 && <Aviso tom="neutro" semPoco titulo="UMA EVIDÊNCIA ESTÁ SUBINDO" frase="Troque de empresa quando a fila terminar." />}
        <Lista role="radiogroup" aria-label="Trocar de empresa">
          {lista.map((e, i) => {
            const estadoLinha = estadoDaLinha(e, marcadaId, subindo)
            return (
              <LinhaEmpresa key={e.id} nome={e.nome} estado={estadoLinha}
                pacote={estadoLinha === 'espera' ? 'espera o envio terminar' : e.pacote}
                nomeGlifo="ainda não" rotuloContagem="ATIVOS" contagem={e.ativos}
                aoTocar={estadoLinha === 'disponivel' ? () => marcarEmpresa(e.id) : undefined}
                divisoria={i < lista.length - 1} />
            )
          })}
        </Lista>
        <Primario desabilitado={pf.desabilitado} aoTocar={sincronizar} trocaTexto>{pf.texto}</Primario>
      </Folha>
    )
  } else if (sobre === 'trocar') {
    // 09 · trocar com a sessão aberta: a sessão encerra antes da troca. Pela coluna e pelo
    // endereço, o alvo é a primeira das outras (nenhum toque leva adiante, parado)
    const alvo = trocarPara ?? { empresaId: lista.find((e) => e.id !== empresa.id)?.id }
    const nome = lista.find((e) => e.id === alvo.empresaId)?.nome
    // o título diz pra qual empresa (decisão 64) · com o checklist registrado, a frase da 20 no lugar
    // da do *sem terminar a instalação*, e o encerramento completo antes da troca (sem referência)
    porCima = (
      <Dialogo titulo={tituloDoTrocar(nome)} primario="Encerrar a sessão e trocar"
        aoPrimario={() => trocarEncerrando(alvo)}
        saida="Cancelar" aoSair={() => setTrocarPara(null)} margem={20}>
        {reg
          ? <Frase>O checklist do <Destaque>{sessao?.moduloSerial}</Destaque> está registrado: a sessão encerra antes, com o reinício e o autoteste do módulo.</Frase>
          : <Frase>A sessão de configuração do <Destaque>{sessao?.moduloSerial}</Destaque> é encerrada antes da troca, sem terminar a instalação.</Frase>}
        <Frase>O que já foi enviado fica no módulo.</Frase>
      </Dialogo>
    )
  } else if (sobre === 'encerrar') {
    // 13 · o ENCERRAR antes de homologar (decisão 36): o véu cobre também a tira
    // e a faixa, como no aviso do acesso — o menu inteiro fica atrás dele
    porCima = enc.caixa
  }
  // A região de composição: abaixo da tira (05 a 09), da faixa (10, 11) ou
  // da barra (13). O fundo cobre o topo em todas elas, sem deslocar as peças.
  const lugar = `t04-sobre ${SOB_A_FAIXA.includes(sobre) ? 't04-sobre-faixa' : ''} ${sobre === 'encerrar' ? 't04-sobre-tudo' : ''}`
  // o aviso do acesso: o véu cobre também a tira e a faixa (T04/12), e o
  // Entendi é o único jeito de fechar
  const entendi = () => despachar({ tipo: 'mesclar', parcial: { avisoDoAcessoVisto: true } })
  const aviso = !camada.montado && presencaDoAviso.montado
  const doAviso = filaParada ? (
    <Dialogo titulo={filaParada.titulo} primario="Ver a fila" aoPrimario={() => despachar({ tipo: 'ir', tela: 'T15' })}
      saida="Agora não" aoSair={() => {}} saidaDe44 margem={24}>
      <Frase>{filaParada.frase}</Frase>
    </Dialogo>
  ) : (
    <Dialogo titulo={`Seu acesso vence em ${prazoDoAviso?.restam} dias`} primario="Entendi" aoPrimario={entendi} margem={24}>
      <Frase>Depois disso, ele pede a senha de novo — e pra isso precisa de rede.</Frase>
    </Dialogo>
  )
  // o voltar do Android (logica.md): o X da folha, o Cancelar do diálogo; no
  // aviso do acesso, o Entendi, que só fecha e é a única saída; no menu, que
  // não tem saída desenhada, nada. No diálogo do ENCERRAR (13), o Continuar a
  // instalação, pela peça dele, que vale por cima (useEncerrar). Num estado da
  // coluna, a peça não escuta
  const voltar = folhaPedida ? fechar
    : sobre === 'sair' ? () => abrir('conta')
      : sobre === 'trocar' ? () => setTrocarPara(null)
        : avisoPedido ? entendi
          : null
  useVoltar(voltar)

  // O que fica atrás do véu é inerte: a folha e o diálogo são modais
  // (aria-modal), e nem o toque nem o leitor chegam nele. Tira e faixa também
  // ficam inertes até terminar o fechamento. A barra escurece seu fundo,
  // mantendo o desenho do sistema legível, como na T01.
  const montado = camada.montado || aviso
  const atras = montado ? '' : undefined
  const veuDaBarra = camada.veu ? (FOLHAS.includes(camada.topo) ? 'folha' : 'dialogo')
    : aviso && presencaDoAviso.veu ? 'dialogo' : null
  return (
    <div className="t04">
      <BarraDoSistema fundo="tira" veu={veuDaBarra} />
      <div className="t04-fundo">
        <fieldset className="t04-topo" role="presentation" disabled={montado} inert={atras}>
          <TopoDoMenu>
            {/* a empresa no topo: com mais de uma, o nome com a seta abre a folha Trocar de
                empresa (a 07), e o leitor ouve o que ele faz e qual é a empresa; com uma só,
                o nome fica sem a seta e não é botão */}
            <TiraDeContexto empresa={caixaAlta(empresa.nome)} aoTrocarEmpresa={troca ? () => abrir('empresa') : undefined}
              rotuloEmpresa={`Trocar de empresa — ${empresa.nome}`}
              iniciais={sigla} rotuloConta={`Conta — ${tecnico}`} aoAbrirConta={() => abrir('conta')} />
            <div inert={atras}>{faixa}</div>
          </TopoDoMenu>
        </fieldset>
        {/* o título Menu, escondido, existe em todas as telas do menu, com folha ou
            diálogo por cima ou não: não se toca, e
            fica fora do inert do que está atrás do véu, pro leitor de tela */}
        <h1 className="t04-titulo">Menu</h1>
        <div className="tela-miolo t04-miolo" inert={atras}>
          <GradeFerramentas folga={10}>
            {conectar}
            {ativo}
            {FERRAMENTAS.map((f) => liberada(f)
              ? <CartaoFerramenta key={f.tela} linha={f.linha} icone={f.icone} titulo={f.titulo} aoTocar={() => ir(f.tela)}
                  causa={f.contaChecklist && reg ? CAUSA_REGISTRADO : undefined}
                  contagem={f.contaChecklist && pendentesChecklist > 0 ? pendentesChecklist : undefined} />
              : <CartaoFerramenta key={f.tela} linha={f.linha} estado="espera" titulo={f.titulo} causa={causaDe(f)} />)}
            {/* decisão 48: depende só da rede do aparelho, não do módulo nem do ativo (T04/15) */}
            {rede
              ? <CartaoFerramenta icone="instalacoes" titulo="Últimas instalações" aoTocar={() => ir('T12')} />
              : <CartaoFerramenta estado="sem-rede" titulo="Últimas instalações" causa="sem conexão" />}
            <CartaoFerramenta icone="fila" titulo="Fila de saída" aoTocar={() => ir('T15')}
              contagem={pendentesFila > 0 ? pendentesFila : undefined} />
          </GradeFerramentas>
        </div>
      </div>
      {camada.montado
        ? <PorCima key="menu" camada={camada} lugar={lugar}>{porCima}</PorCima>
        : aviso && <PorCima key="aviso" camada={presencaDoAviso} lugar="t04-sobre t04-sobre-tudo">{doAviso}</PorCima>}
    </div>
  )
}
