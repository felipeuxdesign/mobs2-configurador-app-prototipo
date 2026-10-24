# T14 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| troca de quadro | a fila do módulo drena (01 → 00); o prazo estoura; o ciclo conclui; tocar em `Disparar outro evento` | o antes do disparo, o prazo correndo, o prazo estourado e o ciclo concluído são desenhos diferentes — a frase da fila e a espera saem, a frase da Seção F entra, o rodapé troca inteiro: o conteúdo esmaece, como entre telas, pelo processo ou pelo toque; o que entra com o quadro (o disparo que acende, o último passo) não esmaece de novo por dentro | 150ms | desacelera | troca direta |
| botão Disparar | tocar em `Disparar evento de teste` | o primário desliga e diz *Aguardando o evento* até o evento chegar; aí acende *Encerrar o ciclo*, se ainda há passos pendentes · se o prazo estourar, a ação é *Disparar outro evento* — o toque duplo não encerra o ciclo | — | — | igual |
| barra do prazo | o evento foi disparado | drena da direita pra esquerda · no protótipo, 1s vale 4s de prazo; cada tique de 250ms é um trecho linear, o marcador e o preenchido juntos, só por transform | contínuo | linear | o número troca, a barra salta |
| barra do prazo | o evento chega | o preenchido para no ponto da chegada, com a borda lima, e o marcador branco segue o tempo (ref. 05: chegada em 80%, o marcador em 60%) · na vez do cartão (00) e no módulo leu (08) 60%, no cartão que não confere (10) e na vez da ignição desligada (11) 50% | — | — | igual |
| número do prazo | a cada segundo do prazo | troca no lugar | — | — | igual |
| fila do módulo | antes do disparo | uma linha fina de 4px, embaixo da frase da fila, esvazia — a ref. 01 é o quadro do meio · só transform · fina pra a lista dos passos caber | 3s | linear | salta pro fim |
| passo do veículo | o passo anterior vira check | o quadrado de agora nasce no poço do passo da vez, no mesmo tique: o título acende e a ação entra à direita — *passe o cartão*, *desligue a ignição* (sem a ré e sem a porta) · o cartão espera a resposta do técnico, e a ignição desligada vem 3 s depois dela · o instante da leitura do cartão é derivado de `tiqueDe`, e o passo final depende do tique da resposta do técnico, sem conclusão automática do cartão · antes do disparo e na falha da rotação, sem quadrado | 150ms | esmaece | troca direta |
| `Passar de novo` | tocar no botão da linha do cartão que não confere (ref. 10) | a linha volta ao *passe o cartão*, com o quadrado de agora no poço; o *não confere* e o botão saem esmaecendo, e a ação entra à direita | 150ms | desacelera | troca direta |
| disparado pelo app | o disparo | o horário entra esmaecendo, como o do recebido | 150ms | esmaece | aparece |
| linha do evento | o servidor recebe | o relógio vira o horário | 150ms | desacelera | troca direta |

- no protótipo: a cadência espera a resposta do cartão e segue `tiqueDe`.

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
