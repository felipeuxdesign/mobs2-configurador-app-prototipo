# T07 · Diagnóstico do módulo

Ver o que o módulo informa e o que a CAN do modelo lê — logo depois da conexão, e de novo depois da configuração.

| | |
|---|---|
| **Elemento-assinatura** | as linhas do módulo e da CAN, cada uma com o seu estado no poço: o que trava em vermelho, o que só informa em cinza |
| **Chrome** | faixa de sessão · nas travas, o módulo em cima do título, sem faixa — a faixa não aparece |
| **Semente no protótipo** | sessão M2C-0417, sem ativo · o módulo do herói, com os oito itens que contam certos e mensagens só informativas |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 4 · 10 — ver `estados.md` |

## A regra do diagnóstico

O módulo tem **nove linhas lidas**, das quais **oito contam**: número do chip incluído; mensagens no módulo só informam. A CAN do herói tem seis linhas, e as seis contam: rotação, hodômetro, horímetro, temperatura, combustível e consumo total, a lista da biblioteca da CAN do modelo. A soma é **14**. A alimentação confronta a faixa do modelo do módulo (VL06: 9,0 a 40,0 V), e o GPS confere pela antena; os satélites são informativos. O caso de alimentação baixa declara 8,4 V, não 10,9 V. A leitura percorre `M.diagnostico.modulo` a cada 600 ms; `etapas.preChecagem` guarda a contagem calculada, oito, sem número fixo. A sessão nasce na conexão da T05; a faixa aparece aqui depois da leitura sem trava.

Fontes: `04-dados/mocks.js`, `06-prototipo/app/src/telas/T07/diagnostico.js`, `index.jsx` e as referências `00`, `01`, `11` e `12`.

## Como o protótipo constrói

As notas abaixo trazem as medições e as diferenças conhecidas. Onde uma delas fala em sete linhas no módulo, alimentação de 10,9 V ou contadores de sete, vale a regra de cima.

- **a alimentação abaixo da faixa só informa**, como o modem sem sinal: a linha diz *dá pra seguir · o checklist registra*, e o *Selecionar ativo* continua aceso · o checklist reprova o item *Alimentação* da Seção C (a T13/16)
  - no protótipo: o caso `can-estatico-bateria` muda a linha da Alimentação do M2C-0301, como o `modem-sem-sinal` muda a do Modem — *informa*, com o 8,4 V do caso e *dá pra seguir · o checklist registra*, embaixo da faixa do VL06 (*faixa 9,0 a 40,0 V*); o contador fica em 7 de 8, a faixa desce e o `Selecionar ativo` acende · o M2C-0301 não está entre os que a busca acha, e a 12 abre só pela coluna, parada · diferença conhecida da referência: a 12 desenha a linha do Firmware com 64, e as outras referências e a folha 4, com 50 — o protótipo fica nos 50 (3,5% contra o HTML, a lista inteira 14 mais acima); e o `textos.md` da 12 junta a faixa e o que a linha informa num texto só, com a quebra (*… / …*), que o protótipo escreve em dois, a faixa e a causa: a régua dos textos aponta a 12 por isso
- as linhas do módulo são a linha de conferência, de 50px; as da CAN, a lista longa, de 44 (lei 23) · nas travas sem saída escrita — o serial fora do cadastro e o modelo sem suporte —, **o aviso abre a tela com o porquê**, e o botão é a saída · o topo só identifica o módulo, sem repetir a trava
  - no protótipo · o módulo é a `LinhaChecagem` na variante `diagnostico` — a medida da linha de conferência: 50, o poço de 32, o glifo de 16, a 10 —, com a tinta da checagem: o título aprovado em --tinta-forte, o que espera apagado, o que reprova e o que informa em --tinta, como as onze referências e as quatro peças de estado da folha 4 desenham (a T11 acende o nome em todo estado, e por isso a variante é outra); a CAN e o *Conferido na conexão*, a variante `longa` — 44, o poço de 30, o glifo de 16, a 12. Nas duas, o rótulo em 15/600 e o valor em 14; com a causa, 6 em cima e embaixo, nunca menos que a altura da linha; o quadrado de agora fica em 10 nos dois poços (06, 10). O aviso é o `Aviso` de falha (o xis no poço de 26), entre o cabeçalho e *O MÓDULO*, a 12 dos dois, como as referências: o serial e o nome do modelo (o modelo e a variante, os mesmos do valor da linha) vêm do cadastro do mock, e a moldura, do `textos.md`. Ele acompanha a trava: quando a leitura termina nela. No fluxo (o M2C-0999 da T05/01), aparece quando a nona linha fecha, esmaecendo no lugar (`Aviso` · `surge`, 150), e o espaço abre direto, como nas travas da T09 (o bloco do módulo desce: a lei 3 do aviso); aberto já na trava (a URL, a coluna, o print), parado. O rótulo de cima diz só o serial do módulo fora do cadastro também enquanto ele lê
