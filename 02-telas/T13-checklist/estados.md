# T13 · estados e momentos

**No palco:** o quadro `29`, *Alimentação · relendo*, também fica em **Estados desta tela**, recuado após *Item reprovado*. Abre parado pela coluna e pelo link de momento: sem relógio de releitura, toque ou gravação no fluxo. Os resultados já existentes continuam na família. A referência é um momento, e a releitura no fluxo não muda.

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · 27 itens |
| `01-momento-a-identificacao-aberta` | momento | tocar na seção | derivado do fluxo |
| `02-momento-b-montagem-aberta` | momento | tocar na seção | derivado do fluxo |
| `03-momento-c-hardware-aberta` | momento | tocar na seção | derivado do fluxo |
| `04-momento-d-configuracao-aberta` | momento | tocar na seção | derivado do fluxo |
| `05-momento-e-teste-dinamico-aberta` | momento | tocar na seção | derivado do fluxo |
| `06-momento-f-servidor-aberta` | momento | tocar na seção | derivado do fluxo |
| `07-momento-responder-item` | momento | tocar num item manual | `checklist.itens · B` |
| `44-momento-foto-do-modulo-tirada` | momento | tocar em Tirar foto no 1º item da Montagem: a foto no quadro, com o registro embaixo · `Usar foto` conta o item, `Tirar de novo` volta à câmera | `checklist.fotosDeExemplo` · `b-modulo` |
| `08-momento-nao-conforme-com-justificativa` | momento | marcar não conforme | `checklist.itens · B` |
| `09-estado-item-reprovado` | estado | tocar na linha vermelha da Seção C (a 16): a leitura, a faixa e o que conferir  | `can-estatico-bateria` |
| `10-estado-finalizar-com-a-secao-f-falhando` | estado | `Finalizar` com a Seção F falhando (a 49): o diálogo da ciência, com a causa | `secaoF` |
| `12-momento-b-com-ressalva` | momento | salvar um item como não conforme, com a justificativa | derivado do fluxo |
| `13-momento-e-resolvida` | momento | voltar do ciclo de testes com os quatro passos feitos e responder o bip no checklist | derivado do fluxo |
| `15-momento-problema-fotografado` | momento | fotografar o problema depois de marcar Não está conforme: a foto do problema no quadro, com o registro embaixo · `Tirar de novo` volta à câmera do problema | `checklist.fotosDeExemplo` · `problema` |
| `16-estado-secao-c-com-item-reprovado` | estado | um item automático reprova: o xis, a leitura e a seta pro detalhe (a 09) | `can-estatico-bateria` |
| `17-momento-foto-do-lado-de-cima` | momento | o 2º item da Montagem · a frase embaixo do título vem do mock | o caminho feliz |
| `45-momento-foto-do-lado-de-cima-tirada` | momento | tocar em Tirar foto no 2º item: a foto no quadro, com o registro embaixo | `checklist.fotosDeExemplo` · `b-lado-de-cima` |
| `18-momento-foto-do-chicote` | momento | o 3º item da Montagem | o caminho feliz |
| `46-momento-foto-do-chicote-tirada` | momento | tocar em Tirar foto no 3º item: a foto no quadro, com o registro embaixo | `checklist.fotosDeExemplo` · `b-chicote` |
| `19-momento-foto-do-leitor` | momento | o 4º item da Montagem · só com leitor | o caminho feliz |
| `47-momento-foto-do-leitor-tirada` | momento | tocar em Tirar foto no 4º item: a foto no quadro, com o registro embaixo | `checklist.fotosDeExemplo` · `b-leitor` |
| `20-momento-foto-do-painel` | momento | o 5º item da Montagem · só quando houve calibração | o caminho feliz |
| `48-momento-foto-do-painel-tirada` | momento | tocar em Tirar foto no 5º item, o do caminhão coletor que calibrou: a foto do painel dele no quadro, 87712 km e 3120 h | `checklist.fotosDeExemplo` · `b-painel-legivel` · `a-09` |
| `21-estado-secao-c-com-gps-reprovado` | estado | sem posição, o GPS reprova: a linha vermelha e a seta pro detalhe | `gps-fraco` |
| `22-estado-gps-reprovado` | estado | tocar na linha vermelha do GPS: *sem posição*, *0 satélites · antena conectada* e o que conferir (o lugar do módulo, o lado de cima e o ônibus fora da garagem coberta), sem régua | `gps-fraco` |
| `23-estado-secao-c-com-entradas-reprovadas` | estado | uma entrada não bate: a linha vermelha, ignição desligada e a seta · *padrão, até o produto decidir* | `entrada-ignicao` |
| `24-estado-entradas-reprovadas` | estado | tocar na linha vermelha das entradas: qual não bate e o que conferir · *padrão, até o produto decidir* | `entrada-ignicao` |
| `25-estado-secao-c-com-modem-reprovado` | estado | o modem sem sinal reprova: a linha vermelha e a seta · *padrão, até o produto decidir* | `modem-sem-sinal` |
| `26-estado-modem-reprovado` | estado | tocar na linha vermelha do modem: sem sinal e o que conferir · *padrão, até o produto decidir* | `modem-sem-sinal` |
| `29-momento-relendo-o-modulo` | momento | tocar em Reler o módulo, no detalhe de um item reprovado: o botão diz Relendo o módulo, ali mesmo | `can-estatico-bateria` |
| `30-momento-alimentacao-relida` | momento | segunda releitura: 24,3 V dentro da faixa e Voltar ao checklist · referência às 14:42, protótipo às 14:30 | `can-estatico-bateria` |
| `31-momento-gps-relido` | momento | segunda releitura: com posição, com 9 satélites | `gps-fraco` |
| `32-momento-entradas-relidas` | momento | releu e deu certo: ignição ligada, conforme | `entrada-ignicao` |
| `33-momento-modem-relido` | momento | releu e deu certo: na rede, sinal bom | `modem-sem-sinal` |
| `34-momento-alimentacao-nao-resolvida` | momento | primeira releitura: 8,8 V, ainda 0,2 V abaixo do mínimo de 9,0 V · referência às 14:41, protótipo às 14:30 | `can-estatico-bateria` |
| `35-momento-gps-nao-resolvido` | momento | primeira releitura: ainda sem posição, com 0 satélites | `gps-fraco` |
| `36-momento-entradas-nao-resolvidas` | momento | releu e não resolveu: ignição ainda desligada | `entrada-ignicao` |
| `37-momento-modem-nao-resolvido` | momento | releu e não resolveu: ainda sem sinal | `modem-sem-sinal` |
| `11-momento-aguardando-autoteste` | momento | tocar em Finalizar: Checklist registrado, aguardando autoteste | `heroi` |
| `14-estado-aguardando-autoteste-sem-localizacao` | estado | finalizar sem a localização do celular: aguardando autoteste | `localizacao-negada` |
| `38-momento-secao-d-sendo-lida` | momento | abrir o checklist: a Seção D começa vazia e enche conforme lê | `heroi` |
| `39-momento-bip-tocando` | momento | tocar em Testar bip: o app aciona o buzzer por cerca de 1 segundo · o botão diz Tocando | `heroi` |
| `40-momento-bip-esperando-resposta` | momento | o bip tocou: Você ouviu o bip? Ouvi ou Não ouvi · o Testar bip continua, pra tocar de novo | `heroi` |
| `41-momento-bip-ouvido` | momento | tocar em Ouvi: o bip confere, e o `Testar de novo` fica na linha | `heroi` |
| `42-momento-bip-nao-ouvido` | momento | tocar em Não ouvi: o campo do que aconteceu abre, e o item ainda não conta · o `Testar de novo` fica na linha | `heroi` |
| `49-estado-secao-f-falhando` | estado | o evento de teste não chegou ao servidor: a Seção F aberta, com a causa e o `Disparar de novo` · é a tela atrás da 10 | `secaoF` |
| `50-momento-bip-nao-ouvido-com-o-que-aconteceu` | momento | escrever o que aconteceu, no Não ouvi (a 42): o bip conta, com ressalva | `heroi` |
| `51-momento-descartar-a-ressalva` | momento | o voltar do Android na câmera do problema ou com a foto do problema (08, 15), com o que aconteceu escrito: o diálogo pergunta antes | `checklist.exemploJustificativa` |
| `43-estado-secao-d-com-revisar-em-seguida` | estado | o técnico deixou o leitor e os eventos para depois · o Finalizar fica desligado, com a causa | `falta-reenviar` |

