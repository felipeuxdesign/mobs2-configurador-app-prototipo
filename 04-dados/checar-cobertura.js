/* 04-dados/checar-cobertura.js — a checagem de cobertura da obra canônica.
 * Roda em TODA mudança de 04-dados/mocks.js.
 * Uso: node 04-dados/checar-cobertura.js  →  exit 0 aprovado / 1 reprovado.
 * Nota de leitura: nos comentários do mock, 'Lei N' e 'R1' a 'R3' são da
 * numeração do v1 (o documento App Configurador — Requisitos v1), não de leis.md.
 * Recomputa TODAS as âncoras a partir do mock — nada conferido no olho. */
"use strict";
if (typeof window === "undefined") {
  global.window = {};
  require(require("path").join(__dirname, "mocks.js"));
}
var M = (typeof window !== "undefined" ? window : global.window).M2CF_MOCKS;
var falhas = 0;
function chk(nome, cond, det) {
  console.log((cond ? "OK     " : "FALHA  ") + nome + (det != null ? " — " + det : ""));
  if (!cond) falhas++;
}

/* ── Âncoras de cadastro ── */
/* o contexto é a empresa (decisão 56): três empresas, cada uma com o pacote dela, e nenhuma UC nem UO */
chk("o contexto é a empresa: 3 empresas, cada uma apontando o pacote dela, sem UC nem UO, e o contexto do mock só com a empresa do herói",
  !!M.empresa && M.empresas.length === 3 && !("ucs" in M) && !("uos" in M) &&
  JSON.stringify(Object.keys(M.contextoAtivo)) === '["empresaId"]' && M.contextoAtivo.empresaId === M.empresa.id &&
  M.empresas.every(function (e) { var p = M.pacotes.filter(function (x) { return x.id === e.pacoteId; })[0]; return !!p && p.empresaId === e.id; }) &&
  M.ativos.every(function (a) { return !("uoId" in a); }),
  M.empresas.map(function (e) { return e.nome + " → " + e.pacoteId; }).join(" · "));
chk("ativos = 24", M.ativos.length === 24, M.ativos.length);
chk("módulos cadastrados = 20", M.modulos.length === 20, M.modulos.length);
var semModulo = M.ativos.filter(function (a) { return !a.moduloSerial; });
chk("ativos sem módulo = 4", semModulo.length === 4, semModulo.map(function (a) { return a.id; }).join(","));
chk("seriais fora do cadastro = 2", M.seriaisForaCadastro.length === 2, M.seriaisForaCadastro.join(","));
var semDriver = M.modelos.filter(function (m) { return m.driverV1 === false; });
chk("modelo sem driver v1 = 1 (VC07)", semDriver.length === 1 && semDriver[0].id === "vc07");
var vl06 = M.modelos.find(function (m) { return m.id === "vl06"; });
chk("VL06 nas 4 variantes + VL08", vl06 && vl06.variantes.length === 4 && !!M.modelos.find(function (m) { return m.id === "vl08"; }));
var vinculados = {};
M.ativos.forEach(function (a) { if (a.moduloSerial) vinculados[a.moduloSerial] = (vinculados[a.moduloSerial] || 0) + 1; });
chk("todo módulo vinculado a exatamente 1 ativo",
  Object.keys(vinculados).length === 20 && Object.keys(vinculados).every(function (s) { return vinculados[s] === 1 && M.modulos.some(function (m) { return m.serial === s; }); }));

/* ── Coleções do domínio ── */
chk("modelosAtivo ≥ 3", M.modelosAtivo.length >= 3, M.modelosAtivo.length);
chk("1 modelo de ativo SEM mapa de contadores", M.modelosAtivo.filter(function (m) { return !m.mapaContadores.declarado; }).length === 1);
chk("todo ativo referencia modeloAtivoId válido", M.ativos.every(function (a) { return M.modelosAtivo.some(function (m) { return m.id === a.modeloAtivoId; }); }));
chk("presetsEvento com intervaloRastreamentoSeg", M.presetsEvento.length >= 1 && M.presetsEvento.every(function (p) { return p.intervaloRastreamentoSeg > 0; }),
  M.presetsEvento.map(function (p) { return p.id + "=" + p.intervaloRastreamentoSeg + "s"; }).join(" "));
chk("todo modeloAtivo referencia preset válido", M.modelosAtivo.every(function (m) { return M.presetsEvento.some(function (p) { return p.id === m.presetEventoId; }); }));
chk("identificadores: cartões + índices alocados", M.identificadores.cartoes.length >= 3 && M.identificadores.indicesAlocados.length >= 3);
/* sem conferência de cartão com cadastro: o app não compara, quem confere é o técnico (T14/08) */

/* ── Matriz de capacidades ── */
var fwForaMatriz = M.modulos.filter(function (mod) {
  var linha = M.matrizCapacidades.find(function (r) { return r.modeloId === mod.modeloId && r.variante === mod.variante; });
  return linha && linha.firmwares.indexOf(mod.firmware) < 0;
});
chk("1 firmware fora da matriz: o M2C-0451 no 8.01", fwForaMatriz.length === 1 && fwForaMatriz[0].serial === "M2C-0451" && fwForaMatriz[0].firmware === "8.01",
  fwForaMatriz.map(function (m) { return m.serial + "@" + m.firmware; }).join(","));

/* ── o módulo de verdade: os dados do Virloc (decisão 59) ── */
(function () {
  var mod = function (s) { return M.modulos.filter(function (m) { return m.serial === s; })[0]; };
  var lin = function (modeloId, variante) { return M.matrizCapacidades.filter(function (r) { return r.modeloId === modeloId && r.variante === variante; })[0]; };
  var linDo = function (m) { return m && lin(m.modeloId, m.variante); };
  var vl06 = M.matrizCapacidades.filter(function (r) { return r.modeloId === "vl06"; }), vl08 = lin("vl08", "STD");
  /* as variantes: o que era CAN é CAN-BT, o que era ECO é FULL — todo módulo do mundo do protótipo tem Bluetooth */
  chk("as variantes: M2C-0362, 0389, 0445 e 0480 no VL06 CAN-BT · M2C-0394 e 0472 no VL06 FULL · nenhum módulo em variante sem Bluetooth",
    ["M2C-0362", "M2C-0389", "M2C-0445", "M2C-0480"].every(function (s) { return mod(s).variante === "CAN-BT"; }) &&
    ["M2C-0394", "M2C-0472"].every(function (s) { return mod(s).variante === "FULL"; }) &&
    M.modulos.every(function (m) { var l = linDo(m); return !l || l.bluetooth === true; }),
    M.modulos.filter(function (m) { var l = linDo(m); return l && !l.bluetooth; }).map(function (m) { return m.serial; }).join(",") || undefined);
  chk("o Bluetooth na matriz: o FULL, o CAN-BT e o VL08 STD sim; o ECO e o CAN não (os dois do nenhum encontrado da T05/03)",
    vl06.filter(function (r) { return !r.bluetooth; }).map(function (r) { return r.variante; }).join(",") === "ECO,CAN" &&
    lin("vl06", "FULL").bluetooth && lin("vl06", "CAN-BT").bluetooth && vl08.bluetooth === true && M.matrizCapacidades.every(function (r) { return !("semFio" in r); }));
  /* o firmware no formato do Virloc */
  chk("o firmware no formato do Virloc: o VL06 em 8.0x (a lista do FULL, 8.03 e 8.04; o CAN-BT, 8.04), o VL08 em 154B16 e 158B21",
    M.modulos.filter(function (m) { return m.modeloId === "vl06"; }).every(function (m) { return /^8\.0\d$/.test(m.firmware); }) &&
    lin("vl06", "FULL").firmwares.join(" e ") === "8.03 e 8.04" && lin("vl06", "CAN-BT").firmwares.join(",") === "8.04" &&
    vl06.every(function (r) { return r.firmwares.every(function (f) { return /^8\.0\d$/.test(f); }); }) &&
    vl08.firmwares.join(",") === "154B16,158B21" && mod("M2C-0371").firmware === "154B16" && mod("M2C-0438").firmware === "158B21",
    lin("vl06", "FULL").firmwares.join(" e "));
  chk("o herói no 8.04, o disponível da atualização é o 8.04 da lista do FULL, e o M2C-0999 informa 8.04",
    mod("M2C-0417").firmware === "8.04" && M.casos["firmware-fora-matriz"].firmwareDisponivel === "8.04" &&
    lin("vl06", "FULL").firmwares.indexOf(M.casos["firmware-fora-matriz"].firmwareDisponivel) >= 0 &&
    M.naBuscaForaCadastro["M2C-0999"].firmware === "8.04" && M.diagnostico.modulo.filter(function (l) { return l.id === "firmware"; })[0].heroi === mod("M2C-0417").firmware);
  /* a faixa de alimentação do VL06 */
  var ft = M.modelos.filter(function (m) { return m.id === "vl06"; })[0].faixaTensao;
  var v1 = function (n) { return n.toFixed(1).replace(".", ","); };
  var alim = M.diagnostico.modulo.filter(function (l) { return l.id === "alimentacao"; })[0];
  chk("a faixa do VL06 é de 9,0 a 40,0 V, e a linha da alimentação da T07 diz a do modelo",
    ft[0] === 9 && ft[1] === 40 && alim.faixa === v1(ft[0]) + " a " + v1(ft[1]) + " V", alim.faixa);
  /* a capacidade em cinco dimensões */
  chk("a capacidade do VL06, em toda variante: 127 contadores, 128 eventos, 13 filtros da CAN, 8 regiões e 6.143 de memória (pontos de cerca e cartões)",
    vl06.length === 4 && vl06.every(function (r) { return r.capacidadeRegistros === 127 && r.eventosMax === 128 && r.filtrosCanMax === 13 && r.regioesMax === 8 && r.pontosCercaMax === 6143; }));
  chk("a capacidade do VL08: 192 contadores, 244 eventos, 38 filtros da CAN (25 na CAN 1 e 13 na CAN 2) e 64 regiões",
    vl08.capacidadeRegistros === 192 && vl08.eventosMax === 244 && vl08.filtrosCanMax === 38 && vl08.filtrosCanPorRede.join("+") === "25+13" &&
    vl08.filtrosCanPorRede[0] + vl08.filtrosCanPorRede[1] === vl08.filtrosCanMax && vl08.regioesMax === 64);
  var nc = M.casos["conteudo-nao-cabe"], lnc = linDo(mod(nc.moduloSerial));
  chk("o não cabe (T09/06): o OCT-2J85 × M2C-0394, agora num FULL, com 131 contadores contra os 127 da matriz",
    nc.ativoId === "a-10" && nc.moduloSerial === "M2C-0394" && mod(nc.moduloSerial).variante === "FULL" && nc.dimensao === "contadores" &&
    nc.capacidadeRegistros === lnc.capacidadeRegistros && nc.conteudoRegistros === 131 && nc.conteudoRegistros > lnc.capacidadeRegistros,
    nc.conteudoRegistros + " de " + lnc.capacidadeRegistros);
  var pe = M.casos["pool-esgotado"], ape = M.ativos.filter(function (a) { return a.id === pe.ativoId; })[0], lpe = linDo(mod(ape.moduloSerial));
  chk("a memória esgotada (T09/07): 5.980 pontos de cerca e 240 cartões contra os 6.143 da matriz — só a soma estoura",
    pe.dimensao === "memoria" && pe.pontosCerca === 5980 && pe.cartoes === 240 && lpe.pontosCercaMax === 6143 &&
    pe.pontosCerca + pe.cartoes > lpe.pontosCercaMax && pe.pontosCerca <= lpe.pontosCercaMax && !("pontosCercaMax" in pe),
    (pe.pontosCerca + pe.cartoes) + " de " + lpe.pontosCercaMax);
  /* o leitor sai do cadastro do modelo do ativo */
  var fios = function (id) { var m = M.modelosAtivo.filter(function (x) { return x.id === id; })[0]; return m && m.leitor && m.leitor.fios; };
  chk("o leitor pelos fios do cadastro do modelo: o cartão serial do ma-01 nos fios azul e amarelo, a chave do ma-02 e do ma-03 no fio verde (o 1-Wire)",
    fios("ma-01") === "fios azul e amarelo" && fios("ma-02") === "fio verde" && fios("ma-03") === "fio verde" &&
    M.modelosAtivo.every(function (m) { return m.leitor.tipo !== "sem-fio"; }));
  /* a conexão é a operadora e a APN do chip */
  chk("as conexões da empresa: a operadora e a APN do chip (TIM · timbrasil.br), sem o nome da rede",
    M.conexoes.length === 2 && M.conexoes.every(function (c) { return c.operadora === "TIM" && c.apn === "timbrasil.br" && !("exibir" in c); }));
})();

/* ── Instalações: 6 estados, somando 13 ── */
var porEstado = {};
M.instalacoes.forEach(function (i) { porEstado[i.estado] = (porEstado[i.estado] || 0) + 1; });
var ressalvadas = M.instalacoes.filter(function (i) { return i.ressalva; });
var puras = function (e) { return M.instalacoes.filter(function (i) { return i.estado === e && !i.ressalva; }).length; };
chk("instalações = 13", M.instalacoes.length === 13, M.instalacoes.length);
chk("aprovadas puras = 6", puras("aprovada") === 6, puras("aprovada"));
chk("aguardando validação puras = 2", puras("aguardando-validacao") === 2, puras("aguardando-validacao"));
chk("falha de recebimento reconhecida = 1", (porEstado["falha-recebimento-reconhecida"] || 0) === 1);
chk("aprovada após reprocessamento = 1", (porEstado["aprovada-reprocessamento"] || 0) === 1);
chk("reprovada = 1", (porEstado["reprovada"] || 0) === 1);
chk("ressalvadas = 2 (1 aprovada + 1 aguardando)", ressalvadas.length === 2 &&
  ressalvadas.some(function (i) { return i.estado === "aprovada"; }) &&
  ressalvadas.some(function (i) { return i.estado === "aguardando-validacao"; }),
  ressalvadas.map(function (i) { return i.id + ":" + i.estado; }).join(" · "));
var heroi = M.instalacoes.find(function (i) { return i.ativoId === "a-01"; });
var heroiAtivo = M.ativos.find(function (a) { return a.id === "a-01"; });
chk("herói RKT-8H42 · VL06 CAN-BT · M2C-0417 · aprovado, história completa · 27 itens, o autoteste em três contadores",
  heroiAtivo && heroiAtivo.placa === "RKT-8H42" && heroiAtivo.moduloSerial === "M2C-0417" &&
  heroi && heroi.estado === "aprovada" && heroi.etapas &&
  heroi.etapas.cadeia.length === 6 && heroi.etapas.autoteste.aprovadas === 5 && heroi.etapas.autoteste.naoSeAplicam === 1 && heroi.etapas.autoteste.pendentes === 1 && heroi.etapas.checklist.itens === 27 && heroi.etapas.checklist.concluidos === heroi.etapas.checklist.itens);
/* os 12 resumos de instalação e os três contadores do autoteste */
chk("os resumos das instalações com 27 itens e o autoteste em três contadores", M.instalacoes.filter(function (i) { return i.resumo; }).every(function (i) {
  return i.resumo.checklist === "27/27" && /^\d+ aprovadas? · \d+ não se aplicam? · \d+ pendentes?$/.test(i.resumo.autoteste); }),
  M.instalacoes.filter(function (i) { return i.resumo; }).length + " resumos");

/* ── Cobertura temporal ── */
var offsets = M.instalacoes.map(function (i) { return i.diasAtras; });
var distintos = offsets.filter(function (v, ix) { return offsets.indexOf(v) === ix; });
var span = Math.max.apply(null, offsets) - Math.min.apply(null, offsets) + 1;
chk("dias distintos com intervenção ≥ 12", distintos.length >= 12, distintos.length + " dias: " + distintos.sort(function (a, b) { return a - b; }).join(","));
chk("span ≥ 45 dias corridos", span >= 45, span + " (" + M.diasAntes(Math.max.apply(null, offsets)) + " → " + M.diasAntes(0) + ")");
chk("datas derivam do dia nominal (aritmética pura)", M.diasAntes(44) === "2026-01-27" && M.diasAntes(0) === "2026-03-12" && M.diasAntes(31) === "2026-02-09");

