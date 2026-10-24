# O palco

A moldura de apresentação em volta do app. **Três peças e mais nada**, no fundo `--fundo-faixa` — a cor das superfícies do app. As referências estão em `palco/referencias/`.

## As peças

| Peça | Como é |
|---|---|
| **o quadrado** | 44 × 44, no canto de cima à esquerda, a 16px das bordas · abre o painel |
| **o celular** | no centro, **o app em tamanho real, 360 × 800** · a moldura é **a silhueta, sem marca**: **uma borda preta de 8px** em volta — 376 × 816 por fora · **canto de 36 por fora e 28 na tela, concêntricos** (28 + 8 = 36) · a borda **quase-preta `#050407`**, mais escura que a tela, com **um fio de luz de 1px por dentro** (`rgba(255,255,255,0.14)`) e um contorno escuro de 1px por fora — o acabamento de material, sem metal nem botão · **a sombra suave embaixo**, `0 12px 24px` a 45% — os 8% de fundo claro não aparecem no escuro · sem metal, sem câmera, sem botão · escala inteiro pra caber na janela, **nunca maior que o real** |
| **a coluna** | 230 de largura, 40 à direita do celular, **centralizada na altura dele** — a caixa tem a altura do celular e o conteúdo fica no meio · os estados da tela aberta, linhas de 32 |
| **o painel** | 280 de largura, desliza da esquerda por cima de tudo · fecha no X ou tocando fora · escolher uma tela não fecha o painel |

- **no protótipo** (decisão 43) · a silhueta: os valores moram em `app/src/palco/palco-tokens.css` (a borda, os dois raios concêntricos, o fio de luz, o contorno e a sombra), e a moldura escala junto com a tela, nunca maior que o real (D3)

## O painel · em duas partes

- **O caminho** — as telas na ordem do fluxo: T01 a T05, a T07 e a T06, T09 e T10, depois T14, T13 e T16 · o diagnóstico vem antes do vínculo, como o quadro 04 desenha
- **As consultas** — T15, T11 e T12, que o técnico abre a qualquer hora pelo menu · a T07, o Diagnóstico do módulo, fica só no caminho
- no pé, debaixo do traço: **a linha *Modo claro***, com o sol e o interruptor — troca **só o celular** de tema, nunca o palco nem a moldura · é o **mesmo estado** do interruptor da folha da Conta: ligou num, o outro mostra ligado · o palco é sempre escuro, então lá a bolinha ligada é lima (o `--texto-primario` do escuro) · a escolha fica lembrada no aparelho, como no app
  - no protótipo: a mesma peça `Interruptor` da folha da Conta, solta (sem o cartão), com o mesmo estado (`app/src/estado/tema.js`)
- e embaixo dela, **a data da última atualização do protótipo** — *Atualizado em* e a data da última versão do `CHANGELOG` (`app/src/palco/versao.js`), em 12px e `--tinta-apagada`
  - não há botão de recomeçar: tocar na T01 do painel zera o estado único e abre o login, porque a semente da T01 é vazia · a data mora só no pé do painel

A tela aberta aparece marcada. As folhas não entram no painel: são momentos da T04.

## A coluna

