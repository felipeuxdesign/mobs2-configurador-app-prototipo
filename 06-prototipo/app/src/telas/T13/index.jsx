// T13 · Checklist (02-telas/T13-checklist): fechar a homologação — o que o app
// já provou sozinho, e o que o técnico ainda precisa provar.
// · Uma estrutura só (decisão 34): o título com a
//   contagem, a barra fina e os seis cartões de seção, cada um dizendo quem
//   age. Tocar num cartão faz ele crescer no lugar, com a seta pra cima; as
//   seções de baixo descem e a lista rola; nada mais se mexe. Uma aberta por
//   vez: tocar em outra troca, e tocar na aberta fecha.
// · Tem seta, toca; sem seta, é leitura (Lei 16). A foto por fazer abre a
//   câmera do app (07) — o Painel também, quando houve calibração (decisão 52);
//   o automático que falta leva à tela que resolve, pelo `origem` do mock
//   (conectar → T05, ativo → T06, can → T07, configurar → T09, calibração →
//   T10); o que reprovou abre o nível do item (09). Na E, uma ação só, Fazer o
//   ciclo de testes → T14. A F não tem ação.
// · Cada item lê a etapa que o produziu no estado único (checklist.js). Pular
//   pelo palco semeia só a sessão: o que as telas T05 a T10 gravariam no
//   caminho vem da semente da T13 — o herói depois da calibração, antes do
//   ciclo e da fila.
// · B, o item manual: o título, a frase do que enquadrar embaixo dele (o
//   `enquadre` do item, decisão 60) e o quadro da câmera só com o ícone; a caixa
//   Não está conforme nas duas telas do item (07 e 08). A foto vale no Usar foto
//   (decisão 63): o Tirar foto congela a foto no quadro, com o registro embaixo
//   dela, e o item ainda não conta (44 a 48); o Usar foto conta e segue, o Tirar
//   de novo descarta a foto e volta à câmera, e o voltar e o Não está conforme a
//   descartam. O não conforme exige a foto do problema (decisão 39): marcada a
//   caixa, a frase diz Enquadre o problema e o botão é o disparador, Fotografar o
//   problema (08); fotografado, a foto do problema no quadro, com o registro, e o
//   botão, Salvar com ressalva, com o Tirar de novo no pé (15); sem o texto, Conte
//   o que aconteceu, apagado. A ordem entre escrever e fotografar é livre. Usar
//   foto e Salvar com ressalva resolvem o item e seguem pro próximo por fazer; sem
//   próximo, voltam à B aberta. A ressalva aparece com o check e a causa (12).
// · A câmera do item sem a permissão (o mundo real · estado/camera.js): o
//   quadro com a câmera riscada e o Tirar foto vira Abrir as
//   configurações; permitida lá, a câmera abre na volta. Com o Não está
//   conforme marcado, também: a foto do problema precisa da câmera (decisão
//   39; o primário sai de primarioDaCamera). Nenhuma referência desenha este
//   quadro: a frase embaixo do título fica, o visor só com a câmera riscada, e a
//   URL sai do momento; nenhum estado da coluna chega nele.
// · O automático reprovado: o nível do item (09) mostra o motivo e o que conferir, e
//   relê o módulo ali mesmo: Reler o módulo vira Relendo o módulo…
//   (29) e, deu certo, a mesma tela fica positiva, com o valor novo, o relido e o
//   veredito, e um botão só, Voltar ao checklist (30 a 33); não deu, o
//   valor novo, ainda vermelho, o xis com o relido e o que ainda falta, e o Reler o
//   módulo de novo (34 a 37). O mock em sequência: a 1ª releitura ainda reprova, a 2ª passa. A releitura lê o módulo inteiro: a C
//   volta atualizada. Não leva à T07, e nada muda de tela sozinho. Nada se marca à mão.
// · Finalizar instalação acende quando o que bloqueia fecha (A a E); o toque
//   gera o relatório na fila (HU-T13-7) e o homologado aparece depois (T13·3):
//   o veredito e o relatório no topo — com a localização negada, o relatório
//   vai sem ela (14). Com a Seção F falhando, pede a ciência antes (10).
// · O que a tela resolve vai pro estado único em etapas.checklist — é dele que
//   o contador do menu conta (T04·2, logica.md).
// · O voltar do Android (logica.md) é o Esc: no diálogo, o Cancelar; no nível
//   do item, o Voltar ao checklist; nas seções e no homologado, o Voltar ao
//   menu (T13·6). ENCERRAR antes de homologar abre o diálogo Encerrar sem
//   homologar? por cima da tela (decisão 36), e a sessão abortada.
// · O movimento: o item abre, passa ao próximo (no Usar foto e no Salvar com
//   ressalva) e volta pela troca de quadro; na volta, a barra parte do que tinha
//   quando o item abriu; a caixa do não conforme desliza pro lugar novo ao marcar;
//   a foto e o registro esmaecem no quadro, no lugar da imagem ao vivo, e nada mais
//   se mexe; o texto do primário e o do link trocam no lugar;
//   o diálogo da Seção F nasce e some com o véu. Nada anima ao abrir.
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, BarraDoChecklist, SecoesDoChecklist, SecaoDoChecklist, ItemDoChecklist, VereditoDoChecklist, CampoTexto,
  Segmentado, Justificativa, OQueConferir, Rodape, Veu, Dialogo, Frase, VisorCamera,
  useTrocaDeQuadro, useReorganiza, usePresenca,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { NEGADA, APAGADO, permissaoDoEstado, camera as cameraDa, primarioDaCamera, linkDaCamera, voltaDasConfiguracoes } from '../../estado/camera.js'
import { RECEITAS } from '../../estado/receitas.js'
import { pedirReenvio } from '../../estado/reenvio.js'
import { RITMOS } from '../../estado/ritmos.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { fotoDeExemplo } from '../../dados/fotos.js'
import { QUADRO_DO_PAINEL, QUADRO_DO_PAINEL_TIRADA, sessaoDoQuadro,
  REF, SECOES, SECAO_DO_MOMENTO, MOMENTO_DA_FOTO, FOTO_DO_MOMENTO, MOMENTO_DA_FOTO_TIRADA, FOTO_TIRADA_DO_MOMENTO, LISTAS_DA_C, DETALHES_DA_C, RELIDO_DO_ITEM, NAO_RESOLVIDO_DO_ITEM, RELEITURA_DO_QUADRO, VEREDITO_DO_RELIDO, detalheDaReleitura,
  BIP_DO_MOMENTO, MOMENTO_DO_BIP, D_NO_QUADRO_38, mundoDe, checklist, nivelDoItem, primeiroPendente, proximoPendente, momentoDaSecao,
  instrumentoDoItem, filaDoFinalizar, nomeDaSecao, rotuloDoNivel, itemDe, ativoDe, registroDoQuadro, cicloConcluido, BIP,
} from './checklist.js'
import { InstrumentoDoItem } from './pecas.jsx'
import { BotaoDaLinha, RespostasDaLinha } from '../../ds/index.js'
import { T } from './textos.js'
import './t13.css'

