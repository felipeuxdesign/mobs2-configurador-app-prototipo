# A lógica do protótipo navegável

Guia conferido contra o código, o mock e as fichas das telas. Comportamento, textos e desenho continuam nas fontes normativas de [02-telas](../02-telas/README.md) e [03-design-system](../03-design-system/README.md).

Censo: **15 telas, 129 momentos, 86 estados e 230 pares HTML/PNG**. O produto tem 110 histórias, 318 tokens distintos, 117 peças normativas, 9 folhas e 69 casos do mock, em dois temas (o escuro, padrão; o claro, neutro frio, escolha do técnico). A vitrine tem 129 espécimes comparáveis; existem 51 roteiros, com a cobertura atual descrita em [testes-prontos.md](../08-handoff/testes-prontos.md).

## O estado único

[estado.jsx](app/src/estado/estado.jsx) mantém em memória o contexto compartilhado:

| Campo | O que guarda |
|---|---|
| `tecnico` | nome e usuário de quem entrou |
| `contexto` | empresa, pacote dela e mundo das empresas do técnico |
| `sessao` | módulo, ativo, saúde, hora de abertura e meio |
| `etapas` | diagnóstico (`preChecagem`), vínculo (`ativo`), CAN, cadeia, conferência, calibração, ciclo, checklist e encerramento |
| `fila`, `reenviados` | registros criados e IDs devolvidos à fila pelo reenvio |
| `situacao` | rede, acesso, usuário lembrado, entrada anterior e aviso de outra sessão |
| `casosConsumidos`, `avisoDoAcessoVisto` | condições simuladas já consumidas e ciência do aviso |
| `tela`, `antes`, `geracao` | quadro aberto, fluxo guardado pela consulta e geração dos pulos do palco |

A sessão nasce quando o módulo conecta, na T05. A faixa aparece na T07 depois das **oito verificações** do módulo sem trava; mensagens pendentes são uma nona linha que só informa. A sessão termina no encerramento. Nomes legados como `preChecagem` e `checklist.homologada` não alteram a regra atual: este último significa checklist registrado, e a homologação é da T16.

Não existe armazenamento durável: recarregar fora do modo de fotografia reabre o login. O palco guarda o estado global para voltar das consultas; escolhas locais não gravadas pela tela podem se perder quando ela remonta. O produto precisa implementar persistência e retomada reais.

## O começo

A T01/00 abre com usuário e senha do mock preenchidos. `Entrar` exige os dois campos; com internet, espera 1,2 s e entra com senha de oito caracteres ou mais. Com menos, mostra o erro e apaga a senha. Sem rede, mostra o aviso e conserva os campos. O tempo de demonstração não define o limite do servidor real.

`Lembrar meu usuário` guarda somente o identificador. Ao sair da conta, o login abre com o usuário lembrado e senha vazia (16), ou com os dois campos vazios (15). O xis esquece o identificador; outra conta após uma entrada anterior mostra o aviso sobre a T02. O protótipo conhece os nomes r.vieira e m.souza; outros identificadores usam o nome do herói.

Na recuperação, o técnico digita telefone ou e-mail; nenhum contato do cadastro aparece, nem mascarado. O envio responde sempre com a mesma frase, confere o código `482913` e leva à nova senha. O teto é três envios por hora; o código já enviado continua valendo. Depois de salvar e tocar em **Entrar com a senha nova**, o login volta com a **senha de exemplo de `M.credenciais.senha` preenchida e escondida**, para seguir a simulação. A senha digitada na recuperação não é salva nem vira credencial. Isso é só conveniência do protótipo; não muda o login depois de sair da conta.

As regras e os exemplos estão na [T01](../02-telas/T01-login/tela.md) e em [regras.js](app/src/telas/T01/regras.js).

## O caminho do herói

```text
Login → Viação Atlântico Sul → sincronizar o pacote da empresa → menu
→ conectar M2C-0417 → diagnóstico do módulo → selecionar RKT-8H42
→ conferir vínculo → preparar envio → gravar e conferir a cadeia, etapa por etapa
→ Ler a CAN → a CAN lida → Calibrar → Nada a calibrar neste ativo
→ ciclo de testes → checklist → registrar checklist
→ Encerrar sessão → reinício e autoteste → homologação na T16 → menu sem sessão
```

