// Folha 6 · o checkbox, nos dois estados (um componente só).
import { Checkbox } from '../../ds/index.js'

export const especimes = [
  { id: 'f6-checkbox', folha: 6, rotulo: 'checkbox', legenda: 'o marcador de escolha: poço de 24 com o vazado de 11, e o texto do que se confirma', render: () => <Checkbox>Lembrar meu usuário</Checkbox> },
  { id: 'f6-checkbox-marcado', folha: 6, rotulo: 'checkbox marcado', legenda: 'o mesmo poço, com o vazado virando lima de 11 · surge em 150ms', render: () => <Checkbox marcado>Lembrar meu usuário</Checkbox> },
]
