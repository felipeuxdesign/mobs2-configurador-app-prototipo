// A linha de empresa (folha 4): na folha Trocar de empresa do menu (T04/07 e
// 08) — o nome, a idade do pacote que está no aparelho e quantos ativos ele
// traz. A atual leva o quadrado lima de 11 (Lei 1: escolhido). A de pacote
// vencido diz só a causa, no lugar da idade (*pacote vencido há 8 dias*), e se
// escolhe como as outras (decisão 56): a T03 diz o que fazer.
//
// nome, pacote ('carregado há 4 dias'), rotuloContagem ('ATIVOS'), contagem (34),
// estado: 'disponivel' · 'atual' ·
//   'espera' (não se escolhe agora: o tracinho vazio no poço, o nome apagado e, no
//   lugar do pacote, o que ela espera; a contagem fica como está · T04/08)
// aoTocar, rotulo (o nome pro leitor de tela; o texto visível, se faltar), nomeGlifo
// (o que o leitor ouve do tracinho), divisoria
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import { Quadrado } from '../primitivos/Marcador.jsx'
import './LinhaEmpresa.css'

export function LinhaEmpresa({
  nome, pacote, rotuloContagem, contagem, estado = 'disponivel',
  aoTocar, rotulo, nomeGlifo, divisoria = true, className = '',
}) {
  const espera = estado === 'espera'
  return (
    <Tocavel
      className={`ds-empresa ds-empresa-${estado} ${divisoria ? '' : 'ds-empresa-sem-divisoria'} ${className}`}
      role="radio" aria-checked={estado === 'atual'}
      rotulo={rotulo} aoTocar={aoTocar} desabilitado={espera}
    >
      <Poco tam={30}>{espera ? <Glifo estado="traco" nome={nomeGlifo} /> : <Quadrado escolhido={estado === 'atual'} />}</Poco>
      <span className="ds-empresa-corpo">
        <span className="ds-empresa-nome">{nome}</span>
        <span className="ds-empresa-pacote">{pacote}</span>
      </span>
      <span className="ds-empresa-contagem">
        <span className="ds-empresa-rotulo">{rotuloContagem}</span>
        <span className="ds-empresa-numero">{contagem}</span>
      </span>
    </Tocavel>
  )
}