Depois da cadeia, o caminho segue sem voltar ao menu (decisão 64, `01-produto/fluxos.md`): a cadeia concluída tem um primário só, `Ler a CAN`, que leva à T07 na CAN lida, que o bloco do ativo acabou de liberar; a CAN lida tem `Calibrar` (e `Ler de novo` no link), e a calibração aponta o ciclo. O `Voltar ao menu` das duas fica no voltar do Android. O ativo cujo modelo não tem sinal na biblioteca da CAN não tem o que ler: a cadeia concluída diz `Calibrar` e leva direto à T10. O menu continua com tudo: o *Diagnóstico do módulo* e a *Calibração* abrem por ele a qualquer hora.

O ônibus não calibra. Seu ciclo tem quatro passos, com cartão conferido pelo técnico (o `Não confere` se refaz com o `Passar de novo`, decisão 64). O checklist tem **27 itens que contam**, de um catálogo de 30 (o Autoteste da D roda ao encerrar e não conta); o bip é testado ali. `Finalizar` registra o checklist, aguardando autoteste; o encerramento pode homologar somente depois da prova da T16.

[heroi.mjs](app/scripts/caminhos/heroi.mjs) aprova **250 passos**, da escolha da Viação ao `Sincronizar`, pela cadeia etapa por etapa, pela CAN lida e pela calibração, pelas fotos da Montagem, cada uma conferida no quadro antes do `Usar foto`, e pelo toque duplo no `Finalizar instalação`, que não vale por dois. [heroi-sem-horimetro.mjs](app/scripts/caminhos/heroi-sem-horimetro.mjs) conserva o nome histórico, mas hoje entra no ciclo pela Seção E depois de voltar da calibração ao menu. O que cada roteiro prova, e o estado da última execução, estão em [testes-prontos.md](../08-handoff/testes-prontos.md).

## O contexto é a empresa (T02, T03, T04)

O pacote é o da empresa inteira, e o app não tem unidade nem garagem (decisão 56). O contexto do estado único guarda a empresa (`empresaId`), o pacote dela e o mundo das empresas do técnico ([empresas.js](app/src/dados/empresas.js)). O herói tem três empresas, cada uma com o pacote dela, nas três idades: a Viação Atlântico Sul, de ontem, com o mundo inteiro do protótipo (24 ativos, 49 itens no pacote); a Transportes Capibaribe, de 4 dias (34 ativos); e a Expresso Caruaruense, vencida (18 ativos). Depois da T03, as duas últimas andam como espelho da Viação: o nome, o pacote e a contagem são os delas, e a lista da T06 e as instalações da T12 são as da Viação (diferença conhecida).

A T02 lista as empresas, nada escolhido; tocar numa a escolhe, o primário acende com `Sincronizar`, e a T03 baixa o pacote dela — o de 4 dias e o vencido perguntam antes. A linha diz a idade do pacote e, passado o limite, que venceu (*pacote de 8 dias, vencido*; na folha do menu, *carregado há 8 dias, vencido*, decisão 64). Na falha de rede da baixa, o link sai pelo pacote do aparelho: valendo, `Continuar com o pacote de ontem` segue pro menu com ele (T03/01); vencido, `Trocar de empresa` volta à T02 com a atual marcada (T03/05), como o do pacote vencido. No menu, o nome da empresa na tira abre a folha **Trocar de empresa**, que marca como a T02 (R-14): o toque marca outra empresa e acende o `Sincronizar`, que troca — sem sessão, vai direto à T03 da marcada; com a sessão aberta, o diálogo de trocar diz pra qual empresa e passa pelos quatro passos da saída sem homologar antes de seguir pra T03; com o checklist registrado, pelo encerramento completo; com uma evidência subindo, as outras e o primário esperam o envio terminar. Com uma empresa só (o caso `uma-empresa`), o app pula a T02 e o nome no menu fica sem a seta e não é botão; nenhuma referência desenha esse mundo, e ele se prova no node ([testar-empresa.mjs](app/scripts/testar-empresa.mjs), [testar-trocar-empresa.mjs](app/scripts/testar-trocar-empresa.mjs)).

## As sementes

O painel monta o contexto mínimo para navegar. [sementes.js](app/src/estado/sementes.js) preserva os exemplos das referências; `semeado` escolhe a entrada normal quando o acesso é de fluxo.

