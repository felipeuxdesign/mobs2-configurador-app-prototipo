// A linha de checagem (folha 4): cinco estados, o mesmo desenho em todos
// (Lei 3). O glifo vive no poço (Lei 4), do tamanho da linha: 38 → 24,
// 50 → 32 (o poço na linha, leis de medida). A conferência da T11 também leva
// o de 32, com o glifo de 16 que a
// folha 4 e a T11 desenham (o tamanho do glifo do poço de 26).
//
// estado:   'aprovada' · 'reprovada' · 'nao-se-aplica' · 'parou' · 'ainda-nao' · 'informa' (T07)
// variante: 'compacta' (38, a pré-checagem; sem uso nas telas) · 'passo' (38, o ciclo da T14)
//           'dupla' (50, a assertiva da sessão) · 'conferencia' (50, a T11)
//           'diagnostico' (50, o módulo da T07) · 'longa' (44, a lista longa: a CAN da T07)
// titulo, causa (só na reprovada: a linha cresce), valor (o que foi lido)
// glifo: troca o glifo do estado por outro do Glifo (ex.: 'relogio'); no
//        'ainda não', o glifo trocado fica apagado, na tinta de marca (T05/10)
// divisoria: a linha embaixo · folgaFim: a última dos passos no prazo estourado (40);
//        'pre-checagem' é a última da pré-checagem inteira aprovada (43, T05/05)
// T05: +estado 'agora' — a checagem que corre: o quadrado branco no
//        poço (10 no de 24) e o valor em --tinta (a T05/10: 'atualizando · 62%')
// T14/10 (decisão 64, a resposta se refaz): +`acao` — no lugar do valor, o que o técnico toca na própria
//   linha (o botão da linha, *Passar de novo*); fora do esmaecer do valor, que ela não é
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import { useVez, useChega } from '../primitivos/vez.js'
import './LinhaChecagem.css'

// T11: +estado 'diverge' — o bloco que não bate com o cadastro, na
//        linha de conferência: o traço no poço e o valor (o que o cadastro
//        manda) em --tinta, como a T11/00 e 01 desenham. O nome pro leitor
//        segue o dado: quem monta passa o nomeGlifo.
// T11/00: o bloco que não bate leva o xis vermelho, não o traço.
// T12 (decisão 41): +estado 'indisponivel' (o traço) e 'pendente' (o relógio), no que o servidor recebeu
// T07/05 e 07 (folha 4, 'só informa'): +estado 'informa' — o que não trava e o
//   técnico segue, e o checklist registra: o i cinza no poço (o glifo 'info', mudo pro leitor: a
//   frase já diz), o título em 600 e --tinta, a frase embaixo (a `causa`) em --tinta-secundaria e o
//   valor em --tinta. A linha cresce com a frase, 6 em cima e embaixo, como a reprovada com causa.
const GLIFO = { aprovada: 'ok', reprovada: 'xis', 'nao-se-aplica': 'traco', parou: 'sem-sinal', 'ainda-nao': 'espera', agora: 'agora', diverge: 'xis',
  indisponivel: 'traco', pendente: 'relogio', informa: 'info' }
// Lei 23 (as três densidades): a T07 não usa a compacta de 38. O módulo
//   passa à medida da linha de conferência — 50, o poço de 32, o glifo de 16, a 10
//   (variante 'diagnostico') — e a CAN, com o *Conferido na conexão*, à lista longa
//   — 44, o poço de 30, o glifo de 16, a 12 (variante 'longa'). Nas duas, o título
//   em 15/600 e o valor em 14, inclusive na linha de duas linhas, que cresce com a
//   causa, 6 em cima e embaixo, nunca menos que a altura dela. A tinta de cada
//   estado é a da checagem — o título aprovado em --tinta-forte, o que espera
//   apagado, o que reprova e o que informa em --tinta —, e não a da T11, que
//   acende o nome em todo estado: as quatro peças de estado da folha 4 são
//   recortadas da T07, e desenham assim.
const POCO = { compacta: 24, passo: 24, dupla: 32, conferencia: 32, recebimento: 32, diagnostico: 32, longa: 30 }
// o glifo pelo poço (--glifo-<poço>); onde a folha desenha outro, o poço cujo glifo ela usa
const GLIFO_DO_POCO = { conferencia: 26, diagnostico: 26, longa: 26 }
// no recebimento, o check é o do poço de 32 (19), e o relógio do pendente, o de 16 (o do poço de 26), como a T12/05 desenha
const glifoDoPoco = (variante, estado, tam) => (variante === 'recebimento' && estado === 'pendente' ? 26 : GLIFO_DO_POCO[variante] ?? tam)

