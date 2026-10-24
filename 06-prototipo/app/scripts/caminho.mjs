// A régua do caminho: percorre o app como o técnico, tocando pelo nome que o
// leitor de tela lê, e confere onde o app chega. Os roteiros ficam em
// scripts/caminhos/<nome>.mjs (export default [passos]).
//
// Uso: node scripts/caminho.mjs heroi            (um roteiro)
//      node scripts/caminho.mjs todos            (todos os de scripts/caminhos/)
// O dev server precisa estar no ar (http://localhost:5173). Usa o Chrome do
// fotógrafo, numa aba própria (nesta máquina, Chrome em paralelo trava); sem
// fotógrafo, abre um Chrome headless só pra régua.
//
// Os passos:
//   { abre: '?tela=T01' }                  abre o protótipo nesse endereço (fora do print: os processos correm)
//   { toca: 'Entrar' }                     toca no tocável com esse nome (o exato; senão, o que começa por ele);
//                                          se ele ainda anda até o lugar (a faixa que desce) e está
//                                          coberto no caminho, o dedo espera ele chegar, até 1 s
//   { marca: 'M2C-0417' }                  o mesmo que toca, pra ler melhor no roteiro de escolha (R-14)
//                                          o primário que acabou de nascer de um toque espera o toque duplo passar
//                                          (decisão 64, `data-nascendo`, 300 ms): o dedo espera ele poder responder, até 1 s
//   { toqueDuplo: 'Finalizar instalação' } dois toques no mesmo ponto, a `intervalo` ms um do outro (padrão 120, dentro
//                                          dos 300 do toque duplo do Android): o segundo cai no que o primeiro fez nascer
//   { digita: 'abc12345', em: 'Senha' }    escreve no campo com esse rótulo, no lugar do que tinha
//   { tecla: 'Escape' }                    aperta a tecla (o Esc é o voltar do Android, logica.md)
//   { chega: 'T03' } · { chega: 'T01', momento: '02-…' } · { chega: 'T05', estado: null }   espera a URL dizer isso
//   { ve: 'texto' } · { naoVe: 'texto' }  espera o texto aparecer, ou sumir, no celular
//   { ouve: 'texto' } · { naoOuve: 'texto' }  espera um nome pro leitor de tela no celular (o aria-label, fora do que é
//                                          aria-hidden) dizer isso, ou nenhum dizer (o glifo que não fala o que não é)
// O palco, fora do celular (palco.md):
//   { palco: 'Voltar ao fluxo' }           toca na peça do palco com esse nome: uma linha da coluna, o Voltar ao fluxo,
//                                          o quadrado (Telas do protótipo), uma linha do painel
//   { tocaNoApp: true }                    toca no meio do celular (num estado, o app parado: o toque faz o aviso piscar)
//   { pisca: true } · { pisca: false }     o aviso do app parado (o Voltar ao fluxo, ou o quadrado no estreito) pisca
//                                          agora, ou não pisca: o false confere uma vez, dois quadros depois do passo de
//                                          antes, sem esperar (esperando, a piscada acabaria e ele passaria)
//   { fica: 'T13', ms: 1500 }              confere que o app continua nessa tela depois de ms (o voltar que não faz nada)
//   { desligado: 'Conectar' }              espera o tocável com esse nome existir desabilitado (o primário apagado, o cartão em espera)
//   { naoToca: 'M2C-0999' }                confere que nenhum tocável tem esse nome (o que a referência desenha sem toque)
//   { dorme: 500 }
//   { executa: 'código' }                  roda o código na página (pra semear o que nenhuma
//                                          entrada viva do palco grava, como o vínculo de manutenção que a T06 gravaria);
//                                          se ele devolve um texto, o passo falha com ele (ex.: medir a rolagem)
// A folha que fecha (lei 20):
//   { arrasta: 'Conta', dy: 120 }          arrasta a folha com esse título dy pra baixo, pelo puxador, com o botão
//                                          apertado, e solta; no fim do arraste, antes de soltar, confere que o painel
//                                          andou o mesmo que o dedo (só por transform). `anima` confere o que começou ao
//                                          soltar (o painel voltando, 200, ou descendo, 150)
//   { arrasta: 'Trocar de empresa', de: 'Transportes Capibaribe', dy: 30 }   o arraste começa em cima do tocável com esse nome
//   { tocaFora: 'Conta' }                  toca no véu, 40 acima da folha com esse título
//   Os dois esperam a folha parar (a que ainda sobe não está no lugar dela) antes de medir.
// As regras do mundo real (06-prototipo/CLAUDE.md, 10 e 11):
//   { janela: [360, 480] }                 a janela desse tamanho (Emulation.setDeviceMetricsOverride): o teclado que abre
//                                          encolhe a altura, como no Chrome do Android (o interactive-widget do index.html);
//                                          [800, 360] é o celular deitado. Espera o palco e o app se ajustarem
//   { ponteiro: 'grosso' } · { ponteiro: 'fino' }   o ponteiro do aparelho (Emulation.setTouchEmulationEnabled): grosso é o
//                                          dedo do celular de verdade, onde abre o teclado do aparelho; fino, o mouse do
//                                          computador, onde a T01/03 desenha o dela (decisão 62) · a régua começa no fino
//   { foca: 'Senha' }                     põe o foco no campo com esse rótulo, sem escrever (o toque que abre o teclado);
//   { foca: 'X', teclado: 'numerico' }     e confere o teclado que ele abre, pelo inputMode ('numerico' ou 'texto')
//   { sobreposto: 320 }                    o teclado de 320 por cima da página, sem encolhê-la, como no Safari do iPhone:
//   { sobreposto: 320, rolou: 120 }        só a janela que se vê (visualViewport) encolhe — e desce 120, se o navegador
//                                          rolou a página pra mostrar o campo. { sobreposto: 0 } fecha. O roteiro que usa
//                                          ganha um visualViewport de mentira desde o primeiro abre (só a régua o vê)
//   { aVista: 'Entrar' }                   o tocável — ou o campo, com o rótulo — inteiro no que se vê da janela, sem nada
//                                          que o corte (o miolo que rola, o celular) nem o cubra
//   { app: [360, 480] }                    o app, no layout, tem esse tamanho, e cabe inteiro na janela;
//   { app: [360, 800], centrado: true }    e está no meio dela (o celular deitado, em retrato)
// Todo passo que espera aceita `ms` (padrão 15000): os processos correm no ritmo de ritmos.js,
// e `entre: [min, max]`: quanto tempo a espera pode levar, em ms (o ritmo de um processo) — no toca,
// a espera é a do tocável aparecer ligado (o Voltar ao menu que entra com a última assertiva).
// Se a página recarrega sem um abre (o dev server trocou um arquivo que outro agente editou), o
// estado único volta ao começo: a régua para e diz isso, em vez de só "não chegou".
//
// O movimento (movimento.md): todo toque grava o que começou a animar no celular logo depois,
// em prints/caminho/<roteiro>-movimento.json, e acusa com ⚠ o que a lei proíbe (animar
// outra coisa que transform e opacity, ou em loop).
//   { toca: 'X', anima: [{ prop: 'opacity', ms: 150, curva?, atraso?, em? }] }   o toque tem de começar isso
//   { toca: 'X', naoAnima: [{ prop: 'opacity', em: 'ds-primario-desabilitado' }] }   o toque NÃO pode começar isso
//                                          (o roxo do pressionado que solta por cima do desabilitado); o
//                                          mesmo formato do anima, e junto com ele, se precisar
//   { anima: [...] } · { naoAnima: [...] }  o que está animando agora (depois de um dorme, num processo), ou não
//   { quieto: true }                        nada animando agora (a tela abre sem animar a entrada)
//   { reduzir: true } · { reduzir: false }  liga e desliga o prefers-reduced-motion (com ele, toda duração é zero), e espera 400 ms
//                                          pro que o toque anterior começou acabar
//   { marcaLugar: true }                    guarda onde está cada texto do celular (cada trecho de texto e cada campo, pelo
//                                          getBoundingClientRect): o estado muda o conteúdo, nunca o desenho
//   { mesmoLugar: true }                    nada do que já estava no marcaLugar saiu do lugar (a 0,01 px) nem mudou de tamanho;
//                                          o texto que é novo, ou que trocou, não conta (é o conteúdo que muda)
// Fora do celular (a vitrine, ?vitrine=1), a régua procura na página inteira.
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { CHROME } from './cromo.mjs'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.env.BASE || 'http://localhost:5173/'
const SAIDA = resolve(app, 'prints/caminho'); mkdirSync(SAIDA, { recursive: true })
const W = 360, H = 800
// A gravação do README: GRAVA=<pasta> grava a tela enquanto o roteiro anda (o
// screencast do Chrome: um quadro a cada vez que a página muda, com a hora dele), e
// GRAVA_JANELA=1280x900 abre o palco no computador, com a moldura. No fim, a pasta tem os
// quadros e um indice.json (a hora de cada um e o retângulo do celular), que o
// scripts/gif.py monta no GIF. Sem GRAVA, nada muda na régua.
const GRAVA = process.env.GRAVA ? resolve(process.env.GRAVA) : null
const [GW, GH] = (process.env.GRAVA_JANELA || '').split('x').map(Number)

