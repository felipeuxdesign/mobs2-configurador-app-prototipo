// A T01 · Login (02-telas/T01-login): entrar com usuário e senha, e recuperar
// o acesso em três passos — o canal, o código, a senha nova. Um desenho só,
// quatro quadros (a entrada, o canal, o código, a senha), e por cima a folha
// "Não recebi o código" e o diálogo "Senha alterada". O estado muda o
// conteúdo; os blocos ficam onde estão (Lei 3).
//
// A interação mora aqui (useState), com o valor inicial derivado do momento
// ou do estado da referência. O cronômetro do código anda 1 s por segundo
// fora do print (T01·1); no print e num estado aberto pela coluna, fica parado.
// O prazo e o reenvio descem juntos, e a folha mostra o reenvio como contagem
// no lugar da seta, com as duas saídas desabilitadas até zerar (decisões 31 e
// 32). Nenhum contato do cadastro aparece, nem mascarado: o técnico escolhe o canal e digita o dado, e a resposta ao envio é
// sempre a mesma, exista a conta ou não (regras.js).
//
// A entrada: o Entrar diz o que falta — Digite o
// usuário, Digite a senha, Entrar —, e o usuário lembrado tem o xis dentro do
// campo (a variante `lembrado` do Campo). O palco começa na 00, sem ninguém
// lembrado; o Entrar com a caixa marcada guarda o usuário no estado único, e o
// login seguinte abre como a 16 — sem a caixa, como a 15, com os dois campos
// vazios (regras.js · entradaDoFluxo). A 15 e a 16 abrem pela coluna, pelo caso.
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import { minSeg } from '../../dados/formato.js'
import { naoChegouDoAparelho } from '../../estado/fila.js'
// a conta da fila do diálogo de sair do menu (T04/06), a mesma do diálogo da 18
import {
  BarraDoSistema, Rodape, Veu, Folha, Dialogo, Frase, LinhaDeOpcao, CartaoDeOpcoes,
  Marca, Campo, Codigo, Requisito, Requisitos, LinkConteudo, SoIcone, Checkbox, Segmentado, Aviso, Busca,
  useTrocaDeQuadro, TecladoDoAparelho, useTelaComOTeclado, usePonteiroFino,
} from '../../ds/index.js'
import { TX } from './textos.js'
import {
  REC, LIM, PASSOS, segmentosDo, DIGITADO, DDI_PADRAO, ddiDo, paisesDa, soDigitos, formatar, faltamNumeros, dadoPronto, momentoDoCanal,
  PRAZO_CHEIO, REENVIO_CHEIO, PRAZO_NO_REENVIO_LIBERADO, restamEnvios, requisitosDa, senhaSalvavel,
  enviosDoTeto, liberaAs, depoisDoEnviar, depoisDaTecla, outraSessaoAoEntrar, tecnicoDo,
  redeDoCaso, depoisDoEntrar, oQueFalta, CASO_PRIMEIRO_ACESSO, CASO_LEMBRADO, lembradoDoCaso,
  entradaDoLembrado, entradaDoFluxo, depoisDoXis, lembradoDepoisDoEntrar,
} from './regras.js'
import { AbaDoCanal, SeletorDoPais, CampoDoDado, LinhaPais, CartaoDoCodigo, LinhaConferido, CampoSenhaNova } from './pecas.jsx'
// a presença da folha e do diálogo (entra fechado e abre; sai fechando antes de desmontar) é a do que vem por cima
import { usePresenca } from '../../ds/chrome/PorCima.jsx'
import { respostaDoToque } from '../../ds/chrome/Troca.jsx'
import './t01.css'

// as referências da pasta: o momento aonde se chega tocando, o estado pela coluna
export const REF = {
  senhaVisivel: '10-momento-senha-visivel', // tocar no olho: a senha por extenso e o olho riscado
  entrada: '00-tela',
  incorretos: '01-estado-usuario-ou-senha-incorretos',
  canal: '02-momento-recuperar-escolher-canal',        // a primeira etapa: o telefone fora do formato, o botão desligado
  codigo: '03-momento-recuperar-digitar-codigo',
  naoRecebi: '04-momento-nao-recebi-o-codigo',
  errado: '05-momento-codigo-errado',
  expirado: '06-estado-codigo-expirado',
  esgotado: '07-estado-tentativas-esgotadas',
  senha: '08-momento-recuperar-nova-senha',
  alterada: '09-momento-senha-alterada',
  liberado: '11-momento-nao-recebi-reenvio-liberado', // a folha quando os 60 s do reenvio zeram
  reenviado: '12-momento-codigo-reenviado',           // Reenviar o código: outro código, pro mesmo dado
  noEmail: '13-momento-codigo-no-e-mail',             // o código de novo, pro e-mail (o reenvio, ou o Usar outro dado no e-mail)
  semConexao: '14-estado-login-sem-conexao',           // Entrar sem internet: o aviso, e os campos ficam (o mundo real)
  primeiroAcesso: '15-estado-primeiro-acesso',         // nada lembrado: os dois campos vazios, o foco no usuário
  lembrado: '16-estado-usuario-lembrado',              // o usuário lembrado, com o xis, a caixa marcada e o foco na senha
  teto: '17-estado-teto-de-envios',                    // os 3 envios da hora acabaram: o código enviado segue valendo
  entrando: '19-momento-entrando',                     // a espera do Entrar com internet: o primário desligado diz Entrando…
  outroUsuario: '18-estado-outro-usuario-no-aparelho', // outro usuário entrou: o diálogo sobre as empresas da T02, como a 18 desenha (index.jsx)
  formatoCerto: '20-momento-telefone-no-formato-certo', // o telefone com os números todos do país: o botão liga
  email: '21-momento-o-e-mail-como-canal',             // o e-mail como canal, sem o seletor de país
  seletor: '22-momento-o-seletor-de-pais',             // o seletor de país, com busca, o Brasil já escolhido
  naoRecebiNoTeto: '23-momento-folha-nao-recebi-no-teto', // a folha no teto: por que as saídas esperam, e a hora em que liberam
}

