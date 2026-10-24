// O teclado nunca esconde o que importa (06-prototipo/CLAUDE.md, regra 10;
// logica.md, O teclado): em cada campo do app, o foco e o teclado abrindo — a
// janela encolhe de 800 pra 480, como no Chrome do Android com o
// interactive-widget=resizes-content do index.html. O app encolhe junto, o
// miolo traz o campo em foco com o rótulo, e o rodapé sobe: o botão principal
// fica acima do teclado. O teclado fechando, o app volta aos 800. O campo do
// painel da T10 e o código da T01 abrem o teclado numérico. E o teclado aberto
// num celular baixo (a janela mais larga que alta) não deita o app (regra 11).
// No fim, o Safari do iPhone, onde o teclado cobre a página sem encolhê-la: só
// a janela que se vê encolhe (o { sobreposto } da régua), e a peça encolhe o app.
// No computador, a tela do código (T01/03) desenha o teclado do aparelho (decisão 62): ele entra na
// conta — o app encolhe até o que sobra acima dele, e o Voltar ao login sai com ele aberto —, e as
// teclas digitam; no celular de verdade (o { ponteiro: 'grosso' }), não: abre o do aparelho.
const abre = (janela = [360, 480]) => [{ janela }, { app: janela }]
const fecha = [{ janela: [360, 800] }, { app: [360, 800] }]
const CODIGO = '03-momento-recuperar-digitar-codigo'
const TECLADO = 'o teclado numérico do aparelho'
// o teclado no pé, com a altura do desenho (o viewBox, na largura do app), e o rodapé encostado nele,
// com o primário a --rodape-pe-teclado do teclado — na escala do celular no palco
const NO_PE = `const a = P.raiz, t = a.querySelector('.ds-teclado'), r = a.querySelector('.ds-rodape'), b = r && r.querySelector('.ds-primario')
  if (!t || !b) return 'sem o teclado ou sem o primário'
  const k = a.getBoundingClientRect().height / a.offsetHeight, ta = t.getBoundingClientRect(), aa = a.getBoundingClientRect()
  const [, , w, h] = t.querySelector('svg').getAttribute('viewBox').split(/\\s+/).map(Number)
  const pe = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rodape-pe-teclado'))
  if (Math.abs(ta.height / k - a.offsetWidth * h / w) > 0.05) return 'o teclado tem ' + ta.height / k + ' de alto'
  if (Math.abs(aa.bottom - ta.bottom) > 0.05) return 'o teclado não está no pé'
  if (Math.abs(ta.top - r.getBoundingClientRect().bottom) > 0.05) return 'o rodapé não encosta no teclado'
  if (Math.abs((ta.top - b.getBoundingClientRect().bottom) / k - pe) > 0.05) return 'o primário fica a ' + (ta.top - b.getBoundingClientRect().bottom) / k + ' do teclado'
  return true`
const codigoE = (v) => ({ executa: `const i = P.raiz.querySelector('.ds-codigo-entrada'); return i.value === '${v}' || 'o código está em ' + i.value`, rotulo: `o código diz ${v}` })
// o toque no campo do código que já tem o foco (o foca não serve: o foco não muda)
const TOCA_NO_CODIGO = { executa: `P.raiz.querySelector('.ds-codigo-entrada').click(); return true`, rotulo: 'toca no código' }

// a T10 do painel abre o ônibus do herói, que não calibra nada (decisão 52): o campo do painel
// é do caminhão coletor, e o roteiro semeia a sessão dele (o KNB-5H39 com o M2C-0371), como a T06 a gravaria
const SESSAO_DO_CAMINHAO = `
  const el = document.querySelector('.t10'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value
  despachar({ tipo: 'mesclar', parcial: { sessao: { ...estado.sessao, ativoId: 'a-09', moduloSerial: 'M2C-0371' } } })
  return true`
