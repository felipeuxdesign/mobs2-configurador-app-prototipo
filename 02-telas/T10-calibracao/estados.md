# T10 · estados e momentos

**No palco:** o painel e `?tela=T10` abrem o ônibus RKT-8H42 + M2C-0417 em *Nada a calibrar neste ativo*, como no caminho normal. A calibração do caminhão KNB-5H39 + M2C-0371 fica em **Estados desta tela**: hodômetro (`00`), semeado (`01`), digitado (`05`), gravando (`06`), relendo (`07`), horímetro (`08`) e completa (`09`). Todos os exemplos abrem parados, inclusive pelos links desses momentos. As regras de calibração do ativo da sessão e as fotografias com `print=1` continuam as mesmas. O caminhão não é entrada navegável; isso não cria referências, tipos ou contagens.

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da calibração do caminhão | sessão M2C-0371 + KNB-5H39 · hodômetro 87.604 no módulo, 87.712 no painel |
| `01-momento-hodometro-semeado` | momento | `Semear o hodômetro` | `calibracao` |
| `02-estado-rotacao-caminhao-coletor` | estado | o modelo calibra rotação e velocidade | `calibracao.porModelo · ma-02 · KNB-5H39` |
| `03-estado-ja-semeado` | estado | o hodômetro já foi semeado antes | `calibracao` |
| `04-estado-modulo-sem-pulsos` | estado | o módulo não recebe pulsos | `grandeza-indisponivel` |
| `05-momento-hodometro-digitado` | momento | digitar o valor do painel · a régua diz o lado da diferença | `calibracao` |
| `06-momento-gravando-no-modulo` | momento | tocar em `Semear o hodômetro` · 1s | derivado do fluxo |
| `07-momento-relendo` | momento | depois de gravar · 1s, e o tambor rola | derivado do fluxo |
| `08-momento-horimetro` | momento | `Calibrar o horímetro` | `calibracao` |
| `09-momento-calibracao-completa` | momento | `Semear o horímetro`, com a releitura conferindo | derivado do fluxo |
| `10-estado-releitura-nao-confere` | estado | a releitura passa da tolerância: 500 m a menos, e o limite é 120 m | `releitura-nao-confere` |
| `11-estado-nada-a-calibrar` | estado | o ônibus: rotação e hodômetro vêm direto do veículo | `heroi` |
| `12-momento-corrigindo-o-semeado` | momento | tocar no painel semeado (*toque pra corrigir*, a 01 ou a 09): o painel aberto de novo, e `Semear de novo` | `calibracao` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

**O rótulo da caixa do que não se aplica** : `NÃO SE APLICAM NESTE MODELO` quando todo motivo vem do cadastro do modelo; `NÃO SE APLICAM` quando pelo menos um vem do módulo — o módulo que não lê pulsos derruba a rotação e a velocidade (a 04, que mistura dois motivos do módulo com um do cadastro).