- lista **os estados e as consultas paradas** da tela aberta · os momentos do fluxo só entram quando o índice declara acesso pela coluna
- **quem entra na coluna é o campo `coluna` do `indice.json`**: os estados entram por padrão, e `coluna: false` os retira; uma tela ou um momento entra com `coluna: true`. As duas folhas de trocar de empresa da T04 (08 e 09) ficam fora. A coluna da T04 mostra o *Sem módulo* (o menu antes de conectar, sem sessão de configuração: um momento do fluxo que a coluna abre parado · pelo link, ele continua vivo) e 5 dos 7 estados
- **as consultas sem família ficam abaixo dos estados**, na ordem do índice: na T11, *Não bate com o cadastro* reutiliza a `00-tela`, e *Divergência · corrigir a conexão* é a folha da `07`; na T09, *Manutenção · escolher o bloco*, *Manutenção · reenviando* e *Manutenção · concluída* reutilizam os momentos `08`, `09` e `10`, e *Manutenção · pelo menu*, *Reenviar tudo, menos a conexão* e *Manutenção · a conexão e o servidor*, os `28`, `30` e `34`. Todos abrem o próprio app parado e sem toque, como os estados · a `00` continua sendo referência de tela e os três quadros continuam sendo momentos: o acesso pela coluna não muda os tipos nem as contagens do design
- **a T11 escolhida no painel abre a conferência normal**, no par do herói (M2C-0417 + RKT-8H42), que chega a *Tudo confere*. A divergência do M2C-0438 + ONK-8Q90 fica na consulta *Não bate com o cadastro*, sem criar caminho alternativo no palco
- **a mesma regra vale no painel e no endereço simples da T10**: o ônibus sem calibração é a entrada normal, e os quadros do caminhão (T10/00, 01, 05–09 e 12, o semeado que se corrige) ficam abaixo dos estados, parados. A T02 abre as três empresas do técnico, sem coluna: não tem estado nem consulta parada, e o mundo de uma empresa só não tem referência. A T11/03, a folha do exemplo divergente, também é consulta parada. A T13/29, *Alimentação · relendo*, entra recuada na família do item reprovado e não liga o relógio.
- **o índice nomeia os acessos**: `consulta: true` identifica os exemplos especiais; `colunaNoFim: true` coloca os avulsos depois dos estados. Links antigos desses momentos passam a abrir como estado parado, exceto com `print=1`, usado pelas réguas. O tipo normativo permanece tela ou momento.
- **os momentos difíceis de pegar ao vivo também ficam na coluna, parados**: os que só aparecem com um veículo específico ou passam em segundos — na T13, *Seção E resolvida*, *Caminhão · a foto do painel* e *Caminhão · a foto do painel tirada* (a 48, decisão 63: a foto do painel do caminhão no quadro, parada, ao lado da 20); na T16, *Reiniciando o módulo*, *Reconectando no reinício* e *Caminhão · o corte de alimentação* (a 09, o VL08 que não reinicia por comando); na T11, *Conferindo*; na T04, *Sair sem pendência* (a 17) · cada um com `coluna` e `colunaNoFim` no índice (sem `consulta`: o endereço do momento continua abrindo o momento vivo), e a tela os desenha como a fotografia, parados · os outros momentos de rota alternativa (a recuperação de senha, a busca sem resultado, o não conforme, o cartão que não confere, encerrar sem homologar) se alcançam com um toque no caminho e ficam fora

- **o detalhe que nasce de dentro de outro estado vem logo depois dele**, recuado: a T13/09, *item reprovado*, depois da T13/16, *Seção C com item reprovado* — quem olha vê a lista com o item vermelho, e embaixo o que acontece quando toca nele · no índice, o `depoisDe`
  - no protótipo: `estadosDa`, em `app/src/palco/telas.js`, põe depois de cada linha o que diz `depoisDe` dela, estado ou momento — a T13 fica *Finalizar com a Seção F falhando*, *Registrado sem localização*, *Seção C com item reprovado* e *Item reprovado*
