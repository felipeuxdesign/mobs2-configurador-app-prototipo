// O movimento da T01 · Login (02-telas/T01-login/animacao.md). Dentro da tela, cada peça faz o gesto dela, igual em todo o app: o olho troca
// a senha e o glifo por duas camadas, em 150; o campo em foco acende o traço lima por scaleX, em
// 150, um foco só, e nada sai do lugar; o aviso que o Entrar faz nascer esmaece
// no lugar, em 150; o dígito do código surge em 100; o cronômetro e a contagem do reenvio
// trocam no lugar, 1 s por segundo, e ao zerar as linhas da folha acendem em 150; o requisito
// ganha o check e o texto clareia, em 150, e volta igual; a folha sobe em 200 e
// desce em 150, e se arrasta (lei 20); o diálogo nasce e some em 150, de 98% a 100%; o quadrado
// do Lembrar surge e some em 150. O primário que diz o que falta troca o texto no lugar,
// esmaecendo em 150, com o roxo direto; o Salvar e entrar, com o mesmo texto, acende
// por uma camada; o que se desabilita no toque solta o roxo de uma vez. Os
// quatro quadros — a entrada, o canal, o código, a senha — são páginas: a troca esmaece o
// conteúdo em 150, como entre telas, e o Entrar leva à T02 com a troca entre telas. O teclado do
// aparelho, na tela do código (a 03, decisão 62): chegando nela, sobe de baixo em 200, e o rodapé sobe
// junto, só por deslocamento, com os blocos do miolo; o ✓ com o código incompleto o fecha — desce em 150, o rodapé desce junto
// e o Voltar ao login volta esmaecendo em 150 —, e o toque no código o abre de novo.
// Pela URL, no palco, num estado e no print, a tela abre parada; com reduzir movimento, tudo
// direto, e o cronômetro e a contagem do reenvio no mesmo ritmo. (O roteiro
// confere o ritmo de 1 s da contagem do reenvio, com e sem reduzir; as três erradas ao vivo, o Enviar
// outro código e o errado com reduzir.)
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em, ms = 150) => ({ prop: 'opacity', ms, em, curva: C })
const desliza = (em, ms = 150) => ({ prop: 'transform', ms, em, curva: C })
const MIOLO = esmaece('tela-miolo')
const RODAPE = esmaece('ds-rodape')
// o rodapé do login inteiro (a troca de quadro), e não o link dele, que volta esmaecendo com o teclado fechando
const RODAPE_LOGIN = esmaece('ds-rodape ds-rodape-login')
const TEXTO = esmaece('ds-primario-texto')
const ACENDE = esmaece('ds-primario-antes')
const ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]
const OLHO = [esmaece('ds-campo-entrada'), esmaece('ds-so-icone-glifo')]
const TRACO = desliza('ds-traco-foco')
const MARCA = [esmaece('ds-quadrado-cheio'), desliza('ds-quadrado-cheio')]
const CHECKBOX_SOLTA = { prop: 'opacity', ms: 100, em: 'ds-checkbox', curva: C }   // o pressionado do checkbox solta em 100, como a linha
const DIGITO = esmaece('ds-codigo-digito', 100)
const REQUISITO = esmaece('ds-requisito')
const FOLHA_SOBE = [desliza('ds-folha', 200), esmaece('ds-veu', 200)]
const FOLHA_DESCE = [desliza('ds-folha'), esmaece('ds-veu')]
const DIALOGO = [esmaece('ds-dialogo'), desliza('ds-dialogo'), esmaece('ds-veu')]
const REF = [
  '01-estado-usuario-ou-senha-incorretos', '02-momento-recuperar-escolher-canal', '03-momento-recuperar-digitar-codigo',
  '04-momento-nao-recebi-o-codigo', '05-momento-codigo-errado', '06-estado-codigo-expirado', '07-estado-tentativas-esgotadas',
  '08-momento-recuperar-nova-senha', '09-momento-senha-alterada', '10-momento-senha-visivel', '11-momento-nao-recebi-reenvio-liberado',
  '12-momento-codigo-reenviado', '13-momento-codigo-no-e-mail', '14-estado-login-sem-conexao', '15-estado-primeiro-acesso',
  '16-estado-usuario-lembrado', '17-estado-teto-de-envios', '18-estado-outro-usuario-no-aparelho',
]
const abreParada = (q) => [{ abre: `?tela=T01&${q}` }, { quieto: true }, { dorme: 300 }, { quieto: true }]
const SENHA_NOVA = 'Crie a nova senha'
// o teclado do aparelho (T01/03): sobe em 200 com o rodapé e as células (o miolo encolhe só por deslocamento);
// desce em 150 com os dois, e o link volta esmaecendo
const TECLADO_SOBE = [desliza('ds-teclado', 200), desliza('ds-rodape ds-rodape-login', 200), desliza('ds-codigo', 200)]
const TECLADO_DESCE = [desliza('ds-teclado'), desliza('ds-rodape ds-rodape-login'), desliza('ds-codigo'), esmaece('ds-rodape-link')]
// o toque no código que já tem o foco (o foca não serve: o foco não muda), e dois quadros pro teclado nascer
const TOCA_NO_CODIGO = { executa: `P.raiz.querySelector('.ds-codigo-entrada').click()
  return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(true))))`, rotulo: 'toca no código' }

