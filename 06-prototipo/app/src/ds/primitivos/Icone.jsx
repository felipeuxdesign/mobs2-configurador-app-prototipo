// Os ícones que não são glifo de estado: as 10 ferramentas do menu e os de ação (fechar, seta,
// olho, lupa, câmera…). O desenho é o do jogo de ícones (03-design-system/icones,
// Desenho.jsx), e o nome aqui é o papel no app: cada papel aponta o desenho que a referência
// daquele lugar usa (os pares parecidos do jogo valem cada um no lugar dele). O traço vem da
// classe (lei 14): ferramenta e ação 1,8 · fechar e seta 2,2 · check mini 2,6 · e o xis de
// limpar do usuário lembrado e a seta da lista, 2, como a T01 desenha.
import { Desenho } from './Desenho.jsx'
import './Icone.css'

// o papel → [o desenho do jogo, a classe do traço]
export const ICONES = {
  // ferramentas (folha 3)
  conectar: ['modulo', 'acao'], 'conectar-na-folha': ['modulo-na-folha', 'acao'], ativo: ['ativo', 'acao'],
  can: ['diagnostico', 'acao'], configurar: ['configurar', 'acao'], refazer: ['refazer', 'acao'],
  calibracao: ['calibracao', 'acao'], conferir: ['ferramenta', 'acao'], checklist: ['checklist', 'acao'],
  fila: ['fila-de-saida', 'acao'], instalacoes: ['ultimas-instalacoes', 'acao'],
  // ação
  fechar: ['fechar', 'fechar'], avancar: ['seta-seguir', 'fechar'], abrir: ['seta-abrir', 'fechar'], recolher: ['seta-fechar', 'fechar'],
  // a seta da linha de opção da T01 (o reenvio, T01/11) e a da lista do país (T01/02, 20, 22): os desenhos de 24 da T01
  seguir: ['seguir', 'fechar'], 'abrir-lista': ['abrir-lista', 'fino'],
  reenviar: ['reenviar', 'acao'], olho: ['olho', 'acao'], 'olho-riscado': ['olho-riscado', 'acao'],
  busca: ['busca', 'acao'], 'busca-de-pais': ['busca-de-pais', 'fino'], camera: ['camera', 'acao'], foto: ['foto', 'acao'],
  // T15/01: a seta do SUBINDO AGORA, ao lado do rótulo, com o traço do glifo, 2,2
  subindo: ['enviar', 'fechar'],
  // o check do escolhido (o país da T01/22, a foto do problema da T13/15) e o do requisito cumprido (T01/08 e 09)
  check: ['escolhido', 'fechar'], requisito: ['requisito-cumprido', 'fechar'], 'requisito-falta': ['requisito-pendente', 'fechar'],
  // o mundo real · T05/16 e 17: o Bluetooth riscado, no poço de 44 do bloco da busca que não começa
  'bluetooth-desligado': ['bluetooth-desligado', 'acao'],
  // T11/03: o registrar o diagnóstico, na folha Outras ações (o documento)
  diagnostico: ['documento', 'acao'],
  // T13/05: o ciclo dinâmico, no poço de 32 da ação da Seção E (a rota)
  ciclo: ['rota', 'acao'],
  // T01/16 e a folha 6: o xis de limpar do usuário lembrado, de 18, traço 2
  limpar: ['fechar-a-folha', 'limpar'],
  // T01/04 e 11: a seta que volta, do *Usar outro dado*
  'voltar-etapa': ['outro-canal', 'acao'],
  // fora das 201 telas, prontos no jogo (o 37b): o e-mail da linha de opção (folhas 2 e 6) e a câmera
  // sem a permissão (a T13 sem a câmera)
  email: ['email', 'acao'], 'camera-negada': ['camera-sem-permissao', 'acao'],
}

// tam: o lado do ícone, por token (--icone-*)
export function Icone({ nome, tam = 18, cor = 'secundaria', className = '' }) {
  const [desenho, classe] = ICONES[nome]
  return (
    <span aria-hidden="true" className={`ds-icone ds-icone-${classe} ds-icone-tam-${tam} ds-icone-cor-${cor} ${className}`}>
      <Desenho nome={desenho} />
    </span>
  )
}