- `Gravar a conexão` (firmware fora da lista, módulo sem rede) → grava só a conexão, isolada, e o firmware atualiza por ela
  - no protótipo · o `Gravar a conexão` (05) consome o `firmware-sem-rede-no-modulo` — o modem ganha rede — e leva direto à 06, a atualização: o quadro de gravando a conexão não tem referência, e nada se grava no estado além do caso consumido. A atualização: o quadro dos 62% (`CASOS["firmware-fora-matriz"].atualizacao.quadroPct`) fica `RITMOS.firmwareAtualizacaoMs` (1 s, o ritmo dela, que não é mais o da cadeia · `movimento.md`, Como o processo se move), e o diagnóstico recomeça das nove, com o firmware disponível do caso (`firmwareDisponivel`, 8.04, o caso consumido); passando, a faixa desce. Durante, o voltar não faz nada e não há ENCERRAR (a faixa não desceu). O 06 pela URL abre nos 62% e segue dali; no print, para. Na 06, a alimentação que espera fica nos 50, e as mensagens esperam só com o nome, nos 54, como ela desenha (a 11 desenha o traço embaixo do nome: diferença conhecida entre as referências, e cada quadro segue a sua)
- `Procurar outro módulo` → T05/01, a lista sem nada escolhido
  - no protótipo · a sessão que nasceu no Conectar e não chegou a aparecer (a faixa não desce na trava) se desfaz, sem registro e sem fila — `sessao` e `etapas.preChecagem` voltam a nada —, e a T05 abre na 01. O voltar do sistema faz o mesmo nas travas (02 a 05)
- logo depois de conectar: as linhas do módulo, sem a CAN · a CAN só aparece quando dá pra ler, depois de o bloco do ativo gravar (a 01): antes, nenhuma caixa de espera, e a tela cabe sem rolar
  - no protótipo · as nove acendem uma a cada `RITMOS.diagnosticoLinhaMs` (600, `movimento.md` · diagnóstico), depois dos 150 da troca entre telas, só quando o Conectar da T05 traz a sessão sem ativo e sem o diagnóstico deste módulo; pela URL, pelo palco, num estado e no print, a tela abre parada, no quadro da referência. A leitura é a 11: a linha que lê com o quadrado de agora e *lendo*, as que esperam com o relógio apagado e o traço — o título delas aceso, como a 11 desenha —, a contagem ao lado do título, a barra já no fundo da faixa, nada em cima do título, e o rodapé só com *Lendo · não saia da tela*, desabilitado, fechando em 24 (o voltar não faz nada); pela URL, a 11 abre parada nas Entradas digitais (*4 de 8*). Quando a leitura acaba numa trava, o módulo aparece em cima do título, pela regra das travas: o serial e a placa do ativo que o cadastro prevê (*M2C-0417 · RKT-8H42*, decisão 46), ou só o serial, fora do cadastro (a trava fica com o aviso); o módulo do cadastro sem ativo previsto, que nenhuma referência desenha, diz *sem ativo*. A 06 e a 10, os outros processos da tela, seguem com o título das que esperam apagado e o rodapé em 32, como elas desenham (diferença conhecida entre as referências). Passando sem trava, a faixa desce (Faixa `ausente`), o rótulo de cima sai, e o rodapé vira o da 00 — o primário com o texto novo esmaecendo no lugar; o rodapé, que passa de uma ação a duas, sobe com a faixa, só por deslocamento. Fica gravado `etapas.preChecagem`, com esse nome porque a T13 e a T12 leem assim: `{ checagens: 8, passaram: 8 }`, e mais `aprovadas` (o contador), `moduloSerial` (o módulo que passou) e `mensagens` (as que o módulo ainda não enviou, o número da linha *Mensagens no módulo*: o que a limpeza completa da T09 apagaria). Num pulo do palco pra uma tela de depois, com o ativo na sessão, o módulo conta como já conferido e a tela abre parada
- `Selecionar ativo` → T06, o vínculo
  - no protótipo · com o ativo já na sessão e antes da cadeia (o menu depois da T06), a 00 mostra a placa na faixa e o rodapé só com `Voltar ao menu`: o `Selecionar ativo` não cabe com o ativo preso na sessão, e nenhuma referência desenha esse quadro
