// O teste das regras do mundo real (06-prototipo/CLAUDE.md, 10 e 11), no node,
// sem o navegador: a conta do teclado (src/estado/teclado-conta.js) e o retrato
// do palco (src/palco/retrato.js). O roteiro scripts/caminhos/teclado.mjs prova
// os dois caminhos no navegador — o do Chrome do Android, a página que encolhe,
// e o do Safari do iPhone, com um visualViewport de mentira —; aqui ficam as
// contas que nenhum navegador da régua mostra: o zoom de pinça, o celular em
// escala, o arredondamento, o navegador sem visualViewport.
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const { sobraDoTeclado, rolarPraMostrar, abreTeclado } = await import(resolve(app, 'src/estado/teclado-conta.js'))
const { deitado, alturaDoPalco } = await import(resolve(app, 'src/palco/retrato.js'))
let falhas = 0; const chk = (n, ok, d) => { console.log((ok ? 'OK     ' : 'FALHA  ') + n + (d ? ' — ' + d : '')); if (!ok) falhas++ }
const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const vv = (offsetTop, height, scale = 1) => ({ offsetTop, height, scale })
const caixa = (top, height) => ({ top, bottom: top + height, height })

// ── o teclado · o que sobra ──
chk('no computador, a janela que se vê é a página inteira: nada muda', sobraDoTeclado(caixa(0, 800), 800, vv(0, 800)) === null)
chk('o palco largo, com o celular inteiro na janela: nada muda', sobraDoTeclado(caixa(50, 800), 800, vv(0, 900)) === null)
chk('o celular em escala e inteiro na janela: nada muda', sobraDoTeclado(caixa(24, 400), 800, vv(0, 448)) === null)
chk('o teclado de 320 no celular de 800: o app encolhe pra 480', igual(sobraDoTeclado(caixa(0, 800), 800, vv(0, 480)), { topo: 0, altura: 480 }))
chk('o navegador rolou a página 120 pra mostrar o campo: o app desce 120 e encolhe pra 480', igual(sobraDoTeclado(caixa(0, 800), 800, vv(120, 480)), { topo: 120, altura: 480 }))
chk('o celular deitado em escala 0,4: a conta volta pro px do app', igual(sobraDoTeclado(caixa(20, 320), 800, vv(0, 180)), { topo: 0, altura: 400 }))
chk('o zoom de pinça encolhe a janela sem teclado: nada muda', sobraDoTeclado(caixa(0, 800), 800, vv(0, 400, 2)) === null)
chk('meio pixel de arredondamento não é teclado', sobraDoTeclado(caixa(0, 800), 800, vv(0, 799.5)) === null)
chk('sem visualViewport (navegador antigo): nada muda', sobraDoTeclado(caixa(0, 800), 800, null) === null)
chk('o teclado cobrindo o app inteiro: nada a encolher', sobraDoTeclado(caixa(0, 800), 800, vv(800, 300)) === null)

// ── o teclado · rolar o miolo pra mostrar o campo com o rótulo ──
chk('o campo já se vê: o miolo não rola', rolarPraMostrar({ top: 30, bottom: 336 }, { top: 100, bottom: 180 }) === 0)
chk('o campo embaixo do que se vê: o miolo desce até o pé dele', rolarPraMostrar({ top: 30, bottom: 336 }, { top: 369, bottom: 426 }) === 90)
chk('o campo em cima do que se vê: o miolo sobe até o rótulo', rolarPraMostrar({ top: 30, bottom: 336 }, { top: -40, bottom: 20 }) === -70)
chk('o campo maior que o miolo: o topo manda, o rótulo fica à vista', rolarPraMostrar({ top: 30, bottom: 130 }, { top: 200, bottom: 400 }) === 170)
chk('o celular em escala 0,5: a rolagem é em px do app', rolarPraMostrar({ top: 15, bottom: 168 }, { top: 184, bottom: 213 }, 0.5) === 90)

// ── o teclado · o que abre ──
const el = (tagName, extra = {}) => ({ tagName, ...extra })
chk('o campo de texto, a senha, o número e a busca abrem o teclado', ['text', 'password', 'search', 'tel', 'email', undefined].every((type) => abreTeclado(el('INPUT', { type }))))
chk('a justificativa (textarea) abre o teclado', abreTeclado(el('TEXTAREA')))
chk('o marcador, o botão e o campo só de leitura não abrem', !abreTeclado(el('INPUT', { type: 'checkbox' })) && !abreTeclado(el('BUTTON')) && !abreTeclado(el('INPUT', { type: 'text', readOnly: true })) && !abreTeclado(el('INPUT', { disabled: true })) && !abreTeclado(null))

// ── o retrato · o palco deitado ──
chk('de pé: não deita', deitado(null, { w: 360, h: 800 }, false) === false)
chk('mais larga que alta: deita', deitado(null, { w: 800, h: 360 }, false) === true)
chk('o teclado abre num celular baixo, com o campo em foco: não deita', deitado({ w: 360, h: 640, deitado: false }, { w: 360, h: 300 }, true) === false)
chk('o giro com o teclado aberto troca a largura: deita', deitado({ w: 360, h: 300, deitado: false }, { w: 640, h: 200 }, true) === true)
chk('a janela do computador que só encolhe a altura, sem campo em foco: deita', deitado({ w: 700, h: 900, deitado: false }, { w: 700, h: 500 }, false) === true)
chk('deitado, o teclado que abre não põe de pé', deitado({ w: 800, h: 360, deitado: true }, { w: 800, h: 160 }, true) === true)

// ── o celular em escala · o teclado não o encolhe (o palco largo de um tablet, o deitado) ──
chk('sem teclado, a altura é a da janela', alturaDoPalco(null, { w: 1280, h: 800 }, false) === 800)
chk('o teclado abre com o campo em foco: a altura fica a de antes', alturaDoPalco({ w: 1280, h: 800, alto: 800 }, { w: 1280, h: 450 }, true) === 800)
chk('deitado, o teclado abre: a altura fica a de antes', alturaDoPalco({ w: 800, h: 360, alto: 360 }, { w: 800, h: 160 }, true) === 360)
chk('o teclado fecha: a altura volta a ser a da janela', alturaDoPalco({ w: 1280, h: 450, alto: 800 }, { w: 1280, h: 800 }, true) === 800)
chk('o giro troca a largura: a altura é a da janela nova', alturaDoPalco({ w: 1280, h: 450, alto: 800 }, { w: 800, h: 1180 }, true) === 1180)
chk('a janela que encolhe sem campo em foco: a altura é a da janela', alturaDoPalco({ w: 1440, h: 900, alto: 900 }, { w: 1440, h: 600 }, false) === 600)

console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
