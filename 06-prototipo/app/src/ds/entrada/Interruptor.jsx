// O interruptor (folha 9): a linha inteira liga e desliga, não só a bolinha — um
// botão com papel de switch, o rótulo à esquerda e o trilho à direita. O padrão do Material 3:
// trilho de 52 × 32 · desligado, contorno de 2 e bolinha de 16 a 8 da borda, os dois em
// --marca-limite, sobre o --poco · ligado, o trilho --roxo cheio e a bolinha de 24 em
// --texto-primario, a 4 da borda · apertando, a bolinha cresce pra 28 enquanto o dedo está em cima.
// O movimento (movimento.md · interruptor): a bolinha desliza e cresce (ou encolhe) por transform, e
// o roxo do trilho e a cor da bolinha entram por opacity, em --mov-padrao, desacelerando · reduzir
// movimento: troca direta. Usado na folha da Conta (T04/05, *Modo claro*) e no pé do painel
// do palco: lá a linha é solta, sem o cartão (`solto`), com o sol antes do rótulo (`icone`) — a mesma peça e o
// mesmo estado (estado/tema.js); o palco é sempre escuro, então a bolinha ligada é a lima do --texto-primario.
import './Interruptor.css'

export function Interruptor({ rotulo, ligado = false, aoTrocar, icone = null, solto = false, className = '' }) {
  return (
    <button type="button" role="switch" aria-checked={ligado}
      className={`ds-interruptor ${solto ? 'ds-interruptor-solto' : ''} ${ligado ? 'ds-interruptor-ligado' : ''} ${className}`}
      onClick={() => aoTrocar?.(!ligado)}>
      <span className="ds-interruptor-rotulo">{icone}{rotulo}</span>
      <span aria-hidden="true" className="ds-interruptor-trilho">
        <span className="ds-interruptor-bolinha" />
      </span>
    </button>
  )
}