export default [
  // ── abre parada, em cada quadro: a 00, cada momento e estado pelo endereço (e pela coluna), e o print ──
  { abre: '' },
  { chega: 'T01', momento: null },
  { quieto: true },
  ...abreParada('print=1'),
  ...REF.flatMap((r) => abreParada(`${r.includes('-estado-') ? 'estado' : 'momento'}=${r}`)),
  ...abreParada('momento=05-momento-codigo-errado&print=1'),

  // ── T01·1 · o olho: a senha e o glifo trocam por duas camadas, em 150 ──
  { abre: '?tela=T01' },
  { quieto: true },
  { toca: 'Mostrar a senha', anima: OLHO },
  { chega: 'T01', momento: '10-momento-senha-visivel' },
  { dorme: 200 },
  { toca: 'Ocultar a senha', anima: OLHO },
  { chega: 'T01', momento: null },
  { dorme: 200 },
  // ── T01·2 · o campo em foco: a capa do traço anda, um foco só, e nada sai do lugar ──
  { marcaLugar: true },
  { toca: 'USUÁRIO', anima: [TRACO] },
  { mesmoLugar: true },
  { dorme: 200 },
  { toca: 'Mostrar a senha', anima: OLHO, naoAnima: [{ prop: 'transform', em: 'ds-traco-foco' }] },
  { dorme: 200 },
  { toca: 'Ocultar a senha' },
  { dorme: 200 },
  { toca: 'SENHA', anima: [TRACO] },
  { mesmoLugar: true },
  { dorme: 200 },
  { quieto: true },
  // ── T01·10 · o Lembrar meu usuário: o quadrado surge e some, em 150 ──
  { toca: 'Lembrar meu usuário', anima: [...MARCA, CHECKBOX_SOLTA], naoAnima: [{ prop: 'transform', em: 'ds-traco-foco' }] },
  { dorme: 200 },
  { toca: 'Lembrar meu usuário', anima: [esmaece('ds-quadrado'), desliza('ds-quadrado'), CHECKBOX_SOLTA] },
  { dorme: 200 },
  { quieto: true },
  // ── o Entrar diz o que falta: o texto troca no lugar, e o roxo troca direto ──
  { digita: 'r', em: 'USUÁRIO' },
  { tecla: 'Backspace' },
  { anima: [TEXTO] },
  { ve: 'Digite o usuário' },
  { dorme: 200 },
  { digita: 'r.vieira', em: 'USUÁRIO' },
  { anima: [TEXTO] },
  { naoVe: 'Digite o usuário' },
  { dorme: 200 },
  { quieto: true },
  // ── T01·3 · o aviso do erro: nasce do Entrar, esmaecendo no lugar; o Entrar apagado não fica com o roxo ──
  { digita: '123', em: 'SENHA' },
  { dorme: 200 },
  // a espera do Entrar: o texto troca no lugar pra Entrando…, o
  // botão se desabilita (o roxo sai direto), o link também, e nada sai do lugar; a
  // resposta chega 1,2 s depois — aqui, a senha errada, com o aviso que esmaece
  { marcaLugar: true },
  { toca: 'Entrar', anima: [TEXTO], naoAnima: ROXO },
  { desligado: 'Entrando…' },
  { desligado: 'Esqueci a senha' },
  { mesmoLugar: true },
  { ve: 'USUÁRIO OU SENHA INCORRETOS', entre: [800, 1700] },
  { anima: [esmaece('ds-aviso'), TEXTO] },
  { desligado: 'Digite a senha' },
  { dorme: 200 },
  { quieto: true },
  // o aviso que já está não esmaece de novo: nem no digitar, nem no segundo Entrar
  { digita: 'G', em: 'SENHA' },
  { anima: [TEXTO], naoAnima: [{ prop: 'opacity', em: 'ds-aviso' }] },
  { dorme: 200 },
  { toca: 'Entrar', anima: [TEXTO], naoAnima: [{ prop: 'opacity', em: 'ds-aviso' }, ...ROXO] },
  { desligado: 'Entrando…' },
  { ve: 'Digite a senha', entre: [800, 1700] },
  { naoAnima: [{ prop: 'opacity', em: 'ds-aviso' }] },
  { ve: 'USUÁRIO OU SENHA INCORRETOS' },
  { dorme: 200 },

  // ── os quadros do recuperar: o conteúdo esmaece como entre telas ──
  { toca: 'Esqueci a senha', anima: [MIOLO, RODAPE] },
  { chega: 'T01', momento: '02-momento-recuperar-escolher-canal' },
  { dorme: 200 },
  { quieto: true },
  { toca: 'E-MAIL', naoAnima: [MIOLO] },                       // o canal só marca: nada troca de quadro
  { dorme: 200 },
  { toca: 'TELEFONE', naoAnima: [MIOLO] },
  { dorme: 200 },
  { toca: 'Voltar ao login', anima: [MIOLO, RODAPE] },
  { chega: 'T01', momento: null },
  { ve: 'USUÁRIO OU SENHA INCORRETOS' },
  { dorme: 200 },
  { quieto: true },                                             // o aviso volta com o quadro, sem esmaecer de novo
  { toca: 'Esqueci a senha', anima: [MIOLO, RODAPE] },
  { dorme: 200 },
  // o telefone completo liga o Enviar o código, no mesmo quadro (a 02 → a 20)
  { digita: '81987654321', em: 'Telefone' },
  { chega: 'T01', momento: '20-momento-telefone-no-formato-certo' },
  { naoAnima: [MIOLO] },
  { dorme: 200 },
  // ── T01·5 · o cronômetro: o número troca no lugar, 1 s por segundo, e nada se move ──
  { toca: 'Enviar o código', anima: [MIOLO, RODAPE, ...TECLADO_SOBE] },   // o teclado do aparelho sobe com o rodapé
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { ve: '9:59', entre: [600, 1400] },
  { quieto: true },
  { ve: '9:58', entre: [900, 1100] },                        // 1 s por segundo (RITMOS.cronometroCodigoMs)
  { quieto: true },
  // ── o teclado do aparelho: o ✓ com o código incompleto o fecha, e o toque no código o abre de novo ──
  { toca: 'Apagar', naoAnima: [{ prop: 'transform', em: 'ds-teclado' }] },
  { dorme: 200 },
  { toca: 'Concluído', anima: TECLADO_DESCE, naoAnima: [MIOLO, RODAPE_LOGIN] },
  { dorme: 200 },
  { quieto: true },
  TOCA_NO_CODIGO,
  { anima: TECLADO_SOBE },
  { dorme: 250 },
  { toca: '3' },
  { dorme: 200 },
  { quieto: true },
  // ── T01·8 · a folha Não recebi o código: sobe em 200 e desce em 150, com o véu; e o arraste ──
  { toca: 'Não recebi o código', anima: FOLHA_SOBE },
  { chega: 'T01', momento: '04-momento-nao-recebi-o-codigo' },
  { dorme: 300 },
  { toca: 'Fechar', anima: FOLHA_DESCE },
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { dorme: 250 },
  { toca: 'Não recebi o código', anima: FOLHA_SOBE },
  { dorme: 300 },
  { arrasta: 'Não recebi o código', dy: 30, anima: [desliza('ds-folha', 200)] },   // antes do limite, volta ao lugar
  { dorme: 300 },
  { arrasta: 'Não recebi o código', dy: 120, anima: FOLHA_DESCE },                  // depois, desce e fecha
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { dorme: 250 },
  // ── T01·6 · a contagem do reenvio, na folha: troca no lugar; ao zerar, as linhas acendem em 150 ──
  { toca: 'Não recebi o código', anima: FOLHA_SOBE },
  { dorme: 300 },
  // cada segundo troca no lugar, no ritmo de 1 s, e nada se move; zera 44 s depois do 0:44
  { ve: '0:45', ms: 20000 },
  { quieto: true },
  { ve: '0:44', entre: [900, 1100] },
  { quieto: true },
  { chega: 'T01', momento: '11-momento-nao-recebi-reenvio-liberado', ms: 70000, entre: [42500, 45500] },
  { anima: [esmaece('ds-linha-opcao')] },
  { dorme: 300 },
  { quieto: true },
  { toca: 'Fechar', anima: FOLHA_DESCE },
  { dorme: 250 },
  // as três erradas, ao vivo (o 07): o código morre no mesmo quadro — o título, o cartão e as
  // células trocam no lugar, e só o texto do primário esmaece; resta 1 envio na hora
  ...[1, 2].flatMap(() => [
    { digita: '482911', em: 'Digite o código' },
    { dorme: 200 },
    { toca: 'Confirmar', anima: [TEXTO], naoAnima: [MIOLO] },
    { ve: 'Código inválido' },
    { dorme: 200 },
    { toca: 'Tentar de novo', anima: [TEXTO], naoAnima: [MIOLO, ...ROXO] },
    { dorme: 200 },
  ]),
  { digita: '482911', em: 'Digite o código' },
  { dorme: 200 },
  { toca: 'Confirmar', anima: [TEXTO], naoAnima: [MIOLO, RODAPE_LOGIN] },   // Confirmar → Enviar outro código (o teclado desce)
  { ve: 'Enviar outro código' },
  { dorme: 200 },
  { quieto: true },
  // o Enviar outro código: o código novo no mesmo quadro, e o Digite o código apagado sem o roxo
  { toca: 'Enviar outro código', anima: [TEXTO], naoAnima: [MIOLO, RODAPE_LOGIN, ...ROXO] },
  { chega: 'T01', momento: '12-momento-codigo-reenviado' },
  { desligado: 'Digite o código' },
  { dorme: 200 },
  { quieto: true },

  // ── T01·4 · a célula do código, e o Confirmar que diz o que falta ──
  { abre: '?tela=T01&momento=12-momento-codigo-reenviado' },
  { desligado: 'Digite o código' },
  { quieto: true },
  { digita: '4', em: 'Digite o código' },
  { anima: [DIGITO], naoAnima: [TEXTO] },                    // ainda falta: o texto fica
  { dorme: 200 },
  { digita: '48291', em: 'Digite o código' },
  { dorme: 200 },
  { digita: '482911', em: 'Digite o código' },
  { anima: [DIGITO, TEXTO] },                                // os seis: Digite o código → Confirmar
  { ve: 'Confirmar' },
  { dorme: 200 },
  // o código errado: o título, o cartão e as células trocam no lugar, e só o texto do primário esmaece
  { toca: 'Confirmar', anima: [TEXTO], naoAnima: [MIOLO] },
  { ve: 'Código inválido' },
  { dorme: 200 },
  { toca: 'Tentar de novo', anima: [TEXTO], naoAnima: [MIOLO, ...ROXO] },   // o Digite o código apagado não fica com o roxo
  { desligado: 'Digite o código' },
  { dorme: 200 },
  { digita: '482913', em: 'Digite o código' },
  { anima: [TEXTO] },
  { dorme: 200 },
  { toca: 'Confirmar', anima: [MIOLO, RODAPE] },             // o código certo: o quadro da senha nova
  { chega: 'T01', momento: '08-momento-recuperar-nova-senha' },
  { dorme: 200 },
  { quieto: true },
  // ── T01·7 · os requisitos: a marca ganha o check e o texto clareia, e volta igual; o Salvar acende ──
  { digita: 'garagem', em: SENHA_NOVA },
  { anima: [REQUISITO], naoAnima: [ACENDE] },                 // deixam de cumprir: o mesmo, ao contrário; o Salvar se apaga direto
  { desligado: 'Salvar e entrar' },
  { dorme: 250 },
  { digita: 'Garagem!Ibura27', em: SENHA_NOVA },
  { anima: [REQUISITO, ACENDE] },                            // cumprem: o check, e o Salvar e entrar acende por uma camada
  { dorme: 250 },
  { quieto: true },
  // ── T01·9 · o diálogo Senha alterada: nasce em 150, de 98% a 100%, com o véu ──
  { toca: 'Salvar e entrar', anima: DIALOGO },
  { chega: 'T01', momento: '09-momento-senha-alterada' },
  { dorme: 250 },
  { quieto: true },
  // o Entrar com a senha nova: o diálogo some, e a entrada volta pela troca de quadro
  { toca: 'Entrar com a senha nova', anima: [esmaece('ds-dialogo'), MIOLO, RODAPE] },
  { chega: 'T01', momento: null },
  { dorme: 250 },
  { quieto: true },
  // ── o Entrar leva à T02: a troca entre telas ──
  // A senha do mock volta preenchida depois da recuperação.
  { toca: 'Entrar', anima: [TEXTO] },
  { desligado: 'Entrando…' },
  { chega: 'T02', entre: [800, 1700] },
  { anima: [MIOLO, RODAPE] },

  // ── com reduzir movimento: tudo direto, e o cronômetro no mesmo ritmo ──
  { reduzir: true },
  { abre: '?tela=T01' },
  { toca: 'Mostrar a senha' },
  { quieto: true },
  { toca: 'USUÁRIO' },
  { quieto: true },
  { toca: 'Lembrar meu usuário' },
  { quieto: true },
  { digita: '123', em: 'SENHA' },
  { toca: 'Entrar' },
  { ve: 'USUÁRIO OU SENHA INCORRETOS' },
  { quieto: true },
  { toca: 'Esqueci a senha' },
  { quieto: true },
  { digita: '81987654321', em: 'Telefone' },
  { chega: 'T01', momento: '20-momento-telefone-no-formato-certo' },
  { toca: 'Enviar o código' },
  { quieto: true },
  { ve: '9:59', entre: [600, 1400] },
  // o teclado do aparelho, com reduzir: aparece e some
  { toca: 'Apagar' },
  { toca: 'Concluído' },
  { quieto: true },
  TOCA_NO_CODIGO,
  { quieto: true },
  { toca: 'Não recebi o código' },
  { quieto: true },
  { toca: 'Fechar' },
  { quieto: true },
  // a contagem do reenvio, com reduzir: o mesmo ritmo de 1 s, e ao zerar as linhas acendem direto
  { abre: '?tela=T01&momento=04-momento-nao-recebi-o-codigo' },
  { quieto: true },
  { ve: '0:58', ms: 5000 },
  { ve: '0:57', entre: [900, 1100] },
  { quieto: true },
  { chega: 'T01', momento: '11-momento-nao-recebi-reenvio-liberado', ms: 70000, entre: [55500, 58500] },
  { quieto: true },
  { dorme: 200 },
  { quieto: true },
  { abre: '?tela=T01&momento=12-momento-codigo-reenviado' },
  { digita: '482911', em: 'Digite o código' },
  { quieto: true },
  { toca: 'Confirmar' },                                     // o errado: o texto do primário troca direto
  { quieto: true },
  { toca: 'Tentar de novo' },
  { quieto: true },
  { digita: '482913', em: 'Digite o código' },
  { quieto: true },
  { toca: 'Confirmar' },
  { quieto: true },
  { digita: 'garagem', em: SENHA_NOVA },
  { quieto: true },
  { digita: 'Garagem!Ibura27', em: SENHA_NOVA },
  { quieto: true },
  { toca: 'Salvar e entrar' },
  { quieto: true },
  { toca: 'Entrar com a senha nova' },
  { quieto: true },
  { reduzir: false },
]
