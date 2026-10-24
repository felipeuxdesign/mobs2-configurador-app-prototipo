// O item da seção aberta do checklist (folha 7 ·
// decisão 34). Tem seta, toca; sem seta, é leitura (Lei 16). Quatro tipos,
// e a ação da seção, que é o de tocar com o ícone do que ela abre:
//   leitura  · 44, o glifo no poço de 30, o nome em --tinta-forte e o valor à
//              direita — o que o app conferiu, sem seta, não toca (A, C, D, os
//              passos da E, a F). `apagado`: o valor que ainda não veio, em
//              --tinta-apagada ('a fazer', 'espera o envio') · reprovado, com
//              `aoTocar`: o valor em --vermelho e a seta, e a linha toca (o
//              automático reprovado abre o detalhe · T13/16) ·
//              `linhas` (o cartão com a correção pedida da T13/27):
//              embaixo do nome, uma linha por fato, a primeira em --vermelho
//              ({ texto, tom: 'falha' }); a linha cresce, a 6 em cima e embaixo
//   tocar    · 50, o ícone no poço de 32 (a câmera, o ciclo), o nome e a
//              legenda empilhados, e a seta: o cartão inteiro é o toque
//   feito    · 50, o check no poço de 32, o nome e de onde veio; sem seta
//   ressalva · o feito que passou com a ressalva, e diz ela embaixo
// O poço na linha (leis de medida): 44 leva 30, 50 leva 32; o glifo e o ícone
// de 16 nos dois (o glifo do poço de 26, como a folha desenha).
// estado (leitura, feito): o glifo pelo dado — ok · pendente (o círculo em
//   --tinta-secundaria) · aguarda (o relógio em --marca-limite) · reprovado ·
//   nsa (o traço, não se aplica)
// icone (tocar): o nome do Icone; sem ele, o glifo do `estado` no poço.
// divisoria: o traço de baixo — quem monta a seção decide (a última não tem).
// Três variantes da leitura (T13/38 a 42), sem desenho novo:
// · estado `lendo`: o quadrado de agora no poço e o valor em --tinta (a Seção D lida bloco a bloco)
// · `acao`: no lugar do valor, o que o técnico toca na própria linha (o Testar bip, 05 e 39 a 40)
// · `embaixo`: o que a linha abre embaixo dela — a pergunta com as duas respostas (40) e o campo
//   do que aconteceu (42) —, a 40 da esquerda (o poço e o vão) e 12 no pé; o traço de baixo
//   passa pro bloco inteiro
// A Montagem no formato das outras seções (T13/02 e 12, lei 23):
// · `icone` na leitura: o ícone no poço de 30 no lugar do glifo (a câmera da foto a tirar)
// · `valorDeEstado`: o valor é o estado do item, não um dado lido — em --t-secundario e
//   --tinta-secundaria (*foto a tirar*, *com ressalva*)
// Dois estados da leitura (T13/04 e 43), sem token novo:
// · `espera`: o que só acontece depois — o Autoteste, que roda ao encerrar e não conta —, o
//   relógio e o valor em --tinta-secundaria, no 700 da leitura
// · `revisar`: o bloco deixado para depois — o relógio em --tinta-secundaria, as `linhas` com
//   *revisar em seguida* em --tinta (`tom: 'forte'`) e o motivo, e o Reenviar na `acao`; a linha
//   cresce a 8 em cima e embaixo
// A resposta que se refaz (decisão 64, T13/41, 42, 49 e 50), sem desenho novo:
// · `resposta` ({ texto, tom }): o item respondido, com a ação — a resposta desce pra baixo do
//   nome, em 12/500 a 1 dele (em --tinta-secundaria, ou --vermelho com `tom: 'falha'`), o nome
//   em --tinta, e o botão da linha fica à direita, na `acao` (*Testar de novo*, *Disparar de novo*)
// · `destaque: 'nome'`: o nome em --tinta e o valor em --tinta-secundaria — a Posição que confere
//   ao lado do evento que não chegou (T13/49)
// · `className`: a medida que a tela pede pra linha (o evento da Seção F, de 52, T13/49)
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { useVez } from '../primitivos/vez.js'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import { Icone } from '../primitivos/Icone.jsx'
import './ItemDoChecklist.css'

const GLIFO = { ok: 'ok', pendente: 'espera', aguarda: 'relogio', reprovado: 'xis', nsa: 'traco', lendo: 'agora', espera: 'relogio', revisar: 'horario' }   // o revisar em seguida é o relógio do horário (T13/43)

function GlifoDoItem({ estado, nomeGlifo }) {
  return <Glifo estado={GLIFO[estado] ?? 'ok'} poco={26} nome={nomeGlifo} className={`ds-item-ck-glifo ds-item-ck-glifo-${estado}`} />
}

