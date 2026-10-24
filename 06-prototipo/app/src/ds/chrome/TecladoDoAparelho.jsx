// O teclado do aparelho (lei 22 · decisão 62): o teclado numérico do Android, o do Gboard no
// Material 3 — cenário do sistema, como a barra de status e a pílula. Não é do app: o app de verdade
// nunca o desenha. O desenho é o oficial, um arquivo por tema (05-recursos/sistema/teclado-numerico.svg
// e, no Modo claro, teclado-numerico-claro.svg, R-19: as cores são as do Android, não tokens do app),
// importado como texto, nada redesenhado à mão, na largura da tela. A altura vem do desenho, pelo
// viewBox: 412 × 274 na largura de 360 dá os 239,42 — a conta mora no próprio SVG, num lugar só.
//
// Só na tela do código (T01/03), e só onde não existe teclado de verdade: no computador (o ponteiro
// fino, usePonteiroFino) e no print. No celular (o ponteiro grosso), quem abre é o teclado do próprio
// aparelho, e a peça src/estado/teclado.js cuida do encolher. Quem decide quando ele está aberto é a
// tela (src/telas/T01/Login.jsx): a peça só desenha, anima e diz qual tecla foi tocada.
//
// Fica no pé da tela, no fluxo, por baixo da pílula (a NavegacaoPorGestos monta depois de tudo, no
// App.jsx, e fica por cima): o app encolhe até o que sobra acima dele. O movimento (movimento.md, o
// teclado do aparelho): sobe de baixo, translateY 100% → 0, em --mov-padrao, desacelerando, e desce em
// --mov-rapido — a presença das folhas (usePresenca): aberto desde o começo (pelo endereço, no print),
// nasce aberto, parado. Abrindo, entra no fluxo de uma vez: o encolher do app é o estado final, e só
// o teclado e a tela (useTelaComOTeclado: o rodapé e os blocos do miolo) se movem, por transform.
// Fechando, sai do fluxo de uma vez — o app volta ao tamanho inteiro — e desce por cima do pé até
// desmontar. Com reduzir movimento, os tempos são 0: aparece e some.
//
// As teclas: as áreas de toque são os retângulos das teclas do próprio desenho (os <rect> com canto),
// lidos do SVG na ordem em que ele as desenha, uma linha de cada vez — 1 2 3 e o menos · 4 5 6 e o
// espaço · 7 8 9 e o apagar · a vírgula, o 0, o ponto e o ✓. Cada uma tem o nome pro leitor de tela;
// nenhuma tem pressionado (o desenho é fixo, do sistema), e o toque não tira o foco do campo (o
// mousedown não segue), como num teclado de verdade. O que cada tecla faz é da tela (`aoTecla`).
import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'
import escuro from '../../../../../05-recursos/sistema/teclado-numerico.svg?raw'
import claro from '../../../../../05-recursos/sistema/teclado-numerico-claro.svg?raw'
import { usePresenca } from './PorCima.jsx'
import './TecladoDoAparelho.css'

