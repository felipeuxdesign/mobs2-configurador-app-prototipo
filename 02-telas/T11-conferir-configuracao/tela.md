# T11 · Conferir configuração

Comparar o que o módulo tem gravado com o que o cadastro manda — em linguagem de negócio.

| | |
|---|---|
| **Elemento-assinatura** | as linhas de conferência: cada bloco dizendo se bate com o cadastro |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | M2C-0417 + RKT-8H42 · caso `conferencia-confere` · a leitura chega ao `02`, Tudo confere |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 5 · 2 — ver `estados.md` |

## O que se toca

- **A cobertura da folha:** `Outras ações` escurece todo o fundo do app, incluindo a faixa de sessão e o fundo da barra de status. A hora e os ícones oficiais ficam legíveis. O `ENCERRAR` continua inerte; a folha mantém a posição, o espaçamento aprovado e as mesmas ações. O quadro `03` da coluna continua parado. Onde uma nota abaixo descreve a faixa acesa, vale esta cobertura.
- A leitura compara **Ativo, Cercas, Leitor, Eventos e Conexão**, na ordem do script: cinco linhas, cinco no contador (*A ordem do script*, abaixo). O Extended ID não faz parte da T11; a Conexão mostra a operadora e a APN do chip (*TIM · timbrasil.br*), nunca o endereço do servidor (decisão 51).
- Cada linha divergente oferece **Corrigir este bloco** e leva à manutenção da T09 com aquele bloco escolhido. Os que dependem do reenviado ficam *revisar em seguida*, conforme o arraste do mock; o resultado da cadeia curta volta ao menu.
- No herói, a leitura termina em **Tudo confere**, com **Voltar ao menu** e **Outras ações**. A folha também abre nessa situação. Enquanto a leitura corre, as ações do rodapé ficam desabilitadas.
- **Reenviar tudo, menos a conexão** abre um novo envio na T09 e limpa o avanço anterior da cadeia, mesmo se ela já estava concluída. A escolha de instalação ou manutenção que veio do vínculo é preservada.
- **Apenas registrar o diagnóstico** guarda o resultado em `etapas.conferencia` e volta à T04. **No protótipo, não cria item na fila de saída**; a confirmação futura do servidor depende da integração do produto.
- O quadro `00`, *Não bate com o cadastro*, e a folha `03`, *Divergência · outras ações*, são consultas paradas da coluna. A folha aberta por toque na conferência normal continua navegável e fecha pelos quatro gestos da lei 20.

Fontes: `06-prototipo/app/src/telas/T11/index.jsx`, `conferencia.js`, `textos.js`, o índice e as referências. A densidade da folha está registrada abaixo.

## Como o protótipo constrói

As notas abaixo trazem as decisões, as medições e as diferenças conhecidas. Onde uma delas fala em Extended ID, APN como título, quatro linhas, ações únicas no rodapé ou divergência como entrada navegável, vale o que está acima e em *A ordem do script*.

- as linhas: **Cercas, Rede do módulo, Eventos e Leitor** · as cercas contam regiões (decisão 50) · a rede do módulo aparece (decisão 51)
- sem o Extended ID: cartão é assunto da plataforma web · o contador conta as cinco que se comparam
- `Corrigir as cercas` → T09, a manutenção, com **o primeiro bloco que diverge, na ordem da cadeia** — um bloco por vez (decisão 53)
  - no protótipo: o `Corrigir` reenvia um bloco só, e o rótulo diz qual (decisão 53)
  - no protótipo: o `Corrigir` e o `Revisar` passam à T09 o modo e o bloco pelo estado único — `etapas.ativo.modo = 'manutencao'` e `etapas.ativo.bloco` —, e a T09 abre no escolher o bloco (`08`) com ele escolhido; `Reenviar …` liga a cadeia curta (`09`), e o `Voltar ao menu` dela leva ao menu, de onde o `Conferir configuração` reabre a conferência, que pede o próximo. A conferência guarda os blocos já reenviados (`etapas.conferencia.reenviados`) e lê o que a T09 acabou de reenviar (`etapas.cadeia.reenviado`, que ela limpa a cada pedido). **Na T09:** ela lê o bloco do estado e tem o texto do reenvio do leitor, dos eventos e da conexão — *Reenviar o leitor*, *Reenviando só o leitor.*, *apaga só o leitor · o resto fica como está*, e os dos eventos e da conexão —, pela gramática dos das cercas, sem referência; com texto, essas três linhas do `08` não ficam inertes (o `Ativo` fica). A volta passa pelo menu, e não direto à conferência: o fim da cadeia curta só tem o `Voltar ao menu` (padrão do protótipo)
  - no protótipo · a ordem: as linhas e o próximo bloco a reenviar seguem a ordem do script (`BLOCOS_DO_SCRIPT` e `M.cadeia.ordem`: Ativo, Cercas, Leitor, Eventos, Conexão), qualquer que seja a ordem em que as divergências foram achadas; a ação de cada bloco mora na linha dele (*Corrigir este bloco*, *Enviar agora*), um bloco por vez
