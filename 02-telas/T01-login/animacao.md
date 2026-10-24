# T01 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| olho da senha | tocar no olho | a senha troca entre os pontos e o texto, no lugar, e o olho troca pelo riscado | 150ms | desacelera | troca direta |
| campo em foco | tocar no campo | o traço de baixo acende em lima, da esquerda pra direita (scaleX 0→1) | 150ms | desacelera | aparece aceso |
| aviso de erro | Entrar com senha inválida | surge no lugar (opacidade 0→1); a marca NÃO se move | 150ms | desacelera | aparece |
| célula do código | cada dígito digitado | o dígito surge e o traço lima pula pra próxima célula | 100ms | desacelera | troca direta |
| teclado do aparelho | o código em foco (a 03), e o ✓ ou o voltar que o fecham | o teclado sobe de baixo (translateY 100%→0), por baixo da pílula, e o rodapé sobe junto com ele, só por deslocamento: o `Voltar ao login` sai direto e o `Confirmar` fica · fechando, desce, e o `Voltar ao login` volta esmaecendo | 200ms · fecha em 150ms | desacelera | aparece |
| cronômetro do código | a cada segundo | o número troca no lugar; nada desliza | — | — | igual |
| contagem do reenvio | a cada segundo, na folha | o número troca no lugar; ao zerar, a seta entra e a linha acende | 150ms | desacelera | troca direta |
| requisitos da senha | cada requisito atendido | a marca ganha o check e o texto clareia | 150ms | desacelera | troca direta |
| folha "não recebi o código" | tocar no link | o painel sobe de baixo (translateY 100%→0) e o véu esmaece | 200ms | desacelera | aparece |
| diálogo "senha alterada" | nova senha aceita | esmaece e cresce 98%→100% | 150ms | desacelera | aparece |
| checkbox "Lembrar meu usuário" | tocar no checkbox | o quadrado lima surge no poço (opacidade e escala 80%→100%); desmarcar some igual | 150ms | desacelera | aparece |
| botão Entrar | tocar em Entrar com tudo certo | o botão desliga e diz *Entrando…* até o menu abrir (ref. 19) | 1,2s | — | igual |

No protótipo: o diálogo *Outra sessão neste aparelho* (a 18) nasce aberto, junto com a entrada da T02 — no fluxo e pela coluna, as três empresas do herói, nada escolhido, o quadro da T02/00 (a empresa é o contexto inteiro, decisão 56) — nenhuma tela anima a entrada —, e sai como todo diálogo: o véu e a caixa esmaecem, e a caixa diminui de 100% a 98%, em 150ms. A linha do reenvio que vira o teto (a 17) troca o texto no lugar, sem movimento.

No protótipo (lei 20): a folha *Não recebi o código* também se arrasta — o painel acompanha o dedo pra baixo, só por transform; soltando depois de 56, desce de onde parou e fecha em 150ms, e o véu esmaece junto; antes, volta ao lugar em 200ms. É o arraste de toda folha (`movimento.md` · folha · o arraste, proposta do protótipo); com reduzir movimento, o painel segue o dedo e a volta ou o fecho é direto.

No protótipo (o teclado do aparelho, decisão 62): o encolher do app é o estado final, aplicado de uma vez no começo — o teclado entra no fluxo, no pé, e o miolo fica com o que sobra acima dele —, e só o teclado e a tela se movem, por transform. O teclado sobe de translateY 100% a 0 em `--mov-padrao` e desce em `--mov-rapido`, na `--mov-curva`, como a folha; o rodapé vai de onde estava ao lugar novo só por deslocamento, no mesmo tempo, e os blocos do miolo acompanham, cada um do seu tanto (as células e o cartão, centrados na sobra, andam a metade; a legenda e o *Não recebi o código*, o mesmo que o rodapé) — sem eles, o rodapé que desce passaria por cima da legenda, que já estaria no lugar novo (`useTelaComOTeclado`, em `06-prototipo/app/src/ds/chrome/TecladoDoAparelho.jsx`, mede o lugar antes e depois e anima a diferença). Fechando, o teclado sai do fluxo de uma vez — o app volta ao tamanho inteiro — e desce por cima do pé, por baixo da pílula; o `Voltar ao login` volta no rodapé, esmaecendo em 150ms. Chegando na 03 pelo `Enviar o código`, a troca de quadro esmaece o conteúdo e o teclado sobe junto (ele é do sistema: não esmaece com o conteúdo). Pelo endereço, pela coluna e no print, nasce aberto, parado; com reduzir movimento, aparece e some. Só no computador e no print: no celular, o teclado é o do aparelho, e o movimento é dele.

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
