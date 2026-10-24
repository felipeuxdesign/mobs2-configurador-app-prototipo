# T10 · Calibração

**No palco:** o painel e `?tela=T10` abrem o ônibus RKT-8H42 + M2C-0417 em *Nada a calibrar neste ativo*, como no caminho normal. A calibração do caminhão KNB-5H39 + M2C-0371 fica em **Estados desta tela**: hodômetro (`00`), semeado (`01`), digitado (`05`), gravando (`06`), relendo (`07`), horímetro (`08`), completa (`09`) e corrigindo o semeado (`12`). Todos os exemplos abrem parados, inclusive pelos links desses momentos. As regras de calibração do ativo da sessão e as fotografias com `print=1` continuam as mesmas. O caminhão não é entrada navegável; isso não cria referências, tipos ou contagens.

Fazer o módulo contar igual ao painel do ônibus.

| | |
|---|---|
| **Elemento-assinatura** | o tambor que rola do número do módulo até o número do painel |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | fluxo normal: M2C-0417 + RKT-8H42, Nada a calibrar · referência 00 e consultas: M2C-0371 + KNB-5H39, 87.604 km no módulo e 87.712 km no painel |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 7 · 5 — ver `estados.md` |

## O que se toca

- durante o semear, o ENCERRAR da faixa fica desabilitado e em tinta apagada
  - no protótipo: *(a lei 17)*, o desabilitado que é tinta apagada
- o semear não para: durante o *Gravando no módulo…* e o *Relendo…*, o `Voltar ao menu` e o voltar do Android não fazem nada
  - no protótipo: parar no meio deixaria o valor pela metade · nos 2 s de *Gravando no módulo…* e *Relendo…*, o `Voltar ao menu` e o voltar do sistema não fazem nada, como no firmware atualizando da T07 · o `Voltar ao menu` fica no lugar, desabilitado de verdade e em `--tinta-apagada`: o toque não faz nada, e o leitor ouve desabilitado (a regra 12 e a lei 17, *desabilitado é tinta apagada*) · o `ENCERRAR` faz o mesmo que o voltar: apagado, e não faz nada · terminado o semear, os dois voltam a valer
  - no protótipo: o *Gravando no módulo…* e o *Relendo…* são a 06 e a 07, que abrem pela URL paradas, e no fluxo a URL as diz enquanto duram · o botão desligado bate com elas; o `Voltar ao menu` e o `ENCERRAR` seguem apagados (a lei 17), e o campo perde o foco quando o semear começa, onde a 06 e a 07 os desenham acesos e o campo com foco — diferença conhecida da referência
- o campo do painel → tocar e digitar o que o painel mostra, com o teclado numérico
- o botão acende com o número digitado, e sempre diz o que falta: *Digite o que o painel mostra* → `Semear o hodômetro`
- `Semear o hodômetro` → grava e relê → semeado · se a releitura passar da tolerância, *não confere* e `Semear de novo`
  - no protótipo: o botão diz *Gravando no módulo…* e depois *Relendo…* (1 s cada, `animacao.md`), e aí o módulo mostra o relido · semeado o passo, o painel semeado se toca pra corrigir (a 12, embaixo)
