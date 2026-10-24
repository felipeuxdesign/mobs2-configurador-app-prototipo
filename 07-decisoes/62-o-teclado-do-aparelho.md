# 62 · O teclado do aparelho aparece na tela do código

**O contexto.** Na recuperação do acesso, o técnico digita o código de seis dígitos, e no celular o teclado numérico ocupa um terço da tela. A referência desenhava a tela sem teclado, com o `Confirmar` e o `Voltar ao login` no pé, e o palco não mostrava o que o técnico vê de verdade: o rodapé subindo e o código acima do teclado.

**A decisão.** **A tela do código (T01/03) é desenhada com o teclado numérico do Android aberto**, o do Material 3: o app encolhe até o que sobra acima dele, e o rodapé fica só com o `Confirmar` · o teclado é cenário do sistema, como a barra de status e a pílula (lei 22): o desenho oficial, em `05-recursos/sistema/`, no escuro e no claro · no protótipo, no computador, ele aparece com o código em foco, as teclas digitam, e o ✓ confirma ou fecha · no celular de verdade, abre o teclado do próprio aparelho · só nessa tela: os outros campos do app não desenham teclado.

**O que foi descartado.** Desenhar o teclado em todo campo do app: as outras telas ficariam com um terço de cenário e a referência deixaria de mostrar o app · um teclado próprio do app: o técnico conhece o do celular dele.

**A consequência.** A referência T01/03 e a amostra do claro dela · os dois SVGs do teclado nos recursos do sistema · a lei 22 ganha o teclado · no protótipo, uma peça de cenário que só aparece com o ponteiro do computador e no print.
