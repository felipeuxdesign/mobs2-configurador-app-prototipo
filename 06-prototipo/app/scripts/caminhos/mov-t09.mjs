// T09 · o movimento da configuração (02-telas/T09-configurar-modulo/animacao.md; decisões 47, 49, 57 e 58):
//   · a tela abre parada, no que vai ser gravado (05) ou no escolher o bloco (08), e o endereço diz
//     o quadro; nada grava antes do toque. Os quadros da cadeia gravando (00, 21 a 26) e o servidor (11)
//     abrem parados no valor da referência, no print e pelo endereço;
//   · Gravar no módulo e Reenviar trocam o quadro inteiro (o miolo e o rodapé esmaecem em 150), e a
//     cadeia só corre depois da troca;
//   · cada etapa grava e relê em passos de 100 ms (RITMOS.cadeiaPassoMs): a barra anda um trecho linear
//     por passo, só por scaleX (100 ms × --mov-fator), e a contagem e o faltam trocam no lugar; a
//     etapa leva 2 s — 1,2 s gravando e 0,8 s conferindo —; a Limpeza, 1,2 s, sem conferir; a Conexão,
//     1,2 s gravando e 1,2 s esperando o servidor (*conferindo · N s*, até 12 s) · a cadeia inteira, uns 12 s;
//   · a etapa conferida: o check esmaece no poço em 150, a linha do que gravou entra no lugar da barra
//     esmaecendo em 150, e o trilho até a próxima acende de cima pra baixo, scaleY em 300; o contador
//     do título troca no lugar;
//   · a cadeia que conclui (04): a faixa *CONFERIDO NO MÓDULO · 6 passos* esmaece no lugar em 200, o
//     contador vira lima, e o primário acende com o Voltar ao menu: o texto novo esmaece no lugar, e o
//     roxo troca direto · nada rola: a tela cabe;
//   · a recuperação (tentar sair antes de a Conexão gravar: o ENCERRAR, o voltar): o aviso esmaece no
//     topo em 150 (Aviso · surge), o glifo do elo parado esmaece no poço, a barra para onde estava
//     (*parou em* · *retoma daqui*), e o primário acende com o Continuar a gravação; retomar segue da
//     mesma contagem;
//   · a folha das mensagens (27): com mensagens que o módulo ainda não enviou, o Gravar no módulo abre
//     antes a folha (sobe em 200); Esperar o envio fecha e fica no 05; Gravar mesmo assim fecha, e a
//     cadeia começa depois dela;
//   · a cadeia curta da manutenção (09): a limpeza só do bloco e o bloco, com a barra e a contagem; o
//     ENCERRAR fica apagado e o voltar não faz nada enquanto ela corre (lei 17); conferidas, o primário
//     acende com o Voltar ao menu;
//   · a recusa e a queda não têm porta viva no palco: a peça se prova na vitrine (mov-check);
//   · decisão 64: o caminho segue sem o menu (a concluída leva à CAN, Ler a CAN) · a manutenção pelo menu
//     começa sem nada escolhido (28) · esperar o envio conta as mensagens (29) · o recusado de novo (31)
//     pergunta antes de gravar só a conexão (32) e grava só ela (33), e a sessão vai pros 4 passos · a
//     Conexão da manutenção espera o servidor (34) · o Procurar outro módulo das travas segue pra busca
//     depois dos 4 passos · o Conferir de novo da 12 volta ao conferindo (11).
// Com reduzir movimento, o mesmo ritmo, e nada anda: a barra salta pro valor de cada passo.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const GLIFO = esmaece('ds-glifo')
const LINHA = esmaece('ds-cadeia-descricao')                  // o que a etapa gravou, no lugar da barra
const TRILHO = { prop: 'transform', ms: 300, em: 'ds-trilho-capa', curva: C }
const BARRA = { prop: 'transform', ms: 100, em: 'ds-cadeia-barra-feito', curva: 'linear' }   // um passo, linear
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const ACENDE = esmaece('ds-primario-antes')      // a camada do primário que acende com o mesmo texto: aqui o texto sempre troca
const TEXTO = esmaece('ds-primario-texto')        // o texto novo do primário, no lugar
const SEM_ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }, { prop: 'opacity', em: 'ds-primario-antes' }]
const FOLHA = { prop: 'transform', ms: 200, em: 'ds-folha', curva: C }
// os tempos, medidos a partir do passo de antes: o da gravação (1,2 s), o da releitura (0,8 s)
const GRAVA = [950, 1450]                         // menos o que os passos de antes levaram (o chega, o ve)
const RELE = [550, 1050]
const DO_TOQUE = [1250, 1800]                     // a Limpeza conferida: os 150 da troca, um passo pra começar e os 12 dela
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
const CONCLUIDA = '04-momento-cadeia-concluida'
const ANTES = '05-momento-o-que-vai-ser-gravado'
const ESCOLHER = '08-momento-manutencao-escolher-o-bloco'
const SERVIDOR = '11-momento-conferindo-o-servidor'
const REENVIANDO = '09-momento-manutencao-reenviando'
const GRAVANDO = ['21-momento-gravando-a-limpeza', '22-momento-gravando-o-ativo', '23-momento-gravando-as-cercas', '24-momento-conferindo-as-cercas',
  '25-momento-gravando-os-eventos', '26-momento-gravando-a-conexao']
