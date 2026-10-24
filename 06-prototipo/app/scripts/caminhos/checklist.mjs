// O checklist (decisão 34) · a T13 numa estrutura só, por toque:
// a seção que cresce no lugar e fecha, a troca de uma aberta pra outra, os
// quadros que a URL abre (o 11, o 12, o 13), tem seta, toca — a foto por fazer,
// a ação da E — e o reduzir movimento. Decisão 39: o não
// conforme exige a foto do problema — a caixa nas duas telas do item, o
// Fotografar o problema, o registro (15), o Conte o que aconteceu apagado, a
// ordem livre entre escrever e fotografar — e o singular (1 item). A A com 4, o Painel
// foto a tirar só com calibração (decisão 52), a D pelo conteúdo, a E com até 4 passos do ciclo
// de testes, parado (decisão 54). Decisão 60: o 2º item da Montagem é o lado de cima (o 17), e a
// frase do que enquadrar fica embaixo do título, com o quadro da câmera só com o ícone (o
// Enquadre o problema também, no 08 e no 15). Entre um toque que mexe as seções e o
// próximo, a espera dos 200 ms do movimento: no meio dele, o cartão que desce
// ainda não está no lugar (logica.md · O checklist).
// o ciclo do herói com o evento que não chegou, como a T14 grava no prazo estourado (T14/02): os quatro passos
// feitos, e o evento 'nao-chegou' — a Seção F falha (estado/estado.jsx: o despachar do provedor, achado pela árvore do React)
const EVENTO_NAO_CHEGOU = `
  const el = document.querySelector('.t13'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value; const s = estado.sessao
  const passos = { 'e-1': 'aprovada', 'e-2': 'aprovada', 'e-3': 'aprovada', 'e-4': 'aprovada' }
  despachar({ tipo: 'mesclar', parcial: { etapas: { ...estado.etapas, ciclo: { ativoId: s.ativoId, moduloSerial: s.moduloSerial, passos, feitos: 4, total: 4,
    evento: 'nao-chegou', tentativa: 1, cartao: { lido: '9412857', resposta: 'aprovada' }, motor: null, concluido: false, fechado: false } } } })
  return true`

