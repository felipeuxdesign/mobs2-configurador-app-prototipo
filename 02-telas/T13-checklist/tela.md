# T13 · Checklist

**No palco:** o quadro `29`, *Alimentação · relendo*, também fica em **Estados desta tela**, recuado após *Item reprovado*. Abre parado pela coluna e pelo link de momento: sem relógio de releitura, toque ou gravação no fluxo. Os resultados já existentes continuam na família. A referência é um momento, e a releitura no fluxo não muda.

Fechar a homologação: o que o app já provou sozinho, e o que o técnico ainda precisa provar.

| | |
|---|---|
| **Elemento-assinatura** | o placar por seção — automático e manual separados — enchendo até o veredito |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · 27 itens |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 37 · 12 — ver `estados.md` |

## A regra do checklist

- O total é calculado por sessão. No herói sem calibração, a referência `00` tem **27 itens**: A 4, B 4, C 4, D 8 (o Autoteste roda ao encerrar e não conta), E 5 e F 2; são **16 de 27** resolvidos e **9 obrigatórios** por fazer. A foto do Painel só entra quando houve calibração; leitor, rotação e bip obedecem às condições do modelo. Não se usa 30 ou 31 como total fixo.
- A **Alimentação** é o que o equipamento lê no fio, confrontado com `faixaTensao` do modelo do módulo (VL06: 9,0 a 40,0 V). O **GPS** aprova pela posição: *com posição* aprova, *sem posição* reprova. A antena fica dentro do módulo, do lado de cima: em curto ou desconectada é defeito do módulo, e o item diz *antena com defeito*, com o que conferir mandando trocar o módulo (sem referência). Os satélites são informação, sem mínimo que aprove esse item.
- A **D** lê os seis blocos e depois o autoteste do módulo, o canal protegido e o ID no cadastro. As pendências só se aplicam com ID reescrito; o protótipo não tem sessão que faça essa reescrita. A leitura inicial preenche as linhas no lugar.
- A **E** recebe os quatro passos aplicáveis da T14 e tem o **bip do leitor**, respondido aqui quando há buzzer. Cartão que não confere e bip não ouvido ficam não conformes, com o campo *O que aconteceu* · **o bip não ouvido só conta com o que aconteceu escrito** (HU-T13-4: a ressalva tem justificativa): o *Não ouvi* abre o campo, e o item ainda não conta (a 42, *16 de 27* e *Faltam 9*); escrito, conta, *não ouvi · com ressalva* (a 50) · **a resposta se refaz**: respondido, o *Ouvi* ou o *Não ouvi*, a linha do bip fica com `Testar de novo`, o botão da linha (folha 6), que toca o bip de novo e volta à pergunta (a 40), até o `Finalizar` (41, 42, 50) Não há ré ou porta no ciclo.
- A **F** tem Posição e Evento de teste. A fila de saída é da T15; a F não bloqueia, e a falha pede ciência antes do registro · **a F falhando diz a causa e leva à tela que corrige** (a 49, HU-T13-2): aberta, a F mostra a Posição que confere e o Evento de teste *não chegou ao servidor*, com `Disparar de novo`, o botão da linha, que leva ao ciclo (T14) pra disparar outro evento · o rodapé diz o que falta, *A Seção F não passou: finalizar pede a sua ciência*, com o `Finalizar instalação` aceso · quantas vezes dá pra disparar é pergunta do produto
- As fotos da **B** se fazem no nível do item, e **a foto vale no `Usar foto`** (decisão 63): o `Tirar foto` mostra a foto no quadro da câmera, com o registro embaixo dela, e o item ainda não conta (44 a 48; ver *A foto vale no Usar foto*, abaixo). A ressalva exige justificativa e foto do problema; o item resolvido fica como leitura. O detalhe reprovado da **C** relê o módulo ali mesmo: primeira releitura ainda não resolve o caso, segunda passa; não leva à T07. A hora do protótipo é 14:30.
- **Finalizar instalação** registra as evidências e o checklist, mostrando *Checklist registrado · aguardando autoteste*. O botão seguinte é **Encerrar sessão**, para a T16, no lugar do `Finalizar instalação`: ele só responde 300ms depois de nascer, e o toque duplo não encerra a sessão (decisão 64, o primário que nasce de um toque, `03-design-system/movimento.md`); **Voltar ao menu** continua disponível. **A homologação é da T16**, depois do autoteste. O campo interno `homologada` da T13 significa checklist registrado.
- O exemplo `29` de releitura na coluna e em seu link abre parado. No fluxo real, a releitura corre após o toque; as consultas não modificam a sessão.

Fontes desta regra: `04-dados/mocks.js` (`checklist`, modelos, casos e releituras), `06-prototipo/app/src/telas/T13/checklist.js`, `index.jsx` e as referências `00`, `11`, `22`, `30` a `42` e `44` a `48`.

## Como o protótipo constrói

As notas abaixo trazem as medições, as decisões e as diferenças conhecidas. Onde uma delas fala em totais de 30 ou 31, GPS por satélites, seis passos na E, Extended ID, calibração na D ou homologação na T13, vale a regra de cima e *O checklist por seção*, abaixo.

