# T06 · Selecionar ativo

Escolher o ônibus que está na frente do técnico e vincular o módulo a ele, na empresa.

| | |
|---|---|
| **Elemento-assinatura** | o escolhido em cima e os dados do modelo embaixo — placa, frota, fabricante e modelo, sem chassi |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 · os 24 ônibus do pacote da empresa |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 3 · 4 — ver `estados.md` |

## O que se toca

- a instrução *Escolha o veículo que está na sua frente* sai com qualquer termo na busca
  - no protótipo: com um termo na busca, a instrução sai, e embaixo do campo fica o que a busca achou — a lista ou o vazio —, também na busca que acha sem esconder nada (o `busca.mjs` prova com o RKT-8H42 marcado e com nada marcado)
- a busca que esconde o ativo escolhido apaga o `Usar este ativo`, que volta quando ele reaparece · a escolha não se perde
  - no protótipo (a `09`): a URL diz o `09` enquanto a busca acha outros ônibus e esconde o marcado, e a busca que o devolve o tira; aberto pelo endereço, o `09` vem com o RKT-8H42 marcado — o ônibus do módulo da sessão, como o `01` — e *PCX* digitado. O campo fica com o traço lima do campo focado enquanto a busca esconde o marcado, como a `09` desenha · **com um termo na busca, a instrução sai**: embaixo do campo fica o que a busca achou, a lista ou o vazio, como a `08` e a `09` desenham (nenhuma referência desenha a busca que acha sem esconder nada: ela segue as duas)
- a busca sem resultado diz *Nada com “ABC-1234”* e sugere buscar pela frota
- a busca filtra por placa, frota ou módulo
  - no protótipo: a busca filtra ao digitar por placa, frota, módulo esperado e chassi, sem caixa, sem acento e sem o hífen da placa; a placa de um ônibus de outro pacote abre a trava de fora do pacote; sem resultado, o cartão diz *Nada com “ABC-1234”* e sugere buscar pela frota — o momento `08` · o chassi segue no cadastro, e nenhuma tela o mostra (decisão 46): a busca que acha por ele não o mostra
    - no protótipo, o vazio declarado fica no lugar da instrução e da lista, e o `Usar este ativo` espera, como a `08` desenha; o ônibus marcado fica guardado e volta com a lista. A busca que acha outros ônibus e esconde o marcado faz o mesmo: o `Usar este ativo` espera, apagado, e acende de novo quando a busca mostra o marcado outra vez (o roteiro `busca.mjs` prova). O campo acende o traço lima do campo focado no foco, e fica aceso enquanto a busca não acha nada, como a `08` desenha. A URL diz o `08` enquanto a busca não acha nada, e a busca que volta a achar o tira; aberto pelo endereço, o `08` vem com *ABC-1234* digitado. O `Escolher outro` de uma placa de outro pacote volta à lista com a busca como estava, e ela não acha nada no pacote: é o `08`, com a placa no título
- tocar num ônibus → confirmar o vínculo
  - no protótipo: tocar num ônibus → ele fica **marcado** (o quadrado lima no poço) e o `Usar este ativo` acende; o `Usar este ativo` → confirmar o vínculo. Tocar em outro ônibus troca a marca. A lista com um ônibus marcado não tem referência: monta-se com as peças que existem · **a R-14 vence a R-11**: o estado de um ônibus que é caso aparece no `Usar este ativo`, não no toque da linha
  - no protótipo: a confirmação é o escolhido justo, com a frota sem o modelo (*frota 1003*), e os dados do modelo embaixo — a peça da folha 4, `DadosDoModelo` (`app/src/ds/cartoes/`), com o espécime `f4-dados-do-modelo` em 0% contra a folha. O FABRICANTE e o MODELO vêm de `modelosAtivo`; o MODELO das referências, *OF-1621 · ônibus urbano*, é o código e o tipo, e o mock não tem um campo do tipo: ele sai do nome do modelo sem o código, com a primeira letra minúscula — *ônibus urbano*, *caminhão coletor*, *retroescavadeira* (`app/src/telas/T06/dados.js`, `dadosDoModelo`) · **diferença conhecida:** um campo `tipo` nos três modelos de ativo, conferido pela checagem de cobertura, tiraria a derivação. A empresa da frase é a do contexto (*na Viação Atlântico Sul*; numa empresa espelho, o nome dela), lida em `app/src/dados/empresas.js`
- `Vincular o módulo` → T09, a configuração
  - no protótipo: `Vincular o módulo` → o ativo entra na sessão, com o vínculo anotado às 14:30, e segue pra T09, no que vai ser gravado (`05`) — instalação nova, o padrão
- `Escolher outro` → a lista
  - no protótipo: `Escolher outro` → a lista, com a busca como estava · `Voltar ao menu` → T04 · `ENCERRAR` → a sessão abortada (T16/03)
    - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar antes de terminar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela · o `Encerrar mesmo assim` roda os 4 passos da T16
