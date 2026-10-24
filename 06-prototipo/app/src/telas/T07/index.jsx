// T07 · Diagnóstico do módulo (02-telas/T07-diagnostico-do-modulo, decisões 44, 59 e 61):
// logo depois da conexão, o que o módulo informa — as nove linhas de
// M.diagnostico.modulo, oito que contam e as mensagens, que só informam —, e, depois
// que o bloco do ativo é gravado, o que a CAN do modelo do ativo lê: a biblioteca
// dele, seis sinais que contam (14 = 8 + 6). Antes disso a CAN não aparece, e a tela
// cabe sem rolar (decisão 61). Substitui a pré-checagem da T05 e os Dados da CAN.
//
// Os quadros do fluxo:
// · a chegada da T05 (a sessão nasceu no Conectar, sem faixa): as nove linhas
//   acendem uma a cada RITMOS.diagnosticoLinhaMs, depois da troca entre telas.
//   Enquanto lê: a linha que lê com o quadrado de agora e *lendo*, as
//   que esperam com o relógio e o traço, e o rodapé *Lendo · não saia da tela* —
//   os quadros da 10, a mesma tela e o mesmo processo (o
//   começo da leitura do módulo não tem referência). Sem a faixa, o módulo
//   fica em cima do título: o serial e a placa do ativo que o cadastro prevê
// · as nove passam sem trava: a sessão aparece — a faixa desce de cima (a peça,
//   Faixa `ausente`) —, e a tela é a 00 (8 de 8, ou a 07, com o modem que
//   só informa, 7 de 8). Fica gravado etapas.preChecagem, com o nome de hoje,
//   porque a T13 e a T12 leem assim, e com as mensagens que o módulo ainda não enviou
// · uma trava (02, 03, 04, 05): a faixa não desce, e o rodapé dá a saída dela.
//   `Procurar outro módulo` desfaz a sessão que não chegou a aparecer e volta à
//   T05/01, a lista sem nada escolhido. `Atualizar firmware` (04) e `Gravar a
//   conexão` (05, que grava só a conexão, isolada, e o firmware atualiza por ela)
//   levam à 06: o quadro dos 62% (CASOS[firmware-fora-matriz].atualizacao) por
//   RITMOS.firmwareAtualizacaoMs (1 s, o ritmo dela), e o diagnóstico recomeça das nove,
//   com o firmware disponível (8.04); o voltar não faz nada, e não há ENCERRAR (a faixa não desceu)
// · com o bloco do ativo gravado: a tela abre com a CAN lida, a 01 — o
//   módulo numa linha só, *Conferido na conexão*, e a lista da CAN do modelo do
//   ativo, depois do bloco do módulo. Ao vivo, só a rotação e a temperatura trocam o
//   número no lugar. Grava etapas.can { lida }. `Ler de novo` relê a CAN (10), uma linha a
//   cada RITMOS.diagnosticoLinhaMs, e volta à 01; relendo, o ENCERRAR fica apagado
//   (a lei 17, a logica.md · diferença conhecida da referência: o PNG da 10 o desenha aceso)
// · com o ativo escolhido e antes da cadeia (o menu depois da T06), a 00 com a
//   placa na faixa e só o `Voltar ao menu` — o Selecionar ativo não cabe com o
//   ativo preso na sessão (sem referência)
//
// Aberta pela URL, pelo palco, num estado da coluna ou no print, a tela fica
// parada no quadro da referência. Os momentos de processo (06 e 10) pela URL
// abrem no quadro deles e seguem dali; no print, param.
//
// Os estados (receitas.js), cada um pelo seu caso, montados e parados: 02
// serial-nao-cadastrado, 03 modelo-sem-driver, 04 firmware-fora-matriz, 05
// firmware-sem-rede-no-modulo, 07 modem-sem-sinal (só informa) — o módulo do caso,
// na conexão —, 08 can-estatico-ausente e 09 can-estatico-isolado (135 °C) — a CAN
// lida do ativo do caso, 13 de 14. O estado muda o conteúdo, nunca o desenho: a falha
// mora na linha que falhou.
//
// As linhas (lei 23): o módulo na linha de 50 (a medida da linha de conferência,
// LinhaChecagem 'diagnostico'), a CAN e o *Conferido na conexão* na lista longa de
// 44 ('longa'); as travas sem saída escrita — o serial fora do cadastro (02) e o
// modelo sem suporte (03) — abrem com o aviso, entre o cabeçalho e o módulo, como
// as travas da T09; o topo do serial fora do cadastro só o identifica.
//
// O movimento (animacao.md): a faixa que nasce (a peça); a linha que lê, o poço
// com o quadrado de agora; a leitura que chega, o glifo e o valor esmaecendo no
// lugar (a LinhaChecagem percebe sozinha); o contador troca no lugar; o texto do
// primário que troca esmaece no lugar, com o roxo direto.
import { useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, Rodape, CabecalhoConteudo, Lista, LinhaChecagem, Aviso, ESTADOS, useFimDaTroca,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { T } from './textos.js'
import {
  REF, TOTAL, LIDAS, LINHA_FIRMWARE, CASO_MAL_ENCERRADA, QUADRO_11, CASO_FIRMWARE, CASO_SEM_REDE, CASO_NAO_TERMINOU, QUADRO_10, NA_CAN,
  ativoDe, ativoPrevisto, serialDoCaso, casosDoEstado, casosDoModulo, contextoDe, rotuloDeTopo, faltas, avisoDaTrava,
  resultados, mensagensLidas, sinaisDoModelo, tituloDaCan, leituraDaCan, canLidaNoFluxo, sessaoDo,
} from './diagnostico.js'
import './t07.css'

// com reduzir movimento (o --mov-lento vale 0), a CAN ao vivo para no último valor
const reduzMovimento = () => (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mov-lento')) || 0) === 0

// as linhas do módulo que as referências desenham com 54, com a frase embaixo do nome:
// a alimentação e as mensagens (o GPS, com os satélites embaixo, fica nos 50 — diferença conhecida da referência).
// Esperando, sem a frase, a alimentação volta aos 50 (a 06); as mensagens ficam nos 54, com o traço embaixo
const ALTAS = ['alimentacao', 'mensagens']

// a lista da T05, sem nada escolhido: aonde o Procurar outro módulo leva
const T05_LISTA = '01-momento-nenhum-escolhido'

// o quadro: o módulo (serial; undefined = o da sessão), o ativo (undefined = o
// da sessão; null = sem ativo), se a CAN está lida (o módulo numa linha só),
// quantas das nove já terminaram, a porcentagem do firmware que atualiza, quantos
// sinais da CAN a releitura já leu (null = todos), e os casos que valem
// `parou`: a porcentagem em que a atualização do firmware parou sem terminar (a 14)
const quadro = (q) => ({ serial: undefined, ativoId: undefined, can: false, feitas: LIDAS, atualizando: null, parou: null, lidos: null, casos: [], ...q })

// o diagnóstico deste módulo já está no estado único (a semente da T07 o traz:
// o módulo do herói, com os oito que contam certos)
const conferido = (pc, serial) => pc != null && (pc.moduloSerial == null || pc.moduloSerial === serial)

// o quadro em que a tela abre, pelo momento da URL e pelo estado único
function inicio(momento, unico) {
  const s = unico.sessao ?? SEMENTES.T07.sessao
  if (momento === REF.atualizando) {
    const caso = M.casos[CASO_FIRMWARE]
    return quadro({ serial: serialDoCaso(CASO_FIRMWARE), ativoId: null, feitas: LINHA_FIRMWARE, atualizando: caso.atualizacao.quadroPct })
  }
  if (momento === REF.canLida || momento === REF.relendo) {
    return quadro({ ativoId: s.ativoId ?? ativoPrevisto(s.moduloSerial)?.id ?? null, can: true, lidos: momento === REF.relendo ? QUADRO_10 : null })
  }
  // a 11: a leitura do módulo do herói, sem ativo, parada no quadro dela
  if (momento === REF.lendo) return quadro({ serial: SEMENTES.T07.sessao.moduloSerial, ativoId: null, feitas: QUADRO_11 })
  if (canLidaNoFluxo(unico)) return quadro({ can: true })
  // a chegada da T05: a sessão sem ativo, e o diagnóstico deste módulo ainda não feito — ele lê
  // agora. Com o ativo na sessão (o pulo do palco pra uma tela de depois, que semeia só a sessão),
  // o módulo já passou: a faixa, que já estava lá, não some
  const corre = !EM_QUADRO && !s.ativoId && !conferido(unico.etapas.preChecagem, s.moduloSerial)
  return quadro({ feitas: corre ? 0 : LIDAS, casos: casosDoModulo(s.moduloSerial, unico.casosConsumidos) })
}

// os estados da coluna, montados pela receita e parados: o módulo do caso, na
// conexão (02 a 07, 12, 13), ou a CAN lida do ativo do caso (08, 09)
function quadroDoEstado(est) {
  // a 06 também abre pela coluna, parada, logo depois da 04 (`depoisDe`)
  if (est === REF.atualizando) {
    const caso = M.casos[CASO_FIRMWARE]
    return quadro({ serial: serialDoCaso(CASO_FIRMWARE), ativoId: null, feitas: LINHA_FIRMWARE, atualizando: caso.atualizacao.quadroPct })
  }
  // toda espera tem fim (decisão 64): a atualização que parou nos 62% da 06 e não terminou (a 14)
  if (est === REF.naoTerminou) return quadro({ serial: serialDoCaso(M.casos[CASO_NAO_TERMINOU].base), ativoId: null, feitas: LINHA_FIRMWARE, parou: M.casos[CASO_NAO_TERMINOU].parouEmPct })
  const casos = est ? casosDoEstado(est) : null
  if (!casos) return null
  const k = casos[0]
  if (NA_CAN[k]) {
    const a = ativoDe(M.casos[k].ativoId)
    return quadro({ serial: a.moduloSerial, ativoId: a.id, can: true, casos })
  }
  return quadro({ serial: serialDoCaso(k), ativoId: null, casos })
}

export default function T07({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const [fluxo, setFluxo] = useState(() => inicio(momento, unico))
  const vivo = useRef(null)
  vivo.current = { estado: unico, momento }
  const q = quadroDoEstado(est) ?? fluxo
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  // o caso que acontece agora fica consumido na sessão; num estado da coluna, nada se grava
  const consumir = (...ids) => {
    const e = vivo.current.estado
    const novos = ids.filter((k) => !e.casosConsumidos.includes(k))
    if (est == null && novos.length) despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...e.casosConsumidos, ...novos] } })
  }

  // ── o módulo e o ativo do quadro ──
  const sessao = unico.sessao ?? SEMENTES.T07.sessao
  const serial = q.serial ?? sessao.moduloSerial
  const ativoId = q.ativoId !== undefined ? q.ativoId : sessao.ativoId
  const ativo = ativoId ? ativoDe(ativoId) : null

  // ── as nove linhas: as que terminaram dizem o resultado; a que corre mostra o
  // quadrado de agora; as outras esperam, com o relógio apagado e o traço ──
  const c = contextoDe(serial, est != null ? [] : unico.casosConsumidos)
  const res = resultados(c, q.casos)
  const espera = q.atualizando != null || q.parou != null   // o firmware atualizando, ou parado no meio
  const corre = !q.can && !espera && q.feitas < LIDAS
  const concluido = !q.can && !espera && q.feitas >= LIDAS
  const trava = res.some((r) => r.estado === 'reprovada')
  const passou = concluido && !trava
  const linhas = res.map((r, i) => {
    if (q.atualizando != null && i === LINHA_FIRMWARE) return { ...r, estado: 'agora', valor: T.atualizandoPct(q.atualizando), causa: undefined, nota: undefined, glifo: undefined }
    // a que parou: onde parou embaixo do nome, e o não terminou no lugar do valor, com o xis (a 14)
    if (q.parou != null && i === LINHA_FIRMWARE) return { ...r, estado: 'reprovada', valor: T.naoTerminou, causa: T.parouEm(q.parou), nota: undefined, glifo: undefined }
    if (i < q.feitas) return r
    if (i === q.feitas && corre) return { ...r, estado: 'agora', valor: T.lendo, causa: undefined, nota: undefined, glifo: undefined }
    // a que espera: o relógio e o traço · a das mensagens, o traço embaixo do nome; o número do
    // chip, sem nada à direita (como a 11 desenha) · na atualização do firmware (a 06), as mensagens
    // esperam só com o nome, nos mesmos 54 (como a 06 desenha: diferença conhecida entre a 06 e a 11)
    const vazio = r.soInforma
      ? (espera ? { valor: undefined, nota: undefined, alta: true } : { valor: undefined, nota: T.vazio })
      : { valor: r.id === 'chip' ? undefined : T.vazio, nota: undefined }
    return { ...r, estado: 'ainda-nao', ...vazio, causa: undefined, glifo: 'relogio' }
  })
  const aprovadas = linhas.filter((l) => l.estado === 'aprovada' && !l.soInforma).length

  // ── a CAN lida: o módulo numa linha só, com o que a conexão conferiu ──
  const sinais = q.can && ativo ? sinaisDoModelo(ativo.modeloAtivoId) : null
  const leitura = sinais ? leituraDaCan(sinais, q.casos) : null
  const relendo = q.can && q.lidos != null
  // A CAN ao vivo: com a CAN lida, os sinais que mudam de verdade com o motor ligado
  // (os que têm `leituras` no mock: a rotação e a temperatura) trocam o número no lugar a cada
  // 1 s, sem transição — é o dado chegando, não animação (CLAUDE.md). O hodômetro, o horímetro,
  // o combustível e o consumo total ficam parados: o ônibus está parado, e o consumo total é
  // acumulado. Parados também no print, num estado da coluna, no Ler de novo e com reduzir movimento
  const aoVivo = q.can && !relendo && !!sinais && est == null && !EM_QUADRO
  const [leituraN, setLeituraN] = useState(0)
  useEffect(() => {
    if (!aoVivo || reduzMovimento()) return undefined
    const t = setInterval(() => setLeituraN((n) => n + 1), RITMOS.canAoVivoMs)
    return () => clearInterval(t)
  }, [aoVivo])
  const linhasCan = (leitura ?? []).map((r, i) => {
    const s = sinais[i]
    if (aoVivo && !relendo && r.estado === 'aprovada' && s?.leituras?.length) return { ...r, valor: s.leituras[leituraN % s.leituras.length] }
    if (!relendo || i < q.lidos) return r
    if (i === q.lidos) return { ...r, estado: 'agora', valor: T.lendo, causa: undefined, nota: undefined }
    return { ...r, estado: 'ainda-nao', valor: T.vazio, causa: undefined, nota: undefined, glifo: 'relogio' }
  })
  // o que a conexão conferiu: no fluxo, o que ficou gravado pra este módulo; num estado, ou sem registro, os oito
  const pc = est == null && conferido(unico.etapas.preChecagem, serial) ? unico.etapas.preChecagem : null
  const modTotal = pc?.checagens ?? TOTAL
  const modAprovadas = pc?.aprovadas ?? pc?.passaram ?? TOTAL

  // a CAN conta os seis sinais: 8 + 6 = 14 (13 de 14 com um sinal que reprova; 11 de 14 relendo, na temperatura)
  const contagem = q.can ? modAprovadas + linhasCan.filter((l) => l.estado === 'aprovada' && !l.soInforma).length : aprovadas
  const total = q.can ? modTotal + (leitura ?? []).filter((l) => !l.soInforma).length : TOTAL

  // ── os processos: uma linha por tick, depois da troca entre telas que trouxe
  // a tela; param no print e num estado da coluna ──
  const fimDaTroca = useFimDaTroca()
  useEffect(() => {
    // a 11 aberta pela URL fica parada, como todo momento
    if (EM_QUADRO || est != null || !(corre || relendo) || (corre && vivo.current.momento === REF.lendo)) return undefined
    let ativa = true, relogio = null
    fimDaTroca().then(() => {
      if (!ativa) return
      relogio = setInterval(() => setFluxo((f) => {
        if (f.can) return f.lidos == null ? f : { ...f, lidos: f.lidos + 1 >= linhasCan.length ? null : f.lidos + 1 }
        return f.atualizando == null && f.feitas < LIDAS ? { ...f, feitas: f.feitas + 1 } : f
      }), RITMOS.diagnosticoLinhaMs)
    })
    return () => { ativa = false; clearInterval(relogio) }
  }, [corre, relendo, est]) // eslint-disable-line react-hooks/exhaustive-deps

  // o firmware atualiza: o quadro dos 62% por RITMOS.firmwareAtualizacaoMs (o ritmo dele, 1 s), e o
  // diagnóstico recomeça das nove, com o firmware disponível (o caso consumido)
  useEffect(() => {
    if (EM_QUADRO || est != null || q.atualizando == null) return undefined
    const relogio = setTimeout(() => {
      consumir(CASO_FIRMWARE, CASO_SEM_REDE)
      setFluxo((f) => ({ ...f, atualizando: null, feitas: 0, casos: f.casos.filter((k) => k !== CASO_SEM_REDE) }))
      ir('T07')
    }, RITMOS.firmwareAtualizacaoMs)
    return () => clearTimeout(relogio)
  }, [q.atualizando, est]) // eslint-disable-line react-hooks/exhaustive-deps

  // as nove passaram sem trava: a sessão aparece, e o diagnóstico fica gravado
  // (etapas.preChecagem, o nome de hoje: { checagens, passaram } — passaram são as
  // que não travam; aprovadas, as do contador; o módulo; e as mensagens que ele ainda
  // não enviou, o número que a limpeza da T09 apagaria)
  useEffect(() => {
    if (est != null || !passou) return
    const e = vivo.current.estado
    const mesmo = e.sessao?.moduloSerial === serial
    if (mesmo && conferido(e.etapas.preChecagem, serial) && e.etapas.preChecagem.passaram === TOTAL) return
    despachar({ tipo: 'mesclar', parcial: {
      ...(mesmo ? {} : { sessao: sessaoDo(serial, e.sessao) }),
      etapas: { ...e.etapas, preChecagem: { checagens: TOTAL, passaram: TOTAL, aprovadas, moduloSerial: serial, mensagens: mensagensLidas(q.casos) } },
    } })
  }, [passou, serial, est]) // eslint-disable-line react-hooks/exhaustive-deps

  // a CAN lida fica gravada (etapas.can { lida }, que a T13 lê), com o ativo dela; e,
  // no fluxo, o endereço diz a 01 (o 01 e o 10 pela URL também põem o ativo na sessão)
  useEffect(() => {
    if (est != null || !q.can || relendo || !leitura) return
    const e = vivo.current.estado
    const reprovados = leitura.filter((r) => r.estado === 'reprovada').length
    const s = e.sessao
    const mesma = s?.moduloSerial === serial && s?.ativoId === ativoId
    if (!(mesma && e.etapas.can?.lida && e.etapas.can.ativoId === ativoId && e.etapas.can.reprovados === reprovados)) {
      despachar({ tipo: 'mesclar', parcial: {
        ...(mesma ? {} : { sessao: { ...(s ?? SEMENTES.T07.sessao), moduloSerial: serial, ativoId } }),
        etapas: { ...e.etapas, can: { ...e.etapas.can, lida: true, ativoId, reprovados } },
      } })
    }
    if (vivo.current.momento !== REF.canLida) ir('T07', { momento: REF.canLida })
  }, [q.can, relendo, est, ativoId]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── os toques (tela.md). Num estado da coluna o celular não toca ──
  const voltarAoMenu = () => ir('T04')
  // a trava: a sessão que nasceu no Conectar não chegou a aparecer, e se desfaz sem
  // registro; a T05 abre na lista, sem nada escolhido
  function procurarOutro() {
    const e = vivo.current.estado
    despachar({ tipo: 'mesclar', parcial: { sessao: null, etapas: { ...e.etapas, preChecagem: null } } })
    ir('T05', { momento: T05_LISTA })
  }
  // 04 · Atualizar firmware → 06
  function atualizarFirmware() {
    setFluxo({ ...q, serial, ativoId: null, feitas: LINHA_FIRMWARE, parou: null, atualizando: M.casos[CASO_FIRMWARE].atualizacao.quadroPct })
    ir('T07', { momento: REF.atualizando })
  }
  // 05 · Gravar a conexão: grava só a conexão, isolada — o módulo ganha rede, e o
  // firmware atualiza por ela (a 06). O quadro de gravando não tem referência: direto
  function gravarConexao() {
    consumir(CASO_SEM_REDE)
    setFluxo({ ...q, serial, ativoId: null, casos: q.casos.filter((k) => k !== CASO_SEM_REDE), feitas: LINHA_FIRMWARE, atualizando: M.casos[CASO_FIRMWARE].atualizacao.quadroPct })
    ir('T07', { momento: REF.atualizando })
  }
  // 01 · Ler de novo → 10: relê a CAN inteira, e o caso da CAN, se houver, fica consumido
  function lerDeNovo() {
    consumir(...q.casos.filter((k) => NA_CAN[k]))
    setFluxo({ ...q, serial, ativoId, lidos: 0, casos: q.casos.filter((k) => !NA_CAN[k]) })
    ir('T07', { momento: REF.relendo })
  }

  // O voltar do Android (logica.md): lendo, atualizando e relendo, nada — o processo
  // termina sozinho; sem trava (00, 07) e com a CAN lida (01, 08, 09), o Voltar ao
  // menu; na trava (02 a 05), o Procurar outro módulo
  const processo = corre || relendo || q.atualizando != null
  useVoltar(processo ? null : q.can || passou ? voltarAoMenu : procurarOutro)
  // o ENCERRAR (decisão 36): antes de homologar, o diálogo Encerrar antes de terminar? por cima
  const enc = useEncerrar()

  // ── o topo: a faixa quando a sessão aparece ──
  const comFaixa = q.can || passou
  const faixa = (
    <Faixa ausente={!comFaixa} serial={serial} placa={ativo ? ativo.placa : T.semAtivo} semAtivo={!ativo} acao={T.encerrar}
      aoEncerrar={enc.encerrar} acaoDesabilitada={relendo} />
  )

  // ── o rodapé: o primário que espera o processo acende quando ele termina — com
  // outro texto, o texto esmaece no lugar e o roxo troca direto ──
  let rodape
  if (q.atualizando != null) rodape = <Rodape primario={T.atualizando} primarioDesabilitado explicacao={T.recomeca} pe="botao" />
  // a atualização que não terminou (a 14): o que conferir, o Tentar de novo (a atualização de novo, a 06) e o
  // Procurar outro módulo de toda trava (T05/01)
  else if (q.parou != null) rodape = <Rodape legenda={T.confiraLigado} primario={T.tentarDeNovo} aoPrimario={atualizarFirmware} primarioTrocaTexto link={T.procurarOutro} aoLink={procurarOutro} />
  // a leitura do módulo (a 11): o rodapé fecha em 24, como a 11 desenha; relendo a CAN (a 10), em 32
  else if (corre) rodape = <Rodape primario={T.lendoNaoSaia} primarioDesabilitado primarioTrocaTexto pe="link" />
  else if (relendo) rodape = <Rodape primario={T.lendoNaoSaia} primarioDesabilitado primarioTrocaTexto />
  // a CAN lida segue o caminho (decisão 64): Calibrar, e o Ler de novo no link · com um sinal sem leitura
  // ou fora do esperado (08, 09), o mesmo rodapé: a leitura da CAN não trava (HU-T07-4)
  else if (q.can) rodape = <Rodape primario={T.calibrar} aoPrimario={() => ir('T10')} primarioAcende primarioTrocaTexto link={T.lerDeNovo} aoLink={lerDeNovo} />
  else if (passou && ativo) rodape = <Rodape primario={T.voltarAoMenu} aoPrimario={voltarAoMenu} primarioAcende primarioTrocaTexto />
  else if (passou) rodape = <Rodape primario={T.selecionarAtivo} aoPrimario={() => ir('T06')} primarioAcende primarioTrocaTexto link={T.voltarAoMenu} aoLink={voltarAoMenu} />
  else {
    const f = faltas(c)
    if (f.firmwareFora && q.casos.includes(CASO_SEM_REDE)) {
      rodape = <Rodape legenda={T.comConexaoGravada} primario={T.gravarConexao} aoPrimario={gravarConexao} primarioAcende primarioTrocaTexto link={T.procurarOutro} aoLink={procurarOutro} />
    } else if (f.firmwareFora) {
      rodape = <Rodape primario={T.atualizarFirmware} aoPrimario={atualizarFirmware} primarioAcende primarioTrocaTexto link={T.procurarOutro} aoLink={procurarOutro} />
    } else rodape = <Rodape primario={T.procurarOutro} aoPrimario={procurarOutro} primarioAcende primarioTrocaTexto />
  }

  // as linhas (lei 23): o módulo na medida da linha de conferência, 50
  // ('diagnostico'); a CAN e o *Conferido na conexão*, na lista longa, 44 ('longa')
  const linha = (l, k, variante, divisoria = true) => (
    <LinhaChecagem key={k} variante={variante} estado={l.estado} titulo={l.titulo} valor={l.valor} causa={l.causa} nota={l.nota} glifo={l.glifo} divisoria={divisoria}
      className={variante === 'diagnostico' && ALTAS.includes(l.id) && (l.alta || l.nota != null) ? 't07-linha-alta' : undefined}
      nomeGlifo={l.estado === 'ainda-nao' ? ESTADOS.espera.nome : undefined} />
  )
  // a trava sem saída escrita (o serial fora do cadastro, o modelo sem
  // suporte) abre com o aviso, quando a leitura termina nela — como as travas da T09;
  // na frente de quem olha, ele esmaece no lugar (Aviso · surge), e o espaço abre direto
  const aviso = concluido && trava ? avisoDaTrava(c) : null
  const avisoVivo = useRef(false)
  if (corre) avisoVivo.current = true

  return (
    // a leitura do módulo (a 11): sem o rótulo de topo, e as linhas que esperam
    // com o título aceso, como a 11 desenha · a barra na cor da página: a faixa da sessão
    // ainda não nasceu, e é a página que está embaixo dela (R-23)
    <div className={`t07 ${corre ? 't07-lendo' : ''} ${q.parou != null ? 't07-parou' : ''}`}>
      <BarraDoSistema fundo={comFaixa ? 'faixa' : 'pagina'} veu={enc.veu} />
      {faixa}
      <div className="tela-miolo t07-miolo">
        <div className="t07-cabeca">
          {!comFaixa && !corre && <span className="t07-rotulo-topo">{rotuloDeTopo(c)}</span>}
          <CabecalhoConteudo titulo={T.titulo} contagem={contagem} unidade={T.de(total)} tom={contagem === total ? 'veredito' : 'neutro'} />
        </div>
        {aviso && <Aviso tom="falha" glifo="xis" titulo={aviso.titulo} frase={aviso.frase} surge={avisoVivo.current && !EM_QUADRO && est == null} />}
        {/* a sessão anterior mal encerrada (a 13): o app fechou o canal que ficou aberto,
            e avisa, neutro, quando a leitura termina · pode seguir */}
        {concluido && q.casos.includes(CASO_MAL_ENCERRADA) && (
          <Aviso tom="neutro" glifo="info" mudo titulo={T.malEncerradaTitulo} frase={T.malEncerradaFrase} surge={avisoVivo.current && !EM_QUADRO && est == null} />
        )}
        <div className="t07-secao">
          <span className="t07-rotulo-bloco">{T.oModulo}</span>
          <Lista>
            {q.can
              ? linha({ estado: 'aprovada', titulo: T.conferido, valor: T.deTotal(modAprovadas, modTotal) }, 'conferido', 'longa', false)   // a linha única é a última, sem divisória
              : linhas.map((l) => linha(l, l.id, 'diagnostico'))}
          </Lista>
        </div>
        {/* a CAN só aparece quando dá pra ler, depois do bloco do ativo (decisão 61): antes,
            nenhuma caixa espera por ela, e a tela cabe sem rolar */}
        {leitura && (
          <div className="t07-secao">
            <span className="t07-rotulo-bloco">{tituloDaCan(ativo)}</span>
            <Lista>{linhasCan.map((l) => linha(l, l.id, 'longa'))}</Lista>
          </div>
        )}
      </div>
      {rodape}
      {enc.sobre}
    </div>
  )
}
