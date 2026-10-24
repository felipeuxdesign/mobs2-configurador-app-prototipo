# T16 · Sessão

**A regra da sessão:** a T13 registra o checklist; a homologação acontece aqui, depois do encerramento e do autoteste sem falha. São sete assertivas, com contadores separados de aprovadas, não se aplicam e pendentes; o evento do cartão pendente não impede a homologação. Onde uma nota abaixo fala em oito assertivas ou Extended ID, vale esta lista (`M.autotesteEncerramento`).

Encerrar a sessão de configuração provando que a configuração sobreviveu ao desligar.

| | |
|---|---|
| **Elemento-assinatura** | a cadeia do encerramento e o autoteste assertiva por assertiva, com o valor lido |
| **Chrome** | faixa de sessão, até ela subir no fim |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 com o checklist registrado, pronta para o encerramento e autoteste |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 8 · 3 — ver `estados.md` |

## O que se toca

- a legenda de cada passo, enquanto ele corre: *Contadores e estado* — Grava os contadores e o estado no módulo, pra nada se perder no reinício · *Reinício do módulo* — O módulo reinicia sozinho; leva alguns segundos (no que reinicia por comando) · no que não reinicia por comando, *Este módulo não reinicia por comando. Desligue a alimentação dele e ligue de novo, uma vez só.* (a 09) · *Releitura completa* — Ele lê de volta o que ficou gravado. É isto que prova que a configuração sobreviveu ao reinício · *Repouso do módulo* — Devolve o módulo ao repouso que ele tinha antes da sessão · *Canal de programação* — Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar · *Registro da sessão* — Guarda o que foi feito aqui, pra ir ao servidor junto com a instalação · *Desconexão* — Solta o Bluetooth. O módulo fica livre pra outro aparelho · *Autoteste* — Confere as assertivas uma por uma, cada uma com o valor lido
  - **no protótipo:** cada legenda aparece embaixo do nome do passo que corre, no lugar que a peça do encerramento tem (a folha 5 · *a legenda só no passo que corre*), com o ponto final das três que as referências desenham (`00`, `01`, `03`); nos 4 passos da sessão abortada, as dos quatro que rodam. O passo 2 leva a legenda do reinício: no herói, que reinicia por comando, *O módulo reinicia sozinho. Leva alguns segundos.* (a 01), com *reiniciando*; no VL08, que não reinicia por comando, a do corte, com *com você* e o glifo da energia no poço (a 09, `passosEncerrando` · `corte`). A do *Autoteste* fica no dado e não aparece: o passo 8 é a *Sessão encerrada*. A palavra da direita enquanto corre (como *relendo* e *fechando*) fica sem texto nos passos 1, 4, 6 e 7
- `ENCERRAR` na faixa → o encerramento corre
  - no protótipo: `ENCERRAR` na faixa → o encerramento corre: com a sessão homologada, os passos 1 a 7, um a cada 600 ms; ao fechar o 7, a faixa fica sem sessão e a tela passa pra *Sessão encerrada*, onde as 8 assertivas acendem a 400 ms, e a prova e o `Voltar ao menu` entram com a última
