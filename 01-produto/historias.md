# As 110 histórias de usuário

Cada uma aponta pra pasta da tela que a atende — lá, a ficha, os estados e a referência. Os 110 identificadores foram preservados, incluindo as histórias retiradas e marcadas abaixo; as regras atuais seguem as revisões de produto e as fichas das telas. Notas antigas nas fichas não reativam uma história retirada.


## T01 · Login · `02-telas/T01-login/`

- **HU-T01-1** — Entro com usuário e senha; erro não distingue usuário inexistente de senha errada
- **HU-T01-2** — Com sessão válida e sem rede, o app abre direto na home
- **HU-T01-3** — Lembrar meu usuário desmarcado por padrão, guarda só o identificador, limpável no campo
- **HU-T01-4** — Outro usuário descarta a sessão anterior; a fila do anterior é preservada e continua subindo
- **HU-T01-5** — Recupero senha informando celular ou e-mail, com validação local e conferência pelo servidor; nenhum contato do cadastro aparece antes do login
- **HU-T01-6** — Máscara de telefone derivada do DDI, não fixa; trocar DDI reaplica e avisa
- **HU-T01-7** — Digito código de 6 dígitos · 10 min · 3 tentativas · reenvio após 60 s · teto 3/hora
- **HU-T01-8** — Não recebi o código com duas saídas: reenviar o código ou usar outro dado; ambas respeitam a espera de 60 s, sem acionar o gestor · decisão 32
- **HU-T01-9** — Eu crio a senha nova; os 6 requisitos ficam visíveis desde o início e marcam sozinhos
- **HU-T01-10** — Modal diz "senha alterada", sem botão fechar; a troca encerra sessões em outros aparelhos
- **HU-T01-11** — A sessão de acesso não expira por inatividade; só por Sair ou pelos 7 dias, com aviso no 5º
- **HU-T01-12** — Sair tem tela própria: mostra sessão de configuração aberta, itens na fila e o que sobrevive

## T02 · Selecionar contexto · `02-telas/T02-selecionar-contexto/`

- **HU-T02-1** — Escolho a empresa em que vou trabalhar, entre as que tenho permissão, com busca quando a lista for longa (sem desenho nesta versão); com uma empresa só, o app pula a escolha; o herói começa com três empresas
- **HU-T02-2** — Troco de empresa a qualquer momento pelo topo do menu; a empresa ativa fica sempre visível
- **HU-T02-3** — Trocar com módulo conectado avisa que a sessão de configuração encerra, e pede confirmação
- **HU-T02-4** — Trocar com envio em andamento é bloqueado até concluir ou abortar

## T03 · Sincronizar · `02-telas/T03-sincronizar/`

- **HU-T03-1** — Vejo progresso, volume e tempo estimado; sincronização é incremental por versão
- **HU-T03-2** — Falha de rede mostra erro com Reconectar, sem perder progresso parcial
- **HU-T03-3** — A versão do manifesto é gravada em toda evidência
- **HU-T03-4** — Pacote > 7 dias bloqueia; a partir de 3 avisa sem bloquear. Idade conta do carimbo do servidor

## T04 · Menu · `02-telas/T04-menu/`

- **HU-T04-1** — Vejo o semáforo do módulo no topo e a faixa de sessão acima dele
- **HU-T04-2** — Vejo as ferramentas; as que dependem de módulo ou ativo ficam desabilitadas com o motivo
- **HU-T04-3** — A fila mostra o contador de pendentes no próprio cartão, sem abrir
- **HU-T04-4** — Checklist pendente aparece como aviso persistente
- **HU-T04-5** — Não existe console de log. Cada ferramenta reporta estado em linguagem de campo
- **HU-T04-6** — Sem rede, o menu continua de pé; só as últimas instalações esperam a conexão

## T05 · Conectar módulo · `02-telas/T05-conectar-modulo/`

