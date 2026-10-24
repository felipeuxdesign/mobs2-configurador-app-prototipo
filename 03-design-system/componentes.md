# Os componentes

Cada peça abaixo está **desenhada numa folha** de `referencias/` e foi **recortada da tela onde foi aprovada**. Construa cada uma como componente, uma vez, e use em todas as telas da lista.

**Cobertura:** toda folha usa `--veu` sobre o fundo inteiro do app, inclusive tira, faixa e fundo da barra de status; a hora e os ícones oficiais ficam legíveis. Os diálogos do menu da T04 compartilham essa cobertura para preservar o véu nas trocas. A geometria de folhas e caixas não muda. **O véu como o Material 3 oficial:** o `--veu` é a cor do tema a 32%, a opacidade padrão do Material 3 (`ScrimOpacity = 0.32`), e a tela de onde a folha ou o diálogo saiu fica desenhada atrás, escurecida, nunca um fundo vazio · a cobertura integral vale pra todo diálogo, onde quer que ele abra: o aviso de outra sessão da T02 (T01/18), *A Seção F não passou* (T13/10) e o *Encerrar antes de terminar?* de toda tela com a faixa (T05 a T16).

## Folha 1 · fundamentos · `referencias/png/folha-1-fundamentos.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| falha | traço vermelho embaixo | T01 |

## Folha 2 · chrome rodape folha dialogo · `referencias/png/folha-2-chrome-rodape-folha-dialogo.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| barra do sistema | não é do app · cenário fixo: a barra oficial do Android, com o 9:30 · o espaço da câmera reservado, sem desenhar | T06 T07 T09 T10 T11 T12 T13 T14 T15 T16 |
| barra do sistema no menu | sobre o fundo da tira | T04 |
| barra do sistema sem sessão | a cor da página — ela sangra no que vem embaixo | T01 T02 T03 T07 |
| faixa · sessão aberta | LED lima, serial, placa e o ENCERRAR | T06 T07 T09 T10 T11 T12 T13 T14 T15 |
| faixa · sem sessão | LED apagado · só o fato | T12 T15 T16 |
| faixa · módulo com falha | o serial sai · LED vermelho | T04 |
| faixa · sem ação | na tela que ela abriu — o encerramento | T04 T06 T07 T09 T10 T11 T12 T13 T14 T15 T16 |
| tira de contexto | só no menu · a empresa e a conta · com uma empresa só, o nome fica sem a seta e não toca | T04 |
| faixa no menu | 50 em vez de 52 · embaixo da tira | T04 |
| o topo do menu inteiro | tira e faixa juntas | T04 |
| duas ações | primário 56 · link com 48 de toque | T02 T03 T05 T06 T07 T09 T10 T11 T13 T14 T16 |
| uma ação | quando só existe um caminho · variante só com o link, sem o primário: as ações moram nas linhas, e o rodapé fica com a saída (T11/00 e 05) | T06 T09 T11 T12 T15 |
| processo correndo | o primário diz o que acontece | T09 T16 |
| com legenda | uma linha que explica a ação, a 12px do botão | T01 T05 T06 T10 T13 |
| folha | sobe do rodapé · puxador · X · véu sobre todo o fundo do app, incluindo tira, faixa e fundo da barra de status · **com escolha**: a lista marca e o primário embaixo dela troca, como a T02 (R-14: *Sincronizar*, apagado até outra empresa ser marcada, e *Espera o envio terminar* com o envio subindo, T04/07, 21 e 08) | T04 |
| diálogo | só pra ação que encerra trabalho · **o véu cobre a tela inteira onde quer que ele abra**: a tira de contexto, a faixa da sessão e o fundo da barra, com a hora e os ícones por cima · **atrás dele fica a tela de onde o diálogo saiu**, escurecida a 32% (o padrão do Material 3), nunca um fundo vazio · vale pra todo diálogo e folha · o *Encerrar antes de terminar?* abre assim em qualquer tela, da T04 à T16 · **o que joga trabalho fora pergunta antes, e diz o que fica** (decisão 64): o sair da conta, sempre, com a última frase dizendo que o login de depois precisa de rede (T04/06, 17 e 20) · o descartar da sessão interrompida, que grava a conexão antes (T16/11) · o voltar com a ressalva começada (T13/51) | T04 T13 T16 |
| diálogo sem saída | quando o que aconteceu já está feito · uma ação só | T01 T04 |
| diálogo com ciência | o técnico assina a decisão · o primário espera o check · a frase diz a causa antes do que acontece (*O evento de teste não chegou ao servidor.*, T13/10) | T01 T13 T14 |
| folha com opções | cada saída numa linha, com o que ela faz · o véu cobre todo o fundo do app | T01 T04 T11 |
| barra do sistema sob o véu | escurece o fundo; mantém os ícones legíveis · com folha ou diálogo aberto, em toda tela, também sobre a tira e a faixa de sessão | T01 T04 T11 |

## Folha 3 · glifos icones poco · `referencias/png/folha-3-glifos-icones-poco.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| escolha numa lista | o quadrado lima cheio é o escolhido | T01 T02 T05 T09 |
| ainda não | círculo apagado · valor em traço | T07 |
| espera | tracejado · a causa no lugar da ação · **o respiro mínimo de 8px entre o ícone e o texto, o mesmo do cartão ligado**: o título de duas linhas nunca encosta no ícone | T04 |

## Folha 4 · linhas cartoes aviso · `referencias/png/folha-4-linhas-cartoes-aviso.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| aprovada | check lima · valor em --tinta-secundaria | T07 |
| reprovada, com causa | X, título e valor em vermelho · a causa embaixo · variante com a ação embaixo do par, alinhada ao nome, com o poço no meio do bloco (*Corrigir este bloco*, T11/00 e 05) | T07 T11 |
| não se aplica | traço · a assertiva que não vale pra este ativo | T11 T12 T13 T16 |
| só informa | i cinza · o valor à direita · a frase diz que dá pra seguir | T07 |
| lista longa | média · 44 · a CAN e o checklist | T07 |
| passo do ciclo | compacta · 38 | T14 |
| assertiva da sessão | dupla · 50 | T11 T12 T13 T16 |
| linha de conferência | dupla · 50 | T11 T12 T13 T16 |
| passos com o prazo estourado | a lista inteira da T14 | T14 |
| disponível | ícone em poço · nome embaixo | T04 |
| decide agora | borda lima · o próximo passo · o cartão do módulo, com o link perdido, diz *toque para reconectar* (T04/03) e, tocado, *reconectando…* (T04/18) | T04 |
| conectado | o cartão largo com o serial | T04 |
| com pendência | o contador no canto, igual ao da fila | T04 |
| espera a rede | sem conexão · fundo apagado, borda sólida, traço no poço | T04 |
| aviso | o mesmo desenho, cinza, sem traço | T03 T06 T09 T12 T16 |
| processo parado | o veredito de uma cadeia ou de um download | T03 T07 T09 |
| com contagem | quantos não bateram, à direita · a versão que confere, em lima e sem poço, diz o resultado da cadeia concluída (T09/04, *CONFERIDO NO MÓDULO · 6 passos*) e o tudo confere (T11/02) | T09 T11 |
| vazio declarado | tracejado · título e uma frase · sem ícone | T02 T06 T12 T15 |
| nota tracejada | o que falta explicar, sem ser aviso | T05 |
| nota com rótulo | o fato declarado, com o nome dele em cima | T04 T10 |
| os dados do modelo | rótulo em cima, valor grande · o fabricante e o modelo | T06 |
| linha do histórico | placa, módulo e hora · o veredito à direita | T07 T11 T12 T15 T16 |
| linha da fila · esperando | o que ainda não subiu | T15 |
| linha de empresa | na folha · o pacote e os ativos | T04 |
| linha de empresa · a atual | o marcador lima de 11px | T04 |
| a lista de empresas | na folha Trocar de empresa, com as três · o pacote diz a idade, e o que passou de 7 dias diz que venceu (*carregado há 8 dias, vencido*) | T04 |

## Folha 5 · processo, tempo e placar · `referencias/png/folha-5-instrumentos-cadeia-processo.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| cadeia antes de gravar | o relógio em cada elo · a limpeza diz o que faz | T09 |
| cadeia gravando | a etapa da vez troca a descrição pela barra (6, o trilho em `--borda`, o feito em `--lima-feito`) e pela contagem embaixo: o que já foi, na unidade da etapa, e o que falta · gravada, relê na mesma barra, *conferindo* · pronta, diz o que gravou · o contador ao lado do título conta as etapas que conferiram · o elo da cadeia inteira, gravando, tem 78 (`--cadeia-elo-gravando`); o da cadeia curta da manutenção fica nos 86 (`--cadeia-elo-correndo`) | T09 |
| cadeia concluída | trilho lima · cada etapa diz o que gravou · depois de gravado, o elo diz embaixo o que conferiu, com a divisória em cima (*O módulo falou com o servidor*, T09/04, 11 e 12) · o que não conferiu traz o *o que conferir* dentro do elo, sem a caixa, com o `Conferir de novo` ao lado do rótulo (T09/12: o link dentro do conteúdo, folha 6) · sem a Conexão (o *Reenviar tudo, menos a conexão* da T11), o elo dela diz *fica como está*, apagado, com o traço no poço (T09/30) | T09 |
| cadeia recusada | o elo que falhou acende · recusado de novo, o aviso diz *A CADEIA PAROU DE NOVO*, e o rodapé ganha a saída que grava só a conexão (T09/31) · gravando só a conexão, os que ficam por gravar dizem *pulado* (T09/33) | T09 |
| segmentado | um segmento por passo · **só onde se percorre** — nas fotos da Montagem sim, no detalhe de um item automático não | T01 T10 T13 |
| a pré-condição dos pinos | a primeira linha da configuração, embaixo do título · embaixo dela, o espaço (*cabe no módulo*), e, esperando o envio, a contagem ao vivo, com o relógio: *o módulo enviando · 5 de 12 mensagens* (T09/29) | T09 |
| encerrando | a legenda só no passo que corre | T16 |
| reiniciando | o reinício é automático · o técnico não faz nada · o passo que corre leva o quadrado de agora, como os outros (T16/01) · a conexão que cai diz reconectando (T16/08), e o módulo que não volta no tempo limite, *não voltou*, com o xis (T16/10) · **variante pede o corte**, o espécime ao lado na folha: o módulo que não reinicia por comando (o VL08) leva o glifo energia e *com você*, e a frase diz o que fazer, *Desligue a alimentação dele e ligue de novo, uma vez só.* · o único passo do encerramento em que o técnico age (T16/09, HU-T16-3) | T16 |
| sem homologar | só os quatro que deixam o módulo seguro · os pulados com traço | T16 |
| a barra do checklist | o que já passou, em lima · o número fica no título | T13 |
| cronômetro | o prazo drena | T14 |
| prazo cheio | antes do disparo · a fila drenando | T14 |