- **o reinício é por comando, no módulo que aceita** (o VL06 do herói, a 01; o mock, `reinicioPorComando`): *Reiniciando o módulo…*, depois *de volta* · o técnico não faz nada · se a conexão com o celular cair nesse intervalo, *Reconectando…* (a 08), nunca falha: a queda do reinício não é falha
- **o módulo que não reinicia por comando pede o corte, uma vez** (o VL08, a 09): o passo 2 diz *com você*, com o glifo da energia no poço (o *é com você* da folha 3), e a legenda manda desligar a alimentação e ligar de novo, uma vez só · o primário espera, apagado, *Esperando o módulo religar…*, com *A saída volta quando o autoteste terminar* embaixo · o módulo de volta, o passo confere, e o encerramento segue · é o único passo do encerramento em que o técnico age
- **o módulo que não volta do reinício** (a 10): passado o tempo limite, o passo 2 diz *não voltou*, em vermelho, com o xis no poço e o trilho embaixo dele na divisória, e a legenda diz o que conferir: *O módulo não voltou depois do reinício. Confira se ele está ligado e perto do celular.* · `Tentar de novo` espera o módulo de novo, do mesmo passo · `Encerrar sem homologar` encerra sem o autoteste: a falha bloqueia a homologação, não o encerramento (HU-T16-5) · sem o módulo, o repouso e o canal não fecham, e o próximo que conectar acha o canal aberto e fecha antes de começar (HU-T16-8, T07/13) · a sessão encerrada desse caminho não tem referência: a da 04, com o repouso e o canal sem rodar
- **as sete assertivas, nesta ordem**: a configuração confere depois do reinício · os contadores semeados sobreviveram · o reset de leitura (só quando foi usado; senão, *não se aplica*, com o motivo) · o ID confere com o cadastro, e as pendências registradas · o canal de programação fechado · o repouso do módulo restaurado · o evento do cartão chega ao servidor · sem o Extended ID e sem os pontos de cerca
- **três contadores separados**: *aprovadas*, *não se aplicam* e *pendentes* · nunca *7 de 8* · *não se aplica* mostra o motivo e não conta como aprovada · quando uma falha, ela aparece em vermelho na lista, e a homologação fica bloqueada com a causa e a quem acionar, *Acione o gestor.* (a 05) · o que fazer em cada assertiva e um refazer o autoteste são perguntas do produto
- **o evento do cartão fica pendente**, *confere em até 24 h*, e não impede a homologação: depende do servidor · na 02, a nota diz só *O evento do cartão não impede a homologação.*: a linha do evento já diz o prazo, e a tela cabe sem rolar
- **a homologação mora aqui**: *Instalação homologada*, com horário, é o resultado do autoteste sem falha (a 02) · é a única tela do app com essa palavra
- **no protótipo:** o reinício corre no encerramento, *reiniciando* e a legenda, com o primário *Reiniciando o módulo…* e o passo no espaçamento justo (como a 01 desenha) · o 01 e o 08 abrem pelo endereço e pela coluna no herói, o RKT-8H42 × M2C-0417, o par que a referência desenha (`parDoReinicio`: na empresa do contexto, o primeiro ativo cujo módulo reinicia por comando); no fluxo, o reinício do herói é por comando e nenhum caso derruba a conexão, então o *Reconectando…* só se vê pelo endereço da 08 · a 09 abre pelo endereço e pela coluna, parada, no caminhão do caso `pronto-para-fechar` (o KNB-5H39 × M2C-0371, o VL08, `reinicioPorComando: false`, `parDoCorte`); no fluxo, o encerramento de um módulo que não reinicia por comando mostra o corte no passo 2, e o módulo volta no ritmo dos passos (o protótipo não tem como saber da alimentação: a volta é simulada) · a 10 abre só pela coluna, parada, no herói (o caso `reinicio-sem-volta`): no protótipo, nenhuma espera estoura (decisão 64) · o `Tentar de novo` espera de novo, do mesmo passo, e o `Encerrar sem homologar` roda os passos que deixam o módulo seguro sem o módulo — o repouso e o canal pulados, o registro e a desconexão — e a sessão encerrada da 04, com o repouso e o canal *pulado* e sem a nota do que não rodou (sem referência: a nota da 04 diria que os contadores não rodaram) · a sessão encerrada mostra a prova *INSTALAÇÃO HOMOLOGADA · às 14:30 · a configuração sobreviveu ao reinício* (o relógio parado; a referência diz 14:42, diferença conhecida), os três contadores (`contadoresDas`: só os que têm alguma, das que já acenderam, 13/600 com o número em 700) e as sete assertivas — a de 50, e a com o porquê embaixo, de 58 (o reset que não se aplica, o cartão pendente) · no autoteste correndo, a da vez diz *conferindo* · embaixo das assertivas, a nota de 12 numa linha, *O evento do cartão não impede a homologação.* (`T.notaCartao`, decisão 61): o prazo já está na linha do evento, e a 02 cabe sem rolar
- encerrada: `Voltar ao menu`
  - no protótipo: encerrada: `Voltar ao menu` → o menu sem sessão; o voltar faz o mesmo
- ENCERRAR antes de registrar o checklist → o diálogo *Encerrar antes de terminar?*, por cima da tela de onde ele veio (decisão 36) · o `Encerrar mesmo assim` → os 4 passos da sessão abortada · com o checklist registrado, o ENCERRAR leva ao encerramento completo
  - no protótipo: ENCERRAR antes de registrar o checklist → o diálogo *Encerrar antes de terminar?* (decisão 36, `src/estado/encerrar.jsx`), e o `Encerrar mesmo assim` → os 4 passos da sessão abortada e a *Sessão encerrada* sem homologar. Pelos diálogos do menu (`Encerrar a sessão e sair`, `Encerrar a sessão e trocar`), os 4 passos seguem pro destino deles · com o checklist registrado, os dois do menu rodam o encerramento completo, e a tela segue pro destino quando o autoteste termina (T04/20)
  - **no protótipo** (decisão 36): quem chega aqui já confirmou — no diálogo *Encerrar antes de terminar?*, aberto pelo ENCERRAR por cima da tela de onde ele veio, ou num dos diálogos do menu. Os 4 passos em si não perguntam de novo
