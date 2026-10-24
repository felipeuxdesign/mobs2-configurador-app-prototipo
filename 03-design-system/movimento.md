# O movimento

**O movimento conta o que mudou. Ele nunca chama atenção pra si.** O que impressiona neste app é a evidência nascendo na frente de quem olha — o diagnóstico acendendo, o tambor rolando, o prazo drenando. A transição entre telas é quase invisível justamente pra esses momentos aparecerem.

## O vocabulário do app

Quem usa o app está em campo — no pátio, embaixo do ônibus, com o arnês na mão. O movimento é curto e é sempre o mesmo. Nada decora: tudo informa ou confirma.

- **O pressionado responde no dedo, sempre igual.** Entra no toque e solta em 100ms.
- **O estado troca no lugar.** O texto, o número e a cor mudam onde estão. Nada muda de lugar nem de altura.
- **O que é novo esmaece no lugar, em 150ms.** O check, o aviso, a causa, o texto novo do botão. O espaço abre direto.
- **O processo acende em ordem**, no ritmo da tabela dos processos, embaixo. Com reduzir movimento, no mesmo ritmo.
- **O veredito assenta no fim, no lugar já reservado, sem vão.** A caixa já está lá, neutra, contando a prova. A palavra e a cor entram com a última linha.
- **A folha e o diálogo sobem e descem com o mesmo peso**, sempre do mesmo jeito. O véu não pisca.
- **A troca entre telas é curta e discreta.** Só o conteúdo esmaece, em 150ms.
- **A volta é o mesmo movimento ao contrário**, no mesmo tempo.

## Os tokens

| Token | Valor | Uso |
|---|---|---|
| `--mov-rapido` | 150ms | esmaecer, pressionar, trocar de tela, o check aparecer · a troca de quadro, o aviso que surge, o texto novo do primário e a camada do primário que acende, o diálogo, a folha que fecha, o traço do campo em foco, o marcador de escolha, a palavra do veredito, a lista que se reorganiza |
| `--mov-padrao` | 200ms | a folha subir, a faixa da sessão descer ou subir · a folha que volta ao lugar depois do arraste ou do `Cancelar`, a seção do checklist que abre e fecha, e os itens dela |
| `--mov-lento` | 300ms | o marcador correr na barra, a rodinha do tambor, o trilho da cadeia · a barra do checklist que avança, a diferença da régua que encolhe, o indicador de rolagem que some |
| `--mov-curva` | cubic-bezier(0.2, 0.8, 0.2, 1) | desacelera no fim · a curva de tudo, menos do que é linear · o *esmaece* e o *acelera* das tabelas das telas também são ela; linear, só a barra que segue um processo |
| `--mov-solta` | 100ms | o pressionado solta · o dígito do código aparece na célula (T01) · zera no reduzir |
| `--mov-escalonar-lista` | 80ms | entre as linhas da cascata, quando a busca da T05 acha · zera no reduzir |
| `--mov-escalonar-tambor` | 40ms | entre as rodinhas do tambor, a unidade primeiro (T10) · zera no reduzir |
| `--mov-fator` | 1 · 0 no reduzir | o trecho da barra que segue um processo dura o passo do processo vezes ele: com reduzir, a barra salta pro valor de cada passo, e o processo segue no mesmo ritmo · a baixa da T03, o prazo da T14 |
| `--escala-toque` | 0.98 | o primário e o secundário afundam 2% no toque |
| `--escala-dialogo` | 0.98 | o diálogo nasce de 98% e cresce a 100% |
| `--escala-surge` | 0.8 | o que surge no lugar parte de 80%: o quadrado do checkbox e o marcador de escolha |
| `--toque-apagado` | 0.7 | o botão sem fundo apaga no toque: o só-ícone (o olho, o xis) e o avatar da tira |
| `--rolagem-espera` | 900ms | quanto o indicador de rolagem fica depois que a rolagem para · não é movimento: não zera no reduzir |
| `--folha-arraste-folga` · `--folha-arraste-limite` | 8px · 56px | o arraste da folha, na linha *folha · o arraste*, embaixo · não zeram no reduzir |

