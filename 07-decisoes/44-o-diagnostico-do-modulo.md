# 44 · O diagnóstico do módulo substitui a pré-checagem e os Dados da CAN

> **Atualizada:** a sessão nasce na conexão, e a faixa desce no diagnóstico quando as sete linhas passam sem trava · sem rede no módulo, o firmware atualiza depois de gravar só a conexão.

**O contexto.** O requisito pede que a conexão só conecte, e que tudo o que o app sabe do módulo apareça numa tela depois dela. A pré-checagem de doze linhas, dentro da conexão, misturava o que trava com o que só informa, e a leitura da CAN vivia em duas telas — os Dados da CAN e o Refazer leitura — sem o ativo que dá sentido a ela.

**A decisão.** Uma tela só, o **Diagnóstico do módulo** (T07): as sete linhas do módulo — serial, firmware, alimentação, GPS, entradas, modem e SIM — e, embaixo, a CAN do modelo do ativo. Três linhas travam: o serial fora do cadastro, o modelo sem suporte e o firmware não homologado, que oferece `Atualizar` quando o módulo tem rede. As outras só informam, com o ícone de informação, e o checklist registra. A CAN espera o bloco do ativo gravado; depois, `Ler de novo` relê tudo.

**O que foi descartado.** A pré-checagem dentro da conexão, que fazia o técnico esperar doze linhas antes de saber se o módulo servia · manter os Dados da CAN como tela própria, que repetia a leitura sem o contexto do módulo · o espaço no módulo e as cercas no diagnóstico — eles dependem do que vai ser gravado, e foram pro envio (decisão 47).

**A consequência.** A T05 perde onze estados, e a T07 nova nasce com onze referências · a T08 some · o menu troca o Dados da CAN pelo Diagnóstico do módulo · a sessão passa a nascer na conexão, e a faixa desce ali · o mock ganha o bloco `diagnostico`, e perde os estados da pré-checagem · a decisão 08 fica superada, e a 07 atualizada.
