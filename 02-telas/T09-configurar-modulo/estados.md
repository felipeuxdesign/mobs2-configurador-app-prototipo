# T09 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · os blocos do mock |
| `01-estado-bloco-recusado` | estado | o módulo recusa um bloco | `bloco-recusado` |
| `02-estado-queda-na-cadeia` | estado | o link cai no meio da cadeia | `queda-na-cadeia` |
| `03-estado-recuperacao-ate-a-conexao-gravar` | estado | tentar sair antes da Conexão gravar | derivado do fluxo |
| `04-momento-cadeia-concluida` | momento | o último bloco relido | `cadeia` |
| `05-momento-o-que-vai-ser-gravado` | momento | `Configurar módulo`, numa instalação nova | derivado do fluxo |
| `06-estado-a-configuracao-nao-cabe` | estado | o que vai ser gravado passa do espaço do módulo | `conteudo-nao-cabe` |
| `08-momento-manutencao-escolher-o-bloco` | momento | `Configurar módulo`, numa manutenção, ou a ação de um bloco na T11 · também consultável parado na coluna | `modulo-ja-deste-ativo` |
| `09-momento-manutencao-reenviando` | momento | `Reenviar`, com um bloco escolhido · também consultável parado na coluna | `modulo-ja-deste-ativo` |
| `10-momento-manutencao-concluida` | momento | a cadeia curta da manutenção fecha · as cercas relidas · também consultável parado na coluna | derivado do fluxo |
| `07-estado-pontos-de-cerca-demais` | estado | as cercas têm mais pontos do que o módulo guarda | `pool-esgotado` |
| `11-momento-conferindo-o-servidor` | momento | o módulo falou com o servidor? conferindo | `heroi` |
| `12-estado-o-modulo-ainda-nao-falou-com-o-servidor` | estado | ainda não, com o que conferir | `servidor-ainda-nao` |
| `13-momento-manutencao-folha-de-confirmacao` | momento | *Reenviar as cercas*, antes de enviar: a consequência, e o técnico confirma | `modulo-ja-deste-ativo` |
| `14-momento-manutencao-o-ativo-pergunta-pelos-eventos` | momento | o ativo reenviado confere · o app pergunta pelos eventos | `modulo-ja-deste-ativo` |
| `15-momento-manutencao-o-leitor-pergunta-pelos-eventos` | momento | o leitor reenviado confere · o app pergunta pelos eventos | `modulo-ja-deste-ativo` |
| `16-estado-manutencao-falta-reenviar` | estado | o técnico deixou o leitor e os eventos para depois · a lista mostra o que falta e o motivo | `falta-reenviar` |
| `17-momento-manutencao-folha-do-ativo` | momento | *Reenviar o ativo*, antes de enviar: os eventos dependem dele | `modulo-ja-deste-ativo` |
| `18-momento-manutencao-folha-do-leitor` | momento | *Reenviar o leitor*, antes de enviar: os eventos dependem dele | `modulo-ja-deste-ativo` |
| `19-estado-manutencao-leitor-fica-para-depois` | estado | o técnico deixou o leitor para depois · o leitor mostra *fica para depois* e continua com o Reenviar · os eventos acendem | `cercas-reenviadas` |
| `20-momento-manutencao-leitor-confere-eventos-liberados` | momento | o leitor reenviado confere · os eventos acendem | `cercas-reenviadas` |
| `21-momento-gravando-a-limpeza` | momento | `Gravar no módulo`: a limpeza completa, um comando só · a barra vai pelo tempo | `cadeia` |
| `22-momento-gravando-o-ativo` | momento | a limpeza confere; o ativo grava o script padrão e a biblioteca da CAN · a barra conta os sinais da CAN | `cadeia` |
| `23-momento-gravando-as-cercas` | momento | o ativo confere; as cercas gravam · a barra conta os pontos | `cadeia` |
| `24-momento-conferindo-as-cercas` | momento | gravadas as cercas, o app relê · o rótulo vira *conferindo*, e a barra recomeça na mesma unidade | `cadeia` |
| `25-momento-gravando-os-eventos` | momento | o leitor confere; os eventos gravam · a barra conta os eventos | `cadeia` |
| `26-momento-gravando-a-conexao` | momento | os eventos conferem; a conexão grava · a barra conta os três ajustes: a APN, o servidor e o reinício do modem | `cadeia` |
| `27-estado-mensagens-que-o-modulo-nao-enviou` | estado | `Gravar no módulo` com mensagens que o módulo ainda não enviou: a folha pergunta antes de a limpeza apagar | `mensagens-pendentes` |
| `28-momento-manutencao-pelo-menu-nada-escolhido` | momento | `Configurar módulo`, pelo menu, numa manutenção: nada escolhido, e o primário apagado | `modulo-ja-deste-ativo` |
| `29-momento-esperando-o-envio` | momento | `Esperar o envio`, na folha das mensagens (a 27): a contagem do envio, ao vivo | `mensagens-pendentes` |
| `30-momento-o-que-vai-ser-gravado-menos-a-conexao` | momento | `Reenviar tudo, menos a conexão`, na T11: a limpeza de configuração, e a Conexão fica como está | `conferencia-confere` |
| `31-estado-bloco-recusado-de-novo` | estado | o `Tentar de novo` também recusado: a saída que grava só a conexão | `bloco-recusado-de-novo` |
| `32-momento-folha-gravar-so-a-conexao` | momento | `Gravar só a conexão e encerrar`, no recusado de novo (ou o ENCERRAR, ou o voltar): a folha que confirma | `bloco-recusado-de-novo` |
| `33-momento-gravando-so-a-conexao` | momento | confirmado na folha: só a Conexão grava, e depois a sessão encerra | `bloco-recusado-de-novo` |
| `34-momento-manutencao-conexao-conferindo-o-servidor` | momento | `Reenviar a conexão`, na manutenção: gravada, a Conexão espera o servidor | `modulo-ja-deste-ativo` |
| `35-estado-o-modulo-nao-voltou` | estado | o `Reconectar` da queda passa do tempo limite: o que conferir e a quem acionar | `modulo-nao-voltou` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

