# T04 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 + RKT-8H42 · fila com 2 itens |
| `01-momento-sem-modulo` | momento | o menu antes de conectar | derivado do fluxo |
| `02-momento-modulo-sem-ativo` | momento | módulo conectado, ônibus ainda não escolhido | derivado do fluxo |
| `03-estado-faixa-modulo-com-falha` | estado | o módulo da sessão perde o link · o cartão do módulo reconecta, e as ferramentas que precisam dele esperam | `link-perdido` |
| `04-estado-checklist-pendente` | estado | o checklist tem itens abertos | `checklist` |
| `05-momento-folha-conta` | momento | tocar nas iniciais | `tecnico` |
| `06-momento-folha-conta-sair-com-sessao-aberta` | momento | `Sair da conta` com sessão ou fila | `filaSaida` |
| `07-momento-folha-trocar-de-empresa` | momento | tocar no nome da empresa, no topo do menu: a atual marcada, e o primário apagado · com uma empresa só, o nome não é botão e a folha não abre | `empresas` |
| `08-estado-folha-trocar-de-empresa-envio-em-andamento` | estado | trocar com evidência subindo | `filaSaida` |
| `09-estado-folha-trocar-de-empresa-com-modulo-conectado` | estado | trocar com a sessão aberta | derivado do fluxo |
| `10-momento-folha-modulo-conectado` | momento | tocar no cartão do módulo com a sessão aberta | `modulos · M2C-0417` |
| `11-momento-folha-ativo-da-sessao` | momento | tocar no cartão do ativo com a sessão aberta | `ativos · a-01` |
| `12-estado-acesso-vencendo` | estado | a sessão de acesso chega ao 5º dia: o diálogo aparece uma vez por dia, na primeira chegada ao menu | `situacao.sessaoAcesso` |
| `13-momento-encerrar-antes-de-homologar` | momento | tocar no ENCERRAR antes de homologar | derivado do fluxo |
| `15-estado-sem-conexao` | estado | o aparelho sem rede — o Últimas instalações espera a conexão | `sem-conexao-no-menu` |
| `16-estado-fila-parada` | estado | a fila parada há mais de 30 min: o aviso sobre o menu, com Ver a fila · *padrão, até o produto decidir* | `fila-parada` |
| `17-momento-folha-conta-sair-sem-pendencia` | momento | `Sair da conta` sem sessão e sem nada na fila: o diálogo de sair pergunta também, e diz que entrar de novo precisa de rede | `fila-vazia` |
| `18-momento-reconectando-ao-modulo` | momento | tocar no cartão do módulo com o link perdido (a 03): *reconectando…* | `link-perdido` |
| `19-momento-checklist-registrado` | momento | a volta ao menu com o checklist registrado (T13/11): o cartão do *Finalizar com checklist* diz o próximo passo | derivado do fluxo |
| `20-momento-folha-conta-sair-com-checklist-registrado` | momento | `Sair da conta` com o checklist registrado: a sessão encerra inteira, com o reinício e o autoteste, antes do login | derivado do fluxo |
| `21-momento-folha-trocar-de-empresa-outra-marcada` | momento | tocar noutra empresa na folha (a 07): ela fica marcada, e o primário acende com `Sincronizar` | `empresas` |

No protótipo: o `13` abre pelo toque no ENCERRAR, antes de homologar — no menu, e pelo `Encerrar a sessão` das folhas do módulo e do ativo —, e pelo endereço, como os outros momentos · o `07` abre pelo toque no nome da empresa, e pelo endereço: o app vivo no mundo do herói, com as três empresas e a atual marcada · o `08` e o `09` abrem pelo endereço, parados e sem toque, fora da coluna (o campo `coluna` do índice: eles nascem de um toque na folha) — o `08` com a evidência subindo da fila do mock, e o `09` com a sessão do herói. No fluxo, o `09` é o diálogo que o `Sincronizar` da folha abre, com outra empresa marcada e a sessão aberta (`06-prototipo/logica.md` · O contexto é a empresa).

No protótipo: a `17` e a `18` abrem pela coluna — a 17 no fim, a 18 logo depois da 03 — e pelo endereço, paradas no quadro delas (o sair sem sessão e sem fila, montado pelo caso `fila-vazia`; o reconectando, na sessão do herói com o link perdido) · a `19`, a `20` e a `21` se alcançam tocando — a 19 voltando da T13/11 com o checklist registrado, a 20 no `Sair da conta` com ele, a 21 marcando outra empresa na folha — e pelo endereço, que traz o checklist registrado na 19 e na 20 · o sair abre sempre o diálogo, e o momento é o do que vale: a 06, a 17 ou a 20.

No protótipo: o `15` abre pela coluna, montado pelo caso `sem-conexao-no-menu` (só *rede: false*) e com a sessão do herói, que a referência desenha na faixa — M2C-0417 e RKT-8H42 —, como o `03`, o `04` e o `09`. Parado e sem toque, como todo estado; no fluxo, a rede não cai.

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
