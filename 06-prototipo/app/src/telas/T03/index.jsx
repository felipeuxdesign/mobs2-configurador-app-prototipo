// T03 · Sincronizar (02-telas/T03-sincronizar): baixa o pacote da empresa
// escolhida e diz se dá pra trabalhar com ele. O pacote é o da empresa inteira
// (decisão 56): na Viação Atlântico Sul, 49 itens.
// · No fluxo, a sincronização sempre corre: um item por tick, nos cinco
//   grupos do pacote — Ativos → Conexões → Modelos de ativo → Eventos → Cercas,
//   os ativos primeiro —, 4 s no total (T03·1). O poço acompanha os
//   ativos (T03·5). A primeira baixa do pacote do caso sync-falha-rede (a
//   Expresso Caruaruense) cai no item do caso, e Reconectar segue de onde
//   parou. Ao terminar, o pacote novo vai pro estado único (T03·7) e a URL
//   passa a dizer 02.
// · A falha de rede diz o que fazer pelo pacote que está no aparelho (decisão
//   64): valendo, o link segue com ele, *Continuar com o pacote de ontem* (a 01);
//   vencido, o aviso diz que os ativos ficam indisponíveis, e o link é o Trocar
//   de empresa (a 05).
// · Os estados da coluna, parados: a 01 e a 05 pelos casos, a 03 e a 04 pela idade do
//   pacote (receitas.js · pacotes). O estado muda o conteúdo; onde a
//   referência remonta, ela é montada fiel.
// · No print (EM_QUADRO), a 00 para no quadro que a referência desenha.
import { useEffect, useRef, useState } from 'react'
import { BarraDoSistema, Rodape, Aviso, Nota, Lista, LinhaContagem, useTrocaDeQuadro } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import { Download, Concluido, Idade } from './Instrumentos.jsx'
import {
  empresaDe, pacoteDaEmpresa, pacotePorId, casoFalha, CASO_FALHA, CASO_FALHA_VALIDO, oPacoteDe, pacoteQueAvisa, pacoteQueBloqueia, avisa, bloqueia,
  ORDEM_LISTA, totalDe, tickMs, conteudos, faltam, versao, diaMes, HOJE, pacoteNovo, fimDaIdade,
} from './pacote.js'
import './T03.css'

const M02 = '02-momento-concluido'
const E01 = '01-estado-falha-de-rede'
const E03 = '03-estado-pacote-de-4-dias'
const E04 = '04-estado-pacote-vencido'
const E05 = '05-estado-falha-de-rede-sem-pacote-valido'
const MENU = { tipo: 'ir', tela: 'T04', momento: '01-momento-sem-modulo' } // T03·6: o menu antes de conectar
const CONTEXTO = { tipo: 'ir', tela: 'T02' }                                  // T03·6: o Trocar de empresa (o vencido, a 04, e a falha com ele, a 05)

// o quadro que a 00 desenha: a Viação no 6º item de 49 (6 de 24 ativos)
const QUADRO_00 = 6

const NOMES = { ativos: 'Ativos', conexoes: 'Conexões', modelosAtivo: 'Modelos de ativo', eventos: 'Eventos', cercas: 'Cercas' }
const TITULOS = { baixando: 'Baixando o pacote', falha: 'Baixando o pacote', concluido: 'Pacote de hoje', idade: 'Sincronizar' }

// o pacote que o aparelho tem da empresa, na forma do estado único (sementes.js)
const pacoteAtual = (p) => ({ id: p.id, diasAtras: p.diasAtras, hora: p.hora })

// o estado da coluna, montado pela receita: a 01 e a 05 pelos casos (o pacote e o
// item são os do caso: a Viação com o pacote valendo, a Expresso com ele vencido),
// a 03 pelo pacote que avisa, a 04 pelo que bloqueia
const falhaDoCaso = (k) => { const c = casoFalha(k); return { fase: 'falha', empresaId: pacotePorId(c.pacoteId).empresaId, baixados: c.falhaNoTick - 1 } }
function quadroDoEstado(estado) {
  if (estado === E01) return falhaDoCaso(CASO_FALHA_VALIDO)
  if (estado === E05) return falhaDoCaso(CASO_FALHA)
  if (estado === E03) return { fase: 'idade', empresaId: pacoteQueAvisa().empresaId, baixados: 0 }
  if (estado === E04) return { fase: 'idade', empresaId: pacoteQueBloqueia().empresaId, baixados: 0 }
  return null
}