**Tempo e curva só saem destes tokens.** Nenhum tempo solto no código. O ritmo de um processo não é token: mora em `src/estado/ritmos.js`, espelho da tabela dos processos. A espera do toque duplo (300ms, em *Por cima da tela*) mora lá também: não é movimento.

## Entre telas

Só **o conteúdo** esmaece, em 150ms. **A barra do sistema e a faixa da sessão ficam paradas** — elas não mudam entre as telas de uma sessão, e o técnico sente que continua no mesmo trabalho. Nada desliza de lado.

**Como é, no protótipo:**

- **O conteúdo** é o miolo, o rodapé e o que estiver solto no fluxo. O conteúdo novo vai de 0 a 1; o velho sai de uma vez.
- **Só um toque dispara:** o do técnico, e o voltar do Android (no computador, o Esc), que faz o mesmo que a saída do rodapé.
- **Não dispara** no pulo do palco, num estado da coluna, no `Voltar ao fluxo`, no `Recomeçar`, no recarregar, na primeira abertura, no print, nem no endereço que a tela só acerta. O processo que leva sozinho a outra tela também troca direto (os 4 passos da T16).
- **O que vem por cima fica de fora**, como o topo: o véu, a folha, o diálogo e o indicador de rolagem. O diálogo que nasce aberto com a tela nova aparece direto, e o conteúdo esmaece embaixo dele.
- **A exceção do menu.** Quando o topo muda — a ida e a volta do menu, a T03 à T04, a T04 à T05, a T15 sem sessão —, a barra, a tira e a faixa trocam direto. O topo do menu é outro desenho, e não a mesma faixa se mexendo.
- **Uma troca no meio de outra** recomeça do 0.
- **O processo que só pode começar depois da troca espera ela acabar**: o diagnóstico da T07, a cadeia da T09 e a conferência da T11. Chegando por um toque, o primeiro passo vem depois dos 150ms da troca; pelo endereço e com reduzir, logo.
- **Com reduzir movimento**, a troca é direta.

## O quadro que troca inteiro

Quando o título ou o rodapé trocam inteiros dentro da mesma tela, o conteúdo esmaece em 150ms, **como entre telas** — por um toque ou pelo processo. Pro técnico, é outra página.

| Tela | Os quadros |
|---|---|
| T01 | a entrada, o canal, o código e a senha nova do recuperar acesso |
| T03 | a baixa, a parada e a sincronização concluída (00 → 02, 00 → 01, 01 → 00) |
| T05 | a lista (01) e o escolhido (00, 02, 04) · a busca de novo, 01 → 00 → 01 |
| T06 | a lista e o *Confirmar o vínculo* |
| T10 | o `Calibrar o horímetro`: o passo seguinte é outro desenho (a calibração não tem câmera, decisão 52) |
| T12 | a lista e o detalhe da instalação |
| T13 | as seções e o item aberto · o próximo item depois do `Usar foto` e do `Salvar com ressalva` · a volta |
| T14 | a fila que drena antes do disparo (01 → 00), o prazo estourado, o `Disparar outro evento` e o ciclo concluído |
| T16 | o encerramento, a sessão encerrada, os 4 sem homologar, a encerrada sem homologar e a interrompida |

- **O que nasce com o quadro não esmaece de novo por dentro dele:** o rodapé e o texto do primário, o último passo, o check das fotos na volta do item. Entre quadros, só a troca esmaece.
- **O estado que só muda o que está escrito, ou uma peça no lugar, move só a peça:** o `Ler de novo` da T07, a recuperação da T09, abrir e fechar uma seção da T13, e a foto no quadro da câmera da T13: no `Tirar foto`, a foto e o registro esmaecem em 150ms no lugar da imagem ao vivo, e o quadro fica do mesmo tamanho; no `Tirar de novo`, o contrário (decisão 63).

## No lugar

