// O desenho de um ícone (a lei 14): o SVG exato do jogo de ícones, lido de
// 03-design-system/icones na hora de montar, nada copiado. O ícone é este desenho, nunca o
// parecido de uma biblioteca — o app não usa o lucide-react.
// · a cor vem do token, por currentColor, na peça que usa (o Icone, o Glifo)
// · o traço e o tamanho vêm da peça, pela classe (lei 14: 2,2 nos glifos de estado, 1,8 nas
//   ferramentas e nas folhas), como a referência de cada lugar
// · o vão de um risco (o olho riscado, o Bluetooth desligado, a câmera sem permissão) é pintado
//   na cor do fundo onde o ícone mora: o poço, por padrão; o campo, que é rebaixado, diz o dele
//   (--fundo-do-icone)
// · o 37b: o jogo tem 48, com as três setas das linhas (na grade de 20) e os quatro desenhos das
//   folhas · nenhum ícone se desenha aqui
const ARQUIVOS = import.meta.glob('../../../../../03-design-system/icones/*.svg', { query: '?raw', import: 'default', eager: true })

function ler(svg) {
  const caixa = /viewBox="([^"]+)"/.exec(svg)[1]
  const miolo = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
    .replace(/var\(--poco, #[0-9A-Fa-f]{6}\)/g, 'var(--fundo-do-icone, var(--poco))')
  return { caixa, miolo }
}

export const DESENHOS = Object.fromEntries(Object.entries(ARQUIVOS).map(([caminho, svg]) => [caminho.split('/').pop().replace(/\.svg$/, ''), ler(svg)]))

export function Desenho({ nome }) {
  const d = DESENHOS[nome]
  if (!d) throw new Error(`o ícone ${nome} não está no jogo (03-design-system/icones)`)
  return <svg className="ds-desenho" viewBox={d.caixa} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: d.miolo }} />
}
