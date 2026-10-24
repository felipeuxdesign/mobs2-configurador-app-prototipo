// A nota (folha 4): a caixa tracejada com o rótulo em cima e uma frase. Não é
// aviso — não tem poço nem veredito. Dois tons:
//   explica · o que falta explicar (T05), tudo em --tinta-apagada
//   fato    · o fato declarado, com o nome dele em cima: a 'nota com rótulo'
//             da folha 4, o TRAVADO NA SESSÃO do menu (T04/10 e 11) — 12 em
//             volta, o rótulo em --tinta-secundaria, a frase de 13 em 500
//   achado  · o que a leitura achou e não classifica (T11/01) — a
//             borda do poço, 10 · 12, 2 entre o rótulo e a frase, os dois em
//             --tinta-secundaria, a frase de 13 a 1,4
//   aguarda · sem uso nas telas nem na folha: era a CAN que esperava o bloco do
//             ativo na T07, que não tem mais essa caixa (decisão 61) — 10 · 12 em
//             volta, o rótulo e a frase em --tinta-apagada, a frase de 12 em 400
// antesDoRodape: a folga de 16 até o rodapé, quando a nota fecha o conteúdo.
import './caixas.css'
import './Nota.css'

// corpo (T03): 'legenda' é a frase de 12 da folha; 'secundario' é a
// de 13, em 400 e mais aberta, da nota que diz o bloqueio (T03/04); 'item'
// (T13/09) é a de 13, em 400, na entrelinha da frase da caixa
// apagada, da nota do item que não se marca à mão
// T16/04: 'pulado' é a de 13, em 500 e --tinta-secundaria, da nota
// que diz o que não rodou. Ela é uma peça só: a
// caixa tracejada com a frase, sem o rótulo ('Não rodaram: contadores, …'), e
// as duas linhas equilibradas — o text-wrap: balance fica na caixa, não na
// frase, como a T16/04 desenha.
export function Nota({ tom = 'explica', titulo, frase, antesDoRodape = false, corpo = 'legenda' }) {
  return (
    <div className={`ds-nota ds-caixa-apagada ds-nota-${tom} ${antesDoRodape ? 'ds-nota-antes-do-rodape' : ''} ${corpo === 'secundario' ? 'ds-nota-corpo-secundario' : ''} ${corpo === 'item' ? 'ds-nota-corpo-item' : ''} ${corpo === 'pulado' ? 'ds-nota-corpo-pulado' : ''}`}>
      {titulo != null && <span className="ds-nota-titulo">{titulo}</span>}
      <span className="ds-nota-frase">{frase}</span>
    </div>
  )
}