// o Chrome: o do fotógrafo, pelo arquivo que o Chrome escreve no perfil; senão, um próprio
async function conectar() {
  for (const e of [1, 2]) {
    const f = resolve(app, `prints/tmp/fotografo-perfil-${e}/DevToolsActivePort`)
    if (!existsSync(f)) continue
    const [porta, caminho] = readFileSync(f, 'utf8').trim().split('\n')
    try { await fetch(`http://127.0.0.1:${porta}/json/version`); return { url: `ws://127.0.0.1:${porta}${caminho}`, fechar: () => {} } } catch {}
  }
  const perfil = resolve(app, 'prints/tmp/caminho-perfil'); rmSync(perfil, { recursive: true, force: true }); mkdirSync(perfil, { recursive: true })
  const cromo = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows',
    '--remote-debugging-port=0', '--user-data-dir=' + perfil, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] })
  const url = await new Promise((ok, falha) => {
    let buf = ''; const t = setTimeout(() => falha(new Error('o Chrome não abriu')), 20000)
    cromo.stderr.on('data', (d) => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); ok(m[1]) } })
  })
  return { url, fechar: () => { try { cromo.kill() } catch {} } }
}

const { url, fechar } = await conectar()
const ws = new WebSocket(url)
await new Promise((ok) => ws.addEventListener('open', ok, { once: true }))
let seq = 0; const pendentes = new Map(); const ouvintes = new Set()
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data)
  if (m.id && pendentes.has(m.id)) { const p = pendentes.get(m.id); pendentes.delete(m.id); m.error ? p.falha(new Error(m.error.message)) : p.ok(m.result) }
  else if (m.method) for (const f of ouvintes) f(m)
})
const cdp = (method, params = {}, sessionId) => new Promise((ok, falha) => { const id = ++seq; pendentes.set(id, { ok, falha }); ws.send(JSON.stringify({ id, method, params, sessionId })) })
const dorme = (ms) => new Promise((r) => setTimeout(r, ms))

