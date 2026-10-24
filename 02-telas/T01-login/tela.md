# T01 · Login

Entrar no app com usuário e senha, e recuperar o acesso sem ligar pra ninguém.

| | |
|---|---|
| **Elemento-assinatura** | a marca Mobs2 presa a 207px do topo — o formulário cresce embaixo dela sem movê-la |
| **Chrome** | sem faixa · barra do sistema na cor da página |
| **Semente no protótipo** | nenhuma sessão · usuário r.vieira preenchido |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 15 · 8 — ver `estados.md` |

## O que se toca

- depois dos 3 envios da hora, a linha do reenvio diz *Os 3 envios desta hora acabaram · libera às 15:12* · o código já enviado segue valendo
  - no protótipo: o 3 é o teto da hora (`limites.tetoPorHora`) e o 15:12, a hora em que libera do caso `teto-de-envios` — o relógio do produto está congelado em 14:30, e o fluxo não tem outra hora de onde ler: a do caso vale também no fluxo. No fluxo, o teto chega pelo reenvio da 12 ou da 13 — o terceiro envio da hora: quando os 60 s do *este foi o último envio desta hora* zeram, a linha passa a dizer o teto. E pedir o código de novo no teto — `Voltar ao login` → `Esqueci a senha` → `Enviar o código` — não envia nada: volta o código que já foi, que segue valendo, com os dígitos do mock, como a 17 desenha, o prazo de onde estava, pro dado a que ele foi, com a resposta de sempre (`regras.js` · `depoisDoEnviar`). No canal, sem envio na hora, o lado do *resta N envio* fica vazio. O mesmo teto na linha vale no código expirado e nas tentativas esgotadas, onde o `Enviar outro código` fica apagado (nenhuma referência desenha os dois no teto). A folha, no teto, é a 23 (embaixo). A 17 abre pela coluna com os envios do caso, parada: o prazo em 10:00 (o relógio), contra o 9:41 da referência, a foto de um instante — 0,51% contra o HTML, só o número, como a 03
- **a folha *Não recebi o código* no teto** (a 23) diz por que as duas saídas esperam: *Os 3 envios desta hora acabaram: as duas saídas liberam às 15:12. O código já enviado segue valendo.* · as duas linhas ficam em espera, apagadas e desabilitadas, com a hora em que liberam (*15:12*) no lugar da contagem dos 60 s · a frase entra embaixo do título, como o *Trocar recarrega…* da folha de trocar de empresa (T04/07), e a folha cresce pra cima · fora do teto, a folha fica como a 04 e a 11
  - no protótipo: a folha aberta no teto é a 23, com endereço — o `Não recebi o código` da 17, e também o do código logo depois do terceiro envio da hora (a 12 e a 13, *este foi o último envio desta hora*): sem envio na hora, a contagem dos 60 s zeraria sem liberar nada, e a folha já diz a hora em que as saídas liberam (padrão do protótipo; nenhuma referência desenha a folha durante os 60 s do último envio) —, e a URL a diz enquanto ela está aberta · a frase é a `subtitulo` da peça folha, a mesma da T04/07, e as duas linhas de opção ficam em espera com a hora do caso no lugar da contagem (`liberaAs`, 15:12) · pela coluna, logo depois da 17, parada · a medição: 0,51% contra o HTML, a mesma da 17 — o prazo atrás do véu em 10:00 (o relógio), contra o 9:41 da referência —, e a folha a 0 pixel; os textos conferem
