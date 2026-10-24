# T05 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| lista de módulos | a busca acha | cada linha surge esmaecendo, uma depois da outra | 150ms · 80ms entre elas | desacelera | aparecem juntas |
| busca de novo | tocar em `Procurar de novo` | a lista some e a tela vira o *Procurando…* (ref. 05) — o poço com o quadrado de agora, o botão desligado —, e a lista volta · 400ms passaria sem o técnico ver que buscou | 1,2s | — | igual |
| conectar | tocar em `Conectar ao …`, ou no `Tentar de novo` da 04 | o primário desliga e diz *Conectando ao M2C-0417…* (ref. 06), e o `Procurar de novo` apaga; depois vem a T07, ou o *NÃO RESPONDEU* da 04 — no aparelho, o tempo real da conexão | 1,2s | — | igual |
| conexão confirmada | o módulo responde | o traço lima se desenha embaixo da linha marcada, da esquerda pra direita, e o botão diz *Conectado ao M2C-0417* (ref. 07) · depois, a troca normal pra T07 · na falha, sem traço: a linha diz *não respondeu* (ref. 04) | 300ms (`--mov-lento`) | desacelera | aparece já desenhado |

- no protótipo · a linha *lista de módulos*: | lista de módulos | a busca acha — a lista que volta da busca de novo | cada linha surge esmaecendo, uma depois da outra; ao abrir, a lista já está lá, parada | 150ms · 80ms entre elas | desacelera | aparecem juntas |

- no protótipo · a linha *troca de quadro*: | troca de quadro | tocar em `Procurar de novo`; a lista que volta | a lista e o escolhido são um desenho só; a troca de quadro é entre a lista e o *Procurando…*, o vazio e o Bluetooth: quando um vira o outro, o conteúdo esmaece, como entre telas; a barra fica parada; o rodapé entra com o quadro, e o texto do primário não esmaece de novo por dentro | 150ms | desacelera | troca direta | — o `Procurar outro módulo` chega da T07, e o `Conectar ao …` e o `Tentar de novo` levam à T07: troca de tela, não de quadro

- no protótipo · a linha *marcador de escolha*: | marcador de escolha | tocar num módulo da lista | o quadrado lima surge no poço (opacidade e escala 80%→100%); o que perde a marca faz o contrário | 150ms | desacelera | aparece |

- no protótipo · a linha *botão primário*: | botão primário | tocar num módulo, ou noutro por perto | o texto troca pro serial do módulo, no lugar; o roxo troca direto | 150ms | desacelera | troca direta |

- no protótipo · a faixa de sessão não desce nesta tela: a sessão nasce na conexão, e a faixa desce na T07, quando as nove linhas passam sem trava (decisão 44)

- no protótipo: a busca de novo são duas trocas de quadro e uma cascata — no toque, o conteúdo esmaece pro *Procurando…* (05) em 150; aos 1,2 s, a lista volta: a frase e o rodapé esmaecem em 150, e as cinco linhas surgem em cascata

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
