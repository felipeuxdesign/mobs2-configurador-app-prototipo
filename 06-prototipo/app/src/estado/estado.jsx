// O estado único do protótipo (06-prototipo/logica.md). Toda tela lê daqui.
// Nasce com a forma completa que as 16 telas pedem, pra
// nenhuma tela inventar campo depois. Os valores vêm do mock na hora de
// montar — nada é copiado pra dentro dos componentes.
import { createContext, useContext, useReducer } from 'react'
import { M } from '../dados/mock.js'
import { SEMENTES } from './sementes.js'
import { consultaDa } from '../palco/telas.js'

export function estadoVazio() {
  return {
    tecnico: { nome: M.tecnico.nome, usuario: M.credenciais.usuario },
    // o contexto é a empresa (decisão 56): empresaId, a que o Sincronizar da T02 grava (ou a
    // folha Trocar de empresa do menu) · pacote: { id, diasAtras, hora, versao }, o dela, que a
    // T03 baixa · mundo: o das empresas do técnico — sem ele, o do herói, com três; 'uma-empresa',
    // o caso de quem tem uma só, em que o app pula a T02 (src/dados/empresas.js)
    contexto: { empresaId: null, pacote: null, mundo: null },
    sessao: null,                                     // { moduloSerial, ativoId, saude, abertaAs, meio }
    etapas: {
      preChecagem: null, ativo: null, can: null, cadeia: null, conferencia: null,
      calibracao: null, ciclo: null, checklist: null, encerramento: null,
    },
    fila: [],                                         // os itens que a sessão cria, além de M.filaSaida
    reenviados: [],                                   // os ids que o Ressincronizar e reenviar devolveu à fila (T15 · estado/fila.js)
    // usuarioLembrado: o que o celular lembra do login (HU-T01-3, só o identificador) —
    // nenhum no começo; o Entrar com a caixa marcada guarda, o xis esquece (T01/regras.js).
    // jaEntrou: o Entrar já entrou uma vez desde o começo do palco — dali em diante, o
    // login só traz o que o celular lembra: a 16 com o usuário lembrado, a 15 sem ele.
    // outraSessao: o Entrar com outro usuário depois de uma sessão neste aparelho — o
    // usuário anterior e os itens da fila dele —, que a T02 mostra no diálogo até o Entendi (T01/18)
    situacao: { rede: M.situacao.rede, sessaoAcesso: M.situacao.sessaoAcesso, usuarioLembrado: null, jaEntrou: false, outraSessao: null },
    casosConsumidos: [],                              // cada caso vale uma vez por sessão
    avisoDoAcessoVisto: false,                        // o aviso do acesso vencendo já foi fechado no Entendi (logica.md · O aviso do acesso)
    tela: { id: 'T01', momento: null, estado: null, folha: null },
    antes: null,                                      // o instante de antes de abrir um estado
    geracao: 0,                                       // sobe a cada pulo do palco: o App remonta a tela
  }
}

// Pular direto pra uma tela (o painel, a URL) monta o estado mínimo dela.
export function semeado(tela, extra = {}) {
  const base = estadoVazio()
  // A fotografia conserva a semente da referência. O palco abre o caminho normal.
  const normal = extra.fluxo && !extra.estado && !extra.momento
  const s = normal && (tela === 'T10' || tela === 'T11') ? SEMENTES.T09 : SEMENTES[tela] ?? {}
  return {
    ...base,
    contexto: s.contexto ?? base.contexto,
    sessao: s.sessao ?? base.sessao,
    etapas: { ...base.etapas, ...s.etapas },
    tela: { ...base.tela, id: tela, momento: extra.momento ?? null, estado: extra.estado ?? null },
  }
}

function reduzir(estado, acao) {
  switch (acao.tipo) {
    // os pulos do palco trocam o estado inteiro: a geração sobe, e a tela remonta do zero
    case 'recomecar': return { ...estadoVazio(), geracao: estado.geracao + 1 }
    case 'ir': return { ...estado, antes: null, tela: { id: acao.tela, momento: acao.momento ?? null, estado: acao.estado ?? null, folha: null } }
    case 'pular': return { ...semeado(acao.tela, { fluxo: true }), geracao: estado.geracao + 1 }
    // abrir um estado guarda o instante; trocar de estado não troca o instante guardado
    case 'abrir-estado': {
      const consulta = consultaDa(estado.tela.id, acao.estado)
      const quadro = consulta ? semeado(estado.tela.id, { estado: acao.estado }) : estado
      return { ...quadro, geracao: estado.geracao + 1, antes: estado.antes ?? { ...estado, antes: null }, tela: { ...quadro.tela, estado: acao.estado, momento: null } }
    }
    case 'voltar-ao-fluxo': return { ...(estado.antes ?? semeado(estado.tela.id, { fluxo: true })), geracao: estado.geracao + 1 }
    case 'mesclar': return { ...estado, ...acao.parcial }
    default: return estado
  }
}

const Contexto = createContext(null)

export function EstadoProvider({ children, inicial }) {
  const [estado, despachar] = useReducer(reduzir, inicial ?? estadoVazio())
  return <Contexto.Provider value={{ estado, despachar }}>{children}</Contexto.Provider>
}

export function useEstado() {
  const v = useContext(Contexto)
  if (!v) throw new Error('useEstado fora do EstadoProvider')
  return v
}