// um código novo, com o prazo e o reenvio cheios. O primeiro envio chega com o
// código do mock preenchido (todo campo nasce com o dado do mock, a 03); o reenvio chega com as células vazias
// e o cursor na primeira (a 12 e a 13)
const codigoNovo = (digitos = REC.codigo) => ({ digitos, erros: 0, erroVisivel: false, prazo: PRAZO_CHEIO, reenvio: REENVIO_CHEIO, folha: false })

// o quadro de cada referência, montado do mock. `situacao` é o que o celular
// sabe, no fluxo (o estado único): no começo do palco, a entrada abre na T01/00,
// com os dois campos preenchidos (o palco anda num toque); depois do primeiro
// Entrar, com o usuário lembrado, como a 16, e sem ele, como a 15 (entradaDoFluxo)
export function inicial(momento, estado, usuario, situacao = null) {
  const base = {
    quadro: 'entrada',
    usuario, senha: M.credenciais.senha, mostrar: false, lembrar: false, lembrado: false, foco: 'senha', erroEntrada: false, semConexao: false,
    // canal: a aba escolhida na primeira etapa; canalDoCodigo: pra onde foi o último código (o teto o mantém)
    canal: 'telefone', canalDoCodigo: 'telefone', envios: REC.reenviosNaHora,
    // o dado digitado: o país, o telefone em dígitos e o e-mail — ao abrir,
    // os das referências; seletor: a folha do país aberta, com a busca;
    // outroDado: o técnico voltou pelo Usar outro dado, e o Enviar o código é um reenvio
    ddi: DDI_PADRAO, telefone: DIGITADO.telefoneIncompleto, email: DIGITADO.email, seletor: false, busca: '', outroDado: false,
    // momentoCodigo: o momento do quadro do código, pra onde a folha volta
    momentoCodigo: REF.codigo,
    ...codigoNovo(),
    novaSenha: REC.novaSenha, dialogo: false,
  }
  switch (estado ?? momento) {
    case REF.incorretos: return { ...base, senha: '', erroEntrada: true }
    // o Entrar sem internet: o aviso, com os campos como estavam, de onde o caso diz (a 14)
    case REF.semConexao: { const d = depoisDoEntrar(base, redeDoCaso()); return d === 'T02' ? base : d }
    case REF.canal: return { ...base, quadro: 'canal' }
    case REF.formatoCerto: return { ...base, quadro: 'canal', telefone: DIGITADO.telefone }
    case REF.email: return { ...base, quadro: 'canal', canal: 'email' }
    case REF.seletor: return { ...base, quadro: 'canal', seletor: true }
    case REF.codigo: return { ...base, quadro: 'codigo' }
    case REF.naoRecebi: return { ...base, quadro: 'codigo', folha: true }
    // os 60 s do reenvio zeraram com a folha aberta: o prazo andou o mesmo tanto (9:00, atrás do véu)
    case REF.liberado: return { ...base, quadro: 'codigo', folha: true, reenvio: 0, prazo: PRAZO_NO_REENVIO_LIBERADO }
    // o reenvio gastou um envio da hora: o prazo e o reenvio cheios, as células vazias
    case REF.reenviado: return { ...base, quadro: 'codigo', ...codigoNovo(''), envios: base.envios + 1, momentoCodigo: REF.reenviado }
    case REF.noEmail: return { ...base, quadro: 'codigo', ...codigoNovo(''), canal: 'email', canalDoCodigo: 'email', envios: base.envios + 1, momentoCodigo: REF.noEmail }
    // os 3 envios da hora acabaram (o caso teto-de-envios): o código do mock enviado,
    // que segue valendo, e o reenvio já zerado — a linha diz até quando (a 17)
    case REF.teto: return { ...base, quadro: 'codigo', envios: enviosDoTeto(), reenvio: 0 }
    // a folha Não recebi o código no teto (a 23): o quadro da 17, com a folha aberta por cima
    case REF.naoRecebiNoTeto: return { ...base, quadro: 'codigo', envios: enviosDoTeto(), reenvio: 0, folha: true }
    // depois de um código errado
    case REF.errado: return { ...base, quadro: 'codigo', digitos: REC.codigoErrado, erros: 1, erroVisivel: true }
    // o prazo passou: as células limpas; o reenvio, livre há muito
    case REF.expirado: return { ...base, quadro: 'codigo', digitos: '', prazo: 0, reenvio: 0 }
    // o terceiro código errado: o código morre e o reenvio fica livre na hora (T01·4)
    case REF.esgotado: return { ...base, quadro: 'codigo', digitos: REC.codigoErrado, erros: LIM.tentativas, erroVisivel: true, reenvio: 0 }
    case REF.senha: return { ...base, quadro: 'senha' }
    case REF.alterada: return { ...base, quadro: 'senha', dialogo: true }
    case REF.senhaVisivel: return { ...base, mostrar: true }
    // quem abre o app: nada lembrado (a 15) ou o usuário lembrado (a 16), do caso
    case REF.primeiroAcesso: return entradaDoLembrado(base, lembradoDoCaso(CASO_PRIMEIRO_ACESSO))
    case REF.lembrado: return entradaDoLembrado(base, lembradoDoCaso(CASO_LEMBRADO))
    default: return !estado && !momento ? entradaDoFluxo(base, situacao) : base
  }
}

