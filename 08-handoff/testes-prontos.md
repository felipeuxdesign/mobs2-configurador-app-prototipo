# Os testes que já estão prontos

Os casos, roteiros e comparações do protótipo ajudam a preparar o aceite do produto. A existência de um roteiro não significa que ele foi executado na última versão: o estado da última execução está no fim da seção dos roteiros.

## Os casos do mock

São **69 casos** em [mocks.js](../04-dados/mocks.js). Cada caso descreve uma condição de exemplo, e [casos.md](../04-dados/casos.md) relaciona as referências e receitas que a usam. O [índice](../02-telas/indice.json) lista **230 referências**, com sua classificação e os casos associados. Algumas condições complementares vêm das [receitas](../06-prototipo/app/src/estado/receitas.js); nem toda referência nasce de um caso exclusivo.

No produto, monte a condição real correspondente, abra a tela e confira os dados, ações e aparência. O palco deixa as consultas paradas para inspeção; isso não dispensa implementar a reação da tela à condição real.

## Os roteiros de navegação

São **51 roteiros** em [scripts/caminhos](../06-prototipo/app/scripts/caminhos/). Eles tocam pelos nomes acessíveis, como o técnico faria, e verificam telas, textos, ações, movimento e o tempo dos processos. O cabeçalho de cada um diz, em linguagem de produto, a regra que ele prova.

| Roteiro | O que prova |
|---|---|
| **o caminho principal** | |
| `heroi` | Do login ao menu sem sessão, só por toque: a escolha da Viação e o `Sincronizar`, o módulo e o ônibus, a cadeia gravando e conferindo etapa por etapa, a CAN lida, a calibração (o ônibus não tem nada a calibrar), o ciclo de quatro passos, as fotos da Montagem, cada uma conferida no quadro antes do `Usar foto`, o checklist registrado — com o toque duplo no `Finalizar instalação`, que não vale por dois — e a homologação na T16. **250 passos.** |
| `heroi-sem-horimetro` | O outro caminho até o ciclo: da calibração, de volta ao menu, e o ciclo pela Seção E do checklist. O nome é antigo: o ônibus atual não tem horímetro a pular. |
| `readme` | O caminho do GIF do README, no ritmo de quem olha: do login à CAN lida, e o fim da visita, com a instalação homologada. |
| **as regras de todas as telas** | |
| `voltar` | O voltar do Android em cada tela (no computador, o Esc): a saída desenhada, o processo que não pode parar, a folha e o diálogo primeiro, e o voltar que não deixa o técnico preso. |
| `folhas` | A folha fecha de quatro jeitos (lei 20): o xis, tocando fora, arrastando pra baixo e o voltar. |
| `teclado` | O teclado nunca esconde o campo nem o primário, em cada campo do app. |
| `retrato` | O app não gira com o celular deitado. |
| `portas` | Tocar numa linha só marca, e quem avança é o botão (R-14); cada caso do mock abre o estado dele pelo caminho natural. |
| `abortada` | O *Encerrar antes de terminar?* por cima de cada tela com a sessão aberta, e os quatro passos do encerrar sem homologar (decisão 36). |
| `claro` | Liga e desliga o *Modo claro*, recarrega, e percorre as 230 referências no claro, reprovando qualquer cor que só o escuro tem. A mesma varredura, rodada no escuro, reprova: é a prova de que ela pega. |
| `recarregar` | Recarregar a página recomeça do login, e o endereço ainda abre a tela, o estado ou o painel. |
| **os fluxos de cada tela** | |
| `recuperar` · `lembrar` · `outro-usuario` | A T01: o recuperar acesso inteiro, com o teto de envios; o usuário lembrado; e outro usuário no aparelho, com a fila do anterior subindo. |
| `empresa` · `outras-empresas` · `idade-do-pacote` | O contexto é a empresa (T02, T03 e T04): a escolha, a troca pela folha do menu, as outras empresas do herói e o pacote antigo ou vencido. |
| `sair` · `fila` | Os diálogos de sair, que dizem o que fica (T04), e o `Ressincronizar e reenviar` da fila (T15). |
| `busca` | A busca sem resultado e a que esconde a escolha, na T06. |
| `reenvio` | O reenvio das cercas na manutenção (T09), com a folha de confirmação e a pergunta pelos dependentes. |
| `conferencia` | A conferência da T11: a folha por quatro caminhos, o registrar, o reenviar e o `Reenviar tudo, menos a conexão`. **171 passos.** |
| `recebido` | O que o servidor recebeu, no detalhe de cada instalação da T12. |
| `checklist` · `reler` | O checklist da T13 numa estrutura só, e o `Reler o módulo` no item reprovado. |
| `sessao` | As legendas do encerramento da T16, passo a passo. |
| **o movimento** | |
| `mov-<tela>` | O movimento de cada tela, com os tempos de [movimento.md](../03-design-system/movimento.md) e do `animacao.md` dela. |
| `mov-troca` · `mov-faixa` · `mov-porcima` · `mov-listas` · `mov-check` · `mov-instrumentos` | O movimento que vale em todo o app: a troca entre telas, a faixa da sessão, a folha e o diálogo, as listas, o check e os instrumentos. |
| **o palco** | |
| `familias` · `coluna-momentos` · `pisca` · `palco-claro` | A coluna de estados, os momentos parados, o aviso de app parado e o *Modo claro* do painel: só da apresentação, não do produto. |