| O quê | Como |
|---|---|
| **o check que nasce** | o glifo novo esmaece no poço em 150ms · o que chega com a leitura esmaece junto: o valor, a causa, a nota · o título, a cor e a altura trocam direto · só quando troca depois de a tela abrir |
| **o número que conta** | troca no lugar, sem animar: a contagem do cabeçalho, o placar, o contador do menu |
| **o aviso que surge** | esmaece no lugar em 150ms, só quando aparece depois de a tela abrir · o espaço abre direto, e nada desliza |
| **a prova que chega** | a faixa da cadeia concluída (T09/04), que não tem lugar reservado, esmaece no lugar em 200ms (`--mov-padrao`), e o espaço dela abre direto |
| **a cor que muda** | onde a linha pede o movimento, a cor nova entra por uma camada, em 150ms: o traço do veredito · a cor de um valor ou de um número troca direto |
| **o primário que acende** | uma regra só, no toque e no fim de um processo · **com o mesmo texto**, acende por uma camada em 150ms · **com outro texto**, o texto novo esmaece no lugar em 150ms e o roxo troca direto · o que se desabilita troca direto |
| **o campo em foco** | um foco só: o que a tela diz, ou o do próprio campo, nunca o de dentro do poço · o traço de 2 é desenhado por cima da borda de 1: a capa dele encolhe da esquerda pra direita em 150ms (só `scaleX`), e o rótulo troca a cor direto · nada sai do lugar |
| **o marcador de escolha** | o quadrado lima surge no poço, de 80% a 100% e esmaecendo, em 150ms · o que perde a marca faz o contrário · em toda escolha |
| **o semeado e o não confere** | o tambor rola até o relido (500ms); quando para, a diferença encolhe e esmaece em 300ms; aí o veredito entra em 150ms, com o poço, o alvo, o segmento e o primário no mesmo quadro, aos ~800ms da releitura |

**A animação que acaba não fica viva**: sem preenchimento onde não há atraso.

## O traço que se desenha

**O gesto do app: o traço lima que se desenha da esquerda pra direita diz que algo se confirmou.** `scaleX` de 0 a 1, 300ms (`--mov-lento`), desacelerando, **uma vez só**, e só no fluxo — pela URL, no print e na coluna do palco, ele já aparece desenhado. Com reduzir movimento, aparece direto.

- **T05/07** · a conexão confirmada: embaixo da linha do módulo, quando ele responde
- **T16/02** · a visita fechada: embaixo da prova do veredito, quando as sete assertivas terminam sem falha bloqueante

Nunca durante uma espera: enquanto nada se confirmou, não tem traço.

## O veredito que espera a prova

Vale pro veredito da conferência da T11. O autoteste da T16 não tem veredito enquanto corre (a T16/07): a contagem fica ao lado do título, e o fim é outro quadro.

- **A caixa do veredito está no lugar desde o começo**, com a altura do quadro final. Nada muda de altura entre o começo e o fim.
- **Enquanto a prova corre, a caixa fica neutra e diz o que corre** (a T11/04): *CONFERINDO* em `--tinta-secundaria`, sem poço à vista, com o traço no `--borda-poco`. Quando o veredito final tem poço, o lugar dele já está guardado, invisível: nada muda de lugar.
- **A contagem acompanha a prova** no lugar do número (*1 de 5* … *5 de 5*, os cinco blocos do script na T11), em `--tinta`, com a unidade em `--tinta-secundaria`. Começa com a primeira linha e troca no lugar.
- **Na última linha, o veredito entra em 150ms:** a palavra, já na cor dela, a cor do traço por uma camada, e — quando não bate — o poço com o xis. O rodapé, desligado enquanto a prova corre, vira o do quadro.
- **O leitor de tela só ouve o veredito no fim.**
- **Com reduzir movimento**, a prova e a contagem andam no mesmo ritmo, e a palavra e a cor entram direto.
- **Nascido pronto** (no print, na coluna, pelo endereço), o veredito já está lá, parado.

O checklist registrado da T13 chega no `Finalizar`: a barra completa em 300ms e o veredito esmaece em 150ms no lugar. O espaço dele abre direto.

## O que muda de lugar

O layout vai direto pro quadro final. O que muda de lugar na mesma vista vai do lugar antigo ao novo **só por deslocamento**. Nenhuma altura anima.

| O quê | Como |
|---|---|
| **a lista que se reorganiza** | o que fica desliza em 150ms · o que sai esmaece por cima, numa cópia muda, no lugar dele · o que volta esmaece no lugar · o cartão corta o que passa da borda · a busca da T06, o `Ressincronizar e reenviar` da T15, a caixa do não conforme da T13 |
| **a cascata** | só quando a busca acha: cada linha esmaece em 150ms, 80ms depois da anterior · ao abrir e ao marcar, parada · com reduzir, juntas |
| **a seção do checklist** (T13·1) | abre: as de baixo descem em 200ms, a seta gira e os itens esmaecem junto · fecha: o contrário, e os itens saem com o cartão, que corta o que passa da borda |
| **o que abre espaço em cima de uma lista que se move** | abre direto · só a peça que abre ou fecha move as vizinhas |

