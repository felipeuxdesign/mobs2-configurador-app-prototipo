// O palco — a moldura de apresentação em volta do app (06-prototipo/palco.md).
// Separado do app no código: o App não sabe que o palco existe.
// Três peças e o painel: o quadrado, o celular, a coluna.
import { useCallback, useEffect, useState } from 'react'
import { Grade } from './icones.jsx'
import '../ds/index.js'
import { App } from '../App.jsx'
import { Vitrine } from '../vitrine/Vitrine.jsx'
import { useEstado } from '../estado/estado.jsx'
import { Coluna } from './Coluna.jsx'
import { Painel } from './Painel.jsx'
import { lerUrl, escreverUrl, recarregou } from './rotas.js'
import { estadosDa } from './telas.js'
import { deitado, alturaDoPalco } from './retrato.js'
import { abreTeclado } from '../estado/teclado-conta.js'

// a largura que o palco pede antes de encolher o celular: celular + distância + coluna + margens
// o corte do modo estreito mora no palco-tokens.css (--palco-estreito)
const larguraEstreita = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--palco-estreito'))

// a janela, e se ela está deitada (regra 11, retrato.js): o teclado aberto num campo do app não deita nada
const campoDoApp = () => { const e = document.activeElement; return abreTeclado(e) && !!e.closest('.celular-tela') }
// e a altura em que o celular em escala cabe: o teclado aberto não o encolhe (retrato.js, alturaDoPalco)
const medirJanela = (antes) => {
  const agora = { w: window.innerWidth, h: window.innerHeight }, campo = campoDoApp()
  // de toque: o dedo é o ponteiro principal (o celular); a janela estreita do computador não conta
  const toque = window.matchMedia?.('(pointer: coarse)').matches ?? false
  return { ...agora, toque, deitado: deitado(antes, agora, campo), alto: alturaDoPalco(antes, agora, campo) }
}

// o celular é a tela e a moldura (a borda da silhueta, palco-tokens.css): 376 × 816 por fora; o fio de luz, o contorno e a
// sombra são sombra e não somam. A escala leva a moldura inteira junto, e nunca passa de 1
function medirEscala(temColuna, alto) {
  const css = getComputedStyle(document.documentElement)
  const px = (v) => parseFloat(css.getPropertyValue(v))
  const moldura = px('--palco-borda')
  const alturaCel = px('--tela-altura') + 2 * moldura
  const larguraCel = px('--tela-largura') + 2 * moldura
  const lado = temColuna ? px('--palco-coluna-distancia') + px('--palco-coluna') : 0
  const margem = 2 * px('--e-24')
  return Math.min(1, (alto - margem) / alturaCel, (window.innerWidth - margem - 2 * lado) / larguraCel)
}

