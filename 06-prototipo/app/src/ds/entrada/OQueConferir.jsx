// O que conferir (folha 6): as causas de uma falha,
// numeradas, antes de tentar de novo — a caixa de poço, o rótulo e uma linha por
// causa, o nome em negrito e o que conferir depois. Nasceu na T05/04
// e serve a toda falha que diz o que olhar: a T13/09 também.
// `falha`: o traço vermelho embaixo, quando a falha mora nesta caixa (a conexão
// que não respondeu, T05/04); sem ele, a caixa de poço comum, quando a falha já
// está desenhada em cima (a régua do item reprovado, T13/09).
// `semCaixa` (T09/12): a variante dentro do elo da Conexão, quando o módulo ainda não
// falou com o servidor — sem a caixa nem o recheio dela, as linhas a 4 uma da outra; o
// rótulo de 10 e as causas de 13, as medidas da caixa. Quem põe dentro do elo dá a folga de cima.
// `causas`: [{ titulo: '1 · Bateria do ônibus', texto: '— carga e terminais' }]
// `acao` (T09/12, decisão 64): o que se faz depois de conferir, ao lado do rótulo — o link dentro do
// conteúdo (folha 6), 14/600, com o toque de 44 sem empurrar a linha: *Conferir de novo*.
// { texto, aoTocar } · sem `aoTocar` (o quadro parado), o link fica desenhado
import { LinkConteudo } from './LinkConteudo.jsx'
import '../cartoes/caixas.css'   // a caixa de poço, a do aviso
import './OQueConferir.css'

export function OQueConferir({ rotulo, causas, falha = false, semCaixa = false, acao }) {
  const caixa = semCaixa ? 'ds-o-que-conferir-sem-caixa' : `ds-caixa-poco ${falha ? 'ds-caixa-falha' : ''}`
  const titulo = <span className="ds-o-que-conferir-rotulo">{rotulo}</span>
  return (
    <div className={`ds-o-que-conferir ${caixa}`}>
      {acao ? <div className="ds-o-que-conferir-cabeca">{titulo}<LinkConteudo aoTocar={acao.aoTocar}>{acao.texto}</LinkConteudo></div> : titulo}
      {causas.map((c) => <span key={c.titulo} className="ds-o-que-conferir-causa"><span className="ds-o-que-conferir-titulo">{c.titulo}</span> {c.texto}</span>)}
    </div>
  )
}