| Tela | Entrada normal do painel |
|---|---|
| T01 | login preenchido, sem sessão |
| T02 | três empresas do técnico; primeiro escolhe a empresa |
| T03 | a Viação Atlântico Sul escolhida, pacote por sincronizar |
| T04 | sessão M2C-0417 + RKT-8H42 e contexto na Viação Atlântico Sul |
| T05 | busca dos módulos; sem sessão conectada |
| T06 | módulo M2C-0417, ainda sem ativo |
| T07 | módulo M2C-0417, diagnóstico do módulo feito, ainda sem ativo: a CAN não aparece |
| T09 | par M2C-0417 + RKT-8H42; preparação da cadeia |
| T10 | mesmo ônibus; nada a calibrar |
| T11 | mesmo par que confere; leitura chega a Tudo confere |
| T12 | contexto e sessão do herói; histórico do mock |
| T13 | checklist do herói, com resultados de exemplo das etapas anteriores |
| T14 | ciclo do herói; fila drenando antes do disparo |
| T15 | recorte de quatro itens mais os criados nesta navegação |
| T16 | checklist registrado; encerramento e autoteste |

Essas sementes não acrescentam uma regra ao produto. O usuário real chega com os resultados que as integrações produziram.

## As consultas paradas · sem percursos especiais no palco

**Estados desta tela** inclui condições do mundo e exemplos especiais, todos parados. O painel abre o caminho normal; a coluna permite inspecionar:

- T09/08–10, 13–15, 17, 18 e 20: manutenção, escolhendo, a folha de confirmação de cada bloco, reenviando e a pergunta pelos dependentes.
- T09/28, 30 e 34: a manutenção aberta pelo menu sem nada escolhido, o que vai ser gravado sem a Conexão (o `Reenviar tudo, menos a conexão` da T11) e a Conexão reenviada conferindo o servidor.
- T11/06 e 07: o Corrigir este bloco nas cercas e na Conexão de outra operadora, do exemplo divergente, com a folha de confirmação.
- T10/00, 01, 05–09 e 12: os oito quadros de calibração do caminhão, com o semeado que se corrige.
- T11/00 e 03: Não bate com o cadastro e sua folha.
- T13/29: relendo depois de uma falha.

As famílias T07/06 e T13/30–37 também ficam paradas pela coluna. A classificação normativa não muda: um momento oferecido para consulta continua momento no índice, sem inflar os 86 estados. A T02 não tem consulta parada: ela abre as três empresas do técnico, e o mundo de uma empresa só (o caso `uma-empresa`) se prova no node.

A primeira consulta guarda o fluxo inteiro; trocar entre consultas conserva esse retorno. Toque, Esc e tempo não alteram o quadro. **Voltar ao fluxo** restaura o estado guardado; se não existe fluxo anterior, monta a entrada normal da tela. Links antigos dos 25 exemplos marcados como `consulta` abrem parados fora do print. Momentos normais continuam navegáveis; detalhes de família acessados por endereços antigos sem `consulta` conservam as limitações registradas no [palco](palco.md).

Fontes: [telas.js](app/src/palco/telas.js), [estado.jsx](app/src/estado/estado.jsx).

## As portas naturais

Nas listas, tocar só marca; confirmar executa. Conectar ao M2C-0999 leva ao diagnóstico travado por serial não cadastrado. Outros exemplos do mock que coincidem com o par do herói ficam disponíveis pela coluna, para não disparar uma condição especial no percurso normal. Casos de falha consumíveis valem uma vez por sessão; fatos de cadastro continuam valendo em cada leitura.

## ENCERRAR

[useEncerrar](app/src/estado/encerrar.jsx) é a ação compartilhada. Antes do checklist registrado, abre **Encerrar antes de terminar?**; confirmar faz os quatro passos da saída sem homologação. Depois do registro, segue para o encerramento completo da T16. Sair da conta, trocar de empresa e o `Procurar outro módulo` da T09 conservam o destino depois da saída (`etapas.encerramento.destino`: o login, a T03 da empresa nova, a busca da T05/01); com o checklist registrado, o sair e o trocar rodam o encerramento completo antes do destino. A fila pertence ao aparelho.

Durante processos que bloqueiam voltar, ENCERRAR também fica indisponível. Na cadeia, antes da Conexão confirmada, a recuperação da T09 preserva os blocos relidos; recusado de novo, o ENCERRAR e o voltar abrem a folha que grava só a conexão e encerra (T09/32). A sessão interrompida da T16 retoma a cadeia no bloco que parou; o `Descartar` pergunta antes (T16/11): o módulo zerado e sem a conexão ganha a conexão antes do descarte, e o descarte fica registrado (decisão 64).

