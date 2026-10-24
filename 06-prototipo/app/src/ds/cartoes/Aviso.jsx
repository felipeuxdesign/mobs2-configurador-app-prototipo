// O aviso (folha 4, Lei 7 e R-08): um formato só — poço, rótulo, uma frase —
// em quatro usos: falha, aviso, processo parado e com contagem. A falha acende
// o traço vermelho embaixo e o rótulo em vermelho (Lei 2); o aviso neutro é o
// mesmo desenho, cinza, sem traço. Com contagem, o número vai à direita, com a
// unidade junto (Lei 10). O glifo é o de estado da folha 3, pelo nome.
// `semPoco`: a exceção da Lei 7 — o aviso da folha Trocar de empresa
// (T04/08) é só o rótulo e a frase, com 12 em volta e a frase a 1,4.
import { useRef } from 'react'
import { Poco, Glifo } from '../index.js'
import { useVez } from '../primitivos/vez.js'
import './caixas.css'
import './Aviso.css'

// `mudo` (T03; ligado por padrão): o glifo do aviso fica mudo pro leitor — o rótulo e a
// frase já dizem o que houve. Desligado, nada muda.
// `tom` 'veredito' (T11/02): o com contagem quando tudo confere — o
// rótulo de topo em lima, sem poço, 12 · 14 em volta e o traço lima embaixo
// (Lei 1: é veredito). A contagem à direita é a mesma.
// `bloqueio` (T16/05 · a exceção da Lei 7): o que ficou
// bloqueado, sem poço — o rótulo de topo, 14 em volta, 6 entre o rótulo e a
// frase, e a frase de duas orações em --tinta-secundaria (A HOMOLOGAÇÃO FICA
// BLOQUEADA). Com o tom 'falha', o traço vermelho embaixo é o de sempre.
// `acao` (T16/05, decisão 64): embaixo da frase, a quem acionar, em --tinta e 600 — *Acione o gestor.*
// `traco` (o mundo real · T01/14): o aviso neutro com o traço embaixo, em
// cinza — o que falta é do mundo, não um erro do técnico (SEM CONEXÃO, no
// login). O desenho é o do aviso; só o traço de baixo acende, na cor do rótulo.
// Com contagem (a folha 4 e a T11/00 e 01): o poço de
// 32, com o glifo de 16 (o tamanho do glifo do poço de 26) — o aviso tem o poço
// dele, e a lei do poço na linha não vale pra ele.
const CONTAGEM = { poco: 32, glifo: 26 }

