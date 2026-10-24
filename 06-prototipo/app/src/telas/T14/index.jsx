// T14 · Ciclo de testes (02-telas/T14-ciclo-dinamico): com a ignição ligada e o
// ônibus parado, deixar o app provar o que o módulo lê (decisão 54).
// · A entrada: a tela abre no quadro 01 — a fila do módulo drenando
//   (M.ciclo.mensagensGuardadas, ou a do modulo-com-pendencias no serial dele),
//   o prazo cheio e o disparo indisponível (sem legenda no
//   rodapé, que repetiria a frase da fila no prazo). A fila drena em
//   RITMOS.filaDrenagemMs, e o 'Disparar evento de teste' acende (o quadro da
//   fila drenada antes do disparo não tem referência: junta as peças que
//   existem). No print (EM_QUADRO), sem momento, a tela fica parada na 00.
// · O disparo: o prazo de 2:00 (M.ciclo.prazoEventoSeg) drena no tique do prazo
//   (1 s real vale 4 s de prazo). Os passos: no
//   máximo quatro, com o ônibus parado, cada um só quando se aplica — ignição ligada,
//   rotação (se o ativo lê rotação), cartão do motorista (se há leitor) e ignição
//   desligada; com tacógrafo digital no modelo, a velocidade depois da rotação. A
//   semente traz 2 passos feitos. O evento chega depois de recebidoAosSeg e o número
//   passa a ser o tempo que ele levou; os campos conferem depois de conferidoAosSeg.
// · O cartão em três momentos: a vez dele (a 00, *passe o cartão*), o módulo leu
//   (a 08: *leu 9412857*, com Confere com o cartão e Não confere) e a resposta do
//   técnico — o app não compara com cadastro nenhum. Não confere vira não conforme,
//   com a justificativa no checklist (a 10); confere, a vez da ignição desligada (a
//   11), que explica a espera. Os passos e o evento → 05-momento-ciclo-concluido.
// · Os estados da coluna, parados, pela receita, cada um na sessão do
//   caso: o 02 (evento-sem-resposta, o fim do prazo), o 03 (motor-desligado-no-ciclo,
//   a rotação zerada reprova e pede o motor ligado), o 09 (a segunda falha) e o 12
//   (sem-leitor: o ciclo em 3 passos, concluído). No fluxo, o
//   caso vale quando o par da faixa é o dele; o evento sem resposta, uma
//   vez por sessão: 'Disparar outro evento' tenta de novo, e os passos continuam
//   valendo.
// · 'Encerrar o ciclo' fecha a captura, e os pendentes ficam pendentes na
//   Seção E; 'Ir para o checklist' sai com o ciclo aberto — os dois → T13
//   (T14·2). 'Voltar ao checklist' → T13 · 'Voltar ao menu' → T04 (T14·4).
//   ENCERRAR → antes de homologar, o diálogo Encerrar antes de terminar? por cima
//   da tela (decisão 36), e a sessão abortada. O voltar do Android
//   (o Esc) faz o mesmo que o link de saída do rodapé (logica.md).
// · O ciclo fica gravado em etapas.ciclo: os passos pelo id do item da Seção E,
//   o evento, o cartão (o lido e a resposta) e se a captura foi fechada. Voltar à
//   T14 com o ciclo aberto retoma os passos que já valem; o evento se dispara de novo.
// · O movimento: a fila que drena, o prazo que estoura e o ciclo que conclui
//   trocam o desenho, e o conteúdo esmaece; o disparo troca o texto do
//   primário no lugar; o prazo drena contínuo, um trecho linear por tique;
//   o check do passo e o horário do evento esmaecem (as peças). Nada
//   anima ao abrir.
import { Fragment, useEffect, useRef, useState } from 'react'
import { BarraDoSistema, Faixa, CabecalhoConteudo, Prazo, BlocoEvento, Lista, LinhaChecagem, Rodape, ESTADOS, useTrocaDeQuadro } from '../../ds/index.js'
import { BotaoDaLinha, RespostasDaLinha } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import { minSeg } from '../../dados/formato.js'
import {
  REF, CASO_SEM_RESPOSTA, CASO_DE_NOVO, CASO_MOTOR, CASO_SEM_LEITOR, PRAZO, EVENTO, TIQUE_MS, quadro05,
  horaDoRecebido, ativoDe, parDaSessao, parDoCaso, casosDoPar, filaDoModulo, veredito, causaDo, CARTAO_LIDO,
  passosDo, passosNaEntrada, passosFeitos, passosDoRegistro, passosAte, tiqueDe, CHAVE, passoDaVez, FILA_NO_QUADRO_01,
} from './ciclo.js'
import { T } from './textos.js'
import './t14.css'