- **no protótipo** (padrão, até o produto decidir): as outras três falhas da C montam pelo caso do estado (`gps-fraco`, `entrada-ignicao`, `modem-sem-sinal`) e só pela coluna — o herói, no fluxo, passa · o GPS, as entradas e o modem dizem o valor, sem régua (a variante só com o texto do instrumento, `pecas.jsx`): o GPS diz a posição, com os satélites e a antena embaixo, informação (*0 satélites · antena conectada*, a 22) · o herói lê *com posição* (a leitura nominal do módulo, `leituraNominalModulo.posicao`), com os satélites do diagnóstico · **a antena com defeito** (a regra de cima, sem referência e sem caso no mock): com a antena em curto ou desconectada, o item diz *antena com defeito*, e o detalhe fica sem o *O que conferir* — o de trocar o módulo não tem texto no `textos.md` (diferença conhecida)
- **no protótipo · o reler no lugar**: o `Reler o módulo` liga o *Relendo o módulo…* por 1 s (`RITMOS.relerModuloMs`, o tempo do *Relendo…* da T10), com o primário desligado, o link apagado e o ENCERRAR apagado, como a releitura da CAN na T07 (a 29 desenha o link e o ENCERRAR acesos: 0,24% contra o HTML, diferença conhecida da referência) · aí o mundo fica relido (`mundoDe` · `relido`): os casos da C devolvem a `releitura` do mock, e todo item da C volta atualizado · deu certo, a mesma tela fica positiva (30 a 33), sem troca de quadro: o instrumento sem a falha, o check com o relido e o veredito (a variante `relido` do instrumento, `pecas.jsx`), e um botão só · não deu, o não resolvido (a nota de baixo) · o 29 é da Alimentação: nos outros três, a URL sai do momento, como o não conforme das fotos · o ônibus do caso fica enquanto a tela vive: o `Voltar ao checklist` volta à C dele, 4 de 4 · **o relido diz 14:30**, o relógio parado, como o relido da T10; a referência diz 14:42 (diferença conhecida) · **o rodapé de um botão só fecha em 32**, a regra da peça; as referências 30 a 33 desenham o pé de 24 do rodapé com link (diferença conhecida): 4,01%, 3,61%, 3,69% e 3,21% contra o HTML, com o 14:30 do relido · nos estados da coluna o app está parado (decisão 43), e o 29 é consulta parada (acima)
- **no protótipo · o reler que não resolve**: o mundo conta as releituras (`mundoDe` · `releituras`), e os casos da C devolvem a N-ésima das `releituras` do mock · a 1ª ainda reprova: o detalhe com o valor novo, o xis pequeno com *relido às 14:30 ·* e o que ainda falta, no lugar da frase (a variante `naoResolvido` do instrumento, `pecas.jsx`, o *não confere* da T10/10), o *O que conferir* e o `Reler o módulo` de novo (34 a 37) · relendo de novo, o xis fica na tela · a 2ª passa: o relido (30 a 33) · o 29 é só a primeira da Alimentação: na segunda, a URL sai do momento · **o relido e o não resolvido dizem 14:30**, o relógio parado; as referências dizem 14:42 e 14:41 (diferença conhecida) · **a demo pelo fluxo** não acha a Seção C reprovada: nenhum módulo da busca da T05 é de um caso da C (o M2C-0301 não está entre os que ela acha, e os casos do M2C-0417 só valem no estado da coluna, pro herói passar) · os dois toques se provam no roteiro `reler.mjs`
- **os nomes das seções são curtos**, pra caber no cartão · cada um é uma seção dos requisitos: *A · Identificação* (Identificação) · *B · Montagem* (Instalação física) · *C · Hardware* (Saúde do hardware) · *D · Configuração* (Configuração embarcada) · *E · Ciclo de testes* (Teste dinâmico) · *F · Servidor* (Recebimento no servidor) · o nome curto vale em toda tela, inclusive na de item
- **item automático reprovado tem a seta** e abre o detalhe (a 09): **a tela que ajuda a consertar** — a leitura com a régua da faixa, e o bloco *O que conferir* com três causas, o mesmo da conexão que falha na T05
- **o detalhe relê o módulo ali mesmo**: o botão é `Reler o módulo` · enquanto lê, ele diz *Relendo o módulo…* (a 29: a espera aparece sozinha no fluxo; o exemplo de consulta na coluna fica parado) · deu certo, a mesma tela fica positiva, com o valor novo, *relido às 14:42* e o veredito do item, e um botão só, `Voltar ao checklist` (da 30 à 33) · não deu, fica com o valor novo, ainda vermelho, e no lugar da frase de baixo **o xis pequeno com *relido às 14:41 · ainda…*** e o que ainda falta, como o *não confere* da calibração (da 34 à 37) · o *O que conferir* continua, e o botão volta a ser `Reler o módulo` · a releitura lê o módulo inteiro: os outros itens da Seção C também voltam atualizados · **não leva pra T07**: depois de configurado, a T07 mostra o módulo numa linha só e relê só a CAN · e nada muda de tela sozinho: quem decide voltar é o técnico, como no *relido* da calibração · passou, é leitura, sem seta (a 16)
- **a barrinha segmentada só onde se percorre**: nas fotos da Montagem, o técnico vai do 1 ao 5; no detalhe de um item automático, não tem o que percorrer, e a tela diz só a seção, *C · HARDWARE*
- **cada foto da Montagem tem a sua frase** (*Enquadre…*), no campo `enquadre` do mock, **embaixo do título**, como o título e a frase da T10/11, e nunca dentro do quadro: o quadro da câmera fica só com o ícone, e no app a imagem ao vivo aparece dentro dele, sem nada por cima · as cinco estão desenhadas: a 07 e da 17 à 20 · o 2º item é *Lado de cima do módulo livre*, com a frase *A antena GPS fica dentro, desse lado. Enquadre o módulo e o espaço acima dele.* (a 17), e o *Depois:* do 1º item diz o nome dele
  - no protótipo: o reprovado é a linha de leitura da peça (`ItemDoChecklist`) com o valor em `--vermelho` e a seta, e ela toca — a folha 7 não desenha essa variante (diferença conhecida) · o 16 e o 09 saem do mesmo caso, e a T07/12 também · a frase embaixo do título é o `enquadre` do item, em 15 e 500, `--tinta-secundaria`, a 12 do título (o título e a frase da T10/11), e o quadro da câmera é a peça só com o ícone (`VisorCamera`, a câmera do app da folha 7) · marcado o não conforme, a frase diz *Enquadre o problema*, e volta ao `enquadre` ao desmarcar: troca no lugar, direto (a `animacao.md` não lista a troca; a caixa e o visor se reorganizam como antes) · o 2º item é o `b-lado-de-cima` do mock (o 17), e a frase dele tem duas linhas · o não conforme é do Módulo (08, 15), e nos outros quatro a URL sai do momento · sem a permissão da câmera, a frase fica, e o quadro mostra só a câmera riscada
