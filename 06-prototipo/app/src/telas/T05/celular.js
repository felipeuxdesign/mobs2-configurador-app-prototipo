// O que o celular impede antes da busca (logica.md · O mundo real): o
// Bluetooth desligado (16) e a permissão do Bluetooth negada (17). Não vêm do
// módulo nem do ativo, e nenhum trava o que já foi feito. Funções puras, lidas
// do mock: a tela monta o quadro e o toque do primário daqui.
//
// O estado aberto pela coluna fica parado e sem toque, e nenhum gatilho do mock
// desliga o Bluetooth ou nega a permissão no fluxo: o que o botão de cada um
// faz se prova no node (scripts/testar-login-e-bluetooth.mjs).
import { M } from '../../dados/mock.js'
import { TX } from './textos.js'

export const CASO_BT_DESLIGADO = 'bluetooth-desligado'
export const CASO_BT_SEM_PERMISSAO = 'bluetooth-sem-permissao'

// o quadro do celular, pelos casos da receita: o que falta, e se o Android
// ainda deixa o app perguntar (perguntaDeNovo). Sem nenhum dos dois, null
export function quadroDoCelular(casos = []) {
  if (casos.includes(CASO_BT_DESLIGADO) && M.casos[CASO_BT_DESLIGADO].bluetooth === 'desligado') {
    return { fase: 'celular', falta: 'bluetooth', perguntaDeNovo: true }
  }
  if (casos.includes(CASO_BT_SEM_PERMISSAO) && M.casos[CASO_BT_SEM_PERMISSAO].permissao === 'bluetooth') {
    return { fase: 'celular', falta: 'permissao', perguntaDeNovo: true }
  }
  return null
}

// o que o bloco diz, e o que o primário diz. Com o Android sem deixar
// perguntar de novo, o primário vira Abrir as configurações (a lei de
// construir, 12): nunca um botão que não faz nada
export function textosDoCelular(q) {
  const t = q.falta === 'bluetooth'
    ? { unidade: TX.semBluetooth, titulo: TX.bluetoothDesligado, frase: TX.semEle, primario: TX.ligarBluetooth }
    : { unidade: TX.semPermissao, titulo: TX.faltaPermissao, frase: TX.oAppUsa, primario: TX.permitir }
  return q.perguntaDeNovo ? t : { ...t, primario: TX.abrirConfiguracoes }
}

// O toque do primário: o que o app pede ao Android, e pra onde a tela vai com a
// resposta — 'busca' (a busca começa sozinha: o fluxo da busca, a 01) ou o
// quadro de depois.
// · Ligar o Bluetooth → o Android pergunta; o caso não traz recusa: ligado, a busca
// · Permitir → o Android pergunta de novo; a resposta vem do caso: negada, e o
//   Android não deixa o app perguntar mais — o primário vira Abrir as configurações
// · Abrir as configurações → as configurações do Android, que não se desenham no
//   protótipo: o técnico volta com a permissão dada, e a busca começa
export function depoisDoPedido(q) {
  if (q.falta === 'bluetooth' || !q.perguntaDeNovo) return 'busca'
  return M.casos[CASO_BT_SEM_PERMISSAO].resposta === 'negada' ? { ...q, perguntaDeNovo: false } : 'busca'
}
