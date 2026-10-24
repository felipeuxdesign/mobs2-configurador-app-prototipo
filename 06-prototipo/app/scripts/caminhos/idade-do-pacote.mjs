// A idade do pacote no caminho (T03/03 e 04): a empresa escolhida na T02 ou na folha
// do menu, cujo pacote no aparelho é de 4 dias (a Transportes Capibaribe) ou vencido (a
// Expresso Caruaruense), pergunta antes de baixar · Continuar com este pacote vai ao
// menu; Sincronizar agora baixa (na Expresso, a primeira baixa cai na rede, o caso
// sync-falha-rede, com o pacote do aparelho vencido — a T03/05 —, e o Reconectar conclui) ·
// a de ontem (a Viação) baixa direto · a T02 e a folha dizem a idade e que venceu (decisão 64)
const ATE_AS_EMPRESAS = [
  { abre: '' }, { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' }, { toca: 'Entrar' },
  { chega: 'T02', momento: null },
]
export default [
  // a Capibaribe, pela T02: o pacote de 4 dias pergunta, e Continuar com este pacote vai ao menu
  ...ATE_AS_EMPRESAS,
  { ve: 'pacote de 8 dias, vencido' }, { naoVe: 'pacote vencido há 8 dias' },
  { marca: 'Transportes Capibaribe' }, { fica: 'T02', ms: 500 }, { toca: 'Sincronizar' },
  { chega: 'T03' }, { ve: 'PACOTE DE 4 DIAS' }, { ve: 'Depois de 7 dias ele bloqueia: sincronize quando tiver rede.' },
  { ve: 'Continuar com este pacote' }, { fica: 'T03', ms: 1500 },
  { toca: 'Continuar com este pacote' }, { chega: 'T04' }, { ve: 'TRANSPORTES CAPIBARIBE' },
  // a Expresso, pela T02: o vencido pede sincronizar; a baixa cai na rede (o caso), e o Reconectar conclui
  ...ATE_AS_EMPRESAS,
  { marca: 'Expresso Caruaruense' }, { fica: 'T02', ms: 500 }, { toca: 'Sincronizar' },
  { chega: 'T03' }, { ve: 'ENQUANTO NÃO SINCRONIZAR' }, { ve: 'Trocar de empresa' }, { fica: 'T03', ms: 1500 },
  { toca: 'Sincronizar agora' },
  { ve: 'A BAIXA PAROU ONDE ESTAVA', ms: 8000 }, { ve: 'EXPRESSO CARUARUENSE' },
  { ve: 'O pacote que está no aparelho venceu: sem a baixa, os 18 ativos ficam indisponíveis.' }, { ve: 'Trocar de empresa' },
  { toca: 'Reconectar' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 9000 }, { toca: 'Ir para o menu' }, { chega: 'T04' },
  // a Viação, de ontem: baixa direto, sem perguntar
  ...ATE_AS_EMPRESAS,
  { marca: 'Viação Atlântico Sul' }, { fica: 'T02', ms: 500 }, { toca: 'Sincronizar' },
  { chega: 'T03' }, { naoVe: 'Continuar com este pacote' }, { chega: 'T03', momento: '02-momento-concluido', ms: 9000 },
  { toca: 'Ir para o menu' }, { chega: 'T04' }, { toca: 'Entendi' },
  // a Capibaribe pela folha do menu: o toque marca, e o Sincronizar troca (decisão 64); o pacote de 4 dias
  // pergunta de novo; Sincronizar agora baixa
  { toca: 'Trocar de empresa — Viação Atlântico Sul' }, { ve: 'carregado há 8 dias, vencido' },
  { marca: 'Transportes Capibaribe' }, { fica: 'T04', ms: 400 }, { toca: 'Sincronizar' },
  { chega: 'T03' }, { ve: 'PACOTE DE 4 DIAS' }, { toca: 'Sincronizar agora' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 9000 }, { ve: 'TRANSPORTES CAPIBARIBE' },
]
