// Folha 6 · a família entrada: o cabeçalho do conteúdo, a marca, digitar,
// escolher e a lista com contagem. Os textos são os da folha, exatos. A folha
// não tem o contador de falha nem a tira de leituras (eram da T07 antiga): o
// cabeçalho com contador é o do Diagnóstico do módulo, e a lista é a baixa da T03.
// O checkbox (primitivo) está em f6-checkbox.jsx; a linha de opção é do chrome.
// A lista em cartão é a da família linhas (folha 4): a mesma peça, uma vez só.
// O botão secundário da folha 6 é o grupo aceso · desligado · dentro da linha, sem a moldura
// tracejada da régua (scripts/especime.mjs): fica fora da bancada (semBancada), conferido
// pela T09/10, 14 e 15 e pela T13/43; o secundário solto, a peça BotaoSecundario, também. O
// botão da linha (T14/08) entra na bancada, no recorte da tela.
import { SoIcone } from '../../ds/index.js'
import { Lista } from '../../ds/linhas/Lista.jsx'
import { LinhaChecagem } from '../../ds/linhas/index.js'
import {
  CabecalhoConteudo, Marca, Campo, CampoTexto, Requisito, Codigo, LinkConteudo, Busca, Justificativa,
  LinhaModulo, LinhaOnibus, BlocoEscolhido, CartaoAcao, OQueConferir, BotaoSecundario, LinhaContagem,
  BotaoDaLinha, RespostasDaLinha,
} from '../../ds/entrada/index.js'
import { CARTAO_LIDO } from '../../telas/T14/ciclo.js'

// "botões só de ícone": os dois lado a lado, cada um com a margem que ele tem
// na tela dele (o X da folha sai 10 pra borda; o olho, 6 pro recheio do campo)
const fileira = { display: 'flex', gap: 'var(--e-20)', alignItems: 'center' }
const encostaX = { display: 'flex', marginRight: 'calc(-1 * var(--e-10))' }
const encostaOlho = { display: 'flex', marginRight: 'calc(-1 * var(--e-6))' }
const nada = () => {}
// o botão da linha na T14/08: as duas respostas embaixo do passo lido, 2 em cima e 10 embaixo, e
// a divisória do passo por baixo delas (t14.css: .t14-respostas e .t14-passo-extra-divisoria)
const respostasDoPasso = { padding: 'var(--e-2) 0 var(--e-10) 0', borderBottom: 'var(--traco-borda) solid var(--divisoria)' }