// o quadro em que a tela abre. fase: 'drenando' (a fila sai do módulo) ·
// 'drenada' (o disparo acende) · 'correndo' (o prazo drena) · 'estourado' (o
// prazo acabou sem o evento) · 'concluido'. tique: os segundos de prazo desde o disparo.
function inicio(momento, est, unico) {
  const doCaso = { [REF.estourado]: CASO_SEM_RESPOSTA, [REF.segundaFalha]: CASO_DE_NOVO, [REF.fora]: CASO_MOTOR, [REF.semLeitor]: CASO_SEM_LEITOR }[est] ?? null
  const par = doCaso ? parDoCaso(doCaso) : parDaSessao(unico.sessao)
  // num estado da coluna, o caso vale sempre (a receita); no fluxo, uma vez por sessão
  const casos = casosDoPar(par, est ? [] : unico.casosConsumidos)
  // os passos do par: os que se aplicam, e a velocidade com tacógrafo digital · a 12, sem o cartão
  const lista = passosDo(par, { semLeitor: doCaso === CASO_SEM_LEITOR })
  // resposta: o que o técnico disse do cartão ('aprovada' · 'reprovada') e o tique em que disse
  const base = { par, casos, lista, tentativa: 1, resposta: { cartao: null, em: null } }
  const cartao = lista.findIndex((p) => p.chave === CHAVE.cartao)
  const lido = cartao >= 0 ? tiqueDe(lista, cartao) : null
  if (est === REF.estourado) return { ...base, fase: 'estourado', tique: PRAZO, passos: passosFeitos(lista, casos) }
  // a 09: a 2ª tentativa também estourou — as que estouram vêm do caso
  if (est === REF.segundaFalha) {
    const estouram = M.casos[CASO_DE_NOVO].tentativasQueEstouram
    return { ...base, casos: { ...casos, estouram }, tentativa: estouram, fase: 'estourado', tique: PRAZO, passos: passosFeitos(lista, casos) }
  }
  // a 12: o ativo sem leitor, os 3 passos feitos e o evento conferido
  if (est === REF.semLeitor) return { ...base, fase: 'concluido', tique: quadro05(lista), passos: passosFeitos(lista, casos) }
  // o 03 e os outros estados: o instante antes de o evento chegar (1:36)
  if (est != null) return { ...base, fase: 'correndo', tique: EVENTO.recebidoAosSeg, passos: passosNaEntrada(lista, casos) }
  // o cartão: a 08, o módulo leu · a 10 e a 11, a resposta e a vez da ignição desligada,
  // 3 s depois — pela URL, parados até o toque
  if (lido != null && momento === REF.leuCartao) return { ...base, fase: 'correndo', tique: lido, passos: passosAte(lista, casos, lido), parado: true }
  if (lido != null && (momento === REF.naoConfere || momento === REF.vezDaIgnicao)) {
    const resposta = { cartao: momento === REF.naoConfere ? 'reprovada' : 'aprovada', em: lido }
    const tique = lido + RITMOS.cicloPassoMs / TIQUE_MS
    return { ...base, resposta, fase: 'correndo', tique, passos: passosAte(lista, casos, tique, resposta), parado: true }
  }
  if (momento === REF.concluido) return { ...base, resposta: { cartao: 'aprovada', em: lido }, fase: 'concluido', tique: quadro05(lista), passos: passosFeitos(lista, casos) }
  if (EM_QUADRO) {
    // a 00: a vez do cartão, com o evento já chegado e conferido, no instante antes de o módulo ler
    return momento === REF.antes
      ? { ...base, fase: 'drenando', tique: 0, passos: passosNaEntrada(lista, casos) }
      : { ...base, fase: 'correndo', tique: lido ?? EVENTO.recebidoAosSeg, passos: passosAte(lista, casos, (lido ?? 1) - 1), parado: true }
  }
  // no fluxo, a entrada é a 01. Com o ciclo deste par já gravado, os passos
  // que valem ficam; o ciclo concluído abre concluído
  const salvo = unico.etapas.ciclo
  if (salvo && salvo.ativoId === par.ativoId && salvo.moduloSerial === par.moduloSerial) {
    const retomado = { ...base, passos: passosDoRegistro(salvo, lista), resposta: salvo.cartao?.resposta ? { cartao: salvo.cartao.resposta, em: 0 } : base.resposta }
    return salvo.concluido ? { ...retomado, fase: 'concluido', tique: quadro05(lista) } : { ...retomado, fase: 'drenando', tique: 0 }
  }
  return { ...base, fase: 'drenando', tique: 0, passos: passosNaEntrada(lista, casos) }
}

