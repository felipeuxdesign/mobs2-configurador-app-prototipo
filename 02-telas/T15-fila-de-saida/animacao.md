# T15 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| barra do item corrente | o envio corre | enche da esquerda, linear | contínuo | linear | salta |
| item enviado | o envio termina | esmaece e a lista fecha o espaço | 150ms + 200ms | desacelera | some |
| cartão que pede ação | tocar em `Ressincronizar e reenviar` | o cartão sai esmaecendo por cima, fora do fluxo; o rótulo e a lista sobem do lugar de antes ao novo, e as linhas que ficam deslizam dentro do cartão (translateY); o item que volta pra fila esmaece no lugar dele; nenhuma altura anima | 150ms | desacelera | troca direta |

- no protótipo: o envio não anda — a fila do aparelho não tem ritmo declarado, e o único quadro com o item subindo é um estado da coluna, parado (01): a barra do item corrente fica onde a referência a desenha, e nenhum item se envia. Quando houver ritmo declarado, a barra anda pela `Escala` (um trecho linear por passo, como o prazo da T14), e o item enviado sai como o cartão acima, com os 150 juntos

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
