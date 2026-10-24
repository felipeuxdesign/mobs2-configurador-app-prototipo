# 46 · O vínculo mostra o modelo, não o chassi — e decide o modo

> **Atualizada:** o `moduloSerial` do cadastro é o módulo previsto pro ativo; o modo vem do caso, nunca do cadastro · o M2C-0999 aparece na lista da T05 como os outros, e a trava do serial acontece no diagnóstico.

**O contexto.** A confirmação do veículo comparava o chassi lido pela CAN com o do cadastro. Os requisitos tiram o chassi: o técnico reconhece o ônibus pela placa, pela frota e pelo modelo, e o que importa confirmar é a ligação do módulo com o ativo, na empresa.

**A decisão.** A tela vira **Confirmar o vínculo**: a placa e a frota em cima, o fabricante e o modelo no bloco de baixo, e a frase *"O M2C-0417 fica neste ativo, na Viação Atlântico Sul"*. Se o módulo já está em outro ativo, a tela avisa, e `Desvincular e vincular aqui` registra o desvínculo. E **o vínculo decide o modo**: módulo novo neste ativo é instalação nova; módulo que já era dele é manutenção.

**O que foi descartado.** Manter o chassi como informação, sem comparar — seria um número que ninguém confere · perguntar ao técnico se é instalação ou manutenção, quando o próprio vínculo já sabe · bloquear o módulo que está em outro ativo, que travaria uma troca de módulo legítima.

**A consequência.** Saem da T06 o chassi divergente, o sem chassi na CAN e a correção solicitada · entram o módulo em outro ativo e o módulo que já é deste ativo · a folha do ativo, no menu, mostra o modelo no lugar do chassi · o mock ganha o fabricante e o modelo, e perde o `chassiPelaCan` · o item *Chassi confere* sai do checklist.
