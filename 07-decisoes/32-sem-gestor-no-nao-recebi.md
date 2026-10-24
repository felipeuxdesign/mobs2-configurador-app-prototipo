# 32 · O não recebi o código não aciona o gestor

**O contexto.** A HU-T01-8 dava três saídas pro *não recebi o código*: conferir e reenviar, trocar de canal e acionar o gestor. A terceira chegou a ser desenhada, com a folha registrando *Gestor avisado* e uma tela de pedido enviado.

**A decisão.** O *acionar gestor* sai dos requisitos. A folha tem duas saídas: *Conferir e reenviar* e *Mandar para o e-mail*.

**O que foi descartado.** O pedido ao gestor, com as duas telas dele — estão na fileira de descarte do canvas.

**A consequência.** Enquanto os 60 s do reenvio correm, as duas saídas ficam em espera, e a folha mostra só a contagem. A HU-T01-8 está marcada com a mudança em `01-produto/historias.md`.

**Revista.** As duas saídas são *Reenviar o código*, pro mesmo dado, e *Usar outro dado*, que volta pra primeira etapa — o outro contato não aparece mais. A espera dos 60 s vale pras duas.
