// O movimento das listas (as peças do movimento): a lista que se reorganiza quando a busca filtra (o useReorganiza, na
// lista do pacote da T06 — a busca da T02 saiu com a lista longa, decisão 56), a fila que
// fecha o espaço, e a cascata da lista que a busca acha (a Lista com `surge`). Cada
// espécime é a peça tocável, montada como a tela a monta — os textos são os do textos.js
// de cada tela (o da T06, os que a tela escreve, do textos.md dela), e o dado é o do
// mock, nada escrito aqui. Fora da bancada (semBancada): o quadro parado de cada peça é o
// espécime da folha dela e o print de cada tela; estes só provam o que anda entre os
// quadros (scripts/caminhos/mov-listas.mjs). O palco ainda não os alcança: as telas ligam
// a peça na fase seguinte. Os botões tracejados ("bancada · …") são da vitrine, não do
// app. Cada espécime abre parado — nada anima ao abrir.
import { useState } from 'react'
import {
  BarraDoSistema, Faixa, Busca, Lista, LinhaOnibus, LinhaModulo, LinhaFila, Rodape, Vazio,
  CabecalhoConteudo, useReorganiza,
} from '../../ds/index.js'
import { M } from '../../dados/mock.js'
import { doPacote, modeloDe, filtrar as filtrarOnibus, contagemDoPacote } from '../../telas/T06/dados.js'
import { TX as T05 } from '../../telas/T05/textos.js'
import { porPerto, varianteNaLista, HEROI } from '../../telas/T05/dados.js'
import { T as T15 } from '../../telas/T15/textos.js'
import { quadroDoEstado, grupos as gruposDaFila, linhaDaLista } from '../../telas/T15/dados.js'
import '../../telas/T06/t06.css'
import '../../telas/T05/t05.css'
import '../../telas/T15/t15.css'
import './mov-listas.css'

function Controles({ children }) { return <div className="vitrine-ml-controles">{children}</div> }
function Botao({ children, aoTocar }) { return <button type="button" className="vitrine-ml-botao" onClick={aoTocar}>{children}</button> }

// ── a lista que se reorganiza, na T06: a lista do pacote, a instrução que sai quando se digita ──
// O cartão inteiro sobe no lugar da instrução, e as linhas que ficam sobem dentro dele.
// Os textos são os que a T06 escreve (02-telas/T06-selecionar-ativo/textos.md).
const T06 = {
  titulo: 'Selecionar ativo', noPacote: 'no pacote', buscar: 'Buscar placa, frota ou módulo',
  instrucao: 'Escolha o veículo que está na sua frente.', frota: 'FROTA', semAtivo: 'sem ativo', encerrar: 'ENCERRAR',
  nadaCom: (termo) => `Nada com “${termo}”`, confira: 'Confira a placa, ou busque pela frota.',
  usar: 'Usar este ativo', voltarAoMenu: 'Voltar ao menu',
}
function Onibus() {
  const [busca, setBusca] = useState('')
  const [marcado, setMarcado] = useState(null)
  const lugar = useReorganiza(busca)
  const empresaId = M.contextoAtivo.empresaId
  const lista = filtrarOnibus(doPacote(empresaId), busca)
  const buscando = busca.trim() !== ''
  const semResultado = buscando && lista.length === 0
  const aVista = lista.some((a) => a.id === marcado)
  return (
    <div className="vitrine-ml-pilha">
      <div className="t06 vitrine-ml-tela">
        <BarraDoSistema fundo="faixa" />
        <Faixa serial={HEROI} placa={T06.semAtivo} semAtivo acao={T06.encerrar} />
        <div ref={lugar} className="tela-miolo t06-miolo">
          <CabecalhoConteudo titulo={T06.titulo} contagem={contagemDoPacote({}, empresaId)} unidade={T06.noPacote} />
          <Busca dica={T06.buscar} valor={busca} aoMudar={setBusca} />
          {semResultado ? <Vazio titulo={T06.nadaCom(busca.trim())} frase={T06.confira} /> : (
            <>
              {!buscando && <span className="t06-instrucao">{T06.instrucao}</span>}
              <Lista className="t06-lista">
                {lista.map((a, i) => (
                  <LinhaOnibus key={a.id} placa={a.placa} modelo={modeloDe(a).nome} rotuloFrota={T06.frota} frota={a.frota}
                    divisoria={i < lista.length - 1} escolhido={a.id === marcado} aoTocar={() => setMarcado(a.id)} />
                ))}
              </Lista>
            </>
          )}
        </div>
        <Rodape primario={T06.usar} primarioDesabilitado={!aVista} link={T06.voltarAoMenu} />
      </div>
      <Controles><Botao aoTocar={() => setBusca('')}>bancada · limpa a busca</Botao></Controles>
    </div>
  )
}

