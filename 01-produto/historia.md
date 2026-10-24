# O produto, do zero

Esta página é a porta de entrada pra quem nunca viu o projeto: o contexto, o problema, a resposta do produto e as escolhas que definiram o desenho. Os outros documentos desta pasta são a referência de cada parte.

## O contexto

A Mobs2 faz telemetria para frotas: um **módulo** instalado no veículo (um ônibus urbano, um caminhão coletor) lê os dados do próprio veículo pela **CAN**, a rede interna dele, e manda a posição, os eventos e as leituras para a plataforma web da Mobs2. Ali, o **gestor** da frota acompanha cada veículo e valida cada instalação.

Antes de funcionar, cada módulo precisa ser **instalado, configurado e homologado** no veículo. Quem faz isso é o técnico de campo, e o App Configurador é a ferramenta dele: um aplicativo Android que conversa com o módulo sem fio, por Bluetooth.

## O problema

O técnico de campo é **terceirizado e não conhece a lógica de programação do módulo**. Ele instala em pátio, obra e zona rural, muitas vezes sem rede, às vezes embaixo do ônibus.

**Sucesso de comando não é sucesso de configuração.** O módulo aceita um bloco de configuração e ele não funciona. Uma faixa de contadores mal declarada não falha: apaga em silêncio, e o sintoma aparece dias depois. A numeração dos contadores tem lacunas que variam por modelo: num deles, limpar um índice que não existe zera todas as regras do módulo, sem mensagem de erro. E a letra do serial identifica a família do módulo, não a variante: a mesma letra cobre quatro variantes que divergem justamente no que decide a instalação.

**O checklist não provava nada.** Era uma lista de 30 itens marcáveis à mão, com um *marcar todos* que permitia homologar sem verificar. O erro era descoberto no relatório, dias depois, com o técnico já longe do veículo.

## A tese

**A verificação acontece enquanto o técnico ainda está no veículo.** O app confere o módulo antes de gravar qualquer coisa, relê cada bloco depois de gravar, roda um ciclo de testes com o veículo parado, prova que o servidor recebe um evento de teste e, no fim, reinicia o módulo e relê tudo pra provar que a configuração sobreviveu. O checklist só fecha com o que o sistema provou, e a homologação vem depois dessa prova.

## Os princípios

Eles resolvem empates de decisão em todo o produto.

| Princípio | O que ataca |
|---|---|
| **O técnico responde perguntas de negócio; o app fala protocolo.** Nenhuma tela expõe comando, sintaxe ou nome de variável | ele decidia o que não tinha como decidir |
| **O sistema decide, o técnico executa.** Todo conteúdo de configuração vem do cadastro | o técnico escolhendo script, parâmetro, índice ou faixa |
| **Sucesso de comando não é sucesso de configuração.** Todo envio é confirmado por releitura do módulo | o equipamento que responde OK e não grava |
| **Nenhuma etapa deixa o módulo em estado inválido.** O que é destrutivo é transacional: se não termina, o app retoma ou reverte | o módulo pela metade quando a sessão cai |
| **Sem cadastro prévio, o app trava.** Não existe caminho de improviso em campo | a configuração inventada no pátio |
| **A evidência é gerada pelo app, não digitada pelo técnico.** O que o app pode comprovar, o técnico não marca à mão | o checklist marcável à mão |

## O produto em um minuto

1. **Entrar.** O técnico faz login e recupera a senha sozinho, sem ligar pra ninguém.
2. **Escolher pra quem trabalha.** A empresa em que vai instalar hoje; com uma só, o app pula esse passo.
3. **Sincronizar.** Baixa o pacote da empresa (todos os veículos dela, as conexões, os modelos, os eventos e as cercas) pra trabalhar sem rede.
4. **Conectar ao módulo,** por Bluetooth. É aqui que a sessão de configuração começa.
5. **Diagnosticar o módulo:** o serial, o firmware, a alimentação, o GPS, as entradas, o modem e o chip. Um módulo fora do cadastro ou sem suporte trava a instalação ali.
6. **Vincular o módulo ao veículo,** confirmado pela placa, pela frota e pelo modelo.
7. **Configurar.** O app mostra o que vai ser gravado e grava seis blocos, na ordem, relendo cada um: cada etapa mostra quanto já foi e quanto falta, e pronta, o que gravou.
8. **Ler a CAN e calibrar.** Gravada a configuração, o app lê os sinais que o veículo entrega pela CAN e calibra só o que ela não entrega: o ônibus não calibra nada; o caminhão coletor calibra o hodômetro e a rotação.
9. **Testar com o veículo parado:** ignição, rotação e cartão do motorista. A cada passo, o app diz o que fazer e confere o resultado.
10. **Fechar o checklist.** O app marca sozinho o que conseguiu provar, e o técnico fotografa o resto.
11. **Encerrar.** O módulo reinicia, o app relê tudo, e só então a instalação é homologada.