export default [
  // ── T01 · a entrada: o usuário e a senha, com o Entrar e o Esqueci a senha ──
  { abre: '?tela=T01' },
  { app: [360, 800] },
  { foca: 'SENHA', teclado: 'texto' },
  ...abre(),
  { aVista: 'SENHA' },
  { aVista: 'Entrar' },
  { aVista: 'Esqueci a senha' },
  // outro campo, com o teclado aberto
  { foca: 'USUÁRIO', teclado: 'texto' },
  { aVista: 'USUÁRIO' },
  { aVista: 'Entrar' },
  ...fecha,
  // ── o celular baixo: o teclado deixa a janela mais larga que alta, e o app não deita ──
  { foca: 'SENHA' },
  ...abre([360, 300]),
  { aVista: 'SENHA' },
  { aVista: 'Entrar' },
  ...fecha,
  // com o teclado aberto, o Entrar segue: a T02, na mesma janela
  { foca: 'SENHA' },
  ...abre(),
  { toca: 'Entrar' },
  { chega: 'T02' },
  { app: [360, 480] },
  ...fecha,

  // ── T01 · o código, no computador: o teclado do aparelho desenhado (decisão 62), aberto ao chegar na 03.
  //    O app encolhe até o que sobra acima dele: o rodapé fica só com o Confirmar, a 13 do teclado, e o
  //    Voltar ao login sai; o teclado tem a altura do desenho, no pé, e o app segue com os 800 ──
  { abre: `?tela=T01&momento=${CODIGO}` },
  { ouve: TECLADO },
  { app: [360, 800] },
  { executa: NO_PE, rotulo: 'o teclado no pé, na altura do desenho, e o rodapé encostado nele' },
  { aVista: 'Digite o código' },
  { aVista: 'Não recebi o código' },
  { aVista: 'Confirmar' },
  { naoToca: 'Voltar ao login' },
  // as teclas digitam no código: o apagar tira o último dígito; o espaço, o menos, a vírgula e o ponto não fazem nada
  { toca: 'Apagar' },
  codigoE('48291'),
  { desligado: 'Digite o código' },
  { toca: 'Espaço' },
  { toca: 'Menos' },
  { toca: 'Vírgula' },
  { toca: 'Ponto' },
  codigoE('48291'),
  // o ✓ com o código incompleto só fecha o teclado: o app volta aos 800 de tela, e o Voltar ao login volta
  { toca: 'Concluído' },
  { naoOuve: TECLADO },
  { aVista: 'Voltar ao login' },
  { chega: 'T01', momento: CODIGO },
  // tocar de novo no código abre de novo
  TOCA_NO_CODIGO,
  { ouve: TECLADO },
  { naoToca: 'Voltar ao login' },
  // o voltar do sistema (o Esc), com ele aberto, só fecha o teclado
  { tecla: 'Escape' },
  { naoOuve: TECLADO },
  { aVista: 'Voltar ao login' },
  { chega: 'T01', momento: CODIGO },
  TOCA_NO_CODIGO,
  { toca: '3' },
  codigoE('482913'),
  { aVista: 'Confirmar' },
  // o ✓ com os seis dígitos faz o Confirmar: a senha nova, e o teclado desce
  { toca: 'Concluído' },
  { chega: 'T01', momento: '08-momento-recuperar-nova-senha' },
  { naoOuve: TECLADO },
  // ── T01 · o código, no celular de verdade (o ponteiro grosso): o app não desenha teclado — abre o do
  //    aparelho, que encolhe a janela, e o app encolhe junto, com o Confirmar acima dele ──
  { ponteiro: 'grosso' },
  { abre: `?tela=T01&momento=${CODIGO}` },
  { naoOuve: TECLADO },
  { aVista: 'Voltar ao login' },
  { foca: 'Digite o código', teclado: 'numerico' },
  ...abre(),
  { aVista: 'Digite o código' },
  { aVista: 'Confirmar' },
  ...fecha,
  { ponteiro: 'fino' },
  // ── T01 · a senha nova, e o Salvar e entrar ──
  { abre: '?tela=T01&momento=08-momento-recuperar-nova-senha' },
  { foca: 'Crie a nova senha', teclado: 'texto' },
  ...abre(),
  { aVista: 'Crie a nova senha' },
  { aVista: 'Salvar e entrar' },
  ...fecha,

  // ── T06 · a busca do pacote, com o Usar este ativo e o Voltar ao menu ──
  { abre: '?tela=T06' },
  { foca: 'Buscar placa, frota ou módulo', teclado: 'texto' },
  ...abre(),
  { aVista: 'Buscar placa, frota ou módulo' },
  { aVista: 'Usar este ativo' },
  { aVista: 'Voltar ao menu' },
  ...fecha,

  // ── T10 · o campo do painel: o teclado numérico, e o botão que diz o que falta ──
  { abre: '?tela=T10' },
  { executa: SESSAO_DO_CAMINHAO },
  { foca: 'O PAINEL MOSTRA', teclado: 'numerico' },
  ...abre(),
  { aVista: 'O PAINEL MOSTRA' },
  { aVista: 'Digite o que o painel mostra' },
  { digita: '87712', em: 'O PAINEL MOSTRA' },   // calibracao.painel · a-09 · hodômetro
  { aVista: 'O PAINEL MOSTRA' },
  { aVista: 'Semear o hodômetro' },   // era 'Fotografe o painel': com o número, o Semear acende (decisão 52)
  { aVista: 'Voltar ao menu' },
  ...fecha,

  // ── T13 · o que aconteceu no não conforme, e o primário acima do teclado (a decisão 39:
  //    o campo é O QUE ACONTECEU, e na 08 o primário é o Fotografar o problema) ──
  { abre: '?tela=T13&momento=08-momento-nao-conforme-com-justificativa' },
  { foca: 'O QUE ACONTECEU', teclado: 'texto' },
  ...abre(),
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Fotografar o problema' },
  { digita: 'Suporte trincado; fixei com abraçadeira até a troca.', em: 'O QUE ACONTECEU' },   // checklist.exemploJustificativa (AC-12)
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Fotografar o problema' },
  { aVista: 'Voltar ao checklist' },
  ...fecha,

  // ── o Safari do iPhone: o teclado por cima da página, que não encolhe — a peça mede o que sobra ──
  { abre: '?tela=T01' },
  { foca: 'SENHA' },
  { sobreposto: 320 },
  { app: [360, 480] },
  { aVista: 'SENHA' },
  { aVista: 'Entrar' },
  // o navegador rolou a página 120 pra mostrar o campo: o app desce junto, e segue inteiro no que se vê
  { sobreposto: 320, rolou: 120 },
  { app: [360, 480] },
  { aVista: 'SENHA' },
  { aVista: 'Entrar' },
  { sobreposto: 0 },
  { app: [360, 800] },
  { abre: '?tela=T10' },
  { executa: SESSAO_DO_CAMINHAO },
  { foca: 'O PAINEL MOSTRA', teclado: 'numerico' },
  { sobreposto: 320 },
  { app: [360, 480] },
  { aVista: 'O PAINEL MOSTRA' },
  { aVista: 'Digite o que o painel mostra' },
  { sobreposto: 0 },
  { app: [360, 800] },
  // no palco largo (um tablet), o teclado cobre o pé do celular: o app encolhe até o que sobra, dentro da moldura
  { janela: [1440, 900] },
  { abre: '?tela=T13&momento=08-momento-nao-conforme-com-justificativa' },
  { foca: 'O QUE ACONTECEU' },
  { sobreposto: 400 },
  { app: [360, 450] },
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Fotografar o problema' },
  { sobreposto: 0 },
  { app: [360, 800] },
  // o Chrome de um tablet Android: o teclado encolhe a página, e o celular não encolhe junto (retrato.js,
  // alturaDoPalco) — fica do tamanho que tinha, e o app encolhe até o que sobra, como no Safari.
  // Na escala de 1280 × 800 (0,92, a silhueta: 752 / 816), os 450 que sobram são 488 do app
  { janela: [1280, 800] },
  { abre: '?tela=T13&momento=08-momento-nao-conforme-com-justificativa' },
  { foca: 'O QUE ACONTECEU' },
  { janela: [1280, 450] },
  { app: [360, 488] },
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Fotografar o problema' },
  { janela: [1280, 800] },
  { app: [360, 800], centrado: true },
  // o celular deitado, com o teclado: o app segue em pé, na escala de antes (0,38: 312 / 816, a silhueta), e não encolhe pra caber
  // nos 160 que sobram; o app encolhe até eles (418 do app), com o campo e o Entrar à vista
  { janela: [800, 360] },
  { abre: '?tela=T01' },
  { app: [360, 800], centrado: true },
  { foca: 'SENHA' },
  { janela: [800, 160] },
  { app: [360, 418] },
  { aVista: 'SENHA' },
  { aVista: 'Entrar' },
  { janela: [800, 360] },
  { app: [360, 800], centrado: true },
  { janela: [360, 800] },
  { app: [360, 800] },
]
