# O protótipo navegável

Vite + React 18, em JavaScript. As regras estão em [CLAUDE.md](../CLAUDE.md), a navegação em [logica.md](../logica.md) e os acessos de apresentação em [palco.md](../palco.md). O handoff de design, com as regras de todas as telas e como levar o design system pra outra stack, está em [08-handoff](../../08-handoff/README.md).

## Rodar

Execute nesta pasta:

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview    # http://localhost:4173
```

## Verificação local

```bash
npm run checar     # mock, tokens, receitas, regras locais e higiene do app
npm run tokens     # gera tokens.json a partir do CSS normativo
```

Com o servidor na porta 5173 e `npm run fotografo` aberto em outro terminal:

```bash
node scripts/caminho.mjs heroi
node scripts/caminho.mjs conferencia
node scripts/caminho.mjs familias
node scripts/testar-consultas.mjs
```

O último script verifica os exemplos especiais parados (25 quadros), os retornos ao percurso guardado e as três entradas normais do painel. Ele usa o Chrome do fotógrafo na escala 2.

Os roteiros rodam contra qualquer endereço: com `npm run preview` no ar, `BASE=http://localhost:4173/ node scripts/caminho.mjs heroi` anda pelo build de produção, o mesmo da Vercel, que minifica o CSS.

Há 51 roteiros em `scripts/caminhos`, e os 51 aprovam. O que cada um prova, e o estado da última execução completa (`node scripts/caminho.mjs todos`), estão em [testes-prontos.md](../../08-handoff/testes-prontos.md).

## Comparar o desenho

Mantenha o servidor e os dois fotógrafos em terminais separados: `npm run fotografo` (escala 2) e `npm run fotografo:1` (escala 1). Reutilize processos já abertos.

```bash
node scripts/tela.mjs todos T11       # somente as referências da T11
node scripts/tela.mjs todas           # 230 referências das 15 telas
node scripts/especime.mjs todos       # 129 espécimes comparáveis da vitrine
npm run print -- "http://localhost:5173/?tela=T01&print=1" prints/x.png
npm run comparar -- prints/x.png ../../02-telas/T01-login/referencias/png/00-tela.png
```

`?print=1` abre a referência congelada, sem o palco, e `&tema=claro` a abre no claro. O [guia de comparação](../../08-handoff/conferir-contra-o-design.md) explica a diferença entre comparação com HTML e PNG e as diferenças conhecidas.

## Fontes e publicação

O [mock](../../04-dados/mocks.js), os [tokens](../../03-design-system/tokens.css), as fontes e a marca em `05-recursos/` são consumidos das pastas de origem. A configuração de publicação está em [publicar.md](../publicar.md); na Vercel, incluir arquivos fora da Root Directory é obrigatório.

Nenhuma integração real acontece aqui. Dados, leituras, envio, câmera e persistência são simulados; o palco, suas sementes e os tempos de apresentação não devem ser levados para o produto.
