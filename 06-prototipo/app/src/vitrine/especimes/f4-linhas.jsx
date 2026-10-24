// Folha 4 · a linha de checagem, a linha revisar em seguida e a família da linha de
// lista — e as duas linhas que moram em outras folhas: a linha tocável (folha 1) e a
// escolha numa lista (folha 3). Os textos e as legendas são os da folha. A seção do
// checklist e a linha da fila moram na folha 7 (f7-checklist.jsx).
// A linha revisar em seguida (T13/43) está na folha 4 sem a moldura tracejada da régua
// (scripts/especime.mjs): fica fora da bancada (semBancada), conferida pela T13/43.
import { Lista, LinhaChecagem, LinhaHistorico, LinhaEmpresa, LinhaEscolha, LinhaTocavel } from '../../ds/linhas/index.js'
import { ItemDoChecklist } from '../../ds/checklist/index.js'
import { BotaoDaLinha } from '../../ds/index.js'
import { M } from '../../dados/mock.js'
import { contextoDe, serialDoCaso, CASO_FIRMWARE } from '../../telas/T07/diagnostico.js'
import { PASSOS } from '../../telas/T14/ciclo.js'

// os dados que a tela lê do mock, lidos daqui também: o firmware fora da lista (o
// M2C-0451, T07/04) com as versões do VL06 FULL, o hodômetro da CAN lida (T07/01) e os
// passos do ciclo do herói (os quatro da T14); a frase do firmware é a da folha
const foraDaLista = contextoDe(serialDoCaso(CASO_FIRMWARE))
const hodometroDaCan = M.diagnostico.can.sinais.find((s) => s.id === 'hodometro')

const nada = () => {}
const revisar = (nome, motivo) => (
  <ItemDoChecklist estado="revisar" nome={nome} nomeGlifo="ainda não"
    linhas={[{ texto: 'revisar em seguida', tom: 'forte' }, { texto: motivo }]}
    acao={<BotaoDaLinha tam="teste" letra="secundario" aoTocar={nada}>Reenviar</BotaoDaLinha>} />
)
const pilha = { display: 'flex', flexDirection: 'column', gap: 'var(--e-10)' }
// o cartão com a largura da tela, 16 de cada lado: a moldura de recheio 0 tem a borda de 1
const naTela = { padding: '0 calc(var(--e-16) - var(--traco-borda))' }

