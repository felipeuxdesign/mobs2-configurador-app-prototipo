# T03 · Sincronizar

Baixar o pacote da empresa e dizer se dá pra trabalhar com ele.

| | |
|---|---|
| **Elemento-assinatura** | a barra de idade do pacote com o limite de 7 dias marcado — o pacote velho bloqueia pela régua, não por texto |
| **Chrome** | sem faixa |
| **Semente no protótipo** | empresa Viação Atlântico Sul · pacote pac-emp-01 |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 4 — ver `estados.md` |

## O que se toca

- a sincronização corre sozinha → concluído → `Ir para o menu` → T04
- **o pacote é o da empresa inteira** (decisão 56): na Viação Atlântico Sul, os 24 ativos, as 2 conexões, os 3 modelos de ativo, os 12 eventos e as 8 cercas, 49 itens (*6 de 49 no total*) · o cabeçalho diz o nome da empresa · *faltam ~1 min*: o que falta baixar vezes a estimativa do servidor por item, no segundo até 10 s, na dezena até 59 s, e no minuto a partir de 60 s
- **na falha de rede**, a baixa para onde estava, com o aviso *A BAIXA PAROU ONDE ESTAVA · Nada se perdeu. Ao reconectar, continua de onde parou.*, e o primário é `Reconectar`, que continua de onde parou (HU-T03-2) · o link depende do pacote que já está no aparelho:
  - **ele vale** (até 7 dias, HU-T03-4): `Continuar com o pacote de ontem` → T04, o menu, com o pacote do aparelho, como o `Continuar com este pacote` do de 4 dias (a 01, a Viação) · sem isso, sem rede, a T02 e a T03 viravam um laço: o técnico com um pacote que vale não tinha como seguir
  - **ele venceu** (a 05, a Expresso Caruaruense, 8 dias): o aviso diz também *O pacote que está no aparelho venceu: sem a baixa, os 18 ativos ficam indisponíveis.*, e o link é `Trocar de empresa` → T02, com a atual marcada, como o pacote vencido (a 04)
  - o link diz o pacote pela idade, como a linha da T02 (*o pacote de ontem*); só o de ontem tem referência
  - no protótipo: na falha de rede, `Reconectar` segue de onde parou · o link sai pelo pacote do aparelho (`pacote.js` · `bloqueia`): valendo, `Continuar com o pacote de ontem` → T04, o menu antes de conectar, com o pacote do aparelho no contexto, como o `Continuar com este pacote` do de 4 dias (a 01); vencido, `Trocar de empresa` → T02, com a atual marcada (a 05) · o link diz o pacote pela idade, como a linha da T02 (`oPacoteDe`: *o pacote de hoje*, *de ontem*, *de 4 dias*; só o de ontem tem referência)
- pacote vencido: `Sincronizar agora` ou `Trocar de empresa` · *Os 18 ativos desta empresa ficam indisponíveis.*
  - no protótipo: pacote vencido, `Trocar de empresa` → T02, com a atual marcada (o 01)
- pacote de 4 dias: `Sincronizar agora` ou `Continuar com este pacote`
  - no protótipo: as duas telas da idade também aparecem **no caminho** — a empresa escolhida na T02 ou na folha do menu cujo pacote no aparelho é de 4 dias (a Transportes Capibaribe) ou vencido (a Expresso Caruaruense) pergunta antes de baixar; a de ontem (a Viação) baixa direto · o roteiro `idade-do-pacote`
  - no protótipo: pacote de 4 dias, `Continuar com este pacote` → T04, o menu antes de conectar, com o pacote da Transportes Capibaribe
- no protótipo: o voltar do sistema (no computador, o Esc) faz o mesmo que o link do rodapé — na falha, `Continuar com o pacote de ontem` (a 01) ou `Trocar de empresa` (a 05); no vencido, `Trocar de empresa`; no de 4 dias, `Continuar com este pacote` —, e no concluído o `Ir para o menu`, a saída que ele tem. Baixando, a tela diz *não saia da tela* e não tem saída: ele não faz nada (`06-prototipo/logica.md` · O voltar do Android)

