// As peças do movimento · as listas (as peças:
// src/ds/linhas/Reorganiza.js, a Lista com `surge` e a LinhaEscolha; a vitrine:
// src/vitrine/especimes/mov-listas.jsx). Cada espécime e cada tela abrem parados — nada
// anima ao abrir —, e só se move o que ajuda o olho a seguir a lista:
// · a lista que se reorganiza, na T06 (a busca da T02 saiu com a lista longa, decisão 56):
//   digitar na busca leva o layout direto pro fim; o ônibus que fica desliza do lugar antigo
//   ao novo por transform, em 150; o que sai esmaece por cima (a cópia muda,
//   ds-reorganiza-sai); o que volta esmaece no lugar; nenhuma altura anima; a instrução sai,
//   e o cartão inteiro sobe no lugar dela;
// · a fila que fecha o espaço (T15, sem porta: o envio não tem ritmo);
// · a cascata da lista que a busca acha (T05/01): 150 cada, 80 entre elas, só quando a
//   busca acha; ao abrir, e no toque que marca, parada;
// · o marcador de escolha, no app, onde ele já mora: as empresas da T02 (a de pacote vencido
//   também), os módulos da T05/01 e os ônibus da T06.
// Com reduzir movimento, nada anima, e a lista vai direto pro fim.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const V = (id) => ({ abre: `?vitrine=1&especime=${id}` })
const desliza = (em) => ({ prop: 'transform', ms: 150, em, curva: C })
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const SAI = 'ds-reorganiza-sai'
const MARCA = [esmaece('ds-quadrado-cheio'), desliza('ds-quadrado-cheio')]   // o lima surge: opacidade e escala, em 150
// o que move o layout não anima nunca (a régua também acusa com ⚠ tudo fora de transform e opacity)
const LAYOUT = ['height', 'top', 'margin-top', 'margin-bottom', 'padding-top', 'max-height'].map((prop) => ({ prop }))
const cascata = [0, 80, 160, 240, 320].map((atraso) => ({ prop: 'opacity', ms: 150, atraso, em: 'ds-linha-modulo', curva: C }))
const BUSCA_T06 = 'Buscar placa, frota ou módulo'

export default [
  // ── a lista que se reorganiza, na T06: a instrução sai, e o cartão sobe no lugar dela ──
  V('mov-listas-onibus'),
  { quieto: true },
  { digita: 'PCX', em: BUSCA_T06 },
  { anima: [desliza('ds-lista'), desliza('ds-linha-onibus'), esmaece(SAI)], naoAnima: LAYOUT },
  { ve: 'PCX-9A17' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'PCX-9A17', anima: MARCA },
  { toca: 'bancada · limpa a busca', anima: [desliza('ds-lista'), desliza('ds-linha-onibus'), esmaece('t06-instrucao'), esmaece('ds-linha-onibus')], naoAnima: LAYOUT },
  { ve: 'Escolha o veículo que está na sua frente.' },
  { dorme: 250 },
  { quieto: true },
  // a placa que não existe: o cartão inteiro sai por cima, e o vazio esmaece no lugar
  { digita: 'ABC-1234', em: BUSCA_T06 },
  { anima: [esmaece(SAI), esmaece('ds-vazio')], naoAnima: LAYOUT },
  { ve: 'Nada com “ABC-1234”' },
  { dorme: 250 },
  { quieto: true },

  // ── a fila que fecha o espaço (T15): a linha sai por cima, e as de baixo sobem ──
  V('mov-listas-fila'),
  { quieto: true },
  { toca: 'bancada · o primeiro da fila sobe', anima: [esmaece(SAI), desliza('ds-linha-fila')], naoAnima: LAYOUT },
  { dorme: 250 },
  { quieto: true },

  // ── a cascata (T05/01): só quando a busca acha ──
  V('mov-listas-cascata'),
  { quieto: true },                                                    // ao abrir, a lista já está lá
  { toca: 'bancada · a busca acha', anima: cascata, naoAnima: LAYOUT },
  { ve: 'M2C-0417' },
  { dorme: 600 },
  { quieto: true },                                                    // a última termina aos 470: nada fica vivo
  // o toque que marca não repete a cascata (o pressionado solta em 100; a cascata é de 150)
  { toca: 'M2C-0417', anima: MARCA, naoAnima: [{ prop: 'opacity', ms: 150, em: 'ds-linha-modulo' }] },
  { dorme: 200 },
  { toca: 'bancada · abre de novo', naoAnima: [{ prop: 'opacity', ms: 150, em: 'ds-linha-modulo' }] },
  { quieto: true },

  // ── o marcador de escolha, no app: as empresas da T02, a de pacote vencido também ──
  { abre: '?tela=T02' },
  { quieto: true },
  { toca: 'Viação Atlântico Sul', anima: MARCA },
  { ve: 'Sincronizar' },
  { dorme: 200 },
  { toca: 'Expresso Caruaruense', anima: [...MARCA, esmaece('ds-quadrado')] },   // o lima surge na de pacote vencido, e o da Viação sai
  { dorme: 200 },
  { toca: 'Transportes Capibaribe', anima: [...MARCA, esmaece('ds-quadrado')] },   // e ela perde a marca: o mesmo ao contrário
  { dorme: 200 },
  { quieto: true },
  // aberta pelo 01, com a Viação marcada, parada; tocar outra, o lima surge
  { abre: '?tela=T02&momento=01-momento-escolhida' },
  { quieto: true },
  { toca: 'Transportes Capibaribe', anima: [...MARCA, esmaece('ds-quadrado')] },
  { dorme: 200 },
  // os módulos da T05/01 e os ônibus da T06
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { quieto: true },
  { toca: 'M2C-0417', anima: MARCA },
  { ve: 'Conectar ao M2C-0417' },
  { abre: '?tela=T06' },
  { quieto: true },
  { toca: 'RKT-8H42', anima: MARCA },

  // ── com reduzir movimento: nada anima, e a lista vai direto pro fim ──
  { reduzir: true },
  { abre: '?tela=T02' },
  { quieto: true },
  { toca: 'Expresso Caruaruense' },
  { quieto: true },
  { ve: 'Sincronizar' },
  V('mov-listas-onibus'),
  { digita: 'PCX', em: BUSCA_T06 },
  { quieto: true },
  V('mov-listas-fila'),
  { toca: 'bancada · o primeiro da fila sobe' },
  { quieto: true },
  V('mov-listas-cascata'),
  { toca: 'bancada · a busca acha' },
  { quieto: true },                                                    // as linhas aparecem juntas
  { ve: 'M2C-0417' },
  { reduzir: false },
]
