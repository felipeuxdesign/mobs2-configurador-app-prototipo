// A prova da T01, nas mesmas funções
// que a tela usa (src/telas/T01/regras.js) e com os textos do textos.md da T01:
// o teto de 3 envios na hora (T01/17, o caso teto-de-envios) e a folha do Não recebi
// no teto (T01/23), o Confirmar que diz
// o que falta com as células vazias (T01/12 e 13), a folha do Não recebi no canal
// e-mail, outro usuário no aparelho (T01/18, o caso outro-usuario) e o que cada tecla
// do teclado do aparelho faz no código (T01/03, decisão 62 — o roteiro teclado.mjs a toca). Os dois
// estados abrem pela coluna, parados e sem toque; no fluxo, o teto se alcança pelo
// reenvio da 12 ou da 13 (o roteiro recuperar.mjs), e outro usuário, saindo da
// conta e entrando com o m.souza (o roteiro outro-usuario.mjs).
// Uso: node scripts/testar-login.mjs → exit 0 aprovado / 1 reprovado.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
const md = readFileSync(resolve(raiz, '02-telas/T01-login/textos.md'), 'utf8')
const secao = (ref) => { const i = md.indexOf('## `' + ref + '`'); if (i < 0) return []; const f = md.indexOf('\n## ', i + 1); return [...md.slice(i, f < 0 ? undefined : f).matchAll(/`([^`]*)`/g)].map((m) => m[1]).slice(1) }
const naSecao = (ref, ...lista) => { const s = secao(ref); return lista.every((x) => s.includes(x)) }
globalThis.window = {}   // o mock escreve window.M2CF_MOCKS (a ponte de src/dados/mock.js)
const { M } = await import(resolve(app, 'src/dados/mock.js'))
const R = await import(resolve(app, 'src/telas/T01/regras.js'))
const { TX } = await import(resolve(app, 'src/telas/T01/textos.js'))
const { TX: TX02 } = await import(resolve(app, 'src/telas/T02/textos.js'))
const { RECEITAS } = await import(resolve(app, 'src/estado/receitas.js'))
const { naoChegouDoAparelho } = await import(resolve(app, 'src/estado/fila.js'))
const login = readFileSync(resolve(app, 'src/telas/T01/Login.jsx'), 'utf8')

let falhas = 0
const chk = (n, ok, d) => { console.log((ok ? 'OK     ' : 'FALHA  ') + n + (d ? ' — ' + d : '')); if (!ok) falhas++ }
const TETO = '17-estado-teto-de-envios'
const OUTRO = '18-estado-outro-usuario-no-aparelho'
const TETO_FOLHA = '23-momento-folha-nao-recebi-no-teto'

// ── o teto de 3 envios na hora (T01/17) ──
chk('17 · a receita é o caso teto-de-envios', RECEITAS[`T01/${TETO}`]?.casos?.includes(R.CASO_TETO))
chk('17 · os envios do caso esgotam o teto da hora (3 de 3)', R.restamEnvios(R.enviosDoTeto()) === 0 && R.enviosDoTeto() === R.LIM.tetoPorHora, `${R.enviosDoTeto()} de ${R.LIM.tetoPorHora}`)
const teto = TX.acabaram(R.LIM.tetoPorHora, R.liberaAs())
chk('17 · a linha do reenvio diz os 3 envios e a hora do caso, como o textos.md', teto === 'Os 3 envios desta hora acabaram · libera às 15:12' && naSecao(TETO, teto), teto)
chk('17 · o resto do quadro é o do 03: a resposta de sempre, o código do mock e o Confirmar',
  naSecao(TETO, TX.respostaEnvio, TX.digite, TX.valePor, TX.naoRecebi, TX.confirmar, TX.voltarLogin, ...R.REC.codigo.split('')))
chk('12 e 13 · depois do último envio da hora, a espera ainda corre: Reenviar em 60 s · este foi o último envio desta hora',
  naSecao('12-momento-codigo-reenviado', TX.reenviarEmUltimo(R.REENVIO_CHEIO)) && naSecao('13-momento-codigo-no-e-mail', TX.reenviarEmUltimo(R.REENVIO_CHEIO)) && R.restamEnvios(R.REC.reenviosNaHora + 1) === 0)
// ── a folha Não recebi o código no teto (T01/23, decisão 64): por que as duas saídas esperam, e a hora em que liberam ──
const naFolha = TX.acabaramNaFolha(R.LIM.tetoPorHora, R.liberaAs())
chk('23 · a frase da folha diz os 3 envios, por que as saídas esperam e a hora do caso, como o textos.md',
  naFolha === 'Os 3 envios desta hora acabaram: as duas saídas liberam às 15:12. O código já enviado segue valendo.' && naSecao(TETO_FOLHA, naFolha), naFolha)
chk('23 · as duas saídas, apagadas, com a hora em que liberam no lugar da contagem, como o textos.md',
  JSON.stringify(secao(TETO_FOLHA)) === JSON.stringify([TX.naoRecebi, naFolha, TX.reenviarCodigo, TX.paraOMesmo, R.liberaAs(), TX.usarOutro, TX.voltaPrimeira, R.liberaAs()]), secao(TETO_FOLHA).join(' · '))
chk('23 · a tela abre a folha no teto pelo momento dela, com a hora no lugar da contagem',
  login.includes("const espera = noTeto ? liberaAs() :") && login.includes('REF.naoRecebiNoTeto'))
chk('a tela escreve o teto quando a espera zera sem envio na hora — também no expirado e nas tentativas esgotadas',
  (login.match(/: teto\b/g) ?? []).length === 3 && login.includes('TX.acabaram(LIM.tetoPorHora, liberaAs())'))

// o Enviar o código do canal: com envio, um código novo; no teto, o que já foi, que segue valendo
const base = { quadro: 'canal', canal: 'telefone', canalDoCodigo: 'telefone', envios: R.REC.reenviosNaHora, digitos: '', erros: 0, erroVisivel: false, prazo: 300, reenvio: 0, folha: false }
const novo = { digitos: R.REC.codigo, erros: 0, erroVisivel: false, prazo: R.PRAZO_CHEIO, reenvio: R.REENVIO_CHEIO, folha: false, canalDoCodigo: 'telefone' }
const comEnvio = R.depoisDoEnviar(base, novo)
chk('Enviar o código com envio na hora: um código novo, o prazo e o reenvio cheios', comEnvio.quadro === 'codigo' && comEnvio.prazo === R.PRAZO_CHEIO && comEnvio.reenvio === R.REENVIO_CHEIO && comEnvio.envios === base.envios)
const noTeto = R.depoisDoEnviar({ ...base, envios: R.enviosDoTeto(), canal: 'email' }, { ...novo, canalDoCodigo: 'email' })
chk('Enviar o código no teto: nenhum envio, o código que já foi segue valendo — o prazo de onde estava e os dígitos do mock (a 17)',
  noTeto.quadro === 'codigo' && noTeto.prazo === base.prazo && noTeto.reenvio === 0 && noTeto.envios === R.enviosDoTeto() && noTeto.digitos === R.REC.codigo)
chk('no teto, o destino é o do código que já foi, e não o cartão tocado agora', noTeto.canal === 'telefone')
const morto = R.depoisDoEnviar({ ...base, envios: R.enviosDoTeto(), prazo: 0, digitos: '' }, novo)
chk('no teto, o código que já morreu volta morto, com o teto na linha', morto.prazo === 0 && morto.digitos === '' && !R.codigoVivo(morto))

// ── o Confirmar apagado com as células vazias (T01/12 e 13) ──
chk('12 e 13 · o primário com as células vazias diz Digite o código, como o textos.md',
  TX.digiteCodigo === 'Digite o código' && ['12-momento-codigo-reenviado', '13-momento-codigo-no-e-mail'].every((r) => secao(r).at(-2) === TX.digiteCodigo))
chk('a tela: incompleto, Digite o código, apagado e desabilitado; os seis dígitos, Confirmar',
  login.includes('primario = incompleto ? TX.digiteCodigo : TX.confirmar') && login.includes('primarioDesabilitado = incompleto'))

// ── nenhum contato em tela, e a primeira etapa com o dado digitado ──
const corpo = md.split('## `').slice(1).join(' ')
chk('nenhum contato mascarado no textos.md nem na tela', !/•/.test(corpo) && !/•|mascarar/.test(login))
chk('a resposta ao envio é sempre a mesma, nas sete telas do código', ['03-momento-recuperar-digitar-codigo', '05-momento-codigo-errado', '06-estado-codigo-expirado', '07-estado-tentativas-esgotadas', '12-momento-codigo-reenviado', '13-momento-codigo-no-e-mail', TETO].every((r) => naSecao(r, TX.respostaEnvio)) && TX.respostaEnvio === M.credenciais.recuperacao.respostaEnvio)
chk('a mesma mensagem pro errado e pro vencido: Código inválido / ou vencido', ['05-momento-codigo-errado', '06-estado-codigo-expirado', '07-estado-tentativas-esgotadas'].every((r) => naSecao(r, TX.invalido.join(' / '))) && TX.invalido.join(' ') === M.credenciais.recuperacao.mensagemCodigo)
const br = R.ddiDo(R.DDI_PADRAO)
chk('02 · o telefone incompleto: (81) 98765-43, Faltam 2 números., o botão desligado', R.formatar(br.mascara, R.DIGITADO.telefoneIncompleto) === '(81) 98765-43' && TX.faltam(R.faltamNumeros(br.mascara, R.DIGITADO.telefoneIncompleto)) === 'Faltam 2 números.' && !R.dadoPronto({ canal: 'telefone', ddi: R.DDI_PADRAO, telefone: R.DIGITADO.telefoneIncompleto }) && naSecao('02-momento-recuperar-escolher-canal', 'Faltam 2 números.', '(81) 98765-43', 'BR', '+55'))
chk('20 · o telefone no formato: (81) 98765-4321, o botão ligado', R.formatar(br.mascara, R.DIGITADO.telefone) === '(81) 98765-4321' && R.dadoPronto({ canal: 'telefone', ddi: R.DDI_PADRAO, telefone: R.DIGITADO.telefone }) && naSecao('20-momento-telefone-no-formato-certo', '(81) 98765-4321'))
chk('21 · o e-mail, sem o seletor', R.dadoPronto({ canal: 'email', email: R.DIGITADO.email }) && naSecao('21-momento-o-e-mail-como-canal', R.DIGITADO.email) && !naSecao('21-momento-o-e-mail-como-canal', '+55'))
const lista = R.paisesDa(R.DDI_PADRAO).map((d) => d.pais)
chk('22 · os seis países, o Brasil primeiro e o resto em ordem de nome, como a 22', lista.join(',') === 'Brasil,Argentina,Chile,Paraguai,Portugal,Uruguai' && naSecao('22-momento-o-seletor-de-pais', TX.pais, TX.buscarPais, ...lista), lista.join(', '))
chk('22 · a busca filtra, e a máscara muda com o país (o número que sobra sai)', R.paisesDa(R.DDI_PADRAO, 'port').map((d) => d.pais).join() === 'Portugal' && R.soDigitos(R.DIGITADO.telefone, R.ddiDo('+351').mascara).length === 9)
chk('04 e 11 · a folha: Reenviar o código, para o mesmo dado · Usar outro dado, volta pra primeira etapa', ['04-momento-nao-recebi-o-codigo', '11-momento-nao-recebi-reenvio-liberado'].every((r) => naSecao(r, TX.reenviarCodigo, TX.paraOMesmo, TX.usarOutro, TX.voltaPrimeira)) && login.includes('aoTocar={usarOutroDado}'))

// ── outro usuário no aparelho (T01/18) ──
const caso = M.casos[R.CASO_OUTRO_USUARIO]
chk('18 · a receita é o caso outro-usuario', RECEITAS[`T01/${OUTRO}`]?.casos?.includes(R.CASO_OUTRO_USUARIO))
const doCaso = R.outraSessaoDoCaso()
chk('18 · o diálogo diz o usuário anterior e a fila dele, do caso, como o textos.md',
  naSecao(OUTRO, TX02.outraSessao, TX02.sessaoEncerrada(doCaso.usuario, doCaso.itensNaFila), TX02.entendi), TX02.sessaoEncerrada(doCaso.usuario, doCaso.itensNaFila))
const md02 = readFileSync(resolve(raiz, '02-telas/T02-selecionar-contexto/textos.md'), 'utf8')
chk('18 · o textos.md lista só o diálogo, o que a régua lê: as empresas da T02 ficam atrás do véu, inertes',
  JSON.stringify(secao(OUTRO)) === JSON.stringify([TX02.outraSessao, TX02.sessaoEncerrada(doCaso.usuario, doCaso.itensNaFila), TX02.entendi]) && md02.includes('## `00-tela`'))
const fila = naoChegouDoAparelho({ fila: [], reenviados: [] }).length
chk('no fluxo, os itens são os da fila do aparelho que ainda não chegaram — o número do cartão do menu e do diálogo de sair (2), o do caso (decisão 64)', fila === caso.anterior.itensNaFila && fila === 2, String(fila))
const primeira = { jaEntrou: false }
const depois = { jaEntrou: true }
chk('o primeiro Entrar do palco nunca abre o diálogo: não há sessão anterior neste aparelho', R.outraSessaoAoEntrar(primeira, 'r.vieira', caso.usuario, fila) === null)
chk('o mesmo usuário de novo: nada', R.outraSessaoAoEntrar(depois, 'r.vieira', ' r.vieira ', fila) === null)
const outra = R.outraSessaoAoEntrar(depois, 'r.vieira', caso.usuario, fila)
chk('outro usuário depois de uma sessão: o diálogo, com o r.vieira e os 2 itens — o que o caso diz', JSON.stringify(outra) === JSON.stringify(caso.anterior), JSON.stringify(outra))
chk('o m.souza entra como Marcos Souza, o nome do caso', JSON.stringify(R.tecnicoDo(caso.usuario)) === JSON.stringify({ nome: caso.nome, usuario: caso.usuario }))
chk('o r.vieira entra como Rafael Vieira, o técnico do mock', JSON.stringify(R.tecnicoDo(M.credenciais.usuario)) === JSON.stringify({ nome: M.tecnico.nome, usuario: M.credenciais.usuario }))
chk('de volta com o r.vieira depois do m.souza: o diálogo diz o m.souza', R.outraSessaoAoEntrar(depois, caso.usuario, M.credenciais.usuario, fila)?.usuario === caso.usuario)
chk('o m.souza entra pela regra do login: qualquer senha com o mínimo do mock (tela.md), sem credencial inventada',
  R.depoisDoEntrar({ usuario: caso.usuario, senha: M.credenciais.senha }, 'conectada') === 'T02' && R.entra(M.credenciais.senha))
chk('no singular, 1 item', TX02.sessaoEncerrada('r.vieira', 1).endsWith('1 item.') && TX02.sessaoEncerrada('r.vieira', 3).endsWith('3 itens.'))

// ── o teclado do aparelho (T01/03, decisão 62): o que cada tecla faz no código ──
const cod = R.REC.codigo
const tecla = (d, t) => JSON.stringify(R.depoisDaTecla(d, t))
chk('um número entra no código', tecla(cod.slice(0, 5), cod[5]) === JSON.stringify({ digitos: cod }), tecla(cod.slice(0, 5), cod[5]))
chk('com os seis, o número não entra', R.depoisDaTecla(cod, '7') === null)
chk('o apagar tira o último dígito', tecla(cod, 'apagar') === JSON.stringify({ digitos: cod.slice(0, -1) }))
chk('o apagar no código vazio não faz nada', R.depoisDaTecla('', 'apagar') === null)
chk('o ✓ com os seis dígitos faz o Confirmar', R.depoisDaTecla(cod, 'concluido') === 'confirmar')
chk('o ✓ com o código incompleto só fecha o teclado', R.depoisDaTecla(cod.slice(0, 5), 'concluido') === 'fechar' && R.depoisDaTecla('', 'concluido') === 'fechar')
chk('o espaço, o menos, a vírgula e o ponto não fazem nada no código', ['espaco', 'menos', 'virgula', 'ponto'].every((t) => R.depoisDaTecla(cod.slice(0, 3), t) === null))
chk('a tela usa a regra: o Login lê depoisDaTecla e desenha o TecladoDoAparelho', /depoisDaTecla\(s\.digitos, t\)/.test(login) && /<TecladoDoAparelho /.test(login))

console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