- **o momento que nasce de dentro de um estado também entra**, logo depois dele, **recuado embaixo dele**: no índice, `coluna` verdadeiro e `depoisDe` com o estado de onde ele nasce · abre parado, como os estados · a T07/06, *atualizando o firmware*, depois da T07/04; a T01/23, a folha *Não recebi o código* no teto, depois da 17; a T04/18, *reconectando ao módulo*, depois da 03; a T09/29, *esperando o envio*, depois da 27, e as T09/32 e 33, a folha e o gravar só a conexão, depois da 31; a T16/11, *descartar a instalação*, depois da 06 · sem isso, eles só se alcançam tocando dentro de um estado, e o estado aberto pela coluna é parado · o estado que nasce de outro também vem recuado: a T07/14, *a atualização não terminou*, depois da 06; a T09/31 e a 35, depois da recusa (01) e da queda (02); a T13/10, o diálogo da ciência, depois da 49, a Seção F falhando que fica atrás dele
- **o recuo**: o que nasce de outro quadro fica **recuado embaixo dele**, com o poço alinhado ao nome do quadro de cima (34px pra dentro) · **sem linhas ligando** · o recuo é o que faz a família aparecer: o que encosta na margem é o estado, o que está pra dentro nasceu dele · a **cena 05** mostra a T13 inteira, e a cena 02 o firmware
- **a ordem dentro da família conta a história**: o detalhe, o *não resolvido*, o *relido* · no índice, cada um com `depoisDe` o anterior
- **na coluna, o nome é curto**: *Seção C · GPS*, *Seção C · alimentação* · a família de baixo diz o resto, e o nome cabe numa linha
- **as famílias do app**: a T07 (o firmware: o fora da lista, atualizando e o que não terminou), a T13 (as quatro falhas da Seção C, e a Seção F falhando com o diálogo da ciência), a T09 (a recusa e a recusa de novo, com a folha e o gravar só a conexão; a queda e o módulo que não voltou; as mensagens e o envio), a T01 (o teto e a folha dele), a T04 (o link perdido e o reconectando) e a T16 (a sessão interrompida e o descartar) · a T02 não tem estado nem família desde que a lista longa saiu (decisão 56) · as consultas da T09 e da T11 não têm família nem recuo
  - no protótipo: `estadosDa` (`app/src/palco/telas.js`) põe cada um depois do seu `depoisDe`, em cadeia, e a coluna recua um nível tudo o que tem `depoisDe` (`coluna-linha-recuo`, `--palco-recuo-coluna`: 24 + 10) · **a coluna longa**: com mais de 18 linhas, as que cabem com 32 na altura do celular, as linhas têm 30, como a cena 05 desenha a T13 (20 linhas) — com 32, a última passava do pé do celular · a T09, com 26 linhas (as consultas da manutenção e os desfechos da decisão 64), passa da altura do celular mesmo com 30: a coluna rola, com o fio fino do palco, e a linha aberta vem pra vista (`Coluna.jsx`, sem animar) · **o endereço** aceita no `estado` o momento da família (`rotas.js`): o link copiado de um deles reabre o mesmo quadro, parado · os nomes curtos são o `rotulo` do índice
- com mais de seis estados **na coluna**, eles se agrupam pelo que o técnico estava fazendo — na T07: o módulo e a CAN; as consultas acrescentadas à T09 e à T11 seguem sem grupo
- o marcador é **o mesmo do app**: poço de 24 com o quadrado vazado de 11, que vira lima de 11 no escolhido
- **o topo da coluna tem um lugar fixo, de 34px**: no fluxo, o texto *no fluxo · toque num estado pra ver*; num quadro parado, o **`Voltar ao fluxo`**, um botão secundário com o desenho do app (fill `--fundo-botao` e borda `--borda-botao`, nos valores do escuro, porque o palco é sempre escuro). Com a mesma altura, a lista nunca se mexe quando um quadro abre · o `Voltar ao fluxo` devolve a sessão, o quadro e o avanço de antes da primeira consulta, mesmo depois de trocar entre várias opções da coluna; se o quadro veio pelo endereço, monta a semente da tela. Nenhum toque no app parado altera o fluxo guardado
  - no protótipo: na T02, a escolha da empresa fica no quadro dela até o `Sincronizar`, que a grava no contexto; o `Voltar ao fluxo` de um estado aberto depois devolve o instante guardado, com a empresa do contexto marcada quando ele tem uma (`app/src/telas/T02/empresas.js` · `escolhidaAoAbrir`)
- tela sem estados nem consultas paradas: a coluna não aparece

## O celular, nos dois jeitos

| | |
|---|---|
| **no fluxo** | o app interativo · a moldura do celular |
| **num estado ou numa consulta parada** | **o próprio app, montado pelo caso do mock, parado e sem toque** · **a mesma moldura** — o que avisa que está parado é o `Voltar ao fluxo`, que pisca uma vez quando se toca no app |

