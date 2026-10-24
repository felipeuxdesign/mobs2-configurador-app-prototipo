# Domínio — App Configurador

> Extraído dos requisitos v1 do produto (*App Configurador — Requisitos v1*) e atualizado pelas decisões e revisões de produto posteriores.
> Este documento existe para uma coisa: **impedir que quem constrói preencha lacuna com clichê.**
> Ele responde *como o produto fala*, *o que trava o quê* e *o que cada tela promete* — antes de qualquer pixel. **Este arquivo é a fonte de domínio.**
>
> As perguntas vigentes ficam com o produto. Trechos históricos nomeados não substituem a regra vigente de `02-telas/` e do mock.

**O censo:** 15 telas, 129 momentos e 86 estados — 230 referências HTML e 230 PNG —, 110 identificadores de histórias de usuário e 69 casos no mock. T08 saiu com a decisão 44; a numeração das demais telas foi preservada. O cadastro do checklist tem 30 itens possíveis, com condições por sessão; o herói apresenta 28, porque não calibra e não reescreve o ID. Fonte: `02-telas/indice.json`, `historias.md` e `04-dados/mocks.js`.

---

## 0. A tese do produto em cinco linhas

Aplicativo mobile de **instalação, configuração e homologação** de módulos de telemetria embarcados.

O público é **técnico de campo terceirizado, sem conhecimento de lógica `.xvm`**. Ele trabalha embaixo de um ônibus, no pátio, na obra, muitas vezes sem rede. O produto inteiro é uma resposta a essa pessoa: o técnico responde perguntas de negócio, o app fala protocolo.

O que o app entrega ao gestor não é "configuração enviada". É **prova de que este módulo, neste ativo, ficou funcionando** — read-back, foto, autoteste e confirmação de recebimento no servidor.

---

## 1. Os 6 princípios — usar para desempatar decisão de tela

| # | Princípio | O que ele decide na prática |
|---|---|---|
| 1 | O técnico responde perguntas de negócio; o app fala protocolo | Nenhuma tela expõe comando, sintaxe ou variável. Ver §2. |
| 2 | O sistema decide, o técnico executa | Todo conteúdo vem do cadastro. Não há seletor de script, parâmetro, índice ou faixa. |
| 3 | Sucesso de comando ≠ sucesso de configuração | **Todo envio tem read-back.** Nenhuma tela declara sucesso sem releitura. |
| 4 | Nenhuma etapa deixa o módulo em estado inválido | Operação destrutiva é transacional. Se não termina, o app retoma ou reverte — não volta pra home. |
| 5 | Sem cadastro prévio, o app trava | Não existe caminho de improviso em campo. Trava é trava, com escalonamento fora do app. |
| 6 | A evidência é gerada pelo app, não digitada | O que o app comprova, o técnico não marca à mão. Mata o "marcar todos". |

**Como usar:** na dúvida de comportamento, o princípio decide. Quando os princípios se contradisserem, é decisão de produto — sinaliza, não resolve.

---

## 2. Vocabulário

### 2.1 Termos oficiais — o app fala assim

**Sessões (dois objetos distintos, nunca "sessão" sozinho)**

| Termo | O que é |
|---|---|
| **Sessão de acesso** | Abre no login, encerra por **Sair** ou pelos 7 dias. Governa quem está usando o app. |
| **Sessão de configuração** | Abre ao conectar o módulo, encerra por tela própria (T16). Governa módulo, ativo, canal e progresso da cadeia. |

**Objetos de domínio**