- **só três coisas travam**: serial não cadastrado, modelo sem suporte e firmware fora da lista — sinal, GPS e alimentação só informam, e o checklist registra
  - no protótipo · as três travas são fatos do cadastro e valem toda vez que o módulo conecta: o serial fora de `M.modulos` (02), o modelo sem `driverV1` (03) e o firmware fora da lista da variante (04, de `matrizCapacidades.firmwares`). Com o serial travado, o firmware e as entradas ficam *sem cadastro*, com o relógio apagado. O serial e o firmware vêm do cadastro do módulo conectado; a alimentação, o GPS, as entradas, o modem, o SIM, o número do chip e as mensagens, do `heroi` de `M.diagnostico.modulo` (o único conjunto do mock, que as referências 02 a 05 repetem). O que só informa é o estado `informa` da linha de checagem (a peça da folha 4): o modem sem sinal (07, pela linha marcada com `informa` no mock) e o modem sem rede do 05. No fluxo, só as travas acontecem, pelo serial (o M2C-0999 da T05/01 é a porta); o modem sem sinal e os sinais da CAN caem no par do herói e abrem só pela coluna. O `motivo` do `modelo-sem-driver` fica sem leitor: o texto é o do `textos.md`. O link que cai no meio da leitura não tem caso no mock: não se constrói
- no firmware fora da lista: `Atualizar firmware` · com o módulo sem rede, `Gravar a conexão` primeiro
- **atualizando** (a 06): o rodapé diz o que não fazer, *Atualizando · não desligue o módulo* (o módulo baixa e grava o firmware pela rede dele; desligar a alimentação no meio é o que estraga), e *O diagnóstico recomeça quando terminar*
- **a atualização que não termina** (a 14): a linha do firmware diz onde parou, *parou em 62%*, em vermelho, com o xis e *não terminou*, e as outras ficam esperando, no traço · embaixo da lista, o que conferir: *Confira se o módulo está ligado e perto do celular.* · `Tentar de novo` pede a atualização de novo (a 06), e `Procurar outro módulo` é o de toda trava (T05/01) · o módulo aparece em cima do título, pela regra das travas · o que o VL06 faz com uma atualização interrompida, a Newtec confirma
  - no protótipo: a 14 abre pela coluna, parada, logo depois da 06 (o caso `atualizacao-nao-terminou`, que nasce do `firmware-fora-matriz`): o M2C-0451 em cima do título, como nas travas, a linha do firmware reprovada, com *parou em 62%* embaixo do nome e *não terminou* no lugar do valor, e as outras esperando com o relógio e o traço, como na 06 · a frase do que conferir é a legenda do rodapé, no desenho das esperas da conexão da T05 (12/500 em `--tinta-secundaria`) · `Tentar de novo` atualiza de novo (a 06) e `Procurar outro módulo` leva à T05/01, como toda trava; o voltar faz o `Procurar outro módulo` · nenhuma espera estoura no protótipo: o desfecho vem do caso (decisão 64) · a medição: 0,02% contra o HTML, a mesma da 06 (a linha das mensagens meio pixel acima), e os textos conferem
- depois da configuração, o módulo vira uma linha — *Conferido na conexão* — e a tela fica pra CAN do modelo
  - no protótipo · a CAN aparece lida (01) quando a cadeia já passou do bloco do ativo (`etapas.cadeia.confirmados` ≥ 2), na manutenção com o vínculo feito (`etapas.ativo.modo` ou `sessao.modo`) ou depois de lida aqui pro mesmo ativo; o herói chega pelo `Ler a CAN` da cadeia concluída (T09/04), e o endereço passa a dizer a 01; o `Diagnóstico do módulo` do menu, com o bloco do ativo gravado, também abre nela · o `Calibrar` leva à T10, e o voltar do Android, ao menu (`voltarAoMenu`). Fica gravado `etapas.can` `{ lida: true, reprovados }`, e mais o `ativoId`. A linha do módulo diz o que a conexão conferiu (*8 de 8*), e o contador soma os dois: 8 + os 6 sinais, *14 de 14*. Antes do bloco do ativo, a CAN não aparece — nenhuma caixa espera por ela, e a seção nem tem rótulo (decisão 61) —, e a T07 volta já lida. A 01 e a 10 pela URL põem na sessão o ativo previsto do módulo (o RKT-8H42), pra faixa e o menu dizerem o mesmo