- a A tem quatro itens, sem o chassi (decisão 46): o serial, o firmware, o ativo vinculado e o pacote de sincronização · a D confere a limpeza e cada bloco gravado (ativo, cercas, leitor, eventos e conexão), o autoteste, o canal de programação e o ID no cadastro, sem a versão
  - **no protótipo** (decisões 52 a 54 e 59): a D lê o conteúdo de cada bloco pela mesma conta da T09 (`conteudoDo`, `src/telas/T09/cadeia.js`: o modelo do ativo, *4 regiões*, *fios azul e amarelo*, *intervalo 30 s* e *TIM · timbrasil.br*, no par da sessão): o bloco gravado com o conteúdo do cadastro confere, e a linha diz só *confere*, como as referências (a 04) · a Limpeza é um comando só, sem conteúdo · **o horímetro pulado** diz *não calibrado*, conta como resolvido e não bloqueia: pulado é o que a T10 marca em `etapas.calibracao.puladas`, ou o opcional do modelo (`calibracao.porModelo.opcionais`) que a calibração concluída não semeou · **o Painel sem calibração**: o item não aparece, a B do herói tem 4 e o total, 27 (*N de 27*); houve calibração quando a T10 semeou ao menos uma grandeza do ativo da sessão · **o Leitor só com leitor**: o item da B, o bloco da D, o cartão e o bip da E saem quando o ônibus não tem leitor — o caso da coluna que o tira (`leitor: false`, o `can-estatico-bateria` da 16) · **a E é a do mock**: até 4 passos do ciclo e o bip, 5 no herói; a velocidade é passo da T14, e não item do checklist · **o nome da E** é o do mock, *Ciclo de testes*, como as referências · a barra do sistema leva o Bluetooth (lei 22): na T13, o módulo está sempre conectado
- o não conforme exige **a foto do problema** (decisão 39): marcou *Não está conforme*, a frase embaixo do título diz *Enquadre o problema*, e o botão é o disparador, `Fotografar o problema` · fotografado, o quadro mostra a foto do problema, com o registro embaixo dela, o botão vira `Salvar com ressalva` e o link do pé, `Tirar de novo` (decisão 63) · sem o texto, o botão diz *Conte o que aconteceu*, apagado · a ordem entre escrever e fotografar é livre
  - **no protótipo · o não conforme com a foto do problema** (decisão 39, T13/07, 08 e 15): a caixa é a `Justificativa` nas duas telas do item — desmarcada, *marque e conte o que aconteceu*, a 16 do fim do miolo (07); marcada, *conte embaixo o que aconteceu* e o campo *O QUE ACONTECEU*, em foco (08, 15) · fotografado, a foto do problema fica no quadro da câmera (a foto de exemplo `problema`, decisão 63), e embaixo dela, dentro do quadro, o registro: *Problema fotografado às 14:30* e *vai junto com a ressalva, pro gestor*, sem toque e sem o check (`VisorCamera` com a foto, e `FotoProva` tirada no quadro) · o pé tem o `Tirar de novo`, que descarta a foto do problema e volta ao 08 com o que aconteceu guardado · a caixa e o campo não se mexem entre a 08 e a 15: o quadro tem o mesmo tamanho · a URL: marcar → 08; `Fotografar o problema` → 15; `Tirar de novo` → 08; desmarcar → 07 · desmarcar guarda o que aconteceu e a foto do problema enquanto o técnico está no item, e marcar de novo os devolve (15, se já fotografou); sair do item pelo `Voltar ao checklist` os descarta · sem a foto, o disparador acende com ou sem o texto; fotografado e sem o texto, *Conte o que aconteceu*, apagado e desabilitado (lei 17); `Salvar com ressalva` grava a ressalva com o que aconteceu, a hora e a hora da foto do problema, e segue pro próximo por fazer · o 08 pela URL abre com o texto de exemplo (`checklist.exemploJustificativa`), e o 15, com ele e o problema fotografado às 14:30 · o 12 pela URL grava a ressalva de exemplo com a foto do problema · as fotos tiradas da B (*N fotos tiradas*) contam o item salvo com a ressalva, que tem a foto do problema · a foto do problema e o registro esmaecem dentro do quadro em 150, como a foto da Montagem (`animacao.md`) · `Faltam N itens` com 1 diz *Falta 1 item* (o singular com o verbo junto, proposta do protótipo)
- no singular: *1 item*, *1 foto tirada*
  - **no protótipo:** *você fotografa N itens* conta os itens da seção, não os que faltam — na `12`, com o Módulo salvo com ressalva, *você fotografa 5 itens* (`quemAgeDa`, em `app/src/telas/T13/checklist.js`); sem a calibração, a B tem 4, e a linha diz *4 itens* · a barra do checklist pinta o número do título, e a barra da Seção B, no nível do item, deixa o Painel pendente (07, 08, 15), como as referências desenham
- **cada seção é um cartão**, com quem age na segunda linha — *o app confere sozinho*, *você fotografa 4 itens*, *você faz o ciclo parado*, *espera o servidor · não bloqueia* · tocar num cartão faz ele crescer no lugar, com a seta pra cima; as outras seções descem, e nada mais se mexe
- **tem seta, toca; não tem seta, é leitura** · as leituras da A, da C e da D, os itens feitos e os passos da E não têm seta
- na B, cada foto a tirar tem a câmera e a seta → a câmera do app · **o Painel é foto a tirar**, obrigatória quando houve calibração (decisão 52)
- item pendente leva à tela que resolve, pelo campo *origem* do mock: conectar → T05 · ativo → T06 · can → T07 · configurar → T09 · calibração → T10
  - no protótipo (decisão 44): a origem `can` leva à T07, o Diagnóstico do módulo, que lê o módulo e a CAN (`Ler de novo`) · o botão do item reprovado (09) é `Reler o módulo`, e não leva à T07 — relê ali mesmo