- depois de reenviar um bloco, **os que dependem dele ficam *revisar em seguida***, pelo arraste do mock: as cercas levam o leitor e os eventos · o cabeçalho é cinza, e `Revisar o leitor` → T09, com o próximo, na ordem
  - no protótipo: o arraste (`M.cadeia.arraste`) marca o *revisar em seguida* da `05`, aberta pela coluna com o caso `cercas-reenviadas` (o par do herói, o `reenviado` do caso). Cada linha de revisar leva o relógio cinza no poço, *revisar em seguida* em `--tinta` e, embaixo, o porquê, pelo bloco que a marcou; só os dois do arraste das cercas têm texto (`05`), e o que não tem fica sem a segunda linha. A linha já marcada guarda quem a marcou: reenviado o leitor, os eventos continuam *dependem das cercas*. O cabeçalho cinza conta as de revisar, sem unidade (*2*), com o relógio no poço. Só com as de revisar, o link é o `Voltar ao menu`, como a `05` desenha, e o voltar do Android sai por ele
- sem divergência — só o conteúdo que o app não reconhece —, o principal é `Reenviar tudo, menos a conexão`: limpar tudo é refazer a instalação
  - no protótipo: a `01`, pela coluna — o link é o `Apenas registrar o diagnóstico`, e a nota diz *Fora de todos os blocos.*, com a legenda do Reenviar, *Mantém a conexão do módulo. Apaga só a configuração.*; o valor das linhas que conferem fica em `--tinta-secundaria`, como a `01` desenha (a peça guarda o `valorAceso`, sem uso). O *5* dos blocos sai da cadeia: os cinco depois da limpeza
- a folha `Outras ações`: *Reenviar tudo, menos a conexão* e *Apenas registrar o diagnóstico*, cada uma com o efeito
  - no protótipo: `Outras ações` → a folha (`03`), com a URL dizendo o `03` enquanto ela está aberta; ela fecha no xis e também tocando fora, arrastando pra baixo e no voltar (lei 20), e a URL volta à `00`. O véu começa embaixo da faixa, que fica acesa e desabilitada, como a `03` desenha (e a T04/10); a conferência atrás dele fica inerte, e a `03` desenha o véu sobre o vazio — no app, a `00` aparece atrás dele (diferença conhecida da referência, como a T13/10). A folha tem o puxador, como as folhas da T01 e da T04, e arrasta de qualquer ponto. Aberta pelo endereço ou no print, nasce aberta e com a leitura feita. Com a folha aberta, o `ENCERRAR` não responde
  - **a densidade das opções é a mesma da folha *Não recebi o código* (T01/04 e 11)**, por padronização: 72 no mínimo, 10 em cima e embaixo e 12 entre as partes, o ícone de 18 no poço de 30, o título em 16/600 e o efeito em 13/500, a 2 do título. A variante `efeito` mantém apenas a quebra do título e do efeito completos, sem reticências, e a seta de 16 em `--tinta-secundaria`; as linhas crescem quando o texto precisa. O puxador, os 18 do topo, os 16 dos lados, os 32 do pé e os vãos de 14 da folha permanecem iguais; a folha não usa a opção compacta de 58
  - no protótipo: `Reenviar tudo, menos a conexão` leva à T09 sem a Conexão (`etapas.cadeia.semConexao`), que abre no que vai ser gravado sem ela (T09/30), também num vínculo de manutenção: a limpeza de configuração e os outros cinco, *N de 5*, sem a prova do servidor · concluída, o `Voltar ao menu` leva ao menu, de onde a conferência reaberta confere · se um `Corrigir` já pôs a manutenção no estado, o `Reenviar` devolve o modo que o vínculo tinha (`etapas.conferencia.modoDoVinculo`) · `Apenas registrar o diagnóstico` registra o diagnóstico na sessão e volta ao menu; nenhum item entra na fila, porque o mock não tem onde