- **no protótipo** · a piscada é só do toque: cada toque no app parado pisca uma vez o `Voltar ao fluxo` (no estreito, o quadrado), e nada mais pisca — abrir um estado, trocar de estado pela coluna, voltar ao fluxo e passar a janela de larga a estreita, ou de volta, não piscam: a peça que nasce, nasce quieta: o contador da piscada volta a 0 quando um estado abre ou fecha e quando a janela passa de larga a estreita, ou de volta (`app/src/palco/Palco.jsx`; o roteiro `app/scripts/caminhos/pisca.mjs` prova, 62 passos, `node scripts/caminho.mjs pisca`)

## As regras

- **nada reage a passar o mouse** — nem no palco. O quadrado e os itens do painel respondem no clique, com o pressionado
- dentro do celular, a seta normal do cursor; a mãozinha só nas peças do palco
- **janela estreita** — abaixo de 900px de largura, como no celular de quem recebe o link: o app em tela cheia, sem moldura e sem coluna, e o quadrado flutuando no canto. O painel continua abrindo por ele, e leva o `Voltar ao fluxo` no topo e a etiqueta no pé · num estado, tocar no app pisca o quadrado
- **no celular de verdade** (a janela estreita num aparelho de toque): o palco sai do caminho — **sem o quadrado** por cima do app, e o endereço não acompanha a navegação, então recarregar volta ao que foi aberto (o login, no link principal) e o link direto de uma tela ou estado continua abrindo certo. O painel ainda abre pelo `&painel=1`. No computador, com a janela estreita ou larga, o quadrado fica: o celular é pra ver, o teste é no computador · **a barra do Android desenhada também sai no celular de verdade**, com o app na tela inteira: o aparelho já mostra a barra dele, e duas barras denunciariam o site. A altura dela vira zero, e o véu, as folhas e o topo do login acompanham. No computador, no print e no celular deitado (que desenha o celular), ela fica
- **janela estreita deitada** — mais larga que alta, o celular de lado: o app não gira (a regra 11 do `CLAUDE.md`). O celular volta a ser o do palco — 360 × 800, com a moldura, no centro e em escala pra caber, nunca maior que o real —, sem a coluna, e o resto do estreito fica: o quadrado, o painel com o `Voltar ao fluxo` e a etiqueta. De pé de novo, a tela cheia volta. O teclado aberto num campo do app só encolhe a altura, e não conta como deitar, nem reescala o celular: ele fica na escala que tinha, e o app encolhe até o que sobra acima do teclado — vale também pro palco largo de um tablet (`app/src/palco/retrato.js`, `logica.md` · O retrato e O teclado)
- uma **etiqueta discreta com a data e o ciclo** no canto de baixo, pra quem comenta dizer qual versão viu
- o palco nunca mostra comparação com a referência — isso é trabalho do ciclo

## O link publicado

O link publicado abre direto no palco, sem senha: uma senha no código que o navegador baixa não protegeria de verdade. O site continua pedindo pra não entrar em buscador (`noindex`, no `index.html`). Quem tiver o link, abre.

- **recarregar a página recomeça do login, no computador também**: o endereço continua acompanhando a navegação — é ele que se copia pra mandar uma tela —, mas a página recarregada abre a T01, como tocar na T01 do painel, e o painel fechado. Um link aberto de novo ainda abre a tela, o estado ou o painel dele. O print, a vitrine e as réguas abrem cada endereço de novo e nunca recarregam, então não mudam (`app/src/palco/rotas.js` · `recarregou`; o roteiro `app/scripts/caminhos/recarregar.mjs` prova)
  - no protótipo: os quadros da escolha da empresa têm endereço: a `00` (`?tela=T02`, as três empresas, nada escolhido) e o `01` (`&momento=01-momento-escolhida`, a Viação marcada); a folha Trocar de empresa do menu tem o da `T04/07`, e o `08` e o `09` abrem pelo estado, parados
