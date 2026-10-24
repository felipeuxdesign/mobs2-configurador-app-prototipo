// T02 · Selecionar contexto (02-telas/T02-selecionar-contexto): o técnico diz
// pra qual empresa vai trabalhar hoje, e o pacote que o app usa é o da empresa
// inteira (decisão 56: não há unidade nem garagem). As empresas vêm do mock
// (src/dados/empresas.js), cada linha com a idade do pacote, derivada do dado
// (formato.js), e os ativos que ele traz. Tocar numa empresa a escolhe (o 01) —
// tocar de novo não desmarca, e a de pacote vencido também se escolhe —, e o
// `Sincronizar` grava a empresa no contexto do estado único e vai pra T03, que
// baixa o pacote dela. As regras são funções puras (empresas.js), provadas no
// node (scripts/testar-empresa.mjs).
//
// A tela abre com a atual marcada quando o contexto já tem uma empresa: o
// `Trocar de empresa` do pacote vencido e o da falha de rede com ele vencido (T03/04 e 05) voltam
// pra cá (o 01). Com uma empresa só (o caso uma-empresa), o app pula a tela:
// ela não desenha nada, e segue na hora pra T03, com o pacote da única.
//
// Outro usuário no aparelho (a T01/18): o Entrar com outro usuário depois de uma
// sessão neste aparelho abre esta tela com o diálogo *Outra sessão neste
// aparelho* por cima (situacao.outraSessao), que nasce aberto, com a tela, e
// fecha no Entendi. Pela coluna, a T01 monta esta tela com o caso, as empresas
// da 00 atrás, parada e sem toque, como a referência desenha.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BarraDoSistema, Lista, LinhaEscolha, Rodape, Veu, Dialogo, Frase } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { mundoDo } from '../../dados/empresas.js'
import {
  rotuloDasEmpresas, linhasDasEmpresas, escolhidaAoAbrir, escolher, primarioDe, momentoDe, contextoDoSincronizar, pulo, voltarDaTela,
} from './empresas.js'
// a presença do diálogo (entra fechado e abre; sai fechando antes de desmontar) é a do que vem por cima
import { usePresenca } from '../../ds/chrome/PorCima.jsx'
import { TX } from './textos.js'
import './T02.css'

export default function T02({ momento, estado, outraSessao }) {
  const { estado: app, despachar } = useEstado()
  // num estado (a T01/18 pela coluna), a tela fica parada: nada escolhido, nada anda nem se grava
  const parado = Boolean(estado)
  const mundo = mundoDo(app.contexto)
  const [escolhida, setEscolhida] = useState(() => (parado ? null : escolhidaAoAbrir(momento, app.contexto)))

  // com uma empresa só, o app pula esta tela: antes de desenhar, a empresa vai pro
  // contexto e a T03 abre (empresas.js · pulo)
  const [destino] = useState(() => (parado ? null : pulo(mundo, app.contexto)))
  useLayoutEffect(() => {
    if (!destino) return
    despachar({ tipo: 'mesclar', parcial: { contexto: destino.contexto } })
    despachar({ tipo: 'ir', tela: destino.tela })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // a URL segue o quadro: o 01 com uma escolhida, nada na 00. Num estado, nada anda
  const doQuadro = momentoDe(escolhida)
  useEffect(() => {
    if (parado || destino) return
    if ((momento ?? null) !== doQuadro) despachar({ tipo: 'ir', tela: 'T02', momento: doQuadro ?? undefined })
  }, [parado, destino, doQuadro, momento, despachar])

  function sincronizar() {
    if (parado || !escolhida) return
    despachar({ tipo: 'mesclar', parcial: { contexto: contextoDoSincronizar(app.contexto, escolhida) } })
    despachar({ tipo: 'ir', tela: 'T03' })
  }

  // O diálogo de outro usuário no aparelho (a T01/18): o que o Entrar gravou na
  // situação do celular, ou, pela coluna, o que o caso diz. Nasce aberto, com a
  // tela (nenhuma tela anima a entrada), e o Entendi fecha: o véu e a caixa
  // esmaecem em 150 (movimento.md) e a tela fica, sem nada escolhido
  const outra = outraSessao ?? (parado ? null : app.situacao.outraSessao ?? null)
  const ultimaOutra = useRef(outra)
  if (outra) ultimaOutra.current = outra
  const aviso = usePresenca(Boolean(outra))
  const entendi = () => despachar({ tipo: 'mesclar', parcial: { situacao: { ...app.situacao, outraSessao: null } } })
  const dialogo = aviso.montado && (
    <div className="t02-sobre">
      <Veu de="dialogo" visivel={aviso.visivel}>
        <Dialogo titulo={TX.outraSessao} primario={TX.entendi} aoPrimario={entendi} margem={24} aberto={aviso.visivel}>
          <Frase>{TX.sessaoEncerrada(ultimaOutra.current.usuario, ultimaOutra.current.itensNaFila)}</Frase>
        </Dialogo>
      </Veu>
    </div>
  )
  // o que fica atrás do véu é inerte: nem o toque nem o leitor chegam nele
  const atras = aviso.montado ? '' : undefined

  // O voltar do Android (logica.md): a tela não tem saída desenhada, e não faz
  // nada (empresas.js · voltarDaTela). Com o diálogo de outro usuário, o Entendi,
  // que só fecha e é a única saída, como o aviso do acesso (T04/12)
  useVoltar(aviso.montado ? (outra ? entendi : null) : voltarDaTela)

  // pulando (uma empresa só): só a barra, até a T03 abrir
  if (destino) return <div className="t02"><BarraDoSistema fundo="pagina" /></div>

  // o movimento fino (animacao.md): o marcador surge no poço em 150 (a peça do
  // marcador), e o primário acende na primeira escolha — o texto troca de Escolha
  // uma empresa pra Sincronizar, no lugar, e o roxo troca direto; trocar a escolha
  // não muda o texto. Aberta pelo endereço, pelo palco ou no print, parada
  const linhas = linhasDasEmpresas(mundo, escolhida)
  const primario = primarioDe(escolhida)
  return (
    <div className="t02">
      <BarraDoSistema fundo="pagina" veu={aviso.visivel ? 'dialogo' : null} />
      <div className="t02-fundo" inert={atras}>
        <div className="tela-miolo t02-miolo">
          <div className="t02-cabeca">
            <span className="t02-rotulo">{rotuloDasEmpresas(mundo)}</span>
            <h1 id="t02-titulo" className="t02-titulo">{TX.titulo}</h1>
          </div>
          <div className="t02-grupo">
            <Lista role="radiogroup" aria-labelledby="t02-titulo">
              {linhas.map((l, i) => (
                // a escolhida fica com o nome em --tinta-forte, como as outras (T02/01: a
                // variante da escolha numa lista que não sobe o nome)
                <LinhaEscolha
                  key={l.id}
                  nome={l.nome} detalhe={l.detalhe} valor={l.valor}
                  estado={l.escolhida ? 'escolhida' : 'disponivel'} nomeSobe={false}
                  divisoria={i < linhas.length - 1}
                  aoTocar={() => setEscolhida((e) => escolher(e, l.id))}
                />
              ))}
            </Lista>
          </div>
        </div>
        <Rodape primario={primario.texto} primarioDesabilitado={primario.desabilitado} primarioTrocaTexto aoPrimario={sincronizar} />
      </div>
      {dialogo}
    </div>
  )
}
