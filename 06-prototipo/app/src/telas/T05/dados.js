// A busca da T05, lida do mock na hora de montar. Nenhum número mora
// aqui: os módulos por perto, o meio, o modelo e a variante saem de M. A T05
// só conecta (decisão 44): o que o módulo é e como ele está, o diagnóstico
// mostra logo depois (T07). A busca é por Bluetooth, e só acha módulo cuja
// variante tem Bluetooth na matriz (decisão 59): o VL06 FULL, o VL06 CAN-BT e o VL08.
import { M } from '../../dados/mock.js'

export const moduloDe = (serial) => M.modulos.find((m) => m.serial === serial) ?? null
export const cadastrado = (serial) => moduloDe(serial) != null
// o que o módulo informa na busca: o do cadastro, ou — fora do cadastro — o que ele
// mesmo diz (M.naBuscaForaCadastro: o M2C-0999 aparece na lista
// da T05/01 como os outros, e a trava do serial é no diagnóstico, T07/02)
// — e, na lista de escolha (T05/01), todo módulo por perto se escolhe e conecta
const informado = (serial) => moduloDe(serial) ?? M.naBuscaForaCadastro[serial]
const modeloDe = (mod) => M.modelos.find((m) => m.id === mod.modeloId)
const matrizDe = (mod) => M.matrizCapacidades.find((r) => r.modeloId === mod.modeloId && r.variante === mod.variante)
// a variante tem Bluetooth na matriz (o `bluetooth` dela)
const temBluetooth = (serial) => { const m = informado(serial); return !!m && !!matrizDe(m)?.bluetooth }

// ── a busca ──
// os módulos por perto que a busca acha, na ordem da referência, o herói primeiro: só os
// que têm Bluetooth (no mundo do protótipo, os cinco)
export const porPerto = () => M.situacao.porPerto.filter((p) => temBluetooth(p.serial))
export const HEROI = M.situacao.porPerto[0].serial
// o 02 · só um por perto: a busca em que só o herói responde (o primeiro da lista)
export const soOHeroi = () => porPerto().slice(0, 1)
export const meioDe = (serial) => M.situacao.porPerto.find((p) => p.serial === serial)?.meio ?? null

// 'VL06 · CAN-BT': o modelo e a variante, na linha da busca
export const varianteNaLista = (serial) => { const m = informado(serial); return `${modeloDe(m).nome} · ${m.variante}` }
// o firmware não está nas linhas da T05 — é do diagnóstico (T07)
// 03 · as variantes que a busca nunca acha, por não terem Bluetooth: 'VL06 ECO', 'VL06 CAN', da matriz
export const variantesSemBluetooth = () => M.matrizCapacidades.filter((r) => !r.bluetooth)
  .map((r) => `${M.modelos.find((m) => m.id === r.modeloId).nome} ${r.variante}`)

// a sessão que nasce na conexão (logica.md · O estado único): o
// módulo, sem ativo ainda, aberta na hora nominal, com o meio em que a busca o
// achou. A faixa ainda não desce: desce na T07, quando as nove linhas passam sem trava
export const sessaoNova = (serial) => ({ moduloSerial: serial, ativoId: null, saude: 'ok', abertaAs: M.HORA_NOMINAL, meio: meioDe(serial) })

// ── os estados da busca ──
export const CASO_BUSCA_VAZIA = 'busca-vazia'
export const CASO_CONEXAO = 'conexao-falha'
// Os casos que a conexão lê: só a falha ao conectar (04), que acontece uma vez por
// sessão (casosConsumidos). O que é fato do cadastro — o serial, o driver, a
// matriz — trava no diagnóstico (T07), toda vez que o módulo conecta
const CASOS_T05 = [CASO_CONEXAO]
const UMA_VEZ = new Set([CASO_CONEXAO])
const serialDoCaso = (id) => M.casos[id].moduloSerial ?? null
// os casos da T05 que valem agora pra um módulo, na sessão do estado único
export const casosDoModulo = (serial, consumidos = []) =>
  CASOS_T05.filter((k) => serialDoCaso(k) === serial && !(UMA_VEZ.has(k) && consumidos.includes(k)))

// 03 · a busca vazia: quanto durou e qual tentativa
export const buscaVazia = () => M.casos[CASO_BUSCA_VAZIA]
// 04 · a conexão que falha: o módulo do caso no lugar do escolhido (o do herói), os outros quatro por perto
export const serialDaFalha = () => M.casos[CASO_CONEXAO].moduloSerial
export const pertoComFalha = () => porPerto().map((p, i) => (i === 0 ? { serial: serialDaFalha() } : p))