## A faixa

- **A faixa que nasce** (T07, quando as oito verificações do módulo passam sem trava; a linha de mensagens só informa — a sessão nasce na conexão; a R-05 no protótipo) desce de cima em 200ms, por baixo da barra do sistema. O que ela empurra vai de onde estava ao lugar novo só por deslocamento, no mesmo tempo.
- **A faixa que encerra** (T16) sobe em 200ms e revela, embaixo, a faixa sem sessão, que já está no lugar. Nada do layout se move.
- **A barra do sistema é do aparelho**: não se move, a cor troca direto, e ela fica por cima de tudo o que o app desenha.
- **O ENCERRAR que se apaga** (lei 17) troca de tinta direto.
- **Com reduzir movimento**, a faixa aparece e some direto.

## Por cima da tela

**Cobertura das folhas:** o véu escurece todo o fundo do app, inclusive tira, faixa e fundo da barra de status, sem deslocar o painel. A hora e os ícones oficiais continuam legíveis. No menu da T04, os diálogos compartilham essa cobertura; a caixa mantém o mesmo lugar. A mesma cobertura vale pra todo diálogo (T02, T13/10 e o *Encerrar antes de terminar?* de toda tela), e o véu é a cor do tema a 32%, com a tela de origem atrás; o movimento não muda.

| O quê | Como |
|---|---|
| **folha** | o painel sobe de baixo (translateY 100% → 0) em 200ms e o véu esmaece junto · fecha em 150ms |
| **folha · o arraste** | **proposta do protótipo, a confirmar** (lei 20): o painel acompanha o dedo pra baixo, só por transform, depois de 8 (`--folha-arraste-folga`) · soltando depois de 56 (`--folha-arraste-limite`), desce de onde parou e fecha em 150ms, e o véu esmaece junto · soltando antes, volta ao lugar em 200ms · só a posição decide, nunca a velocidade |
| **diálogo** | esmaece e cresce de 98% a 100% em 150ms · o véu esmaece junto |
| **teclado do aparelho** | cenário do sistema, só na T01/03: sobe de baixo (translateY 100% → 0) em 200ms, por baixo da pílula, e o rodapé sobe junto, só por deslocamento · fecha em 150ms · com reduzir movimento, aparece |
| **pressionado** | no toque — no computador, no clique. O primário vai pra `--roxo-pressionado` e afunda 2%; a linha tocável sobe pra `--elevado`; o link vai pra `--tinta`. Solta em 100ms |
| **pressionado · o só-ícone** | o olho, o xis e o avatar da tira apagam a 0,7 (`--toque-apagado`) · solta em 100ms |
| **pressionado · o checkbox** | a área de 48 sobe pra `--elevado`, por baixo do poço e do texto, como a linha tocável · solta em 100ms · parado, nada muda |
| **pressionado · o resto** | o secundário afunda 2% · o ENCERRAR e o nome da empresa na tira vão pra `--tinta` · no arraste da folha, o pressionado some |
| **pressionado · o desabilitado** | o que se desabilita no próprio toque não mostra o pressionado: a camada sai direto · no primário, só o afundar solta, em 100ms |
| **o primário que nasce de um toque** | **um toque não vale por dois** (decisão 64): o primário que um toque faz nascer, o texto novo no mesmo botão ou o da folha que o toque abriu, só responde 300ms depois de nascer, o tempo do toque duplo do Android · nesses 300ms, o toque não faz nada, nem o pressionado · é o que impede o segundo toque de cair no que nasceu embaixo do dedo: o `Finalizar instalação` que vira `Encerrar sessão` (T13/00 → 11) e o `Reenviar as cercas` que abre a folha com o mesmo `Reenviar as cercas` (T09/08 → 13) · não é movimento: vale também com reduzir movimento |
| **a folha que vira diálogo** (T04) | o véu integral fica escuro, parado · a folha desce em 150ms enquanto o diálogo nasce em 150ms · no `Cancelar`, o diálogo some em 150ms enquanto a folha sobe de novo em 200ms · a tira e a faixa já estão cobertas: não entra um trecho novo nem há clarão no topo · no `Continuar a instalação`, o diálogo e o véu saem juntos |
| **a presença** | toda folha e todo diálogo do app nascem e somem pela mesma peça · o que sai continua desenhado, mudo e sem toque, até acabar de sair · aberto desde o começo (pelo endereço, na coluna, no print), parado |
| **interruptor** | a bolinha desliza pro outro lado do trilho e cresce de 16 pra 24 ao ligar — ou encolhe ao desligar —, e o trilho se enche de `--roxo`, em `--mov-padrao` (200ms) · enquanto o dedo está em cima, a bolinha cresce pra 28 · reduzir movimento: troca direta |
| **troca do tema** | ao ligar ou desligar o *Modo claro*, o app inteiro troca as cores dos tokens **no lugar**, em `--mov-lento` (300ms) — a folha da Conta continua aberta, nada se move, só a cor muda · reduzir movimento: troca direta |
| **no protótipo · o interruptor e a troca do tema** | o movimento usa só transform e opacity: a bolinha tem 24 e encolhe a 16 (`--interruptor-desligado`) ou cresce a 28 (`--interruptor-apertado`) por `scale`, desliza por `translateX`; o roxo do trilho e a cor da bolinha ligada são camadas que entram por opacity, no mesmo `--mov-padrao` · a troca do tema é a única transição de cor do app: enquanto dura (`--mov-lento`), a raiz leva `data-tema-trocando`, e toda cor — fundo, texto, borda, traço dos ícones — transiciona no lugar (`src/ds/base.css`) · reduzir movimento: as duas viram troca direta |

