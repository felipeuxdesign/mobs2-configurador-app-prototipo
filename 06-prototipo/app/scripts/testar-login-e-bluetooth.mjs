// A prova dos toques do mundo real na T01 e na T05 (logica.md · O mundo real).
// O estado aberto pela coluna fica parado e sem toque, e nenhum gatilho do mock
// tira a internet do login nem desliga o Bluetooth no fluxo: o que o botão de
// cada estado faz se prova aqui, no node, nas mesmas funções que a tela usa —
// T01/regras.js (depoisDoEntrar; e o que o Entrar diz
// que falta e o xis do usuário lembrado, 15 e 16) e T05/celular.js.
// Uso: node scripts/testar-login-e-bluetooth.mjs → exit 0 aprovado / 1 reprovado.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
// o texto, como está no textos.md da tela (entre crases, na seção da referência)
const textos = (t) => readFileSync(resolve(raiz, '02-telas', readdirSync(resolve(raiz, '02-telas')).find((d) => d.startsWith(t + '-')), 'textos.md'), 'utf8')
const naSecao = (t, ref, ...lista) => { const md = textos(t); const i = md.indexOf('## `' + ref + '`'); const sec = i < 0 ? '' : md.slice(i, md.indexOf('\n## ', i + 1) < 0 ? undefined : md.indexOf('\n## ', i + 1)); return lista.every((x) => sec.includes('`' + x + '`')) }
globalThis.window = {}   // o mock escreve window.M2CF_MOCKS (a ponte de src/dados/mock.js)
const { M } = await import(resolve(app, 'src/dados/mock.js'))
const T01 = await import(resolve(app, 'src/telas/T01/regras.js'))
const { TX: TX01 } = await import(resolve(app, 'src/telas/T01/textos.js'))
const C = await import(resolve(app, 'src/telas/T05/celular.js'))
const { TX: TX05 } = await import(resolve(app, 'src/telas/T05/textos.js'))

let falhas = 0
const chk = (n, ok, d) => { console.log((ok ? 'OK     ' : 'FALHA  ') + n + (d ? ' — ' + d : '')); if (!ok) falhas++ }

// ── T01 · o login sem conexão (o caso sem-conexao-no-login) ──
// a entrada da 00: o usuário e a senha do mock, sem aviso (o base de Login.jsx · inicial)
const entrada = { usuario: M.credenciais.usuario, senha: M.credenciais.senha, mostrar: false, foco: 'senha', erroEntrada: false, semConexao: false }
chk('T01 · a rede do estado 14 vem do caso: sem conexão', T01.redeDoCaso() === 'sem-conexao', T01.redeDoCaso())
const semRede = T01.depoisDoEntrar(entrada, T01.redeDoCaso())
chk('T01/14 · o Entrar sem internet mostra o aviso SEM CONEXÃO, sem o erro da senha', semRede !== 'T02' && semRede.semConexao && !semRede.erroEntrada)
chk('T01/14 · os campos ficam preenchidos: o usuário e a senha como estavam', semRede.usuario === entrada.usuario && semRede.senha === entrada.senha)
chk('T01/14 · o Entrar fica aceso, dizendo Entrar: o toque tenta de novo', !T01.entrarApagado(semRede))
const deNovo = T01.depoisDoEntrar(semRede, 'sem-conexao')
chk('T01/14 · tentar de novo sem internet: o mesmo aviso, os mesmos campos', deNovo !== 'T02' && deNovo.semConexao && deNovo.senha === entrada.senha && deNovo.usuario === entrada.usuario)
chk('T01/14 · com a conexão de volta, o Entrar entra (T02)', T01.depoisDoEntrar(semRede, 'conectada') === 'T02')
const curta = T01.depoisDoEntrar({ ...semRede, senha: M.credenciais.senha.slice(0, M.credenciais.minimoEntrar - 1) }, 'conectada')
chk('T01 · com a conexão de volta e a senha curta, o erro da 01 no lugar do aviso, a senha apagada', curta !== 'T02' && curta.erroEntrada && !curta.semConexao && curta.senha === '' && curta.usuario === entrada.usuario)
chk('T01 · o fluxo do herói, com rede, entra como antes', T01.depoisDoEntrar(entrada, M.situacao.rede) === 'T02', M.situacao.rede)
chk('T01/14 · os textos do aviso são os do textos.md', naSecao('T01', '14-estado-login-sem-conexao', TX01.semConexao, TX01.semConexaoFrase, TX01.entrar))