- a folha *Não recebi o código* é a mesma nos dois canais — *Reenviar o código*, pro mesmo dado, e *Usar outro dado*, que volta pra primeira etapa —, e nenhum contato aparece nela
- entrar com outro usuário abre o diálogo *Outra sessão neste aparelho* sobre as empresas (a T02): a sessão do anterior foi encerrada, e a fila dele continua subindo
  - no protótipo: a sessão anterior é a do último `Entrar` que entrou neste aparelho desde o começo do palco (`situacao.jaEntrou` e o técnico do estado único) — o palco começa sem nenhuma, e o primeiro `Entrar` nunca abre o diálogo. O login deixa entrar com o m.souza pela regra de sempre — qualquer senha com 8 ou mais (`minimoEntrar`) —, sem credencial nova: o roteiro digita a mesma senha dos outros roteiros. Saindo da conta com o r.vieira e entrando com o m.souza, a T02 abre com o diálogo: *A sessão de r.vieira foi encerrada. A fila dele continua subindo: 2 itens.* — os itens da fila do aparelho que ainda não chegaram (`estado/fila.js` · `naoChegouDoAparelho`), o mesmo número do cartão da Fila de saída do menu e do diálogo de sair (T04/06), que é o do caso (2, decisão 64). O `Entendi` fecha, e o voltar do sistema também, como no aviso do acesso. Quem entrou passa a ser o técnico: o m.souza é *Marcos Souza*, o nome do caso, na folha Conta do menu; o mesmo usuário de novo não abre o diálogo; e o r.vieira, de volta, vê o diálogo com o m.souza. O mock só conhece os dois: outro identificador entra com o nome do herói (a alternativa é o login recusar o usuário que o mock não conhece, com a mesma mensagem da 01). No singular, *1 item*. O diálogo mora na T02 (`02-telas/T02-selecionar-contexto/tela.md`); a 18 abre pela coluna, com a T02 montada pelo caso `outro-usuario`, parada e sem toque — 0% contra o HTML. Provado no node (`testar-login.mjs`) e no roteiro `outro-usuario.mjs`
  - no protótipo · a régua dos textos na 18: o `textos.md` da 18 lista só o diálogo, o que está por cima — a régua não lê a T02 atrás do véu, que fica inerte —, e confere; o quadro inteiro, com o fundo, está a 0% do HTML
- os tempos das referências da recuperação — 9:41, 0:44, 9:28 — são fotos de um instante: o protótipo segue o relógio
  - no protótipo: o 03, o 04, o 05 e a 17 abrem com o prazo e o reenvio cheios (10:00, 60 s), e a diferença contra o HTML é só o número (a 03 em 0,52%, com o teclado do aparelho a 0 pixel, a 04 em 0,56%, a 05 em 0,35% e a 17 em 0,51%; a régua dos textos acusa o número nas quatro) · a 11, com o reenvio liberado, diz *vale por 9:00*, o prazo um minuto depois, contra o 9:41 (0,22%) — vale o relógio
  - no protótipo · o resto da medição (`node scripts/tela.mjs todos T01`, contra o HTML): 0% em nove das 24 · de 0,01% a 0,02% na 02, 08, 09, 10, 20, 21 e 22, a suavização do texto · 0,1% na 19, o `Esqueci a senha` apagado no *Entrando…* (abaixo) · 0,51% na 23, a mesma da 17 · 0,27% na 07: as células do código e a caixa das tentativas ficam meio pixel deslocadas da referência, no arredondamento do subpixel, sem diferença de desenho
- o `Entrar` diz o que falta enquanto o técnico apaga e digita: *Digite o usuário* → *Digite a senha* → `Entrar` · o foco vai pro primeiro campo vazio
- o usuário lembrado tem o xis dentro do campo · tocar nele limpa o campo e esquece o usuário lembrado; a caixa fica como o técnico deixou
- sem internet, o `Entrar` mostra o aviso *SEM CONEXÃO · O login precisa de internet.* · os campos ficam preenchidos, porque a senha não estava errada
  - no protótipo: o `Entrar` fica aceso e tenta de novo: sem internet, o mesmo aviso; com a conexão de volta, a regra da senha — entra, ou o erro da 01 no lugar do aviso
