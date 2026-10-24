// O movimento dos instrumentos (as peças do movimento): cada espécime é
// a peça tocável, com os botões da vitrine que fazem o que a tela fará — a
// baixa que corre, o prazo que drena, o semear, a volta do nível do item. A
// leitura que chega e cai fora (a T07 antiga) e o mostrador (a T08) não estão
// aqui. Fora da bancada (semBancada): o quadro parado de cada peça
// é o espécime da folha dela, e estes só provam o que anda entre os quadros
// (scripts/caminhos/mov-instrumentos.mjs). Os botões são da vitrine, não do
// app; o que está dentro da moldura é a peça, com os textos das telas.
// O ritmo dos processos sai de ritmos.js, como nas telas.
import { useEffect, useRef, useState } from 'react'
import { Escala, Prazo, BarraDoChecklist, ValorEmPoco, ReguaDiferenca } from '../../ds/instrumentos/index.js'
import { VereditoDoChecklist } from '../../ds/checklist/index.js'
import { RITMOS } from '../../estado/ritmos.js'
import './mov-instrumentos.css'

function Controles({ children }) { return <div className="vitrine-mov-controles">{children}</div> }
function Botao({ children, aoTocar }) { return <button type="button" className="vitrine-mov-botao" onClick={aoTocar}>{children}</button> }
function Nota({ children }) { return <span className="vitrine-mov-nota">{children}</span> }

// um relógio de passos, como o das telas: chama `passo` a cada `ms` até ele dizer que acabou
function usePassos() {
  const relogio = useRef(null)
  useEffect(() => () => clearInterval(relogio.current), [])
  return (ms, passo) => {
    clearInterval(relogio.current)
    relogio.current = setInterval(() => { if (passo() === false) clearInterval(relogio.current) }, ms)
  }
}

// ── a baixa da T03: a barra dos ativos, um trecho linear por item, 10 de 250
const ATIVOS = 10
const PASSO_BAIXA = RITMOS.sincronizacaoTotalMs / 16
function Baixa() {
  const [feito, setFeito] = useState(0)
  const [vez, setVez] = useState(0)
  const anda = usePassos()
  const vivo = useRef(0); vivo.current = feito
  const correr = () => {
    setVez((v) => v + 1); setFeito(0); vivo.current = 0 // recomeça parado: a peça remonta
    anda(PASSO_BAIXA, () => { const n = vivo.current + 1; setFeito(n); return n < ATIVOS })
  }
  return (
    <>
      <Escala key={vez} tam="placar" semLados min={0} max={ATIVOS} valor={feito}
        faixa={feito > 0 ? { de: 0, ate: feito } : undefined} divisoes={4} fortes={[ATIVOS / 2]} segue={PASSO_BAIXA} />
      <Nota>{`${feito} de ${ATIVOS}`}</Nota>
      <Controles><Botao aoTocar={correr}>Correr a baixa</Botao></Controles>
    </>
  )
}

// ── o prazo da T14: drena contínuo, um trecho linear por tique (1 s real vale 4 s)
const TIQUE = 1000 / RITMOS.prazoFator
const LIMITE = 120, PARA = 96
const minSeg = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
function PrazoDrena() {
  const [resta, setResta] = useState(LIMITE)
  const [vez, setVez] = useState(0)
  const anda = usePassos()
  const vivo = useRef(LIMITE); vivo.current = resta
  const disparar = () => {
    setVez((v) => v + 1); setResta(LIMITE); vivo.current = LIMITE
    anda(TIQUE, () => { const n = vivo.current - 1; setResta(n); return n > PARA })
  }
  return (
    <>
      <Prazo key={vez} rotulo="PRAZO DO EVENTO" nota="FILA DRENADA" tempo={minSeg(resta)} restante={resta} limite={LIMITE}
        legendas={{ inicio: '0:00', fim: 'limite 2:00' }} segue={TIQUE} />
      <Controles><Botao aoTocar={disparar}>Disparar evento de teste</Botao></Controles>
    </>
  )
}