- na E, uma ação só: *Fazer o ciclo de testes* → T14 · os seis passos são leitura, e depois do ciclo dizem *confere*
- o item não conforme salvo com justificativa aparece com o check e *com ressalva · a causa*
- o fim: *Checklist registrado · aguardando autoteste* no topo, e o próximo passo embaixo · com a localização negada, *o relatório vai sem localização* (a 14) · a homologação é da T16
- `Finalizar instalação` só acende com 100% de A, C, D, E e das fotos da B · a F não bloqueia
- item manual sem a permissão da câmera → o visor com a câmera riscada (a variante é só do checklist, pela decisão 52), e o `Tirar foto` vira `Abrir as configurações` — permitida lá, a câmera abre na volta · com o *Não está conforme* marcado, também: pela decisão 39, a ressalva exige a foto do problema, e a foto do problema precisa da câmera · nenhuma referência desenha este quadro e o `textos.md` não tem a frase do que falta pro item, então o visor fica só com a câmera riscada, e a URL sai do momento (sem a referência, o 07 e o 08 não o desenham); no protótipo, nenhum estado da coluna chega nele, e ele se vê na vitrine (`f7-visor-sem-permissao-item`). O primário, em todos os casos (o `Tirar foto`, o `Abrir as configurações`, o `Fotografar o problema`, o *Conte o que aconteceu* apagado e o `Salvar com ressalva`), sai de uma função só, provada no node (`app/src/estado/camera.js` · `primarioDaCamera`, `app/scripts/testar-camera.mjs`)
- **no protótipo, o que as referências não desenham**: o automático que falta tem o ícone da ferramenta da tela que resolve e *a fazer*, com a seta · a foto tirada no checklist fica só com o nome, sem dizer de onde veio · com 1 foto por fazer, ou 1 tirada, o singular: *você fotografa 1 item*, *1 foto tirada* · a F aberta depois de homologar mostra `12 subiram`, `31 de 31` e `na fila`

## A estrutura do checklist

**A estrutura do checklist é a da decisão 34.** Valem aqui o que é um item resolvido, de onde cada seção lê, a semente, a Seção F, o Finalizar com a ciência, o item manual, o item reprovado e o voltar.

- **as seções:** uma aberta por vez; tocar num cartão abre ele no lugar, tocar em outro troca a aberta, e tocar na aberta fecha. O título, a barra e o rodapé ficam; as seções de baixo descem por transform, e a lista rola (a rolagem fica onde está). Abrir não anima altura
- **o que é um item resolvido:** o automático cuja fonte passa, o manual com foto (tirada aqui; pela decisão 52, o Painel também) ou com ressalva, e o que não se aplica. O título e a contagem de cada seção contam os resolvidos; o `Faltam N itens` conta só os das seções que bloqueiam (A a E) — com 1, *Falta 1 item*
- **de onde cada seção lê:** A, da sessão, do diagnóstico do módulo (a T07) e do vínculo do ativo · B, das fotos e ressalvas desta tela — o Painel só existe quando houve calibração (decisão 52) · C, da leitura da CAN e da leitura nominal do módulo (as entradas e o modem) · D, da cadeia gravada e da calibração (o valor de partida é o do painel) · E, do ciclo da T14 · F, da fila desta sessão
- **a semente:** pular pro checklist pelo palco é o herói depois da calibração e antes do ciclo — A, C e D resolvidas, B (com o Painel a tirar) e E por fazer, F esperando: 17 de 31, `Faltam 11 itens`
- **a Seção F:** conta só o que entrou na fila depois da abertura da sessão. Antes do Finalizar, nada desta sessão está na fila, e ela espera (o relógio, *espera o servidor · não bloqueia*). O `Finalizar instalação` gera o relatório da instalação — as evidências e o checklist — na fila (HU-T13-7), e a Seção F passa a contar ele: 3 de 3, *o servidor confirmou*. Ela **falha** quando o servidor diz que não: o evento de teste que não chegou no prazo (T14/02), um item desta sessão recusado, ou o caso do ativo sem resposta (pronto-para-fechar)
- **o Finalizar:** acende quando o que bloqueia fecha; o homologado aparece depois do toque, com o veredito e o relatório no topo. Com a Seção F falhando, o toque abre o diálogo da ciência (10), que diz a causa, *O evento de teste não chegou ao servidor.*, antes do *A instalação fica registrada com ela falhando — e com o seu nome.*, e o `Finalizar instalação` do diálogo espera o `Estou ciente` marcado
- **o item manual:** tocar numa foto por fazer abre o nível do item (07). O `Tirar foto` mostra a foto no quadro (44 a 48), e o `Usar foto` ou o `Salvar com ressalva` resolvem o item e seguem pro próximo por fazer da seção; sem próximo, voltam à Seção B aberta (decisão 63). No protótipo, pela decisão 39, o `Salvar com ressalva` só aparece com a foto do problema e o que aconteceu (08 → 15). A foto tirada fica tirada: o item feito não tem seta e não se toca (pendencias.md)
- **o item reprovado:** o item reprovado tem a seta e abre o nível do item (09), com o motivo; `Reler o módulo` relê ali mesmo. Nada automático se marca à mão
- **a Seção E:** uma ação só, `Fazer o ciclo de testes`, abre a T14 enquanto falta passo. Nada de E se responde aqui. O passo que a T14 aprovou diz `confere`, e o que falta, `a fazer`. Sair da T14 por `Encerrar o ciclo` ou por `Ir para o checklist` dá a mesma Seção E: os pendentes ficam pendentes, e a ação continua
- **o item reprovado, a escala:** a alimentação (lida no módulo, contra a faixa do modelo do módulo) numa régua de 5 a 45 V, com a faixa esperada de 9 a 40 V, de 10% a 87,5% da barra, no nível do item reprovado (a 09). As posições saem da conta
- **o voltar:** nas seções e no homologado, faz o `Voltar ao menu`; no nível do item, o `Voltar ao checklist`, que volta à seção do item aberta; no diálogo, o `Cancelar`

