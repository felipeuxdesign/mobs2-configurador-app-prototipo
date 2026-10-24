# T15 · Fila de saída

Ver o que ainda vai subir pro servidor, e o que precisa do técnico.

| | |
|---|---|
| **Elemento-assinatura** | cada item com causa e ação — nada fica tentando sozinho em silêncio |
| **Chrome** | sem faixa ou com, conforme a sessão |
| **Semente no protótipo** | fila com quatro itens · um com erro, um na fila e dois recebidos (um em conflito) |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 0 · 5 — ver `estados.md` |

- no protótipo · a semente: a fila do aparelho na entrada, `M.filaDoAparelho` no mock (f-10, f-02, f-08 e f-11): dois itens esperando envio, um deles com erro, uma recebida e uma recebida em conflito, com a faixa da sessão do herói

- no protótipo · o chrome: a faixa da sessão aberta ou a faixa sem sessão, conforme a sessão — toda referência tem faixa

## A fila do aparelho

A referência `00` e a entrada do protótipo mostram os quatro itens de `SELECAO_DA_SEMENTE` (`f-10`, `f-02`, `f-08` e `f-11`), mais os que a sessão criar no fluxo. O contador conta todos os mostrados. **Recebida em conflito** continua recebida: o servidor aceitou os registros e avisou o gestor; não é recusa nem pede reenvio ao técnico. A fila é do aparelho, independentemente da empresa ativa. Onde uma nota fala na semente de três itens, vale esta: são quatro, com o `f-11`.

Fontes: `04-dados/mocks.js`, `06-prototipo/app/src/telas/T15/dados.js` e a referência `00`.

## O que se toca

- **no protótipo:** o pedido de correção do caso (o `Solicitar correção de cadastro` da T14/09) entra na fila criado na hora do pedido — *agora*, no topo da lista · o recorte aparece inteiro, como no 01 (decisão 42), e o cartão de cima fica mais baixo que na referência
- a fila é **do aparelho**, não da empresa — a HU-T01-4 diz que a fila de outro usuário continua subindo: o rótulo é *neste aparelho* · as referências mostram o topo da lista; o protótipo mostra a fila do mock inteira
  - **no protótipo** (decisão 42): o rótulo é *neste aparelho* nas seis. No fluxo, a fila é a do aparelho, a da entrada mais **tudo** o que a sessão criou (`app/src/estado/fila.js` · `filaDoAparelho`), de qualquer empresa — sem filtro pela empresa ativa; o contador do menu conta o que não chegou dela. Em cada estado, o recorte do caso aparece inteiro: no `01`, os cinco itens de `fila-sem-erro`, com a *Checklist · PCX-9A17 · recebida · ontem 16:40* embaixo da *Evidências · RKT-8H42*, onde a referência corta; o cartão do topo continua crescendo até o espaço livre, e fica 50 mais baixo que o da referência (diferença conhecida da referência, 4,84% do HTML)
  - **a fila do mock inteira no fluxo** — os dez de `filaSaida` no lugar da seleção da semente — não se constrói: com o f-09 e o f-10 juntos, o cartão do topo vira o das *DUAS COM ERRO*, e nenhuma referência desenha onde fica o f-04, que sobe enquanto os dois erros esperam; a `00` deixaria de valer inteira (o contador 10 contra 3). Padrão do protótipo: *a fila do mock inteira* é o recorte inteiro de cada quadro
  - **a data do RSW-9L02**: o recebido de mais de um dia diz o dia e a hora, do `data` do mock — *10/03, 10:05*, o f-08, de 2 dias. A `02` diz *ontem 10:05* pro mesmo f-08, no `textos.md` e no desenho: diferença conhecida da referência (0,03% do HTML)
