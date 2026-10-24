# T05 · Conectar módulo

Achar o módulo e conectar. O que ele informa vem logo depois, no diagnóstico.

| | |
|---|---|
| **Elemento-assinatura** | a lista dos módulos por perto — conectar é o único passo aqui |
| **Chrome** | sem faixa — a sessão nasce na conexão; a faixa aparece na T07 depois da leitura sem trava |
| **Semente no protótipo** | cinco módulos por perto · M2C-0417 é o do herói |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 5 · 7 — ver `estados.md` |

- no protótipo · o chrome: a sessão nasce na conexão, aqui, mas a faixa não desce nesta tela — desce na T07, quando as nove linhas foram lidas sem trava (veja *conectado → T07*, embaixo). Nenhuma das sete referências da T05 tem a faixa

- no protótipo · a semente: cinco módulos por perto (`situacao.porPerto` do mock: o do herói e outros quatro, todos achados pelo Bluetooth) · M2C-0417, o do herói, vem escolhido

## O que se toca

- `Procurar de novo` → a busca corre de novo, o *Procurando…* (a 05), e a lista volta
  - no protótipo: a busca de novo é o *Procurando…* (05) — a lista some, o poço com o quadrado branco de agora, a tentativa embaixo e o primário desligado —, com a URL dizendo a 05, e a lista volta sem nada escolhido (01) depois de 1,2 s (`app/src/estado/ritmos.js` · `buscaMs`). É a busca de novo em todo lugar da T05 que a chama: o `Procurar de novo` e o Bluetooth que liga. A tentativa conta as buscas desde que a tela abriu — a da abertura é a primeira, e a busca de novo, a *segunda tentativa*; da terceira em diante, a legenda fica sem texto, porque o `textos.md` só escreve as duas. O voltar, no *Procurando…*, é o `Voltar ao menu` do rodapé. O `Procurar outro módulo` nasce fora daqui: na T07, ele leva à T05/01, a lista sem nada escolhido; na T09, com a sessão aberta, abre o diálogo *Encerrar antes de terminar?*, e o `Encerrar mesmo assim` roda os 4 passos da sessão abortada e segue pra T05/01 (`encerrar.jsx` · o `destino`)
- `Ligar o Bluetooth` → o Android pergunta · ligado, a busca começa sozinha
- `Permitir` → o Android pergunta de novo · se o técnico marcou *não perguntar de novo*, o botão vira `Abrir as configurações`
- no protótipo, a resposta do Android vem do caso: o `bluetooth-desligado` não traz recusa, e o `Ligar o Bluetooth` leva à busca de novo — o quadro da 00 e a lista sem nada escolhido (01), como o `Procurar de novo`. No `bluetooth-sem-permissao`, a resposta é *negada*: negada de novo, o Android não deixa o app perguntar mais, e o primário vira `Abrir as configurações`, no mesmo bloco (a letra é a da regra 12 do `06-prototipo/CLAUDE.md`; nenhuma referência da T05 desenha o botão virado). `Abrir as configurações` leva às configurações do Android, que o protótipo não desenha: o técnico volta com a permissão dada, e a busca começa (01) · nunca um botão que não faz nada (a lei de construir, 12)
- a 16 e a 17 abrem pela coluna, paradas e sem toque: nenhum gatilho do mock desliga o Bluetooth ou nega a permissão no fluxo (pendência). O toque do primário de cada uma é o de `06-prototipo/app/src/telas/T05/celular.js`, provado no node por `app/scripts/testar-login-e-bluetooth.mjs` · o bloco é o do nenhum encontrado (03), com o poço de 44 e o Bluetooth riscado — o ícone inteiro, com o risco por cima e o fio escuro (lei 21) — no lugar da marca tracejada, e sem a legenda embaixo: ele desce até o rodapé
- a busca corre sozinha → a lista de módulos por perto
  - no protótipo: ao abrir, a busca acha na hora; a busca de novo mostra o quadro da 00 por 1,2 s (acima)