// dentro da página: os tocáveis do celular, com o nome que o leitor de tela lê
const NA_PAGINA = `(() => {
  // o celular; fora dele (a vitrine das peças, ?vitrine=1), a página inteira
  const raiz = document.querySelector('.celular-tela .app') || document.querySelector('.app') || document.body
  const limpa = (s) => (s || '').replace(/\\s+/g, ' ').trim()
  const nome = (e) => limpa(e.getAttribute('aria-label')
    || (e.getAttribute('aria-labelledby') || '').split(' ').map((i) => document.getElementById(i)?.innerText).join(' ')
    || (e.labels && e.labels[0] && e.labels[0].innerText) || e.innerText || e.value || e.getAttribute('title'))
  const inerte = (e) => !!e.closest('[inert]') || e.closest('[aria-hidden="true"]')
  // o botão num fieldset desabilitado também (a tira da T04 e a faixa da T13 com a folha ou o diálogo por cima)
  const desligado = (e) => e.disabled || !!e.matches?.(':disabled') || e.getAttribute('aria-disabled') === 'true'
  const tocaveis = () => [...raiz.querySelectorAll('button, a[href], [role=button], [role=link], [role=radio], [role=checkbox], [role=option], [role=switch], [role=tab], input[type=checkbox], input[type=radio], label')]
    .filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !inerte(e) })
  const acha = (alvo) => { const t = tocaveis(); return t.find((e) => nome(e) === alvo) || t.find((e) => nome(e).startsWith(alvo)) || t.find((e) => nome(e).includes(alvo)) }
  // o que anima dentro do celular: a propriedade, o tempo, a curva e quantas vezes
  const anims = () => document.getAnimations().filter((a) => a.effect?.target && raiz.contains(a.effect.target)).map((a) => {
    const t = a.effect.getTiming(), alvo = a.effect.target
    const props = a.transitionProperty ? [a.transitionProperty] : [...new Set(a.effect.getKeyframes().flatMap((k) => Object.keys(k).filter((p) => !['offset', 'easing', 'composite', 'computedOffset'].includes(p))))]
    return { em: (typeof alvo.className === 'string' ? alvo.className : alvo.tagName).trim().split(/\\s+/).slice(0, 3).join(' '), nome: a.animationName || a.transitionProperty || '', props,
      ms: Math.round(Number(t.duration) || 0), atraso: Math.round(t.delay || 0), curva: t.easing === 'linear' && a.transitionProperty ? getComputedStyle(alvo).transitionTimingFunction : (t.easing === 'linear' && a.animationName ? getComputedStyle(alvo).animationTimingFunction : t.easing), vezes: t.iterations }
  })
  // o campo pelo rótulo (o do digita e do foca), e se ele se vê inteiro (o aVista)
  const campo = (alvo) => [...raiz.querySelectorAll('input, textarea')].find((e) => nome(e).startsWith(alvo) || (e.labels?.[0] && limpa(e.labels[0].innerText).startsWith(alvo)))
  // o campo se vê pela caixa dele, como a peça do teclado a mostra (src/estado/teclado.js): o menor bloco com o
  // campo e o rótulo — o poço inteiro, com o traço de baixo —; sem rótulo, o bloco do campo
  const caixaDoCampo = (e) => { const r = [...(e.labels ?? [])]; let c = e.parentElement ?? e; while (r.some((x) => !c.contains(x)) && c.parentElement) c = c.parentElement; return c }
  const inteiro = (e) => {
    const partes = [/^(INPUT|TEXTAREA)$/.test(e.tagName) ? caixaDoCampo(e) : e].map((x) => x.getBoundingClientRect()).filter((r) => r.height > 0)
    if (!partes.length) return 'não tem tamanho'
    const r = { top: Math.min(...partes.map((x) => x.top)), bottom: Math.max(...partes.map((x) => x.bottom)), left: Math.min(...partes.map((x) => x.left)), right: Math.max(...partes.map((x) => x.right)) }
    const f = (x) => Math.round(x.top) + '…' + Math.round(x.bottom)
    const v = window.visualViewport, vt = v ? v.offsetTop : 0, vb = v ? v.offsetTop + v.height : innerHeight
    if (r.top < vt - 0.5 || r.bottom > vb + 0.5 || r.left < -0.5 || r.right > innerWidth + 0.5) return 'fora do que se vê: ' + f(r) + ' em ' + Math.round(vt) + '…' + Math.round(vb)
    for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a); if (!/hidden|auto|scroll|clip/.test(cs.overflowY)) continue
      const c = a.getBoundingClientRect(); if (r.top < c.top - 0.5 || r.bottom > c.bottom + 0.5) return 'cortado por ' + (a.className || a.tagName) + ': ' + f(r) + ' em ' + f(c)
    }
    const b = e.getBoundingClientRect(), em = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2)
    if (!em || !(e.contains(em) || em.contains(e) || em.control === e || e.control === em)) return 'coberto por ' + (em ? em.className || em.tagName : 'nada')
    return true
  }
  // as peças do palco, fora do celular (a coluna, o quadrado, o painel aberto)
  const noPalco = (alvo) => { const t = [...document.querySelectorAll('.palco button, .palco [role=radio]')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !e.closest('.celular') && !e.closest('[inert]') })
    return t.find((e) => nome(e) === alvo) || t.find((e) => nome(e).startsWith(alvo)) }
  const piscando = () => document.getAnimations().filter((a) => a.animationName === 'palco-pisca' && a.playState === 'running').map((a) => nome(a.effect.target) || a.effect.target.className)
  return { raiz, nome, desligado, tocaveis, acha, limpa, anims, campo, inteiro, noPalco, piscando }
})()`
const na = async (s, corpo) => {
  const r = await cdp('Runtime.evaluate', { expression: `(() => { const P = ${NA_PAGINA}; ${corpo} })()`, returnByValue: true, awaitPromise: true }, s)
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
  return r.result.value
}
const onde = (s) => na(s, `const q = new URLSearchParams(location.search); return { tela: q.get('tela'), momento: q.get('momento'), estado: q.get('estado') }`)
const nomes = (s) => na(s, `return P.tocaveis().map((e) => (P.desligado(e) ? '(desligado) ' : '') + P.nome(e)).filter(Boolean)`)