## Os contadores do menu (T04·1, T04·2)

O próximo passo vem da sessão e das etapas. Depois de aberto, o contador do checklist no menu conta os itens manuais e dinâmicos pendentes de B e E; não soma todos os automáticos de A a E. O cartão da Fila de saída conta o que ainda não chegou da fila do aparelho (`filaDoAparelho`: a da entrada, `M.filaDoAparelho`, mais o que a sessão criar), a mesma que a T15 mostra no fluxo; ele não depende da empresa, e na entrada dá 2. O diálogo de sair e o de outro usuário (T01/18) contam o mesmo, o que não chegou da fila do aparelho (`naoChegouDoAparelho`, 2): o mesmo fato se diz igual (decisão 64). Sair da conta pergunta sempre — com a sessão ou a fila, o que fica e o que encerra; sem nada, o diálogo da T04/17; com o checklist registrado, o encerramento completo antes do login (T04/20) —, e a última frase diz que o login de depois precisa de rede. A T15 conta todos os itens do recorte exibido, inclusive recebidos. Com o checklist registrado, o cartão do *Finalizar com checklist* diz *registrado · falta encerrar a sessão* (T04/19); o módulo que perde o link vira o próximo passo, *toque para reconectar*, e as ferramentas que precisam dele esperam (T04/03 e 18). Nenhuma dessas contagens é fixa para qualquer ativo. O aviso de acesso aparece uma vez até o Entendi; não altera o contexto ou a sessão.

## A fila de saída (T15)

A fila é do aparelho. A T15 normal mostra o recorte `f-10`, `f-02`, `f-08`, `f-11`, mais os registros criados na navegação. Recebido em conflito é recebido pelo servidor, com o gestor avisado; não pede reenvio. Ressincronizar e reenviar devolve os erros à fila em memória, sem simular um envio real em segundo plano. As referências de recortes e rechecagem são consultas.

## A escolha do ativo (T06·1 a T06·5)

A seleção confere contexto, vínculo e suporte antes de usar o ativo. O conflito de pinos é erro do projeto de instalação: configurar é sempre sem fio, e nenhuma tela oferece cabo ou uma saída por outro meio. Os dados e critérios de cada trava estão na [T06](../02-telas/T06-selecionar-ativo/tela.md).

## O diagnóstico do módulo

A T07 lê nove linhas do módulo a 600 ms por linha; oito contam. Alimentação é a tensão do fio contra a faixa do módulo (a do VL06, 9,0 a 40,0 V). GPS é aprovado pela antena, com satélites informativos. As travas de serial, modelo e firmware vêm do cadastro e matriz, com o firmware no formato do Virloc (a lista do VL06 FULL, 8.03 e 8.04). Sem rede no módulo, o diagnóstico pode gravar a conexão isoladamente antes de atualizar o firmware; a atualização fica 1 s nos 62% (o ritmo dela, `RITMOS.firmwareAtualizacaoMs`) e o diagnóstico relê. As mensagens que o módulo ainda não enviou ficam gravadas com o diagnóstico (`etapas.preChecagem.mensagens`).

## A releitura da CAN (o Ler de novo da T07)

A CAN depende do ativo e do bloco Ativo já conferido: antes dele, ela não aparece, e nenhuma caixa espera por ela. No herói, são as seis linhas da biblioteca do modelo, e as seis contam (14 com as oito do módulo). Ao vivo, só a rotação e a temperatura chegam determinísticas a cada leitura e trocam o número no lugar, sem animação; o hodômetro, o horímetro, o combustível e o consumo total ficam parados. Reler conserva o contexto e registra os resultados em `etapas.can`; não inventa um sinal que o modelo não possui.

## A cadeia (T09·1)

