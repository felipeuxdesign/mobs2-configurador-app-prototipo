/* 04-dados/mocks.js — a OBRA CANÔNICA. Toda tela deriva daqui (Lei 8/17).
 * Além do recorte canônico, o mock declara (tudo aditivo: as âncoras que a
 * checagem de cobertura recomputa não se movem):
 *   credenciais e ddis (T01) — dois campos raiz · credenciais.contato e
 *     recuperacao.novaSenha: todo campo nasce preenchido com dado do mock —
 *     telefone/e-mail/senha literais no JSX violariam a Lei 8.
 *   casos ADITIVOS de T05 (gatilhos de simulação e leituras) — ver o bloco no
 *     fim dos CASOS.
 *   frota (24 ativos), leitor/leituraCan (3 modelos de ativo) e
 *     consumidores nos casos de pinos.
 *   autotesteEncerramento (as assertivas de T16 — as de bancada, em
 *     autotesteAssertivas, ficam à parte), tecnico, situacao.sessaoAcesso,
 *     modelos[].reinicioPorComando, os campos de sessao-interrompida e
 *     noEncerramento em autoteste-falhando.
 *   criteriosRegra (a REGRA dos três critérios de T12 — não campo por
 *     instalação: o que o `resumo` já diz não se reescreve) e
 *     casos["instalacoes-sem-rede"] (o carimbo da consulta anterior,
 *     declarado).
 *   decisões 44 a 47: diagnostico (o que a T07 mostra e de onde vem),
 *     fabricante/modelo nos 3 modelos de ativo, o pacote SEM cartões (conexões,
 *     eventos e cercas no lugar), e os casos modem-sem-sinal,
 *     firmware-sem-rede-no-modulo, modulo-em-outro-ativo, modulo-ja-deste-ativo
 *     e sem-conexao-no-menu. O chassi continua no cadastro dos ativos, mas
 *     nenhuma tela o mostra (decisão 46).
 *   decisões 52 a 54: a calibração sem foto, com o horímetro opcional · a
 *     conferência sem versão, com a APN, o Extended ID só leitura e o revisar
 *     em seguida (cercas-reenviadas) · o ciclo de testes parado, com a
 *     velocidade só com tacógrafo digital (motor-desligado-no-ciclo) · o
 *     servidor sem a viagem · o checklist sem o chassi, com o Painel como foto
 *     a tirar · a fila sem a foto de calibração.
 *
 * Dia nominal FIXO: 2026-03-12 (quinta), 14:30. Toda data deriva por offset
 * via aritmética de calendário PURA — zero objeto Date, zero Date.now,
 * zero Math.random. 2026 NÃO é bissexto (fev = 28).
 *
 * Âncoras (a auditoria recomputa — 04-dados/checar-cobertura.js):
 *   24 ativos · 20 módulos · 4 ativos sem módulo · 2 seriais fora do
 *   cadastro · 1 modelo sem driver (VC07) · 13 instalações
 *   (6 aprovadas · 2 aguardando · 1 falha reconhecida · 1 reprocessada ·
 *    1 reprovada · +2 ressalvadas) · cobertura 45 dias corridos,
 *   13 dias distintos com intervenção · pacotes em 3 idades (1d·4d·8d) ·
 *   fila com 5 estados.
 */