No protótipo, a sincronização corre um item por vez, nos cinco grupos do pacote da empresa — Ativos, Conexões, Modelos de ativo, Eventos e Cercas, 49 itens na Viação (decisões 45 e 56) —, em 4 s no total, e o poço acompanha os ativos. Os ativos baixam primeiro, como a 00 e a 01 desenham (*6 de 24*, e o resto em *—*); depois, os outros quatro, na ordem da lista (nenhuma referência desenha a ordem deles). O *faltam* é o que falta baixar vezes a estimativa do servidor por item, 1,6 s (`segPorItem`), arredondado como na T09 (`app/src/dados/formato.js` · `faltaCerca`): até 10 s, no segundo; até 59 s, na dezena; de 60 s pra cima, no minuto — na 00, os 43 que faltam dão 68,8 s, o *faltam ~1 min* da referência. A primeira baixa da Expresso Caruaruense cai no quarto item (o caso `sync-falha-rede`, a 05), uma vez por sessão; a da Viação, com o pacote de ontem valendo, cai no sétimo só pela coluna (o caso `sync-falha-rede-pacote-valido`, a 01): no fluxo, a primeira baixa do herói não cai. Ao terminar, o pacote novo fica no estado único, e a versão deriva da empresa e da data (*pct-emp01-2026-03-12*).
  - no protótipo: cada grupo diz em que pé está pelo lugar dele na ordem — os de antes do que baixa já baixaram, os de depois esperam, em *—*. Um grupo que o pacote trouxesse vazio esperaria até a baixa passar por ele, e no concluído diria *0* (nenhum pacote do mock traz grupo vazio: as três empresas trazem as 8 cercas). O passo é 4 s dividido pelos itens do pacote: ~82 ms na Viação (49), ~68 na Transportes Capibaribe (59), ~93 na Expresso Caruaruense (43)
  - no protótipo · o cabeçalho diz o nome da empresa do contexto, e as duas empresas espelho mostram o pacote delas — a idade, a hora, a contagem dos ativos (34 e 18) e a versão —, com os outros grupos iguais aos da Viação (2, 3, 12, 8)
  - no protótipo · as duas falhas de rede, cada uma com o seu caso (decisão 64): a 01 é o `sync-falha-rede-pacote-valido`, a Viação com o pacote de ontem, parada em *6 de 24*, só pela coluna; a 05 é o `sync-falha-rede`, a primeira baixa da Expresso Caruaruense, com o pacote vencido, parada em *3 de 18* — no fluxo, pela T02 ou pela folha do menu, depois do *Sincronizar agora* da 04 · a medição: 0,03% contra o HTML nas duas (0% de estrutura), as divisórias entre as linhas que esperam (a diferença das divisórias, embaixo); os textos conferem nas duas
  - no protótipo · diferença conhecida da referência: as divisórias da lista ficam entre as linhas, sem a da última, em todo quadro — como a peça *lista com contagem*. As três referências se contradizem: na 00 e na 01, só a linha dos Ativos tem a divisória, e as quatro que esperam não; na 02, as cinco têm, também a última, rente à borda do cartão. Seguir as duas faria a divisória nascer embaixo de cada grupo que começa a baixar, e o grupo andaria meio pixel no meio da baixa — o estado muda o conteúdo, nunca o desenho. A diferença é esse meio pixel nas linhas de baixo: 0,03% na 00. A saída: o gerador das referências tira a divisória das linhas em espera e põe a da última

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema sem sessão
- o topo do menu inteiro
- duas ações
- uma ação
- com legenda
- aviso
- processo parado
- linha do histórico
- a lista de empresas
- linha de opção
- lista com contagem

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema sem sessão
- duas ações
- uma ação
- processo correndo
- os glifos de estado
- os poços
- falha
- aviso
- nota tracejada
- lista com contagem

Pelas referências, ficam fora as 13 peças da lista de cima que nenhuma referência desenha, e está a nota tracejada da 04. Os três instrumentos no poço (o download, o concluído e a idade do pacote), o cabeçalho com a empresa em cima e a linha do pacote não têm linha no `componentes.md`: são peças desta tela, em `06-prototipo/app/src/telas/T03/`. A barra do download é o desenho do placar sem as bordas dos lados. Pelo medido, estão as peças de toque da folha 1 (o primário nos três estados e o link) e os glifos e os poços da folha 3, que a tela usa. A lista de cima não tem a *falha*, que a 01 desenha — o traço vermelho de 2 embaixo da baixa que parou: ela fica nesta lista (diferença conhecida).

## Histórias de usuário

- **HU-T03-1** — Vejo progresso, volume e tempo estimado; sincronização é incremental por versão
- **HU-T03-2** — Falha de rede mostra erro com Reconectar, sem perder progresso parcial
- **HU-T03-3** — A versão do manifesto é gravada em toda evidência
- **HU-T03-4** — Pacote > 7 dias bloqueia; a partir de 3 avisa sem bloquear. Idade conta do carimbo do servidor

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
