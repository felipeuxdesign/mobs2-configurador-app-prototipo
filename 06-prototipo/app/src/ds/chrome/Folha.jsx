// A folha (folha 2): sobe do rodapé, com o puxador e o X. O painel
// --fundo-faixa com borda de cima --borda-poco, recheio 18 em cima e 32 no pé
// (nada visível a menos de 32 do pé). O X tem 44 de desenho e 48 de toque
// (SoIcone). `minima`: a folha da conta abre com 430 no mínimo (T04/05) — a
// de opções (T01/04) não tem. Abre subindo (translateY 100% → 0) em
// 200ms e fecha em 150ms (movimento.md); dentro do Veu (de 'folha').
// Pro leitor: é um diálogo modal, e o nome é o título que já se vê.
// `folga`: o espaço entre os blocos — 14 na da conta, 12 na Trocar de
// empresa (T04/07). `subtitulo`: a frase de 13 embaixo do título, que só
// a Trocar de empresa tem (T04/07).
//
// Como a folha fecha (lei 20): no X (a de opções fecha no
// xis) e, toda folha, tocando fora, arrastando pra baixo e no voltar do Android.
// Os três primeiros moram aqui, e chamam o mesmo `aoFechar` do X — que tem de
// fechar a folha (a tela passa `aberta` false, como no X):
// · tocar fora: a folha se registra no Veu em volta (FechaPeloVeu), e o toque
//   no véu, fora dela, fecha;
// · arrastar pra baixo: o painel acompanha o dedo, só por transform, depois
//   que ele anda a folga do toque (--folha-arraste-folga: antes disso, é toque,
//   e a linha embaixo do dedo responde). Soltando depois do limite
//   (--folha-arraste-limite), fecha: o painel desce dali até o fim, no fechar
//   de sempre (150ms); soltando antes, volta pro lugar, no subir de sempre
//   (200ms). Pra cima, o painel não passa do lugar dele. O toque que virou
//   arraste não chega em nada (nem na linha onde começou), e o pressionado
//   some enquanto o dedo arrasta;
// · o voltar do Android é da tela que abriu a folha (useVoltar, com o mesmo
//   fechar do X): a T01 e a T04 passam.
// Sem `aoFechar` (a vitrine), a folha fica parada: nem arrasta, nem fecha fora.
// `aberta`: a tela diz, ou, sem ela, a presença em volta (PorCima.jsx, a folha que
// se reveza com o diálogo no mesmo véu); sem nenhuma das duas, aberta.
// `puxador` (T11/03): false tira o puxador. Toda folha das
// referências tem, a Outras ações da T11 também; a propriedade fica pra vitrine. O painel arrasta igual, de
// qualquer ponto (a lei 20 vale pra toda folha). O puxador, pro leitor de tela,
// diz *Arrastar pra fechar* (o animacao.md da T11).
import { useContext, useId, useLayoutEffect, useRef } from 'react'
import { SoIcone } from '../primitivos/SoIcone.jsx'
import { FechaPeloVeu } from './Veu.jsx'
import { PresencaPorCima } from './PorCima.jsx'
import './Folha.css'

const medida = (el, token) => parseFloat(getComputedStyle(el).getPropertyValue(token)) || 0

// o clique que o navegador manda depois de um arraste não chega em ninguém
function engoleOClique() {
  const engole = (e) => { e.stopPropagation(); e.preventDefault() }
  window.addEventListener('click', engole, { capture: true, once: true })
  setTimeout(() => window.removeEventListener('click', engole, { capture: true }), 0)
}

