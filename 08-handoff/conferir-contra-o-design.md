# Conferir contra o design

São **230 pares HTML/PNG** em [02-telas](../02-telas/), listados no [índice](../02-telas/indice.json): 15 entradas, 129 momentos e 86 estados. Cada referência desenha o app em **360 × 800**; o PNG a 2× tem 720 × 1600. Essa referência vale para a stack escolhida pelo time.

## Como medir

1. Renderize o app e o HTML da referência no mesmo navegador, na mesma escala. Isso permite separar diferenças de desenho da rasterização da fonte.
2. Compare pixel a pixel. O protótipo usa `pixelmatch`, limiar 0,1; a meta contra o HTML é 0%. Toda diferença precisa de um nome e uma causa comprovada.
3. Confira também o PNG aprovado. Ele carrega a rasterização do gerador do design; diferenças de fonte não autorizam mudar medidas, cores ou componentes.

[tela.mjs](../06-prototipo/app/scripts/tela.mjs) reúne fotografia, comparação e textos; o cabeçalho documenta os argumentos. O fotógrafo atende à renderização, e os arquivos gerados ficam em `06-prototipo/app/prints/`, fora do git.

## Em outra stack

A régua do protótipo roda num navegador, mas o método vale em qualquer plataforma:

1. **Fotografe a tela em 360 × 800 dp, com densidade 2** — 720 × 1600 px, o tamanho do PNG —, montada com o caso do mock que a referência pede (o [índice](../02-telas/indice.json) diz qual).
2. **Compare com o PNG pixel a pixel.** A fonte rasteriza diferente em cada motor, então meça com uma tolerância pequena e olhe a imagem da diferença: o que sobra fora do texto (uma medida, uma cor, um elemento fora do lugar) é diferença de desenho, e precisa de nome.
3. **Confira os textos** contra o `textos.md` da tela: o mesmo texto, na mesma ordem.
4. **Dê a cada tocável o nome que a tela mostra.** Os roteiros do protótipo tocam pelo nome acessível, como o leitor de tela; qualquer ferramenta de teste de interface que ache o elemento pelo nome (as do Android, do Flutter, do React Native ou uma de fluxos, como o Maestro) repete os mesmos caminhos, e o leitor de tela sai certo junto.

## Qual evidência ler

Pra conferir o estado de agora, rode a bancada inteira (`node scripts/tela.mjs todas`) e a vitrine (`node scripts/especime.mjs todos`). O estado dos roteiros de navegação está em [testes-prontos.md](testes-prontos.md).

## Diferenças com nome

As notas *no protótipo* de cada ficha registram onde o protótipo não segue a referência, e por quê. As causas que mais se repetem: a rasterização da fonte e dos glifos; um dado do mock que difere do número que a referência desenhou (o mock ganha); uma regra que a referência ainda não desenha (a regra ganha, e a referência fica atrás); e um conteúdo ou comportamento sem desenho correspondente. Esses registros explicam situações medidas, sem dispensar a verificação de uma nova implementação.

## Textos, peças e valores

- Textos exatos: `textos.md` de cada tela.
- Peças e variantes: [componentes.md](../03-design-system/componentes.md) e as [nove folhas](../03-design-system/referencias/). São 117 peças normativas; a vitrine do protótipo tem 129 espécimes comparáveis.
- Medidas, cores e tamanhos: [tokens.css](../03-design-system/tokens.css), com 318 tokens e o tema claro no bloco `[data-tema="claro"]`; [tokens.json](../03-design-system/tokens.json) é gerado do CSS, com o valor do claro na extensão `mobs2.tema.claro` de cada cor. O claro não tem referência própria: confira a tela no escuro contra a referência, e o claro contra a paleta da folha 9 (o roteiro `claro` varre as cores de todas as telas).
- Movimento: [movimento.md](../03-design-system/movimento.md) e cada `animacao.md`.