- tudo confere: `Voltar ao menu`
- a leitura corre ao abrir, sobre o desenho do quadro a que ela chega — a `00` quando diverge, o `02` quando confere —, e o resto da tela já está no lugar: **a linha da vez mostra o quadrado de agora e diz *conferindo*; as seguintes esperam com o relógio e o traço; a que chega vira check, xis ou i** (a 04), um a cada 400 ms, na ordem da cadeia; o que o módulo tem (a linha vermelha do par, na `00`) espera a leitura chegar na linha, e o glifo e ela esmaecem em 150 ms (`animacao.md`) · **o veredito espera a última linha**: o *NÃO BATE COM O CADASTRO · 4 de 4*, ou o *CONFERE COM O CADASTRO · 4 de 4*, ficam no lugar, sem desenho e mudos pro leitor, e entram esmaecendo em 150 ms quando a última linha acende · o quadro parado de cada referência é o do fim, e o do meio é a 04 · com reduzir movimento, a leitura segue no mesmo ritmo, e o esmaecer vira troca direta · num estado da coluna, ela nasce lida
  - no protótipo: o relógio liga depois da troca de 150 ms entre telas — pelo menu, a primeira linha vira aos 550 ms; pelo endereço, aos 400 ms. E o veredito não deixa vão: a caixa dele está no lugar desde que a tela abre, neutra — *CONFERINDO*, sem poço, o traço no cinza do poço (a 04) —, com a contagem acompanhando as linhas que se comparam; na última, a palavra e a cor entram esmaecendo. Pela URL, a 04 abre parada no Leitor (*2 de 5*), no par do herói
- o que diverge: a consulta **Não bate com o cadastro**, abaixo dos estados da coluna, monta M2C-0438 + ONK-8Q90 pelo caso `diff-divergente`, já lida, parada e sem toque (`00`): cada uma das quatro linhas com o xis vermelho e o par embaixo do nome — *no módulo · …*, em vermelho, o `noModulo` do caso, e *no cadastro · …*, o `noCadastro`. **Pelo painel**, a T11 abre a conferência normal no par do herói; **pelo menu**, conserva a sessão do fluxo. No herói, nada diverge e a leitura chega ao `02`. A consulta reutiliza a referência de tela, sem mudar seu tipo ou criar caminho alternativo; `Voltar ao fluxo` restaura a sessão, o quadro e o avanço de antes da consulta
- o valor de cada linha é o que o cadastro manda: o do caso, no par do diff-divergente; o cadastro do próprio par, nos outros. O Leitor sai do cadastro do modelo do ativo, como na T09: o cartão serial é *fios azul e amarelo*, e o leitor de chave, *fio verde* (o 1-Wire)
  - no protótipo: no par sem caso, as cercas são as regiões do ativo (decisão 50); o leitor, os fios do leitor do modelo do ativo (`modelosAtivo[].leitor.fios`, decisão 59: *fios azul e amarelo* no ônibus do herói); a conexão, a operadora e a APN da conexão da empresa (`M.conexoes`, *TIM · timbrasil.br*, decisões 51 e 59, a mesma da T09); e os eventos, o intervalo do preset do modelo. Com par na tela — alguma linha diverge (`00`) —, ele diz o que está no módulo e o que o cadastro manda, nas duas linhas em `--tinta-secundaria`, a do módulo em vermelho; sem par, o valor curto à direita (`01`, `02`, `05`)
  - no protótipo · a coluna do nome: a folha 4 e as cinco referências medem 96 (o *Extended ID*), e o token `--conferencia-nome` diz 74. O nome fica do tamanho dele, numa linha, nunca menos que o token, e o valor, alinhado à direita, cai no mesmo pixel (diferença conhecida; a saída é o token a 96)
- o conteúdo que o app não reconhece (`01`, só pela coluna): o caso `indice-nao-classificado`, no par da semente — as linhas conferem, com o check, e o cabeçalho diz *NÃO BATE COM O CADASTRO · 1 a mais*: o 1 é o conteúdo fora de todos os blocos, a posição que o caso traz; a nota diz o que é; o rodapé é o do quadro sem divergência: `Reenviar tudo, menos a conexão` e `Apenas registrar o diagnóstico`
- o `ENCERRAR` é o de toda tela com sessão: antes de homologar, a sessão abortada da T16; depois, o encerramento
  - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar antes de terminar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela · o `Encerrar mesmo assim` roda os 4 passos da T16 · a conferência continua correndo embaixo do diálogo, porque o técnico ainda não decidiu nada (padrão do protótipo; a alternativa é pausar)