export function Folha({ titulo, subtitulo, aoFechar, rotuloFechar, minima = false, folga = 14, aberta: abertaDaTela, puxador = true, children }) {
  const presenca = useContext(PresencaPorCima)
  const aberta = abertaDaTela ?? presenca?.aberta ?? true
  const id = useId()
  const painel = useRef(null)
  const arraste = useRef(null)      // o dedo que desceu na folha: { id, y0, escala, dy, vivo, folga, limite }
  const soltouAlem = useRef(false)  // passou do limite: o painel espera a tela fechar a folha, e desce dali

  // o toque fora: o fechar da folha vale no véu enquanto ela está aberta (a que sai,
  // na troca no mesmo véu, não apaga o fechar da que entra)
  const doVeu = useContext(FechaPeloVeu)
  useLayoutEffect(() => {
    if (!doVeu || !aberta || !aoFechar) return undefined
    doVeu.current = aoFechar
    return () => { if (doVeu.current === aoFechar) doVeu.current = null }
  })

  // a tela fechou a folha que passou do limite: o painel sai do dedo e o fechar
  // de sempre desce ele de onde parou (a transição parte do último lugar)
  useLayoutEffect(() => {
    if (aberta || !soltouAlem.current || !painel.current) return
    soltouAlem.current = false
    painel.current.style.transition = ''
    painel.current.style.transform = ''
  }, [aberta])

  const podeArrastar = Boolean(aoFechar) && aberta
  const volta = () => {
    const el = painel.current; if (!el) return
    delete el.dataset.arrastando
    el.style.transition = ''
    el.style.transform = ''
  }
  const desce = (e) => {
    // um dedo que ainda não arrastava e soltou fora do painel (no mouse, sem captura) não prende a folha: o novo toma o lugar
    if (!podeArrastar || arraste.current?.vivo || (e.pointerType === 'mouse' && e.button !== 0)) return
    const el = painel.current
    // o celular do palco pode estar em escala: o painel anda o que o dedo anda, na medida do app
    const escala = el.getBoundingClientRect().height / el.offsetHeight || 1
    arraste.current = { id: e.pointerId, y0: e.clientY, escala, dy: 0, vivo: false,
      folga: medida(el, '--folha-arraste-folga'), limite: medida(el, '--folha-arraste-limite') }
  }
  const anda = (e) => {
    const a = arraste.current; if (!a || e.pointerId !== a.id) return
    const el = painel.current
    const dy = Math.max(0, (e.clientY - a.y0) / a.escala)
    if (!a.vivo) {
      if (dy < a.folga) return
      a.vivo = true
      el.setPointerCapture?.(e.pointerId)
      el.dataset.arrastando = ''
      el.style.transition = 'none'
    }
    a.dy = dy
    el.style.transform = `translateY(${dy}px)`
  }
  const sobe = (e) => {
    const a = arraste.current; if (!a || e.pointerId !== a.id) return
    arraste.current = null
    if (!a.vivo) return   // foi toque: o clique segue pra quem está embaixo do dedo
    engoleOClique()
    if (a.dy > a.limite) {
      delete painel.current.dataset.arrastando
      soltouAlem.current = true
      aoFechar()
    } else volta()
  }
  const cancela = (e) => {
    const a = arraste.current; if (!a || e.pointerId !== a.id) return
    arraste.current = null
    if (a.vivo) volta()
  }

  return (
    <div ref={painel} role="dialog" aria-modal="true" aria-labelledby={id}
      className={`ds-folha ${minima ? 'ds-folha-minima' : ''} ${folga === 12 ? 'ds-folha-folga-12' : ''} ${aberta ? '' : 'ds-folha-fechada'}`}
      onPointerDown={desce} onPointerMove={anda} onPointerUp={sobe} onPointerCancel={cancela} onLostPointerCapture={cancela}>
      {puxador && <div className="ds-folha-puxador" role="img" aria-label="Arrastar pra fechar"><span /></div>}
      <div className="ds-folha-cabeca">
        <h2 id={id} className="ds-folha-titulo">{titulo}</h2>
        <span className="ds-folha-fechar">
          <SoIcone icone="fechar" tam={20} cor="secundaria" rotulo={rotuloFechar} aoTocar={aoFechar} />
        </span>
      </div>
      {subtitulo != null && <p className="ds-folha-subtitulo">{subtitulo}</p>}
      {children}
    </div>
  )
}

// a peça que o PorCima reconhece: a folha sobe do pé (o diálogo nasce no meio)
Folha.porCima = 'folha'