- **a CAN lida segue o caminho** (a 01): `Calibrar` → T10 · `Ler de novo` → relendo (a 10) · o `Voltar ao menu` fica no voltar do Android, como na cadeia concluída (T09/04) · chega-se pelo `Ler a CAN` da cadeia concluída, o caminho, ou pelo `Diagnóstico do módulo` do menu, com o bloco do ativo gravado · com um sinal sem leitura ou fora do esperado (08, 09), o rodapé é o mesmo: a leitura da CAN não trava (HU-T07-4) · se ela trava, só informa ou entra no checklist, o produto decide
- a lista da CAN vem do modelo do ativo, na ordem da biblioteca da CAN que o bloco do Ativo grava: no ônibus do herói, rotação, hodômetro, horímetro, temperatura, combustível e consumo total, em litros · o ônibus lê pela CAN o que o painel mostra (*482.317 km*, *9.640 h*), e por isso não calibra nada (T10) · a velocidade nunca aparece aqui: só como opcional da T10 · o valor que a CAN devolve como *não disponível* (no J1939, o 215 °C da temperatura) é *sem leitura*, nunca um número
  - no protótipo · a lista é a de `M.diagnostico.can`, do modelo `ma-01`, a única que uma referência desenha: os seis sinais contam, e nenhum só informa; o ativo de outro modelo não tem lista no mock, e a CAN não aparece, só o *Conferido na conexão* (lacuna conhecida). Os estados da CAN mudam o sinal do caso: *sem leitura · ligação* com o traço (08, `can-estatico-ausente`) e *fora do esperado · −40 a 120* com o lido do caso, 135 °C (09, `can-estatico-isolado`): *13 de 14* nos dois. Ao vivo (a 01 no fluxo), só a rotação e a temperatura, os sinais com `leituras` no mock, trocam o número no lugar, uma leitura por `RITMOS.canAoVivoMs`, sem transição; o hodômetro, o horímetro, o combustível e o consumo total ficam parados
- `Ler de novo` → relendo → a CAN lida de novo
  - no protótipo · relê só a CAN (a 10 mantém o módulo *Conferido*), uma linha a cada `RITMOS.diagnosticoLinhaMs`, no lugar, sem troca de quadro, e volta à 01; o caso da CAN, se houver, fica consumido. Relendo, o voltar não faz nada e o ENCERRAR fica apagado e desabilitado (a lei 17 e a `logica.md`): o PNG da 10 o desenha aceso, e essa é a diferença conhecida da referência. A 10 pela URL abre no quadro dela (a temperatura lendo, *11 de 14*) e segue dali
- se o link cair no meio da leitura → T05, conexão falhou
  - no protótipo · sem caso no mock: não se constrói

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- barra do sistema sem sessão
- faixa · sessão aberta
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- uma ação
- com legenda
- aprovada
- reprovada, com causa
- só informa
- ainda não
- lista longa
- processo parado
- nota com rótulo
- linha do histórico
- a lista de empresas
- encerrando
- reiniciando
- sem homologar
- com contador
- linha de opção
- lista com contagem
- item feito
- linha da fila
- linha da re-checagem

## Histórias de usuário

- **HU-T07-1** — Logo depois de conectar, vejo o módulo: serial, firmware, alimentação, GPS, entradas, modem e SIM
- **HU-T07-2** — Serial fora do cadastro, modelo sem suporte e firmware fora da lista travam — cada um com a sua mensagem
- **HU-T07-3** — Firmware fora da lista oferece atualizar quando o módulo tem rede; sem rede, o app grava só a conexão, e então atualiza
- **HU-T07-4** — O resto só informa, com o ícone de informação: eu sigo, e o checklist registra
- **HU-T07-5** — A CAN aparece depois que o bloco do ativo é gravado, com a lista da biblioteca do modelo; antes, ela não aparece; sinal sem leitura ou fora do esperado aparece na própria linha. A CAN do herói não lista velocidade
- **HU-T07-6** — Ler de novo relê a CAN inteira

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## O diagnóstico

