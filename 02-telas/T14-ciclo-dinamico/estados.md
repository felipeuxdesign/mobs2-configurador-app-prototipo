# T14 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a referência da vez do cartão, depois do disparo; a entrada normal é a fila drenando (`01`) | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
| `01-momento-antes-do-disparo` | momento | a fila do módulo ainda drenando | `ciclo.mensagensGuardadas` |
| `02-estado-prazo-estourado` | estado | o evento não chega em 2:00 | `evento-sem-resposta` |
| `03-estado-dinamico-fora-do-esperado` | estado | a rotação não aparece: o motor está desligado | `motor-desligado-no-ciclo` |
| `05-momento-ciclo-concluido` | momento | os quatro passos do herói aprovados e o evento conferido | `ciclo` |
| `09-estado-segunda-falha-do-evento` | estado | o evento não chega pela segunda vez: confira a conexão do módulo · *padrão, até o produto decidir* | `evento-nao-chega-de-novo` |
| `08-momento-o-modulo-leu-o-cartao` | momento | passar o cartão: o módulo leu 9412857 · Confere com o cartão ou Não confere | `ciclo` |
| `10-momento-cartao-nao-confere` | momento | tocar em Não confere: não conforme, com a justificativa no checklist · `Passar de novo` na linha | `ciclo` |
| `11-momento-vez-da-ignicao-desligada` | momento | o cartão confere: a vez da ignição desligada, com a explicação | `ciclo` |
| `12-estado-ativo-sem-leitor` | estado | o ativo sem leitor: 3 passos | `sem-leitor` |

- no protótipo · a linha *01-momento-antes-do-disparo*: | `01-momento-antes-do-disparo` | momento | a entrada da tela: a fila do módulo ainda drenando | `ciclo.mensagensGuardadas` |

- no protótipo · a linha *00-tela*: | `00-tela` | tela | 6 s depois do disparo: o prazo em 1:36, o instante antes de o evento chegar (a entrada é a `01`) | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