## Folha 6 · entrada escolha cabecalho · `referencias/png/folha-6-entrada-escolha-cabecalho.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| com contador | o contador conta o que passou · lima quando completo | T05 T06 T07 T09 T12 T13 T14 T15 T16 |
| a marca no login | o logo e CONFIGURADOR entre dois traços de 1px em `--borda-neutra` — no claro eles continuam aparecendo, com o mesmo peso discreto do escuro | T01 |
| campo | rótulo em cima · superfície rebaixada de 48, `--fundo-rebaixado` com as bordas `--rebaixado-*` · **campo é rebaixado qualquer que seja a largura**: as casinhas do código também · vazio, diz o que pede, em `--marca-limite`, e o texto some quando o técnico escreve (*Conte o que aconteceu*, T13/42) | T01 T13 |
| campo focado | rótulo e traço de baixo em lima | T01 |
| senha visível | o olho riscado esconde de novo · o nome muda pra Ocultar a senha | T01 |
| requisitos da senha | cada regra vira check quando a senha cumpre | T01 |
| código · seis células | uma célula por dígito | T01 |
| código errado | as células ficam vermelhas | T01 |
| link dentro do conteúdo | sublinhado · ação sobre o que está perto · 14/600, com o toque de 44 sem empurrar a linha (*Conferir de novo*, T09/12) · no painel semeado, o convite pra tocar no painel inteiro (*toque pra corrigir*, T10/01 e 09) | T01 T09 T10 |
| checkbox | o marcador de escolha: poço de 24 com o vazado de 11, e o texto do que se confirma | T01 T13 |
| checkbox marcado | o mesmo poço, com o vazado virando lima de 11 · surge em 150ms | T01 T13 |
| usuário lembrado | o xis no lugar do olho · limpa o campo e esquece o usuário | T01 |
| campo de busca | lupa e dica · quando a lista é longa | T06 |
| justificativa | o não conforme com o porquê | T13 |
| linha de opção | o ícone, o que faz, e pra onde | T01 T05 T06 T07 T09 T15 |
| linha de módulo | serial e variante · T05 | T05 |
| linha de ônibus | placa, modelo e frota · T06 | T05 T06 |
| bloco escolhido | traço lima embaixo = o escolhido, na hora de confirmar o vínculo | T06 |
| escolhido com trava · T06 | a placa com o motivo embaixo, e o caminho que resolve (*É uma das suas empresas: troque de empresa pra instalar nele.*, T06/04) | T06 |
| cartão que pede ação | o erro que precisa dele | T15 |
| o que conferir | as causas de uma falha, numeradas, antes de tentar de novo · nome da causa em negrito, o que conferir depois · variante sem a caixa, dentro do elo da Conexão (T09/12): o rótulo de 10 e as linhas de 13, as medidas da caixa | T05 T09 T13 |
| logo | o desenho da marca em uma cor só, pintado pelo token `--logo` — lima no escuro, o roxo institucional `#402070` no claro · nunca com a cor gravada dentro do arquivo, senão ele não troca com o tema | T01 |
| interruptor | o padrão do Material 3: trilho de 52 × 32 · desligado, contorno de 2px em `--borda-interruptor` e bolinha de 16 a 8px da borda em `--marca-limite`, trilho em `--poco` · é a bolinha que marca o estado, por isso o contorno pode ser mais leve no claro · ligado, trilho `--roxo` cheio e bolinha de 24 em `--texto-primario`, a 4px da borda · a linha inteira liga e desliga, não só a bolinha | T04 · a folha da Conta, *Modo claro* · desenhado na folha 9 |
| avatar da conta | círculo com as iniciais — 32 no topo, 52 na folha da Conta · fundo `--fundo-cartao` e contorno `--borda` — um cartão redondo, com o fundo e a borda de cartão, que inverte sozinho no claro · quem identifica o botão são as iniciais | T04 |
| tracinho vazio | o traço de 10 × 1 no meio de um poço sem conteúdo — a empresa que espera o envio terminar, na folha do menu (T04/08), o cartão do menu que ainda espera módulo ou ativo, a linha sem valor · sempre `--marca-vazia`, nunca a luz do poço, que some no claro | T04 · T09 |
| tracejado do vazio | o contorno tracejado de 1px de um cartão ou espaço que ainda não tem conteúdo · sempre `--borda-neutra`, a caixa neutra · sutil de propósito: diz "vazio" baixinho, com o mesmo peso nos dois temas · nunca o `--divisoria`, que some | T04 · T07 · T12 · T15 |
| botão secundário | fill `--fundo-botao`, um degrau fora do cartão (`#241F33` no escuro, `#F3F3F7` no claro), borda `--borda-botao` (`#3A3350` no escuro, `#E2E3E8` no claro, o mesmo tom do contorno do cartão) · **em cima de uma superfície rebaixada, o fill é `--fundo-botao-no-rebaixado`**: o botão sobe um degrau em relação ao que está embaixo dele, branco no claro · ela desenha a beirada do botão e o separa do desligado, que tem a borda dos cartões, texto `--tinta` · um desenho só em todo o app: os de rodapé e de folha, os de resposta (*Ouvi*, *Confere com o cartão*) e os compactos · **36px** no cartão dos dependentes, **30px** dentro de uma linha (*Reenviar*, *Corrigir este bloco*, *Testar bip*) · desligado: sem o fill, fundo e borda de cartão, texto apagado, e por isso se distingue do ligado · **a área de toque cresce até 48px sem aparecer**, como o Material 3 pede pro alvo mínimo | T04 T09 T11 T13 T14 T15 |
| o botão da linha | a resposta do técnico na própria linha: 40 de alto, os dois lado a lado a 8 (*Confere com o cartão* e *Não confere*, T14/08; *Ouvi* e *Não ouvi*, T13/40), ou do tamanho do texto, 30 (*Testar bip*, T13/40) · o desenho do botão secundário: fill `--fundo-botao`, borda `--borda-botao`, texto `--tinta` em 700 · no toque afunda, como o secundário · tocando, o fill vira o do cartão e o texto, `--tinta-apagada` (*Tocando…*, T13/39) · **a resposta se refaz** (decisão 64): o *Testar de novo* fica na linha do bip respondido (T13/41, 42 e 50), o *Passar de novo* na do cartão que não confere (T14/10), e o *Disparar de novo* na Seção F que falhou (T13/49) | T13 T14 |
| folha de confirmação | antes de reenviar um bloco que tem dependente · o título diz a consequência, o texto diz o que vai precisar ser reenviado depois · `Reenviar <o bloco>` e `Cancelar` · variante com link (T09/27), antes da limpeza apagar as mensagens que o módulo ainda não enviou: o primário é a ação segura, `Esperar o envio`, e o link, a que segue mesmo assim, `Gravar mesmo assim`, como o *Encerrar antes de terminar?* · a de gravar só a conexão, que diz o que fica por gravar (T09/32) · a de corrigir a conexão, que pede pra conferir o chip (T11/07) | T09 T11 · desenhada na folha 2 |
| cartão dos dependentes | depois de um bloco conferir, um item por dependente, na ordem do script: o número e o nome, o motivo, `Reenviar` e `Deixar para depois` · o `Reenviar` de quem depende de outro bloco só liga depois dele | T09 · desenhada na folha 4 |
| estado da ação na linha | no lugar da ação que já foi decidida: *fica para depois* (a ação de reenviar continua ao lado) · ou o check e *confere · reenviado* | T09 · desenhada na folha 4 |
| linha "revisar em seguida" | o bloco deixado para depois: o relógio, o nome, *revisar em seguida*, o motivo e o `Reenviar` · enquanto existir, o *Finalizar* fica desligado, com a causa | T11 T13 · desenhada na folha 4 |
| lista com contagem | o pacote baixando | T03 T07 T09 T16 |

## Folha 7 · checklist evidencia · `referencias/png/folha-7-checklist-evidencia.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| seção fechada | um cartão por seção · quem age, a contagem e a seta · lendo, o quadrado de agora no poço, enquanto o app lê (*lendo do módulo*, T13/38) | T13 |
| seção aberta · de leitura | o cartão cresce no lugar · as leituras sem seta | T13 T15 |
| seção aberta · de tocar | a Montagem no formato das outras seções (lei 23): a câmera no poço de 30, o estado à direita (*foto a tirar*, *com ressalva*) e a seta só na foto a tirar | T13 |
| item de leitura | sem seta · não toca · lendo, o quadrado de agora e o valor em `--tinta` (T13/38) · com a ação na própria linha, no lugar do valor (*Testar bip*, T13/39) · com o que a linha abre embaixo, a 40 da esquerda, com o traço do bloco inteiro (a pergunta do bip, T13/40; o campo do que aconteceu, T13/42) · **respondido, com a ação**: a resposta desce pra baixo do nome, e o botão da linha fica à direita, `Testar de novo` (T13/41, 42 e 50) | T13 |
| item de tocar | a foto a tirar: a câmera no poço de 30, *foto a tirar* à direita e a seta · abre a câmera | T13 |
| item feito | o check e de onde veio · sem seta | T11 T12 T13 T15 |
| item com ressalva | passou, mas diz a ressalva embaixo | T11 T12 T13 T16 |
| o veredito | o topo do checklist registrado, aguardando autoteste · o próximo passo embaixo | T13 |
| a ação da seção | uma linha só com seta · o resto é leitura | T13 |
| a câmera do app | no checklist; a calibração não tem câmera (decisão 52) · o quadro fica só com o ícone da câmera, e o que enquadrar fica na frase embaixo do título, nunca dentro do quadro: no app, a imagem ao vivo aparece dentro dele, sem nada por cima · **com a foto** (decisão 63): o `Tirar foto` congela a imagem no quadro, e o registro entra embaixo dela, dentro do quadro, que fica do mesmo tamanho (*Foto tirada às 14:30* e *confira se está nítida antes de usar*, T13/44 a 48) | T13 |
| foto · tirada | o registro, embaixo da foto, dentro do quadro da câmera: a hora e o que conferir · sem o check, porque ainda não vale: vale no `Usar foto` ou no `Salvar com ressalva` (decisão 63) · a do problema diz *Problema fotografado às 14:30* e *vai junto com a ressalva, pro gestor* (T13/15) | T13 |
| bloco do evento | o que foi disparado e recebido | T14 |
| linha da fila | o que sobe e quando | T15 |
| linha da re-checagem | a Seção F esperando o servidor | T15 |
| prova da cadeia | os seis blocos, gravados e relidos · sem uso nas telas: a cadeia concluída diz o resultado na faixa do *com contagem* (T09/04) · fica na folha 7, ao lado da prova da sessão | — |
| prova da sessão | o que sobreviveu ao reinício | T16 |
| contador no menu | itens na fila, no canto do cartão | T04 |

## Folha 8 · calibracao · `referencias/png/folha-8-calibracao.png`

| Peça | Regra | Telas que usam |
|---|---|---|
| valor rebaixado | o que o módulo conta hoje · `--fundo-rebaixado` | T10 |
| régua da diferença | a distância e o lado · vira "confere" depois · *o painel está 108 km à frente*: o número digitado errado salta aos olhos antes de semear (T10/05, 06 e 07) | T10 |
| o valor alvo | o número do painel, o que vai pro módulo · semeado, o painel inteiro se toca pra corrigir (*toque pra corrigir*, T10/01 e 09) e abre de novo, com `Semear de novo` (T10/12) | T10 |
| o painel · vazio | antes de digitar · o traço em tinta apagada, sem o lima | T10 |
| o que não se aplica | fato declarado, sem vermelho | T10 |

