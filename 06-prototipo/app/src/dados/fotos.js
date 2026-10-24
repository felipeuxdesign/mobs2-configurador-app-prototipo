// As fotos de exemplo do checklist (decisão 63): o protótipo não tem câmera, e o
// Tirar foto mostra no quadro uma foto desenhada de cada item da Montagem e do
// problema (M.checklist.fotosDeExemplo). As fotos são dado, como o mock: moram em
// 04-dados/fotos/ e entram como texto, sem cópia (publicar.md) — o SVG vai inline
// no quadro, o mesmo das referências, e por isso sai nítido em qualquer escala.
// No arquivo, a abertura tem a largura e a altura da foto; no quadro, a abertura
// fica sem elas, com a classe que preenche o quadro (o corte é o do
// preserveAspectRatio, xMidYMid slice, como o visor). Depois da abertura, o
// arquivo é igual, byte a byte. Cada foto tem os ids com um prefixo dela: duas
// fotos diferentes na mesma página não se chocam.
import { M } from './mock.js'

const ARQUIVOS = import.meta.glob('../../../../04-dados/fotos/*.svg', { query: '?raw', import: 'default', eager: true })
const doMock = (caminho) => Object.entries(ARQUIVOS).find(([k]) => k.endsWith(`/04-dados/${caminho}`))?.[1] ?? null

// o SVG da foto, pronto pro quadro: a abertura trocada, o resto igual ao arquivo
// · `prefixo`: a mesma foto duas vezes na mesma página (só na vitrine) ganha um prefixo a mais nos ids da segunda (a folha 7 usa `a7-`)
function noQuadro(svg, prefixo) {
  if (!svg) return null
  const fim = svg.indexOf('>')
  const abertura = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" class="ds-visor-foto-svg">'
  let corpo = svg.slice(fim + 1).trim()
  if (prefixo) {
    const ids = [...corpo.matchAll(/id="([a-z]+-)/g)].map((m) => m[1])
    const de = ids[0]
    if (de) corpo = corpo.split(`"${de}`).join(`"${prefixo}${de}`).split(`#${de}`).join(`#${prefixo}${de}`)
  }
  return abertura + corpo
}

// a foto de exemplo do item da Montagem (pelo id do item) ou do problema ('problema') ·
// a do painel é a do ativo da sessão, com o que o painel dele mostra
export function fotoDeExemplo(id, ativoId, prefixo) {
  const f = M.checklist.fotosDeExemplo[id]
  const caminho = f && typeof f === 'object' ? f[ativoId] : f
  return caminho ? noQuadro(doMock(caminho), prefixo) : null
}
