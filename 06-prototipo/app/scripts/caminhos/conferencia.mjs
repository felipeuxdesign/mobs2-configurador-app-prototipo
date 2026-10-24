// A conferência normal e sua folha continuam interativas. Divergências e manutenção são consultas.
// Decisão 64: o Reenviar tudo, menos a conexão abre a T09/30, pelas duas portas (a folha sobre a 02 e a 03)
// — a limpeza de configuração, os outros cinco, e a Conexão fica como está · no par que diverge, o voltar
// não faz nada conferindo, e na 00 registra o diagnóstico e volta ao menu · o Corrigir este bloco na
// Conexão de outra operadora pergunta antes, pelo chip (a 07), e a Conexão reenviada espera o servidor
// (a T09/34).
const CONFERE = '02-momento-tudo-confere'
const MENOS_CONEXAO = '30-momento-o-que-vai-ser-gravado-menos-a-conexao'
// o par que diverge na sessão da faixa (o M2C-0438 com o ONK-8Q90, o diff-divergente), o que a T05 e a T06 gravariam
const DIVERGENTE = `
  const el = document.querySelector('.t04'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value
  despachar({ tipo: 'mesclar', parcial: { sessao: { ...estado.sessao, ativoId: 'a-16', moduloSerial: 'M2C-0438' }, etapas: { ...estado.etapas, cadeia: null } } })
  despachar({ tipo: 'ir', tela: 'T11' })
  return true`
// concluída sem a Conexão, a marca conta também a que ficou como está, que está no módulo: quem lê os
// seis (o checklist, a T07) a vê conferida
const CONTA_A_CONEXAO = `
  const el = document.querySelector('.t09'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const c = f.memoizedProps.value.estado.etapas.cadeia
  return (c.confirmados === 6 && c.semConexao === true) || 'a marca: ' + JSON.stringify(c)`