## O checklist por seção

- **A · Identificação, 4 itens**: o serial, o firmware, o ativo vinculado e o pacote de sincronização, com a data dele
  - no protótipo: o firmware é o do módulo da sessão (*8.04* no herói, a 01), e o pacote é o da empresa do contexto (`pacoteDaEmpresa`), com a data e a hora dele: *11/03 07:10*, o de ontem da Viação · a 01 desenha *06/10 06:55*, que não é data do mundo do mock (o dia nominal é 12/03): diferença conhecida da referência, a 0,05%
- **C · Hardware**: a alimentação é a tensão que o módulo lê no fio de alimentação, contra a faixa do modelo (o herói em 24,3 V) · o GPS mostra a posição: *com posição* ou *sem posição*; os satélites e a antena ficam como informação (*0 satélites · antena conectada*, a 22) · o modem confere o chip, no encaixe de cima, e o lugar do módulo: o modem e o GPS ficam dentro do módulo, sem antena externa
- **D · Configuração, uma linha por bloco**: Limpeza, Ativo, Cercas, Leitor, Eventos e Conexão, cada uma com *confere* ou *não confere* · depois, o autoteste, o canal de programação protegido e o ID confere com o cadastro · as pendências registradas só aparecem quando o ID foi reescrito · **começa vazia e enche conforme cada item é lido** (a 38) · sem hodômetro e horímetro
- **E · Ciclo de testes, no máximo 5**, cada um só quando se aplica: ignição liga, rotação, cartão, bip do leitor, ignição desliga · o ciclo da T14 preenche os passos; o bip é respondido aqui, com o `Testar bip`
- **F · Servidor, 2 itens**: Posição e Evento de teste, *esperando*, *confere* ou *não chegou* · a fila de envio é da T15
- **o Finalizar fica desligado** enquanto houver item automático de A, C ou D incompleto, **com o motivo escrito embaixo**
- **o fim é *Checklist registrado · aguardando autoteste*** (a 11): *O próximo passo é encerrar a sessão. O autoteste roda durante o encerramento.* · a palavra *homologada* só aparece na T16
- **no protótipo:** como a `logica.md` diz (O checklist) · as peças têm variantes, sem desenho novo: a linha do item com o *lendo* (o quadrado de agora), a ação à direita (o `Testar bip`) e o que ela abre embaixo (a pergunta com as duas respostas, o campo do que aconteceu), o cartão da seção com o *lendo*, e o campo de texto com o que ele pede vazio · o `Testar bip`, o `Ouvi`, o `Não ouvi` e o `Testar de novo` são o botão da linha (folha 6, `src/ds/entrada/BotaoDaLinha.jsx`) · *a fazer* da E em `--tinta`, como as referências · **as referências desenham a lista rolada além do fim** (a D ou a C no topo e o vazio embaixo da F, na 05, 13, 39 a 42 e 50; o título meio rolado na 06) — o protótipo rola até onde a lista deixa, e o indicador de rolagem aparece na borda: a 05 fica a 4,19%, a 06 a 5,26%, a 13 a 4,54%, a 39 a 4,05%, a 40 a 2,75%, a 41 a 4,31%, a 42 a 2,68% e a 50 a 2,93% (diferença conhecida; na 41, a lista mais curta deixa a C no topo, onde a referência põe a D, e na 42 e na 50 a D fica 1,5 acima) · o campo do que aconteceu tem 64 (`--alvo-min` + 16), como a 42

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- com legenda
- diálogo
- diálogo sem saída
- diálogo com ciência
- não se aplica
- assertiva da sessão
- linha de conferência
- seção aberta do checklist
- seção recolhida
- segmentado
- encerrando
- reiniciando
- sem homologar
- a barra do checklist
- com contador
- checkbox
- checkbox marcado
- justificativa
- seção fechada
- seção aberta · de leitura
- seção aberta · de tocar
- item de leitura
- item de tocar
- item feito
- item com ressalva
- o veredito
- foto · tirada
- a ação da seção
- a câmera do app
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

Medido nas referências e no código (decisão 34): toda peça abaixo está desenhada nas folhas de `03-design-system/`. A seção é uma peça só, fechada e aberta (`SecaoDoChecklist`, dentro da `SecoesDoChecklist`, que faz as de baixo descerem), os itens são uma peça com quatro tipos (`ItemDoChecklist`: leitura, tocar, feito e ressalva — a ação da seção é o de tocar com o ícone do ciclo), e o veredito e a barra, uma peça cada (`VereditoDoChecklist`, `BarraDoChecklist`). O instrumento do item reprovado é peça só desta tela (`app/src/telas/T13/pecas.jsx`), montada com os primitivos. A câmera do app é o `VisorCamera`.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- os glifos de estado
- os ícones de ferramenta
- os poços
- os marcadores
- duas ações
- com legenda
- diálogo (o Descartar a ressalva?, a 51)
- diálogo com ciência
- o botão da linha (o Testar bip, o Ouvi e o Não ouvi, o Testar de novo, o Disparar de novo, o Reenviar)
- seção aberta do checklist
- seção recolhida
- o que conferir (a peça da folha 6, a mesma da T05/04, sem o traço vermelho · o 09)
- segmentado
- a barra do checklist
- com contador
- campo focado
- checkbox
- checkbox marcado
- justificativa
- foto · tirada (o registro dentro do quadro, embaixo da foto: 15 e 44 a 48)
- a câmera do app · com a foto (44 a 48 e 15)
- seção fechada
- seção aberta · de leitura
- seção aberta · de tocar
- item de leitura (com a variante *respondido, com a ação*: 41, 42, 49 e 50)
- item de tocar
- item feito
- item com ressalva
- o veredito
- a ação da seção
- a câmera do app

