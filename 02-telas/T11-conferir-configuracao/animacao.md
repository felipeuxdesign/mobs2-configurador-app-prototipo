# T11 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| veredito | a tela abre | fica no lugar desde o começo, neutro — *CONFERINDO* —, com a contagem subindo: 1 de 5 … 4 de 5 · na última linha vira o veredito de verdade | 150ms | esmaece | aparece com o resultado |
| linha de conferência | a conferência corre, na ordem do script: Ativo, Cercas, Leitor, Eventos, Conexão | a linha da vez mostra o quadrado branco de agora e diz *conferindo*; as seguintes esperam com o relógio e o traço; a que chega troca pro check, o xis ou o i · 400ms por linha | 150ms | desacelera | aparecem juntas |
| o começo | a tela abre | o relógio só liga depois da troca de tela: pelo menu, a primeira linha vira aos 550ms (150 da troca + 400); pelo endereço, aos 400ms | — | — | igual |
| rodapé | a conferência corre | `Voltar ao menu` e `Outras ações` desligados até o veredito, e acendem no mesmo lugar | 150ms | desacelera | troca direta |
| folha de confirmação | `Corrigir este bloco` num bloco que tem dependente | a mesma folha da T09 sobe de baixo (translateY 100%→0) e o véu esmaece (ref. 06) | 200ms | desacelera | aparece |
| folha *Outras ações* | tocar em `Outras ações` | o painel sobe de baixo (translateY 100%→0) e o véu esmaece sobre o fundo inteiro, incluindo a faixa e o fundo da barra de status; hora e ícones oficiais ficam legíveis | 200ms | desacelera | aparece |
| folha · arrastar | arrastar o puxador ou o topo da folha pra baixo | a folha acompanha o dedo e o véu clareia junto · soltou depois do limite de 56px (`--folha-arraste-limite`), ela desce e fecha; antes disso, volta pro lugar | 150ms pra fechar · 200ms pra voltar | desacelera | fecha direto ao soltar |
| folha · fechar | tocar no X, tocar no véu, ou o voltar do Android | desce (translateY 0→100%) e o véu esmaece · o puxador, no leitor de tela, diz *Arrastar pra fechar* | 150ms | acelera | some |

**A cobertura do véu:** a extensão do véu não desloca a folha, a faixa nem o conteúdo. Pelo endereço de consulta ou no print, a folha já nasce aberta e parada.

- no protótipo (decisão 53): as linhas são cinco, e a contagem acompanha as cinco — *1 de 5*, *2 de 5*, *3 de 5*, *4 de 5* — e o veredito entra na quinta (*5 de 5*). No `02`, só a palavra e o lima do traço entram. Na `00`, a linha do que está no módulo esmaece junto. As linhas de revisar em seguida (`05`) terminam com o relógio. Na 04: enquanto lê, o veredito diz *CONFERINDO*, sem poço à vista, com o traço no `--borda-poco`; no que não bate, a caixa já guarda o lugar do poço, invisível, pra nada mudar de lugar (a 04 é o caso que confere); no fim, a palavra, a cor e — na `00` — o poço com o xis entram no mesmo esmaecer; o rodapé fica com o `Voltar ao menu` desligado e, no fim, troca pro do quadro
- no protótipo: a folha da `07`, a da Conexão de outra operadora, que não tem dependente, sobe e desce como a da `06` — 200 pra subir, 150 pra descer, com o véu — e fecha nos mesmos gestos · o roteiro `conferencia` mede a subida e a descida dela

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
