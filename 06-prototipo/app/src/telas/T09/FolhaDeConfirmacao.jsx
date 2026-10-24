// A folha de confirmação (folha 2): antes de uma ação que tem consequência, ela a
// nomeia — o título, a frase —, e o técnico confirma ou volta. Nenhuma peça nova: a folha
// (folha 2), com a frase e as duas ações do diálogo (o primário e o link de 44, a 8 dele).
// · a do reenvio (T09/13, 17 e 18, e a T11/06), pelo `bloco`: antes de enviar um bloco que
//   tem dependente · a das cercas é do mock (M.consequenciaReenvio); a do ativo e a do leitor, a
//   letra das referências (textos.js) · `Reenviar <o bloco>` e `Cancelar`;
// · a com link (T09/27), pelo texto: antes de a limpeza completa apagar as mensagens que o módulo
//   ainda não enviou — o primário é a ação segura (`Esperar o envio`), e o link, a que segue mesmo
//   assim (`Gravar mesmo assim`), o mesmo par do *Encerrar antes de terminar?*.
// Sobe e desce como toda folha (200 e 150, o véu esmaece junto), e fecha no X, tocando fora,
// arrastando e no Cancelar (lei 20). Quem mostra é a tela: ela põe a folha no véu dela.
import { Folha, Frase, Primario, Link } from '../../ds/index.js'
import { M } from '../../dados/mock.js'
import { T } from './textos.js'
import './FolhaDeConfirmacao.css'

export const consequenciaDe = (bloco) => M.consequenciaReenvio[bloco] ?? T.consequencia[bloco] ?? null

export function FolhaDeConfirmacao({ bloco, aberta, aoConfirmar, aoFechar, titulo, texto, primario, aoPrimario, link, aoLink }) {
  const c = bloco ? consequenciaDe(bloco) : { titulo, texto }
  if (!c) return null
  return (
    <Folha titulo={c.titulo} rotuloFechar={T.fechar} aoFechar={aoFechar} aberta={aberta}>
      <Frase>{c.texto}</Frase>
      <div className="ds-dialogo-acoes">
        <Primario aoTocar={bloco ? aoConfirmar : aoPrimario}>{bloco ? T.reenviar[bloco] : primario}</Primario>
        <Link aoTocar={bloco ? aoFechar : aoLink}>{bloco ? T.cancelar : link}</Link>
      </div>
    </Folha>
  )
}
