// As regras da T01, todas lidas do mock (M.credenciais): o Entrar, o dado que o
// técnico digita, com a máscara do país, os passos da recuperação e os seis
// requisitos da senha nova. Funções puras: mesma entrada, mesma saída.
import { M } from '../../dados/mock.js'

export const CRED = M.credenciais
export const REC = CRED.recuperacao
export const LIM = REC.limites

// os três passos da recuperação: o contador ('1 de 3') conta daqui
export const PASSOS = ['canal', 'codigo', 'senha']
export const segmentosDo = (passo) => PASSOS.map((p, i) => {
  const k = PASSOS.indexOf(passo)
  return i < k ? 'feito' : i === k ? 'atual' : 'pendente'
})

// Entrar: qualquer senha com o mínimo do mock entra (tela.md, logica.md:20)
export const entra = (senha) => senha.length >= CRED.minimoEntrar

// O login sem conexão (logica.md · O mundo real, o caso sem-conexao-no-login):
// o login precisa de internet. A rede é a do aparelho, a do estado único
// (situacao.rede: 'conectada' ou 'sem-conexao'); o estado 14 a tira do caso.
export const CASO_SEM_CONEXAO = 'sem-conexao-no-login'
export const redeDoCaso = () => (M.casos[CASO_SEM_CONEXAO].rede ? 'conectada' : 'sem-conexao')

// O toque do Entrar, puro: o quadro de depois (os campos, o aviso), ou 'T02'.
// · sem internet, o aviso SEM CONEXÃO, e os campos ficam como estão — a senha
//   não estava errada — e o Entrar segue aceso: tocar de novo tenta de novo
// · com ela, a regra da senha: com o mínimo, entra; com menos, o erro, com a
//   senha apagada e o cursor nela, e o usuário fica
// Testado no node (scripts/testar-login-e-bluetooth.mjs): o estado 14 abre pela
// coluna, parado e sem toque, e nenhum gatilho do mock tira a rede no fluxo.
export function depoisDoEntrar(s, rede) {
  if (rede !== 'conectada') return { ...s, semConexao: true, erroEntrada: false }
  if (entra(s.senha)) return 'T02'
  return { ...s, senha: '', erroEntrada: true, semConexao: false, foco: 'senha', mostrar: false }
}
// O Entrar diz o que falta enquanto o técnico apaga e digita (tela.md):
// Digite o usuário → Digite a senha → Entrar. O que falta é o primeiro
// campo vazio, na ordem da tela; enquanto falta, o Entrar fica apagado e
// desabilitado de verdade (a lei 17, desabilitado é tinta apagada), no erro e fora
// dele. Sem conexão, nunca: os dois estão lá, e o toque tenta de novo (a 14)
export const oQueFalta = (s) => (!s.usuario?.trim() ? 'usuario' : !s.senha ? 'senha' : null)
export const entrarApagado = (s) => oQueFalta(s) !== null

