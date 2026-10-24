# T04 · Menu

O painel das ferramentas: o que está pronto pra usar, o que espera o quê.

**A cobertura do véu:** nas folhas `05`, `07`, `08`, `10`, `11` e `21`, o véu escurece todo o fundo do app: menu, tira, faixa e fundo da barra de status. A hora e os ícones oficiais continuam legíveis. Os diálogos `06`, `09`, `12`, `13`, `16`, `17` e `20` usam a mesma cobertura, preservando o véu na troca com uma folha. Painéis e caixas mantêm suas posições, medidas e ações. Onde uma nota abaixo descreve a tira ou a faixa acesa atrás do véu, vale esta cobertura.

| | |
|---|---|
| **Elemento-assinatura** | a grade de nove cartões em que cada ferramenta diz, no próprio cartão, o que falta pra ela funcionar |
| **Chrome** | tira de contexto (a empresa) + faixa de sessão quando há sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · fila com 2 itens |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 13 · 7 — ver `estados.md` |

- no protótipo · o chrome: tira de contexto (a empresa) + faixa de sessão · sem sessão, a faixa diz só o fato (01)

## O que se toca

- **no protótipo:** a 16 é o diálogo da fila parada, no lugar do aviso do acesso (`avisoDaFila`, o número por extenso), só pela coluna · a saída de 44 fica a 8 do primário (decisão 38, como a T04/06); diferença conhecida da referência: ela a desenha a 6
- o título *Menu* existe escondido em todas as telas do menu, pra leitura de tela
  - no protótipo: o h1 *Menu* escondido não fica inerte atrás do véu — existe pro leitor com a folha ou o diálogo por cima ou não. Ele não se toca, e o que é tocável atrás do véu continua inerte. Os `textos.md` das folhas e dos diálogos (05 a 13, 16, 17, 20 e 21) trazem o *Menu*, e a régua o confere
  - no protótipo · a régua dos textos com algo por cima: os `textos.md` das folhas e dos diálogos listam o *Menu* escondido e só o que está por cima; o fundo atrás do véu — a tira, a faixa e o menu — fica inerte, também atrás das folhas do módulo e do ativo (10, 11), e a régua não o lê. As 21 referências conferem, menos as três de sempre, embaixo (a 01 e a 02, o *2* da fila; a 04, o 10 do checklist)
- o diálogo do ENCERRAR, fora do menu, abre sobre a própria tela, e o `Continuar a instalação` deixa o técnico nela
- o ENCERRAR antes de terminar abre o diálogo *Encerrar antes de terminar?* · `Continuar a instalação` fecha e volta pra tela · `Encerrar mesmo assim` → o encerramento sem homologar da T16 · depois de homologar, o ENCERRAR vai direto, sem diálogo
  - no protótipo (decisão 36): o diálogo é o momento `13`, com endereço — a URL abre e fecha, e o `Continuar a instalação` volta ao quadro do menu (00, 01 ou 02). O véu cobre a tira e a faixa, como no aviso do acesso, e a caixa tem o ar de 24 que a `13` desenha; o menu inteiro fica atrás dele, inerte. O voltar faz o `Continuar a instalação`. Aberto pelo endereço, o aviso do acesso espera o diálogo fechar, como espera a folha. Depois de homologar, o ENCERRAR do menu vai direto pros passos do encerramento. A peça é uma só pra toda tela com a faixa (`app/src/estado/encerrar.jsx`, `06-prototipo/logica.md` · ENCERRAR): nas outras telas, o mesmo diálogo abre por cima da própria tela, sem endereço
- o `Encerrar a sessão` das folhas do módulo e do ativo abre o mesmo diálogo, antes de homologar · as folhas de sair da conta e de trocar de empresa já são a confirmação delas, e avisam: *é encerrada antes da troca, sem terminar a instalação* — nenhum caminho pergunta duas vezes
  - no protótipo: o `Encerrar a sessão` fecha a folha na hora, sem dois véus, e abre o `13` por cima do menu; o `Continuar a instalação` volta ao menu, sem a folha. Os diálogos de sair e de trocar não passam pelo *Encerrar antes de terminar?*: vão direto pros 4 passos da sessão abortada — ou, com o checklist registrado, pro encerramento completo da T16 (a 20) — e seguem pro destino
