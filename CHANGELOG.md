# Registro de mudanças

As versões do protótipo navegável e do design que ele implementa. As regras de cada tela estão nas fichas de [02-telas](02-telas/), e o porquê de cada escolha, em [07-decisoes](07-decisoes/). Quando o protótipo não segue uma referência, a diferença e o motivo estão na ficha da tela, nas notas *no protótipo*.

## 1.7 · 23/10/2026 · toda espera tem fim

- **O caminho segue sem voltar ao menu:** a configuração concluída leva à CAN lida, e a CAN lida, à calibração.
- **Toda espera tem fim:** o pareamento, a reconexão, a atualização do firmware, a queda da cadeia e o reinício têm um desfecho que diz o que aconteceu e o que fazer (decisão 64).
- **A resposta se refaz:** o bip, o cartão e o número semeado se corrigem na hora, e o bip não ouvido só conta com o que aconteceu escrito.
- **O que se perde pergunta antes:** sair da conta, descartar a sessão interrompida e voltar com a ressalva escrita perguntam, e dizem o que fica. Um toque não vale por dois.
- **O mesmo fato se diz igual:** a fila do aparelho conta o mesmo em toda tela, e o pacote diz a idade e se venceu.
- **O protótipo publicado ganha de volta o movimento que só faltava nele:** a saída das folhas e dos diálogos, a troca de tema e o indicador de rolagem. O build de produção escreve os tempos dos tokens em segundos (o 150ms vira .15s), e três peças liam o número como milissegundos; agora leem a unidade, e os roteiros rodam também contra o build de produção.
- **O handoff de design** (`08-handoff/`) fica completo pra qualquer stack: as regras que valem em todas as telas e como levar o design system pra outra plataforma.
- **O repositório** fica mais enxuto: o guia de leitura de cada perfil (`GUIA-DE-LEITURA.md`) substitui o antigo *leia primeiro*, que repetia o README; os dados ganham um README próprio; e saem as ferramentas de bancada que ninguém usava mais.

## 1.6 · 22/10/2026 · a foto que vale no Usar foto

- **A foto vale no `Usar foto`:** o `Tirar foto` mostra a foto no quadro da câmera, com a hora e o que conferir, e o item só conta no `Usar foto`. O `Tirar de novo` descarta a foto e volta à câmera, e a foto do problema segue a mesma regra (decisão 63).
- **As fotos de exemplo:** o protótipo, que não tem câmera, mostra uma foto desenhada de cada item da Montagem e do problema, e a do painel diz o que o painel do ativo mostra.
- **O design system em nove folhas:** as peças da folha da manutenção e do rodapé moram nas folhas da família delas, e a folha 9 é o tema escuro e claro. Entraram o botão da linha, a câmera com a foto e as variantes que o protótipo já usava.
- **As imagens do README** no desenho novo: o canto, o contorno e a sombra.

## 1.5 · 22/10/2026 · o equipamento de verdade

- **O contexto é a empresa:** o pacote é o da empresa inteira, e a unidade saiu do app. Com uma empresa só, o app pula a escolha, e o `Trocar de empresa` mora no topo do menu (decisão 56).
- **A configuração etapa por etapa:** cada etapa mostra a barra, o que já foi e o que falta, relê no lugar e diz o que gravou. A concluída diz o resultado numa faixa (decisão 57).
- **A limpeza completa** na instalação nova: zera o módulo, e a rede volta no último passo. Com mensagens por enviar, o app pergunta antes (decisão 58).
- **O módulo de verdade:** só módulos com Bluetooth na busca, o firmware 8.04, a faixa de 9 a 40 V, a CAN da biblioteca do modelo, o leitor pelos fios, a operadora e a APN do chip, e a capacidade que conta também eventos, filtros, regiões e cartões (decisão 59).
- **O GPS pela posição:** o checklist aprova o GPS pela posição, e a foto diz o que enquadrar embaixo do título (decisão 60).
- **As telas cabem sem rolar** (decisão 61), e **o teclado do aparelho** aparece na tela do código (decisão 62).

## 1.4 · 17/10/2026 · os ícones próprios e os fluxos alternativos

