// T06 · Selecionar ativo (02-telas/T06-selecionar-ativo): escolher o ônibus que
// está na frente do técnico e vincular o módulo a ele, na empresa (decisão 46).
// Vem depois do diagnóstico (T07), com a sessão já aberta e a faixa *sem ativo*.
// A lista são os ônibus do pacote da empresa do contexto (na Viação, os 24 do
// mock, e o miolo rola). Tocar num deles o marca, e o 'Usar este ativo' leva à
// confirmação do vínculo (R-14; T06·1 b), que checa, nesta ordem, o
// pacote, os pinos e o vínculo (T06·3, com o vínculo no lugar do chassi):
//   · fora do pacote → a trava, sem pedir cadastro (04): o ônibus de outra empresa,
//     que a busca acha pela placa (o caso ativo-fora-pacote)
//   · o par da faixa é o caso de pinos → a trava, erro de projeto de instalação (06) ·
//     sem cabo, trocar o meio nunca resolve, e não há o com saída (05)
//   · o vínculo: o módulo fica neste ativo (01) — o escolhido em cima e os dados
//     do modelo embaixo, placa, frota, fabricante e modelo, sem chassi —; o
//     módulo em outro ativo, com o aviso (10); o módulo que já é deste ativo, a
//     manutenção (11). O 10 e o 11 são os casos do vínculo, que caem no par do
//     herói e abrem só pela coluna, nunca pelo serial: no fluxo, o vínculo
//     é sempre novo — a instalação nova, o padrão
// O vínculo decide o modo, sem pergunta ao técnico (logica.md · O vínculo decide
// o modo): o modo e o desvínculo ficam no registro do vínculo, etapas.ativo, que
// zera com a sessão; a T09 abre no que vai ser gravado (05) na instalação nova,
// e no escolher o bloco (08) na manutenção.
// A busca que não acha nenhum ônibus do pacote mostra o vazio declarado, com o
// termo no título (08, T06·5). Enquanto a busca
// esconde o ônibus marcado, o primário espera, e
// a URL diz o 09. Com um termo na busca, a instrução
// sai: embaixo do campo fica o que a busca achou, a lista ou o vazio, como a 08
// e a 09 desenham. A busca não se refaz.
// O último grupo antes do rodapé não tem margem: a folga é só a da coluna, os 16
// do recheio do miolo (como as referências desenham): a lista do pacote
// (00), que rola. Onde o último bloco é o que cresce (os dados do modelo, 01, 10
// e 11, e a trava, 04 a 06), ele segue com os 16 dele, como as referências desenham.
import { Fragment, useEffect, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Busca, Lista, LinhaOnibus, BlocoEscolhido,
  Aviso, DadosDoModelo, Rodape, Vazio, useTrocaDeQuadro, useReorganiza,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { empresaDoContexto, empresasDo, mundoDo } from '../../dados/empresas.js'
import {
  REF, ativoDe, modeloDe, doPacote, contagemDoPacote, ativoDoModulo, filtrar, placaDeOutroPacote,
  avaliar, mundoDoEstado, dadosDoModelo,
} from './dados.js'
import './t06.css'

// os termos que as referências 08 e 09 desenham digitados (textos.md): o endereço do momento abre com eles
const TERMO_DA_08 = 'ABC-1234'
const TERMO_DA_09 = 'PCX'
// os dois quadros da busca, e a URL que diz cada um
const DA_BUSCA = [REF.semResultado, REF.esconde]
const nadaCom = (termo) => `Nada com “${termo}”`

export default function T06({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const sessaoFluxo = unico.sessao ?? SEMENTES.T06.sessao
  const empresaFluxo = empresaDoContexto(unico.contexto).id

  // num estado da coluna, o mundo é o do caso (receitas.js); no fluxo, o do estado único
  const doEstado = est ? mundoDoEstado(est, { sessao: sessaoFluxo, empresaId: empresaFluxo }) : null
  const sessao = doEstado?.sessao ?? sessaoFluxo
  const empresaId = doEstado?.empresaId ?? empresaFluxo

  // o ônibus escolhido: o do caso, o do módulo da sessão (a 01 aberta pela URL) ou nenhum (a lista)
  const [escolhido, setEscolhido] = useState(() => doEstado?.ativoId ?? (momento === REF.confirmar ? ativoDoModulo(empresaFluxo, sessaoFluxo) : null))
  const [busca, setBusca] = useState(momento === REF.semResultado ? TERMO_DA_08 : momento === REF.esconde ? TERMO_DA_09 : '')
  // na lista, tocar num ônibus o marca, e o 'Usar este ativo' leva à confirmação
  // (T06·1 b). Aberta pelo 09, o
  // marcado é o ônibus do módulo da sessão (RKT-8H42), como o 01, e a busca da
  // referência (PCX) o esconde
  const [marcado, setMarcado] = useState(() => (momento === REF.esconde ? ativoDoModulo(empresaFluxo, sessaoFluxo) : null))

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const escolher = (id) => { setEscolhido(id); ir('T06', { momento: REF.confirmar }) }
  const escolherOutro = () => { setEscolhido(null); setMarcado(null); ir('T06') }
  const voltarAoMenu = () => ir('T04')
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar antes de terminar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar()

  // a busca filtra ao digitar; a placa de um ônibus de outra empresa abre a trava dele (T06·5 a)
  const buscar = (texto) => {
    setBusca(texto)
    const fora = placaDeOutroPacote(texto, empresaId)
    if (fora) escolher(fora.id)
  }

  const ativo = escolhido ? ativoDe(escolhido) : null
  // o caso do vínculo só vale no estado que o trouxe (10, 11): depois do Escolher outro, a lista
  // volta ao fluxo, sem o caso, como nos pinos
  const prova = ativo ? avaliar(ativo, { empresaId, sessao }, doEstado?.desde, doEstado?.vinculo) : null

  // o movimento. A troca de quadro: a lista que vira *Confirmar o vínculo*, e a
  // volta, trocam o desenho inteiro, e o conteúdo esmaece em 150, como entre telas — os dados do
  // modelo, e o aviso do vínculo no 10 e no 11, chegam com ele (o que nasce com o quadro não
  // esmaece de novo). A trava que o leitor sem fio resolve (05 → 01) também é outro quadro: o
  // rodapé e o bloco trocam. A lista se reorganiza quando a busca filtra: o que fica
  // desliza, o que sai esmaece por cima, o que volta esmaece no lugar; na confirmação, a chave
  // null diz que o quadro não é a lista (a placa de outro pacote abre a trava pela troca de
  // quadro, sem a lista andar por cima). Aberto pela URL, pelo palco, num estado ou no print,
  // parado. O rodapé nasce com o quadro (a chave, lá embaixo): entre quadros, só a troca
  // esmaece, e a camada do primário que acendeu logo antes não segue por dentro dela
  const quadro = ativo ? `${ativo.id}·${prova.passo}` : 'lista'
  useTrocaDeQuadro(quadro)
  const lugar = useReorganiza(ativo ? null : busca)

  // a lista do pacote, filtrada pela busca. Sem nenhum ônibus, o vazio declarado
  // no lugar da instrução e da lista, e o primário espera, como a 08 desenha; o
  // ônibus marcado fica guardado e volta com a lista
  const lista = ativo ? [] : filtrar(doPacote(empresaId), busca)
  const semResultado = !ativo && busca.trim() !== '' && lista.length === 0
  // a busca que acha outros ônibus e esconde o marcado: o primário espera, e
  // acende de novo quando o marcado volta à lista
  const marcadoAVista = marcado != null && lista.some((a) => a.id === marcado)
  const esconde = !ativo && !semResultado && marcado != null && !marcadoAVista
  // a URL diz o quadro da busca: o 08 enquanto ela não acha nada, o 09 enquanto
  // ela acha outros e esconde o marcado; a que volta a achar, ou devolve o
  // marcado, tira o momento. Num estado da coluna, nada anda
  const quadroDaBusca = semResultado ? REF.semResultado : esconde ? REF.esconde : null
  useEffect(() => {
    if (est) return
    if (quadroDaBusca && momento !== quadroDaBusca) despachar({ tipo: 'ir', tela: 'T06', momento: quadroDaBusca })
    else if (!quadroDaBusca && DA_BUSCA.includes(momento)) despachar({ tipo: 'ir', tela: 'T06', momento: null })
  }, [est, quadroDaBusca, momento, despachar])

  // O voltar do Android (logica.md): o link de saída do rodapé — na lista e na
  // busca sem resultado (00, 08), o Voltar ao menu; na confirmação do vínculo
  // (01), nos avisos do vínculo (10, 11) e no conflito com saída (05), o Escolher
  // outro, que volta à lista. Nas travas sem link (04, 06), o Escolher outro do
  // primário, a saída que elas têm
  useVoltar(!ativo ? voltarAoMenu : escolherOutro)

  // o vínculo confirmado: o ativo entra na sessão, e o registro do vínculo fica em
  // etapas.ativo — o modo, que o vínculo decide (instalação nova, o padrão, ou
  // manutenção), o desvínculo, quando houve, e a hora, 14:30. Segue pra T09, que
  // abre pelo modo: o que vai ser gravado (05) ou o escolher o bloco (08)
  const vincular = (registro) => {
    despachar({ tipo: 'mesclar', parcial: {
      sessao: { ...sessao, ativoId: ativo.id },
      etapas: { ...unico.etapas, ativo: { ativoId: ativo.id, ...registro, as: M.HORA_NOMINAL } },
    } })
    ir('T09')
  }

  const faixa = (
    <Faixa serial={sessao.moduloSerial} placa="sem ativo" semAtivo acao="ENCERRAR" aoEncerrar={enc.encerrar} />
  )

  let miolo, rodape
  if (!ativo) {
    // ── 00 · a lista do pacote · 08 · a busca sem resultado · 09 · a busca que esconde o marcado ──
    // com um termo na busca, a instrução sai, e embaixo do campo fica o que ela achou (a 08 e a 09)
    const buscando = busca.trim() !== ''
    miolo = (
      <>
        <CabecalhoConteudo titulo="Selecionar ativo" contagem={contagemDoPacote(unico.contexto, empresaId)} unidade="no pacote" />
        <Busca dica="Buscar placa, frota ou módulo" valor={busca} aoMudar={buscar} focado={semResultado || esconde} />
        {semResultado ? (
          <Vazio titulo={nadaCom(busca.trim())} frase="Confira a placa, ou busque pela frota." />
        ) : (
          <>
            {!buscando && <span className="t06-instrucao">Escolha o veículo que está na sua frente.</span>}
            <Lista className="t06-lista">
              {lista.map((a, i) => (
                <LinhaOnibus key={a.id} placa={a.placa} modelo={modeloDe(a).nome} rotuloFrota="FROTA" frota={a.frota}
                  divisoria={i < lista.length - 1} escolhido={a.id === marcado} aoTocar={() => setMarcado(a.id)} />
              ))}
            </Lista>
          </>
        )}
      </>
    )
    // o Usar este ativo acende por uma camada quando passa a valer com o mesmo texto — o ônibus que se
    // marca, e o marcado que a busca devolve —, como todo primário que acende
    // na frente de quem olha; o que a busca esconde apaga direto
    rodape = <Rodape primario="Usar este ativo" primarioDesabilitado={!marcadoAVista} primarioAcende aoPrimario={() => escolher(marcado)} link="Voltar ao menu" aoLink={voltarAoMenu} />
  } else {
    const titulo = <CabecalhoConteudo titulo="Confirmar o vínculo" />
    const { passo } = prova

    if (passo === 'fora' || passo === 'sem-saida') {
      // ── 04 · 06 · a trava mora no escolhido (não há o 05, com saída) ──
      const detalhe = `frota ${ativo.frota} · ${modeloDe(ativo).nome}`
      const { caso } = prova
      const trava = {
        // de quem ele é, com o artigo de *a empresa*: *Pertence à Expresso Caruaruense.* · e o caminho de
        // verdade: a empresa é uma das do técnico, e é trocar de empresa (pelo nome no topo do menu, T04/07) ·
        // o cadastro está certo, e nada de pedir cadastro (HU-T06-5) · a empresa que não é dele, sem referência,
        // diz a quem recorrer, como as outras travas: *Acione o gestor.*
        fora: { rotulo: 'FORA DO PACOTE DESTA EMPRESA', falha: true, motivo: [`Pertence à ${prova.empresa}.`,
          empresasDo(mundoDo(unico.contexto)).some((e) => e.id === prova.empresaId) ? 'É uma das suas empresas: troque de empresa pra instalar nele.' : 'Acione o gestor.'] },
        // só o fio ocupado — sem *porta*, e sem o leitor sem fio, que sugeriria uma saída que não existe
        'sem-saida': caso && { rotulo: 'ERRO DE PROJETO DE INSTALAÇÃO', falha: true, motivo: [`O ${caso.fio} já está ocupado.`, 'Acione o gestor.'] },
      }[passo]
      miolo = (
        <>
          {titulo}
          <BlocoEscolhido className="t06-antes-do-rodape" rotulo={trava.rotulo} falha={trava.falha} tom={trava.tom}
            identidade={ativo.placa} detalhe={detalhe} motivo={trava.motivo} />
        </>
      )
      rodape = <Rodape primario="Escolher outro" aoPrimario={escolherOutro} />
    } else {
      // ── 01 · 10 · 11 · o vínculo: o escolhido em cima, a frota sem o modelo, e os dados do modelo embaixo ──
      // o estado muda o conteúdo: o aviso do vínculo entra antes do escolhido (10, 11), e a frase
      // e o primário dizem o que o vínculo faz; o escolhido e os dados são os mesmos
      const serial = sessao.moduloSerial
      // a empresa do contexto: a do pacote em que o ônibus está
      const empresa = empresaDoContexto(unico.contexto).nome
      const { fabricante, modelo } = dadosDoModelo(ativo)
      const { caso } = prova
      const vinculo = passo === 'outro-ativo' ? {
        // o desvínculo é um fato da sessão, sem tela — fica no registro do vínculo, com a hora
        // vincular aqui zera o módulo de um ônibus que funciona: a frase pede pra conferir a etiqueta antes (decisão 64)
        aviso: { titulo: `O ${serial} ESTÁ NO ${prova.onde.placa}`, frase: `Confira se o módulo na sua mão é o ${serial}: vincular aqui desfaz o vínculo antigo, e o desvínculo fica registrado.` },
        frase: `O ${serial} passa a ficar neste ativo, na ${empresa}.`,
        primario: 'Desvincular e vincular aqui',
        registro: { modo: 'instalacao', desvinculo: { ativoId: caso.vinculadoAoAtivoId, as: M.HORA_NOMINAL } },
      } : passo === 'ja-deste' ? {
        aviso: { titulo: `O ${serial} JÁ É DESTE ATIVO`, frase: 'É manutenção: você reenvia um bloco por vez.' },
        frase: 'O vínculo já existe — nada muda nele.',
        primario: 'Seguir pra manutenção', registro: { modo: caso.modo },
      } : {
        frase: `O ${serial} fica neste ativo, na ${empresa}.`,
        primario: 'Vincular o módulo', registro: { modo: 'instalacao' },
      }
      miolo = (
        <>
          {titulo}
          {vinculo.aviso && <Aviso tom="neutro" glifo="info" titulo={vinculo.aviso.titulo} frase={vinculo.aviso.frase} />}
          <BlocoEscolhido justo rotulo="ESCOLHIDO" identidade={ativo.placa} detalhe={`frota ${ativo.frota}`} />
          <DadosDoModelo antesDoRodape frase={vinculo.frase}
            dados={[{ rotulo: 'FABRICANTE', valor: fabricante }, { rotulo: 'MODELO', valor: modelo }]} />
        </>
      )
      rodape = <Rodape primario={vinculo.primario} aoPrimario={() => vincular(vinculo.registro)} link="Escolher outro" aoLink={escolherOutro} />
    }
  }

  return (
    <div className="t06">
      <BarraDoSistema veu={enc.veu} />
      {faixa}
      <div ref={lugar} className="tela-miolo t06-miolo">{miolo}</div>
      <Fragment key={quadro}>{rodape}</Fragment>
      {enc.sobre}
    </div>
  )
}
