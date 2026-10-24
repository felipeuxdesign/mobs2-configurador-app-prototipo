// A lista que se reorganiza (movimento.md, "Só isto se move").
// Quando a busca filtra — ou a fila fecha o espaço —, o layout vai direto pro fim:
// o quadro final é o layout de verdade, e nenhuma altura anima. O que se move é só
// o que ajuda o olho a seguir a lista:
// · o que fica vai do lugar antigo ao novo só por deslocamento (transform), em
//   --mov-rapido, na --mov-curva — as linhas dentro do cartão e, se o que está em
//   cima some, o grupo ou o cartão inteiro, juntos, sem reordenar;
// · o que sai esmaece por cima, fora do fluxo, no lugar em que estava: uma cópia
//   parada, muda pro leitor de tela e sem toque, que some no fim;
// · o que entra (a busca que volta a achar) esmaece no lugar dele, em 150, como
//   todo o resto que é novo.
// O cartão (.ds-lista) corta o que passa da borda dele enquanto a lista anda
// (overflow: clip, que não mexe no tamanho de nada), e volta ao que era no fim.
//
// Quem usa: a tela põe o `lugar` que o hook devolve na caixa que tem a lista — o
// miolo — e passa a `chave`: o que a busca filtra (o termo), ou o que diz a fila.
// Se movem os filhos diretos do lugar (o grupo com o rótulo e o cartão, o vazio da
// busca, a instrução que sai quando se digita) e as linhas de toda .ds-lista dentro
// dele; cada um anda só o que o de fora dele não andou.
// · Só anima quando a chave muda depois do primeiro quadro pintado, e as duas, a de
//   antes e a de agora, existem: a chave `null` diz "este quadro não é a lista" (a
//   troca de quadro esmaece o desenho inteiro, e a lista não anda por cima dela).
//   Ao abrir, pela URL, pelo palco, num estado ou no print, a lista está parada.
// · Com reduzir movimento, --mov-rapido é 0: a troca é direta, e nada nasce.
// · A mudança que chega no meio de outra parte de onde cada linha está agora.
// Sem relógio: a peça só compara o que viu antes e depois de a tela desenhar.
import { useLayoutEffect, useRef } from 'react'

export const SAI = 'ds-reorganiza-sai'   // a cópia do que sai (e o `em` dela na régua)

// o tempo e a curva, dos tokens: com reduzir movimento, o tempo é 0
const tempo = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? (/ms$/.test(v) ? n : n * 1000) : 0 }
const tokens = () => {
  const css = getComputedStyle(document.documentElement)
  return { ms: tempo(css.getPropertyValue('--mov-rapido').trim()), curva: css.getPropertyValue('--mov-curva').trim() }
}

// o que se move: os filhos diretos do lugar e as linhas de cada cartão dentro dele
// (nunca a cópia do que está saindo)
function itensDo(lugar) {
  const itens = new Set()
  const junta = (pai) => { for (const f of pai.children) if (!f.classList.contains(SAI)) itens.add(f) }
  junta(lugar)
  for (const l of lugar.querySelectorAll('.ds-lista')) if (!l.closest(`.${SAI}`)) junta(l)
  return itens
}
// o de fora: o item mais perto que tem este dentro dele (a linha → o grupo)
function deFora(el, itens, lugar) {
  for (let p = el.parentElement; p && p !== lugar; p = p.parentElement) if (itens.has(p)) return p
  return null
}
// a escala do celular na janela (o layout em px do app; a medida, em px da janela)
const escalaDo = (lugar) => (lugar.offsetWidth ? lugar.getBoundingClientRect().width / lugar.offsetWidth : 1) || 1

// a foto de antes: onde cada item está agora na tela (com o deslocamento que ainda
// anda, se uma mudança chegou no meio de outra), e onde está o pai dele
function fotoDe(lugar) {
  const itens = itensDo(lugar)
  return {
    lugar, itens,
    onde: new Map([...itens].map((el) => [el, { r: el.getBoundingClientRect(), pai: el.parentElement, rPai: el.parentElement.getBoundingClientRect() }])),
  }
}

// o pai que guarda o que anda: posicionado (a cópia do que sai mora nele) e, se é o
// cartão, cortando na borda; no fim, tudo volta ao que era
const presos = new Map()
function prende(el) {
  let p = presos.get(el)
  if (!p) {
    p = { n: 0, position: el.style.position, overflow: el.style.overflow }
    presos.set(el, p)
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative'
    if (el.classList.contains('ds-lista')) el.style.overflow = 'clip'
  }
  p.n++
  return () => {
    if (--p.n > 0) return
    el.style.position = p.position
    el.style.overflow = p.overflow
    presos.delete(el)
  }
}

const andando = new WeakMap()   // o deslocamento ou o esmaecer vivo de cada item

