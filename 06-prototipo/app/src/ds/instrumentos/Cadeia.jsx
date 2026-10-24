// A cadeia (folha 5): os blocos gravados um de cada vez, cada um relido
// antes do próximo, ligados pelo trilho. Cada elo: o poço de 34 com o glifo
// do estado, o nome, o valor à direita (confere, o conteúdo do bloco — OF-1621,
// 4 regiões —, gravando, conferindo; o módulo não guarda versão, decisão 49) e a
// linha de baixo: a descrição, ou, pronto, o que ele gravou. O elo que falhou
// acende (Lei 2): valor e descrição em vermelho, e o trilho para. Os que não
// foram alcançados ficam apagados. O que os elos feitos gravaram fica em
// --tinta-apagada, na concluída como na recusada (a folha 5 e a T09/01).
// `justa`: a cadeia divide a tela com o aviso (recusa, e as travas do envio) —
// o elo baixa de --cadeia-elo pra --cadeia-elo-justo e o fecho de 14 pra 12.
// Estados de elo: ok · agora · xis · espera · traco · sem-sinal (os do Glifo).
// `altura` (T09): as três alturas que a T09 desenha além dessas —
// 'gravando', a cadeia inteira gravando (elo de 78, `--cadeia-elo-gravando`, fecho 14,
// T09/00 e 21 a 26: 8 a menos que o da curta, pra a cadeia caber sem rolar);
// 'correndo', a cadeia curta da manutenção (elo de 86, fecho 14, T09/09, 10, 14, 15,
// 19 e 20); e 'pausada', a cadeia parada com o contador e o aviso (elo de 68,
// fecho 12, T09/02 e 03).
// O elo em que a cadeia pausou (sem-sinal-neutro, pausa) fica aceso como o que
// corre: nome e valor em --tinta, e o trilho dele ainda apagado.
//
// A cadeia gravando (folha 5, decisão 57) · `barra` no elo: a etapa da vez troca a
// descrição pela barra e pela contagem embaixo dela — a barra de 6, o trilho em
// --borda e o feito em --lima-feito; à esquerda o que já foi, na unidade da etapa
// (*72 de 120 pontos*), à direita o que falta (*faltam ~20 s*), em --tinta-apagada.
// `barra`: { valor, desde, passoMs, chave, conta, falta }
// · valor: a fração do feito (0 a 1), desenhada só por scaleX a partir da esquerda;
// · passoMs: o passo do processo (RITMOS.cadeiaPassoMs). A cada valor novo, o feito
//   anda de onde estava ao novo num trecho linear de passoMs × --mov-fator (a regra
//   da barra que segue um processo, movimento.md); com reduzir, o fator é 0 e a
//   barra salta pro valor de cada passo, no mesmo ritmo. Sem passoMs (o quadro
//   parado: o endereço, a coluna, o print, a pausada), o feito fica no valor, parado;
// · desde: de onde o primeiro trecho parte quando a barra nasce andando (a passada
//   que começa: 0) — sem ele, a barra nasce no valor, parada (montar nunca anima);
// · chave: a passada (a gravação, a releitura) — a releitura é outra barra, que nasce
//   do zero: a volta ao zero é direta, sem animar a volta;
// · conta e falta: os dois textos de baixo, que trocam no lugar a cada passo.
// Quando a etapa confere, a linha do que ela gravou entra no lugar da barra e da
// contagem, esmaecendo em 150 (o glifo do poço vira check, no mesmo esmaecer).
// `extra` (T09/04, 11, 12): o que o elo confere depois de gravado — a linha
// embaixo da descrição, com o traço de cima (*O módulo falou com o servidor*, na
// Conexão) · `extra.conferir` (T09/12): o *o que conferir* sem a caixa, dentro
// do elo, logo embaixo dela (a variante da peça, OQueConferir · semCaixa), com a
// ação ao lado do rótulo (`extra.conferir.acao`: o *Conferir de novo*, decisão 64) ·
// `extra.tipo` (conferindo, sim, ainda-nao): o valor que troca de tipo na frente de
// quem olha entra esmaecendo, em 150 (o *sim* e o *ainda não*, e o *conferindo* que volta
// no *Conferir de novo*); o tempo que conta no *conferindo* troca no lugar.
// O quadrado de agora com a barra tem 14 (T09/00, 09 e 21 a 26); sem ela — a
// Conexão gravada esperando o servidor, T09/11 —, 10.
// Decisão 47 (a cadeia antes de gravar, folha 5): o elo
// que espera a gravação leva o relógio no poço ('relogio', o tom 'antes'), em
// --marca-limite; o nome em --tinta-forte, o valor (primeiro, o conteúdo) em
// --tinta-secundaria, e o trilho em --trilho-antes, o cinza da borda do poço — o
// 'resto' de quem não foi alcançado continua na divisória. Com o aviso das travas
// do envio, ela é a justa (elo de 70, fecho 12: T09/05, 06, 07, 27); o elo do bloco
// que não cabe é o que falhou (xis, as cercas na T09/07), e o trilho dele é o resto;
// só o valor (*não cabe*) acende: a descrição é a do bloco, não uma causa (`descricaoNeutra`).
// `curta` (a cadeia curta da manutenção): só a limpeza e o bloco
// escolhido — o último elo guarda a altura dele, como a referência desenha (os dois de 86).
// `semFecho` (T09/05 a 07): a cadeia que fecha o miolo — nada vem embaixo dela —
// deixa o último elo sem o fecho de baixo. Com o aviso das travas, o fecho e o
// recheio do miolo passariam 7 da altura, que a referência corta: o quadro rolaria
// à toa. No desenho, nada muda.
import { emLinhas } from '../primitivos/linhas.jsx'
import { useVez } from '../primitivos/vez.js'
import { OQueConferir } from '../entrada/OQueConferir.jsx'
import { Trilho } from './Trilho.jsx'
import './Cadeia.css'

