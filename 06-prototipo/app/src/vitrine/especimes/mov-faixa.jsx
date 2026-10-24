// O movimento · a faixa de sessão (src/ds/chrome/Faixa.jsx), tocável. Nenhuma folha
// desenha movimento: os espécimes ficam fora da bancada (semBancada), e parados eles são os quadros das
// referências. Os botões tracejados ("bancada · …") são da vitrine, não do app: fazem o que a tela fará.
// · a faixa que nasce (decisão 44): nasce na T07, quando as sete linhas do diagnóstico passam sem trava, pela mesma peça (Faixa `ausente`);
//   sem espécime próprio aqui;
// · a faixa que encerra: a T16 em miniatura, com a faixa sem ação. A sessão fecha, e a aberta sobe por baixo
//   da barra, em --mov-padrao, e revela a sem sessão, que já está no lugar: nada do layout se move;
// · o ENCERRAR que se apaga e volta (a lei 17): a tinta troca direto, sem piscar, e nada anima.
// Com reduzir movimento, tudo troca direto. Os textos são os dos textos.js das telas e o dado é o do mock;
// nada escrito aqui. Prova: scripts/caminhos/mov-faixa.mjs.
import { useState } from 'react'
import { BarraDoSistema, Faixa, CabecalhoConteudo } from '../../ds/index.js'
import { SEMENTES } from '../../estado/sementes.js'
import { T as T10 } from '../../telas/T10/textos.js'
import { T as T16 } from '../../telas/T16/textos.js'
import { placaDe } from '../../telas/T16/dados.js'
import '../../telas/T16/t16.css'
import './mov-faixa.css'

function Controles({ children }) { return <div className="vitrine-mf-controles">{children}</div> }
function Botao({ children, aoTocar }) { return <button type="button" className="vitrine-mf-botao" onClick={aoTocar}>{children}</button> }

// ── a faixa que encerra : o sétimo passo fecha, e a tela passa pra Sessão encerrada ──
function Encerramento({ inicio }) {
  const [fechada, setFechada] = useState(inicio)
  const s = SEMENTES.T16.sessao
  return (
    <div className="vitrine-mf-pilha">
      <Controles><Botao aoTocar={() => setFechada(true)}>bancada · a sessão encerra</Botao></Controles>
      <div className="t16 vitrine-mf-tela vitrine-mf-curta">
        <BarraDoSistema fundo="faixa" />
        {fechada
          ? <Faixa estado="sem-sessao" fato={T16.semSessao} revela />
          : <Faixa serial={s.moduloSerial} placa={placaDe(s.ativoId)} />}
        <div className="tela-miolo">
          <CabecalhoConteudo titulo={fechada ? T16.encerrada : T16.encerrar} />
        </div>
      </div>
    </div>
  )
}

// ── o ENCERRAR que se apaga e volta (a lei 17): o processo em que o voltar não faz nada ──
function EncerrarQueApaga() {
  const [apagado, setApagado] = useState(false)
  const s = SEMENTES.T16.sessao
  return (
    <div className="vitrine-mf-pilha">
      <Controles>
        <Botao aoTocar={() => setApagado(true)}>bancada · o processo começa</Botao>
        <Botao aoTocar={() => setApagado(false)}>bancada · o processo termina</Botao>
      </Controles>
      <Faixa serial={s.moduloSerial} placa={placaDe(s.ativoId)} acao={T10.encerrar} aoEncerrar={() => {}} acaoDesabilitada={apagado} />
    </div>
  )
}

// o "abre de novo": a mesma peça montada outra vez no quadro de uma ponta, parada
function ComAbrirDeNovo({ Peca }) {
  const [vez, setVez] = useState({ n: 0, fim: false })
  return (
    <div className="vitrine-mf-pilha">
      <Peca key={vez.n} inicio={vez.fim} />
      <Controles>
        <Botao aoTocar={() => setVez((v) => ({ n: v.n + 1, fim: true }))}>bancada · abre no fim</Botao>
        <Botao aoTocar={() => setVez((v) => ({ n: v.n + 1, fim: false }))}>bancada · abre no começo</Botao>
      </Controles>
    </div>
  )
}

export const especimes = [
  { id: 'mov-faixa-encerra', folha: 2, chrome: true, semBancada: true, rotulo: 'a faixa que encerra',
    legenda: 'a sessão encerra · a aberta sobe em 200, por baixo da barra, e revela a sem sessão no lugar · abre no fim: parada',
    render: () => <ComAbrirDeNovo Peca={Encerramento} /> },
  { id: 'mov-faixa-encerrar', folha: 2, chrome: true, semBancada: true, rotulo: 'o ENCERRAR que se apaga e volta',
    legenda: 'a lei 17 · a tinta troca direto, sem piscar, e nada anima',
    render: () => <EncerrarQueApaga /> },
]