Limpeza e cinco blocos são enviados e relidos em ordem: Ativo, Cercas, Leitor, Eventos e Conexão. Cada etapa grava e confere no lugar, com a barra, a contagem na unidade dela (os sinais da CAN, os pontos das cercas, os ajustes, os eventos) e o que falta, em passos de 100 ms: 1,2 s gravando e 0,8 s relendo; a Limpeza, um comando só, 1,2 s; a Conexão gravada espera o servidor 1,2 s (`ritmos.js`). Pronta, cada etapa diz o que gravou, e o contador do título conta as que conferiram. Concluída, a faixa *Conferido no módulo · 6 passos* aparece logo embaixo da linha dos pinos, e nada rola: a cadeia cabe na tela. Na instalação nova, a limpeza é a completa — zera o módulo, e a rede volta na Conexão —, e, com mensagens que o módulo ainda não enviou, o `Gravar no módulo` pergunta antes (a folha da T09/27); na manutenção, ela apaga só o bloco. A capacidade confere contadores, eventos, filtros da CAN, regiões e a memória dos pontos de cerca com os cartões. A limpeza preserva os identificadores. O pacote não leva cartões, e o módulo não guarda versão do pacote. As falhas e a retomada são descritas na [T09](../02-telas/T09-configurar-modulo/tela.md).

Concluída, a cadeia segue pro `Ler a CAN` (acima). O servidor que ainda não respondeu fica em `etapas.cadeia.servidor: 'ainda-nao'` (T09/12), e o `Conferir de novo` pede a prova outra vez. Sem a Conexão (o `Reenviar tudo, menos a conexão` da T11), a cadeia corre os outros cinco, sem a prova do servidor, e concluída fica `{ confirmados: 6, semConexao: true }`: a Conexão ficou como estava, e quem lê os seis (o checklist, a T07) a vê conferida. Recusado de novo, `Gravar só a conexão e encerrar` grava só a Conexão, que espera o servidor, guarda o recusado e o que ficou por gravar em `etapas.cadeia.soConexao` e segue pros 4 passos da sessão abortada (T16/03). A queda que não volta no tempo limite diz o que conferir e a quem acionar (T09/35); a manutenção aberta pelo menu começa sem nada escolhido (T09/28), e a Conexão reenviada nela espera o servidor (T09/34).

## A conferência (T11·1, T11·2)

Compara os cinco blocos do script, na ordem dele: Ativo (*traduz a CAN do OF-1621*), Cercas, Leitor, Eventos e Conexão (a operadora e a APN do chip, *TIM · timbrasil.br*; na divergência, *no módulo · Claro · claro.com.br*), com o Leitor pelos fios do cadastro do modelo (*fios azul e amarelo*; na divergência, *no módulo · fio verde*). A leitura usa 400 ms por linha; a contagem acompanha até 5, e o veredito espera a última. O caminho normal do herói confere. O par divergente é exemplo parado da coluna, sem levar o palco a uma cadeia especial.

No produto, **Corrigir este bloco** nunca envia mais de um bloco: com dependente, abre a folha de confirmação da T09 (a 06) e, confirmado, a curta da T09 já corre; sem, corre direto. O que ficou para depois numa manutenção aparece *revisar em seguida*, com o motivo do mock e o **Reenviar**, que abre a manutenção com o bloco escolhido. **Reenviar tudo, menos a conexão** limpa o avanço anterior e abre o que vai ser gravado sem a Conexão (T09/30): a limpeza é a de configuração, a Conexão fica como está, e a cadeia corre com os outros cinco, sem a prova do servidor. **Corrigir este bloco** na Conexão, com a operadora do cadastro diferente da do módulo, pergunta antes pelo chip (T11/07); reenviada, a Conexão espera o servidor, como na instalação nova (T09/34). O voltar da T11/00 faz o `Apenas registrar o diagnóstico`, a saída da conferência. **Apenas registrar o diagnóstico** salva `etapas.conferencia` e volta ao menu. Embora `tiposFila` já declare Diagnóstico, essa ação não cria item nem envia no protótipo; o upload real está pendente.

## O reenvio na manutenção

O arrastado nunca é reenviado sozinho. Quem depende de quem é do mock (`M.dependentes`: o Ativo → os Eventos; as Cercas → o Leitor e os Eventos; o Leitor → os Eventos), e os motivos e a consequência também (`M.motivosDependente`, `M.consequenciaReenvio`). A lógica mora em [reenvio.js](app/src/estado/reenvio.js):

