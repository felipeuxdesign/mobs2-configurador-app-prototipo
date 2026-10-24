# T03 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| barra de download | a sincronização correndo | enche da esquerda (scaleX), linear: 4s no total, uns 82ms por item nos 49 da Viação Atlântico Sul · o *faltam ~1 min* da 00 sai do `segPorItem` 1,6 | 4s | linear | salta pro fim |
| contagem | cada bloco baixado | o número troca no lugar | — | — | igual |
| check de concluído | cada grupo termina de baixar — na Viação Atlântico Sul, os ativos no 24º item, as conexões no 26º, os modelos no 29º, os eventos no 41º e as cercas, o último, no 49º, no fim do download | o check surge no poço, por opacidade, no lugar do glifo de antes | 150ms | desacelera | aparece |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