A qualquer momento, pelo menu, o técnico consulta a **fila de saída** (o que ainda não subiu pro servidor), **confere a configuração** de um módulo já instalado e vê as **últimas instalações**. O mapa completo, com os desvios de cada etapa, está em [fluxos.md](fluxos.md).

## As escolhas que definiram o desenho

Cada uma está registrada em [07-decisoes](../07-decisoes/), com o contexto, o que foi descartado e a consequência.

- **A evidência é gerada, nunca digitada** ([01](../07-decisoes/01-evidencia-gerada.md)): tudo o que o sistema pode provar, ele prova. O técnico só responde o que só um humano vê, e com foto.
- **O estado muda o conteúdo, nunca o desenho** ([05](../07-decisoes/05-nada-se-remonta.md)): num erro, os blocos ficam onde estão e muda o que eles dizem. O técnico nunca perde o lugar.
- **A falha mora no elemento** ([04](../07-decisoes/04-falha-no-elemento.md)): o bloco que falhou acende em vermelho, com a causa e a ação embaixo; o título da tela continua o mesmo.
- **Uma cor pra verdade** ([03](../07-decisoes/03-lima-veredito.md)): o verde-lima marca só o que foi julgado, o que foi escolhido e o botão principal. Ele nunca decora.
- **Toque, não mouse** ([12](../07-decisoes/12-toque-sem-hover.md)): três estados de toque (normal, pressionado e desabilitado), sem hover.
- **Um diagnóstico antes de qualquer gravação** ([44](../07-decisoes/44-o-diagnostico-do-modulo.md)): o que o app sabe do módulo aparece numa tela só, separando o que trava do que só informa.
- **A conferência compara conteúdo** ([53](../07-decisoes/53-a-conferencia-por-conteudo.md)): o técnico vê *4 regiões de cerca*, não *G07*, e corrige um bloco por vez.

**O que mudou com a revisão de produto.** Depois do primeiro protótipo navegável, a revisão de produto simplificou o campo: o ciclo de testes passou de seis passos (com ré e porta) a no máximo quatro, com o veículo parado; a calibração deixou de exigir foto; e a conferência do cartão do motorista passou a ser do técnico, contra o número impresso. As decisões 44 a 54 registram cada mudança e o motivo. Na revisão seguinte, com o equipamento de verdade (decisões 56 a 62), o contexto ficou só a empresa, a configuração passou a mostrar cada etapa gravando e conferindo, a limpeza da instalação nova virou a completa, e os dados do Virloc entraram: só módulos com Bluetooth, o firmware 8.04, a faixa de 9 a 40 V, a CAN da biblioteca do modelo, o leitor nos fios azul e amarelo e o GPS pela posição. Na passada de usabilidade seguinte (decisão 64), toda espera ganhou um fim que diz o que aconteceu, a resposta do técnico passou a se refazer, o que joga trabalho fora passou a perguntar antes, e o caminho passou a seguir da configuração à CAN e à calibração sem voltar ao menu.

## As palavras do produto

| Termo | O que é |
|---|---|
| **Módulo** | O equipamento de telemetria instalado no veículo, identificado pelo serial |
| **Ativo** | O veículo ou máquina onde o módulo é instalado. Vem do cadastro, nunca é criado em campo |
| **CAN** | A rede interna do veículo, de onde o módulo lê rotação, hodômetro e outros sinais |
| **Pacote** | Os dados da empresa baixados pro aparelho, pra trabalhar sem rede. Vale 7 dias |
| **Os blocos** | A configuração gravada no módulo: ativo, cercas, leitor, eventos e conexão, depois da limpeza |
| **Releitura** | Ler de volta do módulo o que acabou de ser gravado, pra provar que gravou |
| **Autoteste** | O reinício e a releitura no encerramento, que provam que a configuração sobreviveu |
| **Homologação** | A aprovação da instalação, que só acontece depois do autoteste |
| **Sessão de configuração** | O trabalho com um módulo, da conexão ao encerramento |

O vocabulário completo, com o que o app nunca diz na tela, está no [domínio](dominio.md#2-vocabulário).

## Pra ir mais fundo

| Quero entender… | Leia |
|---|---|
| quem é o técnico e quem mais olha o resultado | [usuario.md](usuario.md) |
| o caminho inteiro e cada desvio | [fluxos.md](fluxos.md) |
| o que cada tela precisa fazer | [as 110 histórias de usuário](historias.md) |
| as regras, o que trava o quê, os estados | [dominio.md](dominio.md) |
| o porquê de cada escolha | [07-decisoes](../07-decisoes/) |
| cada tela, desenhada | [02-telas](../02-telas/) e o [protótipo navegável](https://configurador-mobs2-prototipo.vercel.app) |
| como o projeto foi construído | [PROCESSO.md](../PROCESSO.md) |

A origem é o documento de requisitos do produto, *App Configurador — Requisitos v1* (agosto de 2026). As contagens daquele documento explicam a origem do problema, não o desenho atual.