As **fotos de exemplo** do protótipo, uma por foto da Montagem e a do problema, estão na folha 7, embaixo da evidência: são desenhos, em `04-dados/fotos/`, e não peças (decisão 63).

## Folha 9 · tema escuro e claro · `referencias/png/folha-9-tema-escuro-e-claro.png`

Os 49 tokens de cor que o claro troca, cada um com o papel dele e o valor dos dois temas, o contraste de cada cor na página, no cartão e no poço, o interruptor e as superfícies do claro. Nenhuma peça nova: as peças são as das folhas 1 a 8, nos dois temas. As peças da antiga folha da manutenção e do rodapé moram nas folhas da família delas (a 2, a 4 e a 6). No canvas, depois desta, vêm o claro nas telas (as 26 amostras de `claro-amostras/`, cada uma ao lado do escuro) e o palco (as referências de `06-prototipo/palco/`).

## No protótipo · o que o código mediu

Anotação de construção. A tabela de cima é a do design; esta diz, só nas linhas em que o protótipo mediu diferente, o que o código usa — a regra com as variantes nomeadas e as telas que usam, corrigidas pelo medido em cada tela. Cada diferença é uma diferença conhecida da referência.

O catálogo normativo acima contém **117 peças**, contadas linha a linha nas nove tabelas (o botão da linha entrou na folha 6; as peças da antiga folha da manutenção e do rodapé estão nas tabelas da família delas; o interruptor, o avatar da conta, o logo, o tracinho vazio e o tracejado do vazio também). A vitrine do protótipo contém **129 espécimes comparáveis**: os estados, variantes e grupos de átomos são registrados separadamente para a bancada, e as seis fotos de exemplo da folha 7 são desenhos do mock, não peças — o número não representa 129 componentes independentes. O que não fecha em 0% contra a folha, e por quê, está no mapa. As notas abaixo documentam as diferenças medidas e as variantes; o mapa de cada peça para o componente está em [MAPA.md](../06-prototipo/app/src/ds/MAPA.md).

- **peça nova no protótipo:** a folha desenha, e o design ainda não tem linha
- **em outra folha:** o espécime está desenhado nesta folha, e não na que o design diz

### Folha 1 · fundamentos

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| primário · normal | roxo com o texto lima · 56 · **peça nova no protótipo** | T01 T02 T03 T04 T05 T06 T07 T09 T10 T11 T12 T13 T14 T15 T16 |
| primário · pressionado | o roxo clareia e afunda 2% · o que nasce de um toque espera 300ms antes de responder, sem o pressionado (`data-nascendo`; decisão 64, `RITMOS.toqueDuploMs`) · **peça nova no protótipo** | T01 T02 T03 T04 T05 T06 T07 T09 T10 T11 T12 T13 T14 T15 T16 · no toque |
| primário · desabilitado | sem roxo · diz o que está acontecendo · **peça nova no protótipo** | T01 T02 T03 T05 T06 T09 T10 T13 T14 T16 |
| link · normal e pressionado | o cinza vira branco no toque · 48 de toque · no rodapé e no diálogo, o desenho de 44, a 8 do primário, e o toque de 48 cresce só pra baixo (decisão 38; ver *duas ações* e *diálogo*, na folha 2) · variante: registrado, depois do toque o pedido feito no mesmo lugar de 48, sem toque, o relógio de 14 e o texto em --tinta-apagada, a 8 um do outro (T14) · variante: desabilitado, no mesmo lugar, em --tinta-apagada e sem o pressionado, o `Voltar ao menu` enquanto o semear corre (T10, a lei 17) · **peça nova no protótipo** | T01 T03 T04 T05 T06 T07 T09 T10 T11 T13 T14 T16 |
| linha tocável · normal e pressionada | a base de toda linha que se toca · o pressionado acende o fundo · **peça nova no protótipo** | T01 T02 T04 T05 T06 T10 T12 T13 |

### Folha 2 · chrome rodape folha dialogo

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| barra do sistema sem sessão | a cor da página — ela sangra no que vem embaixo | T01 T02 T03 T05 |
| faixa · sessão aberta | LED lima, serial, placa e o ENCERRAR · 52 com a linha embaixo, em toda tela (a faixa é uma peça só) · o ENCERRAR com o desenho de 44, e não 48: no menu, a caixa fica a 8 da conta; o toque de 48 cresce só pra baixo, dentro da faixa (decisão 38) · variante: sem ativo, a placa apagada até o ônibus entrar na sessão (T06, e a T07/00 e 07) · variante: o ENCERRAR apagado, desabilitado de verdade, em --tinta-apagada e sem o pressionado, onde o voltar do Android não faz nada — a recuperação (T09/03) e o semear (T10), a lei 17 · a faixa nasce na T07, quando as oito verificações do módulo passam sem trava; a linha de mensagens só informa (a R-05 no protótipo): a T05 não tem faixa, e as travas da T07 (02 a 06) também não | T06 T07 T09 T10 T11 T12 T13 T14 T15 |
| faixa · sem sessão | LED apagado · só o fato | T04 T12 T15 T16 |
| faixa · módulo com falha | o serial sai · LED vermelho · a linha vermelha de 2 embaixo, nos mesmos 52 da faixa, também no menu, com a borda de cima (T04/03) · no menu, o ENCERRAR de 44 desce 1, a diferença entre a linha de 2 e a de 1, e fica no mesmo lugar da faixa sem falha (T04/03, folha 2 · decisão 38) | T04 |
| tira de contexto | só no menu · a empresa e a conta · a área de 48 da conta cresce só pra cima e pro lado: com o ENCERRAR de 44 logo embaixo, a caixa dela já fica a 8 dele, sem recuo pra dentro do avatar (decisão 38) · variante: com uma empresa só, o nome sem a seta e sem toque, no mesmo lugar (decisão 56; sem desenho na folha, o espécime fica fora da bancada) | T04 |
| faixa no menu | os 52 de toda tela, e não 50: embaixo da tira, com a borda de cima e a linha embaixo (a faixa é uma peça só, T04/00, 02 a 12) · variante: sem sessão, os 50 da T04/01, com a linha embaixo, como nas outras telas — diferença conhecida da referência: ela desenha as duas linhas em cima | T04 |
| faixa · sem ação | na tela que ela abriu — o encerramento | T16 |
| duas ações | primário 56 · o link a 8 dele, com o desenho de 44 que come 5 embaixo, e o toque de 48 crescendo só pra baixo, pro lado livre · o alto do rodapé 13 e o vão 8: 13 + 56 + 8 + 44 − 5 + 24, a altura de antes (decisão 38) · variante: o rodapé do login, sem o traço em cima, 13 em cima, 20 dos lados e 28 no pé (T01) · variante: o link registrado, o pedido feito no lugar do link, sem toque — com o desenho de antes, o alto de 14, o vão de 6 e os 48 que comem 4 de cada lado, como a T14/06 desenha (T14) · variante: o link desabilitado, no lugar e em --tinta-apagada, enquanto o semear corre (T10) | T01 T02 T03 T05 T06 T07 T09 T10 T11 T13 T14 T16 |
| uma ação | quando só existe um caminho · sem o link, o rodapé segue com o alto de 14 e o vão de 6 (a decisão 38 não o mudou) | T02 T03 T05 T06 T09 T10 T11 T12 T15 T16 |
| processo correndo | o primário diz o que acontece · variante: o pé de 32 com a explicação embaixo, a atualização do firmware — o mesmo desenho, na T07/06, *O diagnóstico recomeça quando terminar* · o semear da calibração, *Gravando no módulo…* e *Relendo…* no primário desabilitado, com o link desabilitado ao lado, em --tinta-apagada (T10) | T03 T07 T09 T10 T16 |
| com legenda | uma linha que explica a ação, a 6 + 8 = 14 do botão, e não a 12: o vão do rodapé com o link é 8 (decisão 38; T05/01, T14/01 e T07/05) · variante: junta, a legenda só com o vão do rodapé, a 8 do botão (T13) | T05 T07 T13 T14 |
| folha | sobe do rodapé · puxador · X · variante: folga 12 e uma frase embaixo do título, a Trocar de empresa (T04) · toda folha fecha no X, tocando no véu, fora dela, arrastando pra baixo e no voltar (lei 20): o toque fora e o arraste moram na peça, e chamam o mesmo fechar do X — o painel acompanha o dedo, só por transform, depois de 8 (`--folha-arraste-folga`); soltando depois de 56 (`--folha-arraste-limite`), desce de onde está e fecha, em 150; antes, volta ao lugar, em 200; o toque que virou arraste não chega na linha em que começou · o voltar é da tela que abriu a folha (T01/04 e 11, T04/05, 07, 10 e 11) · os dois números são proposta do protótipo | T01 T04 |
| folha com opções | cada saída numa linha, com o que ela faz · fecha no xis, e como toda folha (lei 20) · a folha *Outras ações* usa o mesmo puxador da T01 e da T04, e a mesma densidade da *Não recebi o código* (T01/04 e 11), por padronização: 72 no mínimo, 10 em cima e embaixo e 12 entre as partes · o painel arrasta de qualquer ponto; o puxador e as margens externas seguem a peça | T01 T11 |
| diálogo | só pra ação que encerra trabalho · a saída a 8 do primário, com o desenho de 44 e o toque de 48 crescendo só pra baixo (decisão 38): a de sempre é o link do rodapé, que come 5 embaixo (T04/09, 13, T13/10), e a de 44 come 4, com as ações a 6 do texto (T04/06) · a confirmação fecha no `Cancelar` e no voltar; o toque no véu, fora da caixa, não fecha — o toque fora e o arraste da lei 20 são da folha (proposta do protótipo, a confirmar) · o véu cobre a tela inteira onde quer que ele abra, a faixa e o fundo da barra também (`useEncerrar` devolve o `veu` que a tela passa pra `BarraDoSistema`), com a tela de origem atrás, a 32% | T04 |
| diálogo sem saída | quando o que aconteceu já está feito · uma ação só · variante: margem 24, o ar em volta da caixa; no menu da T04, o véu cobre todo o fundo, incluindo tira, faixa e fundo da barra de status, mantendo a caixa no mesmo lugar | T01 T04 |
| diálogo com ciência | o técnico assina a decisão · o primário espera o check | T13 |