// O usuário lembrado (HU-T01-3, os estados 15 e 16): o celular guarda só o
// identificador, nunca a senha. Os dois estados abrem pela coluna, montados
// pelo caso (usuarioLembrado); no fluxo, o lembrado é o que o Entrar guardou
// (situacao.usuarioLembrado, no estado único) — o palco começa sem nenhum, na
// T01/00, com os dois campos preenchidos pra andar num toque (entradaDoFluxo).
export const CASO_PRIMEIRO_ACESSO = 'primeiro-acesso'
export const CASO_LEMBRADO = 'usuario-lembrado'
export const lembradoDoCaso = (caso) => M.casos[caso].usuarioLembrado ?? null
// a entrada de quem abre o app: nada lembrado, os dois campos vazios (a 15);
// lembrado, o usuário com o xis, a caixa marcada e a senha vazia (a 16). O foco
// fica no primeiro campo vazio
export function entradaDoLembrado(s, lembrado) {
  const e = lembrado
    ? { ...s, usuario: lembrado, senha: '', lembrado: true, lembrar: true }
    : { ...s, usuario: '', senha: '', lembrado: false, lembrar: false }
  return { ...e, foco: oQueFalta(e) ?? 'senha' }
}
// a entrada do fluxo: o palco começa — e cada pulo do palco recomeça — na T01/00,
// com os dois campos preenchidos pra andar num toque. Depois do primeiro Entrar
// que entra (situacao.jaEntrou), o login só traz o que o celular lembra: o usuário
// lembrado, o quadro da 16; ninguém lembrado — o técnico não marcou Lembrar —, o
// da 15, com os dois campos vazios (estados.md). A senha nunca fica (HU-T01-3)
export const entradaDoFluxo = (s, situacao) => (situacao?.jaEntrou ? entradaDoLembrado(s, situacao.usuarioLembrado ?? null) : s)
// o xis limpa o campo e esquece o usuário lembrado; a caixa fica como o técnico
// deixou, e o foco vai pro usuário, que passa a ser o primeiro campo vazio
export const depoisDoXis = (s) => ({ ...s, usuario: '', lembrado: false, foco: 'usuario' })
// o que o Entrar que entra guarda: com a caixa marcada, o identificador; sem ela, nada
export const lembradoDepoisDoEntrar = (s) => (s.lembrar ? s.usuario.trim() : null)

// A primeira etapa: nenhum contato do cadastro aparece,
// nem mascarado — mostrar parte dele antes de qualquer digitação confirma que a conta
// existe. O técnico escolhe Telefone ou E-mail e digita o dado; o servidor confere. O
// que vem digitado ao abrir é o das referências: o telefone incompleto da 02, o
// completo da 20, o e-mail da 21 (recuperacao.digitado)
export const DIGITADO = REC.digitado
// o seletor de país (a 22): os seis do mock, com o Brasil (+55) já escolhido; na lista, o
// escolhido primeiro e o resto em ordem de nome, como a 22 desenha
export const DDI_PADRAO = REC.ddiPadrao
export const ddiDo = (codigo) => M.ddis.find((d) => d.codigo === codigo)
export const paisesDa = (escolhido, busca = '') => {
  const q = busca.trim().toLowerCase()
  const achou = (d) => !q || d.pais.toLowerCase().includes(q) || d.codigo.includes(q) || d.sigla.toLowerCase() === q
  const resto = M.ddis.filter((d) => d.codigo !== escolhido).sort((a, b) => a.pais.localeCompare(b.pais, 'pt'))
  return [ddiDo(escolhido), ...resto].filter(achou)
}
// a máscara do país, que muda com ele: os dígitos entram nos '#', e o que vem depois
// do último dígito digitado não aparece — '(81) 98765-43' com nove dos onze
const casas = (mascara) => [...mascara].filter((c) => c === '#').length
export const soDigitos = (texto, mascara) => texto.replace(/\D/g, '').slice(0, casas(mascara))
export function formatar(mascara, digitos) {
  let n = 0, saida = ''
  for (const c of mascara) {
    if (n >= digitos.length) break
    if (c === '#') { saida += digitos[n]; n += 1 } else saida += c
  }
  return saida
}
// quantos números faltam pro formato do país: o motivo colado no campo, e o botão desligado
export const faltamNumeros = (mascara, digitos) => casas(mascara) - digitos.length
// o e-mail no formato: algo, a arroba, o domínio com ponto
export const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
// o dado da primeira etapa, pronto pra enviar: no telefone, os números todos do país;
// no e-mail, o formato. Fora do formato, o Enviar o código fica desligado
export const dadoPronto = (s) => (s.canal === 'telefone' ? faltamNumeros(ddiDo(s.ddi).mascara, s.telefone) === 0 : emailValido(s.email))
// o momento da primeira etapa: o telefone fora do formato (a 02), no formato (a 20), o e-mail (a 21)
export const momentoDoCanal = (s, REF) => (s.canal === 'email' ? REF.email : dadoPronto(s) ? REF.formatoCerto : REF.canal)