- **a régua da diferença diz o lado** (a 05 a 07): *o painel está 108 km à frente*, no lugar de *diferença de 108 km* · com o painel atrás do módulo, *o painel está 108 km atrás* · um número digitado errado salta aos olhos antes de semear: o técnico vê pra que lado e quanto vai mexer
- **o semeado se corrige na hora** (HU-T10-7: semear de novo recalcula, não acumula): no semeado (a 01) e na calibração completa (a 09), embaixo do valor do painel, *toque pra corrigir*, no desenho do link dentro do conteúdo (folha 6) · o painel inteiro se toca, e não só a frase: ele volta a ser a entrada, em foco, com o lima do valor alvo e o número que foi semeado, *corrija e semeie de novo*, e o primário vira `Semear de novo` (a 12) · o módulo continua dizendo o que conta agora, *semeado às 14:30* · semear de novo grava o número novo no lugar do anterior, pelo mesmo gravar e reler · sem tocar no painel, nada muda, e o passo segue
- o horímetro só aparece quando o modelo tem, e é **opcional**: depois do hodômetro, `Calibrar o horímetro` e o link `Pular o horímetro` · no passo do horímetro, *Opcional · o último passo*
  - no protótipo (decisões 52 e 35): o caminho feliz anda em linha — calibra, ciclo, checklist
  - no protótipo: o opcional é o do cadastro, `calibracao.porModelo.opcionais` — no caminhão coletor da semente, a velocidade e o horímetro · o `Depois:` diz *, opcional* depois do nome (00, 01, 05, 10) · `Pular o horímetro` → **segue pro ciclo**: a calibração fica concluída, vai direto pra T14, e a etapa grava o horímetro em `puladas` — a T13 lê dali o item dele na Seção D, *não calibrado*, sem bloquear · tocado do 01 ou do 08, o mesmo · de volta pelo menu, a calibração abre onde parou, e o horímetro ainda se calibra; semeado, ele sai das `puladas`
  - no protótipo · o voltar do sistema continua o `Voltar ao menu` também onde o link do rodapé é o `Pular o horímetro` (01 e 08): o voltar nunca pula um passo (a linha do voltar, embaixo)
  - no protótipo · diferença conhecida: no semear do horímetro, o link que fica no lugar, apagado, é o `Pular o horímetro` — o do passo —, e não o `Voltar ao menu`: o semear muda o conteúdo, não o desenho. Nenhuma referência desenha esse quadro
  - no protótipo · diferença conhecida: os textos não têm o *Último passo* (a 08 diz *Opcional · o último passo*), e nenhuma referência desenha o último passo que não é opcional (o 3 de 3 do ma-02, o hodômetro): ele fica sem legenda, como o 1 de 1 da 04, e o contador já diz o passo
- na rotação, o botão diz *Ligue o motor* até o módulo ler; depois, *Digite o que o conta-giros mostra*
  - no protótipo: as grandezas e a ordem são as do cadastro do modelo do ativo, menos as que o módulo não mede
- **a foto do painel não é daqui** (decisão 52): ela é um item da Seção B do checklist, obrigatória quando houve calibração
- calibração completa → `Fazer o ciclo de testes` → T14
  - no protótipo · `etapas.calibracao` guarda o digitado (`painel`), o semeado com o relido (`semeadas`), os pulados (`puladas`) e `concluida`; sem foto (decisão 52)
- `Voltar ao menu` → T04, em todo passo, também embaixo do `Fazer o ciclo de testes` na calibração completa, e a calibração volta de onde parou: o número digitado e o semeado de cada grandeza ficam na etapa (o endereço volta a ser o da referência do passo: 05, 01, 08 ou 09) · `ENCERRAR`, antes de homologar: a sessão abortada da T16; depois, o encerramento; no semear, apagado (a lei 17)
  - **no protótipo** (decisão 36): fora do semear, antes de homologar, o ENCERRAR abre o diálogo *Encerrar antes de terminar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela · o `Encerrar mesmo assim` roda os 4 passos da T16 · no semear, ele segue apagado, e o diálogo não abre
- o voltar do sistema (no computador, o Esc) faz o `Voltar ao menu`, em todo passo, e na calibração completa também; no semear, nada (`06-prototipo/logica.md` · O voltar do Android)

Pelas decisões 33 e 52, a calibração semeia só com o número digitado: o botão acende só com ele, e o Painel é foto a tirar na Seção B do checklist. A T10 não tem câmera do painel, painel fotografado nem câmera sem permissão, e o `VisorCamera` não é dela. Valem a ordem das grandezas pelo cadastro, a volta de onde parou e o voltar.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- com legenda
- nota com rótulo
- segmentado
- valor em poço
- régua da diferença
- o valor alvo
- o painel · vazio
- o que não se aplica

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