**O estado da suíte:** os 51 roteiros aprovam. Na última execução completa contra o build de produção, o mesmo da Vercel, os 51 aprovaram de primeira. No servidor de desenvolvimento, 50 aprovaram de primeira, e o `mov-t16` parou num passo que mede o esmaecer de 150 ms logo depois de ver a *Sessão encerrada*; rodando sozinho, ele aprova três vezes seguidas. Os passos que medem o movimento dependem do tempo da máquina: numa execução longa, um deles pode parar por tempo. A regra de produto continua nas fichas: um roteiro que para não é um fluxo aprovado. A vitrine tem 129 espécimes, 111 em 0% contra as folhas e 18 com a diferença registrada no [mapa das peças](../06-prototipo/app/src/ds/MAPA.md). Das 230 referências, 121 fecham em 0% contra o HTML (124 na escala 1), e as outras têm a diferença conhecida registrada na ficha da tela. Os textos de 185 batem com a referência; nos outros 45, a régua não lê a tela inerte atrás de uma folha, o relógio está parado, a linha quebra em outro ponto, o valor está dentro do campo, ou a diferença de dado está registrada na ficha.

## Os testes sem navegador

O `npm run checar` roda, além da checagem de dados, sete provas no node, sem o navegador, nas mesmas funções que as telas usam:

| Prova | O que confere |
|---|---|
| `testar-estado` | toda semente e toda receita resolvem no mock, e todo estado do índice tem receita |
| `testar-regras` | a conta do teclado e o retrato |
| `testar-login` | as regras da T01: o teto de envios, a folha do teto, o `Confirmar` que diz o que falta |
| `testar-login-e-bluetooth` | o que o botão de cada estado do mundo real faz na T01 e na T05 |
| `testar-camera` | o primário e o link da câmera, sem a permissão e com a foto no quadro |
| `testar-empresa` | o contexto é a empresa, com três empresas e com uma só |
| `testar-trocar-empresa` | a folha Trocar de empresa do menu |

E o [testar-consultas.mjs](../06-prototipo/app/scripts/testar-consultas.mjs), no navegador: as consultas paradas pela coluna e pelo endereço (25 quadros), a inércia depois de toque, Esc e tempo, os retornos e as entradas normais do painel.

## A checagem de dados e as checagens locais

[checar-cobertura.js](../04-dados/checar-cobertura.js) confere as relações e as âncoras do mock, e que cada ficha conta os momentos e os estados que as referências têm. `npm run checar` acrescenta a sincronia dos tokens, a cobertura das receitas, as regras puras das telas e a higiene do código: nenhuma cor ou medida solta, nenhum relógio. Esses testes não substituem uma integração nem a navegação no navegador.

Para validar dados reais, adapte a entrada da checagem e preserve as relações pertinentes: placas e contagens do exemplo não são exigências de todo pacote real.

## Em outra stack

Os testes do protótipo rodam em JavaScript, mas o que eles descrevem vale pra qualquer implementação:

- **Os casos são as condições de aceite.** Cada caso do mock é uma condição do mundo com a referência que ela desenha: no produto, monte a condição (com um módulo de bancada, um servidor de teste ou um dublê do adaptador) e confira a tela contra a referência.
- **Os roteiros são roteiros de aceite.** Cada passo é uma ação ou uma verificação em linguagem de tela (`toca 'Ler a CAN'`, `ve 'relido às 14:30'`, `chega T10`), e o técnico de um teste manual ou uma ferramenta de teste de interface que toque pelo nome acessível repete o mesmo caminho.
- **As referências são as imagens de aceite.** O método de comparar fora do navegador está em [conferir contra o design](conferir-contra-o-design.md#em-outra-stack).
- **As provas sem navegador são testes de unidade.** As funções que elas testam são as regras de cada tela, sem desenho: portadas pra outra linguagem, os mesmos casos servem de entrada.

## Rodar

Na pasta `06-prototipo/app`:

```bash
npm install
npm run checar
npm run build
npm run dev
```

Em outro terminal, na mesma pasta:

```bash
npm run fotografo
node scripts/caminho.mjs heroi
node scripts/testar-consultas.mjs
```

`caminho.mjs` usa uma aba própria do Chrome do fotógrafo, ou abre um Chrome próprio quando ele não está disponível. Ele roda contra qualquer endereço: pra conferir o build de produção, que minifica o CSS, rode `npm run build` e `npm run preview`, e aponte os roteiros pra ele (`BASE=http://localhost:4173/ node scripts/caminho.mjs todos`); o protótipo publicado é esse build. Para os scripts de comparação que pedem escala 1×, use também `npm run fotografo:1`. `node scripts/caminho.mjs todos` executa todos os roteiros.

Para a comparação visual, com os fotógrafos nas escalas 2 e 1 (`npm run fotografo` e `npm run fotografo:1`, um terminal por processo), `node scripts/tela.mjs todas` compara as 230 referências. Os comandos e saídas de comparação estão em [conferir-contra-o-design.md](conferir-contra-o-design.md).
