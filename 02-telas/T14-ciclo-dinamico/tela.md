# T14 · Ciclo de testes

Com a ignição ligada e o ônibus parado, provar a ignição ligada, a rotação aplicável, o cartão do motorista e a ignição desligada, junto do recebimento e da conferência do evento de teste.

| | |
|---|---|
| **Elemento-assinatura** | o prazo do evento drenando enquanto o evento viaja até o servidor |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 5 · 4 — ver `estados.md` |

## O que se toca

- São **quatro passos no herói**: Ignição ligada, Rotação, Cartão do motorista e Ignição desligada. Rotação exige o sinal do modelo; cartão exige leitor. Sem leitor, a referência `12` tem três passos. Sem ré e sem porta. O bip é respondido na T13, fora do ciclo desta tela.
- A entrada normal prepara o disparo com a fila drenando (`01`), prazo cheio e **Disparar evento de teste** desabilitado. A fila drena em 3 s; a ação acende. A referência `00` é o instante da vez do cartão e não a entrada normal.
- O disparo começa o prazo de 2:00: no protótipo, 1 s real vale 4 s de prazo. Até o evento chegar, o botão diz **Aguardando o evento**, desabilitado. O evento do mock chega aos 24 s do prazo e confere os seis campos aos 33 s. O preenchido para na chegada, mas o marcador acompanha o tique do processo.
- A semente traz ignição ligada e rotação feitas. O cartão espera o módulo ler e a resposta do técnico: **Confere com o cartão** ou **Não confere**. O app não compara o cartão com o cadastro. Não conferindo, a T13 recebe o item não conforme para justificar. A ignição desligada é a vez seguinte e explica a espera.
- Com o evento recebido e passos ainda pendentes, **Encerrar o ciclo** grava `fechado: true` e leva à T13; **Ir para o checklist** grava `fechado: false` e leva à T13. Ambos preservam os resultados. Na retomada, os passos salvos continuam valendo e o evento é disparado novamente; o campo `fechado` não produz uma retomada diferente no protótipo.
- No prazo estourado, a ação principal é **Disparar outro evento**, com os passos preservados. A primeira falha do caso do fluxo vale uma vez por sessão; a segunda falha (`09`) é exemplo parado da coluna. A T14 não oferece pedido de correção de cadastro.
- Concluído: **Ir para o checklist** → T13 e **Voltar ao menu** → T04. O voltar do sistema segue o link do rodapé: T13 durante o ciclo, T04 no concluído. Na consulta parada, não recebe toque nem voltar.
- **ENCERRAR**, antes do checklist registrado, abre o diálogo de encerramento antecipado e segue aos quatro passos de saída da T16 após a confirmação.
- `etapas.ciclo` grava o par ativo/módulo, os passos pelos IDs aplicáveis (`e-1` a `e-4` no herói), `feitos`, `total`, `evento`, `tentativa`, `cartao: { lido, resposta } | null`, `motor`, `concluido` e `fechado`. Não há `cartaoId`, `esperado` ou pedido de correção na resposta atual do cartão.

Fontes: `04-dados/mocks.js` (passos canônicos, evento e casos), `06-prototipo/app/src/telas/T14/ciclo.js`, `index.jsx`, `textos.js`, `06-prototipo/app/src/estado/ritmos.js` e as referências `00`, `05`, `08`, `10`, `11` e `12`. O auxiliar tem uma condição pra velocidade com tacógrafo, mas a velocidade não faz parte do ciclo; nenhum modelo a fornece à T14.

## Como o protótipo constrói

As notas abaixo trazem as decisões, as medições e as diferenças conhecidas. Onde uma delas fala em passos de ré ou porta, cinco ou seis passos, comparação do cartão com o cadastro, pedido de correção ou outro formato do registro, vale o que está acima.

