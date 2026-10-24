// T07 · o movimento do diagnóstico do módulo (02-telas/T07-diagnostico-do-modulo/animacao.md;
// movimento.md · a faixa que nasce; o processo que espera a troca; a linha que
// conclui; o texto do primário que troca):
//   · a chegada da T05 (o Conectar): a troca entre telas, e as nove linhas do módulo acendem uma a
//     cada 600 ms (RITMOS.diagnosticoLinhaMs), depois dos 150 da troca. A linha que lê tem o quadrado
//     de agora e *lendo*; a que chega troca o glifo e o valor esmaecendo no lugar, em 150; o contador
//     troca no lugar. Sem a faixa, o módulo fica em cima do título;
//   · as nove passam sem trava: a faixa desce de cima em 200, e o miolo acompanha só por
//     deslocamento; o rótulo de cima sai, e o primário diz Selecionar ativo, o texto esmaecendo no
//     lugar, com o roxo direto;
//   · a trava (o M2C-0999, fora do cadastro): a faixa não desce; o topo diz só o serial, e o aviso
//     (SERIAL FORA DO CADASTRO) esmaece no lugar quando a nona fecha; o Procurar outro
//     módulo volta à T05/01, a lista sem nada escolhido;
//   · a atualização do firmware (o 06 pela URL): os 62% parados por 1 s (RITMOS.firmwareAtualizacaoMs,
//     o ritmo dela), e o diagnóstico recomeça das nove, com o firmware disponível (8.04) — passando, a faixa desce;
//   · a CAN lida (a 01): ao vivo, só a rotação e a temperatura trocam o número no lugar, sem transição;
//     o hodômetro, o horímetro, o combustível e o consumo total ficam parados (14 de 14);
//   · o Ler de novo (01 → 10 → 01): a CAN relê uma linha a cada 600 ms, no lugar, sem troca de quadro
//     (movimento.md: o Ler de novo move só a peça); relendo, o ENCERRAR fica apagado (a lei 17);
//   · o voltar do Android: lendo, atualizando e relendo, nada; na trava, o Procurar outro módulo; sem
//     trava e com a CAN lida, o Voltar ao menu.
// A tela abre parada pela URL, em cada estado e no print. Com reduzir, o mesmo ritmo, e nada anda.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em, extra = {}) => ({ prop: 'opacity', ms: 150, em, curva: C, ...extra })
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const GLIFO = esmaece('ds-glifo')
const VALOR = esmaece('ds-checagem-valor')
const CAUSA = esmaece('ds-checagem-causa')
const TEXTO = esmaece('ds-primario-texto')   // o texto do primário que troca no lugar
const DESCE = { prop: 'transform', ms: 200, curva: C, em: 'ds-faixa ds-faixa-aberta' }
const MIOLO = { prop: 'transform', ms: 200, curva: C, em: 'tela-miolo' }
// a barra do sistema é do Android (decisão 43): não se move
const BARRA = [{ prop: 'opacity', em: 'ds-barra-sistema' }, { prop: 'transform', em: 'ds-barra-sistema' }]
// o ritmo: 600 por linha, medido a partir do passo de antes (a régua leva uns 20 a 60 ms em cada passo)
const LINHA = [450, 800]
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
const M01 = '01-momento-can-lida'
const M06 = '06-momento-atualizando-o-firmware'
const M10 = '10-momento-relendo-a-can'
const M11 = '11-momento-lendo'
const LISTA_T05 = '01-momento-nenhum-escolhido'
const ESTADOS = ['02-estado-serial-nao-cadastrado', '03-estado-modelo-sem-suporte', '04-estado-firmware-fora-da-lista',
  '05-estado-firmware-sem-rede-no-modulo', '07-estado-modem-sem-sinal', '12-estado-alimentacao-abaixo-da-faixa', '08-estado-sinal-da-can-sem-leitura', '09-estado-sinal-da-can-fora-do-esperado']
