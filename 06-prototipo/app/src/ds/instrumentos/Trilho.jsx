// A coluna do trilho (folha 5): o poço com o glifo do estado e, embaixo, o
// trilho até o próximo poço. O trilho diz o que passou: lima no que foi
// feito, branco no que corre (ou espera o técnico), a divisória no resto.
// O último elo não tem trilho. É o que a cadeia e o encerramento dividem.
// O "pulado" do encerramento é o desenho do traço em --marca-limite (a folha 5
// desenha o pulado mais claro que o traço da folha 3), mas não é o não se aplica:
// são três estados. O traço do pulado fica
// mudo pro leitor (aria-hidden), como a referência (T16/03) e como o 'info' do
// Glifo: a situação ao lado já diz 'pulado', e nenhuma legenda da folha 3 dá um
// nome a ele. Quem passar nomeGlifo dá o nome.
import { Poco, Glifo } from '../index.js'
import { useVez } from '../primitivos/vez.js'
import './Trilho.css'

const TRILHO = { ok: 'feito', agora: 'corre', energia: 'corre' }

// O movimento fino:
// · o glifo que troca depois de a coluna montar esmaece no poço, em 150 (o Glifo,
//   esmaece) — o quadrado de agora, o check do elo relido, o xis da recusa —, e o
//   traço do pulado também. Aberta já feita, parada. Vale na cadeia e no encerramento.
// · `acende` (opcional, a cadeia liga; o encerramento, não): o trilho do elo que
//   acabou de passar acende de cima pra baixo, em --mov-lento — o lima fica por
//   baixo, e o trilho de antes (o branco do que corria) encolhe pro pé por scaleY,
//   só por transform. Só quando passa a feito depois de montar. O trilho que passa
//   a correr, da divisória pro branco, troca direto.
export function Trilho({ estado, poco, ultimo = false, nomeGlifo, acende = false }) {
  const marca = useVez(estado)
  const tom = TRILHO[estado] ?? 'resto'
  const linha = useVez(tom)
  const acendeu = acende && linha.vez > 0 && tom === 'feito'
  return (
    <div className={`ds-trilho ds-trilho-${poco}`}>
      <Poco tam={poco}>
        {estado === 'pulado'
          ? <span key={marca.vez} {...(nomeGlifo ? { role: 'img', 'aria-label': nomeGlifo } : { 'aria-hidden': 'true' })} className={`ds-trilho-pulado${marca.vez > 0 ? ' ds-glifo-nasce' : ''}`} />
          : <Glifo estado={estado} poco={poco} nome={nomeGlifo} esmaece />}
      </Poco>
      {!ultimo && (
        <span className={`ds-trilho-linha ds-trilho-linha-${tom}${acendeu ? ' ds-trilho-linha-acende' : ''}`}>
          {acendeu && <span key={linha.vez} className={`ds-trilho-capa ds-trilho-linha-${linha.antes}`} aria-hidden="true" />}
        </span>
      )}
    </div>
  )
}