- no erro, o `Entrar` fica apagado, dizendo *Digite a senha*, até a senha ter um caractere
- `Entrar` → T02 se a senha tiver 8 caracteres ou mais; com menos, o erro de usuário ou senha
  - no protótipo (a espera do Entrar): com internet, o `Entrar` espera a resposta do servidor antes de levar à T02 ou ao erro da 01 — no protótipo, 1,2 s fixos (`ritmos.js` · `entrarEsperaMs`), sem relógio. Enquanto espera, o primário diz *Entrando…*, desabilitado de verdade e em tinta apagada, como o *Gravando no módulo…* da T10 (a lei 17), e a URL diz a 19; o `Esqueci a senha` também, desabilitado e em tinta apagada (a lei 17; diferença conhecida da referência: a 19 o desenha aceso); os campos, a caixa e o olho ficam onde estão, sem responder, e nada muda de lugar. A senha errada (a 01) chega depois da espera, e a URL volta à entrada. Sem internet, o aparelho já sabe: o aviso da 14 vem na hora, sem espera. O roteiro `mov-t01` confere o texto que troca no lugar, o botão e o link desligados, o lugar de tudo e a chegada entre 0,8 e 1,7 s
- `Esqueci a senha` → recuperar: escolher o canal
- canal escolhido → digitar o código (482913 no mock) → nova senha → senha alterada → login
  - **no protótipo:** tocar em `Entrar com a senha nova` devolve o login com o usuário mantido e a senha de exemplo de `M.credenciais.senha` preenchida e escondida, para continuar a demonstração. Não salva nem usa a senha digitada na recuperação; o produto precisa autenticar com a senha alterada real. Isso não muda o login depois de sair da conta, que continua sem senha.
- **o código com o teclado do aparelho aberto** (a 03): o teclado numérico do Android, o do Material 3, ocupa o pé da tela, e o app encolhe até o que sobra acima dele: o rodapé sobe junto e fica só com o `Confirmar`; o `Voltar ao login` volta quando o teclado fecha · o teclado é cenário do sistema, como a barra de status e a pílula (lei 22): o app de verdade não o desenha · as teclas digitam no código, o apagar tira o último dígito, e o ✓ faz o `Confirmar` com os seis dígitos, ou só fecha o teclado com o código incompleto · os outros quadros do código (04 a 07, 12 e 13) são desenhados com o teclado fechado
  - no protótipo (a peça): o teclado é uma peça de cenário, `06-prototipo/app/src/ds/chrome/TecladoDoAparelho.jsx`, ao lado da barra do sistema e da pílula — o desenho oficial de `05-recursos/sistema/` (o `teclado-numerico.svg` e, no *Modo claro*, o `teclado-numerico-claro.svg`), importado como texto, nada redesenhado, na largura da tela. A altura vem do viewBox do desenho, sem token: 412 × 274 na largura de 360 dá os 239,42, e a conta mora no SVG, num lugar só. Fica no pé, no fluxo, por baixo da pílula, que continua por cima de tudo. Aberto, o app encolhe até o que sobra acima dele, e o rodapé fica só com o `Confirmar`, a 13 do teclado e a 13 do topo (o `Rodape` com o pé do teclado, `--rodape-pe-teclado`): o `Voltar ao login` sai. As áreas de toque são os retângulos das teclas do próprio desenho, lidos do SVG; cada tecla tem nome pro leitor de tela — os números, *Menos*, *Espaço*, *Apagar*, *Vírgula*, *Ponto* e *Concluído* (o nome que o Android dá ao ✓) —, nenhuma tem pressionado, e o toque nelas não tira o foco do código. O espaço, o menos, a vírgula e o ponto não fazem nada. A 03 está a 0,52% do HTML: o teclado e o rodapé a 0 pixel, e o resto é o relógio (a nota dos tempos, acima); no claro, o teclado bate com a amostra `T01-03` nas cores do Android
  - no protótipo (onde ele aparece): só onde não existe teclado de verdade — no computador (o ponteiro fino, `(pointer: fine)`) e no print. No celular (o ponteiro grosso), nunca: lá abre o teclado do próprio aparelho, e `06-prototipo/app/src/estado/teclado.js` encolhe o app até o que sobra acima dele. Chegando na 03 — o `Enviar o código`, o `Tentar de novo`, a folha *Não recebi o código* que fecha, o endereço —, o código ganha o foco e o teclado abre: é o sistema respondendo ao foco, não a tela animando a entrada; pelo endereço, pela coluna e no print, ele nasce aberto, parado, como a referência. Fecha no ✓ com o código incompleto, no voltar do sistema (no computador, o Esc: com o teclado aberto, o voltar só fecha o teclado; fechado, faz o `Voltar ao login` de sempre) e saindo da 03 — a folha, o código errado, o vencido, a senha nova. Tocar de novo no código abre de novo. Provado no roteiro `teclado.mjs` (no computador e no celular de verdade, pelo ponteiro grosso da régua) e no `mov-t01`
  - no protótipo (decisão do protótipo, sem desenho): o código reenviado (a 12 e a 13) é a mesma tela do código, mas a decisão 62 põe o teclado só na 03 — ali, no computador, tocar no código não desenha o teclado, e o técnico digita no teclado do computador, como antes; no celular, abre o do aparelho em todo quadro do código
