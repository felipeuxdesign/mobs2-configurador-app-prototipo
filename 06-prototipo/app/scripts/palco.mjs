// A bancada do palco: os 5 quadros de 06-prototipo/palco/referencias contra o
// palco rodando, os dois no MESMO Chrome headless, a 1× (os PNG do palco são 1×):
// 1440 × 900, e o 00 (a folha das peças) em 1440 × 1760.
//
// O palco não é igual ao quadro inteiro, e isso é decidido: o quadro desenha
// o celular a 90% (338,4 × 734,4, no centro: no topo a 82,8) com o PNG da referência dentro,
// e o palco põe o app em tamanho real, rodando, no centro (376 × 816, no topo a 42); o
// quadrado fica a 16, e não a 24; e a etiqueta, que nenhum quadro desenha, fica no canto.
// Por isso a bancada compara **peça por peça**, cada uma no lugar onde caiu
// nos dois — o quadrado, a coluna (o conteúdo, que fica no meio da altura do celular), o
// painel —, e dá o quadro inteiro só de informação. A tela do celular não entra: ela é da
// régua das telas (scripts/tela.mjs), a 360 × 800.
// A moldura (decisão 43: a silhueta) entra de dois jeitos: medida em
// tamanho real, contra os números do palco.md (376 × 816, a borda de 8 quase-preta, sem metal,
// o canto de 36 e 28, o fio de luz por dentro, o contorno por fora e a sombra embaixo, o
// centro da janela e a coluna a 40 com a altura dele) — a conferência da moldura, que falha
// se um número não bate —, e desenhada: o anel da moldura, sem a tela, com o palco numa
// janela de 782 de altura, onde a escala (734/816) põe o celular na altura do quadro (734,4),
// contra o anel do quadro (a peça `moldura`).
// No 00, cada espécime da folha contra a mesma peça numa das fotos do palco.
// E os textos do painel e da coluna, na ordem, contra os do quadro (o palco não tem
// textos.md: o texto dele é o que o quadro escreve).
// Cada diferença que se sabe de onde vem leva a nota (NOTAS, embaixo); a que não
// tem nota é defeito do palco.
//
// O lugar de cada peça sai medido dos dois lados: no palco, pelo ?medir=1
// (Palco.jsx escreve as caixas num <pre>); no quadro, por um script que vai numa
// cópia do HTML. Assim a bancada segue certa se o celular mudar de tamanho.
//
// Uso (com o `npm run dev` rodando em :5173):
//   node scripts/palco.mjs                 → os 5 quadros; grava prints/palco/relatorio.json
//   node scripts/palco.mjs <base.json>     → e diz o que piorou contra essa base
//   a base das cenas de hoje (00 a 04: a T07 agrupada, a T04 nas colunas do 00) é a
//   prints/linha-de-base-palco-pacote1.json; a prints/linha-de-base-palco.json é a das cenas antigas
// Saída: prints/palco/<quadro>-{html,app,diff}.png (o quadro inteiro) e
// <quadro>-<peça>-{html,app,diff}.png (cada peça), uma linha por peça.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { foto, dom, TMP } from './cromo.mjs'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
const REF = resolve(raiz, '06-prototipo/palco/referencias')
const OUT = resolve(app, 'prints/palco'); mkdirSync(OUT, { recursive: true })
const DEV = process.env.DEV || 'http://localhost:5173'
const W = 1440, H = 900, H00 = 1760
// a janela em que o palco escala o celular pra altura do quadro (o quadro desenha a 90%: 734,4): (782 − 48) / 816 = 734 / 816
const H_MOLDURA = 782
// a moldura em tamanho real (palco.md, decisão 43): a norma da conferência — a silhueta:
// a borda de 8 no recheio, sem metal; o fio de luz por dentro, o contorno por fora e a sombra, na sombra do celular
const MOLDURA = { tela: [360, 800], borda: 8, fora: [376, 816], raioFora: 36, raioTela: 28, bordaCor: 'rgb(5, 4, 7)',
  sombras: 'rgba(255, 255, 255, 0.14) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.6) 0px 0px 0px 1px, rgba(0, 0, 0, 0.45) 0px 12px 24px 0px', coluna: 40 }

