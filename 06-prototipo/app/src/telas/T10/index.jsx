// T10 · Calibração (02-telas/T10-calibracao): o módulo passa a contar o mesmo
// que o painel do veículo. Pela decisão 52, sem foto: o semear
// acende com o número digitado, e o horímetro é opcional.
// · As grandezas e a ordem: o cadastro do modelo do ativo da sessão, menos as
//   que o módulo não mede (T10·1, calibracao.js). O 'Depois:' mostra só a
//   próxima (T10·2), com ', opcional' quando o cadastro deixa pular; a 03
//   mantém o texto dela, com todas as que faltam. O passo opcional sem
//   próxima diz 'Opcional · o último passo' (08), e com tudo semeado,
//   'Calibração completa' (09).
// · O campo do painel (o valor alvo, com o teclado numérico): o técnico digita
//   o que o painel mostra. O botão acende com o número digitado, e sempre diz o
//   que falta: Digite o que o painel mostra → Semear o hodômetro.
// · Semear → Gravando no módulo… → Relendo… (1 s + 1 s, ritmos.js) → o tambor
//   rola até o relido e a tela vira o semeado (01), ou, com a releitura acima
//   da tolerância, o não confere (10), que pede Semear de novo. O semear grava
//   no módulo e não para: nos 2 s, o link do
//   rodapé fica no lugar, desabilitado de verdade e em tinta apagada, e o
//   voltar do sistema não faz nada. O ENCERRAR faz o mesmo que o voltar:
//   apagado, e não faz nada (a lei 17).
// · O opcional (decisão 52): depois do hodômetro, Calibrar o horímetro e o link
//   Pular o horímetro (01), e no passo do horímetro o mesmo link (08). Pular
//   segue pro ciclo: a etapa grava o horímetro em `puladas`,
//   e a T13 mostra o item dele como não calibrado, sem bloquear.
// · A calibração completa (09) aponta o ciclo: Fazer o ciclo de testes → T14,
//   e Voltar ao menu → T04, embaixo.
// · A calibração vai pro estado único (etapas.calibracao: o digitado, o
//   semeado e o pulado de cada grandeza) e volta de onde parou; a URL diz o
//   quadro da referência em que o passo está (calibracao.js, quadroDe).
// · Os estados da coluna, parados, pelo dado da receita (calibracao.js): o 02
//   e o 03 no a-09, o 04 no a-22, o 10 no caso releitura-nao-confere.
// · ENCERRAR, antes de homologar, abre o diálogo Encerrar antes de terminar? por
//   cima da tela (decisão 36), que leva à sessão abortada da T16; depois,
//   o encerramento. O voltar do sistema é o Voltar ao menu em todo passo —
//   também onde o link do rodapé é o Pular (tela.md) —, e no semear, nada.
// · O movimento, o mesmo vocabulário das outras telas, e nada ao abrir:
//   - o passo seguinte é outro desenho — o título, o miolo e o rodapé trocam
//     inteiros —: no Calibrar o …, o conteúdo esmaece em 150; o miolo
//     e o rodapé nascem com o quadro, e nada esmaece de novo por dentro;
//   - o campo do painel: o traço de foco acende por cima da borda (a peça);
//   - o primário diz o que falta, e o texto novo esmaece no lugar; o
//     que se apaga no toque perde o roxo de uma vez; o que acende no
//     fim do semear acende com o texto do passo seguinte, que esmaece no lugar,
//     com o roxo direto (a peça);
//   - o semear, em sequência (T10·4 a): no fim do Relendo…, o tambor
//     rola até o relido (500); quando ele para, a diferença encolhe e
//     esmaece em 300 (a peça); o veredito assenta no fim dos 300 — o confere
//     (ou o não confere) entra na régua, e no mesmo quadro o poço acende, o
//     alvo diz que cumpriu, o segmento fica feito e o primário acende. Até lá,
//     o processo não acabou: o Relendo…, o link e o ENCERRAR ficam como
//     estavam. Com reduzir, tudo direto, no mesmo ritmo.
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, Segmentado, ValorEmPoco, ReguaDiferenca, ValorAlvo, Declarado, Rodape, useTrocaDeQuadro,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { milhar } from '../../dados/formato.js'
import {
  REF, grandezaDe, ativoDe, grandezasDoPar, nadaACalibrar, moduloConta, painelMostra, semeadoHa, releitura, mundoDoEstado, digitos, quadroDe,
} from './calibracao.js'
import { T } from './textos.js'
import './t10.css'

