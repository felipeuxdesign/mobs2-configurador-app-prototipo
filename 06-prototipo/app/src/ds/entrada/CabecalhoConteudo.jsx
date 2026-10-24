// O cabeçalho do conteúdo (folha 6): o título da tela e, à direita, o
// contador na linha de base. O contador conta o que passou (neutro), quantos
// reprovaram (falha, em vermelho) ou fecha o veredito (veredito, em lima —
// a pré-checagem de 11 de 11, T05). O título nunca vira a falha (R-03).
import './CabecalhoConteudo.css'

// T05/03: a `unidade` sem `contagem` — o contador só com a palavra,
// quando a busca não acha nada ('nenhum encontrado'). Com a contagem, o de sempre.
// T12: `forte` — o contador em 700, quando ele é o veredito de uma
// coisa só, em palavra: o 'aprovada' em lima do detalhe da instalação (T12/01,
// tom 'veredito'). Sem ele, o de sempre.
// T16: `subtitulo` — a linha de 12 embaixo do título, em
// --tinta-apagada, com `folgaSubtitulo` 4 (a sessão interrompida, T16/06) ou 6
// (o encerrando sem homologar, T16/03), como cada referência desenha. Sem ele,
// o cabeçalho é o de sempre, sem a caixa em volta. As duas telas usam o 4
// (como a T16/02, o subtítulo montado de um jeito só, no bloco do título), e o
// 6 está sem uso nas telas.
export function CabecalhoConteudo({ titulo, contagem, unidade, tom = 'neutro', forte = false, subtitulo, folgaSubtitulo = 4, className = '' }) {
  if (subtitulo != null) {
    return (
      <div className={`ds-cabecalho-com-subtitulo ds-cabecalho-folga-${folgaSubtitulo} ${className}`}>
        <CabecalhoConteudo titulo={titulo} contagem={contagem} unidade={unidade} tom={tom} forte={forte} />
        <span className="ds-cabecalho-subtitulo">{subtitulo}</span>
      </div>
    )
  }
  return (
    <div className={`ds-cabecalho ${className}`}>
      <h1 className="ds-cabecalho-titulo">{titulo}</h1>
      {(contagem != null || unidade != null) && (
        <span className={`ds-cabecalho-contador ds-cabecalho-contador-${tom}${forte ? ' ds-cabecalho-contador-forte' : ''}`}>
          {contagem == null ? null : unidade != null ? `${contagem} ` : contagem}
          {unidade != null && <span className="ds-cabecalho-unidade">{unidade}</span>}
        </span>
      )}
    </div>
  )
}
