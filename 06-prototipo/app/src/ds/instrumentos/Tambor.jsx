// O tambor (R-09): o número que rola no lugar. Uma roda de dígito por
// dígito do valor, sem zero à esquerda; o que não é dígito (o ponto do
// milhar) fica parado entre elas. Quando `valor` muda, cada roda rola do
// dígito de antes até o novo, sempre pra frente, a unidade primeiro — e ao
// fim o tambor volta a ser o número parado, igual à folha. Não rola ao abrir
// (movimento.md): só na troca de valor — ou, com `de`, uma vez, do `de` até o
// `valor`, pro momento que começa rolando (o semear da T10: de 87.604 até
// 87.712, no caminhão coletor). Na T07, a chegada do hodômetro é a troca de valor:
// o quadro de começo tem as rodinhas na casa 0 (`000.000`, as casas do lido),
// e a leitura que chega troca pro lido — nunca ao montar, e sem `de`, que é
// só pra peça que nasce no meio do movimento. Com reduzir movimento, mostra o
// número. Duas peles: `texto` (o
// valor em poço da T10) e `celulas` (o hodômetro da T07: uma célula por roda,
// a da unidade acesa, e a unidade).
import { useLayoutEffect, useRef, useState } from 'react'
import { RodaDigito } from './RodaDigito.jsx'
import './Tambor.css'

const eDigito = (c) => c >= '0' && c <= '9'
// os dígitos de um valor, da unidade pra esquerda
const digitosDe = (v) => [...String(v)].filter(eDigito).reverse().map(Number)

export function Tambor({ valor, de, pele = 'texto', unidade, nome }) {
  const texto = String(valor)
  const [rolagem, setRolagem] = useState(null) // { de: dígitos de antes, da unidade pra esquerda; rodada }
  const anterior = useRef(de != null ? String(de) : texto)
  const rodada = useRef(0)
  const paradas = useRef(0)
  useLayoutEffect(() => {
    if (anterior.current === texto) return
    rodada.current += 1; paradas.current = 0
    setRolagem({ de: digitosDe(anterior.current), rodada: rodada.current })
    anterior.current = texto
  }, [texto])

  const total = digitosDe(texto).length
  const aoParar = (e) => {
    if (e.animationName !== 'ds-roda-rola') return
    paradas.current += 1
    if (paradas.current >= total) setRolagem(null)
  }
  // cada caractere com a ordem da roda (0 = unidade)
  let resta = total
  const casas = [...texto].map((c) => (eDigito(c) ? { d: Number(c), ordem: --resta } : { c }))
  const roda = (x, i, p) => (
    <RodaDigito key={i} digito={x.d} ordem={x.ordem} pele={p} rodada={rolagem?.rodada}
      de={rolagem ? (rolagem.de[x.ordem] ?? 0) : null} />
  )

  if (pele === 'celulas') {
    return (
      <div className="ds-tambor-celulas" role="img" aria-label={nome ?? [texto, unidade].filter(Boolean).join(' ')} onAnimationEnd={aoParar}>
        {casas.filter((x) => x.c == null).map((x, i) => (
          <span key={i} className={`ds-tambor-celula ${x.ordem === 0 ? 'ds-tambor-celula-unidade' : ''}`}>{roda(x, i, 'celula')}</span>
        ))}
        {unidade != null && <span className="ds-tambor-unidade">{unidade}</span>}
      </div>
    )
  }
  if (!rolagem) return <span className="ds-tambor">{texto}</span>
  return (
    <span className="ds-tambor" onAnimationEnd={aoParar}>
      {casas.map((x, i) => (x.c != null ? x.c : roda(x, i, 'texto')))}
    </span>
  )
}
