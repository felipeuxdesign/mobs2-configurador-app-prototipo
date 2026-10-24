// A pergunta pelos dependentes (T09/10, 14 e 15): depois que o bloco
// reenviado confere, o app pergunta por cada um que depende dele, um por vez, na ordem do script —
// numerado, com o motivo, o Reenviar e o Deixar para depois. O Reenviar de um só liga quando o de
// cima confere ou fica para depois (o *libera depois do leitor* diz por quê); ao ligar, ele acende
// no lugar, em 150.
// O cartão dos dependentes da folha 4 (a pergunta, o fica para depois e o confere): mora na tela,
// montado com os tokens do cartão (o fundo, a borda, o raio) e das linhas de detalhe, com o botão
// da linha do design system (folha 6), e entra ao vivo esmaecendo em 150.
import { Glifo } from '../../ds/index.js'
import { BotaoDaLinha } from '../../ds/index.js'
import { T } from './textos.js'

// itens: [{ bloco, rotulo, motivo, decisao: null | 'depois' | 'reenviado', liberado, acendeu, voltou }]
// Na 19 e na 20: o Deixar para depois vira *fica para depois* no lugar do link, e o Reenviar
// continua do lado, se o técnico mudar de ideia; o reenviado conferido mostra o check, *confere* e
// *· reenviado* no lugar das duas ações · as duas trocas esmaecem no lugar, em 150
export function Pergunta({ itens, surge = false, aoReenviar, aoDeixar, aoVivo = false }) {
  return (
    <div className={`t09-pergunta ${surge ? 't09-pergunta-surge' : ''}`}>
      {itens.map((it, i) => (
        <div key={it.bloco} className="t09-pergunta-item">
          <span className="t09-pergunta-nome">{T.numerado(i + 1, it.rotulo)}</span>
          <span className="t09-pergunta-motivo">{it.motivo}</span>
          {it.decisao === 'reenviado'
            ? (
              <span className={`t09-pergunta-acoes t09-pergunta-reenviado ${it.voltou ? 't09-pergunta-acende' : ''}`}>
                <span className="t09-pergunta-check"><Glifo estado="ok" poco={26} nome={T.confere} /></span>
                <span className="t09-pergunta-confere">{T.confere}</span>
                <span className="t09-pergunta-marca">{T.reenviadoMarca}</span>
              </span>
            )
            : (
              <div className="t09-pergunta-acoes">
                {/* a chave muda quando liga: o botão aceso esmaece no lugar (150), sem animar a cor */}
                <span key={it.liberado ? 'aceso' : 'apagado'} className={it.liberado && it.acendeu ? 't09-pergunta-acende' : undefined}>
                  <BotaoDaLinha tam="pergunta" desabilitado={!it.liberado} aoTocar={() => aoReenviar(it.bloco)}>{T.reenviar[it.bloco]}</BotaoDaLinha>
                </span>
                {it.decisao === 'depois'
                  ? <span key="depois" className={`t09-pergunta-fica ${aoVivo ? 't09-pergunta-acende' : ''}`}>{T.ficaParaDepois}</span>
                  : (
                    <button type="button" className="t09-pergunta-deixar" onClick={() => aoDeixar(it.bloco)}
                      aria-label={`${T.deixarParaDepois}: ${it.rotulo}`}>{T.deixarParaDepois}</button>
                  )}
              </div>
            )}
        </div>
      ))}
    </div>
  )
}