- **o nome da empresa no topo → a folha Trocar de empresa** (a 07): *Trocar recarrega os ativos e o pacote desta empresa.*, e as empresas do técnico, cada uma com o pacote dela e os ativos, a atual marcada · o pé da folha tem o primário, apagado e desabilitado enquanto a marcada é a atual: *Escolha outra empresa* · **tocar noutra empresa só marca, e o primário acende com `Sincronizar`** (a 21): é o primário que troca, como na T02 (R-14) · tocar de novo na atual devolve a marca a ela, e o primário apaga · `Sincronizar`: sem sessão, a T03 baixa o pacote da marcada (o de 4 dias e o vencido perguntam antes, T03/03 e 04); com a sessão aberta, o diálogo de trocar (a 09), que diz pra qual empresa, *Trocar pra Transportes Capibaribe?*, *é encerrada antes da troca, sem terminar a instalação*, e `Encerrar a sessão e trocar` · com evidência subindo, a troca espera a fila (a 08): as outras empresas dizem *espera o envio terminar*, com o traço no lugar do marcador, e não se tocam, e o primário diz o mesmo, apagado: *Espera o envio terminar* (HU-T02-3, HU-T02-4) · **a empresa de pacote vencido também se escolhe na folha**, como na T02: a linha diz a idade e que venceu, *carregado há 8 dias, vencido*, e a T03/04 diz o que fazer
- **com uma empresa só, o nome no topo fica sem a seta e não é botão**: a folha não abre
  - no protótipo: a folha é a `07`, com endereço (`?tela=T04&momento=07-momento-folha-trocar-de-empresa`): as empresas do mundo do contexto, cada uma com o pacote dela (`app/src/telas/T04/dados.js` · `empresasDaFolha`, com a idade de `app/src/dados/formato.js` · `idadeNaFolha`, a mesma da T02), a atual marcada e o primário apagado, *Escolha outra empresa* · o toque marca (`marcar`), a URL passa a dizer a `21`, e o primário acende com `Sincronizar` (`primarioDaFolha`); tocar de novo na atual devolve a marca e a `07` · o `Sincronizar`, sem sessão, leva direto à T03 da marcada, com a empresa no contexto e sem pacote; com a sessão aberta, a folha desce e o diálogo de trocar nasce (o `09`), com o título da marcada (`tituloDoTrocar`), o `Cancelar` volta à folha com a marca onde estava, e o `Encerrar a sessão e trocar` roda os 4 passos da T16 — ou, com o checklist registrado, o encerramento completo, com a frase da 20 no lugar do *sem terminar a instalação* (sem referência) — e segue pra T03 da escolhida · o `08` e o `09` abrem pelo endereço, parados e sem toque, fora da coluna (o `coluna` do índice): o `08` com a evidência subindo do mock (o f-04), as outras duas esperando o envio terminar, com o tracinho no poço e desabilitadas, e o primário *Espera o envio terminar*; o `09` com a sessão do herói e a primeira das outras, a Transportes Capibaribe · no fluxo, a folha abre sem envio em curso · o primário da folha é a peça `Primario`, embaixo da lista, a 12 dela (a folha com escolha, folha 2), e no arraste ele também não afunda · o que o toque faz se prova no node (`app/scripts/testar-trocar-empresa.mjs`, nas funções da tela), e se anda nos roteiros `empresa.mjs` e `sair.mjs`
  - no protótipo: com uma empresa só (o caso `uma-empresa`, o mundo do contexto), a tira desenha o nome sem a seta, num texto que não é botão (a peça *tira de contexto* sem o toque, `app/src/ds/chrome/TiraDeContexto.jsx`); nenhuma referência desenha esse mundo, e o palco não o abre: ele se prova no node (`testar-trocar-empresa.mjs`), e o espécime `f2-tira-uma-empresa` da vitrine o mostra