// o evento desta tentativa não vai chegar (o caso evento-sem-resposta, 1ª tentativa)
const semResposta = (f) => (f.casos.semResposta && f.tentativa === 1) || f.tentativa <= (f.casos.estouram ?? 0)
const recebido = (f) => !semResposta(f) && (f.fase === 'concluido' || (f.fase === 'correndo' && f.tique > EVENTO.recebidoAosSeg))
const conferido = (f) => !semResposta(f) && (f.fase === 'concluido' || (f.fase === 'correndo' && f.tique > EVENTO.conferidoAosSeg))
// o quadro chegou ao fim do que acontece sozinho: o evento conferido e nenhum passo por fazer
// nem esperando a resposta do técnico (o cartão lido)
const assentado = (f) => conferido(f) && !f.passos.includes('pendente') && !f.passos.includes('lido')

// um tique do prazo: os passos que chegaram na hora acendem; o prazo acaba sem
// o evento (02), ou os passos e o evento fecham o ciclo (05). O passo reprovado (a
// rotação zerada, o cartão que não confere) segura o ciclo aberto; o cartão lido espera o técnico
function avancar(f) {
  if (f.fase !== 'correndo' || assentado(f)) return f
  const tique = f.tique + 1
  const passos = f.passos.map((e, i) => (e === 'pendente' && tique >= tiqueDe(f.lista, i, f.resposta.em, f.cartaoDesde) ? veredito(f.lista[i], f.casos, f.resposta.cartao) : e))
  const g = { ...f, tique, passos }
  if (semResposta(g) && tique >= PRAZO) return { ...g, tique: PRAZO, fase: 'estourado' }
  if (assentado(g) && passos.every((e) => e === 'aprovada')) return { ...g, fase: 'concluido' }
  return g
}

// o que fica gravado em etapas.ciclo (logica.md · o ciclo de testes) — o que a
// T13 lê: os passos pelo id (os e-1 a e-6 da Seção E e, com tacógrafo, o
// e-velocidade, que a E não tem), os feitos e o total do par, o evento ('antes'
// · 'disparado' · 'recebido' · 'conferido' · 'nao-chegou'), a tentativa, o
// cartão e a correção do caso de identificador, o motor desligado (o passo e o
// lido do caso), e se o ciclo concluiu ou a captura foi fechada · o cartão: o
// que o módulo leu e a resposta do técnico — não confere vira não conforme, que pede a
// justificativa no checklist
function registro(f, fechado = false) {
  const evento = f.fase === 'estourado' ? 'nao-chegou' : conferido(f) ? 'conferido' : recebido(f) ? 'recebido'
    : f.fase === 'correndo' ? 'disparado' : 'antes'
  const { motor } = f.casos
  const i = f.lista.findIndex((p) => p.chave === CHAVE.cartao)
  const lido = i >= 0 && f.passos[i] !== 'pendente'
  return {
    ativoId: f.par.ativoId, moduloSerial: f.par.moduloSerial,
    passos: Object.fromEntries(f.lista.map((p, k) => [p.id, f.passos[k] === 'lido' ? 'pendente' : f.passos[k]])),
    feitos: f.passos.filter((e) => e === 'aprovada').length, total: f.lista.length,
    evento, tentativa: f.tentativa,
    cartao: lido ? { lido: CARTAO_LIDO, resposta: f.resposta.cartao } : null,
    motor: motor ? { passo: motor.passo, lido: motor.lido } : null,
    concluido: f.fase === 'concluido', fechado,
  }
}

