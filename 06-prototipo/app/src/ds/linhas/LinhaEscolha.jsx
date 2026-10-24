// A escolha numa lista (folha 3, T02): tocar numa empresa a deixa escolhida.
// O quadrado lima cheio é o escolhido (Lei 1); o nome sobe pra --tinta.
// O marcador é o de todas as escolhas (decisão 29): poço de 30, vazado de 11
// no desmarcado e lima de 11 no marcado — no toque, o lima surge no poço
// (opacidade e escala de 80% a 100%, em 150), e na que perde a marca faz o mesmo
// ao contrário (a peça do marcador).
//
// nome, detalhe ('pacote de ontem, 07:10'), valor ('24 ativos'; sem ele, nada
// à direita), estado: 'disponivel' · 'escolhida'
// aoTocar, rotulo (o nome pro leitor de tela; o texto visível, se faltar), divisoria
// `nomeSobe` (T02): sem ele, o nome da escolhida fica em --tinta-forte, como o das
// outras — a T02/01 desenha assim; a folha 3 sobe o nome (diferença entre as duas
// referências, na ficha da T02).
//
// A escolha do bloco na manutenção (T09/08): `valorTom` 'secundaria', o
// valor à direita em --tinta-secundaria, como a 08 desenha (na T02 ele é
// --tinta-apagada: diferença conhecida entre as duas referências); `inerte`, a linha que ainda não se
// escolhe — no desenho igual às outras, sem o pressionado, e desabilitada pro leitor
// (os blocos sem texto aprovado pro reenvio).
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Quadrado } from '../primitivos/Marcador.jsx'
import './LinhaEscolha.css'

export function LinhaEscolha({ nome, detalhe, valor, estado = 'disponivel', aoTocar, rotulo, divisoria = true, nomeSobe = true, valorTom, inerte = false, className = '' }) {
  const escolhida = estado === 'escolhida'
  return (
    <Tocavel
      className={`ds-escolha ds-escolha-${estado} ${nomeSobe ? '' : 'ds-escolha-nome-fica'} ${divisoria ? '' : 'ds-escolha-sem-divisoria'} ${className}`}
      role="radio" aria-checked={escolhida}
      rotulo={rotulo} aoTocar={aoTocar} desabilitado={inerte}
    >
      <Poco tam={30}>
        <Quadrado escolhido={escolhida} />
      </Poco>
      <span className="ds-escolha-corpo">
        <span className="ds-escolha-nome">{nome}</span>
        <span className="ds-escolha-detalhe">{detalhe}</span>
      </span>
      {valor != null && <span className={`ds-escolha-valor ${valorTom ? `ds-escolha-valor-${valorTom}` : ''}`}>{valor}</span>}
    </Tocavel>
  )
}