export const especimes = [
  // ── a linha de checagem · cinco estados ──
  // não há 'parou aqui' (era da pré-checagem); há o 'só informa' (a T07);
  // o 'não se aplica' é o da assertiva da sessão (dupla, o círculo com o traço) e o 'ainda não', o relógio.
  // Lei 23: as quatro recortadas da T07 mostram a linha de 50 do módulo, a do app
  // (variante diagnostico: a medida da linha de conferência, com a tinta da checagem)
  { id: 'f4-aprovada', folha: 4, rotulo: 'aprovada', legenda: 'check lima · valor em --tinta-secundaria',
    render: () => <Lista><LinhaChecagem variante="diagnostico" estado="aprovada" titulo="Serial no cadastro" valor="VL06 FULL" /></Lista> },
  { id: 'f4-reprovada', folha: 4, rotulo: 'reprovada, com causa', legenda: 'X, título e valor em vermelho · a causa embaixo',
    render: () => <Lista><LinhaChecagem variante="diagnostico" estado="reprovada" titulo="Firmware" causa={`homologadas ${foraDaLista.matriz.firmwares.join(' e ')}`} valor={foraDaLista.firmware} /></Lista> },
  { id: 'f4-nao-se-aplica', folha: 4, rotulo: 'não se aplica', legenda: 'traço · a assertiva que não vale pra este ativo',
    render: () => <Lista><LinhaChecagem variante="dupla" estado="nao-se-aplica" glifo="traco-circulo" titulo="Faixa de contadores" valor="não se aplica" /></Lista> },
  { id: 'f4-so-informa', folha: 4, rotulo: 'só informa', legenda: 'i cinza · o valor à direita · a frase diz que dá pra seguir',
    render: () => <Lista><LinhaChecagem variante="diagnostico" estado="informa" titulo="Modem" causa="dá pra seguir · o checklist registra" valor="sem sinal" /></Lista> },
  { id: 'f4-ainda-nao', folha: 4, rotulo: 'ainda não', legenda: 'círculo apagado · valor em traço',
    render: () => <Lista><LinhaChecagem variante="diagnostico" estado="ainda-nao" glifo="relogio" titulo="Alimentação" valor="—" /></Lista> },
  // a reprovada, com causa, com a ação embaixo (T11/00): o par do bloco que não bate e o
  // Corrigir este bloco embaixo dele, alinhado ao nome — o recorte da tela, com o cartão de 328
  { id: 'f4-reprovada-acao', folha: 4, tela: true, rotulo: 'com a ação embaixo · T11/00', legenda: 'a ação do técnico embaixo do par, alinhada ao nome · o poço no meio do bloco',
    render: () => (
      <Lista>
        <LinhaChecagem variante="conferencia" estado="diverge" nomeGlifo="falha" titulo="Cercas"
          par={{ modulo: 'no módulo · 3 regiões', cadastro: 'no cadastro · 4 regiões' }}
          embaixo={<BotaoDaLinha tam="teste" letra="secundario" aoTocar={nada}>Corrigir este bloco</BotaoDaLinha>} />
      </Lista>
    ) },

  // ── a linha revisar em seguida (T13/43), fora da bancada ──
  { id: 'f4-revisar', folha: 4, semBancada: true, rotulo: 'a linha revisar em seguida · T13/43',
    legenda: 'o relógio, o nome, revisar em seguida, o motivo e o Reenviar · enquanto existir, o Finalizar fica desligado',
    render: () => (
      <div>
        <ItemDoChecklist estado="ok" nome="Cercas" valor="confere" nomeGlifo="aprovado" />
        {revisar('Leitor', 'usa os cartões que as cercas apagaram')}
        {revisar('Eventos', 'usam as cercas e o leitor')}
        <ItemDoChecklist estado="espera" nome="Autoteste" valor="roda ao encerrar" nomeGlifo="ainda não" divisoria={false} />
      </div>
    ) },

  // ── a família da linha de lista · uma peça, sete contextos ──
  // não há 'diagnóstico com sessão' (seria cópia da linha de conferência); a lista longa
  // é de 44, recortada da CAN lida (T07/01): o hodômetro
  { id: 'f4-lista-longa', folha: 4, rotulo: 'lista longa', legenda: 'média · 44 · a CAN e o checklist',
    render: () => <Lista><LinhaChecagem variante="longa" titulo={hodometroDaCan.rotulo} valor={hodometroDaCan.lido} /></Lista> },
  { id: 'f4-passo-ciclo', folha: 4, rotulo: 'passo do ciclo', legenda: 'compacta · 38',
    render: () => <Lista><LinhaChecagem variante="passo" titulo="Ignição ligada" /></Lista> },
  { id: 'f4-assertiva', folha: 4, rotulo: 'assertiva da sessão', legenda: 'dupla · 50',
    render: () => <Lista><LinhaChecagem variante="dupla" titulo="Configuração" valor="confere" /></Lista> },
  { id: 'f4-conferencia', folha: 4, rotulo: 'linha de conferência', legenda: 'dupla · 50',
    render: () => <Lista><LinhaChecagem variante="conferencia" titulo="Cercas" valor="4 regiões" /></Lista> }, // a folha 4 (decisão 53)
  // decisão 54: os passos do ciclo parado do herói, os quatro da T14 (sem a ré e a porta)
  { id: 'f4-passos-prazo', folha: 4, rotulo: 'passos com o prazo estourado', legenda: 'a lista inteira da T14',
    render: () => (
      <Lista recheio="passos">
        {PASSOS.map((p, i) => {
          const ultimo = i === PASSOS.length - 1
          return <LinhaChecagem key={p.id} variante="passo" titulo={p.titulo} divisoria={!ultimo} folgaFim={ultimo} />
        })}
      </Lista>
    ) },

  // o que o servidor recebeu (T12/01, 04 e 05, decisão 41): a variante recebimento, fora
  // da folha 4 (semBancada), com os textos das referências; o cartão tem os 328 da tela
  { id: 'f4-recebimento', folha: 4, chrome: true, semBancada: true, rotulo: 'o que o servidor recebeu',
    legenda: 'fora da folha · o porquê embaixo, o veredito à direita · o traço é o indisponível (T12/04)',
    render: () => (
      <div style={naTela}>
        <Lista>
          <LinhaChecagem variante="recebimento" titulo="Posicionamento" porque="3 posições em 1 min 12 s" valor="conforme" />
          <LinhaChecagem variante="recebimento" estado="indisponivel" titulo="Eventos" porque="o pacote não declara a fila" valor="indisponível" />
          <LinhaChecagem variante="recebimento" titulo="Viagens" porque="1 viagem fechada · 1,1 km" valor="completa" divisoria={false} />
        </Lista>
      </div>
    ) },
  { id: 'f4-recebimento-pendente', folha: 4, chrome: true, semBancada: true, rotulo: 'o que o servidor recebeu · pendente',
    legenda: 'fora da folha · o relógio é o pendente: confere de novo por 24 h (T12/05)',
    render: () => (
      <div style={naTela}>
        <Lista>
          <LinhaChecagem variante="recebimento" estado="pendente" titulo="Posicionamento" porque="sem resposta · confere por 24 h" valor="pendente" />
          <LinhaChecagem variante="recebimento" titulo="Eventos" porque="o teste chegou em 52 s" valor="conforme" />
          <LinhaChecagem variante="recebimento" titulo="Viagens" porque="1 viagem fechada · 1,1 km" valor="completa" divisoria={false} />
        </Lista>
      </div>
    ) },

  // ── vazio, comparação e histórico ──
  // as três de empresa (a lei 18, decisão 56), com os textos da folha 4: a Viação, a atual, e a
  // Expresso Caruaruense, de pacote vencido, que diz a idade e que venceu (decisão 64) e se escolhe como as outras
  { id: 'f4-historico', folha: 4, rotulo: 'linha do histórico', legenda: 'placa, módulo e hora · o veredito à direita',
    render: () => <Lista><LinhaHistorico placa="RKT-8H42" detalhe="M2C-0417 · 11:47" veredito="aprovada" divisoria={false} /></Lista> },
  { id: 'f4-empresa', folha: 4, rotulo: 'linha de empresa', legenda: 'na folha · o pacote e a contagem',
    render: () => <LinhaEmpresa nome="Transportes Capibaribe" pacote="carregado há 4 dias" rotuloContagem="ATIVOS" contagem={34} /> },
  { id: 'f4-empresa-atual', folha: 4, rotulo: 'linha de empresa · a atual', legenda: 'o marcador lima de 11px',
    render: () => <LinhaEmpresa estado="atual" nome="Viação Atlântico Sul" pacote="carregado ontem, 07:10" rotuloContagem="ATIVOS" contagem={24} /> },
  { id: 'f4-lista-empresas', folha: 4, rotulo: 'a lista de empresas', legenda: 'na folha, com as três',
    render: () => (
      <Lista>
        <LinhaEmpresa estado="atual" nome="Viação Atlântico Sul" pacote="carregado ontem, 07:10" rotuloContagem="ATIVOS" contagem={24} />
        <LinhaEmpresa nome="Transportes Capibaribe" pacote="carregado há 4 dias" rotuloContagem="ATIVOS" contagem={34} />
        <LinhaEmpresa nome="Expresso Caruaruense" pacote="carregado há 8 dias, vencido" rotuloContagem="ATIVOS" contagem={18} divisoria={false} />
      </Lista>
    ) },
  // a que espera o envio terminar (T04/08): o tracinho vazio no poço, sem toque · fora da folha 4
  { id: 'f4-empresa-espera', folha: 4, semBancada: true, rotulo: 'linha de empresa · espera o envio',
    legenda: 'fora da folha · o tracinho vazio no poço, o nome apagado e o que ela espera, sem toque (T04/08)',
    render: () => <LinhaEmpresa estado="espera" nome="Transportes Capibaribe" pacote="espera o envio terminar" nomeGlifo="ainda não" rotuloContagem="ATIVOS" contagem={34} divisoria={false} /> },

  // ── folha 1 · a linha tocável ──
  { id: 'f1-linha-tocavel', folha: 1, rotulo: 'linha tocável · normal e pressionada', legenda: 'o fundo sobe pra --elevado no toque',
    render: () => (
      <div style={pilha}>
        <LinhaTocavel titulo="Transportes Capibaribe" valor="34 ativos" />
        <LinhaTocavel titulo="Transportes Capibaribe" valor="34 ativos" forcaToque />
      </div>
    ) },

  // ── folha 3 · a escolha numa lista ──
  { id: 'f3-escolha-lista', folha: 3, rotulo: 'escolha numa lista', legenda: 'o quadrado lima cheio é o escolhido',
    render: () => <Lista><LinhaEscolha estado="escolhida" nome="Viação Atlântico Sul" detalhe="pacote de ontem, 07:10" valor="24 ativos" /></Lista> },
]