// o desenho na largura da tela: sem o tamanho fixo, mudo pro leitor (o nome é o do grupo e das teclas)
const semTamanho = (svg) => svg.replace(/<svg\b[^>]*>/, (abre) => abre
  .replace(/\s(width|height)="[^"]*"/g, '')
  .replace(/viewBox="/, 'aria-hidden="true" focusable="false" viewBox="'))
const SVG_ESCURO = semTamanho(escuro)
const SVG_CLARO = semTamanho(claro)

// as teclas, na ordem do desenho: o que cada uma é (`id`, o que a tela recebe) e o nome pro leitor
const ORDEM = [
  ['1', '1'], ['2', '2'], ['3', '3'], ['menos', 'Menos'],
  ['4', '4'], ['5', '5'], ['6', '6'], ['espaco', 'Espaço'],
  ['7', '7'], ['8', '8'], ['9', '9'], ['apagar', 'Apagar'],
  ['virgula', 'Vírgula'], ['0', '0'], ['ponto', 'Ponto'], ['concluido', 'Concluído'],
]
// o lugar de cada tecla, em % do desenho: os retângulos com canto, medidos no viewBox (os dois temas
// têm o mesmo desenho; só as cores mudam)
const [, , LARGURA, ALTURA] = escuro.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number)
const RETANGULOS = [...escuro.matchAll(/<rect\b([^>]*\brx="[^"]*"[^>]*)>/g)].map(([, a]) => {
  const v = (n) => Number(a.match(new RegExp(`\\b${n}="([^"]+)"`))[1])
  return { left: `${(v('x') / LARGURA) * 100}%`, top: `${(v('y') / ALTURA) * 100}%`, width: `${(v('width') / LARGURA) * 100}%`, height: `${(v('height') / ALTURA) * 100}%` }
})
const TECLAS = ORDEM.map(([id, nome], i) => ({ id, nome, lugar: RETANGULOS[i] }))

// o ponteiro do aparelho: fino é o mouse do computador, onde não há teclado de verdade
const FINO = '(pointer: fine)'
const assinarPonteiro = (f) => {
  const m = window.matchMedia?.(FINO)
  m?.addEventListener('change', f)
  return () => m?.removeEventListener('change', f)
}
const ponteiroFino = () => window.matchMedia?.(FINO).matches ?? false
export function usePonteiroFino() {
  return useSyncExternalStore(assinarPonteiro, ponteiroFino, () => false)
}

// `aberto`: o teclado aberto agora (a tela decide) · `aoTecla(id)`: a tecla tocada — '0' a '9',
// 'apagar', 'concluido' (o ✓), e 'menos', 'espaco', 'virgula' e 'ponto', que a tela pode ignorar
export function TecladoDoAparelho({ aberto, aoTecla }) {
  const p = usePresenca(aberto)
  if (!p.montado) return null
  return (
    <div className={`ds-teclado ${p.visivel ? '' : 'ds-teclado-fechado'} ${aberto ? '' : 'ds-teclado-saindo'}`}
      role="group" aria-label="o teclado numérico do aparelho" inert={aberto ? undefined : ''} data-sistema="teclado-numerico">
      <div className="ds-teclado-desenho ds-teclado-escuro" dangerouslySetInnerHTML={{ __html: SVG_ESCURO }} />
      <div className="ds-teclado-desenho ds-teclado-claro" dangerouslySetInnerHTML={{ __html: SVG_CLARO }} />
      {TECLAS.map((t) => (
        <button key={t.id} type="button" tabIndex={-1} className="ds-teclado-tecla" style={t.lugar} aria-label={t.nome}
          onMouseDown={(e) => e.preventDefault()} onClick={() => aoTecla?.(t.id)} />
      ))}
    </div>
  )
}

// A tela encolhe junto (movimento.md, o teclado do aparelho): quando o teclado abre ou fecha, o
// layout troca de uma vez — o app encolhe até o que sobra acima dele, ou volta ao tamanho inteiro —,
// e o que mudou de lugar vai de onde estava ao lugar novo só por deslocamento (translateY, o FLIP), no
// tempo do teclado: --mov-padrao subindo, --mov-rapido descendo. O rodapé sobe e desce junto com ele, e
// os blocos do miolo acompanham, cada um do seu tanto — e os de dentro deles também (o grupo do
// código fica onde está e centra as células na sobra: são as células e o cartão que andam): nada passa
// por cima de nada no caminho (sem eles, o rodapé que desce passaria por cima da legenda, que já
// estaria no lugar novo). O link que volta com o teclado fechado (o `Voltar ao login` da T01) esmaece
// em --mov-rapido; o que sai com ele aberto sai direto. `caixa`: o ref da tela. O lugar é medido no
// layout, sem os deslocamentos que estiverem andando, e na escala do celular no palco. O rodapé é achado
// pelo lugar (o do quadro novo também vem de onde o velho estava); os blocos, pela identidade — os de
// um quadro novo não vêm de lugar nenhum: esmaecem com a troca de quadro.
const tempo = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? (/ms$/.test(v) ? n : n * 1000) : 0 }
const desvio = (el) => { const t = el ? getComputedStyle(el).transform : 'none'; return !t || t === 'none' ? 0 : new DOMMatrixReadOnly(t).m42 }
const nada = () => ({ rodape: null, topo: null, blocos: new Map() })
export function useTelaComOTeclado(aberto, caixa) {
  const antes = useRef({ aberto, ...nada() })
  const andando = useRef(new Map())   // o elemento → o deslocamento vivo dele
  useLayoutEffect(() => {
    const raiz = caixa.current
    const a = antes.current
    if (!raiz) { antes.current = { aberto, ...nada() }; return }
    const rodape = raiz.querySelector('.ds-rodape')
    // os blocos do miolo e os de dentro de cada um, com o pai (o lugar do filho desconta o do pai)
    const blocos = []
    for (const b of raiz.querySelector('.tela-miolo')?.children ?? []) { blocos.push([b, null]); for (const f of b.children) blocos.push([f, b]) }
    const escala = raiz.getBoundingClientRect().height / raiz.offsetHeight || 1
    const topoDaRaiz = raiz.getBoundingClientRect().top
    const lugar = (el, pai = null) => (el.getBoundingClientRect().top - topoDaRaiz) / escala - desvio(el) - desvio(pai)
    if (a.aberto !== aberto) {
      // de onde cada um estava, na tela, com o que ainda andava — lido antes de parar qualquer um
      const planos = []
      if (rodape && a.topo != null) planos.push({ el: rodape, pai: null, de: a.topo + (a.rodape === rodape ? desvio(rodape) : 0) })
      for (const [el, pai] of blocos) if (a.blocos.has(el)) planos.push({ el, pai, de: a.blocos.get(el) + desvio(el) + desvio(pai) })
      for (const { el } of planos) { andando.current.get(el)?.cancel(); andando.current.delete(el) }
      const css = getComputedStyle(document.documentElement)
      const ms = tempo(css.getPropertyValue(aberto ? '--mov-padrao' : '--mov-rapido').trim())
      const curva = css.getPropertyValue('--mov-curva').trim()
      const anda = new Map()   // o quanto cada um começa deslocado, inteiro (o do filho desconta o do pai)
      for (const { el, pai, de } of planos) {
        const dy = de - lugar(el, pai)
        anda.set(el, dy)
        const proprio = dy - (pai ? anda.get(pai) ?? 0 : 0)
        if (ms <= 0 || Math.abs(proprio) <= 0.5) continue
        const anim = el.animate([{ transform: `translateY(${proprio}px)` }, { transform: 'none' }], { duration: ms, easing: curva })
        andando.current.set(el, anim)
        anim.finished.then(() => { if (andando.current.get(el) === anim) andando.current.delete(el) }, () => {})
      }
      const link = aberto ? null : rodape?.querySelector('.ds-rodape-link')
      if (link && ms > 0) link.animate([{ opacity: 0 }, { opacity: 1 }], { duration: tempo(css.getPropertyValue('--mov-rapido').trim()), easing: curva })
    }
    antes.current = { aberto, rodape, topo: rodape ? lugar(rodape) : null, blocos: new Map(blocos.map(([el, pai]) => [el, lugar(el, pai)])) }
  })
}