Contra a lista do design, estão as de toque da folha 1 (o primário nos três estados e o link), os átomos da folha 3 (os glifos e os poços das seções e dos itens, os ícones da câmera, do ciclo e das ferramentas que resolvem o que falta, e o LED da faixa e o quadrado do checkbox), o campo focado da justificativa (08, 15), a câmera do app com a foto e a foto tirada, o registro dentro do quadro, embaixo da foto (15 e 44 a 48, decisão 63) — pela decisão 52, a foto e a câmera do app são só do checklist, e o Painel entra na B como as outras fotos a tirar. Pela decisão 39, não há linha tocável do `Não conforme`: a caixa *Não está conforme* é a justificativa nas duas telas do item (a variante do checkbox com a linha de baixo). Ficam fora as 11 que o código não usa: faixa · sem ação, processo correndo, diálogo sem saída, assertiva da sessão, linha de conferência, encerrando, pede o corte, sem homologar, com contador de falha, linha da fila e linha da re-checagem. As variantes nomeadas desta tela: o segmento atual com falha (09), a nota do item que não se marca à mão (09), a legenda junta, a 6 do botão, e, sem desenho nas referências, o item que falta com o ícone da ferramenta e *a fazer*, e o item reprovado com o X, a leitura e a seta. A barra de 22 do instrumento do item reprovado é o tamanho `item` da escala, peça interna (`06-prototipo/app/src/ds/MAPA.md`). Pela folha 6, o *com contador neutro* e o *com contador de falha* são uma peça só, o *com contador*.

## Histórias de usuário

- **HU-T13-1** — Itens automáticos não são marcáveis à mão; "marcar todos" só nos manuais sem foto
- **HU-T13-2** — Item automático reprovado mostra o motivo e leva direto à tela que corrige
- **HU-T13-3** — Vejo progresso separado por seção e por tipo
- **HU-T13-4** — Posso responder manual como não conforme com justificativa e foto do problema → marca ressalvada, não bloqueia
- **HU-T13-5** — Finalizar exige A, C, D e E resolvidas e todas as fotos obrigatórias da B; o motivo da pendência aparece embaixo do botão
- **HU-T13-6** — A Seção F não bloqueia; finalizar com ela falhando exige ciência marcada, com nome e hora
- **HU-T13-7** — Finalizado gera o relatório com seriais, resultados, fotos, geolocalização e técnico
- **HU-T13-8** — Os passos da Seção E são preenchidos pelo ciclo da T14; o bip do leitor é testado e respondido aqui quando há buzzer
- **HU-T13-9** — A foto do painel é tirada aqui, na Seção B — obrigatória quando houve calibração
- **HU-T13-10** — Vejo a foto no quadro antes de ela valer: `Usar foto` conta o item, e `Tirar de novo` descarta a foto e volta à câmera

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## A Montagem sem o Painel no ônibus

- **o Painel só entra quando houve calibração** · como o ônibus não calibra nada (T10/11), **o herói tem 4 fotos na Montagem** — módulo, lado de cima, chicote e leitor — e o checklist tem **27 itens que contam** (o Autoteste da D roda ao encerrar e não conta) · o ônibus da bateria fraca, sem leitor, tem 3
- **a foto do Painel (a 20) é do caminhão coletor**, que calibra: a quinta foto da Montagem dele, e a 48 é ela no quadro, com o painel dele (87712 km e 3120 h)
- **as legendas do rodapé ficam a 12px do botão**, como o design system pede
- **no protótipo:** o Painel é condicionado à calibração, e o herói, que não calibra, mostra 4 fotos: Módulo, Lado de cima, Chicote e Leitor · o 20 pelo endereço abre na sessão do caminhão coletor (o KNB-5H39), o ativo da empresa que calibra, como a T16/01 abre no par da referência

## A foto vale no Usar foto

A decisão 63. Vale pras cinco fotos da Montagem (44 a 48) e pra foto do problema (15).