Medido nas referências (decisões 33, 35 e 52, com as horas no relógio parado, 14:30, e a 09 apontando o ciclo) e no código: as peças que a tela usa de fato, sem as da foto e da câmera. O `Pular o horímetro`, o *Opcional · o último passo* e a *nota com rótulo* da lista de cima não estão medidos nesta lista. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- processo correndo
- os glifos de estado
- os ícones de ferramenta
- os poços
- os marcadores
- segmentado
- valor em poço
- régua da diferença
- o valor alvo
- o painel · vazio
- o que não se aplica

Pelas decisões 33, 35 e 52, não estão aqui a *foto · aguarda*, a linha tocável, o primário inerte no semear, a *uma ação* (a calibração completa tem as duas ações de todo passo), a *foto · a tirar*, a *foto · tirada* e a câmera do app. O que só a T10 desenha é variante nomeada da peça: o primário desabilitado diz o que falta (*Digite o que o painel mostra*) e, no semear, o que acontece (*Gravando no módulo…*, *Relendo…*: o processo correndo com o link ao lado); a calibração completa (09) tem as duas ações de todo passo, com `Fazer o ciclo de testes` no primário; no semear, o link fica no lugar, desabilitado de verdade e em `--tinta-apagada` (`Rodape`, `linkDesabilitado`, a lei 17), e o `ENCERRAR` da faixa também (`Faixa`, `acaoDesabilitada`); o segmentado com o passo gravado alto e lima apagado (01, 08 a 10); o valor em poço aceso depois de semear (01) e em vermelho quando a releitura não confere (10); a régua que confere, com o check solto (01, Lei 4 · exceção), e a que não confere, com o xis solto de 14 e a frase em vermelho (10); o valor alvo vazio, com o traço em --marca-limite (00, 08), em foco, com o lima (05), e cumprido, fora do foco (01, 09, 10), com o campo numérico por cima do poço, sem desenho; e o que não se aplica com a divisória na última linha (02). Os átomos da folha 3 são o check da régua, a seta e o xis-mini, o poço de 44 e o LED da faixa. A câmera do app (`VisorCamera`, em `app/src/ds/checklist/`) fica só com o checklist. O número que rola no valor em poço é interno dele (`instrumentos/Tambor.jsx`).

## Histórias de usuário

- **HU-T10-1** — Vejo só as grandezas calibráveis para este ativo × módulo, com justificativa quando indisponível
- **HU-T10-2** — RPM/velocidade: informo o valor que leio no painel; o módulo calcula o fator
- **HU-T10-3** — Hodômetro/horímetro: digito o valor do painel; o app converte a unidade
- **HU-T10-4** — O horímetro só aparece quando o modelo tem, e é opcional: posso pular
- **HU-T10-5** — O read-back tolera granularidade + tempo decorrido, na unidade do reporte
- **HU-T10-6** — Releitura obrigatória antes do ciclo de testes
- **HU-T10-7** — Recalibrar em manutenção recalcula o offset, não acumula
- **HU-T10-8** — Quem escolhe pulso ou GPS é o cadastro do modelo de ativo, não eu

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## A calibração