- na lista da manutenção (T09/08), todo bloco se escolhe; o que tem dependente abre a **folha de confirmação** (13, 17, 18) antes de enviar; o Cancelar só fecha;
- a curta reenvia só o bloco, e diz quem precisa ser reenviado depois (09); conferida, o app **pergunta por cada dependente, um por vez, na ordem do script** (10, 14, 15). O Reenviar de um só liga quando o de cima confere ou fica para depois; a pergunta é a confirmação, sem outra folha;
- na pergunta, **Deixar para depois** vira *fica para depois* no lugar do link, com o Reenviar ao lado; o **Reenviar** de um dependente corre a curta dele e volta à mesma pergunta, com ele *confere · reenviado* (T09/19 e 20);
- **Deixar para depois** e sair da pergunta com algo por decidir gravam `etapas.manutencao.faltaReenviar` (`{ bloco, por }`, na ordem do script). A T09 mostra *falta reenviar* na lista (16), a T11 mostra *revisar em seguida* (05), e a Seção D da T13 também (43), com o **Finalizar desligado** e a causa *Falta reenviar o leitor e os eventos.* Reenviar o bloco tira ele da lista;
- na manutenção, a T09 abre na lista mesmo com a cadeia gravada; só uma cadeia de instalação pela metade retoma.

Nenhuma entrada viva do palco leva à manutenção (os exemplos são consultas paradas). O roteiro [reenvio](app/scripts/caminhos/reenvio.mjs) semeia o vínculo de manutenção que a T06 gravaria e percorre o fluxo das cercas inteiro só com toques.

## O ciclo de testes (T14·1 a T14·4)

São até quatro passos aplicáveis: ignição ligada, rotação, cartão e ignição desligada. Sem leitor, três. Ré e porta saíram; velocidade não entra. O bip pertence à T13.

A fila drena em 3 s; depois o técnico dispara o evento. O prazo é 2:00, com 1 s real valendo 4 s do prazo. O evento de exemplo chega aos 24 s e confere seis campos aos 33 s. As leituras seguem [ciclo.js](app/src/telas/T14/ciclo.js); o cartão exige resposta manual contra o número impresso, sem comparar cadastro. Não confere vira não conforme, com justificativa na T13. Enquanto o ciclo corre, a linha do cartão que não confere tem `Passar de novo` (T14/10, decisão 64): a vez volta ao cartão, vale a última resposta, e a ignição desligada volta a esperar a dela; concluído o ciclo, o não confere segue pro checklist.

Antes de concluir, Encerrar o ciclo e Ir para o checklist levam à T13 com resultados preservados. Gravam `fechado: true` e `false`, respectivamente; **esse campo não é lido na retomada atual**, que preserva os mesmos passos. Concluído, Ir para o checklist é o primário e Voltar ao menu a saída secundária. Concluir o ciclo não finaliza a instalação.

## O checklist (T13·1 a T13·6)

O catálogo tem **30 itens** (A=4, B=5, C=4, D=10, E=5, F=2). O herói tem **27 que contam**: Painel exige calibração, Pendências registradas exige ID reescrito, e o **Autoteste da D roda ao encerrar e não conta** (`conta: false`; a linha diz *roda ao encerrar*, com o relógio). Leitor, rotação e bip também respeitam suas condições. A semente tem 16 resolvidos e nove obrigatórios por fazer; F não bloqueia. O bloco deixado para depois numa manutenção desliga o Finalizar (o reenvio, acima).

A, C e D conferem resultados automaticamente; B fotografa ou registra ressalva com justificativa **e foto do problema**. A foto vale no `Usar foto` (decisão 63): o `Tirar foto` mostra a foto no quadro da câmera, com *Foto tirada às 14:30* e *confira se está nítida antes de usar*, e o item ainda não conta; o `Usar foto` conta e segue pro próximo; o `Tirar de novo` descarta a foto e volta à câmera; o voltar e o *Não está conforme* também a descartam. A foto do problema segue a mesma regra, com o `Tirar de novo` no pé. No protótipo, que não tem câmera, a foto é um desenho de exemplo do mock (`checklist.fotosDeExemplo`, em `04-dados/fotos/`), inline no quadro, e a do painel é a do ativo da sessão. E combina os passos da T14 com o bip respondido aqui. Cartão ou bip não conforme pede o que aconteceu e pode ficar resolvido com ressalva. A resposta se refaz (decisão 64): respondido, o bip fica com `Testar de novo`, que toca de novo e volta à pergunta, e o *Não ouvi* abre o campo do que aconteceu e só conta com ele escrito (HU-T13-4); o cartão que não confere conta já com a resposta, e o campo dele fica pra justificar. Com o que aconteceu escrito, o voltar na câmera do problema e com a foto dele pergunta antes, *Descartar a ressalva?* (T13/51) — o `Voltar ao checklist` do pé também —; a foto do item que não foi usada continua saindo direto. F confere Posição e Evento de teste a partir do recebimento e conferência do evento, sem os antigos pedidos de correção.

