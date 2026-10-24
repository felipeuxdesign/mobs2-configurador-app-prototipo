// A seção do checklist (folhas 4 e 7 · decisão 34):
// UM componente, fechado e aberto. O cartão de 58 diz o veredito no poço de
// 32, o nome da seção, quem age embaixo dele, a contagem e a seta. Tocar faz
// o cartão crescer no lugar: aberto, a seta vira pra cima e os itens entram
// embaixo da cabeça, atrás de uma divisória, com 12 dos lados.
//
// estado — o veredito da seção, pelo dado (Lei 3: muda o conteúdo, não o lugar):
//   aprovada  → o check lima
//   pendente  → o círculo em --tinta-secundaria: é o técnico que resolve
//   aguarda   → o relógio em --marca-limite: espera o servidor (a F)
//   reprovada → o X vermelho
// quemAge: a linha de 12 embaixo do nome ('o app confere sozinho', 'você
//   fotografa 4 itens'…). Sem ela (com 1, o texto não existe), só o nome.
// feitos, de: a contagem, '4' e 'de 4', como o título da tela.
// nomeGlifo: o nome do glifo pro leitor, pelo estado do dado.
// Os itens (ItemDoChecklist) vêm como filhos, e só se desenham aberto.
//
// O movimento (T13 animacao.md): abrir não anima altura. Aberto por um toque,
// os itens esmaecem no lugar em --mov-padrao e a seta gira pra cima; as seções
// de baixo descem pela SecoesDoChecklist (transform). Nascer aberta (a URL, o
// print, a coluna) não anima: a entrada da tela nunca anima.
import { useState } from 'react'
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import { Icone } from '../primitivos/Icone.jsx'
import './SecaoDoChecklist.css'

// `lendo`: a Seção D enchendo enquanto o módulo é lido (T13/38), com o quadrado de agora
const GLIFO = { aprovada: 'ok', pendente: 'espera', aguarda: 'relogio', reprovada: 'xis', lendo: 'agora' }

export function SecaoDoChecklist({ estado = 'pendente', titulo, quemAge, feitos, de, aberta = false, aoTocar, rotulo, nomeGlifo, children }) {
  // só a abertura por um toque esmaece os itens, nunca a abertura da tela
  const [antes, setAntes] = useState(aberta)
  const [abriu, setAbriu] = useState(false)
  if (antes !== aberta) { setAntes(aberta); setAbriu(aberta) }
  const nome = rotulo ?? [titulo, quemAge, feitos != null ? `${feitos} ${de ?? ''}`.trim() : null].filter(Boolean).join(', ')
  return (
    <div className={`ds-secao-ck ${aberta ? 'ds-secao-ck-aberta' : ''} ds-secao-ck-${estado}`}>
      <Tocavel className="ds-secao-ck-cabeca" rotulo={nome} aoTocar={aoTocar} aria-expanded={aberta}>
        <Poco tam={32}><Glifo estado={GLIFO[estado]} poco={30} nome={nomeGlifo} className="ds-secao-ck-glifo" /></Poco>
        <span className="ds-secao-ck-texto">
          <span className="ds-secao-ck-titulo">{titulo}</span>
          {quemAge && <span className="ds-secao-ck-quem">{quemAge}</span>}
        </span>
        {feitos != null && (
          <span className="ds-secao-ck-contagem">{de != null ? `${feitos} ` : feitos}{de != null && <span className="ds-secao-ck-de">{de}</span>}</span>
        )}
        <Icone nome="avancar" tam={16} cor="secundaria" className="ds-secao-ck-seta" />
      </Tocavel>
      {aberta && <div className={`ds-secao-ck-corpo ${abriu ? 'ds-secao-ck-corpo-entra' : ''}`}>{children}</div>}
    </div>
  )
}