- **o hodômetro só aparece quando a CAN do ativo não o entrega**: o ônibus lê o hodômetro pela CAN, então não calibra nada · *Nada a calibrar neste ativo* (a 11): *Rotação e hodômetro vêm direto do veículo.*
- **o caminhão coletor é o exemplo que calibra**: o hodômetro (87.604 no módulo, 87.712 no painel) e a rotação, obrigatórios · a velocidade e o horímetro, opcionais
- **a velocidade só com tacógrafo digital**, marcada *opcional*, fora da contagem · sem tacógrafo ela não aparece
- **a contagem conta só os obrigatórios**: *1 de 2*, *2 de 2*
- **o módulo sem pulsos** (a 04) é de um caminhão coletor: a rotação e a velocidade não se aplicam, porque o módulo não lê pulsos · o horímetro fica, opcional
- mantidos: a digitação do que o painel mostra, o horímetro opcional, o módulo sem pulsos e a releitura que não confere
- o caminhão tem horímetro pra as telas do horímetro terem um veículo · leitura nossa
- **no protótipo:** o ativo cujo modelo não calibra nada abre o *Nada a calibrar neste ativo*, com a frase do cadastro (`porModelo.nadaACalibrar`), e o `Fazer o ciclo de testes` grava a calibração concluída sem nada semeado — no fluxo, o herói chega aqui: o ônibus lê pela CAN o que o painel mostra (*482.317 km*, *9.640 h*: o `calibracao.bruto` do a-01 é o do painel, e a diferença é zero, decisão 59) · os quadros que calibram são os do caminhão (o a-09: 87.604 no módulo, 87.712 no painel, *o painel está 108 km à frente*) e do a-22 (121.003 × 121.480, o M2C-0480, agora um VL06 CAN-BT, que continua sem pulsos: a 04 segue igual) · a contagem e os segmentos são só dos obrigatórios; no passo opcional, a contagem fica no último obrigatório · o *Depois:* diz tudo o que falta, com os opcionais juntos · o não confere fica no segmento atual (a 10) · a 08 e a 09 pelo endereço marcam a rotação e a velocidade feitas, sem número (o mock não traz o que o motor ligado lê) · o caso `releitura-nao-confere` é do caminhão (87.711,5 km), e o bruto do horímetro dele está no mock (2.950 h), como as referências desenham
- no protótipo · o semeado que se corrige (decisão 64): o valor alvo semeado, na 01 e na 09, leva embaixo da frase o convite *toque pra corrigir*, no desenho do link dentro do conteúdo, e o poço inteiro é o botão (a peça *valor alvo*, `corrigir` e `aoCorrigir`) · tocado, o passo fica *corrigindo* (a 12): o painel volta a ser o campo, em foco, com o lima e o número semeado, a frase *corrija e semeie de novo*, a régua *semeado às 14:30* (o módulo conta o semeado), e o primário `Semear de novo`, que grava e relê como o primeiro · com outro número digitado, a régua diz o lado contra o que o módulo conta agora · o horímetro da 09 corrige do mesmo jeito, sem referência própria (a URL fica sem momento) · a 12 abre pela coluna, parada, no fim (`consulta`), e pelo endereço
- no protótipo · a régua da diferença diz o lado (a 05 a 07): `textos.js` · `diferenca`, pela conta do digitado contra o que o módulo conta
- no protótipo · a medição (`node scripts/tela.mjs todos T10`, contra o HTML, e `prints/tela1.mjs`, na escala 1): 0% na 01 a 04 e 08 a 11 · 0,03% na 05 · 0,04% na 12: o serrilhado do campo em foco, como a 05, e o *km* do poço — a 12 desenha o km na cor do número, e a 01 e a 09, em `--tinta-secundaria`: o protótipo segue a peça (diferença conhecida da referência) · 0,49% na 06 e na 07, o ENCERRAR e o `Voltar ao menu` apagados no semear (acima) · 0,14% na 00: a 00 e a 03 são o mesmo caminhão, o a-09, que o mock diz semeado há 27 dias (`calibracao.ultimas`); a 03 desenha *semeado há 27 dias*, e a 00, *lido do módulo às 14:30* — o protótipo diz o do mock nas duas (diferença conhecida da referência) · a régua dos textos aponta a 00, por isso, e a 11, cujo título quebra em duas linhas (*Nada a calibrar / neste ativo*), que o `textos.md` escreve num texto só e o protótipo, em dois
