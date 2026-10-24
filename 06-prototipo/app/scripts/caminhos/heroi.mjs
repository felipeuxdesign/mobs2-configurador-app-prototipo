// O caminho do herói inteiro (logica.md, "O caminho do herói"), só por toque:
// do login às 14:30 ao encerramento, e de volta ao menu sem sessão.
export default [
  { abre: '' },
  { chega: 'T01', momento: null },
  { ouve: '9:30 · Wi-Fi, sinal e bateria' }, // a hora vem desenhada na barra oficial
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  // o contexto é a empresa (decisão 56): o herói tem três empresas, e escolhe a dele —
  // a 00, nada escolhido, e o 01, a Viação marcada — e o Sincronizar baixa o pacote dela
  { chega: 'T02', momento: null },
  { ve: 'Pra qual empresa hoje?' },
  { desligado: 'Escolha uma empresa' },
  { marca: 'Viação Atlântico Sul' },
  { chega: 'T02', momento: '01-momento-escolhida' },
  { fica: 'T02', ms: 600 },
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { chega: 'T03', momento: '02-momento-concluido', entre: [3000, 6000] },
  { ve: 'Pacote de hoje' },
  { ve: 'de 49' },   // os 49 itens do pacote da empresa, em cinco grupos
  { toca: 'Ir para o menu' },
  { chega: 'T04' },
  { ve: 'Sem sessão de configuração' },
  // o herói está no 5º dia do acesso: o aviso na primeira chegada ao menu, uma vez (T04/12)
  { ve: 'Seu acesso vence em 2 dias' },
  { dorme: 200 },
  { quieto: true },   // nasce aberto, com o menu: a chegada não anima
  { ve: 'Depois disso, ele pede a senha de novo — e pra isso precisa de rede.' },
  { naoToca: 'CONECTAR MÓDULO' },   // o menu atrás do véu não se toca
  { toca: 'Entendi', anima: [{ prop: 'opacity', ms: 150, em: 'ds-dialogo' }, { prop: 'opacity', ms: 150, em: 'ds-veu' }] },
  { naoVe: 'Seu acesso vence em 2 dias' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  // conectar: a lista, marcar o do herói e o botão (R-14); a T05 só conecta
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { ve: 'Escolha o que está na sua mão.' },
  { marca: 'M2C-0417' },
  { fica: 'T05', ms: 600 },
  { toca: 'Conectar ao M2C-0417' },
  // o diagnóstico do módulo (T07): as nove linhas acendem, uma a cada 600 ms; passando sem
  // trava, a faixa desce, e o primário diz Selecionar ativo · a CAN ainda não aparece
  { chega: 'T07', momento: null },
  { naoVe: 'M2C-0417 · RKT-8H42' },   // a leitura (a 11): nada em cima do título
  { naoVe: 'ENCERRAR' },
  { ve: 'Diagnóstico do módulo' },
  { desligado: 'Lendo · não saia da tela' },
  { ve: 'ENCERRAR', entre: [3500, 6500] },
  { ve: '8 de 8' },
  { ve: 'M2C-0417' },   // o serial na faixa: o rótulo de cima sai quando ela desce
  { ve: 'sem ativo' },
  { naoVe: 'M2C-0417 · RKT-8H42' },
  { ve: 'Serial no cadastro' },
  { ve: 'VL06 CAN-BT' },
  { ve: '8.04' },
  { ve: 'faixa 9,0 a 40,0 V' },
  { ve: '24,3 V' },   // o herói é um ônibus de 24 V
  { ve: 'antena conectada' },   // o GPS é a antena, e os satélites embaixo, informação
  { ve: '9 satélites' },
  { ve: 'ignição ligada' },
  { ve: 'na rede' },
  { ve: '0 mensagens ainda não enviadas' },
  { naoVe: 'A CAN' },   // antes do bloco do ativo, a CAN não aparece (decisão 61)
  { toca: 'Selecionar ativo' },
  { chega: 'T06', momento: null },
  { ve: 'M2C-0417' },
  // o ônibus: marcar o RKT-8H42 e o botão (R-14); a confirmação do vínculo
  { marca: 'RKT-8H42' },
  { fica: 'T06', ms: 600 },
  { naoVe: 'Confirmar o vínculo', ms: 300 },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'Confirmar o vínculo' },
  { ve: 'ESCOLHIDO' },
  { ve: 'frota 1003' },
  { ve: 'Mercedes-Benz' },
  { ve: 'OF-1621 · ônibus urbano' },
  { ve: 'O M2C-0417 fica neste ativo, na Viação Atlântico Sul.' },
  { toca: 'Vincular o módulo' },
  // o que vai ser gravado (T09/05): a tela abre parada, e nada grava antes do toque
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { ve: 'RKT-8H42' },
  { ve: 'ocupação de pinos confere' },
  { ve: 'cabe no módulo · 96 de 127 contadores' },
  { ve: 'OF-1621' },
  { ve: '4 regiões' },
  { ve: 'fios azul e amarelo' },   // o leitor, pelos fios do cadastro do modelo (decisão 59)
  { ve: 'intervalo 30 s' },
  { ve: 'TIM · timbrasil.br' },   // a conexão, a operadora e a APN do chip
  { fica: 'T09', ms: 600 },
  { naoVe: 'gravando' },
  // a cadeia grava e confere etapa por etapa, da Limpeza à Conexão: 2 s cada uma (1,2 s a Limpeza),
  // com a barra, a contagem e o que falta; o endereço acompanha a etapa da vez (21 a 26)
  { toca: 'Gravar no módulo' },
  { chega: 'T09', momento: '21-momento-gravando-a-limpeza' },
  { desligado: 'Gravando · não interrompa' },
  // depois da Conexão gravada, o módulo prova que falou com o servidor (11), e a cadeia fecha (04): uns 12 s
  { chega: 'T09', momento: '11-momento-conferindo-o-servidor', entre: [9200, 11500] },
  { ve: 'O módulo falou com o servidor\nconferindo' },
  { chega: 'T09', momento: '04-momento-cadeia-concluida', entre: [800, 1800] },
  { ve: 'O módulo falou com o servidor\nsim' },
  { ve: 'CONFERIDO NO MÓDULO\n6 passos' },
  { ve: '6 de 6' },
  { ve: 'RKT-8H42 · 6 sinais da CAN' },
  { ve: 'fios azul e amarelo · 4 ajustes' },
  // o caminho segue sem voltar ao menu (decisão 64): a cadeia concluída leva à CAN lida, que o bloco do
  // ativo acabou de liberar · o Voltar ao menu fica no voltar do Android
  { naoToca: 'Voltar ao menu' },
  { toca: 'Ler a CAN' },
  { chega: 'T07', momento: '01-momento-can-lida' },
  { ve: 'RKT-8H42' },
  { ve: 'Conferido na conexão' },
  { naoVe: 'Velocidade' },   // a velocidade não vem da CAN (só a T10 a pede, opcional)
  { ve: '14 de 14' },   // 8 do módulo + os 6 da biblioteca da CAN
  { ve: 'A CAN · ÔNIBUS URBANO OF-1621' },
  { ve: 'Rotação' },
  { ve: '482.317 km' },   // o hodômetro do painel: o ônibus não calibra
  { ve: '9.640 h' },
  { ve: '83.780 L' },
  { ve: 'Ler de novo' },
  { naoToca: 'Voltar ao menu' },
  // a calibração, direto da CAN lida: o ônibus lê pela CAN o que o painel mostra, e não calibra
  // nada — a tela diz e aponta o ciclo de testes (T10/11)
  { toca: 'Calibrar' },
  { chega: 'T10', momento: null },
  { ve: 'Nada a calibrar' },
  { ve: 'Rotação e hodômetro vêm direto do veículo.' },
  { naoVe: 'O MÓDULO CONTA' },
  { ve: 'Voltar ao menu' },
  { toca: 'Fazer o ciclo de testes' },
  // o ciclo de testes: no máximo quatro passos, com o ônibus parado; a
  // fila do módulo drena em 3 s, e o disparo acende
  { chega: 'T14' },
  { ve: 'Ciclo de testes' },
  { ve: 'FILA DRENANDO' },
  { ve: '6 mensagens e 2 de diagnóstico saindo do módulo' },
  { ve: '2 de 4 passos' },   // a semente traz 2 feitos (cicloPassosNaEntrada)
  { ve: 'Ignição ligada\nRotação\nCartão do motorista\nIgnição desligada' },
  { naoVe: 'Ré acionada' },
  { naoVe: 'Velocidade' },   // o herói não tem tacógrafo digital
  { toca: 'Disparar evento de teste', entre: [2000, 4500] },
  // disparado (1 s real vale 4 s de prazo): o evento chega aos 24 s do prazo e os campos conferem aos
  // 33; o cartão é a vez (passe o cartão), e o módulo o lê aos 48 (a 08)
  { ve: 'passe o cartão' },
  { ve: 'O EVENTO CHEGOU EM', entre: [5000, 7500] },
  { ve: '0:24' },
  { ve: '6 de 6', entre: [1000, 3500] },
  { chega: 'T14', momento: '08-momento-o-modulo-leu-o-cartao', entre: [2000, 5000] },
  { ve: 'leu 9412857' },
  { ve: 'Não confere' },
  // o técnico confere com o número do cartão: a vez da ignição desligada, com a espera explicada (11)
  { toca: 'Confere com o cartão' },
  { chega: 'T14', momento: '11-momento-vez-da-ignicao-desligada' },
  { ve: '3 de 4 passos' },
  { ve: 'O módulo leva alguns segundos para perceber que a ignição foi desligada.' },
  { chega: 'T14', momento: '05-momento-ciclo-concluido', entre: [2500, 4500] },
  { ve: '4 de 4 passos' },
  { ve: '14:30:24' },
  // o checklist: a D começa vazia e enche lendo do módulo; o Finalizar diz por que está
  // desligado. Depois do ciclo, 20 de 27 (o Autoteste da D roda ao encerrar e não conta · o Painel só entra com calibração, e o ônibus não
  // calibra): falta o bip da E e as quatro fotos de B, e o servidor
  // confirma a F depois do Finalizar (como a 11 desenha)
  { toca: 'Ir para o checklist' },
  { chega: 'T13', momento: null },
  { ve: 'A Seção D ainda está sendo lida' },
  { desligado: 'Finalizar instalação' },
  { ve: 'Faltam 5 itens obrigatórios', entre: [3000, 7500] },
  { ve: '20' },
  { ve: 'de 27' },
  { ve: 'você fotografa 4 itens' },
  // a E aberta: os quatro passos conferem, e o bip se responde aqui (39 a 41)
  { toca: 'E · Ciclo de testes' },
  { chega: 'T13', momento: '05-momento-e-teste-dinamico-aberta' },
  { naoToca: 'Fazer o ciclo de testes' },
  { naoToca: 'Ignição ligada' },   // sem seta, é leitura (Lei 16)
  { toca: 'Testar bip' },
  { chega: 'T13', momento: '39-momento-bip-tocando' },
  { desligado: 'Tocando…' },
  { chega: 'T13', momento: '40-momento-bip-esperando-resposta', entre: [500, 2000] },
  { ve: 'Você ouviu o bip?' },
  { toca: 'Ouvi' },
  { chega: 'T13', momento: '41-momento-bip-ouvido' },
  { ve: 'ouvi' },
  { ve: 'Testar de novo' },   // a resposta se refaz (decisão 64): o bip respondido fica com o Testar de novo na linha
  { ve: 'o ciclo passou' },
  { toca: 'E · Ciclo de testes' },
  { chega: 'T13', momento: null },
  // a D: um bloco por linha, e depois o autoteste, o canal protegido e o ID no cadastro
  { toca: 'D · Configuração' },
  { chega: 'T13', momento: '04-momento-d-configuracao-aberta' },
  { ve: 'Canal de programação\nprotegido' },
  { ve: 'ID no cadastro' },
  { naoVe: 'Hodômetro' },
  { toca: 'D · Configuração' },
  { chega: 'T13', momento: null },
  { dorme: 250 },
  // a B cresce no lugar: os itens esmaecem, e as seções de baixo descem (transform)
  { toca: 'B · Montagem', anima: [{ prop: 'opacity', ms: 200, em: 'ds-secao-ck-corpo' }, { prop: 'transform', ms: 200, em: 'ds-secao-ck' }] },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { naoVe: 'fotografado na calibração' },   // o Painel é foto a tirar, como os outros quatro
  { toca: 'Módulo' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { ve: 'B · MONTAGEM' },
  { ve: 'Módulo fixado e posicionado' },
  { ve: 'Depois: Lado de cima do módulo livre' },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: '44-momento-foto-do-modulo-tirada' },   // a foto no quadro: o item ainda não conta (decisão 63)
  { ve: 'Foto tirada às 14:30' },
  { toca: 'Usar foto' },
  { chega: 'T13', momento: '17-momento-foto-do-lado-de-cima' },   // a foto do lado de cima (decisão 60)
  { ve: 'Lado de cima do módulo livre' },
  { ve: 'A antena GPS fica dentro, desse lado. Enquadre o módulo e o espaço acima dele.' },
  { toca: 'Tirar foto' },
  { ve: 'Foto tirada às 14:30' },
  { toca: 'Usar foto' },
  { chega: 'T13', momento: '18-momento-foto-do-chicote' },
  { ve: 'Chicote e emendas protegidos' },
  { toca: 'Tirar foto' },
  { ve: 'Foto tirada às 14:30' },
  { toca: 'Usar foto' },
  { chega: 'T13', momento: '19-momento-foto-do-leitor' },
  { ve: 'Leitor posicionado' },
  { naoVe: 'Depois:' },   // o Leitor é a última, sem o Painel
  { toca: 'Tirar foto' },
  { ve: 'Foto tirada às 14:30' },
  { toca: 'Usar foto' },
  // sem próximo por fazer, volta à Seção B aberta: 4 de 4, e as fotos tiradas
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: 'B · Montagem' },
  { ve: '4 de 4' },
  { ve: '4 fotos tiradas' },
  { naoToca: 'Módulo' },   // a foto tirada fica tirada: sem seta, não se toca
  { naoVe: 'Painel' },
  { naoVe: 'Faltam' },
  // um toque não vale por dois (decisão 64): o toque duplo no Finalizar registra o checklist, e o segundo toque não
  // cai no Encerrar sessão que nasce no mesmo lugar
  { dorme: 400 }, { toqueDuplo: 'Finalizar instalação' },
  // o fim: o checklist registrado, aguardando o autoteste — a homologação é da T16
  { chega: 'T13', momento: '11-momento-aguardando-autoteste' },
  { fica: 'T13', ms: 600 },
  { ve: 'Checklist registrado' },
  { ve: 'aguardando autoteste' },
  { ve: 'O próximo passo é encerrar a sessão. O autoteste roda durante o encerramento.' },
  { naoVe: 'homologada' },
  { ve: 'o app conferiu' },
  { ve: 'o servidor confirmou' },
  { ve: 'RKT-8H42' },
  // o Encerrar sessão, depois do checklist registrado: direto, sem o diálogo (decisão 36) — os sete
  // passos, um a cada 600 ms, com o reinício automático, e o autoteste
  { toca: 'Encerrar sessão' },
  { chega: 'T16', momento: null },
  { naoVe: 'Encerrar antes de terminar?' },
  { ve: 'Encerrar sessão' },
  { ve: 'Encerrando · não desconecte' },
  { ve: 'Contadores e estado' },
  { ve: 'Autoteste' },
  // cada passo que corre diz o que faz, embaixo do nome
  { ve: 'Grava os contadores e o estado no módulo, pra nada se perder no reinício.' },
  { naoVe: 'Grava os contadores e o estado no módulo', entre: [0, 1000] },
  // o reinício é automático: o técnico não faz nada
  { ve: 'O módulo reinicia sozinho. Leva alguns segundos.' },
  { desligado: 'Reiniciando o módulo…' },
  { ve: 'Ele lê de volta a configuração que está no módulo. É isto que prova que ela sobreviveu ao reinício.' },
  { ve: 'Devolve o módulo ao repouso que ele tinha antes da sessão.' },
  { ve: 'Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar.' },
  { ve: 'Guarda o que foi feito aqui, pra ir ao servidor junto com a instalação.' },
  { ve: 'Solta o Bluetooth. O módulo fica livre pra outro aparelho.' },
  // fechado o sétimo passo, a faixa sobe e a tela passa pra Sessão encerrada
  { chega: 'T16', momento: '07-momento-autoteste-correndo', entre: [100, 1500] },
  { ve: 'Sem sessão de configuração' },
  { naoVe: 'ENCERRAR' },
  { ve: 'Sessão encerrada' },
  // o autoteste correndo: as sete assertivas acendem a 400 ms, com os três contadores; com a última,
  // a instalação homologada (02), a única tela com a palavra, e o Voltar ao menu aceso
  { naoVe: 'INSTALAÇÃO HOMOLOGADA' },
  { desligado: 'Voltar ao menu' },
  { ve: 'INSTALAÇÃO HOMOLOGADA', entre: [2000, 5000] },
  { chega: 'T16', momento: '02-momento-instalacao-homologada' },
  { ve: 'às 14:30' },
  { ve: 'a configuração sobreviveu ao reinício' },
  { ve: '5 aprovadas · 1 não se aplica · 1 pendente' },
  { ve: 'O evento do cartão não impede a homologação.' },   // a nota numa linha: a do evento já diz o prazo
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  { ve: 'Sem sessão de configuração' },
  { naoVe: 'ENCERRAR' },
  { naoVe: 'RKT-8H42' },
  { ve: 'toque para procurar' },
  { naoVe: 'Seu acesso vence em 2 dias' },   // o aviso já foi visto: não volta no mesmo dia
  { fica: 'T04', ms: 600 },
]
