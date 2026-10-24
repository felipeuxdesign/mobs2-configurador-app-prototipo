# T04 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

**A cobertura do véu:** o véu das folhas e dos diálogos desta tela escurece todo o fundo do app, incluindo tira, faixa e fundo da barra de status. A hora e os ícones oficiais ficam legíveis. O painel e a caixa conservam seus lugares; não há deslocamento do topo.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| contador da fila e do checklist | o número muda | troca no lugar, sem pular | — | — | igual |
| folhas | tocar no nome da empresa ou nas iniciais | o painel sobe de baixo e o véu esmaece; fechar desce | 200ms · fecha em 150ms | desacelera | aparece |
| cartão liberado | o módulo conecta | o poço ganha cor e o texto de espera some | 150ms | esmaece | troca direta |
| o interruptor do Modo claro | tocar na linha *Modo claro* | a bolinha desliza pro outro lado e cresce de 16 pra 24, e o trilho se enche de roxo · enquanto o dedo está em cima, a bolinha cresce pra 28 | 200ms | desacelera | troca direta |
| a troca do tema | o interruptor muda | o app inteiro troca as cores dos tokens no lugar, com a folha ainda aberta — nada se move, só a cor | 300ms | desacelera | troca direta |

- no protótipo · a faixa de sessão: a sessão nasce na conexão, na T05, e a faixa desce na T07, quando as sete linhas passam sem trava — é o que as referências desenham. No menu, nada se move: ele já chega com a faixa, e o conteúdo não desce junto, porque o layout não se move (o `CLAUDE.md`)

- no protótipo · o cartão liberado: o módulo conecta na T05, e no menu nada se move — os cartões chegam liberados, com o esmaecer entre telas

- no protótipo · as folhas abrem também com a sessão aberta, no cartão do módulo ou do ativo, com o mesmo movimento

- no protótipo · a linha *folha que vira diálogo*: | folha que vira diálogo | tocar em Sair da conta, numa empresa da folha com a sessão aberta ou em Encerrar a sessão; e o Cancelar | o véu integral fica escuro, parado: a folha desce enquanto o diálogo esmaece e cresce de 98% a 100%; no Cancelar, o diálogo esmaece enquanto a folha sobe de novo; a tira e a faixa já estão cobertas, sem acrescentar um trecho superior ou clarear o topo | 150ms · a folha que volta sobe em 200ms | desacelera | troca direta |

No protótipo: o diálogo *Encerrar antes de terminar?* (13) se move como todo diálogo (`movimento.md`): a caixa esmaece e cresce de 98% a 100% em 150ms, o véu esmaece junto, e fecha do mesmo jeito; com reduzir movimento, aparece. Aberto pelo endereço, nasce aberto, parado. É a mesma peça em toda tela com a faixa.

No protótipo (lei 20): toda folha do menu também se arrasta — o painel acompanha o dedo pra baixo, só por transform; soltando depois de 56, desce de onde parou e fecha em 150ms, e o véu esmaece junto; antes, volta ao lugar em 200ms. É o arraste de toda folha (`movimento.md` · folha · o arraste, proposta do protótipo); com reduzir movimento, o painel segue o dedo e a volta ou o fecho é direto.

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