async function espera(fn, ms, passo, entre) {
  const t0 = performance.now(); let ultimo
  for (;;) {
    ultimo = await fn()
    if (ultimo === true) {
      const levou = Math.round(performance.now() - t0)
      if (entre && (levou < entre[0] || levou > entre[1])) throw new Error(`${passo}: levou ${levou} ms, e o ritmo pede entre ${entre[0]} e ${entre[1]}`)
      return
    }
    if (performance.now() - t0 > ms) throw new Error(`${passo}: não chegou em ${ms} ms${ultimo && ultimo !== false ? ' · ' + ultimo : ''}`)
    await dorme(entre ? 20 : 100)
  }
}

// o movimento: o que a lei proíbe (movimento.md, "Só isto se move") e o que o roteiro espera
const PODE = new Set(['transform', 'opacity', 'translate', 'scale', 'rotate'])
let registro = []
let abrindo = false   // o abre navega de propósito; fora dele, navegar é o app recarregando
function avisaLei(vistas, onde) {
  for (const a of vistas) {
    const fora = a.props.filter((p) => !PODE.has(p))
    if (fora.length) console.log(`      ⚠ ${onde}: ${a.em} anima ${fora.join(', ')} — só transform e opacity se movem`)
    if (a.vezes === Infinity || a.vezes === 'Infinity') console.log(`      ⚠ ${onde}: ${a.em} anima em loop`)
  }
}
function confere(esperado, vistas, onde) {
  avisaLei(vistas, onde)
  for (const e of esperado) {
    const achou = vistas.find((a) => a.props.includes(e.prop) && (e.ms === undefined || Math.abs(a.ms - e.ms) <= 1)
      && (e.atraso === undefined || Math.abs(a.atraso - e.atraso) <= 1) && (e.em === undefined || a.em.includes(e.em))
      && (e.curva === undefined || a.curva.replace(/\s/g, '') === e.curva.replace(/\s/g, '')))
    if (!achou) throw new Error(`${onde}: esperava ${JSON.stringify(e)}; animou ${vistas.length ? vistas.map((a) => `${a.em} ${a.props.join('+')} ${a.ms}ms +${a.atraso} ${a.curva}`).join(' · ') : 'nada'}`)
  }
}

// o que o roteiro diz que não pode animar (ex.: o roxo por cima do desabilitado)
function confereNao(proibido, vistas, onde) {
  for (const e of proibido) {
    const achou = vistas.find((a) => a.props.includes(e.prop) && (e.ms === undefined || Math.abs(a.ms - e.ms) <= 1) && (e.em === undefined || a.em.includes(e.em)))
    if (achou) throw new Error(`${onde}: não podia animar ${JSON.stringify(e)}; animou ${achou.em} ${achou.props.join('+')} ${achou.ms}ms`)
  }
}