- tocar num módulo → **a linha marca**, com o lima, e o `Conectar ao M2C-0417` acende · quem avança é o botão, não o toque na linha · com um módulo só, ele já vem marcado (a 02)
  - no protótipo: tocar num módulo da lista **só o marca** (o quadrado lima surge no poço) e acende `Conectar ao M2C-0417`, com o serial do marcado; tocar em outro troca a marca · é o primário que conecta (R-14) · na 01, todos se tocam — o M2C-0999, fora do cadastro, também, com o que ele mesmo informa (`naBuscaForaCadastro` no mock: *VL06 · CAN-BT*, com o firmware 8.04, que a linha não mostra) · na 00 e na 04 também · na 00, o ESCOLHIDO é a marca: tocar num dos outros por perto troca o escolhido no lugar, e o primário passa a dizer o serial dele — também não conecta · a R-14 vence a R-11
  - no protótipo: pelo menu, a tela abre na lista sem nada escolhido (01), com o primário apagado · `Procurar de novo` → a busca de novo: o quadro da 00, e a lista sem nada escolhido (01) · a 00, com o do herói escolhido, abre pelo endereço, como o quadro da referência
- conectado → T07, o diagnóstico do módulo
  - no protótipo: o `Conectar ao …` passa pelo *Conectando ao …* (06) — o primário desligado, o `Procurar de novo` apagado, a lista inerte — por 1,2 s (`ritmos.js` · `buscaMs`, o mesmo número da busca e do Entrar), com a URL dizendo a 06; aí a T07, ou o *não respondeu* da 04. O `Tentar de novo` da 04 passa pelo mesmo momento, sobre o quadro dela. Pela URL, a 06 abre parada · o `Procurar de novo` apagado fica em `--tinta-apagada` (a lei 17), e a 06 o desenha em `--marca` (diferença conhecida da referência)
  - no protótipo · conectado, a sessão nasce, com o meio em que a busca achou o módulo, e a tela vai pra T07; a faixa não desce aqui: ela desce na T07, quando as nove linhas foram lidas sem trava (`logica.md` e decisão 44). A sessão nasce sem nenhuma etapa: nada se grava aqui, e o diagnóstico grava a dele (`etapas.preChecagem`, que a T13 e a T12 leem) · `app/src/telas/T05/index.jsx` · `abrirSessao`
- `Conectar ao …` → o botão desliga e diz *Conectando ao M2C-0417…* (a 06), sem mudar mais nada na tela
  - no protótipo: o módulo responde → o *Conectado ao …* (07): o primário desligado com o texto novo, o `Procurar de novo` apagado, e o traço lima se desenha embaixo da linha marcada (`LinhaModulo` · `confirmada`, uma vez, só no fluxo; pela URL, já desenhado); depois de 1,2 s (`buscaMs`, sem número novo), a T07. Na falha, sem traço. O `Tentar de novo` da 04 também termina no 07
- se a conexão falha: a linha do módulo diz *não respondeu*, as três causas aparecem embaixo da lista, e o primário vira `Tentar de novo` (a 04)
  - no protótipo: `Tentar de novo` (04) → conecta de novo, e a tela vai pra T07 · `Procurar de novo` (03, 04) → a busca de novo (01) · `Voltar ao menu` (03) → T04
- **as linhas mostram só o número e o modelo** — o firmware é do diagnóstico, não da conexão (*na conexão do módulo não é necessário checar nada*)
- **na busca só aparece módulo com Bluetooth**: o VL06 FULL, o VL06 CAN-BT e o VL08 · o VL06 ECO e o VL06 CAN não têm Bluetooth, não aparecem, e o app não configura esses dois · o nenhum encontrado diz isso embaixo das causas (a 03): *O VL06 ECO e o VL06 CAN não têm Bluetooth: não aparecem aqui, e o app não configura esses dois.*
  - no protótipo · a busca lista os módulos por perto (`situacao.porPerto`) cuja variante tem Bluetooth na matriz (`matrizCapacidades[].bluetooth`, decisão 59): no mundo do protótipo, os cinco — o M2C-0362 é um VL06 CAN-BT, e o M2C-0394, um VL06 FULL · a frase da 03 tira da matriz os nomes das variantes sem Bluetooth (*VL06 ECO*, *VL06 CAN*), na moldura do `textos.md`; com outro número de variantes, ela fica sem texto · a frase fica no bloco do vazio, embaixo das causas, em 13/500 na `--tinta-apagada`, centrada (`pecas.jsx` · `VazioDaBusca`, o `aviso`) · o meio da sessão é sempre o Bluetooth, e não decide o leitor (ele sai do cadastro do modelo do ativo)
