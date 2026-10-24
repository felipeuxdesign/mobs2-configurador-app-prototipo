// O indicador de rolagem do sistema. O celular não mostra a
// barra do navegador (base.css); quem mostra que a tela rola é este indicador,
// como no Android: fino, por cima do conteúdo, sem ocupar lugar, enquanto rola,
// e some depois de --rolagem-espera. Um só pro app inteiro: ele ouve a rolagem
// de qualquer coisa dentro do app (na captura) e se põe na borda direita dela.
// As medidas são de layout (offsetTop), então valem com o celular em escala.
import { useEffect, useState } from 'react'
import './Rolagem.css'

const token = (nome) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(nome))
// o tempo do token, em ms: o build de produção escreve o 900ms como .9s
const tempo = (nome) => { const v = getComputedStyle(document.documentElement).getPropertyValue(nome).trim(); const n = parseFloat(v); return Number.isFinite(n) ? (/ms$/.test(v) ? n : n * 1000) : 0 }

export function Rolagem({ raiz }) {
  const [ind, setInd] = useState(null)
  useEffect(() => {
    const app = raiz.current
    if (!app) return undefined
    let espera = null
    const rolou = (e) => {
      const el = e.target
      if (!(el instanceof HTMLElement) || el === app || !app.contains(el)) return
      const { scrollTop, scrollHeight, clientHeight, clientWidth } = el
      if (scrollHeight <= clientHeight + 1) return
      let top = 0, left = 0, n = el
      while (n && n !== app) { top += n.offsetTop; left += n.offsetLeft; n = n.offsetParent }
      if (n !== app) return
      const recuo = token('--rolagem-recuo'), minimo = token('--rolagem-minimo')
      const trilho = clientHeight - 2 * recuo
      const altura = Math.max(minimo, (trilho * clientHeight) / scrollHeight)
      const pos = recuo + ((trilho - altura) * scrollTop) / (scrollHeight - clientHeight)
      setInd({ top: top + pos, right: app.clientWidth - (left + clientWidth) + recuo, height: altura, visivel: true })
      clearTimeout(espera)
      espera = setTimeout(() => setInd((i) => (i ? { ...i, visivel: false } : i)), tempo('--rolagem-espera'))
    }
    app.addEventListener('scroll', rolou, true)
    return () => { app.removeEventListener('scroll', rolou, true); clearTimeout(espera) }
  }, [raiz])
  if (!ind) return null
  return <span aria-hidden="true" className={`ds-rolagem ${ind.visivel ? 'ds-rolagem-visivel' : ''}`} style={{ top: ind.top, right: ind.right, height: ind.height }} />
}
