// O recuperar acesso da T01 (tela.md, decisões 31 e 32):
// o canal, o código, a folha "Não recebi o código" com a espera de 60 s, o reenvio
// com o prazo cheio de novo; noutra passada, o e-mail, o código certo, a senha nova,
// a senha alterada e o login. O primário diz Digite o código com
// as células vazias (12, 13); o teto de 3 envios na hora (17) — a espera do último
// envio zera e a linha diz até quando, e pedir o código de novo traz o que já foi,
// que segue valendo. Nenhum contato em tela, nem
// mascarado — a primeira etapa com o dado digitado (o telefone com o seletor de país,
// o e-mail), a resposta ao envio sempre a mesma, e a folha com Reenviar o código e
// Usar outro dado, que volta pra primeira etapa.
const RESPOSTA = 'Se houver conta com este dado, o código foi enviado.'
const ATE_O_CODIGO = [
  { abre: '' },
  { chega: 'T01', momento: null },
  { toca: 'Esqueci a senha' },
  // a primeira etapa abre no telefone, com o Brasil, e o número que falta (a 02)
  { chega: 'T01', momento: '02-momento-recuperar-escolher-canal' },
  { ve: 'RECUPERAR ACESSO' },
  { ve: 'Depois: o código · a nova senha' },
  { ve: 'Faltam 2 números.' },
  { ve: 'O dado precisa ser o mesmo do cadastro.' },
  { desligado: 'Enviar o código' },
  { naoVe: '•' },
  { ve: 'Vale por 10 minutos' },
  { ve: 'resta 1 envio nesta hora' },
  // o e-mail: sem o seletor de país, e o botão ligado (a 21); de volta ao telefone
  { marca: 'E-MAIL' },
  { chega: 'T01', momento: '21-momento-o-e-mail-como-canal' },
  { naoVe: '+55' },
  { marca: 'TELEFONE' },
  { chega: 'T01', momento: '02-momento-recuperar-escolher-canal' },
  // o seletor de país (a 22): com busca; o país troca a máscara, e o Brasil volta
  { toca: 'País: Brasil, +55' },
  { chega: 'T01', momento: '22-momento-o-seletor-de-pais' },
  { ve: 'Buscar país' },
  { ve: 'Uruguai' },
  { digita: 'port', em: 'Buscar país' },
  { naoVe: 'Uruguai' },
  { toca: 'Portugal' },
  { chega: 'T01', momento: '20-momento-telefone-no-formato-certo' },
  { ve: '+351' },
  { toca: 'País: Portugal, +351' },
  { chega: 'T01', momento: '22-momento-o-seletor-de-pais' },
  { toca: 'Brasil' },
  { chega: 'T01', momento: '02-momento-recuperar-escolher-canal' },
  { ve: 'Faltam 2 números.' },
  { fica: 'T01', ms: 400 },  // a folha do país acaba de sair: o fundo deixa de ser inerte
  // os números que faltam: o formato certo liga o botão (a 20)
  { digita: '81987654321', em: 'Telefone' },
  { chega: 'T01', momento: '20-momento-telefone-no-formato-certo' },
  { naoVe: 'Faltam' },
  { toca: 'Enviar o código' },
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { ve: RESPOSTA },
  { ve: 'Digite o código' },
  { ve: 'VALE POR' },
  { ve: 'resta 1 envio nesta hora' },
  // a folha: as duas saídas esperam os 60 s do reenvio, com a contagem no lugar da seta
  { toca: 'Não recebi o código' },
  { chega: 'T01', momento: '04-momento-nao-recebi-o-codigo' },
  { ve: 'Reenviar o código' },
  { ve: 'para o mesmo dado' },
  { ve: 'Usar outro dado' },
  { ve: 'volta pra primeira etapa' },
  { ve: '0:5' },
  // zerou com a folha aberta: a seta entra e as linhas acendem (a 11)
  { chega: 'T01', momento: '11-momento-nao-recebi-reenvio-liberado', ms: 70000, entre: [50000, 62000] },
  { naoVe: '0:0' },
]

