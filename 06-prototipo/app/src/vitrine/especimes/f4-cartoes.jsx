// Folha 4 · os cartões de ferramenta do menu, o aviso nos quatro usos, o
// vazio declarado, as notas e os dados do modelo. Texto exato da folha.
// O cartão é o Diagnóstico do módulo, o Finalizar com checklist ocupa a linha,
// a falha do login está no aviso de falha, a nota com rótulo é o fato declarado
// da T04/11 (o tom fato, o que a T04 usa), e não há par comparado (sem o chassi).
// O cartão dos dependentes (a manutenção da T09) nos três momentos — a pergunta, o fica
// para depois e o confere —, cada um a peça em uso na tela, com o texto dela: a folha 4
// os desenha sem a moldura tracejada da régua (scripts/especime.mjs), e eles ficam fora da
// bancada (semBancada), conferidos pela T09/10, 19 e 20.
import { CartaoFerramenta, GradeFerramentas, Aviso, Vazio, Nota, DadosDoModelo } from '../../ds/cartoes/index.js'
import { Pergunta } from '../../telas/T09/Pergunta.jsx'

// o aviso de falha do login (T01): a folga de 4 embaixo, como a T01 desenha (.t01-aviso)
const comFolgaDoLogin = { display: 'flex', flexDirection: 'column', marginBottom: 'var(--e-4)' }

// o cartão dos dependentes: o Leitor e os Eventos, na ordem do script
const nada = () => {}
const LEITOR = { bloco: 'leitor', rotulo: 'Leitor', motivo: 'usa os cartões que as cercas apagaram' }
const EVENTOS = { bloco: 'eventos', rotulo: 'Eventos', motivo: 'usam as cercas e o leitor' }
const pergunta = (leitor) => (
  <Pergunta aoReenviar={nada} aoDeixar={nada} itens={[
    { ...LEITOR, decisao: leitor, liberado: true },
    { ...EVENTOS, motivo: leitor ? EVENTOS.motivo : `${EVENTOS.motivo} · libera depois do leitor`, decisao: null, liberado: !!leitor },
  ]} />
)