- o módulo em outro ativo: a tela avisa, sem travar (o domínio: *nunca trava*), e pede pra conferir a etiqueta antes, porque o primário zera o módulo de um ônibus que funciona: *Confira se o módulo na sua mão é o M2C-0417: vincular aqui desfaz o vínculo antigo, e o desvínculo fica registrado.* (a 10) · `Desvincular e vincular aqui` desfaz o vínculo antigo, e o desvínculo fica registrado · o módulo errado na mão sai pelo ENCERRAR, como todo módulo da sessão
  - no protótipo: `Desvincular e vincular aqui` segue pra T09, no que vai ser gravado (`05`) — o módulo é novo neste ativo, e é instalação nova; o registro do desvínculo é um fato da sessão, sem tela própria
    - no protótipo: o caso `modulo-em-outro-ativo` não traz o ativo — só o módulo e onde ele está, o a-18, o QTM-5S79 do aviso —, e o ônibus do `10` é o do módulo da faixa no pacote, o RKT-8H42, como a referência desenha e como o `01` aberto pelo endereço (diferença conhecida; a saída é um `ativoId` no caso). O desvínculo fica no registro do vínculo, `etapas.ativo.desvinculo` = { o a-18, 14:30 }, com o `modo` da instalação nova; nenhuma tela o lê
- o módulo que já é deste ativo: é manutenção · `Seguir pra manutenção` → T09, um bloco por vez
- o vínculo decide o modo: módulo novo neste ativo é instalação; módulo que já era dele é manutenção
  - no protótipo: o modo não sai do cadastro — o a-01 do herói já traz o M2C-0417 como módulo previsto (`04-dados/mocks.js`), e por ele o herói seria manutenção. O padrão é a instalação nova; a manutenção vem só do caso `modulo-ja-deste-ativo`, e o `10` e o `11` abrem pela coluna do palco, montados pelo caso, nunca pelo serial no fluxo
    - no protótipo: o modo mora no registro do vínculo, `etapas.ativo.modo` — `instalacao` no `01` e no `10`, o `modo` do caso, `manutencao`, no `11` —, que zera com a sessão nas zeragens que já existem; a `logica.md` desenha o modo como linha própria do estado único (diferença conhecida). Sem pergunta ao técnico. O `10` e o `11` abrem pela coluna, parados e sem toque (`06-prototipo/palco.md`): o `Desvincular e vincular aqui` e o `Seguir pra manutenção` existem, e nenhum roteiro os toca — a T09/08 abre pelo endereço do momento

- a lista são os ônibus do pacote da empresa do contexto, na ordem do mock: na Viação Atlântico Sul, os 24 (*24 no pacote*); a lista rola entre a faixa e o rodapé
  - no protótipo · a medição (`node scripts/tela.mjs todos T06`, contra o HTML): 0% em sete das oito · 0,41% na 00: a referência fecha o cartão da lista depois da quinta linha; o protótipo tem as 24 do pacote, e a sexta, o RVM-1E54, aparece embaixo da quinta, cortada pelo rodapé, como numa lista que rola (diferença conhecida da referência; a régua dos textos lê as 24)
  - no protótipo: o contador *no pacote* é o que o pacote da empresa diz que trouxe (`contem.ativos`), e a lista são os ativos do mock, todos da Viação · **diferença conhecida:** nas duas empresas espelho, o contador diz o pacote delas (*34*, *18*), e a lista são os 24 da Viação — o mock não tem a frota delas
- a confirmação checa nesta ordem: o pacote, os pinos e o vínculo (com o vínculo no lugar do chassi, pela decisão 46). O ônibus que não é caso abre o vínculo novo, a `01`
- **fora do pacote** (a 04): um ônibus que está no cadastro do M2, mas é de outra empresa, e por isso não veio no pacote · *FORA DO PACOTE DESTA EMPRESA*, a placa, e de quem ele é: *Pertence à Expresso Caruaruense.* · e o caminho de verdade, porque a empresa é uma das do técnico: *É uma das suas empresas: troque de empresa pra instalar nele.* (pelo nome da empresa no topo do menu, T04/07) · `Escolher outro` · o cadastro está certo: nada de pedir cadastro (HU-T06-5) · o ônibus do caso é o PHS-2C47, *frota 3008 · Ônibus urbano OF-1621*, que só o caso traz: os 24 do mock são todos da Viação
  - no protótipo: o ônibus mora no caso `ativo-fora-pacote` (`ativo`, com a empresa dele), contra o pacote da Viação; a busca que acha a placa dele abre a trava, e o *Pertence à …* sai do nome da empresa dele, com o artigo de *a empresa*. Pela coluna, o `04` monta o mesmo par. O `Escolher outro` volta à lista com a busca como estava — a placa não está no pacote, e é a busca sem resultado (a `08`)
