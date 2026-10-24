// A navegação por gestos (lei 22): a barra de baixo do sistema, cenário fixo — a pílula
// branca no centro, do kit do Material (05-recursos/sistema/navegacao-por-gestos.svg, 412 × 24). Um
// arquivo só, importado como texto e escalado pra largura da tela (360 × 20,97). Fica no pé do
// celular, em todas as telas, o login também, por cima de tudo — inclusive das folhas e dos véus —,
// sem receber toque e muda pro leitor: é do aparelho. Monta num lugar só, onde o celular monta a tela
// (App.jsx). O rodapé já reserva os 24px dela.
import desenho from '../../../../../05-recursos/sistema/navegacao-por-gestos.svg?raw'
import './NavegacaoPorGestos.css'

const SVG = desenho.replace(/<svg\b[^>]*>/, (abre) => abre
  .replace(/\s(width|height)="[^"]*"/g, '')
  .replace(/viewBox="/, 'aria-hidden="true" focusable="false" viewBox="'))

export function NavegacaoPorGestos() {
  return <div aria-hidden="true" className="ds-navegacao-gestos" dangerouslySetInnerHTML={{ __html: SVG }} />
}
