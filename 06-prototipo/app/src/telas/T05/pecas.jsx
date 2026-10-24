// As peças só da T05 (tela.md, "Peças do design system"): o que a tela
// desenha e não tem linha no componentes.md. Montadas com o que o design
// system já tem (a caixa de poço, Lei 4), só com tokens.
import { Poco, Icone, Glifo } from '../../ds/index.js'
import './pecas.css'

// 03 · o bloco do nenhum encontrado: a caixa de poço que cresce e ocupa o
// lugar da lista, centrada, com a marca tracejada em cima (o quadrado com o
// traço, muda pro leitor), o título e a frase. Não é o vazio declarado do
// componentes.md (tracejado, sem ícone): é peça desta tela.
// 16 · 17 (o mundo real): o mesmo bloco, com o poço de 44 e o ícone no lugar
// da marca — o Bluetooth riscado (lei 21), do desligado e do sem permissão (`icone`)
// 05 (lei 24): a busca que corre de novo — o poço de 44 com o quadrado
// branco de agora, de 16 (`agora`), o *Procurando…* e a frase (componentes.md · o poço
// numa leitura em andamento)
// 03 · embaixo da frase, o aviso das variantes sem Bluetooth (decisão 59): 13/500, na
// tinta apagada, centrado (`aviso`)
export function VazioDaBusca({ titulo, frase, aviso, icone, agora = false }) {
  return (
    <div className="t05-vazio ds-caixa-poco">
      {agora
        ? <Poco tam={44}><Glifo estado="agora" className="t05-vazio-agora" /></Poco>
        : icone
          ? <Poco tam={44}><Icone nome={icone} cor="secundaria" className="t05-vazio-icone" /></Poco>
          : <span className="t05-vazio-marca" aria-hidden="true" />}
      <span className="t05-vazio-titulo">{titulo}</span>
      <p className="t05-vazio-frase">{frase}</p>
      {aviso && <p className="t05-vazio-aviso">{aviso}</p>}
    </div>
  )
}