const HORA = M.HORA_NOMINAL
// o nome do glifo pro leitor, pelo estado do dado (as legendas da folha 3)
const NOME_DA_SECAO = { aprovada: 'aprovado', pendente: 'ainda não', aguarda: 'ainda não', reprovada: 'falha', lendo: 'lendo' }
const NOME_DO_ITEM = { ok: 'aprovado', ressalva: 'aprovado', nsa: 'não se aplica', pendente: 'ainda não', aguarda: 'ainda não', espera: 'ainda não', revisar: 'ainda não', reprovado: 'falha', lendo: 'lendo' }
// o que conferir no nível do item reprovado, por item (textos.md · 09)
const CONFERIR_DO_REPROVADO = { 'c-alimentacao': T.conferirAlimentacao, 'c-gps': T.conferirGps, 'c-entradas': T.conferirEntradas, 'c-modem': T.conferirModem }

// Homologado ⇒ o relatório está na fila (o Finalizar o gerou): a Seção F desta
// sessão lê dele. O mundo com o registro da tela e esse relatório.
function comRegistro(base, registro) {
  const mundo = { ...base, registro }
  if (!registro.homologada) return mundo
  const faltam = filaDoFinalizar(mundo).filter((f) => !base.fila.some((x) => x.id === f.id))
  return faltam.length ? { ...mundo, fila: [...base.fila, ...faltam] } : mundo
}

// o 13 pela URL é o fluxo depois do ciclo que a T14 fechou: o mundo com ele
function comQuadro(base, momento) {
  if (momento !== REF.eResolvida || base.etapas.ciclo?.concluido) return base
  return { ...base, etapas: { ...base.etapas, ciclo: cicloConcluido(base.sessao.ativoId, base.sessao.moduloSerial) } }
}

// O quadro em que a tela abre: as seções (uma aberta, ou nenhuma), o item, o
// diálogo. No item manual: a caixa do não conforme, o que aconteceu e a hora
// da foto do problema (decisão 39)
function quadroInicial({ momento, est, ck }) {
  // deFeitos: quantos estavam feitos quando o nível do item abriu (a barra parte dali na volta)
  // releitura: o Reler o módulo do detalhe · 'relendo' (29), 'naoResolvido' (34 a 37) ou 'relido' (30 a 33)
  // bip: o teste do bip enquanto ele não foi respondido · 'tocando' (39) ou 'esperando' (40)
  // fotoItem: a hora da foto do item no quadro, ainda não usada (decisão 63, 44 a 48)
  // descartar: o diálogo Descartar a ressalva?, aberto pelo voltar com o que aconteceu escrito (51)
  const q = { aberta: null, item: null, naoConforme: false, texto: '', fotoProblema: null, fotoItem: null, dialogo: false, ciente: false, deFeitos: null, releitura: null, bip: null, descartar: false }
  const daReleitura = RELEITURA_DO_QUADRO[est ?? momento]
  if (daReleitura) return { ...q, item: daReleitura.item, releitura: ['relendo', 'naoResolvido', 'relido'][daReleitura.vezes] }
  if (DETALHES_DA_C.includes(est)) return { ...q, item: ck.porSecao.C.find((c) => c.estado === 'reprovado')?.id ?? null }
  if (LISTAS_DA_C.includes(est)) return { ...q, aberta: 'C' }
  // o 43: a Seção D aberta, com o leitor e os eventos revisar em seguida
  if (est === REF.dRevisar) return { ...q, aberta: 'D' }
  // a Seção F falhando (49): aberta, com a causa e o Disparar de novo · o 10 é o diálogo da ciência
  // por cima dela, a tela de onde ele saiu
  if (est === REF.secaoFFalhando) return { ...q, aberta: 'F' }
  if (est === REF.secaoF) return { ...q, aberta: 'F', dialogo: true }
  // o 51: o problema fotografado, com o que aconteceu escrito (o 15), e o diálogo por cima
  if (momento === REF.descartarRessalva) return { ...q, item: primeiroPendente(ck), naoConforme: true, texto: M.checklist.exemploJustificativa, fotoProblema: HORA, descartar: true }
  const bip = BIP_DO_MOMENTO[momento]
  if (SECAO_DO_MOMENTO[momento]) return { ...q, aberta: SECAO_DO_MOMENTO[momento], bip: bip === 'tocando' || bip === 'esperando' ? bip : null }
  if (momento === REF.responder) return { ...q, item: primeiroPendente(ck) }
  if (FOTO_DO_MOMENTO[momento]) return { ...q, item: FOTO_DO_MOMENTO[momento] }
  if (FOTO_TIRADA_DO_MOMENTO[momento]) return { ...q, item: FOTO_TIRADA_DO_MOMENTO[momento], fotoItem: HORA }
  if (momento === REF.naoConforme) return { ...q, item: primeiroPendente(ck), naoConforme: true, texto: M.checklist.exemploJustificativa }
  if (momento === REF.problemaFotografado) return { ...q, item: primeiroPendente(ck), naoConforme: true, texto: M.checklist.exemploJustificativa, fotoProblema: HORA }
  return q
}