// T05: três propriedades nomeadas; sem elas, a linha é a de sempre:
// · `nota` — a linha de 12 embaixo do título, como a causa, mas em
//   --tinta-apagada: o fato que a checagem resolveu e não reprova ('aberto
//   desde 03/03 às 13:20', o canal que o app fechou, T05/13). A linha cresce igual.
// · `tom` 'neutro' — o 'parou aqui' que não é erro (o módulo em repouso,
//   T05/15): a lua no poço e o valor em --tinta-secundaria, no lugar do vermelho.
// · folgaFim 'pre-checagem-parada' — a última da pré-checagem que terminou numa
//   falha ou parou no caso (45, T05/06–09, 11, 12, 14, 15). Com a `nota`, a
//   'pre-checagem' (a inteira aprovada) abre 8 em cima e embaixo (T05/13).
// T11 · `lendo` — a leitura ainda não chegou nesta linha: o
//   poço fica, vazio, e o glifo espera a vez, invisível e mudo (a T16). Na
//   conferência, o bloco entra com o relógio no poço
//   ('em andamento'), e o que o módulo tem (a linha de cima do par) espera a vez.
// T11: três propriedades nomeadas; sem elas, a
// linha é a de sempre (a última, a Conexão, tem os 50 das outras):
// · `par` { modulo, cadastro } — o bloco que não bate mostra o par embaixo do
//   nome: o que o módulo tem, em vermelho, e o que o cadastro manda, em
//   --tinta-secundaria, a 3 um do outro; a linha cresce, com 10 em cima e
//   embaixo, e fica sem o valor à direita (T11/00).
//   Decisão 53 (T11/00 e 05): o par também desenha o Extended ID com
//   par na tela, no estado 'informa' (o i cinza; as duas linhas em
//   --tinta-secundaria: o que está no módulo e o só leitura), e o revisar em
//   seguida, no estado 'pendente' (o relógio; a linha de cima em --tinta, o porquê
//   embaixo). Sem o porquê (`cadastro` nulo), só a linha de cima.
// · `valorAceso` — o valor em --tinta, e não em --tinta-secundaria: o bloco que
//   confere quando a conferência não bate por outra razão (T11/01).
// · `acende` — a leitura chegou nesta linha na frente de quem olha: o glifo, e
//   a linha do módulo, esmaecem em 150 ms (animacao.md; com reduzir, direto).
//   Nascida lida (o print, a coluna), a linha não o recebe e fica parada.
//   A peça percebe sozinha (logo abaixo), e o `acende` fica sem efeito.
// T16, na assertiva da sessão (dupla); sem elas, a linha é a de sempre:
// · o nome fica aceso em todo estado — quem diz o veredito é o glifo e o valor:
//   o 'não se aplica' leva o círculo com o traço (glifo 'traco-circulo') e o
//   valor apagado; o 'ainda não' (o ID na plataforma, na fila) leva o relógio e
//   o valor em --tinta-secundaria (T16/02 e 05).
// · folgaFim 'assertiva' — a última do cartão das assertivas, com a folga do pé
//   do cartão, sem divisória (54, T16/02, 04 e 05).
// T14: `recheioCausa` — no passo do ciclo, a linha que cresce com a
// causa abre o recheio que a referência desenha, e a causa fica na entrelinha do
// texto: 'justo' (4 em cima e embaixo — o passo reprovado, a rotação zerada da
// T14/03 e o cartão da T14/04) ou 'largo' (8; fica na peça, sem uso nas
// telas). Sem ele, os 6 de sempre.
// T12: `valorQuebra` — o título não quebra, e o valor longo quebra
// em duas linhas, alinhado à direita, dentro da mesma altura: o recebimento de
// outra instalação, sem referência ('confirmado após reprocessamento', T12·2). O que
// cabe numa linha fica igual. Sem uso nas telas: o
// detalhe da T12 usa a variante 'recebimento'.
// T12/01, 04 e 05 (decisão 41) · a variante 'recebimento' —
//   o que o servidor recebeu, um critério por linha (posicionamento, eventos,
//   viagens): o glifo no poço de 32, o título em 14/600 e, embaixo, a 2, o
//   porquê numa linha (`porque`, 12 em --tinta-secundaria: '3 posições em 1 min
//   12 s', 'o pacote não declara a fila', 'sem resposta · confere por 24 h'), e
//   o veredito à direita (`valor`), em 13/700. A linha tem 58 no mínimo
//   (--linha-com-porque), com 8 em cima e embaixo. O estado muda o glifo e a
//   tinta do veredito, nunca o desenho (Lei 3):
//   · 'aprovada' — conforme, completa: o check lima, o veredito em --tinta
//   · 'indisponivel' — o pacote não declara o parâmetro: o traço, em
//     --marca-limite, e o veredito em --tinta-apagada
//   · 'pendente' — o servidor não respondeu: o relógio de 16, e o veredito em
//     --tinta-secundaria
//   · 'reprovada' — o xis, e o veredito em vermelho (nenhuma referência desenha)
//   O veredito está escrito à direita: o glifo fica mudo pro leitor.
// A linha que conclui: o que chega com a leitura
// esmaece no lugar, em --mov-rapido, só quando chega depois de a linha montar —
// aberta já lida (a URL, o palco, a coluna, o print), parada. A peça percebe
// sozinha; a tela não liga nada:
// · o glifo que troca no poço (o quadrado de agora, o check, o xis, o relógio que
//   vira check), e o que aparece quando o `lendo` acaba (a T16, a T11);
// · o valor, a causa, a nota e o porquê que trocam junto com o estado (ou com o
//   fim do `lendo`) — o que troca sozinho, como a porcentagem, troca no lugar;
// · na conferência, a linha do módulo, quando a leitura chega no bloco.
// O título e as cores trocam direto, e a linha que cresce com a causa
// cresce direto (Lei 3). `acende` (da T11) não é preciso: a
// peça acende sozinha, e a propriedade fica aceita, sem efeito.
// `embaixo` — a ação do técnico na própria linha, embaixo do par
// (T11/00 *Corrigir este bloco*, T11/05 *Enviar agora*): a 6 do par, alinhada ao nome; o poço
// fica no meio do bloco inteiro, e a linha cresce com 10 em cima e embaixo
const nasce = (c) => (c.nasce ? 'ds-checagem-nasce' : '')