- **HU-T05-1** — Busco os módulos com Bluetooth; o vazio explica alimentação e distância, e avisa que o VL06 ECO e o VL06 CAN não aparecem
- **HU-T05-2** — Conectar abre a sessão e leva ao diagnóstico; a faixa desce na T07 quando a leitura termina sem trava
- **HU-T05-3** — Falha de comunicação nomeia o módulo que não respondeu e mostra as causas aprovadas para conferir
- **HU-T05-4** — Perda de link mostra Reconectar e preserva o estado da etapa
- **HU-T05-5** — Bluetooth desligado ou sem permissão: o app diz o que fazer antes de procurar

No protótipo (decisão 44), a sessão nasce na conexão, mas **a faixa desce na T07**, quando a leitura termina sem trava. Numa trava, o módulo fica em cima do título, sem faixa. O diagnóstico tem nove linhas, oito contadas; mensagens pendentes só informam.

## T06 · Selecionar ativo · `02-telas/T06-selecionar-ativo/`

- **HU-T06-1** — Busco por placa, frota ou módulo; vejo o modelo do ativo
- **HU-T06-2** — Confirmo o vínculo vendo placa, frota, fabricante e modelo — sem chassi
- **HU-T06-3** — Se o módulo já está em outro ativo, o app avisa; vincular aqui desfaz o vínculo antigo e registra o desvínculo
- **HU-T06-4** — Se o módulo já é deste ativo, é manutenção: o vínculo decide o modo, e eu não preciso escolher
- **HU-T06-5** — Ativo fora do pacote trava, sem oferecer solicitar cadastro
- **HU-T06-6** — A matriz de ocupação de pinos roda aqui; conflito é erro de projeto de instalação e bloqueia, sem saída trocando o leitor
- **HU-T06-7** — Conflito sem saída é nomeado como incompatibilidade e escalonado — não há reordenação que resolva
- **HU-T06-8** — Cada linha do arnês é nomeada por cor e função

## T07 · Diagnóstico do módulo · `02-telas/T07-diagnostico-do-modulo/`

- **HU-T07-1** — Logo depois de conectar, vejo o módulo: serial, firmware, alimentação, GPS, entradas, modem e SIM
- **HU-T07-2** — Serial fora do cadastro, modelo sem suporte e firmware fora da lista travam — cada um com a sua mensagem
- **HU-T07-3** — Firmware fora da lista oferece atualizar quando o módulo tem rede; sem rede, o app grava só a conexão, e então atualiza
- **HU-T07-4** — As demais leituras não bloqueiam o diagnóstico; o checklist registra o resultado. No GPS, o critério é a antena conectada, em curto ou desconectada; satélites só informam
- **HU-T07-5** — A CAN aparece depois que o bloco do ativo é gravado, com a lista da biblioteca do modelo; antes, ela não aparece; sinal sem leitura ou fora do esperado aparece na própria linha. A CAN do herói não lista velocidade
- **HU-T07-6** — Ler de novo relê a CAN inteira

## T09 · Configurar módulo · `02-telas/T09-configurar-modulo/`

- **HU-T09-1** — Na instalação nova, vejo o que vai ser gravado antes de gravar: todos os blocos, obrigatórios
- **HU-T09-2** — Antes da gravação, confiro a ocupação de pinos e o espaço calculado sobre o que vai ser gravado; a capacidade conta contadores, eventos, filtros da CAN, regiões, e os pontos de cerca com os cartões
- **HU-T09-3** — A limpeza vem primeiro e diz o que faz: na instalação nova, zera o módulo, e a rede volta no último passo; na manutenção, apaga só o bloco escolhido · com mensagens que o módulo ainda não enviou, o app avisa antes
- **HU-T09-4** — Se o que vai ser gravado excede a capacidade do módulo, a gravação não começa; o aviso mostra a quantidade e o limite e orienta procurar outro módulo
- **HU-T09-5** — Na manutenção, escolho um bloco e reenvio só ele
- **HU-T09-6** — Cada bloco só inicia com o anterior confirmado por read-back; enquanto grava e confere, vejo quanto já foi e quanto falta
- **HU-T09-7** — Falha interrompe, nomeia a etapa em linguagem de campo e oferece repetir a etapa
- **HU-T09-8** — Queda no meio: retomo do mesmo bloco, de forma idempotente
- **HU-T09-9** — Ao final, read-back consolidado dos parâmetros críticos
- **HU-T09-10** — Nova instalação é transação inteira — abortar mantém na tela de recuperação até Conexão gravar

