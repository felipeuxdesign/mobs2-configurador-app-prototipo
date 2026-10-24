// T01 · Login. A tela abre no quadro do momento ou do estado que o palco
// pede. Quando um toque leva a um momento com referência, a URL passa a
// dizê-lo, e a tela não remonta. Remonta só quando o pedido vem de fora — um
// estado aberto pela coluna, a volta ao fluxo, o painel pulando pra T01, o
// Recomeçar —, e abre no quadro que o pedido diz.
//
// O estado 18 (outro usuário no aparelho) não é um quadro do
// login: é o que vem depois do Entrar — a T02, com o diálogo *Outra sessão neste
// aparelho* por cima. Aberto pela coluna, a T01 monta a T02 com o que o caso
// outro-usuario diz, com as empresas atrás, como a 18 desenha, parada e sem toque, como todo
// estado; no fluxo, o diálogo nasce do Entrar (Login.jsx · entrar) e mora na própria
// T02, por cima da entrada dela — as empresas, nada escolhido (a 00).
import { useCallback, useRef } from 'react'
import { useEstado } from '../../estado/estado.jsx'
import { Login, REF } from './Login.jsx'
import { outraSessaoDoCaso } from './regras.js'
import T02 from '../T02/index.jsx'

export default function T01({ momento, estado }) {
  const { estado: unico, despachar } = useEstado()
  const vista = useRef(unico.tela)   // o lugar que a tela já viu
  const pediu = useRef(false)        // a troca seguinte foi pedida pela própria tela
  const geracao = useRef(0)
  if (unico.tela !== vista.current) {
    if (!pediu.current) geracao.current += 1
    pediu.current = false
    vista.current = unico.tela
  }
  const irMomento = useCallback((m) => {
    pediu.current = true
    despachar({ tipo: 'ir', tela: 'T01', momento: m ?? null })
  }, [despachar])
  if (estado === REF.outroUsuario) return <T02 estado={estado} outraSessao={outraSessaoDoCaso()} />
  return <Login key={`${estado ?? 'fluxo'}·${geracao.current}`} momento={momento} estado={estado} irMomento={irMomento} />
}
