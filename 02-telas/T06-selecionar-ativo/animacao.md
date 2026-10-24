# T06 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| aviso do vínculo | o módulo já tem vínculo | o aviso entra no lugar, antes do escolhido | 150ms | esmaece | troca direta |
| marcador de escolha | tocar num ônibus | o quadrado lima surge no poço (opacidade e escala 80%→100%); o que perde a marca faz o contrário | 150ms | desacelera | aparece |
| botão primário | tocar num ônibus, sem nenhum marcado; a busca que devolve o marcado | o `Usar este ativo`, apagado com o mesmo texto, acende por uma camada, como todo primário que acende na frente de quem olha; a busca que esconde o marcado o apaga direto | 150ms | desacelera | troca direta |
| lista filtrada | digitar na busca | as linhas que saem esmaecem por cima; as que ficam deslizam pro lugar novo (translateY), sem reordenar; as que voltam esmaecem no lugar; nenhuma altura anima | 150ms | desacelera | troca direta |
| troca de quadro | tocar em `Usar este ativo` na lista e em `Escolher outro`; a busca que acha a placa de outro pacote e abre a trava, sem a lista andar por cima | a lista e *Confirmar o vínculo* são desenhos diferentes: o conteúdo esmaece, como entre telas; a faixa e a barra ficam paradas | 150ms | desacelera | troca direta |

- no protótipo: o aviso do vínculo chega com o quadro, no esmaecer da troca de quadro, e não esmaece de novo por dentro dele (`movimento.md` · o que nasce com o quadro não esmaece de novo). O `10` e o `11` são quadros da confirmação, como o `04` a `06`, e abrem pela coluna, parados: o aviso fica entre o título e o escolhido, e o escolhido desce em relação ao `01` — entrar depois de a tela abrir moveria o layout · o *esmaece* da tabela é a curva de tudo, a que desacelera

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