## A volta

**A volta é o mesmo movimento ao contrário, no mesmo tempo.** O campo que perde o foco, o requisito que deixa de ser cumprido, a marca que sai, o diálogo que fecha, a seção que fecha, a caixa do não conforme desmarcada. A folha continua fechando em 150ms.

## Os processos

Mudam **no lugar**. O ritmo do protótipo é de apresentação: rápido o bastante pra não cansar, devagar o bastante pra acompanhar cada prova.

| Processo | Ritmo no protótipo |
|---|---|
| diagnóstico · cada linha | 600ms |
| cadeia · cada etapa | 2 s: 1,2 s gravando e 0,8 s conferindo · a Limpeza, 1,2 s, um comando só, sem conferir · a Conexão, 1,2 s gravando e 1,2 s esperando o servidor, com o tempo dele contando 10 vezes mais rápido (até *12 s*) |
| conferência da T11 · cada linha | 400ms |
| encerramento · cada passo | 600ms |
| autoteste · cada assertiva | 400ms |
| ciclo de testes · cada passo | 3s |
| ciclo de testes · no protótipo | até quatro passos aplicáveis; a semente traz dois feitos. O módulo lê o cartão e espera `Confere com o cartão` ou `Não confere`; a ignição desligada vem depois da resposta, na cadência de 3s. O cálculo exato está em `T14/ciclo.js` (`tiqueDe`), e a saída atual em `T14/animacao.md`. |
| ciclo de testes · a fila do módulo drenando, antes do disparo | 3s no total · depois, o `Disparar evento de teste` acende |
| prazo do evento | 1s real vale 4s de prazo |
| sincronização do pacote | 4s no total |
| cronômetro do código (T01) | 1s real vale 1s · o prazo e o reenvio abrem cheios, como o mock diz |
| semear da calibração (T10) · gravando e relendo | 1s + 1s · o botão diz *Gravando no módulo…* e depois *Relendo…*; aí o tambor e a régua (a `animacao.md` da T10) |
| espera do Entrar da T01 | 1,2s · no protótipo, a resposta do servidor ao `Entrar`: o primário diz *Entrando…*, desabilitado, sem indicador girando (o padrão do *Gravando no módulo…* da T10, e a lei do loop fica sem exceção); a T02 chega com a troca entre telas, como a resposta do toque (`Troca.jsx` · `respostaDoToque`) · no aparelho, o tempo é o do servidor |
| busca da T05 · a busca de novo | 1,2s · o número do `animacao.md` da T05: 400ms passaria sem o técnico ver que buscou · no protótipo, o quadro da busca da T05/00 fica na tela, e a lista volta sem nada escolhido (a T05/01) — o *Procurando…* do `animacao.md` não está em referência nem em `textos.md`, e fica de fora (diferença conhecida da referência) |