const fecha = [{ prop: 'transform', ms: 150, em: 'ds-folha' }, { prop: 'opacity', ms: 150, em: 'ds-veu' }]
const sobe = [{ prop: 'transform', ms: 200, em: 'ds-folha' }, { prop: 'opacity', ms: 200, em: 'ds-veu' }]
const folha = [
  { toca: 'Outras ações' },
  { chega: 'T11', momento: CONFERE },
  { ve: 'Mantém a conexão do módulo. Apaga só a configuração.' },
  { ve: 'nada vai pro módulo · só o diagnóstico sobe' },
]
export default [
  { abre: '?tela=T11' },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  { ve: '5 de 5' },   // os cinco blocos do script
  { naoVe: 'Corrigir este bloco' },
  ...folha,
  // a faixa fica inerte atrás do véu de Outras ações, fora do toque e do leitor
  { naoToca: 'ENCERRAR' },
  { toca: 'Fechar' },
  { naoVe: 'Reenviar tudo, menos a conexão' },
  { toca: 'ENCERRAR' },
  { ve: 'Encerrar antes de terminar?' },
  { toca: 'Continuar a instalação' },
  ...folha,
  { tocaFora: 'Outras ações', anima: fecha },
  { naoVe: 'Reenviar tudo, menos a conexão' },
  ...folha,
  { arrasta: 'Outras ações', dy: 40, anima: [{ prop: 'transform', ms: 200, em: 'ds-folha' }] },
  { ve: 'Reenviar tudo, menos a conexão' },
  { arrasta: 'Outras ações', dy: 120, anima: fecha },
  { naoVe: 'Reenviar tudo, menos a conexão' },
  ...folha,
  { tecla: 'Escape' },
  { naoVe: 'Reenviar tudo, menos a conexão' },
  ...folha,
  { toca: 'Apenas registrar o diagnóstico' },
  { chega: 'T04' },
  // O reenvio sem a Conexão (a T09/30), inclusive quando a cadeia anterior já concluiu: a limpeza de
  // configuração, os outros cinco, e a prova do servidor não roda — a rede não mudou.
  { abre: '?tela=T11' },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  ...folha,
  { toca: 'Reenviar tudo, menos a conexão' },
  { chega: 'T09', momento: MENOS_CONEXAO },
  { ve: 'apaga a configuração · a rede do módulo continua' },
  { ve: 'Conexão\nfica como está\nTIM · timbrasil.br · não é reenviada' },
  { toca: 'Gravar no módulo' },
  { chega: 'T09', momento: '21-momento-gravando-a-limpeza' },
  { ve: 'apagando a configuração' },
  { ve: '0 de 5' },
  { ve: 'CONFERIDO NO MÓDULO\n5 passos', ms: 14000 },   // os cinco, uns 9 s
  { ve: '5 de 5' },
  { ve: 'a configuração apagada · a rede do módulo continua' },
  { ve: 'Conexão\nfica como está' },
  { naoVe: 'O módulo falou com o servidor' },
  { executa: CONTA_A_CONEXAO },
  { toca: 'Voltar ao menu' },
  { toca: 'Entendi' },
  { toca: 'Conferir configuração' },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  ...folha,
  { toca: 'Reenviar tudo, menos a conexão' },
  { chega: 'T09', momento: MENOS_CONEXAO },
  { toca: 'Gravar no módulo' },
  { chega: 'T09', momento: '21-momento-gravando-a-limpeza' },
  { desligado: 'Gravando · não interrompa' },
  { ve: 'CONFERIDO NO MÓDULO\n5 passos', ms: 14000 },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  // ── o par que diverge: conferindo (a 04), o voltar não faz nada; lida, na 00, ele registra o
  // diagnóstico e volta ao menu (decisão 64) ──
  { executa: DIVERGENTE },
  { chega: 'T11' },
  { tecla: 'Escape' },
  { fica: 'T11', ms: 300 },
  { naoVe: 'NÃO BATE COM O CADASTRO' },
  { ve: 'NÃO BATE COM O CADASTRO', ms: 5000 },
  { ve: '4 de 5' },
  { tecla: 'Escape' },
  { chega: 'T04' },
  // ── a Conexão de outra operadora pergunta antes, pelo chip (a 07); reenviada, espera o servidor (a T09/34) ──
  { executa: DIVERGENTE },
  { chega: 'T11' },
  { ve: 'NÃO BATE COM O CADASTRO', ms: 5000 },
  { ve: '4 de 5' },
  { toca: 'Corrigir este bloco: Conexão', anima: sobe },
  { chega: 'T11', momento: '07-momento-folha-de-confirmacao-da-conexao' },
  { ve: 'Reenviar a conexão troca a operadora do módulo.' },
  { ve: 'O cadastro manda TIM · timbrasil.br, e o módulo está com Claro · claro.com.br. Confira se o chip no módulo é da TIM: com outro chip, ele para de falar com o servidor.' },
  { dorme: 300 },
  { tecla: 'Escape' },                                      // o voltar fecha a folha
  { anima: fecha },
  { naoVe: 'Reenviar a conexão troca a operadora do módulo.' },
  { fica: 'T11', ms: 300 },
  { toca: 'Corrigir este bloco: Conexão' },
  { chega: 'T11', momento: '07-momento-folha-de-confirmacao-da-conexao' },
  { dorme: 300 },
  { toca: 'Reenviar a conexão' },
  { chega: 'T09', momento: '09-momento-manutencao-reenviando' },
  { chega: 'T09', momento: '34-momento-manutencao-conexao-conferindo-o-servidor', ms: 6000 },
  { ve: 'O módulo falou com o servidor\nconferindo ·' },
  { ve: 'O módulo falou com o servidor\nsim', ms: 3000 },
  // ── a outra porta do Reenviar tudo, menos a conexão: a folha da 03, no par que diverge ──
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  { executa: DIVERGENTE },
  { chega: 'T11' },
  { ve: 'NÃO BATE COM O CADASTRO', ms: 5000 },
  { toca: 'Outras ações' },
  { chega: 'T11', momento: '03-momento-outras-acoes' },
  { toca: 'Reenviar tudo, menos a conexão' },
  { chega: 'T09', momento: MENOS_CONEXAO },
  { ve: 'apaga a configuração · a rede do módulo continua' },
  { ve: 'Conexão\nfica como está' },
  // Exemplos especiais ficam no mesmo quadro, sem transformar a consulta em percurso.
  ...[
    ['00-tela', 'NÃO BATE COM O CADASTRO'],
    ['03-momento-outras-acoes', 'Reenviar tudo, menos a conexão'],
    ['01-estado-conteudo-que-o-app-nao-reconhece', '1 a mais'],
    ['05-estado-revisar-em-seguida', 'REVISAR EM SEGUIDA'],
    ['06-momento-folha-de-confirmacao', 'Reenviar as cercas apaga os cartões gravados no módulo.'],
    ['07-momento-folha-de-confirmacao-da-conexao', 'Reenviar a conexão troca a operadora do módulo.'],
  ].flatMap(([estado, texto]) => [
    { abre: `?tela=T11&estado=${estado}` },
    { chega: 'T11', estado },
    { ve: texto },
    { quieto: true },
    { naoToca: 'Corrigir este bloco' },
    { naoToca: 'Reenviar tudo, menos a conexão' },
    { tecla: 'Escape' },
    { fica: 'T11', ms: 1800 },
    { chega: 'T11', estado },
  ]),
]
