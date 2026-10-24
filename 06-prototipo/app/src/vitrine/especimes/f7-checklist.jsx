// Folha 7 · checklist, evidência e processo. Os textos são os da folha.
// O checklist numa estrutura só (decisão 34): a seção
// é uma peça, fechada e aberta — de leitura ou de tocar —, os quatro tipos de
// item, o veredito e a ação da seção. A foto é uma peça com dois estados; a
// câmera do app, uma peça só. A folha não tem o mostrador (a T08), e as provas
// mostram os blocos, não a versão: o módulo não guarda versão (decisão 49).
// A seção A tem 3 itens (sem o chassi), o Painel foto a tirar fica na B (decisão 52), a
// foto tirada é o registro dentro do quadro, embaixo da foto (decisão 63: a câmera do app
// com a foto, T13/44, e o registro do problema, T13/15), as fotos de exemplo do mock ficam
// embaixo da evidência (desenhos, não peças: a do quadro e a do espécime são o mesmo SVG,
// e a segunda vez na página ganha o prefixo a7- nos ids), a ação da seção é o Fazer o ciclo de testes
// (decisão 54), e a foto a tirar não está na folha (a calibração não fotografa).
// As peças de outra família entram compostas: a Lista e a linha da fila esperando
// (linhas, folha 4) e o botão da linha e o campo (entrada, folha 6). O contador no
// menu é o com pendência da folha 4 (f4-cartoes.jsx).
// A Montagem no desenho de hoje (lei 23, T13/12 e 02) e as variantes da leitura na T13
// (38 a 42) são recortes da tela, com o cartão de 328 (tela). Nos três da Seção E (39, 40
// e 42), a folha recorta o corpo da seção aberta, sem a cabeça: o cartão e os itens com a
// divisória em cima, as classes da SecaoDoChecklist.
import {
  SecaoDoChecklist, ItemDoChecklist, VereditoDoChecklist, FotoProva, VisorCamera,
  BlocoEvento, LinhaFila, LinhaRechecagem, Prova,
} from '../../ds/checklist/index.js'
import { Lista, LinhaFilaEsperando } from '../../ds/linhas/index.js'
import { BotaoDaLinha, RespostasDaLinha, CampoTexto } from '../../ds/entrada/index.js'
import { blocosRelidos } from '../../telas/T16/dados.js'
import { fotoDeExemplo } from '../../dados/fotos.js'

// a moldura das fotos na folha 7: o quadro da câmera com 218 (a foto do problema, T13/15) e 294 de alto
// (a foto do módulo, T13/44), e cada foto de exemplo com 239 — a proporção da moldura da folha, no
// cartão de 328 (vitrine.css)
const REGISTRO_DO_PROBLEMA = { titulo: 'Problema fotografado às 14:30', legenda: 'vai junto com a ressalva, pro gestor' }
const REGISTRO_DA_FOTO = { titulo: 'Foto tirada às 14:30', legenda: 'confira se está nítida antes de usar' }
const FotoDeExemplo = ({ id, ativo, nome }) => (
  <div role="img" aria-label={`A foto de exemplo ${nome}`} className="vitrine-foto-exemplo" dangerouslySetInnerHTML={{ __html: fotoDeExemplo(id, ativo, 'a7-') }} />
)
const FOTOS_DE_EXEMPLO = [
  ['b-modulo', 'T13/44', 'do módulo'], ['b-lado-de-cima', 'T13/45', 'do lado de cima do módulo'], ['b-chicote', 'T13/46', 'do chicote'],
  ['b-leitor', 'T13/47', 'do leitor'], ['b-painel-legivel', 'T13/48', 'do painel', 'a-09'], ['problema', 'T13/15', 'do problema'],
]