- **o `Descartar` da sessão interrompida pergunta antes** (a 11): *Descartar a instalação?* · *O M2C-0411 foi zerado e ainda está sem a conexão. Antes de descartar, o app grava só a conexão, pra ele voltar a falar com o servidor.* · *O que já foi enviado fica no módulo, e o descarte fica registrado.* · `Retomar a instalação`, o principal (o mesmo `Retomar` da 06), e `Gravar a conexão e descartar` · confirmado, o app grava só a Conexão, como a T09/33, e o descarte fica registrado (HU-T09-10: o módulo zerado não fica sem a conexão; HU-T16-7) · o voltar fecha o diálogo e volta à 06, sem escolher pelo técnico · a sessão que caiu depois da Conexão gravada não precisa gravar nada: o diálogo fica com a segunda frase, e o link é `Descartar` (sem referência)
- no protótipo:
  - sessão interrompida: `Retomar` → a cadeia da T09, no bloco que parou; `Descartar` → o diálogo da 11 (a URL diz a 11): `Retomar a instalação` é o mesmo Retomar, e `Gravar a conexão e descartar` vai ao menu sem sessão, com o descarte registrado na fila do aparelho — um *Registro da sessão* do ativo da sessão (`dados.js` · `itemDoDescarte`), que o cartão da Fila de saída passa a contar (3) · a conexão gravada não tem quadro: é a da T09/33, que o protótipo não repete aqui · o voltar, com o diálogo aberto, o fecha e volta à 06; sem ele, não faz nada · a 06 e a 11 abrem pela coluna, paradas (a 11 logo depois da 06), e a 11 pelo endereço do momento, viva
  - no encerramento e no autoteste, o voltar não faz nada
- **no protótipo · a medição:** as 12 referências contra o HTML (`node scripts/tela.mjs todos T16`) fecham em 0%, menos as diferenças conhecidas de antes — a 01 e a 08, 0,01%; a 02, 0,27% (o 14:42); a 05, 0,24%; a 07, 0,1% · na escala 1, o mesmo desenho · os textos conferem nas 12, menos o *14:42* da 02 · os três contadores trazem o separador junto da palavra (*aprovadas ·*), como o `textos.md` escreve
- **no protótipo · os blocos** (decisão 49): a prova da `02` diz *6 blocos* no lugar da versão, contados da ordem da cadeia · na `06`, os blocos confirmados mostram o conteúdo do bloco no par do caso, o mesmo da T09 (o do caso, nunca o do herói): a Limpeza *feita*, o Ativo *OF-1621* e as Cercas *4 regiões*; e a legenda do bloco que parou diz o que já foi gravado, montada dos confirmados do caso, sem a limpeza: *o ativo e as cercas já estão gravados* (só o ativo e as cercas têm a forma com artigo no `textos.md`) · o `Retomar` grava só quantos confirmaram (`etapas.cadeia.confirmados`), sem a versão
  - o QAH-1M67 (a-13), do caso `sessao-interrompida`, tem quatro regiões no mock (`CERCAS.regioes`), e o elo diz *4 regiões* pelo dado, como a referência desenha
- **no protótipo · a assertiva dos identificadores** (T16/02): a limpeza nunca apaga os identificadores — os dois escopos do `CADEIA.escopos` os mantêm —, e o autoteste confere que eles continuam lá: *Extended ID · preservado*. A assertiva é uma só, e diz o mesmo em toda sessão encerrada · **diferença conhecida · a `05`:** a `05` desenha *Identificadores · 3 de 3* (e o `textos.md` dela também); o protótipo mostra *Extended ID · preservado* nas duas. O rótulo do mock é *Identificadores* (a checagem de cobertura confere a ordem das oito); a saída é a `05` e o rótulo do mock seguirem a `02`
- **quanto afasta** (contra o HTML · contra o PNG): `00` 0,05% · 1,68% · `01` 0,06% · 1,63% · `02` 0,06% · 3,18% · `03` 0,02% · 2,80% · `04` 0,05% · 1,57% · `05` 0,21% · 2,40% · `06` 0,10% · 1,26%. O que sobra é o contorno dos glifos, e, com nome, na `05`, o *Extended ID · preservado*. Os textos conferem nas outras cinco

**No protótipo · o padrão da T16/02**, que as referências seguem:

