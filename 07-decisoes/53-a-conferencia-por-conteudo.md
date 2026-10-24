# 53 · A conferência compara conteúdo, e corrige um bloco por vez

**O contexto.** Os requisitos tiram a versão da conferência — o módulo não guarda versão — e pedem pra conferir as cercas, a APN, o Extended ID, os eventos e o leitor. E a manutenção reenvia um bloco por vez; quando um bloco depende de outro, o dependente fica *revisar em seguida*.

**A decisão.** Cinco linhas: **Cercas, APN, Extended ID, Eventos e Leitor**. O Extended ID é **só leitura**, com o ícone de informação, e não entra na contagem. **`Corrigir` reenvia o primeiro bloco que diverge**, na ordem da cadeia. Depois dele, **os que dependem ficam *revisar em seguida*** — pelo arraste do mock: as cercas levam o leitor e os eventos —, com o cabeçalho cinza e `Revisar o leitor`.

**O que foi descartado.** Corrigir todas as divergências de uma vez — contraria a manutenção de um bloco por vez · arrastar os dependentes sozinho — o requisito pede pra marcar, não pra reenviar.

**A consequência.** A T11 perde a versão ilegível e ganha o revisar em seguida · a T11/00 diz `Corrigir as cercas` · **a decisão 40 fica superada** · no mock, o `diff-divergente` com 4 blocos e o Extended ID, e o caso `cercas-reenviadas`.
