// Folha 3 · os átomos: os 12 glifos, os 10 ícones de ferramenta, os 8 poços
// e os marcadores. A folha não os põe em moldura, então ficam fora da bancada
// automática (semBancada) — conferidos no olho contra o PNG da folha 3.
import { Poco, Glifo, ESTADOS, Icone, Quadrado, Led } from '../../ds/index.js'

const linha = { display: 'flex', flexWrap: 'wrap', gap: 'var(--e-12)', alignItems: 'center' }
const FERRAMENTAS = ['conectar', 'ativo', 'can', 'configurar', 'refazer', 'calibracao', 'conferir', 'checklist', 'fila', 'instalacoes']

export const especimes = [
  { id: 'f3-glifos', folha: 3, rotulo: 'os glifos por natureza', semBancada: true, legenda: 'no poço de 32 · o desenho do jogo, com o nome pro leitor de tela',
    render: () => <div style={linha}>{Object.keys(ESTADOS).map((e) => <Poco key={e} tam={32}><Glifo estado={e} poco={32} /></Poco>)}</div> },
  { id: 'f3-ferramentas', folha: 3, rotulo: 'os ícones das ferramentas', semBancada: true, legenda: 'no poço de 30 · traço 1,8',
    render: () => <div style={linha}>{FERRAMENTAS.map((n) => <Poco key={n} tam={30}><Icone nome={n} tam={18} /></Poco>)}</div> },
  { id: 'f3-pocos', folha: 3, rotulo: 'o poço nos tamanhos do produto', semBancada: true, legenda: '22 · 24 · 26 · 28 · 30 · 32 · 34 · 44',
    render: () => <div style={linha}>{[22, 24, 26, 28, 30, 32, 34, 44].map((t) => <Poco key={t} tam={t}><Glifo estado="ok" poco={t} /></Poco>)}</div> },
  // o ícone riscado (lei 21): o ícone inteiro, com o risco por cima e o fio escuro — o Wi-Fi do login sem
  // conexão (T01/14), o Bluetooth da busca que não começa (T05/16, 17), a câmera sem a permissão (T10/11) e o
  // olho da senha (T01/10)
  { id: 'f3-riscados', folha: 3, rotulo: 'os ícones riscados', semBancada: true, legenda: 'o ícone inteiro, com o risco por cima e um fio escuro separando · lei 21',
    render: () => (
      <div style={linha}>
        <Poco tam={26}><Glifo estado="sem-conexao" poco={26} /></Poco>
        <Poco tam={44}><Icone nome="bluetooth-desligado" tam={20} /></Poco>
        <Poco tam={44}><Icone nome="camera-negada" tam={20} cor="marca" /></Poco>
        <Poco tam={44}><Icone nome="olho-riscado" tam={20} cor="marca-limite" /></Poco>
      </div>
    ) },
  { id: 'f3-marcadores', folha: 3, rotulo: 'marcadores', semBancada: true, legenda: 'não escolhido · escolhido · LED viva · sem sessão · falha',
    render: () => <div style={linha}><Quadrado /><Quadrado escolhido /><Led estado="viva" /><Led estado="sem-sessao" /><Led estado="falha" /></div> },
]
