// A busca sem resultado, na T06 (tela.md): o vazio declarado diz o termo digitado
// no título, e o primário espera. A URL diz o momento enquanto a busca não acha nada;
// a busca que volta a achar o tira. A busca que acha outros e esconde a escolha feita
// também faz o primário esperar, e ele acende de novo quando ela volta. A URL diz esse
// quadro também (o 09), e o endereço dele abre a tela nele. A placa de um ônibus de outra
// empresa abre a trava do fora do pacote (a 04). E o Procurar de novo da T05 mostra o
// *Procurando…* (T05/05) antes de a lista voltar.
// A busca da T02 saiu com a lista longa: a lista das empresas não tem busca nesta versão
// (decisão 56; pergunta do produto).
const ESCONDE_T06 = '09-momento-busca-esconde-a-escolha'
export default [
  // ── T06 · o 08 no fluxo: a placa que não existe no pacote ──
  { abre: '?tela=T06' },
  { chega: 'T06', momento: null },
  { ve: 'Escolha o veículo que está na sua frente.' },
  { marca: 'RKT-8H42' },
  { fica: 'T06', ms: 400 },
  // a busca que acha outro ônibus esconde o marcado: o primário espera
  // e a URL diz o 09; com um termo na busca, a instrução sai, como a 09 desenha
  { digita: '1006', em: 'Buscar placa, frota ou módulo' },
  { ve: 'QJF-2C61' },
  { naoVe: 'RKT-8H42' },
  { chega: 'T06', momento: ESCONDE_T06 },
  { desligado: 'Usar este ativo' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  // a busca que devolve o marcado, junto com outros (as frotas 1003, 1006 e 1009): ele acende
  // de novo, o 09 sai da URL, e o primário leva à confirmação do marcado, e não de um dos outros
  { digita: '100', em: 'Buscar placa, frota ou módulo' },
  { ve: 'QJF-2C61' },
  { ve: 'PCX-9A17' },
  { ve: 'RKT-8H42' },
  { chega: 'T06', momento: null },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'RKT-8H42' },
  { toca: 'Escolher outro' },
  { chega: 'T06', momento: null },
  { marca: 'RKT-8H42' },
  { fica: 'T06', ms: 400 },
  { digita: 'ABC-1234', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: '08-momento-busca-sem-resultado' },
  { ve: 'Nada com “ABC-1234”' },
  { ve: 'Confira a placa, ou busque pela frota.' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  { desligado: 'Usar este ativo' },
  // a busca que acha: a lista volta com o ônibus marcado, e o 08 sai da URL; com o termo, sem a instrução
  { digita: 'rkt8h42', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: null },
  { naoVe: 'Nada com' },
  { ve: 'RKT-8H42' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'O M2C-0417 fica neste ativo, na Viação Atlântico Sul.' },   // o vínculo (a T06 sem o chassi)
  // Escolher outro volta à lista com a busca como estava; outra placa que não existe
  { toca: 'Escolher outro' },
  { chega: 'T06', momento: null },
  { digita: 'ABC-1234', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: '08-momento-busca-sem-resultado' },
  // a placa de um ônibus de outra empresa abre a trava dele: fora do pacote (a 04)
  { digita: 'PHS-2C47', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'FORA DO PACOTE DESTA EMPRESA' },
  { ve: 'frota 3008 · Ônibus urbano OF-1621' },
  { ve: 'Pertence à Expresso Caruaruense.' },
  { ve: 'É uma das suas empresas: troque de empresa pra instalar nele.' },   // o caminho de verdade (decisão 64)
  { naoVe: 'Acione o cadastro no M2.' },
  // o Escolher outro volta à lista com a busca como estava: a placa não está no pacote
  { toca: 'Escolher outro' },
  { chega: 'T06', momento: '08-momento-busca-sem-resultado' },
  { ve: 'Nada com “PHS-2C47”' },
  // o voltar do sistema faz o Voltar ao menu, o link de saída da lista (logica.md)
  { tecla: 'Escape' },
  { chega: 'T04' },

  // ── T06 · o 08 pelo endereço: o termo da referência digitado ──
  { abre: '?tela=T06&momento=08-momento-busca-sem-resultado' },
  { chega: 'T06', momento: '08-momento-busca-sem-resultado' },
  { ve: 'Nada com “ABC-1234”' },
  { desligado: 'Usar este ativo' },
  // a instrução sai com qualquer termo na busca: também na que acha, sem nada marcado
  { digita: 'QJF', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: null },
  { ve: 'QJF-2C61' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },

  // ── T06 · o 09 pelo endereço: o RKT-8H42 marcado, e PCX digitado o esconde ──
  { abre: `?tela=T06&momento=${ESCONDE_T06}` },
  { chega: 'T06', momento: ESCONDE_T06 },
  { ve: 'PCX-9A17' },
  { naoVe: 'RKT-8H42' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  { desligado: 'Usar este ativo' },
  // a busca que devolve o marcado: ele acende de novo, e leva à confirmação dele
  { digita: 'RKT', em: 'Buscar placa, frota ou módulo' },
  { chega: 'T06', momento: null },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'RKT-8H42' },
  { ve: 'O M2C-0417 fica neste ativo, na Viação Atlântico Sul.' },   // o vínculo (a T06 sem o chassi)

  // ── T05 · o Procurar de novo: a lista some, o *Procurando…* (05), e a lista volta ──
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { ve: 'Escolha o que está na sua mão.' },
  { toca: 'Procurar de novo' },
  // o *Procurando…*, com a URL dizendo a 05, no ritmo da busca (ritmos.js · buscaMs):
  // 1,2 s — 600 ms depois, ele ainda está na tela
  { chega: 'T05', momento: '05-momento-procurando' },
  { ve: 'Procurando…' },
  { ve: 'segunda tentativa' },
  { desligado: 'Procurar de novo' },
  { naoVe: 'Escolha o que está na sua mão.' },
  { dorme: 600 },
  { chega: 'T05', momento: '05-momento-procurando' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido', entre: [50, 1000] },
  { ve: 'Escolha o que está na sua mão.' },
  { naoVe: 'Procurando…' },
  { desligado: 'Conectar' },
  // da 00 também (a lista marcada): o *Procurando…*, e a lista sem nada escolhido
  { abre: '?tela=T05' },
  { ve: 'Conectar ao M2C-0417' },
  { toca: 'Procurar de novo' },
  { chega: 'T05', momento: '05-momento-procurando' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { desligado: 'Conectar' },
  // a terceira busca: o *Procurando…* sem a legenda — o textos.md só escreve as duas primeiras
  { toca: 'Procurar de novo' },
  { chega: 'T05', momento: '05-momento-procurando' },
  { naoVe: 'segunda tentativa' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  // pela URL, a 05 fica parada
  { abre: '?tela=T05&momento=05-momento-procurando' },
  { fica: 'T05', ms: 1600 },
  { chega: 'T05', momento: '05-momento-procurando' },
  { ve: 'Procurando…' },
]