export function LinhaChecagem({
  estado = 'aprovada', variante = 'compacta', titulo, causa, nota, porque, valor, tom,
  glifo, nomeGlifo, divisoria = true, folgaFim = false, lendo = false, recheioCausa, valorQuebra = false,
  par, valorAceso = false, acende = false, className = '', embaixo, acao,
}) {
  const tam = POCO[variante]
  const neutro = tom === 'neutro' && estado === 'parou'
  // a conferência que ainda lê este bloco: o relógio no poço, à vista e com nome
  const relogio = lendo && variante === 'conferencia'
  // os pares do jogo: o xis das linhas da conferência é o do texto (T11/00, 03 e 06), e o
  // relógio do que espera revisão é o horário (T11/05, T12/05) — o da leitura que corre segue o aguardando
  const doPar = (g) => (g === 'xis' && variante === 'conferencia' ? 'xis-texto' : g === 'relogio' && estado === 'pendente' ? 'horario' : g)
  const estadoDoGlifo = relogio ? 'relogio' : glifo ?? doPar(neutro ? 'lua' : GLIFO[estado])
  // a leitura desta linha: o estado e o lendo — quando troca depois de montar, o que chega com ela esmaece
  const leitura = useVez(`${estado}·${lendo}`)
  const cValor = useChega(valor, leitura)
  const cCausa = useChega(causa, leitura)
  const cNota = useChega(nota, leitura)
  const cPorque = useChega(porque, leitura)
  // o que o módulo tem espera a leitura chegar: na linha que ainda lê e na da vez (T11/04)
  const esperaModulo = lendo || estado === 'agora'
  const cModulo = useChega(esperaModulo ? null : par?.modulo, leitura)
  const classes = [
    'ds-checagem', `ds-checagem-${variante}`, `ds-checagem-${estado}`, neutro ? 'ds-checagem-tom-neutro' : '',
    causa || nota ? 'ds-checagem-com-causa' : '', divisoria ? '' : 'ds-checagem-sem-divisoria',
    folgaFim === true ? 'ds-checagem-folga-fim' : folgaFim ? `ds-checagem-fim-${folgaFim}` : '', lendo ? 'ds-checagem-lendo' : '',
    relogio ? 'ds-checagem-lendo-relogio' : '', par ? 'ds-checagem-com-par' : '', valorAceso ? 'ds-checagem-valor-aceso' : '',
    recheioCausa && (causa || nota) ? `ds-checagem-recheio-${recheioCausa}` : '', valorQuebra ? 'ds-checagem-valor-quebra' : '',
    embaixo ? 'ds-checagem-com-embaixo' : '', className,
  ].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      <Poco tam={tam} aria-hidden={(lendo && !relogio) || variante === 'recebimento' ? 'true' : undefined}>
        <Glifo estado={estadoDoGlifo} poco={glifoDoPoco(variante, estado, tam)} nome={relogio ? undefined : nomeGlifo} fino={estadoDoGlifo === 'horario' && variante === 'recebimento'}
          esmaece chave={lendo && !relogio ? 'lendo' : estadoDoGlifo} />
      </Poco>
      <span className="ds-checagem-corpo">
        <span className="ds-checagem-titulo">{titulo}</span>
        {porque != null && <span key={cPorque.vez} className={`ds-checagem-porque ${nasce(cPorque)}`}>{porque}</span>}
        {causa && <span key={cCausa.vez} className={`ds-checagem-causa ${nasce(cCausa)}`}>{causa}</span>}
        {nota && <span key={cNota.vez} className={`ds-checagem-causa ds-checagem-nota ${nasce(cNota)}`}>{nota}</span>}
        {par && <span key={cModulo.vez} className={`ds-checagem-par ds-checagem-par-modulo ${nasce(cModulo)}`} aria-hidden={esperaModulo ? 'true' : undefined}>{par.modulo}</span>}
        {par?.cadastro != null && <span className="ds-checagem-par ds-checagem-par-cadastro">{par.cadastro}</span>}
        {embaixo && <span className="ds-checagem-embaixo">{embaixo}</span>}
      </span>
      {acao ?? (valor != null && <span key={cValor.vez} className={`ds-checagem-valor ${nasce(cValor)}`}>{valor}</span>)}
    </div>
  )
}