- **o `Tirar foto` não conta o item**: ele congela a imagem no quadro da câmera, no lugar da imagem ao vivo, e embaixo dela, dentro do quadro, entra o registro, *Foto tirada às 14:30* e *confira se está nítida antes de usar* · o quadro fica do mesmo tamanho, e nada mais na tela se mexe
- **o pé troca no lugar**: o primário vira `Usar foto`, e o link, `Tirar de novo`
- **`Usar foto`** resolve o item e segue pro próximo por fazer da seção; sem próximo, volta à Seção B aberta
- **`Tirar de novo`** descarta a foto, que não foi usada, e volta à câmera ao vivo do mesmo item (07, 17 a 20)
- **o voltar do Android**, com a foto no quadro, descarta a foto e volta ao checklist
- **marcar *Não está conforme*** com a foto no quadro descarta a foto e abre o não conforme, como hoje (08)
- **a foto do problema segue a mesma regra**: fotografado, o quadro mostra a foto, com o registro do problema embaixo (*Problema fotografado às 14:30* e *vai junto com a ressalva, pro gestor*), o primário é `Salvar com ressalva` e o link, `Tirar de novo`, que descarta a foto do problema e volta à câmera do problema, com o que aconteceu guardado (15 → 08) · a caixa e o campo ficam onde estavam no 08: a tela não pula · o voltar do Android descarta a foto e o que aconteceu e volta ao checklist, como o `Voltar ao checklist` do 08 · **com o que aconteceu escrito, o voltar pergunta antes** (a 51): *Descartar a ressalva?* e *O que você escreveu e a foto do problema saem, e o item volta a ficar por fazer.*, com `Continuar no item` (o principal: fica no item, com tudo como estava) e `Descartar` · vale na câmera do problema (08) e com a foto do problema (15): o que foi escrito é trabalho do técnico · na 08, ainda sem a foto do problema, o diálogo é o mesmo, e a frase não fala da foto: *O que você escreveu sai, e o item volta a ficar por fazer.* (sem referência) · sem nada escrito, o voltar sai direto, como hoje · a foto do item, que não foi usada, continua saindo direto (decisão 63)
- **a foto usada fica usada**: a revisão é antes do `Usar foto`, e o item feito não tem seta e não se toca
- **o registro não tem o check**: a foto ainda não vale, e o lima é só do veredito, do escolhido e do texto do primário
- **no protótipo, a foto é a de exemplo do item**, desenhada (`checklist.fotosDeExemplo`, em `04-dados/fotos/`): no app, é a foto que a câmera tirou · a do painel é a do ativo da sessão, com o que o painel dele mostra (a 48, o caminhão coletor: 87712 km e 3120 h) · a foto do protótipo preenche o quadro na largura e corta o que sobra em cima e embaixo, como o visor
- a câmera ao vivo (07, 08, 17 a 20) continua só com o ícone: no app, a imagem ao vivo aparece ali
- **no protótipo** (decisão 63): a foto é o SVG de `04-dados/fotos/`, inline no quadro, o mesmo das referências (`src/dados/fotos.js` lê os oito arquivos como texto e troca só a abertura): sai nítida em qualquer escala, e a 44 a 48 e a 15 fecham em 0 contra o HTML · a foto e o registro são uma camada por cima da câmera ao vivo, dentro do quadro (`VisorCamera`), e esmaecem em 150 no lugar dela; o `Tirar de novo` faz o contrário · o `Tirar foto` não troca o quadro: a URL vai do 07 (ou 17 a 20) à 44 a 48, e o `Usar foto` faz a troca de quadro pro próximo · o primário e o link saem de `primarioDaCamera` e `linkDaCamera` (`src/estado/camera.js`, provados no node pelo `scripts/testar-camera.mjs`), e o link troca o texto no lugar, como o primário · o voltar do Android (o Esc) com a foto no quadro faz o `Voltar ao checklist` e a descarta · a 48, pelo endereço e pela coluna, abre na sessão do caminhão coletor, como a 20, com a foto do painel dele (`b-painel-legivel` · `a-09`) · pelo endereço, pela coluna e no print, a foto já está no quadro, parada · desmarcado o *Não está conforme* com a foto do problema guardada, o `Tirar foto` mostra a foto do item, e a do problema continua guardada até sair do item (sem referência) · o `Tirar de novo` não tem limite, e a foto de exemplo volta sempre a mesma

## A linha da Montagem

- **a Montagem no formato das outras seções**: o nome à esquerda, o estado à direita (*foto a tirar*, *com ressalva*), uma linha só de 44px, com o quadradinho de 30 e a seta, como a lei 23 manda pro checklist
- o motivo da ressalva (*suporte trincado*) sai da linha e continua nas telas onde é anotado e revisto: a 08 e a 15
- **no protótipo:** a Montagem usa a linha de leitura de 44 do `ItemDoChecklist`, com duas variantes (`componentes.md`): `icone` (a câmera no poço de 30, no lugar do glifo) e `valorDeEstado` (o estado à direita, em 13 e `--tinta-secundaria`) · *foto a tirar* tem a seta e abre a câmera do item (07, 17 a 20); *com ressalva* tem o check e não toca; a foto tirada, só o check, sem texto (nenhum texto aprovado diz de onde ela veio; nenhuma referência desenha a linha); o Leitor que não se aplica, o traço · a causa não fica na linha, e o `textos.js` diz só *com ressalva*

## O véu do diálogo da Seção F

- o diálogo *A Seção F não passou* (a 10) escurece a tela inteira: a faixa da sessão, com o módulo, a placa e o ENCERRAR, e o fundo da barra de status, com a hora e os ícones por cima
- a força do véu é 32%, o padrão do Material 3 · a tela de origem é a 49, o checklist com a Seção F falhando, e é ela que fica atrás do véu na 10
- **no protótipo:** o diálogo abre por cima da tela do checklist que já o abre, a 49, desenhada atrás · o fundo do véu se estende sobre a faixa (`--veu-topo`), sem mover a caixa, e a faixa fica inerte · a barra escurece pelo `veu` da `BarraDoSistema` · a 49 e a 10 montam pelo mesmo caso (`pronto-para-fechar`, o KNB-5H39 × M2C-0371 do caminhão, *26 de 27*), e a faixa diz esse par; as referências desenham o herói, com a B em *4 fotos tiradas · 4 de 4* e a E em *5 de 5*, e o caminhão tem o Painel na B (*5 fotos tiradas · 5 de 5*) e não tem o bip na E (*4 de 4*) — diferença conhecida: 0,82% na 10 e 1,69% na 49 (a 10 era 7,75%, com a tela vazia atrás do véu) · a lista das duas rola até o fim, no pixel inteiro, e fica meio pixel adiante da referência · a régua dos textos não lê a faixa inerte

## No protótipo · a resposta que se refaz, a Seção F e o descarte

A decisão 64 nesta tela. A regra está acima; aqui, como o protótipo constrói e o que ele decidiu sem referência.

