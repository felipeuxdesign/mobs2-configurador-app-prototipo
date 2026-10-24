# T02 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| marcador de escolha | tocar na linha | o quadrado lima surge no poço (opacidade e escala 80%→100%) | 150ms | desacelera | aparece |
| botão primário | a primeira escolha | o primário acende: o texto troca de *Escolha uma empresa* pra *Sincronizar*, no lugar, e o roxo troca direto · trocar a escolha não muda o texto | 150ms | desacelera | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
