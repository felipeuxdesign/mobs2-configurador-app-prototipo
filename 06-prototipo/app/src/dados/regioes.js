// As regiões de um ativo, num lugar só: as do ativoId dele mais as em que ele está no tambemAtivos — a
// mesma cerca usada por outro ônibus da empresa. O pacote conta REGIÕES, não
// ônibus. No mock: 4 no herói (a-01) e no PCX-9A17 da queda (a-03, pelo tambemAtivos),
// 4 no QAH-1M67 da sessão interrompida (a-13), nenhuma nos outros.
// A T09 (o conteúdo e o envio da cadeia), a T11 (o cadastro da conferência), a T13
// (pelo conteúdo da T09) e a T16 (a sessão interrompida e a assertiva das cercas) leem daqui.
import { M } from './mock.js'

/** as regiões do ativo: as dele e as que ele usa de outro */
export const regioesDoAtivo = (ativoId) =>
  M.cercas.regioes.filter((r) => r.ativoId === ativoId || (r.tambemAtivos ?? []).includes(ativoId))
