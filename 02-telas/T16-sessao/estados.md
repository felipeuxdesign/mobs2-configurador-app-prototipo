# T16 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 com o checklist registrado, antes da homologação |
| `01-momento-reiniciando-o-modulo` | momento | o passo do reinício, no módulo que reinicia por comando (o VL06 do herói): automático, sem ação do técnico | `autotesteEncerramento` |
| `02-momento-instalacao-homologada` | momento | o autoteste passa: a instalação homologada, com horário | `autotesteEncerramento` |
| `03-momento-encerrando-sem-homologar` | momento | ENCERRAR antes de homologar | derivado do fluxo |
| `04-momento-encerrada-sem-homologar` | momento | os 4 passos terminam | derivado do fluxo |
| `05-estado-homologacao-bloqueada` | estado | uma assertiva falha: a homologação bloqueada, com a causa e a quem acionar | `autoteste-falhando` |
| `06-estado-sessao-interrompida` | estado | a sessão caiu e volta oferecida | `sessao-interrompida` |
| `07-momento-autoteste-correndo` | momento | as assertivas acendem em ordem · 400ms cada | `autotesteEncerramento` |
| `08-momento-reconectando-no-reinicio` | momento | a conexão cai no reinício: reconectando · a queda do reinício não é falha | `autotesteEncerramento` |
| `09-momento-o-corte-de-alimentacao` | momento | o passo do reinício no módulo que não reinicia por comando (o VL08 do caminhão): o corte, com o técnico | `pronto-para-fechar` · o VL08 (`reinicioPorComando: false`) |
| `10-estado-o-modulo-nao-voltou-do-reinicio` | estado | o módulo não volta do reinício no tempo limite: `Tentar de novo` ou `Encerrar sem homologar` | `reinicio-sem-volta` |
| `11-momento-descartar-a-instalacao` | momento | `Descartar`, na sessão interrompida (a 06): o diálogo pergunta antes, e grava a conexão antes de descartar | `sessao-interrompida` |


A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

**Os contadores do cabeçalho:** com o checklist registrado, a cadeia mostra o passo que corre (`3 de 8` na 00, `2 de 8` na 01); no encerramento antecipado, mostra quantos dos quatro passos seguros já fecharam (`1 de 4` na 03). O autoteste tem **sete assertivas** e mostra contadores separados de **aprovadas**, **não se aplicam** e **pendentes**, enquanto lê e no resultado. Nunca mostra `7 de 8`; a assertiva falha aparece no próprio item e bloqueia a homologação.

**A assertiva Contadores** mostra o que o painel do ônibus tem no mock (`calibracao.painel`: `482.317 km · 9.640 h` no herói). No ônibus que não tem contador no mock, ela fica *ainda não*, com o traço — nunca o check sem o valor lido (HU-T16-4).
