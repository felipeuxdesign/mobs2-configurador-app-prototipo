// O movimento do check (as peças do movimento): o check que nasce no poço, o aviso que surge, o primário que acende e
// troca o texto no lugar, e o veredito que espera a prova (a T16 não tem: o
// autoteste correndo não tem veredito, e o fim é outro quadro). Cada espécime é a peça
// tocável, com os botões da bancada fazendo o que a tela fará — a leitura que chega, a
// recusa, o toque que acende. Fora da bancada (semBancada): o quadro parado de cada
// peça é o espécime da folha dela, e estes só provam o que anda entre os quadros
// (scripts/caminhos/mov-check.mjs). Os botões (tracejados, "bancada · …") são da
// vitrine, não do app; o que está dentro é a peça, com os textos das telas e o dado do
// mock. O ritmo dos processos sai de ritmos.js, como nas telas.
// Cada espécime abre parado — é o "nunca ao abrir" —, e o "abre de novo" monta a peça
// outra vez já no fim, parada.
import { useEffect, useState } from 'react'
import {
  Lista, LinhaChecagem, LinhaEscolha, Aviso, Primario, Dialogo, Frase, Cadeia, Encerramento,
  LinhaContagem, Requisito, Requisitos,
} from '../../ds/index.js'
import { RITMOS } from '../../estado/ritmos.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { T as T11 } from '../../telas/T11/textos.js'
import { LINHAS, parDoCaso, CASO_DIFF, CASO_CONFERE, conferenciaDo, comparadasAte } from '../../telas/T11/conferencia.js'
import { elosDo, parDoCaso as parDaCadeia } from '../../telas/T09/cadeia.js'
import { T as T13 } from '../../telas/T13/textos.js'
import { TX as T02 } from '../../telas/T02/textos.js'
import { contextoDe, serialDoCaso, CASO_FIRMWARE } from '../../telas/T07/diagnostico.js'
import './mov-check.css'

function Controles({ children }) { return <div className="vitrine-mc-controles">{children}</div> }
function Botao({ children, aoTocar }) { return <button type="button" className="vitrine-mc-botao" onClick={aoTocar}>{children}</button> }

// a leitura que corre, como nas telas: `lidas` anda de 0 a `total`, uma a cada `ms`
function useLeitura(total, ms) {
  const [lidas, setLidas] = useState(0)
  const [corre, setCorre] = useState(false)
  useEffect(() => {
    if (!corre) return undefined
    if (lidas >= total) { setCorre(false); return undefined }
    const relogio = setTimeout(() => setLidas((n) => n + 1), ms)
    return () => clearTimeout(relogio)
  }, [corre, lidas, total, ms])
  return { lidas, correr: () => { setLidas(0); setCorre(true) } }
}

// ── a linha que conclui : o quadrado de agora, o check com o valor, a reprova com a causa ──
// os textos são os da folha 4 (f4-linhas), na linha de 50 do módulo da T07; o firmware
// fora da lista é o do mock (o M2C-0451, T07/04), com as versões homologadas do VL06 FULL
const FORA = contextoDe(serialDoCaso(CASO_FIRMWARE))
const LINHA = [
  [{ estado: 'ainda-nao', valor: '—' }, { estado: 'ainda-nao', valor: '—' }],
  [{ estado: 'agora' }, { estado: 'ainda-nao', valor: '—' }],
  [{ estado: 'aprovada', valor: 'VL06 FULL' }, { estado: 'agora' }],
  [{ estado: 'aprovada', valor: 'VL06 FULL' }, { estado: 'reprovada', causa: `homologadas ${FORA.matriz.firmwares.join(' e ')}`, valor: FORA.firmware }],
]
function LinhasQueConcluem({ inicio = 0 }) {
  const [passo, setPasso] = useState(inicio)
  const [a, b] = LINHA[passo]
  return (
    <Lista>
      <LinhaChecagem variante="diagnostico" titulo="Serial no cadastro" {...a} />
      <LinhaChecagem variante="diagnostico" titulo="Firmware" {...b} divisoria={false} />
      <Controles><Botao aoTocar={() => setPasso((p) => Math.min(p + 1, LINHA.length - 1))}>bancada · avança</Botao></Controles>
    </Lista>
  )
}
function ComAbrirDeNovo({ children, fim }) {
  const [vez, setVez] = useState(0)
  return (
    <div className="vitrine-mc-pilha">
      <div key={vez}>{vez ? fim : children}</div>
      <Controles><Botao aoTocar={() => setVez((v) => v + 1)}>bancada · abre de novo</Botao></Controles>
    </div>
  )
}

