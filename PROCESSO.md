# Como o projeto foi construído

O protótipo foi construído por um agente de IA (Claude Code) a partir de um design já fechado, sob a direção do designer de produto. Esta página descreve o método: como o trabalho foi dividido, como cada entrega foi verificada e como as mudanças de produto entraram depois do lançamento.

## Os papéis

- **Direção de produto e design:** o designer define o problema, aprova cada plano, decide as perguntas em aberto e publica.
- **Desenho:** cada tela, momento e estado é entregue como uma referência em HTML e PNG, com uma ficha de comportamento, os textos e as animações.
- **Construção:** o agente implementa o app a partir das referências e das fichas, mede o resultado e registra cada diferença.
- **Produto:** o gerente de produto revisa o protótipo navegável, e as respostas dele viram decisões registradas em [07-decisoes](07-decisoes/).

## As regras que governam o agente

O [`CLAUDE.md`](CLAUDE.md) da raiz é a lei do projeto, e o [`06-prototipo/CLAUDE.md`](06-prototipo/CLAUDE.md) é a lei de construir o protótipo. As regras principais:

- **Construir o que está descrito, sem redesenhar.** Se algo parece errado, o agente mede, prova e propõe, mas nunca corrige por conta própria.
- **Medir antes de afirmar.** Contagens, medidas e cores saem das referências e do mock, nunca da memória.
- **Nenhum valor solto.** Cada cor, tamanho e espaço vem de um token.
- **Mesma entrada, mesma saída.** O relógio do produto fica parado em 14:30, e nada é aleatório. Com isso, cada print é reproduzível.
- **Diferença com nome.** Quando a realidade impede a especificação, o agente faz o possível e registra a diferença e o motivo. Nenhuma diferença fica sem registro.

## O ciclo de trabalho

O trabalho foi dividido em ciclos. Cada ciclo tinha um contrato: o que entra, o que não entra e como se prova que ficou pronto.

1. **Plano.** Antes de construir, o agente devolve o levantamento do que existe, o que contradiz a premissa, as decisões que precisa tomar (cada uma já com a opção que adotaria) e o que não faz sentido.
2. **Aprovação.** O designer responde às decisões, e só então a construção começa.
3. **Construção.** As peças do design system vêm primeiro, e as telas são montadas com elas. Cada estado é o app montado com os dados de um caso do mock, nunca uma tela desenhada à parte.
4. **Medição.** Cada quadro é fotografado em 360 × 800 e comparado com o PNG da referência.
5. **Registro.** O ciclo termina com as diferenças registradas, as checagens aprovando e um commit.

O primeiro ciclo foi só de estudo: ler a pasta inteira, abrir cada referência e devolver o entendimento do produto, sem escrever código.

## A ordem de construção

| Etapa | O que entrou |
|---|---|
| Fundação | o projeto, os tokens, a fonte, os ícones, o estado único e a ferramenta de print |
| Design system | os primitivos e as famílias de peças, fotografados numa vitrine e comparados com as folhas |
| Palco | o painel, a coluna de estados e o endereço de cada quadro |
| Telas | do login ao encerramento, em sete ciclos, cada tela com os seus estados |
| Movimento | cada linha dos `animacao.md`, dentro das leis de movimento |
| Fidelidade | todas as referências fotografadas, com zero diferença sem nome |
| Publicação | o build de produção e o link público na Vercel |

O protótipo completo levou quatro dias, de 24 a 27/09/2026. As revisões de produto vieram depois, de 02 a 23/10.

## A verificação

- **Comparação pixel a pixel.** O Chrome sem tela fotografa cada quadro, e o pixelmatch mede a diferença contra a referência.
- **Checagem de cobertura** (`04-dados/checar-cobertura.js`). Ela confere que o mock produz cada estado, que cada referência tem a sua linha na ficha e que cada ficha conta os momentos e os estados que as referências têm.
- **`npm run checar`.** Confere as regras locais do código: nenhuma cor ou medida solta, nenhum relógio e nenhum valor aleatório.
- **Roteiros de navegação** (`06-prototipo/app/scripts/caminhos/`). Andam pelo app tocando, como o técnico faria. O caminho principal tem mais de 200 passos.

## Depois do lançamento

O protótipo foi publicado cedo, para o gerente de produto navegar. Cada revisão de produto seguiu o mesmo ciclo: as respostas viravam decisões registradas, o desenho era atualizado nas referências, e o agente reconstruía, media e registrava. As versões estão no [CHANGELOG](CHANGELOG.md).

## Os números

| telas | momentos | estados | referências | tokens | peças do design system | decisões registradas | casos de dados |
|---|---|---|---|---|---|---|---|
| 15 | 129 | 86 | 230 | 318 | 117 | 64 | 69 |
