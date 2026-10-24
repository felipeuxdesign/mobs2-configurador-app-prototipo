// O movimento · a troca de quadro (src/ds/chrome/Troca.jsx, a TrocaDeQuadro), tocável. Nenhuma
// folha desenha movimento: o espécime fica fora da bancada (semBancada), e parado ele é o
// quadro da lista. A linha da instalação abre o detalhe, e o Voltar às instalações volta:
// o desenho inteiro troca, e só o conteúdo — o miolo e o rodapé — esmaece em --mov-rapido,
// como a troca entre telas; a barra do sistema e a faixa ficam paradas. Com reduzir
// movimento, a troca é direta. É a T12 em miniatura: os textos são os do textos.js dela e o
// dado é o do mock (a i-01), nada escrito aqui. Prova: scripts/caminhos/mov-troca.mjs.
import { useRef, useState } from 'react'
import { BarraDoSistema, Faixa, Rodape, CabecalhoConteudo, Lista, LinhaHistorico, RaizDaTroca, TrocaDeQuadro } from '../../ds/index.js'
import { TX } from '../../telas/T12/textos.js'
import { ativoDe, instalacaoDe, vereditoDe, detalheDaLinha, linhaDoDetalhe } from '../../telas/T12/dados.js'
import '../../telas/T12/t12.css'

function EspecimeDaTroca() {
  const raiz = useRef(null)
  const [aberta, setAberta] = useState(false)
  const i = instalacaoDe('i-01'), placa = ativoDe(i.ativoId).placa, v = vereditoDe(i), d = detalheDaLinha(i)
  return (
    <RaizDaTroca raiz={raiz}>
      <div ref={raiz} className="t12" style={{ height: 'var(--tela-altura)' }}>
        <BarraDoSistema fundo="faixa" />
        <Faixa serial={i.moduloSerial} placa={placa} acao={TX.encerrar} />
        {/* a tela diz qual quadro desenha: a chave é o quadro, e os filhos passam direto */}
        <TrocaDeQuadro chave={aberta ? 'detalhe' : 'lista'}>
          {aberta ? (
            <div className="tela-miolo t12-miolo t12-miolo-detalhe">
              <div className="t12-cabeca">
                <CabecalhoConteudo titulo={placa} contagem={v.texto} tom={v.cabeca} forte />
                <span className="t12-cabeca-linha">{linhaDoDetalhe(i)}</span>
              </div>
            </div>
          ) : (
            <div className="tela-miolo t12-miolo">
              <CabecalhoConteudo titulo={TX.titulo} />
              <Lista>
                <LinhaHistorico placa={placa} detalhe={d.texto} detalheTam={d.tam} veredito={v.texto} estado={v.glifo} tom={v.tom}
                  divisoria={false} aoTocar={() => setAberta(true)} />
              </Lista>
            </div>
          )}
          {aberta
            ? <Rodape primario={TX.voltarAsInstalacoes} aoPrimario={() => setAberta(false)} />
            : <Rodape primario={TX.voltarAoMenu} />}
        </TrocaDeQuadro>
      </div>
    </RaizDaTroca>
  )
}

export const especimes = [
  { id: 'mov-troca-quadro', folha: 2, chrome: true, semBancada: true, rotulo: 'a troca de quadro',
    legenda: 'toque na linha e no Voltar às instalações · só o conteúdo esmaece, em 150 · a barra e a faixa ficam',
    render: () => <EspecimeDaTroca /> },
]