/* ── Pacote em três idades ── */
var idades = M.pacotes.map(function (p) { return p.diasAtras; }).sort(function (a, b) { return a - b; });
chk("pacotes em 3 idades = 1d · 4d · 8d", idades.join(",") === "1,4,8", idades.join(","));
chk("limiares no mock (aviso 3d · bloqueio 7d)", M.pacotes.every(function (p) { return p.limiares.avisoDias === 3 && p.limiares.bloqueioDias === 7; }));

/* ── Fila de saída ── */
var fEstado = {};
M.filaSaida.forEach(function (f) { fEstado[f.estado] = (fEstado[f.estado] || 0) + 1; });
var naFila = M.filaSaida.filter(function (f) { return f.estado === "na-fila"; });
var horasNaFila = naFila.map(function (f) { return f.criadoAs; });
chk("fila: na fila = 3, tempos parados distintos", fEstado["na-fila"] === 3 &&
  horasNaFila.filter(function (v, ix) { return horasNaFila.indexOf(v) === ix; }).length === 3, horasNaFila.join(" · "));
chk("fila: enviando = 1 com progresso", fEstado["enviando"] === 1 && M.filaSaida.some(function (f) { return f.estado === "enviando" && f.progresso > 0; }));
chk("fila: recebidas = 4 com horário", fEstado["recebida"] === 4 && M.filaSaida.filter(function (f) { return f.estado === "recebida"; }).every(function (f) { return !!f.confirmadoAs; }));
chk("fila: erro-rede = 1, reenvio automático", fEstado["erro-rede"] === 1 && M.filaSaida.some(function (f) { return f.estado === "erro-rede" && f.reenvio === "automático"; }));
chk("fila: erro-recusa = 1, reenvio manual com motivo", fEstado["erro-recusa"] === 1 && M.filaSaida.some(function (f) { return f.estado === "erro-recusa" && f.reenvio === "manual" && !!f.motivo; }));
chk("Seção F em re-checagem é seção separada, não item", !!M.secaoF && M.secaoF.emRecheck === true && !M.filaSaida.some(function (f) { return /se[cç][aã]o f/i.test(f.tipo); }));

/* ── Cadeia e arraste ── */
chk("ordem canônica dos 6 blocos", M.cadeia.ordem.join(">") === "limpeza>ativo>cercas>leitor>eventos>conexao", M.cadeia.ordem.join(" → "));
chk("tabela de arraste do contrato", JSON.stringify(M.cadeia.arraste) ===
  JSON.stringify({ ativo: ["eventos"], cercas: ["leitor", "eventos"], leitor: ["eventos"], eventos: [], conexao: [] }));

/* ── Cercas ── */
chk("cercas: o herói tem 2 áreas × 2 = 4 regiões", (function () { var rs = M.cercas.regioes.filter(function (r) { return r.ativoId === "a-01"; }); var as_ = rs.map(function (r) { return r.areaId; }).filter(function (a, i, l) { return l.indexOf(a) === i; }); return rs.length === 4 && as_.length === 2 && as_.every(function (a) { return rs.filter(function (r) { return r.areaId === a; }).length === 2; }); })());
/* o pool esgotado é a memória que os pontos de cerca e os cartões dividem (decisão 59): a conta está no bloco do módulo de verdade, acima */
chk("pool esgotado: o OYS-7D93 (a-05) com o módulo do cadastro dele, um VL06 FULL", (function (c) {
  var a = c && M.ativos.filter(function (x) { return x.id === c.ativoId; })[0], m = a && M.modulos.filter(function (x) { return x.serial === a.moduloSerial; })[0];
  return !!m && a.placa === "OYS-7D93" && m.modeloId === "vl06" && m.variante === "FULL"; })(M.casos["pool-esgotado"]));

/* ── Casos obrigatórios ── */
var OBRIGATORIOS = ["serial-nao-cadastrado", "modelo-sem-driver", "firmware-fora-matriz",
  "conteudo-nao-cabe", "pool-esgotado", "ativo-fora-pacote",
  "conflito-pinos-sem-saida", "can-fora-esperado",
  "grandeza-indisponivel", "diff-divergente",
  "indice-nao-classificado", "autoteste-falhando", "sessao-interrompida",
  "sem-leitor", "servidor-ainda-nao",
  /* decisões 44 a 47 */ "modem-sem-sinal", "firmware-sem-rede-no-modulo", "modulo-em-outro-ativo",
  "modulo-ja-deste-ativo", "sem-conexao-no-menu",
  /* decisão 58 */ "mensagens-pendentes"];
OBRIGATORIOS.forEach(function (k) { chk("caso: " + k, !!M.casos[k]); });
chk("diff divergente cobre os 4 blocos que se comparam (decisão 53)", M.casos["diff-divergente"] &&
  M.casos["diff-divergente"].divergencias.map(function (d) { return d.bloco; }).sort().join(",") === "cercas,conexao,eventos,leitor");
chk("casos apontam para ativos/módulos reais", OBRIGATORIOS.every(function (k) {
  var c = M.casos[k]; if (!c) return false;
  if (c.ativoId && !M.ativos.some(function (a) { return a.id === c.ativoId; })) return false;
  if (c.moduloSerial && !M.modulos.some(function (m) { return m.serial === c.moduloSerial; }) && k !== "serial-nao-cadastrado") return false;
  return true;
}));
  chk("a conferência segue a ordem do script, com cinco blocos", (function () { var c = M.casos["diff-divergente"]; var o = c.ordem.join(","); var d = c.divergencias.map(function (x) { return x.bloco; }); return o === "ativo,cercas,leitor,eventos,conexao" && c.ordem.length === 5 && d.join(",") === c.ordem.filter(function (b) { return d.indexOf(b) >= 0; }).join(","); })());
  chk("quem depende de quem, na ordem do script", M.dependentes && JSON.stringify(M.dependentes) === JSON.stringify({ ativo: ["eventos"], cercas: ["leitor", "eventos"], leitor: ["eventos"], eventos: [], conexao: [] }) && M.casos["falta-reenviar"] && M.casos["falta-reenviar"].faltaReenviar.join(",") === "leitor,eventos");
chk("o herói mostra 27 — a D sem as pendências, a B sem o Painel (o ônibus não calibra), e a E com o bip", M.calibracao.porModelo["ma-01"].calibraveis.length === 0 && M.checklist.itens.filter(function (x) { return x.condicao !== "reescritaId" && x.condicao !== "calibracao" && x.conta !== false; }).length === 27 && M.checklist.itens.some(function (x) { return x.id === "e-bip" && x.condicao === "buzzer"; }));
  chk("o Autoteste da D roda ao encerrar e não conta", M.checklist.itens.some(function (x) { return x.id === "d-autoteste" && x.conta === false && x.valor === "roda ao encerrar"; }));
chk("o autoteste do encerramento tem 7 assertivas, e o caso bloqueado falha nos contadores", M.autotesteEncerramento.length === 7 && M.autotesteEncerramento.some(function (x) { return x.id === M.casos["autoteste-falhando"].falhou; }) &&
  M.casos["autoteste-falhando"].aprovadas + M.casos["autoteste-falhando"].naoSeAplicam + M.casos["autoteste-falhando"].pendentes === 6);

/* ── T06 ── */
chk("frota em todos os 24 ativos, únicas", M.ativos.every(function (a) { return /^\d{4}$/.test(a.frota); }) &&
  M.ativos.map(function (a) { return a.frota; }).filter(function (v, ix, arr) { return arr.indexOf(v) === ix; }).length === 24);
chk("leitor + leituraCan nos 3 modelos", M.modelosAtivo.every(function (m) { return m.leitor && m.leitor.tipo && (m.leituraCan === "barramento" || m.leituraCan === "gateway"); }));
/* o conflito de pinos (T06/06): o fio ocupado é um dos fios do leitor do modelo do ativo — o azul, a entrada do
   leitor serial —, e o meio não entra (o leitor sai do cadastro do modelo, decisão 59) */
chk("o conflito de pinos é só o sem saída: o fio azul do leitor serial do ativo, ocupado pelo sensor de porta, sem o meio", (function (c) {
  var a = c && M.ativos.filter(function (x) { return x.id === c.ativoId; })[0], m = a && M.modelosAtivo.filter(function (x) { return x.id === a.modeloAtivoId; })[0];
  return !M.casos["conflito-pinos-resolvivel"] && !!m && c.fio === "fio azul" && m.leitor.tipo === "cartao-serial" && m.leitor.fios.indexOf(c.fio.replace(/^fio /, "")) >= 0 &&
    !("meioAtual" in c) && c.ocupadoPor === "sensor de porta" && c.consumidores.indexOf("cabo de programação") < 0; })(M.casos["conflito-pinos-sem-saida"]),
  M.casos["conflito-pinos-sem-saida"].fio);

/* ── o que as telas leem ── */
var cred = M.credenciais, rec = cred.recuperacao, lim = rec.limites;
chk("credenciais: usuário do técnico e código de 6 dígitos", cred.usuario === "r.vieira" && !!M.tecnico.nome && /^\d{6}$/.test(rec.codigo));
chk("credenciais: a senha nova cumpre as regras verificáveis", (function () {
  var s = rec.novaSenha; return s.length >= 10 && /[a-z]/.test(s) && /[A-Z]/.test(s) && /\d/.test(s) && /[^A-Za-z0-9]/.test(s) &&
    s.toLowerCase().indexOf(cred.usuario.split(".")[1]) < 0 && s !== cred.senha; })());
chk("credenciais: limites 10 min · 3 tentativas · 60 s · 3 por hora", lim.validadeMin === 10 && lim.tentativas === 3 && lim.reenvioSeg === 60 && lim.tetoPorHora === 3,
  "resta " + (lim.tetoPorHora - rec.reenviosNaHora) + " envio nesta hora");