### Folha 3 · glifos icones poco

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| escolha numa lista | o marcador de escolha no poço de 30: o vazado de 11, e o quadrado lima cheio de 11 é o escolhido · a linha da empresa: o nome, a idade do pacote e os ativos à direita, e a de pacote vencido se escolhe como as outras (T02) · variante: o nome da escolhida fica em --tinta-forte, como a T02/01 desenha (a folha 3 sobe o nome pra --tinta) | T02 |
| os glifos de estado | doze, um por natureza · com o nome pro leitor de tela · variante: o círculo com o traço, fora dos doze, o não se aplica da assertiva da sessão, apagado e com o nome 'não se aplica' (T16) — a folha 4 o desenha, na linha *não se aplica* · variante: o Wi-Fi riscado, fora dos doze, o ícone inteiro com o risco por cima e o fio escuro (lei 21), cinza, no *SEM CONEXÃO* do login (T01/14) — o *sem sinal* e o *sem sinal neutro* dos doze levam o mesmo Wi-Fi riscado (lei 21: nunca a versão *-off*); as referências deles (T03/01, T09/02 e 03, T12/03, folhas 3 e 4) desenham o risco sem o fio escuro (diferença conhecida da referência) · variante: o i no círculo, fora dos doze, cinza e mudo pro leitor (a frase ao lado já diz), na linha de condição da versão ilegível (T11/04) — a folha 4 o desenha, na linha *só informa* · **peça nova no protótipo** | todas, dentro das peças · sem uso nas 105: ok cinza |
| os ícones de ferramenta | dez, do jogo de ícones (`icones/`), no traço dos tokens · variante: subindo, fora das dez, a seta do SUBINDO AGORA, com o traço 2,2 do glifo (T15) · variante: xis-mini, o xis solto de 14 do não confere, com traço 2,6 (T10) · variante: ciclo, fora das dez, a rota do jogo no poço de 32 da ação da Seção E, traço 1,8 (T13/05) · variante: riscado, o ícone inteiro com o risco por cima e um fio na cor do fundo onde ele mora separando, como o jogo desenha (lei 21) — o Bluetooth da busca que não começa (T05/16, 17) e a câmera sem a permissão (o item do checklist, a `camera-sem-permissao` do jogo); o olho da senha leva o mesmo risco (T01/10) · variante: diagnóstico, o documento do jogo, de 18, no poço de 30 da folha *Outras ações* (T11/03, a mesma medida das opções da T01) · no checklist, o automático que falta leva o ícone da ferramenta da tela que resolve (T13) · **peça nova no protótipo** | T04 T10 T13 T15 e as telas das ferramentas · sem uso nas 105: o ativo de Últimas instalações |
| os poços | oito tamanhos, de 22 a 44 · **peça nova no protótipo** | todas, dentro das peças · sem uso nas 105: 22, 28 e 44 · o de 44 está na T04 (10 e 11) e na foto do checklist (decisão 52) |
| os marcadores | o marcador de escolha, um só: o quadrado vazado de 11 no desmarcado e o lima de 11 no escolhido · e os LEDs · **peça nova no protótipo** | T01 T02 T04 T05 T06 T07 T09 T10 T11 T12 T13 T14 T15 T16 |

### Folha 4 · linhas cartoes aviso

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| vazio declarado | tracejado · título e uma frase · sem ícone · também a busca sem resultado, com o termo no título (T02/03, T06/08) | T02 T06 T12 T15 |
| ainda não | círculo apagado · valor em traço · variante: o relógio apagado no lugar do círculo, na linha que espera — a atualização do firmware (T07/06) e a releitura da CAN (T07/10), com o valor em traço, e o que o serial travado deixa sem cadastro (T07/02 e 03), com o valor escrito · **em outra folha: o design a põe na Folha 3** | T07 |
| passo do ciclo | compacta · 38 · variante: com a causa, o passo reprovado cresce com a causa na entrelinha normal, e não na de 1,35 da causa, 8 em cima e embaixo no meio da lista e 4 no teste do cartão, o último (T14) · variante: com a ação, o botão da linha no lugar do valor, o `Passar de novo` do cartão que não confere (T14/10, decisão 64) | T14 |
| assertiva da sessão | dupla · 50 · variante: recebimento, o que o servidor recebeu, um critério por linha (T12/01, 04, 05 · decisão 41): o glifo no poço de 32, o título em 14/600, o porquê embaixo em 12 e o veredito à direita em 13/700, 58 com 8 em cima e embaixo — conforme com o check lima e o veredito em --tinta, indisponível com o traço em --marca-limite e o veredito apagado, pendente com o relógio de 16 e o veredito em --tinta-secundaria; o glifo fica mudo, o veredito já está escrito · variante: o nome aceso em todo estado, o não se aplica com o círculo com o traço e o valor apagado, e o ainda não com o relógio e o valor em --tinta-secundaria (T16) · variante: a última de 54, com a folga do pé do cartão (T16) · variante: lendo, a assertiva que ainda não acendeu, o poço vazio (T16) · variante: o valor que quebra, o título numa linha só e o valor longo em duas, à direita, na mesma altura — sem uso nas telas: o detalhe da T12 usa o recebimento (decisão 41), e a peça guarda a variante | T12 T16 |
| linha de conferência | dupla · 50, e o glifo de 16 no poço de 32 (o poço na linha) · variante: diverge, o bloco que não bate, o xis vermelho no poço e o par embaixo do nome, a 2 dele (como o título e a descrição da folha com opções) — *no módulo* em vermelho e *no cadastro* em --tinta-secundaria —, com 10 em cima e embaixo (T11/00) · variante: o valor aceso, em --tinta, nos blocos que conferem do conteúdo não reconhecido (T11/01) · variante: lendo, o relógio no poço e a linha do módulo esperando a leitura chegar no bloco; ao chegar, o glifo e a linha do módulo esmaecem em 150 (T11) · pela decisão 53, as linhas são Cercas, APN, Extended ID, Eventos e Leitor · a medir: a variante só leitura, o Extended ID com o ícone de informação e fora da contagem (T11/00 a 02 e 05), e a variante revisar em seguida (T11/05) | T11 |
| só informa | i cinza · o valor à direita · a frase diz que dá pra seguir · o i no poço de 24, na linha do diagnóstico, que cresce dos 38 com a frase embaixo do nome, 6 em cima e embaixo | T07 (05, 07) |
| seção aberta do checklist | o cartão de 58 aberto, com os itens de leitura embaixo da cabeça · a mesma peça da *seção aberta · de leitura* da folha 7 · a folha 4 nova desenha, e a tabela dela não tem · **peça nova no protótipo** | T13 |
| seção recolhida | o cartão de 58 fechado · a mesma peça da *seção fechada* da folha 7 · a folha 4 nova desenha, e a tabela dela não tem · **peça nova no protótipo** | T13 |
| disponível | ícone em poço · nome embaixo · variante: a grade com 10 entre os cartões, no menu (T04) | T04 |
| decide agora | borda lima · o próximo passo · variante: poço 30 com a sessão aberta (T04) | T04 |
| espera | tracejado · a causa no lugar da ação · variante: o cartão largo, o ativo que espera o módulo (T04) · **o respiro mínimo de 8px entre o ícone e o texto, como o cartão ligado**: quando o título quebra em duas linhas, como o *Diagnóstico do módulo* e o *Conferir configuração*, ele não encosta no ícone · o *Finalizar com checklist* que espera, largo, tem a altura mínima de 100, e não de 108, pra devolver o espaço · **em outra folha: o design a põe na Folha 3** | T04 |
| falha | traço vermelho embaixo · variante: o glifo calado pro leitor de tela, o rótulo e a frase já dizem (T03) · variante: bloqueio, sem poço, 14 em volta, o rótulo de topo e a frase de duas orações em --tinta-secundaria, A HOMOLOGAÇÃO FICA BLOQUEADA (T16) · **em outra folha: o design a põe na Folha 1** | T01 T03 T05 T16 |
| aviso | o mesmo desenho, cinza, sem traço · variante: sem poço, só o rótulo e a frase, na folha Trocar de empresa (T04/08) | T03 T04 T05 T09 T12 T16 |
| processo parado | o veredito de uma cadeia ou de um download | T09 |
| com contagem | quantos não bateram, à direita · o glifo de 16 no poço de 32 (T11/00 e 01) · variante: veredito, o que confere, sem poço, 12 · 14 em volta, o rótulo de topo em lima e o traço lima de 2 embaixo (T11/02) — a mesma faixa diz o resultado da cadeia concluída (T09/04, *CONFERIDO NO MÓDULO · 6 passos*, o `Aviso` com `tom="veredito"`, o número e a unidade), que, ao vivo, esmaece no lugar em `--mov-padrao`, com o espaço abrindo direto · o cabeçalho espera a última linha da conferência e entra esmaecendo no lugar · a medir: o cabeçalho cinza do *REVISAR EM SEGUIDA* (T11/05, decisão 53) | T09 T11 |
| nota tracejada | o que falta explicar, sem ser aviso · variante: a frase em 13, mais aberta, a que diz o bloqueio do pacote (T03) · variante: a frase de 13 em 400, na entrelinha da caixa apagada, a do item que não se marca à mão (T13 · sem uso: o item usa o *O que conferir*) · variante: pulado, o que não rodou (T16/04), uma peça só — a frase de 13 em 500 e --tinta-secundaria, sem o rótulo, e as duas linhas equilibradas pelo balance na caixa | T03 T05 T13 T16 |
| nota com rótulo | o fato declarado, com o nome dele em cima · variante: achado, o que a leitura achou e não classifica, com a borda do poço, 10 · 12 em volta, e o rótulo e a frase em --tinta-secundaria (T11) · variante: aguarda — 10 · 12 em volta, o rótulo e a frase em --tinta-apagada, a frase de 12 em 400 —, sem uso nas telas: era a CAN que esperava o bloco do ativo na T07, e a T07 não tem mais essa caixa (decisão 61) · o fato declarado fica no TRAVADO NA SESSÃO do menu (T04) · o design acrescenta a T10, a medir | T04 T11 |
| os dados do modelo | rótulo em cima, valor grande · o fabricante e o modelo · no bloco embaixo do escolhido, no lugar do chassi, com a frase do vínculo embaixo · a folha 4 rotula *no vínculo* | T06 (01, 10, 11) |
| linha do histórico | placa, módulo e hora · o veredito à direita · variante: o tom do veredito pela natureza do estado, o que espera em --tinta e a falha em --vermelho (T12) · variante: a linha de baixo em 12, quando diz há quantos dias (T12) · variante: o veredito longo quebra em duas linhas, à direita, e a placa e a linha de baixo não quebram (T12) | T12 |
| linha de empresa | na folha · o pacote e a contagem · a de pacote vencido diz a idade e que venceu, *carregado há 8 dias, vencido* (decisão 64: a mesma idade da T02, `formato.js` · `idadeNaFolha`), e se escolhe como as outras (T04/07) · variante: em espera, não se escolhe até o envio terminar, o tracinho vazio no poço e o que ela espera no lugar do pacote (T04/08) | T04 |
| linha de empresa · a atual | o marcador lima de 11px | T04 |
| a lista de empresas | na folha, com as três | T04 |