- no protótipo · as portas naturais: a R-14 vence a R-11 — tocar na linha só marca, e o estado do caso aparece quando o técnico toca em `Conectar ao …`. O M2C-0999 é a porta da T05: marcado na lista da T05/01, o `Conectar ao M2C-0999` conecta como os outros — a sessão nasce com ele, sem faixa —, e a T07 trava pelo serial fora do cadastro, lido da sessão (T07/02). Na 00 e na 04 também, como elas desenham. Os estados da T05 (03, 04, 16 a 20) abrem pela coluna do palco
- no protótipo: o que acontece uma vez vale uma vez por sessão — aqui, a falha ao conectar (04). O que é fato do cadastro vale toda vez. O link que cai e o módulo sem rede são da T07
- **o voltar do Android na busca leva ao menu** (decisão 64): o rodapé da busca (00, 01, 02, 04 e 20) não tem saída pro menu, e o técnico que abriu a busca sem querer ficava preso nela · o voltar faz o `Voltar ao menu` → T04, como no nenhum encontrado (03) e sem Bluetooth ou sem a permissão (16, 17) · procurando (05), o rodapé já tem o `Voltar ao menu`, e o voltar faz o mesmo, como hoje · conectando e conectado (06, 07), e pareando ou reconectando (18, 19), ele não faz nada: é a espera, e ela tem fim
- no protótipo: o voltar do sistema (no computador, o Esc) é o `Voltar ao menu` → T04 na busca (00, 01, 02, 04, 20), no nenhum encontrado (03), procurando (05) e sem Bluetooth ou sem a permissão (16, 17); conectando e conectado (06, 07), e pareando ou reconectando (18, 19), ele não faz nada (`06-prototipo/logica.md` · O voltar do Android; o roteiro `voltar.mjs`)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- duas ações
- com legenda
- nota tracejada
- linha do histórico
- a lista de empresas
- com contador
- linha de opção
- linha de módulo
- escolha numa lista
- linha de ônibus
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
- com legenda
- os glifos de estado
- os poços
- os marcadores
- nota tracejada
- com contador neutro
- linha de módulo · a escolha numa lista, com a falha à direita
- o que conferir da 04 · peça do design system, na folha 6 (`ds/entrada/OQueConferir.jsx`), com o traço vermelho (`falha`) · a T13/09 usa a mesma, sem ele

Medido nas sete referências da conexão (00 a 04, 16 e 17): nenhuma tem a faixa, e todas têm duas ações, o primário e o link. Estão as de toque da folha 1 (o primário nos três estados, o link e a linha tocável) e os glifos, os poços e os marcadores da folha 3. O *com contador neutro* é o que a lista de cima chama de *com contador*. O que só a T05 desenha é variante nomeada: a linha de módulo como escolha e o contador só com a palavra (03). A *linha de módulo* da 01 não tem a folga do fim: as cinco linhas têm 72 e a divisória embaixo, a última também, como a referência desenha (o `fim` de 76 fica só na vitrine); na 00 e na 04, a última dos outros por perto tem a folga de 56. O rótulo de topo com o serial e a placa, o rótulo dos outros por perto e o bloco do nenhum encontrado (03) não têm linha no `componentes.md`: são peças desta tela, em `06-prototipo/app/src/telas/T05/` (o bloco do nenhum encontrado em `pecas.jsx`, que no 16 e no 17 leva o poço de 44 com o Bluetooth cortado, o ícone `bluetooth-desligado`). A lista de cima traz peças que nenhuma referência da T05 desenha (linha do histórico, a lista de empresas, linha de opção, linha de ônibus e lista com contagem), e também a linha da fila e a linha da re-checagem, que esta lista não usa: vale esta lista (diferença conhecida).
- no protótipo · a medição: as treze referências contra o HTML (`node scripts/tela.mjs todos T05`) fecham em 0% (00 a 05, 16, 17 e 20) e em 0,1% na 06, 07, 18 e 19, o `Procurar de novo` apagado (a diferença conhecida do *Conectando ao …*, acima) · os textos conferem nas treze (`node scripts/textos.mjs T05`) · o movimento: `node scripts/caminho.mjs mov-t05`