export default function T13({ momento: daUrl, estado: est }) {
  // a Seção E resolvida e a foto do painel (a câmera e a foto tirada), abertas pela coluna: o quadro do momento, parado, como no print
  const daColuna = est === REF.eResolvida || est === QUADRO_DO_PAINEL || est === QUADRO_DO_PAINEL_TIRADA
  const momento = daColuna ? est : daUrl
  // o mundo desses é o do momento, como no print (o do caminhão, no 20 e no 48): o estado só deixa a tela parada
  const estDoMundo = daColuna ? null : est
  const { estado: unico, despachar } = useEstado()
  // o caso que monta o mundo: o do detalhe de onde a releitura parte, que fica
  // enquanto a tela vive — o Reler o módulo e o Voltar ao checklist seguem no ônibus do caso,
  // e a URL sai do estado da coluna · releituras: quantas o técnico já fez — os casos da C devolvem
  // a N-ésima das `releituras` do mock (o 34 a 37 abrem com uma, o 30 a 33 com duas)
  const [fixo] = useState(() => (DETALHES_DA_C.includes(est) ? est : detalheDaReleitura(est ?? momento)))
  const [releituras, setReleituras] = useState(() => RELEITURA_DO_QUADRO[est ?? momento]?.vezes ?? 0)
  const base = comQuadro(mundoDe({ unico: estDoMundo || fixo ? unico : sessaoDoQuadro(unico, momento, SEMENTES.T13), est: fixo ?? estDoMundo, semente: SEMENTES.T13, releituras }), estDoMundo || fixo ? null : momento)
  const [registro, setRegistro] = useState(() => registroDoQuadro(momento, base, checklist(base)))
  // a Seção D lida bloco a bloco (T13/38): ao entrar no checklist no fluxo, ela começa
  // vazia e enche no ritmo do diagnóstico; o 38 pela URL, com três lidos · null, toda lida (o print,
  // a coluna, os outros quadros, e depois do Finalizar)
  const [dLidos, setDLidos] = useState(() => (momento === REF.dSendoLida ? D_NO_QUADRO_38
    : EM_QUADRO || est || momento || base.registro.homologada ? null : 0))
  const mundo = { ...comRegistro(base, registro), dLidos }
  const ck = checklist(mundo)
  const [q, setQ] = useState(() => quadroInicial({ momento, est, ck }))
  // a permissão da câmera do item: a do caso do estado da coluna; no fluxo, concedida
  const [permissao, setPermissao] = useState(() => permissaoDoEstado(est ? RECEITAS[`T13/${est}`] : null, M.casos))
  const vivo = useRef(unico)
  vivo.current = unico
  const homologada = registro.homologada
  // o veredito que nasce do toque no Finalizar esmaece; o que abre homologado, não (animacao.md)
  const [homologouAgora, setHomologouAgora] = useState(false)
  // o Testar de novo (41, 42 e 50): `refazendo`, a resposta saindo; `refez`, a pergunta que volta entra no lugar
  const [refazendo, setRefazendo] = useState(false)
  const [refez, setRefez] = useState(false)

  // o que a tela resolve vai pro estado único (etapas.checklist), e o relatório,
  // pra fila (M.filaSaida + estado.fila) — só no fluxo
  function gravar(novo) {
    if (est || fixo) return
    const e = vivo.current
    const m = comRegistro(comQuadro(mundoDe({ unico: e, est: null, semente: SEMENTES.T13 }), momento), novo)
    const etapas = { ...e.etapas, checklist: { ...novo, pendentes: checklist(m).pendentesDoMenu } }
    // o 13 pela URL grava o ciclo que a T14 teria gravado
    if (momento === REF.eResolvida && !e.etapas.ciclo?.concluido) etapas.ciclo = m.etapas.ciclo
    const parcial = { etapas }
    if (novo.homologada) {
      const faltam = filaDoFinalizar(m).filter((f) => !e.fila.some((x) => x.id === f.id))
      if (faltam.length) parcial.fila = [...e.fila, ...faltam]
    }
    despachar({ tipo: 'mesclar', parcial })
  }
  // abrir o checklist uma vez já conta pro menu (T04·2); o 11, o 12 e o 13 pela URL gravam o que os toques gravariam
  useEffect(() => { gravar(registro) }, []) // eslint-disable-line react-hooks/exhaustive-deps
  // os quadros que a referência desenha com a lista já rolada: aberta pela URL, a seção
  // que não cabe embaixo leva a lista até a seção de antes dela no topo do miolo — a D (04, 38) com a
  // C no topo, a E (05, 13, 39 a 42) com a D · e o 43, a D com o revisar em seguida
  useLayoutEffect(() => {
    // a Seção F falhando (49) e o diálogo por cima dela (10): a lista rolada até o fim, como as referências desenham
    if (est === REF.secaoFFalhando || est === REF.secaoF) {
      const miolo = document.querySelector('.t13 .tela-miolo')
      if (miolo) miolo.scrollTop = Math.floor(miolo.scrollHeight - miolo.clientHeight)   // no pixel inteiro, como as referências
      return
    }
    if (!q.aberta || (est && !daColuna ? est !== REF.dRevisar : !momento)) return   // a E resolvida da coluna rola como pela URL
    const miolo = document.querySelector('.t13 .tela-miolo')
    const cartoes = miolo?.querySelectorAll('.ds-secao-ck')
    const i = SECOES.findIndex((x) => x.id === q.aberta)
    if (!cartoes?.[i] || i < 1) return
    if (cartoes[i].getBoundingClientRect().bottom <= miolo.getBoundingClientRect().bottom) return
    miolo.scrollTop += cartoes[i - 1].getBoundingClientRect().top - miolo.getBoundingClientRect().top
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  // a D enchendo: um item a cada RITMOS.diagnosticoLinhaMs, até a última
  const totalD = ck.porSecao.D.length
  useEffect(() => {
    if (EM_QUADRO || dLidos == null) return undefined
    const t = setTimeout(() => setDLidos((n) => (n == null || n + 1 >= totalD ? null : n + 1)), RITMOS.diagnosticoLinhaMs)
    return () => clearTimeout(t)
  }, [dLidos, totalD])
  // o bip tocando: o buzzer aciona por cerca de 1 s (RITMOS.bipMs), e a pergunta aparece (40)
  useEffect(() => {
    if (EM_QUADRO || q.bip !== 'tocando') return undefined
    const t = setTimeout(() => { setQ((x) => ({ ...x, bip: 'esperando' })); irQuadro(q.aberta === 'E' ? REF.bipEsperando : null) }, RITMOS.bipMs)
    return () => clearTimeout(t)
  }, [q.bip]) // eslint-disable-line react-hooks/exhaustive-deps
  // a volta ao checklist registrado reabre no quadro dele: a URL segue
  useEffect(() => {
    if (!est && homologada && !momento) despachar({ tipo: 'ir', tela: 'T13', momento: REF.registrado })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── os toques ──
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  // o Reenviar do bloco deixado para depois (a 43): a manutenção da T09, com ele escolhido
  const reenviarBloco = (bloco) => {
    despachar({ tipo: 'mesclar', parcial: { etapas: pedirReenvio(unico.etapas, bloco) } })
    ir('T09')
  }
  const irQuadro = (m) => ir('T13', m ? { momento: m } : {})
  // o nível do item manual (07, 08): sem a permissão da câmera, o quadro não tem
  // referência, e a URL sai do momento (como o item reprovado)
  const irItem = (m, p = permissao) => irQuadro(p === NEGADA ? null : m)
  // o quadro de cada foto: o 07 e o não conforme (08, 15) são do
  // Módulo, e os outros quatro têm o seu (17 a 20); o não conforme deles não tem
  // referência, e a URL sai do momento
  const momentoDaFoto = (id, m = REF.responder) => (MOMENTO_DA_FOTO[id] ? (m === REF.responder ? MOMENTO_DA_FOTO[id] : null) : m)
  // a foto do item no quadro (44 a 48): cada item tem o seu quadro
  const quadroDasSecoes = (aberta, c = ck) => (aberta ? momentoDaSecao(aberta, c, homologada) : homologada ? REF.registrado : null)
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar antes de terminar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar({ homologada })
  const voltarAoMenu = () => ir('T04')

  function abrirSecao(s) {
    const aberta = q.aberta === s ? null : s
    setQ({ ...q, aberta, item: null, deFeitos: null })
    irQuadro(quadroDasSecoes(aberta))
  }
  // o toque num item com seta: a câmera do app, o nível do item reprovado, ou a tela que resolve
  function tocarItem(c) {
    if (c.destino === 'item') { setQ({ ...q, item: c.id, naoConforme: false, texto: '', fotoProblema: null, fotoItem: null, deFeitos: ck.feitos }); irItem(momentoDaFoto(c.id)); return }
    if (c.destino === 'reprovado') { setQ({ ...q, item: c.id, deFeitos: ck.feitos }); irQuadro(null); return } // o 09 é estado da coluna: no fluxo, a URL fica na tela
    if (c.destino?.tela) ir(c.destino.tela)
  }
  // a caixa do não conforme: marcada, o 08 (ou o 15, se o problema já foi
  // fotografado); desmarcada, o 07. O que aconteceu e a foto do problema ficam
  // guardados enquanto o técnico está no item, e marcar de novo os devolve ·
  // marcar com a foto do item no quadro a descarta (decisão 63)
  function marcarNaoConforme(marcado) {
    setQ((x) => ({ ...x, naoConforme: marcado, fotoItem: null, texto: marcado ? (x.texto || M.checklist.exemploJustificativa) : x.texto }))
    irItem(momentoDaFoto(q.item, marcado ? (q.fotoProblema ? REF.problemaFotografado : REF.naoConforme) : REF.responder))
  }
  // Fotografar o problema: a foto do problema no quadro, com o registro (15), e a hora do relógio parado
  function fotografarProblema() {
    setQ((x) => ({ ...x, fotoProblema: HORA }))
    irItem(momentoDaFoto(q.item, REF.problemaFotografado))
  }
  // Tirar foto (decisão 63): a foto do item congela no quadro, com o registro, e o item ainda não
  // conta · a URL vai ao quadro da foto do item (44 a 48)
  function tirarFoto() {
    setQ((x) => ({ ...x, fotoItem: HORA }))
    irItem(MOMENTO_DA_FOTO_TIRADA[q.item] ?? null)
  }
  // Tirar de novo: descarta a foto, que não foi usada, e volta à câmera do mesmo item (07, 17 a 20) ·
  // no problema, à câmera do problema (08), com a caixa marcada e o que aconteceu guardado
  function tirarDeNovo() {
    if (q.naoConforme) { setQ((x) => ({ ...x, fotoProblema: null })); irItem(momentoDaFoto(q.item, REF.naoConforme)); return }
    setQ((x) => ({ ...x, fotoItem: null }))
    irItem(momentoDaFoto(q.item))
  }
  // o Voltar ao checklist e o voltar do Android: a foto no quadro, do item ou do problema, é descartada
  function voltarAoChecklist() {
    const s = itemDe(q.item).secao
    setQ({ ...q, item: null, naoConforme: false, fotoProblema: null, fotoItem: null, aberta: s, releitura: null, descartar: false })
    irQuadro(quadroDasSecoes(s))
  }
  // O que se perde pergunta antes (decisão 64, a 51): sair do item manual com o que aconteceu escrito —
  // o voltar do Android e o Voltar ao checklist do pé — abre o Descartar a ressalva?; sem nada escrito,
  // sai direto, e a foto do item que não foi usada continua saindo direto (decisão 63). A URL diz a 51
  // sobre a foto do problema do Módulo (a 15); sem a foto, ou nos outros itens, nenhuma referência desenha
  const escreveu = q.item != null && itemDe(q.item).secao === 'B' && q.naoConforme && q.texto.trim() !== ''
  function sairDoItem() {
    if (!escreveu) { voltarAoChecklist(); return }
    setQ((x) => ({ ...x, descartar: true }))
    irItem(q.fotoProblema != null ? momentoDaFoto(q.item, REF.descartarRessalva) : null)
  }
  // Continuar no item: o diálogo fecha, e o item fica como estava (a 15, ou a 08)
  function continuarNoItem() {
    setQ((x) => ({ ...x, descartar: false }))
    irItem(momentoDaFoto(q.item, q.fotoProblema != null ? REF.problemaFotografado : REF.naoConforme))
  }
  // Reler o módulo: o botão diz Relendo o módulo…, ali mesmo, o tempo do
  // Relendo… da T10; aí o módulo inteiro relido. O 29 desenha a primeira da Alimentação: nos
  // outros três, e na segunda, a URL sai do momento, como o não conforme das fotos
  function relerModulo() {
    setQ({ ...q, releitura: 'relendo' })
    irQuadro(q.item === RELEITURA_DO_QUADRO[REF.relendo].item && releituras === 0 ? REF.relendo : null)
  }
  useEffect(() => {
    if (EM_QUADRO || est != null || q.releitura !== 'relendo') return undefined
    const relogio = setTimeout(() => {
      // deu certo: a mesma tela, positiva (30 a 33); não deu, o valor novo, ainda vermelho, o xis
      // com o que ainda falta, e o Reler de novo (34 a 37)
      const n = releituras + 1
      const depois = checklist(comRegistro(comQuadro(mundoDe({ unico: vivo.current, est: fixo ?? est, semente: SEMENTES.T13, releituras: n }), null), registro))
      const passou = depois.porSecao.C.find((c) => c.id === q.item)?.estado === 'ok'
      setReleituras(n)
      setQ((x) => ({ ...x, releitura: passou ? 'relido' : 'naoResolvido' }))
      irQuadro((passou ? RELIDO_DO_ITEM : NAO_RESOLVIDO_DO_ITEM)[q.item])
    }, RITMOS.relerModuloMs)
    return () => clearTimeout(relogio)
  }, [q.releitura]) // eslint-disable-line react-hooks/exhaustive-deps
  // Usar foto e Salvar com ressalva: o item resolvido, e o próximo por fazer
  function responder(como) {
    const id = q.item
    const fotos = { ...registro.fotos }; const ressalvas = { ...registro.ressalvas }
    if (como === 'foto') { fotos[id] = HORA; delete ressalvas[id] } else { ressalvas[id] = { justificativa: q.texto.trim(), as: HORA, foto: q.fotoProblema }; delete fotos[id] }
    const novo = { ...registro, fotos, ressalvas }
    setRegistro(novo)
    gravar(novo)
    const depois = checklist(comRegistro(base, novo))
    const seguinte = proximoPendente(depois, id)
    if (seguinte) { setQ({ ...q, item: seguinte, naoConforme: false, texto: '', fotoProblema: null, fotoItem: null }); irItem(momentoDaFoto(seguinte)) } else {
      const s = itemDe(id).secao
      setQ({ ...q, item: null, naoConforme: false, texto: '', fotoProblema: null, fotoItem: null, aberta: s })
      irQuadro(quadroDasSecoes(s, depois))
    }
  }
  // o Finalizar: o checklist registrado, aguardando o autoteste — a
  // homologação é da T16, depois do encerramento · o registro guarda isso em `homologada`
  function registrar(ciencia) {
    const novo = { ...registro, homologada: true, homologadaAs: HORA, ciencia }
    setRegistro(novo)
    setHomologouAgora(true)
    gravar(novo)
    // o diálogo sai como estava, com a ciência marcada; o veredito surge embaixo dele
    setQ({ ...q, dialogo: false, aberta: null, item: null, deFeitos: null })
    irQuadro(REF.registrado)
  }
  // com a Seção F falhando, a ciência primeiro (10)
  const finalizar = () => (ck.falhandoF ? setQ({ ...q, dialogo: true, ciente: false }) : registrar(null))
  // o bip do leitor (39 a 42): o Testar bip toca por cerca de 1 s e pergunta; Ouvi
  // confere, Não ouvi é não conforme, com o campo do que aconteceu · a URL segue
  const testarBip = () => { setQ((x) => ({ ...x, bip: 'tocando' })); irQuadro(q.aberta === 'E' ? REF.bipTocando : null) }
  function responderBip(bip) {
    setRefez(false)
    const novo = { ...registro, bip }
    setRegistro(novo)
    gravar(novo)
    setQ((x) => ({ ...x, bip: null }))
    irQuadro(q.aberta === 'E' ? MOMENTO_DO_BIP[bip] : null)
  }
  // a resposta se refaz (decisão 64, 41, 42 e 50): o Testar de novo toca o bip de novo, e a linha volta à
  // pergunta (39 → 40) — a resposta e o que aconteceu saem esmaecendo, em 150 (animacao.md), e só então o
  // bip toca; a pergunta entra no lugar, e o placar desce no lugar, se o bip contava · com reduzir, direto
  const saindo = useRef(false)   // o fim do esmaecer chega uma vez por peça que sai: vale o primeiro
  function testarDeNovo() { if (!refazendo) { saindo.current = true; setRefazendo(true) } }
  function refazerBip(e) {
    if (e.animationName !== 't13-bip-sai' || !saindo.current) return
    saindo.current = false
    setRefazendo(false)
    setRefez(true)
    const justificativas = { ...registro.justificativas }
    delete justificativas[BIP]
    const novo = { ...registro, bip: null, justificativas }
    setRegistro(novo)
    gravar(novo)
    testarBip()
  }
  // o que aconteceu, no item não conforme da E (o bip não ouvido, o cartão que não confere) · o bip não
  // ouvido passa a contar com ele escrito (42 → 50): a URL segue
  function justificar(id, texto) {
    const novo = { ...registro, justificativas: { ...registro.justificativas, [id]: texto } }
    setRegistro(novo)
    gravar(novo)
    if (q.aberta === 'E') {
      const m = momentoDaSecao('E', checklist({ ...comRegistro(base, novo), dLidos }), homologada)
      if (m !== daUrl) irQuadro(m)
    }
  }
  // o diálogo sai como estava (a ciência marcada continua desenhada até sumir); o Finalizar abre sem ela
  const cancelar = () => setQ({ ...q, dialogo: false })

  // o voltar do Android (logica.md, T13·6): num estado da coluna o app está parado, e a peça não escuta
  // relendo o módulo, nada: a releitura não para no meio (como a da CAN na T07) · com o Descartar a
  // ressalva? aberto, fecha o diálogo, como o Continuar no item; no item com o que aconteceu escrito, abre ele (51)
  const relendo = q.item != null && q.releitura === 'relendo'
  useVoltar(relendo ? null : q.dialogo ? cancelar : q.descartar ? continuarNoItem : q.item ? sairDoItem : voltarAoMenu)

  // ── o que se mostra ──
  const { sessao } = mundo
  const nivel = q.item ? nivelDoItem(ck, q.item) : null
  const fotografado = q.naoConforme && q.fotoProblema != null

  // ── o movimento ──
  // O quadro que a tela desenha: as seções, ou o nível de um item. Abrir o item, passar ao
  // próximo depois do Usar foto e voltar às seções trocam o desenho inteiro: o conteúdo
  // esmaece em 150, como entre telas; abrir e fechar uma seção move só a seção. O Tirar foto
  // não troca o quadro: a foto esmaece dentro dele (a câmera do app).
  const quadro = q.item ?? 'secoes'
  useTrocaDeQuadro(quadro)
  // No nível do item manual, a caixa do não conforme muda de lugar na mesma vista ao marcar (07 ↔ 08):
  // o layout vai direto pro fim, e ela desliza do lugar de antes ao novo, em 150
  // (src/ds/linhas/Reorganiza.js). Entre a 08 e a 15 ela não se mexe: o quadro tem o mesmo
  // tamanho, e a foto do problema esmaece dentro dele (decisão 63). O campo que abre embaixo dela é
  // da peça (Justificativa). Nas seções e no item reprovado, nada disso: a chave é null
  const lugar = useReorganiza(nivel && nivel.item.secao === 'B' ? `${q.naoConforme}` : null)
  // o diálogo da Seção F: nasce e some em 150, com o véu (movimento.md, "Por cima da tela");
  // aberto desde o começo (o 10, pela coluna), parado · o Descartar a ressalva? (51), do mesmo jeito
  const dialogo = usePresenca(q.dialogo)
  const descarte = usePresenca(q.descartar)
  const algumDialogo = dialogo.montado || descarte.montado
  // o diálogo que sai continua dizendo o que dizia, até acabar de sair
  const fraseDoDescarte = useRef(T.descartarSemFoto)
  if (q.descartar) fraseDoDescarte.current = fotografado ? T.descartarComFoto : T.descartarSemFoto

  // o item da E que o técnico responde aqui: o bip — o Testar bip à direita, e a
  // pergunta com as duas respostas embaixo (40) —, e o não conforme com o campo do que aconteceu
  // (o bip não ouvido, 42; o cartão que não confere, sem referência)
  function itemDaE(c, divisoria) {
    const fonte = itemDe(c.id).fonte
    // o campo aceso no quadro do 50 (no print, o técnico acabou de escrever); no fluxo, o foco de verdade
    const campo = (
      <CampoTexto rotulo={T.oQueAconteceu} valor={registro.justificativas?.[c.id] ?? ''} aoMudar={(texto) => justificar(c.id, texto)} placeholder={T.conteOQueAconteceu}
        focado={EM_QUADRO && daUrl === REF.bipComRessalva} />
    )
    // o bip respondido (41, 42 e 50, decisão 64): a resposta embaixo do nome, e o Testar de novo à direita,
    // até o Finalizar · o não ouvido abre o campo do que aconteceu, e só conta com ele escrito
    if (fonte === 'bip' && c.bip) {
      const doDesenho = c.estado === 'naoOuvido' ? 'reprovado' : 'ok'
      const refazer = homologada ? undefined : <BotaoDaLinha tam="teste" letra="secundario" aoTocar={testarDeNovo}>{T.testarDeNovo}</BotaoDaLinha>
      // a linha mora numa caixa sem desenho (display: contents), que guarda o fim do esmaecer da saída
      return (
        <div key={c.id} className={`t13-bip ${refazendo ? 't13-bip-sai' : ''}`} onAnimationEnd={refazerBip}>
          <ItemDoChecklist estado={doDesenho} nome={c.nome} resposta={c.resposta} acao={refazer} divisoria={divisoria}
            nomeGlifo={NOME_DO_ITEM[doDesenho]} embaixo={c.bip === 'naoOuvi' ? campo : undefined} />
        </div>
      )
    }
    if (c.estado === 'naoConforme') {
      return <ItemDoChecklist key={c.id} estado="reprovado" nome={c.nome} valor={c.valor} divisoria={divisoria} nomeGlifo={NOME_DO_ITEM.reprovado} embaixo={campo} />
    }
    if (fonte !== 'bip' || c.estado !== 'pendente') return null
    const botao = (
      <BotaoDaLinha tam="teste" letra="secundario" desabilitado={q.bip === 'tocando'} aoTocar={testarBip}>
        {q.bip === 'tocando' ? T.tocando : T.testarBip}
      </BotaoDaLinha>
    )
    const pergunta = q.bip === 'esperando' && (
      <>
        <span className={`t13-pergunta-bip ${refez ? 't13-pergunta-entra' : ''}`}>{T.ouviuOBip}</span>
        <RespostasDaLinha className={refez ? 't13-pergunta-entra' : ''}>
          <BotaoDaLinha aoTocar={() => responderBip('ouvi')}>{T.ouviBotao}</BotaoDaLinha>
          <BotaoDaLinha aoTocar={() => responderBip('naoOuvi')}>{T.naoOuviBotao}</BotaoDaLinha>
        </RespostasDaLinha>
      </>
    )
    return <ItemDoChecklist key={c.id} estado="pendente" nome={c.nome} acao={botao} divisoria={divisoria} nomeGlifo={NOME_DO_ITEM.pendente} embaixo={pergunta || undefined} />
  }

  // os itens da seção aberta: a ação da seção primeiro (a E), e a última sem o traço de baixo
  function itensDa(s) {
    const linhas = []
    if (s.acao) linhas.push({ acao: true, ...s.acao })
    for (const c of s.itens) linhas.push(c)
    return linhas.map((c, i) => {
      const divisoria = i < linhas.length - 1
      if (c.acao) {
        return <ItemDoChecklist key="acao" tipo="tocar" icone={c.icone} nome={c.nome} legenda={c.legenda} divisoria={divisoria} aoTocar={() => ir(c.destino.tela)} />
      }
      const daE = s.id === 'E' && itemDaE(c, divisoria)
      if (daE) return daE
      // o evento de teste que não chegou (a 49, decisão 64): a causa embaixo do nome e o Disparar de novo,
      // o botão da linha, que leva ao ciclo (T14) pra disparar outro evento
      if (c.disparar) {
        const disparar = homologada ? undefined
          : <BotaoDaLinha tam="teste" letra="secundario" aoTocar={() => ir('T14')}>{T.dispararDeNovo}</BotaoDaLinha>
        return <ItemDoChecklist key={c.id} estado="reprovado" nome={c.nome} resposta={c.resposta} acao={disparar} divisoria={divisoria}
          nomeGlifo={NOME_DO_ITEM.reprovado} className="t13-evento-nao-chegou" />
      }
      // o bloco deixado para depois (a 43): revisar em seguida, o motivo e o
      // Reenviar, que leva à manutenção da T09 com o bloco escolhido
      if (c.estado === 'revisar') {
        const reenviar = (
          <BotaoDaLinha tam="teste" letra="secundario" rotulo={`${T.reenviar}: ${c.nome}`} aoTocar={() => reenviarBloco(c.bloco)}>{T.reenviar}</BotaoDaLinha>
        )
        return <ItemDoChecklist key={c.id} estado="revisar" nome={c.nome} linhas={c.linhas} acao={reenviar} divisoria={divisoria} nomeGlifo={NOME_DO_ITEM.aguarda} />
      }
      return (
        <ItemDoChecklist key={c.id} tipo={c.tipo} estado={c.estado} icone={c.icone} nome={c.nome} valor={c.valor} legenda={c.legenda} linhas={c.linhas} apagado={!!c.apagado} valorDeEstado={!!c.valorDeEstado}
          destaque={c.destaque} divisoria={divisoria} nomeGlifo={NOME_DO_ITEM[c.estado]} aoTocar={c.tipo === 'tocar' || c.destino ? () => tocarItem(c) : undefined} />
      )
    })
  }

  let miolo
  let rodape
  if (nivel && nivel.item.secao === 'B') {
    // o nível do item manual (07, 08, 15, 17 a 20, 44 a 48). Sem a permissão da câmera, a câmera
    // riscada e o Abrir as configurações no lugar do Tirar foto (estado/camera.js).
    // Embaixo do título, a frase do que enquadrar (decisão 60, o título e a frase da
    // T10/11): o `enquadre` do item; marcado o não conforme, Enquadre o problema (08, 15).
    // O quadro fica só com o ícone da câmera; com a foto (decisão 63), a foto no quadro e o registro
    // embaixo dela: a do item (44 a 48), ou a do problema (15) — no protótipo, a foto de exemplo
    // do mock (src/dados/fotos.js), a do painel pelo ativo da sessão
    const cam = cameraDa(permissao)
    const frase = q.naoConforme ? T.enquadreProblema : nivel.item.enquadre
    const naQuadro = !cam.abre ? null
      : fotografado ? { id: 'problema', hora: q.fotoProblema, registro: { titulo: T.problemaFotografado(q.fotoProblema), legenda: T.vaiComARessalva } }
        : !q.naoConforme && q.fotoItem ? { id: q.item, hora: q.fotoItem, registro: { titulo: T.fotoTirada(q.fotoItem), legenda: T.confiraNitida } }
          : null
    miolo = (
      <>
        <Segmentado rotulo={rotuloDoNivel(nivel.secao)} contagem={String(nivel.posicao)} total={T.de(nivel.total)} segmentos={nivel.segmentos}
          legenda={nivel.depois ? T.depois(nivel.depois) : undefined} />
        <h1 className="t13-titulo-item">{nivel.item.pergunta}</h1>
        <p className="t13-frase-item">{frase}</p>
        <VisorCamera semPermissao={!cam.abre} foto={naQuadro ? fotoDeExemplo(naQuadro.id, sessao.ativoId) : null}
          rotulo={naQuadro ? T.aFoto(T.fotoDo[naQuadro.id], naQuadro.hora) : undefined} registro={naQuadro?.registro} />
        {/* a caixa do não conforme (decisão 39): desmarcada, a 16 do fim do miolo (T13/07) */}
        <div className={q.naoConforme ? 't13-nao-conforme' : 't13-nao-conforme t13-nao-conforme-desmarcada'}>
          {q.naoConforme
            ? <Justificativa opcao={T.naoConforme} legenda={T.conteEmbaixo} marcado aoMarcar={marcarNaoConforme} rotulo={T.oQueAconteceu} valor={q.texto}
                aoEscrever={(texto) => setQ((x) => ({ ...x, texto }))} focado />
            : <Justificativa opcao={T.naoConforme} legenda={T.marqueEConte} aoMarcar={marcarNaoConforme} />}
        </div>
      </>
    )
    // o primário é o que estado/camera.js diz (provado no node, scripts/testar-camera.mjs):
    // desmarcado, o da câmera; marcado, o que falta pra ressalva (decisão 39)
    const PRIMARIO = {
      'tirar-foto': { rotulo: T.tirarFoto, aoTocar: tirarFoto },
      // a foto no quadro (decisão 63): o Usar foto é que conta o item
      'usar-foto': { rotulo: T.usarFoto, aoTocar: () => responder('foto') },
      'fotografar-problema': { rotulo: T.fotografarProblema, aoTocar: fotografarProblema },
      // sem o texto, apagado e desabilitado (lei 17): diz o que falta, e não faz nada
      [APAGADO]: { rotulo: T.conteOQueAconteceu, desabilitado: true },
      'salvar-com-ressalva': { rotulo: T.salvarComRessalva, aoTocar: () => responder('ressalva') },
      // de volta das configurações com a permissão, a câmera abre, e a URL volta ao quadro do item (07 ou 08)
      'abrir-configuracoes': { rotulo: T.abrirConfiguracoes, aoTocar: () => { const p = voltaDasConfiguracoes(); setPermissao(p); irItem(momentoDaFoto(q.item, q.naoConforme ? REF.naoConforme : REF.responder), p) } },
    }
    const primario = PRIMARIO[primarioDaCamera(permissao, { naoConforme: q.naoConforme, fotografado, contou: !!q.texto.trim(), fotoNoQuadro: !!q.fotoItem })]
    // o link do pé, irmão do primário: com a foto no quadro, o Tirar de novo; sem ela, o Voltar ao checklist —
    // que, com o que aconteceu escrito, pergunta antes, como o voltar do Android (a 51)
    const LINK = { 'tirar-de-novo': { rotulo: T.tirarDeNovo, aoTocar: tirarDeNovo }, 'voltar-checklist': { rotulo: T.voltarChecklist, aoTocar: sairDoItem } }
    const link = LINK[linkDaCamera(permissao, { naoConforme: q.naoConforme, fotografado, fotoNoQuadro: !!q.fotoItem })]
    // o botão diz o que falta: o texto novo esmaece no lugar, e o roxo troca direto · o link troca junto
    rodape = (
      <Rodape primario={primario.rotulo} aoPrimario={primario.aoTocar}
        primarioDesabilitado={!!primario.desabilitado} primarioTrocaTexto link={link.rotulo} aoLink={link.aoTocar} linkTrocaTexto />
    )
  } else if (nivel) {
    // o nível do item automático reprovado (09): a tela que ajuda a consertar — a
    // leitura com a régua, e o que conferir (a peça da folha 6, a mesma da T05/04), sem o traço
    // vermelho (a falha já está na régua) · sem a barrinha: no detalhe não tem o que percorrer
    // · relido e dentro (30 a 33): sem o O que conferir e sem o vermelho, o check
    // com o relido e o veredito, e um botão só · relendo (29): o primário desligado e o link apagado
    const c = ck.porSecao[nivel.item.secao].find((x) => x.id === q.item)
    const positivo = q.releitura === 'relido' && c.estado === 'ok'
    // relido e ainda reprovado (34 a 37): o xis com o que ainda falta, também enquanto relê de novo
    const aindaFalta = releituras > 0 && c.estado === 'reprovado'
    const instrumento = c.leitura ? instrumentoDoItem(c) : null
    miolo = (
      <>
        <Segmentado rotulo={rotuloDoNivel(nivel.secao)} />
        <h1 className="t13-titulo-item">{nivel.item.pergunta ?? nivel.item.rotulo}</h1>
        {instrumento && <InstrumentoDoItem rotulo={T.lidoNoModulo} {...instrumento} relido={positivo ? T.relido(HORA, VEREDITO_DO_RELIDO[c.id](c)) : undefined}
          naoResolvido={aindaFalta && instrumento.ainda ? T.relido(HORA, instrumento.ainda) : undefined} />}
        {/* a antena com defeito (o GPS, sem referência) fica sem o O que conferir: o de trocar o módulo não tem texto */}
        {!positivo && !c.leitura?.defeito && CONFERIR_DO_REPROVADO[q.item] && <OQueConferir rotulo={T.oQueConferir} causas={CONFERIR_DO_REPROVADO[q.item]} />}
      </>
    )
    rodape = positivo
      ? <Rodape primario={T.voltarChecklist} aoPrimario={voltarAoChecklist} primarioTrocaTexto />
      : <Rodape primario={relendo ? T.relendoModulo : T.relerModulo} aoPrimario={relerModulo} primarioDesabilitado={relendo} primarioTrocaTexto
          link={T.voltarChecklist} aoLink={voltarAoChecklist} linkDesabilitado={relendo} />
  } else {
    // as seções: o título com a contagem, a barra, o veredito (homologado) e os seis cartões
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.titulo} contagem={String(ck.feitos)} unidade={T.de(ck.total)} />
        {/* na volta do nível do item, a barra parte do que tinha quando o item abriu */}
        <BarraDoChecklist feitos={ck.feitos} total={ck.total} de={q.deFeitos ?? undefined} className="t13-barra" />
        {homologada && (
          <VereditoDoChecklist titulo={<>{T.registrado}<br />{T.aguardandoAutoteste}</>} surge={homologouAgora}
            relatorio={mundo.semLocalizacao ? T.semLocalizacao : T.proximoPasso} />
        )}
        <SecoesDoChecklist aberta={q.aberta}>
          {ck.secoes.map((s) => (
            <SecaoDoChecklist key={s.id} estado={s.estado} titulo={nomeDaSecao(s)} quemAge={s.quemAge ?? undefined} feitos={s.feitos} de={T.de(s.total)}
              aberta={q.aberta === s.id} nomeGlifo={NOME_DA_SECAO[s.estado]} aoTocar={() => abrirSecao(s.id)}>
              {itensDa(s)}
            </SecaoDoChecklist>
          ))}
        </SecoesDoChecklist>
      </>
    )
    // no Finalizar, o texto do primário troca no lugar: Encerrar a sessão
    rodape = homologada
      ? <Rodape primario={T.encerrarSessao} aoPrimario={() => ir('T16')} primarioTrocaTexto link={T.voltarMenu} aoLink={voltarAoMenu} />
      : (
        // 'Faltam N itens' explica o primário apagado; com 1, no singular (Falta 1 item, proposta)
        <Rodape legenda={ck.motivo ?? undefined} legendaJunta primario={T.finalizar} primarioDesabilitado={ck.bloqueiam > 0}
          primarioTrocaTexto aoPrimario={finalizar} link={T.voltarMenu} aoLink={voltarAoMenu} />
      )
  }

  // Com o diálogo aberto, o que fica atrás do véu é inerte: o véu cobre a tela
  // inteira (T13/10), a faixa e o fundo da barra também, e a faixa fica desabilitada.
  // a F falhando com o resto resolvido (a 49): a legenda acompanha o Finalizar aceso, e acende com ele
  const pedeCiencia = !homologada && !nivel && ck.falhandoF && ck.bloqueiam === 0
  return (
    <div className={`t13 ${pedeCiencia ? 't13-pede-ciencia' : ''}`}>
      <BarraDoSistema fundo="faixa" veu={dialogo.visivel || descarte.visivel ? 'dialogo' : enc.veu} />
      <fieldset className="t13-topo" role="presentation" disabled={algumDialogo} inert={algumDialogo ? '' : undefined}>
        {/* relendo o módulo, o ENCERRAR fica apagado e não faz nada, como na releitura da CAN (lei 17) */}
        <Faixa serial={sessao.moduloSerial} placa={ativoDe(sessao.ativoId)?.placa} acao={T.encerrar} aoEncerrar={enc.encerrar} acaoDesabilitada={relendo} />
      </fieldset>
      <div className="t13-corpo">
        <div className="t13-conteudo" inert={algumDialogo ? '' : undefined}>
          {/* o miolo e o rodapé nascem com o quadro: dentro da troca, nada esmaece de novo por dentro */}
          <div key={`miolo:${quadro}`} ref={lugar} className="tela-miolo t13-miolo">{miolo}</div>
          <Fragment key={`rodape:${quadro}`}>{rodape}</Fragment>
        </div>
        {dialogo.montado && (
          <div className="t13-sobre">
            <Veu de="dialogo" visivel={dialogo.visivel}>
              {/* a causa antes da frase de sempre (decisão 64, a 10) */}
              <Dialogo titulo={T.secaoFNaoPassou} primario={T.finalizar}
                aoPrimario={() => registrar({ nome: unico.tecnico.nome, as: HORA })}
                saida={T.cancelar} aoSair={cancelar} ciencia={T.ciente(unico.tecnico.nome, HORA)} ciente={q.ciente}
                aoMudarCiencia={(ciente) => setQ((x) => ({ ...x, ciente }))} margem={16} aberto={dialogo.visivel}>
                <Frase>{`${T.causaDaF} ${T.registradaFalhando}`}</Frase>
              </Dialogo>
            </Veu>
          </div>
        )}
      </div>
      {/* o Descartar a ressalva? (51): o Continuar no item, o principal, fica no item com tudo como
          estava; o Descartar volta ao checklist, com a troca de quadro · como o Encerrar antes de
          terminar?, a caixa fica no meio de tudo o que está embaixo da barra do sistema, a faixa também */}
      {descarte.montado && (
        <div className="t13-sobre-tela">
          <Veu de="dialogo" visivel={descarte.visivel}>
            <Dialogo titulo={T.descartarRessalva} primario={T.continuarNoItem} aoPrimario={continuarNoItem}
              saida={T.descartar} aoSair={voltarAoChecklist} margem={24} aberto={descarte.visivel}>
              <Frase>{fraseDoDescarte.current}</Frase>
            </Dialogo>
          </Veu>
        </div>
      )}
      {enc.sobre}
    </div>
  )
}