// da lista da T05 (a busca, sem nada escolhido) até o Conectar: a troca entre telas leva à T07
const CONECTA = (serial) => [
  { abre: `?tela=T05&momento=${LISTA_T05}` },
  { quieto: true },
  { marca: serial },
  { dorme: 250 },
  { toca: `Conectar ao ${serial}`, naoAnima: BARRA },   // o Conectando… (só o texto do botão)
  { chega: 'T07', momento: null },
]

export default [
  // ── abre parada: pela URL, a 01 e cada estado ──
  { abre: '?tela=T07' },
  ...PARADA,
  { ve: '8 de 8' },
  { ve: 'ENCERRAR' },
  { abre: `?tela=T07&momento=${M01}` },
  ...PARADA,
  { ve: '14 de 14' },
  // a CAN ao vivo: a rotação e a temperatura trocam o número no lugar, uma leitura por segundo, sem
  // transição (o dado chegando, não animação); os outros quatro ficam parados
  { ve: '992 rpm', ms: 2500 },
  { ve: '32 °C', ms: 2500 },
  { ve: '482.317 km' },
  { ve: '9.640 h' },
  { ve: '62%' },
  { ve: '83.780 L' },
  { quieto: true },
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T07&estado=${e}` }, ...PARADA]),
  // no print, cada quadro de referência: nada se move, nem os dois processos (06, 10)
  ...['', `&momento=${M01}`, `&momento=${M06}`, `&momento=${M10}`, `&momento=${M11}`, ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T07${q}&print=1` }, ...PARADA]),
  { ve: '13 de 14' },
  { ve: '135 °C' },

  // ── a chegada da T05, o herói: as sete no ritmo, e a faixa desce ──
  ...CONECTA('M2C-0417'),
  // o quadro de começo: sem a faixa, nada em cima do título (a 11), a primeira lendo, o rodapé sem saída
  { naoVe: 'M2C-0417 · RKT-8H42' },
  { naoVe: 'ENCERRAR' },
  { ve: '0 de 8' },
  { desligado: 'Lendo · não saia da tela' },
  // a primeira: os 150 da troca + 600, contados do toque (as quatro conferências de cima levam uns 300)
  { ve: '1 de 8', entre: [200, 1000] },
  { anima: [GLIFO, VALOR] },
  { ve: 'VL06 CAN-BT' },
  { ve: '2 de 8', entre: LINHA },
  { anima: [GLIFO, VALOR] },
  { ve: '8.04' },
  { ve: '3 de 8', entre: LINHA },
  { ve: '4 de 8', entre: LINHA },
  { ve: '5 de 8', entre: LINHA },
  { ve: '6 de 8', entre: LINHA },
  { ve: '7 de 8', entre: LINHA },
  // a oitava, o número do chip: a contagem fecha em 8
  { ve: '8 de 8', entre: LINHA },
  { ve: '8955 0312 4567 8901' },
  { naoVe: 'ENCERRAR' },
  // a nona, as mensagens, só informam e não contam: com ela, a faixa desce, o miolo acompanha, a barra
  // fica; o primário diz Selecionar ativo
  { ve: 'ENCERRAR', entre: LINHA },
  { anima: [DESCE, MIOLO, GLIFO, TEXTO], naoAnima: BARRA },
  { ve: '8 de 8' },
  { ve: '0 mensagens ainda não enviadas' },
  { ve: 'sem ativo' },
  { naoVe: 'M2C-0417 · RKT-8H42' },   // o rótulo de cima sai: o serial está na faixa
  { dorme: 400 },
  { quieto: true },
  { dorme: 700 },
  { quieto: true },   // acabou: nada mais chega
  { toca: 'Selecionar ativo', anima: TROCA, naoAnima: [{ prop: 'transform', em: 'ds-faixa' }, ...BARRA] },
  { chega: 'T06' },
  { dorme: 300 },

  // ── a trava (o M2C-0999, fora do cadastro): a faixa não desce, e o voltar é o Procurar outro módulo ──
  ...CONECTA('M2C-0999'),
  // o topo só identifica o módulo, e a trava fica com o aviso, que só vem no fim
  { ve: 'M2C-0999' },
  { naoVe: 'M2C-0999 · ' },
  { naoVe: 'SERIAL FORA DO CADASTRO' },
  // lendo, o voltar não faz nada
  { tecla: 'Escape' },
  { fica: 'T07', ms: 300 },
  { ve: 'não está no cadastro', ms: 2000 },
  { naoVe: 'SERIAL FORA DO CADASTRO' },
  // fechada a leitura na trava: o aviso abre a tela com o porquê, esmaecendo no lugar (Aviso · surge, 150)
  // a nona fecha na trava (as mensagens são a última, e não contam): o aviso abre a tela
  { ve: 'SERIAL FORA DO CADASTRO', ms: 8000 },
  { anima: [esmaece('ds-aviso ds-caixa-poco ds-caixa-falha')] },
  { ve: '5 de 8' },   // o número do chip também passa
  { ve: 'Peça ao gestor pra cadastrar o M2C-0999.' },
  { dorme: 400 },
  { quieto: true },
  { naoVe: 'ENCERRAR' },
  { naoToca: 'Selecionar ativo' },
  { tecla: 'Escape' },
  { chega: 'T05', momento: LISTA_T05 },
  { desligado: 'Conectar' },   // a lista volta sem nada escolhido
  // de novo, pelo Procurar outro módulo, o primário da trava
  { marca: 'M2C-0999' },
  { dorme: 250 },
  { toca: 'Conectar ao M2C-0999' },
  { chega: 'T07', momento: null },
  { toca: 'Procurar outro módulo', ms: 8000, anima: TROCA },
  { chega: 'T05', momento: LISTA_T05 },
  { naoVe: 'ENCERRAR' },

  // ── o firmware que atualiza (o 06 pela URL): 1 s nos 62%, e o diagnóstico recomeça das nove ──
  { abre: `?tela=T07&momento=${M06}` },
  { quieto: true },
  { ve: 'atualizando · 62%' },
  { ve: 'M2C-0451 · QTM-5S79' },
  { desligado: 'Atualizando · não desligue o módulo' },
  { tecla: 'Escape' },
  { fica: 'T07', ms: 300 },
  { chega: 'T07', momento: null, entre: [300, 1200] },
  { ve: '0 de 8' },
  { ve: '1 de 8', entre: LINHA },
  { ve: '2 de 8', entre: LINHA },
  { ve: '8.04' },   // o firmware disponível, depois da atualização (o caso consumido)
  { naoVe: 'na lista: 8.03 e 8.04' },
  { ve: 'ENCERRAR', ms: 5000 },
  { anima: [DESCE, MIOLO], naoAnima: BARRA },
  { ve: '8 de 8' },
  { ve: 'M2C-0451' },
  { dorme: 400 },
  { quieto: true },

  // ── o Ler de novo: a CAN relê no lugar, e volta lida ──
  { abre: `?tela=T07&momento=${M01}` },
  { quieto: true },
  { ve: 'RKT-8H42' },
  { toca: 'Ler de novo', anima: [TEXTO], naoAnima: [esmaece('tela-miolo'), { prop: 'transform', em: 'ds-faixa' }] },
  { chega: 'T07', momento: M10 },
  { desligado: 'Lendo · não saia da tela' },
  { desligado: 'ENCERRAR' },
  { ve: '8 de 14' },
  { ve: '9 de 14', entre: LINHA },
  { tecla: 'Escape' },
  { fica: 'T07', ms: 300 },
  { ve: '10 de 14', ms: 2000 },
  { chega: 'T07', momento: M01, ms: 6000 },
  { ve: '14 de 14' },
  { dorme: 400 },
  { quieto: true },
  // lida: o voltar é o Voltar ao menu
  { tecla: 'Escape' },
  { chega: 'T04' },
  // o 10 pela URL: abre no quadro dele (a temperatura lendo, 11 de 14), e segue dali
  { abre: `?tela=T07&momento=${M10}` },
  { quieto: true },
  { ve: '11 de 14' },
  { ve: '12 de 14', entre: [300, 900] },
  { chega: 'T07', momento: M01, ms: 4000 },
  { ve: '14 de 14' },

  // ── pelo menu, o diagnóstico feito fica: nasce parado ──
  { abre: '?tela=T07' },
  { quieto: true },
  { toca: 'Voltar ao menu', anima: [TROCA[0]] },
  { chega: 'T04' },
  { toca: 'Entendi' },   // o aviso do acesso, na primeira chegada ao menu (T04/12)
  { dorme: 250 },
  { toca: 'Diagnóstico do módulo', anima: TROCA },
  { chega: 'T07', momento: null },
  { dorme: 250 },
  { quieto: true },
  { ve: '8 de 8' },
  { ve: 'ENCERRAR' },
  { dorme: 700 },
  { quieto: true },

  // com o ativo na sessão e antes da cadeia (a semente do menu): a placa na faixa, e só o Voltar ao menu
  { abre: '?tela=T04' },
  { toca: 'Entendi' },
  { dorme: 250 },
  { toca: 'Diagnóstico do módulo', anima: TROCA },
  { chega: 'T07', momento: null },
  { dorme: 250 },
  { quieto: true },
  { ve: 'RKT-8H42' },
  { naoVe: 'A CAN' },   // antes do bloco do ativo, a CAN não aparece: nenhuma caixa espera por ela (decisão 61)
  { naoToca: 'Selecionar ativo' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  // depois da cadeia, o caminho segue sem o menu (decisão 64): o Ler a CAN da cadeia concluída leva à
  // CAN lida, e a CAN lida, à calibração · o Voltar ao menu fica no voltar do Android
  { abre: '?tela=T09&momento=04-momento-cadeia-concluida' },
  { dorme: 400 },
  { naoToca: 'Voltar ao menu' },
  { toca: 'Ler a CAN', anima: TROCA },
  { chega: 'T07', momento: M01 },
  // a lista se ajusta ao abrir, e o indicador de rolagem pode aparecer: fica os 900 da --rolagem-espera e
  // some em 300, como em toda rolagem
  { dorme: 1400 },
  { quieto: true },
  { ve: 'Conferido na conexão' },
  { ve: '14 de 14' },
  { naoToca: 'Voltar ao menu' },
  { toca: 'Calibrar', anima: TROCA },
  { chega: 'T10' },
  // e pelo menu também: o Diagnóstico do módulo, com o bloco do ativo gravado, abre na CAN lida
  { tecla: 'Escape' },
  { chega: 'T04' },
  { toca: 'Entendi' },
  { dorme: 250 },
  { toca: 'Diagnóstico do módulo', anima: TROCA },
  { chega: 'T07', momento: M01 },
  { dorme: 1400 },
  { quieto: true },
  { ve: 'Conferido na conexão' },
  { ve: '14 de 14' },

  // ── com reduzir movimento: o mesmo ritmo, e nada anda ──
  { reduzir: true },
  ...CONECTA('M2C-0417').map((p) => (p.toca ? { toca: p.toca } : p)),
  { quieto: true },
  { ve: '1 de 8', entre: [400, 900] },
  { quieto: true },
  { ve: '4 de 8', ms: 3000 },
  { quieto: true },
  { ve: 'ENCERRAR', ms: 4000 },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna e a volta ao fluxo abrem parados ──
  { abre: '?tela=T07' },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Serial fora do cadastro' },
  { chega: 'T07', estado: '02-estado-serial-nao-cadastrado' },
  ...PARADA,
  { palco: 'Modem sem sinal' },
  { chega: 'T07', estado: '07-estado-modem-sem-sinal' },
  ...PARADA,
  { palco: 'Sinal fora do esperado' },
  { chega: 'T07', estado: '09-estado-sinal-da-can-fora-do-esperado' },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T07', estado: null },
  ...PARADA,
  { ve: '8 de 8' },
]
