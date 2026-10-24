// A prova (folha 7): o que o módulo devolveu, num poço com o traço lima
// embaixo — é veredito (Lei 1). O rótulo em lima, a versão e a frase que
// diz como se provou. tipo 'cadeia' (a prova da cadeia, sem uso nas telas: a
// cadeia concluída da T09 diz o resultado na faixa do com contagem; fica o espécime
// da folha 7) ou 'sessao' (T16, o que sobreviveu ao reinício, a versão maior).
// `legendaMuda` (T11/02):
// a legenda que espera a última linha da conferência fica muda pro leitor, como o
// veredito; quem monta a esconde por CSS. Sem ela, nada muda.
// O veredito que espera a prova · `aguarda`: a prova no lugar desde o começo, com a moldura e a altura do
// quadro final; nada muda de lugar nem de altura até o fim. Dois jeitos:
// · 'legenda' (T11/02): o bloco inteiro já está no lugar, e só a legenda — o que
//   compara com o cadastro — espera, guardando o lugar sem texto, muda pro leitor.
// · um número (T16/02): a prova inteira espera. O traço de baixo fica no cinza
//   neutro, o rótulo e a legenda guardam o lugar sem texto, e a contagem
//   acompanha as linhas no lugar da versão (1 de 8 … 8 de 8, a unidade em
//   `aguardaUnidade`, o texto da tela), com a tinta do número do aviso; no 0, o
//   lugar fica vazio. Mudo pro leitor até o fim.
// Quando a tela passa `aguarda` a null (a última linha acendeu), o que esperava
// entra em 150, por opacity: o rótulo, a versão e a legenda (ou só a legenda); o
// lima do traço, por uma camada (o cinza sai por cima); a contagem sai no mesmo
// esmaecer. Nascida com a prova (sem `aguarda`), parada.
// · `surge` (o mesmo gesto do Aviso): a prova que aparece depois de a tela
//   abrir, onde a referência não reserva o lugar dela — sem uso nas telas hoje —
//   esmaece no lugar, inteira, em 150. O espaço
//   abre direto (Lei 3). Quem abre já no quadro (a URL, o palco, a coluna, o print)
//   não o passa: parada.
import { useRef } from 'react'
import { useVez } from '../primitivos/vez.js'
import './Prova.css'
import '../primitivos/Traco.css'

// `desenha` (T16/02): o traço lima embaixo da prova se desenha da esquerda pra
// direita, uma vez (o traço que se desenha, movimento.md); sem ela, a borda lima de sempre
export function Prova({ tipo = 'cadeia', rotulo, versao, legenda, legendaMuda = false, className = '', style, aguarda, aguardaUnidade, surge = false, desenha = false }) {
  const espera = aguarda != null
  const tudo = espera && aguarda !== 'legenda'
  const prova = useVez(espera ? (tudo ? 'tudo' : 'legenda') : null)
  const chega = !espera && prova.vez > 0 ? prova.antes : null   // o que esperava: 'tudo' ou 'legenda'
  const conta = useRef(null)
  if (tudo) conta.current = aguarda >= 1 ? aguarda : null
  const classes = [
    'ds-prova', `ds-prova-${tipo}`, tudo ? 'ds-prova-aguarda' : '', espera && !tudo ? 'ds-prova-aguarda-legenda' : '',
    chega ? `ds-prova-chega ds-prova-chega-${chega}` : '', surge ? 'ds-prova-surge' : '', desenha ? 'ds-prova-desenha' : '', className,
  ].filter(Boolean).join(' ')
  return (
    <div className={classes} style={style} aria-hidden={tudo ? 'true' : undefined}>
      <span className="ds-prova-rotulo">{rotulo}</span>
      {tudo || chega === 'tudo' ? (
        // a versão e a contagem no mesmo lugar (a mesma célula), a contagem por cima; o lugar tem o tamanho da versão
        <span className="ds-prova-lugar">
          <span className="ds-prova-versao">{versao}</span>
          {tudo && aguarda >= 1 && (
            <span className="ds-prova-conta" aria-hidden="true">
              <span className="ds-prova-conta-numero">{aguarda} {aguardaUnidade != null && <span className="ds-prova-conta-unidade">{aguardaUnidade}</span>}</span>
            </span>
          )}
          {/* a contagem que sai esmaecendo é só desenho (o texto no CSS): o que já saiu não se lê */}
          {chega === 'tudo' && conta.current != null && (
            <span className="ds-prova-conta ds-prova-conta-sai" aria-hidden="true">
              <span className="ds-prova-conta-numero" data-texto={`${conta.current} `}>{aguardaUnidade != null && <span className="ds-prova-conta-unidade" data-texto={aguardaUnidade} />}</span>
            </span>
          )}
        </span>
      ) : <span className="ds-prova-versao">{versao}</span>}
      <span className="ds-prova-legenda" aria-hidden={legendaMuda || espera ? 'true' : undefined}>{legenda}</span>
      {/* o cinza do traço sai por uma camada, por cima do lima */}
      {chega === 'tudo' && <span className="ds-prova-capa" aria-hidden="true" />}
      {desenha && <span className="ds-prova-traco ds-traco-desenha" aria-hidden="true" />}
    </div>
  )
}