- **a folha Conta diz o que acontece quando o acesso vence** (a 05): *Quando vencer, o app pede a senha de novo, com rede.*, como o aviso do 5º dia (a 12) · sincronizar não renova o acesso: a sessão de acesso abre no login e encerra por Sair ou pelos 7 dias (o domínio, HU-T01-11)
- no 5º dia da sessão de acesso, o diálogo *Seu acesso vence em 2 dias* aparece na primeira chegada ao menu · `Entendi` fecha, e ele volta no dia seguinte até o técnico entrar de novo com rede
  - no protótipo, com o relógio parado, ele aparece uma vez só: o `Entendi` grava no estado único que ele foi visto, e recarregar a página ou tocar na T01 do painel do palco (que zeram o estado) mostra de novo. Os dias saem do mock (`situacao.sessaoAcesso`)
  - a chegada é a do menu sem nada por cima, com a sessão ou sem ela: a do herói, depois da sincronização, e a semente — o pulo do palco pro menu também mostra o aviso. O endereço de uma folha abre a folha, e o aviso espera o menu ficar sem nada por cima
  - o `Entendi` é o único jeito de fechar, e o voltar faz o mesmo que ele. O véu cobre o menu inteiro, a tira e a faixa também (12) · no print, o aviso só aparece no 12 (`logica.md` · O aviso do acesso)
- **o contador do cartão da Fila de saída** conta o que ainda não chegou da fila do aparelho, a que a T15 mostra (decisão 42): ela não é da empresa, e trocar de empresa não muda o número · na entrada, *2*: o recusado e o que está na fila · **o diálogo de sair conta o mesmo**: *2 itens ainda não chegaram ao servidor. Eles ficam no aparelho e continuam subindo.* (a 06, a 20; HU-T01-4: a fila do aparelho continua subindo, e não espera o próximo login)
  - no protótipo: o contador lê a fila do aparelho (`app/src/estado/fila.js` · `naoChegouDoAparelho`): a da entrada, `M.filaDoAparelho` no mock (o f-10, o f-02, o f-08 e o f-11, a mesma da T15/00), mais o que a sessão criar, cada item como está — o recusado que o técnico reenviou volta pra fila e continua contando. O recebido e o recebido em conflito chegaram. O diálogo de sair conta o mesmo (`pendentesDoAparelho`, decisão 64), e o de outro usuário da T01/18 também: a diferença dos dois recortes acabou. A checagem de cobertura confere os 2 · **diferença conhecida da referência:** a `01` e a `02` não desenham o *2* no cartão da Fila de saída; o protótipo mostra, porque a fila do aparelho é a mesma com e sem módulo (0,13% contra o HTML nas duas, e a régua dos textos acusa *sobra*)
  - no protótipo · diferença conhecida da referência: a `04` desenha *11* no contador do checklist, e o protótipo conta os itens de B e E do herói, 5 + 5 = 10 (a checagem de cobertura confere os 10): 0,01% contra o HTML, e a régua dos textos acusa a troca