const HORA = M.HORA_NOMINAL
// As referências da calibração consultadas como estado mantêm o relógio e as ações parados.
const consultaDeCalibracao = (est) => est === REF.tela || Object.values(REF).some((r) => r === est && r.includes('-momento-'))
// o módulo foi gravado e conferiu: o segmento do passo acende (01), alto como o atual (08 e 09) · o
// não confere (10) fica no segmento atual, branco — gravou, mas não conferiu
const GRAVADO = ['semeada']
const passoVazio = () => ({ digitado: '', fase: 'pronta', relido: null })
// o tempo de um token de movimento, em ms (com reduzir movimento, 0)
function duracao(token) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  const n = parseFloat(v)
  return Number.isFinite(n) ? (/ms$/.test(v) ? n : n * 1000) : 0
}

// um passo como o estado único guardou — ou como a T13 o semeia, com o semeado e sem o digitado
function passoDaEtapa(e, g) {
  const s = e.semeadas?.[g]
  const digitado = e.painel?.[g] ?? (s?.painel != null ? String(s.painel) : '')
  if (!s) return { ...passoVazio(), digitado }
  return { digitado, fase: 'semeada', relido: { valor: s.relido ?? s.painel, confere: true } }
}

// a calibração no estado único: o digitado, o semeado e o pulado de cada grandeza.
// `puladas`: os opcionais que o técnico pulou e não semeou — a
// T13 mostra o item deles, na Seção D, como não calibrado, sem bloquear. A foto
// do painel não é daqui (decisão 52): é o item Painel da Seção B
function etapaDe(fluxo, ordem, ativoId, moduloSerial) {
  const painel = {}; const semeadas = {}
  for (const g of ordem) {
    const p = fluxo.passos[g]
    if (p.digitado) painel[g] = p.digitado
    if (p.fase === 'semeada') semeadas[g] = { painel: Number(p.digitado), relido: p.relido?.valor, confere: true, as: HORA }
    // corrigindo (a 12), o módulo continua contando o que foi semeado, até semear de novo
    if (p.fase === 'corrigindo') semeadas[g] = { painel: p.relido?.valor, relido: p.relido?.valor, confere: true, as: HORA }
  }
  const puladas = ordem.filter((g) => fluxo.puladas.includes(g) && !semeadas[g])
  return {
    ativoId, moduloSerial, passo: ordem[fluxo.atual],
    painel, semeadas, puladas, concluida: fluxo.concluida,
  }
}

