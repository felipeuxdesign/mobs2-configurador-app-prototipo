// T13 · os textos da tela, exatamente como no 02-telas/T13-checklist/textos.md.
// Onde o texto traz um dado (a contagem, a hora, o nome, o número, a placa),
// a moldura é daqui e o dado vem do mock ou do estado único, na hora de
// montar. Os nomes das seções ('A · Identificação') saem de M.checklist.secoes;
// os dos itens, de M.checklist.itens (o rótulo); os títulos do nível do item,
// das perguntas; o rótulo de topo do nível do item, da seção (AC-11).
// o bloco com o artigo, na causa do Finalizar desligado (a 43)
const COM_ARTIGO = { ativo: 'o ativo', cercas: 'as cercas', leitor: 'o leitor', eventos: 'os eventos', conexao: 'a conexão' }
const emLista = (nomes) => (nomes.length > 1 ? `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}` : nomes.join(''))

export const T = {
  encerrar: 'ENCERRAR',
  titulo: 'Checklist',
  de: (total) => `de ${total}`,
  secao: (id, nome) => `${id} · ${nome}`,   // o nome, o rótulo da seção no mock (a E, Ciclo de testes)

  // quem age, embaixo do nome da seção (decisão 34)
  appConfere: 'o app confere sozinho',
  appConferiu: 'o app conferiu',
  // no singular, com 1 (*1 item*, *1 foto tirada*)
  voceFotografa: (n) => (n === 1 ? 'você fotografa 1 item' : `você fotografa ${n} itens`),
  fotosTiradas: (n) => (n === 1 ? '1 foto tirada' : `${n} fotos tiradas`),
  voceFazCiclo: 'você faz o ciclo parado',
  cicloPassou: 'o ciclo passou',
  lendoDoModulo: 'lendo do módulo',   // a Seção D enchendo (T13/38)
  esperaServidor: 'espera o servidor · não bloqueia',
  servidorConfirmou: 'o servidor confirmou',
  // a Seção F falhando (49, decisão 64): diz que não passou, e continua não bloqueando
  naoPassou: 'não passou · não bloqueia',

  // o fim (T13/11 e 14): o checklist registrado, aguardando o
  // autoteste, e o próximo passo · a homologação é da T16
  registrado: 'Checklist registrado',
  aguardandoAutoteste: 'aguardando autoteste',
  proximoPasso: 'O próximo passo é encerrar a sessão. O autoteste roda durante o encerramento.',
  semLocalizacao: 'o relatório vai sem localização',

  // os valores dos itens que são palavra (textos.md)
  confere: 'confere',
  conforme: 'conforme',
  sinalBom: 'sinal bom',
  satelites: (n) => `${n} satélites`,
  // a entrada que não bate (T13/23, 24) e o modem sem sinal (T13/25, 26)
  entradas: { ignicao: 'ignição' },
  entradaLida: (entrada, valor) => `${entrada} ${valor}`,
  esperadoDaEntrada: (valor) => `esperado: ${valor}, com a chave virada`,
  semAlcance: 'o módulo não alcança a rede da operadora',
  // o pacote de sincronização (A), o GPS (C), a D lida, a F e o bip (E)
  dataDoPacote: (data, hora) => `${data.slice(8, 10)}/${data.slice(5, 7)} ${hora}`,
  // o GPS aprova pela posição (decisão 60): *com posição* (03) · *sem posição* (21, 22) ·
  // os satélites e a antena, a informação embaixo do valor no detalhe (*0 satélites · antena conectada*, 22)
  comPosicao: 'com posição',
  infoDoGps: (satelites, antena) => `${satelites} satélites · antena ${antena}`,
  antenaConectada: 'conectada',
  // a antena em curto ou desconectada é defeito do módulo (o tela.md, sem referência)
  antenaComDefeito: 'antena com defeito',
  lendo: 'lendo',
  esperando: 'esperando',
  naoChegou: 'não chegou',
  testarBip: 'Testar bip',
  tocando: 'Tocando…',
  ouviuOBip: 'Você ouviu o bip?',
  ouviBotao: 'Ouvi',
  naoOuviBotao: 'Não ouvi',
  ouvi: 'ouvi',
  naoOuvi: 'não ouvi',
  // a resposta se refaz (decisão 64, 41, 42 e 50): o botão da linha do bip respondido, e o não
  // ouvido que passa a contar com o que aconteceu escrito
  testarDeNovo: 'Testar de novo',
  naoOuviComRessalva: 'não ouvi · com ressalva',
  // o 50 pelo endereço: o que aconteceu, o da referência (textos.md · 50)
  exemploDoBip: 'O leitor acende, mas o bip não toca.',
  // o evento de teste que não chegou (49): a causa embaixo do nome, e o botão que leva ao ciclo
  naoChegouAoServidor: 'não chegou ao servidor',
  dispararDeNovo: 'Disparar de novo',
  naoConfere: 'não confere',   // o cartão que o técnico disse que não confere (T14/10)
  aFazer: 'a fazer',
  vazio: '—',
  // B: a foto por fazer (o Painel também, decisão 52) e a ressalva, sem a causa
  fotoATirar: 'foto a tirar',
  comRessalva: 'com ressalva',
  // E: a ação da seção, a única
  fazerCiclo: 'Fazer o ciclo de testes',
  osPassos: (n) => `até ${n} passos, com o ônibus parado`,

  // o rodapé
  // o motivo do Finalizar desligado: quantos obrigatórios faltam — no singular, *Falta 1
  // item obrigatório* (proposta do protótipo) —, a seção ainda lida, a seção com um item reprovado
  faltam: (n) => (n === 1 ? 'Falta 1 item obrigatório' : `Faltam ${n} itens obrigatórios`),
  // a 43: o bloco deixado para depois na manutenção, na Seção D
  revisarEmSeguida: 'revisar em seguida',
  reenviar: 'Reenviar',
  faltaReenviar: (blocos) => `Falta reenviar ${emLista(blocos.map((b) => COM_ARTIGO[b]))}.`,
  secaoSendoLida: (id) => `A Seção ${id} ainda está sendo lida`,
  secaoComReprovado: (id) => `A Seção ${id} tem um item reprovado`,
  // a F falhando, com o resto resolvido (49): o Finalizar aceso, e o que ele pede
  secaoFPedeCiencia: 'A Seção F não passou: finalizar pede a sua ciência',
  finalizar: 'Finalizar instalação',
  encerrarSessao: 'Encerrar sessão',
  voltarMenu: 'Voltar ao menu',
  voltarChecklist: 'Voltar ao checklist',

  // o nível do item
  depois: (pergunta) => `Depois: ${pergunta}`,
  // a caixa do não conforme, nas duas telas do item (decisão 39, T13/07, 08 e 15)
  naoConforme: 'Não está conforme',
  marqueEConte: 'marque e conte o que aconteceu',
  conteEmbaixo: 'conte embaixo o que aconteceu',
  oQueAconteceu: 'O QUE ACONTECEU',
  tirarFoto: 'Tirar foto',
  // a foto vale no Usar foto (decisão 63, 44 a 48 e 15): o registro dentro do quadro, embaixo da
  // foto, o primário que conta o item e o link que descarta a foto e volta à câmera
  usarFoto: 'Usar foto',
  tirarDeNovo: 'Tirar de novo',
  fotoTirada: (hora) => `Foto tirada às ${hora}`,
  confiraNitida: 'confira se está nítida antes de usar',
  // o nome da foto pro leitor de tela (as referências; o textos.md não lista, não é texto da tela)
  fotoDo: { 'b-modulo': 'do módulo', 'b-lado-de-cima': 'do lado de cima do módulo', 'b-chicote': 'do chicote', 'b-leitor': 'do leitor', 'b-painel-legivel': 'do painel', problema: 'do problema' },
  aFoto: (de, hora) => `A foto ${de}, tirada às ${hora}`,
  // o não conforme exige a foto do problema (decisão 39): a frase embaixo do título (08, 15),
  // o registro e o botão que diz o que falta
  enquadreProblema: 'Enquadre o problema',
  fotografarProblema: 'Fotografar o problema',
  problemaFotografado: (hora) => `Problema fotografado às ${hora}`,
  vaiComARessalva: 'vai junto com a ressalva, pro gestor',
  // sem o texto, apagado: nenhuma referência o desenha, e o texto é o do tela.md e do logica.md (decisão 39)
  conteOQueAconteceu: 'Conte o que aconteceu',
  salvarComRessalva: 'Salvar com ressalva',
  // a câmera sem a permissão: nenhuma referência da T13 a desenha; o primário é
  // o da regra 12 da lei de construir (logica.md · O mundo real, e a ficha da T13).
  // A frase do que falta não tem texto pro item do checklist: o quadro fica só com
  // a câmera riscada, e a frase embaixo do título continua a do que enquadrar
  abrirConfiguracoes: 'Abrir as configurações',

  // o item reprovado (09)
  lidoNoModulo: 'LIDO NO MÓDULO',
  faixa: (min, max) => `${min} — ${max}`,
  abaixo: (dif, unidade) => `${[dif, unidade].filter(Boolean).join(' ')} abaixo do mínimo`,
  // o que conferir, como a conexão que falha na T05/04
  oQueConferir: 'O QUE CONFERIR',
  conferirAlimentacao: [
    { titulo: '1 · Bateria do ônibus', texto: '— carga e terminais' },
    { titulo: '2 · Cabo de alimentação', texto: '— encaixe firme' },
    { titulo: '3 · Ponto de ligação', texto: '— direto na bateria, sem queda' },
  ],
  // as causas das outras três · o GPS sem posição (22, 35): o modem e o GPS ficam dentro do
  // módulo, sem antena externa — o lugar do módulo, o lado de cima e o ônibus fora da garagem coberta
  conferirGps: [
    { titulo: '1 · Lugar do módulo', texto: '— no teto ou atrás do para-brisa' },
    { titulo: '2 · Lado de cima', texto: '— pro céu, sem metal por cima' },
    { titulo: '3 · Ônibus', texto: '— fora da garagem coberta, longe do rádio' },
  ],
  conferirEntradas: [
    { titulo: '1 · Chave do ônibus', texto: '— virada na ignição' },
    { titulo: '2 · Fio da ignição', texto: '— no pino certo do chicote' },
    { titulo: '3 · Fusível da ignição', texto: '— inteiro' },
  ],
  // o modem sem sinal (26, 37): o chip no encaixe de cima, o lugar do módulo e a cobertura
  conferirModem: [
    { titulo: '1 · Chip SIM', texto: '— no encaixe de cima, ativo' },
    { titulo: '2 · Lugar do módulo', texto: '— fora de caixa de metal' },
    { titulo: '3 · Cobertura', texto: '— teste num lugar aberto' },
  ],
  // o detalhe relê o módulo ali mesmo (29 a 33), no molde do Relendo… da T10
  relerModulo: 'Reler o módulo',
  relendoModulo: 'Relendo o módulo…',
  relido: (hora, veredito) => `relido às ${hora} · ${veredito}`,
  dentroDaFaixa: 'dentro da faixa',
  // o reler que não resolve (34 a 37): o que ainda falta, depois do relido às
  ainda: (falta) => `ainda ${falta}`,
  entradaAinda: (entrada, valor) => `${entrada} ainda ${valor}`,

  // o diálogo da Seção F (10): a causa antes da frase de sempre (decisão 64)
  secaoFNaoPassou: 'A Seção F não passou',
  causaDaF: 'O evento de teste não chegou ao servidor.',
  registradaFalhando: 'A instalação fica registrada com ela falhando — e com o seu nome.',
  ciente: (nome, hora) => `Estou ciente · ${nome}, ${hora}`,
  cancelar: 'Cancelar',

  // o voltar com o que aconteceu escrito pergunta antes (51, decisão 64): com a foto do problema
  // (a 15), a frase da referência; sem ela (a 08), a frase não fala da foto (o tela.md, sem referência)
  descartarRessalva: 'Descartar a ressalva?',
  descartarComFoto: 'O que você escreveu e a foto do problema saem, e o item volta a ficar por fazer.',
  descartarSemFoto: 'O que você escreveu sai, e o item volta a ficar por fazer.',
  continuarNoItem: 'Continuar no item',
  descartar: 'Descartar',
}