- **no protótipo:** a 09 monta pelo `evento-nao-chega-de-novo`, só pela coluna, com a 2ª tentativa estourada; a frase da segunda falha é a linha em falha do `Prazo` (`detalhe` com `tom: 'falha'`) · o `Solicitar correção de cadastro` põe o pedido na fila de saída (`estado/fila.js` · `itemDeCorrecao`)
- `Disparar evento de teste` desliga o primário, que diz *Aguardando o evento* · **o `Encerrar o ciclo` só acende quando o evento chega ou o prazo estoura** — o toque duplo não encerra o ciclo
- **no máximo quatro passos, com o ônibus parado** (decisão 54): ignição ligada, rotação (só se o ativo lê rotação), cartão do motorista (só se há leitor) e ignição desligada · **sem a ré e sem a porta**: não dizem nada sobre a instalação · sem leitor, são 3 passos (a 12) · a velocidade só entra com tacógrafo digital — o herói não tem
- **o cartão em três momentos**: *passe o cartão* → *o módulo leu 9412857* → `Confere com o cartão` ou `Não confere` (a 08) · o app **não compara com cadastro nenhum**: quem confere é o técnico, com o número impresso no cartão · `Não confere` vira não conforme, com a justificativa no checklist (a 10) · **o não confere se refaz**: a linha do cartão diz *não confere · justifique no checklist*, em vermelho, e fica com `Passar de novo`, o botão da linha (folha 6), que volta ao *passe o cartão* (a 00): o técnico passa o cartão certo, ou responde de novo, e o que vale é a última resposta · a ignição desligada volta a esperar a vez dela, na ordem do ciclo · o `Passar de novo` fica na linha enquanto o ciclo corre; concluído o ciclo, o não confere segue pro checklist (HU-T14-6)
- **a ignição desligada explica a espera**: *O módulo leva alguns segundos para perceber que a ignição foi desligada.* (a 11) · sem isso o técnico acha que travou
- **no protótipo:** os passos saem da Seção E do mock com a condição de cada um (`condicao`: a rotação pela CAN do modelo, o cartão pelo leitor; o caso `sem-leitor` tira o leitor, a 12) · o cartão é a vez desde o disparo (*passe o cartão*, a 00); o módulo lê 3 s depois (`ciclo.js` · `tiqueDe`: o tique do passo seguinte, o 60% da 00 e da 08) e espera a resposta — o lido é o número do primeiro cartão do mock sem os zeros à esquerda, *9412857* (`CARTAO_LIDO`: o mock não declara o lido) · `Confere com o cartão`, `Não confere` e `Passar de novo` são o botão da linha (folha 6, `src/ds/entrada/BotaoDaLinha.jsx`) · a resposta leva a ignição desligada à vez, com a espera explicada embaixo, e ela confirma 3 s depois · o cartão respondido conta como passo feito (*3 de 4* na 10) · a URL segue: 08, 10, 11 e 05 · o `etapas.ciclo.cartao` grava o lido e a resposta, e a T13 lê o não confere como não conforme, com o campo do que aconteceu
- **no protótipo · o `Passar de novo`** (a 10, decisão 64): a linha do cartão que não confere tem a causa embaixo do nome, em vermelho, e o botão na própria linha, no lugar do valor (a `LinhaChecagem` com a `acao`) · o toque devolve a vez ao cartão: o *não confere* e o botão saem esmaecendo em 150, e aí a linha volta ao *passe o cartão*, com o quadrado de agora, e a ação entra à direita · o módulo lê de novo 3 s depois do toque (`tiqueDe`, com o tique em que a vez voltou), a resposta de antes some, e vale a nova · a ignição desligada volta a esperar a vez dela, depois do cartão · a URL volta à da tela (a vez do cartão, a 00) · o botão fica enquanto o ciclo corre: com o cartão que não confere, o ciclo não conclui sozinho, e o técnico sai pelo `Encerrar o ciclo` ou pelo `Ir para o checklist`, com o não confere seguindo pro checklist · a 10 fecha em 0,01% (o resíduo de antes) · o roteiro `mov-t14.mjs` toca o `Passar de novo`, com e sem reduzir movimento
- a fila do módulo drena → `Disparar evento de teste` acende
  - no protótipo: a tela entra no quadro `01`: a fila do módulo drenando, o prazo cheio e o disparo indisponível com o motivo. A fila drena em 3 s (`movimento.md`), e o `Disparar evento de teste` acende; esse quadro não tem referência e junta as peças que existem
