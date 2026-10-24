# 59 · O módulo de verdade: os dados do Virloc

**O contexto.** Conferido contra o material do Virloc (VL06 e VL08 da Newtec), o protótipo tinha dados que o equipamento não tem: o VL06 ECO e o VL06 CAN conectando pelo celular, sem Bluetooth; o firmware no formato 2.3.5; a faixa de 9 a 32 V; o leitor *sem fio* e o *fio branco*, que o VL06 não tem; a CAN com o alternador e o consumo por hora; a rede *da Mobs2* no lugar de uma APN; e a capacidade contando só contadores e pontos de cerca.

**A decisão.**
- **na busca, só módulo com Bluetooth**: o VL06 FULL, o VL06 CAN-BT e o VL08 · o VL06 ECO e o VL06 CAN não aparecem, e o app não configura esses dois · o nenhum encontrado avisa
- **o firmware no formato do Virloc**: *8.04* no herói, a lista da variante *8.03 e 8.04*, e o *8.01* fora dela
- **a faixa de alimentação do VL06, de 9,0 a 40,0 V**, na T07 e na régua do checklist (de 5 a 45 V), ainda por conferir na bancada
- **a CAN é a da biblioteca do modelo**: no ônibus do herói, rotação, hodômetro, horímetro, temperatura, combustível e consumo total, os seis contam, e o total da T07 é 14 · o ônibus lê pela CAN o que o painel mostra (*482.317 km*, *9.640 h*) e não calibra nada · o *não disponível* da CAN é *sem leitura*, nunca um número
- **o leitor sai do cadastro do modelo do ativo**: o cartão serial é *fios azul e amarelo*, o leitor de chave é *fio verde* (o 1-Wire)
- **a Conexão é a operadora e a APN do chip**, as de verdade: *TIM · timbrasil.br*, e o chip antigo, *Claro · claro.com.br* · os *3 ajustes* da Conexão são a APN, o servidor e o reinício do modem · o *Reenviar tudo, menos a conexão* lê a APN e o servidor antes de limpar e grava de volta no fim
- **a capacidade conta também os eventos, os filtros da CAN, as regiões, e os pontos de cerca com os cartões**, que dividem a memória: no VL06, 127 contadores, 128 eventos, 13 filtros, 8 regiões e 6.143 pontos e cartões

**O que foi descartado.** Manter os números do protótipo como exemplo: o técnico do piloto vai ver o equipamento de verdade, e um número que não bate com o módulo desacredita o app inteiro · mostrar o endereço do servidor junto da APN (a decisão 51 continua).

**A consequência.** A T05, a T07, a T09, a T11 e a T13 com os números novos · o mock: as variantes de cada módulo (o M2C-0362 passa a CAN-BT, o M2C-0394 a FULL), a matriz de firmwares, a faixa, a CAN da biblioteca, o leitor do modelo, as conexões com a APN, a capacidade nova e o hodômetro do herói igual ao painel · atualiza as decisões 50 e 51 · algumas perguntas ficam com a Newtec.
