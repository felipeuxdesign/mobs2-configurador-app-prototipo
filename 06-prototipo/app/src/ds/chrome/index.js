// A família chrome (folha 2, mais a linha de opção da folha 6): o que emoldura
// toda tela — as barras do sistema (a de cima e a navegação por gestos) e o teclado do aparelho, a faixa de sessão, a tira do menu, o rodapé —
// e o que vem por cima dela — o véu, a folha e o diálogo.
export { BarraDoSistema } from './BarraDoSistema.jsx'
export { NavegacaoPorGestos } from './NavegacaoPorGestos.jsx'
// o teclado do aparelho (decisão 62): cenário do sistema, só na tela do código (T01/03)
export { TecladoDoAparelho, useTelaComOTeclado, usePonteiroFino } from './TecladoDoAparelho.jsx'
export { Faixa } from './Faixa.jsx'
export { TiraDeContexto } from './TiraDeContexto.jsx'
export { TopoDoMenu } from './TopoDoMenu.jsx'
export { Avatar } from './Avatar.jsx'
export { Rodape } from './Rodape.jsx'
export { Veu } from './Veu.jsx'
export { Folha } from './Folha.jsx'
export { Dialogo, Frase, Destaque } from './Dialogo.jsx'
// a presença do que vem por cima: o véu, a folha e o diálogo, numa peça só
export { PorCima, usePorCima, usePresenca } from './PorCima.jsx'
export { LinhaDeOpcao, CartaoDeOpcoes } from './LinhaDeOpcao.jsx'
export { CartaoDaConta } from './CartaoDaConta.jsx'
export { PrazoDaConta } from './PrazoDaConta.jsx'
export { BotaoDaFolha } from './BotaoDaFolha.jsx'
// a troca entre telas e entre quadros inteiros: só o conteúdo esmaece
export { RaizDaTroca, TrocaDeQuadro, useTrocaDeQuadro, useFimDaTroca, esmaecerConteudo, emToque, respostaDoToque, consumirResposta } from './Troca.jsx'