## Histórias de usuário

- **HU-T05-1** — Busco os módulos com Bluetooth; o vazio explica alimentação e distância, e avisa que o VL06 ECO e o VL06 CAN não aparecem
- **HU-T05-2** — Conectar só conecta: a sessão abre, a faixa desce, e o diagnóstico vem em seguida
  - no protótipo: a sessão abre na conexão, e a faixa desce na T07, quando as nove linhas foram lidas sem trava
- **HU-T05-3** — Falha de comunicação mostra uma causa única com 3 coisas a checar: cabo, alimentação, cadastro
- **HU-T05-4** — Perda de link mostra Reconectar e preserva o estado da etapa
- **HU-T05-5** — Bluetooth desligado ou sem permissão: o app diz o que fazer antes de procurar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## A conexão

- **só sem fio**: nenhuma tela oferece cabo nem *reconectar por cabo*
- **pareando** (a 18): só na primeira conexão com um VL06 · *Confirme no celular. É só na primeira vez com este módulo.* · o VL08 não precisa
- **o pareamento que o celular não confirma** (a 20): passado o tempo limite sem a confirmação, a linha do módulo diz *não pareou*, em vermelho, no lugar do *não respondeu* da 04, e a frase embaixo da lista diz o que fazer: *O celular não confirmou o pareamento. Toque em Tentar de novo e confirme o aviso que o celular mostra.* · o primário é `Tentar de novo`, que pede o pareamento de novo (a 18), e o link continua `Procurar de novo` · a lista fica como está, com o módulo marcado (HU-T05-3: a falha nomeia o módulo)
- **reconectando** (a 19): a conexão sem fio cai depois de cerca de 30 segundos parada · *A conexão caiu por ficar parada. O app reconecta sozinho.* · texto neutro, nunca falha: a queda por ficar parado não é falha · **se o módulo não responde no tempo limite**, é a conexão que falhou (a 04): a linha do módulo diz *não respondeu*, com o que conferir embaixo, e `Tentar de novo` (HU-T05-3) · o tempo limite é o da conexão, que o produto confirma
- **no protótipo:** a 18 e a 19 abrem pela coluna, paradas (os casos `pareando` e `reconectando`, no herói): o quadro do *Conectando*, com a frase da espera embaixo da lista, neutra (12/500 em `--tinta-secundaria`, a 4 + 8 do botão), e o primário que diz *Pareando com o …* ou *Reconectando ao …* · no fluxo, a conexão do herói não pareia nem cai · a T05/04 diz *1 · Cabo e conector* no *O que conferir*: é o cabo de alimentação do módulo, e não o de programação — o texto fica como está
- **no protótipo:** a 20 abre pela coluna, parada (o caso `pareamento-nao-confirmado`, que nasce do `pareando`): a lista da busca com o M2C-0417 marcado e *não pareou* na linha dele, no lugar do *não respondeu* da 04 · a frase do que fazer no lugar da frase da espera, no mesmo desenho (12/500 em `--tinta-secundaria`, a 4 + 8 do botão) · `Tentar de novo` pede o pareamento de novo, o *Pareando com o …* da 18, e o módulo conecta · nenhuma espera estoura no protótipo: o desfecho vem do caso (decisão 64) · 0% contra o HTML nas escalas 2 e 1, e os textos conferem

## A folga até o rodapé

- **o Bluetooth desligado e o sem permissão** (a 16 e a 17): a caixa da lista para 16px antes do rodapé, como a lei pede · a caixa continua grande: é a área da lista, onde os módulos vão aparecer
- **no protótipo:** a 16 e a 17 têm a folga de baixo do miolo (16) · a caixa continua crescendo: é a área da lista
