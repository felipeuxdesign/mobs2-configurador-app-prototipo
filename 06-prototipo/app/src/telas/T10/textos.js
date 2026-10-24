// T10 · os textos da tela, exatamente como no 02-telas/T10-calibracao/textos.md.
// Onde o texto traz um dado (a contagem, a diferença, a unidade, os dias, a
// hora, a seção, o nome da grandeza), a moldura é daqui e o dado vem do mock,
// na hora de montar. Dois textos vêm de outro documento da tela, porque
// nenhuma referência os desenha: o semear do horímetro (estados.md, a 09) e o
// que o botão diz enquanto o semear corre (animacao.md). Com a decisão 52, a
// foto e a câmera saíram daqui (a Seção B do checklist).
export const T = {
  encerrar: 'ENCERRAR',
  rotulo: 'CALIBRAÇÃO',
  deTotal: (total) => `de ${total}`,
  depois: (nomes) => `Depois: ${nomes.join(' · ')}`,
  // o horímetro é opcional (decisão 52): o Depois: diz, e o passo dele também (T10/00 e 08)
  opcional: (nome) => `${nome}, opcional`,
  // os opcionais que faltam, juntos e fora da contagem (T10/00: *velocidade e horímetro, opcionais*)
  opcionais: (nomes) => (nomes.length === 1 ? `${nomes[0]}, opcional` : `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}, opcionais`),
  ultimoOpcional: 'Opcional · o último passo',
  completa: 'Calibração completa',

  // o valor em poço: o que o módulo conta (partida) ou lê (ajuste)
  moduloConta: 'O MÓDULO CONTA',
  moduloLe: 'O MÓDULO LÊ',
  moduloAgora: 'O MÓDULO CONTA AGORA',
  moduloReleu: 'O MÓDULO RELEU',
  vazio: '—',

  // a régua da diferença
  lido: (hora) => `lido do módulo às ${hora}`,
  // a diferença diz o lado (decisão 64): o número digitado errado salta aos olhos antes de semear (T10/05 a 07)
  diferenca: (valor, unidade, frente) => `o painel está ${valor} ${unidade} ${frente ? 'à frente' : 'atrás'}`,
  // o semeado que se corrige (T10/12): o módulo conta o semeado, e a régua diz quando
  semeadoAs: (hora) => `semeado às ${hora}`,
  semeadoHa: (dias) => `semeado há ${dias} dias`,
  ligueMotor: 'ligue o motor pra ele ler',
  relido: (hora) => `relido às ${hora} · confere com o painel`,
  // o desvio na unidade do reporte: só o do hodômetro tem texto (em metros, T10/10)
  naoConfere: { hodometro: (valor) => `não confere · ${valor} m a menos que o painel` },

  // o valor alvo: o campo do painel
  painel: 'O PAINEL MOSTRA',
  painelVazio: 'toque e digite o que o painel mostra',
  alvoVai: 'é este que vai para o módulo',
  alvoCumprido: 'o mesmo que o módulo agora conta',
  // o semeado se corrige na hora (decisão 64, T10/01, 09 e 12)
  corrigir: 'toque pra corrigir',
  alvoCorrigindo: 'corrija e semeie de novo',
  alvoAjuste: { rotacao: 'digite o que o conta-giros mostra' },

  // o que não se aplica (T10·5)
  naoSeAplicamModelo: 'NÃO SE APLICAM NESTE MODELO',
  naoSeAplicam: 'NÃO SE APLICAM',

  // o rodapé: o primário diz sempre o que falta — com a decisão 52, só o número
  digite: 'Digite o que o painel mostra',
  ligue: 'Ligue o motor',
  semear: { hodometro: 'Semear o hodômetro', horimetro: 'Semear o horímetro' },
  gravando: 'Gravando no módulo…',
  relendo: 'Relendo…',
  semearDeNovo: 'Semear de novo',
  calibrar: { horimetro: 'Calibrar o horímetro', rotacao: 'Calibrar a rotação' },
  // o ativo que não calibra nada (a 11): o título em duas linhas, e a frase do cadastro do modelo
  nadaACalibrar: ['Nada a calibrar', 'neste ativo'],
  // o opcional se pula (decisão 52, T10/01 e 08): o link no lugar do Voltar ao menu
  pular: { horimetro: 'Pular o horímetro' },
  // a calibração completa aponta o ciclo (T10/09 · decisões 35 e 54)
  cicloDeTestes: 'Fazer o ciclo de testes',
  voltar: 'Voltar ao menu',
}
