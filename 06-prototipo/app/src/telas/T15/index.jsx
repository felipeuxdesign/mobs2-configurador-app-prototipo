// T15 · Fila de saída (02-telas/T15-fila-de-saida): o que o aparelho ainda
// deve ao servidor, item por item, e o que precisa do técnico. No topo, o
// cartão que cresce até o espaço livre: com erro, o cartão que pede ação (a
// recusa do servidor, com a ação, e o erro de rede, que reenvia sozinho); sem
// erro, o item que sobe agora. Embaixo, o que anda sozinho — na fila e já
// recebido. Sem nada, o vazio declarado; e a Seção F em re-checagem aparece à
// parte, fora da fila (HU-T15-5).
// · Tudo sai do mock (dados.js): a fila do aparelho na entrada (00, M.filaDoAparelho) ou
//   pelo recorte do caso de cada estado (01 a 04, receitas.js), o rótulo curto
//   pelo tiposFila, a janela da re-checagem pelo criteriosRegra.
// · A fila é do aparelho, e não da empresa (decisão 42, HU-T01-4): o rótulo é
//   'neste aparelho', e no fluxo entra tudo o que a sessão criou, de qualquer
//   empresa. As referências mostram o topo da lista; a tela mostra o recorte
//   inteiro (no 01, os cinco itens), e o miolo rola quando passa.
// · O estado muda o conteúdo: os blocos ficam onde as referências desenham, e
//   onde elas mudam de desenho (o cartão compacto da 02, a Seção F da 04), a
//   tela é fiel.
// · Os toques: Voltar ao menu → T04 (e o voltar do Android, o Esc no
//   computador, faz o mesmo: logica.md) · Ressincronizar e reenviar:
//   os itens com erro voltam pra fila e o envio recomeça.
//   O que isso mostra é só o que as referências e o mock sustentam: o
//   cartão que pede ação sai, porque nada mais precisa do técnico, e os itens
//   entram na lista como 'na fila', com a espera de criadoAs às 14:30. Nenhum
//   deles vira o SUBINDO AGORA: o progresso e o tamanho só existem no f-04 do
//   mock. O item reenviado mora no estado único (`reenviados`, estado/fila.js),
//   e sair da tela não o desfaz (HU-T15-2) · ENCERRAR, antes de homologar, abre
//   o diálogo Encerrar antes de terminar? (decisão 36), e a sessão abortada da T16;
//   depois de homologar, os passos do encerramento.
// · A notificação local da fila parada (HU-T15-6) não se
//   constrói: nenhuma referência a desenha, e ela é do sistema, fora da tela.
// · Sem processo que ande sozinho: o envio da fila não tem ritmo declarado,
//   e o 01 é estado, parado. O cartão que sai no Ressincronizar se move
//   (abaixo); a barra que enche e o item enviado que esmaece esperam o
//   ritmo do envio.
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, CartaoAcao, Lista, LinhaFila, LinhaRechecagem, Vazio, Rodape, useReorganiza,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import {
  quadroDoEstado, quadroDoFluxo, grupos, placaDe, tituloDoItem, causaDaRecusa, causaDaRede, tamanhoDoEnvio,
  linhaDaLista, linhaDaRechecagem,
} from './dados.js'
import { Subindo, ItemQueReenvia, Legenda } from './pecas.jsx'
import { T } from './textos.js'
import './t15.css'


