// A escala (folha 5): a barra em poço. A faixa diz onde o valor deveria
// estar, o marcador diz onde ele está (Lei 5). Tudo se posiciona pela conta
// do valor na escala — min, max, a faixa e os riscos —, nunca por % copiado.
// A faixa só tem borda do lado que fica dentro da escala: a faixa aberta pra
// cima não tem a da direita, e a que cobre a escala inteira não tem nenhuma.
// No prazo e no placar a faixa é o preenchido (de min até o valor, Lei 6).
// O marcador para na borda: no fim da escala ele encosta por dentro.
//
// O movimento (movimento.md · só transform): montar nunca anima — a
// escala nasce no valor, parada. O que anda é a troca de valor depois de
// montar, e só quando quem usa pede:
// · `segue` (ms) — o processo que anda em passos: a baixa da
//   T03, o prazo da T14, o envio da T15. A cada passo, o marcador e o
//   preenchido vão de onde estão até o valor novo, lineares, no tempo do passo
//   (o ritmo, de ritmos.js) vezes o --mov-fator. Com reduzir, o fator é 0: a
//   barra salta pro valor de cada passo, e o processo segue no mesmo ritmo.
// · `corre` — a leitura que chega (T07 · animacao.md): o marcador
//   corre de onde estava (o começo da escala, no quadro de começo)
//   até o valor, em --mov-lento, desacelerando. Com reduzir, aparece no valor.
// O marcador anda por translateX da agulha (a camada da largura da escala) e
// o preenchido por scaleX a partir da borda de começo; parados, nenhum dos
// dois tem transform, e o layout é sempre o do valor novo. Se um passo chega
// com o anterior ainda andando, o novo parte de onde o olho vê — sem salto.
import { useLayoutEffect, useRef, useState } from 'react'
import './Escala.css'

const noIntervalo = (v, a, b) => Math.min(b, Math.max(a, v))
const perto = (a, b) => Math.abs(a - b) < 1e-9
// o que a animação em curso ainda desloca (o translateX da agulha, o scaleX do preenchido)
const emCurso = (el) => { const t = el ? getComputedStyle(el).transform : 'none'; return new DOMMatrixReadOnly(!t || t === 'none' ? undefined : t) }

export function Escala({
  min, max, valor, faixa,
  divisoes, marcas, fortes = [],
  tam = 'leitura', falha = false, corre = false, segue,
  semLados = false, // T03: a barra do download, o desenho do placar sem as bordas dos lados
  vazia = false,    // T07: o poço vazio do sinal que não chegou — só o traço no meio (T07/02)
}) {
  // a posição é a conta exata do valor na escala, sem arredondar
  const pct = (v) => (100 * (noIntervalo(v, min, max) - min)) / (max - min)
  const de = faixa ? (faixa.de ?? min) : null
  const ate = faixa ? (faixa.ate ?? max) : null
  const pos = !vazia && valor != null ? pct(valor) : null
  const pDe = !vazia && faixa ? pct(de) : null
  const pAte = !vazia && faixa ? pct(ate) : null

  // o movimento: o que o último quadro desenhou, e o trecho que anda agora
  const move = corre || segue != null
  const raiz = useRef(null), agulha = useRef(null), preenchido = useRef(null)
  const visto = useRef(null)
  const [anda, setAnda] = useState(null) // { rodada, desde: px da agulha, escala: do preenchido }
  useLayoutEffect(() => {
    const antes = visto.current
    visto.current = { pos, de: pDe, ate: pAte }
    if (!move || !antes || !raiz.current) return
    const largura = raiz.current.clientWidth // por dentro das bordas: o 100% da agulha e do preenchido
    let desde = null, escala = null
    if (pos != null && antes.pos != null && antes.pos !== pos && agulha.current) {
      const m = agulha.current.firstChild?.offsetWidth ?? 0
      const lugar = (p) => Math.min((p / 100) * largura, largura - m)
      desde = lugar(antes.pos) + emCurso(agulha.current).m41 - lugar(pos)
    }
    // o preenchido anda da borda de começo (o prazo, o placar, o envio); a faixa esperada não anda
    if (pAte != null && antes.ate !== pAte && preenchido.current && (antes.de == null || antes.de === pDe) && pAte > pDe) {
      const era = antes.ate != null ? (antes.ate - pDe) * emCurso(preenchido.current).a : 0
      escala = Math.max(0, era) / (pAte - pDe)
    }
    if (desde == null && escala == null) return
    setAnda((a) => ({ rodada: (a?.rodada ?? 0) + 1, desde, escala }))
  }, [pos, pDe, pAte, move])

  if (vazia) {
    return (
      <div className={`ds-escala ds-escala-${tam} ds-escala-vazia`} aria-hidden="true">
        <span className="ds-escala-vazia-traco" />
      </div>
    )
  }
  // os riscos: n divisões iguais da escala, ou os valores dados
  const riscos = divisoes
    ? Array.from({ length: divisoes - 1 }, (_, i) => min + ((i + 1) * (max - min)) / divisoes)
    : marcas ?? []
  // a animação reinicia trocando de nome (a e b), sem remontar nada
  const vez = anda ? (anda.rodada % 2 ? 'a' : 'b') : null
  const ritmo = segue != null ? 'ds-escala-segue' : ''
  return (
    <div ref={raiz} className={`ds-escala ds-escala-${tam} ${falha ? 'ds-escala-falha' : ''} ${semLados ? 'ds-escala-sem-lados' : ''}`} aria-hidden="true"
      style={segue != null ? { '--ds-escala-passo': `${segue}ms` } : undefined}>
      {faixa && (
        <div
          ref={preenchido}
          className={`ds-escala-faixa ${de > min ? 'ds-escala-faixa-de' : ''} ${ate < max ? 'ds-escala-faixa-ate' : ''} ${anda?.escala != null ? `ds-escala-enche-${vez} ${ritmo}` : ''}`}
          style={{ '--de': pDe, '--ate': pAte, ...(anda?.escala != null && { '--ds-escala-escala': anda.escala }) }}
        />
      )}
      {riscos.map((r) => (
        <span
          key={r}
          className={`ds-escala-risco ${fortes.some((f) => perto(f, r)) ? 'ds-escala-risco-forte' : ''}`}
          style={{ '--p': pct(r) }}
        />
      ))}
      {valor != null && (
        <div ref={agulha} className={`ds-escala-agulha ${anda?.desde != null ? `ds-escala-anda-${vez} ${ritmo}` : ''}`}
          style={{ '--pos': pos, ...(anda?.desde != null && { '--ds-escala-desde': `${anda.desde}px` }) }}>
          <div className="ds-escala-marcador" />
        </div>
      )}
    </div>
  )
}
