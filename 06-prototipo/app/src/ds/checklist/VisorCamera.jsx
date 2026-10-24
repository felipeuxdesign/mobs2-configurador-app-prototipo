// A câmera do app: o quadro parado que as referências desenham, feito em código
// (a do item manual do checklist, T13/07, 08 e 17 a 20; a calibração não tem
// câmera, decisão 52). O poço que cresce no que sobra, só com a câmera de 46 em
// --marca no meio (decisão 60): o que enquadrar fica na frase embaixo do título,
// na tela, nunca dentro do quadro — no app, a imagem ao vivo aparece dentro
// dele, sem nada por cima.
// · Sem a permissão (semPermissao, o mundo real): a câmera riscada, no mesmo
//   quadro (Lei 3); nenhuma referência desenha, e o textos.md não tem frase pra
//   ele: o quadro fica só com o ícone.
// · Com a foto (decisão 63, T13/44 a 48 e 15): o Tirar foto congela a imagem no
//   quadro, no lugar da imagem ao vivo, e embaixo dela, dentro do quadro, entra o
//   registro (a foto · tirada, FotoProva) · o quadro fica do mesmo tamanho: a foto
//   e o registro são uma camada por cima da câmera ao vivo, que esmaece em 150 no
//   lugar dela; o Tirar de novo faz o contrário, e a câmera ao vivo volta · aberto
//   já com a foto (pelo endereço, pela coluna, no print), parado · `foto` é o SVG da
//   foto (src/dados/fotos.js), inline; `rotulo`, o nome dela pro leitor de tela.
// Não se toca: o toque é do rodapé (Tirar foto, Usar foto, ou Abrir as configurações).
// A peça 'a câmera do app' da folha 7.
import { useLayoutEffect, useRef, useState } from 'react'
import { Icone } from '../index.js'
import { FotoProva } from './FotoProva.jsx'
import '../cartoes/caixas.css'   // a caixa de poço é a do aviso e do valor em poço
import './VisorCamera.css'

export function VisorCamera({ semPermissao = false, foto = null, rotulo, registro }) {
  // a camada da foto: parada (aberta já com a foto), entrando (o Tirar foto) ou saindo
  // (o Tirar de novo), com a última foto desenhada até sumir
  const [camada, setCamada] = useState(() => (foto ? { foto, rotulo, registro, fase: 'parada' } : null))
  const antes = useRef(foto)
  useLayoutEffect(() => {
    if (Object.is(antes.current, foto)) { if (foto) setCamada((c) => (c ? { ...c, rotulo, registro } : c)); return }
    antes.current = foto
    if (foto) setCamada({ foto, rotulo, registro, fase: 'entrando' })
    else setCamada((c) => (c ? { ...c, fase: 'saindo' } : null))
  }, [foto, rotulo, registro?.titulo, registro?.legenda]) // eslint-disable-line react-hooks/exhaustive-deps
  const viva = !camada || camada.fase !== 'parada'
  return (
    <div className="ds-visor ds-caixa-poco">
      {viva && <Icone nome={semPermissao ? 'camera-negada' : 'foto'} cor="marca" className="ds-visor-camera" />}
      {camada && (
        <div className={`ds-visor-camada ds-visor-camada-${camada.fase}`}
          onAnimationEnd={() => setCamada((c) => (c?.fase === 'saindo' ? null : c?.fase === 'entrando' ? { ...c, fase: 'parada' } : c))}>
          <div role="img" aria-label={camada.rotulo} className="ds-visor-foto" dangerouslySetInnerHTML={{ __html: camada.foto }} />
          {camada.registro && <FotoProva tirada titulo={camada.registro.titulo} legenda={camada.registro.legenda} />}
        </div>
      )}
    </div>
  )
}