No item manual da T13, sem permissão para uma foto ainda não tirada, o primário é `Abrir as configurações`; ao voltar, a permissão é conferida de novo. Com `Não está conforme` marcado e a câmera permitida, `Fotografar o problema` continua disponível até a foto existir, com ou sem justificativa. Depois da foto, sem justificativa, `Conte o que aconteceu` fica apagado e desabilitado; com os dois, o primário é `Salvar com ressalva`. Desmarcado, volta ao `Tirar foto` quando a câmera está permitida. A ordem entre escrever e fotografar é livre.

O automático reprovado abre seu detalhe e **Reler o módulo**: a primeira leitura do caso pode continuar reprovando, e a segunda passar. Alimentação vai de 8,4 para 8,8 e depois 24,3 V; o GPS continua sem posição e depois volta com posição, com 9 satélites (o GPS aprova pela posição; os satélites e a antena só informam). Nada volta sozinho para outra tela. Os resultados atualizam C.

Finalizar exige A a E resolvidas. Se F falhou, a seção diz a causa e oferece `Disparar de novo`, que leva ao ciclo (T13/49), e finalizar pede ciência, com a causa no diálogo; aguardando, registra direto. O `Finalizar instalação` vira `Encerrar sessão` no mesmo lugar, e o segundo toque de um toque duplo não encerra (o primário que nasce de um toque, abaixo). O registro gera relatório e evidências na fila em memória, com a hora fixa, e mostra **Checklist registrado · aguardando autoteste**. A propriedade legada `homologada` sinaliza esse registro; a T16 ainda precisa comprovar a homologação. Câmera e foto do Painel são desta tela, não da T10.

## O encerramento e o autoteste (T16)

O encerramento reinicia o módulo automaticamente, reconecta se necessário e lê **sete assertivas**, uma a cada 400 ms. O módulo que não reinicia por comando (o VL08 do caminhão) pede o corte da alimentação, uma vez (T16/09); o que não volta do reinício no tempo limite oferece `Tentar de novo` ou `Encerrar sem homologar` (T16/10). A contagem separa aprovadas, não se aplicam e pendentes. Sem falha, homologa; com falha, bloqueia, informa a causa e diz a quem acionar. O evento do cartão pode continuar pendente por até 24 h sem impedir a homologação. A faixa sai ao fechar a sessão. A saída antecipada conclui sem homologar.

## O voltar do Android

No computador, Esc simula voltar. A camada aberta tem prioridade: folha ou diálogo fecha quando oferece essa saída. Sem camada, segue a saída desenhada da tela. Onde só há ação de processo, como a releitura, não inventa navegação: a espera tem fim. Nas consultas paradas, não faz nada. Login, menu e a escolha da empresa (T02) ficam onde estão. O voltar não deixa o técnico preso (decisão 64): na busca da T05, que não tem saída pro menu no rodapé, ele leva ao menu; na conferência com divergência (T11/00), faz o `Apenas registrar o diagnóstico`; no recusado de novo da T09, abre a folha que grava só a conexão; com o que aconteceu escrito, na T13, pergunta antes de descartar.

## O primário que nasce de um toque

Um toque não vale por dois (decisão 64, `03-design-system/movimento.md` · *Por cima da tela*): o primário que nasce dentro de um toque — o texto novo no mesmo botão, ou o da folha que o toque abriu — só responde depois de `RITMOS.toqueDuploMs` (300 ms, o toque duplo do Android), sem o pressionado, também com reduzir movimento, porque não é movimento. A peça faz sozinha, pelo toque em curso ([Primario.jsx](app/src/ds/primitivos/Primario.jsx), com o `emToque` da troca de quadro); quando o texto troca um instante depois do toque, a tela liga `esperaToqueDuplo`. Enquanto espera, o botão leva `data-nascendo`, e a régua dos roteiros espera com ele; o passo `toqueDuplo` dá dois toques no mesmo ponto e prova que o segundo não age. O que nasce de um processo, ou abrindo a tela, responde na hora.

## A folha que fecha (lei 20)

