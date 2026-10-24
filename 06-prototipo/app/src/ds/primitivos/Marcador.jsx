// Os marcadores (folha 3): o marcador de escolha e o LED da sessão.
import './Marcador.css'

// o marcador de escolha é um só (decisão 29): o quadrado de 11, vazado (a borda
// em --marca-vazia) no desmarcado e lima cheio no marcado. O poço é de quem usa:
// 24 no checkbox e na coluna do palco, 30 na linha de lista.
export function Quadrado({ escolhido = false }) {
  return <span aria-hidden="true" className={`ds-quadrado ${escolhido ? 'ds-quadrado-cheio' : ''}`} />
}

// o LED da faixa: viva (lima), sem sessão (apagado), falha (vermelho)
export function Led({ estado = 'viva' }) {
  return <span aria-hidden="true" className={`ds-led ds-led-${estado}`} />
}