export function Login({ momento, estado, irMomento }) {
  const { estado: unico, despachar } = useEstado()
  const [s, setS] = useState(() => inicial(momento, estado, unico.tecnico.usuario, unico.situacao))
  const muda = (parcial) => setS((x) => ({ ...x, ...parcial }))
  const idTitulo = useId()
  // no erro do login, a senha é apagada e o cursor vai pra ela; o usuário fica (tela.md, estados.md).
  // O cursor vai no toque do Entrar, não ao abrir o estado 01 (no print, um cursor piscando mudaria a foto)
  const idSenha = useId()
  const idUsuario = useId()

  // o código: vivo, errado, expirado ou morto pelas tentativas
  const esgotado = s.erros >= LIM.tentativas
  const expirado = !esgotado && s.prazo <= 0
  const errado = !esgotado && !expirado && s.erroVisivel
  const vivo = !esgotado && !expirado
  const restam = restamEnvios(s.envios)

  // o cronômetro: o prazo e o reenvio descem juntos, 1 s por segundo (T01·1)
  const corre = !EM_QUADRO && !estado && s.quadro === 'codigo'
  useEffect(() => {
    if (!corre) return undefined
    const t = setInterval(() => setS((x) => {
      const morto = x.erros >= LIM.tentativas || x.prazo <= 0
      const prazo = morto ? x.prazo : x.prazo - 1
      const reenvio = Math.max(0, x.reenvio - 1)
      return prazo === x.prazo && reenvio === x.reenvio ? x : { ...x, prazo, reenvio }
    }), RITMOS.cronometroCodigoMs)
    return () => clearInterval(t)
  }, [corre])

  // a folha diz o momento dela: esperando o reenvio, a 04; quando ele zera, a 11.
  // Com o teto da hora atingido, as saídas não liberam, e ela diz por quê e até quando (a 23)
  const liberada = s.reenvio <= 0 && restam > 0
  const noTeto = !restam
  const folhaAberta = s.folha && s.quadro === 'codigo'
  useEffect(() => {
    if (estado || !folhaAberta) return
    const m = noTeto ? REF.naoRecebiNoTeto : liberada ? REF.liberado : REF.naoRecebi
    if (momento !== m) irMomento(m)
  }, [estado, folhaAberta, liberada, noTeto, momento, irMomento])

  // o que vem por cima: a folha sobe em 200 e sai em 150; o diálogo, 150 e 150
  const folha = usePresenca(folhaAberta)
  const dialogo = usePresenca(s.dialogo && s.quadro === 'senha')
  // o seletor de país (a 22): a folha sobre a primeira etapa
  const seletorAberto = s.seletor && s.quadro === 'canal'
  const seletor = usePresenca(seletorAberto)
  const veu = folha.visivel || seletor.visivel ? 'folha' : dialogo.visivel ? 'dialogo' : null

  // o teclado do aparelho (decisão 62 · lei 22): na tela do código, a 03, o numérico do Android,
  // desenhado só onde não há teclado de verdade — no computador (o ponteiro fino) e no print. No
  // celular, abre o do próprio aparelho, e estado/teclado.js cuida do encolher. Chegando na 03 (o
  // Enviar o código, o Tentar de novo, a folha que fecha, o endereço), o código ganha o foco e o
  // teclado abre: é o sistema respondendo ao foco, não a tela animando a entrada — pelo endereço e
  // no print, ele nasce aberto, parado, como a referência; chegando por um toque, sobe. Fecha no ✓
  // com o código incompleto e no voltar do sistema; tocar de novo no código abre de novo. Fora da
  // 03 — a folha, o errado, o vencido, a senha nova e o código reenviado (12 e 13) —, fechado, como
  // as referências desenham. Aberto, o app encolhe até o que sobra acima dele: o rodapé sobe junto,
  // só com o Confirmar (o Rodape com o pé do teclado), e o Voltar ao login sai; fechando, volta
  // esmaecendo. O rodapé e os blocos do miolo vão ao lugar novo só por deslocamento (useTelaComOTeclado)
  const fino = usePonteiroFino()
  const [teclado, setTeclado] = useState(momento === REF.codigo)
  const naTelaDoCodigo = s.quadro === 'codigo' && momento === REF.codigo && vivo && !errado && !folhaAberta
  const tecladoAberto = (EM_QUADRO || fino) && teclado && naTelaDoCodigo
  const raizDaTela = useRef(null)
  const momentoAntes = useRef(null)
  useLayoutEffect(() => {
    const antes = momentoAntes.current
    momentoAntes.current = momento
    if (momento !== REF.codigo || antes === REF.codigo || estado) return
    setTeclado(true)
    if (!EM_QUADRO) raizDaTela.current?.querySelector('.ds-codigo-entrada')?.focus({ preventScroll: true })
  }, [momento, estado])
  useTelaComOTeclado(tecladoAberto, raizDaTela)

  // o movimento fino. Os quatro quadros (a entrada, o canal, o código, a senha)
  // são páginas pro técnico: quando o quadro troca depois de a tela abrir, o conteúdo
  // esmaece em 150, como entre telas (src/ds/chrome/Troca.jsx); aberto pelo
  // endereço, pelo palco ou no print, parado. Dentro do quadro, só a peça que muda se
  // move: o aviso que nasce do Entrar (surge), o texto do primário que diz o que
  // falta (trocaTexto) e o Salvar e entrar que acende (acende)
  useTrocaDeQuadro(s.quadro)

  // ── os toques ──
  const aoLogin = () => { muda({ quadro: 'entrada', folha: false, dialogo: false }); irMomento(null) }
  // o que o celular sabe do login, no estado único: o usuário que ele lembra
  // (situacao.usuarioLembrado, HU-T01-3) e se o Entrar já entrou (situacao.jaEntrou)
  const noCelular = (parcial) => despachar({ tipo: 'mesclar', parcial: { situacao: { ...unico.situacao, ...parcial } } })
  // o Entrar (regras.js · depoisDoEntrar): sem internet, o aviso SEM CONEXÃO e os
  // campos ficam, e tocar de novo tenta de novo; com ela, a regra da senha. A rede
  // é a do aparelho, no estado único (logica.md · O mundo real). O Entrar que entra
  // guarda o usuário lembrado: com a caixa marcada, o identificador; sem ela, nada.
  // Dali em diante, o login só traz o que o celular lembra (a 16, ou a 15)
  // Com outro usuário depois de uma sessão neste aparelho (HU-T01-4, a 18), a sessão
  // dele é encerrada e a fila dele continua subindo: o diálogo abre sobre a entrada
  // da T02, que o lê da situação do celular (situacao.outraSessao) e o fecha no Entendi.
  // O técnico passa a ser quem entrou (regras.js · tecnicoDo)
  // A espera do Entrar: com internet, o servidor responde
  // depois de um instante — no protótipo, um tempo fixo (RITMOS.entrarEsperaMs), sem
  // relógio. Enquanto espera, o primário diz Entrando…, desabilitado de verdade e em
  // tinta apagada, como o Gravando no módulo… da T10 (a lei 17), com a URL dizendo a 19.
  // O Esqueci a senha também fica desabilitado e em tinta apagada (a lei 17 ·
  // diferença conhecida da referência: a 19 o desenha aceso); os
  // campos, a caixa e o olho ficam onde estão, sem responder. A senha errada (a 01) chega depois da espera, como no aparelho. Sem
  // internet, o aparelho já sabe: o aviso da 14 vem na hora, sem espera. Aberta pela
  // URL, a 19 fica parada
  const [entrando, setEntrando] = useState(momento === REF.entrando)
  const esperaDoEntrar = useRef(null)
  useEffect(() => () => clearTimeout(esperaDoEntrar.current), [])
  const entrar = () => {
    if (entrando) return
    const depois = depoisDoEntrar(s, unico.situacao.rede)
    if (depois !== 'T02' && depois.semConexao) { responder(depois); return }
    setEntrando(true)
    irMomento(REF.entrando)
    esperaDoEntrar.current = setTimeout(() => {
      // a T02 chega com a troca entre telas: é a resposta do toque no Entrar, depois da espera
      if (depois === 'T02') respostaDoToque()
      // a senha errada: a URL deixa a 19 e volta à entrada, como antes da espera
      if (depois !== 'T02') irMomento(null)
      setEntrando(false); responder(depois)
    }, RITMOS.entrarEsperaMs)
  }
  const responder = (depois) => {
    if (depois === 'T02') {
      const outra = outraSessaoAoEntrar(unico.situacao, unico.tecnico.usuario, s.usuario, naoChegouDoAparelho(unico).length)
      despachar({ tipo: 'mesclar', parcial: { tecnico: tecnicoDo(s.usuario) } })
      noCelular({ usuarioLembrado: lembradoDepoisDoEntrar(s), jaEntrou: true, outraSessao: outra })
      despachar({ tipo: 'ir', tela: 'T02' }); return
    }
    // o aviso que o Entrar faz nascer esmaece no lugar (surge); aberto no estado, parado.
    setS({ ...depois, avisoSurge: true })
    if (depois.erroEntrada) setTimeout(() => document.getElementById(idSenha)?.focus(), 0)
  }
  // o xis do usuário lembrado: limpa o campo e esquece o usuário; a caixa fica
  // como o técnico deixou, e o cursor vai pro usuário, o primeiro campo vazio
  const limpar = () => {
    setS((x) => depoisDoXis(x)); noCelular({ usuarioLembrado: null })
    setTimeout(() => document.getElementById(idUsuario)?.focus(), 0)
  }
  // saindo da entrada, o aviso que ficou volta com ela, na troca de quadro, e não esmaece de novo
  const esqueci = () => { const x = { ...s, quadro: 'canal', canal: 'telefone', avisoSurge: false }; setS(x); irMomento(momentoDoCanal(x, REF)) }
  // a primeira etapa: o canal e o dado mudam o momento — o telefone fora do
  // formato (a 02), no formato (a 20), o e-mail (a 21). O país troca a máscara, e o
  // número que não cabe no país novo perde o que sobra
  const naEtapa = (parcial) => { const x = { ...s, ...parcial }; setS(x); irMomento(momentoDoCanal(x, REF)) }
  const abrirSeletor = () => { muda({ seletor: true, busca: '' }); irMomento(REF.seletor) }
  const fecharSeletor = () => naEtapa({ seletor: false, busca: '' })
  const escolherPais = (codigo) => naEtapa({ ddi: codigo, telefone: soDigitos(s.telefone, ddiDo(codigo).mascara), seletor: false, busca: '' })
  // o primeiro envio não conta no teto; só o reenvio conta (T01·2). Sem envio na
  // hora, nada vai: volta o código que já foi, com o teto na linha (regras.js · depoisDoEnviar, a 17).
  // Depois do Usar outro dado, o envio é um reenvio: gasta um envio da hora, como a 13 desenha
  const enviarCodigo = () => {
    if (s.outroDado) { reenviar(s.canal); return }
    setS((x) => ({ ...depoisDoEnviar(x, { ...codigoNovo(), canalDoCodigo: x.canal }), momentoCodigo: REF.codigo })); irMomento(REF.codigo)
  }
  // o reenvio fecha a folha e volta pro código: o prazo em 10:00, as células vazias
  // e o cursor na primeira (a 12; no e-mail, a 13). "Enviar outro código" (06, 07) é o
  // mesmo reenvio, pro mesmo dado. A resposta é sempre a mesma: nenhum contato aparece
  const reenviar = (canal = s.canal) => {
    const m = canal === 'email' ? REF.noEmail : REF.reenviado
    setS((x) => ({ ...x, quadro: 'codigo', ...codigoNovo(''), canal, canalDoCodigo: canal, envios: x.envios + 1, outroDado: false, momentoCodigo: m }))
    irMomento(m)
  }
  // o Usar outro dado (a 04, a 11): fecha a folha e volta pra primeira etapa, com o
  // dado como o técnico deixou; o envio dali espera o mesmo reenvio, e é um reenvio
  const usarOutroDado = () => naEtapa({ quadro: 'canal', folha: false, outroDado: true })
  const digitar = (digitos) => { muda({ digitos, erroVisivel: false }); if (s.erroVisivel) irMomento(s.momentoCodigo) }
  const confirmar = () => {
    if (s.digitos === REC.codigo) { muda({ quadro: 'senha', novaSenha: REC.novaSenha, folha: false }); irMomento(REF.senha); return }
    const erros = s.erros + 1
    muda({ erros, erroVisivel: true, ...(erros >= LIM.tentativas ? { reenvio: 0 } : {}) })
    irMomento(REF.errado)
  }
  const tentarDeNovo = () => { muda({ digitos: '', erroVisivel: false }); irMomento(s.momentoCodigo) }
  // as teclas do teclado do aparelho (regras.js · depoisDaTecla): os números digitam no código, o
  // apagar tira o último dígito, e o ✓ faz o Confirmar com os seis dígitos, ou só fecha o teclado
  // com o código incompleto · o espaço, o menos, a vírgula e o ponto não fazem nada no código
  const naTecla = (t) => {
    const d = depoisDaTecla(s.digitos, t)
    if (d === 'confirmar') confirmar()
    else if (d === 'fechar') setTeclado(false)
    else if (d) digitar(d.digitos)
  }
  // abrir a folha: o momento dela (04 ou 11) vem do reenvio, no efeito acima
  const abrirFolha = () => muda({ folha: true })
  const fecharFolha = () => { muda({ folha: false }); irMomento(errado || esgotado ? REF.errado : s.momentoCodigo) }
  const salvar = () => { muda({ dialogo: true }); irMomento(REF.alterada) }
  // de volta à entrada com a senha do mock, para continuar a demonstração.
  const entrarComNova = () => { muda({ quadro: 'entrada', dialogo: false, senha: M.credenciais.senha, erroEntrada: false, semConexao: false, foco: 'senha', mostrar: false }); irMomento(null) }

  // ── os quadros ──
  const cabecaDoPasso = (passo, legenda) => (
    <Segmentado folga={8} rotulo={TX.recuperar} contagem={PASSOS.indexOf(passo) + 1} total={TX.de(PASSOS.length)}
      segmentos={segmentosDo(passo)} legenda={legenda} />
  )

  function Entrada() {
    // o Entrar diz o que falta enquanto o técnico apaga e digita: Digite o
    // usuário (a 15) → Digite a senha (a 01 e a 16) → Entrar, apagado e
    // desabilitado de verdade enquanto falta (a lei 17). Sem conexão, aceso: os
    // dois estão lá, e o toque tenta de novo (a 14)
    const falta = oQueFalta(s)
    const primario = entrando ? TX.entrando : falta === 'usuario' ? TX.digiteUsuario : falta === 'senha' ? TX.digiteSenha : TX.entrar
    // na espera, os campos, a caixa e o olho não respondem, e não mudam de desenho
    const vivo = (f) => (entrando ? () => {} : f)
    return (
      <>
        <h1 className="t01-titulo-oculto">{TX.entrar}</h1>
        <div className="tela-miolo t01-miolo t01-miolo-entrada">
          <div className="t01-marca"><Marca nome={TX.configurador} rotuloLogo={TX.logo} /></div>
          <div className="t01-campos">
            {/* o aviso mora no mesmo lugar: o erro da senha (01) ou a falta de internet (14) */}
            {s.erroEntrada && (
              <div className="t01-aviso"><Aviso tom="falha" glifo="xis" poco={26} titulo={TX.erroTitulo} frase={TX.erroFrase} surge={s.avisoSurge} /></div>
            )}
            {!s.erroEntrada && s.semConexao && (
              <div className="t01-aviso"><Aviso tom="neutro" traco glifo="sem-conexao" poco={26} titulo={TX.semConexao} frase={TX.semConexaoFrase} surge={s.avisoSurge} /></div>
            )}
            {/* o usuário lembrado tem o xis dentro do campo (a 16): a variante do campo */}
            <Campo rotulo={TX.usuario} valor={s.usuario} aoMudar={vivo((v) => muda({ usuario: v }))} readOnly={entrando} focado={s.foco === 'usuario'}
              onFocus={() => muda({ foco: 'usuario' })} autoComplete="username" autoCapitalize="none" spellCheck={false}
              id={idUsuario} lembrado={s.lembrado} rotuloLimpar={TX.limparUsuario} aoLimpar={vivo(limpar)} />
            <Campo rotulo={TX.senha} valor={s.senha} aoMudar={vivo((v) => muda({ senha: v }))} readOnly={entrando} oculto={!s.mostrar} focado={s.foco === 'senha'}
              onFocus={() => muda({ foco: 'senha' })} autoComplete="current-password" autoCapitalize="none" spellCheck={false}
              id={idSenha}
              acao={<SoIcone icone={s.mostrar ? 'olho-riscado' : 'olho'} rotulo={s.mostrar ? TX.ocultarSenha : TX.mostrarSenha} cor="marca-limite" aoTocar={vivo(() => { muda({ mostrar: !s.mostrar }); irMomento(s.mostrar ? null : REF.senhaVisivel) })} />} />
          </div>
          <div className="t01-lembrar">
            <Checkbox marcado={s.lembrar} aoMudar={vivo((v) => muda({ lembrar: v }))}>{TX.lembrar}</Checkbox>
          </div>
        </div>
        <Rodape lugar="login" primario={primario} primarioDesabilitado={entrando || falta !== null} primarioTrocaTexto
          aoPrimario={entrar} link={TX.esqueci} aoLink={esqueci} linkDesabilitado={entrando} />
      </>
    )
  }

  function Canal() {
    // a primeira etapa: as duas abas, o dado e o texto
    // fixo. O telefone tem o seletor de país, com o Brasil já escolhido, e a máscara
    // do país; enquanto o formato estiver errado, o motivo colado no campo, em
    // vermelho, e o Enviar o código desligado (a lei 17). O e-mail, sem o seletor
    const ddi = ddiDo(s.ddi)
    const falta = s.canal === 'telefone' ? faltamNumeros(ddi.mascara, s.telefone) : 0
    const pronto = dadoPronto(s)
    return (
      <>
        <div className="tela-miolo t01-miolo t01-miolo-passo">
          {cabecaDoPasso('canal', TX.depois)}
          <h1 id={idTitulo} className="t01-titulo">{TX.tituloCanal[0]}<br />{TX.tituloCanal[1]}</h1>
          <div className="t01-etapa">
            <div className="t01-abas" role="radiogroup" aria-labelledby={idTitulo}>
              <AbaDoCanal rotulo={TX.telefone} escolhido={s.canal === 'telefone'} aoTocar={() => naEtapa({ canal: 'telefone' })} />
              <AbaDoCanal rotulo={TX.email} escolhido={s.canal === 'email'} aoTocar={() => naEtapa({ canal: 'email' })} />
            </div>
            <div className="t01-dado-grupo">
              {s.canal === 'telefone' ? (
                <div className="t01-dado-com-motivo">
                  <div className="t01-dado-linha">
                    <SeletorDoPais sigla={ddi.sigla} codigo={ddi.codigo} rotulo={TX.paisRotulo(ddi.pais, ddi.codigo)} aoTocar={abrirSeletor} />
                    <CampoDoDado tipo="telefone" rotulo={TX.campoTelefone} valor={formatar(ddi.mascara, s.telefone)} falha={falta > 0}
                      aoMudar={(v) => naEtapa({ telefone: soDigitos(v, ddi.mascara) })} />
                  </div>
                  {falta > 0 && <span className="t01-motivo" role="status">{TX.faltam(falta)}</span>}
                </div>
              ) : (
                <div className="t01-dado-linha">
                  <CampoDoDado tipo="email" rotulo={TX.campoEmail} valor={s.email} aoMudar={(v) => naEtapa({ email: v })} />
                </div>
              )}
              <span className="t01-texto-fixo">{REC.textoFixo}</span>
            </div>
          </div>
          <div className="t01-legenda-dupla">
            <span className="t01-legenda-dupla-fato">{TX.valePorMinutos(LIM.validadeMin)}</span>
            {/* sem envio na hora não há texto aprovado: o lado fica vazio */}
            <span className="t01-legenda-dupla-resta">{restam ? TX.restaEnvio(restam) : ''}</span>
          </div>
        </div>
        <Rodape lugar="login" primario={TX.enviarCodigo} aoPrimario={enviarCodigo} primarioDesabilitado={!pronto} link={TX.voltarLogin} aoLink={aoLogin} />
      </>
    )
  }

  function SeletorDePais() {
    // a folha do país (a 22): a busca e os seis do mock, o escolhido primeiro, com o check
    const lista = paisesDa(s.ddi, s.busca)
    return (
      <div className="t01-sobre">
        <Veu de="folha" visivel={seletor.visivel}>
          <Folha titulo={TX.pais} rotuloFechar={TX.fechar} aoFechar={fecharSeletor} aberta={seletor.visivel}>
            <div className="t01-seletor">
              <Busca dica={TX.buscarPais} valor={s.busca} aoMudar={(v) => muda({ busca: v })} icone="busca-de-pais" tamIcone={16} />
              {lista.length > 0 && (
                <CartaoDeOpcoes>
                  {lista.map((d) => (
                    <LinhaPais key={d.codigo} pais={d.pais} codigo={d.codigo} escolhido={d.codigo === s.ddi} aoTocar={() => escolherPais(d.codigo)} />
                  ))}
                </CartaoDeOpcoes>
              )}
            </div>
          </Folha>
        </Veu>
      </div>
    )
  }

  function PassoCodigo() {
    // o título diz a falha do código (R-03, a exceção declarada da T01): a mesma mensagem
    // pro errado e pro vencido, em duas linhas, como a 05, a 06 e a 07
    const invalido = errado || esgotado || expirado
    const titulo = invalido ? <>{TX.invalido[0]}<br />{TX.invalido[1]}</> : TX.digite
    const rotuloCelulas = invalido ? TX.invalido.join(' ') : TX.digite
    let cartao, legenda, primario, aoPrimario, primarioDesabilitado = false
    // sem envio na hora, a linha do reenvio diz que os envios acabaram e até
    // quando (a 17); o código enviado segue valendo
    const teto = TX.acabaram(LIM.tetoPorHora, liberaAs())
    if (esgotado) {
      cartao = <CartaoDoCodigo falha rotulo={TX.tentativasRestantes} numero={LIM.tentativas - s.erros} frase={TX.pecaNovoFrase} />
      legenda = restam ? TX.reenvioLiberado(restam) : teto
      primario = TX.enviarOutro; aoPrimario = () => reenviar(); primarioDesabilitado = !restam
    } else if (expirado) {
      cartao = <CartaoDoCodigo numeroFalha rotulo={TX.valePor} numero={minSeg(s.prazo)} />
      legenda = restam ? TX.pecaNovo(restam) : teto
      primario = TX.enviarOutro; aoPrimario = () => reenviar(); primarioDesabilitado = !restam
    } else if (errado) {
      cartao = <CartaoDoCodigo falha rotulo={TX.tentativasRestantes} numero={LIM.tentativas - s.erros} frase={TX.naTerceira} />
      legenda = s.reenvio && restam ? TX.aindaValeEReenvio(minSeg(s.prazo), s.reenvio) : TX.aindaVale(minSeg(s.prazo))
      primario = TX.tentarDeNovo; aoPrimario = tentarDeNovo
    } else {
      cartao = <CartaoDoCodigo rotulo={TX.valePor} numero={minSeg(s.prazo)} />
      // depois do último envio da hora, a espera ainda corre (a 12 e a 13); zerada, o teto (a 17)
      legenda = s.reenvio ? (restam ? TX.reenviarEm(s.reenvio, restam) : TX.reenviarEmUltimo(s.reenvio)) : restam ? TX.reenvioLiberado(restam) : teto
      // o Confirmar diz o que falta enquanto o código não tem os seis dígitos, apagado e
      // desabilitado de verdade (a lei 17): Digite o código, como a 12 e a 13 desenham
      const incompleto = s.digitos.length < REC.codigo.length
      primario = incompleto ? TX.digiteCodigo : TX.confirmar; aoPrimario = confirmar; primarioDesabilitado = incompleto
    }
    return (
      <>
        <div className="tela-miolo t01-miolo t01-miolo-passo">
          {cabecaDoPasso('codigo', <span className="t01-destino">{TX.respostaEnvio}</span>)}
          <h1 className="t01-titulo">{titulo}</h1>
          <div className="t01-codigo-grupo">
            <Codigo celulas={REC.codigo.length} digitos={expirado ? '' : s.digitos} focado={vivo && !errado} errado={!vivo ? esgotado : errado}
              focoEm={expirado ? REC.codigo.length - 1 : undefined} rotulo={rotuloCelulas} aoDigitar={vivo ? digitar : undefined}
              aoFocar={() => setTeclado(true)} />
            {cartao}
          </div>
          <span className="t01-legenda">{legenda}</span>
          <LinkConteudo aoTocar={abrirFolha}>{TX.naoRecebi}</LinkConteudo>
        </div>
        {/* com o teclado do aparelho aberto, só o Confirmar, a 13 do teclado: o Voltar ao login sai */}
        <Rodape lugar="login" primario={primario} aoPrimario={aoPrimario} primarioDesabilitado={primarioDesabilitado} primarioTrocaTexto
          link={tecladoAberto ? undefined : TX.voltarLogin} aoLink={aoLogin} pe={tecladoAberto ? 'teclado' : undefined} />
      </>
    )
  }

  function NaoRecebi() {
    // as duas saídas (decisão 32) esperam o mesmo reenvio: qualquer envio novo
    // espera os 60 s (pendencias.md). Até zerar, a contagem no lugar da seta e a
    // linha desabilitada de verdade (a 04); zerou, a seta e a linha acesa (a 11).
    // Com o teto da hora atingido (a 23), as duas esperam a hora: a frase embaixo do
    // título diz por quê e até quando, e a hora em que liberam fica no lugar da contagem
    const espera = noTeto ? liberaAs() : liberada ? null : minSeg(s.reenvio)
    // reenviar pro mesmo dado, ou voltar pra primeira etapa — nenhum contato na folha
    return (
      <div className="t01-sobre">
        <Veu de="folha" visivel={folha.visivel}>
          <Folha titulo={TX.naoRecebi} subtitulo={noTeto ? TX.acabaramNaFolha(LIM.tetoPorHora, liberaAs()) : undefined} rotuloFechar={TX.fechar} aoFechar={fecharFolha} aberta={folha.visivel}>
            <CartaoDeOpcoes>
              <LinhaDeOpcao icone="reenviar" seta="seguir" titulo={TX.reenviarCodigo} detalhe={TX.paraOMesmo} espera={espera} aoTocar={() => reenviar()} />
              <LinhaDeOpcao icone="voltar-etapa" seta="seguir" titulo={TX.usarOutro} detalhe={TX.voltaPrimeira} espera={espera} aoTocar={usarOutroDado} />
            </CartaoDeOpcoes>
          </Folha>
        </Veu>
      </div>
    )
  }

  function PassoSenha() {
    const lista = requisitosDa(s.novaSenha)
    return (
      <>
        <div className="tela-miolo t01-miolo t01-miolo-passo">
          {cabecaDoPasso('senha', TX.seisItens)}
          <h1 id={idTitulo} className="t01-titulo">{TX.crieSenha}</h1>
          <LinhaConferido texto={TX.codigoConferido} valor={REC.codigo} />
          <CampoSenhaNova valor={s.novaSenha} aoMudar={(v) => muda({ novaSenha: v })} rotuladoPor={idTitulo} />
          <div className="t01-requisitos">
            <Requisitos>
              {lista.map((r) => (
                <Requisito key={r.id} texto={TX.requisitos[r.id](r)} cumprido={r.cumprido}
                  nota={r.verificavelNoAparelho === false ? TX.confereAoSalvar : undefined} />
              ))}
            </Requisitos>
          </div>
        </div>
        <Rodape lugar="login" primario={TX.salvarEntrar} aoPrimario={salvar} primarioDesabilitado={!senhaSalvavel(lista)} primarioAcende
          link={TX.voltarLogin} aoLink={aoLogin} />
      </>
    )
  }

  function SenhaAlterada() {
    return (
      <div className="t01-sobre">
        <Veu de="dialogo" visivel={dialogo.visivel}>
          <Dialogo titulo={TX.senhaAlterada} primario={TX.entrarComNova} aoPrimario={entrarComNova} margem={16} aberto={dialogo.visivel}>
            <Frase>{TX.senhaAlteradaFrase}</Frase>
          </Dialogo>
        </Veu>
      </div>
    )
  }

  // a tela de onde a folha ou o diálogo nasceu fica atrás do véu e, como
  // eles são modais (aria-modal), inerte: nem o toque nem o leitor chegam nela
  const porCima = folha.montado || dialogo.montado || seletor.montado

  // O voltar do Android (logica.md): o link de saída de cada passo do recuperar,
  // o Voltar ao login; na folha Não recebi o código, o X. Na entrada, que não tem
  // saída desenhada (pendencias.md), e no diálogo Senha alterada, que não tem X
  // nem Cancelar (HU-T01-10), não faz nada; nem com a folha descendo. Com o teclado
  // do aparelho aberto (a 03), o voltar só fecha o teclado, como no Android
  useVoltar(folhaAberta ? fecharFolha : seletorAberto ? fecharSeletor : porCima || s.quadro === 'entrada' ? null
    : tecladoAberto ? () => setTeclado(false) : aoLogin)
  return (
    <div className="t01" ref={raizDaTela}>
      <BarraDoSistema fundo="pagina" veu={veu} />
      <div className="t01-fundo" inert={porCima ? '' : undefined}>
        {s.quadro === 'entrada' && Entrada()}
        {s.quadro === 'canal' && Canal()}
        {s.quadro === 'codigo' && PassoCodigo()}
        {s.quadro === 'senha' && PassoSenha()}
      </div>
      {/* o teclado do aparelho, no pé, por baixo da pílula: cenário do sistema (decisão 62) */}
      <TecladoDoAparelho aberto={tecladoAberto} aoTecla={naTecla} />
      {folha.montado && NaoRecebi()}
      {seletor.montado && SeletorDePais()}
      {dialogo.montado && SenhaAlterada()}
    </div>
  )
}
