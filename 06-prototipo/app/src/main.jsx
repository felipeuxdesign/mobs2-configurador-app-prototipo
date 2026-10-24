// A ordem importa: primeiro os tokens e a fonte, depois o palco e o app.
import '../../../03-design-system/tokens.css'
import '../../../05-recursos/fontes/barlow.css'
import './palco/palco-tokens.css'
import './palco/palco.css'
import { createRoot } from 'react-dom/client'
import { EstadoProvider, semeado } from './estado/estado.jsx'
import { Palco } from './palco/Palco.jsx'
import { lerUrl, recarregou } from './palco/rotas.js'

// a URL abre o lugar: o estado único nasce semeado na tela, no estado ou no momento dela ·
// recarregada, a página recomeça do login (rotas.js)
const lido = lerUrl()
const u = recarregou() && !lido.print ? { ...lido, tela: 'T01', estado: null, momento: null } : lido
const inicial = semeado(u.tela, { estado: u.estado, momento: u.momento, fluxo: !u.print })

createRoot(document.getElementById('raiz')).render(
  <EstadoProvider inicial={inicial}>
    <Palco />
  </EstadoProvider>,
)
