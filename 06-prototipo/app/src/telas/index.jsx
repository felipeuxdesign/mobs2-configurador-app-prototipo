// O registro das telas: T01 a T16. Cada tela mora em src/telas/Tnn/index.jsx e
// exporta `default` (o componente). O registro acha as pastas sozinho, então um
// tela nova não mexe neste arquivo. Tela que ainda não existe cai na Vazia.
import { Vazia } from './Vazia.jsx'

const TELAS = Object.fromEntries(
  Object.entries(import.meta.glob('./T*/index.jsx', { eager: true })).map(([caminho, mod]) => [caminho.match(/T\d\d/)[0], mod.default]),
)

export function telaDe(id) { return TELAS[id] ?? ((p) => <Vazia tela={id} {...p} />) }
