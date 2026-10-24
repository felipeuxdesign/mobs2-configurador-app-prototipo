// A câmera do app sem a permissão (06-prototipo/logica.md · O mundo real, e a
// regra 12 da lei de construir: permissão negada tem saída). A câmera do app é
// uma só, a do item manual do checklist, na T13 (a do item e a do problema,
// decisão 39; a calibração não tem câmera, decisão 52). Com a permissão, o quadro
// abre só com o ícone (o que enquadrar fica na frase embaixo do título, decisão 60)
// e o primário é o Tirar foto. Sem ela, a câmera riscada no mesmo quadro, e o
// primário vira Abrir as configurações: o design não desenha o pedir de novo —
// o técnico já negou no pedido do Android, e a saída é a página do app nas
// configurações. Na volta, o app confere a permissão de novo.
// Funções puras e sem o mock (recebem o caso): o teste roda no node,
// scripts/testar-camera.mjs.
export const CONCEDIDA = 'concedida'
export const NEGADA = 'negada'

// A permissão com que a câmera abre: a do caso que a receita do estado da
// coluna aponta, se algum a negar (nenhum caso do mock nega: scripts/testar-camera.mjs).
// No fluxo e nos estados, concedida: o protótipo não tem o pedido do Android — o
// caminho natural até ela não existe.
export function permissaoDoEstado(receita, casos) {
  const nega = (receita?.casos ?? []).some((id) => casos?.[id]?.permissao === 'camera' && casos[id].resposta === 'negada')
  return nega ? NEGADA : CONCEDIDA
}

// O que a câmera mostra e o que o primário dela faz, pela permissão: o quadro aberto
// ('enquadre': a câmera, com o que enquadrar embaixo do título) ou a câmera riscada
// ('sem-permissao'). Nunca um primário sem toque: sem a permissão, ele abre as configurações.
export function camera(permissao) {
  return permissao === NEGADA
    ? { abre: false, visor: 'sem-permissao', primario: 'abrir-configuracoes' }
    : { abre: true, visor: 'enquadre', primario: 'tirar-foto' }
}

// O primário da câmera aberta: o que o rodapé toca. Desmarcado, o da câmera (o
// Tirar foto, ou o Abrir as configurações). No item manual
// do checklist, com o Não conforme marcado, o não conforme exige a foto do
// problema (decisão 39, T13/08 e 15), e o botão diz o que falta: o Fotografar
// o problema — o disparador — até a foto existir; o Conte o que aconteceu,
// apagado, até o texto; e então o Salvar com ressalva. A ordem entre escrever e
// fotografar é livre: sem a foto, o disparador acende com ou sem o texto. Sem
// a permissão, a foto do problema precisa da câmera como a do item, e o
// primário é o Abrir as configurações (regra 12). Desmarcado, volta o da câmera.
// (Antes da decisão 39, a ressalva não precisava da câmera, e o Não conforme
// marcado dava o Salvar com ressalva, com ou sem ela.)
// A foto vale no Usar foto (decisão 63, T13/44 a 48): desmarcado e com a foto do
// item no quadro (`fotoNoQuadro`), o primário é o Usar foto, que conta o item; o
// Tirar foto só congela a foto no quadro. Sem a permissão, não há foto.
export const APAGADO = 'conte-o-que-aconteceu'
export function primarioDaCamera(permissao, { naoConforme = false, fotografado = false, contou = false, fotoNoQuadro = false } = {}) {
  if (!naoConforme) return fotoNoQuadro && camera(permissao).abre ? 'usar-foto' : camera(permissao).primario
  if (!fotografado) return camera(permissao).abre ? 'fotografar-problema' : 'abrir-configuracoes'
  return contou ? 'salvar-com-ressalva' : APAGADO
}

// O link do pé da câmera, irmão do primário (decisão 63): com uma foto no quadro, a do
// item (desmarcado, 44 a 48) ou a do problema (marcado e fotografado, 15), o Tirar de
// novo, que descarta a foto e volta à câmera; sem foto, o Voltar ao checklist.
export function linkDaCamera(permissao, { naoConforme = false, fotografado = false, fotoNoQuadro = false } = {}) {
  if (!camera(permissao).abre) return 'voltar-checklist'
  const comFoto = naoConforme ? fotografado : fotoNoQuadro
  return comFoto ? 'tirar-de-novo' : 'voltar-checklist'
}

// A volta das configurações do Android: o app confere a permissão de novo. O
// técnico foi lá pra permitir a câmera; no protótipo, que não tem o Android
// pra abrir, ele volta com ela permitida, e a câmera abre com o Tirar foto.
export function voltaDasConfiguracoes(permitiu = true) {
  return permitiu ? CONCEDIDA : NEGADA
}