chk("credenciais: reenvios da hora abaixo do teto", rec.reenviosNaHora < lim.tetoPorHora);
chk("DDIs: o telefone tem os dígitos que a máscara do DDI pede", (function () {
  var d = M.ddis.find(function (x) { return x.codigo === cred.contato.telefone.ddi; });
  return !!d && (d.mascara.match(/#/g) || []).length === cred.contato.telefone.numero.length; })());
chk("seis países, cada um com a sigla e a máscara, e o Brasil como padrão", M.ddis.length === 6 &&
  M.ddis.every(function (d) { return /^[A-Z]{2}$/.test(d.sigla) && /#/.test(d.mascara); }) && rec.ddiPadrao === "+55" && M.ddis.some(function (d) { return d.codigo === rec.ddiPadrao; }));
chk("as três frases fixas da recuperação", rec.respostaEnvio === "Se houver conta com este dado, o código foi enviado." &&
  rec.mensagemCodigo === "Código inválido ou vencido" && rec.textoFixo === "O dado precisa ser o mesmo do cadastro.");
chk("o que vem digitado na primeira etapa — o telefone incompleto (faltam 2), o completo e o e-mail", (function () {
  var d = M.ddis.find(function (x) { return x.codigo === rec.ddiPadrao; }); var n = (d.mascara.match(/#/g) || []).length;
  return rec.digitado.telefone.length === n && rec.digitado.telefoneIncompleto.length === n - 2 && rec.digitado.telefone.indexOf(rec.digitado.telefoneIncompleto) === 0 && /@/.test(rec.digitado.email); })());
chk("sessão de acesso: aberta dentro da validade, aviso antes do fim", (function () {
  var a = M.situacao.sessaoAcesso; return a.abertaDiasAtras < a.validadeDias && a.avisoNoDia <= a.validadeDias; })(),
  "restam " + (M.situacao.sessaoAcesso.validadeDias - M.situacao.sessaoAcesso.abertaDiasAtras) + " de " + M.situacao.sessaoAcesso.validadeDias + " dias");
chk("calibração: o bruto do módulo dá o número da T10 (482.317 · 87.604 · 121.003)", (function () {
  var b = M.calibracao.bruto; return b["a-01"].hodometro / 1000 === 482317 && b["a-09"].hodometro / 1000 === 87604 && b["a-22"].hodometro / 1000 === 121003; })());
/* o herói lê pela CAN o que o painel mostra e não calibra nada (decisão 59): a diferença dele é zero; a do caminhão e a do a-22 ficam */
chk("calibração: as diferenças da T10 derivam do mock (0 · 108 · 477)", (function () {
  var b = M.calibracao.bruto, p = M.calibracao.painel;
  return p["a-01"].hodometro - b["a-01"].hodometro / 1000 === 0 && p["a-09"].hodometro - b["a-09"].hodometro / 1000 === 108 &&
    p["a-22"].hodometro - b["a-22"].hodometro / 1000 === 477; })());
chk("calibração: calibráveis e indisponíveis não se cruzam, em todo modelo", Object.keys(M.calibracao.porModelo).every(function (k) {
  var m = M.calibracao.porModelo[k]; return (m.indisponiveis || []).every(function (i) { return m.calibraveis.indexOf(i.grandeza) < 0; }); }));
chk("calibração: todo modelo de ativo tem regra de calibração", M.modelosAtivo.every(function (m) { return !!M.calibracao.porModelo[m.id]; }));
chk("checklist: todo item aponta uma seção que existe", M.checklist.itens.every(function (i) { return M.checklist.secoes.some(function (s) { return s.id === i.secao; }); }));
chk("ciclo: o evento chega e confere dentro do prazo (24 < 33 < 120 s)", (function () {
  var c = M.ciclo; return 0 < c.evento.recebidoAosSeg && c.evento.recebidoAosSeg < c.evento.conferidoAosSeg && c.evento.conferidoAosSeg < c.prazoEventoSeg; })());
chk("ciclo: a fila do módulo tem mensagens e diagnóstico", M.ciclo.mensagensGuardadas.mensagens > 0 && M.ciclo.mensagensGuardadas.diagnostico > 0);
chk("autoteste de encerramento: 7 assertivas, 1 condicional", M.autotesteEncerramento.length === 7 &&
  M.autotesteEncerramento.filter(function (a) { return a.condicional; }).length === 1);
chk("critérios: a regra cobre todo estado de instalação", M.instalacoes.every(function (i) { return !!M.criteriosRegra.porEstado[i.estado]; }));
chk("pacotes: os limiares batem com as três idades (1d ok · 4d aviso · 8d bloqueio)", M.pacotes.every(function (p) {
  var l = p.limiares; return l && typeof l.avisoDias === "number" && typeof l.bloqueioDias === "number"; }) &&
  M.pacotes.map(function (p) { return p.diasAtras; }).join(",") === "1,4,8");
/* os 10 casos sem conferência própria (sem o modulo-em-repouso e o can-estatico-dominio) */
var SEM_GATE = ["conexao-falha", "link-perdido", "modulo-com-pendencias", "can-estatico-isolado", "can-estatico-ausente",
  "can-estatico-hodometro", "bloco-recusado", "queda-na-cadeia", "pronto-para-fechar", "evento-sem-resposta"];
chk("os 10 casos sem conferência apontam ativo e módulo reais", SEM_GATE.every(function (k) {
  var c = M.casos[k]; if (!c) return false;
  if (c.ativoId && !M.ativos.some(function (a) { return a.id === c.ativoId; })) return false;
  if (c.moduloSerial && !M.modulos.some(function (m) { return m.serial === c.moduloSerial; })) return false;
  return true; }));
chk("casos de módulo: o par ativo × módulo é o do cadastro", SEM_GATE.every(function (k) {
  var c = M.casos[k]; if (!c.ativoId || !c.moduloSerial) return true;
  var a = M.ativos.find(function (x) { return x.id === c.ativoId; }); return a.moduloSerial === c.moduloSerial; }));
chk("sync-falha-rede aponta um pacote que existe", M.pacotes.some(function (p) { return p.id === M.casos["sync-falha-rede"].pacoteId; }));
/* sem CADEIA.versoes — os 5 blocos são os que têm conteúdo (decisão 49), e a limpeza não tem */
chk("a cadeia tem 6 passos e 5 blocos com conteúdo", M.cadeia.ordem.length === 6 && M.cadeia.ordem[0] === "limpeza" &&
  M.cadeia.ordem.slice(1).join(",") === Object.keys(M.cadeia.conteudo).join(","));

/* ── entrar: o login e a sincronização ── */
chk("código errado: seis dígitos, diferente do código", /^\d{6}$/.test(rec.codigoErrado) && rec.codigoErrado !== rec.codigo);
chk("entrar: a senha do mock passa do mínimo de 8", cred.minimoEntrar === 8 && cred.senha.length >= cred.minimoEntrar);
chk("requisitos: seis, o mínimo 10, e a senha nova cumpre os verificáveis", (function () {
  var r = cred.requisitosSenha, s = rec.novaSenha; if (!r || r.length !== 6) return false;
  var min = r[0].minimo; return r[0].id === "tamanho" && min === 10 && s.length >= min && r[5].verificavelNoAparelho === false; })());
/* o *faltam* (a T03 e a T09, a mesma regra): até 10 s, no segundo; até 59 s, na dezena; de 60 s pra cima, no minuto */
function faltaCerca(seg) {
  if (seg <= 10) return "~" + Math.round(seg) + " s";
  var dezena = Math.round(seg / 10) * 10;
  return dezena < 60 ? "~" + dezena + " s" : "~" + Math.max(1, Math.round(seg / 60)) + " min";
}
var pacoteDaViacao = M.pacotes.filter(function (p) { return p.empresaId === M.contextoAtivo.empresaId; })[0];
chk("pacotes: a estimativa dá ~1 min com 43 itens por baixar na Viação (6 de 49, 1,6 s por item = 68,8 s, no minuto)", (function () {
  var p = pacoteDaViacao, c = p && p.contem; if (!c) return false;
  var total = c.ativos + c.conexoes + c.modelosAtivo + c.eventos + c.cercas;
  return total === 49 && faltaCerca((total - 6) * p.segPorItem) === "~1 min" && faltaCerca(40) === "~40 s" && faltaCerca(8.4) === "~8 s"; })(),
  pacoteDaViacao && faltaCerca((49 - 6) * pacoteDaViacao.segPorItem));
chk("pacotes: a versão deriva da empresa e da data (pct-emp01-2026-03-11)", !!pacoteDaViacao && "pct-" + pacoteDaViacao.empresaId.replace("-", "") + "-" + pacoteDaViacao.data === "pct-emp01-2026-03-11");

/* ── T02 · selecionar contexto: a linha de cada empresa lê o pacote dela (decisão 56) ── */
chk("T02 cada empresa tem um pacote só, o dela (a linha lê idade, hora e ativos dele)", M.empresas.every(function (e) {
  var dela = M.pacotes.filter(function (p) { return p.empresaId === e.id; }); return dela.length === 1 && dela[0].id === e.pacoteId; }) &&
  M.pacotes.length === M.empresas.length);
chk("T02 os ativos dos pacotes: os 24 do cadastro na Viação; nas duas empresas espelho, 34 e 18 (a T02/00 e a T04/07)",
  M.pacotes.map(function (p) { return p.contem.ativos; }).join("·") === "24·34·18" && pacoteDaViacao.contem.ativos === M.ativos.length &&
  M.empresas.map(function (e) { return e.nome; }).join(" · ") === "Viação Atlântico Sul · Transportes Capibaribe · Expresso Caruaruense",
  M.pacotes.map(function (p) { return p.id + " " + p.contem.ativos; }).join(" · "));

/* ── T01 · login: a senha nova não tem sequência nem pedaço do usuário ── */
chk("T01 o trecho da regra 5 é 3, e a senha nova não tem sequência nem pedaço do usuário de 3", (function () {
  var r = cred.requisitosSenha.filter(function (x) { return x.id === "sem-usuario-nem-sequencia"; })[0], n = r && r.trecho;
  if (n !== 3) return false;
  var s = rec.novaSenha.toLowerCase(), u = cred.usuario.toLowerCase(), i, j;
  for (i = 0; i + n <= u.length; i++) if (s.indexOf(u.slice(i, i + n)) >= 0) return false;
  for (i = 0; i + n <= s.length; i++) {
    var d = s.charCodeAt(i + 1) - s.charCodeAt(i), seguido = Math.abs(d) <= 1;
    for (j = i + 1; seguido && j < i + n; j++) if (s.charCodeAt(j) - s.charCodeAt(j - 1) !== d) seguido = false;
    if (seguido) return false;
  }
  return true; })(), "trecho " + cred.requisitosSenha[4].trecho);

/* ── T04 · menu: os contadores e as folhas saem das regras da T04 (nenhum campo novo) ── */
(function () {
  var fila = M.filaSaida;
  var item = function (id) { return fila.filter(function (f) { return f.id === id; })[0]; };
  /* o contador do cartão da Fila de saída (decisão 42): o que ainda não chegou da fila do aparelho, a que a
     T15 mostra (filaDoAparelho, na entrada) · o recebido em conflito também chegou (o servidor aceita os
     dois registros e avisa o gestor) */
  var doAparelho = (M.filaDoAparelho || []).map(item);
  var menu = doAparelho.filter(function (f) { return f && f.estado !== "recebida" && f.estado !== "recebida-em-conflito"; });
  chk("T04 o contador do menu: o que não chegou da fila do aparelho, a que a T15 mostra (o f-10 recusado e o f-02 na fila · 2)",
    doAparelho.length > 0 && doAparelho.every(Boolean) && menu.length === 2 && menu.map(function (f) { return f.id; }).join(",") === "f-10,f-02",
    menu.map(function (f) { return f.id; }).join(","));
  /* o diálogo de sair e o do outro usuário contam a mesma fila do cartão: o que não chegou da fila do aparelho (decisão 64:
     o mesmo fato se diz igual · T04/06 e 20, T01/18) */
  var outro = M.casos["outro-usuario"] && M.casos["outro-usuario"].anterior;
  chk("T04 o diálogo de sair e o outro usuário (T01/18) contam a fila do aparelho, o número do cartão (2)",
    !!outro && outro.itensNaFila === menu.length && menu.length === 2, outro && outro.itensNaFila);
  chk("T04 a folha Trocar de empresa no 08: uma evidência subindo", fila.filter(function (f) { return f.estado === "enviando"; }).length === 1);
  var manuais = M.checklist.secoes.filter(function (s) { return s.natureza === "manual" || s.natureza === "dinamico"; }).map(function (s) { return s.id; });
  var abertos = M.checklist.itens.filter(function (i) { return manuais.indexOf(i.secao) >= 0; });
  /* a E com 5 — os 4 passos e o bip — dá 5 + 5 = 10, o que a T04/04 desenha */
  chk("T04 o contador do checklist: B + E, os que o técnico resolve (T04·2 b · 5 + 5 = 10)", manuais.join("") === "BE" && abertos.length === 10, abertos.length);
  var ac = M.situacao.sessaoAcesso;
  chk("T04 a folha da conta: restam 2 de 7 dias, já no aviso", ac.validadeDias - ac.abertaDiasAtras === 2 && ac.validadeDias === 7 && ac.abertaDiasAtras >= ac.avisoNoDia);
  chk("T04 a folha Trocar de empresa: só a Expresso Caruaruense passa do limite (8 > 7), e ela se escolhe (a T03/04 diz o que fazer)",
    M.pacotes.filter(function (p) { return p.diasAtras > p.limiares.bloqueioDias; }).map(function (p) { return p.empresaId; }).join(",") === "emp-03");
})();

/* ── T03 · sincronizar: as regras que a tela lê do pacote (nenhum campo novo) ── */
(function () {
  var ORDEM = ["ativos", "conexoes", "modelosAtivo", "eventos", "cercas"]; /* Ativos → Conexões → Modelos → Eventos → Cercas, um item por tick (a 00 e a 01 desenham Ativos primeiro) */
  var total = function (p) { return ORDEM.reduce(function (s, k) { return s + p.contem[k]; }, 0); };
  var feito = function (p, n) { var r = {}; ORDEM.forEach(function (k) { r[k] = Math.min(n, p.contem[k]); n -= r[k]; }); return r; };
  var v = pacoteDaViacao;
  var q = feito(v, 6);
  chk("T03 o quadro da 00: 6 itens na ordem dão Ativos 6 de 24, e os outros quatro em 0 (6 de 49) · o concluído, 49 de 49, com as 8 cercas",
    total(v) === 49 && q.ativos === 6 && v.contem.ativos === 24 && v.contem.cercas === 8 && q.conexoes + q.modelosAtivo + q.eventos + q.cercas === 0, JSON.stringify(q));
  var caso = M.casos["sync-falha-rede"], pc = M.pacotes.filter(function (p) { return p.id === caso.pacoteId; })[0];
  chk("T03 a falha de rede cai num item do pacote do caso (1 ≤ falhaNoTick ≤ total)", !!pc && caso.falhaNoTick >= 1 && caso.falhaNoTick <= total(pc),
    caso.falhaNoTick + " de " + (pc && total(pc)));
  /* as duas falhas de rede (decisão 64): a 01 é a falha com o pacote do aparelho valendo (a Viação, o de ontem: 6 de 24, e dá pra seguir com ele), e a 05,
     a falha com o pacote vencido (a Expresso, 8 dias: 3 de 18, e a saída é trocar de empresa) */
  var c01 = M.casos["sync-falha-rede-pacote-valido"], p01 = c01 && M.pacotes.filter(function (p) { return p.id === c01.pacoteId; })[0];
  var q01 = p01 && feito(p01, c01.falhaNoTick - 1), q05 = pc && feito(pc, caso.falhaNoTick - 1);
  chk("T03 a 01: o caso sync-falha-rede-pacote-valido é a Viação com o pacote valendo, parada em Ativos 6 de 24 · a 05: o sync-falha-rede é a Expresso com o pacote vencido, em 3 de 18",
    !!p01 && p01.id === "pac-emp-01" && p01.diasAtras <= p01.limiares.bloqueioDias && q01.ativos === 6 && p01.contem.ativos === 24 &&
    pc.id === "pac-emp-03" && pc.diasAtras > pc.limiares.bloqueioDias && q05.ativos === 3 && pc.contem.ativos === 18,
    (p01 && p01.id) + " " + (q01 && q01.ativos) + " de " + (p01 && p01.contem.ativos) + " · " + pc.id + " " + q05.ativos + " de " + pc.contem.ativos);
  /* os presets em uso: os dos modelos dos 24 ativos da Viação — as empresas espelho trazem os mesmos grupos */
  var usados = (function () { var s = {}; M.ativos.forEach(function (a) {
    s[M.modelosAtivo.filter(function (m) { return m.id === a.modeloAtivoId; })[0].presetEventoId] = 1; }); return Object.keys(s).sort().join(","); })();
  chk("T03 o pacote traz o catálogo de modelos da empresa e só os presets em uso (T03·8 a) — os da Viação nas três", M.pacotes.every(function (p) {
    return p.contem.modelosAtivo === M.modelosAtivo.length && p.presetsEventoIds.slice().sort().join(",") === usados; }), usados);
  chk("T03 as empresas espelho trazem os mesmos grupos da Viação (2, 3, 12, 8), só os ativos mudam", M.pacotes.every(function (p) {
    return ["conexoes", "modelosAtivo", "eventos", "cercas"].every(function (k) { return p.contem[k] === v.contem[k]; }); }));
  var avisa = M.pacotes.filter(function (p) { return p.diasAtras >= p.limiares.avisoDias && p.diasAtras <= p.limiares.bloqueioDias; });
  chk("T03 só o pacote da Transportes Capibaribe avisa sem bloquear (3 ≤ 4 ≤ 7, T03·3) — a 03", avisa.length === 1 && avisa[0].id === "pac-emp-02",
    avisa.map(function (p) { return p.id; }).join(","));
  chk("T03 a régua da idade vai de 0 a bloqueioDias + 1 (T03·4) — o 8 da 03 e da 04", M.pacotes.every(function (p) {
    return p.limiares.bloqueioDias + 1 === 8; }));
})();

/* ── T07 · dados da CAN: a faixa esperada em número e o rótulo curto ── */
(function () {
  /* "2.500" → 2500 · "12,0" → 12 · "−40" (U+2212) → −40 */
  var num = function (s) { return Number(String(s).replace(/\./g, "").replace(",", ".").replace("−", "-")); };
  var doTexto = function (e) {
    var m = e && e.match(/^([−\d.,]+) a ([−\d.,]+) /); if (m) return { min: num(m[1]), max: num(m[2]) };
    var p = e && e.match(/^(\d+) ou mais$/); if (p) return { min: num(p[1]), max: null };
    return null;
  };
  var todos = [];
  M.modelosAtivo.forEach(function (m) { m.sinaisCan.forEach(function (s) { todos.push({ m: m.id, s: s }); }); });
  var errados = todos.filter(function (x) {
    var t = doTexto(x.s.esperado), f = x.s.faixa;
    return t ? !(f && f.min === t.min && f.max === t.max) : f !== undefined;
  });
  chk("T07 a faixa em número bate com o esperado de cada sinal (e só onde ele é intervalo ou piso)", errados.length === 0 && todos.some(function (x) { return x.s.faixa; }),
    errados.map(function (x) { return x.m + "/" + x.s.id; }).join(",") || undefined);
  var dentro = function (f, v) { return v >= f.min && (f.max === null || v <= f.max); };
  var lidoNum = function (l) { return num(String(l).split(" ")[0]); };
  var fora = todos.filter(function (x) { return x.s.fase === "estatico" && x.s.faixa && !dentro(x.s.faixa, lidoNum(x.s.lido)); });
  chk("T07 o lido nominal de todo estático com faixa fica dentro dela", fora.length === 0, fora.map(function (x) { return x.m + "/" + x.s.id; }).join(",") || undefined);
  /* a CAN da biblioteca do modelo (decisões 59 e 61): seis sinais que contam, sem a caixa que espera */
  var D = M.diagnostico, can = D.can.sinais, ids = can.map(function (s) { return s.id; }).join(",");
  chk("T07 a CAN do herói: a biblioteca do ma-01 na ordem (rotação, hodômetro, horímetro, temperatura, combustível, consumo total), os seis contam, e a caixa que espera saiu",
    ids === "rotacao,hodometro,horimetro,temperatura,combustivel,consumo" && can.every(function (s) { return !s.soInforma; }) && !("canAguarda" in D) &&
    can.map(function (s) { return s.rotulo + " " + s.lido; }).join(" · ") === "Rotação 980 rpm · Hodômetro 482.317 km · Horímetro 9.640 h · Temperatura 31 °C · Combustível 62% · Consumo total 83.780 L",
    ids);
  var contam = D.modulo.filter(function (l) { return !l.soInforma; }).length;
  chk("T07 o total com a CAN lida é 14: 8 do módulo e 6 da CAN (13 de 14 na 08 e na 09; 11 de 14 na 10, relendo na temperatura)",
    contam + can.length === 14 && contam + can.length - 1 === 13 && contam + can.map(function (s) { return s.id; }).indexOf("temperatura") === 11);
  chk("T07 ao vivo só a rotação e a temperatura trocam o número (as leituras começam no lido); o hodômetro, o horímetro, o combustível e o consumo total ficam parados",
    can.filter(function (s) { return s.leituras; }).map(function (s) { return s.id; }).join(",") === "rotacao,temperatura" &&
    can.filter(function (s) { return s.leituras; }).every(function (s) { return s.leituras[0] === s.lido; }));
  var ma01 = M.modelosAtivo.filter(function (m) { return m.id === "ma-01"; })[0], sc = function (id) { return ma01.sinaisCan.filter(function (s) { return s.id === id; })[0]; };
  var p01 = M.calibracao.painel["a-01"], milhar = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); };
  chk("T07 o hodômetro e o horímetro do herói são os do painel (o ônibus não calibra) · a biblioteca do ma-01 sem o alternador, com o horímetro e o consumo total estáticos, e só a rotação dinâmica",
    can[1].lido === milhar(p01.hodometro) + " km" && can[2].lido === milhar(p01.horimetro) + " h" && sc("hodometro").lido === can[1].lido && sc("horimetro").lido === can[2].lido &&
    !sc("alternador") && sc("consumo").fase === "estatico" && sc("consumo").rotulo === "Consumo total" && sc("consumo").lido === can[5].lido &&
    ma01.sinaisCan.filter(function (s) { return s.fase === "dinamico"; }).map(function (s) { return s.id + ":" + s.lidoDinamico; }).join(",") === "rotacao:980 rpm" &&
    ma01.sinaisCan.every(function (s) { return !("rotuloCurto" in s); }));
  /* o não disponível da CAN (215 °C na temperatura, no J1939) é sem leitura, nunca um número */
  var iso = M.casos["can-estatico-isolado"], cfe = M.casos["can-fora-esperado"], t = sc("temperatura").faixa;
  chk("T07 a temperatura fora do esperado é 135 °C (a 09, e o can-fora-esperado), fora de −40 a 120, e nunca o 215 °C do não disponível",
    [iso, cfe].every(function (c) { var v = num(c.lido.split(" ")[0]); return c.sinal === "temperatura" && c.lido === "135 °C" && (v < t.min || v > t.max); }) &&
    JSON.stringify(M.casos).indexOf("215 °C") < 0, iso.lido + " · " + cfe.lido);
  /* a linha das mensagens no módulo: 0 no herói, 12 com o caso novo (e no M2C-0362 da 13) */
  var mp = M.casos["mensagens-pendentes"], heroi = M.ativos.filter(function (a) { return a.id === "a-01"; })[0];
  chk("T07 as mensagens no módulo: o herói diz 0, e o mensagens-pendentes é o par do herói com 12 por enviar (a folha da T09/27 lê dele)",
    D.modulo.filter(function (l) { return l.id === "mensagens"; })[0].heroi === "0 mensagens ainda não enviadas" &&
    !!mp && mp.ativoId === heroi.id && mp.moduloSerial === heroi.moduloSerial && mp.mensagens === 12, mp && mp.mensagens + " mensagens");
})();

/* ── T05 · conectar: os módulos por perto , a pré-checagem do herói e a atualização ── */
(function () {
  var perto = M.situacao.porPerto;
  var heroi = M.ativos.filter(function (a) { return a.id === "a-01"; })[0];
  var modulo = function (s) { return M.modulos.filter(function (m) { return m.serial === s; })[0]; };
  var linha = function (mod) { return M.matrizCapacidades.filter(function (r) { return r.modeloId === mod.modeloId && r.variante === mod.variante; })[0]; };
  chk("T05 por perto: 5 módulos, seriais únicos, o herói primeiro, todos achados pelo Bluetooth (T05/00 e 01: '5 encontrados')",
    perto.length === 5 && perto[0].serial === heroi.moduloSerial && perto.every(function (p) { return p.meio === "bluetooth"; }) &&
    perto.map(function (p) { return p.serial; }).filter(function (s, i, arr) { return arr.indexOf(s) === i; }).length === 5,
    perto.map(function (p) { return p.serial + ":" + p.meio; }).join(" · "));
  chk("T05 por perto: todo serial está no cadastro ou fora dele", perto.every(function (p) {
    return !!modulo(p.serial) || M.seriaisForaCadastro.indexOf(p.serial) >= 0; }));
  /* a busca só acha módulo com Bluetooth (decisão 59): a linha diz o modelo e a variante, do cadastro ou do que o módulo informa */
  var informado = function (s) { return modulo(s) || M.naBuscaForaCadastro[s]; };
  var nomeNaLista = function (s) { var m = informado(s); return M.modelos.filter(function (x) { return x.id === m.modeloId; })[0].nome + " · " + m.variante; };
  chk("T05 por perto: só módulo cuja variante tem Bluetooth na matriz (a 00: VL06 · CAN-BT, VL06 · CAN-BT, VL06 · FULL, VL06 · CAN-BT, VL06 · CAN-BT)",
    perto.every(function (p) { var l = linha(informado(p.serial)); return !!l && l.bluetooth === true; }) &&
    perto.map(function (p) { return nomeNaLista(p.serial); }).join(", ") === "VL06 · CAN-BT, VL06 · CAN-BT, VL06 · FULL, VL06 · CAN-BT, VL06 · CAN-BT",
    perto.map(function (p) { return nomeNaLista(p.serial); }).join(", "));
  var semBt = M.matrizCapacidades.filter(function (r) { return !r.bluetooth; }).map(function (r) { return M.modelos.filter(function (x) { return x.id === r.modeloId; })[0].nome + " " + r.variante; });
  chk("T05 o nenhum encontrado (a 03) diz as variantes sem Bluetooth, da matriz: o VL06 ECO e o VL06 CAN", semBt.join(" e ") === "VL06 ECO e VL06 CAN", semBt.join(" e "));
  /* sem o conflito-pinos-resolvivel, e sem a conferência do meio: o meio não decide o leitor */
  var mod = modulo(heroi.moduloSerial), l = linha(mod);
  var modelo = M.modelos.filter(function (m) { return m.id === mod.modeloId; })[0];
  var conteudo = M.modelosAtivo.filter(function (m) { return m.id === heroi.modeloAtivoId; })[0].conteudoRegistros;
  var regioes = M.cercas.regioes.filter(function (r) { return r.ativoId === heroi.id; }).length;
  chk("T05 o herói aprova pelo cadastro (VL06 CAN-BT · 8.04 · 96 de 127 contadores · 4 de 8 regiões)",
    modelo.driverV1 && l.firmwares.indexOf(mod.firmware) >= 0 && l.can && l.bluetooth && conteudo <= l.capacidadeRegistros && regioes <= l.regioesMax &&
    [modelo.nome + " " + mod.variante, mod.firmware, conteudo + " de " + l.capacidadeRegistros + " contadores", regioes + " de " + l.regioesMax + " regiões"].join(" · ") === "VL06 CAN-BT · 8.04 · 96 de 127 contadores · 4 de 8 regiões");
  var at = M.casos["firmware-fora-matriz"].atualizacao;
  chk("T05 a atualização do firmware tem o quadro da 10 entre 0 e 100 (62%)", !!at && at.quadroPct > 0 && at.quadroPct < 100, at && at.quadroPct + "%");
})();

/* ── T10 · calibração: o hodômetro do a-22 e o que a tela deriva de calibracao ── */
(function () {
  var C = M.calibracao;
  var num = function (s) { return Number(String(s).split(" ")[0].replace(/\./g, "").replace(",", ".")); };
  var gr = function (id) { return C.grandezas.filter(function (g) { return g.id === id; })[0]; };
  var ativo = function (id) { return M.ativos.filter(function (a) { return a.id === id; })[0]; };
  var linha = function (a) {
    var mod = M.modulos.filter(function (m) { return m.serial === a.moduloSerial; })[0];
    return M.matrizCapacidades.filter(function (r) { return r.modeloId === mod.modeloId && r.variante === mod.variante; })[0];
  };
  /* o hodômetro que a CAN lê: o do caso estático do ativo, se houver; senão, o nominal do modelo */
  var lidoCan = function (a) {
    var k = Object.keys(M.casos).filter(function (x) { return x.indexOf("can-estatico-") === 0 && M.casos[x].ativoId === a.id && M.casos[x].lidos && M.casos[x].lidos.hodometro; })[0];
    if (k) return M.casos[k].lidos.hodometro;
    return M.modelosAtivo.filter(function (m) { return m.id === a.modeloAtivoId; })[0].sinaisCan.filter(function (s) { return s.id === "hodometro"; })[0].lido;
  };
  var ids = Object.keys(C.bruto);
  var fora = ids.filter(function (id) { return num(lidoCan(ativo(id))) !== C.bruto[id].hodometro / gr("hodometro").fatorEnvio; });
  chk("T10 o hodômetro da CAN é o bruto ÷ fator em todo ativo de calibracao.bruto (482.317 · 87.604 · 121.003)",
    fora.length === 0 && ids.length === 3, fora.map(function (id) { return id + ": " + lidoCan(ativo(id)) + " × " + C.bruto[id].hodometro / 1000; }).join(" · ") || undefined);
  var c22 = M.casos["can-estatico-hodometro-a22"], a22 = c22 && ativo(c22.ativoId);
  chk("T10 o caso do a-22 aponta o ativo do cadastro, com módulo (RJP-1W48 · M2C-0480)", !!a22 && a22.placa === "RJP-1W48" && a22.moduloSerial === "M2C-0480");
  /* as grandezas de cada quadro: o cadastro do modelo, menos as de ajuste quando o módulo não lê pulsos */
  var doPar = function (id) {
    var a = ativo(id), pm = C.porModelo[a.modeloAtivoId], pulsos = linha(a).pulsos;
    var derrubadas = pm.calibraveis.filter(function (g) { return !pulsos && gr(g).natureza === "ajuste"; });
    return { calibraveis: pm.calibraveis.filter(function (g) { return derrubadas.indexOf(g) < 0; }), derrubadas: derrubadas };
  };
  var p01 = doPar("a-01"), p09 = doPar("a-09"), p22 = doPar("a-22");
  /* o ônibus não calibra nada (T10/11); o caminhão coletor calibra os quatro, dois opcionais; o a-22 sem pulsos fica com o hodômetro e o horímetro */
  chk("T10 os passos: o herói nenhum (nada a calibrar) · o a-09 4 (hodômetro, rotação, velocidade, horímetro) · o a-22 2 (hodômetro, horímetro)",
    p01.calibraveis.join(",") === "" && !!C.porModelo["ma-01"].nadaACalibrar && p09.calibraveis.join(",") === "hodometro,rotacao,velocidade,horimetro" && p22.calibraveis.join(",") === "hodometro,horimetro",
    [p01, p09, p22].map(function (p) { return p.calibraveis.join("+"); }).join(" · "));
  chk("T10 o rótulo da caixa (T10·5): só o módulo do a-22 derruba grandezas (rotação e velocidade, 'não lê pulsos')",
    p01.derrubadas.length === 0 && p09.derrubadas.length === 0 && p22.derrubadas.join(",") === "rotacao,velocidade" && C.motivoSemPulsos === "não lê pulsos");
  var t = C.tolerancia.hodometro, fator = gr("hodometro").fatorEnvio, relido = C.painel["a-01"].hodometro * fator + t.desvio;
  chk("T10 a releitura do hodômetro confere na tolerância (120 ≤ 100 + 40) e mostra o número do painel (482.317)",
    t.desvio <= t.granularidade + t.decorrido && Math.floor(relido / t.porUnidade) === C.painel["a-01"].hodometro && t.porUnidade === fator);
  chk("T10 'semeado há N dias' só com 1 ou mais: o herói 0 (desta sessão), o a-09 27, o a-22 39",
    C.ultimas["a-01"].hodometro === 0 && C.ultimas["a-09"].hodometro === 27 && C.ultimas["a-22"].hodometro === 39);
  /* o ônibus lê pela CAN o que o painel mostra (decisão 59): o horímetro do herói é 9.640 × 9.640, sem diferença */
  var h = gr("horimetro"), bh = C.bruto["a-01"].horimetro / h.fatorEnvio;
  chk("T10 o horímetro do herói: 9.640 h no módulo e 9.640 no painel, diferença zero (o ônibus não calibra)",
    Number.isInteger(bh) && bh === 9640 && C.painel["a-01"].horimetro - bh === 0, bh + " h");
  /* sem a foto do painel herdada da calibração (HU-T10-4) — a calibração não fotografa, e o
     Painel é foto a tirar na B (decisão 52; a checagem do Painel, embaixo, confere) */
})();

/* ── T09 · configurar módulo: o que a cadeia lê de M.cadeia, do cadastro do par e dos casos ── */
(function () {
  var Cd = M.cadeia, ordem = Cd.ordem;
  var heroi = M.ativos.filter(function (a) { return a.id === "a-01"; })[0];
  var ma = M.modelosAtivo.filter(function (m) { return m.id === heroi.modeloAtivoId; })[0];
  var preset = M.presetsEvento.filter(function (p) { return p.id === ma.presetEventoId; })[0], cx = M.conexoes[0];
  var regioesDe = function (id) { return M.cercas.regioes.filter(function (r) { return r.ativoId === id || (r.tambemAtivos || []).indexOf(id) >= 0; }); };
  var regioes = regioesDe(heroi.id);
  var pontos = regioes.reduce(function (s, r) { return s + (r.pontos || 0); }, 0);
  /* os sinais da biblioteca da CAN do modelo: a do diagnóstico, os que contam */
  var sinaisDe = function (m) { var lib = M.diagnostico.can; return lib.modeloAtivoId === m.id ? lib.sinais.filter(function (s) { return !s.soInforma; }).length : (m.sinaisCan || []).length; };
  var sinais = sinaisDe(ma);
  var E = Cd.etapas;
  var total = { ativo: sinais, cercas: pontos, leitor: E.leitor.total, eventos: M.eventosEmbarcados.length, conexao: E.conexao.ajustes.length };
  /* a cadeia gravando, etapa por etapa (decisão 57): cada etapa conta na unidade dela, e o total vem do mundo */
  chk("T09 a unidade de cada etapa e o total do herói: 6 sinais da CAN, 120 pontos (as 4 regiões), 4 ajustes, 12 eventos e 3 ajustes (a APN, o servidor e o reinício do modem) · a limpeza, um comando só, pelo tempo",
    sinais === 6 && regioes.length === 4 && pontos === 120 && total.leitor === 4 && total.eventos === 12 &&
    E.conexao.ajustes.join(",") === "apn,servidor,reinicio-do-modem" && E.limpeza.segTotal > 0 && !E.limpeza.conta &&
    ordem.slice(1).every(function (b) { return !!E[b].conta && E[b].seg > 0; }),
    ordem.slice(1).map(function (b) { return total[b] + " " + E[b].conta; }).join(" · "));
  /* o faltam é estimativa: o que falta × a estimativa por unidade (na releitura das cercas, a dela), com o
     arredondamento da T03 — até 10 s no segundo, até 59 s na dezena, de 60 s no minuto · os quadros desenhados */
  var est = function (s) { if (s <= 10) return "~" + Math.round(s) + " s"; var d = Math.round(s / 10) * 10; return d < 60 ? "~" + d + " s" : "~" + Math.round(s / 60) + " min"; };
  var faltam = function (b, feitos, conferindo) { var e = E[b]; return est((total[b] - feitos) * (conferindo ? (e.segConferindo || e.seg) : e.seg)); };
  var quadros = [["21", est(E.limpeza.segTotal * (1 - 0.4)), "~10 s"], ["22", faltam("ativo", 4), "~6 s"], ["23", faltam("cercas", 72), "~20 s"],
    ["24", faltam("cercas", 80, true), "~8 s"], ["00", faltam("leitor", 2), "~3 s"], ["25", faltam("eventos", 5), "~10 s"], ["26", faltam("conexao", 2), "~3 s"]];
  chk("T09 o faltam dos quadros, pela estimativa do mock: 21 ~10 s (a limpeza aos 40%) · 22 ~6 s · 23 ~20 s · 24 ~8 s (conferindo) · 00 ~3 s · 25 ~10 s · 26 ~3 s",
    quadros.every(function (q) { return q[1] === q[2]; }), quadros.map(function (q) { return q[0] + " " + q[1]; }).join(" · "));
  /* o que vai ser gravado (05) e o que cada etapa pronta diz (04), do cadastro do herói */
  chk("T09 o que vai ser gravado (05): o CADEIA.conteudo é o cadastro do herói — o modelo, as regiões, os fios do leitor do modelo, o intervalo do preset e a operadora com a APN do chip",
    Cd.conteudo.ativo === ma.modelo && Cd.conteudo.cercas === regioes.length + " regiões" && Cd.conteudo.leitor === ma.leitor.fios &&
    Cd.conteudo.eventos === "intervalo " + preset.intervaloRastreamentoSeg + " s" && Cd.conteudo.conexao === cx.operadora + " · " + cx.apn,
    ordem.slice(1).map(function (b) { return Cd.conteudo[b]; }).join(" · "));
  var prontos = [heroi.placa + " · " + sinais + " sinais da CAN", regioes.length + " regiões · " + pontos + " pontos", ma.leitor.fios + " · " + total.leitor + " ajustes",
    total.eventos + " eventos · intervalo " + preset.intervaloRastreamentoSeg + " s", cx.operadora + " · " + cx.apn];
  chk("T09 o que cada etapa pronta diz (04): RKT-8H42 · 6 sinais da CAN · 4 regiões · 120 pontos · fios azul e amarelo · 4 ajustes · 12 eventos · intervalo 30 s · TIM · timbrasil.br",
    prontos.join(" | ") === "RKT-8H42 · 6 sinais da CAN | 4 regiões · 120 pontos | fios azul e amarelo · 4 ajustes | 12 eventos · intervalo 30 s | TIM · timbrasil.br", prontos.join(" | "));
  /* a limpeza (decisão 58): a completa na instalação nova, só o bloco na manutenção */
  var Es = Cd.escopos;
  chk("T09 a limpeza: na instalação nova, a completa zera a configuração, a rede, os contadores e as mensagens, e os identificadores ficam; na manutenção, só o bloco, e a rede continua",
    Es.completa.modo === "instalacao" && ["configuracao", "rede", "contadores", "mensagens"].every(function (x) { return Es.completa.apaga.indexOf(x) >= 0; }) &&
    Es.completa.mantem.indexOf("identificadores") >= 0 && Es.completa.apaga.indexOf("identificadores") < 0 &&
    Es.bloco.modo === "manutencao" && Es.bloco.apaga.join(",") === "bloco" && Es.bloco.mantem.indexOf("rede") >= 0 && Es.bloco.mantem.indexOf("identificadores") >= 0);
  chk("T09 a releitura final: a APN lida é a do chip (a do cadastro da conexão), sem a rede da Mobs2",
    Cd.leituraFinal.apn === cx.apn && !!Cd.leituraFinal.servidor && !/Mobs2/.test(JSON.stringify(Cd.leituraFinal)), JSON.stringify(Cd.leituraFinal));
  /* as travas do envio (decisões 47 e 59): as cinco dimensões da capacidade, e a primeira que não cabe */
  var linhaDe = function (serial) { var m = M.modulos.filter(function (x) { return x.serial === serial; })[0]; return M.matrizCapacidades.filter(function (l) { return l.modeloId === m.modeloId && l.variante === m.variante; })[0]; };
  var trava = function (ativoId) {
    var a = M.ativos.filter(function (x) { return x.id === ativoId; })[0], m = M.modelosAtivo.filter(function (x) { return x.id === a.modeloAtivoId; })[0], l = linhaDe(a.moduloSerial);
    var nc = M.casos["conteudo-nao-cabe"].ativoId === ativoId ? M.casos["conteudo-nao-cabe"] : null, pl = M.casos["pool-esgotado"].ativoId === ativoId ? M.casos["pool-esgotado"] : null;
    var rs = regioesDe(ativoId), pts = pl ? pl.pontosCerca : rs.reduce(function (s, r) { return s + (r.pontos || 0); }, 0), cts = pl ? pl.cartoes : M.identificadores.cartoes.length;
    var dims = [["contadores", nc ? nc.conteudoRegistros : m.conteudoRegistros, nc ? nc.capacidadeRegistros : l.capacidadeRegistros], ["eventos", M.eventosEmbarcados.length, l.eventosMax],
      ["filtros", sinaisDe(m), l.filtrosCanMax], ["regioes", rs.length, l.regioesMax], ["memoria", pts + cts, l.pontosCercaMax]];
    var d = dims.filter(function (x) { return x[1] > x[2]; })[0];
    return d ? d[0] + " " + d[1] + " de " + d[2] : "cabe";
  };
  chk("T09 as travas do envio, nas cinco dimensões: o herói cabe (05) · o OCT-2J85 estoura os contadores, 131 de 127 (06) · o OYS-7D93 estoura a memória, 5.980 pontos + 240 cartões de 6.143 (07)",
    trava("a-01") === "cabe" && trava("a-10") === "contadores 131 de 127" && trava("a-05") === "memoria 6220 de 6143",
    [trava("a-01"), trava("a-10"), trava("a-05")].join(" · "));
  var que0 = M.casos["queda-na-cadeia"], sv = M.casos["servidor-ainda-nao"], mp = M.casos["mensagens-pendentes"];
  chk("T09 o 02 e o 03: o link cai com 2 dos 4 ajustes do Leitor gravados (parou em 2 de 4 ajustes)", que0.parouEm === 2 && que0.parouEm < total.leitor, que0.parouEm + " de " + total.leitor);
  chk("T09 a 12: o módulo do herói ainda não falou com o servidor, e o que conferir é o chip e o lugar do módulo",
    sv.moduloSerial === heroi.moduloSerial && sv.falouComServidor === false && sv.causas.join(",") === "chip,lugar-do-modulo", sv.causas.join(", "));
  chk("T09 a 27: o módulo do herói com 12 mensagens que ainda não enviou, no par do herói (a folha antes da limpeza completa)",
    !!mp && mp.moduloSerial === heroi.moduloSerial && mp.ativoId === heroi.id && mp.mensagens === 12, mp && mp.mensagens + " mensagens");
  /* sem CADEIA.versoes — a conta é pelo CADEIA.conteudo, o que a T09 mostra em cada elo */
  var comConteudo = ordem.filter(function (b) { return !!Cd.conteudo[b]; });
  chk("T09 os 6 passos têm rótulo, e só a limpeza não tem conteúdo (5 blocos com conteúdo, as palavras da conferência)",
    ordem.every(function (b) { return !!Cd.rotulos[b]; }) && comConteudo.length === 5 && !Cd.conteudo.limpeza && ordem.indexOf("conexao") === ordem.length - 1,
    comConteudo.join(","));
  var rec = M.casos["bloco-recusado"], que = M.casos["queda-na-cadeia"];
  var iR = ordem.indexOf(rec.bloco), iQ = ordem.indexOf(que.noBloco);
  chk("T09 o 01: o bloco recusado é Cercas, o 3º, com dois relidos antes e três não alcançados depois",
    iR === 2 && Cd.rotulos[rec.bloco] === "Cercas" && ordem.length - iR - 1 === 3);
  chk("T09 o 02 e o 03: a queda é no Leitor, com três gravados (3 de 6) e a Conexão ainda por gravar",
    iQ === 3 && Cd.rotulos[que.noBloco] === "Leitor" && iQ < ordem.indexOf("conexao"));
  var placa = function (id) { return M.ativos.filter(function (a) { return a.id === id; })[0].placa; };
  chk("T09 a faixa dos estados: M2C-0301 · QJF-2C61 no 01, M2C-0312 · PCX-9A17 no 02 e no 03",
    rec.moduloSerial === "M2C-0301" && placa(rec.ativoId) === "QJF-2C61" && que.moduloSerial === "M2C-0312" && placa(que.ativoId) === "PCX-9A17");
})();

/* ── T05 · conectar: os estados e os pares dos casos que a T05 lê ── */
(function () {
  var par = function (c) { var a = M.ativos.filter(function (x) { return x.id === c.ativoId; })[0]; return !!a && a.moduloSerial === c.moduloSerial; };
  var bv = M.casos["busca-vazia"];
  chk("T05 a busca vazia tem a duração da tentativa, maior que 0 (T05/03: '8 s · primeira tentativa')",
    !!bv && bv.duracaoSeg > 0 && bv.tentativa === 1, bv && bv.duracaoSeg + " s · tentativa " + bv.tentativa);
  var ff = M.casos["firmware-fora-matriz"], fs = M.casos["firmware-fora-sem-rede"];
  chk("T07 o firmware fora sem rede é o mesmo par do firmware fora da matriz, com o modem sem rede (T07/05)",
    !!fs && fs.moduloSerial === ff.moduloSerial && fs.ativoId === ff.ativoId && par(fs) && !!fs.modem, fs && fs.moduloSerial + " × " + fs.ativoId + " · " + fs.modem);
  var mod = M.modulos.filter(function (m) { return m.serial === fs.moduloSerial; })[0];
  var lin = M.matrizCapacidades.filter(function (r) { return r.modeloId === mod.modeloId && r.variante === mod.variante; })[0];
  chk("T07 o firmware do módulo do par está fora da matriz dele (8.01 fora de 8.03 e 8.04, a 04)", !!lin && lin.firmwares.indexOf(mod.firmware) < 0 &&
    mod.firmware === "8.01" && lin.firmwares.join(" e ") === "8.03 e 8.04",
    mod.firmware + " × " + lin.firmwares.join(" e "));
  var DOS_PARES = ["conexao-falha", "link-perdido", "modulo-com-pendencias", "modelo-sem-driver", "conteudo-nao-cabe"]; /* sem o modulo-em-repouso e o canal-aberto */
  chk("T05 os casos da T05 apontam o par ativo × módulo do cadastro", DOS_PARES.every(function (k) { return par(M.casos[k]); }),
    DOS_PARES.filter(function (k) { return !par(M.casos[k]); }).join(",") || undefined);
  var pool = M.casos["pool-esgotado"], ativoPool = M.ativos.filter(function (a) { return a.id === pool.ativoId; })[0];
  chk("T05 o pool esgotado aponta um ativo com módulo cadastrado (a-05 × M2C-0348)", !!ativoPool && M.modulos.some(function (m) { return m.serial === ativoPool.moduloSerial; }),
    ativoPool && ativoPool.moduloSerial);
})();

/* ── T12 · últimas instalações: os grupos por idade e a empresa vazia ── */
(function () {
  var G = M.criteriosRegra.gruposIdade;
  chk("T12 o corte dos grupos por idade: hoje 0, ontem 1 e esteMesAte de 17 a 26",
    !!G && G.hoje === 0 && G.ontem === 1 && G.esteMesAte >= 17 && G.esteMesAte < 27, G && "esteMesAte " + G.esteMesAte);
  var ativo = function (id) { return M.ativos.filter(function (a) { return a.id === id; })[0]; };
  var grupo = function (d) { return d <= G.hoje ? "HOJE" : d <= G.ontem ? "ONTEM" : d <= G.esteMesAte ? "ESTE MÊS" : "MAIS DE UM MÊS"; };
  /* as instalações da empresa: as dos ativos dela — os 24 do mock são da Viação, e as 13 também */
  var daEmpresa = M.instalacoes.filter(function (i) { return !!ativo(i.ativoId); })
    .sort(function (a, b) { return a.diasAtras - b.diasAtras; });
  var desenho = daEmpresa.map(function (i) { return grupo(i.diasAtras) + " " + ativo(i.ativoId).placa; }).join(" · ");
  var porGrupo = {}; daEmpresa.forEach(function (i) { var g = grupo(i.diasAtras); porGrupo[g] = (porGrupo[g] || 0) + 1; });
  chk("T12 a 00: as 13 da Viação (13 nesta empresa), nos quatro grupos da referência — hoje 1 · ontem 1 · este mês 6 · mais de um mês 5, na ordem da 00",
    daEmpresa.length === 13 && porGrupo["HOJE"] === 1 && porGrupo["ONTEM"] === 1 && porGrupo["ESTE MÊS"] === 6 && porGrupo["MAIS DE UM MÊS"] === 5 &&
    desenho === "HOJE RKT-8H42 · ONTEM PCX-9A17 · ESTE MÊS RSW-9L02 · ESTE MÊS KWX-2T36 · ESTE MÊS KJC-7N23 · ESTE MÊS RVM-1E54 · ESTE MÊS ONK-8Q90 · ESTE MÊS QJF-2C61 · " +
      "MAIS DE UM MÊS PEY-9U62 · MAIS DE UM MÊS KNB-5H39 · MAIS DE UM MÊS QAH-1M67 · MAIS DE UM MÊS RJP-1W48 · MAIS DE UM MÊS RDF-3R14", desenho);
  var v = M.casos["instalacoes-vazia"];
  chk("T12 a 02 : a consulta da empresa volta sem nenhum id, e sem sessão", !!v && Array.isArray(v.instalacaoIds) && v.instalacaoIds.length === 0 && v.sessao === null);
  var ids = M.instalacoes.map(function (i) { return i.id; }).join(",");
  chk("T12 as 13 instalações ficam intocadas (i-01 a i-13, na ordem), todas de ativos da Viação",
    ids === "i-01,i-02,i-03,i-04,i-05,i-06,i-07,i-08,i-09,i-10,i-11,i-12,i-13" && M.instalacoes.every(function (i) { return !!ativo(i.ativoId); }));
  /* a ressalva fala de um item da Montagem que existe, com a justificativa no masculino do módulo */
  var r3 = M.instalacoes.filter(function (i) { return i.id === "i-03"; })[0].ressalva;
  chk("T12 a ressalva da i-03 é de um item da Montagem que existe (Módulo fixado e posicionado)",
    !!r3 && M.checklist.itens.some(function (x) { return x.secao === "B" && x.pergunta === r3.item; }) &&
    r3.justificativa === "Suporte original quebrado; módulo fixado com abraçadeira reforçada", r3 && r3.item);
  var sr = M.casos["instalacoes-sem-rede"];
  chk("T12 a 03: a consulta anterior é de hoje, a uma hora do dia antes das 14:30 (11:47)",
    sr.diasAtras === 0 && /^\d\d:\d\d$/.test(sr.consultadoAs) && sr.consultadoAs < M.HORA_NOMINAL, sr.consultadoAs);
  var h = M.instalacoes.filter(function (i) { return !!i.etapas; });
  chk("T12 o 01 e o 04: a i-01 e a i-02 têm as etapas do detalhe (a referência da T12/04 vence) · as outras abrem só com o que o resumo sustenta",
    h.length === 2 && h[0].id === daEmpresa[0].id && h[1].id === "i-02" && M.instalacoes.every(function (i) { return !!i.etapas || !!i.resumo; }), h.map(function (i) { return i.id; }).join(","));
})();

/* ── T15 · fila de saída: os rótulos curtos, a janela da re-checagem e os três recortes ── */
(function () {
  var F = M.filaSaida, T = M.tiposFila || [];
  var curto = function (tipo) { var t = T.filter(function (x) { return x.tipo === tipo; })[0]; return t && t.rotuloCurto; };
  var fontesFila = M.checklist.itens.filter(function (i) { return /^fila:/.test(i.fonte || ""); }).map(function (i) { return i.fonte.slice(5); });
  var semCurto = F.map(function (f) { return f.tipo; }).concat(fontesFila).filter(function (t) { return !curto(t); });
  chk("T15 todo tipo da fila e toda fonte 'fila:<tipo>' do checklist têm rótulo curto", T.length > 0 && !semCurto.length, semCurto.join(", ") || T.length + " tipos");
  /* a foto de calibração não é tipo da fila — as referências mostram Evidências e Checklist */
  chk("T15 os rótulos curtos que as referências mostram: Evidências e Checklist, e a foto de calibração não é mais tipo",
    curto("Evidências da instalação") === "Evidências" && curto("Checklist de homologação") === "Checklist" && !curto("Foto de calibração"),
    T.map(function (t) { return t.rotuloCurto; }).join(" · "));
  chk("T15 a re-checagem da Seção F tem janela em horas, maior que 0 ('confere em 24 h')",
    M.criteriosRegra.recheckHoras > 0, M.criteriosRegra.recheckHoras + " h");
  var item = function (id) { return F.filter(function (f) { return f.id === id; })[0]; };
  var RECORTES = ["fila-sem-erro", "fila-dois-erros", "fila-vazia"];
  chk("T15 os três recortes existem e todo id deles está em filaSaida", RECORTES.every(function (k) {
    var c = M.casos[k]; return !!c && Array.isArray(c.itens) && c.itens.every(function (id) { return !!item(id); }); }));
  var se = M.casos["fila-sem-erro"].itens.map(item);
  /* o recorte do 01: o envio corrente, um na fila e três recebidas — sem o recebido em conflito (f-11), que a 01
     não desenha e entra só na fila do aparelho da 00 */
  chk("T15 o 01 (fila-sem-erro): 5 itens — o envio corrente com progresso e tamanho, um na fila e três recebidas —, nenhum erro nem o recebido em conflito",
    se.length === 5 && se.filter(function (f) { return f.estado === "enviando" && f.progresso > 0 && f.tamanhoMb > 0; }).length === 1 &&
    se.filter(function (f) { return f.estado === "na-fila"; }).length === 1 && se.filter(function (f) { return f.estado === "recebida"; }).length === 3 &&
    !se.some(function (f) { return /^erro/.test(f.estado) || f.estado === "recebida-em-conflito"; }), se.map(function (f) { return f.id; }).join(","));
  var de = M.casos["fila-dois-erros"].itens.map(item);
  chk("T15 o 02 (fila-dois-erros): 4 itens, uma recusa manual com motivo e um erro de rede automático com tentativas e a próxima",
    de.length === 4 && de.filter(function (f) { return f.estado === "erro-recusa" && f.reenvio === "manual" && !!f.motivo; }).length === 1 &&
    de.filter(function (f) { return f.estado === "erro-rede" && f.reenvio === "automático" && f.tentativas > 0 && /^\d\d:\d\d$/.test(f.proximaTentativaAs); }).length === 1);
  var va = M.casos["fila-vazia"];
  chk("T15 o 03 e o 04 (fila-vazia): nada no recorte, o último envio em HH:MM antes das 14:30, sem sessão",
    va.itens.length === 0 && /^\d\d:\d\d$/.test(va.ultimoEnvioAs) && va.ultimoEnvioAs < M.HORA_NOMINAL && va.sessao === null, va.ultimoEnvioAs);
  /* a fila do aparelho na entrada (decisão 42): a 00 da T15, e o que o contador do menu conta — do aparelho, não da empresa */
  var ap = (M.filaDoAparelho || []).map(item);
  chk("T15 a fila do aparelho da 00 (filaDoAparelho: f-10, f-02, f-08, f-11): a recusa, um na fila, um recebido e o recebido em conflito",
    (M.filaDoAparelho || []).join(",") === "f-10,f-02,f-08,f-11" && ap.every(Boolean) &&
    ap.map(function (f) { return f.estado; }).join(",") === "erro-recusa,na-fila,recebida,recebida-em-conflito", (M.filaDoAparelho || []).join(","));
  chk("T15 a fila fica intocada: 11 itens, f-01 a f-11, na ordem (o f-11 é o recebido em conflito)",
    F.length === 11 && F.every(function (f, i) { return f.id === "f-" + (i < 9 ? "0" : "") + (i + 1); }));
})();

/* ── T14 · o ciclo dinâmico: os campos do evento , o passo de cada sinal e os três casos que a T14 lê ── */
(function () {
  var C = M.ciclo, ev = C.evento;
  var um = function (lista, id) { return lista.filter(function (x) { return x.id === id; })[0]; };
  chk("T14 o 00 é o instante antes de o evento chegar: 120 − 24 = 96 s, o 1:36 (e 24 < 33 < 120)",
    C.prazoEventoSeg - ev.recebidoAosSeg === 96 && ev.recebidoAosSeg < ev.conferidoAosSeg && ev.conferidoAosSeg < C.prazoEventoSeg);
  chk("T14 o evento confere campos, e o '6 de 6' sai daqui", Number.isInteger(ev.campos) && ev.campos > 0, ev.campos + " campos");
  var ma01 = um(M.modelosAtivo, "ma-01");
  var passos = um(M.instalacoes, "i-01").etapas.cicloDinamico.passos;
  var sinais = Object.keys(C.passoDoSinal || {});
  /* os passos são os do ciclo parado, e a velocidade só entra com tacógrafo digital (decisão 54) */
  chk("T14 o passo de cada sinal: as chaves são sinais dinâmicos do ma-01, e os valores, passos da i-01 — a velocidade só com tacógrafo digital",
    sinais.length > 0 && sinais.every(function (k) { var s = um(ma01.sinaisCan, k); return !!s && s.fase === "dinamico" && passos.indexOf(C.passoDoSinal[k]) >= 0 &&
      (k !== "velocidade" || ma01.tacografoDigital === true); }),
    sinais.map(function (k) { return k + " → " + C.passoDoSinal[k]; }).join(" · ") + " · passos: " + passos.join(", "));
  /* a 03 é a rotação zerada do motor-desligado-no-ciclo */
  var md = M.casos["motor-desligado-no-ciclo"], amd = um(M.ativos, md.ativoId), smd = um(um(M.modelosAtivo, amd.modeloAtivoId).sinaisCan, md.passo);
  chk("T14 o 03: o caso motor-desligado-no-ciclo zera um sinal dinâmico do modelo do ativo, fora da faixa, e reprova o passo dele (rotação → Rotação, '0 rpm · ligue o motor')",
    !!smd && smd.fase === "dinamico" && !!smd.faixa && Number(md.lido.split(" ")[0]) < smd.faixa.min && passos.indexOf(C.passoDoSinal[md.passo]) >= 0,
    md.passo + " " + md.lido + " → " + C.passoDoSinal[md.passo]);
  /* sem o 04 — o técnico confere o cartão com o número impresso; a 12 é o ativo sem leitor */
  var ativo = function (i) { return um(M.ativos, i); };
  var sr = M.casos["evento-sem-resposta"], sl = M.casos["sem-leitor"];
  chk("T14 a faixa dos estados é o par do cadastro (a-04 × M2C-0335, a-02 × M2C-0301 · QJF-2C61), e o sem-leitor é o herói, cujo leitor o caso tira",
    !!ativo(sr.ativoId) && ativo(sr.ativoId).moduloSerial === sr.moduloSerial && sr.tentativa === 1 && amd.moduloSerial === "M2C-0301" && amd.placa === "QJF-2C61" &&
    sl.ativoId === "a-01" && sl.leitor === false && !!um(M.modelosAtivo, ativo(sl.ativoId).modeloAtivoId).leitor);
})();

/* ── T11 · conferir configuração: o par que confere e o que a tela lê dos dois casos ── */
(function () {
  var Cd = M.cadeia;
  var ativo = function (id) { return M.ativos.filter(function (a) { return a.id === id; })[0]; };
  var real = function (c) { var a = c && ativo(c.ativoId); return !!a && a.moduloSerial === c.moduloSerial && M.modulos.some(function (m) { return m.serial === c.moduloSerial; }); };
  var cc = M.casos["conferencia-confere"], dd = M.casos["diff-divergente"], ic = M.casos["indice-nao-classificado"];
  chk("T11 o par que confere é real (a-01 × M2C-0417), sem valor declarado, e não é o par do diff-divergente",
    real(cc) && cc.ativoId === "a-01" && Object.keys(cc).join(",") === "ativoId,moduloSerial" && !(cc.ativoId === dd.ativoId && cc.moduloSerial === dd.moduloSerial));
  chk("T11 a 00 e a 01: o diff-divergente e o indice-nao-classificado são do mesmo par real (M2C-0438 · ONK-8Q90)",
    real(dd) && real(ic) && dd.ativoId === ic.ativoId && dd.moduloSerial === ic.moduloSerial && ativo(dd.ativoId).placa === "ONK-8Q90");
  /* sem versão, a conferência compara conteúdo (decisão 53) — quatro linhas que se comparam e o
     Extended ID só leitura, fora da conta; o Corrigir vai no primeiro que diverge na ordem da cadeia */
  var cmp = dd.divergencias.map(function (d) { return d.bloco; });
  var primeiro = Cd.ordem.filter(function (b) { return cmp.indexOf(b) >= 0; })[0];
  /* a conferência tem os cinco blocos do script — o Ativo confere (traduz a CAN do
     OF-1621) e os outros quatro divergem ('4 de 5'), na ordem do script; o cadastro é o conteúdo que a cadeia
     grava: o Leitor, os fios do leitor do modelo do herói; a Conexão, a operadora e a APN do chip (decisão 59) */
  var cx = M.conexoes[0], naConexao = function (c) { return c.operadora + " · " + c.apn; };
  var fiosDe = function (id) { return M.modelosAtivo.filter(function (m) { return m.id === id; })[0].leitor.fios; };
  var div = function (b) { return dd.divergencias.filter(function (d) { return d.bloco === b; })[0]; };
  chk("T11 a 00: cinco blocos na ordem do script, o Ativo confere e quatro divergem ('4 de 5'), o cadastro é o conteúdo que a cadeia grava, e o primeiro na ordem da cadeia é o das cercas",
    dd.ordem.length === 5 && cmp.length === 4 && dd.confere.length === 1 && dd.confere[0].bloco === "ativo" &&
    dd.divergencias.every(function (d) { var c = Cd.conteudo[d.bloco]; return !!c && d.noCadastro === c && d.noModulo !== c; }) &&
    div("leitor").noCadastro === fiosDe("ma-01") && div("conexao").noCadastro === naConexao(cx) &&
    !dd.extendedId && primeiro === "cercas",
    dd.divergencias.map(function (d) { return (d.rotulo || Cd.rotulos[d.bloco]) + " " + d.noCadastro + " × CADEIA " + Cd.conteudo[d.bloco]; }).join(" · ") + " · corrige " + primeiro);
  chk("T11 a 00: o que o módulo tem no Leitor e na Conexão diz a mesma gramática — o fio verde (o 1-Wire) e o chip antigo, Claro · claro.com.br",
    div("leitor").noModulo === "fio verde" && div("leitor").noModulo === fiosDe("ma-02") && div("conexao").noModulo === "Claro · claro.com.br",
    div("leitor").noModulo + " · " + div("conexao").noModulo);
  var a = ativo(cc.ativoId), mdl = M.modelosAtivo.filter(function (m) { return m.id === a.modeloAtivoId; })[0];
  var pe = M.presetsEvento.filter(function (p) { return p.id === mdl.presetEventoId; })[0];
  var regioes = M.cercas.regioes.filter(function (r) { return r.ativoId === a.id; }).length;
  chk("T11 o 02 pelo cadastro do herói: '4 regiões', 'intervalo 30 s', os fios azul e amarelo do leitor do modelo e TIM · timbrasil.br, como a referência",
    regioes === 4 && pe.intervaloRastreamentoSeg === 30 && mdl.leitor.fios === "fios azul e amarelo" && naConexao(cx) === "TIM · timbrasil.br",
    regioes + " · " + pe.intervaloRastreamentoSeg + " s · " + mdl.leitor.fios + " · " + naConexao(cx));
  var cr = M.casos["cercas-reenviadas"];
  chk("T11 a 05: o caso cercas-reenviadas é o par do herói, na manutenção, e os que ficam 'revisar em seguida' são o arraste do bloco reenviado (2: o leitor e os eventos)",
    real(cr) && cr.ativoId === "a-01" && cr.modo === "manutencao" && Cd.arraste[cr.reenviado].slice().sort().join(",") === "eventos,leitor",
    cr.reenviado + " → " + Cd.arraste[cr.reenviado].join(", "));
})();

/* ── T13 · checklist: os títulos, a dica e a justificativa , a leitura nominal e o que a tela deriva ── */
(function () {
  var CK = M.checklist;
  var um = function (lista, id) { return lista.filter(function (x) { return x.id === id; })[0]; };
  var secao = function (id) { return um(CK.secoes, id); };
  var item = function (id) { return um(CK.itens, id); };
  chk("T13 as 6 seções têm o nome curto, e é ele o rótulo de topo do nível do item ('B · MONTAGEM', 'C · HARDWARE')",
    CK.secoes.length === 6 && CK.secoes.every(function (s) { return !!s.rotulo && !("titulo" in s); }) &&
    ("B · " + secao("B").rotulo).toUpperCase() === "B · MONTAGEM" && ("C · " + secao("C").rotulo).toUpperCase() === "C · HARDWARE",
    CK.secoes.map(function (s) { return s.id + " " + s.rotulo; }).join(" · "));
  var B = CK.itens.filter(function (i) { return i.secao === "B"; });
  chk("T13 o nível do item da T13/07 (título, 'Depois:' com o 2º item, o lado de cima, e a frase embaixo do título) e o da T13/09 (título, o rótulo) saem dos itens",
    item("b-modulo").pergunta === "Módulo fixado e posicionado" && B[B.indexOf(item("b-modulo")) + 1] === item("b-lado-de-cima") &&
    item("b-lado-de-cima").pergunta === "Lado de cima do módulo livre" && item("b-lado-de-cima").rotulo === "Lado de cima" && !item("b-antena") &&
    item("b-modulo").enquadre === "Enquadre o módulo e o ponto de fixação" && !item("c-alimentacao").pergunta && item("c-alimentacao").rotulo === "Alimentação");
  /* a frase embaixo do título diz o que enquadrar (decisão 60): a do lado de cima diz antes onde a antena GPS fica (T13/17) */
  chk("T13 cada foto da Montagem tem a sua frase (o enquadre, embaixo do título), que diz o que enquadrar, sem a dica (instrucao) · a do lado de cima, a da T13/17",
    B.length === 5 && B.every(function (i) { return /(^|\. )Enquadre [^.]+\.?$/.test(i.enquadre || "") && !("instrucao" in i); }) &&
    item("b-lado-de-cima").enquadre === "A antena GPS fica dentro, desse lado. Enquadre o módulo e o espaço acima dele.", B.map(function (i) { return i.id; }).join(","));
  chk("T13 a justificativa de exemplo não é vazia, e não é a ressalva de outra instalação",
    typeof CK.exemploJustificativa === "string" && CK.exemploJustificativa.length > 0 &&
    M.instalacoes.every(function (i) { return !i.ressalva || i.ressalva.justificativa !== CK.exemploJustificativa; }));
  /* as fotos de exemplo (decisão 63): uma por foto da Montagem e a do problema, cada uma num arquivo de 04-dados/fotos,
     e a do painel, uma por ativo que tem no mock o que está escrito no painel (calibracao.painel) */
  var FE = CK.fotosDeExemplo || {}, fsF = require("fs"), pathF = require("path");
  var fotosFE = Object.keys(FE).reduce(function (a, k) {
    return a.concat(typeof FE[k] === "string" ? [FE[k]] : Object.keys(FE[k]).map(function (x) { return FE[k][x]; })); }, []);
  chk("T13 cada foto da Montagem e o problema têm a foto de exemplo, num arquivo que existe · a do painel, uma por ativo de calibracao.painel (T13/15, 44 a 48)",
    B.every(function (i) { return !!FE[i.id]; }) && typeof FE.problema === "string" &&
    fotosFE.every(function (c) { return fsF.existsSync(pathF.join(__dirname, c)); }) &&
    JSON.stringify(Object.keys(FE["b-painel-legivel"] || {}).sort()) === JSON.stringify(Object.keys(M.calibracao.painel).sort()),
    fotosFE.length + " fotos");
  chk("T13 o relatório leva um número inteiro de evidências (o '12' da T13/06 e da T13/11)", Number.isInteger(CK.evidencias) && CK.evidencias > 0, CK.evidencias);
  var L = M.leituraNominalModulo;
  chk("T13 as entradas usadas cabem no total (4 de 4), e o modem lido fica dentro da faixa esperada (−71 em −100 a −60)",
    !!L && L.entradasUsadas <= L.entradasTotal && L.entradasTotal > 0 && L.modemDbm >= L.modemFaixa.min && L.modemDbm <= L.modemFaixa.max,
    L && (L.entradasUsadas + " de " + L.entradasTotal + " · " + L.modemDbm + " em " + L.modemFaixa.min + "…" + L.modemFaixa.max));
  // T13·5 (a): a escala do modem, −110 a −50, dá as posições da T13/03
  var pos = function (x, a, b) { return Math.round(((x - a) / (b - a)) * 1000) / 10; };
  /* a tensão da bateria não vem da CAN — a alimentação é a do módulo, contra a faixa do
     modelo do módulo (o VL06, 9,0 a 40,0 V); a conferência dela é a do diagnóstico, logo abaixo */
  var alim = M.diagnostico.modulo.filter(function (l) { return l.id === "alimentacao"; })[0];
  var vl06 = um(M.modelos, "vl06").faixaTensao, vHeroi = Number(alim.heroi.split(" ")[0].replace(",", "."));
  chk("T13 T13·5: a alimentação do herói (24,3 V) fica dentro da faixa do VL06 (9,0 a 40,0 V), a mesma que o diagnóstico escreve",
    !!alim && vl06[0] === 9 && vl06[1] === 40 && alim.faixa === "9,0 a 40,0 V" && vHeroi >= vl06[0] && vHeroi <= vl06[1], alim && alim.faixa + " · " + alim.heroi);
  chk("T13 T13·5: o modem em −110 a −50 dá a faixa de 16,7% a 83,3% e o marcador em 65% (T13/03)",
    pos(L.modemFaixa.min, -110, -50) === 16.7 && pos(L.modemFaixa.max, -110, -50) === 83.3 && pos(L.modemDbm, -110, -50) === 65);
  /* o GPS aprova pela posição (decisão 60): o herói lê com posição (a leitura nominal), e os
     satélites e a antena do diagnóstico ficam como informação */
  var gps = M.diagnostico.modulo.filter(function (l) { return l.id === "gps"; })[0];
  chk("T13 o GPS aprova pela posição: o item lê a posição, e o herói está com posição · os satélites e a antena do diagnóstico, só informação (9 satélites · antena conectada)",
    item("c-gps").fonte === "posicao" && item("c-gps").rotulo === "GPS e antena" && L.posicao === "com posição" && /^\d+ satélites$/.test(gps.info || "") && gps.heroi === "antena conectada",
    item("c-gps").fonte + " · " + L.posicao + " · " + gps.info + " · " + gps.heroi);
  var iso = M.casos["can-estatico-bateria"], lido = Number(iso.alimentacao.split(" ")[0].replace(",", "."));
  /* a alimentação é a do fio do equipamento, contra a faixa do VL06 (9,0 a 40,0 V), na régua de 5 a 45: a faixa de 10% a 87,5% da barra */
  var ft = um(M.modelos, M.modulos.filter(function (m) { return m.serial === iso.moduloSerial; })[0].modeloId).faixaTensao;
  chk("T13 o 09 e o 16, e a T07/12, pelo caso can-estatico-bateria: a alimentação do M2C-0301 abaixo da faixa do VL06, '0,6 V abaixo', na régua de 5 a 45 a faixa de 10% a 87,5% e o marcador a 8,5%, e ela é o 1º item de C",
    um(M.ativos, iso.ativoId).moduloSerial === iso.moduloSerial && lido < ft[0] && (ft[0] - lido).toFixed(1) === "0.6" &&
    pos(ft[0], 5, 45) === 10 && pos(ft[1], 5, 45) === 87.5 && pos(lido, 5, 45) === 8.5 &&
    CK.itens.filter(function (i) { return i.secao === "C"; })[0].id === "c-alimentacao", iso.ativoId + " · " + iso.moduloSerial + " · " + iso.alimentacao + " · " + ft.join(" a "));
  /* o ônibus da bateria fraca é desenhado sem leitor (T13/16): sem a foto do Leitor, o bloco do leitor,
     o cartão e o bip — 3 fotos, a D com 7, a E com 3: 23 itens, e 14 feitos pela semente (A 4 · C 3 · D 7) */
  var semLeitor = CK.itens.filter(function (i) { return i.condicao !== "reescritaId" && i.condicao !== "calibracao" && i.conta !== false && i.condicao !== "leitor" && i.condicao !== "buzzer"; });
  var nSL = function (sec) { return semLeitor.filter(function (i) { return i.secao === sec; }).length; };
  chk("T13 a 16: o caso can-estatico-bateria tira o leitor do ônibus — 'você fotografa 3 itens', a D com 7, a E com 3: 14 de 23",
    iso.leitor === false && semLeitor.length === 23 && nSL("B") === 3 && nSL("D") === 7 && nSL("E") === 3 && nSL("A") + (nSL("C") - 1) + nSL("D") === 14,
    ["A", "B", "C", "D", "E", "F"].map(function (k) { return k + " " + nSL(k); }).join(" · "));
  var pf = M.casos["pronto-para-fechar"], a09 = um(M.ativos, pf.ativoId);
  chk("T13 o 10 pelo caso pronto-para-fechar: o par é o do cadastro (KNB-5H39 × M2C-0371), e o servidor não respondeu",
    !!a09 && a09.moduloSerial === pf.moduloSerial && pf.recebimento === "sem resposta", a09 && a09.placa + " × " + pf.moduloSerial);
  // a Seção F só conta o que é desta sessão (criadoAs ≥ a abertura, 14:30) — o que o herói subiu às 09:14 e 09:15 é de antes
  var desta = M.filaSaida.filter(function (f) { return f.ativoId === "a-01" && f.diasAtras === 0 && f.criadoAs >= M.HORA_NOMINAL; });
  chk("T13 a fila do herói não tem nada desta sessão (f-05 e f-06 são de antes das 14:30), e a Seção F nasce esperando",
    desta.length === 0 && M.filaSaida.filter(function (f) { return f.ativoId === "a-01"; }).length === 2);
  chk("T13 as fontes 'fila:<tipo>' da Seção F são tipos da fila", CK.itens.filter(function (i) { return /^fila:/.test(i.fonte || ""); }).every(function (i) {
    return (M.tiposFila || []).some(function (t) { return "fila:" + t.tipo === i.fonte; }); }));
  // a 00 pela semente: o herói depois da calibração, antes das fotos, do ciclo e da fila.
  // Cada seção recomputada do que a tela lê: A pelo cadastro do par (o firmware na lista da variante),
  // C pelas leituras (a alimentação na faixa do modelo do módulo, o GPS com posição, as entradas
  // e o modem), D pela cadeia (os seis blocos, o canal e o ID; o Autoteste roda ao encerrar e
  // não conta), e B e E por fazer · sem o chassi na A, e sem a versão gravada na D (decisões 52 a 54)
  var heroi = um(M.ativos, "a-01"), mod = M.modulos.filter(function (m) { return m.serial === heroi.moduloSerial; })[0];
  var linha = M.matrizCapacidades.filter(function (r) { return r.modeloId === mod.modeloId && r.variante === mod.variante; })[0];
  var ftHeroi = um(M.modelos, mod.modeloId).faixaTensao;
  var da = function (s) { return CK.itens.filter(function (i) { return i.secao === s && i.conta !== false && i.condicao !== "reescritaId"; }); };
  var conta = {
    A: linha.firmwares.indexOf(mod.firmware) >= 0 ? da("A").length : 0,
    C: [vHeroi >= ftHeroi[0] && vHeroi <= ftHeroi[1], L.posicao === "com posição", L.entradasUsadas <= L.entradasTotal,
      L.modemDbm >= L.modemFaixa.min && L.modemDbm <= L.modemFaixa.max].filter(Boolean).length,
    D: da("D").filter(function (i) {
      var f = String(i.fonte).split(":");
      return f[0] === "bloco" ? M.cadeia.ordem.indexOf(f[1]) >= 0 : i.fonte === "canal" || i.fonte === "idCadastro";
    }).length
  };
  /* o herói: a A com 4, a B com 4 (o ônibus não calibra, e o Painel não entra), a C com 4, a D
     com 8 (sem as pendências, e o Autoteste não conta), a E com 5 e a F com 2 — 27 —, e a
     semente traz feitos a A, a C e a D: 16 de 27, e Faltam 9 itens obrigatórios (B 4 + E 5) */
  var doHeroi = CK.itens.filter(function (i) { return i.condicao !== "reescritaId" && i.condicao !== "calibracao" && i.conta !== false; });
  var n27 = function (sec) { return doHeroi.filter(function (i) { return i.secao === sec; }).length; };
  chk("T13 a 00: 16 de 27 pela semente (A 4 · C 4 · D 8, todos lidos; o Autoteste não conta) e 'Faltam 9 itens obrigatórios' (B 4 + E 5)",
    doHeroi.length === 27 && n27("A") === 4 && n27("C") === 4 && n27("D") === 8 && n27("B") + n27("E") === 9 && n27("F") === 2 &&
    conta.A + conta.C + conta.D === 16,
    ["A", "B", "C", "D", "E", "F"].map(function (k) { return k + " " + n27(k); }).join(" · ") + " · lidos A " + conta.A + " C " + conta.C + " D " + conta.D);
})();

/* ── T16 · sessão: o que o encerramento, o autoteste e os dois estados leem (nenhum campo novo) ── */
(function () {
  var um = function (lista, id) { return lista.filter(function (x) { return x.id === id; })[0]; };
  var ativo = function (id) { return um(M.ativos, id); };
  var modelo = function (serial) { var m = M.modulos.filter(function (x) { return x.serial === serial; })[0]; return m && um(M.modelos, m.modeloId); };
  var E = M.autotesteEncerramento;
  /* as sete, nesta ordem, com os valores fixos · o reset de leitura é a condicional, e o evento do cartão não bloqueia */
  chk("T16 as 7 assertivas na ordem da 02 e da 05, com os valores fixos (confere · fechado · restaurado · pendente)",
    E.map(function (a) { return a.rotulo; }).join(" · ") === "Configuração · Contadores · Reset de leitura · ID no cadastro · Canal de programação · Repouso do módulo · Evento do cartão" &&
    E.filter(function (a) { return a.valor; }).map(function (a) { return a.valor; }).join(" · ") === "confere · fechado · restaurado · pendente");
  chk("T16 só o evento do cartão não bloqueia, e só o reset de leitura é condicional",
    E.filter(function (a) { return a.bloqueia === false; }).map(function (a) { return a.id; }).join(",") === "cartao" &&
    E.filter(function (a) { return a.condicional; }).map(function (a) { return a.id; }).join(",") === "reset");
  var heroi = ativo("a-01");
  /* a mesma regra, agora sobre a frota inteira da empresa (decisão 56): os módulos com driver que não reiniciam por
     comando são os VL08 (o VC07 do OHL-6V07 não tem driver, e a sessão nunca abre nele) */
  var corte = M.ativos.filter(function (a) { return a.moduloSerial && modelo(a.moduloSerial).driverV1 && modelo(a.moduloSerial).reinicioPorComando === false; });
  chk("T16 T16·1: o herói (VL06) reinicia por comando, e na Viação o KNB-5H39 × M2C-0371 e o ONK-8Q90 × M2C-0438, os dois VL08, pedem o corte — a 01, no primeiro",
    modelo(heroi.moduloSerial).reinicioPorComando === true &&
    corte.map(function (a) { return a.placa + " × " + a.moduloSerial; }).join(",") === "KNB-5H39 × M2C-0371,ONK-8Q90 × M2C-0438" &&
    corte.every(function (a) { return modelo(a.moduloSerial).id === "vl08"; }),
    corte.map(function (a) { return a.placa + " × " + a.moduloSerial; }).join(","));
  var painel = M.calibracao.painel[heroi.id];
  chk("T16 os contadores da 02 são os do painel do herói (482.317 km · 9.640 h), nas unidades da calibração",
    painel.hodometro === 482317 && painel.horimetro === 9640 && um(M.calibracao.grandezas, "hodometro").unidade === "km" && um(M.calibracao.grandezas, "horimetro").unidade === "h");
  chk("T16 'Identificadores 3 de 3': os índices alocados são os cartões do pacote",
    M.identificadores.indicesAlocados.length === 3 && M.identificadores.cartoes.length === 3);
  chk("T16 T16·2: o herói tem 4 regiões (a assertiva de cercas se aplica pelo dado; o texto fica pendente) e o a-14 da 05, nenhuma",
    M.cercas.regioes.filter(function (r) { return r.ativoId === heroi.id; }).length === 4 && M.cercas.regioes.filter(function (r) { return r.ativoId === "a-14"; }).length === 0);
  var af = M.casos["autoteste-falhando"], ne = af.noEncerramento;
  /* três contadores, nunca '7 de 8' — com a falha, 4 aprovadas · 1 não se aplica · 1 pendente */
  chk("T16 a 05: a assertiva que falha no encerramento é uma das 7 e bloqueia, com o lido do caso ('Contadores · 0 km'), e sobram 4 aprovadas",
    !!um(E, ne.assertiva) && um(E, ne.assertiva).bloqueia !== false && ne.lido === "0 km" &&
    E.filter(function (a) { return a.id !== ne.assertiva && !a.condicional && a.bloqueia !== false; }).length === 4 && !!ativo(af.ativoId).moduloSerial,
    um(E, ne.assertiva) && um(E, ne.assertiva).rotulo + " · " + ne.lido);
  var si = M.casos["sessao-interrompida"], Cd = M.cadeia;
  chk("T16 a 06: o par é o do cadastro (QAH-1M67 × M2C-0411), de hoje, e o bloco depois dos 3 confirmados é o do ponto de retomada (Leitor, 'Bloco 4 de 6')",
    ativo(si.ativoId).moduloSerial === si.moduloSerial && ativo(si.ativoId).placa === "QAH-1M67" && si.diasAtras === 0 &&
    Cd.ordem[si.confirmados - 1] === si.ultimoConfirmado && si.pontoRetomada === "Bloco " + (si.confirmados + 1) + " de " + Cd.ordem.length + " — " + Cd.rotulos[Cd.ordem[si.confirmados]],
    si.pontoRetomada);
  /* a T16/06 diz o que já foi gravado pelos confirmados, sem versão composta (o mock não tem versaoGravada) */
  chk("T16 a 06: o que já foi gravado sai dos confirmados do caso — a limpeza, o ativo e as cercas, que a tela diz 'o ativo e as cercas'",
    si.confirmados === 3 && Cd.ordem.slice(0, si.confirmados).join(",") === "limpeza,ativo,cercas" && !("versaoGravada" in si), Cd.ordem.slice(0, si.confirmados).join(", "));
})();

/* ── design · T02: a busca da lista longa saiu (sem desenho nesta versão, decisão 56) ── */
chk("design · T02 o caso lista-longa-garagens saiu, e nenhum pacote, ativo ou caso fala de unidade", !M.casos["lista-longa-garagens"] &&
  JSON.stringify(M).indexOf('"uoId"') < 0 && JSON.stringify(M).indexOf('"ucId"') < 0 && JSON.stringify(M).indexOf('"unidades"') < 0 && JSON.stringify(M).indexOf('"garagens"') < 0);

/* ── design · o contexto é a empresa (T02/00 e 01, T04/07 a 09 · decisão 56) ── */
var emps = M.empresas || [];
chk("design · T02 as empresas do herói: 3 empresas, cada uma com nome e o pacote dela, sem id repetido",
  emps.length === 3 &&
  emps.every(function (e, ix) { return !!e.id && !!e.nome && !!e.pacoteId && emps.findIndex(function (x) { return x.id === e.id; }) === ix; }),
  emps.map(function (e) { return e.nome + " · " + e.pacoteId; }).join(" / "));
var empHeroi = emps.filter(function (e) { return e.id === M.empresa.id; });
chk("design · T02 as empresas do herói: a dele está entre elas, com o mesmo nome, e é a do contexto do mock",
  empHeroi.length === 1 && empHeroi[0].nome === M.empresa.nome && M.contextoAtivo.empresaId === M.empresa.id,
  empHeroi.length ? empHeroi[0].nome : "sem a empresa do herói");
/* as outras duas: espelho da Viação depois da T03 — sem frota própria no mock, cada uma só com o pacote dela */
var outras = emps.filter(function (e) { return e.id !== M.empresa.id; });
chk("design · T02 as empresas espelho: cada uma só com o nome e o pacote dela (34 e 18 ativos), sem garagens nem unidades",
  outras.length === 2 && outras.every(function (e) { return Object.keys(e).sort().join(",") === "id,nome,pacoteId"; }) &&
  outras.map(function (e) { return M.pacotes.filter(function (p) { return p.id === e.pacoteId; })[0].contem.ativos; }).join("·") === "34·18",
  outras.map(function (e) { return e.nome; }).join(" / "));
var ue = M.casos["uma-empresa"] || null;
var ueEmpresas = ue && ue.empresas ? ue.empresas : [];
chk("design · T02 uma empresa só: o caso uma-empresa traz uma empresa, a do herói, com o mesmo nome e o mesmo pacote, sem unidades",
  ueEmpresas.length === 1 && ueEmpresas[0].id === M.empresa.id && ueEmpresas[0].nome === M.empresa.nome && ueEmpresas[0].pacoteId === empHeroi[0].pacoteId &&
  !("unidades" in ueEmpresas[0]),
  ueEmpresas.map(function (e) { return e.nome + " · " + e.pacoteId; }).join(" / "));
/* o fora do pacote (T06/04): um ônibus de outra empresa, que só o caso traz */
var fp = M.casos["ativo-fora-pacote"];
chk("design · T06 o fora do pacote: o PHS-2C47, frota 3008, ma-01, da Expresso Caruaruense, fora dos 24 da Viação, contra o pacote da Viação",
  !!fp && !!fp.ativo && fp.ativo.placa === "PHS-2C47" && fp.ativo.frota === "3008" && fp.ativo.modeloAtivoId === "ma-01" &&
  fp.ativo.empresaId === "emp-03" && fp.pacoteId === pacoteDaViacao.id && !M.ativos.some(function (a) { return a.placa === fp.ativo.placa || a.id === fp.ativo.id; }),
  fp && fp.ativo && fp.ativo.placa + " · " + (emps.filter(function (e) { return e.id === fp.ativo.empresaId; })[0] || {}).nome);
chk("design · T02 não há caso varias-empresas (as três empresas são do mundo do herói)", !M.casos["varias-empresas"]);

/* ── Higiene ── */
var fonte = null;
try { fonte = require("fs").readFileSync(require("path").join(__dirname, "mocks.js"), "utf8"); } catch (e) {}
if (fonte !== null) {
  /* comentário não conta — o header do mocks CITA as leis pelo nome */
  var semComentario = fonte.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  chk("zero Math.random / Date.now / new Date no mocks.js (fora de comentário)",
    semComentario.indexOf("Math.random") < 0 && semComentario.indexOf("Date.now") < 0 && semComentario.indexOf("new Date") < 0);
  chk("zero hex no mocks.js (fora de comentário)", !/#[0-9a-fA-F]{3,8}\b/.test(semComentario));
}

/* ── decisões 44 a 47 ── */
chk("fabricante e modelo nos 3 modelos de ativo", M.modelosAtivo.every(function (m) { return !!m.fabricante && !!m.modelo; }));
chk("nenhum modelo declara mais chassiPelaCan", M.modelosAtivo.every(function (m) { return !("chassiPelaCan" in m); }));
var todosPacotes = (function () { var out = []; (function anda(o) { if (!o || typeof o !== "object") return; if (o.contem && o.empresaId) out.push(o); for (var k in o) anda(o[k]); })(M); return out; })();
chk("nenhum pacote leva cartões — conferido em cada contem, não no texto", todosPacotes.length >= 3 && todosPacotes.every(function (p) { return !("cartoes" in p.contem); }));
chk("conexões e eventos de cada pacote recomputados das coleções", todosPacotes.every(function (p) { return p.contem.conexoes === M.conexoes.length && p.contem.eventos === M.eventosEmbarcados.length; }));
chk("as cercas de cada pacote são as regiões dos ativos da Viação (8) — as empresas espelho trazem as mesmas", todosPacotes.every(function (p) { return p.contem.cercas === M.cercas.regioes.filter(function (r) { return M.ativos.some(function (x) { return x.id === r.ativoId; }); }).length; }) && pacoteDaViacao.contem.cercas === 8);
chk("a limpeza nunca apaga os identificadores", JSON.stringify(M).indexOf('"apaga":["cercas","identificadores"') < 0);
chk("o M2C-0999 tem o que informa na busca, e continua fora do cadastro", !!M.naBuscaForaCadastro["M2C-0999"] && M.seriaisForaCadastro.indexOf("M2C-0999") >= 0 && !M.modulos.some(function (m) { return m.serial === "M2C-0999"; }));
chk("o pacote sem cartões, 49 itens nos 5 grupos na Viação", M.pacotes.every(function (p) { return !("cartoes" in p.contem); }) &&
  (function (c) { return c.ativos + c.conexoes + c.modelosAtivo + c.eventos + c.cercas === 49; })(pacoteDaViacao.contem));
chk("o diagnóstico tem 9 linhas — 8 que contam, com o número do chip, e as mensagens, que só informam — e as 3 travas existem como casos", M.diagnostico.modulo.length === 9 && M.diagnostico.modulo.filter(function (l) { return !l.soInforma; }).length === 8 &&
  ["serial-nao-cadastrado", "modelo-sem-driver", "firmware-fora-matriz"].every(function (k) { return !!M.casos[k]; }));
chk("o modo sai do vínculo — a manutenção é um caso, a instalação é o padrão", M.casos["modulo-ja-deste-ativo"].modo === "manutencao");

/* ── decisões 52 a 54 ── */
chk("o checklist tem 30 itens no mock — a A com 4, a D com 10 (as pendências só com o ID reescrito), a E com 5 (o bip só com buzzer), a F com 2", (function (I) { var n = function (s) { return I.filter(function (x) { return x.secao === s; }).length; }; return I.length === 30 && n("A") === 4 && n("D") === 10 && n("E") === 5 && n("F") === 2; })(M.checklist.itens));
/* a Montagem do herói (T13/02): o ônibus não calibra, o Painel não entra, e o ma-01 tem leitor */
chk("a Montagem do herói tem 4 fotos: Módulo, Lado de cima, Chicote e Leitor (o Painel só com calibração)", M.calibracao.porModelo["ma-01"].calibraveis.length === 0 && !!M.modelosAtivo.filter(function (m) { return m.id === "ma-01"; })[0].leitor &&
  M.checklist.itens.filter(function (x) { return x.secao === "B" && x.condicao !== "calibracao"; }).map(function (x) { return x.rotulo; }).join(" · ") === "Módulo · Lado de cima · Chicote · Leitor",
  M.checklist.itens.filter(function (x) { return x.secao === "B"; }).map(function (x) { return x.rotulo; }).join(" · "));
chk("o Painel é foto a tirar, só quando houve calibração", M.checklist.itens.filter(function (x) { return x.id === "b-painel-legivel" && x.foto && x.condicao === "calibracao" && !x.herda; }).length === 1);
chk("os critérios do servidor sem viagem", JSON.stringify(M.criteriosRegra).indexOf("viage") < 0);
chk("o horímetro é opcional onde existe", M.modelosAtivo.every(function (m) { var c = M.calibracao.porModelo[m.id]; return !c || c.calibraveis.indexOf("horimetro") < 0 || (c.opcionais || []).indexOf("horimetro") >= 0; }));
chk("os casos novos existem, e os que saíram saíram", !!M.casos["cercas-reenviadas"] && !!M.casos["motor-desligado-no-ciclo"] && !M.casos["versao-ilegivel"] && !M.casos["camera-sem-permissao"]);
chk("a fila sem foto de calibração", JSON.stringify(M.filaSaida || []).indexOf("Foto de calibração") < 0);

chk("o can-estatico-bateria monta a T13/09, sem chassiPelaCan nem CADEIA.versoes", !!M.casos["can-estatico-bateria"] && M.modelosAtivo.every(function (m) { return !("chassiPelaCan" in m); }) && !M.cadeia.versoes);

/* ── as regiões, o Extended ID e a Seção E ── */
function regioesDo(id) { return M.cercas.regioes.filter(function (r) { return r.ativoId === id || (r.tambemAtivos || []).indexOf(id) >= 0; }).length; }
chk("as regiões de cada ativo das telas — o herói e o PCX-9A17 com 4, o QAH-1M67 com 4, o OCT-2J85 sem nenhuma", regioesDo("a-01") === 4 && regioesDo("a-03") === 4 && regioesDo("a-13") === 4 && regioesDo("a-10") === 0);
chk("o herói declara o Extended ID do módulo, só leitura", M.modulos.filter(function (m) { return m.serial === "M2C-0417" && m.extendedId && m.extendedId.cartoes === 3 && m.extendedId.ibuttons === 1; }).length === 1);
chk("sem as sobras da calibração e da viagem", JSON.stringify(M).indexOf('"itemChecklist"') < 0 && JSON.stringify(M).indexOf('"viagens"') < 0 && !("foto" in heroi.etapas.calibracao));
chk("a Seção E se chama Ciclo de testes", M.checklist.secoes.filter(function (x) { return x.id === "E" && x.rotulo === "Ciclo de testes"; }).length === 1);

/* ── os casos das pendências desenhadas (padrão até a decisão de produto) ── */
(function () {
  var C = M.casos, heroiSerial = M.ativos.filter(function (a) { return a.id === "a-01"; })[0].moduloSerial;
  /* o critério é a antena, e os satélites são informação */
  chk("o gps-fraco é o módulo do herói, sem posição, com 0 satélites e a antena conectada (T13/21, 22), e relê sem posição · 0 e com posição · 9 (T13/35, 31)",
    C["gps-fraco"].moduloSerial === heroiSerial && C["gps-fraco"].posicao === "sem posição" && C["gps-fraco"].satelites === 0 && C["gps-fraco"].antena === "conectada" &&
    C["gps-fraco"].releituras.map(function (r) { return r.posicao + " · " + r.satelites; }).join(" | ") === "sem posição · 0 | com posição · 9");
  chk("a entrada-ignicao é o módulo do herói, e o lido difere do esperado (T13/23, 24)",
    C["entrada-ignicao"].moduloSerial === heroiSerial && C["entrada-ignicao"].entradas.ignicao !== C["entrada-ignicao"].entradas.esperado);
  chk("o evento-nao-chega-de-novo é o par do evento-sem-resposta, com as duas tentativas estourando (T14/09)",
    C["evento-nao-chega-de-novo"].ativoId === C["evento-sem-resposta"].ativoId && C["evento-nao-chega-de-novo"].moduloSerial === C["evento-sem-resposta"].moduloSerial && C["evento-nao-chega-de-novo"].tentativasQueEstouram === 2);
  chk("a fila-parada passa dos 30 min das pendências, e tem envios esperando (T04/16)",
    parseInt(C["fila-parada"].fila.paradaHa, 10) > 30 && C["fila-parada"].fila.esperando > 0);
})();

/* ── o que cada caso da Seção C devolve a cada Reler o módulo: a 1ª ainda reprova, a 2ª passa ── */
(function () {
  var C = M.casos, num = function (t) { return Number(String(t).split(" ")[0].replace(",", ".")); };
  /* a alimentação é a do fio do equipamento, contra a faixa do modelo do módulo (VL06: 9,0 a 40,0 V) · o GPS, pela posição */
  var mod = M.modulos.filter(function (m) { return m.serial === C["can-estatico-bateria"].moduloSerial; })[0];
  var ft = M.modelos.filter(function (m) { return m.id === mod.modeloId; })[0].faixaTensao, bat = { min: ft[0], max: ft[1] };
  var naRede = M.diagnostico.modulo.filter(function (l) { return l.id === "modem"; })[0].heroi;
  var passa = {
    "can-estatico-bateria": function (r) { return num(r.alimentacao) >= bat.min && num(r.alimentacao) <= bat.max; },
    "gps-fraco": function (r) { return r.posicao === "com posição"; },
    "entrada-ignicao": function (r) { return r.entradas.ignicao === r.entradas.esperado; },
    "modem-sem-sinal": function (r) { return r.modem === naRede; }
  };
  chk("os quatro casos (a alimentação contra a faixa do VL06, o GPS pela posição) da C têm duas releituras, a 1ª ainda reprova e a 2ª passa (T13/34 a 37, 30 a 33)",
    Object.keys(passa).every(function (k) { var l = C[k].releituras; return l && l.length === 2 && !passa[k](l[0]) && passa[k](l[1]); }));
})();

/* ── as fichas batendo com as referências: pra cada tela, cada referência tem a linha
   dela no estados.md, e a ficha (tela.md) conta os momentos e os estados que as referências têm ── */
(function () {
  var fs = require("fs"), path = require("path");
  var raiz = path.join(__dirname, "..", "02-telas");
  var telas = fs.readdirSync(raiz).filter(function (d) { return /^T\d\d-/.test(d); }).sort();
  var refs = 0, semLinha = [], contagem = [];
  telas.forEach(function (d) {
    var pngs = fs.readdirSync(path.join(raiz, d, "referencias", "png")).filter(function (f) { return /\.png$/.test(f); });
    refs += pngs.length;
    var est = fs.readFileSync(path.join(raiz, d, "estados.md"), "utf8");
    pngs.forEach(function (f) { var n = f.slice(0, -4); if (n !== "00-tela" && est.indexOf("`" + n + "`") < 0) semLinha.push(d.slice(0, 3) + "/" + n); });
    var m = pngs.filter(function (f) { return f.indexOf("-momento-") >= 0; }).length;
    var e = pngs.filter(function (f) { return f.indexOf("-estado-") >= 0; }).length;
    var ficha = /\*\*Momentos · estados\*\* \| (\d+) · (\d+)/.exec(fs.readFileSync(path.join(raiz, d, "tela.md"), "utf8"));
    if (!ficha || +ficha[1] !== m || +ficha[2] !== e) contagem.push(d.slice(0, 3) + ": ficha " + (ficha ? ficha[1] + " · " + ficha[2] : "sem a linha") + ", referências " + m + " · " + e);
  });
  chk("fichas · o censo: 15 telas e 230 referências", telas.length === 15 && refs === 230, telas.length + " telas · " + refs + " referências");
  // o jogo de ícones, um SVG por ícone, com a cor por currentColor (o token na hora de usar) · 48 desenhos, com as três setas das linhas e os quatro das folhas
  var pastaIcones = path.join(__dirname, "..", "03-design-system", "icones");
  var icones = fs.readdirSync(pastaIcones).filter(function (f) { return /\.svg$/.test(f); });
  var semCorDoToken = icones.filter(function (f) { return fs.readFileSync(path.join(pastaIcones, f), "utf8").indexOf('stroke="currentColor"') < 0; });
  chk("fichas · o jogo de ícones: 48 desenhos, cada um com o traço em currentColor", icones.length === 48 && semCorDoToken.length === 0, icones.length + " ícones" + (semCorDoToken.length ? " · sem currentColor: " + semCorDoToken.join(", ") : ""));
  chk("fichas · cada referência tem a linha dela no estados.md da tela", semLinha.length === 0, semLinha.join(", ") || "todas");
  chk("fichas · a ficha de cada tela conta os momentos e os estados que as referências têm", contagem.length === 0, contagem.join(" / ") || "as 15 batem");
})();

/* ── os desfechos (decisão 64): cada caso novo nasce de um caso que existe, ou de um par do cadastro ── */
(function () {
  var C = M.casos, um = function (l, id) { return l.filter(function (x) { return x.id === id; })[0]; };
  var base = function (k) { return C[k] && C[k].base && C[C[k].base]; };
  chk("desfechos · os casos com base apontam um caso que existe: o pareamento (T05/20), a atualização (T07/14), a recusa (T09/31) e a queda (T09/35)",
    !!base("pareamento-nao-confirmado") && C["pareamento-nao-confirmado"].confirmou === false &&
    !!base("atualizacao-nao-terminou") && C["atualizacao-nao-terminou"].parouEmPct === C["firmware-fora-matriz"].atualizacao.quadroPct &&
    !!base("bloco-recusado-de-novo") && C["bloco-recusado-de-novo"].recusas === 2 &&
    !!base("modulo-nao-voltou") && C["modulo-nao-voltou"].voltou === false);
  var r = C["reinicio-sem-volta"], a = r && um(M.ativos, r.ativoId);
  chk("desfechos · o reinício sem volta (T16/10) é o par do herói, cujo módulo reinicia por comando",
    !!a && a.moduloSerial === r.moduloSerial && r.moduloSerial === "M2C-0417" &&
    M.modelos.filter(function (m) { return m.id === "vl06"; })[0].reinicioPorComando === true);
  var pf = C["pronto-para-fechar"], m09 = pf && M.modulos.filter(function (m) { return m.serial === pf.moduloSerial; })[0];
  chk("desfechos · o corte (T16/09) é o VL08 do caminhão, que não reinicia por comando (M2C-0371)",
    !!m09 && m09.modeloId === "vl08" && M.modelos.filter(function (m) { return m.id === "vl08"; })[0].reinicioPorComando === false);
  chk("desfechos · nenhum VL06 guarda mais que 127 contadores nem mais que 6.143 pontos de cerca (T09/06 e 07)",
    M.matrizCapacidades.filter(function (x) { return x.modeloId === "vl06"; }).every(function (x) { return x.capacidadeRegistros === 127 && x.pontosCercaMax === 6143; }));
})();

console.log(falhas ? "\nCOBERTURA REPROVADA — " + falhas + " falha(s)" : "\nCOBERTURA APROVADA — todas as âncoras recomputadas conferem");
if (typeof process !== "undefined") process.exitCode = falhas ? 1 : 0;