- o voltar do Android faz o mesmo que a saída do rodapé (`logica.md`): no `02` e na `05`, o `Voltar ao menu`; na `01`, o `Apenas registrar o diagnóstico`; na `00`, onde o link é o `Outras ações`, que não sai da tela, **ele faz o `Apenas registrar o diagnóstico`**, a saída da conferência (decisão 21): o diagnóstico sobe mesmo sem reenvio (HU-T11-9), e o técnico não fica preso na tela (decisão 64) · conferindo (`04`), ele não faz nada · com a folha *Outras ações* aberta (`03`), ou a de confirmação (`06`, `07`), fecha a folha
  - no protótipo: na `00`, o voltar faz o `Apenas registrar o diagnóstico` no par que diverge no fluxo (o roteiro `conferencia` semeia o M2C-0438, o par do `diff-divergente`); a `00` da coluna é consulta parada, e ali o voltar não faz nada

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- uma ação
- com legenda
- folha
- não se aplica
- assertiva da sessão
- linha de conferência
- com contagem
- linha do histórico
- a lista de empresas
- encerrando
- reiniciando
- sem homologar
- linha de opção
- lista com contagem
- item feito
- item com ressalva

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

Medido nas referências e no código: as peças que a tela usa de fato, sem a pré-condição e sem a prova da cadeia — o `textos.md` do `02` não tem o *igual à do cadastro* (decisão 53). Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- uma ação
- os glifos de estado
- os poços
- os marcadores
- com contagem
- linha de conferência
- nota com rótulo
- com contador
- folha com opções (a *Outras ações*, com o puxador e a densidade da T01 · `03`)
- linha de opção (com o efeito embaixo · `03`)

As diferenças da tela contra a folha são variante nomeada da peça: o com contagem que confere, em lima e sem poço, 12 · 14 (`02`), e o que não bate, com o poço de 32 e o glifo de 16, como a folha 4 (`00`, `01`: o *1 a mais*); a linha de conferência com o poço de 32 e o glifo de 16 (o poço na linha: 50 leva 32); a que não bate, com o xis vermelho e o par embaixo do nome, o módulo em vermelho e o cadastro em `--tinta-secundaria`, a 3, com 10 em cima e embaixo e sem o valor à direita (`00`, `LinhaChecagem` `par`); a que confere com o valor em `--tinta`, quando a conferência não bate por outra razão (`valorAceso`, sem uso: a `01` desenha o valor em `--tinta-secundaria`); a que a leitura ainda não alcançou, com o relógio no poço e a linha do módulo esperando, e a que acende, esmaecendo (`lendo`, `acende`); e a nota com rótulo do que a leitura achou, com a borda do poço, 10 · 12 (`01`). A legenda embaixo da lista é texto do conteúdo, não a *com legenda* do rodapé. A faixa é a *sessão aberta*, com a linha de baixo, igual nas referências e no app (a faixa é uma peça só). Na coluna do `componentes.md`, a T11 não está nas linhas que nenhuma referência dela desenha. Pela folha 6, o *com contador neutro* e o *com contador de falha* são uma peça só, o *com contador*. Pela folha 4 (decisão 53): o *revisar em seguida* é a linha no estado `pendente` (o relógio cinza), com a linha de cima do par em `--tinta` e o porquê embaixo — sem o porquê, só a de cima; o cabeçalho cinza do revisar é o *com contagem* neutro, com o relógio no poço de 32 e o número sem unidade (`05`); e o nome da linha fica numa linha, do tamanho dele, a partir do token de 74 (a folha mede 96, acima).

## Histórias de usuário

- **HU-T11-1** — A conferência compara o conteúdo de cada bloco — o módulo não guarda versão
- **HU-T11-2** — Vejo as cercas, em regiões, a conexão (a operadora e a APN), os eventos e o leitor, cada um com o que está no módulo e no cadastro
- **HU-T11-3** — Sem Extended ID: cartão é assunto da plataforma web
- **HU-T11-4** — Corrigir este bloco permite escolher qualquer linha divergente e reenviar aquele bloco por vez; os dependentes ficam para revisar conforme a cadeia
- **HU-T11-5** — Depois de reenviar um bloco, os que dependem dele ficam marcados *revisar em seguida*
- **HU-T11-6** — As outras ações dizem o efeito: reenviar tudo, menos a conexão ou apenas registrar o diagnóstico
- **HU-T11-7** — Índice que o firmware cria sozinho não é divergência; sem lista, vai para *não classificados*
- **HU-T11-8** — Escopo fixo em limpeza de configuração — limpeza total não é oferecida aqui
- **HU-T11-9** — Configuração conforme é declarada explicitamente; o diff sobe mesmo sem reenvio

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## A conferência