- **o módulo que perde o link** (a 03): a faixa diz *Módulo com falha*, a peça da folha 2 · o cartão do módulo vira o próximo passo, como o *toque para procurar* do menu sem módulo: o lima de escolha, *toque para reconectar* (HU-T05-4) · as ferramentas que precisam do módulo esperam por ele, *espera módulo*, tracejadas, como no menu sem módulo; o ativo, as últimas instalações e a fila ficam como estão (HU-T04-2) · o toque no cartão reconecta: ele diz *reconectando…*, sem o lima (a 18), e o resto fica · voltando, o menu da sessão (a 00); não voltando no tempo limite, o cartão volta a *toque para reconectar* (a 03) · a queda do reinício, na T16, tem a regra dela (T16/08 e 10)
  - no protótipo: a 03 e a 18 abrem pela coluna, paradas (o caso `link-perdido`, na sessão do herói; a 18 logo depois da 03), e pelo endereço montam o mesmo quadro · o cartão do módulo é o `cartaoDoModulo` (`dados.js`): o próximo passo, no poço de 34, como o do menu sem módulo, e, reconectando, o cartão ligado sem toque (a variante `desabilitado` do cartão de ferramenta) · as ferramentas que precisam do módulo esperam por ele (`causaDaFerramenta`, `ferramentaLiberada`) · no fluxo, o link não cai, e o toque se prova no node (`testar-trocar-empresa.mjs`) · tocado, o módulo volta depois da espera de conectar (`RITMOS.buscaMs`, a mesma da T05), e o menu volta ao da sessão (a 00): no protótipo, nenhuma espera estoura (decisão 64)
- **com o checklist registrado**, o cartão do *Finalizar com checklist* diz o próximo passo embaixo do nome: *registrado · falta encerrar a sessão* (a 19), no desenho do motivo dos cartões que esperam, aceso · o ENCERRAR leva ao encerramento completo da T16 (decisão 36)
  - no protótipo: a 19 é o menu da sessão com o checklist registrado (`etapas.checklist.homologada`, o registro da T13/11): a URL diz a 19 enquanto ele vale, e o cartão leva o motivo aceso, embaixo do nome (a variante da causa no cartão ligado, em `--tinta-secundaria`) · pelo endereço, a 19 e a 20 trazem o checklist registrado na sessão do herói
- `Conectar módulo` → T05
  - no protótipo: `Ativo selecionado` → T06, com o módulo conectado e o ônibus ainda não escolhido
- cada ferramenta liberada → a tela dela
  - no protótipo: a grade tem nove cartões, na ordem da `00` — os dois largos, o `Diagnóstico do módulo`, o `Configurar módulo`, a `Calibração`, o `Conferir configuração`, o `Finalizar com checklist`, que ocupa a linha inteira, o `Últimas instalações` e a `Fila de saída`. O `Diagnóstico do módulo` → T07 só precisa do módulo: sem sessão, *espera módulo* (01); com o módulo sem ativo, já se toca (02). As outras quatro esperam o módulo e o ativo. Quem decide se a T07 abre na caixa da CAN (00) ou com a CAN lida (01) é ela, pelo bloco do ativo gravado: o menu só leva
- **o cartão que espera tem o respiro do ligado**: o cartão desligado, tracejado, tem o mesmo respiro mínimo de 8px entre o ícone e o texto que o ligado tem — no menu sem módulo, o *Diagnóstico do módulo* e o *Conferir configuração*, que quebram em duas linhas, ficam a 8px do ícone · o *Finalizar com checklist* que espera tem a altura mínima de 100, e não de 108: ele cede a sobra, e o fim da tela fica longe da barra de gestos · vale na `01`, na `02`, na `05`, na `07` e na `08`
  - no protótipo: `ENCERRAR` → a sessão abortada, na T16 (`logica.md` · ENCERRAR)
    - no protótipo: antes de homologar, pelo diálogo `13`; depois, os passos do encerramento (T16/00)
- o nome da empresa na tira → folha Trocar de empresa (a 07) · com uma empresa só, não é botão
  - no protótipo: pro leitor de tela, a tira diz o que faz e qual é a empresa — *Trocar de empresa — Viação Atlântico Sul*, como a conta diz *Conta — Rafael Vieira*; a lista das empresas, *Trocar de empresa*
  - no protótipo: o toque na folha só marca; o `Sincronizar` troca — com a sessão aberta, pelo diálogo de trocar; sem ela, direto pra sincronização da marcada. A Expresso Caruaruense, com o pacote vencido, se marca como as outras e diz a idade e que venceu, *carregado há 8 dias, vencido* (a T02 diz *pacote de 8 dias, vencido*); a T03/04 diz o que fazer. Tocar de novo na atual devolve a marca a ela; com a evidência subindo (08), nada se marca