### Folha 5 · processo, tempo e placar

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| cadeia gravando | a `Cadeia` com a altura `gravando` (o elo de 78, `--cadeia-elo-gravando`) e a `barra` no elo da vez: a barra de 6 sobre `--borda`, o feito em `--lima-feito` desenhado só por `scaleX`, e a contagem de 12/600 a 6 embaixo, o que já foi em `--tinta-secundaria` à esquerda e o *faltam* em `--tinta-apagada` à direita · a cada passo do processo, o feito anda um trecho linear do valor de antes ao novo, no passo × `--mov-fator` (com reduzir, salta), e a releitura é outra barra, que nasce no zero · conferida, a linha do que gravou entra no lugar da barra, esmaecendo em 150 · o quadrado de agora com a barra tem 14; sem ela (a Conexão esperando o servidor, T09/11), 10 · variante: curta, a da manutenção, com o elo de 86 (`--cadeia-elo-correndo`, T09/09) · variante: parada (T09/02 e 03), a barra parada, *parou em* e *retoma daqui* · `src/ds/instrumentos/Cadeia.jsx` | T09 |
| cadeia concluída | trilho lima · cada etapa diz o que gravou, em `--tinta-apagada` | T09 |
| cadeia recusada | o elo que falhou acende, e a causa em vermelho · o que as etapas feitas gravaram fica em `--tinta-apagada`, como na concluída (T09/01, folha 5) · variante: pausada, a cadeia parada com o contador e o aviso, o elo pausado aceso, com a barra parada, e os pendentes em traço, elo de 68 (T09) | T09 |
| cadeia antes de gravar | o relógio em cada elo · a limpeza diz o que faz · a limpeza primeiro, e as duas pré-condições em cima, os pinos e o espaço · nas travas do envio (T09/06, 07), o aviso no lugar das duas, e o elo do bloco que não cabe só com o valor em vermelho (a descrição é a do bloco) · na T09/05 a 07 e 27, o último elo sem o fecho de baixo, a cadeia que fecha o miolo; a folha desenha o último com os 70 dos outros | T09 (05, 06, 07, 27) |
| a pré-condição dos pinos | a primeira linha da configuração, embaixo do título | T09 |
| segmentado | um segmento por passo · **só onde se percorre** — nas fotos da Montagem sim, no detalhe de um item automático não · variante: folga 8, a da recuperação do acesso (T01) · variante: o passo atual já feito, alto como o atual e lima apagado (T10) · variante: o atual com falha, o passo atual reprovado, alto como o atual e em vermelho (T13 · sem uso: o detalhe do item automático não tem a barrinha) · variante: só o cabeçalho, com o rótulo, sem o contador e sem os segmentos (T13/09) | T01 T10 T13 |
| encerrando | a legenda só no passo que corre · variante: pausa, o bloco em que a sessão interrompida parou, a pausa no poço, o nome e o 'parou aqui' em --tinta, e o trilho de baixo na divisória (T16) | T16 |
| reiniciando | o reinício é automático · o técnico não faz nada, e a conexão que cai diz reconectando · o passo que corre com o quadrado de agora (T16/01) · variante pede o corte: o estado `energia`, *com você* e a legenda do corte (T16/09, espécime `f5-pede-o-corte`) · o que não voltou: o estado `xis` (T16/10) | T16 |
| sem homologar | só os quatro que deixam o módulo seguro · os pulados com traço, o desenho da folha 5 (o espécime f5-sem-homologar e a T16/03) · o *pulado* é o passo que o encerrar sem homologar pula, e não o *não se aplica*, que é só da assertiva do autoteste (T16/02 e 05), nem o traço *—* do passo que ainda não chegou (T16/00 e 01) · pro leitor de tela, o traço do pulado fica mudo (`aria-hidden`, como na T16/03, que não dá nome a ele), e a situação ao lado diz *pulado* | T16 |
| cronômetro | o prazo drena · variante: estourado, o número em vermelho, e sem o que resta a escala fica sem o preenchido, com o marcador no zero (T14) · variante: o detalhe em lista, as frases do estado uma por linha, na entrelinha da legenda (T14) · variante: uma frase em falha, em --vermelho e 700, a segunda falha do evento (T14/09) | T14 |
| a barra do checklist | o que já passou, em lima · o número fica no título · 6 de altura, o segmento feito em `--lima-feito`, a 50%, calada pro leitor de tela, que lê o título · quando um item passa, o lima avança por transform em 300 (T13) | T13 |

### Folha 6 · entrada escolha cabecalho

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| com contador | o contador conta o que passou · lima quando completo · variante: só a palavra, a unidade sem a contagem, quando a busca não acha nada (T05) · variante: forte, o contador em 700, o veredito de uma coisa só, como o aprovada em lima do detalhe (T12) · variante: com subtítulo, a linha de 12 em --tinta-apagada embaixo do título, no bloco dele, a 4 (T16/03 e 06, como as duas referências desenham) · variante: de falha, quantos reprovaram, em vermelho (T12) | T05 T06 T07 T09 T11 T12 T13 T14 T15 T16 |
| a marca no login | o logo e CONFIGURADOR entre dois traços | T01 |
| campo | rótulo em cima · superfície rebaixada de 48 (`--fundo-rebaixado`) · campo é rebaixado qualquer que seja a largura | T01 |
| campo focado | rótulo e traço de baixo em lima | T01 T13 |
| código · seis células | uma célula por dígito · variante: o foco numa célula dada, fora do próximo dígito, como no código expirado (T01) | T01 |
| botões só de ícone | fechar e mostrar a senha · 44 de desenho, 48 de toque · com nome pro leitor de tela · **peça nova no protótipo** | T01 T04 |
| campo de busca | lupa e dica · quando a lista é longa · variante: a dica é texto sobre o campo vazio (T02) · variante: focado, o traço de baixo em 2 de lima, aceso parado enquanto a busca não acha nada, e o termo em números tabulares (T02/03, T06/08) | T02 T06 |
| linha de opção | o ícone, o que faz, e pra onde · densidade comum: 72 no mínimo, 10 em cima e embaixo e 12 entre as partes, o ícone de 18 no poço de 30, o que faz em 16/600 e o detalhe em 13/500, a 2 do título (T01 e T11) · variante: em espera, a saída que espera o reenvio, apagada e desabilitada, com a contagem no lugar da seta; ao liberar, a seta entra e a linha acende (T01) · variante: com o efeito, a ação da folha *Outras ações*, com o título e o efeito completos, quebrando em linhas quando preciso, sem reticências, e a seta de 16 em --tinta-secundaria; cresce com o conteúdo sem diminuir a densidade comum (T11/03 · decisão 40, superada pela 53: a folha fica, sem compactação) | T01 T11 |
| justificativa | o não conforme com o porquê · a caixa, nas duas telas do item (decisão 39): o checkbox com o título *Não está conforme* em 14/600 e a linha de baixo em 12 --tinta-secundaria, a 2 — desmarcada, *marque e conte o que aconteceu* (T13/07); marcada, *conte embaixo o que aconteceu* e o campo *O QUE ACONTECEU* (T13/08, 15) · é a variante do checkbox com a linha de baixo · antes, um cartão virava a caixa no toque | T13 |
| linha de módulo | serial e variante · T05 · variante: a última da lista, 56 (T05) · variante: a lista de escolha, o marcador vazado de 11 no poço de 30, o serial em cima da variante e o firmware à direita, 72, todas com a divisória, a última também (T05/01) | T05 |
| linha de ônibus | placa, modelo e frota · T06 · a última da lista com os 72 das outras, só sem a divisória (T06/00) · variante: escolha, tocar marca o quadrado lima e o primário avança, e o leitor de tela lê a escolha (T06) | T06 |
| bloco escolhido | traço lima embaixo = escolhido · variante: justo, não cresce e fica em cima dos dados do modelo, 22 em cima e embaixo, como a T06/01 (T06) | T06 |
| | a T05 não usa o bloco escolhido nem o escolhido com trava (a lista marcada); o bloco escolhido está na folha 6 como peça da T06, a confirmação do vínculo (o recorte do RKT-8H42) | T06 |
| escolhido com trava · T06 | a placa com o motivo embaixo · variante: neutro, a trava que tem saída, o rótulo cinza e o traço neutro (T06) | T06 |
| cartão que pede ação | o erro que precisa dele · variante: compacto, com mais de um erro, o título de 17, a causa de 13 e o botão compacto num bloco com a divisória embaixo, e depois dele o que a tela põe (T15) · variante: a ação que espera, o botão no desligado do secundário dizendo o que ele espera, *Ressincronizar espera a rede* (`acaoDesabilitada`, T15/05) | T15 |
| o que conferir | as causas de uma falha, numeradas, antes de tentar de novo · a caixa de poço, o rótulo de 10 e as causas de 13, o nome da causa em 700 e --tinta, o que conferir em --tinta-secundaria · variante: com falha, o traço vermelho de 2 embaixo (T05/04, a conexão que falhou); sem ele, a caixa de poço comum (T13/09, o item reprovado, que já leva a falha na régua) · variante: sem a caixa (`semCaixa`), dentro do elo da Conexão, a 10 da linha de cima e as linhas a 4 (T09/12) · `src/ds/entrada/OQueConferir.jsx` | T05 T09 T13 |
| botão secundário | fill --fundo-botao e borda --borda-botao, o desenho de todo secundário  · a ação da linha · variante: compacto, 46 de desenho e 15 de letra, com o toque de 48 por fora (T15) · em cima do rebaixado, o fill `--fundo-botao-no-rebaixado` | T15 |
| lista com contagem | o pacote baixando · os cinco grupos, com a divisória entre as linhas e nenhuma depois da última, a regra da peça — a folha 6 desenha só a dos Ativos (diferença conhecida da referência, na `tela.md` da T03) · variante: o nome pro leitor segue o dado, na baixa que parou a linha diz que parou (T03) | T03 |