// o quadro em que a tela abre. No estado da coluna, o do caso, parado. No
// fluxo, o que o estado único guardou desta calibração — e ele ganha da URL:
// de volta da coluna do palco, o momento só devolve o que a etapa não guarda,
// o foco no campo (05), e o número digitado continua o do técnico. Sem etapa,
// pela URL, o quadro da referência, depois dos toques que levam a ele (o
// número digitado é o do mock).
function inicio({ momento, est, mundo, ordem, etapa, ativoId }) {
  const passos = Object.fromEntries(ordem.map((g) => [g, passoVazio()]))
  const f = { atual: 0, passos, focado: false, concluida: false, puladas: [] }
  if (est) {
    // a 02: o passo da rotação, com o que vem antes dela feito
    if (est === REF.coletor) {
      const i = ordem.findIndex((g) => grandezaDe(g).natureza === 'ajuste')
      ordem.slice(0, i).forEach((g) => { passos[g] = { ...passoVazio(), fase: 'semeada' } })
      f.atual = Math.max(0, i)
    }
    const c = est === REF.naoConfere ? mundo?.caso : null
    if (c && passos[c.grandeza]) {
      const painel = painelMostra(ativoId, c.grandeza)
      passos[c.grandeza] = { digitado: String(painel), fase: 'nao-confere', relido: releitura(c.grandeza, painel, c.relidoBruto) }
      f.atual = ordem.indexOf(c.grandeza)
    }
    return f
  }
  const e = etapa && etapa.ativoId === ativoId ? etapa : null
  if (e) {
    for (const g of ordem) passos[g] = passoDaEtapa(e, g)
    f.atual = Math.max(0, ordem.indexOf(e.passo)); f.concluida = !!e.concluida
    f.puladas = e.puladas ?? []
    f.focado = momento === REF.digitado
    return f
  }
  const temPainel = (g) => painelMostra(ativoId, g) != null
  const digita = (g) => { passos[g] = { ...passos[g], digitado: String(painelMostra(ativoId, g)) } }
  const semeia = (g) => { digita(g); passos[g] = { ...passos[g], fase: 'semeada', relido: releitura(g, Number(passos[g].digitado)) } }
  const hod = ordem.indexOf('hodometro'); const hor = ordem.indexOf('horimetro')
  if ([REF.digitado, REF.semeado, REF.gravando, REF.relendo, REF.corrigindo].includes(momento) && hod >= 0 && temPainel('hodometro')) {
    f.atual = hod
    digita('hodometro')
    if (momento === REF.digitado) f.focado = true
    // a 06 e a 07: o semear parado num dos dois textos
    if (momento === REF.gravando) passos.hodometro = { ...passos.hodometro, fase: 'gravando' }
    if (momento === REF.relendo) passos.hodometro = { ...passos.hodometro, fase: 'relendo' }
    if (momento === REF.semeado) semeia('hodometro')
    // a 12: o semeado tocado, o painel aberto de novo, em foco, com o número semeado
    if (momento === REF.corrigindo) { semeia('hodometro'); passos.hodometro = { ...passos.hodometro, fase: 'corrigindo' }; f.focado = true }
  }
  // a 08 e a 09: os passos de antes, feitos — os de número, semeados com o do mock; os de ajuste (a rotação,
  // a velocidade, que o motor ligado lê e o mock não traz), feitos sem número (o caminhão)
  const semeiaOuFaz = (x) => (temPainel(x) ? semeia(x) : (passos[x] = { ...passoVazio(), fase: 'semeada' }))
  if ([REF.horimetro, REF.completa].includes(momento) && hor > 0 && ordem.slice(0, hor).some(temPainel)) {
    ordem.slice(0, hor).forEach(semeiaOuFaz)
    passos.horimetro = passoVazio()
    f.atual = hor
    if (momento === REF.completa && temPainel('horimetro')) semeia('horimetro')
  }
  return f
}

// a sessão do quadro: a do caso, num estado da coluna; no fluxo, a do estado único; sem ela, a semente
function sessaoDoQuadro(est, unico) {
  if (consultaDeCalibracao(est)) return { mundo: null, sessao: SEMENTES.T10.sessao }
  const mundo = est ? mundoDoEstado(est, SEMENTES.T10.contexto.empresaId) : null
  const sessao = mundo
    ? { ...SEMENTES.T10.sessao, ativoId: mundo.ativoId, moduloSerial: mundo.moduloSerial }
    : (unico.sessao?.ativoId ? unico.sessao : SEMENTES.T10.sessao)
  return { mundo, sessao }
}

