// T05 · Conectar módulo (02-telas/T05-conectar-modulo): achar o módulo e
// conectar. O que ele informa vem logo depois, no diagnóstico (T07) — a
// pré-checagem não mora aqui (decisão 44).
//
// Os quadros do caminho feliz:
// · 00-tela — a busca achou os módulos por perto (M.situacao.porPerto)
//   e o do herói, o primeiro, vem escolhido: a semente
// · 01-momento-nenhum-escolhido — a busca achou e nada foi tocado: é onde
//   a busca de novo termina, e onde o menu abre. Tocar num módulo só o marca
//   (o quadrado lima) e acende `Conectar ao …`; é o botão que conecta (R-14).
//   Todo módulo da lista se escolhe: o M2C-0999, fora do cadastro, com o que
//   ele mesmo informa (M.naBuscaForaCadastro)
// · 02-momento-um-encontrado — só um por perto: a busca em que só o herói
//   responde. Sem gatilho no mock, abre só pela URL
// Conectado: a sessão nasce no estado único, com o meio da busca e sem
// nenhuma etapa, e a tela vai pra T07. A faixa não desce aqui: desce na T07,
// quando as nove linhas passam sem trava.
// O M2C-0999 conecta como os outros, e a T07 trava pelo serial fora do cadastro (T07/02).
// · 05-momento-procurando — a busca de novo, enquanto corre (lei 24)
// · 06-momento-conectando — o Conectar ao …, enquanto conecta: o primário
//   desligado diz *Conectando ao …*, o Procurar de novo apaga, e o resto do quadro fica.
//   Depois de RITMOS.buscaMs (os mesmos 1,2 s da busca e do Entrar, sem número novo), a
//   T07, ou o NÃO RESPONDEU da 04. O Tentar de novo da 04 passa pelo mesmo momento, sobre
//   o quadro dela. Aberta pela URL, a 06 fica parada
// A busca de novo (`Procurar de novo`, o Bluetooth que liga): a lista some e a
// tela vira o *Procurando…* (05) — o poço com o quadrado branco de agora, a
// tentativa embaixo e o primário desligado —, com a URL dizendo a 05; depois de
// RITMOS.buscaMs (1,2 s, animacao.md), a lista volta sem nada escolhido (01).
// A tentativa conta as buscas desde que a tela abriu (a da abertura é a
// primeira); o ordinal é só o que o textos.md escreve. Aberta pela URL,
// a 05 fica parada, como todo momento.
//
// O movimento (animacao.md). Aberta pela URL, pelo palco, num estado ou
// no print, a tela fica parada; o que se move é só o que acontece depois:
// · a troca de quadro: a lista (01) e o quadro com o escolhido
//   (00, 02, 04) são desenhos diferentes — o conteúdo esmaece em 150 quando um
//   vira o outro (useTrocaDeQuadro, a chave é o quadro)
// · a busca que acha: a lista que volta da busca de novo surge em
//   cascata, 150 cada, de 80 em 80 (Lista `surge`, pela marca `achou`)
// · o marcador e o texto do primário que diz o serial marcado, que
//   esmaece no lugar, com o roxo direto (como a T02)
// · conectar leva à T07: a troca entre telas, do App
// · entre quadros, só a troca esmaece: o rodapé nasce de novo em cada quadro
//
// Os quatro estados, pela receita (receitas.js) e pelo caso do mock:
// · a busca: 03 (busca-vazia, o vazio no lugar da lista) e 04 (conexao-falha,
//   a trava mora no escolhido)
// · o bloco do nenhum encontrado (03) é peça desta tela (pecas.jsx), e embaixo das
//   causas diz as variantes sem Bluetooth, que a busca nunca acha (decisão 59)
// · a falha ao conectar vale uma vez por sessão (casosConsumidos)
//
// O mundo real (logica.md): o que o celular impede antes da busca — o
// Bluetooth desligado (16) e a permissão negada (17), no bloco da busca, com o
// Bluetooth riscado (lei 21). O quadro e o toque do primário são de celular.js: Ligar o
// Bluetooth e Abrir as configurações levam à busca (a 01); Permitir, com a
// resposta negada do caso, vira Abrir as configurações. Os dois abrem só pela
// coluna, parados: o toque se prova no node (scripts/testar-login-e-bluetooth.mjs)
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Rodape, CabecalhoConteudo, Lista, LinhaModulo, Nota, useTrocaDeQuadro,
  OQueConferir,
} from '../../ds/index.js'
import { VazioDaBusca } from './pecas.jsx'
import { quadroDoCelular, textosDoCelular, depoisDoPedido } from './celular.js'
import { useEstado, estadoVazio } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { RITMOS } from '../../estado/ritmos.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RECEITAS } from '../../estado/receitas.js'
import { M } from '../../dados/mock.js'
import { TX } from './textos.js'
import {
  porPerto, soOHeroi, HEROI, varianteNaLista, sessaoNova, variantesSemBluetooth,
  casosDoModulo, buscaVazia, serialDaFalha, pertoComFalha, CASO_BUSCA_VAZIA, CASO_CONEXAO,
} from './dados.js'
import './t05.css'