### Folha 7 · checklist evidencia

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| bloco do evento | o que foi disparado e recebido · variante: o nome do relógio segue o dado, ainda não antes do disparo, e na linha feita o relógio fica no lugar, mudo (T14) | T14 |
| linha da fila | o que sobe e quando · variante: pela posição, a altura vem do lugar na lista, 50 com a divisória no meio e 62 na última, em qualquer estado (T15) · o poço pela altura: 32 na de 50 (o poço na linha) e 30 na de 62, que a lei não mede, como as referências 00 a 02 desenham (T15) | T15 |
| prova da cadeia | os seis blocos, gravados e relidos (decisão 49) · sem uso nas telas: a cadeia concluída diz o resultado na faixa do *com contagem* (T09/04); a peça fica no espécime da folha 7 · a conferência não tem a variante *igual à do cadastro*: ela compara o conteúdo, sem a versão (decisão 53) | — |
| foto · tirada | o registro dentro do quadro da câmera, embaixo da foto (decisão 63): a `FotoProva` tirada, a linha com 10 em cima e embaixo e 12 dos lados e o traço da divisória em cima, sem o check e sem o poço, e não é botão pro leitor de tela · *Foto tirada às 14:30* e *confira se está nítida antes de usar* (T13/44 a 48); *Problema fotografado às 14:30* e *vai junto com a ressalva, pro gestor* (T13/15) · entra com a foto, sem movimento próprio · a T10 não usa (decisão 52) | T13 |
| contador no menu | itens na fila, no canto do cartão · a mesma peça do *com pendência* da folha 4 | T04 |
| seção fechada | um cartão por seção · quem age, a contagem e a seta · o cartão de 58, a 8 um do outro, com o veredito no poço de 32: o check lima, o círculo do que o técnico resolve, o relógio da F que espera e o X vermelho da que tem um item reprovado, com o nome do glifo pelo estado do dado · variante: sem quem age, só o nome, com 1 foto por fazer ou 1 tirada, porque o singular não existe no `textos.md` (T13) | T13 |
| seção aberta · de leitura | o cartão cresce no lugar · as leituras sem seta · a seta vira pra cima e os itens entram embaixo da cabeça, atrás da divisória · aberta por um toque, os itens esmaecem em 200 e as seções de baixo descem por transform; nascer aberta (a URL, a coluna, o print) não anima (T13) | T13 |
| item de leitura | sem seta · não toca · 44, o glifo no poço de 30 · variante: apagado, o valor que ainda não veio em --tinta-apagada, *a fazer* e *espera o envio* (T13) · variante: não se aplica, o traço no poço e o valor em traço, apagado (T13) · variante: reprovado, o X vermelho no poço, o valor em --vermelho e a seta, e a linha toca e abre o nível do item (T13/16) · variante: com as linhas do porquê, embaixo do nome, a primeira em --vermelho, e a linha cresce, a 6 em cima e embaixo (o cartão com a correção pedida, T13/27) · variante: respondido, a resposta embaixo do nome e a ação à direita, `Testar de novo` e `Disparar de novo` (T13/41, 42, 49 e 50, decisão 64) · variante: o nome em destaque, o nome em `--tinta` e o valor em `--tinta-secundaria` (a Posição da T13/49) | T13 |
| item de tocar | a câmera e a seta · abre a foto · 50, o ícone no poço de 32, o nome e a legenda empilhados, e o item inteiro é o toque · variante: o automático que falta, com o ícone da ferramenta da tela que resolve, *a fazer* e a seta pro `origem` do mock (T13) · variante: o reprovado sem leitura, com o X vermelho no poço e a seta pra tela que resolve (T13) · as duas sem desenho nas referências · o reprovado com a leitura é o item de leitura | T13 |
| item feito | o check e de onde veio · sem seta · 50, o check no poço de 32 · variante: sem legenda, a foto tirada no checklist, só com o nome — nenhum texto diz de onde ela veio (T13) · a foto de uma condição que o ônibus não tem não aparece: o Painel sem calibração, e a B do herói fica com 4 (decisão 52); o Leitor sem leitor, e a do ônibus da bateria fraca fica com 3 (T13/16) | T13 |
| item com ressalva | passou, mas diz a ressalva embaixo · *com ressalva · a causa*, e a causa é a primeira oração da justificativa, com a minúscula (T13/12) | T13 |
| o veredito | o topo do checklist registrado, aguardando autoteste · o próximo passo embaixo · o cartão de 58, o check lima no poço de 32 · variante: surge, o que nasce do toque no `Finalizar instalação` esmaece no lugar em 150; aberto já homologado, parado (T13/11 e 14) | T13 |
| a câmera do app | a do checklist (`VisorCamera`) · o quadro só com a câmera de 46 em `--marca`, sem texto dentro (decisão 60): o que enquadrar é a frase da tela, embaixo do título (o `enquadre` do item, ou *Enquadre o problema*), no padrão título e frase da T10/11 · variante: sem a permissão, só a câmera riscada, no mesmo quadro; a frase embaixo do título fica (T13) · **com a foto** (decisão 63, T13/44 a 48 e 15): o `foto` é o SVG de exemplo do mock (`src/dados/fotos.js`, de `04-dados/fotos/`), inline, numa camada por cima da câmera ao vivo, dentro do quadro, com o registro embaixo (a `FotoProva` tirada) · o quadro fica do mesmo tamanho · a camada esmaece em 150 no lugar da câmera ao vivo, e ao contrário no `Tirar de novo`; aberta já com a foto, parada · o nome da foto pro leitor de tela vem da tela (`rotulo`) | T13 |

### Folha 8 · calibracao

| Peça | Regra, medida | Telas que usam, medido |
|---|---|---|
| valor rebaixado | o que o módulo conta hoje · variante: aceso, depois de semear e reler, o que o módulo conta agora em --tinta (T10) · variante: falha, a releitura que não confere, com o número em vermelho (T10/10) | T10 |
| régua da diferença | a distância e o lado, *o painel está 108 km à frente* ou *atrás* (decisão 64, T10/05 a 07) · vira "confere" depois · variante: o confere desenhado, o check lima solto, sem poço, no lugar da diferença (T10) · variante: falha, o xis-mini solto de 14 e a frase em vermelho, o não confere (T10/10) | T10 |
| o valor alvo | o número do painel, o que vai pro módulo · variante: cumprido, o número fora do foco ou semeado, sem o traço lima e com o rótulo apagado (T10/01, 09, 10) · variante: foco, o lima de volta por cima (T10/05) · variante: campo, o input numérico invisível por cima do poço, com o rótulo como nome (T10) · variante: corrigir, o semeado que se toca pra corrigir — o convite *toque pra corrigir* embaixo da frase, no desenho do link dentro do conteúdo, e o poço inteiro como botão (`corrigir` e `aoCorrigir`; T10/01 e 09), que abre a 12, o campo de novo em foco | T10 |
| o painel · vazio | antes de digitar · o traço e o rótulo em --marca-limite, sem o lima · a folha 8 escreve *tinta apagada* e desenha --marca-limite: o código segue o desenho | T10 |
| o que não se aplica | fato declarado, sem vermelho · variante: a divisória também embaixo da última linha, no passo da rotação (T10) | T10 |

## A barra de status

É **do sistema, não do app** — desenhada como a de um Android atual, pra separar o celular do que é nosso. A barra tem **30px**, em todas as telas; nada do que vem embaixo depende dela.

| Parte | Como é |
|---|---|
| a hora | **vem desenhada na barra oficial** — o 9:30 do kit, em `05-recursos/sistema/barra-de-status-android.svg` · a Google Sans sai da barra; o token `--fonte-sistema` e o recorte `GoogleSans-hora.woff` ficam, sem uso |
| o sinal | 4 cápsulas de 2,1 de largura, a cada 4,2 · alturas 4,3 · 6,1 · 8,5 · 9,7, alinhadas embaixo |
| o Wi-Fi | 12,8 de largura · dois arcos de traço 2,3 com ponta redonda, e um ponto de 2,4 embaixo |
| a bateria | corpo de 18,3 × 10,4 com canto de 3,1 · o pininho de 1,3 × 4,2 separado · **cheia e branca**, sem porcentagem |
| os espaços | 5 entre o sinal e o Wi-Fi · 5,5 entre o Wi-Fi e a bateria |
| o lugar | **o do desenho oficial** — a barra inteira escalada pra 360 e cortada em 30 (`viewBox="0 12.90 412 34.33"`) · nada recolocado à mão |
| a cor | **o branco do desenho oficial**, sobre o fundo da tela |

**As barras são fixas** (lei 22): em cima, a barra oficial do Android, do kit do Material — o 9:30, o Wi-Fi, o sinal e a bateria —, escalada pra 360 de largura e cortada na altura de 30; o espaço da câmera fica reservado, sem desenhar. Embaixo, a navegação por gestos do Material — a pílula de 94×3,5px a 9px do pé — nas 230 referências de tela da versão atual, por cima de tudo, inclusive das folhas e do teclado do aparelho (T01/03, decisão 62). O fundo das duas é o da tela. No componente, nenhuma propriedade.

Nunca na fonte do app, e nunca com ícone de notificação, operadora ou porcentagem — cada detalhe a mais é um que envelhece.

**A barra não tem estados** (lei 22): é cenário fixo, o desenho oficial do Android, igual em toda tela · no protótipo, o componente não tem as propriedades `bluetooth` e `semRede` (`app/src/ds/chrome/BarraDoSistema.jsx`), e a navegação por gestos é a `NavegacaoPorGestos`, montada uma vez no `app/src/App.jsx` · o teclado do aparelho é a `TecladoDoAparelho` (`app/src/ds/chrome/TecladoDoAparelho.jsx`), o desenho oficial de `05-recursos/sistema/` (o escuro e o claro) com a altura do viewBox, montada pela T01 só na tela do código, no computador e no print — as teclas são os retângulos do desenho, com nome e sem pressionado

**No protótipo** · `06-prototipo/app/src/ds/chrome/BarraDoSistema.jsx`, a mesma peça nos três fundos (a faixa, a tira do menu e a página) e sob o véu · a hora em `var(--fonte-sistema)`, `var(--t-secundario)`, peso 500 e `var(--tinta)` · a fonte não vai embutida em cada tela: o `@font-face` do `BarraDoSistema.css` lê o `05-recursos/fontes/GoogleSans-hora.woff`, como a Barlow, e o build empacota o arquivo (com 3,7KB, ele entra no próprio CSS), com o aviso da licença nos metadados dele · a geometria de dentro dos três ícones fica no SVG (as cápsulas, os arcos, o corpo e o pininho), na cor `currentColor`; o resto é token, com a decisão 43: `--barra-sistema-recuo` 26, `--barra-sistema-recuo-direita` 32, `--barra-sistema-desce` 6, `--barra-sistema-espaco-wifi` 5 e `--barra-sistema-espaco-bateria` 5,5 · o tamanho de cada ícone, o do próprio desenho, também: `--barra-sinal` 14,7 × `--barra-sinal-altura` 9,7, `--barra-wifi` 12,8 e `--barra-bateria` 20,4, os dois com `--barra-icone` 10,4 de altura, e o traço dos arcos, `--barra-wifi-traco` 2,3 · medido em 68 referências da T01, T04, T05 e T13 e numa de cada uma das outras 12: a barra sai igual ao HTML, byte a byte, a 2×, e nada abaixo de y=30 mudou · no celular de verdade, a barra desenhada sai (`06-prototipo/palco.md`)

## O poço numa leitura em andamento (lei 24)

Toda lista que lê, confere ou grava **uma linha por vez** — a T07, a T09, a T11, a T14 e a T16 — fala com três estados no poço:

| Estado | O poço | O valor |
|---|---|---|
| **esperando** | o relógio | um traço |
| **agora** | o quadrado branco — 12px no poço de 32, 14px no de 34 | o verbo: *lendo*, *conferindo*, *gravando* · na T14, a ação do técnico: *passe o cartão* |
| **pronto** | o check, o xis ou o *i* da linha que só informa | o resultado |

**A contagem do andamento mora onde mora a do resultado:** ao lado do título na T07, na T09 e na T16; dentro do veredito, neutro, na T11. **Na T09, a etapa da vez conta por dentro**: a barra e *quanto já foi · quanto falta* ficam no lugar da descrição, e o contador do título conta as etapas que conferiram. Enquanto a leitura corre, o rodapé fica desligado e diz o que está acontecendo. **Na T14, o *agora* é uma ordem pro técnico:** o passo da vez diz o que ele tem que fazer no ônibus. Antes do disparo e na falha da rotação, sem quadrado.

