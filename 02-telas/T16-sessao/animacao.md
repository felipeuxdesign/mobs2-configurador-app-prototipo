# T16 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| passo do encerramento | cada passo conclui | o quadrado de agora vira check · ritmo 600ms; o trilho troca direto, não acende; o quadrado de agora do passo seguinte esmaece no poço junto, como o check (a peça) | 150ms | desacelera | troca direta |
| legenda do passo que corre | o passo seguinte começa | a legenda passa ao passo que corre e esmaece no lugar; a do que fechou sai de uma vez, e o espaço muda direto — as linhas de baixo não deslizam | 150ms | desacelera | troca direta |
| botão primário | o reinício automático começa e termina (01), ou a conexão cai durante ele (08) | o texto do primário apagado troca no lugar: `Reiniciando o módulo…` (ou `Reconectando…` na 08), e de volta `Encerrando · não desconecte` | 150ms | desacelera | troca direta |
| o corte | o passo 2 num módulo que não reinicia por comando (ref. 09) | o glifo da energia entra no poço no lugar do quadrado de agora, e a legenda e o *com você* entram no lugar, esmaecendo; o primário apagado diz *Esperando o módulo religar…* · o módulo de volta, o glifo vira check, como todo passo que fecha | 150ms | desacelera | troca direta |
| o módulo que não volta | o tempo limite do reinício passa (ref. 10) | o xis entra no poço, o *não voltou* e a legenda entram no lugar, e o rodapé apagado dá lugar às duas ações: o texto novo esmaece no lugar, e o roxo troca direto | 150ms | desacelera | troca direta |
| diálogo de descartar | tocar em `Descartar` na sessão interrompida (ref. 11) | o diálogo e o véu esmaecem, e a caixa cresce de 98% a 100%, como todo diálogo; fecha do mesmo jeito | 150ms | desacelera | aparece |
| troca de quadro | o último passo fecha: a sessão encerra, com ou sem homologar (00 → 02, 03 → 04) | o encerramento e a sessão encerrada são desenhos diferentes: o conteúdo esmaece, como entre telas, pelo processo; o rodapé entra com o quadro; a faixa sobe junto (a linha de baixo) | 150ms | desacelera | troca direta |
| assertiva do autoteste | cada leitura chega | a linha da vez mostra o quadrado branco de agora e diz *conferindo*; as seguintes esperam com o relógio e o traço; os contadores separados acompanham as assertivas que já chegaram; o veredito só entra no fim (ref. 07) · 400ms por assertiva | 150ms | desacelera | troca direta, mantendo 400ms por assertiva |
| rodapé | o autoteste corre | `Voltar ao menu` desligado até o veredito | — | — | igual |
| prova, bloqueio e `Voltar ao menu` | a última assertiva chega | o autoteste correndo (07) não tem veredito: a contagem ao lado do título e o `Voltar ao menu` desligado; na sétima, o quadro troca pro fim (02 ou 05) — o conteúdo esmaece, como entre telas, e a prova (ou o bloqueio) e o `Voltar ao menu` aceso já vêm no quadro novo | 150ms | desacelera | troca direta |
| traço do veredito | a sétima assertiva passa | o veredito esmaece no lugar e, no mesmo tique, o traço lima embaixo da prova se desenha da esquerda pra direita · **uma vez, só no fluxo** · pela URL, no print e na coluna, já desenhado · a T11/02 não desenha: o fecho é só da visita | 300ms (`--mov-lento`) · o resto em 150ms | desacelera | aparece já desenhado |
| faixa de sessão | a sessão encerra | a faixa aberta sobe (translateY 0→-100%) por baixo da barra do sistema e revela a faixa sem sessão, que já está no lugar; nada do layout se move | 200ms | desacelera | troca direta |

- no protótipo: o traço do veredito é a camada lima sobre a borda da prova (`Prova` · `desenha`), que nasce com o quadro da 02 quando a sétima assertiva passa; pela URL, a 02 abre com a borda lima de sempre, sem a camada


**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
