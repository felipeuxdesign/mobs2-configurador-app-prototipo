# As telas

Uma pasta por tela. Dentro de cada uma, sempre os mesmos cinco itens:

| Arquivo | O que tem |
|---|---|
| `tela.md` | a função, o elemento-assinatura, o chrome, os toques, as peças do design system e as histórias |
| `estados.md` | cada momento e estado: como se chega, o que causa, e o caso do mock que produz |
| `animacao.md` | cada elemento que se move: quando, o quê, quanto tempo, que curva, e o que faz com reduzir movimento |
| `textos.md` | os textos exatos de cada referência, na ordem |
| `referencias/` | `html/` e `png/` com o mesmo nome · **o número diz a ordem, a palavra diz o tipo** |

**Tela** é a referência da entrada ou do quadro base. **Momento** é aonde se chega tocando. **Estado** depende do mundo — módulo, ônibus, rede. Esses tipos classificam as referências; não determinam sozinhos os acessos do palco.

No protótipo, **Estados desta tela** também oferece momentos e quadros base como consultas paradas, conforme `indice.json` (`coluna`, `consulta`, `depoisDe` e `colunaNoFim`). A consulta preserva o desenho e não recebe toque, relógio ou gravação. **Voltar ao fluxo** restaura o percurso anterior. O painel e o endereço simples abrem a entrada normal; a fotografia com `print=1` conserva o gabarito. Em cada tela, as regras vêm antes das notas do protótipo.

| Tela | Pasta | Momentos | Estados |
|---|---|---|---|
| T01 · Login | `T01-login/` | 15 | 8 |
| T02 · Selecionar contexto | `T02-selecionar-contexto/` | 1 | 0 |
| T03 · Sincronizar | `T03-sincronizar/` | 1 | 4 |
| T04 · Menu | `T04-menu/` | 13 | 7 |
| T05 · Conectar módulo | `T05-conectar-modulo/` | 5 | 7 |
| T06 · Selecionar ativo | `T06-selecionar-ativo/` | 3 | 4 |
| T07 · Diagnóstico do módulo | `T07-diagnostico-do-modulo/` | 4 | 10 |
| T09 · Configurar módulo | `T09-configurar-modulo/` | 24 | 11 |
| T10 · Calibração | `T10-calibracao/` | 7 | 5 |
| T11 · Conferir configuração | `T11-conferir-configuracao/` | 5 | 2 |
| T12 · Últimas instalações | `T12-ultimas-instalacoes/` | 1 | 4 |
| T13 · Checklist | `T13-checklist/` | 37 | 12 |
| T14 · Ciclo de testes | `T14-ciclo-dinamico/` | 5 | 4 |
| T15 · Fila de saída | `T15-fila-de-saida/` | 0 | 5 |
| T16 · Sessão | `T16-sessao/` | 8 | 3 |

`indice.json` lista as 230 referências (15 telas, 129 momentos e 86 estados) com tela, tipo, nome, título, como se chega, caso do mock e os caminhos do HTML e do PNG. **É o que o palco lê pra montar a coluna.**

**As referências são gabarito, nunca peça do app.** O HTML existe pra você ler um valor exato e pra comparar o seu print com o PNG. O app se constrói com os componentes do design system.
