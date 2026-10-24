// As peças da calibração (folha 8, T10) — a história da tela: o que o
// módulo conta, a distância até o painel e o número que vai.
import { useId, useLayoutEffect, useRef, useState } from 'react'
import { Glifo } from '../index.js'
import { Tambor } from './Tambor.jsx'
import '../cartoes/caixas.css'   // a caixa de poço é a do aviso e do par comparado
import '../entrada/TracoFoco.css'   // o traço de foco do valor alvo é o dos campos
import './Calibracao.css'

// O valor em poço: o que o módulo conta. O número é o tambor de texto:
// ao semear, ele rola do número do módulo até o do painel (na troca de
// `valor`, ou com `de` + `valor`). `tom`: 'apagado' antes de semear (tudo em
// --tinta-apagada), 'ativo' depois (T10/01) — e 'falha' (T10/10): a releitura que não confere, o número em vermelho (a falha mora no
// elemento que falhou, Lei 2), o rótulo e a unidade como no aceso.
export function ValorEmPoco({ rotulo, valor, de, unidade, tom = 'apagado' }) {
  return (
    <div className={`ds-valor-poco ds-caixa-poco ds-valor-poco-${tom}`}>
      <span className="ds-valor-poco-rotulo">{rotulo}</span>
      <span className="ds-valor-poco-numero">
        <Tambor valor={valor} de={de} />{unidade != null && <span className="ds-valor-poco-unidade">{unidade}</span>}
      </span>
    </div>
  )
}

// A régua da diferença: a distância entre os dois, entre dois traços. Depois
// da releitura, vira o "confere", com o check lima solto (Lei 4 · exceção) —
// ou, com `falha` (T10/10), o "não confere": o xis solto
// de 14 e a frase, os dois em vermelho.
// O movimento (T10 · animacao.md): montar não anima, e o texto que
// muda enquanto o técnico digita troca no lugar. O veredito que chega depois
// de montar (o semear: o confere, ou o não confere): a diferença encolhe no
// centro e esmaece, em --mov-lento, desacelerando, ainda no lugar dela; no
// fim, o veredito entra no lugar e esmaece em --mov-rapido, como todo check
// que nasce. Os traços acompanham o texto novo quando ele entra. Sem
// diferença escrita antes (só os traços), o veredito só esmaece. Com
// reduzir, tudo direto.
export function ReguaDiferenca({ children, confere = false, falha = false, nomeGlifo }) {
  const veredito = confere ? 'confere' : falha ? 'falha' : null
  const escrita = useRef(veredito == null ? children : null) // a última diferença desenhada
  const [troca, setTroca] = useState({ veredito, sai: null, entra: false })
  if (troca.veredito !== veredito) {
    const chega = veredito != null && troca.veredito == null
    const sai = chega && escrita.current != null && escrita.current !== '' ? escrita.current : null
    setTroca({ veredito, sai, entra: chega && sai == null })
  }
  useLayoutEffect(() => { if (veredito == null) escrita.current = children })
  const saiu = (e) => { if (e.animationName === 'ds-regua-sai') setTroca((t) => ({ ...t, sai: null, entra: true })) }

  let texto = <span className="ds-regua-texto">{children}</span>
  if (troca.sai != null) texto = <span className="ds-regua-texto ds-regua-sai" onAnimationEnd={saiu}>{troca.sai}</span>
  else if (confere) texto = <span className={`ds-regua-texto ds-regua-confere ${troca.entra ? 'ds-regua-entra' : ''}`}><Glifo estado="ok" poco={24} nome={nomeGlifo} />{children}</span>
  else if (falha) texto = <span className={`ds-regua-texto ds-regua-falha ${troca.entra ? 'ds-regua-entra' : ''}`}><Glifo estado="xis" poco={24} nome={nomeGlifo} />{children}</span>
  return (
    <div className="ds-regua">
      <span className="ds-regua-traco" />
      {texto}
      <span className="ds-regua-traco" />
    </div>
  )
}