- as iniciais RV → folha Conta
- `Sair da conta` → **o diálogo de sair, sempre** (HU-T01-12: *Sair tem tela própria*): com a sessão ou a fila, o que fica e o que encerra (a 06): *A sessão de configuração do M2C-0417 é encerrada antes, sem terminar a instalação.*, e `Encerrar a sessão e sair` · sem sessão e sem nada na fila (a 17): *Nenhuma sessão aberta e nada na fila.*, com `Sair da conta` e `Cancelar` · **com o checklist registrado** (a 20): *O checklist do M2C-0417 está registrado: a sessão encerra antes, com o reinício e o autoteste do módulo.*, e o mesmo `Encerrar a sessão e sair`: o encerramento é o completo da T16, como o ENCERRAR depois do registro, e só depois o login · **nos três, a última frase diz que o login de depois precisa de rede**: *Pra entrar de novo, o login precisa de rede.* (sem rede, quem sai fica fora até ter sinal) · o trocar de empresa com o checklist registrado não tem referência: o diálogo é o da 09, com a frase da 20 no lugar da do *sem terminar a instalação*, e o `Encerrar a sessão e trocar` roda o encerramento completo da T16, como o sair da 20, antes da T03 da escolhida
  - no protótipo: o `Sair da conta` abre sempre o diálogo (`dados.js` · `momentoDoSair`, `frasesDoSair`): a 06, a 17 ou a 20, com só as frases que valem · sem sessão, o primário é `Sair da conta` e só sai, como a 17 · sem sessão e com a fila, a 06 sem a frase da sessão, com o primário da 17 (sem referência) · o mundo do herói sempre tem a fila do aparelho (2): a 17 se alcança pelo endereço e pela coluna, no fim, montada pelo caso `fila-vazia`
  - no protótipo: o `Cancelar` dos dois diálogos volta à folha de onde ele nasceu
  - no protótipo: `Encerrar a sessão e sair` → login, com a fila preservada · `Encerrar a sessão e trocar` → a sincronização da empresa nova · com o checklist registrado, os dois rodam antes o encerramento completo da T16, e o login, ou a T03, vem quando o autoteste termina (a T16 segue pro destino gravado em `etapas.encerramento.destino`)
    - **no protótipo** (decisão 36): os dois rodam os 4 passos da sessão abortada da T16 — ou, com o checklist registrado, o encerramento completo — e só depois seguem pro destino (`06-prototipo/logica.md` · ENCERRAR). Eles já são a confirmação: não passam pelo *Encerrar antes de terminar?*, e nenhum caminho pergunta duas vezes
- com a sessão aberta, o cartão do módulo → folha Módulo conectado · o do ativo → folha Ativo da sessão · os dois ficam travados: a folha diz isso e oferece `Encerrar a sessão`
  - no protótipo: a folha Módulo conectado é a 10, e a Ativo da sessão, a 11 (HU-T16-2); o `Encerrar a sessão` leva ao mesmo destino do `ENCERRAR` da faixa. Com o módulo sem ativo (02), o cartão do módulo já abre a folha dele
  - no protótipo (decisão 46): a folha do ativo (11) diz *frota 1003* e *Mercedes-Benz · OF-1621 · ônibus urbano* — o fabricante e o modelo do modelo de ativo, e o tipo, do nome dele sem o modelo, com a primeira letra minúscula (*Ônibus urbano OF-1621* → *ônibus urbano*). Sem o chassi. O mock não declara o tipo, porque o nome já diz: derivado pela mesma conta dos dados do modelo da T06 (*OF-1621 · ônibus urbano*), num lugar só — diferença conhecida (`app/src/telas/T06/dados.js` · `dadosDoModelo`, lido por `app/src/telas/T04/dados.js` · `ativoPreso`)
