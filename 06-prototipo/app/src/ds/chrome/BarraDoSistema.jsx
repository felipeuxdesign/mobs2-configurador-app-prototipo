// A barra do sistema (folha 2 · lei 22 · decisão 43): é do celular, não do app —
// cenário fixo, sempre igual. O desenho é o oficial do Android, do kit do Material no Figma
// (05-recursos/sistema/barra-de-status-android.svg, 412 × 52): o 9:30, o Wi-Fi cheio, o sinal e a
// bateria pela metade · o espaço da câmera fica reservado no centro, sem desenhar. Um arquivo só:
// importado como texto, nada redesenhado à mão — só o recorte muda, o viewBox de 412 × 34,33 a partir
// do 12,90, que na largura da tela (360) dá os 30 de sempre (nada embaixo se move).
// Ela sangra no que vem logo embaixo (decisão 18): a faixa, a tira do menu ou a página. Sob o véu,
// escurece junto — uma camada de --veu por baixo do desenho, que entra por opacity com o véu da folha
// (200ms) ou do diálogo (150ms) e sai em 150ms. Pro leitor, uma imagem só, com o que ela mostra.
import desenho from '../../../../../05-recursos/sistema/barra-de-status-android.svg?raw'
import './BarraDoSistema.css'

// o recorte da barra nas telas (05-recursos/sistema/LEIA-ME.md): escalada pra 360 e cortada em 30
const RECORTE = '0 12.90 412 34.33'
const SVG = desenho.replace(/<svg\b[^>]*>/, (abre) => abre
  .replace(/\s(width|height)="[^"]*"/g, '')
  .replace(/viewBox="[^"]*"/, `viewBox="${RECORTE}" aria-hidden="true" focusable="false"`))

// fundo: 'faixa' (--fundo-faixa) · 'tira' (--poco, no menu) · 'pagina' (--fundo-pagina, sem sessão)
// veu: null · 'folha' · 'dialogo' — o que está aberto por cima da tela
export function BarraDoSistema({ fundo = 'faixa', veu = null }) {
  return (
    <div role="img" aria-label="9:30 · Wi-Fi, sinal e bateria"
      className={`ds-barra-sistema ds-barra-sistema-${fundo} ${veu ? `ds-barra-sistema-veu-${veu}` : ''}`}
      dangerouslySetInnerHTML={{ __html: SVG }} />
  )
}
