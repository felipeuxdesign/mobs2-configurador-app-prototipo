// Folha 5 · cadeia e processo. Texto exato da folha. A folha não tem as leituras
// da CAN (a leitura, a pequena, o tambor, os sinais e os instrumentos apagados:
// eram da T07 antiga) e tem as quatro cadeias, na ordem da folha: antes de gravar,
// gravando, concluída e recusada. O módulo não guarda versão (decisão 49): cada elo
// diz o conteúdo do bloco, ou o que ele gravou, montado como a T09 monta (elosDo),
// no par do herói — a recusada, no par do caso bloco-recusado —, nunca digitado.
import { Cadeia, Encerramento, Segmentado, Precondicao, Prazo, BarraDoChecklist } from '../../ds/instrumentos/index.js'
import { M } from '../../dados/mock.js'
import { elosDo, envioDo, parDoCaso, QUADROS, TOTAL } from '../../telas/T09/cadeia.js'

// o par do herói (o mesmo M2C-0417 × RKT-8H42 da manutenção) e o da recusa
const HEROI = parDoCaso('modulo-ja-deste-ativo')
const RECUSA = parDoCaso('bloco-recusado')
// recusado nas Cercas: a Limpeza e o Ativo relidos, os três seguintes não alcançados
const CERCAS = M.cadeia.ordem.indexOf('cercas')

const PASSOS = ['Contadores e estado', 'Reinício do módulo', 'Releitura completa', 'Repouso do módulo', 'Canal de programação', 'Registro da sessão', 'Desconexão', 'Autoteste']
const espera = (nome) => ({ estado: 'espera', nome, situacao: '—' })
const pulado = (nome) => ({ estado: 'pulado', nome, situacao: 'pulado' })

