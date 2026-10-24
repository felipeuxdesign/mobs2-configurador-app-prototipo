// A foto que prova (folha 7): um componente, dois estados.
// · A tirar: o cartão tocável inteiro (o fundo e a borda da lista, o raio), com o
//   nome da ação (o título) — a câmera no poço de 44, o título, a legenda que diz
//   pra que ela serve e a seta. O pressionado é o do Tocavel, por cima, sem mudar
//   nenhum pixel.
// · Tirada (a foto · tirada, decisão 63): o registro dentro do quadro da câmera,
//   embaixo da foto (VisorCamera) — a hora da foto e o que ela pede ou pra onde vai
//   (*Foto tirada às 14:30* e *confira se está nítida antes de usar*, T13/44 a 48;
//   *Problema fotografado às 14:30* e *vai junto com a ressalva, pro gestor*, T13/15),
//   com o traço da divisória em cima · sem o check e sem o poço: a foto ainda não
//   vale, e o lima é só do veredito · sem toque: não é botão pro leitor de tela, é o
//   que aconteceu. Ele não tem movimento próprio: entra com a foto, nos mesmos 150.
import { Icone, Poco, Tocavel } from '../index.js'
import './FotoProva.css'

export function FotoProva({ titulo, legenda, tirada = false, aoTocar, rotulo }) {
  const texto = (
    <span className="ds-foto-texto">
      <span className="ds-foto-titulo">{titulo}</span>
      <span className="ds-foto-legenda">{legenda}</span>
    </span>
  )
  if (tirada) return <div className="ds-foto-tirada">{texto}</div>
  return (
    <Tocavel rotulo={rotulo ?? titulo} aoTocar={aoTocar} className="ds-foto">
      <Poco tam={44}><Icone nome="camera" tam={20} cor="secundaria" /></Poco>
      {texto}
      <Icone nome="avancar" tam={16} cor="apagada" />
    </Tocavel>
  )
}
