# As decisões

Cada decisão com o contexto, a escolha, o que foi descartado e a consequência. **Uma decisão que não é registrada volta a ser discutida.**

**Como ler a vigência:** os arquivos individuais preservam o contexto de cada decisão. Uma regra ou contagem registrada numa decisão não supera a ficha atual de `02-telas/`, o mock e as revisões posteriores. Em especial:

- **33 e 52 · calibração:** a foto saiu da T10 e fica na Montagem da T13, obrigatória quando houve calibração; o ônibus do percurso normal mostra *Nada a calibrar neste ativo*. A calibração do caminhão fica disponível como consulta parada no palco.
- **54 · ciclo:** os seis passos descritos nessa decisão foram reduzidos a no máximo quatro: ignição ligada, rotação quando aplicável, cartão quando há leitor e ignição desligada. Ré e porta saíram. Velocidade ficou apenas como calibração opcional na T10 do modelo com tacógrafo; o bip é respondido na T13. O código do cartão é conferido pelo técnico contra o número impresso.
- **Encerramento e homologação:** a T13 registra o checklist e aguarda autoteste; a homologação aparece só na T16. O encerramento continua com oito passos, e o autoteste atual tem sete assertivas e três contadores separados. O evento do cartão pode ficar pendente por até 24 h sem bloquear a homologação.
- **02 · tema (revista):** o escuro continua o padrão e o único desenhado; o claro é escolha do técnico, na folha da Conta, e nasce do escuro trocando só as cores dos tokens (leis R-16 a R-19, folha 9 do design system).
- **37 e 56 · contexto:** o contexto é só a empresa, e o pacote é o dela, inteiro: a unidade saiu do app. Com uma empresa só, a escolha não aparece e o `Entrar` leva direto ao sincronizar. A 37 fica como registro de como a unidade entrou.
- **63 e 64 · o voltar no item:** a foto do item que ainda não foi usada sai direto no voltar (63); com o que aconteceu escrito, na câmera do problema ou com a foto do problema, o voltar pergunta antes (64, T13/51).
- **06 e 23 · palco:** todos os quadros escolhidos em *Estados desta tela* ficam parados. Os exemplos especiais da coluna preservam os tipos e o censo do índice; *Voltar ao fluxo* restaura o percurso anterior. Essa regra substitui descrições antigas de cenários de demonstração interativos pela coluna.

Para implementar a regra atual, comece por `08-handoff/`, `01-produto/fluxos.md` e a ficha da tela. Para entender como ela foi decidida, consulte o registro abaixo.