- **o bip respondido** (41, 42 e 50): a resposta desce pra baixo do nome, e o `Testar de novo` fica à direita — a variante *respondido, com a ação* do item de leitura (`ItemDoChecklist`, `resposta` e `acao`) · o *Não ouvi* sem o que aconteceu escrito é um estado próprio (`naoOuvido`: o xis, *não ouvi* em vermelho, e o item não conta, *16 de 27*, *0 de 5*, *Faltam 9*); escrito, ele conta, com o check e *não ouvi · com ressalva* (a 50) · apagado o texto, volta a não contar · a URL segue: 42 ↔ 50 · o `Testar de novo` limpa a resposta e o que aconteceu, e o bip toca de novo (39 → 40): a resposta e o campo saem esmaecendo em 150, e só então o bip toca; a pergunta que volta entra esmaecendo · o *não ouvi* que troca por *não ouvi · com ressalva* esmaece no lugar · no 50 pelo endereço e no print, o campo aparece aceso, como o técnico que acabou de escrever
- **o `Testar de novo` fica até o `Finalizar`**, como a regra diz, também com a E inteira resolvida · **diferença conhecida:** a 13 (a E resolvida) não foi redesenhada e mostra o bip ouvido sem o botão, com *ouvi* à direita: o protótipo segue a regra, e a 13 fica a 4,54% (era 4,37%)
- **o cartão que não confere continua contando com o campo vazio** (*Cartão que não confere e bip não ouvido ficam não conformes*): a regra de só contar com o que aconteceu escrito é do bip (HU-T13-4) — o cartão segue como era
- **a Seção F falhando** (a 49): a Posição confere, com o nome em `--tinta` e o *confere* em `--tinta-secundaria` (a variante `destaque: 'nome'` do item), e o Evento de teste leva a causa embaixo, *não chegou ao servidor*, e o `Disparar de novo`, que leva à T14: lá o ciclo retoma, a fila drena e o evento se dispara de novo · a linha do evento tem 52, 4 em cima e embaixo, como a referência · a F só falha pelo evento: falhando, a Posição confere · com o resto resolvido, o rodapé diz *A Seção F não passou: finalizar pede a sua ciência*, em `--tinta-secundaria`, com o `Finalizar instalação` aceso; com algo bloqueando, vale o motivo de sempre · a 49 abre pela coluna, parada, e a lista rola até o fim, como a referência · o roteiro `checklist.mjs` semeia o ciclo com o evento que não chegou e toca o `Disparar de novo`
- **o diálogo da ciência** (a 10) diz a causa antes da frase de sempre, numa frase só
- **o Descartar a ressalva?** (a 51): o voltar do Android **e o `Voltar ao checklist` do pé**, com o que aconteceu escrito, abrem o diálogo (o link faz o mesmo que o voltar: as duas saídas jogariam o texto fora) · o `Continuar no item` fecha e deixa o item como estava (a 15, ou a 08); o `Descartar` volta ao checklist, com a troca de quadro · com o diálogo aberto, o voltar faz o `Continuar no item` · a URL diz a 51 sobre a foto do problema do Módulo; sem a foto (a 08) ou nos outros itens, nenhuma referência desenha, e a URL sai do momento · **a caixa fica no meio de tudo o que está embaixo da barra do sistema**, com a faixa, como a 51 desenha e como o *Encerrar antes de terminar?* — o da Seção F (a 10) fica no meio do que está embaixo da faixa, como a 10 desenha: as duas referências centram diferente, e o protótipo segue cada uma · a 51 fecha em 0 · a régua dos textos não lê a faixa inerte
- **o `Encerrar sessão` nasce no lugar do `Finalizar instalação`** dentro do toque, e a peça do primário espera os 300ms do toque duplo sozinha (`Primario`, `data-nascendo`): o toque duplo no `Finalizar` não encerra a sessão, também com reduzir movimento (o roteiro `mov-t13.mjs`, com o `toqueDuplo`) · o `Finalizar` que volta às seções depois do `Usar foto` também nasceu de um toque, e espera os mesmos 300ms

## A Seção D

- **o Autoteste da Seção D roda ao encerrar**: o autoteste só roda no encerramento, depois de *Finalizar* · até lá a linha mostra *roda ao encerrar*, com o relógio, e **não conta** · a D tem 8 itens que contam (7 no ônibus sem leitor), e o checklist do herói tem 27 (23 no ônibus da bateria)
- **o bloco deixado para depois aparece na D como *revisar em seguida*** (a 43), com o motivo e o botão *Reenviar*, na ordem do script · enquanto houver bloco assim, o *Finalizar* fica desligado, com a causa embaixo: *Falta reenviar o leitor e os eventos.*
- as seis linhas de blocos continuam na ordem do script: Limpeza, Ativo, Cercas, Leitor, Eventos, Conexão
- **o aviso do checklist registrado** (a 11 e a 14) tem 12px de respiro em cima e embaixo · com o texto em várias linhas ele não encosta nas bordas
- **no protótipo:** o Autoteste é o `conta: false` do mock — a linha `espera` do item (o relógio e o valor em `--tinta-secundaria`), fora do total, do feito da D e do que falta · o bloco deixado para depois é a linha `revisar` do item, com *revisar em seguida* em `--tinta`, o motivo e o `BotaoDaLinha` *Reenviar*, que abre a manutenção da T09 com o bloco escolhido · o Finalizar fica desligado com *Falta reenviar …* acima do *Faltam N itens* · o 43 abre com a D aberta, rolada como a 04 · o veredito do registrado tem os 12 de respiro (a 11 e a 14 estão a 0,04%)
  - variantes da peça item do checklist (`espera`, `revisar`) e o valor `forte` da linha de escolha (T09/16): só com tokens que existem, nenhum token novo · não estão na folha 7 nem na 3
  - a 43 fica a 2,95% (a 04, a 2,18%, e a 38, a 2,01%): os 2px do deslocamento da rolagem, e o vão de 2 entre as linhas do item (a referência desenha 1, que não tem token) · a 43 abre com a B e a E feitas, como a referência (*23 de 27*: só o bloco deixado para depois segura o `Finalizar`), e diz *4 fotos tiradas* e *o ciclo passou*, como a referência e a 10
