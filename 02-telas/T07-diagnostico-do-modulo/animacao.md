# T07 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| faixa de sessão | as nove linhas foram lidas e não há trava | desce de cima (translateY -100%→0) e o conteúdo desce junto; o rodapé troca no mesmo acontecimento | 200ms | desacelera | aparece |
| atualização do firmware | tocar em `Atualizar firmware` | o quadro dos 62% (ref. 06) fica 1s, e o diagnóstico relê · não há quadro dos 100% · a que não termina (ref. 14) troca o *atualizando · 62%* pelo *parou em 62%* e o xis no lugar, sem mexer em nada | 1s | linear | troca direta |
| linha do módulo ou da CAN | a leitura daquela linha começa | o poço mostra o quadrado branco de agora e o valor diz *lendo*; as seguintes esperam com o relógio e o traço · sem a faixa, e o rodapé desligado *Lendo · não saia da tela* (ref. 11) | — | — | igual |
| linha do módulo ou da CAN | a leitura chega | o poço troca pro estado — check, informação ou falha — e o valor aparece no lugar · 600ms por linha, também nos sinais da CAN no `Ler de novo` | 150ms | esmaece | troca direta, mesmo ritmo |
| contador do título | cada linha que fecha certa | a contagem sobe no lugar, ao lado do título — `4 de 8` na ref. 11 | — | — | igual |
| aviso da trava | a última das nove linhas fecha e há uma trava | o aviso esmaece no lugar e empurra o bloco do módulo pra baixo | 150ms | desacelera | aparece |
| sinais da CAN ao vivo | a CAN lida, com o motor ligado (ref. 01) | rotação e temperatura trocam o número no lugar a cada leitura, pela lista `leituras` do mock, **sem transição** · hodômetro, horímetro, combustível e consumo total ficam parados: o ônibus está parado, e o consumo total é acumulado | 1s | — | param no último valor · parados também no print, na coluna do palco e no `Ler de novo` |

- no protótipo: a CAN ao vivo lê a lista `leituras` de cada sinal no mock, uma por segundo (`ritmos.js` · `canAoVivoMs`), e percorre a lista em ordem; o número troca sem transição (a peça não esmaece quando só o valor muda) · com reduzir movimento, no print, num estado da coluna e no `Ler de novo`, parados

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
