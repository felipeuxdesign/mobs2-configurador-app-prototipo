// O teclado nunca esconde o que importa (06-prototipo/CLAUDE.md, regra 10),
// numa peça só pro app inteiro (App.jsx). No celular de verdade, o teclado
// abre por cima do app de dois jeitos, e a peça cuida dos dois:
// · o navegador encolhe a página — o Chrome do Android, com o
//   interactive-widget=resizes-content do index.html, que é o adjustResize do
//   Android: o app mora em 100% da altura e encolhe junto;
// · o navegador só encolhe a janela que se vê — o Safari do iPhone, que não
//   lê o interactive-widget: a peça mede o que sobra (window.visualViewport,
//   teclado-conta.js) e encolhe o app até ali, descendo-o quando o navegador
//   rolou a página pra mostrar o campo.
// Nos dois, o rodapé é o pé do app e sobe junto — o botão principal fica
// acima do teclado —, e o miolo que rola traz o campo em foco, com o rótulo e
// o poço inteiro, pra dentro do que se vê. Toda tela é a barra, o miolo que
// rola e o rodapé: a peça não pede nada das telas, e vale pra todo campo
// (T01, a busca da T06, o painel da T10, a justificativa da T13).
// No computador não há teclado: a janela que se vê é a página inteira, e nada
// muda. No print (EM_QUADRO), a peça nem escuta: os quadros parados não mudam.
// A exceção é a tela do código (T01/03, decisão 62): no computador e no print,
// o protótipo desenha o teclado do aparelho, como cenário do sistema
// (src/ds/chrome/TecladoDoAparelho.jsx), e a T01 encolhe até o que sobra acima
// dele; no celular, ela fica com o teclado de verdade, e esta peça cuida do encolher.
import { useEffect } from 'react'
import { EM_QUADRO } from './quadro.js'
import { abreTeclado, sobraDoTeclado, rolarPraMostrar } from './teclado-conta.js'

const rola = (e) => /auto|scroll/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 1

// a caixa do campo: o menor bloco com o campo e o rótulo — o poço inteiro, com o
// traço de baixo que acende no foco (o Campo, a busca, o painel, a justificativa);
// sem rótulo, o bloco do campo (as células do código, o poço da senha nova)
function caixaDoCampo(campo) {
  const rotulos = [...(campo.labels ?? [])]
  let caixa = campo.parentElement ?? campo
  while (rotulos.some((r) => !caixa.contains(r)) && caixa.parentElement) caixa = caixa.parentElement
  return caixa
}

// traz a caixa do campo em foco pra dentro do miolo que rola
function mostrar(campo, app) {
  let rolo = campo.parentElement
  while (rolo && rolo !== app && !rola(rolo)) rolo = rolo.parentElement
  if (!rolo || rolo === app) return
  const alvo = caixaDoCampo(campo).getBoundingClientRect()
  if (!alvo.height) return
  const escala = app.getBoundingClientRect().height / app.offsetHeight || 1
  const d = rolarPraMostrar(rolo.getBoundingClientRect(), alvo, escala)
  if (d) rolo.scrollTop += d
}

export function useTeclado(raiz) {
  useEffect(() => {
    const app = raiz.current
    const vv = window.visualViewport
    if (EM_QUADRO || !app) return undefined
    let quadro = 0
    let mostra = false
    const ajustar = () => {
      quadro = 0
      const e = document.activeElement
      const campo = e && app.contains(e) && abreTeclado(e) ? e : null
      const pai = app.parentElement
      const s = campo && pai ? sobraDoTeclado(pai.getBoundingClientRect(), pai.offsetHeight, vv) : null
      app.style.height = s ? `${s.altura}px` : ''
      app.style.transform = s?.topo ? `translateY(${s.topo}px)` : ''
      // só quando o tamanho mudou (o teclado abriu ou fechou): no foco, o navegador já traz o campo
      if (campo && mostra) mostrar(campo, app)
      mostra = false
    }
    // tudo num quadro só, depois do layout: o foco que sai e o que entra, e o tamanho novo
    const agenda = (comMostrar) => () => { mostra = mostra || comMostrar; if (!quadro) quadro = requestAnimationFrame(ajustar) }
    const mudouTamanho = agenda(true), mudouFoco = agenda(false)
    window.addEventListener('resize', mudouTamanho)
    vv?.addEventListener('resize', mudouTamanho)
    vv?.addEventListener('scroll', mudouFoco)
    app.addEventListener('focusin', mudouFoco)
    app.addEventListener('focusout', mudouFoco)
    return () => {
      window.removeEventListener('resize', mudouTamanho)
      vv?.removeEventListener('resize', mudouTamanho)
      vv?.removeEventListener('scroll', mudouFoco)
      app.removeEventListener('focusin', mudouFoco)
      app.removeEventListener('focusout', mudouFoco)
      cancelAnimationFrame(quadro)
      app.style.height = ''; app.style.transform = ''
    }
  }, [raiz])
}