// ── a linha com contagem (T03): o check do tipo que terminou; a contagem troca no lugar ──
function Contagens() {
  const [feito, setFeito] = useState(false)
  return (
    <div>
      <Lista>
        <LinhaContagem nome="Ativos" contagem={feito ? '10 de 10' : '6 de 10'} estado={feito ? 'ok' : 'agora'} />
        <LinhaContagem nome="Modelos de ativo" contagem="3 de 3" estado="ok" divisoria={false} />
      </Lista>
      <Controles><Botao aoTocar={() => setFeito(true)}>bancada · termina</Botao></Controles>
    </div>
  )
}

// ── a cadeia (T09): o elo relido, o trilho que acende de cima pra baixo; e a recusa, com o aviso que surge ──
// os blocos e a recusa são os da folha 5 (f5-instrumentos) e da folha 4 (o aviso de processo parado):
// os quatro primeiros elos da cadeia concluída do herói, cada um com o que gravou (decisões 49 e 57)
const BLOCOS_CADEIA = elosDo({ confirmados: M.cadeia.ordem.length, fase: 'concluida' }, parDaCadeia('modulo-ja-deste-ativo'))
  .slice(0, 4).map(({ nome, valor, descricao }) => ({ nome, valor, descricao }))
function CadeiaQueGrava() {
  const [feitos, setFeitos] = useState(1)
  const [recusada, setRecusada] = useState(false)
  const elos = BLOCOS_CADEIA.map((b, i) => {
    if (i < feitos) return { estado: 'ok', ...b }
    if (i === feitos) return recusada ? { estado: 'xis', nome: b.nome, valor: 'recusado', descricao: 'os pontos das regiões não voltaram' } : { estado: 'agora', nome: b.nome, valor: 'gravando', descricao: b.descricao }
    return recusada ? { estado: 'traco', nome: b.nome, descricao: 'não foi alcançado' } : { estado: 'espera', nome: b.nome, descricao: b.descricao }
  })
  return (
    <div className="vitrine-mc-pilha">
      {recusada && <Aviso glifo="xis" titulo="A CADEIA PAROU" frase="Cercas foi recusado. Os três seguintes nem começaram." surge />}
      <Cadeia elos={elos} justa={recusada} />
      <Controles>
        <Botao aoTocar={() => setFeitos((n) => Math.min(n + 1, 2))}>bancada · relê</Botao>
        <Botao aoTocar={() => setRecusada(true)}>bancada · recusa</Botao>
      </Controles>
    </div>
  )
}

// ── o encerramento (T16): o passo que conclui esmaece o check; o trilho não acende ──
const PASSOS = ['Contadores e estado', 'Reinício do módulo', 'Releitura completa', 'Repouso do módulo']
const SITUACAO = ['gravados', 'voltou', 'relido', 'restaurado']
function EncerramentoQueCorre() {
  const [k, setK] = useState(1)
  const passos = PASSOS.map((nome, i) => (i < k ? { estado: 'ok', nome, situacao: SITUACAO[i] } : i === k ? { estado: 'agora', nome, situacao: '—' } : { estado: 'espera', nome, situacao: '—' }))
  return (
    <div>
      <Encerramento passos={passos} />
      <Controles><Botao aoTocar={() => setK((n) => Math.min(n + 1, PASSOS.length))}>bancada · conclui</Botao></Controles>
    </div>
  )
}

// ── o requisito da senha (T01): a marca ganha o check e o texto clareia; a volta é igual ao contrário ──
function RequisitosDaSenha() {
  const [cumpre, setCumpre] = useState(false)
  return (
    <div>
      <Requisitos>
        <Requisito texto="10 caracteres ou mais" cumprido={cumpre} />
        <Requisito texto="Um número" />
      </Requisitos>
      <Controles><Botao aoTocar={() => setCumpre((c) => !c)}>bancada · cumpre</Botao></Controles>
    </div>
  )
}