// Pra régua dos textos (scripts/textos.mjs): no print com &textos=1, escreve
// num <pre> escondido os textos da tela na ordem do documento, que o
// --dump-dom do Chrome lê. É ferramenta do ciclo, não do app.
function Textos() {
  useEffect(() => {
    document.fonts.ready.then(() => setTimeout(() => {
      const raiz = document.querySelector('.celular-tela'); const lista = []
      // o que está inerte (a tela atrás do véu de uma folha ou diálogo) não conta: não é o quadro da referência
      // o termo digitado no campo de busca também conta: a referência desenha a busca como texto, a dica e o termo (T06/08)
      const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode: (n) => ((n.nodeType === 1 ? n : n.parentElement)?.closest('[inert]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) })
      for (let n = w.nextNode(); n; n = w.nextNode()) { const t = (n.nodeType === 1 ? (n.matches('input[enterkeyhint="search"]') ? n.value : '') : n.textContent).replace(/\s+/g, ' ').trim(); if (t) lista.push(t) }
      // o miolo que rola no quadro da referência é defeito (a foto sai na rolagem 0 e esconde o que passou de 800)
      const rolam = [...raiz.querySelectorAll('*')].filter((e) => /auto|scroll/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 1).map((e) => `${e.className || e.tagName} (${e.scrollHeight} > ${e.clientHeight})`)
      const out = document.createElement('pre'); out.id = 'm2cf-out'; out.style.display = 'none'; out.textContent = JSON.stringify({ lista, rolam })
      document.body.appendChild(out)
    }, 50))
  }, [])
  return null
}

// Pra régua do palco (scripts/palco.mjs): com &medir=1, escreve num <pre>
// escondido onde cada peça do palco caiu na janela, que o fotógrafo lê. Também
// é ferramenta do ciclo, não do palco.
function Medida() {
  useEffect(() => {
    document.fonts.ready.then(() => setTimeout(() => {
      const caixa = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height } }
      const um = (s) => caixa(document.querySelector(s))
      // o conteúdo da coluna, do topo do primeiro filho ao pé do último: é ele que fica no meio da altura do celular
      const filhos = [...document.querySelectorAll('.coluna > *')].map(caixa)
      const conteudo = filhos.length ? { x: filhos[0].x, y: filhos[0].y, w: Math.max(...filhos.map((f) => f.w)), h: filhos.at(-1).y + filhos.at(-1).h - filhos[0].y } : null
      const linhas = Object.fromEntries([...document.querySelectorAll('.painel-linha')].map((e) => [e.querySelector('.painel-codigo').textContent, caixa(e)]))
      // os textos do painel e da coluna, na ordem do documento
      const textos = (e) => {
        const l = []; if (!e) return l; const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT)
        // os pedaços de texto vizinhos (o JSX parte "T07 · Dados da CAN" em três) contam como um, como no quadro
        for (let n = w.nextNode(); n; n = w.nextNode()) { const t = n.textContent.replace(/\s+/g, ' ').trim(); if (!t) continue; if (n.previousSibling?.nodeType === 3 && l.length) l[l.length - 1] = `${l[l.length - 1]} ${t}`; else l.push(t) }
        return l
      }
      // a moldura como o navegador a desenhou (decisão 43): a borda da silhueta, os cantos, a cor, o fio
      // de luz, o contorno e a sombra, e a tela dentro
      const cel = document.querySelector('.celular'), cs = cel && getComputedStyle(cel), ts = cel && getComputedStyle(cel.querySelector('.celular-tela'))
      const moldura = cel && { lados: [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth],
        borda: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft], bordaCor: cs.backgroundColor, raioFora: cs.borderTopLeftRadius,
        raios: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius], sombras: cs.boxShadow,
        raioTela: ts.borderTopLeftRadius, largura: cel.offsetWidth, altura: cel.offsetHeight, tela: caixa(cel.querySelector('.celular-tela')) }
      const out = document.createElement('pre'); out.id = 'm2cf-out'; out.style.display = 'none'
      out.textContent = JSON.stringify({ W: innerWidth, H: innerHeight, quadrado: um('.palco-quadrado'), celular: um('.celular'), moldura, painel: um('.painel'),
        painelAberto: !!document.querySelector('.painel-aberto'), linhas, coluna: um('.coluna'), conteudo, lista: um('.coluna-lista'), etiqueta: um('.painel-etiqueta'),
        textos: { painel: textos(document.querySelector('.painel-aberto')), coluna: textos(document.querySelector('.coluna')) } })
      document.body.appendChild(out)
    }, 50))
  }, [])
  return null
}

export function Palco() {
  if (new URLSearchParams(window.location.search).get('vitrine') === '1') return <Vitrine />
  return <PalcoApp />
}