(function () {
  /* Calendário puro a partir do dia nominal. */
  var DIAS_MES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function diasAntes(n) {
    var y = 2026, m = 3, d = 12 - n;
    while (d < 1) { m -= 1; if (m < 1) { m = 12; y -= 1; } d += DIAS_MES[m - 1]; }
    return y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
  }
  function comData(lista) {
    return lista.map(function (x) { x.data = diasAntes(x.diasAtras); return x; });
  }

  /* ── Modelos de ATIVO — a linha do veículo. O sistema decide por aqui
     (princípio 2): tradução CAN, mapa de contadores, método de calibração
     de velocidade e preset de evento vêm do cadastro, nunca do técnico.
     ma-03 SEM mapa de contadores declarado → T08 indisponível com motivo.
     conteudoRegistros — o TAMANHO do pacote que este modelo pede ao
     módulo (eventos, cercas, tradução). É propriedade do MODELO DE ATIVO, não
     do módulo nem do ativo: mesma linha de veículo, mesmo conteúdo. Fecha o
     #8 de T05 como COMPARAÇÃO (conteúdo × capacidadeRegistros da matriz) em
     vez do verbo "cabe": o ma-01 pede 96 contadores, e o VL06 guarda 127 — a
     aritmética é a regra. O caso conteudo-nao-cabe declara o conteúdo do par
     dele (a-10 × M2C-0394, 131 contadores), e só nomeia onde a conta estoura.
     leitor (bloco Leitor: o tipo do identificador, os fios em que ele se
     liga no módulo — `fios`, o que a T09 e a T11 dizem — e se o buzzer está
     no fio) e +leituraCan (bloco Ativo: "barramento" físico ou "gateway"
     indutivo) — as duas fontes da matriz de ocupação de pinos (decisão 59: o
     leitor sai do cadastro do modelo, nunca da variante nem do meio). ma-03
     lê a CAN por gateway: máquina não expõe barramento — é isso que faz o
     gateway ser consumidor real.
     Os modelos não têm `grandezasCalibraveis`, `grandezasIndisponiveis` nem
     `categoria`: a fonte das grandezas é `calibracao.porModelo` (ver o
     comentário de CALIBRACAO), e o `nome` já diz a categoria — o produto não
     agrupa nem filtra por ela em lugar nenhum.
     `metodoVelocidade` FICA DECLARADO, sem leitor de tela: é o fato de
     cadastro que ORIGINA `calibracao.porModelo` (gps → velocidade "não
     precisa"; pulso → velocidade calibrável). Consumidor: o cadastro/backend
     que emite o pacote — nunca a tela, que lê a forma já derivada. */
  var MODELOS_ATIVO = [
    { id: "ma-01", nome: "Ônibus urbano OF-1621",
      tacografoDigital: false, /* a velocidade só entra no ciclo com tacógrafo digital (decisão 54) */
      fabricante: "Mercedes-Benz", modelo: "OF-1621",
      traducaoCan: "urbano v3",
      mapaContadores: { declarado: true, versao: "v2" },
      conteudoRegistros: 96, /* T09/05: 96 de 127 contadores */
      metodoVelocidade: "gps",
      presetEventoId: "pe-urbano",
      leitor: { tipo: "cartao-serial", fios: "fios azul e amarelo", buzzerNoFio: false, buzzer: true }, /* o cartão serial · o leitor do herói tem buzzer: a Seção E mostra o bip */
      leituraCan: "barramento" },
    { id: "ma-02", nome: "Caminhão coletor 17.230",
      tacografoDigital: true, /* a velocidade só entra no ciclo com tacógrafo digital (decisão 54) */
      fabricante: "Volkswagen", modelo: "17.230",
      traducaoCan: "frota v2",
      mapaContadores: { declarado: true, versao: "v1" },
      conteudoRegistros: 84,
      metodoVelocidade: "pulso",
      presetEventoId: "pe-rodoviario",
      leitor: { tipo: "chave-de-contato", fios: "fio verde", buzzerNoFio: false }, /* a chave de contato, no 1-Wire */
      leituraCan: "barramento" },
    { id: "ma-03", nome: "Retroescavadeira 580N",
      tacografoDigital: false, /* a velocidade só entra no ciclo com tacógrafo digital (decisão 54) */
      fabricante: "Case", modelo: "580N",
      traducaoCan: "máquina v1",
      mapaContadores: { declarado: false,
        /* a ação é "Refazer leitura da CAN", e não "Reset de leitura" (R3): reset
           é jargão, e não diz o que reseta. */
        motivo: "Mapa de contadores não declarado no cadastro deste modelo — acione o gestor." },
      conteudoRegistros: 112,
      metodoVelocidade: "gps",
      presetEventoId: "pe-maquina",
      leitor: { tipo: "chave-de-contato", fios: "fio verde", buzzerNoFio: false }, /* o 1-Wire · a retroescavadeira só tem o VC07, sem suporte: nenhuma tela mostra */
      leituraCan: "gateway" }
  ];

  /* Presets de evento (vêm no pacote): a janela de posicionamento de T12 é
     DERIVADA — 3 × intervalo + 2 min — nunca número cravado em tela. */
  /* ⚠ `modoFila` e `indiceTeste` FICAM DECLARADOS, sem leitor
     de tela e por decisão. A spec de T14 diz que o bloco Eventos declara o
     modo de fila e que o evento de teste tem ÍNDICE PRÓPRIO RESERVADO — e o
     que essa reserva garante é que a PLATAFORMA não entregue o evento de
     teste ao cliente: fora de relatório, BI, ranking e notificação.
     Consumidor: a plataforma, nunca o app. Sem eles o produto declararia
     uma garantia que não modela. */
  var PRESETS_EVENTO = [
    { id: "pe-urbano",     nome: "Urbano",     intervaloRastreamentoSeg: 30,  modoFila: "tempo real", indiceTeste: 90 },
    { id: "pe-rodoviario", nome: "Rodoviário", intervaloRastreamentoSeg: 60,  modoFila: "tempo real", indiceTeste: 91 },
    { id: "pe-maquina",    nome: "Máquina",    intervaloRastreamentoSeg: 120, modoFila: "lote",       indiceTeste: 92 }
  ];

  /* ── Modelos de MÓDULO ── VC07 é o modelo SEM driver na v1.
     reinicioPorComando — o passo 2 do encerramento (HU-T16-3)
     reinicia "por comando quando o driver suportar; senão, o app pede um
     corte de alimentação, UMA vez". É capacidade do DRIVER, e o driver mora
     aqui (driverV1 já é isto) — não na matriz, que é modelo × variante ×
     firmware. VL08 não aceita: o passo 2 pede o corte nos dois VL08, o
     M2C-0371 (a-09) e o M2C-0438 (a-16). VC07 nunca abre sessão (trava no
     diagnóstico, T07/03, sem driver), então o valor dele não tem consumidor. */
  var MODELOS_MODULO = [
    { id: "vl06", nome: "VL06", variantes: ["FULL", "ECO", "CAN-BT", "CAN"], driverV1: true,  reinicioPorComando: true, faixaTensao: [9.0, 40.0] /* a faixa de alimentação do VL06 (decisão 59), ainda por conferir na bancada */ },
    { id: "vl08", nome: "VL08", variantes: ["STD"], driverV1: true,  reinicioPorComando: false },
    { id: "vc07", nome: "VC07", variantes: ["STD"], driverV1: false, reinicioPorComando: false }
  ];

  /* Matriz de capacidades: modelo × variante × firmware (decisão 59: os dados
     do Virloc). O firmware no formato do Virloc: o VL06 FULL homologa o 8.03 e
     o 8.04; o M2C-0451 roda o 8.01, que NÃO está aqui → caminho de
     atualização (T07/04). O VL08 tem o formato dele (154B16, 158B21), e
     nenhuma tela o mostra. VC07 não tem linha: sem driver, o bloqueio
     acontece antes da matriz.
     `bluetooth` — a variante tem Bluetooth: o FULL, o CAN-BT e o VL08 sim; o
     ECO e o CAN não, e o app não configura esses dois (a busca da T05 só
     mostra quem tem, e o nenhum encontrado diz os nomes dos que não têm). Ele
     não decide o leitor: o leitor sai do cadastro do modelo do ativo.
     A capacidade, em cinco dimensões, que o envio da T09 confere: os
     contadores (`capacidadeRegistros`), os eventos (`eventosMax`), os filtros
     da CAN (`filtrosCanMax`; no VL08, 25 na CAN 1 e 13 na CAN 2,
     `filtrosCanPorRede`), as regiões (`regioesMax`) e a memória que os pontos
     de cerca e os cartões dividem (`pontosCercaMax`, 6.143 no VL06). */
  var MATRIZ_CAPACIDADES = [
    { modeloId: "vl06", variante: "FULL",   firmwares: ["8.03", "8.04"], can: true,  bluetooth: true,  pulsos: true,  regioesMax: 8,  posicoesPorRegiao: 2, capacidadeRegistros: 127, eventosMax: 128, filtrosCanMax: 13, pontosCercaMax: 6143 },
    { modeloId: "vl06", variante: "ECO",    firmwares: ["8.03"],         can: false, bluetooth: false, pulsos: true,  regioesMax: 8,  posicoesPorRegiao: 2, capacidadeRegistros: 127, eventosMax: 128, filtrosCanMax: 13, pontosCercaMax: 6143 },
    { modeloId: "vl06", variante: "CAN-BT", firmwares: ["8.04"],         can: true,  bluetooth: true,  pulsos: false, regioesMax: 8,  posicoesPorRegiao: 2, capacidadeRegistros: 127, eventosMax: 128, filtrosCanMax: 13, pontosCercaMax: 6143 },
    { modeloId: "vl06", variante: "CAN",    firmwares: ["8.04"],         can: true,  bluetooth: false, pulsos: false, regioesMax: 8,  posicoesPorRegiao: 2, capacidadeRegistros: 127, eventosMax: 128, filtrosCanMax: 13, pontosCercaMax: 6143 },
    { modeloId: "vl08", variante: "STD",    firmwares: ["154B16", "158B21"], can: true, bluetooth: true, pulsos: true,  regioesMax: 64, posicoesPorRegiao: 3, capacidadeRegistros: 192, eventosMax: 244, filtrosCanMax: 38, filtrosCanPorRede: [25, 13] }
  ];

  /* ── 20 módulos cadastrados (o vínculo módulo↔ativo vive no ativo). ── */
  var MODULOS = [
    /* todo módulo que o app instala tem Bluetooth (decisão 59): no mundo do protótipo, nenhum é ECO nem CAN */
    { serial: "M2C-0301", modeloId: "vl06", variante: "FULL",   firmware: "8.04" },
    { serial: "M2C-0312", modeloId: "vl06", variante: "CAN-BT", firmware: "8.04" },
    { serial: "M2C-0335", modeloId: "vl06", variante: "CAN-BT", firmware: "8.04" },
    { serial: "M2C-0348", modeloId: "vl06", variante: "FULL",   firmware: "8.04" },
    { serial: "M2C-0362", modeloId: "vl06", variante: "CAN-BT", firmware: "8.04" },
    { serial: "M2C-0371", modeloId: "vl08", variante: "STD",    firmware: "154B16" },
    { serial: "M2C-0389", modeloId: "vl06", variante: "CAN-BT", firmware: "8.04" },
    { serial: "M2C-0394", modeloId: "vl06", variante: "FULL",   firmware: "8.03" },
    { serial: "M2C-0402", modeloId: "vl06", variante: "FULL",   firmware: "8.04" },
    { serial: "M2C-0411", modeloId: "vl06", variante: "CAN-BT", firmware: "8.04" },
    { serial: "M2C-0417", modeloId: "vl06", variante: "CAN-BT", firmware: "8.04", extendedId: { cartoes: 3, ibuttons: 1 } }, /* herói · o Extended ID é só leitura: o que já está no módulo */
    { serial: "M2C-0423", modeloId: "vl06", variante: "FULL",   firmware: "8.03" },
    { serial: "M2C-0438", modeloId: "vl08", variante: "STD",    firmware: "158B21" },
    { serial: "M2C-0445", modeloId: "vl06", variante: "CAN-BT", firmware: "8.04" },
    { serial: "M2C-0451", modeloId: "vl06", variante: "FULL",   firmware: "8.01" }, /* fora da matriz */
    { serial: "M2C-0466", modeloId: "vl06", variante: "FULL",   firmware: "8.04" },
    { serial: "M2C-0472", modeloId: "vl06", variante: "FULL",   firmware: "8.03" },
    { serial: "M2C-0480", modeloId: "vl06", variante: "CAN-BT", firmware: "8.04" }, /* sem pulsos (T10/04) */
    { serial: "M2C-0489", modeloId: "vl06", variante: "FULL",   firmware: "8.04" },
    { serial: "M2C-0497", modeloId: "vc07", variante: "STD",    firmware: "1.1.0" }  /* sem driver */
  ];

  /* ── 24 ativos — 4 SEM módulo (a-07, a-08, a-15, a-23): exercitam a trava
     do princípio 5 (sem cadastro prévio, o app trava).
     frota — o número curto pintado no veículo, o que o técnico
     digita na busca de T06 junto com a placa. IDENTIFICADOR = chassi (a
     spec: "identificador do chassi pela CAN"), campo pesquisável porque a
     HU pede e porque colar funciona — não nasce campo novo.
     Os 24 são da Viação Atlântico Sul (emp-01), e o pacote dela traz todos
     (decisão 56: o contexto é a empresa, sem unidade). O ônibus de outra
     empresa, fora do pacote, mora só no caso ativo-fora-pacote. ── */
  var ATIVOS = [
    { id: "a-01", placa: "RKT-8H42", frota: "1003", modeloAtivoId: "ma-01", chassi: "9BM384067GB120401", moduloSerial: "M2C-0417" }, /* HERÓI · o moduloSerial do cadastro é o módulo PREVISTO pro ativo; o modo (instalação × manutenção) vem do caso modulo-ja-deste-ativo, nunca do cadastro (decisão 46) */
    { id: "a-02", placa: "QJF-2C61", frota: "1006", modeloAtivoId: "ma-01", chassi: "9BM384067GB120402", moduloSerial: "M2C-0301" },
    { id: "a-03", placa: "PCX-9A17", frota: "1009", modeloAtivoId: "ma-01", chassi: "9BM384067GB120403", moduloSerial: "M2C-0312" },
    { id: "a-04", placa: "KHT-4B08", frota: "1012", modeloAtivoId: "ma-01", chassi: "9BM384067GB120404", moduloSerial: "M2C-0335" },
    { id: "a-05", placa: "OYS-7D93", frota: "1015", modeloAtivoId: "ma-01", chassi: "9BM384067GB120405", moduloSerial: "M2C-0348" },
    { id: "a-06", placa: "RVM-1E54", frota: "1018", modeloAtivoId: "ma-01", chassi: "9BM384067GB120406", moduloSerial: "M2C-0362" },
    { id: "a-07", placa: "PDZ-3F26", frota: "1021", modeloAtivoId: "ma-01", chassi: "9BM384067GB120407", moduloSerial: null },
    { id: "a-08", placa: "QRA-8G70", frota: "1024", modeloAtivoId: "ma-01", chassi: "9BM384067GB120408", moduloSerial: null },
    { id: "a-09", placa: "KNB-5H39", frota: "1027", modeloAtivoId: "ma-02", chassi: "9BW958017HT450409", moduloSerial: "M2C-0371" },
    { id: "a-10", placa: "OCT-2J85", frota: "1030", modeloAtivoId: "ma-01", chassi: "9BM384067GB120410", moduloSerial: "M2C-0394" },
    { id: "a-11", placa: "PGE-6K41", frota: "1033", modeloAtivoId: "ma-01", chassi: "9BM384067GB120411", moduloSerial: "M2C-0389" },
    { id: "a-12", placa: "RSW-9L02", frota: "1036", modeloAtivoId: "ma-01", chassi: "9BM384067GB120412", moduloSerial: "M2C-0402" },
    { id: "a-13", placa: "QAH-1M67", frota: "1039", modeloAtivoId: "ma-01", chassi: "9BM384067GB120413", moduloSerial: "M2C-0411" },
    { id: "a-14", placa: "KJC-7N23", frota: "1042", modeloAtivoId: "ma-01", chassi: "9BM384067GB120414", moduloSerial: "M2C-0423" },
    { id: "a-15", placa: "PBV-4P58", frota: "1045", modeloAtivoId: "ma-01", chassi: "9BM384067GB120415", moduloSerial: null },
    { id: "a-16", placa: "ONK-8Q90", frota: "1048", modeloAtivoId: "ma-02", chassi: "9BW958017HT450416", moduloSerial: "M2C-0438" },
    { id: "a-17", placa: "RDF-3R14", frota: "1051", modeloAtivoId: "ma-01", chassi: "9BM384067GB120417", moduloSerial: "M2C-0445" },
    { id: "a-18", placa: "QTM-5S79", frota: "1054", modeloAtivoId: "ma-01", chassi: "9BM384067GB120418", moduloSerial: "M2C-0451" },
    { id: "a-19", placa: "KWX-2T36", frota: "1057", modeloAtivoId: "ma-02", chassi: "9BW958017HT450419", moduloSerial: "M2C-0466" },
    { id: "a-20", placa: "PEY-9U62", frota: "1060", modeloAtivoId: "ma-01", chassi: "9BM384067GB120420", moduloSerial: "M2C-0472" },
    { id: "a-21", placa: "OHL-6V07", frota: "1063", modeloAtivoId: "ma-03", chassi: "9CS580N26KR330421", moduloSerial: "M2C-0497" },
    { id: "a-22", placa: "RJP-1W48", frota: "1066", modeloAtivoId: "ma-02", chassi: "9BW958017HT450422", moduloSerial: "M2C-0480" },
    { id: "a-23", placa: "QSN-7X95", frota: "1069", modeloAtivoId: "ma-03", chassi: "9CS580N26KR330423", moduloSerial: null },
    { id: "a-24", placa: "KUD-4Y21", frota: "1072", modeloAtivoId: "ma-02", chassi: "9BW958017HT450424", moduloSerial: "M2C-0489" }
  ];

  /* ── Cadeia dos 6 blocos — ordem CANÔNICA, invariante (lei do produto).
     Arraste do reenvio cirúrgico (T11): o conjunto arrastado vai SEMPRE na
     ordem canônica, nunca na ordem em que as divergências apareceram. */
  var CADEIA = {
    ordem: ["limpeza", "ativo", "cercas", "leitor", "eventos", "conexao"],
    rotulos: { limpeza: "Limpeza", ativo: "Ativo", cercas: "Cercas", leitor: "Leitor", eventos: "Eventos", conexao: "Conexão" },
    arraste: { ativo: ["eventos"], cercas: ["leitor", "eventos"], leitor: ["eventos"], eventos: [], conexao: [] }
  };

  /* Cercas: 2 áreas × 2 cercas = 4 regiões (herói). O pool esgotado vive
     no caso "pool-esgotado" (a-05): regiões E posições no limite.
     ⚠ `areas` TEM LEITOR e não é tela: é a checagem de cobertura
     (checar-cobertura.js, "cercas: 2 áreas × 2 = 4 regiões"). `areaId` fica
     declarado por consequência — é o elo que faz o × 2 dessa assertiva ser
     verdade; sem ele as duas áreas ficariam contadas e vazias. As telas leem
     a CONTAGEM de regiões por ativo (T05, T13, T16) e, na T09, os PONTOS delas
     (`pontos`, decisão 57: as Cercas contam os pontos enquanto gravam e
     conferem; as quatro do herói somam 120).
     ⚠ Sinalizado, não decidido: `regioes[].nome` também não tem leitor. Fica
     intocado. */
  /* as coleções que o pacote conta (decisão 45): as conexões da empresa e os
     eventos embarcados do preset. A checagem de cobertura recomputa o contem de cada pacote a partir delas. */
  var CONEXOES = [
    /* a operadora e a APN do chip, as de verdade (decisão 59): a tela diz "TIM · timbrasil.br", nunca o endereço do servidor (decisão 51) */
    { id: "cx-01", nome: "Servidor principal", operadora: "TIM", apn: "timbrasil.br" },
    { id: "cx-02", nome: "Servidor de contingência", operadora: "TIM", apn: "timbrasil.br" }
  ];
  var EVENTOS_EMBARCADOS = ["Ignição ligada", "Ignição desligada", "Excesso de velocidade", "Freada brusca", "Aceleração brusca", "Curva brusca",
    "Porta aberta em movimento", "Ré acionada", "Botão de pânico", "Bateria baixa", "Entrada em cerca", "Saída de cerca"];
  /* As regiões são do ativo (ativoId). O tambemAtivos é a mesma cerca usada por outro ônibus da
     empresa: o PCX-9A17 (a-03, a queda da T09/02 e 03) usa as do herói. O pacote conta
     REGIÕES, não ônibus, e o herói fica com os 27 itens que contam (30 no mock · o Autoteste da D roda ao encerrar e não conta).
     As regiões de um ativo: as do ativoId dele mais as em que ele está no tambemAtivos. */
  var CERCAS = {
    areas: [
      { id: "ar-01", nome: "Garagem Várzea" },
      { id: "ar-02", nome: "Terminal Joana Bezerra" },
      { id: "ar-03", nome: "Garagem Ibura" },
      { id: "ar-04", nome: "Terminal do Barro" }
    ],
    regioes: [
      { id: "rg-01", areaId: "ar-01", nome: "Pátio interno",       ativoId: "a-01", tambemAtivos: ["a-03"], pontos: 36 },
      { id: "rg-02", areaId: "ar-01", nome: "Portão de saída",     ativoId: "a-01", tambemAtivos: ["a-03"], pontos: 18 },
      { id: "rg-03", areaId: "ar-02", nome: "Plataforma norte",    ativoId: "a-01", tambemAtivos: ["a-03"], pontos: 42 },
      { id: "rg-04", areaId: "ar-02", nome: "Bolsão de recolhida", ativoId: "a-01", tambemAtivos: ["a-03"], pontos: 24 }, /* as quatro do herói: 120 pontos (T09) */
      /* as do QAH-1M67 (a-13), o ônibus da sessão interrompida (T16/06) */
      { id: "rg-05", areaId: "ar-03", nome: "Pátio da Ibura",        ativoId: "a-13", pontos: 30 },
      { id: "rg-06", areaId: "ar-03", nome: "Portão da Ibura",       ativoId: "a-13", pontos: 14 },
      { id: "rg-07", areaId: "ar-04", nome: "Plataforma do Barro",   ativoId: "a-13", pontos: 40 },
      { id: "rg-08", areaId: "ar-04", nome: "Recolhida do Barro",    ativoId: "a-13", pontos: 20 }
    ]
  };

  /* Identificadores: cartões com a string ESPERADA + mapa de índices.
     A divergência por zeros à esquerda / prefixo é o caso mais
     representativo do produto (falhava no último item do ciclo, sem
     diagnóstico). Não há caso "identificador-divergente": o técnico confere o cartão com o número impresso. */
  var IDENTIFICADORES = {
    cartoes: [
      { id: "id-01", rotulo: "Cartão do motorista 041", codigoEsperado: "0009412857" },
      { id: "id-02", rotulo: "Cartão do motorista 112", codigoEsperado: "0007733904" },
      { id: "id-03", rotulo: "Cartão reserva da empresa", codigoEsperado: "PE-0033120" }
    ],
    indicesAlocados: [
      { indice: 1, cartaoId: "id-01" },
      { indice: 2, cartaoId: "id-02" },
      { indice: 3, cartaoId: "id-03" }
    ]
  };

  /* ═══ AS ASSERTIVAS DO ENCERRAMENTO (T16) — outra lista, outro
     autoteste. As de baixo (AUTOTESTE_ASSERTIVAS) são as de bancada que
     T12/T13 contam ("Ignição liga", "Leitor de cartão responde"); estas são
     o que UM REINÍCIO E UMA RELEITURA provam — a resposta ao incidente que
     originou o produto. Cada uma é `Checagem` no uso pleno, COM O VALOR
     LIDO: nunca um "OK" agregado (HU-T16-4).
     `fonte` é chave de CÓDIGO (a tela deriva o valor do mock, Lei 17), nunca
     texto de tela. `valor` fixo só onde o fato é o próprio estado do módulo.
     ⚠ #4 é CONDICIONAL (R2): só existe quando a leitura da CAN foi refeita
     na sessão. Não aplicável aparece como `não se aplica` COM MOTIVO — nunca
     verde por omissão, que seria o autoteste mentindo sobre o que provou.
     ⚠ o evento do cartão NÃO BLOQUEIA (R1): depende de servidor, não do módulo na
     frente do técnico — sai da conta de bloqueio. É o que a T13 (Seção D) consome.
     ⚠ #5 é a única que a spec não nomeia — diferença sinalizada: a
     releitura prova os pontos de cerca separadamente dos identificadores
     porque a memória é compartilhada entre os dois (razão da ordem canônica
     Cercas ANTES de Leitor). */
  /* ⚠ RÓTULOS MEDIDOS: o orçamento do rótulo é 180 (360 − 32
     de padding − 20 do ícone − 8 − 108 da coluna do valor − 12 do gap), e
     "Configuração dos blocos", "Contadores sobreviveram" e "Identificadores
     íntegros" medem ~190 e QUEBRAM em duas linhas no print. Por isso os
     rótulos são substantivos: o eyebrow AUTOTESTE nomeia a coluna uma vez, e
     "sobreviveram"/"íntegros" é a afirmação que TODAS fazem —
     repetir em cada linha é ruído, não dado. Maior rótulo:
     "Canal de programação", 172 em 180. */
var AUTOTESTE_ENCERRAMENTO = [ /* as sete, nesta ordem · três contadores, nunca "x de y" · o cartão pendente não bloqueia */
    { id: "configuracao",    rotulo: "Configuração", fonte: "versao" },
    { id: "contadores",      rotulo: "Contadores", fonte: "contador" },
    { id: "reset",           rotulo: "Reset de leitura", fonte: "reset", condicional: true,
      motivo: "o reset de leitura não foi usado" },
    { id: "id-cadastro",     rotulo: "ID no cadastro", fonte: "idCadastro", valor: "confere",
      nota: "e as pendências registradas" },
    { id: "canal",           rotulo: "Canal de programação", fonte: "canal", valor: "fechado" },
    { id: "repouso",         rotulo: "Repouso do módulo", fonte: "repouso", valor: "restaurado" },
    { id: "cartao",          rotulo: "Evento do cartão", fonte: "cartaoServidor", valor: "pendente",
      nota: "confere em até 24 h", bloqueia: false }
  ];

  /* LEGADO · a lista de bancada · NÃO aparece em tela: a T16 usa AUTOTESTE_ENCERRAMENTO (as sete), e a T12 mostra os três contadores */
  var AUTOTESTE_ASSERTIVAS = [
    "Posição GPS válida",
    "Ignição liga",
    "Ignição desliga",
    "Comunicação com o servidor",
    "Leitura do hodômetro",
    "Leitura do horímetro",
    "Leitor de cartão responde",
    "Memória de eventos grava"
  ];

  /* ── 13 instalações · 13 dias distintos · span 0–44 = 45 corridos.
     6 aprovadas puras · 2 aguardando puras · 1 falha reconhecida ·
     1 reprocessada · 1 reprovada · +2 ressalvadas (1 aprovada, 1 aguardando). */
  var INSTALACOES = comData([
    { id: "i-01", ativoId: "a-01", moduloSerial: "M2C-0417", diasAtras: 0,  hora: "11:47",
      estado: "aprovada", recebimento: { posicionamento: { estado: "conforme", posicoes: 3, emSeg: 72 }, eventos: { estado: "conforme", recebidoAosSeg: 24 } }, ressalva: null,
      etapas: { /* história completa do herói */
        /* ⚠ `preChecagem` FICA DECLARADO, sem leitor: é ETAPA, e etapa é o
           relatório. Consumidor: a tela web do gestor.
           no protótipo (T12) · a referência vence: o detalhe
           da T12/01 lê as etapas da i-01 (as sete linhas, com o readBack da
           cadeia), e o `resumo` das outras dá as quatro linhas que ele
           sustenta (T12·2). Nada aqui muda. */
        preChecagem: { checagens: 12, passaram: 12 },
        cadeia: [
          { bloco: "limpeza", hora: "10:02", readBack: "confirmado" },
          { bloco: "ativo",   hora: "10:06", readBack: "confirmado" },
          { bloco: "cercas",  hora: "10:11", readBack: "confirmado" },
          { bloco: "leitor",  hora: "10:15", readBack: "confirmado" },
          { bloco: "eventos", hora: "10:21", readBack: "confirmado" },
          { bloco: "conexao", hora: "10:26", readBack: "confirmado" }
        ],
        calibracao: { semeadas: [], puladas: [], nadaACalibrar: true },
        cicloDinamico: { completo: true, passos: ["Ignição ligada", "Rotação", "Cartão do motorista", "Ignição desligada"], confirmados: 4 },
        checklist: { itens: 27, concluidos: 27 }, autoteste: { aprovadas: 5, naoSeAplicam: 1, pendentes: 1 },
        recebimento: { confirmado: true, hora: "11:47" }
      } },
    { id: "i-02", ativoId: "a-03", moduloSerial: "M2C-0312", diasAtras: 1,  hora: "16:05",
      estado: "aguardando-validacao", ressalva: null,
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "5 aprovadas · 1 não se aplica · 1 pendente", recebimento: "confirmado" },
      etapas: { /* a referência vence (T12/04 e 05): o detalhe da PCX-9A17
                   mostra a instalação inteira, como a i-01, com os números que a
                   referência desenha · o `resumo` continua, pra a lista da T12 */
        preChecagem: { checagens: 8, passaram: 8 },
        cadeia: [
          { bloco: "limpeza", hora: "15:21", readBack: "confirmado" },
          { bloco: "ativo",   hora: "15:25", readBack: "confirmado" },
          { bloco: "cercas",  hora: "15:30", readBack: "confirmado" },
          { bloco: "leitor",  hora: "15:34", readBack: "confirmado" },
          { bloco: "eventos", hora: "15:39", readBack: "confirmado" },
          { bloco: "conexao", hora: "15:44", readBack: "confirmado" }
        ],
        calibracao: { semeadas: [], puladas: [], nadaACalibrar: true },
        cicloDinamico: { completo: true, passos: ["Ignição ligada", "Rotação", "Cartão do motorista", "Ignição desligada"], confirmados: 4 },
        checklist: { itens: 27, concluidos: 27 }, autoteste: { aprovadas: 5, naoSeAplicam: 1, pendentes: 1 },
        recebimento: { confirmado: true, hora: "16:05" }
      } },
    { id: "i-03", ativoId: "a-12", moduloSerial: "M2C-0402", diasAtras: 2,  hora: "10:22",
      estado: "aguardando-validacao",
      ressalva: { item: "Módulo fixado e posicionado", justificativa: "Suporte original quebrado; módulo fixado com abraçadeira reforçada" }, /* o item da Montagem que existe (o b-modulo) */
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "5 aprovadas · 1 não se aplica · 1 pendente", recebimento: "confirmado" } },
    { id: "i-04", ativoId: "a-19", moduloSerial: "M2C-0466", diasAtras: 4,  hora: "09:40",
      estado: "aprovada",
      ressalva: { item: "Foto do painel", justificativa: "Vidro do painel trincado — foto lateral autorizada pelo gestor" },
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "5 aprovadas · 1 não se aplica · 1 pendente", recebimento: "confirmado" } },
    { id: "i-05", ativoId: "a-14", moduloSerial: "M2C-0423", diasAtras: 6,  hora: "15:12",
      estado: "reprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "4 aprovadas · 1 não se aplica · 1 pendente", assertivaFalhou: "Contadores", recebimento: "confirmado" } },
    { id: "i-06", ativoId: "a-06", moduloSerial: "M2C-0362", diasAtras: 9,  hora: "13:58",
      estado: "falha-recebimento-reconhecida", ressalva: null,
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "5 aprovadas · 1 não se aplica · 1 pendente", recebimento: "não confirmado — falha reconhecida pelo técnico" } },
    { id: "i-07", ativoId: "a-16", moduloSerial: "M2C-0438", diasAtras: 13, hora: "08:31",
      estado: "aprovada-reprocessamento", ressalva: null,
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "5 aprovadas · 1 não se aplica · 1 pendente", recebimento: "confirmado após reprocessamento" } },
    { id: "i-08", ativoId: "a-02", moduloSerial: "M2C-0301", diasAtras: 17, hora: "14:03",
      estado: "aprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "5 aprovadas · 1 não se aplica · 1 pendente", recebimento: "confirmado" } },
    { id: "i-09", ativoId: "a-20", moduloSerial: "M2C-0472", diasAtras: 22, hora: "10:47",
      estado: "aguardando-validacao", ressalva: null,
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "5 aprovadas · 1 não se aplica · 1 pendente", recebimento: "confirmado" } },
    { id: "i-10", ativoId: "a-09", moduloSerial: "M2C-0371", diasAtras: 27, hora: "16:55",
      estado: "aprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "5 aprovadas · 1 não se aplica · 1 pendente", recebimento: "confirmado" } },
    { id: "i-11", ativoId: "a-13", moduloSerial: "M2C-0411", diasAtras: 33, hora: "09:18",
      estado: "aprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "5 aprovadas · 1 não se aplica · 1 pendente", recebimento: "confirmado" } },
    { id: "i-12", ativoId: "a-22", moduloSerial: "M2C-0480", diasAtras: 39, hora: "11:36",
      estado: "aprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "5 aprovadas · 1 não se aplica · 1 pendente", recebimento: "confirmado" } },
    { id: "i-13", ativoId: "a-17", moduloSerial: "M2C-0445", diasAtras: 44, hora: "15:29",
      estado: "aprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "27/27", autoteste: "5 aprovadas · 1 não se aplica · 1 pendente", recebimento: "confirmado" } }
  ]);

  /* ── T12 · A REGRA dos três critérios — não é campo por instalação.
     O que o `resumo` já diz não se reescreve (o veredito sai de
     `recebimento`, a razão da reprovada sai de `assertivaFalhou`); o que ele
     não tem são os três critérios, e eles DERIVAM do estado:
       aprovada / reprocessada / aguardando → os três chegaram; o que falta
         em aguardando é o gestor, não o dado.
       reprovada → `Ignição desliga` não passou: sem desligar a ignição o
         evento sai do parâmetro. (A viagem não é critério: o ciclo é parado — decisão 54.)
       falha reconhecida → nada chegou ao servidor, coerente com a secaoF.
     ⚠ UMA exceção declarada: i-09, posicionamento
     `atrasado` — posição que chegou tarde é exatamente o que um gestor não
     aprova sozinho, e sem ela a palavra seria vocabulário nunca visto.
     Os três números da janela (3 × intervalo + 2 min) e o teto de espera
     moram AQUI para não virarem literal de tela (Lei 8).
     no protótipo (T12) · nenhuma das quatro referências da T12 mostra os três
     critérios, a janela ou o teto (HU-T12-1 a 4 sem referência):
     no protótipo eles ficam sem leitor, e a T12 lê daqui só os `gruposIdade`
     (no fim do arquivo). Nada aqui muda. */
  var CRITERIOS_REGRA = {
    fatorJanela: 3,
    folgaJanelaSeg: 120,
    tetoEsperaMin: 10,
    porEstado: {
      "aprovada":                      { posicionamento: "conforme", eventos: "conforme" },
      "aprovada-reprocessamento":      { posicionamento: "conforme", eventos: "conforme" },
      "aguardando-validacao":          { posicionamento: "conforme", eventos: "conforme" },
      "reprovada":                     { posicionamento: "conforme", eventos: "fora do parâmetro" },
      "falha-recebimento-reconhecida": { posicionamento: "ausente",  eventos: "ausente" }
    },
    excecoes: { "i-09": { posicionamento: "atrasado" } }
  };

  /* ── Diagnóstico do módulo (T07 · decisão 44) — o que a tela mostra e de onde vem.
     Substitui a pré-checagem da conexão e os Dados da CAN. TRÊS linhas travam
     (serial, modelo, firmware); as outras só informam — o checklist registra.
     A CAN só aparece com o ATIVO, depois do bloco do ativo gravado: antes, ela
     não aparece, e nenhuma caixa espera por ela (decisão 61). */
  var DIAGNOSTICO = {
    modulo: [
      { id: "serial",      rotulo: "Serial no cadastro", heroi: "VL06 CAN-BT",        trava: "serial-nao-cadastrado", travaModelo: "modelo-sem-driver" },
      { id: "firmware",    rotulo: "Firmware",           heroi: "8.04",               trava: "firmware-fora-matriz" },
      { id: "alimentacao", rotulo: "Alimentação",        heroi: "24,3 V", faixa: "9,0 a 40,0 V" }, /* a faixa do modelo do módulo (o faixaTensao do VL06) · o herói é um ônibus de 24 V */
      { id: "gps",         rotulo: "GPS",                heroi: "antena conectada", info: "9 satélites" }, /* o critério é a antena: conectada, em curto, desconectada */
      { id: "entradas",    rotulo: "Entradas digitais",  heroi: "ignição ligada" },
      { id: "modem",       rotulo: "Modem",              heroi: "na rede",            informa: "modem-sem-sinal" },
      { id: "sim",         rotulo: "SIM",                heroi: "ativo" },
      { id: "chip",        rotulo: "Número do chip",     heroi: "8955 0312 4567 8901" }, /* o técnico confere com o impresso no chip */
      { id: "mensagens",   rotulo: "Mensagens no módulo", heroi: "0 mensagens ainda não enviadas", soInforma: true } /* não conta nem bloqueia */
    ],
    /* a CAN da biblioteca do modelo, na ordem que o bloco do Ativo grava (decisão 59): os seis
       contam (8 do módulo + 6 = 14) · ao vivo (`leituras`), só a rotação e a temperatura; o
       hodômetro, o horímetro, o combustível e o consumo total ficam parados — o ônibus está parado,
       e o consumo total é acumulado · o ônibus lê pela CAN o que o painel mostra (482.317 km,
       9.640 h) e não calibra nada · sem a ré e sem a velocidade (só como opcional da T10) */
    can: { modeloAtivoId: "ma-01", sinais: [
      { id: "rotacao", rotulo: "Rotação", lido: "980 rpm", leituras: ["980 rpm", "992 rpm", "975 rpm", "988 rpm"] },
      { id: "hodometro", rotulo: "Hodômetro", lido: "482.317 km" },
      { id: "horimetro", rotulo: "Horímetro", lido: "9.640 h" },
      { id: "temperatura", rotulo: "Temperatura", lido: "31 °C", esperado: "−40 a 120", leituras: ["31 °C", "31 °C", "32 °C", "31 °C"] },
      { id: "combustivel", rotulo: "Combustível", lido: "62%" },
      { id: "consumo", rotulo: "Consumo total", lido: "83.780 L" } ] }
  };

  /* ── Pacote de sincronização — um por EMPRESA (decisão 56: o contexto é a
     empresa), em TRÊS idades (T03). Idade → estado deriva NA TELA a partir dos
     limiares daqui. O pacote é o da empresa inteira: na Viação, os 24 ativos,
     as 2 conexões, os 3 modelos de ativo, os 12 eventos e as 8 cercas (as
     regiões dos ativos dela), 49 itens. As duas empresas espelho trazem os
     mesmos grupos da Viação, e só os ativos mudam (34 e 18): o mock não tem a
     frota delas, e depois da T03 elas andam com o mundo da Viação. */
  /* protótipo · segPorItem: a estimativa do servidor por item,
     de onde sai o "faltam ~1 min" da T03 (43 itens por baixar × 1,6 s =
     68,8 s: até 10 s, no segundo; até 59 s, na dezena; de 60 s pra cima, no
     minuto — a mesma regra da T09). A versão do pacote deriva da empresa e
     da data (pct-emp01-2026-03-11, T03·2), sem campo. */
  var PACOTES = comData([
    { id: "pac-emp-01", empresaId: "emp-01", diasAtras: 1, hora: "07:10", segPorItem: 1.6,
      limiares: { avisoDias: 3, bloqueioDias: 7 },
      presetsEventoIds: ["pe-urbano", "pe-rodoviario", "pe-maquina"],
      contem: { ativos: 24, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 8 } },
    { id: "pac-emp-02", empresaId: "emp-02", diasAtras: 4, hora: "06:55", segPorItem: 1.6,
      limiares: { avisoDias: 3, bloqueioDias: 7 },
      presetsEventoIds: ["pe-urbano", "pe-rodoviario", "pe-maquina"],
      contem: { ativos: 34, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 8 } },
    { id: "pac-emp-03", empresaId: "emp-03", diasAtras: 8, hora: "07:30", segPorItem: 1.6,
      limiares: { avisoDias: 3, bloqueioDias: 7 },
      presetsEventoIds: ["pe-urbano", "pe-rodoviario", "pe-maquina"],
      contem: { ativos: 18, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 8 } }
  ]);

  /* ── Fila de saída (T15) — tempo parado deriva de criadoAs vs 14:30.
     Erro de rede reenvia SOZINHO; recusa do servidor exige ação do
     técnico, NUNCA silenciosa. Seção F em re-checagem é seção separada. */
  var FILA_SAIDA = comData([
    { id: "f-01", tipo: "Evidências da instalação",  ativoId: "a-03", diasAtras: 0, criadoAs: "14:28", estado: "na-fila" },
    { id: "f-02", tipo: "Checklist de homologação",  ativoId: "a-12", diasAtras: 0, criadoAs: "14:12", estado: "na-fila" },
    { id: "f-03", tipo: "Checklist de homologação",  ativoId: "a-20", diasAtras: 0, criadoAs: "11:30", estado: "na-fila" },
    /* tamanhoMb — SÓ no corrente, um campo com UM leitor: é a escala
       do progresso (`62% · 8,4 MB`) e o que explica por que uma evidência
       demora e a outra não. Nos outros nove seria número sem decisão. */
    { id: "f-04", tipo: "Evidências da instalação",  ativoId: "a-09", diasAtras: 0, criadoAs: "14:29", estado: "enviando", progresso: 62, tamanhoMb: 8.4 },
    { id: "f-05", tipo: "Evidências da instalação",  ativoId: "a-01", diasAtras: 0, criadoAs: "09:02", estado: "recebida", confirmadoAs: "09:14" },
    { id: "f-06", tipo: "Checklist de homologação",  ativoId: "a-01", diasAtras: 0, criadoAs: "09:03", estado: "recebida", confirmadoAs: "09:15" },
    { id: "f-07", tipo: "Checklist de homologação",  ativoId: "a-03", diasAtras: 1, criadoAs: "16:20", estado: "recebida", confirmadoAs: "16:40" },
    { id: "f-08", tipo: "Evidências da instalação",  ativoId: "a-12", diasAtras: 2, criadoAs: "09:48", estado: "recebida", confirmadoAs: "10:05" },
    { id: "f-09", tipo: "Evidências da instalação",  ativoId: "a-19", diasAtras: 0, criadoAs: "13:40", estado: "erro-rede",
      reenvio: "automático", tentativas: 3, proximaTentativaAs: "14:32" },
    /* motivo ENCURTADO, medido: a frase do servidor dá 585,7 na faixa
       de 296 do Checagem (três linhas), e `O servidor recusou o pacote` é o
       que a coluna da direita já diz em `recusado`. O conflito de instalação
       não é recusa: a recusa é o pacote vencido. */
    { id: "f-10", tipo: "Evidências da instalação",  ativoId: "a-14", diasAtras: 0, criadoAs: "12:05", estado: "erro-recusa",
      reenvio: "manual", motivo: "o pacote de sincronização venceu" }, /* uma causa que o técnico resolve com o Ressincronizar · leitura nossa */
    { id: "f-11", tipo: "Evidências da instalação",  ativoId: "a-06", diasAtras: 0, criadoAs: "14:00", estado: "recebida-em-conflito", confirmadoAs: "14:12",
      aviso: "o gestor foi avisado" } /* o conflito não é recusa: o servidor aceita os dois registros e avisa o gestor · sem reenvio */
  ]);
  var SECAO_F = { emRecheck: true, ativoId: "a-06", instalacaoId: "i-06",
    motivo: "Confirmação de recebimento pendente desde a falha reconhecida" };

  /* ── Casos — cada estado de bloqueio/tela aponta para dado CONCRETO da
     obra. Nenhum é opcional: tela sem o seu caso morre sem dado. ── */
  var CASOS = {
    /* T12 · o que o servidor recebeu da PCX-9A17 (HU-T12-4): o pacote não
       declara o modo de fila do módulo, e o critério de eventos fica
       indisponível, com o motivo. O status geral espera. */
    "criterio-indisponivel": { tela: "T12", ativoId: "a-03", recebimento: {
      posicionamento: { estado: "conforme", posicoes: 3, emSeg: 72 },
      eventos: { estado: "indisponivel", motivo: "o pacote não declara a fila" } } },
    /* T12 · a falha de rede vira pendência (HU-T12-6): o servidor não
       respondeu, e o app confere de novo por 24 h — não reprova. */
    "criterio-pendente": { tela: "T12", ativoId: "a-03", recebimento: {
      posicionamento: { estado: "pendente", motivo: "sem resposta", confereDeNovoPorHoras: 24 },
      eventos: { estado: "conforme", recebidoAosSeg: 52 } } },
    /* T11 · a versão do módulo não se lê (HU-T11-1): ausente, truncada ou em
       formato desconhecido. O diff roda por conteúdo, bloco a bloco, e acha
       2 divergências. Corrigir as Cercas arrasta o Leitor e os Eventos. */
    /* T01 · os 3 envios da hora acabaram (HU-T01-7): o primeiro foi às
       14:12, e o reenvio libera às 15:12. O código enviado segue valendo. */
    "teto-de-envios": { tela: "T01", enviosNaHora: 3, primeiroEnvioAs: "14:12", liberaAs: "15:12" },
    /* T01 · outro usuário entra no aparelho (HU-T01-4): a sessão do anterior
       é encerrada, e a fila dele continua subindo. Os itens são os da fila
       do aparelho que ainda não chegaram, o mesmo número do cartão do menu
       e do diálogo de sair (decisão 64). */
    "outro-usuario": { tela: "T01", usuario: "m.souza", nome: "Marcos Souza",
      anterior: { usuario: "r.vieira", itensNaFila: 2 } },
    /* T15 · a fila vazia: o último item subiu às 14:02. */
    "fila-vazia": { tela: "T15", ultimoEnvioAs: "14:02" },
    /* T02 · o técnico com uma empresa só (HU-T02-1, decisão 56): o app pula
       a T02 — o Entrar vai direto à T03, com o pacote dela — e, no menu, o
       nome dela fica sem a seta e não é botão. Nenhuma referência desenha: é
       caso de teste (scripts/testar-empresa.mjs), não da coluna. */
    "uma-empresa": { tela: "T02", empresas: [
      { id: "emp-01", nome: "Viação Atlântico Sul", pacoteId: "pac-emp-01" } ] },
    /* T01 · o login de quem abre o app. O herói entra com os dois campos
       preenchidos, pra o palco andar num toque. Os dois casos abaixo são o
       que o técnico vê de verdade: nada lembrado, ou só o usuário lembrado
       (HU-T01-3 · a senha nunca fica guardada). */
    "primeiro-acesso": { tela: "T01", usuarioLembrado: null },
    "usuario-lembrado": { tela: "T01", usuarioLembrado: "r.vieira" },
    /* T13 · a localização negada (HU-T13-7). Nada trava: o checklist
       homologa igual, e o relatório vai sem a geolocalização — o veredito
       diz "o relatório vai sem localização". */
    "localizacao-negada": { tela: "T13", permissao: "localizacao", resposta: "negada" },
    /* O mundo real · quatro estados que não dependem do módulo nem do
       ativo, e sim do celular. Nenhum trava o que já foi feito.
       - bluetooth-desligado: a T05 não busca · "Ligar o Bluetooth" pede ao
         Android, e a busca começa sozinha quando ele liga
       - bluetooth-sem-permissao: "Permitir" pede de novo · se o técnico
         marcou "não perguntar de novo", o botão vira "Abrir as configurações"
       - camera-sem-permissao: a câmera do app não abre · "Abrir as
         configurações" · vale pra câmera da T10 e do checklist
       - sem-conexao-no-login: o login precisa de rede · os campos ficam
         preenchidos, porque a senha não estava errada */
    "bluetooth-desligado": { tela: "T05", bluetooth: "desligado" },
    "bluetooth-sem-permissao": { tela: "T05", permissao: "bluetooth", resposta: "negada" },
    "sem-conexao-no-login": { tela: "T01", rede: false },
    /* T10 · a releitura que não confere (HU-T10-5). O técnico semeou
       482.317 km, e o módulo releu 482.316,5 km: 500 m a menos. A tolerância
       do hodômetro é calibracao.tolerancia.hodometro.desvio = 120 m — então
       não confere, e a tela pede "Semear de novo". A foto continua valendo:
       ela prova o painel, não o módulo. relidoBruto em metros, como bruto. */
    "releitura-nao-confere": { ativoId: "a-09", grandeza: "hodometro", relidoBruto: 87711500 }, /* o caminhão coletor é o exemplo que calibra — 500 m a menos que os 87.712 do painel (T10/10) */
    "serial-nao-cadastrado": { serial: "M2C-0999" },
    /* T12 — a CONSULTA ANTERIOR, declarada: `consultado hoje às 11:47`
       é valor da obra, não derivado de i-01. O offline se alcança por AÇÃO
       (o primeiro `Atualizar` não acha rede), nunca ligado por padrão,
       e offline neste produto é condição de trabalho, não erro.
       no protótipo (T12) · nenhuma referência da T12 tem o `Atualizar`:
       no protótipo a T12/03 abre pela coluna do palco, com a lista
       da empresa e esta hora no aviso. Nada aqui muda. */
    "instalacoes-sem-rede": { consultadoAs: "11:47", diasAtras: 0 },
    "modelo-sem-driver": { moduloSerial: "M2C-0497", ativoId: "a-21",
      motivo: "O app ainda não configura o VC07 STD." },
    /* ⚠ sem `firmwareLido`: o firmware lido é modulos["M2C-0451"].firmware
       ("8.01"), que é o que a T07 lê (`contextoDe`). Duas fontes para o
       mesmo fato é uma que pode divergir. `firmwareDisponivel` tem leitor na T07. */
    "firmware-fora-matriz": { moduloSerial: "M2C-0451", ativoId: "a-18",
      firmwareDisponivel: "8.04" },
    "conteudo-nao-cabe": { ativoId: "a-10", moduloSerial: "M2C-0394",
      conteudoRegistros: 131, capacidadeRegistros: 127, dimensao: "contadores" }, /* T09/06, num VL06 FULL: São 131 contadores. Nenhum VL06 guarda mais que 127. */
    /* a memória que os pontos de cerca e os cartões dividem (decisão 59): 5.980 + 240 = 6.220, contra os
       6.143 do VL06 (o pontosCercaMax da matriz) · T09/07: São 5.980 pontos de cerca e 240 cartões. Nenhum VL06 guarda mais que 6.143. */
    "pool-esgotado": { ativoId: "a-05",
      dimensao: "memoria", pontosCerca: 5980, cartoes: 240 },
    /* T06/04 · o ônibus de outra empresa (decisão 56): está no cadastro do M2,
       mas é da Expresso Caruaruense, e não veio no pacote da Viação (pacoteId).
       Ele vem no próprio caso — os 24 do mock são todos da Viação —, e a busca
       da T06 que acha a placa dele abre a trava: *Pertence à Expresso
       Caruaruense.* (o nome sai de empresaId, com o artigo de *a empresa*). */
    "ativo-fora-pacote": { pacoteId: "pac-emp-01",
      ativo: { id: "a-fora", placa: "PHS-2C47", frota: "3008", modeloAtivoId: "ma-01", empresaId: "emp-03", moduloSerial: null } },
    /* ocupadoPor "sensor de porta" é ENTRADA DIGITAL (checagem #5
       de T05); consumidores é o PAR SERIAL (entrada do leitor + saída de
       transmissão) da matriz de T06. Linhas físicas diferentes, dois
       assuntos — não fundir. O fio azul é a entrada do leitor serial (IN3), e
       o sensor de porta já está nele (T06/06: O fio azul já está ocupado.). */
    /* não há "conflito-pinos-resolvivel": o leitor sai do cadastro do modelo, e trocar o meio nunca resolve */
    "conflito-pinos-sem-saida": { ativoId: "a-11", moduloSerial: "M2C-0389",
      recurso: "leitor", fio: "fio azul", ocupadoPor: "sensor de porta",
      saida: "escalonar ao gestor: é erro de projeto de instalação",
      consumidores: ["leitor serial", "sensor de porta"] },
    /* o 135 °C fora do esperado: o 215 °C é o valor que a CAN devolve como não disponível, e é
       sem leitura, nunca um número (decisão 59) */
    "can-fora-esperado": { ativoId: "a-02", sinal: "temperatura",
      lido: "135 °C", esperado: "-40 a 120 °C" } /* a velocidade não aparece fora da T10 */,
    "grandeza-indisponivel": { modeloAtivoId: "ma-02", grandeza: "horímetro",
      motivo: "A leitura desta linha não fornece horímetro. Use o valor do painel na próxima revisão." },
    /* no protótipo (T11) · o que a T11 lê destes dois casos. Do diff-divergente: o par, o bloco, o
       noModulo (a linha vermelha do par) e o noCadastro. Do indice-nao-classificado: só a existência e
       o par; posicao e motivo FICAM DECLARADOS, sem leitor — a frase da nota
       é a do textos.md, e a posição na memória é vocabulário que o técnico
       não lê. O noCadastro do Leitor e dos Eventos não bate com o cadastro do
       ma-02 (fio verde; pe-rodoviario, 60 s): no par dele, a
       tela mostra o que o caso declara. A Conexão diz a operadora e a APN do
       chip: o antigo, da Claro, no módulo; o do cadastro, da TIM (decisão 59). */
    "diff-divergente": { ativoId: "a-16", moduloSerial: "M2C-0438",
      /* a conferência segue a ORDEM DO SCRIPT: ativo, cercas, leitor, eventos, conexão ·
         o ativo confere: o módulo traduz a CAN do OF-1621 */
      ordem: ["ativo", "cercas", "leitor", "eventos", "conexao"],
      confere: [ { bloco: "ativo", valor: "traduz a CAN do OF-1621" } ],
      divergencias: [
        { bloco: "cercas",  noModulo: "3 regiões",         noCadastro: "4 regiões" },
        { bloco: "leitor",  noModulo: "fio verde",         noCadastro: "fios azul e amarelo" },
        { bloco: "eventos", noModulo: "intervalo 60 s",    noCadastro: "intervalo 30 s" },
        { bloco: "conexao", rotulo: "Conexão", noModulo: "Claro · claro.com.br", noCadastro: "TIM · timbrasil.br" } /* o bloco se chama Conexão em T09, T11 e T13 */
      ],
      /* sem o Extended ID na divergência: cartão é assunto da plataforma web */
      }, 
    "indice-nao-classificado": { ativoId: "a-16", moduloSerial: "M2C-0438",
      posicao: 7, motivo: "Conteúdo gravado que o app não reconhece — não pertence a nenhum bloco." },
    /* no protótipo (T11) · o par que CONFERE (T11/02, T11·1 a): a
       T11 aberta pelo menu com a sessão do herói não acha divergência e vai
       pro "tudo confere". Caso ADITIVO e SEM VALOR DECLARADO: o que o cadastro
       manda sai do cadastro do próprio par (o modelo do ativo, as regiões
       do ativo, os fios do leitor do modelo, o preset de eventos e a conexão
       da empresa), e a divergência só existe no par do diff-divergente. É o
       par que o endereço do 02 monta, e ele desfaz o "diff-divergente,
       invertido" do índice: o 02 tem a faixa do herói E o cadastro do herói.
       O Leitor sai do cadastro do modelo do ativo (leitor.fios: "fios azul e
       amarelo" no ma-01, decisão 59), nunca do meio da sessão. */
    "conferencia-confere": { ativoId: "a-01", moduloSerial: "M2C-0417" },
    /* noEncerramento, ADITIVO: a assertiva de BANCADA que falha aqui
       ("Ignição desliga") é da lista de T12/T13 e fica intacta — no
       encerramento o que um reinício reprova de verdade é o CONTADOR, que
       volta zerado. Mesmo ativo, mesma consequência: bloqueia a homologação,
       não o encerramento (HU-T16-5). */
    "autoteste-falhando": { instalacaoId: "i-05", ativoId: "a-14",
      falhou: "contadores", aprovadas: 4, naoSeAplicam: 1, pendentes: 1, /* T16/05 · as sete do encerramento, em três contadores */
      efeito: "bloqueia a homologação, não o encerramento",
      noEncerramento: { assertiva: "contadores", lido: "0 km",
        causa: "o módulo voltou com a leitura zerada" } },
    /* não há "identificador-divergente": o técnico confere o cartão com o número impresso, o app não compara com cadastro */
    /* (HU-T16-6) · o último bloco confirmado POR READ-BACK — é o que a retomada mostra e o que faz o TEMPO
       DECORRIDO existir de verdade (13:05 → 14:30 = 1h25). 3 confirmados = limpeza · ativo · cercas, e o
       ponto de retomada é o bloco 4 (Leitor) — coerente com pontoRetomada. O que já foi gravado deriva de ultimoConfirmado e da ordem da cadeia (decisão 49). */
    "sessao-interrompida": { ativoId: "a-13", moduloSerial: "M2C-0411",
      diasAtras: 0, iniciadaAs: "13:05", pontoRetomada: "Bloco 4 de 6 — Leitor",
      confirmados: 3, ultimoConfirmado: "cercas" },
  };
  CASOS["sessao-interrompida"].data = diasAntes(0);
  /* protótipo (T07) · a atualização do firmware (T07/06): o
     quadro que a referência desenha, 62% gravados ("atualizando · 62%").
     Campo ADITIVO no caso: o par módulo × ativo e o firmwareDisponivel
     ficam intocados. O ritmo não é dado de negócio: o quadro fica 1 s
     (movimento.md · RITMOS.firmwareAtualizacaoMs), e o diagnóstico relê. */
  CASOS["firmware-fora-matriz"].atualizacao = { quadroPct: 62 };
  /* caso ADITIVO (recorte canônico acima intocado). Pacote velho + rede ruim é o caso de campo: a primeira
     sincronização do pacote BLOQUEADO (pac-emp-03, a Expresso Caruaruense, 8
     dias) falha no tick declarado; Reconectar retoma do mesmo `baixados` e
     completa. Constante declarada, não moeda: nada depende de quantas vezes a
     tela montou. É a T03/05: o pacote do aparelho venceu, e a
     saída é trocar de empresa. A T03/01, a Viação com o pacote de ontem
     valendo, é o caso sync-falha-rede-pacote-valido, no fim dos casos. */
  CASOS["sync-falha-rede"] = { pacoteId: "pac-emp-03", falhaNoTick: 4,
    motivo: "O que já baixou fica guardado." };
  /* T05 — casos ADITIVOS (decisão 1). Mesma forma do
     sync-falha-rede: constante DECLARADA, não moeda — sem gatilho no
     mock, quatro HUs de T05 seriam ramo cego.
       busca-vazia: a 1ª busca após chegar não encontra nada — o módulo leva
         segundos para acordar depois de alimentado. É o vazio mais importante
         do produto e precisa ser alcançável por navegação (HU-T05-1).
       conexao-falha: a 1ª tentativa neste módulo não responde. A causa vive
         no backend (senha divergente devolve recusa ou silêncio); em tela é UM
         estado com três coisas a checar (HU-T05-4). Tentar novamente conecta.
       link-perdido · modulo-em-repouso: gatilhos da HU-T05-9;
         declarados porque dado é aditivo.
       modulo-com-pendencias: o módulo do canal aberto (M2C-0362) guardou
         mensagens enquanto o canal ficou em programação — leitura que
         INFORMA, não trava (HU-T05-7). A rede do módulo NÃO entra aqui:
         "não conectada" seria a trava do #6, não uma leitura — um fato, um
         portador. */
  CASOS["busca-vazia"] = { tentativa: 1,
    motivo: "Aproxime o aparelho do módulo e confira se ele está alimentado." };
  CASOS["conexao-falha"] = { moduloSerial: "M2C-0301", ativoId: "a-02", tentativa: 1 };
  CASOS["link-perdido"] = { moduloSerial: "M2C-0312", ativoId: "a-03", naChecagem: 6 };
  CASOS["modulo-com-pendencias"] = { moduloSerial: "M2C-0362", ativoId: "a-06", mensagens: 12, diagnostico: 3 };
  /* protótipo (T05) · quanto a busca vazia durou (T05/03: "A
     busca durou 8 s · primeira tentativa"). Campo ADITIVO no caso: a
     tentativa e o motivo ficam intocados. É o tempo que a busca esperou
     resposta, fato desta tentativa — não é ritmo de animação. */
  CASOS["busca-vazia"].duracaoSeg = 8;
  /* protótipo (T07) · o firmware fora da matriz com o módulo SEM
     REDE: o MESMO par do firmware-fora-matriz (M2C-0451 × a-18), que fica
     intocado: aqui mora só o que muda, o modem do módulo sem rede. Sem rede,
     o firmware não baixa pelo módulo: a saída é gravar a conexão antes
     (HU-T07-3). A T07/05 lê o firmware-sem-rede-no-modulo, que aponta o mesmo par. */
  CASOS["firmware-fora-sem-rede"] = { moduloSerial: "M2C-0451", ativoId: "a-18", modem: "sem rede" };

  /* T07 — SINAIS DA CAN por modelo de ativo (bloco Ativo). ADITIVO: os
     três modelos ganham `sinaisCan`; nada acima muda. Cada sinal declara a
     FASE (estático = chave ligada, motor desligado · dinâmico = motor ligado /
     em movimento) e a FAIXA ESPERADA — sem faixa (esperado: null) é checagem de
     PRESENÇA: prova que a CAN informa; o valor é assunto de T10. Os domínios vêm DAQUI, não de
     constante: domínio sem sinal no modelo não aparece em tela — ma-02 não
     lê GPS pela CAN, ma-03 (máquina, gateway) não tem Velocidade nem
     Combustível. `lido` é a leitura NOMINAL do sinal estático com o módulo
     são; os casos abaixo sobrescrevem por ativo.
     ⚠ casos["can-fora-esperado"] (a temperatura, 135 °C) é sinal: não
     pode reprovar em T07 — fica intacto, reservado ao ciclo dinâmico (T14).
     A biblioteca do ma-01 (decisão 59): a rotação, o hodômetro, o horímetro, a
     temperatura, o combustível e o consumo total — o acumulado, estático e
     sem faixa. */
  /* o DOMÍNIO é a categoria, o SINAL é a grandeza: "Velocidade →
     Velocidade" e "Motor/Rotação → Rotação" repetiriam. Movimento e
     Motor seguem o padrão que Combustível → Consumo já tinha. ⚠ A spec
     nomeia "Velocidade" e "Motor/Rotação" — diferença de COPY sinalizada; o
     agrupamento é o mesmo.
     A exceção é o nível do tanque, que se chama Combustível: nenhuma tela
     mostra o nome do domínio (T07, T08), e "Nível" sozinho não dizia do quê.
     O id continua "nivel". */
  var DOMINIOS_CAN = ["Geral", "Sistema elétrico", "Movimento", "GPS", "Motor", "Combustível"];
  var SINAIS_CAN = {
    "ma-01": [
      { id: "ignicao",     dominio: "Geral",            rotulo: "Ignição",              fase: "estatico", esperado: "ligada",            lido: "ligada" },
      { id: "hodometro",   dominio: "Geral",            rotulo: "Hodômetro",            fase: "estatico", esperado: null,                lido: "482.317 km" },
      { id: "horimetro",   dominio: "Geral",            rotulo: "Horímetro",            fase: "estatico", esperado: null,                lido: "9.640 h" },
      { id: "satelites",   dominio: "GPS",              rotulo: "Satélites",            fase: "estatico", esperado: "4 ou mais",         lido: "9" },
      { id: "posicao",     dominio: "GPS",              rotulo: "Posição",              fase: "estatico", esperado: "fixa",              lido: "fixa" },
      { id: "rotacao",     dominio: "Motor",            rotulo: "Rotação",              fase: "dinamico", esperado: "600 a 2.500 rpm" },
      { id: "temperatura", dominio: "Motor",            rotulo: "Temperatura",          fase: "estatico", esperado: "−40 a 120 °C",      lido: "31 °C" },
      { id: "nivel",       dominio: "Combustível",      rotulo: "Combustível",          fase: "estatico", esperado: null,                lido: "62 %" },
      { id: "consumo",     dominio: "Combustível",      rotulo: "Consumo total",        fase: "estatico", esperado: null,                lido: "83.780 L" }
    ],
    "ma-02": [
      { id: "ignicao",     dominio: "Geral",            rotulo: "Ignição",              fase: "estatico", esperado: "ligada",            lido: "ligada" },
      { id: "hodometro",   dominio: "Geral",            rotulo: "Hodômetro",            fase: "estatico", esperado: null,                lido: "96.410 km" },
      { id: "rotacao",     dominio: "Motor",            rotulo: "Rotação",              fase: "dinamico", esperado: "600 a 2.200 rpm" },
      { id: "temperatura", dominio: "Motor",            rotulo: "Temperatura",          fase: "estatico", esperado: "−40 a 120 °C",      lido: "29 °C" },
      { id: "oleo",        dominio: "Motor",            rotulo: "Temperatura do óleo",  fase: "estatico", esperado: "−40 a 150 °C",      lido: "27 °C" },
      { id: "nivel",       dominio: "Combustível",      rotulo: "Combustível",          fase: "estatico", esperado: null,                lido: "48 %" }
    ],
    "ma-03": [
      { id: "ignicao",     dominio: "Geral",            rotulo: "Ignição",              fase: "estatico", esperado: "ligada",            lido: "ligada" },
      { id: "horimetro",   dominio: "Geral",            rotulo: "Horímetro",            fase: "estatico", esperado: null,                lido: "4.812 h" },
      { id: "satelites",   dominio: "GPS",              rotulo: "Satélites",            fase: "estatico", esperado: "4 ou mais",         lido: "7" },
      { id: "rotacao",     dominio: "Motor",            rotulo: "Rotação",              fase: "dinamico", esperado: "800 a 2.200 rpm" },
      { id: "temperatura", dominio: "Motor",            rotulo: "Temperatura",          fase: "estatico", esperado: "−40 a 120 °C",      lido: "34 °C" }
    ]
  };
  MODELOS_ATIVO.forEach(function (m) { m.sinaisCan = SINAIS_CAN[m.id] || []; });
  /* protótipo (T07) · a FAIXA ESPERADA em número.
     ADITIVO: o `esperado` (o texto do cadastro) fica intacto. O sinal cuja
     faixa é intervalo ("12,0 a 15,0 V") ou piso ("4 ou mais") ganha
     `faixa: { min, max }` com os mesmos números, na unidade do `lido`
     (max null = aberta pra cima). Ficam sem faixa em número: o esperado null
     (presença, e o acumulado: o hodômetro, o horímetro, o consumo total), o
     texto ("ligada", "fixa") e o "acima de 0 …" (dinâmico e estrito — é do
     ciclo dinâmico, T14). A checagem de cobertura confere, no bloco da T07. */
  var FAIXA_CAN = {
    "ma-01": { bateria: [12, 15], satelites: [4, null], rotacao: [600, 2500], temperatura: [-40, 120] },
    "ma-02": { bateria: [24, 29], rotacao: [600, 2200], temperatura: [-40, 120], oleo: [-40, 150] },
    "ma-03": { bateria: [12, 15], satelites: [4, null], rotacao: [800, 2200], temperatura: [-40, 120] }
  };
  MODELOS_ATIVO.forEach(function (m) {
    var f = FAIXA_CAN[m.id] || {};
    m.sinaisCan.forEach(function (s) {
      if (f[s.id]) s.faixa = { min: f[s.id][0], max: f[s.id][1] };
    });
  });
  /* Casos ADITIVOS da CAN lida — sobrescrevem o sinal do caso, na lista da T07
     do herói (a-01):
     isolado · a temperatura em 135 °C, uma leitura PRESENTE fora do esperado (T07/09) ·
       o 215 °C é o que a CAN devolve como não disponível, e isso é sem leitura,
       nunca um número (decisão 59)
     ausente · a rotação sem leitura, a ligação (T07/08) */
  CASOS["can-estatico-isolado"] = { ativoId: "a-01", sinal: "temperatura", lido: "135 °C", esperado: "−40 a 120" }; /* T07/09 */
  CASOS["can-estatico-ausente"] = { ativoId: "a-01", sinal: "rotacao", lido: null, motivo: "ligação" }; /* T07/08 */
  /* os casos das decisões 44 a 47 */
  CASOS["modem-sem-sinal"] = { moduloSerial: "M2C-0417", modem: "sem sinal" }; /* T07/07 · só informa: o checklist registra */
  CASOS["firmware-sem-rede-no-modulo"] = { base: "firmware-fora-matriz", modemSemRede: true }; /* T07/05 · trava, e não dá pra atualizar */
  CASOS["modulo-em-outro-ativo"] = { moduloSerial: "M2C-0417", vinculadoAoAtivoId: "a-18", registraDesvinculo: true }; /* T06/10 */
  CASOS["modulo-ja-deste-ativo"] = { moduloSerial: "M2C-0417", ativoId: "a-01", modo: "manutencao" }; /* T06/11 · T09/08-09 · o vínculo decide o modo */
  CASOS["sem-conexao-no-menu"] = { tela: "T04", rede: false };
  /* os casos das decisões 52 a 54 */
  /* QUEM DEPENDE DE QUEM: reenviar um bloco NUNCA reenvia outro sozinho · o app pergunta, um por vez, na ordem do script */
  var DEPENDENTES = { ativo: ["eventos"], cercas: ["leitor", "eventos"], leitor: ["eventos"], eventos: [], conexao: [] };
  var MOTIVOS_DEPENDENTE = { "cercas>leitor": "usa os cartões que as cercas apagaram", "cercas>eventos": "usam as cercas e o leitor", "ativo>eventos": "usam o ativo", "leitor>eventos": "usam o leitor" };
  var CONSEQUENCIA_REENVIO = { cercas: { titulo: "Reenviar as cercas apaga os cartões gravados no módulo.", texto: "Depois das cercas, o leitor e os eventos precisam ser reenviados para o módulo voltar a ler cartão. Os cartões voltam pela plataforma web." } };
  CASOS["cercas-reenviadas"] = { ativoId: "a-01", moduloSerial: "M2C-0417", modo: "manutencao", reenviado: "cercas", pendentes: ["leitor", "eventos"] }; /* T09/10 · T11/05 · os dependentes vêm de DEPENDENTES, na ordem do script */
  CASOS["falta-reenviar"] = { ativoId: "a-01", moduloSerial: "M2C-0417", modo: "manutencao", reenviado: "cercas", faltaReenviar: ["leitor", "eventos"] }; /* T09/16 · deixados para depois · o Finalizar do checklist fica desligado */
  CASOS["can-estatico-bateria"] = { ativoId: "a-02", moduloSerial: "M2C-0301", alimentacao: "8,4 V", lidos: { hodometro: "201.115 km" }, leitor: false }; /* T13/09 · o item da bateria reprovado · o ônibus da bateria fraca é desenhado sem leitor (T13/16: 3 fotos, 23 itens), como o sem-leitor da T14/12 */
  CASOS["motor-desligado-no-ciclo"] = { ativoId: "a-02", passo: "rotacao", lido: "0 rpm" }; /* T14/03 · o motor tem que estar ligado */ /* T04/15 · só o Últimas instalações depende da rede */
  /* ⚠ NÃO é falha — é COERÊNCIA, e por isso fica em a-09: o hodômetro que T07 lê é o mesmo que T10 calibra (bruto 87.604.000 m
     contra 87.712 no painel). Sem ele, T07 cairia no nominal de ma-02 (96.410)
     e contradiria a calibração no ativo do herói. */
  CASOS["can-estatico-hodometro"] = { ativoId: "a-09", lidos: { hodometro: "87.604 km" } };

  /* T09 — a CADEIA (decisões 49, 57 e 58; ordem e arraste intactos, a checagem de cobertura confere).
     escopos · o que a limpeza, o passo 1, apaga e o que preserva (HU-T09-3), pelo modo que o vínculo
       decidiu (decisão 46): na instalação nova, a COMPLETA (decisão 58) zera o módulo num comando só — a
       configuração, a rede, os contadores e as mensagens que ele guarda —, e a rede volta no último
       passo, na Conexão; os identificadores (os cartões) ficam: a limpeza completa do VL06 não apaga os
       IDs. Na manutenção, só o BLOCO escolhido, e a rede do módulo continua.
     conteudo · o módulo NÃO guarda versão (decisão 49): o que vai ser gravado em cada bloco, com as
       mesmas palavras da conferência (T11) — a T09 mostra no elo, antes de gravar (05). O leitor são
       os fios do cadastro do modelo; a conexão, a operadora e a APN do chip (decisão 59).
     etapas · cada etapa grava e confere contando na unidade dela (decisão 57), e a contagem vem do
       mundo: o Ativo grava o script padrão e depois a biblioteca da CAN do modelo, e conta os sinais
       dela (`conta: "sinais"`, os 6 de diagnostico.can no ma-01); as Cercas, os pontos das regiões do
       ativo (`conta: "pontos"`, CERCAS.regioes[].pontos: 120 no herói); o Leitor, os 4 ajustes; os
       Eventos, os eventos embarcados (12); a Conexão, os 3 ajustes — a APN, o servidor e o reinício
       do modem — e, gravada, ela confere pelo servidor, sem barra. A Limpeza não tem unidade: um
       comando só, e a barra vai pelo tempo, sem a passada de conferir.
       `seg` · a estimativa por unidade (o *faltam* é estimativa, não relógio), tirada dos quadros
       desenhados (T09/00 e 21 a 26); `segConferindo`, a da releitura, quando difere (as Cercas: 0,2 s
       por ponto); nas outras, a releitura usa a da gravação · a Limpeza, `segTotal` no total. O
       arredondamento é o da T03: até 10 s, no segundo; até 59 s, na dezena; de 60 s pra cima, no
       minuto.
     leituraFinal · os dois parâmetros críticos que a releitura final consolida (HU-T09-9) e que
       não derivam de outra coleção (os outros três: traducaoCan do modelo, preset de eventos,
       pontos de cerca do ativo): a APN lida do chip (a do cadastro da conexão) e o servidor. A APN
       aparece pra conferir (decisão 51); o endereço do servidor e o IP/DNS, nunca.
     Casos: bloco-recusado reusa o par de conexao-falha + can-estatico-isolado
       (a-02/M2C-0301: módulo que já falhou em responder —
       recusa Cercas UMA vez; pool-esgotado/a-05 não serve: trava em T05 e
       nunca abre sessão); queda-na-cadeia reusa o par de link-perdido (link
       ruim é história desse módulo), e `parouEm` diz quantos ajustes do Leitor o
       módulo já tinha recebido quando o link caiu (T09/02 e 03: *parou em 2 de 4 ajustes*).
     no protótipo (T09) · o `motivo` de bloco-recusado fica sem leitor: a
       causa na tela é o texto aprovado da T09/01, "os pontos das regiões não
       voltaram". E o a-02 não tem região de cerca em
       CERCAS.regioes: a recusa de Cercas cai num ônibus sem cercas
       — pendência, sem mudar o dado. */
  CADEIA.escopos = {
    completa: { modo: "instalacao", apaga: ["configuracao", "rede", "contadores", "mensagens"], mantem: ["identificadores"] }, /* a rede volta no último passo */
    bloco:    { modo: "manutencao", apaga: ["bloco"], mantem: ["outros-blocos", "rede", "contadores", "mensagens", "identificadores"] }
  };
  /* O módulo NÃO guarda versão (decisão 49): a cadeia declara o CONTEÚDO de cada bloco,
     com as mesmas palavras da conferência (T11) — é o que a T09 mostra em cada elo. */
  CADEIA.conteudo = { ativo: "OF-1621", cercas: "4 regiões", leitor: "fios azul e amarelo", eventos: "intervalo 30 s", conexao: "TIM · timbrasil.br" }; /* a operadora e a APN do chip; o endereço do servidor, nunca */
  CADEIA.etapas = {
    limpeza: { segTotal: 17 },                                      /* T09/21: apagando tudo, aos 40% · faltam ~10 s */
    ativo:   { conta: "sinais", seg: 3 },                           /* T09/22: 4 de 6 sinais da CAN · faltam ~6 s */
    cercas:  { conta: "pontos", seg: 0.42, segConferindo: 0.2 },    /* T09/23: 72 de 120 pontos · ~20 s · T09/24, conferindo: 80 de 120 · ~8 s */
    leitor:  { conta: "ajustes", total: 4, seg: 1.5 },              /* T09/00: 2 de 4 ajustes · faltam ~3 s */
    eventos: { conta: "eventos", seg: 1.4 },                        /* T09/25: 5 de 12 eventos · faltam ~10 s */
    conexao: { conta: "ajustes", ajustes: ["apn", "servidor", "reinicio-do-modem"], seg: 3 } /* T09/26: 2 de 3 ajustes · faltam ~3 s */
  };
  CADEIA.leituraFinal = { apn: "timbrasil.br", servidor: "principal" };
  CASOS["bloco-recusado"] = { ativoId: "a-02", moduloSerial: "M2C-0301", bloco: "cercas",
    motivo: "O módulo não confirmou os pontos das áreas." };
  CASOS["queda-na-cadeia"] = { ativoId: "a-03", moduloSerial: "M2C-0312", noBloco: "leitor", parouEm: 2 };

  /* T10 — CALIBRAÇÃO, tudo ADITIVO (âncoras da checagem de cobertura
     intactas: nada acima muda). Quatro grandezas, DUAS NATUREZAS — e é isso que muda a tela.
     `natureza` é chave de CÓDIGO, nunca texto de tela:
       ajuste  · o técnico confirma a condição que lê no painel e o módulo
                 calcula sozinho (rotação, velocidade). O número calculado
                 nunca aparece (princípio 1).
       partida · o módulo recebe o valor INICIAL lido no painel (hodômetro,
                 horímetro). Ele digita km e horas; `fatorEnvio` converte para
                 a unidade do módulo e a conversão não aparece em lugar nenhum.
     ROTAÇÃO é a grandeza; rpm é a unidade — só aparece junto de número.

     porModelo é CADASTRO (princípio 2), não derivação de sinaisCan: o sinal
     existir na tradução não quer dizer que o veículo o entrega confiável. A
     tradução urbano v3 (ma-01) entrega rotação boa — por isso lá ela "já vem
     da CAN"; a frota v2 (ma-02) não, e lá a rotação se calibra. Grandeza que o
     modelo NÃO TEM não entra em lista nenhuma (ma-03 não tem hodômetro):
     indisponível é o que existe e não se calibra.
     Motivos CURTOS de propósito — moram na coluna de 124 do Checagem.
     ⚠ ESTA É A FONTE ÚNICA: os modelos não declaram `grandezasCalibraveis`
     nem `grandezasIndisponiveis`, e a forma curta do motivo daqui é a que
     existe. */
  var CALIBRACAO = {
    grandezas: [
      { id: "rotacao",    rotulo: "Rotação",    natureza: "ajuste",  unidade: "rpm",  icone: "activity" },
      { id: "velocidade", rotulo: "Velocidade", natureza: "ajuste",  unidade: "km/h", icone: "gauge" },
      { id: "hodometro",  rotulo: "Hodômetro",  natureza: "partida", unidade: "km",   icone: "map",
        rotuloCampo: "Quilômetros no painel", fatorEnvio: 1000 },
      { id: "horimetro",  rotulo: "Horímetro",  natureza: "partida", unidade: "h",    icone: "clock",
        rotuloCampo: "Horas no painel",       fatorEnvio: 3600 }
    ],
    porModelo: {
      "ma-01": { calibraveis: [], nadaACalibrar: "Rotação e hodômetro vêm direto do veículo." }, /* o ônibus lê tudo pela CAN: T10/11 */
      "ma-02": { calibraveis: ["hodometro", "rotacao", "velocidade", "horimetro"], opcionais: ["velocidade", "horimetro"] }, /* o exemplo que calibra · a velocidade só com tacógrafo digital, o horímetro do compactador · a contagem só dos obrigatórios */
      "ma-03": { calibraveis: ["horimetro"], opcionais: ["horimetro"],
        indisponiveis: [{ grandeza: "rotacao", motivo: "já vem da CAN" }] }
    },
    /* o MÓDULO derruba o que o cadastro dá: variante sem leitura de pulsos não
       mede rotação nem velocidade. Deriva de matrizCapacidades.pulsos — não é
       lista nova. Alcançável em a-22 (M2C-0480, VL06 CAN). */
    motivoSemPulsos: "não lê pulsos",
    /* a condição que o cadastro manda o técnico reproduzir no painel */
    alvos: { rotacao: { valor: 1200 }, velocidade: { valor: 60 } },
    /* HU-T10-5 · a tolerância do read-back, SEMPRE na unidade do REPORTE
       (minutos para horímetro, metros para hodômetro): granularidade do módulo
       + o que o veículo andou entre semear e reler. `porUnidade` converte a
       unidade de tela na de reporte; `desvio` é o que o módulo devolve acima do
       semeado — a ficção que torna a tolerância visível em vez de decorativa.
       Horímetro fecha NO LIMITE (3 = 1 + 2): é o caso que prova que comparação
       estrita reprovaria toda calibração.
       ⚠ `reporte` FICA DECLARADO, sem leitor de tela: é a
       unidade em que `granularidade`, `decorrido` e `desvio` estão escritos,
       e esses três têm leitor. Sem ele os números ficam mudos — `1 · 2 · 3`
       do horímetro são minutos, não horas. Consumidor: o módulo, que reporta
       nessa unidade; a tela converte por `porUnidade` e mostra em
       `grandeza.unidade`. */
    tolerancia: {
      rotacao:    { granularidade: 10,  decorrido: 0,  reporte: "rpm",     porUnidade: 1,    desvio: 4 },
      velocidade: { granularidade: 1,   decorrido: 0,  reporte: "km/h",    porUnidade: 1,    desvio: 1 },
      hodometro:  { granularidade: 100, decorrido: 40, reporte: "metros",  porUnidade: 1000, desvio: 120 },
      horimetro:  { granularidade: 1,   decorrido: 2,  reporte: "minutos", porUnidade: 60,   desvio: 3 }
    },
    /* o que está escrito no painel do veículo hoje (campo nasce
       preenchido com dado do mock). O a-01 lê pela CAN o que o painel mostra
       (482.317 km, 9.640 h) e não calibra nada (decisão 59); o a-09 vai à
       frente do que a CAN reporta (87.604) — é exatamente a diferença que a
       calibração corrige. */
    painel: {
      "a-01": { hodometro: 482317, horimetro: 9640 },
      "a-09": { hodometro: 87712, horimetro: 3120 },
      "a-22": { hodometro: 121480 }
    },
    /* leitura BRUTA do contador do módulo, na unidade de ENVIO (metros,
       segundos). HU-T10-7: recalibrar recomputa valorPainel×fator − bruto,
       nunca ajuste anterior + delta. NUNCA renderizado. */
    bruto: {
      "a-01": { hodometro: 482317000, horimetro: 34704000 }, /* o do painel: 482.317 km e 9.640 h (× 3.600) · a diferença do herói é zero */
      "a-09": { hodometro: 87604000, horimetro: 10620000 }, /* o caminhão coletor tem horímetro · 2.950 h no módulo, o número da T10/08 (o bruto em segundos, fatorEnvio 3600) */
      "a-22": { hodometro: 121003000 }
    },
    /* última calibração conhecida, em dias atrás (0 = hoje; ausente = nunca) */
    ultimas: {
      "a-01": { hodometro: 0 },
      "a-09": { velocidade: 12, hodometro: 27 },
      "a-22": { hodometro: 39 }
    }
  };

  /* T13 — O CHECKLIST DE HOMOLOGAÇÃO, tudo ADITIVO (âncoras da checagem de
     cobertura intactas). O que entra aqui é a LISTA e a NATUREZA dos 30 itens — e nada
     além: nenhum valor lido é declarado, porque todos já existem na obra
     (cadeia, cercas, identificadores, presets, calibração, fila). Item que
     precisasse de número novo seria item inventado.

     `natureza` é chave de CÓDIGO: automatico | manual | dinamico | servidor.
     `fonte` é o que a tela deriva; `origem` é A TELA QUE LÊ O FATO — não a
     que fala dele (é o que transforma o checklist de relatório em ferramenta,
     HU-T13-2). Por isso a tensão de bateria devolve a T07, que é quem a lê na
     CAN, e as entradas digitais devolvem a T06, que é onde a matriz do arnês
     se resolve.
     no protótipo (T13·2 a): na tela, a bateria reprovada leva à T08, pelo
     texto aprovado 'Refazer a leitura da CAN' (T13/09); a T08 relê e devolve
     à T07 (HU-T08-3). `origem: "can"` continua dizendo quem lê o fato.

     ⚠ `foto` é do ITEM, não da seção: os cinco de B pedem foto, dois por
     CONDIÇÃO (`condicao`). Condição ausente = NÃO SE APLICA, fato declarado,
     nunca pendência. E `natureza: "manual"` com `foto: false` é a regra do
     `marcar todos` — hoje SEM NENHUM DONO, e por isso o controle não existe
     em tela (um controle para zero itens é a armadilha do Campo.aviso).

     ⚠ RÓTULOS MEDIDOS dentro da linha, nunca por multiplicação:
     o item manual tem 152 de faixa (maior: `Leitor posicionado`, 139,4) e o
     automático tem 176 (maior: `Movimento detectado`, 164,7). Os nomes das
     seções pagam a conta do fato à direita — ver o comentário da cabeça em
     chrome.css. */
  var PASSOS_CICLO = INSTALACOES.filter(function (i) { return i.id === "i-01"; })[0]
    .etapas.cicloDinamico.passos;
  var CHECKLIST = {
    secoes: [
      { id: "A", rotulo: "Identificação",  natureza: "automatico", bloqueia: true },
      { id: "B", rotulo: "Montagem",       natureza: "manual",     bloqueia: true },
      { id: "C", rotulo: "Hardware",       natureza: "automatico", bloqueia: true },
      { id: "D", rotulo: "Configuração",   natureza: "automatico", bloqueia: true },
      { id: "E", rotulo: "Ciclo de testes", natureza: "dinamico",   bloqueia: true },
      /* ⚠ A ÚNICA que não bloqueia (HU-T13-6): depende do servidor, não do
         módulo na frente do técnico. Segurá-lo no pátio por isso seria
         prendê-lo por algo que ele não resolve — e é por isso que finalizar
         com ela falhando exige CIÊNCIA, com nome e hora. */
      { id: "F", rotulo: "Servidor",       natureza: "servidor",   bloqueia: false }
    ],
    itens: [
      { id: "a-serial",    secao: "A", rotulo: "Serial do módulo",  fonte: "serial",   origem: "conectar" },
      { id: "a-firmware",  secao: "A", rotulo: "Firmware",          fonte: "firmware", origem: "conectar" },
      { id: "a-ativo",     secao: "A", rotulo: "Ativo vinculado",   fonte: "ativo",    origem: "ativo" },
      { id: "a-pacote",    secao: "A", rotulo: "Pacote de sincronização", fonte: "pacote", origem: "sincronizar" }, /* a A tem 4 itens */

      /* ⚠ O RÓTULO É O OBJETO; O VERBO É A RESPOSTA. `fixado`, `posicionado`,
         `protegido` e `livre` diriam a MESMA asserção cinco vezes — "está
         montado certo" —, que é exatamente o que o valor à direita responde
         (conforme · ressalvado · pendente). Informação que se repete em cinco
         de cinco linhas não é dado, é ruído, e ela faria
         três dos cinco quebrarem em duas linhas dentro do contêiner.
         `pergunta` guarda a frase inteira e é o TÍTULO DO NÍVEL 2: a lista
         varre em substantivos, e quem abre o item lê o que exatamente tem de
         conferir. Nada se perde. */
      { id: "b-modulo",         secao: "B", rotulo: "Módulo",     pergunta: "Módulo fixado e posicionado", enquadre: "Enquadre o módulo e o ponto de fixação",    foto: true },
      /* o lado de cima (decisão 60): a antena GPS fica dentro do módulo, desse lado, e a foto prova que ele está livre */
      { id: "b-lado-de-cima",   secao: "B", rotulo: "Lado de cima", pergunta: "Lado de cima do módulo livre", enquadre: "A antena GPS fica dentro, desse lado. Enquadre o módulo e o espaço acima dele.", foto: true },
      { id: "b-chicote",        secao: "B", rotulo: "Chicote",    pergunta: "Chicote e emendas protegidos", enquadre: "Enquadre o chicote e as emendas",   foto: true },
      { id: "b-leitor",         secao: "B", rotulo: "Leitor",     pergunta: "Leitor posicionado", enquadre: "Enquadre o leitor e onde ele está preso", foto: true, condicao: "leitor" },
      /* A foto do painel é tirada AQUI (decisão 52): a calibração não fotografa. O item só existe
         quando houve calibração na sessão — e aí é obrigatório, como as outras fotos da B. */
      { id: "b-painel-legivel", secao: "B", rotulo: "Painel",
        pergunta: "Painel com hodômetro e horímetro legíveis", enquadre: "Enquadre o painel, com os números legíveis",
        foto: true, condicao: "calibracao" },

      { id: "c-alimentacao", secao: "C", rotulo: "Alimentação",       fonte: "alimentacao", origem: "conectar" }, /* a tensão do fio de alimentação do equipamento, contra a faixa do modelo */
      { id: "c-gps",         secao: "C", rotulo: "GPS e antena",      fonte: "posicao",     origem: "conectar" }, /* o critério é a posição (decisão 60): com posição aprova, sem posição reprova · os satélites e a antena são informação */
      { id: "c-entradas",    secao: "C", rotulo: "Entradas digitais", fonte: "entradas",    origem: "ativo" },
      { id: "c-modem",       secao: "C", rotulo: "Modem e sinal",     fonte: "modem",       origem: "conectar" },

/* uma linha por bloco, cada uma confere ou não confere · depois, o autoteste, o canal protegido e o ID com o cadastro ·
         as pendências só aparecem quando o ID foi reescrito · a D começa vazia e enche conforme lê (T13/38) · sem hodômetro e horímetro */
      { id: "d-limpeza",    secao: "D", rotulo: "Limpeza",               fonte: "bloco:limpeza", origem: "configurar" },
      { id: "d-ativo",      secao: "D", rotulo: "Ativo",                 fonte: "bloco:ativo",   origem: "configurar" },
      { id: "d-cercas",     secao: "D", rotulo: "Cercas",                fonte: "bloco:cercas",  origem: "configurar" },
      { id: "d-leitor",     secao: "D", rotulo: "Leitor",                fonte: "bloco:leitor",  origem: "configurar", condicao: "leitor" },
      { id: "d-eventos",    secao: "D", rotulo: "Eventos",               fonte: "bloco:eventos", origem: "configurar" },
      { id: "d-conexao",    secao: "D", rotulo: "Conexão",               fonte: "bloco:conexao", origem: "configurar" },
      { id: "d-autoteste",  secao: "D", rotulo: "Autoteste",             fonte: "autoteste-encerramento", origem: "encerrar", valor: "roda ao encerrar", conta: false }, /* roda no encerramento, depois de Finalizar, e não conta */
      { id: "d-canal",      secao: "D", rotulo: "Canal de programação",  fonte: "canal",         origem: "configurar", valor: "protegido" },
      { id: "d-id",         secao: "D", rotulo: "ID no cadastro",        fonte: "idCadastro",    origem: "configurar" },
      { id: "d-pendencias", secao: "D", rotulo: "Pendências registradas", fonte: "pendencias",   origem: "configurar", condicao: "reescritaId" },

{ id: "f-posicao", secao: "F", rotulo: "Posição",         fonte: "servidor:posicao", origem: "servidor" }, /* esperando · confere · não chegou */
      { id: "f-evento",  secao: "F", rotulo: "Evento de teste", fonte: "servidor:evento",  origem: "servidor" }  /* a fila de envio é da T15 */
    ]
  };
  /* Os cinco de E são os passos CANÔNICOS do ciclo dinâmico — referência ao
     que i-01 já declara, nunca cópia (duas listas divergem no primeiro
     ajuste). Eles não se respondem aqui: T13 exibe e devolve a T14.
     ⚠ UM ÚNICO ENCURTAMENTO, medido: `Movimento detectado` pede 164,7 e a
     faixa do rótulo dentro do contêiner é 144. O passo canônico segue
     inteiro em `pergunta`; só a coluna encurta. */
  var E_ENCURTA = {};
  var E_CONDICAO = { "Rotação": "rotacao", "Cartão do motorista": "leitor" }; /* cada item só quando se aplica */ /* sem o "Movimento detectado" (ciclo parado); "Cartão do motorista" cabe inteiro na coluna */
  PASSOS_CICLO.forEach(function (p, i) {
    CHECKLIST.itens.splice(CHECKLIST.itens.filter(function (x) { return x.secao < "E"; }).length + i, 0,
      { id: "e-" + (i + 1), secao: "E", rotulo: E_ENCURTA[p] || p, pergunta: p, fonte: "ciclo", origem: "ciclo", condicao: E_CONDICAO[p] });
  });
  /* o bip do leitor é respondido no checklist, com o Testar bip (T13/05, 39 a 42), e não no ciclo · antes da ignição desligada · só com buzzer */
  CHECKLIST.itens.splice(CHECKLIST.itens.filter(function (x) { return x.secao < "E"; }).length + PASSOS_CICLO.length - 1, 0,
    { id: "e-bip", secao: "E", rotulo: "Bip do leitor", pergunta: "Você ouviu o bip?", fonte: "bip", origem: "checklist", condicao: "buzzer", respostas: ["Ouvi", "Não ouvi"] });
  /* caso ADITIVO — O ATIVO QUE CHEGA PRONTO PARA FECHAR. Sem ele, com
     T14 em placeholder, `Finalizar`, a ciência da Seção F e o estado
     finalizado seriam INALCANÇÁVEIS: a tela onde a instalação fecha
     entregaria sem ninguém poder ver ela fechar. Mesma regra do teto de
     reenvios (nasce em 2) — estado que só se alcança esperando não é
     revisável.
     DOIS FATOS NO MESMO ATIVO, e têm de ser o mesmo: E completa para o botão
     acender, e o servidor sem responder para o diálogo existir.
     ⚠ É a-09: o arnês dele é livre, e de quebra é
     ma-02: o horímetro dele NÃO SE APLICA, e a Seção D fecha com 9 aprovados
     e 1 declarado — o estado que prova que `não se aplica` não bloqueia.
     no protótipo (T06·2 a): o a-06 é escolhível na T06 — nenhum
     caso trava ele lá, e o M2C-0362 não dá conflito com ele. A escolha do a-09
     continua valendo pelo motivo acima (ma-02).
     A secaoF e a i-06 ficam INTACTAS: elas contam a história do a-06 para
     T12 e T15, e nada aqui as move. O herói fica com o outro caminho: Seção E
     aguardando e `Finalizar` bloqueado com motivo.
     ⚠ sem `cicloConcluidoAs` nem `motivo` — dado sem leitor é armadilha:
     a frase da tela é `o servidor não confirmou`, e um `motivo` aqui
     contradiria a tela. A causa vive em ChecklistScreen:249, e a hora do
     fechamento não tem onde ser dita sem abrir 2ª linha na Seção E.
     ⚠ `moduloSerial` TAMBÉM não tem leitor — sinalizado, não removido: é a
     convenção dos outros CASOS (sessao-interrompida, canal-aberto,
     diff-divergente) e o par ativo↔módulo é o que o caso documenta. */
  CASOS["pronto-para-fechar"] = { ativoId: "a-09", moduloSerial: "M2C-0371",
    recebimento: "sem resposta" };

  /* ═══ T14 — O CICLO DINÂMICO. Tudo ADITIVO (âncoras da checagem de
     cobertura intactas: nada acima muda).
     `prazoEventoSeg` e os dois degraus do evento são fato de NEGÓCIO e
     moram aqui; a CADÊNCIA de simulação (quantos ms vale um segundo de
     prazo) é constante declarada na tela, como TICK_MS em T03/T05 — nada
     no mock depende de quanto tempo a revisão leva.
     `mensagensGuardadas` é o tráfego que TODO módulo acumulou enquanto o
     canal esteve em programação: a drenagem é universal, não privilégio de
     um caso. `modulo-com-pendencias` (12 + 3) continua intacto e SOBREPÕE
     quando o serial da sessão é o dele — consumir só o caso deixaria a
     drenagem inalcançável, porque a-06 não é selecionável (ver o comentário
     de `pronto-para-fechar`). */
  var CICLO = {
    prazoEventoSeg: 120,
    evento: { recebidoAosSeg: 24, conferidoAosSeg: 33 },
    mensagensGuardadas: { mensagens: 6, diagnostico: 2 }
    /* sem viagem: o ciclo de testes é feito com o ônibus parado (decisão 54) — o hodômetro final é o inicial */
  };

  /* A leitura dos sinais de fase DINÂMICA — os que só existem com o veículo
     andando, e que por isso não têm `lido`.
     ⚠ Campo NOVO em vez de preencher `lido`: `lido` está documentado como a
     leitura do sinal ESTÁTICO, e T07 deriva a fase estática dele — preencher
     `lido` no dinâmico mudaria T07. Um campo, um
     consumidor (T14). O caso `can-fora-esperado` (a-02, a temperatura fora) sobrepõe estes valores, reservado
     ao ciclo dinâmico. */
  var LIDO_DINAMICO = {
    "ma-01": { rotacao: "980 rpm" }, /* parado, em marcha lenta (decisão 54) · o único sinal dinâmico da biblioteca do ônibus */
    "ma-02": { velocidade: "0 km/h", rotacao: "780 rpm" }, /* a velocidade só com tacógrafo digital — o ma-02 tem */
    "ma-03": { rotacao: "1.050 rpm" }
  };
  MODELOS_ATIVO.forEach(function (m) {
    var mapa = LIDO_DINAMICO[m.id] || {};
    (m.sinaisCan || []).forEach(function (s) {
      if (s.fase === "dinamico" && mapa[s.id]) s.lidoDinamico = mapa[s.id];
    });
  });

  /* O MODO DE EXTRAÇÃO do identificador — como o leitor daquele ativo extrai
     o código do cartão. É característica de CADASTRO (princípio 2) e NASCE
     CONFORME nos três modelos: `numero-impresso` = o número impresso no
     cartão, inteiro, com zeros e prefixo. Governa a comparação de T14 e
     ⚠ NUNCA APARECE EM TELA — nomeá-lo seria protocolo (princípio 1).
     ⚠ A divergência NÃO mora aqui: pendurada no modelo, ela cairia nos
     dezessete ma-01, o herói entre eles, e o fluxo feliz nunca fecharia. É
     exceção, e exceção neste projeto mora em CASO. */
  MODELOS_ATIVO.forEach(function (m) { if (m.leitor) m.leitor.modoExtracao = "numero-impresso"; });

  /* O caso mais representativo do produto tem ATIVO e CARTÃO (aditivo: os
     `exemplos` ficam intactos e é deles que sai o `lido`).
     ⚠ a-03 foi escolhido na NAVEGAÇÃO, não no papel: é ma-01 (o único com
     cartão), NÃO é o herói, e é da Viação — sem troca de empresa. Custo declarado:
     M2C-0312 perde o link na checagem 6 de T05 (reconecta com um toque) e
     cai uma vez no bloco Leitor de T09 (retoma com um toque); nenhum dos
     dois trava o ciclo. Descartados: a-01 (herói), a-02 (já carrega a temperatura fora do esperado), a-04 (fica com o evento sem resposta —
     duas falhas na mesma tela não se leem), a-05/a-10 (travam em T05),
     a-06 (não selecionável), a-07/a-08 (sem módulo), a-09 (ma-02, e é o
     ativo que fecha a instalação). */

  /* O evento de teste que não volta no prazo. Mesma forma do `conexao-falha`
     (constante DECLARADA, não moeda): a 1ª tentativa estoura, a 2ª confirma
     — e é essa a razão de campo do `Disparar novamente`, o técnico ainda no
     veículo resolvendo na hora em vez de descobrir no relatório dias depois.
     ⚠ a-04 e não a-02: a temperatura fora do esperado já é de a-02, e prazo
     estourado + sinal reprovado na mesma tela não se leem limpos. a-04 é
     ma-01, e o arnês dele é livre: o fluxo segue. */
  CASOS["evento-sem-resposta"] = { ativoId: "a-04", moduloSerial: "M2C-0335", tentativa: 1 };
  /* os casos das telas pendentes · padrão até a decisão de produto */
  CASOS["gps-fraco"] = { moduloSerial: "M2C-0417", posicao: "sem posição", satelites: 0, antena: "conectada" }; /* T13/21 e 22 · o critério é a posição; os satélites e a antena são informação */
  CASOS["entrada-ignicao"] = { moduloSerial: "M2C-0417", entradas: { ignicao: "desligada", esperado: "ligada" } }; /* T13/23 e 24 */
  CASOS["evento-nao-chega-de-novo"] = Object.assign({}, CASOS["evento-sem-resposta"], { tentativasQueEstouram: 2 }); /* T14/09 · ao contrário do "evento-sem-resposta", aqui a 2ª tentativa TAMBÉM estoura, e aparece o confira a conexão do módulo */
  CASOS["fila-parada"] = { fila: { paradaHa: "32 min", esperando: 2 } }; /* T04/16 · o aviso depois de 30 min parada */
  /* o que cada caso devolve a cada Reler o módulo: a 1ª releitura ainda reprova (o não resolvido), a 2ª passa (o relido) */
  CASOS["can-estatico-bateria"].releituras = [{ alimentacao: "8,8 V" }, { alimentacao: "24,3 V" }]; /* T13/30 */
  CASOS["gps-fraco"].releituras = [{ posicao: "sem posição", satelites: 0 }, { posicao: "com posição", satelites: 9 }]; /* T13/35 e 31 */
  CASOS["entrada-ignicao"].releituras = [{ entradas: { ignicao: "desligada", esperado: "ligada" } }, { entradas: { ignicao: "ligada", esperado: "ligada" } }]; /* T13/32 */
  CASOS["modem-sem-sinal"].releituras = [{ modem: "sem sinal" }, { modem: "na rede" }]; /* T13/33 */
  CASOS["sem-leitor"] = { ativoId: "a-01", leitor: false }; /* T14/12 · o ativo sem leitor: o ciclo em 3 passos, sem o cartão */
  CASOS["servidor-ainda-nao"] = { moduloSerial: "M2C-0417", falouComServidor: false, causas: ["chip", "lugar-do-modulo"] }; /* T09/12 · a prova vem do próprio módulo: o chip da operadora, no encaixe de cima, ativo, e o módulo fora de caixa de metal */
  CASOS["pareando"] = { moduloSerial: "M2C-0417", modeloId: "vl06", primeiraConexao: true }; /* T05/18 · só VL06, só na primeira vez · o VL08 não pareia */
  CASOS["reconectando"] = { moduloSerial: "M2C-0417", quedaPorInatividade: true, segundosParado: 30 }; /* T05/19 · reconectando, nunca falha */
  /* o módulo do herói com mensagens que ainda não enviou (decisão 58): a linha Mensagens no módulo da
     T07 diz "12 mensagens ainda não enviadas", e o Gravar no módulo da instalação nova abre antes a
     folha das mensagens (T09/27) · sem o caso, o herói tem 0 (T07/00) */
  CASOS["mensagens-pendentes"] = { moduloSerial: "M2C-0417", ativoId: "a-01", mensagens: 12 };

  /* protótipo (T10) · o hodômetro estático do a-22, o mesmo que a
     T10 calibra no módulo sem pulsos (T10/04): bruto 121.003.000 m ÷ fatorEnvio
     1000 = 121.003 km, contra 121.480 no painel. Sem ele, a T07 e a T08 leriam
     o nominal do ma-02 (96.410) e contradiriam a calibração do mesmo módulo.
     NÃO é falha — é coerência, como o can-estatico-hodometro do a-09. Fica no
     fim, pra não mudar a ordem das outras chaves. */
  CASOS["can-estatico-hodometro-a22"] = { ativoId: "a-22", lidos: { hodometro: "121.003 km" } };

  /* protótipo (T14) · quantos campos o servidor confere no evento
     de teste: o "6 de 6" da T14/05 sai daqui. É fato do evento, como
     os dois degraus (recebido e conferido). Campo ADITIVO. */
  CICLO.evento.campos = 6;
  /* protótipo (T14) · o passo do ciclo que cada sinal DINÂMICO
     prova. As chaves são ids de sinal
     dinâmico do ma-01; os valores, passos canônicos da i-01 (PASSOS_CICLO).
     A frase da causa é texto, do textos.md. */
  /* decisão 54: o ciclo é parado — a rotação pede o motor ligado (T14/03), e a velocidade só entra com
     tacógrafo digital (o passo dela não vem daqui). A ré e a porta não fazem parte do ciclo — fica só a rotação. */
  CICLO.passoDoSinal = { rotacao: "Rotação" };

  /* protótipo (T12) · os grupos por idade da lista das últimas
     instalações (T12·1 a): HOJE, ONTEM, ESTE MÊS e MAIS DE UM MÊS saem
     de diasAtras por um corte NOMEADO, e não pelo calendário — com o
     calendário, a QJF-2C61 (17 dias, 23/02) cairia em fevereiro e sairia de
     ESTE MÊS, e a referência deixaria de valer. Até `hoje` dias é HOJE, até
     `ontem` é ONTEM, até `esteMesAte` é ESTE MÊS, e acima é MAIS DE UM MÊS. O
     corte que reproduz a referência fica entre 17 e 26; 17 é o menor. É REGRA, como os critérios, e não campo por
     instalação: as 13 instalações ficam intocadas. */
  CRITERIOS_REGRA.gruposIdade = { hoje: 0, ontem: 1, esteMesAte: 17 };
  /* protótipo (T12) · a empresa sem nenhuma instalação (T12/02):
     o estado da T12 que só este caso produz (a Viação tem as 13). Caso
     ADITIVO: é a CONSULTA da empresa que volta vazia — `instalacaoIds` é o
     recorte que o servidor devolve, sem nenhum id —, e as 13 instalações
     ficam intocadas. Sem sessão aberta (`sessao: null`), como a referência
     desenha: a empresa vazia é a de quem trocou de empresa, e trocar de
     empresa encerra a sessão (T04/09). */
  CASOS["instalacoes-vazia"] = { instalacaoIds: [], sessao: null };

  /* protótipo (T15) · o rótulo curto de cada tipo da fila de
     saída: a linha da fila e o cartão do topo dizem
     `Evidências`, `Calibração` e `Checklist`. O tipo longo continua sendo o
     do servidor, e é ele que as fontes `fila:<tipo>` da seção F do checklist
     citam. `Registro da sessão` (T16/04) e `Diagnóstico` (T11) entram com o
     rótulo igual ao tipo: nenhuma referência os encurta. Lista FECHADA: todo
     filaSaida.tipo está aqui (a checagem de cobertura confere). Chave de topo
     no fim do objeto, pra não mudar a ordem das outras. */
  var TIPOS_FILA = [
    { tipo: "Evidências da instalação", rotuloCurto: "Evidências" },
    { tipo: "Checklist de homologação", rotuloCurto: "Checklist" },
    { tipo: "Registro da sessão",       rotuloCurto: "Registro da sessão" },
    { tipo: "Diagnóstico",              rotuloCurto: "Diagnóstico" }
  ];
  /* protótipo (T15) · a janela da re-checagem da Seção F, em
     horas (dominio.md:177-180, HU-T12-6): o app confere o recebimento por
     24 h antes de a instalação virar reprovada. É REGRA de estado, como os
     critérios, e não campo da secaoF. ⚠ A secaoF aponta a i-06, há 9
     dias em re-checagem — mais que a janela: a contradição fica pendente,
     e a T15/04 mostra a janela ('confere em 24 h'), como a
     referência desenha. */
  CRITERIOS_REGRA.recheckHoras = 24;
  /* protótipo (T15) · os três estados da fila de saída que
     só estes casos produzem. Cada caso é o RECORTE que a
     tela mostra, por id de filaSaida; a fila fica intocada.
       fila-sem-erro (T15/01): o envio corrente (f-04), um na fila (f-01) e
         três recebidas, nenhum erro. É o recorte que dá os 5 da referência.
       fila-dois-erros (T15/02): a recusa do servidor (f-10) e o erro de rede
         (f-09), mais o que anda sozinho (f-02, f-08). O '4' é o recorte: a
         fila é do aparelho, e não da empresa.
       fila-vazia (T15/03 e 04): nada esperando envio, sem sessão aberta (a
         referência desenha 'Sem sessão de configuração'), e o
         horário do último envio, que nenhum item do mock tem: o último
         confirmadoAs é 09:15. */
  CASOS["fila-sem-erro"] = { itens: ["f-04", "f-01", "f-05", "f-06", "f-07"] };
  CASOS["fila-dois-erros"] = { itens: ["f-10", "f-09", "f-02", "f-08"] };
  /* o caso fila-vazia é do design (ultimoEnvioAs); o protótipo só acrescenta a fila vazia e a sessão */
  Object.assign(CASOS["fila-vazia"], { itens: [], sessao: null });

  /* os desfechos (decisão 64): toda espera tem fim, e o que não volta tem estado. Casos ADITIVOS, no fim
     das chaves, pra não mudar a ordem das outras; nenhum dispara no fluxo do herói: abrem parados, pela coluna, e o
     `base` aponta o caso de que cada um nasce (como o firmware-sem-rede-no-modulo). */
  /* T03/01 · a Viação, com o pacote de ontem valendo, para no 7º item (6 de 24, a referência): Continuar com o pacote
     de ontem segue com ele · no fluxo, a primeira baixa do herói não cai */
  CASOS["sync-falha-rede-pacote-valido"] = { pacoteId: "pac-emp-01", falhaNoTick: 7,
    motivo: "O que já baixou fica guardado." };
  /* T05/20 · o celular não confirmou o pareamento no tempo limite: "não pareou", e Tentar de novo pede de novo */
  CASOS["pareamento-nao-confirmado"] = { base: "pareando", confirmou: false };
  /* T07/14 · a atualização parou onde a T07/06 desenha (62%) e não terminou */
  CASOS["atualizacao-nao-terminou"] = { base: "firmware-fora-matriz", parouEmPct: 62 };
  /* T09/31 a 33 · o Tentar de novo também recusado (o bloco-recusado recusa uma vez; este, duas): a saída grava só a
     Conexão e encerra sem terminar a instalação (HU-T09-10) */
  CASOS["bloco-recusado-de-novo"] = { base: "bloco-recusado", recusas: 2 };
  /* T09/35 · o Reconectar da queda passou do tempo limite: o módulo, zerado e sem a conexão, não voltou */
  CASOS["modulo-nao-voltou"] = { base: "queda-na-cadeia", voltou: false };
  /* T16/10 · o módulo do herói não voltou do reinício no tempo limite (o passo 2 do encerramento) */
  CASOS["reinicio-sem-volta"] = { moduloSerial: "M2C-0417", ativoId: "a-01", noPasso: "reinicio" };

  /* protótipo (T13) · o nível do item diz o
     nome curto da seção em toda tela ('B · MONTAGEM', 'C · HARDWARE'; a
     tabela dos nomes curtos com os dos requisitos está na ficha da T13), a
     frase de cada foto, embaixo do título, é o `enquadre` do item (o quadro
     da câmera fica só com o ícone, decisão 60), e o título do item
     reprovado (T13/09) é o `rotulo` do c-alimentacao, 'Alimentação'. */
  /* protótipo (T13) · a justificativa de exemplo do não conforme
     (T13/08): o campo nasce preenchido com dado do mock, e o técnico
     escreve por cima. */
  CHECKLIST.exemploJustificativa = "Suporte trincado; fixei com abraçadeira até a troca.";
  /* protótipo (T13) · as fotos de exemplo (decisão 63): o protótipo não
     tem câmera, então o `Tirar foto` mostra no quadro a foto do item
     (T13/44 a 48) e o `Fotografar o problema`, a do problema (T13/15). São
     desenhos em SVG, em `04-dados/fotos/`, no tamanho da foto da câmera
     deitada (660 × 480): o quadro mostra a foto inteira na largura e corta
     o que sobra, como o visor. Nenhum número inventado: a do painel diz o
     que `calibracao.painel` diz que está escrito nele, e por isso é uma por
     ativo (a do a-09, 87712 km e 3120 h, é a da referência T13/48; a do
     a-22 só tem o hodômetro). O caminho é relativo a `04-dados/`. */
  CHECKLIST.fotosDeExemplo = {
    "b-modulo": "fotos/b-modulo.svg",
    "b-lado-de-cima": "fotos/b-lado-de-cima.svg",
    "b-chicote": "fotos/b-chicote.svg",
    "b-leitor": "fotos/b-leitor.svg",
    "b-painel-legivel": { "a-01": "fotos/b-painel-legivel-a-01.svg", "a-09": "fotos/b-painel-legivel-a-09.svg", "a-22": "fotos/b-painel-legivel-a-22.svg" },
    problema: "fotos/problema.svg"
  };
  /* protótipo (T13) · quantas evidências o relatório da
     instalação leva: o '12 subiram' da Seção F (T13/06) e o '12 evidências'
     do homologado (T13/11). É fato do relatório que o Finalizar gera
     (HU-T13-7), e não conta de outra coleção. */
  CHECKLIST.evidencias = 12;
  /* protótipo (T13) · a leitura nominal do módulo que a Seção C
     mostra e que nenhuma coleção tem: as entradas digitais (4 de 4, T13/03),
     o sinal do modem (−71 dBm), com a faixa esperada do sinal (−100 a −60, a
     que a T13/03 desenha em lima), e a posição do GPS (com posição, T13/03:
     o critério do GPS, decisão 60; os satélites e a antena são os do
     diagnóstico, só informação). Vale pra todo módulo que conecta são: é o
     nominal, como o `lido` dos sinais da CAN. Chave de topo no fim do
     objeto, pra não mudar a ordem das outras. ⚠ 'dBm' é unidade de
     rádio na tela de quem lê negócio: o texto aprovado fica, e a
     palavra fica como pendência, junto da lacuna R3. */
  var LEITURA_NOMINAL_MODULO = { entradasUsadas: 4, entradasTotal: 4, modemDbm: -71, modemFaixa: { min: -100, max: -60 }, posicao: "com posição" };

  window.M2CF_MOCKS = {
    DIA_NOMINAL: "2026-03-12",
    HORA_NOMINAL: "14:30",
    diasAntes: diasAntes,

    empresa: { id: "emp-01", nome: "Viação Atlântico Sul" },
    /* as empresas que o técnico atende (decisão 56: o contexto é a empresa,
       e o app não tem unidade nem garagem). O herói é terceirizado: três
       empresas, cada uma com o pacote dela (pacoteId), nas três idades de hoje
       — a de ontem, a de 4 dias e a vencida. A dele, a Viação Atlântico Sul
       (M.empresa), tem o mundo inteiro do protótipo: os 24 ativos, as 13
       instalações e os casos. As outras duas andam como ESPELHO da Viação
       depois da T03: o pacote é o delas, e o resto — a frota da T06, as
       instalações da T12 — é o da Viação (diferença conhecida: o mock não
       tem a frota delas). Com uma empresa só (o
       caso uma-empresa), o app pula a T02. */
    empresas: [
      { id: "emp-01", nome: "Viação Atlântico Sul",   pacoteId: "pac-emp-01" },
      { id: "emp-02", nome: "Transportes Capibaribe", pacoteId: "pac-emp-02" },
      { id: "emp-03", nome: "Expresso Caruaruense",   pacoteId: "pac-emp-03" }
    ],
    contextoAtivo: { empresaId: "emp-01" },

    /* ── situacao — o AGORA do aparelho. UM campo raiz, dois
       fatos que nenhum cadastro carrega:
         rede: "conectada" | "sem-conexao" — estado do APARELHO (nunca a
           "rede do módulo"/APN). Gating de "Últimas instalações"; vive no
           mock porque navigator.onLine quebraria o determinismo (Lei 17).
           Começa CONECTADA: T03 acabou de sincronizar
           (pacote de 1 dia) — offline é condição de TRABALHO, não estado
           de abertura. O caso offline vive em estados/offline e nos casos.
         sessaoConfiguracao: null | { moduloSerial, ativoId: null|id,
           saude: "ok"|"falha", abertaAs: "HH:MM" } — a sessão de
           configuração corrente. Derivam daqui: semáforo do módulo (T04),
           faixa de sessão (chrome), gating módulo/ativo. Conexão é fato da
           SESSÃO, não do cadastro — por isso NÃO existe estadoConexao nos
           20 módulos. null NO BOOT — é o AGORA do mock: às 14:29 a
           evidência de a-09 está subindo (f-04), a sessão acabou de fechar.
           T05 abre a próxima como ESTADO DO APP (Prototype.jsx, padrão do
           contexto), com seed daqui; abertaAs = HORA_NOMINAL. */
    /* (HU-T01-11) · sessaoAcesso — a sessão de ACESSO, que não é a de
       configuração: 7 dias, não expira por inatividade, só por Sair ou pelo
       prazo, com AVISO no 5º dia. Nasce no 5º: o aviso está ligado hoje e
       imprime sem truque. O aviso é informação, não bloqueio. */
    situacao: { rede: "conectada", sessaoConfiguracao: null,
      sessaoAcesso: { abertaDiasAtras: 5, validadeDias: 7, avisoNoDia: 5 },
      /* protótipo (T05) · os módulos POR PERTO: o que a busca da
         T05 acha, na ordem da referência (T05/00 e 01: "5 encontrados",
         "OUTROS QUATRO POR PERTO"). É o AGORA do aparelho, como a rede: por
         isso mora em situacao, e não no cadastro. `meio` é como o módulo foi
         encontrado: a busca só acha módulo com Bluetooth (decisão 59), e os
         cinco respondem por ele, o herói primeiro · o meio não decide o
         leitor: o leitor sai do cadastro do modelo do ativo.
         O "5" sai do tamanho desta lista; nada de contagem digitada na tela. */
      porPerto: [
        { serial: "M2C-0417", meio: "bluetooth" },
        { serial: "M2C-0362", meio: "bluetooth" },
        { serial: "M2C-0394", meio: "bluetooth" },
        { serial: "M2C-0335", meio: "bluetooth" },
        { serial: "M2C-0999", meio: "bluetooth" }
      ] },

    /* o TÉCNICO:
       dado de cadastro, coerente com credenciais.usuario "r.vieira". Aparece
       na folha (junto do tema e do Sair) e na tela de saída. */
    tecnico: { nome: "Rafael Vieira" },

    /* ── credenciais — a PORTA (T01). Escopo fechado: só o
       necessário para exercitar acerto e erro.
         usuario/senha: a ÚNICA combinação válida; qualquer outra cai na
           MESMA mensagem (HU-T01-1: não distingue usuário de senha —
           mensagem distinta revelaria quais usuários existem).
         recuperacao.codigo: o código que o "servidor" envia; o comprimento
           em tela deriva de codigo.length.
         limites: os quatro limites da HU-T01-7 — a tela conta a partir
           daqui com estado de componente (zero Date.now).
         reenviosNaHora: nasce em 2 — o teto de 3 fica
           alcançável em UM toque na revisão; estado que só se alcança após
           três minutos reais não é revisável.
       Requisito 6 da senha (≠ 3 últimas) NÃO tem dado aqui: não é
       verificável no aparelho — a tela mostra pendente e resolve no envio.
       Sessão de ACESSO (7 dias, aviso no 5º, troca de usuário) não vive
       aqui: HU-T01-2/4/11 ficam em situacao.sessaoAcesso. */
    credenciais: {
      usuario: "r.vieira",
      senha: "Patio#Varzea26",
      /* o destino da recuperação e a senha nova nascem
         PREENCHIDOS na tela — dado é dado, vive aqui, não no JSX (Lei 8).
         contato: e-mail e telefone cadastrados do usuário; o DDI aponta
         para a entrada de ddis · NUNCA aparecem em tela, nem mascarados: o técnico digita o dado, e o servidor confere.
         novaSenha: atende os 6 requisitos (≥10, caixa mista, número,
         especial, sem sequência nem o usuário) e difere da senha atual. */
      contato: { email: "r.vieira@atlsul.com.br", telefone: { ddi: "+55", numero: "81987158675" } },
      recuperacao: {
      ddiPadrao: "+55", /* o seletor abre com o Brasil escolhido, e tem busca */
      respostaEnvio: "Se houver conta com este dado, o código foi enviado.", /* sempre a mesma, exista a conta ou não */
      mensagemCodigo: "Código inválido ou vencido", /* a mesma pro errado e pro vencido · o texto é leitura nossa */
      textoFixo: "O dado precisa ser o mesmo do cadastro.",
      /* protótipo: o que o técnico digita na primeira etapa, como as
         referências desenham — o telefone incompleto da 02 (faltam 2 números), o completo
         da 20 e o e-mail da 21. Não é o contato do cadastro: o servidor confere. */
      digitado: { telefoneIncompleto: "819876543", telefone: "81987654321", email: "rafael.vieira@atlsul.com.br" },
        codigo: "482913",
        novaSenha: "Garagem!Ibura27",
        limites: { validadeMin: 10, tentativas: 3, reenvioSeg: 60, tetoPorHora: 3 },
        reenviosNaHora: 2,
        /* protótipo · o código que a T01/05 e a T01/07 mostram
           digitado: seis dígitos, diferente do código. */
        codigoErrado: "482911"
      },
      /* protótipo · o protótipo segue o tela.md da T01:
         qualquer senha com 8 caracteres ou mais entra; com menos, a mesma
         mensagem de usuário ou senha incorretos. O par acima é o que vem
         preenchido. */
      minimoEntrar: 8,
      /* protótipo · os seis requisitos da senha nova, na ordem da
         T01/08. O texto de cada um mora no textos.md; aqui, só a regra. O
         sexto não se verifica no aparelho e confere ao salvar. */
      requisitosSenha: [
        { id: "tamanho", minimo: 10 },
        { id: "caixas" },
        { id: "numero" },
        { id: "simbolo" },
        /* protótipo (T01) · o trecho: três caracteres seguidos contam como
           sequência (abc, 321, aaa) e como pedaço do usuário (vie). */
        { id: "sem-usuario-nem-sequencia", trecho: 3 },
        { id: "diferente-das-ultimas", ultimas: 3, verificavelNoAparelho: false }
      ]
    },

    /* ── DDIs — a máscara de telefone DERIVA do DDI (HU-T01-6), nunca
       é fixa. Três países com máscaras E comprimentos distintos, para a
       troca de DDI ter efeito visível (reaplica e avisa); a quantidade de
       dígitos deriva da contagem de # na máscara. */
    /* protótipo: a sigla do país, que o seletor mostra antes do código (T01/02, 20: BR) */
    ddis: [
      { codigo: "+55",  pais: "Brasil",    sigla: "BR", mascara: "(##) #####-####" },
      { codigo: "+595", pais: "Paraguai",  sigla: "PY", mascara: "### ### ###" },
      { codigo: "+54",  pais: "Argentina", sigla: "AR", mascara: "## ####-####" },
      { codigo: "+56",  pais: "Chile",     sigla: "CL", mascara: "# #### ####" },
      { codigo: "+351", pais: "Portugal",  sigla: "PT", mascara: "### ### ###" },
      { codigo: "+598", pais: "Uruguai",   sigla: "UY", mascara: "## ### ###" }
    ],

    modelosAtivo: MODELOS_ATIVO,
    presetsEvento: PRESETS_EVENTO,
    modelos: MODELOS_MODULO,
    matrizCapacidades: MATRIZ_CAPACIDADES,
    modulos: MODULOS,
    seriaisForaCadastro: ["M2C-0999", "M2C-1042"],
    /* o que um módulo fora do cadastro informa na busca: a T05 lista ele como os
       outros, tocável; a trava do serial é no diagnóstico (T07/02). */
    naBuscaForaCadastro: { "M2C-0999": { modeloId: "vl06", variante: "CAN-BT", firmware: "8.04" } },
    ativos: ATIVOS,
    cadeia: CADEIA,
    calibracao: CALIBRACAO,
    checklist: CHECKLIST,
    cercas: CERCAS,
    identificadores: IDENTIFICADORES,
    autotesteAssertivas: AUTOTESTE_ASSERTIVAS,
    autotesteEncerramento: AUTOTESTE_ENCERRAMENTO,
    instalacoes: INSTALACOES,
    criteriosRegra: CRITERIOS_REGRA,
    pacotes: PACOTES,
    conexoes: CONEXOES,
    eventosEmbarcados: EVENTOS_EMBARCADOS,
    diagnostico: DIAGNOSTICO,
    filaSaida: FILA_SAIDA,
    secaoF: SECAO_F,
    ciclo: CICLO,
    casos: CASOS,
    dependentes: DEPENDENTES,
    motivosDependente: MOTIVOS_DEPENDENTE,
    consequenciaReenvio: CONSEQUENCIA_REENVIO,
    dominiosCan: DOMINIOS_CAN,
    /* protótipo (T15) · o rótulo curto da fila */
    tiposFila: TIPOS_FILA,
    /* protótipo (T15, T04) · a fila do aparelho na entrada (decisão 42): o que
       a T15/00 mostra — a recusa do servidor, o que está na fila, um recebido e
       o recebido em conflito —, mais o que a sessão criar. O contador da Fila de
       saída do menu conta o que ainda não chegou dela (2, o f-10 e o f-02). É do
       aparelho, e não da empresa: trocar de empresa não muda nada nela. O
       recorte, por id de filaSaida; a fila fica intocada. */
    filaDoAparelho: ["f-10", "f-02", "f-08", "f-11"],
    /* protótipo (T13) · a leitura nominal do módulo */
    leituraNominalModulo: LEITURA_NOMINAL_MODULO
  };
})();
