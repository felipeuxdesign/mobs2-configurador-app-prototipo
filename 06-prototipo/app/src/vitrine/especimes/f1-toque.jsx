// Folha 1 · os estados de toque do primário e do link.
import { Primario, Link } from '../../ds/index.js'

export const especimes = [
  { id: 'f1-primario-normal', folha: 1, rotulo: 'primário · normal', legenda: 'roxo com o texto lima', render: () => <Primario>Configurar módulo</Primario> },
  { id: 'f1-primario-pressionado', folha: 1, rotulo: 'primário · pressionado', legenda: 'o roxo clareia e afunda 2%', render: () => <Primario forcaToque>Configurar módulo</Primario> },
  { id: 'f1-primario-desabilitado', folha: 1, rotulo: 'primário · desabilitado', legenda: 'sem roxo · diz o que está acontecendo', render: () => <Primario desabilitado>Gravando · não interrompa</Primario> },
  { id: 'f1-link', folha: 1, rotulo: 'link · normal e pressionado', legenda: 'o cinza vira branco no toque', render: () => (<><Link>Voltar ao menu</Link><Link className="ds-forca-toque">Voltar ao menu</Link></>) },
]
