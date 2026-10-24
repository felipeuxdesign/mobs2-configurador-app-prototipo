// A linha do histórico (folha 4): uma instalação — a placa, o módulo e a hora,
// o veredito à direita. Tocar abre o detalhe (T12).
//
// placa, detalhe ('M2C-0417 · 11:47'), veredito ('aprovada'),
// estado: o glifo do Glifo no poço de 32 ('ok', 'xis', 'relogio'…)
// rotulo: o nome pro leitor de tela (o texto visível, se faltar) · divisoria
// T12: duas propriedades nomeadas; sem elas, a linha é a da folha:
// · `tom` do veredito, pela natureza do estado: 'neutro' (--tinta-secundaria, o
//   'aprovada' da folha) · 'espera' (--tinta, o 'aguardando validação') ·
//   'falha' (--vermelho, a 'falha reconhecida') — T12/00 e 03
// · `detalheTam` 'legenda': a linha de baixo em 12, quando ela diz há quantos
//   dias ('M2C-0362 · há 9 dias'); com a hora, fica nos 11 da folha
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import './LinhaHistorico.css'

export function LinhaHistorico({ placa, detalhe, veredito, estado = 'ok', nomeGlifo, aoTocar, rotulo, divisoria = true, tom = 'neutro', detalheTam, className = '' }) {
  const classes = [
    'ds-historico', divisoria ? '' : 'ds-historico-sem-divisoria', tom !== 'neutro' ? `ds-historico-tom-${tom}` : '',
    detalheTam === 'legenda' ? 'ds-historico-detalhe-legenda' : '', className,
  ].filter(Boolean).join(' ')
  return (
    <Tocavel className={classes} rotulo={rotulo} aoTocar={aoTocar}>
      <Poco tam={32}><Glifo estado={estado} poco={32} nome={nomeGlifo} /></Poco>
      <span className="ds-historico-corpo">
        <span className="ds-historico-placa">{placa}</span>
        <span className="ds-historico-detalhe">{detalhe}</span>
      </span>
      <span className="ds-historico-veredito">{veredito}</span>
    </Tocavel>
  )
}
