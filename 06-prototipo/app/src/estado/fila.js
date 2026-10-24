// A fila de saída que o app mostra, num lugar só: a do mock (M.filaSaida)
// mais o que a sessão criou (estado único, `fila`), com os itens que o
// técnico devolveu à fila no `Ressincronizar e reenviar` da T15 (estado
// único, `reenviados`). Quem lê a fila — a T15, o menu e o login — lê daqui, pra o
// item reenviado contar igual em todos (T15).
// Nada é criado: o item muda de estado, e o mock fica intocado.
import { M } from '../dados/mock.js'

// os estados de erro que o Ressincronizar devolve à fila (T15/00 e 02)
export const ERROS_DA_FILA = ['erro-recusa', 'erro-rede']

// o item como o app o vê agora: reenviado, o erro volta pra fila, 'na-fila'
export const comoEsta = (f, reenviados = []) =>
  (ERROS_DA_FILA.includes(f.estado) && reenviados.includes(f.id) ? { ...f, estado: 'na-fila' } : f)

// a fila do mock inteira mais a da sessão, cada item como está — a que a folha Trocar de
// empresa do menu olha pra ver se uma evidência está subindo (T04/08)
export const filaDoMundo = (unico) => [...M.filaSaida, ...(unico.fila ?? [])].map((f) => comoEsta(f, unico.reenviados))

// a fila do aparelho (decisão 42): a da entrada (M.filaDoAparelho, o recorte que a T15/00
// desenha) mais tudo o que a sessão criou, cada item como está. É a que a T15 mostra no
// fluxo e a que o contador do cartão da Fila de saída do menu conta. É do aparelho, e não
// da empresa: trocar de empresa não muda nada nela
const itemDoMock = (id) => M.filaSaida.find((f) => f.id === id)
export const filaDoAparelho = (unico) =>
  [...M.filaDoAparelho.map(itemDoMock), ...(unico.fila ?? [])].map((f) => comoEsta(f, unico.reenviados))

// o que ainda não chegou ao servidor, na fila do aparelho: o recebido e o recebido em conflito
// chegaram (o servidor aceitou; o conflito só avisa o gestor). É o número do cartão da Fila de
// saída do menu, e o que o diálogo de sair (T04/06 e 20) e o de outro usuário (T01/18) dizem —
// o mesmo fato se diz igual (decisão 64). Na entrada, 2: o f-10 recusado e o f-02 na fila
export const naoChegouDoAparelho = (unico) =>
  filaDoAparelho(unico).filter((f) => f.estado !== 'recebida' && f.estado !== 'recebida-em-conflito')