- **o vão de 14:** o miolo tem 14 entre os blocos nas sete
- **o subtítulo no bloco do título:** na `03`, como na `06`, o título e o subtítulo são um bloco, com 4 entre os dois, sem margem negativa puxando o subtítulo pra cima
- **a nota do que não rodou numa peça só:** na `04`, a caixa tracejada com uma frase, *Não rodaram: contadores, reinício, releitura e o autoteste.* (o `textos.md`) — a de 13 em 500 e `--tinta-secundaria` (o `corpo pulado` da nota), sem o rótulo em caixa-alta, e as duas linhas equilibradas pelo `text-wrap: balance` na caixa, não na frase. Como a referência monta, a caixa é um bloco e a frase corre em linha dentro dela: cada linha tem a altura da linha da caixa, e não só a entrelinha da frase (sem isso a frase subiria 1,5 e a caixa encolheria 3)
- **três estados, e não um:** o *não se aplica* — o círculo com o traço, em `--marca` — é só da assertiva do autoteste que não vale pra esse ativo, e aparece onde o autoteste aparece, na `02` e na `05` · o *pulado* é o passo que o encerrar sem homologar pula, na `03`: o traço solto da folha 5 no poço, em `--marca-limite`, e o texto *pulado* · o *—* é o passo que ainda não chegou, na `00` e na `01`, com o círculo vazio no poço. Pro leitor de tela, também são três: o círculo com o traço diz *não se aplica*, o círculo vazio diz *ainda não*, e o traço do pulado fica mudo (`aria-hidden`), como na referência `03`, que não dá nome a ele — a situação ao lado já diz *pulado*, e nenhuma legenda da folha 3 nomeia esse traço — e não *não se aplica*, o nome do traço da folha 3, que faria o leitor ouvir *não se aplica · Contadores e estado · pulado*
- **no protótipo · a pausa**: o poço do bloco que parou, o *SEM HOMOLOGAR* da `04` e o *parou aqui* da `06`, leva a `pausa` do jogo de ícones (a lei 14): dois traços finos (`M9.5 7.5v9 M14.5 7.5v9`), os mesmos das referências

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sem sessão
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- uma ação
- processo correndo
- com legenda
- não se aplica
- assertiva da sessão
- linha de conferência
- aviso
- linha do histórico
- a lista de empresas
- encerrando
- reiniciando
- pede o corte
- sem homologar
- com contador
- linha de opção
- lista com contagem
- item feito
- item com ressalva
- prova da sessão

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sem sessão
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- os glifos de estado
- os poços
- os marcadores
- assertiva da sessão
- falha
- aviso
- nota tracejada
- encerrando
- reiniciando
- sem homologar
- com contador
- prova da sessão

Medido nas referências e no código, com os nomes das linhas do `componentes.md`. Ficam fora as nove que o código não usa: a faixa · sessão aberta (enquanto a sessão fecha, a faixa é a sem ação, e depois a sem sessão), a com legenda (quem explica o primário apagado é a explicação embaixo dele, a do processo correndo), a linha de conferência, a nota com rótulo (o NÃO RODARAM é a nota tracejada), a linha do histórico, a lista de empresas, o com contador de falha (a sessão que falha conta em neutro as que passaram), a linha de opção e a lista com contagem. Estão as de toque da folha 1 (o primário nos três estados, apagado enquanto o encerramento corre, e o link do `Descartar`), os átomos da folha 3 (os glifos e os poços do encerramento e das assertivas, e o LED da faixa), a falha (A HOMOLOGAÇÃO FICA BLOQUEADA, `05`) e a nota tracejada (`04`). As diferenças da tela contra a folha são variante nomeada da peça, declarada lá: a assertiva da sessão com o nome aceso em todo estado, o círculo com o traço no não se aplica (o glifo de fora da folha 3) e o relógio no ainda não, a última de 54 e a que ainda não acendeu; a falha em bloqueio, sem poço (Lei 7 · exceção); o encerramento em pausa, a sessão interrompida (`06`); e o cabeçalho com o subtítulo (`03` e `06`). A nota do que não rodou é a nota tracejada com a frase de 13 em `--tinta-secundaria` (`corpo pulado` na peça), sem o rótulo e equilibrada; o passo pulado leva o traço solto da folha 5 (o *sem homologar* da peça), e o círculo com o traço fica só nas assertivas. Pelas folhas 4 e 6, o *com contador neutro* e o *com contador de falha* são uma peça só, o *com contador*: o *de falha* desta nota é ele em falha · e o *não se aplica* da lista do design é o da assertiva, o círculo com o traço, que o código desenha na assertiva da sessão (a variante acima).

## Histórias de usuário

- **HU-T16-1** — A faixa fica no topo de toda tela: abertura, módulo, tempo decorrido e a única saída
- **HU-T16-2** — Enquanto a sessão vive: canal reaberto sozinho, módulo e ativo travados, repouso inibido
- **HU-T16-3** — O encerramento executa 8 passos e mostra cada um
- **HU-T16-4** — Vejo o autoteste assertiva por assertiva, com o valor lido — nunca um "OK" agregado
- **HU-T16-5** — Falha do autoteste bloqueia a homologação, não o encerramento
- **HU-T16-6** — Sessão interrompida é oferecida de volta, com o ponto de retomada
- **HU-T16-7** — Descartar não desfaz o que foi gravado — descarta a intenção, e isso é registrado
- **HU-T16-8** — Canal aberto por sessão anterior é anomalia: o app fecha antes de começar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
