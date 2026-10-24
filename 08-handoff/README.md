# O handoff de design

Esta pasta é o handoff do design pro desenvolvimento: por onde começar cada tarefa, as regras que valem em todas as telas, como levar o design system pra outra stack, os testes prontos e como conferir o produto contra o desenho. O [protótipo navegável](https://configurador-mobs2-prototipo.vercel.app) permite experimentar o uso; comportamento, textos, medidas e referências estão nas fontes deste repositório. A stack fica a cargo do time: tudo aqui vale pra qualquer uma, e onde a plataforma muda a tradução, [a seção do design system](#levar-o-design-system-pra-sua-stack) diz como.

A integração com o módulo, o servidor e o aparelho, o contrato dos serviços e as perguntas que o produto ainda decide ficam com o time do produto.

O censo: **15 telas · 230 referências** (15 entradas, 129 momentos e 86 estados) · **110 histórias · 318 tokens · 117 peças de design · 9 folhas · 64 decisões · 69 casos de mock** · **dois temas**: o escuro, padrão, e o claro, neutro frio, escolha do técnico na folha da Conta, nascido dos tokens (leis R-16 a R-24) · o logo pelo token `--logo`. A vitrine do protótipo tem 129 espécimes comparáveis, incluindo variantes. Os 51 roteiros de navegação têm o estado de validação descrito em [testes-prontos.md](testes-prontos.md).

## Por onde começar, pela tarefa

| Vai… | Leia, nesta ordem |
|---|---|
| **entender o produto** | [história](../01-produto/historia.md) → [usuário](../01-produto/usuario.md) → [domínio](../01-produto/dominio.md) → [110 histórias](../01-produto/historias.md) → [fluxos](../01-produto/fluxos.md) |
| **montar a navegação e o estado** | [as regras de todas as telas](#as-regras-de-todas-as-telas) → [as máquinas de estado do domínio](../01-produto/dominio.md#4-as-máquinas-de-estado-que-decidem-tela) → [fluxos](../01-produto/fluxos.md), com a tabela dos desvios → [a lógica do protótipo](../06-prototipo/logica.md) |
| **construir uma tela** | a pasta dela em [02-telas](../02-telas/) (`tela.md`, `estados.md`, `animacao.md`, `textos.md`) → cada HTML e PNG da tela → [componentes](../03-design-system/componentes.md) → [os casos do mock](../04-dados/casos.md) |
| **montar o design system** | [tokens.css](../03-design-system/tokens.css) → [tokens.json](../03-design-system/tokens.json), gerado do CSS → [leis](../03-design-system/leis.md) → [componentes](../03-design-system/componentes.md) → [movimento](../03-design-system/movimento.md) → [nove folhas de referência](../03-design-system/referencias/) → [os 48 ícones](../03-design-system/icones/) → [a fonte, a marca e o cenário do sistema](../05-recursos/README.md) → [levar pra sua stack](#levar-o-design-system-pra-sua-stack) |
| **conferir os dados** | [mock](../04-dados/mocks.js) → [os casos](../04-dados/casos.md) → [checagem de cobertura](../04-dados/checar-cobertura.js) |
| **testar** | [testes prontos](testes-prontos.md) → [conferir contra o design](conferir-contra-o-design.md) |
| **entender uma escolha** | [64 decisões](../07-decisoes/README.md), observando as notas de decisões revistas ou superadas |

## O que é norma

- Comportamento de cada tela, momento e estado: `tela.md` e `estados.md` em [02-telas](../02-telas/).
- Textos exatos: o `textos.md` de cada tela. O que está entre crases é o texto da interface, escrito com os dados do mock no lugar das variáveis (a placa, o serial, as contagens). Os modelos, com as variáveis, os plurais e os números por extenso, estão no `textos.js` de cada tela, em [app/src/telas](../06-prototipo/app/src/telas/); as datas, as idades e os números, em [formato.js](../06-prototipo/app/src/dados/formato.js).
- Medidas, cores e tamanhos: [tokens.css](../03-design-system/tokens.css), sem valores soltos.
- Leis visuais e de produto: [leis.md](../03-design-system/leis.md).
- Movimento: [movimento.md](../03-design-system/movimento.md) e cada `animacao.md`.
- Regras e histórias: [domínio](../01-produto/dominio.md) e [histórias](../01-produto/historias.md).
- Aparência: os 230 pares HTML/PNG listados no [índice](../02-telas/indice.json).

As decisões superadas em [07-decisoes](../07-decisoes/) não valem mais, e as revistas valem na forma da revisão: seis passos com ré e porta, a calibração obrigatória no ônibus, a comparação do cartão com o cadastro e a escolha da unidade dentro da empresa foram substituídos. As regras atuais estão nas fichas das telas e na tabela abaixo.

## As regras de todas as telas

O que vale em toda tela, e não se repete em cada ficha:

| Regra | O que o app faz | Onde está |
|---|---|---|
| **Só o toque** | normal, pressionado e desabilitado: nada de hover, e nenhum foco de teclado desenhado, porque o leitor de tela desenha o dele | [leis](../03-design-system/leis.md), R-12 |
| **Toque de 48, a 8 de tudo** | todo tocável tem 48 de toque, e o primário, 56; o desenho pode ser menor, e a área cresce por fora, pro lado livre | [leis](../03-design-system/leis.md), leis de medida |
| **Nome em todo tocável** | o leitor de tela lê o texto da tela; o tocável que é só ícone ganha um nome | [as regras de construção](../06-prototipo/CLAUDE.md), 6 e 7 |
| **Sempre em retrato** | o app não gira | [lógica](../06-prototipo/logica.md#o-retrato-regra-11) |
| **O teclado não esconde o que importa** | a tela rola pra deixar o campo em foco e o primário acima do teclado; o campo do painel (T10) abre o numérico | [lógica](../06-prototipo/logica.md#o-teclado-regra-10) |
| **Nenhum botão aceso que não faz nada** | o que não pode agir fica desabilitado de verdade, em tinta apagada, com o motivo escrito; a permissão que o Android não deixa pedir de novo vira `Abrir as configurações` | lei 17, [lógica](../06-prototipo/logica.md#nenhum-botão-aceso-que-não-faz-nada-regra-12) |
| **O voltar do Android** | a folha ou o diálogo aberto fecha primeiro; sem eles, vale a saída desenhada da tela; num processo que não pode parar, nada; e ele nunca deixa o técnico preso | [lógica](../06-prototipo/logica.md#o-voltar-do-android), [decisão 64](../07-decisoes/64-toda-espera-tem-fim.md) |
| **A folha fecha de quatro jeitos** | no xis (ou no `Cancelar`, na confirmação), tocando fora, arrastando pra baixo e no voltar | lei 20, [lógica](../06-prototipo/logica.md#a-folha-que-fecha-lei-20) |
| **Um toque não vale por dois** | o primário que nasce de um toque só responde 300 ms depois, o tempo do toque duplo do Android | [movimento](../03-design-system/movimento.md), [lógica](../06-prototipo/logica.md#o-primário-que-nasce-de-um-toque) |
| **Toda espera tem fim** | todo processo tem um tempo limite e, passado ele, um desfecho com o que conferir e a ação | [decisão 64](../07-decisoes/64-toda-espera-tem-fim.md) |
| **O que se perde pergunta antes** | sair da conta, trocar de empresa ou encerrar com a sessão aberta, descartar a sessão interrompida e sair com o que aconteceu escrito perguntam, e dizem o que fica | [decisão 36](../07-decisoes/36-encerrar-pede-confirmacao.md), [decisão 64](../07-decisoes/64-toda-espera-tem-fim.md) |
| **A resposta se refaz** | o bip (`Testar de novo`), o cartão (`Passar de novo`), o número semeado (*toque pra corrigir*) e o servidor que ainda não respondeu (`Conferir de novo`) se refazem na hora | [decisão 64](../07-decisoes/64-toda-espera-tem-fim.md) |
| **O mesmo fato se diz igual** | a fila do aparelho conta o mesmo número em toda tela, e o pacote diz a idade e se venceu do mesmo jeito | [decisão 64](../07-decisoes/64-toda-espera-tem-fim.md), [lógica](../06-prototipo/logica.md#os-contadores-do-menu-t041-t042) |
| **O ENCERRAR sempre à vista** | na faixa da sessão, em toda tela; apagado nos processos que não podem parar | lei 17, [lógica](../06-prototipo/logica.md#encerrar) |
| **O estado muda o conteúdo, nunca o desenho** | título, faixa e rodapé ficam no lugar; nada de animar a entrada da tela, contar de zero ou animar em loop; o dado ao vivo troca o número no lugar | lei 3, [movimento](../03-design-system/movimento.md) |
| **Reduzir movimento** | com a opção do Android que remove as animações, tudo troca direto, e os processos seguem no mesmo ritmo | [movimento](../03-design-system/movimento.md) |
| **Os dois temas** | o app nasce escuro; o claro é a linha *Modo claro* da folha da Conta, lembrada no aparelho, e troca só as cores dos tokens | R-16 a R-24, [lógica](../06-prototipo/logica.md#o-tema) |
| **O técnico lê negócio** | nada de tecnologia, protocolo ou código na tela; a exceção é a APN, que ele confere | [decisão 51](../07-decisoes/51-a-apn-aparece.md), [domínio](../01-produto/dominio.md) |
| **A evidência é gerada pelo app** | o que o app comprova, o técnico não marca à mão | [domínio](../01-produto/dominio.md), princípio 6 |

## O que é só do protótipo

- Pessoas, placas, seriais e números do mock: seus formatos e relações orientam o contrato; os valores são exemplos.
- Cadências simuladas de processos. No produto, leituras e respostas vêm das integrações reais. A exceção é a espera do toque duplo, 300 ms, que é regra do produto (acima).
- Relógio do produto congelado em 14:30; o 9:30 da barra é arte do Android.
- Barras do sistema desenhadas: o aparelho apresenta as suas, conforme a lei 22.
- Palco, painel, moldura do celular, sementes, coluna de consultas, a linha *Modo claro* do painel e a data de atualização no pé dele. A linha *Modo claro* da folha da Conta é do produto (R-16).
- Login com a senha de exemplo preenchida ao terminar a recuperação, para seguir a demonstração; não salva a nova senha.
- Estado mantido em memória durante a navegação. O protótipo não implementa armazenamento durável nem envio real.
- *Padrão do protótipo*, nas fichas: o que o protótipo escolheu onde nenhuma referência ou regra decide. Confirme com o produto antes de levar.

No palco, o painel abre o contexto do caminho normal; exemplos especiais ficam em **Estados desta tela**, parados. Isso facilita a inspeção e não remove os estados que o produto precisa implementar quando a condição real acontecer.

## Levar o design system pra sua stack

- **Medidas.** 1 px do design é 1 dp. A tela de referência tem 360 × 800 dp, e o PNG, a 2×, 720 × 1600 px. Os tamanhos de texto estão em valores fixos; se o app acompanha a fonte aumentada do Android é pergunta do produto.
- **Tokens.** O [tokens.json](../03-design-system/tokens.json) segue o formato de tokens de design (DTCG), gerado do CSS, com o valor do claro na extensão `mobs2.tema.claro` de cada cor. Três valores são texto de CSS: `mov-curva`, `cubic-bezier(0.2, 0.8, 0.2, 1)`, cujos quatro números servem a qualquer curva de Bézier (o `PathInterpolator` do Android, o `Cubic` do Flutter); e `idade-preenchido` e `rolagem-cor`, apelidos de `--borda-poco` e `--tinta-apagada`: use o valor do token apontado. Os tempos vêm em milissegundos (`150ms`); quem lê um tempo do CSS em execução lê a unidade, porque o build minificado o escreve em segundos (`.15s`).
- **Fonte.** A Barlow, nos pesos 400, 500, 600 e 700, com a licença livre (OFL) em [05-recursos/fontes](../05-recursos/fontes/). O repositório traz os woff2 latinos, da web; numa stack nativa, use os TTF da mesma família e dos mesmos pesos. A Google Sans da hora é só do cenário da barra do sistema, que o produto não desenha.
- **Ícones.** São 48 SVG em [03-design-system/icones](../03-design-system/icones/), 45 na grade de 24 e 3 na de 20, com a cor do token. O traço muda com o uso (lei 14): 2,2 nos glifos de estado, 1,8 nas ferramentas e nas folhas, 2,6 abaixo de 14 px; num formato vetorial nativo, que fixa o traço no arquivo, isso vira uma variante por traço. Quatro ícones riscados (`bluetooth-desligado`, `camera-sem-permissao`, `olho-riscado` e `sem-rede-no-login`) separam o risco com um fio na cor do `--poco` (lei 21): troque a variável pelo valor do token em cada tema.
- **Movimento.** Os tempos e a curva saem dos tokens `--mov-*`. *Reduzir movimento* é a opção do Android que remove as animações: com ela, tudo troca direto, e os processos seguem no mesmo ritmo.
- **Barras do sistema.** São as do aparelho (lei 22). O app desenha por trás delas, de ponta a ponta: a barra de status leva a cor da superfície de baixo (R-23), e no claro os ícones dela escurecem (R-19).
- **Componentes.** As 117 peças do [componentes.md](../03-design-system/componentes.md) são as peças da sua biblioteca; o [mapa das peças](../06-prototipo/app/src/ds/MAPA.md) diz qual componente do protótipo constrói cada uma, com as variantes, pra ler o comportamento em código.

## A stack

Os tokens, textos e referências usam CSS, JSON, Markdown, HTML e PNG; o comportamento é descrito em linguagem de produto. A implementação real ainda precisa conectar essas fontes ao módulo, ao servidor, às permissões e ao armazenamento do aparelho.

O protótipo é uma implementação de referência, em camadas que valem em qualquer stack:

| Camada | No protótipo | No produto |
|---|---|---|
| as peças | o design system, uma vez, usado por todas as telas ([app/src/ds](../06-prototipo/app/src/ds/)) | a biblioteca de componentes, construída antes das telas |
| as telas | cada uma montada só com as peças, lendo o estado e os dados ([app/src/telas](../06-prototipo/app/src/telas/)) | as telas, com os mesmos estados de cada ficha |
| as regras | funções puras, sem interface — um arquivo por tela, ao lado dela (o `regras.js` da T01, o `cadeia.js` da T09, o `calibracao.js` da T10, o `checklist.js` da T13, o `ciclo.js` da T14, o `dados.js` das outras), e o [estado único](../06-prototipo/app/src/estado/) da sessão —, testadas pelo `npm run checar` | a lógica de domínio, testável sem aparelho |
| os dados | o [mock](../04-dados/mocks.js), pela ponte de [app/src/dados](../06-prototipo/app/src/dados/) | os adaptadores do módulo, do servidor e do aparelho |

Pra portar a regra de uma tela, comece por esse arquivo dela: ele diz o que a tela mostra em cada condição, sem nada de desenho.