// ── o semear da T10: o tambor rola do módulo até o painel, a diferença
// encolhe e esmaece, e o veredito entra no fim — o confere, ou o não confere · no
// caminhão coletor (o a-09, a semente da T10 e a folha 8): o ônibus do herói não
// calibra nada (decisão 59)
function Semear() {
  const [fase, setFase] = useState('pronta')
  const [vez, setVez] = useState(0)
  let regua = <ReguaDiferenca>o painel está 108 km à frente</ReguaDiferenca>   // a régua diz o lado (decisão 64)
  if (fase === 'confere') regua = <ReguaDiferenca confere>relido às 14:30 · confere com o painel</ReguaDiferenca>
  else if (fase === 'falha') regua = <ReguaDiferenca falha>não confere · 500 m a menos que o painel</ReguaDiferenca>
  // o caso releitura-nao-confere do mock: o módulo releu 87.711,5 km contra os 87.712 do painel (T10/10)
  const valor = fase === 'confere' ? '87.712' : fase === 'falha' ? '87.711' : '87.604'
  const tom = fase === 'confere' ? 'ativo' : fase === 'falha' ? 'falha' : 'apagado'
  return (
    <>
      <div className="vitrine-mov-pilha" key={vez}>
        <ValorEmPoco rotulo={{ pronta: 'O MÓDULO CONTA', confere: 'O MÓDULO CONTA AGORA', falha: 'O MÓDULO RELEU' }[fase]} valor={valor} unidade="km" tom={tom} />
        {regua}
      </div>
      <Controles>
        <Botao aoTocar={() => setFase('confere')}>Semear o hodômetro</Botao>
        <Botao aoTocar={() => setFase('falha')}>Semear com a releitura errada</Botao>
        <Botao aoTocar={() => { setFase('pronta'); setVez((v) => v + 1) }}>Voltar ao começo</Botao>
      </Controles>
    </>
  )
}

// ── a barra do checklist da T13: a volta do nível do item remonta a barra,
// que parte do que tinha quando o item abriu; o Finalizar completa, e o veredito surge
const TOTAL = 31
function BarraVolta() {
  const [q, setQ] = useState({ feitos: 19, de: undefined, vez: 0, homologado: false })
  return (
    <>
      <Nota>{`${q.feitos} de ${TOTAL}`}</Nota>
      <div className="vitrine-mov-pilha">
        <BarraDoChecklist key={q.vez} feitos={q.feitos} total={TOTAL} de={q.de} />
        {q.homologado && <VereditoDoChecklist surge titulo="Instalação homologada às 14:30" relatorio="o relatório leva 12 evidências, o local e o seu nome" />}
      </div>
      <Controles>
        <Botao aoTocar={() => setQ((x) => ({ feitos: Math.min(TOTAL, x.feitos + 4), de: x.feitos, vez: x.vez + 1, homologado: false }))}>Voltar ao checklist</Botao>
        <Botao aoTocar={() => setQ((x) => ({ ...x, feitos: TOTAL, homologado: true }))}>Finalizar instalação</Botao>
        <Botao aoTocar={() => setQ((x) => ({ feitos: 19, de: undefined, vez: x.vez + 1, homologado: false }))}>Voltar ao começo</Botao>
      </Controles>
    </>
  )
}

export const especimes = [
  { id: 'mov-escala-baixa', folha: 5, semBancada: true, rotulo: 'movimento · a baixa (T03)', legenda: 'segue: um trecho linear por item, no passo da baixa · com reduzir, salta pro valor de cada passo, no mesmo ritmo',
    render: () => <Baixa /> },
  { id: 'mov-prazo-drena', folha: 5, semBancada: true, rotulo: 'movimento · o prazo drena (T14)', legenda: 'segue: um trecho linear por tique · o número troca no lugar',
    render: () => <PrazoDrena /> },
  { id: 'mov-barra-checklist', folha: 5, semBancada: true, rotulo: 'movimento · a barra do checklist (T13)', legenda: 'a volta do item: parte do que tinha e avança em 300 · o Finalizar completa, e o veredito surge em 150',
    render: () => <BarraVolta /> },
  { id: 'mov-semear', folha: 8, semBancada: true, rotulo: 'movimento · o semear (T10)', legenda: 'o tambor rola em 500 · a diferença encolhe e esmaece em 300 · o veredito entra em 150',
    render: () => <Semear /> },
]