| Termo | Definição curta |
|---|---|
| **Módulo** | O equipamento de telemetria. Identificado por serial, contra o cadastro do core M2. |
| **Ativo** | O veículo ou máquina. Vem do pacote, nunca cadastrado em campo. |
| **Variante** | Dimensão própria, no mesmo nível do modelo. Decide a CAN, o Bluetooth (sem ele, o app não conecta: o VL06 ECO e o VL06 CAN), os pulsos e a ocupação de pinos. |
| **Pacote de sincronização** | O offline do cliente. Vale 7 dias; avisa a partir de 3. |
| **Manifesto** | A versão do pacote. Gravada em toda evidência. |
| **Os 5 blocos** | Ativo · Cercas · Leitor · Eventos · Conexão. A cadeia tem 6 passos (limpeza é o 1). |
| **Cadeia** | A sequência ordenada de T09. Ordem canônica única. |
| **Read-back** | Releitura que confirma o que foi escrito. Sem ele nada é sucesso. |
| **Arraste** | Blocos que um reenvio obriga a reenviar junto. |
| **Autoteste de instalação** | Reinício + releitura no encerramento. Prova 7 assertivas, contadas em aprovadas, não se aplicam e pendentes. |
| **Assertiva** | Cada item do autoteste, com o valor lido em tela. |
| **Ciclo de testes** | Com o veículo parado: ignição ligada, rotação quando aplicável, cartão quando há leitor e ignição desligada, mais o evento de teste (T14). O bip do leitor é respondido na T13. |
| **Fila de saída** | Evidências aguardando envio. Feedback **por item**. |
| **Diagnóstico do módulo** | O que o módulo é e como ele está, logo depois de conectar. Três linhas travam; o resto só informa. |
| **Limpeza de configuração** / **Limpeza total de configuração** | Os dois escopos, derivados do cenário. Vivem como bloco 1 de T09 · a total, na instalação nova, zera o módulo (a limpeza completa do Virloc); a de configuração mantém a conexão. |

**Nomes de ferramenta na home** (9 itens, ordem fixa)
Conectar módulo · Ativo selecionado · Diagnóstico do módulo · **Configurar módulo** · Calibração · Conferir configuração · Últimas instalações · Finalizar com checklist · **Fila de saída**

> "Envio de scripts" e "Limpeza do módulo" **não sobrevivem em lugar nenhum do produto.**

**Nomeação de hardware:** por **cor e função**. "Fios azul e amarelo, leitor". Nunca pelo código da entrada ou saída.

### 2.2 Vocabulário proibido — não aparece em tela, nunca

Enumerado em §1.1 dos requisitos:

`baudrate` · código de entrada ou saída física (`IN3`, `OUT1`) · índice de memória · nome de contador · a palavra **script**

**Regra vigente:** comando, protocolo e código de hardware não orientam a ação do técnico. A APN é a exceção da decisão 51; servidor, IP e DNS continuam fora da tela. Na conferência atual, a linha é *Conexão*, com a operadora e a APN do chip (*TIM · timbrasil.br*), como em `02-telas/T11-conferir-configuracao/textos.md`; a autorização da APN não permite inventar outros detalhes técnicos.

Os termos anteriores foram substituídos na interface:

| Proibido | Em tela |
|---|---|
| BLE | **sem fio** |
| iButton | **chave de contato** |

`[ABERTO R3]` O fechamento da lista de vocabulário como enumeração exaustiva continua pendente; as substituições aprovadas e a exceção da APN já são regra. Não é autorização para reabrir o desenho.

O valor técnico **continua existindo** no log de sessão e na evidência; só aparece na interface quando a especificação atual o prevê.

---

## 3. Entidades e vínculos — o que trava o quê

### 3.1 A cadeia de dependência

```
Empresa (o contexto: sem unidade, decisão 56)
   └── Pacote de sincronização (manifesto, validade 7d), da empresa inteira
         ├── Ativos ──────────── modelo de ativo → bloco Ativo (tradução CAN)
         │                                        → mapa de contadores (por versão)
         │                                        → método de calibração de velocidade
         ├── Módulos ─────────── serial → modelo · variante · ID · credenciais
         ├── Blocos (5 camadas, versionados)
         ├── Presets de evento ─ intervalo de rastreamento · modo de fila · índice de teste
         ├── Cercas ──────────── regiões e pontos, com os limites da capacidade do módulo
         └── Matriz de capacidades ─ modelo × variante × firmware
```