async function passo(s, p) {
  const ms = p.ms ?? 15000
  if (p.abre !== undefined) {
    abrindo = true
    try {
      // a página de antes continua na tela até a nova chegar: marca a velha, e espera uma sem a marca
      // (o endereço não serve de prova, porque o palco o reescreve ao abrir)
      await na(s, `window.__m2cfVelha = true; return true`).catch(() => {})
      await cdp('Page.navigate', { url: BASE + p.abre }, s)
      await espera(() => na(s, `return !window.__m2cfVelha && document.readyState === 'complete' && !!P.raiz && document.fonts.status === 'loaded'`).catch(() => false), ms, 'abre')
      // o app desenhou, mas os efeitos do React (o Esc de cada tela, o relógio dos processos)
      // correm depois da pintura: dois quadros e uma volta do laço, senão a tecla logo depois do
      // abre cai antes de a tela escutar
      await na(s, `return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => r(true), 50))))`)
      return
    } finally { abrindo = false }
  }
  // o recarrega: o F5 do navegador, na mesma página — o palco recomeça do login
  if (p.recarrega) {
    abrindo = true
    try {
      await na(s, `window.__m2cfVelha = true; return true`).catch(() => {})
      await cdp('Page.reload', {}, s)
      await espera(() => na(s, `return !window.__m2cfVelha && document.readyState === 'complete' && !!P.raiz && document.fonts.status === 'loaded'`).catch(() => false), ms, 'recarrega')
      await na(s, `return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => r(true), 50))))`)
      return
    } finally { abrindo = false }
  }
  if (p.toca !== undefined || p.marca !== undefined || p.toqueDuplo !== undefined) {
    const alvo = p.toca ?? p.marca ?? p.toqueDuplo
    await espera(() => na(s, `const e = P.acha(${JSON.stringify(alvo)}); return !!e && !P.desligado(e) || (e ? 'está desligado' : 'não achei')`), ms, `toca "${alvo}"`, p.entre)
    // o primário que nasceu de um toque não responde nos 300 ms do toque duplo (decisão 64): o dedo espera
    if (p.toqueDuplo === undefined) for (let i = 0; i < 50 && await na(s, `return !!P.acha(${JSON.stringify(alvo)})?.hasAttribute('data-nascendo')`); i++) await dorme(20)
    const mira = () => na(s, `const e = P.acha(${JSON.stringify(alvo)}); e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect();
      const x = r.left + r.width / 2, y = r.top + r.height / 2, em = document.elementFromPoint(x, y);
      let anda = false; for (let a = e; a && !anda; a = a.parentElement) anda = a.getAnimations().some((n) => n.playState === 'running')
      return { x, y, anda, cobre: em && !e.contains(em) && !em.contains(e) ? (em.className || em.tagName) + ' · ' + P.nome(em) : null }`)
    // o tocável que ainda anda até o lugar dele — o ENCERRAR da faixa que desce por baixo da barra —
    // pode estar coberto no caminho: o dedo espera ele chegar (até 1 s) antes de dizer que está coberto
    let c = await mira()
    for (let i = 0; c.cobre && c.anda && i < 50; i++) { await dorme(20); c = await mira() }
    if (c.cobre) throw new Error(`toca "${alvo}": o centro dele está coberto por ${c.cobre}`)
    for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', clickCount: 1 }, s)
    // o toque duplo: o segundo toque no mesmo ponto, antes de o primeiro acabar de valer
    if (p.toqueDuplo !== undefined) {
      await dorme(p.intervalo ?? 120)
      for (const type of ['mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', clickCount: 2 }, s)
    }
    // o que o toque começou: dois quadros depois, pra o React desenhar e a transição nascer
    const vistas = await na(s, `return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(P.anims()))))`)
    registro.push({ passo: `toca ${alvo}`, anims: vistas })
    if (p.anima) confere(p.anima, vistas, `toca "${alvo}"`); else avisaLei(vistas, `toca "${alvo}"`)
    if (p.naoAnima) confereNao(p.naoAnima, vistas, `toca "${alvo}"`)
    return
  }
  if (p.arrasta !== undefined) {
    const achaFolha = `const f = [...P.raiz.querySelectorAll('[role=dialog]')].find((e) => P.nome(e) === ${JSON.stringify(p.arrasta)})`
    // a folha parada: a que ainda sobe não está no lugar dela (o dedo mede de onde ela para)
    await espera(() => na(s, `${achaFolha}; return !f ? 'não achei a folha' : f.getAnimations().length ? 'a folha ainda anda' : true`), ms, `arrasta "${p.arrasta}"`)
    const c = await na(s, `${achaFolha}; const r = f.getBoundingClientRect()
      const de = ${JSON.stringify(p.de ?? null)}; const e = de ? P.acha(de) : f.querySelector('.ds-folha-puxador')
      if (!e || !f.contains(e)) return { erro: de ? 'não achei ' + de + ' na folha' : 'a folha não tem o puxador' }
      const q = e.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2, topo: r.top }`)
    if (c.erro) throw new Error(`arrasta "${p.arrasta}": ${c.erro}`)
    const dy = p.dy, passos = Math.max(2, Math.ceil(dy / 10))
    await cdp('Input.dispatchMouseEvent', { type: 'mouseMoved', x: c.x, y: c.y }, s)
    await cdp('Input.dispatchMouseEvent', { type: 'mousePressed', x: c.x, y: c.y, button: 'left', buttons: 1, clickCount: 1 }, s)
    for (let i = 1; i <= passos; i++) await cdp('Input.dispatchMouseEvent', { type: 'mouseMoved', x: c.x, y: c.y + (dy * i) / passos, button: 'left', buttons: 1 }, s)
    // no fim do arraste, com o dedo ainda embaixo: o painel andou o que o dedo andou (a folga só decide quando começa)
    const andou = await na(s, `${achaFolha}; return new Promise((r) => requestAnimationFrame(() => r({ top: f.getBoundingClientRect().top, t: getComputedStyle(f).transform })))`)
    await cdp('Input.dispatchMouseEvent', { type: 'mouseReleased', x: c.x, y: c.y + dy, button: 'left', buttons: 0, clickCount: 1 }, s)
    const vistas = await na(s, `return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(P.anims()))))`)
    registro.push({ passo: `arrasta ${p.arrasta} ${dy}`, anims: vistas })
    const folga = await na(s, `return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--folha-arraste-folga')) || 0`)
    const esperado = dy >= folga ? dy : 0
    if (Math.abs(andou.top - c.topo - esperado) > 1) throw new Error(`arrasta "${p.arrasta}": o dedo andou ${dy} e o painel ${Math.round(andou.top - c.topo)} (${andou.t})`)
    if (p.anima) confere(p.anima, vistas, `arrasta "${p.arrasta}"`); else avisaLei(vistas, `arrasta "${p.arrasta}"`)
    return
  }
  if (p.tocaFora !== undefined) {
    const c = await espera(() => na(s, `const f = [...P.raiz.querySelectorAll('[role=dialog]')].find((e) => P.nome(e) === ${JSON.stringify(p.tocaFora)})
      return !f ? 'não achei a folha' : f.getAnimations().length ? 'a folha ainda anda' : true`), ms, `toca fora de "${p.tocaFora}"`)
      .then(() => na(s, `const f = [...P.raiz.querySelectorAll('[role=dialog]')].find((e) => P.nome(e) === ${JSON.stringify(p.tocaFora)})
      const r = f.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top - 40, em = document.elementFromPoint(x, y)
      return { x, y, veu: !!em && em.classList.contains('ds-veu') && em.contains(f), em: em ? em.className || em.tagName : 'nada' }`))
    if (!c.veu) throw new Error(`toca fora de "${p.tocaFora}": 40 acima da folha está ${c.em}, e não o véu dela`)
    for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', clickCount: 1 }, s)
    const vistas = await na(s, `return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(P.anims()))))`)
    registro.push({ passo: `toca fora ${p.tocaFora}`, anims: vistas })
    if (p.anima) confere(p.anima, vistas, `toca fora de "${p.tocaFora}"`); else avisaLei(vistas, `toca fora de "${p.tocaFora}"`)
    return
  }
  if (p.anima !== undefined) { const vistas = await na(s, `return P.anims()`); registro.push({ passo: 'anima', anims: vistas }); confere(p.anima, vistas, 'anima'); if (p.naoAnima) confereNao(p.naoAnima, vistas, 'anima'); return }
  if (p.naoAnima !== undefined) { const vistas = await na(s, `return P.anims()`); registro.push({ passo: 'não anima', anims: vistas }); avisaLei(vistas, 'não anima'); return confereNao(p.naoAnima, vistas, 'não anima') }
  if (p.quieto !== undefined) {
    const vistas = await na(s, `return P.anims()`)
    if (vistas.length) throw new Error(`quieto: está animando ${vistas.map((a) => `${a.em} ${a.props.join('+')} ${a.ms}ms`).join(' · ')}`)
    return
  }
  if (p.reduzir !== undefined) {
    await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: p.reduzir ? 'reduce' : 'no-preference' }] }, s)
    // o que o toque anterior começou guarda o tempo dele: espera acabar, pra não contar como do reduzir
    return dorme(400)
  }
  if (p.digita !== undefined) {
    await espera(() => na(s, `const i = [...P.raiz.querySelectorAll('input, textarea')].find((e) => P.nome(e).startsWith(${JSON.stringify(p.em)}) || (e.labels?.[0] && P.limpa(e.labels[0].innerText).startsWith(${JSON.stringify(p.em)})));
      if (!i) return 'não achei o campo'; i.focus(); i.select?.(); return true`), ms, `digita em "${p.em}"`)
    await cdp('Input.insertText', { text: p.digita }, s)
    return
  }
  if (p.janela !== undefined) {
    const [width, height] = p.janela
    await cdp('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: +(process.env.DENSIDADE || 1), mobile: false }, s)
    // o resize chega, o palco desenha de novo e a peça do teclado ajusta no quadro seguinte
    return espera(() => na(s, `return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => r(innerWidth === ${width} && innerHeight === ${height} || 'a janela está em ' + innerWidth + ' × ' + innerHeight), 50))))`), ms, `janela ${width} × ${height}`)
  }
  if (p.ponteiro !== undefined) {
    const grosso = p.ponteiro === 'grosso'
    if (!grosso && p.ponteiro !== 'fino') throw new Error(`ponteiro: "${p.ponteiro}" não existe (grosso ou fino)`)
    await cdp('Emulation.setTouchEmulationEnabled', { enabled: grosso, ...(grosso ? { maxTouchPoints: 5 } : {}) }, s)
    return espera(() => na(s, `return matchMedia('(pointer: ${grosso ? 'coarse' : 'fine'})').matches || 'o ponteiro não mudou'`), ms, `ponteiro ${p.ponteiro}`)
  }
  if (p.sobreposto !== undefined) {
    return espera(() => na(s, `if (!window.__m2cfTeclado) return 'sem o visualViewport de mentira'; window.__m2cfTeclado(${p.sobreposto}, ${p.rolou ?? 0})
      return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => r(true), 50))))`), ms, `sobreposto ${p.sobreposto}`)
  }
  if (p.foca !== undefined) {
    await espera(() => na(s, `const i = P.campo(${JSON.stringify(p.foca)}); if (!i) return 'não achei o campo'; i.focus(); return document.activeElement === i || 'o foco não ficou'`), ms, `foca "${p.foca}"`)
    if (p.teclado) {
      const modo = await na(s, `return document.activeElement.inputMode || ''`)
      const quer = { numerico: 'numeric', texto: '' }[p.teclado]
      if (quer === undefined) throw new Error(`foca: teclado "${p.teclado}" não existe (numerico ou texto)`)
      if ((quer === '' ? !['', 'text'].includes(modo) : modo !== quer)) throw new Error(`foca "${p.foca}": o teclado é o ${modo || 'de texto'}, e o roteiro pede o ${p.teclado}`)
    }
    return
  }
  if (p.aVista !== undefined) return espera(() => na(s, `const e = P.campo(${JSON.stringify(p.aVista)}) || P.acha(${JSON.stringify(p.aVista)}); return e ? P.inteiro(e) : 'não achei'`), ms, `à vista "${p.aVista}"`)
  if (p.app !== undefined) {
    const [w, h] = p.app
    return espera(() => na(s, `const a = P.raiz, r = a.getBoundingClientRect(), c = (x) => Math.round(x * 10) / 10
      if (Math.abs(a.offsetWidth - ${w}) > 0.5 || Math.abs(a.offsetHeight - ${h}) > 0.5) return 'o app tem ' + a.offsetWidth + ' × ' + a.offsetHeight
      if (r.top < -0.5 || r.left < -0.5 || r.bottom > innerHeight + 0.5 || r.right > innerWidth + 0.5) return 'o app sai da janela: ' + [r.left, r.top, r.right, r.bottom].map(c).join(', ')
      if (${!!p.centrado} && (Math.abs(r.left + r.right - innerWidth) > 1 || Math.abs(r.top + r.bottom - innerHeight) > 1)) return 'o app não está no meio: ' + [r.left, r.top, r.right, r.bottom].map(c).join(', ')
      return true`), ms, `app ${w} × ${h}`)
  }
  if (p.tecla !== undefined) {
    const k = { key: p.tecla, code: p.tecla, windowsVirtualKeyCode: { Escape: 27, Enter: 13, Tab: 9, Backspace: 8 }[p.tecla] }
    await cdp('Input.dispatchKeyEvent', { type: 'keyDown', ...k }, s); await cdp('Input.dispatchKeyEvent', { type: 'keyUp', ...k }, s)
    return
  }
  if (p.chega !== undefined) {
    return espera(async () => {
      const u = await onde(s)
      const ok = u.tela === p.chega && ('momento' in p ? u.momento === p.momento : true) && ('estado' in p ? u.estado === p.estado : true)
      return ok || `está em ${u.tela}${u.momento ? ' · ' + u.momento : ''}${u.estado ? ' · ' + u.estado : ''}`
    }, ms, `chega ${p.chega}${p.momento ? ' · ' + p.momento : ''}`, p.entre)
  }
  if (p.fica !== undefined) {
    await dorme(p.ms ?? 1500); const u = await onde(s)
    if (u.tela !== p.fica) throw new Error(`fica ${p.fica}: foi pra ${u.tela}`)
    return
  }
  if (p.naoToca !== undefined) return espera(() => na(s, `const e = P.acha(${JSON.stringify(p.naoToca)}); return !e || 'é tocável: ' + P.nome(e)`), ms, `não toca "${p.naoToca}"`, p.entre)
  if (p.desligado !== undefined) return espera(() => na(s, `const e = P.acha(${JSON.stringify(p.desligado)}); return !!e && P.desligado(e) || (e ? 'está ligado' : 'não achei')`), ms, `desligado "${p.desligado}"`, p.entre)
  if (p.ve !== undefined) return espera(() => na(s, `return P.raiz.innerText.includes(${JSON.stringify(p.ve)})`), ms, `vê "${p.ve}"`, p.entre)
  if (p.naoVe !== undefined) return espera(() => na(s, `return !P.raiz.innerText.includes(${JSON.stringify(p.naoVe)})`), ms, `não vê "${p.naoVe}"`, p.entre)
  if (p.palco !== undefined || p.tocaNoApp !== undefined) {
    const alvo = p.palco !== undefined ? `P.noPalco(${JSON.stringify(p.palco)})` : `document.querySelector('.celular')`
    const onde = p.palco !== undefined ? `palco "${p.palco}"` : 'toca no app'
    await espera(() => na(s, `return !!${alvo} || 'não achei'`), ms, onde)
    const c = await na(s, `const r = ${alvo}.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }`)
    for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', clickCount: 1 }, s)
    await na(s, `return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(true))))`)
    return
  }
  if (p.pisca !== undefined) {
    if (p.pisca) return espera(() => na(s, `return P.piscando().length > 0 || 'nada pisca'`), ms, 'pisca', p.entre)
    const v = await na(s, `return P.piscando()`)
    if (v.length) throw new Error(`não pisca: pisca ${v.join(', ')}, sem toque no app`)
    return
  }
  if (p.ouve !== undefined || p.naoOuve !== undefined) {
    const nomes = `[...P.raiz.querySelectorAll('[aria-label]')].filter((e) => !e.closest('[aria-hidden=true]')).map((e) => e.getAttribute('aria-label'))`
    if (p.ouve !== undefined) return espera(() => na(s, `return ${nomes}.some((n) => n.includes(${JSON.stringify(p.ouve)}))`), ms, `ouve "${p.ouve}"`, p.entre)
    return espera(() => na(s, `const n = ${nomes}.filter((n) => n.includes(${JSON.stringify(p.naoOuve)})); return !n.length || n.length + ' nome(s) dizem isso'`), ms, `não ouve "${p.naoOuve}"`, p.entre)
  }
  // o lugar de cada texto (o foco, o escolhido e a falha trocam a cor, nunca o tamanho do poço):
  // cada trecho de texto e cada campo que já estava no celular, guardado pelo nó; o que é novo não conta,
  // e o que trocou de texto também não (o conteúdo muda; o desenho, não)
  if (p.marcaLugar !== undefined || p.mesmoLugar !== undefined) {
    const LUGAR = `const lugar = (n) => { let b; if (n.nodeType === 3) { const r = document.createRange(); r.selectNodeContents(n); b = r.getBoundingClientRect() } else b = n.getBoundingClientRect()
        return { t: P.limpa(n.nodeType === 3 ? n.textContent : n.value ?? ''), b: [b.left, b.top, b.width, b.height].map((x) => Math.round(x * 100) / 100) } }`
    if (p.marcaLugar !== undefined) {
      await na(s, `${LUGAR}; const m = new Map(); const w = document.createTreeWalker(P.raiz, NodeFilter.SHOW_TEXT)
        for (let n = w.nextNode(); n; n = w.nextNode()) if (n.textContent.trim() && !n.parentElement.closest('[aria-hidden="true"], [inert]')) m.set(n, lugar(n))
        for (const i of P.raiz.querySelectorAll('input, textarea')) m.set(i, lugar(i))
        window.__m2cfLugares = m; return m.size`)
      return
    }
    const r = await na(s, `${LUGAR}; const m = window.__m2cfLugares; if (!m) return 'sem marcaLugar antes'
      const saiu = []
      for (const [n, u] of m) { if (!n.isConnected) continue; const v = lugar(n); if (u.t !== v.t) continue
        if (u.b.some((x, k) => Math.abs(x - v.b[k]) > 0.01)) saiu.push((u.t || '[campo]').slice(0, 30) + ' ' + u.b.join(',') + ' → ' + v.b.join(',')) }
      return saiu.length ? saiu.slice(0, 4).join(' · ') : true`)
    if (r !== true) throw new Error('mesmo lugar: ' + r)
    return
  }
  if (p.executa !== undefined) { const r = await na(s, p.executa); if (typeof r === 'string') throw new Error(r); return }
  if (p.dorme !== undefined) return dorme(p.dorme)
  throw new Error('passo desconhecido: ' + JSON.stringify(p))
}