**No protótipo** · a fila que drena da T14/01 é a propriedade `fila` do `Prazo` (`{ resta, ms }`): a linha de `--e-4` sobre o `--poco`, o que resta em `--lima-feito`, esvaziando por `scaleX`, linear, em `RITMOS.filaDrenagemMs` vezes `--mov-fator`.

## Ícone em linha com o texto

O ícone que abre uma linha de texto — *ocupação de pinos confere* na T09, *relido às 14:30* na T10 — é **da família do poço**, com o círculo: o check, o xis ou o *i* · **14px no texto de 12, 15px no de 13** · e **desce até o meio das minúsculas**: `position: relative; top: 2px` no texto de 12, `top: 1px` no de 13. A Barlow reserva espaço em cima das letras, e o centro da caixa do texto fica acima delas — centralizado pela caixa, o ícone parece alto.

**No protótipo** · o `Precondicao` desce o glifo `--e-2` (o texto de 12), e a régua da diferença (`Calibracao`), `--traco-borda` (o de 13), os dois com `position: relative` · o não confere da T10/10 usa o glifo `xis` de `--glifo-confere`, o mesmo tamanho do check.

## Duas ideias numa linha

Um rótulo com duas ideias separadas por **·** — *sem rede · 3 tentativas feitas* — fica numa linha só quando cabe. **Quando não cabe, quebra no ·, em duas linhas de verdade**, uma ideia em cada, e o · sai: *Checklist registrado* / *aguardando autoteste* na T13, *o servidor recusou* / *o pacote de sincronização venceu* na T15. Nunca deixar o navegador decidir a quebra: ele parte a ideia no meio e deixa palavra sozinha. Rótulo não leva ponto final; frase completa, como os avisos, leva.

**No protótipo** · o texto com duas ideias vem como lista, uma por item, e a peça quebra entre elas com `emLinhas` (`06-prototipo/app/src/ds/primitivos/linhas.jsx`) · na Cadeia (a descrição da Limpeza) e no CartaoAcao (a recusa da T15/02).

**No protótipo** · o traço que se desenha (`movimento.md`) é uma peça só, `06-prototipo/app/src/ds/primitivos/Traco.css` (`ds-traco-desenha`: `scaleX` de 0 a 1 em `--mov-lento`), reaproveitada na linha de módulo (`confirmada`, T05/07) e na prova (`desenha`, T16/02), onde ela vem por uma camada sobre a borda, que fica no cinza do poço · o marcador branco do prazo segue o tempo pela propriedade `marcador` do `Prazo` (T14).

**No protótipo** · o RV no centro do círculo, medido na tela: o avatar da tira (32) leva 1 de recheio embaixo — com 2, as letras ficam 1 px altas na tela; o da folha da conta (52) leva a própria letra à esquerda (1) e 1,5 embaixo · medido no print a 2x: o da tira no centro exato, e o da conta a 0,25 px · `app/src/ds/chrome/Avatar.css`.

## Item reprovado ganha a seta

Numa lista de leituras que o app confere sozinho, **o que passou é leitura**: o check, o valor, e nada mais, sem seta — a linha já diz tudo. **O que reprovou fica vermelho e ganha a seta**: o xis, o valor em vermelho, e o toque abre o detalhe, com o que conferir. A seção do item ganha o xis e a contagem cai. Na T13, a Seção C com a Alimentação, o GPS, as entradas ou o modem reprovados (a 16, 21, 23 e 25).

**No protótipo** · o reprovado é a linha de leitura do `ItemDoChecklist` com o valor em `--vermelho` (`ds-item-ck-valor-falha`) e a seta, e só ela toca; a que passou fica sem `aoTocar`.

## Reler no lugar

Quando o técnico relê alguma coisa depois de consertar, **a releitura acontece na própria tela**: o botão `Reler…` vira *Relendo…*, desligado, e o resultado fica ali mesmo, com **relido às 14:42** e o veredito, ao lado do check pequeno. Deu certo, sai o que estava vermelho e fica um botão pra seguir; não deu, fica o valor novo, ainda vermelho, e no lugar da frase de baixo **o xis pequeno com *relido às 14:41* e o que ainda falta** — sem ele, o técnico vê a mesma tela e não sabe se o app releu; o que estava pra conferir continua, e o botão volta a ser `Reler…`. **Sem toast, e nada muda de tela sozinho**: quem decide seguir é o técnico. Na calibração (T10) e no detalhe de um item reprovado da Seção C (T13/29 a 37).

**No protótipo** · a T13 usa as peças que existem: o `Rodape` com o `primarioTrocaTexto` (o texto troca no lugar) e o `linkDesabilitado`, e o instrumento do item com a variante `relido` (`app/src/telas/T13/pecas.jsx`): sem a falha no poço, o rótulo em `--tinta-secundaria`, a marca branca da `Escala`, e o check de `--glifo-confere` com o texto de 13 em 700, descido `--traco-borda`, como o `ReguaDiferenca` confere da T10 · o relido e o não resolvido dizem a hora do relógio parado, *14:30*, como a T10 · o não resolvido é a variante `naoResolvido` do mesmo instrumento: o poço em falha, e o xis de `--glifo-confere` com o texto de 13 em 700, em `--vermelho`, como o `ReguaDiferenca` não confere da T10/10 · o rodapé de um botão só fecha em `--rodape-pe-com-botao` (32), a regra da peça: as referências 30 a 33 deixaram o pé de 24 do rodapé com link (diferença conhecida da referência) · o tempo do *Relendo o módulo…* é o do *Relendo…* da T10, 1 s (`RITMOS.relerModuloMs`).


## As superfícies rebaixadas e o poço

Duas peças rebaixadas, com papéis diferentes. No escuro elas têm os mesmos valores; no claro, não:

| peça | o que é | token |
|---|---|---|
| **poço** | o quadradinho fundo: o do ícone, o do check, o trilho das barras e da régua, o marcador | `--poco`, `--poco-fundo`, `--poco-lado`, `--borda-poco` · é ele que dá a personalidade do claro |
| **rebaixado** | a superfície grande: o campo (de qualquer largura), o painel, o bloco de aviso, a faixa do topo do menu, a busca, a área da foto | `--fundo-rebaixado`, `--rebaixado-sombra`, `--rebaixado-lado`, `--rebaixado-luz` · no claro, um cinza leve, quase da página |

- **a barra de status acompanha a superfície de baixo**: no menu, o rebaixado da faixa do topo; nas outras telas, a página ou o cartão · nunca o poço direto
- **o botão em cima do rebaixado** usa `--fundo-botao-no-rebaixado`

## O andamento

O que marca o andamento tem cor própria, `--andamento`: a etapa atual da barra de etapas, o "agora" na régua, o quadrado do item da vez na leitura. No escuro, o creme do texto; no claro, o roxo da marca.

**Dentro de uma barra em alerta**, no acesso vencendo e no pacote vencido, o marcador usa `--andamento-alerta`: a barra inteira fala a língua do alerta. No escuro, o mesmo creme; no claro, o vermelho escuro.

## No protótipo · as variantes do checklist, da cadeia e do ciclo

Nenhuma peça nova no design system, e nenhum token. As telas pedem cinco variantes de peças que já existem, e uma peça das telas — as seis ainda não estão nas folhas:

- **o item do checklist** (`ItemDoChecklist`): o estado `lendo`, com o quadrado de agora e o valor em `--tinta` (a Seção D lida, T13/38) · `acao`, o que o técnico toca na própria linha, no lugar do valor (o `Testar bip`) · `embaixo`, o que a linha abre embaixo dela, a 40 da esquerda e 12 no pé, com o traço do bloco inteiro (a pergunta do bip, T13/40; o campo do que aconteceu, T13/42)
- **o cartão da seção** (`SecaoDoChecklist`): o estado `lendo`, com o quadrado de agora (T13/38)
- **o campo de texto** (`CampoTexto`): `placeholder`, o que o campo vazio pede, em `--marca-limite` (*Conte o que aconteceu*, T13/42)
- **a cadeia** (`Cadeia`): `extra` no elo, a linha que ele confere depois de gravado, embaixo da descrição — o traço da divisória em cima, a 8, o nome em 13/600 `--tinta-forte` e o valor em 13/700 (*O módulo falou com o servidor*, T09/04, 11 e 12) · `extra.conferir`, o *o que conferir* sem a caixa embaixo dela (T09/12) · a `barra` do elo da vez é a peça *cadeia gravando* (folha 5)
- **o encerramento** (`Encerramento`): o reinício automático usa o `agora` de sempre, com a legenda; o `energia` (o *é com você* do corte) marca o corte do VL08 (T16/09), e o `xis`, o módulo que não voltou do reinício (T16/10) · o quadrado de agora da peça tem 12 (`--e-12`), e as referências do encerramento o desenham com 11: 0,01% na T16/01, 07 e 08 e no espécime *reiniciando*
- **o botão da linha** (`app/src/ds/entrada/BotaoDaLinha.jsx`, na folha 6 desde a 1.6): a resposta do técnico na própria linha — 40 de alto, os dois lado a lado a 8 (o `Confere com o cartão` e o `Não confere`, T14/08, em 13; o `Ouvi` e o `Não ouvi`, T13/40, em 14), e 30, do tamanho do texto (o `Testar bip`) · o fundo `--divisoria`, a borda `--borda-poco`, o texto `--tinta` em 700 · no toque afunda, como o secundário
- **na passada de usabilidade** (decisão 64), variantes das peças que existem: o item de leitura `resposta` (o respondido, com a ação à direita: `Testar de novo`, `Disparar de novo`) e `destaque` (T13/41, 42, 49 e 50) · a linha de checagem `acao`, o `Passar de novo` no lugar do valor (T14/10) · a cadeia com o `extra.tipo` que esmaece no lugar e o `extra.conferir.acao`, o `Conferir de novo` (T09/11, 12 e 34) · o *o que conferir* com `acao` (T09/12) · o valor alvo com `corrigir` e `aoCorrigir` (T10/01, 09 e 12) · o cartão que pede ação com `acaoDesabilitada` (T15/05) · o cartão de ferramenta `desabilitado` e a causa acesa (T04/18 e 19) · o aviso com `acao`, a quem acionar (T16/05) · a folha com escolha, o primário embaixo da lista (T04/07, 08 e 21) · o primário que nasce de um toque, que espera 300ms (`data-nascendo`, `esperaToqueDuplo`; T13/11, T09/13)

## No protótipo · as variantes da conferência e do rodapé

Nenhuma peça nova, e nenhum token. Duas variantes e um ajuste, ainda fora das folhas:

- **a linha de checagem** (`LinhaChecagem`): `embaixo`, a ação do técnico na própria linha, embaixo do par — a 6 dele, alinhada ao nome, com o poço no meio do bloco inteiro e 10 em cima e embaixo (*Corrigir este bloco* e *Enviar agora*, T11/00 e 05, com o botão de dentro da linha, acima)
- **o rodapé** (`Rodape`): sem o primário, só com o link — as ações moram nas linhas, e o rodapé fica com a saída (T11/00 e 05)
- **a legenda do rodapé**: 4 de margem por cima do vão, no app inteiro — a 6 + 4 + 8 do botão com o link (T05/01, T07/05), e a 4 + 8 na junta (o checklist) · as referências mediam 4 a mais que a peça