// ── a fila que fecha o espaço (T15): o que sobe sai da lista, e as de baixo sobem ──
// A fila do estado 01 (a fila sem erro, com os cinco itens). A T15 não envia no
// protótipo (o ritmo do envio não está declarado): a bancada faz o que o envio fará.
const filaDoEstado = () => gruposDaFila(quadroDoEstado('01-estado-sem-erro')?.itens ?? []).lista
function Fila() {
  const [fila] = useState(filaDoEstado)
  const [subiram, setSubiram] = useState(0)
  const lugar = useReorganiza(subiram)
  const naFila = fila.filter((f) => f.estado === 'na-fila')
  const foram = new Set(naFila.slice(0, subiram).map((f) => f.id))
  const mostra = fila.filter((f) => !foram.has(f.id))
  return (
    <div className="vitrine-ml-pilha">
      <div ref={lugar} className="vitrine-ml-fila">
        <span className="t15-rotulo">{T15.naFilaERecebidas}</span>
        <Lista className="t15-lista">
          {mostra.map((f, i) => {
            const ultima = i === mostra.length - 1
            return <LinhaFila key={f.id} {...linhaDaLista(f)} posicao={ultima ? 'fim' : 'meio'} divisoria={!ultima} />
          })}
        </Lista>
      </div>
      <Controles><Botao aoTocar={() => setSubiram((n) => Math.min(n + 1, naFila.length))}>bancada · o primeiro da fila sobe</Botao></Controles>
    </div>
  )
}

// ── a cascata (T05/01): a lista que a busca acha surge linha a linha ──
// A lista de escolha da T05/01. "a busca acha" monta a lista de novo, com a cascata, como
// a T05 fará quando a busca de novo termina (aos 1,2 s, RITMOS.buscaMs); "abre de novo" a
// monta sem ela, parada, como ao abrir. Tocar marca o módulo, e a cascata não se repete.
function Modulos() {
  const [montagem, setMontagem] = useState({ vez: 0, surge: false })
  const [marcado, setMarcado] = useState(null)
  const perto = porPerto()
  const monta = (surge) => { setMarcado(null); setMontagem((m) => ({ vez: m.vez + 1, surge })) }
  return (
    <div className="vitrine-ml-pilha">
      <CabecalhoConteudo titulo={T05.titulo} contagem={perto.length} unidade={T05.encontrados(perto.length)} />
      <span id="vitrine-ml-escolha" className="t05-frase">{T05.escolhaNaMao}</span>
      <Lista key={montagem.vez} surge={montagem.surge} className="t05-lista" role="radiogroup" aria-labelledby="vitrine-ml-escolha">
        {/* as cinco se escolhem, o M2C-0999 também, e todas levam a divisória (T05/01) */}
        {perto.map((p) => (
          <LinhaModulo key={p.serial} escolha serial={p.serial} variante={varianteNaLista(p.serial)}
            marcado={p.serial === marcado} aoTocar={() => setMarcado(p.serial)} />
        ))}
      </Lista>
      <Controles>
        <Botao aoTocar={() => monta(true)}>bancada · a busca acha</Botao>
        <Botao aoTocar={() => monta(false)}>bancada · abre de novo</Botao>
      </Controles>
    </div>
  )
}

export const especimes = [
  { id: 'mov-listas-onibus', folha: 6, chrome: true, semBancada: true, rotulo: 'a busca da lista do pacote',
    legenda: 'digite na busca: a instrução esmaece por cima, o cartão sobe no lugar dela e as linhas que ficam sobem dentro dele, em 150',
    render: () => <Onibus /> },
  { id: 'mov-listas-fila', folha: 4, semBancada: true, rotulo: 'a fila que fecha o espaço',
    legenda: 'bancada · sobe: a linha esmaece por cima, e as de baixo sobem, em 150 · o cartão corta o que passa da borda',
    render: () => <Fila /> },
  { id: 'mov-listas-cascata', folha: 6, semBancada: true, rotulo: 'a lista que a busca acha',
    legenda: 'bancada · a busca acha: cada linha surge esmaecendo, 150 cada, 80 entre elas · ao abrir, já está lá',
    render: () => <Modulos /> },
]
