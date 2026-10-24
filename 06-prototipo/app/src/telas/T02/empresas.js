// A escolha da empresa (decisão 56; logica.md · O contexto é a empresa), em
// funções puras, sem React: a tela monta o quadro e responde a cada toque com
// elas, e `scripts/testar-empresa.mjs` as prova no node, com os textos do
// textos.md da T02.
// A tela tem dois quadros, a 00 (as empresas do técnico, nada escolhido) e o 01
// (a escolhida), e um caminho: tocar numa empresa a escolhe, e o `Sincronizar`
// leva à T03 com o pacote dela. O mundo é o do estado único (contexto.mundo,
// src/dados/empresas.js): no do herói, as três empresas de M.empresas; no de uma
// empresa só (o caso uma-empresa), a tela nem desenha — o app segue direto pra
// T03, com o pacote da única.
import { M } from '../../dados/mock.js'
import { idadeDoPacote } from '../../dados/formato.js'
import { HEROI, UMA_EMPRESA, empresasDo, variasEmpresas, pacoteDaEmpresa, contextoDaEmpresa } from '../../dados/empresas.js'
import { TX } from './textos.js'

export { HEROI, UMA_EMPRESA, empresasDo, variasEmpresas }

// o momento da tela (02-telas/T02-selecionar-contexto/referencias)
export const ESCOLHIDA = '01-momento-escolhida'

/** o rótulo de topo: quantas empresas ('3 EMPRESAS') */
export const rotuloDasEmpresas = (mundo) => TX.empresas(empresasDo(mundo).length)

/** a linha de cada empresa: o nome; embaixo, a idade do pacote que está no aparelho,
 *  com a hora — vencido, só a causa (formato.js · idadeDoPacote) —; à direita, os ativos
 *  que o pacote traz. A de pacote vencido também se escolhe: a T03 diz o que fazer */
export const linhasDasEmpresas = (mundo, escolhida) => empresasDo(mundo).map((e) => {
  const p = pacoteDaEmpresa(e.id)
  return {
    id: e.id, nome: e.nome, escolhida: e.id === escolhida,
    detalhe: idadeDoPacote(p.diasAtras, p.hora, p.limiares.bloqueioDias), valor: TX.ativos(p.contem.ativos),
  }
})

/** a escolhida quando a tela abre: a empresa do contexto, quando ele tem uma — o
 *  `Trocar de empresa` do pacote vencido e o da falha de rede com ele vencido (T03/04 e 05) voltam pra cá
 *  com a atual marcada (o 01) —; o 01 aberto pelo endereço, a do contexto do mock (a
 *  Viação); senão — o Entrar, o pulo do palco, o endereço da tela —, nenhuma (a 00) */
export function escolhidaAoAbrir(momento, contexto) {
  if (contexto?.empresaId) return contexto.empresaId
  if (momento === ESCOLHIDA) return M.contextoAtivo.empresaId
  return null
}

/** tocar numa empresa a escolhe; tocar noutra troca a marca, e tocar de novo não desmarca (R-14) */
export const escolher = (_escolhida, id) => id

/** o primário: apagado e desabilitado até a primeira escolha (Escolha uma empresa);
 *  com uma escolhida, Sincronizar — trocar a escolha não muda o texto */
export const primarioDe = (escolhida) => (escolhida ? { texto: TX.sincronizar, desabilitado: false } : { texto: TX.escolhaEmpresa, desabilitado: true })

/** a URL do quadro: o 01 com uma escolhida; a 00, sem momento */
export const momentoDe = (escolhida) => (escolhida ? ESCOLHIDA : null)

/** o Sincronizar: a empresa escolhida vai pro contexto, sem pacote — a T03 baixa o dela.
 *  O mundo fica como está no contexto */
export const contextoDoSincronizar = (contexto, escolhida) => contextoDaEmpresa(contexto, escolhida)

/** com uma empresa só, o app pula esta tela: o destino é a T03, com a única no
 *  contexto; com várias, nenhum (a tela fica) */
export function pulo(mundo, contexto) {
  if (variasEmpresas(mundo)) return null
  return { tela: 'T03', contexto: contextoDaEmpresa(contexto, empresasDo(mundo)[0].id) }
}

/** o voltar do Android (logica.md · O voltar do Android): nada. A tela não tem saída
 *  desenhada, e o Sincronizar é o ato, não a saída. Com o diálogo de outro usuário por
 *  cima (a T01/18), o Entendi, que a tela liga */
export const voltarDaTela = null