- disparado → o prazo de 2:00 começa: 1 s real vale 4 s de prazo
- os passos do veículo acendem sozinhos: a semente traz 2 feitos, e os passos 3 a 5 acendem a +9, +12 e +15 s do disparo. A `00` é o instante antes de o evento chegar (1:36)
  - no protótipo: o passo da vez tem o quadrado de agora, o título aceso e a ação à direita (*engate a ré*, *abra a porta*, *passe o cartão*, *desligue a ignição*); antes do disparo e na falha da rotação, sem quadrado. O evento chega aos 6,6 s, antes da vez da porta: a `07`, a `08`, a `04` e a `06` mostram o evento chegado e o `Encerrar o ciclo` aceso
- o evento chega aos 24 s do prazo e os campos conferem aos 33 (o mock): o número passa a ser o tempo que ele levou, e a barra para no que restava. Os cinco passos e o evento → `05` (0:24 e 14:30:24, o valor do mock)
  - no protótipo: a referência `05` segue o mock — *0:24*, *14:30:24* e a barra em 80% —, e o app bate: 0% contra o HTML, e os textos conferem · com o evento chegado, o preenchido para na chegada e o marcador branco segue o tempo (`Prazo` · `marcador`): na 05, em 60% · na `12`, sem o cartão, o ciclo acaba antes, e o marcador fica em 70%; a 12 o desenha em 60%, como a 05 — diferença conhecida da referência, 0,05% contra o HTML · as outras fecham em 0%, ou em 0,01% (a 00, a 08, a 10 e a 11: a suavização do texto)
- `Encerrar o ciclo` → T13, e fecha a captura: os pendentes ficam pendentes na Seção E · `Ir para o checklist` → T13, com o ciclo aberto. Voltar à T14 com o ciclo aberto retoma os passos que já valem, e o evento se dispara de novo
- prazo estourado: `Disparar outro evento` — os passos continuam valendo
  - no protótipo: prazo estourado (`evento-sem-resposta`, uma vez por sessão): `Disparar outro evento` — os passos continuam valendo, e a segunda tentativa confirma
- ciclo concluído: `Ir para o checklist` → T13 · `Voltar ao menu` → T04 · *Ir*, e não *Voltar*, serve pras duas portas de entrada, a calibração e o checklist
- `ENCERRAR` → a sessão abortada antes de homologar
  - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar antes de terminar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela · o `Encerrar mesmo assim` roda os 4 passos da T16 · o ciclo continua correndo embaixo do diálogo, porque o técnico ainda não decidiu nada (padrão do protótipo; a alternativa é pausar)
- o voltar do Android (no computador, o Esc) faz o mesmo que o link de saída do rodapé (`logica.md`): `Ir para o checklist`, com o ciclo aberto, e no ciclo concluído `Voltar ao menu`. Com o caso de identificador, o link do rodapé é o pedido de correção, que não sai, e o voltar não faz nada
- sinal fora do esperado (`can-fora-esperado`): o passo que o sinal prova reprova, com a causa embaixo, e os outros seguem acendendo
  - **no protótipo** (decisão 54): a `03` é a rotação zerada, pelo caso `motor-desligado-no-ciclo` (a-02, M2C-0301 · QJF-2C61): o passo do caso (`passo: rotacao`, a chave do título sem acento) reprova com *0 rpm · ligue o motor* — o lido é do caso, e o *ligue o motor* é do `textos.md` —, e os outros seguem acendendo; o ciclo fica aberto. O `can-fora-esperado` não é da T14 (a velocidade em 0 é do ônibus parado, e o ma-01 não tem tacógrafo); o mock o traz, com o `CICLO.passoDoSinal` apontando o *Movimento detectado*, que não existe — os dois sem leitor no app (diferença conhecida). A linha reprovada leva o recheio justo (4), como a `03` desenha
  - no protótipo · a CAN do ônibus (decisão 59) tem um sinal dinâmico só, a rotação (*980 rpm*, em marcha lenta, o `lidoDinamico` do ma-01): é o único que o ciclo lê, no passo *Rotação* (`ciclo.passoDoSinal`) · o hodômetro, o horímetro e o consumo total são estáticos, e nenhum passo os pede
- a linha do teste do cartão só entra com o caso de identificador, e conta nos passos (*de 6*)
  - **no protótipo:** o *Cartão do motorista* é o quinto dos seis passos, sempre na lista; com o caso de identificador ele reprova no lugar, com o lido e o esperado embaixo. Padrão do protótipo, pela `04`: ele já entra reprovado (a 1:36, o cartão reprova enquanto a ré e a porta esperam); sem o caso, acende no tempo dele (+15 s)
