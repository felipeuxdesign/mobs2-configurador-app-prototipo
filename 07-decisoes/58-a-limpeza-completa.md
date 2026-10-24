# 58 · Na instalação nova, a limpeza é a completa

**O contexto.** A limpeza da instalação nova apagava a configuração e preservava *o serial e os contadores*. Mas o módulo que chega numa instalação nova pode vir de outro ônibus: contadores, mensagens guardadas e senha de outro veículo. O material do Virloc recomenda, no VL06, a limpeza completa antes de embarcar o script.

**A decisão.** **Na instalação nova, a limpeza é a completa**: zera o módulo num comando só (a configuração, a rede, os contadores e as mensagens que ele guarda), e a rede volta no último passo, na Conexão · a descrição diz, no jeito das outras etapas, *zera o módulo · a rede volta no último passo*, e pronta, *módulo zerado · a rede volta no último passo* · **com mensagens que o módulo ainda não enviou**, o `Gravar no módulo` abre antes uma folha: *A limpeza apaga as 12 mensagens que o módulo ainda não enviou.* · `Esperar o envio`, a ação segura, ou `Gravar mesmo assim` · na manutenção, a limpeza continua só do bloco escolhido, e a rede do módulo continua · o que não vem da CAN se semeia de novo na calibração.

**O que foi descartado.** A limpeza básica, com os contadores e as mensagens preservados: o módulo de outro veículo levaria a história dele pro ônibus novo · apagar as mensagens sem avisar: posições e eventos que ainda não subiram se perdem, e o técnico pode esperar o módulo enviar.

**A consequência.** A referência T09/27, a folha das mensagens, e o caso `mensagens-pendentes` no mock · a descrição da Limpeza em todas as telas da T09 · a HU-T09-3 reescrita · o domínio diz o escopo de cada limpeza · atualiza a decisão 47.