const M01 = '01-momento-nenhum-escolhido'
const M02 = '02-momento-um-encontrado'
const M05 = '05-momento-procurando'
const M06 = '06-momento-conectando'
// os casos das esperas da conexão: o texto de cada uma é o TX[caso]
const ESPERAS = ['pareando', 'reconectando']
// o pareando que o celular não confirmou no tempo limite (20): o caso nasce do pareando (`base`)
const CASO_PAREAMENTO = 'pareamento-nao-confirmado'
const M07 = '07-momento-conectado'

// o quadro da busca: os módulos por perto, o escolhido (ou nenhum) e, se a
// conexão com ele falhou, a trava no escolhido (04)
const busca = (perto, escolhido, trava = false) => ({ fase: 'busca', perto, escolhido, trava })
// a busca que corre de novo (05): o *Procurando…*, até a lista voltar (01) — `correndo`
// liga o relógio; aberta pela URL, parada, na segunda tentativa
const procurando = (tentativa, correndo = false) => ({ fase: 'procurando', tentativa, correndo })
// o da busca que não achou nada (03)
const vazia = () => ({ fase: 'vazia' })

// o quadro em que a tela abre, pelo momento da URL (sem momento, a 00)
function inicio(momento) {
  if (momento === M01) return busca(porPerto(), null)
  if (momento === M02) return busca(soOHeroi(), HEROI)
  if (momento === M05) return procurando(2)
  if (momento === M06) return { ...busca(porPerto(), HEROI), conectando: true }
  // a 07 pela URL: o traço já desenhado, parada
  if (momento === M07) return { ...busca(porPerto(), HEROI), conectado: true }
  return busca(porPerto(), HEROI)
}

// os estados da coluna, montados pela receita e parados
function quadroDoEstado(est) {
  const r = est ? RECEITAS[`T05/${est}`] : null
  if (!r) return null
  const casos = [...(r.casos ?? []), ...(r.aditivo ? [r.aditivo] : [])]
  const celular = quadroDoCelular(casos)
  if (celular) return celular
  if (casos.includes(CASO_BUSCA_VAZIA)) return vazia()
  if (casos.includes(CASO_CONEXAO)) return busca(pertoComFalha(), serialDaFalha(), true)
  // toda espera tem fim (decisão 64): o pareamento não confirmado (20) — a lista como está, o
  // módulo do pareando marcado, *não pareou* na linha dele, e o Tentar de novo
  if (casos.includes(CASO_PAREAMENTO)) return { ...busca(porPerto(), M.casos[M.casos[CASO_PAREAMENTO].base].moduloSerial), naoPareou: true }
  // a espera da conexão com a frase dela embaixo do primário — o
  // pareando (18, a primeira conexão com um VL06) e o reconectando (19, a conexão que caiu parada)
  const espera = ESPERAS.find((e) => casos.includes(e))
  if (espera) return { ...busca(porPerto(), M.casos[espera].moduloSerial), conectando: true, espera }
  return null
}