- **no protótipo · a velocidade com tacógrafo**: a velocidade não está na CAN do mock e só aparece como opcional da T10 — o caminhão com tacógrafo (o ma-02: o KNB-5H39 e o RJP-1W48) faz os mesmos quatro passos de todo ônibus, sem o passo da velocidade. O código do passo existe, sem dado que o acenda (o modelo não traz a velocidade na CAN). O roteiro `mov-t14.mjs` passa pela sessão do KNB-5H39 e confere que ela não aparece
- **no protótipo · o 01 e o 02**: no `01`, o rodapé fica só com o primário apagado e o link — sem legenda: quem explica é a frase da fila no prazo; no `02`, a frase é uma só, *A Seção F reprova · os passos continuam valendo.*, numa linha
- o ciclo fica gravado em `etapas.ciclo` (`logica.md`)
  - **no protótipo · o formato** (o que a T13 lê): `{ ativoId, moduloSerial, passos: { 'e-1'…'e-6' (e 'e-velocidade' com tacógrafo): 'aprovada' | 'reprovada' | 'pendente' }, feitos, total (6, ou 7), evento: 'antes' | 'disparado' | 'recebido' | 'conferido' | 'nao-chegou', tentativa, cartao: { cartaoId, estado, lido, esperado } | null, correcao: { solicitadaAs, lido, esperado } | null, motor: { passo, lido } | null, concluido, fechado }` — o `motor` é o caso da `03`

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- processo correndo
- com legenda
- passo do ciclo
- passos com o prazo estourado
- cronômetro
- prazo cheio
- com contador
- checkbox
- checkbox marcado
- justificativa
- bloco do evento

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- com legenda
- os glifos de estado
- os poços
- os marcadores
- passo do ciclo
- passos com o prazo estourado
- cronômetro
- prazo cheio
- com contador
- bloco do evento

Medido no código, com os nomes das linhas do `componentes.md`. Ficam fora as seis que o código não usa: a faixa · sem ação (a faixa da T14 sempre tem o ENCERRAR), o processo correndo (no `01`, o primário apagado diz a ação, e quem explica é a legenda em cima), o com contador de falha (o contador conta os passos que passaram, neutro), o checkbox, o checkbox marcado e a justificativa. Estão as de toque da folha 1 (o primário nos três estados, apagado enquanto a fila drena, e o link de saída do rodapé) e os átomos da folha 3 (os glifos e os poços dos passos, o relógio do evento e do registro, e o LED da faixa). As diferenças da tela contra a folha são variante nomeada da peça, declarada lá: o passo do ciclo reprovado com a causa (`03` e `04`); o cronômetro estourado, com o número em vermelho e as frases do estado uma por linha (`02`); o nome do relógio do bloco do evento pelo dado; e o link registrado, o pedido de correção feito no lugar do link, nas duas ações (`06`); o botão da linha (folha 6: o `Confere com o cartão`, o `Não confere` e o `Passar de novo`), e o passo do cartão que não confere com a ação no lugar do valor (`10`, a `acao` da `LinhaChecagem`). Pela folha 6, o *com contador neutro* e o *com contador de falha* são uma peça só, o *com contador*: o *de falha* desta nota é ele em falha.

## Histórias de usuário

- **HU-T14-1** — Com o ônibus parado, o ciclo prova a ignição ligada, a rotação aplicável, o cartão, a ignição desligada e o evento de teste
- **HU-T14-2** — Disparo o evento de teste por botão, com o cronômetro dos 120 s em destaque
- **HU-T14-3** — Antes do cronômetro vejo a fila do módulo drenando; o botão fica indisponível com motivo
- **HU-T14-4** — Vejo 3 linhas de estado: disparado · recebido · campos conferidos. E posso disparar novamente
- **HU-T14-5** — No teste do cartão vejo o código que o módulo leu, e confiro com o número do cartão
- **HU-T14-6** — Não conferindo, o item vira não conforme e pede justificativa no checklist
- **HU-T14-7** — Vejo o tempo decorrido e o que ainda falta capturar; encerrar leva direto ao checklist
- **HU-T14-8** — A velocidade não entra no ciclo; é calibração opcional da T10 para o modelo com tacógrafo

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