X, véu, voltar e arraste fecham a folha. O arraste começa depois de 8px e fecha ao soltar além de 56px, pelos tokens; antes disso, volta. Arrastar uma linha não executa sua ação. A folha Outras ações da T11 usa o espaçamento aprovado da folha Não recebi o código.

Toda folha escurece o fundo inteiro do app: conteúdo, tira de contexto, faixa de sessão e fundo da barra de status. O SVG oficial da hora e dos ícones continua legível; as posições, medidas, ações e consultas paradas permanecem as mesmas. Na T04, os diálogos `06`, `09`, `12`, `13` e `16` compartilham a cobertura, e a troca entre folha e diálogo preserva o véu sem clarear o topo. Como no Material 3, o `--veu` é a cor do tema a 32% e a cobertura vale pra todo diálogo: o aviso de outra sessão da T02, *A Seção F não passou* da T13 (o véu se estende sobre a faixa por `--veu-topo`, e a faixa fica inerte) e o *Encerrar antes de terminar?* de toda tela com a faixa (`useEncerrar` devolve o `veu`, que a tela passa pra `BarraDoSistema`). Toda folha e diálogo abre por cima da tela de onde saiu, que continua desenhada atrás.

## O teclado (regra 10)

A tela mantém campo e ação acima do teclado, adaptando o miolo que rola e o rodapé. O campo do painel abre teclado numérico. A medida do teclado vem da janela/viewport, sem um segundo desenho da tela. Regras e limitações são documentadas em [teclado.js](app/src/estado/teclado.js).

Na tela do código (T01/03, decisão 62), o protótipo desenha o teclado do aparelho onde não existe teclado de verdade: no computador (o ponteiro fino) e no print. É cenário do sistema, como as barras: o numérico do Android, o desenho de `05-recursos/sistema/` (o escuro e, no *Modo claro*, o claro), na peça [TecladoDoAparelho.jsx](app/src/ds/chrome/TecladoDoAparelho.jsx), no pé, por baixo da pílula, com a altura do desenho. Aberto, o app encolhe até o que sobra acima dele: o rodapé sobe junto, só com o `Confirmar`, e o `Voltar ao login` sai. As teclas digitam no código, o apagar tira o último dígito, e o ✓ confirma com os seis dígitos ou só fecha o teclado; o voltar, com ele aberto, só fecha o teclado. No celular de verdade (o ponteiro grosso), ele nunca aparece: abre o teclado do aparelho, e a peça de cima encolhe o app. Os outros campos do app não desenham teclado. O detalhe está na ficha da T01.

## O retrato (regra 11)

O app fica em retrato, inclusive na janela deitada. O palco adapta a moldura; o app não gira. As barras do sistema desenhadas são cenário do protótipo. O produto usa as do aparelho.

## Nenhum botão aceso que não faz nada (regra 12)

Ações indisponíveis ficam desabilitadas de verdade e em tinta apagada. Permissão que o sistema não deixa solicitar de novo oferece `Abrir as configurações`. O protótipo simula as permissões e fotos; o produto precisa ligar essas ações ao Android e à câmera real.

## A URL

`tela`, `momento` e `estado` identificam o quadro; o modo de fotografia congela processos. A coluna oferece consultas com o dado da referência, independentemente da sessão guardada. A lista normativa completa está em [indice.json](../02-telas/indice.json); os motivos e acessos de cada quadro, no `estados.md` da tela. Não copie tabelas históricas para gerar rotas atuais.

## O que é provisório

Tempos fixos, permissões, rádio, servidor, fotos e envio são simulações. Os valores de bancada ainda pendentes, as perguntas reais e os adaptadores do módulo e do servidor ficam com o produto. O histórico explica como a versão chegou aqui; não substitui as regras vigentes.

## O tema

O app nasce escuro. O claro, neutro frio, é escolha do técnico: a linha *Modo claro* da folha da Conta (T04/05) e, no palco, a mesma linha no pé do painel — **um estado só** (`app/src/estado/tema.js`), guardado no armazenamento do navegador e lido quando o app abre, então o login já nasce no tema escolhido. Ligar põe `data-tema="claro"` na raiz do app (`App.jsx`) e troca só as cores, pelos tokens; o palco e a moldura do celular continuam escuros. A troca acontece no lugar, em 300ms, com a folha aberta; com reduzir movimento, é direta. Todo roteiro de `scripts/caminhos` começa com o armazenamento limpo: o app nasce escuro em cada um.