// as seções como a folha desenha: a A aberta, de leitura; a B fechada e aberta, de tocar
const leituraDaA = [['Serial do módulo', 'M2C-0417'], ['Firmware', '8.04'], ['Ativo vinculado', 'RKT-8H42']]
const secaoALeitura = () => (
  <SecaoDoChecklist estado="aprovada" titulo="A · Identificação" quemAge="o app confere sozinho" feitos={3} de="de 3" aberta>
    {leituraDaA.map(([nome, valor], i) => <ItemDoChecklist key={nome} nome={nome} valor={valor} divisoria={i < leituraDaA.length - 1} />)}
  </SecaoDoChecklist>
)
const secaoBFechada = () => <SecaoDoChecklist estado="pendente" titulo="B · Montagem" quemAge="você fotografa 5 itens" feitos={0} de="de 5" />
const nada = () => {}
// a Montagem de hoje (T13/12): o Módulo com ressalva, e as fotos a tirar com a câmera e a seta
const fotosDaB = ['Lado de cima', 'Chicote', 'Leitor']
const fotoATirar = (nome, divisoria = true) => (
  <ItemDoChecklist key={nome} estado="pendente" icone="camera" nome={nome} valor="foto a tirar" valorDeEstado divisoria={divisoria} aoTocar={nada} />
)
const secaoBTocar = () => (
  <SecaoDoChecklist estado="pendente" titulo="B · Montagem" quemAge="você fotografa 4 itens" feitos={1} de="de 4" aberta>
    <ItemDoChecklist estado="ressalva" nome="Módulo" valor="com ressalva" valorDeEstado nomeGlifo="aprovado" />
    {fotosDaB.map((nome, i) => fotoATirar(nome, i < fotosDaB.length - 1))}
  </SecaoDoChecklist>
)
// a Seção D lida bloco a bloco (T13/38): os lidos com o check, o da vez lendo, os que esperam com o traço
const leituraDaD = [
  ['Limpeza', 'ok', 'confere'], ['Ativo', 'ok', 'confere'], ['Cercas', 'ok', 'confere'], ['Leitor', 'lendo', 'lendo'],
  ['Eventos', 'aguarda', '—'], ['Conexão', 'aguarda', '—'], ['Autoteste', 'espera', 'roda ao encerrar'],
  ['Canal de programação', 'aguarda', '—'], ['ID no cadastro', 'aguarda', '—'],
]
const secaoDLendo = () => (
  <SecaoDoChecklist estado="lendo" titulo="D · Configuração" quemAge="lendo do módulo" feitos={3} de="de 8" aberta>
    {leituraDaD.map(([nome, estado, valor], i) => (
      <ItemDoChecklist key={nome} estado={estado} nome={nome} valor={valor} apagado={estado === 'aguarda'} divisoria={i < leituraDaD.length - 1} />
    ))}
  </SecaoDoChecklist>
)
// o corpo da Seção E aberta, sem a cabeça (T13/39, 40 e 42): o Bip do leitor e a Ignição desligada
const corpoDaE = (bip) => (
  <div className="ds-secao-ck ds-secao-ck-aberta">
    <div className="ds-secao-ck-corpo">
      {bip}
      <ItemDoChecklist estado="pendente" nome="Ignição desligada" valor="a fazer" divisoria={false} />
    </div>
  </div>
)