- cartão de ferramenta em espera é desabilitado de verdade: o toque não faz nada, e o motivo já está escrito nele
  - no protótipo: pro leitor de tela, o cartão em espera é desabilitado (`logica.md` · Os cartões em espera)
- `Últimas instalações` → T12 · ele depende só da rede do aparelho, não do módulo nem do ativo · sem rede, o cartão espera a conexão: fundo apagado e traço no poço — T04/15
  - no protótipo (decisão 48): o herói começa com rede, e o cartão fica ligado, com o relógio de histórico. Sem rede, é sempre o desenho da `15`, *sem conexão*, com a sessão ou sem ela — não existe *espera conexão*, porque o cartão não espera o módulo. No fluxo, a rede não cai: o `15` só abre pela coluna, montado pelo caso `sem-conexao-no-menu`, com a sessão do herói na faixa (M2C-0417 e RKT-8H42), como a referência desenha
- no protótipo: com uma folha ou diálogo aberto, o menu não se toca. O véu escurece o menu, a tira de contexto, a faixa de sessão e o fundo da barra de status; a hora e os ícones oficiais ficam legíveis acima dele. Isso vale também nas folhas do módulo e do ativo, no aviso do acesso e nos diálogos de sair, trocar e encerrar. O `ENCERRAR` permanece inerte enquanto a camada está aberta
- no protótipo: a folha fecha pelo X, tocando no véu, fora dela, e pelo voltar do sistema (no computador, o Esc); o diálogo, pelo `Cancelar` e pelo voltar, que faz o mesmo que ele (`logica.md` · O voltar do Android); o aviso do acesso, pelo `Entendi` e pelo voltar. No menu, sem folha nem diálogo, o voltar não faz nada: ele não tem saída desenhada (pergunta do produto)
  - no protótipo (lei 20): toda folha do menu também fecha arrastando pra baixo — o painel acompanha o dedo e, soltando depois de 56, fecha; antes, volta. O arraste que começa numa linha tocável não toca nela: a empresa não é marcada, o `Encerrar a sessão` não encerra, o `Sair da conta` não abre o diálogo. O toque fora é da peça, e o diálogo não fecha no toque fora (`06-prototipo/logica.md` · A folha que fecha)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema no menu
- faixa · módulo com falha
- faixa · sem ação
- tira de contexto
- faixa no menu
- o topo do menu inteiro
- folha
- diálogo
- diálogo sem saída
- diálogo com ciência
- folha com opções
- disponível
- decide agora
- espera
- conectado
- com pendência
- espera a rede
- linha do histórico
- linha de empresa
- linha de empresa · a atual
- a lista de empresas
- cadeia concluída
- cadeia recusada
- cadeia antes de gravar
- linha da fila
- linha da re-checagem
- contador no menu

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

- primário · normal
- primário · pressionado
- link · normal e pressionado
- linha tocável · normal e pressionada
- barra do sistema no menu
- faixa · sem sessão
- faixa · módulo com falha
- tira de contexto
- faixa no menu
- o topo do menu inteiro
- folha
- diálogo
- diálogo sem saída
- os glifos de estado
- os ícones de ferramenta
- os poços
- os marcadores
- disponível
- decide agora
- conectado
- com pendência
- espera
- espera a rede
- aviso
- nota com rótulo
- linha de empresa
- linha de empresa · a atual
- a lista de empresas
- tracinho vazio
- botões só de ícone
- contador no menu

