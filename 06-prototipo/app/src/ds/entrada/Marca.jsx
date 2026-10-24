// A marca no login (folha 6, T01): a logo da Mobs2 e, embaixo, o nome do
// app entre dois traços — a assinatura: o nome com a
// largura da logo (196), os fios crescendo até as bordas dela, e o rótulo sem o
// espaço do letter-spacing depois do último R. A logo é o arquivo do projeto (05-recursos/marca),
// nunca por endereço de fora. Lei 15: o desenho é uma cor só, e a cor vem do token
// --logo — lima no escuro, o roxo institucional no claro —, nunca de dentro do arquivo: o desenho entra
// inline, e o preenchimento dele vira currentColor (o arquivo continua com o lima, pras referências que
// o mostram como imagem). Quem prende a marca a 207 do topo (--marca-topo) é a tela.
import desenho from '../../../../../05-recursos/marca/logo-mobs2.svg?raw'
import './Marca.css'

// o desenho sem os metadados, sem o tamanho fixo (a largura é a da marca) e pintado pela cor do texto
const LOGO = desenho
  .replace(/<metadata>[\s\S]*?<\/metadata>/, '')
  .replace(/<svg\b[^>]*>/, (abre) => abre.replace(/\s(width|height)="[^"]*"/g, '').replace('<svg', '<svg aria-hidden="true" focusable="false"'))
  .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="currentColor"')

export function Marca({ nome, rotuloLogo }) {
  return (
    <div className="ds-marca">
      <span role="img" aria-label={rotuloLogo} className="ds-marca-logo" dangerouslySetInnerHTML={{ __html: LOGO }} />
      <div className="ds-marca-nome">
        <span className="ds-marca-traco" aria-hidden="true" />
        <span className="ds-marca-texto">{nome}</span>
        <span className="ds-marca-traco" aria-hidden="true" />
      </div>
    </div>
  )
}