// O valor alvo: o número do painel, o que vai pro módulo. O poço com o traço
// lima embaixo, o rótulo em lima (Lei 1: o campo em foco conta como
// escolhido), o número de 48 e a frase — é o campo do painel em foco (T10/05).
// Variantes (decisão 33):
// · `vazio` — o painel · vazio (folha 8): antes de digitar, o traço no lugar
//   do número em --marca-limite, o rótulo apagado e a borda do poço, sem o lima.
// · `cumprido` (T10/01) — o número fora do foco: sem o traço lima
//   (fica a borda do poço) e com o rótulo apagado. É o desenho do número
//   digitado quando o campo perde o foco (T10/07, 10) e do semeado (01, 09).
// · `foco` — o lima de volta por cima das duas, enquanto o campo tem o foco.
//   O foco é o do campo da T01: o traço de 2 de lima desenhado por cima
//   da borda de 1, acendendo da esquerda pra direita em 150 (TracoFoco.css), e
//   apagando ao contrário; o rótulo troca a cor direto. O poço não muda de
//   tamanho, e o número não sai do lugar. O foco é o que a tela diz.
// · `campo` — o poço inteiro é o campo do painel: um <input> numérico por cima
//   dele, sem desenho próprio (o que se vê é o número da peça, formatado pela
//   tela), com o rótulo como nome e a frase como descrição pro leitor de tela.
//   { valor, aoMudar, aoFocar, aoSair, ref } · o valor são os dígitos.
// · `corrigir` + `aoCorrigir` — o semeado que se corrige (decisão 64, T10/01 e 09): embaixo
//   da frase, o convite, no desenho do link dentro do conteúdo (folha 6), e o poço inteiro
//   se toca, e não só a frase — o toque abre o painel de novo (T10/12). Sem o `aoCorrigir`
//   (o quadro parado), o convite fica desenhado, sem toque.
export function ValorAlvo({ rotulo, valor, unidade, legenda, cumprido = false, vazio = false, foco = false, campo, corrigir, aoCorrigir }) {
  const id = useId()
  const aceso = foco || (!vazio && !cumprido)
  const classe = ['ds-valor-alvo', 'ds-caixa-poco', 'ds-traco-foco', aceso && 'ds-foco', vazio && 'ds-valor-alvo-vazio', cumprido && 'ds-valor-alvo-cumprido', foco && 'ds-valor-alvo-foco', aoCorrigir && 'ds-valor-alvo-tocavel']
    .filter(Boolean).join(' ')
  const Raiz = aoCorrigir ? 'button' : 'div'
  const tocavel = aoCorrigir ? { type: 'button', onClick: aoCorrigir, 'aria-label': `${corrigir} · ${String(rotulo).toLowerCase()} ${valor}${unidade != null ? ' ' + unidade : ''}` } : {}
  return (
    <Raiz className={classe} {...tocavel}>
      {campo
        ? <label htmlFor={`${id}c`} className="ds-valor-alvo-rotulo">{rotulo}</label>
        : <span className="ds-valor-alvo-rotulo">{rotulo}</span>}
      <span className="ds-valor-alvo-numero" aria-hidden={campo ? 'true' : undefined}>
        {valor}{unidade != null && <span className="ds-valor-alvo-unidade">{unidade}</span>}
      </span>
      {legenda != null && <span id={`${id}l`} className="ds-valor-alvo-legenda">{legenda}</span>}
      {corrigir != null && <span className="ds-valor-alvo-corrigir">{corrigir}</span>}
      {campo && (
        <input
          id={`${id}c`} ref={campo.ref} className="ds-valor-alvo-campo"
          type="text" inputMode="numeric" pattern="[0-9]*" autoComplete="off"
          value={campo.valor}
          onChange={(e) => campo.aoMudar?.(e.target.value.replace(/\D/g, ''))}
          onFocus={campo.aoFocar} onBlur={campo.aoSair}
          aria-describedby={legenda != null ? `${id}l` : undefined}
          readOnly={!campo.aoMudar}
        />
      )}
    </Raiz>
  )
}