- `Não recebi o código` → a folha com as duas saídas: *Reenviar o código* e *Usar outro dado*, que esperam os 60 s do reenvio, com a contagem no lugar da seta e a linha desabilitada até zerar
- *Reenviar o código* → volta pro código, pro mesmo dado, com o prazo de novo em 10:00 · *Usar outro dado* → volta pra primeira etapa
- o contato **nunca** aparece em tela, nem mascarado · depois do envio, a tela diz sempre *Se houver conta com este dado, o código foi enviado.*
- o olho do campo de senha mostra e esconde: escondida, o olho e o nome *Mostrar a senha*; visível, o olho riscado e o nome *Ocultar a senha*
- no erro, a senha é apagada e o cursor vai pra ela — o usuário fica, pra ele só redigitar a senha
- `Lembrar meu usuário` marca e desmarca · desmarcado por padrão
- no protótipo: o voltar do sistema (no computador, o Esc) faz o `Voltar ao login` em cada passo do recuperar — o canal, o código, a senha nova —, e na folha *Não recebi o código* a fecha, como o X. Na entrada, que não tem saída desenhada — também sem conexão, na 14, e na de quem abre o app, na 15 e na 16 —, e no diálogo *Senha alterada*, sem X nem Cancelar, ele não faz nada (`06-prototipo/logica.md` · O voltar do Android; a pergunta é do produto)
  - no protótipo (lei 20): a folha *Não recebi o código* também fecha tocando no véu, fora dela, e arrastando pra baixo — o painel acompanha o dedo e, soltando depois de 56, fecha; antes, volta. O arraste que começa numa das duas linhas não reenvia (`06-prototipo/logica.md` · A folha que fecha)

**Como o protótipo constrói** (decisões 31 e 32):