// O ativo cujo modelo não calibra nada (o ônibus lê rotação e hodômetro da
// CAN) não tem passo — a tela diz *Nada a calibrar neste ativo*, com a frase do cadastro, e aponta o ciclo
// (a 11). No fluxo, o herói chega aqui: o Fazer o ciclo de testes grava a calibração concluída, sem nada
// semeado, e a T13 não pede o Painel (ele só entra quando houve calibração)
export default function T10(props) {
  const { estado: unico } = useEstado()
  const { sessao } = sessaoDoQuadro(props.estado, unico)
  const frase = nadaACalibrar(sessao.ativoId)
  return frase ? <NadaACalibrar {...props} sessao={sessao} frase={frase} /> : <Calibracao {...props} />
}

function NadaACalibrar({ estado: est, sessao, frase }) {
  const { estado: unico, despachar } = useEstado()
  const enc = useEncerrar()
  const ir = (tela) => despachar({ tipo: 'ir', tela })
  function seguir(tela) {
    if (!est) {
      const { ativoId, moduloSerial } = sessao
      despachar({ tipo: 'mesclar', parcial: { etapas: { ...unico.etapas, calibracao: { ativoId, moduloSerial, passo: null, painel: {}, semeadas: {}, puladas: [], concluida: true, nadaACalibrar: true } } } })
    }
    ir(tela)
  }
  useVoltar(() => ir('T04'))
  return (
    <div className="t10">
      <BarraDoSistema fundo="faixa" veu={enc.veu} />
      <Faixa serial={sessao.moduloSerial} placa={ativoDe(sessao.ativoId)?.placa} acao={T.encerrar} aoEncerrar={enc.encerrar} />
      <div className="tela-miolo t10-miolo">
        <span className="t10-rotulo">{T.rotulo}</span>
        <h1 className="t10-titulo">{T.nadaACalibrar[0]}<br />{T.nadaACalibrar[1]}</h1>
        <span className="t10-frase">{frase}</span>
      </div>
      <Rodape primario={T.cicloDeTestes} aoPrimario={() => seguir('T14')} link={T.voltar} aoLink={() => ir('T04')} />
      {enc.sobre}
    </div>
  )
}