// o vínculo de manutenção que a T06 grava, num módulo já configurado (o mesmo do reenvio.mjs)
const ESTADO = `
  const el = document.querySelector('.t04, .t09'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value; const e = estado.etapas`
const MANUTENCAO = `${ESTADO}
  despachar({ tipo: 'mesclar', parcial: { etapas: { ...e, ativo: { ...(e.ativo ?? {}), modo: 'manutencao' }, cadeia: { confirmados: 6 } } } })
  despachar({ tipo: 'ir', tela: 'T09' })
  return true`
// o diagnóstico do módulo da sessão leu mensagens que ele ainda não enviou (o que a T07 grava, pelo caso
// mensagens-pendentes: 12)
// a prova do servidor que não veio (a 12): a cadeia gravada, e o ainda não no estado único, no par do herói
const AINDA_NAO = `${ESTADO}
  despachar({ tipo: 'mesclar', parcial: { etapas: { ...e, ativo: { ...(e.ativo ?? {}), modo: 'instalacao' }, cadeia: { confirmados: 6, servidor: 'ainda-nao' } } } })
  despachar({ tipo: 'ir', tela: 'T09' })
  return true`
const MENSAGENS = `${ESTADO}
  despachar({ tipo: 'mesclar', parcial: { etapas: { ...e, preChecagem: { ...(e.preChecagem ?? {}), moduloSerial: 'M2C-0417', mensagens: 12 } } } })
  return true`
const ESTADOS = ['01-estado-bloco-recusado', '02-estado-queda-na-cadeia', '03-estado-recuperacao-ate-a-conexao-gravar',
  '06-estado-a-configuracao-nao-cabe', '07-estado-pontos-de-cerca-demais', '12-estado-o-modulo-ainda-nao-falou-com-o-servidor',
  '27-estado-mensagens-que-o-modulo-nao-enviou', '31-estado-bloco-recusado-de-novo', '35-estado-o-modulo-nao-voltou']
// decisão 64: os quadros novos que abrem pelo endereço (e pela coluna, parados)
const NADA = '28-momento-manutencao-pelo-menu-nada-escolhido'
const ESPERANDO = '29-momento-esperando-o-envio'
const MENOS_CONEXAO = '30-momento-o-que-vai-ser-gravado-menos-a-conexao'
const FOLHA_SO = '32-momento-folha-gravar-so-a-conexao'
const SO_CONEXAO = '33-momento-gravando-so-a-conexao'
const SERVIDOR_MANUTENCAO = '34-momento-manutencao-conexao-conferindo-o-servidor'
const NOVOS = [NADA, ESPERANDO, MENOS_CONEXAO, FOLHA_SO, SO_CONEXAO, SERVIDOR_MANUTENCAO]
// o par de um caso na sessão da faixa, com o vínculo da instalação nova (o que a T05 e a T06 gravariam): o
// do bloco-recusado (o QJF-2C61 com o M2C-0301) e o do conteudo-nao-cabe (o OCT-2J85 com o M2C-0394)
const PAR = (ativoId, moduloSerial) => `${ESTADO}
  despachar({ tipo: 'mesclar', parcial: { sessao: { ...estado.sessao, ativoId: '${ativoId}', moduloSerial: '${moduloSerial}' }, etapas: { ...e, ativo: { ...(e.ativo ?? {}), modo: 'instalacao' }, cadeia: null } } })
  despachar({ tipo: 'ir', tela: 'T09' })
  return true`
