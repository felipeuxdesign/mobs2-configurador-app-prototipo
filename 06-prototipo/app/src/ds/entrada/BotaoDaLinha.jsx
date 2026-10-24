// O botão da linha (folha 6 · T14/08, T13/40): a resposta do técnico que mora na
// própria linha do passo ou do item, fora do rodapé — o Confere com o cartão e o Não
// confere da T14/08, o Ouvi e o Não ouvi e o Testar bip da T13/40. O desenho do botão
// secundário — o fill em --fundo-botao e a borda em --borda-botao, o texto em --tinta, 700.
// Sem roxo e sem lima (não é o primário); no toque afunda, como o secundário. Tocando,
// o fill do cartão e o texto apagado (T13/39).
// · `tam`: 'resposta' (40 de alto, os dois lado a lado, cada um com a metade) e
//   'teste' (30 de alto, o Testar bip, do tamanho do texto, à direita do título).
//   'pergunta' (36 de alto, o Reenviar de cada dependente na manutenção da T09, 10/14/15).
// · `letra`: a das referências — 13 no cartão da T14, 14 no bip da T13.
import './BotaoDaLinha.css'

export function BotaoDaLinha({ children, aoTocar, rotulo, desabilitado = false, tam = 'resposta', letra = 'corpo' }) {
  return (
    <button type="button" className={`ds-botao-linha ds-botao-linha-${tam} ds-botao-linha-letra-${letra}`}
      disabled={desabilitado} aria-label={rotulo} onClick={desabilitado ? undefined : aoTocar}>
      {children}
    </button>
  )
}

// os dois, lado a lado, a 8 um do outro (T14/08, T13/40)
export function RespostasDaLinha({ children, className = '' }) {
  return <div className={`ds-respostas-linha ${className}`}>{children}</div>
}
