# T07 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417, sem ativo · o módulo do herói, com os oito itens que contam certos e mensagens só informativas |
| `01-momento-can-lida` | momento | `Ler a CAN`, na cadeia concluída (T09/04), ou o `Diagnóstico do módulo` do menu, com o bloco do ativo gravado · `Calibrar` leva à T10 | derivado do fluxo |
| `02-estado-serial-nao-cadastrado` | estado | o serial não está no cadastro | `serial-nao-cadastrado` |
| `03-estado-modelo-sem-suporte` | estado | o modelo do módulo sem suporte nesta versão | `modelo-sem-driver` |
| `04-estado-firmware-fora-da-lista` | estado | o firmware está fora da lista | `firmware-fora-matriz` |
| `05-estado-firmware-sem-rede-no-modulo` | estado | o firmware está fora da lista e o módulo está sem rede | `firmware-sem-rede-no-modulo` |
| `06-momento-atualizando-o-firmware` | momento | `Atualizar firmware` | `firmware-fora-matriz` |
| `07-estado-modem-sem-sinal` | estado | o modem sem sinal — só informa | `modem-sem-sinal` |
| `08-estado-sinal-da-can-sem-leitura` | estado | um sinal da CAN não chega | `can-estatico-ausente` |
| `09-estado-sinal-da-can-fora-do-esperado` | estado | um sinal da CAN fora do esperado | `can-estatico-isolado` |
| `10-momento-relendo-a-can` | momento | `Ler de novo` | derivado do fluxo |
| `11-momento-lendo` | momento | a leitura correndo · 600ms por linha | derivado do fluxo |
| `12-estado-alimentacao-abaixo-da-faixa` | estado | a alimentação do módulo abaixo da faixa — só informa, como o modem | `can-estatico-bateria` |
| `13-estado-sessao-anterior-mal-encerrada` | estado | o canal encontrado aberto: o app fechou o acesso, e pode seguir | `modulo-com-pendencias` |
| `14-estado-atualizacao-nao-terminou` | estado | a atualização do firmware para no meio (nos 62% da 06): *não terminou*, com o que conferir, `Tentar de novo` e `Procurar outro módulo` | `atualizacao-nao-terminou` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