| # | Decisão |
|---|---|
| [01](01-evidencia-gerada.md) | A evidência é gerada, nunca digitada |
| [02](02-so-escuro.md) | Só o tema escuro · *revista: o claro é escolha, nascido dos tokens* |
| [03](03-lima-veredito.md) | O lima marca só veredito e escolhido |
| [04](04-falha-no-elemento.md) | A falha mora no elemento, o título fica |
| [05](05-nada-se-remonta.md) | O estado muda o conteúdo, nunca o desenho |
| [06](06-momento-e-estado.md) | Momento é fluxo; estado é coluna |
| [07](07-faixa-nasce.md) | A sessão nasce na pré-checagem, e a faixa desce ali · *atualizada pela 44* |
| [08](08-precheck-em-lista.md) | A pré-checagem é lista, na ordem · *superada pela 44* |
| [09](09-aviso-unico.md) | O aviso tem um formato só |
| [10](10-tambor.md) | A calibração rola o número no lugar |
| [11](11-porta-natural.md) | Tocar no caso abre o estado |
| [12](12-toque-sem-hover.md) | Três estados de toque, e nada de hover |
| [13](13-palco-fora.md) | O palco fica fora do app |
| [14](14-tela-800.md) | A tela é 360 × 800 |
| [15](15-medida-por-dentro.md) | Toda medida é por dentro |
| [16](16-pe-32.md) | Nada visível a menos de 32px do pé |
| [17](17-nada-encosta.md) | Nada encosta |
| [18](18-barra-sangra.md) | A barra do sistema sangra no primeiro andar |
| [19](19-logo-presa.md) | A marca do login não se move |
| [20](20-prazo-estourado.md) | O prazo estourado é a mesma tela do ciclo |
| [21](21-so-registrar.md) | Só registrar o diagnóstico, no rodapé |
| [22](22-pinos-linha.md) | A ocupação de pinos é uma linha embaixo do título |
| [23](23-estado-e-o-app.md) | O estado no palco é o próprio app |
| [24](24-transicao.md) | Entre telas, só o conteúdo esmaece |
| [25](25-painel-duas-partes.md) | O painel do palco em duas partes |
| [26](26-sessao-abortada.md) | ENCERRAR antes de homologar não pede confirmação · *superada pela 36* |
| [27](27-acesso-7-dias.md) | O acesso vale por 7 dias |
| [28](28-lima-da-marca.md) | A marca usa o mesmo lima do sistema |
| [29](29-um-marcador-so.md) | Um marcador de escolha só |
| [30](30-lugar-do-voltar-ao-fluxo.md) | O lugar do Voltar ao fluxo é fixo |
| [31](31-contato-mascarado.md) | O contato mascarado, e a espera virando número |
| [32](32-sem-gestor-no-nao-recebi.md) | O não recebi o código não aciona o gestor |
| [33](33-calibracao-so-com-a-prova.md) | A calibração só semeia com a prova |
| [34](34-checklist-numa-estrutura-so.md) | O checklist numa estrutura só |
| [35](35-calibracao-aponta-o-ciclo.md) | A calibração aponta o ciclo dinâmico |
| [36](36-encerrar-pede-confirmacao.md) | O ENCERRAR pede confirmação antes de homologar |
| [37](37-empresa-e-unidade.md) | O contexto é empresa e unidade · *superada pela 56* |
| [38](38-o-toque-do-rodape.md) | O botão e o link do rodapé ficam a 8px |
| [39](39-nao-conforme-com-foto.md) | O não conforme exige a foto do problema |
| [40](40-as-acoes-da-conferencia.md) | As três ações da conferência cabem num rodapé de duas · *superada pela 53* |
| [41](41-o-que-o-servidor-recebeu.md) | A T12 mostra o que o servidor recebeu |
| [42](42-a-fila-e-do-aparelho.md) | A fila de saída é do aparelho |
| [43](43-a-moldura-e-a-barra-de-status.md) | A moldura do palco é um celular atual, sem marca |
| [44](44-o-diagnostico-do-modulo.md) | O diagnóstico do módulo substitui a pré-checagem e os Dados da CAN |
| [45](45-o-pacote-sem-cartoes.md) | O pacote sincronizado não leva os cartões |
| [46](46-o-vinculo-sem-chassi.md) | O vínculo mostra o modelo, não o chassi — e decide o modo |
| [47](47-a-limpeza-aparece.md) | A limpeza aparece, e o espaço se confere no envio · *atualizada pela 58* |
| [48](48-o-menu-sem-rede.md) | Sem rede, só as últimas instalações esperam |
| [49](49-a-cadeia-mostra-o-conteudo.md) | O módulo não guarda versão: a cadeia mostra o conteúdo · *atualizada pela 57 e pela 59* |
| [50](50-as-cercas-contam-em-regioes.md) | As cercas contam em regiões · *atualizada pela 59* |
| [51](51-a-apn-aparece.md) | A APN aparece pro técnico · *atualizada pela 59* |
| [52](52-a-calibracao-sem-foto.md) | A calibração não fotografa; o horímetro é opcional |
| [53](53-a-conferencia-por-conteudo.md) | A conferência compara conteúdo, e corrige um bloco por vez |
| [54](54-o-ciclo-parado.md) | O ciclo de testes é parado, e o servidor não confere viagem |
| [55](55-o-claro-mais-leve-e-os-icones.md) | O claro mais leve, com o rebaixado separado do poço, e os ícones são os nossos |
| [56](56-o-contexto-e-a-empresa.md) | O contexto é a empresa |
| [57](57-a-gravacao-etapa-por-etapa.md) | A configuração mostra cada etapa gravando e conferindo |
| [58](58-a-limpeza-completa.md) | Na instalação nova, a limpeza é a completa |
| [59](59-o-modulo-de-verdade.md) | O módulo de verdade: os dados do Virloc |
| [60](60-o-gps-pela-posicao.md) | O GPS aprova pela posição, e a foto diz o que enquadrar embaixo do título |
| [61](61-as-telas-cabem-sem-rolar.md) | As telas cabem sem rolar |
| [62](62-o-teclado-do-aparelho.md) | O teclado do aparelho aparece na tela do código |
| [63](63-a-foto-vale-no-usar-foto.md) | A foto vale no Usar foto: o técnico vê a foto antes de ela contar · *refinada pela 64 no voltar com a ressalva escrita* |
| [64](64-toda-espera-tem-fim.md) | Toda espera tem fim, a resposta se refaz, e o que se perde pergunta antes |