// a cópia do que sai, parada no lugar em que estava, por cima, esmaecendo
function copiaQueSai(el, { r, pai, rPai }, escala, anim) {
  const c = el.cloneNode(true)
  for (const n of c.querySelectorAll(`.${SAI}`)) n.remove()
  for (const n of [c, ...c.querySelectorAll('[id]')]) n.removeAttribute('id')
  c.className = `${SAI} ${c.className}`
  c.setAttribute('aria-hidden', 'true')
  c.inert = true
  Object.assign(c.style, {
    position: 'absolute', margin: '0', zIndex: '1', pointerEvents: 'none', opacity: '0',
    left: `${(r.left - rPai.left) / escala - pai.clientLeft + pai.scrollLeft}px`,
    top: `${(r.top - rPai.top) / escala - pai.clientTop + pai.scrollTop}px`,
    width: `${r.width / escala}px`, height: `${r.height / escala}px`,
  })
  pai.appendChild(c)
  const a = c.animate([{ opacity: 1 }, { opacity: 0 }], anim)
  const fim = () => c.remove()
  a.finished.then(fim, fim)
  return a
}

// o que muda entre a foto de antes e o desenho de agora
function reorganiza(antes) {
  const { lugar } = antes
  const { ms, curva } = tokens()
  if (ms <= 0) return
  const anim = { duration: ms, easing: curva }
  // o que ainda andava para onde está: a medida de agora é o layout, sem deslocamento
  for (const el of antes.itens) { andando.get(el)?.cancel(); andando.delete(el) }
  const agora = itensDo(lugar)
  for (const el of agora) { andando.get(el)?.cancel(); andando.delete(el) }
  const escala = escalaDo(lugar)
  const onde = new Map([...agora].map((el) => [el, el.getBoundingClientRect()]))

  // quanto cada item andou na tela, e quanto ele anda por conta dele (o de fora já leva o resto)
  const andou = new Map()
  for (const el of agora) {
    const a = antes.onde.get(el)
    if (a) andou.set(el, { x: (a.r.left - onde.get(el).left) / escala, y: (a.r.top - onde.get(el).top) / escala })
  }
  const vivas = []
  const soltos = new Map()   // o pai que esta mudança prendeu → como soltá-lo
  const segura = (pai) => { if (pai && !soltos.has(pai)) soltos.set(pai, prende(pai)) }
  for (const el of agora) {
    const fora = deFora(el, agora, lugar)
    const d = andou.get(el)
    if (!d) {
      // entra: esmaece no lugar dele, se o de fora dele não entra também
      if (fora && !andou.has(fora)) continue
      const a = el.animate([{ opacity: 0 }, { opacity: 1 }], anim)
      andando.set(el, a); vivas.push(a)
      continue
    }
    const df = fora ? andou.get(fora) : null
    const x = d.x - (df?.x ?? 0), y = d.y - (df?.y ?? 0)
    if (Math.abs(x) < 0.5 && Math.abs(y) < 0.5) continue
    segura(el.parentElement)
    const a = el.animate([{ transform: `translate(${x}px, ${y}px)` }, { transform: 'none' }], anim)
    andando.set(el, a); vivas.push(a)
  }
  // sai: a cópia no lugar de antes, por cima — só o de mais fora que saiu (o grupo leva as linhas dele)
  for (const [el, o] of antes.onde) {
    if (el.isConnected || !o.pai.isConnected || !lugar.contains(o.pai)) continue
    const fora = deFora(el, antes.itens, null)
    if (fora && !fora.isConnected) continue
    segura(o.pai)
    vivas.push(copiaQueSai(el, o, escala, anim))
  }
  Promise.all(vivas.map((a) => a.finished.catch(() => {}))).then(() => { for (const solta of soltos.values()) solta() })
}

// useReorganiza(chave) → o `lugar`, o ref da caixa que tem a lista
export function useReorganiza(chave) {
  const lugar = useRef(null)
  const vista = useRef(chave)    // a chave do último desenho
  const foto = useRef(null)      // onde tudo estava antes deste desenho
  const aberta = useRef(false)   // o primeiro quadro já pintou
  // antes de a tela desenhar a mudança, a foto do que está na tela
  if (aberta.current && lugar.current && chave != null && vista.current != null && !Object.is(chave, vista.current)) {
    foto.current = fotoDe(lugar.current)
  }
  useLayoutEffect(() => {
    const q = requestAnimationFrame(() => { aberta.current = true })
    return () => cancelAnimationFrame(q)
  }, [])
  useLayoutEffect(() => {
    const antes = foto.current
    foto.current = null
    vista.current = chave
    if (antes && antes.lugar === lugar.current) reorganiza(antes)
  }, [chave])
  return lugar
}