**O pacote não baixa cartões nem chaves de contato** (decisão 45). Os identificadores já existentes no módulo são preservados; a v1 não os cadastra nem os grava. No teste do cartão, o técnico compara o código lido com o número impresso, sem consulta ao cadastro de cartões. As coleções de identificadores do mock são exemplos para o protótipo, não conteúdo de sincronização.

### 3.2 A ordem canônica (invariante — nunca reordenar)

| # | Bloco | Por que nesta posição |
|---|---|---|
| 1 | **Limpeza** | estado conhecido antes de escrever |
| 2 | **Ativo** | alimenta os contadores que os eventos consomem |
| 3 | **Cercas** | a limpeza de pontos é global; o bloco vem antes do Leitor |
| 4 | **Leitor** | depois de Cercas, para nunca ser apagado por elas |
| 5 | **Eventos** | depende de Ativo, Cercas e Leitor |
| 6 | **Conexão** | fecha a comunicação com o sistema |

Os blocos são versionados no cadastro; **o módulo não guarda a versão**. A T09 mostra o conteúdo que grava, e a T11 compara o conteúdo lido com o cadastro. As cercas aparecem em regiões; na trava de capacidade da T09, o limite vigente é o total de pontos, porque o cadastro já impede regiões demais.

**Arraste no reenvio cirúrgico (T11):**

| Reenviado | Arrasta |
|---|---|
| Ativo | Eventos |
| Cercas | Leitor → Eventos |
| Leitor | Eventos |
| Eventos | — |
| Conexão | — |

O conjunto arrastado vai **sempre na ordem canônica**, nunca na ordem em que as divergências apareceram.

### 3.3 Derivação de escopo de limpeza — o técnico nunca escolhe

| Cenário | Escopo |
|---|---|
| Nova instalação | **Limpeza total**: zera o módulo, com a conectividade herdada, os contadores e as mensagens que ele guarda; a rede volta no último passo · antes, se o módulo tem mensagens que ainda não enviou, o app avisa (T09/27) |
| Manutenção (T11) | **Limpeza de configuração** (não derruba módulo em operação) |
| Reconfiguração no mesmo ativo | **Limpeza de configuração** |

Não há flag de permissão. Não há confirmação em dois passos. Não há escolha.

### 3.4 O que trava — matriz de bloqueio

| Trava | Onde | Saída |
|---|---|---|
| Serial não cadastrado | T07 | nomeia pela letra, bloqueia, **registra no M2** |
| Modelo/variante sem suporte v1 | T07 | nomeia pelo cadastro, bloqueia, registra |
| Firmware fora da lista | T07 | atualiza, se o módulo tem rede, e relê o diagnóstico; sem rede, grava só a conexão → atualiza → relê |
| Conteúdo não cabe no módulo | T09 | no envio, sobre o que vai ser gravado — bloqueia (mesmo cálculo da publicação no M2) |
| Pontos de cerca demais pro módulo | T09 | no envio, sobre o que vai ser gravado; nomeia os pontos de cerca e os cartões, que dividem a memória, e a capacidade do módulo |
| Ocupação de pinos em conflito | T06, reconferido em T09 | erro de projeto de instalação; bloqueia e escalona, sem resolver trocando o leitor em campo |
| Ativo fora do pacote | T06 | trava. **Não oferece "solicitar cadastro"** (princípio 5) |
| Sessão de acesso vencida | T01 | bloqueia configuração; **preserva fila e evidências** |
| Pacote > 7 dias | T03 | bloqueia; aviso não bloqueante a partir de 3 |
| Envio em andamento | T02, T06 | bloqueia troca de contexto e de ativo |

**Nunca trava:** buffer/LOG pendente no módulo, o modem sem sinal, o módulo que está em outro ativo — este avisa, e vincular aqui registra o desvínculo. É informação, não bloqueio.

