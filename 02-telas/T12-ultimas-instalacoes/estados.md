# T12 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | empresa Viação Atlântico Sul · as 13 instalações |
| `01-momento-detalhe-da-instalacao` | momento | tocar numa instalação | `instalacoes · i-01` |
| `02-estado-nenhuma-instalacao` | estado | a empresa não tem instalações | `instalacoes` |
| `03-estado-sem-rede` | estado | a consulta sem rede | `instalacoes-sem-rede` |
| `04-estado-criterio-indisponivel` | estado | o pacote não declara o parâmetro do critério — aqui, o modo de fila do módulo | `criterio-indisponivel` |
| `05-estado-criterio-pendente` | estado | o servidor não respondeu à consulta | `criterio-pendente` |

- no protótipo · a linha *02-estado-nenhuma-instalacao*: | `02-estado-nenhuma-instalacao` | estado | a empresa não tem instalações — a consulta volta vazia, e sem sessão | `instalacoes` + `instalacoes-vazia` |

- no protótipo · a linha *00-tela*: | `00-tela` | tela | a entrada da tela | empresa Viação Atlântico Sul · as 13 instalações · sessão M2C-0417 + RKT-8H42 |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

**No protótipo · a 04 e a 05**: o detalhe da instalação mais nova do ativo do caso — a-03, a PCX-9A17, a i-02 — com o `recebimento` do caso no lugar do da instalação, parado e sem toque, com a faixa da sessão do herói. O status geral sai dos critérios: *aguardando validação*. A seção *A INSTALAÇÃO* mostra as seis etapas da i-02, e a linha embaixo da placa, *Rafael Vieira*, como as duas referências desenham (ver `tela.md`). As receitas: `criterio-indisponivel` e `criterio-pendente` (`app/src/estado/receitas.js`).