export const especimes = [
  // processo
  // a cadeia antes de gravar (decisão 47): o que vai ser gravado, antes do toque — a T09/05
  { id: 'f5-cadeia-antes', folha: 5, rotulo: 'cadeia antes de gravar', legenda: 'o relógio em cada elo · a limpeza diz o que apaga',
    render: () => <Cadeia justa elos={elosDo({ confirmados: 0, fase: 'antes' }, HEROI, envioDo(HEROI))} /> },
  // a cadeia gravando (decisão 57): a 00, o Leitor gravando, parado no quadro (2 de 4 ajustes)
  { id: 'f5-cadeia-gravando', folha: 5, rotulo: 'cadeia gravando', legenda: 'a etapa que grava troca a descrição pela barra e a contagem · a pronta diz o que gravou',
    render: () => <Cadeia altura="gravando" elos={elosDo({ fase: 'gravando', parou: null, ...QUADROS['00-tela'] }, HEROI)} /> },
  { id: 'f5-cadeia-concluida', folha: 5, rotulo: 'cadeia concluída', legenda: 'trilho lima · cada etapa diz o que gravou',
    render: () => <Cadeia elos={elosDo({ confirmados: TOTAL, fase: 'concluida' }, HEROI)} /> },
  // a cadeia concluída e o que o último elo conferiu depois de gravado (T09/04), e o mesmo elo
  // quando o módulo ainda não falou com o servidor, com o o que conferir sem a caixa (T09/12):
  // o recorte da tela, só a Conexão, montada como a T09 monta
  { id: 'f5-cadeia-conferiu', folha: 5, tela: true, rotulo: 'cadeia · o que o elo conferiu · T09/04', legenda: 'depois de gravado, o elo diz embaixo o que conferiu, com a divisória em cima',
    render: () => <Cadeia elos={elosDo({ confirmados: TOTAL, fase: 'concluida' }, HEROI).slice(-1)} /> },
  { id: 'f5-cadeia-conferir-sem-caixa', folha: 5, tela: true, rotulo: 'cadeia · o que conferir, sem a caixa · T09/12', legenda: 'o que não conferiu traz o que conferir dentro do elo, sem a caixa',
    render: () => <Cadeia elos={elosDo({ confirmados: TOTAL, fase: 'semServidor' }, HEROI).slice(-1)} /> },
  { id: 'f5-cadeia-recusada', folha: 5, rotulo: 'cadeia recusada', legenda: 'o elo que falhou acende',
    render: () => <Cadeia justa elos={elosDo({ confirmados: CERCAS, fase: 'recusado', parou: 'recusa' }, RECUSA)} /> },
  { id: 'f5-segmentado', folha: 5, rotulo: 'segmentado', legenda: 'um segmento por passo',
    render: () => (
      <Segmentado rotulo="B · MONTAGEM" contagem="1" total="de 5" legenda="Depois: Lado de cima do módulo livre"
        segmentos={['atual', 'pendente', 'pendente', 'pendente', 'pendente']} /> // o Painel pendente, como a T13
    ) },
  { id: 'f5-precondicao-pinos', folha: 5, rotulo: 'a pré-condição dos pinos', legenda: 'a primeira linha da configuração, embaixo do título',
    render: () => <Precondicao>ocupação de pinos confere</Precondicao> },

  // a cadeia do encerramento · oito passos
  { id: 'f5-encerrando', folha: 5, rotulo: 'encerrando', legenda: 'a legenda só no passo que corre',
    render: () => (
      <Encerramento passos={[
        { estado: 'ok', nome: PASSOS[0], situacao: 'gravados' },
        { estado: 'ok', nome: PASSOS[1], situacao: 'voltou' },
        { estado: 'agora', nome: PASSOS[2], situacao: 'relendo', legenda: 'Ele lê de volta o que ficou gravado. É isto que prova que a configuração sobreviveu ao reinício.' },
        ...PASSOS.slice(3).map(espera),
      ]} />
    ) },
  // o reinício por comando é automático, com o quadrado de agora no passo que corre (T16/01): o técnico não faz nada
  { id: 'f5-reiniciando', folha: 5, rotulo: 'reiniciando', legenda: 'o reinício é automático · o técnico não faz nada, e a conexão que cai diz reconectando',
    render: () => (
      <Encerramento justo passos={[
        { estado: 'ok', nome: PASSOS[0], situacao: 'confere' },
        { estado: 'agora', nome: PASSOS[1], situacao: 'reiniciando', legenda: 'O módulo reinicia sozinho. Leva alguns segundos.' },
        ...PASSOS.slice(2).map(espera),
      ]} />
    ) },
  // o módulo que não reinicia por comando (o VL08) pede o corte, uma vez (decisão 64, T16/09): o glifo energia, o
  // *com você* e a legenda do que fazer · o único passo do encerramento em que o técnico age
  { id: 'f5-pede-o-corte', folha: 5, rotulo: 'pede o corte', legenda: 'o módulo que não reinicia por comando: a energia, com você · o único passo em que o técnico age',
    render: () => (
      <Encerramento justo passos={[
        { estado: 'ok', nome: PASSOS[0], situacao: 'confere' },
        { estado: 'energia', nome: PASSOS[1], situacao: 'com você', legenda: 'Este módulo não reinicia por comando. Desligue a alimentação dele e ligue de novo, uma vez só.' },
        ...PASSOS.slice(2).map(espera),
      ]} />
    ) },
  { id: 'f5-sem-homologar', folha: 5, rotulo: 'sem homologar', legenda: 'só os quatro que deixam o módulo seguro · os pulados com traço',
    render: () => (
      <Encerramento justo passos={[
        ...PASSOS.slice(0, 3).map(pulado),
        { estado: 'ok', nome: PASSOS[3], situacao: 'restaurado' },
        { estado: 'agora', nome: PASSOS[4], situacao: 'fechando', legenda: 'Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar.' },
        espera(PASSOS[5]), espera(PASSOS[6]),
        pulado(PASSOS[7]),
      ]} />
    ) },

  // tempo e a barra do checklist
  { id: 'f5-cronometro', folha: 5, rotulo: 'cronômetro', legenda: 'o prazo drena',
    render: () => <Prazo rotulo="PRAZO DO EVENTO" nota="FILA DRENADA" tempo="1:36" restante={96} limite={120} legendas={{ inicio: '0:00', fim: 'limite 2:00' }} /> },
  { id: 'f5-prazo-cheio', folha: 5, rotulo: 'prazo cheio', legenda: 'antes do disparo · a fila drenando',
    render: () => (
      <Prazo rotulo="PRAZO DO EVENTO" nota="FILA DRENANDO" tempo="2:00" restante={120} limite={120} legendas={{ inicio: '0:00', fim: 'limite 2:00' }}
        detalhe="6 mensagens e 2 de diagnóstico saindo do módulo" />
    ) },
  // a barra fina, sem o placar, que repetiria o número do título (decisão 34)
  { id: 'f5-barra-checklist', folha: 5, rotulo: 'a barra do checklist', legenda: 'o que já passou, em lima · o número fica no título',
    render: () => <BarraDoChecklist feitos={17} total={31} /> }, // o número do título da T13, 17 de 31
]