export const especimes = [
  // ── o checklist
  { id: 'f7-secao-fechada', folha: 7, rotulo: 'seção fechada', legenda: 'quem age · a contagem · a seta', render: secaoBFechada },
  { id: 'f7-secao-aberta-leitura', folha: 7, rotulo: 'seção aberta · de leitura', legenda: 'o cartão cresce no lugar · as leituras sem seta', render: secaoALeitura },
  { id: 'f7-secao-aberta-tocar', folha: 7, tela: true, rotulo: 'seção aberta · de tocar', legenda: 'a Montagem no formato das outras seções (lei 23): a câmera no poço de 30, o estado à direita e a seta só na foto a tirar · T13/12', render: secaoBTocar },
  { id: 'f7-item-leitura', folha: 7, rotulo: 'item de leitura', legenda: 'sem seta · não toca',
    render: () => <Lista><ItemDoChecklist nome="Firmware" valor="8.04" /></Lista> },
  { id: 'f7-item-tocar', folha: 7, tela: true, rotulo: 'item de tocar', legenda: 'a câmera no poço de 30, foto a tirar à direita e a seta · abre a câmera · T13/02',
    render: () => <Lista>{fotoATirar('Lado de cima', false)}</Lista> },
  { id: 'f7-item-feito', folha: 7, rotulo: 'item feito', legenda: 'o check e de onde veio · sem seta',
    render: () => <Lista><ItemDoChecklist tipo="feito" nome="Módulo" divisoria={false} /></Lista> },
  { id: 'f7-item-ressalva', folha: 7, rotulo: 'item com ressalva', legenda: 'passou, mas diz a ressalva embaixo',
    render: () => <Lista><ItemDoChecklist tipo="ressalva" estado="ressalva" nome="Módulo" legenda="com ressalva · suporte trincado" /></Lista> },
  { id: 'f7-veredito', folha: 7, rotulo: 'o veredito', legenda: 'o topo do checklist homologado · o relatório embaixo',
    render: () => <VereditoDoChecklist titulo="Instalação homologada às 14:30" relatorio="o relatório leva 12 evidências, o local e o seu nome" /> },

  // ── as variantes da leitura na T13 (38 a 42), recortes da tela
  { id: 'f7-lendo', folha: 7, tela: true, rotulo: 'seção e item · lendo · T13/38', legenda: 'o app ainda lendo: o quadrado de agora no poço do cartão e no item da vez · o que ele não leu fica com o traço',
    render: secaoDLendo },
  { id: 'f7-acao-na-linha', folha: 7, tela: true, rotulo: 'a ação na linha · T13/39', legenda: 'o técnico age na própria linha, no lugar do valor · tocando, o botão diz o que faz e não toca',
    render: () => corpoDaE(
      <ItemDoChecklist estado="pendente" nome="Bip do leitor" acao={<BotaoDaLinha tam="teste" letra="secundario" desabilitado>Tocando…</BotaoDaLinha>} />,
    ) },
  { id: 'f7-abre-embaixo', folha: 7, tela: true, rotulo: 'o que a linha abre embaixo · T13/40', legenda: 'a pergunta e as respostas embaixo da linha, a 40 da esquerda, com o traço do bloco inteiro',
    render: () => corpoDaE(
      <ItemDoChecklist estado="pendente" nome="Bip do leitor" acao={<BotaoDaLinha tam="teste" letra="secundario" aoTocar={nada}>Testar bip</BotaoDaLinha>}
        embaixo={(
          <>
            <span className="t13-pergunta-bip">Você ouviu o bip?</span>
            <RespostasDaLinha>
              <BotaoDaLinha aoTocar={nada}>Ouvi</BotaoDaLinha>
              <BotaoDaLinha aoTocar={nada}>Não ouvi</BotaoDaLinha>
            </RespostasDaLinha>
          </>
        )} />,
    ) },
  // o bip respondido refaz a resposta (decisão 64): o *não ouvi* desce pra baixo do nome, e o Testar de novo fica à direita
  { id: 'f7-campo-embaixo', folha: 7, tela: true, rotulo: 'o campo embaixo da linha · T13/42', legenda: 'o não ouvi abre ali mesmo o campo do que aconteceu, vazio, dizendo o que pede · o Testar de novo refaz',
    render: () => corpoDaE(
      <ItemDoChecklist estado="reprovado" nome="Bip do leitor" resposta={{ texto: 'não ouvi', tom: 'falha' }} nomeGlifo="falha"
        acao={<BotaoDaLinha tam="teste" letra="secundario" aoTocar={nada}>Testar de novo</BotaoDaLinha>}
        embaixo={<div className="vitrine-campo-da-t13"><CampoTexto rotulo="O QUE ACONTECEU" placeholder="Conte o que aconteceu" /></div>} />,
    ) },

  // ── evidência
  // a tirada é o registro no lugar (o problema fotografado, T13/15); a a tirar não está na folha
  { id: 'f7-foto-tirada', folha: 7, rotulo: 'foto · tirada', tela: true, legenda: 'vira o registro no lugar, e deixa de ser tocável · diz onde mais ela vale',
    render: () => (
      <div className="vitrine-quadro-218">
        <VisorCamera foto={fotoDeExemplo('problema')} rotulo="A foto do problema, tirada às 14:30" registro={REGISTRO_DO_PROBLEMA} />
      </div>
    ) },
  // a câmera do app com a foto (decisão 63): a foto do item no quadro, e o registro embaixo dela
  { id: 'f7-visor-com-foto', folha: 7, rotulo: 'a câmera do app · com a foto · T13/44', tela: true, legenda: 'a foto congelada no quadro, com o registro embaixo · o item ainda não conta',
    render: () => (
      <div className="vitrine-quadro-294">
        <VisorCamera foto={fotoDeExemplo('b-modulo')} rotulo="A foto do módulo, tirada às 14:30" registro={REGISTRO_DA_FOTO} />
      </div>
    ) },
  // as fotos de exemplo do mock (04-dados/fotos/), uma por foto da Montagem e a do problema
  ...FOTOS_DE_EXEMPLO.map(([id, ref, nome, ativo]) => ({
    id: `f7-foto-${id}`, folha: 7, rotulo: `${id}${ativo ? ` · ${ativo}` : ''} · ${ref}`, tela: true, legenda: 'a foto de exemplo, o desenho do mock',
    render: () => <FotoDeExemplo id={id} ativo={ativo} nome={nome} />,
  })),
  // a câmera do app (T13/07, 08 e 17 a 20; a calibração não tem câmera, decisão 52): está
  // na folha 7, só com o ícone (decisão 60: o que enquadrar fica na frase embaixo do
  // título, na tela), e entra na bancada. A sem a permissão segue fora da folha
  // (semBancada): não tem referência nem estado na coluna, e é aqui que ela se vê
  { id: 'f7-visor-camera', folha: 7, rotulo: 'a câmera do app', legenda: 'só no checklist · só o ícone no quadro: o que enquadrar fica na frase embaixo do título',
    render: () => <VisorCamera /> },
  { id: 'f7-visor-sem-permissao-item', folha: 7, rotulo: 'a câmera do item · sem a permissão', semBancada: true, legenda: 'fora da folha · no checklist, sem texto aprovado: só a câmera riscada',
    render: () => <VisorCamera semPermissao /> },
  { id: 'f7-acao-secao', folha: 7, rotulo: 'a ação da seção', legenda: 'uma linha só com seta · o resto da seção é leitura',
    render: () => <Lista><ItemDoChecklist tipo="tocar" icone="ciclo" nome="Fazer o ciclo de testes" legenda="até 4 passos, com o ônibus parado" aoTocar={() => {}} /></Lista> },

  // ── processo e prova
  { id: 'f7-bloco-evento', folha: 7, rotulo: 'bloco do evento', legenda: 'o que foi disparado e recebido',
    render: () => (
      <BlocoEvento rotulo="EVENTO DE TESTE" linhas={[
        { texto: 'disparado pelo app', estado: 'feito', valor: '14:30' },
        { texto: 'recebido no servidor', estado: 'aguarda' },
        { texto: 'campos conferidos', estado: 'aguarda' },
      ]} />
    ) },
  { id: 'f7-fila-esperando', folha: 7, rotulo: 'linha da fila · esperando', legenda: 'o que ainda não subiu',
    render: () => <LinhaFilaEsperando titulo="Checklist" detalhe="RSW-9L02 · na fila" quando="há 18 min" /> },
  { id: 'f7-linha-fila', folha: 7, rotulo: 'linha da fila · recebida', legenda: 'o que sobe e quando',
    render: () => <LinhaFila estado="ok" titulo="Evidências" legenda="RSW-9L02 · recebida" quando="10/03, 10:05" /> },
  { id: 'f7-linha-rechecagem', folha: 7, rotulo: 'linha da re-checagem', legenda: 'a Seção F esperando o servidor',
    render: () => <LinhaRechecagem titulo="RVM-1E54" legenda="recebimento pendente" prazo="confere em 24 h" /> },
  // a prova da cadeia fica sem uso nas telas (a cadeia concluída da T09 diz o resultado na faixa
  // do com contagem): o espécime é o da folha 7, com a folga de 16 até o rodapé que ela desenha
  { id: 'f7-prova-cadeia', folha: 7, rotulo: 'prova da cadeia', legenda: 'os seis blocos, gravados e relidos',
    render: () => <Prova tipo="cadeia" rotulo="GRAVADO E RELIDO" versao={blocosRelidos()} legenda="o módulo devolveu os seis blocos" style={{ marginBottom: 'var(--respiro)' }} /> },
  { id: 'f7-prova-sessao', folha: 7, rotulo: 'prova da sessão', legenda: 'o que sobreviveu ao reinício',
    render: () => <Prova tipo="sessao" rotulo="A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO" versao={blocosRelidos()} legenda="relido do módulo depois de desligar e ligar" /> },
]
