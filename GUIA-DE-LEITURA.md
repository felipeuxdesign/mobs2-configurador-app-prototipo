# Guia de leitura

O [README](README.md) diz o que é o projeto, mostra o protótipo e explica como rodar. Este guia diz o que ler depois, e em que ordem, conforme o que você veio fazer.

## O caminho de cada leitor

| Se você vai… | Leia, nesta ordem |
|---|---|
| **avaliar o projeto** (recrutamento, liderança) | [o protótipo navegável](https://configurador-mobs2-prototipo.vercel.app) → [o produto em uma página](01-produto/historia.md) → [as decisões](07-decisoes/README.md) → [como foi construído](PROCESSO.md) |
| **escrever sobre o projeto** (um case, uma apresentação) | [o README](README.md), com o papel, os números e [o material do projeto](README.md#o-material-do-projeto) → [o produto em uma página](01-produto/historia.md) → [quem usa](01-produto/usuario.md) → [as decisões](07-decisoes/README.md) → [o método](PROCESSO.md) → [as versões](CHANGELOG.md) |
| **ver o código** | [o protótipo](06-prototipo/app/README.md) → [o mapa das peças](06-prototipo/app/src/ds/MAPA.md) → [os tokens](03-design-system/tokens.css) → [os testes prontos](08-handoff/testes-prontos.md) |
| **entender o produto** | [o produto em uma página](01-produto/historia.md) → [quem usa](01-produto/usuario.md) → [as histórias](01-produto/historias.md) → [os fluxos](01-produto/fluxos.md) → [as decisões](07-decisoes/README.md) |
| **construir o produto** | [o handoff de design](08-handoff/README.md) → [o domínio](01-produto/dominio.md) → [as telas](02-telas/README.md) → [o design system](03-design-system/README.md) → [os dados](04-dados/README.md) → [as decisões](07-decisoes/README.md) |
| **construir ou mudar o protótipo** | [o produto](01-produto/historia.md) → [as telas](02-telas/README.md), cada uma inteira → [o design system](03-design-system/README.md) → [os dados](04-dados/README.md) → [o protótipo](06-prototipo/app/README.md) · com um agente de IA, ele começa pelo [`CLAUDE.md`](CLAUDE.md) e pelo [`06-prototipo/CLAUDE.md`](06-prototipo/CLAUDE.md) |
| **entender como foi feito** | [o método](PROCESSO.md) → [as versões](CHANGELOG.md) → [as decisões](07-decisoes/README.md) |

## As três fontes, e quem ganha

**A referência diz como parece. O mock diz o que aparece. A documentação diz por quê.** Quando duas discordam, **o mock ganha** sobre o dado e **a referência ganha** sobre a aparência, e a divergência é nomeada, nunca resolvida em silêncio.