// os limites em segundos (a tela conta a partir daqui, sem relógio: T01·1)
export const PRAZO_CHEIO = LIM.validadeMin * 60
export const REENVIO_CHEIO = LIM.reenvioSeg
// o que resta de envio na hora: só o reenvio conta (T01·2)
export const restamEnvios = (envios) => Math.max(0, LIM.tetoPorHora - envios)

// O teto de envios (HU-T01-7 · T01/17, o caso teto-de-envios):
// depois dos 3 envios da hora, a linha do reenvio diz *Os 3 envios desta hora
// acabaram · libera às 15:12*, e o código já enviado segue valendo. A hora em que
// libera é a do caso — o primeiro envio foi às 14:12, e o relógio do produto é
// 14:30, congelado: o fluxo não tem outra hora de onde ler.
// O estado 17 abre pela coluna com os envios do caso (3), o código do mock
// preenchido e o reenvio já zerado; no fluxo, chega-se ao teto pelo reenvio da 12
// ou da 13 (o terceiro envio da hora), quando os 60 s zeram.
export const CASO_TETO = 'teto-de-envios'
const casoTeto = () => M.casos[CASO_TETO]
export const enviosDoTeto = () => casoTeto().enviosNaHora
export const liberaAs = () => casoTeto().liberaAs
// o código ainda vale: nem morto pelas tentativas, nem expirado
export const codigoVivo = (s) => s.erros < LIM.tentativas && s.prazo > 0
// O teclado do aparelho (T01/03, decisão 62): o que cada tecla faz no código. Os números
// entram até os seis dígitos, o apagar tira o último, e o ✓ ('concluido') faz o Confirmar
// com os seis, ou só fecha o teclado com o código incompleto · o espaço, o menos, a vírgula
// e o ponto não fazem nada. Devolve { digitos } (o código novo), 'confirmar', 'fechar' ou
// null (nada muda)
export function depoisDaTecla(digitos, tecla, celulas = REC.codigo.length) {
  if (/^\d$/.test(tecla)) return digitos.length < celulas ? { digitos: digitos + tecla } : null
  if (tecla === 'apagar') return digitos ? { digitos: digitos.slice(0, -1) } : null
  if (tecla === 'concluido') return digitos.length === celulas ? 'confirmar' : 'fechar'
  return null
}
// o Enviar o código do canal. Com envio na hora, um código novo — o primeiro envio
// não conta no teto (T01·2) — pro canal escolhido; sem envio na hora (o teto, a 17:
// *pedir um código depois dos 3 envios da hora*), nada é enviado: volta o código
// que já foi, que segue valendo, com os dígitos do mock (como a 17 desenha),
// o prazo e o reenvio de onde estavam. O canal fica o que o código já tinha. O código
// que já morreu volta morto, com o teto na linha
export function depoisDoEnviar(s, novo) {
  if (restamEnvios(s.envios) > 0) return { ...s, quadro: 'codigo', ...novo }
  return { ...s, quadro: 'codigo', folha: false, canal: s.canalDoCodigo ?? s.canal, ...(codigoVivo(s) ? { digitos: REC.codigo, erroVisivel: false } : {}) }
}

