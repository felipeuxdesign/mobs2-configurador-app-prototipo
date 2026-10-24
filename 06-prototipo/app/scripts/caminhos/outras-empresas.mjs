// As outras duas empresas do herói (decisão 56): cada uma com o pacote dela, e depois da
// T03 elas andam como espelho da Viação — o pacote, o nome e a contagem são os delas, e a
// lista da T06 e as instalações da T12 são as da Viação (diferença conhecida: o mock não
// tem a frota delas).
// Do login: a Transportes Capibaribe, com o pacote de 4 dias, que pergunta antes de baixar
// e baixa; o menu com o nome dela no topo, a folha com ela marcada, a T06 com *34 no pacote*
// e os ônibus da Viação; e a troca pra Expresso Caruaruense, vencida, que pede sincronizar.
const EMPRESA = 'Transportes Capibaribe'

export default [
  { abre: '' },
  { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  { chega: 'T02', momento: null },
  { marca: EMPRESA },
  { ve: 'Sincronizar' },
  { fica: 'T02', ms: 600 },
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { ve: EMPRESA.toUpperCase() },
  // o pacote de 4 dias pergunta antes de baixar; a baixa nunca cai no caminho
  { ve: 'PACOTE DE 4 DIAS' },
  { ve: 'pacote pct-emp02-2026-03-08 · 08/03 06:55' },
  { toca: 'Sincronizar agora' },
  { chega: 'T03', momento: '02-momento-concluido', entre: [3000, 7000] },
  { ve: 'de 59' },   // os 34 ativos e os grupos da Viação (2, 3, 12, 8)
  { ve: 'pacote pct-emp02-2026-03-12 · 12/03 14:30' },
  { toca: 'Ir para o menu' },
  { chega: 'T04' },
  { toca: 'Entendi' },
  { ve: EMPRESA.toUpperCase() },
  // a folha: a atual é a escolhida
  { toca: `Trocar de empresa — ${EMPRESA}` },
  { ve: 'Trocar recarrega os ativos e o pacote desta empresa.' },
  { executa: `const r = [...document.querySelectorAll('[role=radio]')].find((e) => e.textContent.startsWith(${JSON.stringify(EMPRESA)})); return r?.getAttribute('aria-checked') === 'true' || 'a Capibaribe não está marcada'` },
  { tecla: 'Escape' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  // a T06 da espelho: a contagem do pacote dela, e os ônibus da Viação (diferença conhecida)
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { marca: 'M2C-0417' },
  { toca: 'Conectar ao M2C-0417' },
  { chega: 'T07' },
  { ve: 'ENCERRAR', ms: 12000 },
  { toca: 'Selecionar ativo' },
  { chega: 'T06' },
  { ve: '34' }, { ve: 'no pacote' },
  { ve: 'RKT-8H42' },
  { marca: 'RKT-8H42' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: `O M2C-0417 fica neste ativo, na ${EMPRESA}.` },
  { toca: 'Escolher outro' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  // a Expresso Caruaruense, vencida, marcada na folha com a sessão aberta: o Sincronizar abre o
  // diálogo, os 4 passos, e a T03 dela pede sincronizar
  { toca: `Trocar de empresa — ${EMPRESA}` },
  { ve: 'carregado há 8 dias, vencido' },
  { marca: 'Expresso Caruaruense' },
  { toca: 'Sincronizar' },
  { ve: 'Trocar pra Expresso Caruaruense?' },
  { toca: 'Encerrar a sessão e trocar' },
  { chega: 'T03', ms: 20000 },
  { ve: 'EXPRESSO CARUARUENSE' },
  { ve: 'Os 18 ativos desta empresa ficam indisponíveis. Nenhuma instalação pode começar.' },
  { ve: 'Sincronizar agora' },
]