// ── o primário que acende (T13·6): no diálogo com ciência, o Finalizar acende por uma camada quando o check é marcado ──
// os textos são os da folha 2 (f2-dialogo-ciencia)
function Ciencia() {
  const [ciente, setCiente] = useState(false)
  return (
    <Dialogo titulo="A Seção F não passou" primario="Finalizar instalação" saida="Cancelar" ciencia="Estou ciente · Rafael Vieira, 14:30"
      ciente={ciente} aoMudarCiencia={setCiente} aoPrimario={() => {}} aoSair={() => {}} margem={20}>
      <Frase>O evento de teste não chegou ao servidor. A instalação fica registrada com ela falhando — e com o seu nome.</Frase>
    </Dialogo>
  )
}

// ── o texto do primário que troca no lugar (T02): a primeira escolha acende o Sincronizar, o texto
// esmaece no lugar e o roxo troca direto; trocar a escolha não muda o texto ──
const EMPRESAS = M.empresas.slice(0, 2)
function PrimarioDaEmpresa() {
  const [escolhida, setEscolhida] = useState(null)
  return (
    <div className="vitrine-mc-pilha">
      <Lista>
        {EMPRESAS.map((e, i) => (
          <LinhaEscolha key={e.id} nome={e.nome} estado={escolhida === e.id ? 'escolhida' : 'disponivel'} nomeSobe={false} aoTocar={() => setEscolhida(e.id)} divisoria={i < EMPRESAS.length - 1} />
        ))}
      </Lista>
      <Primario desabilitado={!escolhida} trocaTexto>{escolhida ? T02.sincronizar : T02.escolhaEmpresa}</Primario>
    </div>
  )
}

// ── o botão que diz o que falta (T13/08 → 15): o Fotografar o problema se desabilita no toque
// sem o roxo por cima, o Conte o que aconteceu entra no lugar, e o Salvar com ressalva quando o texto chega ──
function BotaoQueDizOQueFalta() {
  const [passo, setPasso] = useState(0)   // 0 · fotografar · 1 · contar · 2 · salvar
  const rotulo = [T13.fotografarProblema, T13.conteOQueAconteceu, T13.salvarComRessalva][passo]
  return (
    <div>
      <Primario desabilitado={passo === 1} trocaTexto aoTocar={() => setPasso((p) => (p === 0 ? 1 : p))}>{rotulo}</Primario>
      <Controles><Botao aoTocar={() => setPasso(2)}>bancada · conta</Botao></Controles>
    </div>
  )
}

// ── o veredito que espera a prova (T11): a caixa no lugar desde o começo,
// neutra, com a contagem das que se comparam; a palavra e a cor entram quando a quinta linha acende (os cinco
// blocos do script: Ativo, Cercas, Leitor, Eventos e Conexão) ──
const SESSAO_T11 = SEMENTES.T11.sessao
function Conferencia({ confere = false, lida = false }) {
  const par = parDoCaso(confere ? CASO_CONFERE : CASO_DIFF)
  const { linhas, naoBatem, total } = conferenciaDo({ par, sessao: SESSAO_T11, divergem: confere ? [] : M.casos[CASO_DIFF].divergencias.map((d) => d.bloco) })
  const n = LINHAS.length
  const leitura = useLeitura(n, RITMOS.conferenciaLinhaMs)
  const lidas = lida ? n : leitura.lidas
  const lendo = lidas < n
  const aguarda = lendo ? comparadasAte(lidas) : null
  // T11/04: enquanto lê, a caixa diz *CONFERINDO*, sem poço; no fim, o veredito
  const espera = { aguarda, aguardaUnidade: T11.deTotal(total), aguardaTitulo: T11.conferindo }
  const cabeca = confere
    ? <Aviso tom="veredito" titulo={T11.confere} numero={total} unidade={T11.deTotal(total)} {...espera} />
    : <Aviso glifo="xis" titulo={T11.naoBate} numero={naoBatem} unidade={T11.deTotal(total)} {...espera} />
  return (
    <div className="vitrine-mc-pilha">
      {cabeca}
      <Lista>
        {linhas.map((l, i) => (i === lidas
          ? <LinhaChecagem key={l.id} variante="conferencia" estado="agora" titulo={l.titulo} valor={T11.conferindoLinha} par={l.par} divisoria={i < n - 1} />
          : <LinhaChecagem key={l.id} variante="conferencia" estado={l.estado} titulo={l.titulo} valor={i > lidas ? T11.vazio : l.valor} par={l.par}
            divisoria={i < n - 1} lendo={i > lidas} />
        ))}
      </Lista>
      {!lida && <Controles><Botao aoTocar={leitura.correr}>bancada · confere</Botao></Controles>}
    </div>
  )
}

