# O design system

**A identidade em três linhas:** um painel de instrumentos de ônibus, no escuro. Lima sobre roxo, reservado ao veredito, ao escolhido e ao texto do botão primário (no claro, o lima vira roxo e o texto do primário fica branco). Os números leem como mostrador: tabulares, com a unidade ao lado.

| Arquivo | O que tem |
|---|---|
| [tokens.css](tokens.css) · [tokens.json](tokens.json) | 318 tokens de cor, tipo, espaço, medida e movimento, e o tema claro: as 49 cores que mudam no claro, cada uma com o par dela no bloco `[data-tema="claro"]` do CSS e na extensão `mobs2.tema.claro` no JSON. O CSS é a norma; o JSON é gerado dele por `npm run tokens`, na pasta `06-prototipo/app`. |
| [leis.md](leis.md) | As leis visuais, as de medida (com *O texto de apoio tem 16 de altura de linha*) e as regras de produto R-01 a R-24 (as do modo claro, R-16 a R-24: o rebaixado e o poço, o botão no rebaixado, o andamento e a barra de status), com as revisões declaradas. |
| [movimento.md](movimento.md) | Movimento das peças e cadência de apresentação dos processos. No produto, as leituras dependem do equipamento e dos serviços. |
| [componentes.md](componentes.md) | 117 peças normativas nas nove folhas, com o interruptor, o avatar da conta, o logo, o tracinho vazio e o tracejado do vazio; em seção própria, as variantes medidas na construção do protótipo. |
| [referencias/](referencias/) | Nove folhas do design system, em HTML e PNG · as peças da manutenção e do rodapé moram nas folhas da família delas: o rodapé e a folha de confirmação na 2, a linha revisar em seguida e o cartão dos dependentes na 4, o botão secundário e o botão da linha na 6 · a sétima, com a câmera do app com a foto e as fotos de exemplo do protótipo · a nona, *Tema escuro e claro*, com a paleta do claro neutro frio, o interruptor e a seção *As superfícies do claro*: o poço e o rebaixado, o botão no rebaixado, o andamento, o andamento no alerta e o interruptor desligado. |
| [icones/](icones/) | **os 48 ícones do app**, as setas das linhas inclusive, um SVG por desenho, com a cor do token · o `README` diz onde cada um aparece · o ícone é este desenho, nunca o parecido de uma biblioteca (lei 14) |
| [claro-amostras/](claro-amostras/) | **26 telas no claro, pra conferir** · não são referências oficiais: são o gabarito das regras do claro que dependem do lugar · o `README` diz o que conferir em cada uma |

**Censo atual:** 15 telas e 230 referências de tela, separadas das folhas de componentes. O catálogo normativo tem 117 peças (o *botão da linha* entrou na folha 6); a vitrine do protótipo possui 129 espécimes comparáveis, incluindo estados e grupos de átomos. Peça, variante e espécime são contagens diferentes.

**Dois temas.** O escuro é o padrão; o claro, neutro frio, no espírito da Linear, é escolha do técnico na folha da Conta (a linha *Modo claro*, T04/05) ou no pé da sidebar do palco, lembrada no aparelho, inclusive no login. O logo segue o token `--logo`: lima no escuro, o roxo institucional no claro. As cores dos dois estão no `tokens.css`, o claro no bloco `[data-tema="claro"]`, e no `tokens.json`, como extensão de cada cor. A folha 9 mostra a paleta do claro, no formato da folha 1 · as telas do claro não são desenhadas: nascem das do escuro, trocando os tokens. No protótipo, ligar o claro é pôr `data-tema="claro"` na raiz do app.

As 25 cores nomeadas vêm do CSS: 6 fundos, 7 bordas, 4 tintas, 4 cores fora de texto e 4 de ação. **Toda medida é por dentro:** o poço de 24 tem 24, o botão de 56 tem 56, e a linha de 38 tem 38.

Para implementar, leia a referência da tela, o componente e sua variante medida. O [mapa das peças](../06-prototipo/app/src/ds/MAPA.md) indica o componente usado no protótipo; o [guia de comparação](../08-handoff/conferir-contra-o-design.md) explica como conferir o resultado. O histórico das contagens e medições está no [CHANGELOG](../CHANGELOG.md).
