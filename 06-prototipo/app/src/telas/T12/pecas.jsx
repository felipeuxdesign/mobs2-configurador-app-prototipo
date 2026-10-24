// T12 · a peça só da tela: o grupo, o rótulo em cima do cartão. Nenhuma linha em
// componentes.md: 10/700 em caixa alta, apagado.
// · na lista (00), os grupos por idade (HOJE, ONTEM, ESTE MÊS, MAIS DE UM MÊS),
//   o rótulo a 4 do cartão
// · no detalhe (01, 04, 05), as duas seções (O QUE O SERVIDOR RECEBEU e A
//   INSTALAÇÃO), o rótulo a 6 do cartão — decisão 41
// Sem folga dupla antes do rodapé: o último
// grupo não guarda os 16 dele — o recheio do miolo já dá a folga. Na
// rolagem 0, nada muda.
import './pecas.css'

export function Grupo({ rotulo, secao = false, children }) {
  return (
    <div className={`t12-grupo ${secao ? 't12-grupo-secao' : ''}`}>
      <span className="t12-grupo-rotulo">{rotulo}</span>
      {children}
    </div>
  )
}