// Outro usuário no aparelho (HU-T01-4 · T01/18, o caso
// outro-usuario): entrar com um usuário diferente do da sessão anterior encerra a
// sessão dele, e a fila dele continua subindo — a fila é do aparelho (decisão 42).
// O diálogo *Outra sessão neste aparelho* abre sobre a entrada da T02 e diz o
// usuário anterior e os itens da fila. A sessão anterior é a do último Entrar que
// entrou neste aparelho desde o começo do palco (situacao.jaEntrou): o palco começa
// sem nenhuma, e o primeiro Entrar nunca abre o diálogo. Os itens são os que estão
// na fila (na-fila), a mesma conta do diálogo de sair do menu (T04/06: 3).
export const CASO_OUTRO_USUARIO = 'outro-usuario'
const casoOutro = () => M.casos[CASO_OUTRO_USUARIO]
// o que o diálogo diz, no estado 18: o usuário anterior e a fila dele, do caso
export const outraSessaoDoCaso = () => ({ ...casoOutro().anterior })
// o Entrar que entra: com outro usuário depois de uma sessão neste aparelho, o que o
// diálogo diz; com o mesmo, ou no primeiro Entrar, nada (null)
export function outraSessaoAoEntrar(situacao, anterior, usuario, itensNaFila) {
  const u = (usuario ?? '').trim()
  if (!situacao?.jaEntrou || !anterior || u === anterior) return null
  return { usuario: anterior, itensNaFila }
}
// o técnico que entra, pelo identificador: o mock conhece dois — o r.vieira
// (M.tecnico) e o m.souza (o caso outro-usuario, Marcos Souza). Outro identificador
// entra com o nome do herói, como o protótipo sempre fez: o mock não traz outro nome
// (a alternativa é o login recusar o usuário que o mock não
// conhece, com a mesma mensagem da 01, que não distingue usuário de senha, HU-T01-1)
export function tecnicoDo(usuario) {
  const u = (usuario ?? '').trim()
  if (u === casoOutro().usuario) return { nome: casoOutro().nome, usuario: u }
  return { nome: M.tecnico.nome, usuario: u || CRED.usuario }
}
// o quadro em que o reenvio zera (T01/11): os 60 s do reenvio passaram, e o
// prazo andou o mesmo tanto — 10:00 − 60 s = 9:00, atrás do véu
export const PRAZO_NO_REENVIO_LIBERADO = PRAZO_CHEIO - REENVIO_CHEIO

// Os requisitos da senha nova, na ordem do mock. O trecho (mocks.js,
// "sem-usuario-nem-sequencia") é o tamanho que conta como sequência — abc,
// 321, aaa — e como pedaço do usuário. O sexto não se confere no aparelho.
function temSequencia(s, n) {
  const c = [...s.toLowerCase()].map((x) => x.codePointAt(0))
  for (let i = 0; i + n <= c.length; i++) {
    const passo = c[i + 1] - c[i]
    if (Math.abs(passo) > 1) continue
    let seguido = true
    for (let j = i + 1; j < i + n; j++) if (c[j] - c[j - 1] !== passo) { seguido = false; break }
    if (seguido) return true
  }
  return false
}
function temPedacoDoUsuario(s, usuario, n) {
  const a = s.toLowerCase(), u = usuario.toLowerCase()
  for (let i = 0; i + n <= u.length; i++) if (a.includes(u.slice(i, i + n))) return true
  return false
}
const REGRA = {
  tamanho: (s, r) => [...s].length >= r.minimo,
  caixas: (s) => /\p{Ll}/u.test(s) && /\p{Lu}/u.test(s),
  numero: (s) => /\p{Nd}/u.test(s),
  simbolo: (s) => /[^\p{L}\p{N}\s]/u.test(s),
  'sem-usuario-nem-sequencia': (s, r) => !temSequencia(s, r.trecho) && !temPedacoDoUsuario(s, CRED.usuario, r.trecho),
  'diferente-das-ultimas': () => false,
}
export const requisitosDa = (senha) => CRED.requisitosSenha.map((r) => ({
  ...r,
  cumprido: r.verificavelNoAparelho === false ? false : REGRA[r.id](senha, r),
}))
// Salvar e entrar fica habilitado quando os verificáveis passam (T01·6)
export const senhaSalvavel = (lista) => lista.every((r) => r.verificavelNoAparelho === false || r.cumprido)