- `Ressincronizar e reenviar` → os itens com erro voltam pra fila, e o envio recomeça
- **sem rede, o `Ressincronizar` espera a rede** (a 05): ressincronizar baixa um pacote novo, e isso precisa de rede · o botão do cartão do topo fica apagado e desabilitado, dizendo o que espera, *Ressincronizar espera a rede*, no lugar do *Ressincronizar e reenviar* · o resto da fila fica como está, e o que é erro de rede continua subindo sozinho quando a rede voltar · com a rede de volta, o botão acende com o texto de sempre (HU-T04-6: sem rede, o que precisa dela espera; HU-T15-3)
  - **no protótipo:** a 05 abre pela coluna, parada: a fila da 00 (`SELECAO_DA_SEMENTE`) com o aparelho sem rede, o caso `sem-conexao-no-menu` (a mesma rede da T04/15) · o cartão que pede ação leva a ação desligada, o desligado do botão secundário (`CartaoAcao` · `acaoDesabilitada`), com *Ressincronizar espera a rede* · no fluxo, a T15 lê a rede do estado único (`situacao.rede`): sem ela, o mesmo cartão · a medição: 3,47% contra o HTML, a mesma diferença da 00 (3,42%) — a 00 e a 05 desenham a recebida do meio com 62, e a regra da posição, que a 01 desenha, a deixa com 50 (embaixo, *a altura é da posição*): o protótipo segue a regra, e o cartão de cima cresce os 12 que sobram · o f-11 do mock é o RVM-1E54, e a 00 e a 05 desenham QAH-1M67 (a régua dos textos acusa a troca nas duas)
- a notificação local da fila parada diz *Envio parado · 3 itens esperando há 30 min* — os 30 min são padrão, até o produto definir o limite
  - **no protótipo, não se constrói:** nenhuma referência desenha a notificação (é do sistema, fora da tela), e o texto não está no `textos.md`. Fica em aberto onde ela aparece e como se desenha
- `Ressincronizar e reenviar` no item com erro → os itens com erro voltam pra fila, e o envio recomeça
  - **no protótipo**, só o que as referências e o mock sustentam: o cartão que pede ação sai, porque nada mais precisa do técnico, e os itens entram na lista como *na fila*, com a espera de `criadoAs` às 14:30 — na semente, *Evidências · KJC-7N23 · na fila · há 145 min*, embaixo de *NA FILA E RECEBIDAS*, com a lista logo abaixo do cabeçalho. Nenhum vira o *SUBINDO AGORA*: o progresso e o tamanho só existem no f-04 do mock. O contador não muda (conta os mostrados). No menu, o diálogo *Sair da conta* e o cartão da Fila de saída não mudam: os dois contam o mesmo, o que não chegou da fila do aparelho, e o erro reenviado continua não tendo chegado (`estado/fila.js` · `naoChegouDoAparelho`, decisão 64). Sair da tela não desfaz (HU-T15-2); o movimento está no `animacao.md`
- `Voltar ao menu` → T04. O voltar do Android (o Esc, no computador) faz o mesmo (`logica.md`)
- `ENCERRAR` → antes de homologar, a sessão abortada (T16/03); depois, os passos do encerramento (T16)
  - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar antes de terminar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela · o `Encerrar mesmo assim` roda os 4 passos da T16
- **no protótipo** (decisão 54): o item do RSW-9L02 (o f-02) é o *Checklist* na `00` e na `02` — o tipo vem do mock (`Checklist de homologação`, rótulo curto *Checklist*, em `tiposFila`). O mock declara o tipo *Foto de calibração* em `tiposFila`, sem item nenhum e sem leitor (diferença conhecida do mock)
- nada anda sozinho: o envio da fila não tem ritmo declarado, e o `01` é estado, parado. A barra que enche e o item que esmaece estão no `animacao.md`

## A fila que a tela mostra

- **no fluxo**, a seleção da semente (f-10, f-02, f-08) mais os itens que a sessão criou (`fila`, no estado único); **nos estados**, o recorte do caso de cada um (`estados.md`)
  - **no protótipo** (decisão 42): a fila é do aparelho, e o que a sessão criou entra de qualquer empresa, como a anotação de cima diz (`app/src/telas/T15/dados.js`)
- **o cartão do topo** cresce até o espaço livre e leva o que precisa do técnico: com erro, o cartão que pede ação, pela recusa do servidor — com um erro, o desenho da folha 6 (`00`); com mais, o compacto, com o erro de rede embaixo e a legenda (`02`). Sem erro, o item que sobe agora (`01`); sem erro e sem nada subindo (a semente depois do `Ressincronizar e reenviar`), nenhum cartão, e a lista sobe pra baixo do cabeçalho
- **embaixo, a lista**: o que está na fila, e depois o que foi recebido, do mais novo pro mais velho. A altura é da posição: 50 com a divisória no meio, com o poço de 32 (o poço na linha), e 62 a última, com o de 30
- **o contador** conta todos os itens mostrados, pendentes e recebidos. O do menu conta só os pendentes: a diferença está em aberto
  - **no protótipo**, o contador do menu conta os pendentes da mesma fila do aparelho que a T15 mostra no fluxo (os *2* da entrada); a regra do menu é da T04 (`logica.md`, Os contadores do menu)