- o `Entrar` fica apagado e desabilitado de verdade **sem o usuário ou sem a senha**, no erro e fora dele (a lei 17, *desabilitado é tinta apagada*), e diz o primeiro que falta, na ordem da tela: sem o usuário, *Digite o usuário*, com a senha ou sem ela; com o usuário e sem a senha, *Digite a senha*. Digitado o que faltava, ele volta aceso, e o aviso de erro fica onde está · só espaço no usuário conta como vazio (`regras.js` · `oQueFalta`)
- **o usuário lembrado** (HU-T01-3): o celular guarda só o identificador, no estado único (`situacao.usuarioLembrado`), e o palco começa sem nenhum, na 00, com os dois campos preenchidos. O `Entrar` que entra com a caixa marcada guarda o usuário; desmarcada, nada — e, dali em diante (`situacao.jaEntrou`), o login só traz o que o celular lembra: a 00 é só o começo do palco. Saindo da conta, o login volta com ele: o xis, a caixa marcada, a senha vazia com o foco desenhado nela e *Digite a senha* — o quadro da 16; sem ninguém lembrado, o da 15: os dois campos vazios, a caixa desmarcada, o foco desenhado no usuário e *Digite o usuário* (`regras.js` · `entradaDoFluxo`). A senha não é lembrada ao sair da conta; o preenchimento depois de recuperar é apenas a conveniência de demonstração descrita acima. O xis limpa o campo, esquece o usuário e leva o cursor pro usuário; a caixa fica. As 15 e 16 abrem pela coluna, montadas pelos casos `primeiro-acesso` e `usuario-lembrado`, paradas e sem toque; o toque se prova no node (`testar-login-e-bluetooth.mjs`) e no roteiro `lembrar.mjs`. Ao abrir, o foco é só desenhado, como na 00: o cursor de verdade vai no toque (o xis, o erro)
- **o campo lembrado é a variante do campo** (`lembrado`, em `06-prototipo/app/src/ds/entrada/Campo.jsx`): o xis de 18, em `--tinta-secundaria`, com o traço 2 (`--traco-limpar`), no poço sem o recheio da direita — como a 16 e a folha 6 desenham. Medido nas duas: o xis fica com o centro a 323 da borda da tela e o olho da senha, a 309 (14 à direita), e o xis tem 18, o traço 2 e a `--tinta-secundaria`, onde o olho tem 20, 1,8 e a `--marca-limite`; o botão de 44 do xis sai 5 pra fora do poço, sem vizinho a menos de 8 — diferença conhecida da referência: a legenda da folha diz *no mesmo lugar, tamanho e distância do olho*, e o protótipo segue o desenho. E o texto do usuário muda de lugar entre as duas variantes: com o xis, começa a 38 da borda da tela (o recheio de 2 do input, como no campo da senha), e sem ele, a 36 — a 16 desenha um e a 00 e a 15, o outro; o protótipo segue as três
- o terceiro código errado mata o código e libera o reenvio na hora, sem esperar os 60 s — a 07 diz *Reenvio liberado*
- a espera é uma só pras duas saídas da folha: qualquer envio novo espera os 60 s (pergunta do produto). Quando ela zera com a folha aberta, a seta entra e as linhas acendem: é a 11
- o reenvio volta pro código com as células vazias e o cursor na primeira: pelo *Reenviar o código*, a 12; com o e-mail como canal, a 13 — as duas com a resposta de sempre. *Enviar outro código*, no vencido e nas tentativas esgotadas, é o mesmo reenvio, pro mesmo dado. Depois do *Usar outro dado*, o `Enviar o código` da primeira etapa é um reenvio: gasta um envio da hora, e chega com as células vazias
- no resto do recuperar, a espera se chama *Reenviar em 44 s*; depois do último envio da hora, *este foi o último envio desta hora*
- **a primeira etapa**: o que vem digitado ao abrir é o das referências, do mock (`recuperacao.digitado`) — o telefone incompleto da 02, com *Faltam 2 números.*; o completo da 20; o e-mail da 21. A máscara é a do país escolhido (`M.ddis`, com a sigla), e muda com ele: os dígitos entram nos `#`, e o que vem depois do último dígito digitado não aparece; trocando de país, o número que não cabe na máscara nova perde o que sobra. Fora do formato, o traço de baixo do campo fica vermelho, o motivo colado embaixo, e o `Enviar o código` desligado de verdade (a lei 17); no formato, o traço lima do foco desenhado. O e-mail confere a arroba e o domínio com ponto — fora do formato, o botão desligado, sem motivo escrito: o `textos.md` não tem texto pro e-mail. O singular do motivo, *Falta 1 número.*, não tem referência. O seletor de país é a folha da 22: a busca filtra pelo nome, pelo código ou pela sigla; o escolhido vem primeiro, e os outros em ordem de nome, como a 22 desenha. Tocar num país fecha a folha. O momento segue o que está na tela: a 02 fora do formato, a 20 no formato, a 21 no e-mail, a 22 com o seletor (`regras.js` · `momentoDoCanal`)
- `Confirmar` fica desabilitado enquanto o código não tem os seis dígitos — também na 12 e na 13
  - no protótipo: a 12 e a 13 o desenham apagado, com as células vazias, dizendo *Digite o código* — o primário diz o que falta, como o `Entrar`. Com o código incompleto, *Digite o código*, apagado e desabilitado de verdade (a lei 17); com os seis dígitos, `Confirmar`. A 12 e a 13 estão a 0% contra o HTML
