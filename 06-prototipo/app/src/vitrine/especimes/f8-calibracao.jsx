// Folha 8 · a calibração (T10): o que o módulo conta, a distância até o
// painel, o número que vai, o painel antes de digitar
// e o que não se aplica. Os textos são os da T10, e os números, os do caminhão
// coletor (a-09) no mock, pelas mesmas funções da tela: o ônibus lê o painel pela
// CAN e não calibra nada (decisão 59), e a folha desenha o caminhão.
import { ValorEmPoco, ReguaDiferenca, ValorAlvo, Declarado } from '../../ds/instrumentos/index.js'
import { moduloConta, painelMostra, grandezaDe } from '../../telas/T10/calibracao.js'
import { T } from '../../telas/T10/textos.js'
import { milhar } from '../../dados/formato.js'

const CAMINHAO = 'a-09'
const hodometro = grandezaDe('hodometro')
const conta = moduloConta(CAMINHAO, 'hodometro')       // 87.604
const painel = painelMostra(CAMINHAO, 'hodometro')     // 87.712

export const especimes = [
  { id: 'f8-valor-em-poco', folha: 8, rotulo: 'valor em poço', legenda: 'o que o módulo conta hoje',
    render: () => <ValorEmPoco rotulo={T.moduloConta} valor={milhar(conta)} unidade={hodometro.unidade} /> },
  // a régua diz o lado (decisão 64): *o painel está 108 km à frente*
  { id: 'f8-regua-da-diferenca', folha: 8, rotulo: 'régua da diferença', legenda: 'a distância e o lado · vira "confere" depois',
    render: () => <ReguaDiferenca>{T.diferenca(milhar(Math.abs(painel - conta)), hodometro.unidade, painel >= conta)}</ReguaDiferenca> },
  { id: 'f8-valor-alvo', folha: 8, rotulo: 'o valor alvo', legenda: 'o número do painel, o que vai pro módulo',
    render: () => <ValorAlvo rotulo={T.painel} valor={milhar(painel)} unidade={hodometro.unidade} legenda={T.alvoVai} /> },
  // decisão 33: o campo do painel antes de digitar
  { id: 'f8-painel-vazio', folha: 8, rotulo: 'o painel · vazio', legenda: 'antes de digitar · o traço em tinta apagada, sem o lima',
    render: () => <ValorAlvo vazio rotulo="O PAINEL MOSTRA" valor="—" unidade="km" legenda="toque e digite o que o painel mostra" /> },
  { id: 'f8-nao-se-aplica', folha: 8, rotulo: 'o que não se aplica', legenda: 'fato declarado, sem vermelho',
    render: () => (
      <Declarado aoPe rotulo="NÃO SE APLICAM NESTE MODELO"
        linhas={[{ nome: 'Rotação', motivo: 'já vem da CAN' }, { nome: 'Velocidade', motivo: 'não precisa' }]} />
    ) },
]