// nada rola: o miolo da T09 cabe no quadro (decisão 61)
const CABE = { executa: `const m = document.querySelector('.t09 .tela-miolo'); return (m.scrollTop === 0 && m.scrollHeight <= m.clientHeight) || 'o miolo rola: ' + m.scrollTop + ' · ' + m.scrollHeight + ' em ' + m.clientHeight` }

export default [
  // ── abre parada: no print, nos estados da coluna e nos momentos pelo endereço ──
  ...['', `&momento=${CONCLUIDA}`, `&momento=${ANTES}`, `&momento=${ESCOLHER}`, `&momento=${REENVIANDO}`, `&momento=${SERVIDOR}`,
    ...GRAVANDO.map((m) => `&momento=${m}`), ...NOVOS.map((m) => `&momento=${m}`), ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T09${q}&print=1` }, ...PARADA, CABE]),
  // no print, a cadeia não anda: passados mais de dez passos, o Leitor ainda grava, em 2 de 4 ajustes
  { abre: '?tela=T09&print=1' },
  { dorme: 1200 },
  { quieto: true },
  { ve: 'Leitor\ngravando', ms: 200 },
  { ve: '2 de 4 ajustes\nfaltam ~3 s', ms: 200 },
  { ve: '3 de 6', ms: 200 },
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T09&estado=${e}` }, ...PARADA]),
  // os quadros pelo endereço, no valor da referência
  { abre: `?tela=T09&momento=${GRAVANDO[0]}&print=1` },
  { ve: 'apagando tudo\nfaltam ~10 s' },
  { ve: '0 de 6' },
  { abre: `?tela=T09&momento=${GRAVANDO[3]}&print=1` },
  { ve: 'Cercas\nconferindo' },
  { ve: '80 de 120 pontos\nfaltam ~8 s' },
  { abre: `?tela=T09&momento=${SERVIDOR}&print=1` },
  { ve: 'O módulo falou com o servidor\nconferindo · 12 s' },
  { ve: '5 de 6' },
  // as travas do envio, pelo caso: o aviso diz o número e o que o módulo guarda, no lugar das linhas de checagem
  { abre: `?tela=T09&estado=${ESTADOS[3]}` },
  { ve: 'NÃO CABE NO MÓDULO' },
  { ve: 'São 131 contadores. Nenhum VL06 guarda mais que 127.' }, // contadores, os números do caso, e o limite do modelo
  { naoVe: 'ocupação de pinos confere' },
  { ve: 'Cercas\nnenhuma' },
  { ve: 'Leitor\nfios azul e amarelo' },
  { ve: 'Procurar outro módulo' },
  { abre: `?tela=T09&estado=${ESTADOS[4]}` },
  { ve: 'NÃO CABE NO MÓDULO' },
  { ve: 'São 5.980 pontos de cerca e 240 cartões. Nenhum VL06 guarda mais que 6.143.' }, // a memória que os pontos e os cartões dividem
  { ve: 'Cercas\nnão cabe' },
  { naoVe: 'cabe no módulo' },
  { abre: `?tela=T09&estado=${ESTADOS[1]}` },
  { ve: 'Leitor\npausado' },
  { ve: 'parou em 2 de 4 ajustes\nretoma daqui' },
  { abre: `?tela=T09&estado=${ESTADOS[5]}` },
  { ve: 'O módulo falou com o servidor\nainda não' },
  { ve: '1 · Chip — da TIM, no encaixe de cima, ativo' },
  { ve: '2 · Lugar do módulo — fora de caixa de metal' },
  { abre: `?tela=T09&estado=${ESTADOS[6]}` },
  { ve: 'A limpeza apaga as 12 mensagens que o módulo ainda não enviou.' },
  // decisão 64: os desfechos e os quadros novos, parados no valor da referência
  { abre: `?tela=T09&estado=${ESTADOS[7]}` },
  { ve: 'A CADEIA PAROU DE NOVO' },
  { ve: 'Cercas foi recusado duas vezes. Os três seguintes nem começaram.' },
  { ve: 'Gravar só a conexão e encerrar' },
  { abre: `?tela=T09&estado=${ESTADOS[8]}` },
  { ve: 'O MÓDULO NÃO VOLTOU' },
  { ve: 'Se não voltar, acione o gestor: ele está zerado, sem a conexão.' },
  { ve: 'Reconectar' },
  { abre: `?tela=T09&momento=${NADA}&print=1` },
  { desligado: 'Escolha um bloco' },
  { abre: `?tela=T09&momento=${ESPERANDO}&print=1` },
  { ve: 'o módulo enviando · 5 de 12 mensagens' },
  { abre: `?tela=T09&momento=${MENOS_CONEXAO}&print=1` },
  { ve: 'apaga a configuração · a rede do módulo continua' },
  { ve: 'Conexão\nfica como está\nTIM · timbrasil.br · não é reenviada' },
  { abre: `?tela=T09&momento=${FOLHA_SO}&print=1` },
  { ve: 'Gravar só a conexão encerra sem terminar a instalação.' },
  { ve: 'As cercas, o leitor e os eventos ficam por gravar, e o motivo fica registrado pro gestor.' },
  { abre: `?tela=T09&momento=${SO_CONEXAO}&print=1` },
  { ve: 'SÓ A CONEXÃO' },
  { ve: 'Leitor\npulado' },
  { ve: '2 de 3 ajustes\nfaltam ~3 s' },
  { desligado: 'Gravando · não interrompa' },
  { abre: `?tela=T09&momento=${SERVIDOR_MANUTENCAO}&print=1` },
  { ve: 'a conexão apagada · a nova grava em seguida' },
  { ve: 'O módulo falou com o servidor\nconferindo · 12 s' },
  { ve: '1 de 2' },
  { abre: `?tela=T09&momento=${CONCLUIDA}` },
  ...PARADA,
  { ve: 'CONFERIDO NO MÓDULO\n6 passos' },
  { ve: '6 de 6' },

  // ── pelo endereço: a tela abre parada no que vai ser gravado, e o endereço diz o 05 ──
  { abre: '?tela=T09' },
  { chega: 'T09', momento: ANTES },
  { quieto: true },
  { ve: 'Limpeza\nprimeiro' },
  { ve: 'zera o módulo · a rede volta no último passo' },
  { ve: 'cabe no módulo · 96 de 127 contadores' },
  { fica: 'T09', ms: 1300 },                                     // nada grava antes do toque
  { quieto: true },
  { naoVe: 'gravando' },
  // Gravar no módulo (sem mensagens por enviar, a folha não abre): o quadro troca inteiro, e a cadeia
  // corre pela Limpeza, depois do esmaecer · a barra anda um passo, linear, em 100
  { toca: 'Gravar no módulo', anima: TROCA, naoAnima: [GLIFO] },
  { chega: 'T09', momento: GRAVANDO[0] },
  { ve: 'Limpeza\ngravando' },
  { ve: 'apagando tudo' },
  { ve: '0 de 6' },
  { dorme: 400 },
  { anima: [BARRA] },
  { ve: 'Ativo\ngravando', entre: [800, 1300] },                 // a Limpeza conferida: 1,2 s dela e o passo que começa, menos os 400 de cima
  { anima: [GLIFO, LINHA, TRILHO, BARRA] },                      // o check, o que gravou, o trilho que acende, e a barra do Ativo
  // os tempos, um atrás do outro (cada passo do roteiro conta a partir do de antes); o que fica, depois
  { ve: 'Ativo\nconferindo', entre: GRAVA },                     // gravado, ele relê na mesma barra, do zero
  { ve: 'Cercas\ngravando', entre: RELE },                       // relido, confere
  { ve: 'Cercas\nconferindo', entre: GRAVA },
  { ve: 'Leitor\ngravando', entre: RELE },
  { chega: 'T09', momento: null },                               // a 00, a tela: o Leitor gravando
  { ve: 'Limpeza\nconfere' },
  { ve: 'módulo zerado · a rede volta no último passo' },
  { ve: 'RKT-8H42 · 6 sinais da CAN' },
  { ve: '4 regiões · 120 pontos' },
  { ve: 'de 4 ajustes' },
  { ve: '3 de 6' },
  CABE,
  { dorme: 200 },                                                 // o trilho das Cercas acaba de acender (300)

  // ── a recuperação: o ENCERRAR antes de a Conexão gravar ──
  { toca: 'ENCERRAR', anima: [esmaece('ds-aviso'), TEXTO, GLIFO], naoAnima: [ACENDE] },   // o aviso no topo, o primário que acende com o texto novo, a pausa no poço
  { ve: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },
  { ve: '3 de 6' },
  { ve: 'Leitor\npausado' },
  { ve: 'retoma daqui' },
  { executa: `window.__parou = [...document.querySelectorAll('.t09 .ds-cadeia-conta span')][0].innerText; return /^parou em \\d de 4 ajustes$/.test(window.__parou) || window.__parou` },
  { desligado: 'ENCERRAR' },
  { dorme: 250 },
  { quieto: true },
  { fica: 'T09', ms: 1300 },                                      // a cadeia parada: nada anda
  { quieto: true },
  { executa: `return [...document.querySelectorAll('.t09 .ds-cadeia-conta span')][0].innerText === window.__parou || 'a contagem andou parada'` },
  // retomar: o primário se apaga direto, e o texto novo esmaece no lugar; a cadeia segue da mesma contagem
  { toca: 'Continuar a gravação', anima: [TEXTO, GLIFO], naoAnima: SEM_ROXO },
  { naoVe: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },
  { executa: `return window.__parou.replace('parou em ', '') === [...document.querySelectorAll('.t09 .ds-cadeia-conta span')][0].innerText || 'não retomou da mesma contagem'` },
  { desligado: 'Gravando · não interrompa' },
  // o voltar do Android (o Esc) faz o mesmo que o ENCERRAR antes de a Conexão gravar
  { tecla: 'Escape' },
  { anima: [esmaece('ds-aviso'), TEXTO], naoAnima: [ACENDE] },
  { ve: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },
  { dorme: 250 },
  { toca: 'Continuar a gravação', naoAnima: SEM_ROXO },
  { ve: 'Eventos\ngravando', ms: 3000 },                         // o Leitor relido
  { ve: 'fios azul e amarelo · 4 ajustes' },
  { chega: 'T09', momento: GRAVANDO[4] },
  { ve: 'Conexão\ngravando', entre: [1850, 2250] },               // os Eventos gravados e relidos, 2 s
  { ve: '12 eventos · intervalo 30 s' },
  { ve: '5 de 6' },
  { chega: 'T09', momento: GRAVANDO[5] },
  { ve: 'de 3 ajustes' },
  // a Conexão gravada: o módulo confere se falou com o servidor, sem barra, e o tempo dele conta no lugar
  { chega: 'T09', momento: SERVIDOR, entre: GRAVA },
  { ve: 'O módulo falou com o servidor\nconferindo ·' },
  { ve: 'TIM · timbrasil.br' },
  { ve: '5 de 6' },
  { desligado: 'Gravando · não interrompa' },
  { ve: 'conferindo · 12 s', ms: 1400 },
  // falou: a cadeia conclui — o check, a faixa no lugar, o contador lima e o primário que acende
  { chega: 'T09', momento: CONCLUIDA, ms: 600 },
  { anima: [GLIFO, { prop: 'opacity', ms: 200, em: 'ds-aviso', curva: C }, TEXTO], naoAnima: [ACENDE, ...TROCA] },   // o endereço que passa ao 04 não é troca
  { ve: 'CONFERIDO NO MÓDULO\n6 passos' },
  { ve: 'O módulo falou com o servidor\nsim' },
  { ve: '6 de 6' },
  { executa: `const c = document.querySelector('.t09 .ds-cabecalho-contador'); return c.classList.contains('ds-cabecalho-contador-veredito') || 'o contador não ficou lima'` },
  { dorme: 450 },
  CABE,                                                           // nada rola: a faixa e a cadeia cabem
  { quieto: true },
  // o caminho segue sem o menu (decisão 64): Ler a CAN, a troca entre telas (o topo fica: só o miolo esmaece)
  { naoToca: 'Voltar ao menu' },
  { toca: 'Ler a CAN', anima: [esmaece('tela-miolo')] },
  { chega: 'T07', momento: '01-momento-can-lida' },
  { dorme: 250 },
  // e o Voltar ao menu mora no voltar do Android
  { abre: `?tela=T09&momento=${CONCLUIDA}` },
  { tecla: 'Escape' },
  { chega: 'T04' },
  { dorme: 250 },

  // ── a folha das mensagens (27): o diagnóstico leu 12 mensagens por enviar no módulo da sessão ──
  { abre: '?tela=T09' },
  { chega: 'T09', momento: ANTES },
  { executa: MENSAGENS },
  { toca: 'Gravar no módulo', anima: [FOLHA] },                   // a folha sobe, a cadeia não começa
  { ve: 'A limpeza apaga as 12 mensagens que o módulo ainda não enviou.' },
  { ve: 'Com sinal, ele envia sozinho em poucos minutos.' },
  { chega: 'T09', momento: ANTES },
  { dorme: 300 },
  { toca: 'Esperar o envio', anima: [{ prop: 'transform', ms: 150, em: 'ds-folha' }] },   // fecha, e o envio conta embaixo do espaço (29)
  { naoVe: 'A limpeza apaga as 12 mensagens' },
  { chega: 'T09', momento: ESPERANDO },
  { ve: 'o módulo enviando · 5 de 12 mensagens' },
  { fica: 'T09', ms: 800 },
  { naoVe: 'gravando' },
  { ve: 'Limpeza\nprimeiro' },
  // antes de o envio terminar, o Gravar no módulo pergunta de novo, com as que ainda faltam
  { toca: 'Gravar no módulo' },
  { ve: 'A limpeza apaga as 7 mensagens que o módulo ainda não enviou.' },
  { dorme: 300 },
  // Gravar mesmo assim: a folha desce, e a cadeia começa depois dela
  { toca: 'Gravar mesmo assim', anima: [{ prop: 'transform', ms: 150, em: 'ds-folha' }], naoAnima: [esmaece('tela-miolo')] },
  { ve: 'Limpeza\ngravando', entre: [100, 700] },
  // o endereço acompanha a etapa da vez: 21, 22, 23, 24 (as cercas relendo), e a 00 no Leitor
  { chega: 'T09', momento: GRAVANDO[0] },
  { chega: 'T09', momento: GRAVANDO[1], ms: 2500 },
  { ve: '1 de 6' },
  { ve: 'sinais da CAN' },
  { chega: 'T09', momento: GRAVANDO[2], ms: 2500 },
  { ve: '2 de 6' },
  { ve: 'de 120 pontos' },
  { chega: 'T09', momento: GRAVANDO[3], ms: 2500 },
  { chega: 'T09', momento: null, ms: 2500 },
  { toca: 'ENCERRAR' },
  { ve: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },

  // ── pelo menu (o estado de novo, sem nada gravado): a troca entre telas, e a tela parada no 05 ──
  { abre: '?tela=T04' },
  { toca: 'Entendi' },
  { dorme: 250 },
  { toca: 'Configurar módulo', anima: TROCA, naoAnima: [GLIFO] },
  { chega: 'T09', momento: ANTES },
  { dorme: 250 },
  { quieto: true },
  { fica: 'T09', ms: 1300 },
  { naoVe: 'gravando' },
  // antes de gravar, o voltar é o Voltar ao menu
  { tecla: 'Escape' },
  { chega: 'T04' },

  // ── a manutenção: escolher o bloco (08) e a cadeia curta (09) ──
  // a entrada viva é o vínculo de manutenção que a T06 grava (os exemplos dela são
  // consultas paradas), semeado como no reenvio.mjs · os eventos não têm dependente: sem folha,
  // e o resto fica como está · as cercas, com a folha e a pergunta pelos dependentes, são do reenvio.mjs
  { abre: '?tela=T04' },
  { chega: 'T04' },
  { executa: MANUTENCAO },
  // pelo menu, nada escolhido (decisão 64, a 28): o primário apagado diz o que falta
  { chega: 'T09', momento: NADA },
  { quieto: true },
  { ve: 'MANUTENÇÃO\nReenvie um bloco por vez. A limpeza apaga só o que você escolher.' },
  { ve: 'Cercas\nas regiões geográficas\n4 regiões' },
  { desligado: 'Escolha um bloco' },
  { toca: 'Eventos' },                                            // o toque marca, e o Reenviar dele acende (a 08)
  { chega: 'T09', momento: ESCOLHER },
  { toca: 'Reenviar os eventos', anima: TROCA, naoAnima: [GLIFO] },
  { chega: 'T09', momento: REENVIANDO },
  { ve: 'Limpeza\ngravando' },
  { ve: 'apagando os eventos' },
  { ve: '0 de 2' },
  { ve: 'Eventos\ngravando', entre: DO_TOQUE },                  // a limpeza só dos eventos, conferida
  { anima: [GLIFO, LINHA, TRILHO, BARRA] },
  { ve: 'Reenviando só os eventos.' },
  { ve: 'Limpeza\nconfere' },
  { ve: 'os eventos apagados · a rede do módulo continua' },
  { ve: '1 de 2' },
  { ve: 'Ativo, Cercas, Leitor e Conexão ficam como estão.' },
  { desligado: 'ENCERRAR' },                                      // a curta termina sozinha: o ENCERRAR apagado (lei 17)
  { tecla: 'Escape' },
  { fica: 'T09', ms: 300 },                                       // e o voltar não faz nada
  { toca: 'Voltar ao menu', entre: [1200, 2300] },                // os eventos gravados e relidos: o primário acende com a saída
  { chega: 'T04' },

  // ── a Conexão reenviada na manutenção espera o servidor, como na instalação nova (decisão 64, a 34) ──
  { abre: '?tela=T04' },
  { chega: 'T04' },
  { executa: MANUTENCAO },
  { chega: 'T09', momento: NADA },
  { toca: 'Conexão' },
  { toca: 'Reenviar a conexão', anima: TROCA },                   // sem dependente: sem folha
  { chega: 'T09', momento: REENVIANDO },
  { ve: 'apagando a conexão' },
  { chega: 'T09', momento: SERVIDOR_MANUTENCAO, ms: 6000 },
  { ve: 'a conexão apagada · a nova grava em seguida' },
  { ve: 'O módulo falou com o servidor\nconferindo ·' },
  { ve: '1 de 2' },
  { desligado: 'ENCERRAR' },                                      // termina sozinha: o ENCERRAR apagado
  { tecla: 'Escape' },
  { fica: 'T09', ms: 300 },                                       // e o voltar não faz nada
  { ve: 'O módulo falou com o servidor\nsim', ms: 3000 },
  { ve: '2 de 2' },
  { ve: 'Conexão confere.' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },

  // ── o recusado de novo (decisão 64, a 31 a 33): o par do bloco-recusado, na instalação nova ──
  { abre: '?tela=T04' },
  { chega: 'T04' },
  { executa: PAR('a-02', 'M2C-0301') },
  { chega: 'T09', momento: ANTES },
  { toca: 'Gravar no módulo' },
  { ve: 'A CADEIA PAROU', ms: 9000 },                              // as Cercas relidas não conferem: a primeira recusa
  { naoVe: 'A CADEIA PAROU DE NOVO' },
  { naoVe: 'Gravar só a conexão e encerrar' },                    // a primeira recusa continua só com o Tentar de novo
  { toca: 'Tentar de novo' },
  { ve: 'A CADEIA PAROU DE NOVO', ms: 4000 },                     // recusadas de novo
  { ve: 'Cercas foi recusado duas vezes. Os três seguintes nem começaram.' },
  { ve: 'Gravar só a conexão e encerrar' },
  // o voltar e o ENCERRAR abrem a folha que confirma, e não a recuperação
  { tecla: 'Escape' },
  { chega: 'T09', momento: FOLHA_SO },
  { ve: 'Gravar só a conexão encerra sem terminar a instalação.' },
  { naoVe: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },
  { dorme: 300 },
  { toca: 'Cancelar' },
  { naoVe: 'Gravar só a conexão encerra sem terminar a instalação.' },
  { ve: 'A CADEIA PAROU DE NOVO' },
  { toca: 'ENCERRAR' },
  { chega: 'T09', momento: FOLHA_SO },
  { dorme: 300 },
  // confirmado: só a Conexão grava, os que ficam por gravar, pulados; depois, os 4 passos
  { toca: 'Gravar só a conexão e encerrar' },
  { chega: 'T09', momento: SO_CONEXAO },
  { ve: 'SÓ A CONEXÃO' },
  { ve: 'Leitor\npulado' },
  { ve: 'Eventos\npulado' },
  { ve: 'Conexão\ngravando' },
  { desligado: 'Gravando · não interrompa' },
  { desligado: 'ENCERRAR' },
  { tecla: 'Escape' },
  { fica: 'T09', ms: 300 },
  { chega: 'T16', momento: '03-momento-encerrando-sem-homologar', ms: 6000 },

  // ── o Procurar outro módulo das travas do envio: o diálogo, os 4 passos, e a busca (decisão 64) ──
  { abre: '?tela=T04' },
  { chega: 'T04' },
  { executa: PAR('a-10', 'M2C-0394') },
  { chega: 'T09', momento: ANTES },
  { ve: 'São 131 contadores. Nenhum VL06 guarda mais que 127.' },
  { toca: 'Procurar outro módulo' },
  { ve: 'Encerrar antes de terminar?' },
  { toca: 'Encerrar mesmo assim' },
  { chega: 'T16', momento: '03-momento-encerrando-sem-homologar' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido', ms: 6000 },

  // ── o Conferir de novo da 12 (decisão 64): a prova do servidor que não veio fica no estado único (o que a
  // T09 grava na 12; no fluxo do palco, ela só abre pela coluna, parada) — a T09 reaberta volta nela, viva, e
  // o Conferir de novo tira o ainda não: o conferindo volta (a 11), até o sim (a 04) ──
  { abre: '?tela=T04' },
  { chega: 'T04' },
  { executa: AINDA_NAO },
  { chega: 'T09' },
  { ve: 'O módulo falou com o servidor\nainda não' },
  { tecla: 'Escape' },                                            // o voltar é o Voltar ao menu, e a prova continua por vir
  { chega: 'T04' },
  { executa: `${ESTADO}
  despachar({ tipo: 'ir', tela: 'T09' })
  return true` },
  { ve: 'O módulo falou com o servidor\nainda não' },
  { toca: 'Conferir de novo', anima: [esmaece('ds-cadeia-extra-valor')] },
  { chega: 'T09', momento: SERVIDOR },
  { ve: 'O módulo falou com o servidor\nconferindo ·' },
  { naoVe: 'O QUE CONFERIR' },
  { chega: 'T09', momento: CONCLUIDA, ms: 3000 },
  { ve: 'O módulo falou com o servidor\nsim' },

  // ── com reduzir movimento: o mesmo ritmo, e nada anda — a barra salta pro valor de cada passo ──
  { reduzir: true },
  { abre: '?tela=T09' },
  { chega: 'T09', momento: ANTES },
  { quieto: true },
  { toca: 'Gravar no módulo' },
  { quieto: true },
  { dorme: 500 },
  { quieto: true },
  { ve: 'Ativo\ngravando', entre: [600, 1300] },
  { quieto: true },
  { toca: 'ENCERRAR' },
  { quieto: true },
  { ve: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },
  { toca: 'Continuar a gravação' },
  { quieto: true },
  { ve: 'Ativo\nconferindo', ms: 1600 },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna abre parado; a volta ao fluxo e o pulo, no 05 · com os
  // quadros da decisão 64, a coluna da T09 tem 26 linhas, e as duas últimas (a 30 e a 34) ficam fora dela: o
  // roteiro as abre pelo endereço, no começo ──
  { abre: '?tela=T09' },
  { janela: [1440, 900] },
  { chega: 'T09', momento: ANTES },
  { quieto: true },
  { palco: 'Bloco recusado' },
  { chega: 'T09', estado: ESTADOS[0] },
  ...PARADA,
  { palco: 'Queda na cadeia' },
  { chega: 'T09', estado: ESTADOS[1] },
  ...PARADA,
  { palco: 'Recuperação até a Conexão gravar' },
  { chega: 'T09', estado: ESTADOS[2] },
  ...PARADA,
  { palco: 'A configuração não cabe' },
  { chega: 'T09', estado: ESTADOS[3] },
  ...PARADA,
  { palco: 'Pontos de cerca demais' },
  { chega: 'T09', estado: ESTADOS[4] },
  ...PARADA,
  { palco: 'Ainda não falou com o servidor' },   // só pela coluna
  { chega: 'T09', estado: ESTADOS[5] },
  { ve: 'O módulo falou com o servidor\nainda não' },
  ...PARADA,
  { palco: 'Mensagens por enviar' },
  { chega: 'T09', estado: ESTADOS[6] },
  { ve: 'Gravar mesmo assim' },
  ...PARADA,
  { palco: 'Esperando o envio' },
  { chega: 'T09', estado: ESPERANDO },
  { ve: 'o módulo enviando · 5 de 12 mensagens' },
  ...PARADA,
  { palco: 'Recusado de novo' },
  { chega: 'T09', estado: ESTADOS[7] },
  ...PARADA,
  { palco: 'Confirmar só a conexão' },
  { chega: 'T09', estado: FOLHA_SO },
  ...PARADA,
  { palco: 'Gravando só a conexão' },
  { chega: 'T09', estado: SO_CONEXAO },
  ...PARADA,
  { palco: 'O módulo não voltou' },
  { chega: 'T09', estado: ESTADOS[8] },
  ...PARADA,
  { palco: 'Manutenção · pelo menu' },
  { chega: 'T09', estado: NADA },
  ...PARADA,

  { palco: 'Voltar ao fluxo' },
  { chega: 'T09', estado: null },
  { quieto: true },
  { ve: 'Gravar no módulo' },
  { abre: '?tela=T04' },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },   // o painel desliza da esquerda: o toque espera ele parar no lugar
  { palco: 'T09' },
  { chega: 'T09', momento: ANTES },
  { quieto: true },
  { fica: 'T09', ms: 1300 },
  { naoVe: 'gravando' },
]