- **o módulo tem 8 linhas que contam**: serial, firmware, alimentação, GPS, entradas, modem, SIM e o **número do chip**, que o técnico confere com o impresso no chip · e **as mensagens no módulo**, só informação, que não contam nem bloqueiam: *12 mensagens ainda não enviadas*
- **a alimentação é a do equipamento**: o valor lido pelo módulo, com a faixa de operação do modelo embaixo (*faixa 9,0 a 40,0 V*, a do VL06) · sem bateria interna
- **o GPS é a antena**: *conectada*, *em curto* ou *desconectada* · os satélites ficam como informação · a antena fica dentro do módulo, do lado de cima: em curto ou desconectada é defeito do módulo · no checklist, o GPS aprova pela posição (T13)
- **a CAN tem 6 sinais, e os 6 contam**: os da biblioteca do modelo · sem o alternador · **sem a ré e sem a velocidade**: a velocidade só aparece como item opcional da T10 · o total é 14, 8 do módulo e 6 da CAN · *13 de 14* com um sinal sem leitura (a 08: a rotação) ou fora do esperado (a 09: a temperatura em 135 °C)
- **a sessão anterior mal encerrada** (a 13): quando o canal de programação é encontrado aberto, *O app fechou o acesso que ficou aberto. Pode seguir.*
- o firmware que trava é o **fora da lista** (a 04) · a lista da variante, no formato do Virloc: *8.03 e 8.04* · o M2C-0451 roda o *8.01*, fora dela

## No protótipo · a medição

Mora em `06-prototipo/app/src/telas/T07/` (`index.jsx`, `diagnostico.js`, `textos.js`, `t07.css`), com as peças do design system: a linha de checagem nas variantes `diagnostico` (o módulo, 50) e `longa` (a CAN, 44 · lei 23), com o estado `informa`; o aviso de falha nas travas do serial e do modelo, e o neutro na 13; a lista em cartão, o cabeçalho com contador, a faixa, a barra do sistema e o rodapé. A CAN não tem caixa de espera: antes do bloco do ativo, a seção não aparece (decisão 61). O rótulo de topo fica sempre em 12, com a letra de 1,2 (`--t-legenda`, `--ls-rotulo-topo-fora`), como as cinco referências que o desenham. As catorze referências, contra o HTML (`node scripts/tela.mjs todos T07`): 00 0,04% · 01 0,01% · 02 a 05 0,04% · 06 0,02% · 07 0,04% · 08 e 09 0,01% · 10 0,1% · 11 0,08% · 12 3,51% · 13 4,62%. O que sobra tem nome: os glifos do Lucide no poço (a folha 3 desenha o círculo de 9, e o Lucide o de 10), em todas, e no poço do aviso da 02 e da 03; na 10, o ENCERRAR apagado; na 12, o Firmware de 64 da referência (acima, na alimentação abaixo da faixa); e, na 13, a referência desenha a tela puxada 50 pra cima (o título fora do quadro, a lista inteira acima do rodapé), e o protótipo abre no começo, com o título, e o fim da lista passa do pé, onde o miolo rola (diferença conhecida da referência: com o aviso, a 13 não cabe, e nada rola sozinho). Os textos conferem em treze (`node scripts/textos.mjs T07`); a 12 é a da faixa com a quebra (acima). O movimento: `node scripts/caminho.mjs mov-t07`.

O aviso das travas (02, 03) é o desenho do *processo parado* da lista de peças — o mesmo `Aviso` de falha. A lista traz peças que nenhuma das onze referências desenha (o topo do menu inteiro, faixa · sem ação, linha do histórico, a lista de empresas, encerrando, pede o corte, sem homologar, linha de opção, lista com contagem, item feito, linha da fila, linha da re-checagem): vale o que as referências desenham (diferença conhecida).
- **no protótipo:** a leitura passa pelas 9 linhas, um por tique, e o contador conta as 8 que contam (*8 de 8*) · a frase embaixo do nome é a `nota` da linha (a faixa do modelo, os satélites, as mensagens), antes da causa · as mensagens levam o i no poço · a alimentação e as mensagens têm 54, e o GPS, 50, como as referências desenham (esperando, sem a frase, a alimentação volta aos 50) · o caso `modulo-com-pendencias` (o M2C-0362) monta a 13: o aviso neutro em cima, quando a leitura termina, e as 12 mensagens na linha delas · o firmware que trava diz *na lista: 8.03 e 8.04*
  - no protótipo · o caso `mensagens-pendentes` (o M2C-0417 com 12 mensagens que ainda não enviou) muda a mesma linha: *12 mensagens ainda não enviadas*, com o i, como a 13 · nenhuma referência da T07 desenha o herói com ele (a 00 diz *0 mensagens ainda não enviadas*), e no fluxo ele não vale: é o caso da folha das mensagens da T09 (a 27), que abre pela coluna da T09 · o número que a linha diz fica gravado com o diagnóstico (`etapas.preChecagem.mensagens`), o que o diagnóstico leu