// os quadros e o lugar do palco que cada um desenha · a tela agrupada é a T07, o Diagnóstico do
// módulo (O módulo e A CAN); o 02 é a T07 no Firmware fora da lista
const QUADROS = [
  { ref: '01-no-fluxo', url: '?tela=T04' },
  { ref: '02-num-estado', url: '?tela=T07&estado=04-estado-firmware-fora-da-lista' },
  { ref: '03-tela-com-muitos-estados', url: '?tela=T07' },
  { ref: '04-painel-aberto', url: '?tela=T07&painel=1' },
  // as famílias na coluna: a T13 inteira, num estado, com o recuo (o GPS reprovado)
  { ref: '05-coluna-com-familias', url: '?tela=T13&estado=22-estado-gps-reprovado' },
]
// a linha normal do painel, que o 00 desenha com a T07: o painel aberto numa tela que não é a T07
const AUX = { ref: 'painel-noutra-tela', url: '?tela=T04&painel=1' }
// a coluna num estado, que o 00 desenha com a T04 no Módulo com falha
const AUX_ESTADO = { ref: 'coluna-T04-num-estado', url: '?tela=T04&estado=03-estado-faixa-modulo-com-falha' }

// o que já se sabe que difere, peça a peça: a bancada mostra o número e diz por quê.
// A chave é "<quadro>/<peça>"; sem ela, vale a da peça. O texto só leva nota quando o quadro diz outra coisa.
const MARCADOR = 'o quadrado vazado de 11 por dentro (lei do marcador, decisão 15); o quadro desenha 11 mais a borda, 13'
const NOTAS = {
  'inteiro': 'o quadro inteiro só informa: o celular a 90% com o PNG dentro (338,4 × 734,4, no topo a 82,8), o quadrado a 24 e sem etiqueta, contra o palco.md: o celular em tamanho real, rodando (376 × 816, no topo a 42)',
  '04-painel-aberto/inteiro': 'o quadro inteiro só informa: o celular a 90% com o PNG dentro (338,4 × 734,4, no topo a 82,8), o quadrado a 24 e sem etiqueta, contra o palco.md: o celular em tamanho real, rodando (376 × 816, no topo a 42); e o quadro põe o celular e a coluna 90 à direita com o painel aberto, e o palco não os mexe: o painel passa por cima (palco.md, o 00: "não se mexe quando o painel abre")',
  'moldura': 'o palco em escala (734/816) contra o quadro a 90% desenhado à mão: o quadro escala a borda, o canto e a sombra (7,2 · 32,4 · 10,8 e 21,6) e deixa o fio de luz e o contorno em 1, e o palco escala a silhueta inteira, os fios também (0,9), e cai em 734 e não 734,4 — a moldura em tamanho real é da conferência da moldura',
  'quadrado': 'o LayoutGrid do Lucide contra os quatro quadrados desenhados à mão',
  'painel': 'o X e o RotateCcw do Lucide, no traço 1,8, contra os desenhados à mão no traço 2',
  'coluna': MARCADOR,
  '02-num-estado/coluna': MARCADOR + '; e o Undo2 do Lucide no Voltar ao fluxo',
  '03-tela-com-muitos-estados/coluna': 'o nome do grupo (O MÓDULO, A CAN) na tinta e na letra do rótulo de 10, e não em --marca-limite e 1,4 (lei 11); e ' + MARCADOR,
  '04-painel-aberto/coluna': 'o quadro desenha os 7 estados da T07 sem os grupos, e a coluna os agrupa em O MÓDULO e A CAN, como o 02, o 03 e o 00 desenham (a regra dos seis, palco.md); e ' + MARCADOR,
  // a coluna lista os estados com o campo `coluna` do indice.json — na T04, 4 dos 7, como o quadro 01
  'coluna-no-fluxo': 'a folha desenha 3 linhas da coluna da T04, e a coluna tem 4 — as do campo coluna do indice.json, como o quadro 01 (o Sem conexão é a quarta); e ' + MARCADOR,
  'coluna-num-estado': 'a folha desenha 3 linhas da coluna da T04, e a coluna tem 4 — as do campo coluna do indice.json, como o quadro 01 (o Sem conexão é a quarta); e ' + MARCADOR + '; e o Undo2 do Lucide no Voltar ao fluxo',
  // a cena 05: a T13 com o recuo, as 20 linhas de 30 da coluna longa
  '05-coluna-com-familias/coluna': 'a cena 05 desenha as 18 linhas da T13 com 30, e a coluna cabe com as de 32 do palco.md; e a coluna tem a consulta Alimentação · relendo, na nota dos textos; e ' + MARCADOR,
  'coluna-T07': 'a lista dos grupos: o nome do grupo na tinta e na letra do rótulo de 10, e não em --marca-limite e 1,4 (lei 11); e ' + MARCADOR,
}
const notaDe = (nome, nomePeca) => NOTAS[`${nome}/${nomePeca}`] ?? NOTAS[nomePeca]
// o momento que nasce de um estado fica na coluna (o `depoisDe`): a
// cena 02 desenha o Atualizando o firmware, e a 03 e a 04 ainda não
const DEPOIS_DE = 'a coluna põe o Atualizando o firmware logo depois do Firmware fora da lista (o depoisDe), como a cena 02 desenha; este quadro ainda não'
// a T04/16, a fila parada, está na coluna da T04, e o quadro 01 não a desenha
const FILA_PARADA = 'a coluna da T04 tem a Fila parada (T04/16); o quadro 01 desenha a coluna sem ela'
// a cena 05 desenha a coluna da T13 (sem a Seção E, com o Registrado sem localização); a releitura da
// Alimentação, uma consulta parada, está na família, e a cena não a desenha
const RELENDO = 'a coluna da T13 tem a consulta Alimentação · relendo (T13/29), uma consulta parada na família da Alimentação; a cena 05 não a desenha'
const NOTAS_TEXTO = {
  '05-coluna-com-familias/coluna': RELENDO,
  '01-no-fluxo/coluna': FILA_PARADA,
  '03-tela-com-muitos-estados/coluna': DEPOIS_DE,
  '04-painel-aberto/coluna': NOTAS['04-painel-aberto/coluna'].split('; e ')[0] + '; e ' + DEPOIS_DE,
  '04-painel-aberto/painel': 'o pé diz a data da última atualização (Atualizado em …), no lugar do Recomeçar do login (a T01 do painel já zera o estado e abre o login); o quadro desenha o botão',
}