- **cada divergência tem *Corrigir este bloco*** (a 00): abre a mesma lista da T09, só com aquele bloco, e a limpeza restrita à área dele
- **cada dependente em *revisar em seguida* tem *Enviar agora***, com o motivo: *usa as cercas, que acabaram de mudar* (a 05)
- **o *Reenviar tudo, menos a conexão* é o último recurso**: fica em *Outras ações*, abaixo das ações por bloco, e diz o escopo: *Mantém a conexão do módulo. Apaga só a configuração.* (a 01 e a 03)
- **as ações aparecem desde o *Conferindo***, desligadas até a leitura terminar, com o motivo embaixo (a 04)
- **sem o Extended ID**: cartão é assunto da plataforma web
- **a Conexão diz a operadora e a APN** (decisão 51): no cadastro, *TIM · timbrasil.br*; no módulo que diverge, o chip antigo, *Claro · claro.com.br* · são as APNs de verdade das operadoras
- **no protótipo:** a ação de cada bloco mora na linha (a variante `embaixo` da linha de conferência): *Corrigir este bloco* no que diverge, *Enviar agora* no que espera revisão — os dois levam à manutenção da T09, um bloco por vez · o rodapé fica só com a saída (o rodapé sem primário) · no *Conferindo*, o *Voltar ao menu* e o *Outras ações* já aparecem, desligados, com a frase em cima · a Conexão mostra a operadora e a APN do cadastro (`conexoes[].operadora` e `apn`), nunca o endereço do servidor · o efeito do *Reenviar tudo, menos a conexão* quebra em duas linhas na folha

## O Outras ações no tudo confere

- **a 02, *tudo confere*, tem o *Outras ações* embaixo do *Voltar ao menu*** · o rodapé fica igual ao da leitura (a 04), só que aceso: o que estava desligado durante a leitura acende no mesmo lugar
- na 01, o conteúdo desconhecido, as duas opções da folha já aparecem direto no rodapé · na 00, o *Outras ações* está no rodapé
- **no protótipo:** o rodapé da 02 é o `Rodape` com o primário e o link, fechando no botão (`pe="botao"`), como o da 04 · no caso que confere, o *Outras ações* da leitura é o mesmo link, desabilitado, e acende no mesmo lugar; as caixas do primário e do link são as mesmas antes e depois da leitura · ele abre a mesma folha da 03 (*Reenviar tudo, menos a conexão*, *Apenas registrar o diagnóstico*) por cima da 02, sem quadro próprio: a URL fica no 02, e o voltar do Android e o X fecham a folha · nenhuma referência desenha a folha sobre a 02
- **o reenvio depois de tudo confere:** limpa o avanço da cadeia anterior e abre o que vai ser gravado sem a Conexão (T09/30), mesmo se os seis passos já estavam concluídos: a limpeza é a de configuração, e a Conexão fica como está · o técnico toca *Gravar no módulo* e a cadeia corre de novo com os outros cinco, sem a prova do servidor · a sessão e o modo do vínculo continuam os mesmos

No palco: a folha `03` do exemplo divergente é a consulta parada *Divergência · outras ações*. O endereço simples abre o herói; o `print=1` continua montando a referência. A folha aberta pelo Outras ações no fluxo que confere permanece interativa.

## O véu da folha Outras ações

- **a folha *Outras ações* abre por cima da conferência** (a 00), escurecida pelo véu a 32%, o padrão do Material 3
- **no protótipo:** a conferência fica desenhada atrás · o *Encerrar antes de terminar?* desta tela escurece também o fundo da barra

## A ordem do script

