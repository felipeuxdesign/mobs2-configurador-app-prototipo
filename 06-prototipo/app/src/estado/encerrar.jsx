// O ENCERRAR da faixa (decisão 36, logica.md · ENCERRAR), numa peça só pras
// telas com a faixa (T04 a T15): antes de homologar, ele pede confirmação — o
// diálogo *Encerrar antes de terminar?* (T04/13) —, e depois de homologar vai
// direto, pros passos do encerramento da T16.
//   Continuar a instalação   o principal: fecha, e o técnico fica onde estava
//   Encerrar mesmo assim     a sessão abortada da T16, os 4 passos (T16/03) · com um
//                            destino (o `encerrar({ destino })` do Procurar outro módulo
//                            da T09: a busca, T05/01), a T16 segue pra ele depois dos passos
// O voltar do Android, com o diálogo aberto, fecha o diálogo, como o Continuar
// (O voltar do Android · numa folha ou num diálogo): ele vale antes do da tela
// (useVoltar · porCima). O movimento é o dos diálogos, pela presença de tudo o
// que vem por cima (src/ds/chrome/PorCima.jsx): o véu e a caixa esmaecem,
// e a caixa cresce de 98% a 100%, em 150ms; aberto pela URL ou no print, nasce
// aberto, parado.
//
// Onde ele abre: no menu, o momento 13 da T04, que tem endereço — a T04 passa
// `aberto` e quem abre e fecha (a URL segue o quadro), e põe o `dialogo` no
// lugar dela por cima do menu, no mesmo véu das folhas (a `caixa`: o diálogo sem
// o véu, que a T04 põe no PorCima dela, pra folha do módulo virar o diálogo sem o
// véu piscar). Nas outras telas, por
// cima da própria tela, onde o ENCERRAR foi tocado, sem endereço (a referência
// só desenha o do menu): o `sobre`, com o véu
// embaixo da barra do sistema, cobrindo a faixa, como a T04/13 desenha, e o `veu`,
// que a tela passa pra barra, pra o fundo dela escurecer junto (a peça diálogo:
// o véu cobre a tela inteira onde quer que o diálogo abra) — e o que fica atrás dele
// inerte: nem o toque nem o leitor chegam lá.
//
// Os textos são os da T04/13 (02-telas/T04-menu/textos.md), os mesmos em toda tela.
import { useLayoutEffect, useRef, useState } from 'react'
import { Dialogo, Frase, PorCima, usePorCima } from '../ds/index.js'
import { useEstado } from './estado.jsx'
import { useVoltar } from './voltar.js'
import './encerrar.css'

// a sessão abortada, os 4 passos (T16/03)
export const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar'

// o texto (T04/13): 'homologada' só na T16, e nada de 'gravado' como resultado
const TX = {
  titulo: 'Encerrar antes de terminar?',
  frase: 'A instalação ainda não terminou. O módulo fica seguro, e o que já foi enviado fica nele.',
  continuar: 'Continuar a instalação',
  semHomologar: 'Encerrar mesmo assim',
}

// O que fica atrás do véu é inerte: as irmãs do lugar por cima, na tela.
// Refeito a cada desenho, pra pegar o que a tela trocar embaixo dele.
function PorCimaDaTela({ children }) {
  const lugar = useRef(null)
  useLayoutEffect(() => {
    const el = lugar.current
    const atras = [...el.parentElement.children].filter((c) => c !== el && !c.hasAttribute('inert'))
    atras.forEach((c) => c.setAttribute('inert', ''))
    return () => atras.forEach((c) => c.removeAttribute('inert'))
  })
  return <div ref={lugar} className="encerrar-sobre">{children}</div>
}

// `aberto`, `aoAbrir` e `aoFechar`: quando quem abre é a URL (o 13 da T04).
// Sem eles, o diálogo mora na própria tela. `homologada`: quando a tela sabe
// antes do estado único (o registro da T13); sem ela, a do estado único.
export function useEncerrar({ aberto: pedido, aoAbrir, aoFechar, homologada } = {}) {
  const { estado, despachar } = useEstado()
  const [proprio, setProprio] = useState(false)
  const pelaUrl = pedido !== undefined
  const aberto = pelaUrl ? pedido : proprio
  // por cima da própria tela: a presença do diálogo (entra fechado e abre; sai fechando
  // antes de desmontar). No menu, a presença é a do véu dele (a T04 põe a `caixa`)
  const camada = usePorCima(!pelaUrl && aberto ? 'encerrar' : null)

  const fechar = () => (pelaUrl ? aoFechar() : setProprio(false))
  // aonde a sessão abortada segue depois dos 4 passos, se quem abriu o diálogo disse (etapas.encerramento.destino)
  const destino = useRef(null)
  const semHomologar = () => {
    if (destino.current) despachar({ tipo: 'mesclar', parcial: { etapas: { ...estado.etapas, encerramento: { destino: destino.current } } } })
    despachar({ tipo: 'ir', tela: 'T16', momento: ENCERRAR_SEM_HOMOLOGAR })
  }
  // depois de homologar, direto: os passos do encerramento (T16/00); antes, o diálogo · `opcoes.destino`:
  // { tela, momento }, aonde ir depois dos 4 passos (sem ele, a sessão encerrada da T16). Quem passa o
  // encerrar direto pra um toque recebe o evento ali: sem destino
  const encerrar = (opcoes) => {
    destino.current = opcoes?.destino ?? null
    if (homologada ?? estado.etapas.checklist?.homologada) despachar({ tipo: 'ir', tela: 'T16' })
    else if (pelaUrl) aoAbrir()
    else setProprio(true)
  }
  useVoltar(aberto ? fechar : null, { porCima: true })

  // o diálogo sem o véu: aberto ou não, quem diz é a presença em volta dele
  const caixa = (
    <Dialogo titulo={TX.titulo} primario={TX.continuar} aoPrimario={fechar}
      saida={TX.semHomologar} aoSair={semHomologar} margem={24}>
      <Frase>{TX.frase}</Frase>
    </Dialogo>
  )
  const sobre = camada.montado ? <PorCimaDaTela><PorCima camada={camada}>{caixa}</PorCima></PorCimaDaTela> : null
  // a barra do sistema escurece junto (o véu cobre a tela inteira, até o fundo dela): a tela
  // passa isto pro `veu` da BarraDoSistema. No menu, quem diz é o véu da T04
  const veu = !pelaUrl && camada.veu ? 'dialogo' : null
  return { encerrar, aberto, fechar, caixa, sobre, veu }
}