- **o login sem conexão**: a rede é a do aparelho, a `situacao.rede` do estado único, que o mock abre conectada — no fluxo, o `Entrar` segue a regra da senha. A 14 abre pela coluna, montada pelo caso `sem-conexao-no-login` (`rede: false`), parada e sem toque: o toque do `Entrar` ali — o aviso, os campos que ficam, o tentar de novo e a entrada com a rede de volta — é `depoisDoEntrar`, em `06-prototipo/app/src/telas/T01/regras.js`, provado no node por `app/scripts/testar-login-e-bluetooth.mjs`. Nenhum gatilho do mock tira a rede no fluxo (pendência). O aviso é o neutro com o traço cinza embaixo, no lugar do erro da 01

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema sem sessão
- uma ação
- folha
- diálogo
- diálogo sem saída
- diálogo com ciência
- folha com opções
- barra do sistema sob o véu
- escolha numa lista
- falha
- linha do histórico
- linha de empresa
- linha de empresa · a atual
- a lista de empresas
- segmentado
- a marca no login
- campo
- campo focado
- senha visível
- usuário lembrado
- requisitos da senha
- código · seis células
- código errado
- link dentro do conteúdo
- checkbox
- checkbox marcado
- justificativa
- linha de opção
- lista com contagem
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- linha tocável · normal e pressionada
- barra do sistema sem sessão
- duas ações
- folha
- diálogo sem saída
- folha com opções
- barra do sistema sob o véu
- o teclado do aparelho (cenário do sistema, só na 03)
- os glifos de estado
- os poços
- os marcadores
- falha
- aviso
- segmentado
- a marca no login
- campo
- campo focado
- senha visível
- usuário lembrado
- requisitos da senha
- código · seis células
- código errado
- link dentro do conteúdo
- botões só de ícone
- checkbox
- checkbox marcado
- linha de opção

Pelo medido, ficam fora as 14 peças da lista de cima que nenhuma referência desenha (diálogo, diálogo com ciência, as duas seções do checklist, linha do histórico, as três da empresa, as cinco da cadeia e do encerramento, e a lista com contagem), e estão as que a tela usa: as de toque da folha 1, a barra sem sessão, as duas ações, os glifos e os poços, a falha do 01, o segmentado, os botões só de ícone e o checkbox marcado. O primário desabilitado a `01` e a `16` desenham dizendo *Digite a senha*, e a `15`, *Digite o usuário*; no resto, aparece no toque, com o código incompleto, sem envio na hora ou com a senha nova fora dos requisitos. O que só a T01 desenha é variante nomeada: o rodapé do login (e, com o teclado do aparelho aberto, o pé do teclado: só o primário, a 13 dele), o segmentado com folga 8, o foco do código fora do próximo dígito e a linha de opção em espera (a 04: apagada, desabilitada, com a contagem no lugar da seta; a 11: acesa). Com o marcador único (decisão 29), o marcador da folha 3 é o quadrado do checkbox do *Lembrar meu usuário*. O aviso do login sem conexão (a 14) é o neutro, com o traço cinza embaixo — variante nomeada do `Aviso`, `traco`. O usuário lembrado do login de quem abre o app (a 15 e a 16) é a variante `lembrado` do campo, com o xis de limpar; e a marca tem a assinatura: o nome com a largura da logo (196) e os fios crescendo até as bordas dela, de 82 a 278, nas seis telas do login. O cartão do código, a linha do código conferido e o campo da senha nova não têm linha no `componentes.md`: são peças desta tela, em `06-prototipo/app/src/telas/T01/`.