// o quadro em que a tela abre no fluxo: o concluído (02) ou a baixa, do começo
// (ou, no print, no quadro da 00)
function inicio(momento, empresaId, contexto) {
  if (momento === M02) return { fase: 'concluido', empresaId, baixados: totalDe(pacoteDaEmpresa(empresaId)) }
  // no caminho: a empresa escolhida na T02 ou na folha do menu, cujo pacote no
  // aparelho é de 4 dias (a Transportes Capibaribe) ou vencido (a Expresso Caruaruense), pergunta
  // antes de baixar — os quadros do 03 e do 04: Sincronizar agora, ou Continuar com este pacote /
  // Trocar de empresa · o de ontem (a Viação) baixa direto
  if (!EM_QUADRO && !contexto?.pacote) {
    const p = pacoteDaEmpresa(empresaId)
    if (avisa(p) || bloqueia(p)) return { fase: 'idade', empresaId, baixados: 0 }
  }
  return { fase: 'baixando', empresaId, baixados: EM_QUADRO ? QUADRO_00 : 0 }
}

export default function T03({ momento, estado: est }) {
  const { estado, despachar } = useEstado()
  const empresaDoContexto = estado.contexto.empresaId ?? M.contextoAtivo.empresaId
  const [fluxo, setFluxo] = useState(() => inicio(momento, empresaDoContexto, estado.contexto))
  const vivo = useRef(null)
  vivo.current = { fluxo, estado }

  // o lugar mudou por fora — o painel pulou pra T03 (a semente inteira)
  // ou trocou o momento —: a tela volta ao quadro dele, e a baixa recomeça.
  // Não contam o que a própria tela despacha (`euLevei`: o 02 ao concluir, a
  // baixa que sai de um estado) nem a volta ao fluxo, que devolve o mesmo
  // instante guardado. Com um estado da coluna aberto, nada muda.
  const telaVista = useRef(estado.tela)
  const euLevei = useRef(false)
  useEffect(() => {
    if (est != null) return
    const deFora = estado.tela !== telaVista.current && !euLevei.current
    telaVista.current = estado.tela; euLevei.current = false
    if (deFora) setFluxo(inicio(momento, empresaDoContexto, estado.contexto))
  }, [estado.tela]) // eslint-disable-line react-hooks/exhaustive-deps

  // a empresa do contexto mudou com a tela montada: a baixa recomeça nela
  useEffect(() => {
    if (empresaDoContexto !== vivo.current.fluxo.empresaId) setFluxo(inicio(momento, empresaDoContexto, estado.contexto))
  }, [empresaDoContexto]) // eslint-disable-line react-hooks/exhaustive-deps

  // a sincronização anda um item por tick; para no print, num estado da coluna e fora da baixa
  const parado = EM_QUADRO || est != null || fluxo.fase !== 'baixando'
  useEffect(() => {
    if (parado) return undefined
    const p = pacoteDaEmpresa(fluxo.empresaId)
    const relogio = setInterval(() => {
      const { fluxo: f, estado: e } = vivo.current
      const proximo = f.baixados + 1
      const caso = casoFalha()
      if (p.id === caso.pacoteId && proximo === caso.falhaNoTick && !e.casosConsumidos.includes(CASO_FALHA)) {
        despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...e.casosConsumidos, CASO_FALHA] } })
        setFluxo({ ...f, fase: 'falha' })
        return
      }
      setFluxo({ ...f, baixados: proximo, fase: proximo >= totalDe(p) ? 'concluido' : 'baixando' })
    }, tickMs(p))
    return () => clearInterval(relogio)
  }, [parado, fluxo.empresaId, despachar])

  // concluído: o pacote novo vai pro estado único (T03·7) e a URL diz 02
  useEffect(() => {
    if (est != null || fluxo.fase !== 'concluido') return
    const novo = pacoteNovo(pacoteDaEmpresa(fluxo.empresaId)); const ctx = vivo.current.estado.contexto
    if (ctx.empresaId !== fluxo.empresaId || ctx.pacote?.versao !== novo.versao) despachar({ tipo: 'mesclar', parcial: { contexto: { ...ctx, empresaId: fluxo.empresaId, pacote: novo } } })
    if (momento !== M02) { euLevei.current = true; despachar({ tipo: 'ir', tela: 'T03', momento: M02 }) }
  }, [fluxo.fase, fluxo.empresaId, est]) // eslint-disable-line react-hooks/exhaustive-deps

  const q = quadroDoEstado(est) ?? fluxo
  const empresa = empresaDe(q.empresaId); const p = pacoteDaEmpresa(q.empresaId); const total = totalDe(p)

  // o movimento fino. A fase é o quadro: a baixa que termina (00 → 02), a que para
  // (00 → 01) e o Reconectar (01 → 00) trocam o título ou o rodapé inteiros, e o conteúdo
  // esmaece em 150, como entre telas; aberta pelo endereço, pelo palco ou
  // no print, parada. Dentro da baixa, a barra segue o passo e o check de cada
  // conteúdo nasce no poço (a LinhaContagem); a contagem e o *faltam* trocam no lugar
  useTrocaDeQuadro(q.fase)
  const c = conteudos(p, q.baixados)
  const { bloqueioDias } = p.limiares

  // os toques (T03·6). Num estado da coluna o celular não toca; se tocasse,
  // o quadro vira fluxo, na empresa dele.
  function baixar(empresaId, baixados) {
    const e = vivo.current.estado
    if (est != null || e.contexto.empresaId !== empresaId) {
      despachar({ tipo: 'mesclar', parcial: { contexto: { ...e.contexto, empresaId, pacote: pacoteAtual(pacoteDaEmpresa(empresaId)) } } })
      euLevei.current = true; despachar({ tipo: 'ir', tela: 'T03' })
    }
    setFluxo({ fase: 'baixando', empresaId, baixados })
  }
  function reconectar() {
    const e = vivo.current.estado
    if (!e.casosConsumidos.includes(CASO_FALHA)) despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...e.casosConsumidos, CASO_FALHA] } })
    baixar(q.empresaId, q.baixados)
  }
  function continuar() {
    despachar({ tipo: 'mesclar', parcial: { contexto: { ...vivo.current.estado.contexto, empresaId: q.empresaId, pacote: pacoteAtual(p) } } })
    despachar(MENU)
  }

  // O voltar do Android (logica.md): o link de saída do rodapé — na falha, o
  // Continuar com o pacote do aparelho, se ele vale (a 01), ou o Trocar de empresa, se
  // venceu (a 05); no vencido, o Trocar de empresa; no de 4 dias, o Continuar com este
  // pacote. No concluído, o Ir para o menu, a saída que ele tem (como a Sessão
  // encerrada da T16). Baixando, a tela não tem saída (não saia da tela): não faz
  // nada. O Trocar de empresa leva à T02 com a atual marcada (a empresa do contexto)
  const venceu = bloqueia(p)
  useVoltar((q.fase === 'falha' || q.fase === 'idade') && venceu ? () => despachar(CONTEXTO)
    : q.fase === 'falha' || q.fase === 'idade' ? continuar
      : q.fase === 'concluido' ? () => despachar(MENU)
        : null)

  // o bloco de cima: o instrumento da fase, ou a falha no lugar dele
  let instrumento
  if (q.fase === 'baixando') {
    instrumento = <Download rotulo="ATIVOS" feito={c.ativos.feito} de={c.ativos.de} unidade={`de ${c.ativos.de}`} segue={tickMs(p)}
      total={`${q.baixados} de ${total} no total`} faltam={`faltam ${faltam(p, q.baixados)}`} />
  } else if (q.fase === 'falha') {
    // com o pacote do aparelho vencido, o aviso diz também o que fica sem a baixa (a 05)
    const frase = `Nada se perdeu. Ao reconectar, continua de onde parou.${venceu ? ` O pacote que está no aparelho venceu: sem a baixa, os ${p.contem.ativos} ativos ficam indisponíveis.` : ''}`
    instrumento = <Aviso tom="falha" glifo="sem-sinal" mudo titulo="A BAIXA PAROU ONDE ESTAVA" frase={frase} />
  } else if (q.fase === 'concluido') {
    instrumento = <Concluido rotulo="BAIXADO AGORA" feito={total} unidade={`de ${total}`} frase={`o pacote vale por ${bloqueioDias} dias`} />
  } else {
    instrumento = <Idade rotulo="CARREGADO HÁ" dias={p.diasAtras} unidade="dias" fim={fimDaIdade(p)} limite={bloqueioDias} vencido={bloqueia(p)}
      legendas={{ inicio: '0', meio: `O LIMITE É ${bloqueioDias} DIAS`, fim: String(fimDaIdade(p)) }} />
  }

  // o bloco do meio: o que o pacote traz, ou o que a idade diz
  let conteudo = null
  if (q.fase === 'idade') {
    if (bloqueia(p)) conteudo = <Nota tom="explica" corpo="secundario" titulo="ENQUANTO NÃO SINCRONIZAR" frase={`Os ${p.contem.ativos} ativos desta empresa ficam indisponíveis. Nenhuma instalação pode começar.`} />
    else if (avisa(p)) conteudo = <Aviso tom="neutro" glifo="pausa" mudo titulo={`PACOTE DE ${p.diasAtras} DIAS`} frase={`Dá pra trabalhar. Depois de ${bloqueioDias} dias ele bloqueia: sincronize quando tiver rede.`} />
  } else {
    conteudo = (
      <Lista>
        {ORDEM_LISTA.map((k, i) => {
          const x = c[k]; const concluido = q.fase === 'concluido'
          return (
            <LinhaContagem key={k} nome={NOMES[k]} estado={concluido ? 'ok' : x.estado} divisoria={i < ORDEM_LISTA.length - 1}
              contagem={concluido ? String(x.de) : x.estado === 'espera' ? '—' : `${x.feito} de ${x.de}`}
              nomeGlifo={q.fase === 'falha' && x.estado === 'agora' ? 'parou' : undefined} />
          )
        })}
      </Lista>
    )
  }

  // a linha do pacote: a versão e o carimbo (T03·2 b). No concluído, o pacote
  // novo, de hoje; antes, o que está no aparelho
  const linhaPacote = q.fase === 'concluido'
    ? `pacote ${versao(p.empresaId, HOJE)} · ${diaMes(HOJE)} ${M.HORA_NOMINAL}`
    : `pacote ${versao(p.empresaId, p.data)} · ${diaMes(p.data)} ${p.hora}`

  let rodape
  if (q.fase === 'baixando') rodape = <Rodape primario="Baixando · não saia da tela" primarioDesabilitado />
  // a falha: o Reconectar continua de onde parou, e o link sai pelo pacote do aparelho (decisão 64) —
  // valendo, segue com ele pro menu; vencido, troca de empresa
  else if (q.fase === 'falha') rodape = venceu
    ? <Rodape primario="Reconectar" aoPrimario={reconectar} link="Trocar de empresa" aoLink={() => despachar(CONTEXTO)} />
    : <Rodape primario="Reconectar" aoPrimario={reconectar} link={`Continuar com ${oPacoteDe(p)}`} aoLink={continuar} />
  else if (q.fase === 'concluido') rodape = <Rodape primario="Ir para o menu" aoPrimario={() => despachar(MENU)} />
  else if (bloqueia(p)) rodape = <Rodape primario="Sincronizar agora" aoPrimario={() => baixar(q.empresaId, 0)} link="Trocar de empresa" aoLink={() => despachar(CONTEXTO)} />
  else rodape = <Rodape primario="Sincronizar agora" aoPrimario={() => baixar(q.empresaId, 0)} link="Continuar com este pacote" aoLink={continuar} />

  return (
    <div className="t03">
      <BarraDoSistema fundo="pagina" />
      <div className="tela-miolo">
        <div className="t03-cabeca">
          <span className="t03-cabeca-rotulo">{caixaAlta(empresa.nome)}</span>
          <h1 className="t03-cabeca-titulo">{TITULOS[q.fase]}</h1>
        </div>
        {instrumento}
        {conteudo}
        <span className="t03-pacote">{linhaPacote}</span>
      </div>
      {rodape}
    </div>
  )
}