Pelas referências, ficam fora as peças da lista de cima que nenhuma referência desenha nem o código usa (faixa · sem ação, diálogo com ciência, folha com opções, linha do histórico, a marca no login, campo e campo focado), e estão a faixa · sem sessão do 01 e o aviso do 08. O que só a T04 desenha é variante nomeada da peça: o cartão largo em espera e o 'decide agora' com poço 30 (CartaoFerramenta), o aviso sem poço (Aviso), a folha com folga 12 e subtítulo (Folha) e a linha de empresa que espera o envio, com o tracinho vazio no poço (LinhaEmpresa). O cartão da conta, o prazo do acesso e o Sair da conta são as peças da folha 2 que moram dentro da folha. Pelo medido, estão as peças de toque da folha 1 (o primário e o link dos diálogos, e a linha tocável), os átomos da folha 3 (glifos, ícones de ferramenta, poços e marcadores) e o X das folhas; e é variante também a grade com 10 entre os cartões. Com a sessão aberta, o cartão largo é o de sempre e abre a folha do módulo ou do ativo (10, 11). As folhas usam a folha com o X, a nota com rótulo (TRAVADO NA SESSÃO) e o botão da folha, embaixo da tira e da faixa do menu; o cartão do que a sessão prendeu (o ícone de ferramenta num poço de 44, a identidade e o detalhe) só elas desenham, e é peça da tela (`pecas.jsx`), montada com os poços e os ícones da folha 3. O toque fora da folha, no véu, é variante declarada da folha. O diálogo sem saída é o do aviso do acesso (12): o `Entendi` é a única ação, e a variante nomeada é o ar de 24 em volta da caixa, com o véu cobrindo a tira e a faixa. A faixa da sessão é uma peça só: a faixa no menu tem os 52 de toda tela, com a borda de cima embaixo da tira e a linha de baixo, que é dela e não do topo do menu; em falha, a linha vermelha de 2 nos mesmos 52. A faixa sem sessão do `01` fica com os 50 e a linha embaixo. Na folha Trocar de empresa, a Expresso Caruaruense diz a idade e que venceu, *carregado há 8 dias, vencido* (`idadeNaFolha`, a mesma idade da T02), e a linha não leva o que fazer; ela se marca como as outras · a folha com escolha leva o primário embaixo da lista (o `Primario`, a 12 dela). O cartão do módulo com o link perdido é o *decide agora* com *toque para reconectar*, no poço de 34, e reconectando, o cartão ligado sem toque (a variante `desabilitado` do `CartaoFerramenta`); o *Finalizar com checklist* registrado leva a causa acesa, em `--tinta-secundaria` (a variante da causa no cartão ligado). O diálogo de sair diz as frases que valem (`frasesDoSair`), e o bloqueio da T16/05, a quem acionar. O diálogo do ENCERRAR (13) é o diálogo, com o ar de 24 do aviso do acesso e o véu cobrindo a tira e a faixa. Com uma empresa só, a tira de contexto fica sem a seta e sem o botão (a variante da peça). Pelas decisões 44 e 48, a grade tem nove cartões, com o Diagnóstico do módulo, sem o Refazer leitura, e o Últimas instalações ligado, com o relógio de histórico entre os ícones de ferramenta · a *espera a rede* é só da 15. A lista de cima traz a *cadeia antes de gravar*, que nenhuma das 21 referências da T04 desenha, e não traz a *nota com rótulo*, que a 10 e a 11 desenham (TRAVADO NA SESSÃO): vale esta lista (diferença conhecida). O Finalizar com checklist ocupa a linha pela variante *linha* do cartão de meia largura (`CartaoFerramenta`), o mesmo desenho nas duas colunas, como o *com pendência* da folha 4; com o checklist aberto, o contador vai pro canto direito da linha inteira (04). A chave do Conferir configuração é a `ferramenta` do jogo de ícones, o `wrench` do Lucide inteiro, copiado pro jogo. Cada ícone é o desenho do jogo, o mesmo das referências.

## Histórias de usuário

- **HU-T04-1** — Vejo o semáforo do módulo no topo e a faixa de sessão acima dele
- **HU-T04-2** — Vejo as ferramentas; as que dependem de módulo ou ativo ficam desabilitadas com o motivo
- **HU-T04-3** — A fila mostra o contador de pendentes no próprio cartão, sem abrir
- **HU-T04-4** — Checklist pendente aparece como aviso persistente
- **HU-T04-5** — Não existe console de log. Cada ferramenta reporta estado em linguagem de campo
- **HU-T04-6** — Sem rede, o menu continua de pé; só as últimas instalações esperam a conexão

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## As palavras