export default [
  // nascer aberta não anima (a entrada da tela nunca anima)
  { abre: '?tela=T13&momento=02-momento-b-montagem-aberta' },
  { dorme: 100 },
  { quieto: true },
  { abre: '?tela=T13&momento=11-momento-aguardando-autoteste' },
  { dorme: 100 },
  { quieto: true },
  { ve: 'Checklist registrado' },   // a homologação é da T16
  { naoVe: 'homologada' },
  // tocar num cartão: os itens esmaecem e a seta gira pra cima (transform e opacity, 200 ms)
  { toca: 'D · Configuração', anima: [{ prop: 'opacity', ms: 200, em: 'ds-secao-ck-corpo' }, { prop: 'transform', ms: 200, em: 'ds-icone' }] },
  { chega: 'T13', momento: null },   // registrado, a seção aberta não tem referência
  { ve: 'Canal de programação\nprotegido' },
  { naoToca: 'Eventos' },   // sem seta, é leitura (Lei 16)
  { dorme: 250 },
  // trocar de uma aberta pra outra, e fechar: a lista não pula debaixo do dedo
  { toca: 'F · Servidor' },
  { naoVe: 'Canal de programação' },
  { ve: 'Posição\nconfere' },   // a posição e o evento de teste, confirmados depois do Finalizar
  { dorme: 250 },
  { toca: 'F · Servidor' },
  { naoVe: 'Posição' },
  { chega: 'T13', momento: '11-momento-aguardando-autoteste' },
  // com o reduzir movimento, a troca é direta
  { reduzir: true },
  { toca: 'A · Identificação' },
  { quieto: true },
  { ve: 'Serial do módulo' },
  { toca: 'A · Identificação' },
  { chega: 'T13', momento: '11-momento-aguardando-autoteste' },
  { reduzir: false },
  // o 13 pela URL grava o ciclo que a T14 fecha: abrir a B não desfaz a E resolvida
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { ve: '21' },   // 21 de 27 (o Autoteste da D não conta · sem o Painel), a E com os quatro passos e o bip ouvido
  { toca: 'B · Montagem' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: 'o ciclo passou' },
  { ve: 'Faltam 4 itens obrigatórios' },   // as 4 fotos da B
  // a D: um bloco por linha, cada um confere, e depois o autoteste, o canal e o ID
  { abre: '?tela=T13&momento=04-momento-d-configuracao-aberta' },
  { ve: 'Limpeza\nconfere' },
  { ve: 'Autoteste\nroda ao encerrar' },   // o autoteste roda no encerramento, e não conta
  { ve: 'Canal de programação\nprotegido' },
  { ve: 'ID no cadastro\nconfere' },
  { naoVe: 'Extended ID' },
  { naoVe: 'Hodômetro' },
  // a A com 4: o pacote de sincronização, sem o chassi
  { abre: '?tela=T13&momento=01-momento-a-identificacao-aberta' },
  { ve: 'Pacote de sincronização' },
  { naoVe: 'Chassi' },
  // o Painel só entra quando houve calibração: o ônibus do herói não calibra, e a B tem 4
  { abre: '?tela=T13&momento=02-momento-b-montagem-aberta' },
  { ve: 'você fotografa 4 itens' },
  { naoVe: 'Painel' },
  // o 20 pelo endereço é o caminhão coletor, que calibra: a quinta foto da Montagem dele
  { abre: '?tela=T13&momento=20-momento-foto-do-painel' },
  { chega: 'T13', momento: '20-momento-foto-do-painel' },
  { ve: 'KNB-5H39' },
  { ve: 'Painel com hodômetro e horímetro legíveis' },
  { ve: '5 de 5' },
  // o 12: a ressalva com o check, sem seta; a foto por fazer abre a câmera do app ·
  // a linha de 44, o estado à direita, e a causa fica fora da linha (fica na 08 e na 15)
  { abre: '?tela=T13&momento=12-momento-b-com-ressalva' },
  { ve: 'Módulo\ncom ressalva\nLado de cima\nfoto a tirar' },
  { naoVe: 'suporte trincado' },
  { ve: 'você fotografa 4 itens' },
  { naoToca: 'Módulo' },
  { toca: 'Lado de cima' },
  { chega: 'T13', momento: '17-momento-foto-do-lado-de-cima' },
  { ve: 'Lado de cima do módulo livre' },
  { ve: 'A antena GPS fica dentro, desse lado. Enquadre o módulo e o espaço acima dele.' },   // embaixo do título
  { executa: "const v = document.querySelector('.ds-visor'); return !v ? 'sem o quadro da câmera' : v.textContent.trim() ? 'o quadro da câmera tem texto: ' + v.textContent.trim() : true" },   // o quadro só com o ícone
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: '12-momento-b-com-ressalva' },
  // ── a foto vale no Usar foto (decisão 63): o Tirar foto só mostra a foto; o Tirar de novo, o voltar e o
  //    Não está conforme a descartam; a foto do problema segue a mesma regra; a foto usada fica usada ──
  { abre: '?tela=T13&momento=02-momento-b-montagem-aberta' },
  { toca: 'Módulo' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: '44-momento-foto-do-modulo-tirada' },
  { ve: 'Foto tirada às 14:30' },
  { ve: 'confira se está nítida antes de usar' },
  { ouve: 'A foto do módulo, tirada às 14:30' },
  { naoToca: 'Foto tirada às 14:30' },   // o registro não é botão
  { naoToca: 'Voltar ao checklist' },
  { toca: 'Tirar de novo' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { naoVe: 'Foto tirada às 14:30' },
  { ve: 'Voltar ao checklist' },
  // o voltar do Android com a foto no quadro: descarta a foto e volta ao checklist, sem contar o item
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: '44-momento-foto-do-modulo-tirada' },
  { tecla: 'Escape' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: 'Módulo\nfoto a tirar' },
  // o Não está conforme com a foto no quadro: descarta a foto e abre o não conforme (08)
  { toca: 'Módulo' },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: '44-momento-foto-do-modulo-tirada' },
  { toca: 'Não está conforme' },
  { chega: 'T13', momento: '08-momento-nao-conforme-com-justificativa' },
  { naoVe: 'Foto tirada às 14:30' },
  { toca: 'Fotografar o problema' },
  { chega: 'T13', momento: '15-momento-problema-fotografado' },
  // o Tirar de novo do problema: volta à câmera do problema, com a caixa marcada e o que aconteceu guardado
  { toca: 'Tirar de novo' },
  { chega: 'T13', momento: '08-momento-nao-conforme-com-justificativa' },
  { naoVe: 'Problema fotografado às 14:30' },
  { ve: 'O QUE ACONTECEU' },
  { ve: 'Fotografar o problema' },
  // desmarcar volta à câmera do item; o Usar foto conta o item e segue
  { toca: 'Não está conforme' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { toca: 'Tirar foto' },
  { toca: 'Usar foto' },
  { chega: 'T13', momento: '17-momento-foto-do-lado-de-cima' },
  // a foto usada fica usada: o Módulo feito não tem seta e não se toca
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { naoToca: 'Módulo, foto a tirar' },
  { naoVe: 'Módulo\nfoto a tirar' },
  // ── o não conforme exige a foto do problema (decisão 39): a caixa Não está conforme nas duas telas do item ──
  { abre: '?tela=T13&momento=07-momento-responder-item' },
  { ve: 'Enquadre o módulo e o ponto de fixação' },
  { ve: 'marque e conte o que aconteceu' },
  { naoVe: 'O QUE ACONTECEU' },
  { toca: 'Não está conforme', anima: [{ prop: 'opacity', ms: 150 }] },   // o quadrado lima surge no poço
  { chega: 'T13', momento: '08-momento-nao-conforme-com-justificativa' },
  { ve: 'Enquadre o problema' },
  { ve: 'conte embaixo o que aconteceu' },
  { ve: 'O QUE ACONTECEU' },
  { naoVe: 'Salvar com ressalva' },
  // a ordem entre escrever e fotografar é livre: sem o texto, o disparador acende igual
  { digita: '', em: 'O QUE ACONTECEU' },
  { toca: 'Fotografar o problema' },
  { chega: 'T13', momento: '15-momento-problema-fotografado' },
  { ve: 'Problema fotografado às 14:30' },
  { ve: 'vai junto com a ressalva, pro gestor' },
  { ve: 'Enquadre o problema' },   // a frase embaixo do título fica (a 15)
  { ouve: 'A foto do problema, tirada às 14:30' },   // a foto do problema no quadro (decisão 63), com o nome pro leitor de tela
  { ve: 'Tirar de novo' },   // o link do pé, com a foto no quadro
  { dorme: 250 },   // a foto e o registro esmaecem no quadro (150); a caixa não se mexe
  { naoToca: 'Problema fotografado às 14:30' },   // o registro não é botão: é o que aconteceu
  // fotografado, sem o texto: o botão diz o que falta, apagado e desabilitado (lei 17)
  { desligado: 'Conte o que aconteceu' },
  { naoVe: 'Salvar com ressalva' },
  { digita: 'Suporte trincado; fixei com abraçadeira até a troca.', em: 'O QUE ACONTECEU' },   // checklist.exemploJustificativa
  { naoVe: 'Conte o que aconteceu' },
  // desmarcar volta à câmera do item (07); marcar de novo devolve o que aconteceu e a foto do problema (15)
  { toca: 'Não está conforme' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { ve: 'Enquadre o módulo e o ponto de fixação' },
  { naoVe: 'Problema fotografado às 14:30' },
  { toca: 'Não está conforme' },
  { chega: 'T13', momento: '15-momento-problema-fotografado' },
  { ve: 'Problema fotografado às 14:30' },
  // salvo com a ressalva, o item conta como resolvido: o próximo por fazer, e a B com a ressalva (12)
  { toca: 'Salvar com ressalva' },
  { chega: 'T13', momento: '17-momento-foto-do-lado-de-cima' },
  { ve: 'Lado de cima do módulo livre' },
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: '12-momento-b-com-ressalva' },
  { ve: 'Módulo\ncom ressalva\nLado de cima\nfoto a tirar' },
  { ve: 'você fotografa 4 itens' },
  { ve: 'Faltam 8 itens obrigatórios' },   // as 3 fotos que faltam na B e os 5 passos da E (a F não bloqueia)
  // escrever primeiro e fotografar depois: o 08 pela URL já tem o que aconteceu
  { abre: '?tela=T13&momento=08-momento-nao-conforme-com-justificativa' },
  { toca: 'Fotografar o problema' },
  { chega: 'T13', momento: '15-momento-problema-fotografado' },
  { toca: 'Salvar com ressalva' },
  { chega: 'T13', momento: '17-momento-foto-do-lado-de-cima' },
  // o 15 pela URL é o fluxo depois do toque no Fotografar o problema
  { abre: '?tela=T13&momento=15-momento-problema-fotografado' },
  { ve: 'Problema fotografado às 14:30' },
  { toca: 'Salvar com ressalva' },
  { chega: 'T13', momento: '17-momento-foto-do-lado-de-cima' },
  // o teclado nunca esconde o que importa (regra 10): o campo O QUE ACONTECEU em foco e o botão acima dele, no 08 e no 15
  { abre: '?tela=T13&momento=08-momento-nao-conforme-com-justificativa' },
  { foca: 'O QUE ACONTECEU', teclado: 'texto' },
  { janela: [360, 480] },
  { app: [360, 480] },
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Fotografar o problema' },
  { toca: 'Fotografar o problema' },
  { chega: 'T13', momento: '15-momento-problema-fotografado' },
  // o toque no botão tira o foco do campo, e o teclado fecha; tocar no campo de novo o abre
  { janela: [360, 800] },
  { app: [360, 800] },
  { foca: 'O QUE ACONTECEU', teclado: 'texto' },
  { janela: [360, 480] },
  { app: [360, 480] },
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Salvar com ressalva' },
  { janela: [360, 800] },
  { app: [360, 800] },
  // ── o singular: Falta 1 item · o que ele fotografa conta os itens da seção, e fica 4 ──
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { ve: 'Faltam 4 itens' },
  { toca: 'B · Montagem' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { toca: 'Módulo' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { toca: 'Tirar foto' },
  { ve: 'Foto tirada às 14:30' },
  { toca: 'Usar foto' },
  { ve: 'Lado de cima do módulo livre' },
  { toca: 'Tirar foto' },
  { ve: 'Foto tirada às 14:30' },
  { toca: 'Usar foto' },
  { ve: 'Chicote e emendas protegidos' },
  { toca: 'Tirar foto' },
  { ve: 'Foto tirada às 14:30' },
  { toca: 'Usar foto' },
  { ve: 'Leitor posicionado' },
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: 'você fotografa 4 itens' },
  { ve: 'Falta 1 item' },
  { naoVe: 'você fotografa 1 itens' },
  { toca: 'Leitor' },
  { toca: 'Tirar foto' },
  { ve: 'Foto tirada às 14:30' },
  { toca: 'Usar foto' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: '4 fotos tiradas' },
  { naoVe: 'Falta' },
  // a E: uma ação só, e os passos são leitura
  { abre: '?tela=T13&momento=05-momento-e-teste-dinamico-aberta' },
  { naoToca: 'Ignição ligada' },
  { toca: 'D · Configuração' },
  { dorme: 250 },
  { toca: 'E · Ciclo de testes' },
  { dorme: 250 },
  { ve: 'até 4 passos, com o ônibus parado' },
  { ve: 'Cartão do motorista' },
  { toca: 'Fazer o ciclo de testes' },
  { chega: 'T14' },

  // ── o bip não ouvido só conta com o que aconteceu escrito (HU-T13-4, decisão 64): a 42 e a 50 ──
  { abre: '?tela=T13&momento=42-momento-bip-nao-ouvido' },
  { ve: 'Faltam 9 itens obrigatórios' },
  { ve: 'não ouvi' },
  { ve: 'Testar de novo' },
  { digita: 'O leitor acende, mas o bip não toca.', em: 'O QUE ACONTECEU' },
  { chega: 'T13', momento: '50-momento-bip-nao-ouvido-com-o-que-aconteceu' },
  { ve: 'não ouvi · com ressalva' },
  { ve: 'Faltam 8 itens obrigatórios' },
  { digita: '', em: 'O QUE ACONTECEU' },   // apagado o que aconteceu, o bip volta a não contar
  { chega: 'T13', momento: '42-momento-bip-nao-ouvido' },
  { ve: 'Faltam 9 itens obrigatórios' },

  // ── a Seção F falhando (a 49, decisão 64): a Posição confere, o Evento de teste não chegou, e o Disparar
  // de novo leva ao ciclo, pra disparar outro evento (a T14 retoma o ciclo, e o evento se dispara de novo) ──
  { abre: '?tela=T13' },
  { executa: EVENTO_NAO_CHEGOU },
  { toca: 'F · Servidor' },
  { ve: 'não passou · não bloqueia' },
  { ve: 'Posição\nconfere' },
  { ve: 'Evento de teste\nnão chegou ao servidor' },
  { toca: 'Disparar de novo' },
  { chega: 'T14' },
  { ve: 'Disparar evento de teste' },
]