const VV_DE_MENTIRA = `(() => {
  const vv = new EventTarget(); let teclado = 0, rolou = 0
  Object.defineProperties(vv, { offsetTop: { get: () => rolou }, offsetLeft: { get: () => 0 }, pageTop: { get: () => rolou }, pageLeft: { get: () => 0 },
    width: { get: () => innerWidth }, height: { get: () => innerHeight - teclado }, scale: { get: () => 1 } })
  window.__m2cfTeclado = (px, sobe) => { teclado = px; rolou = sobe; vv.dispatchEvent(new Event('resize')); vv.dispatchEvent(new Event('scroll')) }
  Object.defineProperty(window, 'visualViewport', { get: () => vv, configurable: true })
})()`

// o passo com `rotulo` (o executa longo da varredura de cor) aparece pelo rótulo
const rotulo = (p) => p.rotulo ? `${Object.keys(p).find((k) => k !== 'rotulo')} · ${p.rotulo}` : Object.entries(p).filter(([k]) => !['ms', 'anima', 'naoAnima', 'entre'].includes(k)).map(([k, v]) => `${k} ${typeof v === 'string' ? v : JSON.stringify(v)}`).join(' · ')

async function roda(nome) {
  const passos = (await import(pathToFileURL(resolve(app, `scripts/caminhos/${nome}.mjs`)).href)).default
  const { targetId } = await cdp('Target.createTarget', { url: 'about:blank', newWindow: true })
  const { sessionId: s } = await cdp('Target.attachToTarget', { targetId, flatten: true })
  // todo roteiro começa num aparelho que nunca escolheu o tema — o app nasce escuro (R-16)
  // · o Modo claro mora no armazenamento do navegador, que o perfil da régua guarda de um roteiro pro outro
  // (limpo de dentro do próprio endereço, antes do primeiro abre: o Storage.clearDataForOrigin dá erro interno neste Chrome)
  // · num arquivo pequeno que o servidor serve: o favicon.ico não existe, e a página de erro do 404 não tem armazenamento
  { const ss = s
    await cdp('Page.navigate', { url: BASE + 'src/palco/versao.js' }, ss).catch(() => {})
    // espera o endereço chegar antes de limpar: com o servidor ocupado, a limpeza caía no about:blank
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 150))
      const r = await cdp('Runtime.evaluate', { expression: `location.origin === ${JSON.stringify(new URL(BASE).origin)} ? (localStorage.clear(), localStorage.length === 0) : false`, returnByValue: true }, ss).catch(() => null)
      if (r?.result?.value === true) break
    } }
  await cdp('Page.enable', {}, s); await cdp('Runtime.enable', {}, s)
  await cdp('Emulation.setFocusEmulationEnabled', { enabled: true }, s)
  // DENSIDADE=2: a janela com a densidade de uma tela retina, pra ver o que só aparece nela
  await cdp('Emulation.setDeviceMetricsOverride', { width: GW || W, height: GH || H, deviceScaleFactor: +(process.env.DENSIDADE || 1), mobile: false }, s)
  const quadros = []
  let grava = null
  if (GRAVA) {
    rmSync(GRAVA, { recursive: true, force: true }); mkdirSync(GRAVA, { recursive: true })
    grava = (m) => {
      if (m.sessionId !== s || m.method !== 'Page.screencastFrame') return
      const n = quadros.length
      writeFileSync(resolve(GRAVA, `q${String(n).padStart(5, '0')}.jpg`), Buffer.from(m.params.data, 'base64'))
      quadros.push({ n, t: m.params.metadata.timestamp })
      cdp('Page.screencastFrameAck', { sessionId: m.params.sessionId }, s).catch(() => {})
    }
    ouvintes.add(grava)
    await cdp('Page.startScreencast', { format: 'jpeg', quality: 95, everyNthFrame: 1, ...(process.env.DENSIDADE ? { maxWidth: (GW || W) * +process.env.DENSIDADE, maxHeight: (GH || H) * +process.env.DENSIDADE } : {}) }, s)
  }
  // o teclado por cima da página (o Safari do iPhone): um visualViewport de mentira, que acompanha a janela
  // e encolhe no { sobreposto } — o Chrome não tem como emular isso
  if (passos.some((p) => p.sobreposto !== undefined)) await cdp('Page.addScriptToEvaluateOnNewDocument', { source: VV_DE_MENTIRA }, s)
  const t0 = performance.now(); let falhou = null; registro = []
  // a página que recarrega sem o roteiro mandar (o dev server trocou um arquivo que outro
  // agente editou) volta o estado único ao começo: a régua diz isso, em vez de só "não chegou"
  let recarregou = false
  const ouve = (m) => { if (m.sessionId === s && m.method === 'Page.frameNavigated' && !m.params.frame.parentId && !abrindo) recarregou = true }
  ouvintes.add(ouve)
  const RECARGA = 'o app recarregou no meio do caminho (o dev server trocou um arquivo?) e o estado voltou ao começo — rode de novo'
  try {
    for (const [i, p] of passos.entries()) {
      try { await passo(s, p); if (recarregou) throw new Error(RECARGA); console.log(`  ✔ ${String(i + 1).padStart(3)} ${rotulo(p)}`) }
      catch (e) {
        if (recarregou && e.message !== RECARGA) e.message = RECARGA + ' · ' + e.message
        falhou = { passo: i + 1, erro: e.message, onde: await onde(s).catch(() => null), tocaveis: await nomes(s).catch(() => []) }
        const { data } = await cdp('Page.captureScreenshot', { format: 'png' }, s)
        writeFileSync(resolve(SAIDA, `${nome}-falha.png`), Buffer.from(data, 'base64'))
        console.log(`  ✘ ${String(i + 1).padStart(3)} ${rotulo(p)}\n      ${e.message}\n      em ${JSON.stringify(falhou.onde)}\n      tocáveis: ${falhou.tocaveis.join(' | ')}\n      foto: prints/caminho/${nome}-falha.png`)
        break
      }
    }
  } finally {
    ouvintes.delete(ouve)
    if (GRAVA) {
      await dorme(600)
      const celular = await cdp('Runtime.evaluate', { expression: `JSON.stringify((document.querySelector('.celular') || document.body).getBoundingClientRect())`, returnByValue: true }, s).catch(() => null)
      await cdp('Page.stopScreencast', {}, s).catch(() => {}); ouvintes.delete(grava)
      writeFileSync(resolve(GRAVA, 'indice.json'), JSON.stringify({ roteiro: nome, janela: [GW || W, GH || H], celular: celular ? JSON.parse(celular.result.value) : null, quadros }, null, 1))
      console.log(`gravados ${quadros.length} quadros em ${GRAVA}`)
    }
    await cdp('Target.closeTarget', { targetId }).catch(() => {})
  }
  writeFileSync(resolve(SAIDA, `${nome}-movimento.json`), JSON.stringify(registro, null, 1))
  const seg = ((performance.now() - t0) / 1000).toFixed(1)
  console.log(falhou ? `${nome}: PAROU no passo ${falhou.passo} de ${passos.length} (${seg} s)` : `${nome}: OK, ${passos.length} passos (${seg} s)`)
  return !falhou
}

const alvo = process.argv[2] || 'heroi'
const lista = alvo === 'todos' ? readdirSync(resolve(app, 'scripts/caminhos')).filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4)).sort() : [alvo]
let ok = true
for (const n of lista) { console.log(`\n# ${n}`); ok = (await roda(n)) && ok }
ws.close(); fechar()
console.log(ok ? '\nCAMINHO APROVADO' : '\nCAMINHO REPROVADO')
process.exit(ok ? 0 : 1)