- conflito de pinos: sempre a trava (06), sem saída no lugar. O conflito vale quando o módulo da faixa e o ônibus são os do caso
- o voltar do sistema (no computador, o Esc) faz o mesmo que o link de saída do rodapé: na lista e na busca sem resultado (08), o `Voltar ao menu`; na confirmação e nos avisos do vínculo (10, 11), o `Escolher outro`, que volta à lista. Nas travas sem link (04, 06), o `Escolher outro` do primário, a saída que elas têm (`06-prototipo/logica.md` · O voltar do Android)
- no protótipo, a folga antes do rodapé: a lista do pacote, o último grupo do miolo que rola, não tem a margem de 16 embaixo, que somava com o recheio do miolo 32 no fim da rolagem; ficam os 16 do recheio. Na rolagem 0 não muda nenhum pixel. Na confirmação, que não rola, o último bloco tem os 16 dele e cresce até ali, como as referências desenham: os dados do modelo (01, 10 e 11) e a trava (04 a 06) — tirar a margem moveria o desenho

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- uma ação
- com legenda
- aviso
- vazio declarado
- os dados do modelo
- linha do histórico
- a lista de empresas
- com contador
- campo de busca
- linha de opção
- linha de ônibus
- escolhido com trava · T06
- lista com contagem
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

Medido nas referências: as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- uma ação
- os glifos de estado
- os poços
- os marcadores
- aviso
- vazio declarado
- os dados do modelo
- com contador
- campo de busca
- linha de ônibus
- bloco escolhido
- escolhido com trava · T06

A lista tem só os nomes das linhas do `componentes.md`, e as anotações são variante nomeada da peça, declarada lá: a faixa sem ativo, a linha de ônibus como escolha e o bloco escolhido justo. Estão as de toque da folha 1 (o primário nos três estados e o link), e os poços e os marcadores da folha 3. A lista em cartão não tem linha: é o recipiente de todas as linhas (`linhas/Lista.jsx`). Da `08` vêm o vazio declarado, com o termo digitado no título, e a busca focada, o traço lima do campo focado. A última linha de ônibus da lista tem 72, como as outras, só sem a divisória. Pela decisão 46, estão os dados do modelo (01, 10 e 11) e o aviso neutro, com o glifo de informação no poço de 26 (10 e 11); o com contador neutro se chama com contador, como no `componentes.md`. A lista do design traz linhas que nenhuma referência desenha — faixa · sem ação, o topo do menu inteiro, com legenda, linha do histórico, a lista de empresas, linha de opção, lista com contagem, linha da fila e linha da re-checagem: vale esta lista (diferença conhecida).

## Histórias de usuário

- **HU-T06-1** — Busco por placa, frota ou módulo; vejo o modelo do ativo
- **HU-T06-2** — Confirmo o vínculo vendo placa, frota, fabricante e modelo — sem chassi
- **HU-T06-3** — Se o módulo já está em outro ativo, o app avisa; vincular aqui desfaz o vínculo antigo e registra o desvínculo
- **HU-T06-4** — Se o módulo já é deste ativo, é manutenção: o vínculo decide o modo, e eu não preciso escolher
- **HU-T06-5** — Ativo fora do pacote trava, sem oferecer solicitar cadastro
- **HU-T06-6** — A matriz de ocupação de pinos roda aqui; conflito é erro de projeto de instalação e bloqueia, sem saída trocando o leitor
- **HU-T06-7** — Conflito sem saída é nomeado como incompatibilidade e escalonado — não há reordenação que resolva
- **HU-T06-8** — Cada linha do arnês é nomeada por cor e função

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## O conflito de pinos

- **o conflito é sempre erro de projeto de instalação** (a 06): sem cabo, trocar o meio de conexão nunca resolve, e o técnico não escolhe o leitor · não existe estado com saída
- **o texto do conflito** (a 06): *O fio azul já está ocupado.* (o fio azul é a entrada do leitor serial, IN3) · o rótulo em cima já diz que é erro de projeto de instalação · nada de *porta*, nem de trocar o leitor, que sugeriria uma saída
- **no protótipo:** o caso de pinos é só o `conflito-pinos-sem-saida`, e o par da faixa decide, sem olhar o meio da sessão · não há trava com saída, nem `Usar leitor sem fio`

## O cartão do vínculo

- **o cartão fica do tamanho do conteúdo**, sem um vazio grande dentro · no *Confirmar o vínculo* (a 01, 10 e 11) e nos erros (a 04 e 06), a placa e o motivo ficam no alto e a tela fica mais leve
- **no protótipo:** na T06, o escolhido e os dados do modelo não crescem (`flex-grow: 0`, da tela) · as peças continuam crescendo onde são o elemento principal (o escolhido da T05, a lei R-15)
