// T12 · o que o servidor recebeu (decisões 41 e 54): o detalhe da instalação
// mostra os dois critérios — o posicionamento e os eventos; a viagem não é critério
// (o ciclo é parado) —, cada um com o veredito e o porquê numa linha, antes da
// instalação. A i-01 (RKT-8H42) lê o recebimento dela: 3 posições em 1 min 12 s
// e o teste em 24 s. As outras do mock não têm recebimento: o veredito vem da
// regra dos critérios (criteriosRegra.porEstado), sem o porquê — a PCX-9A17,
// aguardando o gestor, com os dois conformes; a RVM-1E54, da falha reconhecida,
// com os dois ausentes. O resumo da i-01: Diagnóstico 8 de 8,
// Configuração 6 passos, a calibração nada a calibrar (o ônibus), o Ciclo de testes 4 de 4,
// o Checklist 27 de 27 e o autoteste nos três contadores, embaixo do nome — nunca 8 de 8.
// O recebimento deixou de ser a sétima etapa. Os estados 04 e 05
// abrem pela coluna, parados: a PCX-9A17 com o recebimento do caso, e o
// status geral 'aguardando validação'.
export default [
  { abre: '?tela=T12&momento=01-momento-detalhe-da-instalacao' },
  { chega: 'T12', momento: '01-momento-detalhe-da-instalacao' },
  { ve: 'RKT-8H42\naprovada\nM2C-0417 · hoje, 11:47 · Rafael Vieira' },
  { ve: 'O QUE O SERVIDOR RECEBEU\nPosicionamento\n3 posições em 1 min 12 s\nconforme\nEventos\no teste chegou em 24 s\nconforme\nA INSTALAÇÃO' },
  { naoVe: 'Viagens' },
  // o resumo diz o Diagnóstico do módulo (8 de 8, das linhas do diagnóstico do mock) e o checklist de 27
  { ve: 'A INSTALAÇÃO\nDiagnóstico\n8 de 8' },
  { ve: 'Configuração\n6 passos\nCalibração\nnada a calibrar\nCiclo de testes\n4 de 4\nChecklist\n27 de 27' },
  { naoVe: 'com foto' },
  { naoVe: 'Pré-checagem' },
  { ve: 'Autoteste\n5 aprovadas · 1 não se aplica · 1 pendente' },
  { naoVe: '8 de 8\nVoltar' },
  { naoVe: 'Recebimento' },
  { naoVe: 'confirmado 11:47' },
  { toca: 'Voltar às instalações' },
  { chega: 'T12', momento: null },
  // a PCX-9A17 no fluxo: sem recebimento no mock, o veredito da regra, sem o porquê · a i-02 tem a história
  // inteira, como a i-01: as seis linhas da instalação e quem instalou (T12/04 e 05)
  { toca: 'PCX-9A17' },
  { chega: 'T12', momento: '01-momento-detalhe-da-instalacao' },
  { ve: 'PCX-9A17\naguardando validação\nM2C-0312 · ontem, 16:05 · Rafael Vieira' },
  { ve: 'O QUE O SERVIDOR RECEBEU\nPosicionamento\nconforme\nEventos\nconforme\nA INSTALAÇÃO' },
  { ve: 'A INSTALAÇÃO\nDiagnóstico\n8 de 8\nConfiguração\n6 passos\nCalibração\nnada a calibrar\nCiclo de testes\n4 de 4\nChecklist\n27 de 27\nAutoteste\n5 aprovadas · 1 não se aplica · 1 pendente' },
  { tecla: 'Escape' },   // o voltar do Android, no detalhe, volta às instalações
  { chega: 'T12', momento: null },
  // a RVM-1E54, da falha reconhecida: nada chegou ao servidor
  { toca: 'RVM-1E54' },
  { chega: 'T12', momento: '01-momento-detalhe-da-instalacao' },
  { ve: 'RVM-1E54\nfalha reconhecida\nM2C-0362 · há 9 dias' },
  { ve: 'Posicionamento\nausente\nEventos\nausente\nA INSTALAÇÃO' },
  { naoVe: 'não confirmado' },
  // as outras só com o que o resumo sustenta: a configuração, o checklist e o autoteste, sem quem instalou
  { ve: 'A INSTALAÇÃO\nConfiguração\n6 passos\nChecklist\n27 de 27\nAutoteste\n5 aprovadas · 1 não se aplica · 1 pendente' },
  { naoVe: 'Diagnóstico' },
  { naoVe: 'Rafael Vieira' },
  { toca: 'Voltar às instalações' },
  { chega: 'T12', momento: null },
  // os estados do critério, pela coluna: parados, a PCX-9A17 com o recebimento do caso
  { abre: '?tela=T12&estado=04-estado-criterio-indisponivel' },
  { chega: 'T12', estado: '04-estado-criterio-indisponivel' },
  { ve: 'PCX-9A17\naguardando validação' },
  { ve: 'Eventos\no pacote não declara a fila\nindisponível' },
  { naoVe: 'Viagens' },
  { fica: 'T12', ms: 500 },
  { abre: '?tela=T12&estado=05-estado-criterio-pendente' },
  { chega: 'T12', estado: '05-estado-criterio-pendente' },
  { ve: 'PCX-9A17\naguardando validação' },
  { ve: 'Posicionamento\nsem resposta · confere por 24 h\npendente' },
  { ve: 'Eventos\no teste chegou em 52 s\nconforme' },
  { tecla: 'Escape' },   // num estado da coluna, o app está parado: o voltar não faz nada
  { fica: 'T12', ms: 500 },
  { chega: 'T12', estado: '05-estado-criterio-pendente' },
]
