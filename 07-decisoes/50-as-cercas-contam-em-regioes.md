# 50 · As cercas contam em regiões

> **Atualizada pela [59](59-o-modulo-de-verdade.md):** o VL06 guarda 8 regiões, e o app só configura módulo com Bluetooth (o ECO saiu) · a trava das cercas da T09/07 é a memória dos pontos de cerca com os cartões: *São 5.980 pontos de cerca e 240 cartões. O módulo guarda 6.143.*

**O contexto.** O requisito pede pra conferir *a quantidade de áreas de cerca*. No cadastro, as cercas são áreas — a Garagem Várzea, o Terminal Joana Bezerra — e dentro delas, regiões. O herói tem 2 áreas e 4 regiões. E o limite do módulo é contado em regiões: o CAN guarda 4, o ECO guarda 2.

**A decisão.** O app conta e mostra **regiões** — é o que o módulo guarda e o que o limite conta. A cadeia diz *"4 regiões"*, a conferência compara regiões, e a trava das cercas diz *"5 regiões, cabem 4"*. As áreas são como o cadastro agrupa as regiões, e não aparecem pro técnico.

**O que foi descartado.** Contar áreas — o número não diria se cabe no módulo · mostrar os dois — o técnico não tem o que fazer com as áreas.

**A consequência.** A T09 inteira, a conferência e o item das cercas no checklist · na T09/06, o OCT-2J85 não tem região nenhuma, e o elo diz *"nenhuma"* · no mock, o `CADEIA.conteudo` e o `contem` de cada pacote contam regiões.
