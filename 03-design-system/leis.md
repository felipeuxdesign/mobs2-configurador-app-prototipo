# As leis

Cada lei tem o porquê. Uma lei sem motivo vira gosto, e gosto se discute; lei com motivo se aplica.

**◆ Ajustada pelas telas.** Onde a lei e as referências aprovadas discordam, as telas mandam e a lei descreve o que elas fazem. As linhas com ◆ estão escritas assim, com cada exceção nomeada. As leis de ergonomia (toque, tamanho de texto, tinta) ficam, e a tela que as fura ganha exceção declarada, sem baixar o mínimo.

## Leis visuais

| # | Lei | Por quê |
|---|---|---|
| 1 ◆ | **Lima marca veredito e escolhido** — e o texto do botão primário. Contam como escolhido: o campo em foco (rótulo e traço), o próximo passo do menu (*decide agora*), a faixa esperada de uma leitura e o rótulo de uma prova (*O PAINEL MOSTRA*). E a marca (lei 15). Nunca enfeite | se o lima aparece em todo lugar, ele para de dizer *passou* |
| 2 | **A falha mora no elemento.** O bloco que falhou acende; o título da tela fica | o técnico olha onde deu errado, não lê a tela de novo |
| 3 ◆ | **O estado muda o conteúdo.** O desenho só abre espaço pro que o estado acrescenta — um aviso, uma causa, uma busca, uma linha que some por não se aplicar. Título, faixa e rodapé ficam no lugar | a tela que muda de forma parece outra tela, e ele se perde |
| 4 ◆ | **Todo glifo de estado vive num poço**, até dentro de cartão. Exceções declaradas: o check dos requisitos da senha (T01) e do *confere* da calibração (T10), e os glifos do bloco do evento (T14), que vivem soltos ao lado do texto | o poço é o lugar onde se lê o veredito, sempre o mesmo lugar |
| 5 | **Barra só onde há faixa esperada.** Exceções declaradas: o placar do checklist, o progresso da sincronização (T03) e o do envio da fila (T15) | barra sem faixa é decoração |
| 6 ◆ | **Preenchido é o que resta:** o tempo drena, o placar enche. O que baixa ou sobe (sincronização, envio) enche com o que já foi; a idade do pacote (T03) enche com o tempo que passou, até o limite | a barra cheia de um prazo diria que sobra tempo |
| 7 ◆ | **Aviso tem um formato só:** poço, rótulo, uma frase. Quatro usos — falha, aviso, processo parado, com contagem. Exceções declaradas: a falha do autoteste (T16), com rótulo de topo e duas orações, e o aviso da folha de trocar de empresa (T04), sem poço | um aviso de cada jeito ensina nada |
| 8 | **Um primário por tela.** Rodapé com no máximo duas ações | duas opções de igual peso são uma pergunta que o técnico não sabe responder |
| 9 | **Dois portadores de urgência, no máximo** | três vermelhos são um só barulho |
| 10 ◆ | **Texto informa a partir de 12px**; rótulo em caixa alta pode ter 10 ou 11, e a unidade ou a contagem junto de um número também (*km*, *%*, *de 4*) | abaixo disso não se lê em campo, com o celular na mão |
| 11 ◆ | **Tinta mínima de texto: `--tinta-apagada`**, com contraste AA medido no fundo real. O traço de vazio (—) não é texto e pode usar `--marca-limite` | abaixo disso, some em campo |
| 12 | **Prova só quando diz algo novo** | a frase que repete o que a tela já mostra é ruído |
| 13 | **Valor vem de token.** Nenhum número solto | o número solto é o primeiro a divergir |
| 14 | **O ícone é o desenho do jogo de ícones**, o SVG exato de `03-design-system/icones/`, com a cor do token e o traço da lei: 2,2 nos glifos de estado, 1,8 nas ferramentas e nas folhas, 2,6 abaixo de 14px · o riscado é o ícone inteiro com o risco por cima e um fio na cor do fundo (lei 21) · **nunca o parecido de uma biblioteca**: 44 dos 48 são desenhos próprios, e o Lucide só é ponto de partida pra um ícone novo, que entra primeiro no jogo · o olho da senha e o caminhão do ativo são desenhos próprios, como os outros | o técnico reconhece o app pelos desenhos, e um ícone trocado pelo da biblioteca muda o desenho sem ninguém perceber: o caminhão do ativo foi trocado assim |
| 15 | **A marca usa o `--lima`.** A logo usa o `#AAEF00`, o lima de produto da Mobs2 — o mesmo do Vídeo Telemetria, ao lado do roxo institucional `#402070` · **o logo segue o token `--logo`**: lima no escuro, o roxo institucional no claro — o lima não lê no branco | o arquivo antigo tinha `#B8F23D`: quase igual ao sistema, e quase igual parece erro |
| 16 | **Tem seta, toca; sem seta, é leitura.** Todo tocável de lista tem a seta; leitura, feito e espera não têm | no checklist, o que se tocava e o que só se lia tinham a mesma cara |
| 17 | **Desabilitado é tinta apagada.** Cartão, botão ou ação da faixa que não pode agir agora fica em `--tinta-apagada` (#867E9A), desabilitado de verdade, e o motivo está escrito na tela · nos processos, o `ENCERRAR` da faixa faz o mesmo que o voltar do Android: onde o voltar não faz nada, ele fica apagado | um tocável aceso que não responde parece defeito |
| 18 | **O contexto é a empresa.** O técnico escolhe a empresa, e o pacote é o dela, inteiro · o app não tem unidade nem garagem (decisão 56) · com uma empresa só, a escolha não aparece | a unidade era um passo que o técnico não decidia: a frota inteira da empresa cabe no pacote |
| 19 | **Rodapé: um botão e um link.** Ação a mais vai pra uma folha | três ações empilhadas quebram a gramática de todas as outras telas |
| 20 | **Folha de opções fecha no xis; folha de confirmação, no Cancelar.** Toda folha também fecha tocando fora, arrastando pra baixo e no voltar do Android | numa confirmação, o *não* fica junto do *sim*, embaixo do polegar — é o padrão do Material |
| 21 | **Ícone riscado é o ícone inteiro, com o risco por cima** e um fio escuro separando — nunca a versão *-off* da biblioteca | a versão da biblioteca redesenha o ícone em pedaços, e o técnico precisa reconhecer um desenho novo |
| 22 | **As barras do sistema são do sistema, e são cenário fixo.** Em cima, a barra oficial do Android, do kit do Material no Figma, versão escura de alto contraste: o 9:30, o Wi-Fi cheio, o sinal em triângulo e a bateria em pé, pela metade como no kit · o espaço da câmera fica reservado no centro, sem desenhar. Embaixo, a navegação por gestos do Material — a pílula branca no centro — em todas as telas, inclusive no login, por cima de tudo, inclusive das folhas. O rodapé reserva os 24px dela · o fundo das duas é o da tela · sem Bluetooth e sem variação de rede: o que acontece no mundo, a tela diz · **o teclado do aparelho também é cenário**: o numérico do Material 3, desenhado só na tela do código (T01/03), de `05-recursos/sistema/teclado-numerico.svg` (e o `-claro`, no modo claro), por baixo da pílula · o app encolhe até o que sobra acima dele | com a hora na fonte do app, a barra parecia parte da tela, e o celular não se separava do app |
| 23 | **As listas têm três densidades.** **50px** pra conferência, um veredito por linha — a T07, a T11, a T12, a T16 · **44** pra lista longa — a CAN e o checklist · **38** só na leitura ao vivo do ciclo de testes, que enche a tela · o ícone é sempre 16; o rótulo, 15 | com uma linha só pra tudo, a T07 usava a de 38 com conteúdo de conferência, e sobrava um quarto da tela |
| 24 | **Todo momento que mostra algo novo ganha referência.** Um texto, um indicador ou uma contagem que só existe no meio de uma animação vira um quadro desenhado · o movimento entre duas referências que já existem fica só no `animacao.md` | quem constrói segue as referências: o momento que só existe por escrito sai improvisado |

## Leis de medida

| Lei | Valor | Por quê |
|---|---|---|
| **A tela** | 360 × 800 | o Android de entrada que o técnico usa |
| **Toda medida é por dentro** | `box-sizing: border-box` em tudo | o número escrito é o tamanho que aparece |
| **Nada visível a menos de 32px do pé** | rodapé que termina em link fecha com 24; em botão, com 32 | a barra de gestos do Android, e o polegar |
| **Toque de 48** ◆ | todo tocável tem 48 de toque, e o primário 56. O desenho pode ser menor (o olho, o X, o link de 44): a área de toque cresce por fora, sem mudar o desenho | o polegar, com o arnês na outra mão |
| **Nada encosta** ◆ | todo tocável — botão, checkbox, rádio, campo — a 8px de qualquer vizinho · poço a 6px da divisória · texto a 6px da borda · caixa a 6px da caixa vizinha · **área de toque a 8px de qualquer outra**: quando o desenho não deixa esse espaço, a área cresce só pro lado livre — o link do rodapé, pra baixo, com 44px e a 8px do botão; o avatar da conta, pra cima, e o ENCERRAR da faixa com 44px — e o que se vê não muda | peça encostada lê como uma peça só, e toque encostado cai no vizinho |
| **Poço na linha** ◆ | linha de 38 leva poço de 24 · 44 leva 30 · 50 leva 32 — sempre no centro | o poço é da linha, não da divisória · vale pra linha de lista e pro cartão que age como linha; **não vale pro aviso**, que tem o poço dele |
| **A barra do sistema sangra no primeiro andar** | a cor dela é a do que está logo embaixo; com uma folha ou um diálogo aberto, o fundo escurece junto com a tira, a faixa e o conteúdo; o desenho oficial da hora e dos ícones continua legível | a tela começa na borda, e o topo do app não parece disponível atrás da folha |
| **O traço do rodapé** | dentro do app, um traço separa o rodapé fixo do conteúdo · **no login (T01), sem traço**: o botão é o fim do formulário | dentro do app o conteúdo pode rolar por trás das ações · no login nada rola, e o traço partiria o formulário |
| **O link do rodapé tem 48 de toque** | 44px de desenho e 48 de área de toque, crescendo pra baixo, no espaço que já sobra até a borda · 8px entre o botão e o link | o mínimo do Material 3, sem mudar o desenho |
| **O texto de apoio tem 16 de altura de linha** | todo texto de 12 — o apoio embaixo do título, a descrição, a legenda — com 16 de altura de linha, como o Material 3 pede pro texto pequeno · os rótulos em caixa alta, com espaçamento entre letras, ficam de fora | com uma altura só, o par título e apoio senta no mesmo lugar em toda linha, e o apoio que quebra em duas linhas continua com respiro |
| **A última linha não tem divisória** | numa lista dentro de um cartão, cada linha tem a divisória embaixo, menos a última — ali quem fecha é a borda do cartão · e nenhuma linha do meio fica sem | duas linhas coladas no mesmo lugar engrossam o traço e parecem erro |
| **O contraste vale nos dois temas** | texto: 4,5:1 · o que indica estado (o interruptor, o veredito, o traço de limite): 3:1 · o botão secundário é reconhecido pelo texto e pelo fill, um degrau fora do cartão (`--fundo-botao`), com a borda `--borda-botao` · marcadores e traços (o risco da régua, o tracinho vazio): nunca mais fracos no claro do que no escuro · medido contra a página, o cartão e o poço · a tabela da folha 9 mostra cada cor | no escuro, o preto deixa tudo aparecer; no claro, o que é fraco some · foi o que aconteceu com o tracinho, os riscos da barra e os traços do logo |
| **Cada peça usa o token do seu papel** | nunca a cor de outra peça, mesmo que no escuro ela fique igual · se o papel não tem token, ele ganha um, com os dois valores | a cor emprestada passa no escuro e some no claro: os traços do *CONFIGURADOR*, o tracinho vazio e a borda do avatar usavam cores de outras peças |
| **Folga até o rodapé** | 16px no mínimo, em toda tela | o conteúdo não pode encostar nas ações |
| **O marcador de escolha é um só** | poço de 24 no checkbox e na coluna do palco, 30 na linha de lista · quadrado vazado de 11, com borda `#4A4166`, no desmarcado · lima cheio de 11 no marcado | quatro versões do mesmo marcador liam como quatro peças diferentes |
| **A faixa da sessão é uma peça só** | 52px com a linha de baixo, em toda tela · nunca encolhe quando o conteúdo passa da tela · no módulo em falha, a linha é vermelha, de 2px, nos mesmos 52 | desenhada de três jeitos, ela mudava de tamanho de uma tela pra outra |

**Cobertura das folhas:** o `--veu` cobre todo o fundo do app, incluindo a tira de contexto, a faixa de sessão e o fundo da barra de status. O SVG oficial do Android permanece acima, legível; a folha conserva sua posição e suas medidas. Na T04, os diálogos `06`, `09`, `12`, `13` e `16` usam a mesma cobertura, para a troca entre folha e diálogo manter o véu contínuo. Como no Material 3, o `--veu` é a cor do tema a 32%, a opacidade padrão do Material 3 (`ScrimOpacity = 0.32`), e a tela de onde a folha ou o diálogo saiu fica desenhada atrás, escurecida, nunca um fundo vazio; a cobertura integral vale também pro diálogo da T02, pra Seção F da T13 e pro ENCERRAR sobre qualquer tela.

## Leis de produto

| # | Lei |
|---|---|
| R-01 | **O tema escuro é o padrão.** O app nasce escuro; o claro é escolha do técnico, pelas R-16 a R-19 |
| R-02 | Nome, saída e estado normal **nunca são lima** |
| R-03 ◆ | O título da tela **nunca vira a falha**. Exceção declarada: no código de recuperação (T01), o título diz *Código inválido ou vencido*, a mensagem única |
| R-04 | **Momento é etapa do fluxo; estado depende do mundo.** A coluna do palco oferece ambos como consultas paradas quando o índice os inclui; isso não muda o tipo normativo da referência |
| R-05 | A T05 não tem faixa de sessão: **a sessão nasce** quando o módulo conecta, e **a faixa aparece na T07** depois das verificações do diagnóstico sem trava |
| R-06 | `Sair da conta` mora na folha da conta, nunca na faixa |
| R-07 | O diagnóstico é **lista, na ordem**: o módulo primeiro, a CAN depois — a trava acende na própria linha, e o título fica |
| R-08 | O processo que para é **aviso**, no formato único |
| R-09 | A calibração mostra o número **rolando no lugar** — o tambor —, sem remontar a tela |
| R-10 | No protótipo, as leituras do ciclo de testes seguem a cadência de 3 segundos; **o cartão espera a resposta do técnico**. A ignição desligada confirma depois dessa resposta. As consultas da coluna ficam paradas |
| R-11 ◆ | Escolher e seguir com um módulo ou ônibus que é caso do mock **abre o estado dele** — a porta natural. Com a R-14, o estado aparece quando o técnico aperta o botão, não no toque da linha |
| R-12 | Estados de toque: **normal, pressionado, desabilitado.** Sem hover. Sem foco de teclado no app |
| R-13 | O palco fica **fora do app**. Comparar com a referência é trabalho da construção, não do palco |
| R-14 ◆ | **Escolher numa lista marca; quem avança é o botão.** Tocar numa linha que tem o marcador de escolha (o quadrado) só marca — o quadrado lima surge — e acende o primário; é o primário que segue. Tocar em outra linha troca a marca. A linha com chevron (uma opção, uma consulta) age no toque |
| R-15 ◆ | **O celular não mostra a barra de rolagem do navegador.** O que rola mostra o indicador do sistema: fino, por cima do conteúdo, sem ocupar lugar, enquanto rola, e some depois |
| R-16 | **O app nasce escuro; o claro é escolha.** Uma linha *Modo claro* com interruptor, na folha da Conta · desligado de fábrica · o aparelho lembra da escolha, inclusive no login, antes de entrar |
| R-17 | **O claro é neutro frio.** Cinzas com um fio de azul-violeta, no espírito da Linear: branco nos cartões, a página em `#F7F7F9`, bordas finas, texto `#1F2023` · o tom frio conversa com o roxo, que fica nos ícones, no veredito, no botão e no logo · a estrutura é a mesma do escuro — só as cores mudam, pelo bloco `[data-tema="claro"]` dos tokens · o poço continua rebaixado, com a luz de baixo em cinza pra aparecer no branco · os rótulos em caixa alta ficam cinza nos dois temas |
| R-18 | **No claro, o lima vira roxo.** O veredito, o escolhido e os preenchimentos — o *confere*, a bolinha de conectado, o progresso, a régua — em `#5B3A99` · o texto do botão principal fica branco · o lima não aparece no claro: como texto ele não lê no branco, e sozinho no botão ficaria solto |
| R-19 | **No claro, as barras do sistema escurecem.** A hora, o sinal, a bateria e a pílula de gestos na cor do texto, como o Android faz com app claro · o véu continua preto a 32% |
| R-20 | **No claro, o rebaixado grande é leve, e o poço é a personalidade.** Campo, painel, bloco de aviso, faixa do topo, busca e área da foto usam `--fundo-rebaixado` (`#F2F3F6`), com as bordas suaves · o poço fica só pro quadradinho do ícone, o check, o trilho e o marcador · campo é rebaixado qualquer que seja a largura |
| R-21 | **O botão sobe um degrau em relação ao que está embaixo dele.** Em cima de cartão ou página, `--fundo-botao`; em cima do rebaixado, `--fundo-botao-no-rebaixado`, branco no claro |
| R-22 | **O andamento tem cor própria.** A etapa atual, o "agora" na régua e o item da vez usam `--andamento`: o creme no escuro, o roxo da marca no claro, nunca o preto do texto · **dentro de uma barra em alerta, o marcador acompanha o alerta**: `--andamento-alerta`, o vermelho escuro no claro |
| R-23 | **A barra de status acompanha a superfície de baixo.** No menu, o rebaixado da faixa do topo; nas outras telas, a página ou o cartão · nunca uma cor própria |
| R-24 | **Nenhum token novo do claro muda o escuro.** Todo token criado pro claro nasce, no escuro, com o valor que o escuro já usava · o escuro é conferido tela a tela a cada mudança do claro |
| R-25 | **A tela para onde está a próxima ação do técnico.** Deu certo, ela mostra o resultado primeiro; deu errado, ela fica na falha e no que conferir |
| R-26 | **O cartão de mensagem tem o tamanho do conteúdo.** Não estica até o rodapé pra preencher a tela — o vazio fica fora dele · **a exceção é o elemento principal da tela, que ocupa o espaço**: o visor da câmera, a leitura com a régua, a entrada do painel, e **a área da lista** — vazia, procurando ou bloqueada (T05), porque é ali que os itens vão aparecer, sem a tela pular |

**No protótipo · R-05** · a sessão nasce na conexão, e **a faixa desce na T07**, quando as oito verificações do módulo passam sem trava; as mensagens no módulo só informam — é o que as referências desenham: a T07/00, 01 e 07 a 10 têm a faixa; as travas e o firmware, 02 a 06, não. A `logica.md`, a decisão 44 e a animação da T04 seguem o mesmo padrão.