// ── T01 · o login de quem abre o app: o Entrar diz o que
// falta, e o usuário lembrado (15 e 16, que abrem pela coluna, parados e sem toque) ──
const falta = (usuario, senha) => T01.oQueFalta({ usuario, senha })
chk('T01 · o Entrar diz o que falta, na ordem da tela: o usuário, depois a senha', falta('', '') === 'usuario' && falta('', 'x') === 'usuario' && falta('r.vieira', '') === 'senha' && falta('r.vieira', 'x') === null)
chk('T01 · só espaço no usuário conta como vazio', falta('  ', 'x') === 'usuario')
chk('T01 · enquanto falta, o Entrar fica apagado; com os dois, aceso', T01.entrarApagado({ usuario: '', senha: 'x' }) && T01.entrarApagado({ usuario: 'r.vieira', senha: '' }) && !T01.entrarApagado({ usuario: 'r.vieira', senha: 'x' }))
const e15 = T01.entradaDoLembrado(entrada, T01.lembradoDoCaso(T01.CASO_PRIMEIRO_ACESSO))
chk('T01/15 · nada lembrado: os dois campos vazios, sem o xis, a caixa desmarcada, o foco no usuário', e15.usuario === '' && e15.senha === '' && !e15.lembrado && !e15.lembrar && e15.foco === 'usuario')
const e16 = T01.entradaDoLembrado(entrada, T01.lembradoDoCaso(T01.CASO_LEMBRADO))
chk('T01/16 · o usuário do caso, com o xis e a caixa marcada; a senha vazia e o foco nela', e16.usuario === M.casos[T01.CASO_LEMBRADO].usuarioLembrado && e16.senha === '' && e16.lembrado && e16.lembrar && e16.foco === 'senha', e16.usuario)
chk('T01/15 e 16 · o que o Entrar diz é a letra do textos.md', naSecao('T01', '15-estado-primeiro-acesso', TX01.digiteUsuario) && naSecao('T01', '16-estado-usuario-lembrado', TX01.digiteSenha) && T01.oQueFalta(e15) === 'usuario' && T01.oQueFalta(e16) === 'senha')
const xis = T01.depoisDoXis(e16)
chk('T01/16 · o xis limpa o campo e esquece o usuário lembrado; o foco vai pro usuário, e o Entrar diz Digite o usuário', xis.usuario === '' && !xis.lembrado && xis.foco === 'usuario' && T01.oQueFalta(xis) === 'usuario')
chk('T01/16 · depois do xis, a caixa fica como o técnico deixou', xis.lembrar === true && T01.depoisDoXis({ ...e16, lembrar: false }).lembrar === false)
chk('T01 · o Entrar que entra guarda só o identificador, com a caixa marcada; sem ela, nada', T01.lembradoDepoisDoEntrar({ usuario: ' r.vieira ', lembrar: true }) === 'r.vieira' && T01.lembradoDepoisDoEntrar({ usuario: 'r.vieira', lembrar: false }) === null)
// a entrada do fluxo (entradaDoFluxo, com a situacao do estado único): o começo do
// palco é a 00; depois do primeiro Entrar, só o que o celular lembra — a 16 ou a 15
const comeco = T01.entradaDoFluxo(entrada, { usuarioLembrado: null, jaEntrou: false })
chk('T01 · o palco começa sem usuário lembrado: a T01/00, com os dois campos preenchidos', comeco === entrada && M.situacao.usuarioLembrado === undefined)
const semLembrar = T01.entradaDoFluxo(entrada, { usuarioLembrado: null, jaEntrou: true })
chk('T01 · saindo da conta sem Lembrar: o quadro da 15, os dois campos vazios — a senha nunca fica', semLembrar.usuario === '' && semLembrar.senha === '' && !semLembrar.lembrado && !semLembrar.lembrar && semLembrar.foco === 'usuario' && T01.oQueFalta(semLembrar) === 'usuario')
const comLembrar = T01.entradaDoFluxo(entrada, { usuarioLembrado: 'r.vieira', jaEntrou: true })
chk('T01 · saindo da conta com Lembrar: o quadro da 16, o usuário com o xis, a senha vazia', comLembrar.usuario === 'r.vieira' && comLembrar.senha === '' && comLembrar.lembrado && comLembrar.lembrar && comLembrar.foco === 'senha')