// o cartão com a largura da tela, 16 de cada lado, como nas outras molduras de recheio 0
const naTela = { padding: '0 calc(var(--e-16) - var(--traco-borda))' }

export const especimes = [
  { id: 'mov-check-linha', folha: 4, semBancada: true, rotulo: 'a linha que conclui',
    legenda: 'bancada · avança: o quadrado de agora, o check com o valor, a reprova com a causa · esmaecem em 150; o título e a cor trocam direto',
    render: () => <ComAbrirDeNovo fim={<LinhasQueConcluem inicio={LINHA.length - 1} />}><LinhasQueConcluem /></ComAbrirDeNovo> },
  { id: 'mov-check-contagem', folha: 6, semBancada: true, rotulo: 'a linha com contagem que termina',
    legenda: 'o check do tipo que baixou esmaece em 150 · a contagem troca no lugar',
    render: () => <Contagens /> },
  { id: 'mov-check-cadeia', folha: 5, semBancada: true, rotulo: 'a cadeia que grava',
    legenda: 'bancada · relê: o check do elo esmaece em 150 e o trilho acende de cima pra baixo em 300 · bancada · recusa: o xis e o aviso esmaecem em 150',
    render: () => <CadeiaQueGrava /> },
  { id: 'mov-check-encerramento', folha: 5, semBancada: true, rotulo: 'o encerramento que corre',
    legenda: 'o check do passo esmaece em 150 · o trilho troca direto',
    render: () => <EncerramentoQueCorre /> },
  { id: 'mov-check-requisito', folha: 6, semBancada: true, rotulo: 'o requisito que se cumpre',
    legenda: 'a marca ganha o check e o texto clareia, em 150 · a volta é igual',
    render: () => <RequisitosDaSenha /> },
  { id: 'mov-check-ciencia', folha: 2, chrome: true, semBancada: true, rotulo: 'o primário que acende',
    legenda: 'marcar Estou ciente: o quadrado surge e o Finalizar acende por uma camada, em 150',
    render: () => <Ciencia /> },
  { id: 'mov-check-primario-texto', folha: 1, semBancada: true, rotulo: 'o texto do primário que troca',
    legenda: 'a primeira escolha: o Sincronizar esmaece no lugar, em 150 · o roxo troca direto · trocar a escolha não muda o texto',
    render: () => <PrimarioDaEmpresa /> },
  { id: 'mov-check-primario-falta', folha: 1, semBancada: true, rotulo: 'o botão que diz o que falta',
    legenda: 'o toque desabilita sem o roxo por cima · o texto novo esmaece no lugar, em 150',
    render: () => <BotaoQueDizOQueFalta /> },
  { id: 'mov-check-veredito', folha: 4, chrome: true, semBancada: true, rotulo: 'o veredito que espera a prova',
    legenda: 'bancada · confere: a caixa diz CONFERINDO, a contagem acompanha, e a palavra, a cor e o poço entram na quinta linha',
    render: () => <div style={naTela}><ComAbrirDeNovo fim={<Conferencia lida />}><Conferencia /></ComAbrirDeNovo></div> },
  { id: 'mov-check-veredito-confere', folha: 4, chrome: true, semBancada: true, rotulo: 'o veredito que confere',
    legenda: 'o traço cinza vira lima por uma camada, e a palavra entra no mesmo tique',
    render: () => <div style={naTela}><Conferencia confere /></div> },
]