Os momentos 21 a 26 são a cadeia da `00` andando, uma etapa por quadro, na ordem: a `00` é o meio dela (o Leitor gravando), entre a 24 e a 25. O estado 27 é a folha que abre por cima do *o que vai ser gravado* (a `05`).

No protótipo, os momentos **08, 09, 10, 28, 30 e 34 também são consultas paradas na coluna**, abaixo dos estados, na ordem: *Manutenção · escolher o bloco*, *Manutenção · reenviando*, *Manutenção · concluída*, *Manutenção · pelo menu*, *Reenviar tudo, menos a conexão* e *Manutenção · a conexão e o servidor*. Reutilizam os quadros e o par das referências (M2C-0417 + RKT-8H42), com as cercas escolhidas, sendo reenviadas ou concluídas, nada escolhido (28), o que vai ser gravado sem a Conexão (30) e a Conexão reenviada esperando o servidor (34). Pela coluna, não recebem toque nem deixam a cadeia avançar; o `Voltar ao fluxo` restaura a sessão, o quadro e o avanço anteriores à primeira consulta. Continuam classificados como momentos: não há estado novo nem fluxo alternativo. O caminho normal de configuração e os acessos da manutenção já existentes ficam preservados; abrir um momento pelo seu endereço de fluxo continua seguindo a regra dele.

- no protótipo: a `00` é a tela da régua — no print, `?tela=T09` fica no quadro da cadeia gravando, o Leitor em *2 de 4 ajustes*; fora do print, o mesmo endereço é o app vivo na semente (*abre no que vai ser gravado*), e a URL passa a dizer o `05`. A `00` e as 21 a 26 se alcançam no fluxo, no `Gravar no módulo`: o endereço acompanha a etapa da vez · pelo endereço e no print, as 21 a 26 abrem paradas no valor da referência (`QUADROS`, em `app/src/telas/T09/cadeia.js`); fora do print, andam dali · a `27` abre pela coluna, o `05` do herói com a folha das mensagens por cima, pelo caso `mensagens-pendentes`; no fluxo, ela abre no `Gravar no módulo` quando o diagnóstico leu mensagens por enviar no módulo da sessão · o `08` e o `09` pelo endereço são a sessão da semente, o par do caso `modulo-ja-deste-ativo` (o herói); no fluxo, o `08` vem do modo que a T06 grava · o `06` e o `07` abrem pela coluna, montados pelo caso; no fluxo, valem toda vez que o par da faixa é o do caso, porque são a regra do cadastro (`tela.md` · No protótipo · como se constrói) · a `29` abre pela coluna embaixo da 27, pelo mesmo caso, com o envio em *5 de 12*; no fluxo, no `Esperar o envio` · a `31` abre pela coluna embaixo da 01, pelo caso `bloco-recusado-de-novo`, e a `32` e a `33` embaixo dela; no fluxo, na segunda recusa das Cercas · a `35` só pela coluna, embaixo da 02, pelo caso `modulo-nao-voltou`: no fluxo, o `Reconectar` sempre volta