function PalcoApp() {
  const { estado, despachar } = useEstado()
  const [painel, setPainel] = useState(!recarregou() && new URLSearchParams(window.location.search).get('painel') === '1')
  // o aviso do app parado (palco.md, decisão 43): num estado, cada toque no app faz piscar uma vez o Voltar ao
  // fluxo da coluna, ou o quadrado no estreito. `em` guarda qual dos dois o toque fez piscar, e o contador volta a 0
  // quando um estado abre ou fecha: a peça que nasce (o Voltar ao fluxo do estado seguinte, o quadrado que aparece
  // quando a janela estreita) nasce quieta, e só um toque a faz piscar (sem isso, o contador nunca
  // voltaria a 0, e a peça que nasce depois de uma piscada já nasceria piscando)
  const [pisca, setPisca] = useState({ n: 0, em: null })
  const semPisca = () => setPisca({ n: 0, em: null })
  const [janela, setJanela] = useState(() => medirJanela(null))
  const { id: tela, estado: est, momento } = estado.tela
  const print = lerUrl().print
  const medir = new URLSearchParams(window.location.search).get('medir') === '1'

  // no celular de verdade (estreito e de toque), o palco sai do caminho: sem o quadrado por
  // cima do app, e o endereço não acompanha a navegação — recarregar volta ao que foi aberto (o login, no link
  // principal), e o link direto de uma tela ou estado continua abrindo certo. O painel ainda abre pelo &painel=1
  const celular = janela.w < larguraEstreita() && janela.toque
  // a janela que passa de larga a estreita, ou de volta, também zera a piscada: a coluna e o quadrado que voltam
  // nascem quietos (sem isso, um toque na larga, a janela estreita e de volta à larga, e a
  // coluna remontaria com o contador do toque de antes e piscaria sozinha). Zerado na própria renderização, antes
  // de a peça nascer, e não num efeito, que a deixaria nascer piscando por um quadro
  const estreitoAgora = janela.w < larguraEstreita()
  const [estreitoDoPisca, setEstreitoDoPisca] = useState(estreitoAgora)
  if (estreitoAgora !== estreitoDoPisca) { setEstreitoDoPisca(estreitoAgora); semPisca() }
  // no print não há painel: o endereço do print fica só com a tela, o estado e o momento
  useEffect(() => { if (!celular) escreverUrl({ tela, estado: est, momento, painel: painel && !print }) }, [tela, est, momento, painel, print, celular])
  useEffect(() => { const r = () => setJanela(medirJanela); window.addEventListener('resize', r); return () => window.removeEventListener('resize', r) }, [])

  // o painel só fecha no X, tocando fora ou com Esc — escolher uma tela não fecha
  const ir = useCallback((id) => { semPisca(); despachar({ tipo: 'pular', tela: id }) }, [despachar])
  const abrirEstado = (nome) => { semPisca(); despachar({ tipo: 'abrir-estado', estado: nome }) }
  const voltarAoFluxo = () => { semPisca(); despachar({ tipo: 'voltar-ao-fluxo' }) }

  if (print) return <main className="palco palco-print"><div className="celular-tela"><App /></div>{lerUrl().textos && <Textos />}</main>

  const estreito = janela.w < larguraEstreita()
  // o celular deitado (regra 11): o app não gira — o celular de 360 × 800 no centro, em escala, como no palco largo, sem a coluna
  const deitada = estreito && janela.deitado
  const temColuna = !estreito && estadosDa(tela).length > 0
  const escala = estreito && !deitada ? 1 : medirEscala(temColuna, janela.alto)
  const numEstado = !!est
  const piscaQuadrado = pisca.em === 'quadrado' ? pisca.n : 0
  const piscaColuna = pisca.em === 'coluna' ? pisca.n : 0
  const tocouParado = (e) => { e.stopPropagation(); e.preventDefault(); const em = estreito ? 'quadrado' : 'coluna'; setPisca((p) => ({ n: (p.em === em ? p.n : 0) + 1, em })) }

  return (
    <main className={`palco ${estreito ? 'palco-estreito' : ''} ${deitada ? 'palco-deitado' : ''} ${celular ? 'palco-celular' : ''}`}>
      {!celular && (
        <button type="button" key={piscaQuadrado} className={`palco-quadrado ${piscaQuadrado ? 'palco-pisca' : ''}`} aria-label="Telas do protótipo" onClick={() => setPainel(true)}>
          <Grade className="palco-icone-18" />
        </button>
      )}
      <div className="palco-cena">
        <div className={`celular ${numEstado ? 'celular-estado' : ''}`} style={estreito && !deitada ? undefined : { transform: `scale(${escala})` }}
          onClickCapture={numEstado ? tocouParado : undefined}>
          <div className="celular-tela" inert={numEstado ? '' : undefined}><App /></div>
        </div>
        {temColuna && <Coluna tela={tela} estado={est} aoAbrir={abrirEstado} aoVoltar={voltarAoFluxo} pisca={piscaColuna} escala={escala} />}
      </div>
      <Painel aberto={painel} tela={tela} aoIr={ir} aoFechar={() => setPainel(false)}
        estreito={estreito} numEstado={numEstado} aoVoltar={voltarAoFluxo} />
      {medir && <Medida />}
    </main>
  )
}