export default [
  // 1ª passada: Reenviar o código → o código de novo, o prazo cheio, pro mesmo dado
  ...ATE_O_CODIGO,
  { toca: 'Reenviar o código' },
  { chega: 'T01', momento: '12-momento-codigo-reenviado' },
  { ve: RESPOSTA },
  { ve: '10:00' },
  { ve: 'Reenviar em 60 s · este foi o último envio desta hora' },
  { ve: 'Reenviar em 59 s · este foi o último envio desta hora', entre: [500, 1600] },
  { naoVe: 'Reenviar o código' },
  // o reenvio chega com as células vazias: o Confirmar espera os seis dígitos (T01·6),
  // dizendo o que falta (12 e 13)
  { desligado: 'Digite o código' },
  { naoVe: 'Confirmar' },
  // o teto (a 17): a espera do último envio da hora zera, e a linha diz até quando
  { ve: 'Os 3 envios desta hora acabaram · libera às 15:12', ms: 70000, entre: [55000, 63000] },
  { naoVe: 'este foi o último envio desta hora' },
  // pedir um código depois dos 3 envios da hora: nada é enviado, e o código que já
  // foi segue valendo — os dígitos do mock, o prazo de onde estava, e o Confirmar
  { toca: 'Voltar ao login' },
  { chega: 'T01', momento: null },
  { toca: 'Esqueci a senha' },
  { chega: 'T01', momento: '20-momento-telefone-no-formato-certo' },
  { naoVe: 'resta 1 envio nesta hora' },
  { toca: 'Enviar o código' },
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { ve: RESPOSTA },
  { ve: 'Os 3 envios desta hora acabaram · libera às 15:12' },
  { naoVe: '10:00' },
  { toca: 'Confirmar' },
  { chega: 'T01', momento: '08-momento-recuperar-nova-senha' },
  { ve: 'Crie a nova senha' },
  // 2ª passada: Usar outro dado → a primeira etapa → o e-mail → o código no e-mail →
  // o código certo → a senha nova → senha alterada → o login
  ...ATE_O_CODIGO,
  { toca: 'Usar outro dado' },
  { chega: 'T01', momento: '20-momento-telefone-no-formato-certo' },
  { ve: 'Para onde mandamos' },
  { marca: 'E-MAIL' },
  { chega: 'T01', momento: '21-momento-o-e-mail-como-canal' },
  { toca: 'Enviar o código' },
  { chega: 'T01', momento: '13-momento-codigo-no-e-mail' },
  { ve: RESPOSTA },
  { ve: '10:00' },
  { ve: 'Reenviar em 60 s · este foi o último envio desta hora' },
  { desligado: 'Digite o código' },
  // o envio pelo e-mail foi o terceiro da hora, o último: a folha já está no teto (a 23) — as duas saídas
  // esperam a hora em que liberam, e a frase diz por quê (decisão 64), em vez de uma contagem que zeraria sem
  // liberar nada · e nenhum contato na folha
  { toca: 'Não recebi o código' },
  { chega: 'T01', momento: '23-momento-folha-nao-recebi-no-teto' },
  { ve: 'Os 3 envios desta hora acabaram: as duas saídas liberam às 15:12. O código já enviado segue valendo.' },
  { desligado: 'Reenviar o código' },
  { desligado: 'Usar outro dado' },
  { ve: '15:12' },
  { naoVe: '0:5' },
  { naoVe: '@' },
  { toca: 'Fechar' },
  { chega: 'T01', momento: '13-momento-codigo-no-e-mail' },
  { fica: 'T01', ms: 400 },  // a folha acaba de sair: o fundo deixa de ser inerte
  // o código errado: a mesma mensagem do vencido (a 05)
  { digita: '482911', em: 'Digite o código' },
  { toca: 'Confirmar' },
  { chega: 'T01', momento: '05-momento-codigo-errado' },
  { ve: 'Código inválido' },
  { ve: 'ou vencido' },
  { toca: 'Tentar de novo' },
  { chega: 'T01', momento: '13-momento-codigo-no-e-mail' },
  { digita: '48291', em: 'Digite o código' },
  { desligado: 'Digite o código' },
  { digita: '482913', em: 'Digite o código' },
  { ve: 'Confirmar' },
  { toca: 'Confirmar' },
  { chega: 'T01', momento: '08-momento-recuperar-nova-senha' },
  { ve: '3 de 3' },
  { ve: 'Crie a nova senha' },
  { ve: 'Código conferido' },
  { ve: '482913' },
  { ve: '10 caracteres ou mais' },
  { ve: 'Diferente das 3 últimas' },
  { ve: 'confere ao salvar' },
  { toca: 'Salvar e entrar' },
  { chega: 'T01', momento: '09-momento-senha-alterada' },
  { ve: 'Senha alterada' },
  { ve: 'A senha nova já vale. Os outros aparelhos saíram da sua conta.' },
  { toca: 'Entrar com a senha nova' },
  // o login volta preenchido com a senha do mock para a demonstração.
  { chega: 'T01', momento: null },
  { naoVe: 'Senha alterada' },
  { ve: 'Esqueci a senha' },
  { ve: 'Entrar' },
  { naoVe: 'Digite a senha' },
  // Limpa a senha para continuar provando os campos vazios e o erro abaixo.
  { digita: 'x', em: 'SENHA' },
  { tecla: 'Backspace' },
  // o Entrar diz o que falta enquanto o técnico apaga e digita, apagado e desabilitado
  // enquanto falta: a senha vazia, Digite a senha; o usuário
  // apagado, Digite o usuário, com a senha ou sem ela; os dois, Entrar
  { desligado: 'Digite a senha' },
  { digita: 'r', em: 'USUÁRIO' },
  { tecla: 'Backspace' },
  { desligado: 'Digite o usuário' },
  { naoVe: 'Digite a senha' },
  { digita: 'Ibura', em: 'SENHA' },
  { desligado: 'Digite o usuário' },
  { digita: 'r.vieira', em: 'USUÁRIO' },
  { naoVe: 'Digite o usuário' },
  { naoVe: 'Digite a senha' },
  // com menos de 8, o erro: a senha apagada, o usuário fica (tela.md)
  { digita: 'Ibura27', em: 'SENHA' },
  { toca: 'Entrar' },
  { fica: 'T01', ms: 400 },
  { ve: 'USUÁRIO OU SENHA INCORRETOS' },
  { ve: 'Confira os dois e entre de novo.' },
  // no erro, o Entrar fica apagado, dizendo Digite a senha, até a senha ter um caractere (a 01)
  { desligado: 'Digite a senha' },
  { digita: 'G', em: 'SENHA' },
  { naoVe: 'Digite a senha' },
  { ve: 'USUÁRIO OU SENHA INCORRETOS' },
  // o olho mostra e esconde: visível, o olho riscado e o nome Ocultar a senha (a 10)
  { digita: 'Garagem!Ibura27', em: 'SENHA' },
  { toca: 'Mostrar a senha' },
  { chega: 'T01', momento: '10-momento-senha-visivel' },
  { toca: 'Ocultar a senha' },
  { chega: 'T01', momento: null },
  { toca: 'Mostrar a senha' },
  { toca: 'Entrar' },
  { chega: 'T02' },

  // 3ª passada: o e-mail escolhido na primeira etapa, com envio na hora — o código
  // com o código do mock, a resposta de sempre, e a folha sem contato nenhum
  { abre: '' },
  { chega: 'T01', momento: null },
  { toca: 'Esqueci a senha' },
  { chega: 'T01', momento: '02-momento-recuperar-escolher-canal' },
  { marca: 'E-MAIL' },
  { chega: 'T01', momento: '21-momento-o-e-mail-como-canal' },
  { digita: 'rafael.vieira@atlsul', em: 'E-mail' },
  { desligado: 'Enviar o código' },
  { digita: 'rafael.vieira@atlsul.com.br', em: 'E-mail' },
  { toca: 'Enviar o código' },
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { ve: RESPOSTA },
  { ve: 'resta 1 envio nesta hora' },
  { ve: 'Confirmar' },
  // ainda resta um envio na hora: a folha de sempre (a 04), com a contagem dos 60 s, e sem contato nenhum
  { toca: 'Não recebi o código' },
  { chega: 'T01', momento: '04-momento-nao-recebi-o-codigo' },
  { ve: 'Reenviar o código' },
  { ve: '0:5' },
  { naoVe: '•' },
  { toca: 'Fechar' },
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
]
