// O checkbox (folha 6): um componente, dois estados. É o marcador de escolha
// (o Quadrado, decisão 29) no poço de 24: o vazado de 11 no desmarcado e,
// marcado, o lima de 11 surge por cima (opacidade e escala 80%→100%, 150ms);
// desmarcar some igual (T01 e T13 animacao.md). Usado na T01, T06, T13.
// O pressionado (R-12): a camada --elevado na área de 48, que
// entra no toque e solta em 100, como na linha tocável (Checkbox.css).
//
// `legenda` (a caixa do não conforme, decisão 39, folha 6 e
// T13/07, 08 e 15): o texto vira título e linha de baixo — o que se marca em
// 14/600 e --tinta, e embaixo, a 2, o que marcar pede, em 12 --tinta-secundaria
// (*marque e conte o que aconteceu* · *conte embaixo o que aconteceu*: quem
// monta passa a do estado). Pro leitor, o nome é o título, e a linha de baixo
// é a descrição. Sem ela, o checkbox de sempre.
import { useId } from 'react'
import { Poco } from './Poco.jsx'
import { Quadrado } from './Marcador.jsx'
import './Checkbox.css'

export function Checkbox({ marcado = false, aoMudar, children, rotulo, legenda }) {
  const trocar = () => aoMudar?.(!marcado)
  const id = useId()
  const comLegenda = legenda != null
  return (
    <span
      role="checkbox"
      aria-checked={marcado}
      aria-label={rotulo}
      aria-labelledby={comLegenda && !rotulo ? `${id}-titulo` : undefined}
      aria-describedby={comLegenda ? `${id}-legenda` : undefined}
      tabIndex={0}
      className={`ds-checkbox ${marcado ? 'ds-checkbox-marcado' : ''}`}
      onClick={trocar}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); trocar() } }}
    >
      <Poco tam={24}><Quadrado escolhido={marcado} /></Poco>
      {comLegenda
        ? (
          <span className="ds-checkbox-textos">
            <span id={`${id}-titulo`} className="ds-checkbox-titulo">{children}</span>
            <span id={`${id}-legenda`} className="ds-checkbox-legenda">{legenda}</span>
          </span>
        )
        : <span className="ds-checkbox-texto">{children}</span>}
    </span>
  )
}
