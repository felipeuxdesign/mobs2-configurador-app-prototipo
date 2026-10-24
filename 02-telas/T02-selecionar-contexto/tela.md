# T02 · Selecionar contexto

Dizer pra qual empresa o técnico vai trabalhar hoje: o pacote de dados que o app vai usar é o da empresa inteira.

| | |
|---|---|
| **Elemento-assinatura** | a linha escolhida com o marcador lima, e o pacote de cada empresa dizendo a idade dele |
| **Chrome** | sem faixa |
| **Semente no protótipo** | três empresas · a do herói é a Viação Atlântico Sul, com o pacote de ontem e os 24 ativos do mock |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 0 — ver `estados.md` |

## O que se toca

- **o contexto é a empresa**: não existe unidade nem garagem (decisão 56) · o pacote é o da empresa inteira, com todos os ativos dela
- a entrada (a 00): *3 EMPRESAS* em cima do título, *Pra qual empresa hoje?*, uma linha por empresa e nada escolhido · o primário apagado e desabilitado, *Escolha uma empresa*
  - no protótipo: o `Entrar` da T01 leva à `00`, e o endereço da tela (`?tela=T02`) e o pulo do palco também abrem nela — o contexto sem empresa (`app/src/estado/sementes.js`). O endereço do `01` abre com a Viação marcada, a empresa do contexto do mock. A URL segue o quadro: o `01` com uma escolhida, nada na `00`. As duas ficam a 0% do HTML
- **a linha da empresa**: o nome, e embaixo a idade do pacote que está no aparelho, com a hora (*pacote de ontem, 07:10*, *pacote de 4 dias, 06:55*); vencido, a idade e que venceu (*pacote de 8 dias, vencido*) · à direita, quantos ativos o pacote traz (*24 ativos*) · a empresa de pacote vencido também se escolhe: a T03 diz o que fazer
  - no protótipo: a linha lê o pacote da empresa (`M.pacotes`, pelo `pacoteId` dela): a idade e a hora, pela mesma função da folha Trocar de empresa da T04 (`app/src/dados/formato.js` · `idadeDoPacote`), e os ativos que ele diz trazer · a escolhida fica com o nome em `--tinta-forte`, como a `01` desenha: a *escolha numa lista* ganhou a variante que não sobe o nome (`nomeSobe`, `app/src/ds/linhas/LinhaEscolha.jsx`); a folha 3 desenha o nome da escolhida subindo pra `--tinta`, e o espécime da vitrine segue a folha (diferença entre as duas referências)
- tocar numa empresa → ela fica escolhida (a 01), e o primário acende com `Sincronizar` · tocar em outra troca a marca (R-14)
  - no protótipo: tocar de novo na escolhida não desmarca; a de pacote vencido se escolhe como as outras, e a T03 dela pergunta antes (T03/04)
- `Sincronizar` → T03, que baixa o pacote da empresa escolhida · o de 4 dias e o vencido perguntam antes de baixar (T03/03 e 04)
  - no protótipo: o `Sincronizar` grava a empresa no contexto do estado único, sem pacote, e a T03 baixa o dela (`app/src/telas/T02/empresas.js`, as funções da tela, provadas em `node app/scripts/testar-empresa.mjs`; o roteiro `empresa.mjs` anda o caminho no app)
- **com uma empresa só, o app pula esta tela**: o `Entrar` da T01 leva direto à T03, com o pacote dela · no menu, o nome dela fica no topo sem a seta, e não é botão (T04)
  - no protótipo: o `Entrar` leva à T02, que, no mundo de uma empresa só (o caso `uma-empresa`, `contexto.mundo`), não desenha nada e segue na hora pra T03, com a única no contexto (`pulo`). Nenhuma referência desenha esse mundo, e o palco não o abre: ele se prova no node (`app/scripts/testar-empresa.mjs`; o nome sem a seta, em `testar-trocar-empresa.mjs`)
- o `Trocar de empresa` do pacote vencido (T03/04) volta pra esta tela com a atual marcada · a folha *Trocar de empresa* do menu (T04/07) escolhe como aqui: o toque marca outra empresa, e o `Sincronizar` troca (T04/21); sem sessão, vai direto à T03 da escolhida
  - no protótipo: a tela abre com a atual marcada sempre que o contexto já tem uma empresa — o `Trocar de empresa` da T03/04 e também o da falha de rede com o pacote vencido (T03/05) —, e a URL diz o `01` · a falha de rede com o pacote valendo (T03/01) não volta pra cá: o `Continuar com o pacote de ontem` segue pro menu, com o pacote do aparelho
- o voltar do sistema (no computador, o Esc) não faz nada: a tela não tem saída desenhada, e o `Sincronizar` é o ato, não a saída (`06-prototipo/logica.md` · O voltar do Android)
  - no protótipo: o voltar não faz nada, com ou sem escolha; com o diálogo de outro usuário por cima, ele faz o `Entendi`, a única saída do diálogo (o roteiro `voltar.mjs`)
- o diálogo *Outra sessão neste aparelho* (T01/18) abre por cima desta tela, com as empresas atrás
  - no protótipo: o diálogo mora nesta tela e nasce aberto, com ela; o `Entendi` fecha, e o véu e a caixa esmaecem em 150ms. Pela coluna, a T01 monta esta tela com o caso `outro-usuario`, as empresas da `00` atrás, parada e sem toque (`02-telas/T01-login/tela.md`)
- **a lista longa**: a busca nas empresas não tem desenho nesta versão (pergunta do produto)
  - no protótipo: sem busca; o miolo rola entre a barra e o rodapé quando a lista passa da altura. O caso `lista-longa-garagens` saiu do mock

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema sem sessão
- uma ação
- escolha numa lista

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- linha tocável · normal e pressionada
- barra do sistema sem sessão
- uma ação
- escolha numa lista
- diálogo sem saída
- os poços
- os marcadores

A escolha numa lista entra na variante que não sobe o nome da escolhida (`nomeSobe`), como a `01` desenha. O diálogo sem saída é o de outro usuário no aparelho (T01/18), por cima das empresas. Pelo medido, estão as peças de toque da folha 1 (o primário nos três estados e a linha tocável, a base da linha de escolha) e os poços e os marcadores da folha 3.

## Histórias de usuário

- **HU-T02-1** — Escolho a empresa em que vou trabalhar, entre as que tenho permissão, com busca quando a lista for longa (sem desenho nesta versão); com uma empresa só, o app pula a escolha; o herói começa com três empresas
- **HU-T02-2** — Troco de empresa a qualquer momento pelo topo do menu; a empresa ativa fica sempre visível
- **HU-T02-3** — Trocar com módulo conectado avisa que a sessão de configuração encerra, e pede confirmação
- **HU-T02-4** — Trocar com envio em andamento é bloqueado até concluir ou abortar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