// o script que vai no fim da cópia do quadro: mede as peças e escreve a medida.
// No 00, leva cada espécime ao pixel inteiro, como a bancada das telas (a folha cai em y fracionário).
const SCRIPT = `<script>(()=>{new Promise(ok=>document.readyState==='complete'?ok():addEventListener('load',ok,{once:true}))
.then(()=>document.fonts.ready).then(()=>{
  const cx=(e)=>{if(!e)return null;const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}};
  const inteiro=(e)=>{const r=e.getBoundingClientRect(),dx=Math.round(r.x)-r.x,dy=Math.round(r.y)-r.y;if(dx||dy){e.style.position='relative';e.style.left=dx+'px';e.style.top=dy+'px'}return e};
  const conteudo=(el)=>{const f=[...el.children].map(cx);return f.length?{x:f[0].x,y:f[0].y,w:Math.max(...f.map(c=>c.w)),h:f.at(-1).y+f.at(-1).h-f[0].y}:null};
  const divs=[...document.querySelectorAll('div')], spans=[...document.querySelectorAll('span')];
  const m={W:innerWidth,H:innerHeight};
  if(document.title.includes('00-componentes')){
    m.quadrados=spans.filter(e=>e.style.width==='44px'&&e.style.height==='44px').map(inteiro).map(cx);
    m.linhas=divs.filter(e=>e.style.width==='280px'&&e.style.height==='34px').map(inteiro).map(cx);
    const cols=divs.filter(e=>/dashed/.test(e.style.border)&&e.children.length>1).map(inteiro);m.colunas=cols.map(conteudo);m.listas=cols.map(e=>cx(e.lastElementChild));
    // O CELULAR: a moldura dos quadros, em escala (transform), com a tela do menu dentro;
    // os raios saem na escala da foto
    const ce=divs.find(e=>e.children.length===1&&e.firstElementChild.tagName==='IMG');
    if(ce){inteiro(ce.parentElement.parentElement);const s=getComputedStyle(ce),k=cx(ce).w/ce.offsetWidth;m.celular={celular:cx(ce),tela:cx(ce.firstElementChild),moldura:{borda:parseFloat(s.paddingTop)*k+'px',raioFora:parseFloat(s.borderTopLeftRadius)*k+'px',raioTela:parseFloat(getComputedStyle(ce.firstElementChild).borderTopLeftRadius)*k+'px'}}}
  }else{
    m.quadrado=cx(document.querySelector('a[aria-label="Telas do protótipo"]'));
    // o celular: a caixa da moldura, com a imagem da tela dentro (decisão 43: a borda da silhueta no recheio)
    const fr=divs.find(e=>e.children.length===1&&e.firstElementChild.tagName==='IMG');m.celular=cx(fr);m.tela=fr?cx(fr.firstElementChild):null;
    if(fr){const s=getComputedStyle(fr);m.moldura={borda:[s.paddingTop,s.paddingRight,s.paddingBottom,s.paddingLeft],bordaCor:s.backgroundColor,raioFora:s.borderTopLeftRadius,sombras:s.boxShadow,raioTela:getComputedStyle(fr.firstElementChild).borderTopLeftRadius}}
    const p=divs.find(e=>e.style.width==='280px'&&e.style.left==='0px');m.painel=cx(p);
    m.linhas=p?Object.fromEntries([...p.querySelectorAll('a[href^="#T"]')].map(a=>[a.firstElementChild.textContent.trim(),cx(a)])):{};
    const c=divs.find(e=>e.style.width==='230px'&&e.style.justifyContent==='center');m.coluna=cx(c);m.conteudo=c?conteudo(c):null;
    const textos=(e)=>{const l=[];if(!e)return l;const w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(let n=w.nextNode();n;n=w.nextNode()){const t=n.textContent.replace(/\\s+/g,' ').trim();if(!t)continue;if(n.previousSibling&&n.previousSibling.nodeType===3&&l.length)l[l.length-1]=(l[l.length-1]+' '+t).trim();else l.push(t)}return l};
    m.textos={painel:textos(p),coluna:textos(c)};
  }
  const o=document.createElement('pre');o.id='m2cf-out';o.style.display='none';o.textContent=JSON.stringify(m);document.body.appendChild(o)})})()</script>`