export default function T15({ estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const quadro = (est && quadroDoEstado(est)) || quadroDoFluxo(unico)
  const { total, erros, enviando, lista } = grupos(quadro.itens)
  // O Ressincronizar e reenviar muda o que está na tela, no lugar:
  // o layout vai direto pro fim; o cartão que pede ação sai esmaecendo por
  // cima, o rótulo e a lista sobem do lugar de antes ao novo, e os itens que voltam pra fila
  // esmaecem no lugar deles (src/ds/linhas/Reorganiza.js). A chave é o que a fila mostra. O envio
  // não anda (sem ritmo declarado): nada mais muda sozinho
  const lugar = useReorganiza(`${erros.map((f) => f.id).join()}|${lista.map((f) => `${f.id}:${f.estado}`).join()}`)

  // a sessão: no fluxo, a do estado único; no 01 e no 02, a do herói (as
  // referências desenham M2C-0417 · RKT-8H42); no 03 e no 04, nenhuma (o caso
  // fila-vazia)
  const sessao = quadro.semSessao ? null : est ? (unico.sessao?.ativoId ? unico.sessao : SEMENTES.T15.sessao) : unico.sessao
  const completa = Boolean(sessao?.ativoId)

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const voltarAoMenu = () => ir('T04')
  // antes de homologar, a sessão abortada (T16/03); depois, o encerramento (T16)
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar antes de terminar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar()
  // o voltar do Android (logica.md): o mesmo que a saída do rodapé, o Voltar ao
  // menu. Num estado da coluna, o app está parado, e a peça não escuta
  useVoltar(voltarAoMenu)

  const faixa = !sessao
    ? <Faixa estado="sem-sessao" fato={T.semSessao} />
    : <Faixa serial={sessao.moduloSerial} placa={completa ? placaDe(sessao.ativoId) : T.semAtivo} semAtivo={!completa}
        acao={T.encerrar} aoEncerrar={enc.encerrar} />

  // ── o cartão do topo ──
  // com erro: o cartão que pede ação, pela recusa do servidor (a que precisa
  // da mão do técnico). Com um erro, o desenho da folha 6 (00); com mais, o
  // compacto, com o erro de rede e a legenda embaixo (02, T15·1)
  const recusa = erros.find((f) => f.estado === 'erro-recusa')
  const outros = erros.filter((f) => f !== recusa)
  // Ressincronizar e reenviar: os itens com erro do cartão voltam pra fila
  // (estado único, `reenviados`); sem erro, o cartão sai e eles entram na lista
  const reenviar = () => despachar({
    tipo: 'mesclar', parcial: { reenviados: [...new Set([...(unico.reenviados ?? []), ...erros.map((f) => f.id)])] },
  })
  let cartao = null
  if (recusa) {
    const compacto = erros.length > 1
    cartao = (
      <CartaoAcao compacto={compacto} rotulo={T.rotuloDosErros[erros.length]} titulo={tituloDoItem(recusa)}
        descricao={causaDaRecusa(recusa, erros.length)} acao={quadro.semRede ? T.ressincronizarEsperaRede : T.ressincronizar} aoAgir={reenviar} acaoDesabilitada={quadro.semRede}>
        {outros.map((f) => <ItemQueReenvia key={f.id} titulo={tituloDoItem(f)} causa={causaDaRede(f)} nomeGlifo="sem conexão" />)}
        {compacto && outros.length === 1 && outros[0].estado === 'erro-rede' && <Legenda>{T.soAPrimeira}</Legenda>}
      </CartaoAcao>
    )
  } else if (enviando) {
    // sem erro: o item que sobe agora (01)
    cartao = <Subindo rotulo={T.subindo} titulo={tituloDoItem(enviando)} pct={enviando.progresso} unidade={T.pct}
      tamanho={tamanhoDoEnvio(enviando)} legenda={T.nadaPrecisa} />
  }

  // ── a lista: o que está na fila e o que já foi recebido. A altura é da
  // posição: 50 com a divisória no meio, e 62 a última ──
  const linhas = lista.map((f, i) => {
    const ultima = i === lista.length - 1
    return <LinhaFila key={f.id} {...linhaDaLista(f)} posicao={ultima ? 'fim' : 'meio'} divisoria={!ultima} />
  })

  return (
    <div className="t15">
      <BarraDoSistema fundo="faixa" veu={enc.veu} />
      {faixa}
      <div ref={lugar} className="tela-miolo">
        <CabecalhoConteudo titulo={T.titulo} contagem={total} unidade={T.nesteAparelho} />
        {total === 0 && <Vazio titulo={T.vazio} frase={quadro.ultimoEnvioAs ? T.ultimoSubiu(quadro.ultimoEnvioAs) : undefined} />}
        {cartao}
        {linhas.length > 0 && (
          <>
            {/* embaixo da recusa, o que anda sozinho (00, 02); sem recusa, o que está na fila e o recebido (01) */}
            <span className="t15-rotulo">{recusa ? T.oResto : T.naFilaERecebidas}</span>
            <Lista className="t15-lista">{linhas}</Lista>
          </>
        )}
        {quadro.secaoF && (
          <div className="t15-rechecagem">
            <span className="t15-rotulo">{T.rechecagem}</span>
            <Lista><LinhaRechecagem {...linhaDaRechecagem(quadro.secaoF)} /></Lista>
          </div>
        )}
      </div>
      <Rodape primario={T.voltar} aoPrimario={voltarAoMenu} />
      {enc.sobre}
    </div>
  )
}
