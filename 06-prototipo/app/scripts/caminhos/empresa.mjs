// O contexto é a empresa (decisão 56; logica.md · O contexto é a empresa), por
// toque, com a URL de cada quadro:
//  · a T02: do login, as três empresas do herói, nada escolhido (a 00) → a Viação, o
//    01, e o primário acende com o Sincronizar → outra escolha troca a marca, e o
//    texto não muda → a de pacote vencido também se escolhe, e a T03 diz o que fazer →
//    o Trocar de empresa da T03/04 volta pra T02 com a atual marcada → a Viação →
//    Sincronizar → o menu. O voltar não faz nada na T02
//  · a folha Trocar de empresa do topo do menu (a 07, decisão 64): o toque marca outra
//    empresa (a 21) e acende o Sincronizar, tocar de novo na atual devolve a marca; sem
//    sessão, o Sincronizar vai direto à T03 da marcada; com a sessão aberta, o diálogo de
//    trocar (o 09), que diz pra qual empresa, o Cancelar volta à folha com a marca, e o
//    Encerrar a sessão e trocar passa pelos 4 passos da T16 e segue pra T03 da escolhida
//  · o 08 e o 09 pelo endereço, parados: a evidência subindo, com as outras duas
//    esperando o envio terminar, sem toque, e o primário esperando também; e o diálogo
//    de trocar com a sessão
// O mundo de uma empresa só (o caso uma-empresa) não tem quadro nem endereço: o que as
// funções fazem nele — o Entrar direto à T03, o nome no menu sem a seta — se prova no
// node (testar-empresa.mjs, testar-trocar-empresa.mjs).
const ESCOLHIDA = '01-momento-escolhida'
const FOLHA = '07-momento-folha-trocar-de-empresa'
const OUTRA = '21-momento-folha-trocar-de-empresa-outra-marcada'
const ENVIO = '08-estado-folha-trocar-de-empresa-envio-em-andamento'
const TROCAR = '09-estado-folha-trocar-de-empresa-com-modulo-conectado'
const esc = { tecla: 'Escape' }
// a linha marcada (aria-checked) é a da empresa com esse nome
const marcada = (nome) => ({ executa: `const r = [...document.querySelectorAll('[role=radio]')].find((e) => e.textContent.startsWith(${JSON.stringify(nome)})); return r?.getAttribute('aria-checked') === 'true' || ${JSON.stringify(nome + ' não está marcada')}` })
// a entrada: as três empresas, nada escolhido — a 00, sem momento na URL
const NA_00 = [
  { chega: 'T02', momento: null },
  { ve: '3 EMPRESAS' },
  { ve: 'Pra qual empresa hoje?' },
  { ve: 'pacote de ontem, 07:10' }, { ve: '24 ativos' },
  { ve: 'pacote de 4 dias, 06:55' }, { ve: '34 ativos' },
  { ve: 'pacote de 8 dias, vencido' }, { ve: '18 ativos' },
  { desligado: 'Escolha uma empresa' },
  { naoVe: 'Sincronizar' },
]
// a sessão aberta do herói: o M2C-0417 e o RKT-8H42 (como no sair.mjs)
const SESSAO_ABERTA = [
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { marca: 'M2C-0417' },
  { toca: 'Conectar ao M2C-0417' },
  // a conexão abre o diagnóstico (T07): as linhas passam, e a faixa desce
  { chega: 'T07' },
  { ve: 'ENCERRAR', ms: 12000 },
  { toca: 'Selecionar ativo' },
  { chega: 'T06' },
  { marca: 'RKT-8H42' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { toca: 'Vincular o módulo' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: null },
  { ve: 'RKT-8H42' },
  { ve: 'ENCERRAR' },
]
// a folha Trocar de empresa: a frase, as três empresas com o pacote e os ativos, a atual marcada
// e o primário apagado
const A_FOLHA = (atual) => [
  { toca: `Trocar de empresa — ${atual}` },
  { chega: 'T04', momento: FOLHA },
  { ve: 'Trocar recarrega os ativos e o pacote desta empresa.' },
  { ve: 'Transportes Capibaribe' }, { ve: 'Expresso Caruaruense' },
  { ve: 'carregado há 8 dias, vencido' },
  marcada(atual),
  { desligado: 'Escolha outra empresa' },
]
// o toque marca outra empresa (a 21), e o primário acende com o Sincronizar
const MARCA = (nome) => [
  { marca: nome },
  { chega: 'T04', momento: OUTRA },
  marcada(nome),
  { ve: 'Sincronizar' },
]

export default [
  // ══ a T02, do login ══
  { abre: '' },
  { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  ...NA_00,
  // o voltar do sistema não faz nada: a tela não tem saída desenhada
  esc,
  { fica: 'T02', ms: 500 },
  ...NA_00,
  // a Viação: o 01, e o primário acende com o Sincronizar
  { marca: 'Viação Atlântico Sul' },
  { chega: 'T02', momento: ESCOLHIDA },
  { ve: 'Sincronizar' },
  marcada('Viação Atlântico Sul'),
  // outra escolha troca a marca, e o texto do primário não muda
  { marca: 'Transportes Capibaribe' },
  marcada('Transportes Capibaribe'),
  { ve: 'Sincronizar' },
  // a de pacote vencido também se escolhe, e a T03 diz o que fazer
  { marca: 'Expresso Caruaruense' },
  { fica: 'T02', ms: 500 },
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { ve: 'EXPRESSO CARUARUENSE' },
  { ve: 'Os 18 ativos desta empresa ficam indisponíveis. Nenhuma instalação pode começar.' },
  { ve: 'pacote pct-emp03-2026-03-04 · 04/03 07:30' },
  // o Trocar de empresa volta pra T02 com a atual marcada (o 01)
  { toca: 'Trocar de empresa' },
  { chega: 'T02', momento: ESCOLHIDA },
  marcada('Expresso Caruaruense'),
  { ve: 'Sincronizar' },
  // a Viação: o pacote de ontem baixa direto, e o menu diz o nome dela no topo
  { marca: 'Viação Atlântico Sul' },
  { fica: 'T02', ms: 500 },
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },
  { chega: 'T03', momento: '02-momento-concluido', entre: [3000, 7000] },
  { ve: 'pacote pct-emp01-2026-03-12 · 12/03 14:30' },
  { toca: 'Ir para o menu' },
  { chega: 'T04' },
  // o aviso do acesso, na primeira chegada ao menu (T04/12)
  { toca: 'Entendi' },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },

  // ══ a folha Trocar de empresa, sem sessão: escolher outra vai direto à T03 dela ══
  ...A_FOLHA('Viação Atlântico Sul'),
  // a folha fecha no voltar, e abre de novo
  esc,
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  ...A_FOLHA('Viação Atlântico Sul'),
  // o toque marca, e não troca; tocar de novo na atual devolve a marca a ela, e o primário apaga
  ...MARCA('Transportes Capibaribe'),
  { fica: 'T04', ms: 400 },
  { marca: 'Viação Atlântico Sul' },
  { chega: 'T04', momento: FOLHA },
  marcada('Viação Atlântico Sul'),
  { desligado: 'Escolha outra empresa' },
  // marcada a outra, o Sincronizar troca: sem sessão, direto pra T03 dela
  ...MARCA('Transportes Capibaribe'),
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { ve: 'TRANSPORTES CAPIBARIBE' },
  // o pacote de 4 dias pergunta antes de baixar (o roteiro idade-do-pacote)
  { ve: 'PACOTE DE 4 DIAS' },
  { toca: 'Continuar com este pacote' },
  { chega: 'T04' },
  { ve: 'TRANSPORTES CAPIBARIBE' },
  ...A_FOLHA('Transportes Capibaribe'),
  // a de pacote vencido se escolhe na folha: a T03/04 diz o que fazer
  ...MARCA('Expresso Caruaruense'),
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { ve: 'ENQUANTO NÃO SINCRONIZAR' },
  { ve: 'Trocar de empresa' },
  { toca: 'Trocar de empresa' },
  { chega: 'T02', momento: ESCOLHIDA },
  marcada('Expresso Caruaruense'),
  { marca: 'Viação Atlântico Sul' },
  { toca: 'Sincronizar' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 9000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04' },

  // ══ com a sessão aberta: o diálogo de trocar, o Cancelar, os 4 passos e a T03 da escolhida ══
  ...SESSAO_ABERTA,
  ...A_FOLHA('Viação Atlântico Sul'),
  ...MARCA('Transportes Capibaribe'),
  { toca: 'Sincronizar' },
  // o diálogo diz pra qual empresa (decisão 64)
  { ve: 'Trocar pra Transportes Capibaribe?' },
  { ve: 'Encerrar a sessão e trocar' },
  { ve: 'é encerrada antes da troca, sem terminar a instalação.' },
  { ve: 'O que já foi enviado fica no módulo.' },
  // o Cancelar fecha o diálogo e volta à folha, com a sessão aberta e a marca onde estava
  { toca: 'Cancelar' },
  { naoVe: 'Encerrar a sessão e trocar' },
  { chega: 'T04', momento: OUTRA },
  { ve: 'Trocar recarrega os ativos e o pacote desta empresa.' },
  marcada('Transportes Capibaribe'),
  { toca: 'Sincronizar' },
  { toca: 'Encerrar a sessão e trocar' },
  { chega: 'T16', momento: '03-momento-encerrando-sem-homologar', ms: 1000 },
  { ve: 'Sem homologar · só o que deixa o módulo seguro' },
  // depois dos 4 passos, a T03 da escolhida
  { chega: 'T03', ms: 20000 },
  { ve: 'TRANSPORTES CAPIBARIBE' },
  { ve: 'PACOTE DE 4 DIAS' },

  // ══ o 08 e o 09 pelo endereço: parados ══
  { abre: `?tela=T04&estado=${ENVIO}` },
  { chega: 'T04', estado: ENVIO },
  { ve: 'UMA EVIDÊNCIA ESTÁ SUBINDO' },
  { ve: 'Troque de empresa quando a fila terminar.' },
  { ve: 'espera o envio terminar' },
  // as outras duas esperam o envio terminar: sem toque (desabilitadas de verdade); a atual, marcada
  { executa: `const r = [...document.querySelectorAll('[role=radio]')]; const d = (n) => r.find((e) => e.textContent.startsWith(n))?.disabled; return (d('Transportes Capibaribe') && d('Expresso Caruaruense') && !d('Viação Atlântico Sul')) || 'as que esperam não estão desabilitadas'` },
  marcada('Viação Atlântico Sul'),
  // o primário espera o envio também, apagado (o estado parado não se toca: o texto basta)
  { ve: 'Espera o envio terminar' },
  { abre: `?tela=T04&estado=${TROCAR}` },
  { chega: 'T04', estado: TROCAR },
  { ve: 'Trocar pra Transportes Capibaribe?' },
  { ve: 'Encerrar a sessão e trocar' },
  { ve: 'é encerrada antes da troca, sem terminar a instalação.' },

  // ══ com o checklist registrado (a 19, pelo endereço): o cartão do Finalizar diz o próximo passo, e o
  // trocar roda o encerramento completo da T16 — o reinício e o autoteste — antes da T03 da marcada ══
  { abre: '?tela=T04&momento=19-momento-checklist-registrado' },
  { chega: 'T04', momento: '19-momento-checklist-registrado' },
  { toca: 'Entendi' },
  { ve: 'registrado · falta encerrar a sessão' },
  { toca: 'Trocar de empresa — Viação Atlântico Sul' },
  ...MARCA('Transportes Capibaribe'),
  { toca: 'Sincronizar' },
  { ve: 'Trocar pra Transportes Capibaribe?' },
  { ve: 'O checklist do M2C-0417 está registrado: a sessão encerra antes, com o reinício e o autoteste do módulo.' },
  { naoVe: 'sem terminar a instalação' },
  { toca: 'Encerrar a sessão e trocar' },
  { chega: 'T16', momento: null },
  { naoVe: 'Sem homologar' },
  { ve: 'Encerrando · não desconecte' },
  { chega: 'T16', momento: '07-momento-autoteste-correndo', ms: 8000 },
  { chega: 'T03', ms: 8000 },
  { ve: 'TRANSPORTES CAPIBARIBE' },
  // e o ENCERRAR da 19 vai direto pro encerramento completo, sem o Encerrar antes de terminar? (decisão 36)
  { abre: '?tela=T04&momento=19-momento-checklist-registrado' },
  { toca: 'Entendi' },
  { toca: 'ENCERRAR' },
  { chega: 'T16', momento: null },
  { naoVe: 'Encerrar antes de terminar?' },

  // ══ o 01 pelo endereço: a Viação marcada, o app vivo ══
  { abre: `?tela=T02&momento=${ESCOLHIDA}` },
  { chega: 'T02', momento: ESCOLHIDA },
  marcada('Viação Atlântico Sul'),
  { ve: 'Sincronizar' },
  { abre: '?tela=T02' },
  ...NA_00,
]