export function ItemDoChecklist({ tipo = 'leitura', estado = 'ok', icone, nome, valor, legenda, linhas, apagado = false, divisoria = true, aoTocar, rotulo, nomeGlifo, acao, embaixo, valorDeEstado = false, resposta, destaque, className = '' }) {
  // a resposta que troca depois de montar (o não ouvi que passa a contar, 42 → 50) esmaece no lugar; a que nasce já assim, parada
  const vezDaResposta = useVez(resposta?.texto)
  if (embaixo) {
    return (
      <div className={`ds-item-ck-bloco ${divisoria ? '' : 'ds-item-ck-sem-divisoria'}`}>
        <ItemDoChecklist tipo={tipo} estado={estado} icone={icone} nome={nome} valor={valor} legenda={legenda} apagado={apagado}
          divisoria={false} rotulo={rotulo} nomeGlifo={nomeGlifo} acao={acao} resposta={resposta} destaque={destaque} className={className} />
        <div className="ds-item-ck-embaixo">{embaixo}</div>
      </div>
    )
  }
  const classes = `ds-item-ck ds-item-ck-${tipo === 'leitura' ? 'leitura' : 'dupla'} ${linhas ? 'ds-item-ck-com-linhas' : ''} ${estado === 'revisar' ? 'ds-item-ck-revisar' : ''} ${divisoria ? '' : 'ds-item-ck-sem-divisoria'} ${estado === 'lendo' ? 'ds-item-ck-lendo' : ''} ${destaque === 'nome' ? 'ds-item-ck-destaque-nome' : ''} ${className}`
  if (tipo === 'leitura') {
    const linha = (
      <>
        <Poco tam={30}>{icone ? <Icone nome={icone} tam={16} cor="secundaria" /> : <GlifoDoItem estado={estado} nomeGlifo={nomeGlifo} />}</Poco>
        {resposta
          ? (
            <span className="ds-item-ck-respondido">
              <span className="ds-item-ck-nome">{nome}</span>
              <span key={vezDaResposta.vez} className={`ds-item-ck-resposta ${resposta.tom === 'falha' ? 'ds-item-ck-resposta-falha' : ''} ${vezDaResposta.vez > 0 ? 'ds-item-ck-resposta-nasce' : ''}`}>{resposta.texto}</span>
            </span>
          )
          : linhas
            ? (
              <span className="ds-item-ck-pilha">
                <span className="ds-item-ck-nome">{nome}</span>
                {linhas.map((l) => <span key={l.texto} className={`ds-item-ck-linha ${l.tom === 'falha' ? 'ds-item-ck-linha-falha' : l.tom === 'forte' ? 'ds-item-ck-linha-forte' : ''}`}>{l.texto}</span>)}
              </span>
            )
            : <span className="ds-item-ck-nome">{nome}</span>}
        {acao ?? (valor != null && <span className={`ds-item-ck-valor ${apagado ? 'ds-item-ck-valor-apagado' : ''} ${estado === 'reprovado' ? 'ds-item-ck-valor-falha' : ''} ${valorDeEstado ? 'ds-item-ck-valor-estado' : ''} ${estado === 'espera' ? 'ds-item-ck-valor-espera' : ''}`}>{valor}</span>)}
      </>
    )
    if (!aoTocar) return <div className={classes}>{linha}</div>
    return (
      <Tocavel className={`${classes} ds-item-ck-tocar`} rotulo={rotulo ?? [nome, valor, ...(linhas ?? []).map((l) => l.texto)].filter(Boolean).join(', ')} aoTocar={aoTocar}>
        {linha}
        <Icone nome="avancar" tam={16} cor="secundaria" />
      </Tocavel>
    )
  }
  const miolo = (
    <>
      <Poco tam={32}>{icone ? <Icone nome={icone} tam={16} cor="secundaria" /> : <GlifoDoItem estado={estado} nomeGlifo={nomeGlifo} />}</Poco>
      <span className="ds-item-ck-texto">
        <span className="ds-item-ck-titulo">{nome}</span>
        {legenda && <span className="ds-item-ck-legenda">{legenda}</span>}
      </span>
    </>
  )
  if (tipo === 'tocar') {
    return (
      <Tocavel className={`${classes} ds-item-ck-tocar`} rotulo={rotulo ?? [nome, legenda].filter(Boolean).join(', ')} aoTocar={aoTocar}>
        {miolo}
        <Icone nome="avancar" tam={16} cor="secundaria" />
      </Tocavel>
    )
  }
  // feito e ressalva: o mesmo desenho, sem seta e sem toque
  return <div className={classes}>{miolo}</div>
}
