# T15 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | fila com quatro itens · um com erro, um na fila e dois recebidos (um em conflito) |
| `01-estado-sem-erro` | estado | a fila sem erros | `filaSaida` |
| `02-estado-dois-erros` | estado | uma recusa do servidor e uma falha de rede | `filaSaida` |
| `03-estado-fila-vazia` | estado | nada esperando envio | `filaSaida` |
| `04-estado-secao-f-em-re-checagem` | estado | a Seção F esperando o servidor | `secaoF · RVM-1E54` |
| `05-estado-sem-rede` | estado | o aparelho sem rede: o `Ressincronizar` espera a rede, apagado | `sem-conexao-no-menu` · a fila da 00 |

- no protótipo · a linha *04-estado-secao-f-em-re-checagem*: | `04-estado-secao-f-em-re-checagem` | estado | a Seção F esperando o servidor | `secaoF · RVM-1E54`, sobre a fila vazia do `03` · a janela `criteriosRegra.recheckHoras` |

- no protótipo · a linha *03-estado-fila-vazia*: | `03-estado-fila-vazia` | estado | nada esperando envio | `filaSaida` · o caso `fila-vazia`: nenhum item, o último envio às 14:02, sem sessão |

- no protótipo · a linha *02-estado-dois-erros*: | `02-estado-dois-erros` | estado | dois itens recusados | `filaSaida` · o recorte `fila-dois-erros`: f-10, f-09, f-02, f-08 |

- no protótipo · a linha *01-estado-sem-erro*: | `01-estado-sem-erro` | estado | a fila sem erros | `filaSaida` · o recorte `fila-sem-erro`: o f-04 subindo, o f-01 na fila, e o f-05, o f-06 e o f-07 recebidas |

- no protótipo · a linha *00-tela*: | `00-tela` | tela | a entrada da tela | a seleção f-10, f-02, f-08 da semente: dois itens esperando, um com erro, e uma recebida |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

## As regras dos estados

- **o prefixo da recusa:** `o servidor recusou ·` só aparece quando o cartão tem mais de um erro, como no `02`. Com um erro só, o cartão diz só a causa, como no `00`
- **o rótulo do cartão** vem da contagem de erros: um, `UM PRECISA DE VOCÊ`; dois, `DUAS COM ERRO`. A legenda `Só a primeira precisa de você. A segunda reenvia sozinha.` só aparece com a recusa e o erro de rede juntos
- **o contador** conta todos os itens mostrados, pendentes e recebidos: 4 no `00`, 5 no `01`, 4 no `02`, 0 no `03` e no `04`. A Seção F não entra na conta: não é item de fila (HU-T15-5)
- **a sessão:** no `01` e no `02`, a sessão que o fluxo tem aberta, com ativo; sem ela, a do herói, como as referências desenham; no `03` e no `04`, nenhuma — a faixa sem sessão
- **a Seção F** aparece só no `04`, em seção à parte, com a janela da re-checagem (`confere em 24 h`). No fluxo e nos outros estados, nenhuma referência a desenha. A i-06, há 9 dias em re-checagem, contra a janela de 24 h, está em aberto

**No protótipo** (decisão 42): a fila é do aparelho, e o recorte de cada estado cruza empresas sem contradição — o `01` e o `02` são o que o aparelho tem. O recorte aparece inteiro, e não só o topo que a referência desenha: no `01`, a quinta linha, a *Checklist · PCX-9A17 · recebida · ontem 16:40*, entra embaixo. O `03` e o `04` leem o caso `fila-vazia`, que é do design (o *14:02*); o protótipo só acrescenta a fila vazia e a sessão. O recebido de mais de um dia diz o dia: *10/03, 10:05* no `00` e no `02` (a referência do `02` diz *ontem 10:05*).