## No protótipo · a recuperação do acesso e o autoteste

Nenhuma peça nova, nenhuma variante, nenhum token. A primeira etapa da recuperação (T01/02, 20, 21, 22) é montada com peças da própria T01 (`telas/T01/pecas.jsx`: a aba do canal, o seletor de país, o campo do dado, a linha do país) sobre as do design system (a caixa de poço, a `Folha`, a `Busca`, o cartão de opções). O ícone `voltar-etapa` está no `Icone`, o desenho da referência do *Usar outro dado* (T01/04 e 11). O autoteste da T12 usa a variante `recebimento` da linha de checagem, a do porquê embaixo do nome.

## No protótipo · a leitura do item na Montagem

Nenhuma peça nova, e nenhum token. Duas variantes da leitura do item do checklist (`ItemDoChecklist`), pela Montagem no formato das outras seções (T13/02 e 12, lei 23), ainda fora da folha 7:

- **`icone` na leitura:** o ícone no poço de 30, no lugar do glifo (a câmera da *foto a tirar*), com a seta, porque a linha abre a câmera
- **`valorDeEstado`:** o valor à direita é o estado do item, não um dado lido — em `--t-secundario` (13) e `--tinta-secundaria`, como a referência desenha (*foto a tirar*, *com ressalva*)

Os tipos `tocar`, `feito` e `ressalva` (os de 50, empilhados) não são usados na Montagem; os espécimes da folha 7 na vitrine ainda os mostram. O `tocar` continua nos itens pendentes e reprovados das outras seções.

## No protótipo · o movimento das peças

Anotação de construção. O movimento é da peça, e vale onde ela está: a tela só liga o gatilho. As regras do app inteiro estão no `movimento.md`; o mapa de cada peça pro arquivo está no `06-prototipo/app/src/ds/MAPA.md`. Nenhuma peça nova de desenho: as quatro de baixo sem desenho próprio moram no chrome e nas linhas.

| Peça | O movimento | Telas que usam, medido |
|---|---|---|
| a troca (sem desenho, folha 2) | entre telas e entre quadros, só o conteúdo esmaece em 150ms, e só num toque ou no voltar · o processo que espera a troca | as 15 · o quadro que troca inteiro: T01 T02 T03 T05 T06 T10 T12 T13 T14 T16 |
| a presença (sem desenho, folha 2) | a folha e o diálogo nascem e somem sempre do mesmo jeito · no mesmo véu, a folha e o diálogo se revezam com o véu parado | T01 T02 T04 T11 T13 e o *Encerrar antes de terminar?* de toda tela |
| a lista que se reorganiza (sem desenho, folha 4) | o que fica desliza em 150ms, o que sai esmaece por cima, o que volta esmaece no lugar, e nenhuma altura anima | T02 T06 T13 T15 |
| o foco do campo (sem desenho, folha 6) | um foco só · o traço de 2 por cima da borda de 1, a capa em 150ms, e nada sai do lugar | T01 T02 T06 T10 T13 |
| primário | com o mesmo texto, acende por uma camada em 150ms · com outro texto, o texto esmaece no lugar e o roxo troca direto · o que se desabilita não mostra o roxo, e só o afundar solta | as 15 |
| checkbox | **o pressionado:** a área de 48 sobe pra `--elevado`, por baixo do poço e do texto, e solta em 100ms, como a linha tocável · a folha desenha só o normal e o marcado  | T01 T06 T13 |
| linha tocável | o que se desabilita no próprio toque solta a camada de uma vez | T01 e toda linha |
| glifo · o check que nasce | o glifo que troca depois de montar esmaece no poço em 150ms, com o que chega junto | T03 T07 T09 T11 T12 T14 T16 |
| aviso | **surge:** o aviso que aparece depois de a tela abrir esmaece em 150ms · **aguarda:** o veredito que espera a prova, na caixa neutra com a contagem — com `aguardaTitulo`, ela diz o que corre (*CONFERINDO*, a T11/04); na última linha, a palavra e a cor entram em 150ms | T01 T03 T05 T09 T11 |
| prova | **surge:** a prova sem lugar reservado esmaece em 150ms (sem uso nas telas: a cadeia concluída da T09 diz o resultado na faixa do *com contagem*, que surge em 200ms, o `Aviso` com `surge`) · **aguarda:** a legenda, ou a prova inteira com a contagem no lugar da versão · a T16 não usa: o autoteste correndo não tem veredito (a T16/07) | T11 |
| cadeia gravando | **segue:** a barra da etapa anda um trecho linear por passo do processo (100ms × `--mov-fator`), só por `scaleX`, na gravação e de novo na releitura, que nasce no zero · a linha do que a etapa gravou entra no lugar da barra, esmaecendo em 150ms · com reduzir, a barra salta pro valor de cada passo | T09 |
| faixa | **ausente:** a faixa que nasce desce em 200ms, e o que ela empurra acompanha — na T07, quando as oito verificações do módulo passam sem trava; a linha de mensagens só informa (a R-05 no protótipo) · **revela:** a aberta sobe em 200ms e revela a sem sessão | T07 T16 |
| escala | **segue:** um trecho linear por passo do processo, vezes `--mov-fator` · montar nunca anima | T03 T13 T14 |
| tambor | rola na troca de valor: 300ms por rodinha, 40ms entre elas, a unidade primeiro · nunca ao montar · o tambor fica dentro do *valor em poço* da calibração (folha 8) | T10 |
| trilho | **acende:** o trilho do elo relido acende de cima pra baixo em 300ms, só na cadeia | T09 |
| barra do checklist | **de:** na volta do item, avança em 300ms do valor de quando o item abriu | T13 |
| régua da diferença | o veredito que chega: a diferença encolhe e esmaece em 300ms, e o veredito entra em 150ms, depois do tambor | T10 |
| lista · a cascata | só quando a busca acha: cada linha esmaece em 150ms, 80ms depois da anterior | T05 |
| justificativa | o campo que abre esmaece em 150ms, e o que fecha sai esmaecendo por cima | T13 |
| encerramento | a legenda que passa ao passo que corre esmaece em 150ms; o espaço muda direto | T16 |

Os espécimes de movimento, tocáveis, ficam na vitrine, fora da bancada: `mov-troca`, `mov-troca-quadro`, `mov-porcima`, `mov-listas-*`, `mov-check-*`, `mov-faixa-*` e os dos instrumentos (`mov-escala-baixa`, `mov-prazo-drena`, `mov-semear`, `mov-barra-checklist`). O movimento que não tem porta no palco se prova neles.

## No protótipo · o modo claro e as correções finas

- **o interruptor** é a peça `Interruptor` (`src/ds/entrada/Interruptor.jsx`): a linha inteira é um botão com papel `switch` · o movimento só usa transform e opacity — a bolinha tem 24 e encolhe a 16 (`--interruptor-desligado`) ou cresce a 28 enquanto o dedo está em cima (`--interruptor-apertado`), e o roxo do trilho e a cor da bolinha ligada são camadas que entram por opacity · o trilho tem 52 (`--interruptor-largura`) · os três tokens são do protótipo, pro movimento caber na lei, e o desenho parado é o da folha 9.
- **o avatar da conta** é a mesma peça nas 17 telas da T04 e na folha da Conta: o fundo `--fundo-cartao` e o contorno `--borda`.
- **o texto de apoio de 12** com 16 de altura de linha em toda peça, pelo token `--entrelinha-apoio` (o `--entrelinha-legenda`, de 1,45, continua com o texto de 13 e de 15 que já o usava: a folha com opções, a nota *fato* de 13, a frase da T10) · ficam de fora o rótulo em caixa alta da T07 e a marca do login, que têm espaçamento entre letras.
- **o relógio de 16** é o do item do checklist (o poço de 26) e o das linhas da T07/11 e da T11/04 · **a linha de rechecagem** usa o relógio de 18 do poço de 30, como a T15/04 desenha · diferença conhecida da referência: a folha 7 o desenha com 16, e a tela que usa a peça, não.
- **o segmento feito** da barra do checklist e o que resta da fila que drena (T14/01) em `--lima-feito`.
- **o claro** é o `data-tema="claro"` na raiz do app (`App.jsx`), com a escolha em `src/estado/tema.js` · os dois tokens que apontam pra outro (`--idade-preenchido`, `--rolagem-cor`) se repetem no bloco do claro, porque um `var()` se resolve onde o token é declarado · as barras do sistema trocam o branco do desenho oficial pela `--tinta` só no claro · a vitrine tem a folha 9, com o interruptor nos dois estados e o primário, o confere e o avatar no claro (fora da bancada, como os da folha 9).

## No protótipo · o claro neutro frio, o logo e o palco

- **o logo** é o mesmo arquivo de `05-recursos/marca`, desenhado inline pela peça `Marca`: o preenchimento dele vira `currentColor`, e a cor é a do `--logo` · o arquivo continua com o lima gravado, porque as referências HTML o mostram como imagem; o app nunca usa essa cor.
- **os traços do CONFIGURADOR** em `--borda-neutra`.
- **o interruptor no palco:** a mesma peça `Interruptor`, solta (`solto`, sem o cartão) e com o sol antes do rótulo (`icone`), no pé do painel · o mesmo estado da folha da Conta (`src/estado/tema.js`) · o palco é sempre escuro, e a bolinha ligada lá é a lima do `--texto-primario` do escuro.
- **o claro neutro frio** vem só dos valores do bloco `[data-tema="claro"]`: nenhuma peça muda por ele.

## No protótipo · o que não pode sumir no claro

- **o tracinho vazio** é o glifo `traco` (`Glifo.jsx`) e o traço da escala vazia (`Escala.jsx`), os dois em `--marca-vazia` · o do recebimento da T12 continua no `--marca-limite`, como a referência.
- **a faixa *Sem sessão de configuração*** no menu fecha nos 50, com um traço em cima e um embaixo · **a última linha** da lista da T05 e do *Conferido na conexão* da T07 sem divisória.
- **o fio de cima da folha** usa o token do papel, `--folha-topo` (com outra cor, no claro, ele aparece como uma linha cinza em cima da folha branca): no escuro, `#332C49`; no claro, a cor da folha.
- **ainda com a cor de outra peça** (a luz do poço, `--borda-poco`), medidos e propostos, não corrigidos: o trilho da cadeia antes de começar, a borda do diálogo, a borda do botão da linha, o traço e a capa do aviso que espera, a borda da nota do achado, o traço da prova que se desenha, e o tracejado e a marca do vazio da T05.
- **o véu sob a barra do sistema**: o véu é um retângulo só, que sobe sobre o chrome pela margem negativa e devolve a medida em padding, mais 2px por baixo da barra · no palco, a tela do celular é desenhada como uma camada só · os dois tiram o fio que sobrava embaixo da barra com o celular em escala · nada muda no que se vê em escala 1.