- **toda lista de blocos segue o script**: Ativo, Cercas, Leitor, Eventos, Conexão · no *Conferindo*, no *Tudo confere* e no *Não bate com o cadastro* · a ordem não depende da ordem em que as divergências foram achadas
- **a linha do Ativo**: compara o que o módulo traduz da CAN com o cadastro do ativo, em palavras do técnico: *traduz a CAN do OF-1621* · o contador conta cinco blocos
- **o bloco se chama Conexão** · a divergência diz o par: *no módulo · Claro · claro.com.br* e *no cadastro · TIM · timbrasil.br* · o Leitor também: *no módulo · fio verde* e *no cadastro · fios azul e amarelo*
- **"Reenviar tudo, menos a conexão"**, com a linha *Mantém a conexão do módulo. Apaga só a configuração.* · a limpeza de configuração do módulo também apaga a APN e o servidor: a conexão se mantém porque o app lê os dois antes de limpar e grava de volta no fim
- **o revisar em seguida** tem *Reenviar* em cada bloco, na ordem do script, com o motivo: o leitor *usa os cartões que as cercas apagaram*, os eventos *usam as cercas e o leitor*
- **"Corrigir este bloco" nunca envia mais de um bloco** · quando o bloco tem dependente, abre a folha de confirmação da T09
- **a Conexão de outra operadora pergunta antes** (a 07): *Corrigir este bloco* na Conexão, quando o cadastro manda uma operadora e o módulo está com outra, abre a folha de confirmação: *Reenviar a conexão troca a operadora do módulo.* e *O cadastro manda TIM · timbrasil.br, e o módulo está com Claro · claro.com.br. Confira se o chip no módulo é da TIM: com outro chip, ele para de falar com o servidor.*, com `Reenviar a conexão` e `Cancelar` · a Conexão não tem dependente: a folha é pelo chip, que a operadora errada deixa mudo · com a mesma operadora, nada muda: a Conexão vai direto, sem folha · reenviada, a Conexão espera o servidor, como na instalação nova (T09/34)
- **no protótipo:** as cinco linhas são `BLOCOS_DO_SCRIPT` ([reenvio.js](../../06-prototipo/app/src/estado/reenvio.js)); o Ativo diz *traduz a CAN do* e o modelo do ativo (no par divergente, o `confere` do caso); a Conexão que confere diz a operadora e a APN da conexão da empresa (*TIM · timbrasil.br*), e a que diverge, o par do caso (*Claro · claro.com.br* no módulo); o Leitor, os fios do leitor do modelo (*fios azul e amarelo*; no módulo do par divergente, *fio verde*) · o *Reenviar tudo, menos a conexão* diz *Mantém a conexão do módulo. Apaga só a configuração.* (01 e 03) · o *revisar em seguida* lê o que ficou para depois numa manutenção (`etapas.manutencao.faltaReenviar`), com o motivo do mock e o Reenviar · o Corrigir este bloco com dependente abre a folha de confirmação da T09 (a 06, a URL diz o 06 enquanto ela está aberta), e sem dependente corre direto
  - no protótipo · a 07: a Conexão de outra operadora (`trocaDeOperadora`: a operadora do módulo, antes do *·*, diferente da do cadastro) abre a folha de confirmação da T09 com o título e a frase da 07 (`FolhaDeConfirmacao` · `titulo` e `texto`), e a URL diz o 07 enquanto ela está aberta · o `Reenviar a conexão` corre a curta da Conexão, que espera o servidor (T09/34); o `Cancelar`, o xis, tocar fora, arrastar e o voltar fecham a folha · com a mesma operadora, a Conexão corre direto · no palco, a 07 é consulta parada (*Divergência · corrigir a conexão*), como a 06
  - *Reenviar tudo, menos a conexão* leva à T09 sem a Conexão (a 30): a Conexão *fica como está*, e a limpeza de configuração não a toca no desenho — o ler e gravar de volta a APN e o servidor (acima) é do módulo de verdade, sem passo próprio na cadeia
  - o rodapé da 02 e da 04 fica a 2–3px da referência (diferença conhecida)
  - no protótipo · a medição (`node scripts/tela.mjs todos T11`, contra o HTML): 0% na 00, 01, 02, 03 e 05 · 0,48% na 04, o rodapé desligado e os traços das que esperam (acima) · 0,52% na 06 e 0,59% na 07, a frase da folha de confirmação, que a peça escreve em 500 e as duas desenham em 400 (diferença conhecida da peça) · na escala 1 (`node prints/tela1.mjs T11 <ref>`), 0% na 00 e 0,96% na 07 · a régua dos textos (`node scripts/textos.mjs T11`) aponta a 03, a 06 e a 07, porque a conferência atrás da folha fica inerte e a régua não lê o que está inerte (o `textos.md` lista o fundo), e a 04, porque o veredito que espera a última linha já está no lugar, mudo e escondido, com a contagem do fim (*5 de 5*): o que se vê bate com o `textos.md` nas oito
