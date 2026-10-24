// O fato declarado (folhas 5 e 8): a caixa tracejada, no fundo apagado, do
// que não se lê agora — sem vermelho, porque não é falha. Dois conteúdos:
// `texto`, o resumo numa frase (os instrumentos apagados, que só fecham
// andando, T07), ou `linhas`, o que não se aplica e por quê (T10).
// Com `aoPe`, fica no pé do conteúdo, a --respiro do rodapé.
import '../cartoes/caixas.css'   // a caixa apagada é a do vazio declarado e das notas
import './Declarado.css'

// `divisoriaNoFim` (T10/02): a última linha fica com a
// divisória embaixo, como a referência do passo de rotação desenha.
export function Declarado({ rotulo, texto, linhas, aoPe = false, divisoriaNoFim = false }) {
  return (
    <div className={`ds-declarado ds-caixa-apagada ${aoPe ? 'ds-declarado-ao-pe' : ''} ${divisoriaNoFim ? 'ds-declarado-divisoria-fim' : ''}`}>
      <span className="ds-declarado-rotulo">{rotulo}</span>
      {texto != null && <p className="ds-declarado-texto">{texto}</p>}
      {linhas && (
        <div className="ds-declarado-linhas">
          {linhas.map((l) => (
            <div key={l.nome} className="ds-declarado-linha">
              <span className="ds-declarado-nome">{l.nome}</span>
              <span className="ds-declarado-motivo">{l.motivo}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