export const especimes = [
  // o cabeçalho do conteúdo
  { id: 'f6-cabecalho-contador', folha: 6, rotulo: 'com contador', legenda: 'o contador conta o que passou · lima quando completo',
    render: () => <CabecalhoConteudo titulo="Diagnóstico do módulo" contagem="7" unidade="de 7" tom="veredito" /> },

  // a marca
  { id: 'f6-marca', folha: 6, rotulo: 'a marca no login', legenda: 'o logo e CONFIGURADOR entre dois traços',
    render: () => <Marca nome="CONFIGURADOR" rotuloLogo="Mobs2" /> },

  // digitar
  { id: 'f6-campo', folha: 6, rotulo: 'campo', legenda: 'rótulo em cima · poço de 48',
    render: () => <Campo rotulo="USUÁRIO" valor="r.vieira" /> },
  { id: 'f6-campo-focado', folha: 6, rotulo: 'campo focado', legenda: 'rótulo e traço de baixo em lima',
    render: () => (
      <Campo rotulo="SENHA" valor="••••••••••••••" oculto focado
        acao={<SoIcone icone="olho" rotulo="Mostrar a senha" cor="marca-limite" />} />
    ) },
  // o campo vazio diz o que pede (T13/42): o do que aconteceu, com os 64 da T13
  { id: 'f6-campo-vazio', folha: 6, tela: true, rotulo: 'campo · vazio · T13/42', legenda: 'o campo vazio diz o que pede, em --marca-limite · some quando o técnico escreve',
    render: () => <div className="vitrine-campo-da-t13"><CampoTexto rotulo="O QUE ACONTECEU" placeholder="Conte o que aconteceu" /></div> },
  { id: 'f6-senha-visivel', folha: 6, rotulo: 'senha visível', legenda: 'o olho riscado esconde de novo · o nome muda pra Ocultar a senha',
    render: () => (
      <Campo rotulo="SENHA" valor="Patio#Varzea26" focado
        acao={<SoIcone icone="olho-riscado" rotulo="Ocultar a senha" cor="marca-limite" />} />
    ) },
  // a variante do campo, com o xis no lugar do olho (T01/16)
  { id: 'f6-usuario-lembrado', folha: 6, rotulo: 'usuário lembrado', legenda: 'o xis no lugar do olho · limpa o campo e esquece o usuário',
    render: () => <Campo rotulo="USUÁRIO" valor="r.vieira" lembrado rotuloLimpar="Limpar o usuário" /> },
  { id: 'f6-requisitos', folha: 6, rotulo: 'requisitos da senha', legenda: 'cada regra vira check quando a senha cumpre',
    render: () => <Requisito texto="10 caracteres ou mais" cumprido /> },
  { id: 'f6-codigo', folha: 6, rotulo: 'código · seis células', legenda: 'uma célula por dígito',
    render: () => <Codigo digitos="482913" focado rotulo="Código" /> },
  { id: 'f6-codigo-errado', folha: 6, rotulo: 'código errado', legenda: 'as células ficam vermelhas',
    render: () => <Codigo digitos="482911" errado rotulo="Código" /> },
  { id: 'f6-link-conteudo', folha: 6, rotulo: 'link dentro do conteúdo', legenda: 'sublinhado · ação sobre o que está perto',
    render: () => <LinkConteudo>Não recebi o código</LinkConteudo> },
  { id: 'f6-busca', folha: 6, rotulo: 'campo de busca', legenda: 'lupa e dica · quando a lista é longa',
    render: () => <Busca dica="Buscar placa, frota ou módulo" /> },
  { id: 'f6-justificativa', folha: 6, rotulo: 'justificativa', legenda: 'o não conforme com o porquê',
    render: () => (
      <Justificativa opcao="Não está conforme" legenda="conte embaixo o que aconteceu" marcado rotulo="O QUE ACONTECEU" focado
        valor="Suporte trincado; fixei com abraçadeira até a troca." />
    ) },
  // decisão 39: a caixa antes de marcar, fora da folha 6 (semBancada), com o texto da T13/07
  { id: 'f6-justificativa-desmarcada', folha: 6, rotulo: 'justificativa · desmarcada', semBancada: true,
    legenda: 'fora da folha · a caixa antes de marcar, com o que marcar pede (T13/07)',
    render: () => <Justificativa opcao="Não está conforme" legenda="marque e conte o que aconteceu" /> },
  { id: 'f6-so-icone', folha: 6, rotulo: 'botões só de ícone', legenda: 'fechar e mostrar a senha · com nome pro leitor de tela',
    render: () => (
      <div style={fileira}>
        <span style={encostaX}><SoIcone icone="fechar" rotulo="Fechar" /></span>
        <span style={encostaOlho}><SoIcone icone="olho" rotulo="Mostrar a senha" cor="marca-limite" /></span>
      </div>
    ) },

  // escolher
  { id: 'f6-linha-modulo', folha: 6, rotulo: 'linha de módulo', legenda: 'serial e variante · T05',
    render: () => <Lista><LinhaModulo serial="M2C-0362" variante="VL06 · CAN" /></Lista> },
  { id: 'f6-linha-onibus', folha: 6, rotulo: 'linha de ônibus', legenda: 'placa, modelo e frota · T06',
    render: () => <LinhaOnibus placa="RKT-8H42" modelo="Ônibus urbano OF-1621" rotuloFrota="FROTA" frota="1003" /> },
  // a folha 6 não tem o escolhido com trava da T05; o bloco escolhido é peça da T06
  { id: 'f6-escolhido', folha: 6, rotulo: 'bloco escolhido', legenda: 'traço lima embaixo = o escolhido, na hora de confirmar · T06',
    render: () => <BlocoEscolhido justo rotulo="ESCOLHIDO" identidade="RKT-8H42" detalhe="frota 1003" /> },
  { id: 'f6-escolhido-trava-t06', folha: 6, rotulo: 'escolhido com trava · T06', legenda: 'a placa com o motivo embaixo, e o caminho que resolve',
    render: () => (
      <BlocoEscolhido falha rotulo="FORA DO PACOTE DESTA EMPRESA" identidade="PHS-2C47" detalhe="frota 3008 · Ônibus urbano OF-1621"
        motivo={['Pertence à Expresso Caruaruense.', 'É uma das suas empresas: troque de empresa pra instalar nele.']}
        style={{ marginBottom: 'var(--respiro)' }} />
    ) },
  { id: 'f6-cartao-acao', folha: 6, rotulo: 'cartão que pede ação', legenda: 'o erro que precisa dele',
    render: () => (
      <CartaoAcao rotulo="UM PRECISA DE VOCÊ" titulo="Evidências · KJC-7N23" descricao="instalação encerrada por outro usuário"
        acao="Ressincronizar e reenviar" />
    ) },
  // as causas da T13/09, sem o traço vermelho (a T05/04 leva o traço, `falha`)
  { id: 'f6-o-que-conferir', folha: 6, rotulo: 'o que conferir', legenda: 'as causas de uma falha, numeradas, antes de tentar de novo',
    render: () => (
      <OQueConferir rotulo="O QUE CONFERIR" causas={[
        { titulo: '1 · Bateria do ônibus', texto: '— carga e terminais' },
        { titulo: '2 · Cabo de alimentação', texto: '— encaixe firme' },
        { titulo: '3 · Ponto de ligação', texto: '— direto na bateria, sem queda' },
      ]} />
    ) },
  // o botão secundário: a peça solta, o compacto e o desligado ficam fora da bancada
  { id: 'f6-secundario', folha: 6, semBancada: true, rotulo: 'botão secundário', legenda: 'fill --fundo-botao, borda --borda-botao, texto --tinta · um desenho só em todo o app',
    render: () => <BotaoSecundario>Ressincronizar e reenviar</BotaoSecundario> },
  { id: 'f6-secundario-compacto', folha: 6, semBancada: true, rotulo: 'botão secundário · compacto', legenda: '46 de desenho e 15 de letra, o toque de 48 por fora (T15/02) · o mesmo fill e a mesma borda',
    render: () => <BotaoSecundario compacto>Ressincronizar e reenviar</BotaoSecundario> },
  { id: 'f6-secundario-desligado', folha: 6, semBancada: true, rotulo: 'botão secundário · desligado', legenda: 'sem o fill: fundo e borda de cartão, texto --tinta-apagada · o fill e a borda separam o ligado do desligado',
    render: () => <BotaoSecundario desabilitado>Ressincronizar e reenviar</BotaoSecundario> },

  // o secundário da linha: 36 no cartão dos dependentes, 30 dentro de uma linha (fora da bancada)
  { id: 'f6-botao-secundario', folha: 6, semBancada: true, rotulo: 'o botão secundário · aceso, desligado, dentro da linha',
    legenda: '36 no cartão dos dependentes, 30 dentro de uma linha · a área de toque cresce até 48 sem aparecer',
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--e-20)', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 'var(--e-12)' }}>
          <BotaoDaLinha tam="pergunta" aoTocar={nada}>Reenviar o leitor</BotaoDaLinha>
          <BotaoDaLinha tam="pergunta" desabilitado>Reenviar os eventos</BotaoDaLinha>
        </div>
        <BotaoDaLinha tam="teste" letra="secundario" aoTocar={nada}>Reenviar</BotaoDaLinha>
      </div>
    ) },
  // o botão da linha (T14/08): o passo do cartão lido e as duas respostas embaixo, lado a lado a 8
  { id: 'f6-botao-linha', folha: 6, tela: true, rotulo: 'o botão da linha · T14/08', legenda: 'a resposta na própria linha: 40 de alto, os dois lado a lado a 8 · no toque afunda, como o secundário',
    render: () => (
      <Lista recheio="passos">
        <LinhaChecagem variante="passo" estado="agora" titulo="Cartão do motorista" valor={`leu ${CARTAO_LIDO}`} divisoria={false} />
        <div style={respostasDoPasso}>
          <RespostasDaLinha>
            <BotaoDaLinha letra="secundario" aoTocar={nada}>Confere com o cartão</BotaoDaLinha>
            <BotaoDaLinha letra="secundario" aoTocar={nada}>Não confere</BotaoDaLinha>
          </RespostasDaLinha>
        </div>
      </Lista>
    ) },

  // a lista com contagem · a baixa do pacote (T03/01): a divisória entre as linhas e
  // nenhuma depois da última, a regra da peça; a folha desenha só a dos Ativos
  // (diferença conhecida da referência, na tela.md da T03)
  { id: 'f6-lista-contagem', folha: 6, rotulo: 'lista com contagem', legenda: 'o pacote baixando',
    render: () => (
      <Lista>
        <LinhaContagem nome="Ativos" contagem="6 de 10" estado="agora" />
        <LinhaContagem nome="Conexões" contagem="—" estado="espera" />
        <LinhaContagem nome="Modelos de ativo" contagem="—" estado="espera" />
        <LinhaContagem nome="Eventos" contagem="—" estado="espera" />
        <LinhaContagem nome="Cercas" contagem="—" estado="espera" divisoria={false} />
      </Lista>
    ) },
]