const TOM = { ok: 'feito', agora: 'corre', xis: 'falha', 'sem-sinal': 'falha', 'sem-sinal-neutro': 'corre', pausa: 'corre', relogio: 'antes' }

// a barra da etapa: o feito anda de onde estava ao valor novo, um trecho linear por passo.
// Cada trecho é um elemento novo (a chave é a vez), com a animação de CSS do valor de antes
// ao novo; acabou, fica o transform do valor, sem nada vivo
function BarraDaEtapa({ valor, desde, passoMs, conta, falta }) {
  const troca = useVez(valor)
  const de = troca.vez > 0 ? troca.antes : desde
  const anda = passoMs != null && de != null && de !== valor
  const estilo = { transform: `scaleX(${valor})` }
  if (anda) { estilo['--ds-cadeia-barra-de'] = de; estilo['--ds-cadeia-barra-passo'] = `${passoMs}ms` }
  return (
    <div className="ds-cadeia-etapa">
      <div className="ds-cadeia-barra" aria-hidden="true">
        <span key={troca.vez} className={`ds-cadeia-barra-feito${anda ? ' ds-cadeia-barra-anda' : ''}`} style={estilo} />
      </div>
      <div className="ds-cadeia-conta">
        <span>{conta}</span>
        {falta != null && <span className="ds-cadeia-falta">{falta}</span>}
      </div>
    </div>
  )
}

function Elo({ e, ultimo }) {
  // a linha do que gravou que entra no lugar da barra, na frente de quem olha
  const linha = useVez(e.barra ? 'barra' : 'descricao')
  const surge = linha.vez > 0 && linha.antes === 'barra' && !e.barra
  // o valor do que o elo confere que troca de tipo, na frente de quem olha
  const tipo = useVez(e.extra?.tipo ?? null)
  const extraNasce = tipo.vez > 0 && tipo.antes != null && e.extra?.tipo != null
  return (
    <div className={`ds-cadeia-elo ds-cadeia-elo-${TOM[e.estado] ?? 'resto'} ${ultimo ? 'ds-cadeia-elo-ultimo' : ''} ${e.estado === 'agora' && !e.barra ? 'ds-cadeia-elo-sem-barra' : ''}`}>
      {/* a cadeia liga o trilho que acende (o do elo relido, de cima pra baixo); o encerramento, não */}
      <Trilho estado={e.estado} poco={34} ultimo={ultimo} nomeGlifo={e.nomeGlifo} acende />
      <div className="ds-cadeia-texto">
        <div className="ds-cadeia-linha">
          <span className="ds-cadeia-nome">{e.nome}</span>
          <span className={`ds-cadeia-valor ${e.valorAceso ? 'ds-cadeia-valor-aceso' : ''}`}>{e.valor}</span>
        </div>
        {e.barra
          ? <BarraDaEtapa key={e.barra.chave} {...e.barra} />
          : e.descricao != null && <span key={`linha·${linha.vez}`} className={`ds-cadeia-descricao${surge ? ' ds-cadeia-descricao-surge' : ''}${e.descricaoNeutra ? ' ds-cadeia-descricao-neutra' : ''}`}>{emLinhas(e.descricao)}</span>}
        {e.extra && <div className="ds-cadeia-extra"><span className="ds-cadeia-extra-nome">{e.extra.nome}</span><span key={`extra·${tipo.vez}`} className={`ds-cadeia-extra-valor ${e.extra.tom === 'falha' ? 'ds-cadeia-extra-falha' : ''}${extraNasce ? ' ds-cadeia-extra-nasce' : ''}`}>{e.extra.valor}</span></div>}
        {e.extra?.conferir && <OQueConferir semCaixa rotulo={e.extra.conferir.rotulo} causas={e.extra.conferir.causas} acao={e.extra.conferir.acao} />}
      </div>
    </div>
  )
}

export function Cadeia({ elos, justa = false, altura, curta = false, semFecho = false }) {
  const recusada = elos.some((e) => e.estado === 'xis')
  return (
    <div className={`ds-cadeia ${justa ? 'ds-cadeia-justa' : ''} ${altura ? `ds-cadeia-${altura}` : ''} ${recusada ? 'ds-cadeia-recusada' : ''} ${curta ? 'ds-cadeia-curta' : ''} ${semFecho ? 'ds-cadeia-sem-fecho' : ''}`}>
      {elos.map((e, i) => <Elo key={e.nome} e={e} ultimo={i === elos.length - 1} />)}
    </div>
  )
}