## T10 · Calibração · `02-telas/T10-calibracao/`

- **HU-T10-1** — Vejo só as grandezas calibráveis para este ativo × módulo, com justificativa quando indisponível; o ônibus do herói mostra Nada a calibrar neste ativo
- **HU-T10-2** — Rotação: informo o valor que leio no painel; o módulo calcula o fator. Velocidade só aparece com tacógrafo digital, como opcional fora da contagem obrigatória
- **HU-T10-3** — Hodômetro/horímetro: digito o valor do painel; o app converte a unidade
- **HU-T10-4** — O horímetro só aparece quando o modelo tem, e é opcional: posso pular
- **HU-T10-5** — O read-back tolera granularidade + tempo decorrido, na unidade do reporte
- **HU-T10-6** — Releitura obrigatória antes do ciclo de testes
- **HU-T10-7** — Recalibrar em manutenção recalcula o offset, não acumula
- **HU-T10-8** — Quem escolhe pulso ou GPS é o cadastro do modelo de ativo, não eu

## T11 · Conferir configuração · `02-telas/T11-conferir-configuracao/`

- **HU-T11-1** — A conferência compara o conteúdo de cada bloco — o módulo não guarda versão
- **HU-T11-2** — Vejo as cercas, em regiões, a conexão (a operadora e a APN), os eventos e o leitor, cada um com o que está no módulo e no cadastro
- **HU-T11-3** — ~~O Extended ID aparece só pra leitura~~ · retirada: cartão é assunto da plataforma web
- **HU-T11-4** — Corrigir este bloco permite escolher qualquer linha divergente e reenviar aquele bloco por vez; os dependentes ficam para revisar conforme a cadeia
- **HU-T11-5** — Depois de reenviar um bloco, os que dependem dele ficam marcados *revisar em seguida*
- **HU-T11-6** — As outras ações dizem o efeito: reenviar os 5 blocos ou apenas registrar o diagnóstico
- **HU-T11-7** — Índice que o firmware cria sozinho não é divergência; sem lista, vai para *não classificados*
- **HU-T11-8** — Escopo fixo em limpeza de configuração — limpeza total não é oferecida aqui
- **HU-T11-9** — Configuração conforme é declarada explicitamente; o diff sobe mesmo sem reenvio

## T12 · Últimas instalações · `02-telas/T12-ultimas-instalacoes/`

- **HU-T12-1** — Vejo por ativo: última intervenção, posicionamento, eventos e status geral
- **HU-T12-2** — A janela de posicionamento é derivada do pacote (`3 × intervalo + 2 min`), não fixa
- **HU-T12-3** — Os 10 min aparecem como teto de espera, não como critério
- **HU-T12-4** — Critério sem parâmetro declarado fica indisponível com motivo
- **HU-T12-5** — Offline mostro o último resultado conhecido com a data da consulta
- **HU-T12-6** — Falha por rede vira pendente com re-checagem por 24 h, não reprovação imediata

## T13 · Checklist · `02-telas/T13-checklist/`