Na recuperação não existe cartão do canal — ele mostraria o contato mascarado. São peças desta tela, em `06-prototipo/app/src/telas/T01/pecas.jsx`: a aba do canal (*TELEFONE*, *E-MAIL*, a caixa de poço de 52 com o traço lima na escolhida), o seletor de país (a sigla, o código e a seta, na caixa de poço de 56), o campo do dado (o poço de 56, o texto em 700 — o telefone em 17 e o e-mail em 16, como a 21 desenha —, com os números tabulares da página, e o traço vermelho fora do formato) e a linha do país, na folha (48, o nome, o código e o check lima do escolhido). A folha da 22 é a `Folha` com a `Busca` e o cartão de opções; a seta do *Usar outro dado* (a 04 e a 11) é o `voltar-etapa` do `Icone`, o desenho da referência. Nenhum token novo: as medidas caem nos que existem, pelo valor (o 52 do `--botao-secundario`, o 56 do `--alvo-primario`, o 48 do `--alvo-min`, o 17 do `--t-botao`) — os papéis não têm token com nome próprio.

## Histórias de usuário

- **HU-T01-1** — Entro com usuário e senha; erro não distingue usuário inexistente de senha errada
- **HU-T01-2** — Com sessão válida e sem rede, o app abre direto na home
- **HU-T01-3** — Lembrar meu usuário desmarcado por padrão, guarda só o identificador, limpável no campo
- **HU-T01-4** — Outro usuário descarta a sessão anterior; a fila do anterior é preservada e continua subindo
- **HU-T01-5** — Recupero senha escolhendo canal (e-mail/telefone), com validação local antes de gastar rede
- **HU-T01-6** — Máscara de telefone derivada do DDI, não fixa; trocar DDI reaplica e avisa
- **HU-T01-7** — Digito código de 6 dígitos · 10 min · 3 tentativas · reenvio após 60 s · teto 3/hora
- **HU-T01-8** — Não recebi o código com duas saídas: reenviar o código ou usar outro dado; ambas respeitam a espera de 60 s, sem acionar o gestor · decisão 32
- **HU-T01-9** — Eu crio a senha nova; os 6 requisitos ficam visíveis desde o início e marcam sozinhos
- **HU-T01-10** — Modal diz "senha alterada", sem botão fechar; a troca encerra sessões em outros aparelhos
- **HU-T01-11** — A sessão de acesso não expira por inatividade; só por Sair ou pelos 7 dias, com aviso no 5º
- **HU-T01-12** — Sair tem tela própria: mostra sessão de configuração aberta, itens na fila e o que sobrevive

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## A recuperação de senha

- **nenhum contato mascarado, em tela nenhuma**: entregar parte do contato antes de qualquer digitação confirma que a conta existe
- **a primeira etapa** (a 02): o técnico escolhe *Telefone* ou *E-mail* e digita o dado · o telefone tem o seletor de país, com busca, o Brasil (+55) já escolhido, e a máscara muda com o país (a 22) · enquanto o formato estiver errado, o botão fica desligado e o motivo aparece colado no campo: *Faltam 2 números.* · o texto fixo: *O dado precisa ser o mesmo do cadastro.* · o telefone certo (a 20) e o e-mail (a 21)
- **a resposta ao envio é sempre a mesma**: *Se houver conta com este dado, o código foi enviado.*
- **a mesma mensagem pro código errado e pro vencido**: *Código inválido ou vencido* (a 05, a 06 e a 07) · o texto é leitura nossa
- **o *Não recebi o código***: *Reenviar o código* (pro mesmo dado) e *Usar outro dado* (volta pra primeira etapa) · leitura nossa
- **a nova senha** (a 08) mostra os seis requisitos desde o início, e eles marcam sozinhos

## O véu do diálogo de outra sessão

- o diálogo *Outra sessão neste aparelho* (a 18) escurece também o fundo da barra de status, com a hora e os ícones por cima, como as folhas da T01
- **atrás de cada folha e diálogo, a tela de onde ele saiu**, escurecida pelo véu a 32%: o código atrás do *Não recebi* (a 04 e 11), a nova senha atrás do *Senha alterada* (a 09), a primeira etapa atrás do seletor de país (a 22)
- **no protótipo:** a T01 desenha a tela de origem atrás; o `--veu` é 32% · a 18 mora na T02, e a barra dela escurece pelo `veu` da `BarraDoSistema` · a barra continua por cima do véu, com a hora branca