const lerPre = (html) => {
  const m = html.match(/<pre id="m2cf-out"[^>]*>([\s\S]*?)<\/pre>/); if (!m) throw new Error('sem medida')
  return JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'))
}

// o quadro: uma cópia com o script de medida (a mesma na medida e na foto), as fontes pelo caminho inteiro
function quadro(nome, h) {
  const html = readFileSync(resolve(REF, 'html', nome + '.html'), 'utf8').replace(/(\.\.\/)+05-recursos\//g, 'file://' + raiz + '/05-recursos/')
  const tmp = resolve(TMP, `palco-${nome}-${process.pid}.html`)
  writeFileSync(tmp, html.replace('</body>', SCRIPT + '</body>'))
  try {
    const medida = lerPre(dom('file://' + tmp, { w: W, h }))
    foto('file://' + tmp, resolve(OUT, nome + '-html.png'), { w: W, h, escala: 1 })
    return { medida, png: PNG.sync.read(readFileSync(resolve(OUT, nome + '-html.png'))) }
  } finally { rmSync(tmp, { force: true }) }
}
// o palco, no mesmo lugar (h: a altura da janela; a peça da moldura usa a de 792, e grava com o sufixo)
function palco({ ref, url }, h = H, sufixo = '') {
  const u = `${DEV}/${url}&medir=1`
  const medida = lerPre(dom(u, { w: W, h }))
  foto(u, resolve(OUT, ref + sufixo + '-app.png'), { w: W, h, escala: 1 })
  return { medida, png: PNG.sync.read(readFileSync(resolve(OUT, ref + sufixo + '-app.png'))) }
}

function recorta(png, x, y, w, h) {
  const out = new PNG({ width: w, height: h }) // o que cai fora da foto fica transparente, e conta como diferença
  const x0 = Math.max(0, x), y0 = Math.max(0, y), x1 = Math.min(png.width, x + w), y1 = Math.min(png.height, y + h)
  if (x1 > x0 && y1 > y0) PNG.bitblt(png, out, x0, y0, x1 - x0, y1 - y0, x0 - x, y0 - y)
  return out
}
const pct = (n, w, h) => +(100 * n / (w * h)).toFixed(2)
function difere(A, B, saida) {
  const { width: w, height: h } = A
  const diff = new PNG({ width: w, height: h })
  const fino = pixelmatch(A.data, B.data, diff.data, w, h, { threshold: 0.1 })
  const grosso = pixelmatch(A.data, B.data, null, w, h, { threshold: 0.5 })
  if (saida) writeFileSync(saida, PNG.sync.write(diff))
  return { fino: pct(fino, w, h), estrutural: pct(grosso, w, h) }
}
// uma peça: a caixa do quadro contra a do palco, com uma folga em volta (a peça fora do lugar aparece);
// o tamanho é o maior dos dois, pra peça que cresceu ou encolheu também aparecer
function peca(nome, nomePeca, A, ca, B, cb, folga = 8) {
  if (!ca || !cb) return { quadro: nome, peca: nomePeca, erro: `${!ca ? 'o quadro' : 'o palco'} não tem a peça` }
  const w = Math.round(Math.max(ca.w, cb.w)) + 2 * folga, h = Math.round(Math.max(ca.h, cb.h)) + 2 * folga
  const a = recorta(A, Math.round(ca.x) - folga, Math.round(ca.y) - folga, w, h)
  const b = recorta(B, Math.round(cb.x) - folga, Math.round(cb.y) - folga, w, h)
  const base = resolve(OUT, `${nome}-${nomePeca}`)
  writeFileSync(base + '-html.png', PNG.sync.write(a)); writeFileSync(base + '-app.png', PNG.sync.write(b))
  const r = { quadro: nome, peca: nomePeca, ...difere(a, b, base + '-diff.png'),
    quadroEm: [ca.x, ca.y, ca.w, ca.h].map((v) => +v.toFixed(2)), palcoEm: [cb.x, cb.y, cb.w, cb.h].map((v) => +v.toFixed(2)) }
  const nota = notaDe(nome, nomePeca); if (nota && r.fino > 0) r.nota = nota
  return r
}

// a moldura desenhada: o anel da moldura dos dois, com a tela apagada — o retângulo de cantos redondos da tela do
// quadro, 1 pra dentro da borda, some nos dois —, a caixa do quadro contra a do palco, com 4 de folga pro fio de fora
function anel(nome, A, ca, B, cb, folga = 4) {
  if (!ca?.celular || !cb?.celular) return { quadro: nome, peca: 'moldura', erro: `${!ca?.celular ? 'o quadro' : 'o palco'} não tem o celular` }
  const qa = ca.celular, qb = cb.celular
  const w = Math.round(Math.max(qa.w, qb.w)) + 2 * folga, h = Math.round(Math.max(qa.h, qb.h)) + 2 * folga
  const a = recorta(A, Math.round(qa.x) - folga, Math.round(qa.y) - folga, w, h)
  const b = recorta(B, Math.round(qb.x) - folga, Math.round(qb.y) - folga, w, h)
  // a tela do quadro, relativa à caixa: o lado da moldura e o canto dela
  const t = ca.tela.x - qa.x - 1, r = parseFloat(ca.moldura.raioTela) + 1
  const x0 = folga + t, y0 = folga + t, x1 = folga + qa.w - t, y1 = folga + qa.h - t
  const dentro = (x, y) => {
    if (x < x0 || x >= x1 || y < y0 || y >= y1) return false
    const cx = x < x0 + r ? x0 + r : x >= x1 - r ? x1 - r : x, cy = y < y0 + r ? y0 + r : y >= y1 - r ? y1 - r : y
    return (x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 <= r * r
  }
  let apagados = 0
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (dentro(x, y)) { apagados++; const i = (y * w + x) * 4; for (const p of [a, b]) p.data.fill(0, i, i + 4) }
  const base = resolve(OUT, `${nome}-moldura`)
  writeFileSync(base + '-html.png', PNG.sync.write(a)); writeFileSync(base + '-app.png', PNG.sync.write(b))
  const d = difere(a, b, base + '-diff.png'), anelPx = w * h - apagados
  // a porcentagem é do anel, não da caixa: a tela apagada é igual nos dois e não conta
  const noAnel = (v) => +(v * w * h / anelPx).toFixed(2)
  const r2 = { quadro: nome, peca: 'moldura', fino: noAnel(d.fino), estrutural: noAnel(d.estrutural),
    quadroEm: [qa.x, qa.y, qa.w, qa.h].map((v) => +v.toFixed(2)), palcoEm: [qb.x, qb.y, qb.w, qb.h].map((v) => +v.toFixed(2)) }
  if (r2.fino > 0) r2.nota = notaDe(nome, 'moldura')
  return r2
}

// a conferência da moldura, em tamanho real: cada número do palco.md contra o que o palco desenhou (1440 × 900)
const moldura = []
const confere = (quadro, o, esperado, tem) => moldura.push({ quadro, o, ok: JSON.stringify(esperado) === JSON.stringify(tem), esperado, tem })
const perto = (a, b) => Math.abs(a - b) <= 0.5
function confereMoldura(nome, m) {
  const c = m.celular, f = m.moldura, co = m.coluna, px = (v) => parseFloat(v)
  if (!c || !f) return confere(nome, 'o celular', 'medido', 'sem o celular')
  confere(nome, 'o tamanho por fora', MOLDURA.fora, [c.w, c.h])
  confere(nome, 'a tela', MOLDURA.tela, [f.tela.w, f.tela.h])
  confere(nome, 'sem metal: nenhuma borda de CSS', Array(4).fill(0), f.lados.map(px))
  confere(nome, 'a borda quase-preta, nos quatro lados', Array(4).fill(MOLDURA.borda).concat(MOLDURA.bordaCor), f.borda.map(px).concat(f.bordaCor))
  confere(nome, 'a tela dentro da borda', [c.x + MOLDURA.borda, c.y + MOLDURA.borda], [f.tela.x, f.tela.y])
  confere(nome, 'o canto: por fora e na tela, concêntricos', [Array(4).fill(MOLDURA.raioFora), MOLDURA.raioTela], [f.raios.map(px), px(f.raioTela)])
  confere(nome, 'o fio de luz por dentro, o contorno por fora e a sombra embaixo', MOLDURA.sombras, f.sombras)
  confere(nome, 'no centro da janela: a mesma folga dos dois lados', [true, true], [perto(c.x, m.W - c.x - c.w), perto(c.y, m.H - c.y - c.h)])
  if (co) confere(nome, 'a coluna a 40, com a altura do celular', [c.x + c.w + MOLDURA.coluna, c.y, c.h], [co.x, co.y, co.h])
}
// o quadro, a 90%: as mesmas relações, só de informação (a norma é o tamanho real)
const doQuadro = []
function informaQuadro(nome, m) {
  const c = m.celular, co = m.coluna; if (!c) return
  const r = { quadro: nome, caixa: [c.x, c.y, c.w, c.h], folgas: { esquerda: c.x, direita: m.W - c.x - c.w, cima: c.y, baixo: m.H - c.y - c.h },
    borda: m.moldura.borda[0], raios: [m.moldura.raioFora, m.moldura.raioTela], coluna: co ? { distancia: co.x - c.x - c.w, altura: co.h, topo: co.y } : null }
  r.noCentro = perto(r.folgas.esquerda, r.folgas.direita) && perto(r.folgas.cima, r.folgas.baixo)
  doQuadro.push(r)
}

// os textos da peça, na ordem, contra os do quadro (o palco não tem textos.md: o texto dele é o do quadro)
const textos = []
function confereTextos(nome, nomePeca, norma, tem) {
  const ok = JSON.stringify(norma) === JSON.stringify(tem)
  const r = { quadro: nome, peca: nomePeca, ok }
  if (!ok) { r.falta = norma.filter((t) => !tem.includes(t)); r.sobra = tem.filter((t) => !norma.includes(t)); if (!r.falta.length && !r.sobra.length) r.ordem = true }
  const nota = NOTAS_TEXTO[`${nome}/${nomePeca}`]; if (nota && !ok) r.nota = nota
  textos.push(r)
}

const res = []
const fotos = {}
for (const q of QUADROS) {
  const R = quadro(q.ref, H), P = palco(q); fotos[q.ref] = P
  confereMoldura(q.ref, P.medida); informaQuadro(q.ref, R.medida)
  // a moldura desenhada: no fluxo e num estado (uma moldura só), com o palco na altura do quadro
  if (!q.url.includes('painel=1') && q.ref !== '03-tela-com-muitos-estados') { const M = palco(q, H_MOLDURA, '-escala'); res.push(anel(q.ref, R.png, R.medida, M.png, M.medida)) }
  confereTextos(q.ref, 'coluna', R.medida.textos.coluna, P.medida.textos.coluna)
  if (q.url.includes('painel=1')) confereTextos(q.ref, 'painel', R.medida.textos.painel, P.medida.textos.painel)
  res.push({ quadro: q.ref, peca: 'inteiro', ...difere(R.png, P.png, resolve(OUT, q.ref + '-diff.png')), nota: NOTAS.inteiro })
  // o quadrado: no 04 ele fica embaixo do painel, nos dois
  if (!q.url.includes('painel=1')) res.push(peca(q.ref, 'quadrado', R.png, R.medida.quadrado, P.png, P.medida.quadrado))
  res.push(peca(q.ref, 'coluna', R.png, R.medida.conteudo, P.png, P.medida.conteudo))
  if (q.url.includes('painel=1')) res.push(peca(q.ref, 'painel', R.png, R.medida.painel, P.png, P.medida.painel, 0))
}
// o 00, a folha: cada espécime contra a peça numa das fotos do palco
{
  const R = quadro('00-componentes', H00), P = palco(AUX), E = palco(AUX_ESTADO), m = R.medida
  const f = (ref) => fotos[ref]
  res.push(peca('00-componentes', 'quadrado', R.png, m.quadrados[0], f('01-no-fluxo').png, f('01-no-fluxo').medida.quadrado, 0))
  // a linha tem 280 na folha e 279 no painel, que fecha com a borda da direita: compara os 279
  const linha = (c) => c && { ...c, w: Math.min(c.w, P.medida.linhas.T07?.w ?? c.w) }
  res.push(peca('00-componentes', 'linha-normal', R.png, linha(m.linhas[0]), P.png, P.medida.linhas.T07, 0))
  res.push(peca('00-componentes', 'linha-aberta', R.png, linha(m.linhas[2]), f('04-painel-aberto').png, f('04-painel-aberto').medida.linhas.T07, 0))
  // as duas primeiras colunas da folha são a da T04: no fluxo (o 01) e no Módulo com falha
  res.push(peca('00-componentes', 'coluna-no-fluxo', R.png, m.colunas[0], f('01-no-fluxo').png, f('01-no-fluxo').medida.conteudo))
  res.push(peca('00-componentes', 'coluna-num-estado', R.png, m.colunas[1], E.png, E.medida.conteudo))
  // a da T07, pela lista: a folha não desenha o lugar fixo do topo (decisão 30), e a lista dos grupos fica comparável
  res.push(peca('00-componentes', 'coluna-T07', R.png, m.listas[2], f('03-tela-com-muitos-estados').png, f('03-tela-com-muitos-estados').medida.lista))
  // O CELULAR: a miniatura contra o palco numa janela em que a escala dá a altura dela ((369 − 48) / 816 = 321 / 816)
  if (m.celular) { const M = palco({ ref: '00-componentes', url: '?tela=T04' }, Math.round(m.celular.celular.h) + 48, '-escala'); res.push(anel('00-componentes', R.png, m.celular, M.png, { ...M.medida, tela: M.medida.moldura?.tela })) }
  else res.push({ quadro: '00-componentes', peca: 'moldura', erro: 'a folha não tem O CELULAR' })
}
// uma moldura só (decisão 43): num estado, a mesma do fluxo; e o painel aberto não mexe o celular nem a coluna
{
  const m = (ref) => fotos[ref].medida
  confere('02-num-estado', 'a mesma moldura do fluxo', m('01-no-fluxo').moldura && { ...m('01-no-fluxo').moldura, tela: null }, m('02-num-estado').moldura && { ...m('02-num-estado').moldura, tela: null })
  confere('04-painel-aberto', 'o celular e a coluna no lugar de sem o painel', [m('02-num-estado').celular, m('02-num-estado').coluna], [m('04-painel-aberto').celular, m('04-painel-aberto').coluna])
}

for (const r of res) console.log(`${r.quadro} · ${r.peca} · ${r.erro ? 'ERRO ' + r.erro : `${r.fino}% (estrutural ${r.estrutural}%)`}${r.nota ? ' · ' + r.nota : ''}`)
console.log('')
for (const t of textos) {
  console.log(t.ok ? `OK     textos · ${t.quadro} · ${t.peca}` : `FALHA  textos · ${t.quadro} · ${t.peca}${t.ordem ? ' — os textos batem, a ordem não' : ''}${t.nota ? ' · ' + t.nota : ''}`
    + (t.falta?.length ? '\n         falta: ' + t.falta.map((x) => '`' + x + '`').join(' · ') : '') + (t.sobra?.length ? '\n         sobra: ' + t.sobra.map((x) => '`' + x + '`').join(' · ') : ''))
}
console.log('')
for (const c of moldura) console.log(`${c.ok ? 'OK    ' : 'FALHA '} moldura · ${c.quadro} · ${c.o}${c.ok ? '' : ` — pede ${JSON.stringify(c.esperado)}, tem ${JSON.stringify(c.tem)}`}`)
for (const q of doQuadro) console.log(`       o quadro · ${q.quadro} · a 90%: ${q.caixa.slice(2).join(' × ')} em ${q.caixa.slice(0, 2).join(', ')} · ${q.noCentro ? 'no centro' : `fora do centro (folgas ${Object.values(q.folgas).join(' · ')})`} · borda ${q.borda}, canto ${q.raios.join(' e ')}${q.coluna ? ` · a coluna a ${q.coluna.distancia}, com ${q.coluna.altura} de altura` : ''}`)
writeFileSync(resolve(OUT, 'relatorio.json'), JSON.stringify(res, null, 1))
writeFileSync(resolve(OUT, 'textos.json'), JSON.stringify(textos, null, 1))
writeFileSync(resolve(OUT, 'moldura.json'), JSON.stringify({ conferencias: moldura, quadros: doQuadro }, null, 1))
const erros = res.filter((r) => r.erro)
// o texto que difere sem nota é falha; com nota, é a diferença explicada
const textoRuim = textos.filter((t) => !t.ok && !t.nota)
const molduraRuim = moldura.filter((c) => !c.ok)
console.log(`\n${res.length} peças · ${res.filter((r) => r.fino === 0).length} em 0% · ${erros.length} com erro · prints/palco/relatorio.json`)
console.log(`${textos.length} textos · ${textos.filter((t) => t.ok).length} conferem · ${textos.filter((t) => !t.ok && t.nota).length} com a diferença explicada · ${textoRuim.length} falham`)
console.log(`${moldura.length} conferências da moldura · ${moldura.length - molduraRuim.length} batem · ${molduraRuim.length} falham · prints/palco/moldura.json`)
const [baseArq] = process.argv.slice(2)
if (baseArq) {
  const base = JSON.parse(readFileSync(resolve(process.cwd(), baseArq), 'utf8'))
  const antes = new Map(base.map((r) => [`${r.quadro}/${r.peca}`, r.fino]))
  const chave = (r) => `${r.quadro}/${r.peca}`
  const pior = res.filter((r) => antes.has(chave(r)) && (r.fino ?? 100) > (antes.get(chave(r)) ?? 100) + 0.01)
  const melhor = res.filter((r) => antes.has(chave(r)) && (r.fino ?? 100) < (antes.get(chave(r)) ?? 100) - 0.01)
  for (const r of pior) console.log(`PIOROU   ${chave(r)} · ${antes.get(chave(r))}% → ${r.fino ?? r.erro}%`)
  for (const r of melhor) console.log(`MELHOROU ${chave(r)} · ${antes.get(chave(r))}% → ${r.fino}%`)
  console.log(pior.length ? `${pior.length} peça(s) pioraram contra a base` : 'nenhuma peça piorou contra a base')
  process.exitCode = pior.length || erros.length || textoRuim.length || molduraRuim.length ? 1 : 0
} else process.exitCode = erros.length || textoRuim.length || molduraRuim.length ? 1 : 0