- no protótipo · a linha *10-estado-finalizar-com-a-secao-f-falhando*: | `10-estado-finalizar-com-a-secao-f-falhando` | estado | `Finalizar` com a Seção F falhando — o diálogo da ciência, com a causa, por cima da 49 | `pronto-para-fechar` |
- no protótipo · a linha *49-estado-secao-f-falhando*: | `49-estado-secao-f-falhando` | estado | a Seção F aberta, falhando, com o resto resolvido — a mesma montagem da 10 (o caminhão, KNB-5H39 × M2C-0371) | `pronto-para-fechar` · `secaoF` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

No protótipo (as contagens e a alimentação desta nota seguem a regra do `tela.md`): o 08 e o 15 são o mesmo item manual com a caixa *Não está conforme* marcada — o 08 antes da foto do problema, o 15 depois (decisão 39). Pela URL, o 08 abre com o texto de exemplo (`checklist.exemploJustificativa`) e o 15, com ele e o problema fotografado às 14:30, no primeiro item de B por fazer; no fluxo, `Fotografar o problema` leva do 08 ao 15, e desmarcar a caixa volta ao 07. Sem o texto, o 08 e o 15 continuam no mesmo endereço: muda o botão, *Conte o que aconteceu*, apagado, no 15. A câmera sem a permissão, com ou sem a caixa marcada, não tem referência, e a URL sai do momento. O 09 segue o caso do mock (o QJF-2C61, o M2C-0301, 8,4 V, contra a faixa do VL06 de 9,0 a 40,0 V, na régua de 5 a 45), como a referência; o título é *Alimentação*, o `rotulo` do item, como a referência desenha; o detalhe diz só a seção, sem a barrinha e sem a posição, e o *O que conferir* tem as três causas do `textos.md`, na peça da T05/04 sem o traço vermelho. O 16 é a Seção C aberta pelo mesmo caso, com a Alimentação reprovada — o xis, 8,4 V em vermelho e a seta, que abre o 09; o 17 ao 20 são as outras quatro fotos da B pela URL (o 17, o lado de cima), com as de antes fotografadas, como o `Tirar foto` do item anterior as deixa (no fluxo, o `Tirar foto` leva de uma à outra pela URL); o não conforme delas não tem referência, e a URL sai do momento. **O 16 e o mock:** a referência desenha o ônibus da bateria sem leitor, e o caso diz isso (`can-estatico-bateria` · `leitor: false`): sem a foto do Leitor, o bloco do leitor, o cartão e o bip — *14 de 23*, *você fotografa 3 itens*, a D em *7 de 7* e a E em *0 de 3*, como a referência. O 21 e o 22 são o herói sem posição (`gps-fraco`): a linha vermelha *sem posição*, e o detalhe com *0 satélites · antena conectada* embaixo, sem régua; o 35 e o 31, as duas releituras (*ainda sem posição*, e *com posição* com 9 satélites). **Na coluna do palco**, o 09 vem logo depois do 16 (`depoisDe`). O 10 vem logo depois do 49, recuado: o diálogo da ciência por cima da tela de onde ele sai. O 50 e o 51 são do fluxo: o 50 pelo *Não ouvi* com o que aconteceu escrito, e o 51 pelo voltar com ele escrito, sobre a foto do problema (o 15); pela URL, o 50 abre com o texto da referência, e o 51 com o 15 e o diálogo por cima.
