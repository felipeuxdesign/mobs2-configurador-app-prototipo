// O teste da câmera (src/estado/camera.js): o que o primário e o link da câmera
// fazem — sem a permissão, e com a foto no quadro (decisão 63) —, provado no node — nenhum estado nem o fluxo chegam nela (o
// protótipo não tem o pedido do Android). A T10 não tem câmera (decisão 52), nem
// existe a câmera sem permissão da T10 ou o caso camera-sem-permissao: a câmera do app é
// uma só, a do item manual da T13 (a do item e a do problema, decisão 39).
// Uso: node scripts/testar-camera.mjs → exit 0 aprovado / 1 reprovado.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createRequire } from 'node:module'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..'); const raiz = resolve(app, '../..')
globalThis.window = {}; createRequire(import.meta.url)(resolve(raiz, '04-dados/mocks.js')); const M = window.M2CF_MOCKS
const { RECEITAS } = await import(resolve(app, 'src/estado/receitas.js'))
const { CONCEDIDA, NEGADA, APAGADO, permissaoDoEstado, camera, primarioDaCamera, linkDaCamera, voltaDasConfiguracoes } = await import(resolve(app, 'src/estado/camera.js'))
const { T: T13 } = await import(resolve(app, 'src/telas/T13/textos.js'))
const indice = JSON.parse(readFileSync(resolve(raiz, '02-telas/indice.json'), 'utf8')).itens
// os textos de uma referência no textos.md da tela (o mesmo recorte do scripts/textos.mjs)
function textosDaRef(t, ref) {
  const pasta = readdirSync(resolve(raiz, '02-telas')).find((d) => d.startsWith(t + '-'))
  const md = readFileSync(resolve(raiz, '02-telas', pasta, 'textos.md'), 'utf8')
  const bloco = md.split(/^## /m).find((b) => b.startsWith('`' + ref + '`'))
  return bloco ? [...bloco.split('\n').slice(1).join('\n').matchAll(/`([^`]*)`/g)].map((m) => m[1]) : []
}
let falhas = 0; const chk = (n, ok, d) => { console.log((ok ? 'OK     ' : 'FALHA  ') + n + (d ? ' — ' + d : '')); if (!ok) falhas++ }

// 1 · de onde vem a permissão: do caso que a receita aponta — e nenhum caso do
// mock nega a câmera (decisão 52: sem o camera-sem-permissao)
const negadores = Object.entries(M.casos).filter(([, c]) => c?.permissao === 'camera' && c?.resposta === 'negada').map(([id]) => id)
chk('nenhum caso do mock nega a câmera (sem o camera-sem-permissao)', negadores.length === 0 && !M.casos['camera-sem-permissao'], negadores.join(', '))
// a T10/11 é o nada a calibrar, e não uma câmera
chk('a câmera sem a permissão não está no indice.json (a T10/11 é o nada a calibrar)', !indice.some((r) => r.id === 'T10/11-estado-camera-sem-permissao'))
const negam = indice.filter((r) => r.tipo === 'estado').map((r) => r.id).filter((id) => permissaoDoEstado(RECEITAS[id], M.casos) === NEGADA)
chk('nenhum estado do indice.json abre sem a câmera', negam.length === 0, negam.join(', '))
// a função continua lendo o caso: um caso que negue a câmera, apontado pela receita, a nega
const finge = { 'nega-camera': { permissao: 'camera', resposta: 'negada' } }
chk('um caso que negue a câmera, apontado pela receita, a nega', permissaoDoEstado({ casos: ['nega-camera'] }, finge) === NEGADA && permissaoDoEstado({ casos: [] }, finge) === CONCEDIDA)
chk('no fluxo (sem estado), a câmera abre', permissaoDoEstado(undefined, M.casos) === CONCEDIDA)
const t13 = Object.keys(RECEITAS).filter((id) => id.startsWith('T13/'))
chk('nenhum estado da T13 nega a câmera (nenhuma referência desenha o checklist sem ela)', t13.every((id) => permissaoDoEstado(RECEITAS[id], M.casos) === CONCEDIDA), t13.join(', '))

// 2 · o que a câmera mostra e faz: sem a permissão, o primário tem saída (regra 12)
const sem = camera(NEGADA); const com = camera(CONCEDIDA)
chk('sem a permissão: a câmera riscada no quadro, e o primário abre as configurações', !sem.abre && sem.visor === 'sem-permissao' && sem.primario === 'abrir-configuracoes', JSON.stringify(sem))
chk('com a permissão: o quadro abre (o que enquadrar fica embaixo do título, decisão 60), e o primário tira a foto', com.abre && com.visor === 'enquadre' && com.primario === 'tirar-foto', JSON.stringify(com))
const volta = voltaDasConfiguracoes()
chk('Abrir as configurações → o técnico permite lá e volta → a câmera abre com o Tirar foto', volta === CONCEDIDA && camera(volta).primario === 'tirar-foto')
chk('se ele volta sem permitir, a câmera continua sem ela, e o primário continua com saída', camera(voltaDasConfiguracoes(false)).primario === 'abrir-configuracoes')

// 2b · o primário que as telas tocam (primarioDaCamera): o da câmera, e no item manual, com o Não está
// conforme marcado, o que falta pra ressalva — o não conforme exige a foto do problema (decisão 39)
chk('na câmera, sem o item marcado, o primário é o da permissão: Tirar foto, ou Abrir as configurações', primarioDaCamera(CONCEDIDA) === 'tirar-foto' && primarioDaCamera(NEGADA) === 'abrir-configuracoes')
chk('T13 · desmarcado, o da câmera: Tirar foto, e sem a permissão o Abrir as configurações',
  primarioDaCamera(CONCEDIDA, { naoConforme: false }) === 'tirar-foto' && primarioDaCamera(NEGADA, { naoConforme: false }) === 'abrir-configuracoes')
chk('T13 · marcado, sem a foto do problema: o disparador Fotografar o problema, com ou sem o texto (a ordem é livre)',
  primarioDaCamera(CONCEDIDA, { naoConforme: true, fotografado: false, contou: true }) === 'fotografar-problema'
  && primarioDaCamera(CONCEDIDA, { naoConforme: true, fotografado: false, contou: false }) === 'fotografar-problema')
chk('T13 · marcado, sem a foto e sem a permissão: o Abrir as configurações (a foto do problema precisa da câmera, regra 12)',
  primarioDaCamera(NEGADA, { naoConforme: true, fotografado: false, contou: true }) === 'abrir-configuracoes')
chk('T13 · fotografado, sem o texto: Conte o que aconteceu, o apagado', primarioDaCamera(CONCEDIDA, { naoConforme: true, fotografado: true, contou: false }) === APAGADO)
chk('T13 · fotografado e contado: Salvar com ressalva', primarioDaCamera(CONCEDIDA, { naoConforme: true, fotografado: true, contou: true }) === 'salvar-com-ressalva')
// o Salvar com ressalva só existe com a foto do problema e o texto: nenhuma combinação o dá sem os dois
const combina = [CONCEDIDA, NEGADA].flatMap((p) => [false, true].flatMap((f) => [false, true].map((c) => ({ p, f, c }))))
chk('T13 · nenhum Salvar com ressalva sem a foto do problema e o texto', combina.every(({ p, f, c }) => primarioDaCamera(p, { naoConforme: true, fotografado: f, contou: c }) !== 'salvar-com-ressalva' || (f && c)))
// a tela toca o que a função diz, e não uma decisão dela: senão o teste provaria outra coisa
const fonte = (t) => readFileSync(resolve(app, `src/telas/${t}/index.jsx`), 'utf8')
chk('a T13 tira o primário da câmera de primarioDaCamera', /primarioDaCamera\(/.test(fonte('T13')))
chk('a T10 não tem câmera (decisão 52): não lê src/estado/camera.js', !/estado\/camera/.test(fonte('T10')))

// 3 · os textos: nenhuma referência desenha a câmera sem a permissão; o
// Abrir as configurações é a letra da ficha da T13, do logica.md e da regra 12 (06-prototipo/CLAUDE.md)
const fontesDoAbrir = ['02-telas/T13-checklist/tela.md', '06-prototipo/logica.md', '06-prototipo/CLAUDE.md'].map((f) => readFileSync(resolve(raiz, f), 'utf8'))
chk('T13 · o primário sem a permissão, Abrir as configurações, é a letra da ficha da T13, do logica.md e da regra 12',
  fontesDoAbrir.every((md) => md.includes('`' + T13.abrirConfiguracoes + '`')), T13.abrirConfiguracoes)
const md07 = textosDaRef('T13', '07-momento-responder-item')
const md08 = textosDaRef('T13', '08-momento-nao-conforme-com-justificativa')
const md15 = textosDaRef('T13', '15-momento-problema-fotografado')
chk('T13 · o Tirar foto e a caixa desmarcada estão no textos.md da 07', [T13.tirarFoto, T13.naoConforme, T13.marqueEConte].every((t) => md07.includes(t)))
chk('T13 · o Fotografar o problema, o Enquadre o problema e a caixa marcada estão no textos.md da 08',
  [T13.fotografarProblema, T13.enquadreProblema, T13.naoConforme, T13.conteEmbaixo, T13.oQueAconteceu].every((t) => md08.includes(t)))
chk('T13 · o Salvar com ressalva, o registro do problema e o Enquadre o problema embaixo do título estão no textos.md da 15',
  [T13.enquadreProblema, T13.salvarComRessalva, T13.problemaFotografado('14:30'), T13.vaiComARessalva, T13.oQueAconteceu].every((t) => md15.includes(t)))
// o apagado não tem referência: o texto é o do tela.md da T13 e o do logica.md (decisão 39)
const telaMd = readFileSync(resolve(raiz, '02-telas/T13-checklist/tela.md'), 'utf8'); const logicaMd = readFileSync(resolve(raiz, '06-prototipo/logica.md'), 'utf8')
chk('T13 · o Conte o que aconteceu está no tela.md da T13 e no logica.md', telaMd.includes(T13.conteOQueAconteceu) && logicaMd.includes(T13.conteOQueAconteceu), T13.conteOQueAconteceu)

// 4 · a foto vale no Usar foto (decisão 63, T13/44 a 48 e 15): o Tirar foto só congela a foto no quadro;
// o primário e o link do pé saem das duas funções irmãs, primarioDaCamera e linkDaCamera
chk('T13 · desmarcado e sem a foto: Tirar foto e Voltar ao checklist (07, 17 a 20)',
  primarioDaCamera(CONCEDIDA, { fotoNoQuadro: false }) === 'tirar-foto' && linkDaCamera(CONCEDIDA, { fotoNoQuadro: false }) === 'voltar-checklist')
chk('T13 · desmarcado e com a foto no quadro: Usar foto e Tirar de novo (44 a 48)',
  primarioDaCamera(CONCEDIDA, { fotoNoQuadro: true }) === 'usar-foto' && linkDaCamera(CONCEDIDA, { fotoNoQuadro: true }) === 'tirar-de-novo')
chk('T13 · marcado e sem a foto do problema: Fotografar o problema e Voltar ao checklist (08)',
  primarioDaCamera(CONCEDIDA, { naoConforme: true, fotografado: false }) === 'fotografar-problema' && linkDaCamera(CONCEDIDA, { naoConforme: true, fotografado: false }) === 'voltar-checklist')
chk('T13 · marcado e fotografado: Salvar com ressalva (ou o apagado, sem o texto) e Tirar de novo (15)',
  primarioDaCamera(CONCEDIDA, { naoConforme: true, fotografado: true, contou: true }) === 'salvar-com-ressalva'
  && primarioDaCamera(CONCEDIDA, { naoConforme: true, fotografado: true, contou: false }) === APAGADO
  && linkDaCamera(CONCEDIDA, { naoConforme: true, fotografado: true }) === 'tirar-de-novo')
chk('T13 · marcado, a foto do item no quadro não conta: o não conforme manda (a foto do item foi descartada)',
  primarioDaCamera(CONCEDIDA, { naoConforme: true, fotoNoQuadro: true }) === 'fotografar-problema' && linkDaCamera(CONCEDIDA, { naoConforme: true, fotoNoQuadro: true }) === 'voltar-checklist')
chk('T13 · sem a permissão, nada muda: Abrir as configurações e Voltar ao checklist, sem foto',
  [false, true].every((f) => primarioDaCamera(NEGADA, { fotoNoQuadro: f }) === 'abrir-configuracoes' && linkDaCamera(NEGADA, { fotoNoQuadro: f }) === 'voltar-checklist'))
chk('T13 · nenhum Usar foto sem a foto no quadro, e nenhum com o Não está conforme marcado',
  combina.every(({ p, f, c }) => [false, true].every((n) => primarioDaCamera(p, { naoConforme: n, fotografado: f, contou: c, fotoNoQuadro: false }) !== 'usar-foto'))
  && combina.every(({ p, f, c }) => primarioDaCamera(p, { naoConforme: true, fotografado: f, contou: c, fotoNoQuadro: true }) !== 'usar-foto'))
chk('a T13 tira o link do pé de linkDaCamera', /linkDaCamera\(/.test(fonte('T13')))
const md44 = textosDaRef('T13', '44-momento-foto-do-modulo-tirada')
chk('T13 · o Usar foto, o Tirar de novo e o registro da foto estão no textos.md da 44',
  [T13.usarFoto, T13.tirarDeNovo, T13.fotoTirada('14:30'), T13.confiraNitida].every((t) => md44.includes(t)))
chk('T13 · o Tirar de novo está no textos.md da 15', md15.includes(T13.tirarDeNovo))

console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