- **"homologada" só na T16**: o encerrar antes da hora diz *Encerrar antes de terminar?* e *A instalação ainda não terminou.* (a 13) · o trocar de empresa e o sair dizem *sem terminar a instalação* (a 09 e a 06; o sair dizia *sem homologar*, a diferença que a decisão 36 deixou a revisar) · o sair com o checklist registrado diz o que roda, *o reinício e o autoteste* (a 20), e não o resultado
- **nada de "gravado" como resultado**: *o que já foi enviado fica no módulo*

## O véu das folhas e dos diálogos

- **o véu cobre a tela inteira**: escurece também a tira de contexto, a faixa da sessão (módulo, placa e ENCERRAR) e o fundo da barra de status · a hora, a bateria, o Wi-Fi e a rede ficam por cima, legíveis · usa o `--veu` (`rgba(6, 5, 10, 0.32)`), sem mover nem redimensionar folhas e diálogos (a 05 a 13, a 16, a 17, a 20 e a 21)
- **na troca entre folha e diálogo, o fundo continua escuro**, sem clarão
- **atrás de cada folha e diálogo, a tela de onde ele saiu**, escurecida pelo véu a 32%, o padrão do Material 3: o menu sem sessão atrás da conta, da troca de empresa e do sair sem pendência (a 05, 07, 08, 17 e 21); o menu com a sessão atrás das outras (a 06, 09, 10 e 11), e com o checklist registrado atrás do sair da 20
- **no protótipo:** o menu fica desenhado atrás do véu
- **no protótipo · a medição:** as 21 referências contra o HTML (`node scripts/tela.mjs todos T04`) fecham em 0%, menos as diferenças conhecidas de antes — a 01 e a 02, 0,13% (o *2* da fila), a 04, 0,01% (o 10 do checklist), e a 16, 0,52% (a saída de 44 a 8) · na escala 1, o mesmo, e a 05 com 0,01% (o *RV* do cartão da conta, sub-pixel; o desenho dele não mudou) · os textos conferem em 18 das 21 (`node scripts/textos.mjs T04`): as três de sempre acusam a troca

## O Modo claro na folha da Conta

- **uma linha *Modo claro*, com interruptor**, entre o prazo do acesso e o *Sair da conta*, no mesmo estilo de bloco do *Sair* · desligado de fábrica: o app nasce escuro (lei R-16) · a linha inteira liga e desliga · o aparelho lembra da escolha, inclusive no login
- **o avatar *RV* preenchido**, com o fundo e a borda de cartão, nas 16 telas · no claro, ele fica branco sobre a faixa lilás
- **a barra do prazo do acesso com as laterais**, como a régua: as pontas marcam o 0 e o 7
- **no protótipo:** a linha é a peça `Interruptor` (`src/ds/entrada/Interruptor.jsx`), e a escolha mora em `src/estado/tema.js`, guardada no armazenamento do navegador (`mobs2-configurador.tema`) · ligar põe `data-tema="claro"` na raiz do app (`App.jsx`); desligar tira · como o app lê a escolha ao abrir, o login já nasce no tema escolhido · as referências desta pasta continuam no escuro: o claro nasce delas, pelos tokens (R-17)

## No palco · o *Sem módulo* na coluna

- **a coluna *Estados desta tela* do menu abre também o *Sem módulo*** (`01-momento-sem-modulo`): o menu antes de conectar, sem sessão de configuração, parado como os outros quadros da coluna · é um momento do fluxo, e entra na coluna pelo `coluna: true` do `indice.json`, em primeiro · pelo link (`?tela=T04&momento=01-momento-sem-modulo`) ele continua vivo, com o aviso do acesso na primeira chegada · no protótipo, a sessão do quadro da coluna é nenhuma (`sessaoDoEstado`)