- **Ícones:** o app usa só o jogo de 48 SVGs do design system, as setas das linhas inclusive. A biblioteca de ícones de fora saiu (decisão 55).
- **Tema claro mais leve:** as superfícies rebaixadas grandes ganham um token próprio, `--fundo-rebaixado`, leve no claro. O cinza do poço fica só nos quadradinhos (decisão 55).
- **Fluxos alternativos:** cada escolha do técnico segue o mock, e os desvios (outra empresa, o pacote vencido, a busca sem resultado) acontecem no caminho, cada um com a sua saída.
- **Palco:** o *Voltar ao fluxo* devolve o percurso guardado depois de consultar qualquer estado. A coluna mostra cinco momentos que são difíceis de alcançar ao vivo.
- **Fichas:** a contagem de momentos e estados de cada ficha bate com as referências, e a checagem de cobertura confere isso.
- **Menu:** o cartão que espera o módulo tem o mesmo respiro do cartão ligado.

## 1.3 · 13/10/2026 · o tema claro

- **Modo claro**, neutro frio, como escolha do técnico na folha da Conta. Ele é gerado dos tokens, e o escuro continua sendo o padrão.
- O logo passa a vir de um token (`--logo`). O palco ganha a linha *Modo claro*, que troca só o celular.
- O véu das folhas e dos diálogos segue o Material 3, cobrindo inclusive a barra do sistema.
- O estado vazio usa o contorno tracejado nos dois temas.

## 1.2 · 11/10/2026 · a segunda revisão de produto

- **Calibração sem foto:** o ônibus não calibra nada. O caminhão coletor calibra o hodômetro e a rotação, e a velocidade e o horímetro são opcionais (decisão 52).
- **Conferência por conteúdo:** a T11 compara cinco linhas de negócio, e o *Corrigir* reenvia um bloco por vez (decisão 53).
- **Ciclo de testes com o ônibus parado:** até quatro passos (ignição ligada, rotação, cartão e ignição desligada). O técnico confere o cartão lido com o número impresso (decisão 54).
- **A APN aparece** na tela, como a única informação técnica que o técnico confere (decisão 51).
- **Manutenção:** reenviar um bloco avisa quais blocos dependem dele, e o técnico decide se reenvia agora ou deixa para depois.

## 1.1 · 05/10/2026 · a primeira revisão de produto

- **Diagnóstico do módulo (T07)** entra no caminho, antes do vínculo, no lugar da pré-checagem. Ele mostra o serial, o firmware, a alimentação, o GPS, as entradas, o modem e o SIM, e embaixo a CAN do modelo (decisão 44).
- **Vínculo sem chassi:** o ônibus é confirmado pela placa, pela frota, pelo fabricante e pelo modelo (decisão 46).
- **O que vai ser gravado:** antes do envio, a T09 mostra os blocos, a limpeza (o que ela apaga e o que preserva) e as duas pré-condições, os pinos e o espaço. A cadeia mostra o conteúdo de cada bloco, não códigos de versão (decisões 47 e 49).
- **O pacote sincronizado não leva os cartões** (decisão 45).
- **Menu sem rede** (decisão 48) e **cercas contadas por região** (decisão 50).
- **Handoff de design** (`08-handoff/`): por onde começar cada tarefa e os testes prontos.

## 1.0 · 27/09/2026 · o protótipo completo

- As telas do login ao encerramento, navegáveis por toque, com todos os estados montados a partir dos dados de exemplo.
- O design system construído no projeto: tokens, primitivos e peças, sem biblioteca de componentes de fora.
- O palco: o painel com as telas, a coluna de estados e um endereço próprio para cada tela, momento e estado.
- Movimento em todas as telas, dentro das leis, com suporte a reduzir movimento.
- Cada referência fotografada e comparada pixel a pixel. Toda diferença que sobrou tem um nome e um motivo.
- Publicado na Vercel.

## 0.1 · 24/09/2026 · a fundação

- O projeto Vite com React, os tokens, a fonte, os ícones, a ponte com o mock e o estado único.
- A ferramenta de print em 720 × 1600 e a bancada de comparação com as referências.
- As primeiras telas: login, empresa e unidade, sincronização e menu.