function Calibracao({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const { mundo, sessao } = sessaoDoQuadro(est, unico)
  const { ativoId, moduloSerial } = sessao
  const par = grandezasDoPar(ativoId, moduloSerial)
  const ordem = mundo ? mundo.ordem : par.calibraveis
  const consulta = consultaDeCalibracao(est)
  const [fluxo, setFluxo] = useState(() => inicio({ momento: consulta ? est : momento, est: consulta ? null : est, mundo, ordem, etapa: consulta ? null : unico.etapas.calibracao, ativoId }))
  const vivo = useRef(unico)
  vivo.current = unico
  const relogios = useRef([])
  useEffect(() => () => relogios.current.forEach(clearTimeout), [])
  const campo = useRef(null)
  // as rodinhas do tambor que já pararam, no semear (a régua espera o tambor)
  const rodas = useRef(0)

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  // a calibração no estado único (etapas.calibracao) — só no fluxo, e só depois do primeiro passo dado
  function gravar(f) {
    if (est) return
    const e = vivo.current
    const antes = e.etapas.calibracao?.ativoId === ativoId ? e.etapas.calibracao : null
    const mexeu = f.atual > 0 || f.concluida || f.puladas.length > 0 || ordem.some((g) => f.passos[g].digitado || f.passos[g].fase !== 'pronta')
    if (!mexeu && !antes) return
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...e.etapas, calibracao: etapaDe(f, ordem, ativoId, moduloSerial) } } })
  }
  useEffect(() => { gravar(fluxo) }, [fluxo.atual, fluxo.passos, fluxo.concluida, fluxo.puladas]) // eslint-disable-line react-hooks/exhaustive-deps

  // a URL segue o quadro: o momento da referência em que o passo está, ou nenhum
  const quadro = est ? null : quadroDe({ ordem, ...fluxo })
  useEffect(() => {
    if (est || EM_QUADRO) return
    if (quadro !== (vivo.current.tela.momento ?? null)) ir('T10', { momento: quadro })
  }, [quadro]) // eslint-disable-line react-hooks/exhaustive-deps
  // a 05 aberta pela URL chega com o foco no campo, e o teclado aberto
  useEffect(() => { if (!EM_QUADRO && !est && fluxo.focado) campo.current?.focus() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const g = ordem[fluxo.atual]
  const p = fluxo.passos[g] ?? passoVazio()
  const gr = grandezaDe(g) ?? { natureza: 'partida', unidade: '' }
  const ajuste = gr.natureza === 'ajuste'
  // a releitura chegou (o tambor rola; quando ele para, a régua encolhe), e o veredito assentou no fim
  // dos 300 da régua: até lá, o poço, o alvo, o segmento e o rodapé ficam como estavam
  const releu = p.fase === 'semeada' || p.fase === 'nao-confere'
  const assentou = (x) => fluxo.passos[x]?.assentado !== false
  const semeada = p.fase === 'semeada' && assentou(g)
  const naoConfere = p.fase === 'nao-confere' && assentou(g)
  // a troca de quadro: a chave é o quadro desenhado — o passo da grandeza
  const quadroDaTela = g
  useTrocaDeQuadro(quadroDaTela)

  // ── os toques ──
  const mudaPasso = (x, mudanca) => setFluxo((f) => ({ ...f, passos: { ...f.passos, [x]: { ...f.passos[x], ...mudanca } } }))
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar antes de terminar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar()
  const focar = (v) => setFluxo((f) => (f.focado === v ? f : { ...f, focado: v }))
  function semear() {
    const passo = g; const painel = Number(p.digitado)
    mudaPasso(passo, { fase: 'gravando', relido: null })
    relogios.current.push(setTimeout(() => {
      mudaPasso(passo, { fase: 'relendo' })
      relogios.current.push(setTimeout(() => {
        const r = releitura(passo, painel)
        // em sequência (T10·4 a): o tambor rola até o relido; quando ele para, a régua recebe o
        // veredito e a diferença encolhe em 300; o veredito assenta quando entra na régua. Sem movimento
        // (reduzir), tudo logo. O tambor não rola se o poço já mostra o relido; a régua não anda sem
        // veredito escrito (o não confere a mais, só os traços) nem sem a diferença escrita antes
        const lento = duracao('--mov-lento') > 0
        const conta = moduloConta(ativoId, passo)
        const rola = lento && r != null && milhar(r.valor) !== (conta != null ? milhar(conta) : T.vazio)
        const veredito = r?.confere || (r?.desvio < 0 && !!T.naoConfere[passo])
        const escrita = conta != null || semeadoHa(ativoId, passo) != null
        const reguaAnda = lento && veredito && escrita
        rodas.current = 0
        mudaPasso(passo, { fase: r?.confere ? 'semeada' : 'nao-confere', relido: r, rolou: !rola, reguaAnda, assentado: !rola && !reguaAnda })
      }, RITMOS.semearRelendoMs))
    }, RITMOS.semearGravandoMs))
  }
  const proximo = () => setFluxo((f) => ({ ...f, atual: f.atual + 1, focado: false }))
  // o semeado se corrige na hora (decisão 64, HU-T10-7): o toque no painel semeado o abre de novo, em
  // foco, com o número semeado (a 12) · semear de novo grava o número novo no lugar, pelo mesmo gravar e reler
  function corrigir() {
    mudaPasso(g, { fase: 'corrigindo', digitado: String(p.relido?.valor ?? p.digitado) })
    focar(true)
  }
  useEffect(() => { if (!EM_QUADRO && !est && p.fase === 'corrigindo' && fluxo.focado) campo.current?.focus() }, [p.fase]) // eslint-disable-line react-hooks/exhaustive-deps
  // o semear em sequência, sem relógio, pelo fim de cada movimento no miolo:
  // · a última rodinha do tambor parou (uma por dígito do relido, como o Tambor conta): a régua recebe o veredito;
  // · a diferença acabou de encolher, e a peça põe o veredito na régua: o resto assenta no mesmo quadro
  const assentar = (e) => {
    if (e.animationName === 'ds-roda-rola' && p.rolou === false) {
      rodas.current += 1
      if (rodas.current >= String(milhar(p.relido.valor)).replace(/\D/g, '').length) mudaPasso(g, { rolou: true, assentado: !p.reguaAnda })
      return
    }
    if (e.animationName !== 'ds-regua-sai' || p.rolou === false || p.assentado !== false) return
    mudaPasso(g, { assentado: true })
  }
  // a calibração completa (09): grava a etapa concluída e segue — pro ciclo de testes ou pro menu
  function concluir(tela) {
    const f = { ...fluxo, concluida: true }
    setFluxo(f); gravar(f); ir(tela)
  }
  // pular o opcional (decisão 52): o que falta é só opcional, e a
  // calibração segue pro ciclo, com os pulados gravados na etapa
  function pular() {
    const pulados = ordem.slice(fluxo.atual).filter((x) => fluxo.passos[x]?.fase !== 'semeada')
    const f = { ...fluxo, concluida: true, puladas: [...new Set([...fluxo.puladas, ...pulados])] }
    setFluxo(f); gravar(f); ir('T14')
  }

  // ── o segmentado: um segmento por passo; o gravado fica lima apagado e alto ──
  const gravado = (x) => GRAVADO.includes(fluxo.passos[x]?.fase) && assentou(x)
  const segmentos = ordem.filter((x) => !par.opcionais.includes(x)).map((x) => {
    if (gravado(x)) return 'atual-feito'
    return x === ordem[fluxo.atual] ? 'atual' : 'pendente'
  })
  const todas = ordem.length > 0 && ordem.every((x) => fluxo.passos[x]?.fase === 'semeada' && assentou(x))
  const opcional = (x) => par.opcionais.includes(x)
  // a contagem e os segmentos são só dos obrigatórios (*1 de 2*, *2 de 2*), e
  // no passo opcional a contagem fica no último obrigatório (T10/08: *2 de 2*); o *Depois:* diz tudo o que
  // falta — os obrigatórios, um a um, e os opcionais juntos (*Rotação · velocidade e horímetro, opcionais*)
  const obrigatorios = ordem.filter((x) => !opcional(x))
  const contagem = Math.max(1, obrigatorios.filter((x) => ordem.indexOf(x) <= fluxo.atual).length)
  const minuscula = (s) => s.charAt(0).toLowerCase() + s.slice(1)
  const faltam = ordem.slice(fluxo.atual + 1)
  const partes = faltam.filter((x) => !opcional(x)).map((x) => grandezaDe(x).rotulo)
  const opcionaisQueFaltam = faltam.filter(opcional).map((x) => grandezaDe(x).rotulo)
  if (opcionaisQueFaltam.length) partes.push(T.opcionais(opcionaisQueFaltam.map((n, i) => (partes.length || i ? minuscula(n) : n))))
  let legenda
  if (partes.length) legenda = T.depois(partes.map((n, i) => (i ? minuscula(n) : n)))
  else if (todas) legenda = T.completa
  else if (opcional(g)) legenda = T.ultimoOpcional

  // ── os números ──
  const conta = ajuste ? null : moduloConta(ativoId, g)
  const dias = ajuste ? null : semeadoHa(ativoId, g)
  const digitado = p.digitado ? Number(p.digitado) : null
  let poco = { rotulo: T.moduloConta, valor: conta != null ? milhar(conta) : T.vazio, tom: 'apagado' }
  if (ajuste) poco = { rotulo: T.moduloLe, valor: T.vazio, tom: 'apagado' }
  else if (releu && !assentou(g)) poco = { ...poco, valor: milhar(p.relido.valor) }   // o número rola; o poço acende no fim
  else if (semeada || p.fase === 'corrigindo') poco = { rotulo: T.moduloAgora, valor: milhar(p.relido.valor), tom: 'ativo' }
  else if (naoConfere) poco = { rotulo: T.moduloReleu, valor: milhar(p.relido.valor), tom: 'falha' }

  // a régua recebe o veredito quando o tambor para: a diferença encolhe, e ele entra no fim (a
  // peça); até lá, ela mostra o que mostrava
  const rolou = p.rolou !== false
  // a diferença diz o lado (decisão 64): *o painel está 108 km à frente*, ou atrás
  const lado = (painel, modulo) => T.diferenca(milhar(Math.abs(painel - modulo)), gr.unidade, painel >= modulo)
  let regua
  if (ajuste) regua = <ReguaDiferenca>{T.ligueMotor}</ReguaDiferenca>
  else if (p.fase === 'semeada' && rolou) regua = <ReguaDiferenca confere>{T.relido(HORA)}</ReguaDiferenca>
  else if (p.fase === 'nao-confere' && rolou) {
    // só o que o módulo releu a menos tem texto (T10/10); o resto, só os traços
    const menos = p.relido.desvio < 0 && T.naoConfere[g]
    regua = menos ? <ReguaDiferenca falha>{T.naoConfere[g](milhar(Math.abs(Math.round(p.relido.desvio))))}</ReguaDiferenca> : <ReguaDiferenca />
  } else if (p.fase === 'corrigindo') {
    // corrigindo (a 12): o módulo conta o semeado — a régua diz quando, e, com outro número digitado, o lado
    regua = <ReguaDiferenca>{digitado != null && digitado !== p.relido?.valor ? lado(digitado, p.relido.valor) : T.semeadoAs(HORA)}</ReguaDiferenca>
  } else if (digitado != null && conta != null) regua = <ReguaDiferenca>{lado(digitado, conta)}</ReguaDiferenca>
  else if (dias != null) regua = <ReguaDiferenca>{T.semeadoHa(dias)}</ReguaDiferenca>
  else if (conta != null) regua = <ReguaDiferenca>{T.lido(HORA)}</ReguaDiferenca>
  else regua = <ReguaDiferenca /> // sem o número no mock: só os traços

  // o campo do painel: digita-se enquanto o passo não foi semeado
  const comCampo = p.fase === 'pronta' || p.fase === 'corrigindo'
  const foco = comCampo && fluxo.focado
  let alvoLegenda = digitado != null ? T.alvoVai : T.painelVazio
  if (ajuste) alvoLegenda = T.alvoAjuste[g]
  else if (semeada) alvoLegenda = T.alvoCumprido
  else if (p.fase === 'corrigindo') alvoLegenda = T.alvoCorrigindo

  // ── o rodapé: o primário diz o que falta ──
  const seguinte = ordem[fluxo.atual + 1]
  // o que falta depois deste passo é só opcional: o link é o Pular (decisão 52)
  const soOpcional = (desde) => ordem.slice(desde).length > 0 && ordem.slice(desde).every(opcional)
  let primario
  if (ajuste) primario = { rotulo: T.ligue, desabilitado: true } // o módulo ainda não lê: o motor desligado (HU-T10-2)
  else if (p.fase === 'gravando') primario = { rotulo: T.gravando, desabilitado: true }
  else if (p.fase === 'relendo' || (releu && !assentou(g))) primario = { rotulo: T.relendo, desabilitado: true }
  else if (naoConfere) primario = { rotulo: T.semearDeNovo, aoTocar: semear }
  else if (p.fase === 'corrigindo') primario = digitado == null ? { rotulo: T.digite, desabilitado: true } : { rotulo: T.semearDeNovo, aoTocar: semear }
  else if (semeada && !seguinte) primario = { rotulo: T.cicloDeTestes, aoTocar: () => concluir('T14') } // decisões 35 e 54
  else if (semeada && T.calibrar[seguinte]) primario = { rotulo: T.calibrar[seguinte], aoTocar: proximo }
  else if (semeada) primario = { rotulo: T.semear[g], desabilitado: true } // o passo seguinte sem texto
  else if (digitado == null) primario = { rotulo: T.digite, desabilitado: true }
  else primario = { rotulo: T.semear[g], aoTocar: semear }
  // o semear não para: o link fica, desabilitado de verdade
  // e em tinta apagada, e o ENCERRAR faz o mesmo que o voltar: apagado (a lei 17)
  const semeando = p.fase === 'gravando' || p.fase === 'relendo' || (releu && !assentou(g))
  // o Voltar ao menu: na calibração completa (09), grava a etapa concluída
  const voltar = semeada && !seguinte ? () => concluir('T04') : () => ir('T04')
  let link = { rotulo: T.voltar, aoTocar: voltar }
  // o opcional que falta (decisão 52): semeado o passo, o Pular do seguinte (01); no passo
  // opcional ainda não semeado, o Pular dele (08). O texto é o da grandeza (sem texto, o Voltar)
  const pulavel = semeada ? (soOpcional(fluxo.atual + 1) ? seguinte : null) : (soOpcional(fluxo.atual) ? g : null)
  if (pulavel && T.pular[pulavel]) link = { rotulo: T.pular[pulavel], aoTocar: pular }
  if (semeando) link = { ...link, aoTocar: undefined, desabilitado: true }
  // O voltar do Android (logica.md): o Voltar ao menu, em todo passo — também onde o link
  // do rodapé é o Pular —, e a calibração volta de onde parou. No semear, nada
  useVoltar(semeando ? null : voltar)

  return (
    <div className="t10">
      <BarraDoSistema fundo="faixa" veu={enc.veu} />
      <Faixa serial={moduloSerial} placa={ativoDe(ativoId)?.placa} acao={T.encerrar} aoEncerrar={enc.encerrar} acaoDesabilitada={semeando} />
      <div className="tela-miolo t10-miolo" onAnimationEnd={assentar}>
        <Segmentado rotulo={T.rotulo} contagem={String(contagem)} total={T.deTotal(obrigatorios.length)} segmentos={segmentos} legenda={legenda} />
        <h1 className="t10-titulo">{gr.rotulo}</h1>
        {/* a chave é a grandeza: o tambor rola no semear, não na troca de passo */}
        <ValorEmPoco key={g} rotulo={poco.rotulo} valor={poco.valor} unidade={gr.unidade} tom={poco.tom} />
        {regua}
        <ValorAlvo rotulo={T.painel} valor={digitado != null ? milhar(digitado) : T.vazio} unidade={gr.unidade} legenda={alvoLegenda}
          vazio={digitado == null} cumprido={digitado != null && !foco} foco={foco}
          corrigir={semeada && !ajuste ? T.corrigir : undefined} aoCorrigir={semeada && !ajuste && !est && !EM_QUADRO ? corrigir : undefined}
          campo={comCampo ? { valor: p.digitado, aoMudar: (v) => mudaPasso(g, { digitado: digitos(v) }), aoFocar: () => focar(true), aoSair: () => focar(false), ref: campo } : undefined} />
        {par.naoSeAplicam.length > 0 && (
          <Declarado aoPe rotulo={par.doModulo ? T.naoSeAplicam : T.naoSeAplicamModelo} divisoriaNoFim={ajuste}
            linhas={par.naoSeAplicam.map((l) => ({ nome: l.nome, motivo: l.motivo }))} />
        )}
      </div>
      {/* o rodapé nasce com o quadro: o texto que troca dentro dele esmaece no lugar, também o
          que acende no fim do semear, com o roxo direto (a peça: a camada é só com o mesmo texto) */}
      <Fragment key={quadroDaTela}>
        <Rodape primario={primario.rotulo} aoPrimario={primario.aoTocar} primarioDesabilitado={!!primario.desabilitado}
          primarioTrocaTexto primarioAcende link={link.rotulo} aoLink={link.aoTocar} linkDesabilitado={!!link.desabilitado} />
      </Fragment>
      {enc.sobre}
    </div>
  )
}