// ── T05 · o Bluetooth desligado (16) e sem permissão (17) ──
chk('T05 · sem os casos do celular, nenhum quadro do celular', C.quadroDoCelular([]) === null && C.quadroDoCelular(['busca-vazia']) === null)
const bt = C.quadroDoCelular([C.CASO_BT_DESLIGADO])
chk('T05/16 · o caso bluetooth-desligado dá o quadro do Bluetooth', bt?.fase === 'celular' && bt.falta === 'bluetooth')
const t16 = C.textosDoCelular(bt)
chk('T05/16 · o bloco e o primário dizem o que o textos.md diz', naSecao('T05', '16-estado-bluetooth-desligado', t16.unidade, t16.titulo, t16.frase, t16.primario, TX05.voltarAoMenu), t16.primario)
chk('T05/16 · Ligar o Bluetooth: o Android liga, e a busca começa sozinha', C.depoisDoPedido(bt) === 'busca')

const perm = C.quadroDoCelular([C.CASO_BT_SEM_PERMISSAO])
chk('T05/17 · o caso bluetooth-sem-permissao dá o quadro da permissão', perm?.fase === 'celular' && perm.falta === 'permissao' && perm.perguntaDeNovo)
const t17 = C.textosDoCelular(perm)
chk('T05/17 · o bloco e o primário dizem o que o textos.md diz', naSecao('T05', '17-estado-bluetooth-sem-permissao', t17.unidade, t17.titulo, t17.frase, t17.primario, TX05.voltarAoMenu), t17.primario)
const negada = C.depoisDoPedido(perm)
chk(`T05/17 · Permitir pede de novo, e a resposta do caso (${M.casos[C.CASO_BT_SEM_PERMISSAO].resposta}) deixa o Android sem perguntar`, negada !== 'busca' && negada.fase === 'celular' && negada.perguntaDeNovo === false)
const tNegada = C.textosDoCelular(negada)
chk('T05/17 · sem poder perguntar, o primário vira Abrir as configurações, e o bloco fica', tNegada.primario === TX05.abrirConfiguracoes && tNegada.titulo === t17.titulo && tNegada.frase === t17.frase && tNegada.unidade === t17.unidade)
chk('T05/17 · Abrir as configurações: o técnico volta com a permissão, e a busca começa', C.depoisDoPedido(negada) === 'busca')
// nenhuma referência da T05 desenha o botão virado: a regra vem
// da ficha da T05 e da lei de construir (06-prototipo/CLAUDE.md, regra 12)
const fichaT05 = readFileSync(resolve(raiz, '02-telas/T05-conectar-modulo/tela.md'), 'utf8')
const leiDeConstruir = readFileSync(resolve(raiz, '06-prototipo/CLAUDE.md'), 'utf8')
chk('T05 · o Abrir as configurações é a letra da ficha da T05 e da regra 12', [fichaT05, leiDeConstruir].every((md) => md.includes('`' + TX05.abrirConfiguracoes + '`')), TX05.abrirConfiguracoes)

// nunca um botão que não faz nada (a lei de construir, 12): de todo quadro do
// celular, o primário leva à busca ou a um quadro com outro primário
const quadros = [bt, perm, negada]
const parados = quadros.filter((q) => { const d = C.depoisDoPedido(q); return d !== 'busca' && C.textosDoCelular(d).primario === C.textosDoCelular(q).primario })
chk('T05 · nenhum primário do celular fica sem fazer nada', !parados.length)

console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
