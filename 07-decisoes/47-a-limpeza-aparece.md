# 47 · A limpeza aparece, e o espaço se confere no envio

> **Atualizada pela [58](58-a-limpeza-completa.md):** na instalação nova, a limpeza é a completa: zera o módulo num comando só, e a rede volta no último passo · na manutenção, continua só do bloco escolhido.

**O contexto.** A limpeza apagava a configuração anterior sem dizer o quê. E o espaço no módulo e as cercas eram conferidos na pré-checagem, antes de se saber o que ia ser gravado. O requisito pede a limpeza visível, a conta feita sobre o que vai ser gravado, e a manutenção de um bloco por vez.

**A decisão.** A configuração ganha uma tela antes da cadeia, **o que vai ser gravado**: os blocos, a limpeza em primeiro dizendo o que apaga e o que preserva, e as duas pré-condições — os pinos e o espaço. Se não cabe, ou se as cercas passam do limite, a gravação não começa. Na instalação nova vão todos os blocos; na manutenção, o técnico escolhe um, e a limpeza apaga só ele.

**O que foi descartado.** Conferir o espaço no diagnóstico, antes do vínculo — a conta dependeria de um ativo que ainda não foi escolhido · deixar a limpeza implícita, que é o que o requisito pede pra mudar · reenviar todos os blocos na manutenção, que apagaria o que estava certo.

**A consequência.** A T09 ganha cinco referências: o que vai ser gravado, a configuração que não cabe, cercas demais, e a manutenção — escolher o bloco e reenviar · a limpeza visível nas cinco telas da cadeia · os avisos das travas dizem o que fazer, sem repetir os números que o elemento já mostra · a peça *cadeia antes de gravar* entra no design system.