export default function T14({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const [fluxo, setFluxo] = useState(() => inicio(momento, est, unico))
  const vivo = useRef(null)
  vivo.current = { fluxo, unico, momento }
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })

  // a fila do módulo drena antes do disparo; para no print e num estado da coluna
  useEffect(() => {
    if (EM_QUADRO || est != null || fluxo.fase !== 'drenando') return undefined
    const t = setTimeout(() => setFluxo((f) => (f.fase === 'drenando' ? { ...f, fase: 'drenada' } : f)), RITMOS.filaDrenagemMs)
    return () => clearTimeout(t)
  }, [fluxo.fase, est])

  // o prazo anda um segundo por tique, até o quadro assentar
  const correndo = !EM_QUADRO && est == null && fluxo.fase === 'correndo' && !assentado(fluxo) && !fluxo.parado
  useEffect(() => {
    if (!correndo) return undefined
    const relogio = setInterval(() => setFluxo(avancar), TIQUE_MS)
    return () => clearInterval(relogio)
  }, [correndo])

  // o prazo estourou sem o evento: o caso fica consumido nesta sessão
  useEffect(() => {
    if (est != null || fluxo.fase !== 'estourado') return
    const u = vivo.current.unico
    if (!u.casosConsumidos.includes(CASO_SEM_RESPOSTA)) despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...u.casosConsumidos, CASO_SEM_RESPOSTA] } })
  }, [fluxo.fase, est, despachar])

  // a URL segue o quadro: o módulo leu o cartão (08), a resposta (10, 11) e os passos e o evento (05)
  const iCartao = fluxo.lista.findIndex((p) => p.chave === CHAVE.cartao)
  const doQuadro = fluxo.fase === 'concluido' ? REF.concluido
    : fluxo.fase !== 'correndo' || iCartao < 0 ? null
      : fluxo.passos[iCartao] === 'lido' ? REF.leuCartao
        : fluxo.resposta.cartao === 'reprovada' ? REF.naoConfere
          : fluxo.resposta.cartao === 'aprovada' && fluxo.passos.includes('pendente') ? REF.vezDaIgnicao : null
  useEffect(() => {
    if (est != null || !doQuadro || vivo.current.momento === doQuadro) return
    despachar({ tipo: 'ir', tela: 'T14', momento: doQuadro })
  }, [doQuadro, est, despachar])

  // o ciclo fica gravado no estado único a cada fato novo (etapas.ciclo)
  const fato = JSON.stringify(registro(fluxo))
  useEffect(() => {
    if (est != null) return
    const u = vivo.current.unico
    if (JSON.stringify(u.etapas.ciclo) === fato) return
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, ciclo: JSON.parse(fato) } } })
  }, [fato, est, despachar])

  // ── os toques ──
  const sair = (tela, fechado) => {
    const u = vivo.current.unico
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, ciclo: registro(vivo.current.fluxo, fechado) } } })
    ir(tela)
  }
  const disparar = () => {
    setFluxo((f) => ({ ...f, fase: 'correndo', tique: 0 }))
    if (momento != null) ir('T14') // a 01 ficou pra trás: a URL volta a ser a da tela
  }
  const dispararOutro = () => setFluxo((f) => ({ ...f, fase: 'correndo', tique: 0, tentativa: f.tentativa + 1 }))
  const encerrarCiclo = () => sair('T13', true)   // fecha a captura: os pendentes ficam pendentes na Seção E (T14·2)
  const irAoChecklist = () => sair('T13', false)  // sai com o ciclo aberto (T14·2)
  // a resposta do técnico ao cartão lido (T14/08): o veredito do passo, e a ignição desligada 3 s depois
  // (o quadro aberto pela URL, parado, volta a correr com o toque)
  const responder = (cartao) => setFluxo((f) => {
    const resposta = { cartao, em: f.tique }
    const passos = f.passos.map((e, i) => (e === 'lido' ? veredito(f.lista[i], f.casos, cartao) : e))
    return { ...f, resposta, passos, parado: false }
  })
  // o não confere se refaz (decisão 64, a 10): o Passar de novo devolve a vez ao cartão — passe o cartão (a
  // 00), e o módulo lê de novo 3 s depois —, e a ignição desligada volta a esperar a vez dela, na ordem do
  // ciclo · vale a última resposta · a URL volta à da tela, a vez do cartão · o *não confere* e o botão saem
  // esmaecendo, em 150 (animacao.md), e aí a linha volta; com reduzir, direto
  const [passando, setPassando] = useState(false)
  const saindo = useRef(false)   // o fim do esmaecer chega uma vez por peça que sai: vale o primeiro
  function passarDeNovo() { if (!passando) { saindo.current = true; setPassando(true) } }
  function cartaoSaiu(e) {
    if (e.animationName !== 't14-cartao-sai' || !saindo.current) return
    saindo.current = false
    setPassando(false)
    setFluxo((f) => {
      const i = f.lista.findIndex((p) => p.chave === CHAVE.cartao)
      return { ...f, passos: f.passos.map((e, k) => (k >= i ? 'pendente' : e)), resposta: { cartao: null, em: null }, cartaoDesde: f.tique, parado: false }
    })
    if (momento != null) ir('T14')
  }
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar antes de terminar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar()

  // ── o quadro ──
  const { par, casos, fase, tique, passos, tentativa, resposta } = fluxo
  // O desenho de cada fase (T14 01 → 00): o antes do disparo (a fila saindo do
  // módulo, com a frase dela no prazo e a espera no rodapé), o prazo (a fila drenada, o disparo
  // e o prazo correndo), o prazo estourado (a frase da Seção F e o disparar outro) e o ciclo
  // concluído (o rodapé troca inteiro). Quando um vira o outro — pelo processo (a fila que drena,
  // o prazo que acaba, o último passo) ou pelo toque (Disparar outro evento) —, o conteúdo
  // esmaece em 150, como entre telas; dentro de um, move só a peça: o disparo troca o texto do
  // primário no lugar e o prazo drena
  const quadro = fase === 'drenando' ? 'antes' : fase === 'estourado' ? 'estourado' : fase === 'concluido' ? 'concluido' : 'prazo'
  useTrocaDeQuadro(quadro)
  const estourado = fase === 'estourado'
  const disparado = fase === 'correndo' || estourado || fase === 'concluido'
  const chegou = recebido(fluxo)
  const conferiu = conferido(fluxo)
  const total = fluxo.lista.length
  // o passo da vez: o quadrado de agora e a ação do técnico
  const vez = passoDaVez(passos, casos, fase === 'correndo')
  // os passos feitos: os aprovados, e o cartão respondido — o que não confere também está feito (a 10, *3 de 4*)
  const aprovados = passos.filter((e, i) => e === 'aprovada' || (e === 'reprovada' && fluxo.lista[i].chave === CHAVE.cartao)).length
  // o que resta do prazo; depois que o evento chega, a barra fica no que restava
  const restante = chegou ? PRAZO - EVENTO.recebidoAosSeg : disparado ? Math.max(0, PRAZO - tique) : PRAZO

  const prazo = (
    <Prazo
      rotulo={chegou ? T.chegouEm : T.prazo}
      nota={fase === 'drenando' ? T.filaDrenando : T.filaDrenada}
      tempo={minSeg(chegou ? EVENTO.recebidoAosSeg : restante)}
      restante={restante} limite={PRAZO} segue={TIQUE_MS}
      /* com o evento chegado, o preenchido para na chegada e o marcador branco segue o tempo */
      marcador={chegou ? Math.max(0, PRAZO - tique) : undefined}
      legendas={{ inicio: chegou ? T.disparadoAs(M.HORA_NOMINAL) : minSeg(0), fim: T.limite(PRAZO) }}
      detalhe={fase === 'drenando' ? T.filaSaindo(filaDoModulo(par.moduloSerial)) : estourado ? [T.secaoF, ...(tentativa > 1 ? [{ texto: T.segundaVez, tom: 'falha' }] : [])] : null}
      falha={estourado}
      fila={fase === 'drenando' ? (EM_QUADRO ? { resta: FILA_NO_QUADRO_01 } : { resta: 1, ms: RITMOS.filaDrenagemMs }) : undefined}
    />
  )

  // o relógio de quem espera o servidor: 'em andamento' com o evento no ar; antes
  // do disparo, nada anda, e o leitor ouve 'ainda não' (o nome segue o dado)
  const nomeEspera = disparado ? undefined : ESTADOS.espera.nome
  const evento = (
    <BlocoEvento rotulo={T.evento} linhas={[
      { texto: T.disparado, estado: disparado ? 'feito' : 'pronto', valor: M.HORA_NOMINAL },
      { texto: T.recebido, estado: estourado ? 'falha' : chegou ? 'feito' : 'aguarda', valor: estourado ? T.naoChegou : horaDoRecebido(), nome: nomeEspera },
      { texto: T.campos, estado: estourado ? 'parado' : conferiu ? 'feito' : 'aguarda', valor: T.conferidos(EVENTO.campos), nome: nomeEspera },
    ]} />
  )

  // os passos do par: o reprovado leva a causa embaixo, com o recheio justo (4,
  // a 03). No prazo estourado, a última linha leva a folga do pé do cartão (40, folha 4).
  // O cartão: lido, o que o módulo leu à direita e as duas respostas embaixo (08);
  // não confere, o xis, *não confere* e *justifique no checklist* (10) · a ignição desligada da
  // vez, depois do cartão, explica a espera embaixo (10, 11)
  const lista = (
    <Lista recheio="passos">
      {fluxo.lista.map((p, i) => {
        const e = passos[i]
        const ultima = i === fluxo.lista.length - 1
        const causa = e === 'reprovada' ? causaDo(p, casos) : undefined
        // o que vai embaixo da linha (as respostas, a espera explicada) é irmão dela, com a divisória
        // por baixo: a linha do passo é sempre a mesma peça, e o check que chega esmaece no poço
        const comExtra = (props, extra) => (
          <Fragment key={p.id}>
            <LinhaChecagem variante="passo" titulo={p.titulo} estado="agora" divisoria={false} {...props} />
            <div className={ultima ? undefined : 't14-passo-extra-divisoria'}>{extra}</div>
          </Fragment>
        )
        if (i === vez && e === 'lido') {
          return comExtra({ valor: T.leu(CARTAO_LIDO) }, (
            <RespostasDaLinha className="t14-respostas">
              <BotaoDaLinha letra="secundario" aoTocar={() => responder('aprovada')}>{T.confereComOCartao}</BotaoDaLinha>
              <BotaoDaLinha letra="secundario" aoTocar={() => responder('reprovada')}>{T.naoConfere}</BotaoDaLinha>
            </RespostasDaLinha>
          ))
        }
        if (i === vez) {
          // a ignição desligada depois do cartão respondido: a espera explicada embaixo
          const explica = p.chave === CHAVE.ignicaoDesligada && resposta.cartao != null
          if (!explica) return <Fragment key={p.id}><LinhaChecagem variante="passo" titulo={p.titulo} estado="agora" valor={T.acao[p.chave]} divisoria={!ultima} /></Fragment>
          return comExtra({ valor: T.acao[p.chave] }, <span className="t14-explica">{T.esperaDaIgnicao}</span>)
        }
        // o cartão que não confere (a 10): a causa embaixo do nome, em vermelho, e o Passar de novo na
        // própria linha, o botão da linha (folha 6), enquanto o ciclo corre (decisão 64)
        if (p.chave === CHAVE.cartao && e === 'reprovada') {
          const passar = fase === 'concluido' ? undefined
            : <BotaoDaLinha tam="teste" letra="secundario" aoTocar={passarDeNovo}>{T.passarDeNovo}</BotaoDaLinha>
          return (
            <Fragment key={p.id}><LinhaChecagem variante="passo" titulo={p.titulo} estado="reprovada" valor={passar ? undefined : T.naoConfereValor} acao={passar}
              causa={T.naoConfereJustifique} recheioCausa="justo" className={`t14-cartao-nao-confere ${passando ? 't14-cartao-sai' : ''}`} divisoria={!ultima} /></Fragment>
          )
        }
        return (
          <Fragment key={p.id}><LinhaChecagem variante="passo" titulo={p.titulo}
            estado={e === 'pendente' ? 'ainda-nao' : e}
            glifo={e === 'pendente' ? 'relogio' : undefined} nomeGlifo={e === 'pendente' ? ESTADOS.espera.nome : undefined}
            causa={causa} recheioCausa={causa ? 'justo' : undefined}
            divisoria={!ultima} folgaFim={ultima && estourado} /></Fragment>
        )
      })}
    </Lista>
  )

  // O voltar do Android (logica.md): no computador, o Esc — o mesmo que o link de
  // saída do rodapé: 'Ir para o checklist' (sai com o ciclo aberto, T14·2) e, no
  // ciclo concluído, 'Voltar ao menu'. Num estado da coluna, o celular não toca, e a peça não escuta.
  useVoltar(fase === 'concluido' ? () => ir('T04') : irAoChecklist)

  let rodape
  if (fase === 'drenando') {
    // o primário apagado diz a ação, e quem explica é a frase da fila no prazo (sem legenda repetida)
    rodape = <Rodape primario={T.disparar} primarioDesabilitado link={T.irAoChecklist} aoLink={irAoChecklist} />
  } else if (fase === 'drenada') {
    // o disparo troca o texto do primário no lugar: Disparar evento de teste → Aguardando o evento
    rodape = <Rodape primario={T.disparar} aoPrimario={disparar} primarioTrocaTexto link={T.irAoChecklist} aoLink={irAoChecklist} />
  } else if (fase === 'correndo' && !chegou) {
    // depois do disparo, o primário desliga e diz o que espera; o Encerrar o ciclo só
    // acende quando o evento chega ou o prazo estoura — o toque duplo não encerra o ciclo
    rodape = <Rodape primario={T.aguardandoEvento} primarioDesabilitado primarioTrocaTexto link={T.irAoChecklist} aoLink={irAoChecklist} />
  } else if (estourado) {
    rodape = <Rodape primario={T.dispararOutro} aoPrimario={dispararOutro} link={T.irAoChecklist} aoLink={irAoChecklist} />
  } else if (fase === 'concluido') {
    // Ir para o checklist, que vale pras duas portas de entrada (a calibração e o checklist)
    rodape = <Rodape primario={T.irAoChecklist} aoPrimario={() => ir('T13')} link={T.voltarAoMenu} aoLink={() => ir('T04')} />
  } else {
    rodape = <Rodape primario={T.encerrarCiclo} aoPrimario={encerrarCiclo} primarioTrocaTexto primarioAcende link={T.irAoChecklist} aoLink={irAoChecklist} />
  }

  return (
    <div className="t14">
      <BarraDoSistema fundo="faixa" veu={enc.veu} />
      <Faixa serial={par.moduloSerial} placa={ativoDe(par.ativoId).placa} acao={T.encerrar} aoEncerrar={enc.encerrar} />
      {/* o miolo e o rodapé nascem com o quadro: dentro da troca, nada anda nem esmaece de novo por
          dentro (o passo que fecha o ciclo, o prazo que acaba) */}
      <div className="tela-miolo t14-miolo" onAnimationEnd={cartaoSaiu}>
        <Fragment key={quadro}>
          <CabecalhoConteudo titulo={T.titulo} contagem={aprovados} unidade={T.dePassos(total)} />
          {prazo}
          {evento}
          {lista}
        </Fragment>
      </div>
      <Fragment key={quadro}>{rodape}</Fragment>
      {enc.sobre}
    </div>
  )
}
