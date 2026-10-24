// Duas ideias numa linha (componentes.md): o rótulo com duas ideias que não
// cabe quebra entre elas, em linhas de verdade, e não onde o navegador decidir. O texto
// vem como lista, uma ideia por item; um texto só passa como está.
import { Fragment } from 'react'

export function emLinhas(texto) {
  if (!Array.isArray(texto)) return texto
  return texto.map((t, i) => <Fragment key={t}>{i > 0 && <br />}{t}</Fragment>)
}