export default function T05({ momento, estado: est }) {
  const { estado, despachar } = useEstado()
  const [fluxo, setFluxo] = useState(() => inicio(momento))
  const vivo = useRef(null)
  vivo.current = { estado }
  const q = quadroDoEstado(est) ?? fluxo
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  // a troca de quadro: quando o título ou o rodapé trocam inteiros, o
  // conteúdo esmaece em 150, como entre telas — a lista (01) e o quadro da busca com o
  // escolhido (00, 02, 04) são desenhos diferentes. O que muda dentro do mesmo quadro
  // (marcar, o escolhido que troca, a trava do 04) move só a peça. Aberto pela URL, pelo
  // palco, num estado ou no print, parado. O rodapé nasce de novo em cada quadro (a chave, lá
  // embaixo): entre quadros, só a troca de quadro esmaece, e o texto do primário não esmaece
  // uma segunda vez por dentro dela (a nota da T01: dentro do quadro, o texto; entre
  // quadros, a troca)
  // a busca é um desenho só, a lista — marcar, conectar e a falha mudam a linha e o rodapé, não a tela
  const quadro = q.fase
  useTrocaDeQuadro(quadro)
  // o caso que acontece agora fica consumido na sessão; num estado da coluna, nada se grava
  const consumir = (...ids) => {
    const e = vivo.current.estado
    const novos = ids.filter((k) => !e.casosConsumidos.includes(k))
    if (est == null && novos.length) despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...e.casosConsumidos, ...novos] } })
  }

  // ── os toques (tela.md). Num estado da coluna o celular não toca; se
  // tocasse, cada toque parte do quadro que está na tela (q) e vira fluxo ──
  // na lista (01), tocar num módulo só o marca; o 'Conectar ao …' acende e é
  // ele que conecta (escolher numa lista marca, quem avança é o botão)
  // o escolhido é a linha marcada, em toda a T05 — a marca nova tira a falha da 04
  function escolher(serial) {
    if (fluxo.conectando || fluxo.conectado) return // conectando ou conectado, a lista fica, sem responder
    setFluxo((f) => ({ ...f, escolhido: serial, trava: false, naoPareou: false }))
    if (momento) ir('T05') // marcar é a 00, a tela: a URL segue
  }
  // a busca de novo (tela.md: a busca da T05/00 corre de novo, e a lista volta):
  // o *Procurando…* (05), com a URL dizendo a 05, e depois de RITMOS.buscaMs a lista sem nada escolhido (01)
  function procurar() {
    setFluxo(procurando((q.tentativa ?? 1) + 1, true))
    ir('T05', { momento: M05 })
  }
  useEffect(() => {
    if (est != null || !fluxo.correndo) return undefined
    // a lista que volta leva a marca `achou`: é o *a busca acha*, e ela surge em cascata
    const relogio = setTimeout(() => { setFluxo({ ...busca(porPerto(), null), achou: true, tentativa: fluxo.tentativa }); ir('T05', { momento: M01 }) }, RITMOS.buscaMs)
    return () => clearTimeout(relogio)
  }, [fluxo, est]) // eslint-disable-line react-hooks/exhaustive-deps
  // conectado: a sessão nasce no estado único, com o meio em que a busca achou o módulo e
  // nenhuma etapa ainda (o diagnóstico grava a dele), e a tela vai pro diagnóstico (T07),
  // que lê o módulo da sessão — o M2C-0999 trava lá, pelo serial fora do cadastro (T07/02)
  function abrirSessao(serial) {
    despachar({ tipo: 'mesclar', parcial: { sessao: sessaoNova(serial), etapas: estadoVazio().etapas } })
    ir('T07')
  }
  // conectar: o *Conectando…* (06) por RITMOS.buscaMs, com a URL dizendo a 06; aí a primeira
  // tentativa do módulo do caso não responde (04), uma vez; senão, conecta
  const espera = useRef(null)
  useEffect(() => () => clearTimeout(espera.current), [])
  function conectando(serial, depois, trava = false) {
    setFluxo({ ...busca(q.fase === 'busca' ? q.perto : porPerto(), serial, trava), conectando: true })
    ir('T05', { momento: M06 })
    espera.current = setTimeout(depois, RITMOS.buscaMs)
  }
  // o módulo respondeu — o Conectado ao … (07), o traço lima se desenha embaixo da
  // linha (uma vez, só no fluxo) e, depois de RITMOS.buscaMs (o mesmo número da espera, sem
  // número novo), a troca pra T07. Na falha, sem traço
  function conectado(serial) {
    setFluxo((f) => ({ ...busca(f.perto ?? porPerto(), serial), conectado: true, desenha: true }))
    ir('T05', { momento: M07 })
    espera.current = setTimeout(() => abrirSessao(serial), RITMOS.buscaMs)
  }
  function conectar(serial = q.escolhido) {
    if (fluxo.conectando || fluxo.conectado) return
    const falha = casosDoModulo(serial, vivo.current.estado.casosConsumidos).includes(CASO_CONEXAO)
    conectando(serial, () => {
      if (falha) {
        consumir(CASO_CONEXAO)
        setFluxo(busca(q.fase === 'busca' ? q.perto : porPerto(), serial, true))
        ir('T05')
        return
      }
      conectado(serial)
    })
  }
  // `Tentar de novo` (04): o mesmo *Conectando…*, sobre o quadro da 04; o caso já valeu, e a conexão segue
  function tentarDeNovo() {
    if (fluxo.conectando || fluxo.conectado) return
    const serial = q.escolhido
    conectando(serial, () => { consumir(CASO_CONEXAO); conectado(serial) }, true)
  }
  const voltar = () => ir('T04')
  // 16 · 17 · o primário do celular: o Android responde, e a tela vai pra busca
  // (a 01, como o Procurar de novo) ou pro quadro de depois (celular.js)
  function pedirAoAndroid() {
    const depois = depoisDoPedido(q)
    if (depois === 'busca') procurar()
    else setFluxo(depois)
  }

  // O voltar do Android (logica.md): o Voltar ao menu. Na busca (00, 01, 02, 04,
  // 20), que não tem saída pro menu no rodapé, ele leva ao menu, como o Voltar ao
  // menu do nenhum encontrado — o técnico que abriu a busca sem querer não fica
  // preso nela (decisão 64) · no vazio (03), sem Bluetooth ou sem a permissão (16,
  // 17) e procurando (05), o Voltar ao menu do rodapé · conectando e conectado (06,
  // 07), e pareando ou reconectando (18, 19), não faz nada: é a espera, e ela tem fim
  useVoltar(q.conectando || q.conectado ? null : voltar)
  // 20 · o Tentar de novo pede o pareamento de novo: o pareando (18), e o módulo conecta
  function parearDeNovo() {
    if (fluxo.conectando || fluxo.conectado) return
    const serial = q.escolhido
    setFluxo({ ...busca(q.perto, serial), conectando: true, espera: 'pareando' })
    ir('T05', { momento: M06 })
    espera.current = setTimeout(() => conectado(serial), RITMOS.buscaMs)
  }

  let miolo, rodape
  if (q.fase === 'celular') {
    // ── 16 · 17 · o celular impede a busca: o bloco da busca, com o Bluetooth riscado (lei 21) ──
    const t = textosDoCelular(q)
    miolo = (
      <>
        <CabecalhoConteudo titulo={TX.titulo} unidade={t.unidade} />
        <VazioDaBusca icone="bluetooth-desligado" titulo={t.titulo} frase={t.frase} />
      </>
    )
    rodape = <Rodape primario={t.primario} aoPrimario={pedirAoAndroid} link={TX.voltarAoMenu} aoLink={voltar} />
  } else if (q.fase === 'procurando') {
    // ── 05 · a busca de novo, enquanto corre: o poço com o quadrado de agora no lugar da lista ──
    const legenda = TX.qualTentativa(q.tentativa)
    miolo = (
      <>
        <CabecalhoConteudo titulo={TX.titulo} unidade={TX.procurando} />
        <VazioDaBusca agora titulo={TX.procurandoTitulo} frase={TX.aparecemAqui} />
        {legenda && <span className="t05-legenda">{legenda}</span>}
      </>
    )
    rodape = <Rodape primario={TX.procurarDeNovo} primarioDesabilitado link={TX.voltarAoMenu} aoLink={voltar} />
  } else if (q.fase === 'vazia') {
    // ── 03 · nenhum módulo respondeu: o vazio no lugar da lista ──
    const bv = buscaVazia()
    const legenda = TX.buscaDurou(bv.duracaoSeg, bv.tentativa)
    miolo = (
      <>
        <CabecalhoConteudo titulo={TX.titulo} unidade={TX.nenhumEncontrado} />
        <VazioDaBusca titulo={TX.nenhumRespondeu} frase={TX.aproxime} aviso={TX.semBluetoothNaoAparecem(variantesSemBluetooth())} />
        {legenda && <span className="t05-legenda">{legenda}</span>}
      </>
    )
    rodape = <Rodape primario={TX.procurarDeNovo} aoPrimario={procurar} link={TX.voltarAoMenu} aoLink={voltar} />
  } else {
    const { perto, escolhido, trava } = q
    // A T05 numa lista só. As cinco linhas iguais, só o número e o modelo (o firmware
    // é do diagnóstico), com a divisória embaixo de cada uma; o escolhido é a linha marcada (00),
    // e com um módulo só ele já vem marcado, com o nenhum outro embaixo (02). Na falha (04), a
    // linha dele diz não respondeu, e o que conferir vem embaixo da lista; no Conectando… (06),
    // só o texto do botão muda
    miolo = (
      <>
        <CabecalhoConteudo titulo={TX.titulo} contagem={perto.length} unidade={TX.encontrados(perto.length)} />
        <span id="t05-escolha" className="t05-frase">{TX.escolhaNaMao}</span>
        <Lista className="t05-lista" surge={!!q.achou} role="radiogroup" aria-labelledby="t05-escolha">
          {/* a última linha não tem divisória: quem fecha a lista é a borda do cartão */}
          {perto.map((p, i) => (
            <LinhaModulo key={p.serial} escolha serial={p.serial} variante={varianteNaLista(p.serial)} divisoria={i < perto.length - 1}
              marcado={p.serial === escolhido} falha={p.serial !== escolhido ? undefined : trava ? TX.naoRespondeu : q.naoPareou ? TX.naoPareou : undefined}
              confirmada={!!q.conectado && p.serial === escolhido} desenha={!!q.desenha && !EM_QUADRO && est == null}
              aoTocar={() => escolher(p.serial)} />
          ))}
        </Lista>
        {perto.length === 1 && <Nota titulo={TX.nenhumOutro} frase={TX.seNaoForEste} />}
        {trava && <OQueConferir rotulo={TX.oQueConferir} causas={TX.conferir} falha />}
      </>
    )
    if (q.conectado) rodape = <Rodape primario={TX.conectadoAo(escolhido)} primarioDesabilitado primarioTrocaTexto link={TX.procurarDeNovo} linkDesabilitado />
    else if (q.conectando && q.espera) rodape = <Rodape legenda={TX[q.espera].legenda} primario={TX[q.espera].primario(escolhido)} primarioDesabilitado primarioTrocaTexto link={TX.procurarDeNovo} linkDesabilitado />
    else if (q.conectando) rodape = <Rodape primario={TX.conectandoAo(escolhido)} primarioDesabilitado primarioTrocaTexto link={TX.procurarDeNovo} linkDesabilitado />
    else if (trava) rodape = <Rodape primario={TX.tentarDeNovo} aoPrimario={tentarDeNovo} primarioTrocaTexto link={TX.procurarDeNovo} aoLink={procurar} />
    // 20 · o pareamento não confirmado: a frase do que fazer no lugar da frase da espera, e o Tentar de novo
    else if (q.naoPareou) rodape = <Rodape legenda={TX.pareamentoNaoConfirmado} primario={TX.tentarDeNovo} aoPrimario={parearDeNovo} primarioTrocaTexto link={TX.procurarDeNovo} aoLink={procurar} />
    else if (escolhido) rodape = <Rodape primario={TX.conectarAo(escolhido)} aoPrimario={() => conectar()} primarioTrocaTexto link={TX.procurarDeNovo} aoLink={procurar} />
    else rodape = <Rodape legenda={TX.escolhaUm} primario={TX.conectar} primarioDesabilitado primarioTrocaTexto link={TX.procurarDeNovo} aoLink={procurar} />
  }

  return (
    <div className={`t05 ${q.espera || q.naoPareou ? 't05-espera' : ''}`}>
      <BarraDoSistema fundo="pagina" />
      <div className={`tela-miolo t05-miolo-busca ${q.fase === 'celular' ? 't05-miolo-celular' : ''}`}>{miolo}</div>
      <Fragment key={quadro}>{rodape}</Fragment>
    </div>
  )
}
