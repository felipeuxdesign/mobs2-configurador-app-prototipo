// T13 · o Reler o módulo (os valores: a alimentação contra a faixa do VL06, 8,4 → 8,8 → 24,3 V,
// e o GPS pela posição, sem posição → com posição): o detalhe de um item reprovado relê o
// módulo ali mesmo, sem ir à T07, e o mock vem em sequência — a 1ª releitura ainda reprova,
// a 2ª passa. O 29 e as releituras são da coluna, e abrem parados (consultas, decisão 43);
// no fluxo, nenhum módulo da busca chega na Seção C reprovada. Por isso o roteiro semeia a
// sessão do ônibus da bateria fraca (o QJF-2C61 com o M2C-0301, o can-estatico-bateria), como
// a T06 a gravaria, e toca: a Alimentação reprovada abre o detalhe · o Reler diz Relendo o
// módulo…, desligado, com o link e o ENCERRAR apagados, e a URL vai ao 29 · 1 s depois
// (RITMOS.relerModuloMs), o não resolvido (34): 8,8 V, ainda vermelho, o xis com o relido e o
// que ainda falta, o O que conferir e o Reler de novo · o 2º toque: Relendo de novo, com o xis
// ainda na tela, e o relido (30): 24,3 V, o check e um botão só · o Voltar ao checklist volta
// à C do mesmo ônibus, toda atualizada, e o que passou é leitura, sem seta. O GPS (o
// gps-fraco é caso da coluna): o detalhe, o não resolvido (35) e o relido (31), parados.
const SESSAO_DA_BATERIA = `
  const el = document.querySelector('.t13'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value
  despachar({ tipo: 'mesclar', parcial: { sessao: { ...estado.sessao, ativoId: 'a-02', moduloSerial: 'M2C-0301' } } })
  return true`
export default [
  { abre: '?tela=T13&momento=03-momento-c-hardware-aberta' },
  { chega: 'T13', momento: '03-momento-c-hardware-aberta' },
  { executa: SESSAO_DA_BATERIA },
  { ve: 'QJF-2C61' },
  { ve: 'Alimentação\n8,4 V' },
  { toca: 'Alimentação' },
  { ve: 'LIDO NO MÓDULO' },
  { ve: '0,6 V abaixo do mínimo' },
  { ve: '9,0 — 40,0' },   // a régua de 5 a 45
  { toca: 'Reler o módulo' },
  { chega: 'T13', momento: '29-momento-relendo-o-modulo' },
  { desligado: 'Relendo o módulo…' },
  { desligado: 'Voltar ao checklist' },
  { desligado: 'ENCERRAR' },
  { ve: '8,4' },
  { ve: 'O QUE CONFERIR' },
  { chega: 'T13', momento: '34-momento-alimentacao-nao-resolvida', entre: [700, 2500] },
  { ve: '8,8' },
  { ve: 'relido às 14:30 · ainda 0,2 V abaixo do mínimo' },
  { ouve: 'falha' },
  { ve: 'O QUE CONFERIR' },
  { toca: 'Reler o módulo' },
  { desligado: 'Relendo o módulo…' },
  { ve: 'relido às 14:30 · ainda 0,2 V abaixo do mínimo' },
  { chega: 'T13', momento: '30-momento-alimentacao-relida' },
  { ve: '24,3' },
  { ve: 'relido às 14:30 · dentro da faixa' },
  { naoVe: 'O QUE CONFERIR' },
  { naoToca: 'Reler o módulo' },
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: '03-momento-c-hardware-aberta' },
  { ve: 'M2C-0301' },
  { ve: 'Alimentação\n24,3 V' },
  { naoToca: 'Alimentação' },
  // o GPS, parado pela coluna: sem posição, a informação embaixo e o que conferir; as duas releituras
  { abre: '?tela=T13&estado=22-estado-gps-reprovado' },
  { chega: 'T13', estado: '22-estado-gps-reprovado' },
  { ve: 'sem posição' },
  { ve: '0 satélites · antena conectada' },
  { ve: '1 · Lugar do módulo' },
  { abre: '?tela=T13&estado=35-momento-gps-nao-resolvido' },
  { chega: 'T13', estado: '35-momento-gps-nao-resolvido' },
  { ve: 'relido às 14:30 · ainda sem posição' },
  { ve: 'O QUE CONFERIR' },
  { abre: '?tela=T13&estado=31-momento-gps-relido' },
  { chega: 'T13', estado: '31-momento-gps-relido' },
  { ve: 'com posição' },
  { ve: 'relido às 14:30 · 9 satélites' },   // os satélites são informação
  { naoVe: 'O QUE CONFERIR' },
]