**Como o processo se move:**

- **A barra que segue um processo** anda num trecho linear por passo, o passo vezes `--mov-fator`, só por transform: a baixa da T03 (250ms por item, na janela dos ativos), o prazo da T14 (250ms por tique) e a etapa que grava na T09 (100ms por passo, na gravação e de novo na releitura). Com reduzir, salta pro valor de cada passo, no mesmo ritmo.
- **O tambor** rola na troca de valor: 300ms por rodinha, 40ms entre elas, a unidade primeiro, 500ms no total. Nunca ao abrir.
- **O trilho da cadeia** acende de cima pra baixo em 300ms, só na cadeia da T09. No encerramento da T16, o trilho troca direto.
- **A barra do checklist**, na volta do item às seções, parte do valor de quando o item abriu e avança em 300ms. No `Finalizar instalação`, completa em 300ms.
- **Sem ritmo declarado, fica parado**: o envio da fila da T15, e a contagem do envio das mensagens do módulo (T09/29), que fica no *5 de 12* da referência. O firmware da T07/06 já tem ritmo: o quadro dos 62% por 1 s, e o diagnóstico relê.
- **Toda espera tem fim** (decisão 64), mas o tempo limite não é ritmo do protótipo: é o da integração, que o produto confirma. No protótipo, nenhuma espera estoura: o desfecho vem do caso do mock, como todo estado, e os da decisão 64 abrem pela coluna, parados, sem disparar no fluxo do herói: o pareamento que o celular não confirma (T05/20), a atualização que não terminou (T07/14), o módulo que não voltou, na cadeia (T09/35) e no reinício (T16/10).

## Só isto se move

`transform` e `opacity`. **Proibido:** animar a entrada de uma tela, contar de zero ao abrir, mover o layout, animar em loop, e qualquer coisa que reaja ao mouse passando por cima. **O dado ao vivo não é loop:** o sinal que muda de verdade troca o número no lugar a cada leitura, sem transição — os sinais da CAN, na T07.

**Entrada sem animação.** Abrir uma tela não anima sua entrada nem conta um valor de zero. As consultas de `Estados desta tela` e o modo de fotografia ficam parados. No percurso navegável, os processos declarados podem começar ou continuar: sincronização, diagnóstico, conferência, drenagem da fila e encerramento, conforme a ficha de cada tela. `Voltar ao fluxo` restaura o estado global guardado; processos e escolhas locais têm as limitações descritas em `06-prototipo/palco.md`. Recarregar volta ao login. **No print, nada se move:** a tela nasce no quadro da referência.

**O indicador de rolagem** é do sistema, como a barra: aparece enquanto a tela rola e some em 300ms, 900ms depois de a rolagem parar.

## Reduzir movimento

Com `prefers-reduced-motion`, **toda duração vira zero**: a troca é direta. Os processos continuam andando no mesmo ritmo — a prova continua nascendo em ordem, só que sem movimento.

**No protótipo:**

- zeram `--mov-rapido`, `--mov-padrao`, `--mov-lento`, `--mov-solta`, `--mov-escalonar-lista` e `--mov-escalonar-tambor`, e o `--mov-fator` vai a 0;
- a barra que segue um processo salta pro valor de cada passo, e o processo segue no mesmo ritmo;
- as linhas de um processo acendem em ordem, no mesmo ritmo, sem esmaecer — também as assertivas da T16;
- a troca entre telas e entre quadros, a folha, o diálogo, a faixa e o veredito que assenta são diretos;
- o `--rolagem-espera`, o arraste da folha e a espera do toque duplo não são movimento, e ficam.

Cada tela diz o que se move nela em `02-telas/<tela>/animacao.md`.

**A régua:** `app/scripts/caminho.mjs` toca pelo nome e grava o que animou depois de cada toque. Os roteiros de movimento são os `app/scripts/caminhos/mov-*.mjs`, um por tela e um por peça.
