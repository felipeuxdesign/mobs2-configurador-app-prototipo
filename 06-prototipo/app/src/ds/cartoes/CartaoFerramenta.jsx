// O cartão de ferramenta do menu (folha 4, T04): cada ferramenta diz, no
// próprio cartão, o que falta pra ela funcionar (HU-T04-2). Duas formas:
// o de meia largura (ícone em poço, o nome embaixo) e o largo, que ocupa a
// linha da grade (o rótulo de topo e o valor: o serial, a placa ou o próximo
// passo). Os estados mudam o que o cartão diz, nunca o lugar das coisas (Lei 3):
//   disponivel · o ícone lima no poço
//   decide     · a borda e o valor em lima: o próximo passo (Lei 1)
//   espera     · tracejado e apagado; o traço no poço e a causa no lugar da ação
//   sem-rede   · o mesmo da espera, com a causa da rede e o traço um a menos
//                (9, como a folha 4 e a T04 o desenham)
// A contagem é o contador no canto (o da fila, HU-T04-3).
// `linha`: o de meia largura que ocupa a linha da grade, com o mesmo
// desenho — o poço e o contador em cima, o nome embaixo —, o Finalizar com
// checklist do menu (T04/00 a 04, 12, 13, 15) e o com pendência da folha 4.
// O módulo e o ativo com a sessão aberta são o cartão largo de sempre, e o
// toque abre a folha do que a sessão prendeu (HU-T16-2, T04/10 e 11): quem
// monta passa o aoTocar. Só a espera é desabilitada de verdade (logica.md ·
// os cartões em espera): o toque não faz nada e o leitor ouve desabilitado.
// `desabilitado`: o largo que espera um processo, com o desenho de ligado — o
// módulo que reconecta, *reconectando…* (T04/18): sem o lima e sem toque.
// A `causa` no cartão ligado é o próximo passo, aceso, no desenho do motivo dos
// que esperam: *registrado · falta encerrar a sessão* (T04/19).
import { Tocavel, Poco, Glifo, Icone } from '../index.js'
import { Contador } from './Contador.jsx'
import './CartaoFerramenta.css'

const ICONE_DO_POCO = { 30: 18, 34: 20 } // o ícone de ferramenta dentro do poço (folha 3)

export function CartaoFerramenta({
  largo = false, linha = false, estado = 'disponivel', icone, poco = 30,
  titulo, valor, causa, contagem, rotulo, aoTocar, desabilitado = false, className = '',
}) {
  const espera = estado === 'espera' || estado === 'sem-rede'
  const marca = espera
    ? <Glifo estado="traco" />
    : <Icone nome={icone} tam={ICONE_DO_POCO[poco]} cor="lima" />
  const nome = rotulo ?? [titulo, valor, causa, contagem].filter((x) => x != null).join(', ')
  // sem-rede leva as duas classes: desenha como a espera (a folha 4 a desenha tracejada,
  // embora a legenda diga borda sólida) e só muda o traço no poço
  const classe = `ds-ferramenta ds-ferramenta-${largo ? 'largo' : 'meia'} ${linha && !largo ? 'ds-ferramenta-linha' : ''} ${espera ? 'ds-ferramenta-espera' : ''} ds-ferramenta-${estado} ${className}`
  if (largo) {
    return (
      <Tocavel className={classe} rotulo={nome} aoTocar={aoTocar} desabilitado={espera || desabilitado}>
        <Poco tam={poco}>{marca}</Poco>
        <span className="ds-ferramenta-leitura">
          <span className="ds-ferramenta-rotulo">{titulo}</span>
          <span className="ds-ferramenta-valor">{valor}</span>
        </span>
      </Tocavel>
    )
  }
  return (
    <Tocavel className={classe} rotulo={nome} aoTocar={aoTocar} desabilitado={espera}>
      <span className="ds-ferramenta-topo">
        <Poco tam={poco}>{marca}</Poco>
        {contagem != null && <Contador valor={contagem} />}
      </span>
      <span className="ds-ferramenta-nome">
        <span className="ds-ferramenta-titulo">{titulo}</span>
        {causa != null && <span className="ds-ferramenta-causa">{causa}</span>}
      </span>
    </Tocavel>
  )
}