- **HU-T13-1** — Itens automáticos não são marcáveis à mão; "marcar todos" só nos manuais sem foto
- **HU-T13-2** — Item automático reprovado mostra o motivo e leva direto à tela que corrige
- **HU-T13-3** — Vejo progresso separado por seção e por tipo
- **HU-T13-4** — Posso responder manual como não conforme com justificativa e foto do problema → marca ressalvada, não bloqueia
- **HU-T13-5** — Finalizar exige A, C, D e E resolvidas e todas as fotos obrigatórias da B; o motivo da pendência aparece embaixo do botão
- **HU-T13-6** — A Seção F não bloqueia; finalizar com ela falhando exige ciência marcada, com nome e hora
- **HU-T13-7** — Finalizar registra o checklist e gera o relatório com seriais, resultados, fotos, localização quando permitida e técnico; aguarda o autoteste da T16
- **HU-T13-8** — Os passos da Seção E são preenchidos pelo ciclo da T14; o bip do leitor é testado e respondido aqui quando há buzzer
- **HU-T13-9** — A foto do painel é tirada aqui, na Seção B — obrigatória quando houve calibração
- **HU-T13-10** — Vejo a foto no quadro antes de ela valer: `Usar foto` conta o item, e `Tirar de novo` descarta a foto e volta à câmera

## T14 · Ciclo de testes · `02-telas/T14-ciclo-dinamico/`

- **HU-T14-1** — Com o veículo parado, o ciclo prova até quatro passos: ignição ligada, rotação quando aplicável, cartão quando há leitor e ignição desligada, mais o evento de teste; ré e porta saíram
- **HU-T14-2** — Disparo o evento de teste por botão, com o cronômetro dos 120 s em destaque
- **HU-T14-3** — Antes do cronômetro vejo a fila do módulo drenando; o botão fica indisponível com motivo
- **HU-T14-4** — Vejo 3 linhas de estado: disparado · recebido · campos conferidos. E posso disparar novamente
- **HU-T14-5** — No teste do cartão vejo o código que o módulo leu, e confiro com o número do cartão
- **HU-T14-6** — Não conferindo, o item vira não conforme e pede justificativa no checklist
- **HU-T14-7** — Vejo o tempo decorrido e o que ainda falta capturar; encerrar leva direto ao checklist
- **HU-T14-8** — ~~A velocidade só entra no ciclo quando o ônibus tem tacógrafo digital~~ · retirada do ciclo; segue como calibração opcional da T10 para o modelo com tacógrafo

## T15 · Fila de saída · `02-telas/T15-fila-de-saida/`

- **HU-T15-1** — Vejo por item: tipo, ativo, item de checklist, tamanho e progresso do corrente
- **HU-T15-2** — Sair da tela não interrompe o envio; a home mantém o contador
- **HU-T15-3** — Cada erro nomeia causa e ação; recusa do servidor nunca fica em retentativa silenciosa
- **HU-T15-4** — Fila vazia é declarada, com o horário do último envio
- **HU-T15-5** — A Seção F em re-checagem aparece em seção separada — não é item de fila
- **HU-T15-6** — Recebo notificação local quando a fila fica parada além do limite

## T16 · Sessão · `02-telas/T16-sessao/`

- **HU-T16-1** — A faixa fica no topo de toda tela: abertura, módulo, tempo decorrido e a única saída
- **HU-T16-2** — Enquanto a sessão vive: canal reaberto sozinho, módulo e ativo travados, repouso inibido
- **HU-T16-3** — O encerramento executa 8 passos e mostra cada um
- **HU-T16-4** — Vejo as sete assertivas do autoteste, cada uma com o valor lido, e os contadores separados de aprovadas, não se aplicam e pendentes; a homologação só aparece na T16 após esse resultado
- **HU-T16-5** — Falha do autoteste bloqueia a homologação, não o encerramento
- **HU-T16-6** — Sessão interrompida é oferecida de volta, com o ponto de retomada
- **HU-T16-7** — Descartar não desfaz o que foi gravado — descarta a intenção, e isso é registrado
- **HU-T16-8** — Canal aberto por sessão anterior é anomalia: o app fecha antes de começar