**ID e recebimento têm provas separadas:** a Seção D e o autoteste da T16 conferem o ID com o cadastro; as pendências registradas aparecem quando houve reescrita do ID. A Seção F atual confere Posição e Evento de teste e não bloqueia o registro do checklist; uma falha exige ciência do técnico. A antiga atribuição da trava do ID à Seção F não é a regra desta entrega.

---

## 4. As máquinas de estado que decidem tela

### 4.1 Estado da instalação (6 valores — governa T12 e T13)

| Estado | Como se chega |
|---|---|
| **Aprovada** | tudo passou, incluindo Seção F |
| **Aguardando validação** | finalizada sem rede, Seção F não avaliada · até 24 h |
| **Encerrada com falha de recebimento reconhecida** | Seção F falhou e o técnico marcou ciência |
| **Aprovada após reprocessamento** | re-checagem passou dentro das 24 h |
| **Reprovada** | 24 h esgotadas |
| **Ressalvada** | item manual não conforme com justificativa · **combina com qualquer estado acima** |

### 4.2 Encerramento da sessão de configuração (8 passos, T16)

```
1. Gravar contadores e estado do script      (uma vez — limite de ciclos de escrita)
2. Reiniciar o módulo                        ┐ o autoteste
3. Releitura completa após o reinício        ┘
4. Restaurar o parâmetro de repouso          → assertiva 6
5. Fechar o canal de programação             → assertiva 5
6. Enfileirar o log da sessão
7. Desconectar
8. Apresentar o autoteste, assertiva por assertiva, com o valor lido
```

**Sessão abortada:** pula 1–3, executa 4–7.
**Falha do autoteste:** bloqueia a homologação, **não** o encerramento — o canal tem de fechar sempre.

**A T13 registra o checklist e aguarda o autoteste. A homologação só aparece na T16**, depois de reinício automático e releitura sem falha. As sete assertivas são Configuração, Contadores, Reset de leitura, ID no cadastro, Canal de programação, Repouso do módulo e Evento do cartão. A tela separa aprovadas, não se aplicam e pendentes. O reset não usado mostra o motivo; o evento do cartão pode ficar pendente por até 24 h sem impedir a homologação.

### 4.3 Semáforo do módulo (T04)

Sem módulo · Conectado saudável · Conectado com falha

### 4.4 Item de fila (T15)

na fila · enviando (com progresso próprio) · recebida · com erro

Erro nomeia **causa e ação**: falha de rede → reenvio automático · recusa do servidor → **manual**, nunca retentativa silenciosa.

---

## 5. As histórias de usuário

As 110 histórias, numeradas por tela (`HU-T<nn>-<n>`), estão em [`historias.md`](historias.md), cada uma com a pasta da tela que a atende. A numeração nasceu aqui: os requisitos têm critérios de aceite, não histórias numeradas.

---

## 6. O que este produto **não** é

O que o app não faz (escopo negativo):

- **Não é dashboard.** Não tem KPI de topo, não tem gráfico de tendência, não tem "visão geral".
- **Não tem console.** Nenhuma tela mostra comando, resposta bruta ou log.
- **Não tem configuração de usuário.** O técnico não ajusta nada além de *lembrar usuário* e do *Modo claro*, na folha da Conta (decisão 02, revista).
- **Não tem seletor de conteúdo técnico.** Nem de script, escopo, índice ou faixa. Na manutenção, o técnico pode escolher o bloco de negócio que reenvia; o conteúdo continua vindo do cadastro.
- **Não tem cadastro em campo.** Nem ativo, nem módulo, nem cerca, nem identificador.
- **Não tem assinatura em tela** (fora da v1).
- **Não tem histórico de intervenções para o técnico** (é tela web do gestor).
- **Não tem console de logs, DSM, nem listagem de PGN** (fora da v1).