export const especimes = [
  // cartões de ferramenta · o menu
  { id: 'f4-cartao-disponivel', folha: 4, rotulo: 'disponível', legenda: 'ícone em poço · nome embaixo',
    render: () => <GradeFerramentas><CartaoFerramenta icone="can" titulo="Diagnóstico do módulo" /></GradeFerramentas> },
  { id: 'f4-cartao-decide-agora', folha: 4, rotulo: 'decide agora', legenda: 'borda lima · o próximo passo',
    render: () => <CartaoFerramenta largo estado="decide" icone="conectar" poco={34} titulo="CONECTAR MÓDULO" valor="toque para procurar" /> },
  { id: 'f4-cartao-espera', folha: 4, rotulo: 'espera', legenda: 'tracejado · a causa no lugar da ação',
    render: () => <GradeFerramentas><CartaoFerramenta estado="espera" titulo="Diagnóstico do módulo" causa="espera módulo" /></GradeFerramentas> },
  { id: 'f4-cartao-conectado', folha: 4, rotulo: 'conectado', legenda: 'o cartão largo com o serial',
    render: () => <CartaoFerramenta largo icone="conectar" titulo="CONECTAR MÓDULO" valor="M2C-0417" /> },
  { id: 'f4-cartao-com-pendencia', folha: 4, rotulo: 'com pendência', legenda: 'o contador no canto, igual ao da fila',
    render: () => <GradeFerramentas><CartaoFerramenta linha icone="checklist" titulo="Finalizar com checklist" contagem={11} /></GradeFerramentas> }, // o checklist da T04/04, 11, como o mock
  { id: 'f4-cartao-espera-a-rede', folha: 4, rotulo: 'espera a rede', legenda: 'sem conexão · fundo apagado, borda sólida, traço no poço',
    render: () => <GradeFerramentas><CartaoFerramenta estado="sem-rede" titulo="Últimas instalações" causa="sem conexão" /></GradeFerramentas> },

  // o cartão dos dependentes, fora da bancada
  { id: 'f4-pergunta', folha: 4, semBancada: true, rotulo: 'a pergunta · T09/10',
    legenda: 'um item por dependente, na ordem do script · o Reenviar dos eventos só liga depois do leitor', render: () => pergunta(null) },
  { id: 'f4-fica-para-depois', folha: 4, semBancada: true, rotulo: 'fica para depois · T09/19',
    legenda: 'o link vira fica para depois, e o Reenviar continua ao lado', render: () => pergunta('depois') },
  { id: 'f4-confere', folha: 4, semBancada: true, rotulo: 'confere · T09/20',
    legenda: 'as ações dão lugar ao check e a confere · reenviado', render: () => pergunta('reenviado') },

  // o aviso · um formato, quatro usos
  { id: 'f4-aviso-falha', folha: 4, rotulo: 'falha', legenda: 'traço vermelho embaixo',
    render: () => <div style={comFolgaDoLogin}><Aviso tom="falha" glifo="xis" poco={26} titulo="USUÁRIO OU SENHA INCORRETOS" frase="Confira os dois e entre de novo." /></div> },
  { id: 'f4-aviso', folha: 4, rotulo: 'aviso', legenda: 'o mesmo desenho, cinza, sem traço',
    render: () => <Aviso tom="neutro" glifo="sem-sinal-neutro" titulo="SEM CONEXÃO" frase="Esta é a consulta das 11:47." /> },
  { id: 'f4-aviso-processo-parado', folha: 4, rotulo: 'processo parado', legenda: 'o veredito de uma cadeia ou de um download',
    render: () => <Aviso glifo="xis" titulo="A CADEIA PAROU" frase="Cercas foi recusado. Os três seguintes nem começaram." /> },
  { id: 'f4-aviso-com-contagem', folha: 4, rotulo: 'com contagem', legenda: 'quantos não bateram, à direita',
    render: () => <Aviso glifo="xis" titulo="NÃO BATE COM O CADASTRO" numero={4} unidade="de 4" /> }, // as quatro que se comparam (decisão 53)

  // vazio, notas e os dados do modelo
  { id: 'f4-vazio-declarado', folha: 4, rotulo: 'vazio declarado', legenda: 'tracejado · título e uma frase · sem ícone',
    render: () => <Vazio titulo="Nada esperando envio" frase="O último item subiu às 14:02." /> },
  { id: 'f4-nota-tracejada', folha: 4, rotulo: 'nota tracejada', legenda: 'o que falta explicar, sem ser aviso',
    render: () => <Nota antesDoRodape titulo="NENHUM OUTRO POR PERTO" frase="Se não for este, aproxime o aparelho do módulo e procure de novo." /> },
  { id: 'f4-nota-com-rotulo', folha: 4, rotulo: 'nota com rótulo', legenda: 'o fato declarado, com o nome dele em cima',
    render: () => <Nota tom="fato" titulo="TRAVADO NA SESSÃO" frase="Enquanto a sessão estiver aberta, o ativo não troca. Pra trocar de ativo, encerre a sessão." /> },
  // os dados do modelo (decisão 46): o bloco de baixo do vínculo, como a T06/01
  { id: 'f4-dados-do-modelo', folha: 4, rotulo: 'os dados do modelo', legenda: 'rótulo em cima, valor grande · no vínculo',
    render: () => (
      <DadosDoModelo antesDoRodape frase="O M2C-0417 fica neste ativo, na Viação Atlântico Sul."
        dados={[{ rotulo: 'FABRICANTE', valor: 'Mercedes-Benz' }, { rotulo: 'MODELO', valor: 'OF-1621 · ônibus urbano' }]} />
    ) },
]