// O movimento fino, três gestos (a tela diz quando; a peça diz como):
// · `surge`: o aviso que aparece depois de a tela abrir — a
//   senha errada, a parada, a recusa, a queda — esmaece no lugar, em --mov-rapido.
//   Quem abre já no estado (a URL, o palco, a coluna, o print) não o passa: parado.
//   O espaço abre direto (Lei 3).
// · `aguarda`: o veredito que
//   espera a prova. A caixa já está no lugar desde o começo, com o desenho do
//   quadro final — a moldura, o poço, a altura —, e nada muda de lugar nem de
//   altura até o fim. Enquanto a prova corre, ela fica neutra: o traço de baixo no
//   cinza do aviso neutro com traço (T01/14), o poço vazio, o rótulo e a frase
//   guardando o lugar, sem texto. `aguarda` é quantas linhas já acenderam: de 1 em
//   diante, a contagem acompanha no lugar do número (1 de 5 … 5 de 5, a unidade em
//   `aguardaUnidade`, o texto da tela), em --tinta, com a unidade em
//   --tinta-secundaria, como o número do aviso; no 0, o lugar fica vazio (nada
//   conta de zero). Mudo pro leitor até o fim (o veredito só fala no fim).
//   Quando a tela passa `aguarda` a null (a última linha acendeu), o veredito
//   entra em 150: a palavra (e a frase) por opacity, já na cor dela; a cor do
//   traço, por uma camada (o cinza sai por cima); o glifo no poço (o Glifo,
//   esmaece). O número do veredito troca no lugar da contagem, direto; sem número
//   no quadro final (o bloqueio da T16), a contagem sai no mesmo esmaecer. Nascida
//   com a prova (sem `aguarda`), a caixa nasce com o veredito, parada.
// · `aguardaTitulo` (lei 24 · T11/04): o veredito que espera diz o que
//   corre — *CONFERINDO* —, em --tinta-secundaria, com o traço de baixo no
//   --borda-poco; sem ele, o rótulo guarda o lugar, sem texto
export function Aviso({
  tom = 'falha', glifo = 'xis', poco = 26, nomeGlifo, titulo, frase, acao, numero, unidade, semPoco = false, bloqueio = false, traco = false, mudo = true,
  surge = false, aguarda, aguardaUnidade, aguardaTitulo,
}) {
  const falha = tom === 'falha'
  const veredito = tom === 'veredito'
  const contagem = numero != null
  const tamPoco = contagem ? CONTAGEM.poco : poco
  const tamGlifo = contagem ? CONTAGEM.glifo : poco
  // o veredito que espera a prova, e a prova que chega depois de a caixa montar
  const espera = aguarda != null
  const prova = useVez(espera)
  const chega = !espera && prova.vez > 0 && prova.antes === true
  // a última contagem, pra sair esmaecendo quando o quadro final não tem número
  const conta = useRef(null)
  if (espera) conta.current = aguarda >= 1 ? aguarda : null
  const mostraConta = espera ? aguarda >= 1 : chega && !contagem && conta.current != null
  const diz = espera && aguardaTitulo != null
  // a caixa que disse o que corria: na chegada, o poço (que ela não tinha) entra no mesmo esmaecer,
  // e a camada que sai tem o cinza do poço
  const disse = useRef(false)
  if (espera) disse.current = diz
  const classes = [
    'ds-aviso ds-caixa-poco', falha ? 'ds-caixa-falha ds-aviso-falha' : '', semPoco ? 'ds-aviso-sem-poco' : '', veredito ? 'ds-aviso-veredito' : '',
    bloqueio ? 'ds-aviso-bloqueio' : '', traco && !falha ? 'ds-aviso-traco' : '', surge ? 'ds-aviso-surge' : '',
    espera ? 'ds-aviso-aguarda' : '', diz ? 'ds-aviso-aguarda-diz' : '', chega ? 'ds-aviso-chega' : '',
    chega && disse.current ? 'ds-aviso-chega-disse' : '',
  ].filter(Boolean).join(' ')
  return (
    <div className={classes} aria-hidden={espera ? 'true' : undefined}>
      {!semPoco && !veredito && !bloqueio && (
        <Poco tam={tamPoco} aria-hidden={mudo ? 'true' : undefined}>
          {/* o glifo do veredito entra com a prova; fora do veredito que espera, o glifo troca direto, com o aviso */}
          <Glifo estado={glifo} poco={tamGlifo} nome={nomeGlifo} esmaece={espera || chega} chave={espera ? '·aguarda' : glifo} />
        </Poco>
      )}
      <span className="ds-aviso-texto">
        <span className="ds-aviso-titulo">{diz ? aguardaTitulo : titulo}</span>
        {frase != null && <span className="ds-aviso-frase">{frase}</span>}
        {acao != null && <span className="ds-aviso-acao">{acao}</span>}
      </span>
      {numero != null && (
        <span className="ds-aviso-numero">{numero} {unidade != null && <span className="ds-aviso-unidade">{unidade}</span>}</span>
      )}
      {mostraConta && espera && (
        <span className="ds-aviso-conta" aria-hidden="true">
          <span className="ds-aviso-numero">{aguarda} {aguardaUnidade != null && <span className="ds-aviso-unidade">{aguardaUnidade}</span>}</span>
        </span>
      )}
      {/* o cinza do traço sai por uma camada, por cima da cor do veredito */}
      {chega && (falha || veredito) && <span className="ds-aviso-capa" aria-hidden="true" />}
      {/* a contagem que sai esmaecendo é só desenho (o texto no CSS, como o Link): o que já saiu não se lê */}
      {mostraConta && !espera && (
        <span className="ds-aviso-conta ds-aviso-conta-sai" aria-hidden="true">
          <span className="ds-aviso-numero" data-texto={`${conta.current} `}>{aguardaUnidade != null && <span className="ds-aviso-unidade" data-texto={aguardaUnidade} />}</span>
        </span>
      )}
    </div>
  )
}
