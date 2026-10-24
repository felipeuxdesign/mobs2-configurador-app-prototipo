// Os textos da T01, copiados do 02-telas/T01-login/textos.md — nunca
// redigitados. Onde o texto traz um dado (o telefone, os minutos, o que resta),
// a função monta com o valor do mock que a tela passa; o resto é a letra da
// referência. Os nomes pro leitor de tela que só o HTML tem (o h1 escondido
// 'Entrar', 'Mostrar a senha', 'Limpar o usuário', 'Fechar', o alt 'Mobs2') vêm das referências.
export const TX = {
  // o login · 00 e 01
  entrar: 'Entrar',
  entrando: 'Entrando…', // a espera do Entrar: sem referência, o texto é nosso
  configurador: 'CONFIGURADOR',
  logo: 'Mobs2',
  usuario: 'USUÁRIO',
  senha: 'SENHA',
  mostrarSenha: 'Mostrar a senha',
  ocultarSenha: 'Ocultar a senha',
  lembrar: 'Lembrar meu usuário',
  esqueci: 'Esqueci a senha',
  erroTitulo: 'USUÁRIO OU SENHA INCORRETOS',
  erroFrase: 'Confira os dois e entre de novo.',
  // o Entrar apagado diz o que falta: o usuário (15) e a senha (01 e 16)
  digiteUsuario: 'Digite o usuário',
  digiteSenha: 'Digite a senha',
  // 16 · o xis do usuário lembrado (o nome do botão vem da referência)
  limparUsuario: 'Limpar o usuário',
  // 14 · o login sem conexão (o mundo real): o aviso cinza, e os campos ficam
  semConexao: 'SEM CONEXÃO',
  semConexaoFrase: 'O login precisa de internet.',

  // a recuperação · o cabeçalho do passo
  recuperar: 'RECUPERAR ACESSO',
  de: (total) => `de ${total}`,
  voltarLogin: 'Voltar ao login',

  // 02 · 20 · 21 · a primeira etapa: o técnico escolhe o
  // canal e digita o dado — nenhum contato do cadastro aparece, nem mascarado
  depois: 'Depois: o código · a nova senha',
  tituloCanal: ['Para onde mandamos', 'o código?'],
  telefone: 'TELEFONE',
  email: 'E-MAIL',
  // o motivo colado no campo, enquanto o formato está errado: 'Faltam 2 números.' (a 02).
  // O singular não tem referência: a mesma frase, no número
  faltam: (n) => (n === 1 ? 'Falta 1 número.' : `Faltam ${n} números.`),
  // os nomes pro leitor de tela do seletor e dos campos, que se veem pela sigla e pelo título
  paisRotulo: (pais, codigo) => `País: ${pais}, ${codigo}`,
  campoTelefone: 'Telefone',
  campoEmail: 'E-mail',
  // 22 · o seletor de país, com busca
  pais: 'País',
  buscarPais: 'Buscar país',
  valePorMinutos: (min) => `Vale por ${min} minutos`,
  restaEnvio: (n) => `resta ${n} envio nesta hora`,
  enviarCodigo: 'Enviar o código',

  // 03 · 05 · 06 · 07 · 12 · 13 · 17 · o código. A resposta ao envio é sempre a mesma,
  // exista a conta ou não, e a mesma mensagem vale pro código errado e pro vencido
  // os textos vêm do mock (credenciais.recuperacao), como o textos.md
  respostaEnvio: 'Se houver conta com este dado, o código foi enviado.',
  invalido: ['Código inválido', 'ou vencido'], // o texto é leitura nossa: a mesma mensagem pros dois, sem texto na referência
  digite: 'Digite o código',
  valePor: 'VALE POR',
  tentativasRestantes: 'TENTATIVAS RESTANTES',
  naTerceira: 'na terceira, o código expira',
  pecaNovoFrase: 'peça um código novo',
  // a espera do reenvio, no resto do recuperar, se chama "reenviar em" (decisão 31)
  reenviarEm: (seg, n) => `Reenviar em ${seg} s · resta ${n} envio nesta hora`,
  reenviarEmUltimo: (seg) => `Reenviar em ${seg} s · este foi o último envio desta hora`,
  reenvioLiberado: (n) => `Reenvio liberado · resta ${n} envio nesta hora`,
  // 17 · o teto: os 3 envios da hora acabaram, e a hora em que libera (o caso teto-de-envios)
  acabaram: (n, hora) => `Os ${n} envios desta hora acabaram · libera às ${hora}`,
  // 23 · a folha Não recebi o código no teto: por que as duas saídas esperam, e a hora em que liberam
  acabaramNaFolha: (n, hora) => `Os ${n} envios desta hora acabaram: as duas saídas liberam às ${hora}. O código já enviado segue valendo.`,
  aindaVale: (tempo) => `Ainda vale por ${tempo}`,
  aindaValeEReenvio: (tempo, seg) => `Ainda vale por ${tempo} · reenviar em ${seg} s`,
  pecaNovo: (n) => `Peça um código novo · resta ${n} envio nesta hora`,
  naoRecebi: 'Não recebi o código',
  confirmar: 'Confirmar',
  // 12 · 13 · o Confirmar apagado diz o que falta, com as células vazias
  digiteCodigo: 'Digite o código',
  tentarDeNovo: 'Tentar de novo',
  enviarOutro: 'Enviar outro código',

  // 04 · 11 · a folha: duas saídas (decisão 32). A espera é a contagem no
  // lugar da seta (o minSeg do reenvio), sem texto na linha (decisão 31).
  // Reenviar pro mesmo dado, ou voltar pra primeira etapa
  fechar: 'Fechar',
  reenviarCodigo: 'Reenviar o código',
  paraOMesmo: 'para o mesmo dado',
  usarOutro: 'Usar outro dado',
  voltaPrimeira: 'volta pra primeira etapa',

  // 08 · a senha nova
  seisItens: 'Os seis itens marcam sozinhos',
  crieSenha: 'Crie a nova senha',
  codigoConferido: 'Código conferido',
  requisitos: {
    tamanho: (r) => `${r.minimo} caracteres ou mais`,
    caixas: () => 'Maiúscula e minúscula',
    numero: () => 'Um número',
    simbolo: () => 'Um símbolo (!@#$…)',
    'sem-usuario-nem-sequencia': () => 'Sem seu usuário nem sequências',
    'diferente-das-ultimas': (r) => `Diferente das ${r.ultimas} últimas`,
  },
  confereAoSalvar: 'confere ao salvar',
  salvarEntrar: 'Salvar e entrar',

  // 09 · o diálogo
  senhaAlterada: 'Senha alterada',
  senhaAlteradaFrase: 'A senha nova já vale. Os outros aparelhos saíram da sua conta.',
  entrarComNova: 'Entrar com a senha nova',
}