- **o título do item** é o rótulo curto do tipo (`tiposFila`) e a placa; **o quando** é, na fila, há quanto tempo o item espera (de `criadoAs` às 14:30); recebido, a hora de hoje, `ontem` com a hora, ou há quantos dias (o f-08 é de 2 dias atrás, e a referência diz ontem)
  - **no protótipo**: o recebido de mais de um dia diz o dia e a hora do `data` do mock, *10/03, 10:05*, como diz a anotação *a data do RSW-9L02*; o *há N dias* só sai sem `data`, e nenhum item do mock cai nisso (o roteiro `fila.mjs` prova)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- faixa · sem ação
- uma ação
- vazio declarado
- linha do histórico
- linha da fila · esperando
- a lista de empresas
- cadeia concluída
- cadeia recusada
- encerrando
- reiniciando
- sem homologar
- com contador
- linha de opção
- cartão que pede ação
- botão secundário
- lista com contagem
- item feito
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

Medido nas referências: as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- uma ação
- os glifos de estado
- os ícones de ferramenta (a seta `subindo`)
- os poços
- os marcadores
- com contador
- cartão que pede ação
- botão secundário
- vazio declarado
- linha da fila · esperando
- linha da fila
- linha da re-checagem

As variantes nomeadas, declaradas na peça: o cartão que pede ação **compacto**, com mais de um erro (`02`: o título de 17, a causa de 13, o botão compacto de 46 com o toque de 48, a divisória e o que vem depois); a linha da fila com a altura pela **posição** (`01`: a recebida do meio com 50), e o poço pela altura (o poço na linha: 32 na linha de 50, 30 na última, de 62, como as três que têm a lista desenham — 00, 01 e 02); a escala do **envio** (a barra de 16 do `01`); e a seta do SUBINDO AGORA no dicionário de ícones (`subindo`, com o traço 2,2 do glifo). Peças só da tela, sem linha no `componentes.md` (`app/src/telas/T15/pecas.jsx`): o cartão SUBINDO AGORA, o erro que reenvia sozinho e a legenda dentro do cartão; os rótulos das seções são só tipografia. Na coluna do `componentes.md`, a T15 não está nas 15 linhas que nenhuma referência dela desenha: faixa · sem ação, o par comparado, linha do histórico, a lista de empresas, as duas da cadeia, as três do encerramento, com contador de falha, a marca no login, campo e campo focado, linha de opção e lista com contagem. Da lista do design ficam fora também a seção aberta do checklist e a seção recolhida, que a coluna não dá à T15. Estão os marcadores da folha 3 (o LED da faixa) e o dicionário de ícones, pela seta do SUBINDO AGORA, que mora na linha dos ícones de ferramenta. O *par comparado* não existe no design system, como o chassi da T06 (decisão 46); e o *com contador neutro* e o *com contador de falha* são uma peça só, o *com contador* (a folha 6): o *de falha* desta nota é ele em falha.

## Histórias de usuário

- **HU-T15-1** — Vejo por item: tipo, ativo, item de checklist, tamanho e progresso do corrente
- **HU-T15-2** — Sair da tela não interrompe o envio; a home mantém o contador
- **HU-T15-3** — Cada erro nomeia causa e ação; recusa do servidor nunca fica em retentativa silenciosa
- **HU-T15-4** — Fila vazia é declarada, com o horário do último envio
- **HU-T15-5** — A Seção F em re-checagem aparece em seção separada — não é item de fila
- **HU-T15-6** — Recebo notificação local quando a fila fica parada além do limite

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## A fila

- **o conflito não é recusa**: o servidor aceita os dois registros e avisa o gestor · o item aparece como *recebida · em conflito, o gestor foi avisado*, sem botão de reenvio (a 00)
- **o *servidor recusou* tem uma causa que o técnico resolve**: *o pacote de sincronização venceu*, e o *Ressincronizar e reenviar* baixa um pacote novo · a causa é leitura nossa, a combinar com o produto
- **no protótipo:** a semente da 00 tem o f-11, o recebido em conflito: vai depois dos recebidos, com o aviso do mock embaixo, em duas linhas, e não conta como *não chegou* (nem no menu da T04) · sozinha, a recusa é uma frase: *O servidor recusou: …* · o f-11 do mock é do a-06 (RVM-1E54), e a 00 desenha QAH-1M67 — segue o mock
