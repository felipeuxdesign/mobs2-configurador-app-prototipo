// O voltar do Android (logica.md, "O voltar do Android"), em cada tela: no
// computador, o Esc. Cada tela abre pelo endereço (a semente) e pelos momentos que
// têm saída própria; o Esc faz o mesmo que o link de saída do rodapé (chega), ou
// não faz nada (fica): a tela sem saída desenhada, os processos que não podem
// parar, o diálogo sem X nem Cancelar e o estado aberto pela coluna do palco.
// O diálogo Encerrar antes de terminar? (decisão 36), no menu e por cima de outra
// tela, fecha pelo voltar, como o Continuar a instalação — antes da saída da tela.
const esc = { tecla: 'Escape' }
// o estado único, lido pelo provider (o mesmo dos roteiros da T09 e da T11): pra semear o par de um caso, como a T05 e a
// T06 gravariam, e o par divergente da T11
const ESTADO = `
  const el = document.querySelector('.t04, .t09'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value; const e = estado.etapas`
const PAR = (ativoId, moduloSerial) => `${ESTADO}
  despachar({ tipo: 'mesclar', parcial: { sessao: { ...estado.sessao, ativoId: '${ativoId}', moduloSerial: '${moduloSerial}' }, etapas: { ...e, ativo: { ...(e.ativo ?? {}), modo: 'instalacao' }, cadeia: null } } })
  despachar({ tipo: 'ir', tela: 'T09' })
  return true`
const DIVERGENTE = `${ESTADO}
  despachar({ tipo: 'mesclar', parcial: { sessao: { ...estado.sessao, ativoId: 'a-16', moduloSerial: 'M2C-0438' }, etapas: { ...e, cadeia: null } } })
  despachar({ tipo: 'ir', tela: 'T11' })
  return true`
export default [
  // ── T01 · na entrada, nada; em cada passo do recuperar, o Voltar ao login; na folha, o X ──
  { abre: '?tela=T01' },
  esc,
  { fica: 'T01', ms: 500 },
  { chega: 'T01', momento: null },
  { ve: 'Esqueci a senha' },
  { abre: '?tela=T01&momento=02-momento-recuperar-escolher-canal' },
  esc,
  { chega: 'T01', momento: null },
  { ve: 'Esqueci a senha' },
  { abre: '?tela=T01&momento=04-momento-nao-recebi-o-codigo' },
  { ve: 'Reenviar o código' },
  esc,
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  { naoVe: 'Reenviar o código' },
  // de volta ao código, o teclado do aparelho abre (decisão 62): com ele aberto, o voltar só o fecha
  { ouve: 'o teclado numérico do aparelho' },
  esc,
  { naoOuve: 'o teclado numérico do aparelho' },
  { fica: 'T01', ms: 500 },
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  esc,
  { chega: 'T01', momento: null },
  // o código pelo endereço: o teclado aberto; o primeiro voltar o fecha, e o segundo faz o Voltar ao login
  { abre: '?tela=T01&momento=03-momento-recuperar-digitar-codigo' },
  { ouve: 'o teclado numérico do aparelho' },
  esc,
  { naoOuve: 'o teclado numérico do aparelho' },
  { ve: 'Voltar ao login' },
  { chega: 'T01', momento: '03-momento-recuperar-digitar-codigo' },
  esc,
  { chega: 'T01', momento: null },
  { abre: '?tela=T01&momento=08-momento-recuperar-nova-senha' },
  esc,
  { chega: 'T01', momento: null },
  // o diálogo Senha alterada não tem X nem Cancelar: o voltar não faz nada
  { abre: '?tela=T01&momento=09-momento-senha-alterada' },
  esc,
  { fica: 'T01', ms: 500 },
  { chega: 'T01', momento: '09-momento-senha-alterada' },
  // um estado aberto pela coluna fica parado: o código expirado não volta ao login
  { abre: '?tela=T01&estado=06-estado-codigo-expirado' },
  esc,
  { fica: 'T01', ms: 500 },
  { chega: 'T01', estado: '06-estado-codigo-expirado' },
  // o mundo real · o login sem conexão, pela coluna: parado e sem toque — o Entrar
  // que tenta de novo se prova no node (scripts/testar-login-e-bluetooth.mjs)
  { abre: '?tela=T01&estado=14-estado-login-sem-conexao' },
  { ve: 'SEM CONEXÃO' },
  { naoToca: 'Entrar' },
  esc,
  { fica: 'T01', ms: 500 },
  { chega: 'T01', estado: '14-estado-login-sem-conexao' },
  // quem abre o app, pela coluna: parados e sem toque — o
  // que o Entrar diz e o xis se provam no node, e o xis também no roteiro lembrar.mjs
  { abre: '?tela=T01&estado=15-estado-primeiro-acesso' },
  { ve: 'Digite o usuário' },
  { naoToca: 'Digite o usuário' },
  esc,
  { fica: 'T01', ms: 500 },
  { chega: 'T01', estado: '15-estado-primeiro-acesso' },
  { abre: '?tela=T01&estado=16-estado-usuario-lembrado' },
  { ve: 'Digite a senha' },
  { naoToca: 'Limpar o usuário' },
  esc,
  { fica: 'T01', ms: 500 },
  { chega: 'T01', estado: '16-estado-usuario-lembrado' },

  // ── T02 · a escolha da empresa não tem saída desenhada: nada — a 00 e o 01 ──
  { abre: '?tela=T02' },
  esc,
  { fica: 'T02', ms: 500 },
  { chega: 'T02', momento: null },
  { abre: '?tela=T02&momento=01-momento-escolhida' },
  esc,
  { fica: 'T02', ms: 500 },
  { chega: 'T02', momento: '01-momento-escolhida' },

  // ── T03 · baixando, nada; no concluído, o Ir para o menu; na falha com o pacote vencido (a 05)
  //    e no vencido, o Trocar de empresa (os dois voltam à T02, com a atual marcada) ──
  { abre: '?tela=T03' },
  esc,
  { fica: 'T03', ms: 500 },
  { chega: 'T03', momento: null },
  { chega: 'T03', momento: '02-momento-concluido' },
  esc,
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  { abre: '?tela=T02' },
  { marca: 'Expresso Caruaruense' },
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { ve: 'ENQUANTO NÃO SINCRONIZAR' },
  esc,
  { chega: 'T02', momento: '01-momento-escolhida' },
  { toca: 'Sincronizar' },
  { chega: 'T03' },
  { toca: 'Sincronizar agora' },
  { ve: 'A BAIXA PAROU ONDE ESTAVA', ms: 8000 },
  esc,
  { chega: 'T02', momento: '01-momento-escolhida' },

  // ── T04 · no aviso do acesso, o Entendi (a semente também é chegada); no menu, nada;
  //    a folha fecha; o diálogo faz o Cancelar; o 12 aberto pela coluna fica parado ──
  { abre: '?tela=T04' },
  { ve: 'Seu acesso vence em 2 dias' },
  esc,
  { naoVe: 'Seu acesso vence em 2 dias' },
  { chega: 'T04', momento: null },
  esc,
  { fica: 'T04', ms: 500 },
  { chega: 'T04', momento: null },
  { naoVe: 'Seu acesso vence em 2 dias' },
  { toca: 'Conta' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  esc,
  { chega: 'T04', momento: null },
  { naoVe: 'Sair da conta' },
  { toca: 'Conta' },
  { toca: 'Sair da conta' },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  esc,
  { chega: 'T04', momento: '05-momento-folha-conta' },
  esc,
  { chega: 'T04', momento: null },
  // o endereço da folha abre a folha, e o aviso espera: o voltar fecha a folha, o aviso entra
  // depois de ela descer, e o voltar seguinte faz o Entendi
  { abre: '?tela=T04&momento=05-momento-folha-conta' },
  { naoVe: 'Seu acesso vence em 2 dias' },
  esc,
  { chega: 'T04', momento: null },
  { ve: 'Seu acesso vence em 2 dias' },
  esc,
  { naoVe: 'Seu acesso vence em 2 dias' },
  { chega: 'T04', momento: null },
  { abre: '?tela=T04&estado=12-estado-acesso-vencendo' },
  esc,
  { fica: 'T04', ms: 500 },
  { chega: 'T04', estado: '12-estado-acesso-vencendo' },
  { ve: 'Seu acesso vence em 2 dias' },
  // o diálogo do ENCERRAR antes de homologar (13): o voltar faz o Continuar a instalação,
  // e o aviso do acesso, que esperava o menu ficar sem nada por cima, entra depois
  { abre: '?tela=T04&momento=13-momento-encerrar-antes-de-homologar' },
  { ve: 'Encerrar antes de terminar?' },
  { naoVe: 'Seu acesso vence em 2 dias' },
  esc,
  { chega: 'T04', momento: null },
  { naoVe: 'Encerrar antes de terminar?' },
  { ve: 'Seu acesso vence em 2 dias' },
  esc,
  { naoVe: 'Seu acesso vence em 2 dias' },
  { toca: 'ENCERRAR' },
  { chega: 'T04', momento: '13-momento-encerrar-antes-de-homologar' },
  esc,
  { chega: 'T04', momento: null },
  // a folha Trocar de empresa com o envio subindo (08), pelo endereço: parada e sem toque — o
  // toque se anda na folha do fluxo (empresa.mjs), e se prova no node (testar-trocar-empresa.mjs)
  { abre: '?tela=T04&estado=08-estado-folha-trocar-de-empresa-envio-em-andamento' },
  { ve: 'Trocar de empresa' },
  { ve: 'UMA EVIDÊNCIA ESTÁ SUBINDO' },
  { naoToca: 'Fechar' },
  esc,
  { fica: 'T04', ms: 500 },
  { chega: 'T04', estado: '08-estado-folha-trocar-de-empresa-envio-em-andamento' },
  // a folha do fluxo fecha no voltar
  { abre: '?tela=T04&momento=07-momento-folha-trocar-de-empresa' },
  { ve: 'Trocar recarrega os ativos e o pacote desta empresa.' },
  esc,
  { chega: 'T04', momento: null },
  // a folha com outra empresa marcada (21, decisão 64): o voltar fecha a folha, sem trocar
  { abre: '?tela=T04&momento=07-momento-folha-trocar-de-empresa' },
  { marca: 'Transportes Capibaribe' },
  { chega: 'T04', momento: '21-momento-folha-trocar-de-empresa-outra-marcada' },
  esc,
  { chega: 'T04', momento: null },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },

  // ── T05 · na busca e na lista, o Voltar ao menu: o rodapé da busca não tem saída pro menu, e o
  //    técnico não fica preso nela (decisão 64) · conectando, nada: é a espera, e ela tem fim ──
  { abre: '?tela=T05' },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T05' },
  { toca: 'Conectar ao M2C-0417' },
  { chega: 'T05', momento: '06-momento-conectando' },
  esc,
  { fica: 'T05', ms: 300 },
  { chega: 'T07' },
  // o mundo real · o Bluetooth desligado e sem permissão, pela coluna: parados e sem
  // toque — o primário de cada um se prova no node (scripts/testar-login-e-bluetooth.mjs)
  { abre: '?tela=T05&estado=16-estado-bluetooth-desligado' },
  { ve: 'O Bluetooth está desligado' },
  { naoToca: 'Ligar o Bluetooth' },
  esc,
  { fica: 'T05', ms: 500 },
  { chega: 'T05', estado: '16-estado-bluetooth-desligado' },
  { abre: '?tela=T05&estado=17-estado-bluetooth-sem-permissao' },
  { ve: 'Falta a permissão do Bluetooth' },
  { naoToca: 'Permitir' },
  esc,
  { fica: 'T05', ms: 500 },
  { chega: 'T05', estado: '17-estado-bluetooth-sem-permissao' },

  // ── T06 · na lista, o Voltar ao menu; na confirmação, o Escolher outro ──
  { abre: '?tela=T06' },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T06&momento=01-momento-confirmar-o-veiculo' },
  esc,
  { chega: 'T06', momento: null },
  { ve: 'Escolha o veículo que está na sua frente.' },
  esc,
  { chega: 'T04' },
  // a trava sem link (04, fora do pacote): o Escolher outro do primário, de volta à lista
  // com a busca como estava — a placa não está no pacote, e é a busca sem resultado (08);
  // ali, o voltar é o Voltar ao menu, como na lista
  { abre: '?tela=T06' },
  { digita: 'PHS-2C47', em: 'Buscar placa' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'FORA DO PACOTE DESTA EMPRESA' },
  esc,
  { chega: 'T06', momento: '08-momento-busca-sem-resultado' },
  { naoVe: 'FORA DO PACOTE DESTA EMPRESA' },
  { ve: 'Nada com “PHS-2C47”' },
  esc,
  { chega: 'T04' },

  // ── T07 · o diagnóstico: lendo, nada; passou sem trava, o Voltar ao menu; na
  //    trava, o Procurar outro módulo, que volta à lista; atualizando e relendo, nada; com a
  //    CAN lida, o Voltar ao menu ──
  { abre: '?tela=T07' },
  esc,
  { chega: 'T04' },
  // com o diálogo do ENCERRAR por cima, o voltar fecha só o diálogo, e a T07 fica
  { abre: '?tela=T07' },
  { toca: 'ENCERRAR' },
  { ve: 'Encerrar antes de terminar?' },
  esc,
  { naoVe: 'Encerrar antes de terminar?' },
  { fica: 'T07', ms: 500 },
  esc,
  { chega: 'T04' },
  // a leitura que corre, da conexão: nada; as nove passam, e o voltar é o Voltar ao menu
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { marca: 'M2C-0417' },
  { toca: 'Conectar ao M2C-0417' },
  { chega: 'T07', momento: null },
  esc,
  { fica: 'T07', ms: 500 },
  { naoVe: 'ENCERRAR' },
  { ve: 'ENCERRAR', ms: 8000 },
  { ve: 'Selecionar ativo' },
  esc,
  { chega: 'T04' },
  // a trava (o M2C-0999, fora do cadastro): lendo, nada; parada, o Procurar outro módulo
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { marca: 'M2C-0999' },
  { toca: 'Conectar ao M2C-0999' },
  { chega: 'T07', momento: null },
  esc,
  { fica: 'T07', ms: 300 },
  { ve: 'Procurar outro módulo', ms: 8000 },
  esc,
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { desligado: 'Conectar' },
  // o firmware que atualiza (06): nada
  { abre: '?tela=T07&momento=06-momento-atualizando-o-firmware' },
  esc,
  { fica: 'T07', ms: 300 },
  // a CAN lida (01): o Ler de novo relê (10), e relendo, nada; lida de novo, o Voltar ao menu
  { abre: '?tela=T07&momento=01-momento-can-lida' },
  { toca: 'Ler de novo' },
  { chega: 'T07', momento: '10-momento-relendo-a-can' },
  esc,
  { fica: 'T07', ms: 500 },
  { chega: 'T07', momento: '01-momento-can-lida', ms: 8000 },
  esc,
  { chega: 'T04' },

  // ── T09 · antes de gravar (05), o Voltar ao menu; gravando, antes de a Conexão gravar, a
  //    recuperação; nela, nada; concluída, o Voltar ao menu ──
  { abre: '?tela=T09' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T09' },
  { toca: 'Gravar no módulo' },
  { chega: 'T09', momento: '21-momento-gravando-a-limpeza' },
  { ve: 'Gravando · não interrompa' },
  esc,
  { ve: 'Continuar a gravação' },
  { fica: 'T09', ms: 1500 },
  esc,
  { fica: 'T09', ms: 500 },
  { ve: 'Continuar a gravação' },
  { toca: 'Continuar a gravação' },
  { chega: 'T09', momento: '04-momento-cadeia-concluida', ms: 16000 },   // a cadeia inteira, uns 12 s
  esc,
  { chega: 'T04' },

  // o recusado de novo (decisão 64, a 31): o voltar e o ENCERRAR abrem a folha que grava só a conexão (a 32), e não a
  // recuperação · com a folha aberta, o voltar a fecha · gravando só a conexão (a 33), nada: depois, os 4 passos
  { abre: '?tela=T04' }, { chega: 'T04' }, { executa: PAR('a-02', 'M2C-0301') },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' }, { toca: 'Gravar no módulo' },
  { ve: 'A CADEIA PAROU', ms: 9000 }, { toca: 'Tentar de novo' }, { ve: 'A CADEIA PAROU DE NOVO', ms: 4000 },
  esc, { chega: 'T09', momento: '32-momento-folha-gravar-so-a-conexao' }, { dorme: 300 },
  esc, { naoVe: 'Gravar só a conexão encerra sem terminar a instalação.' }, { ve: 'A CADEIA PAROU DE NOVO' },
  esc, { chega: 'T09', momento: '32-momento-folha-gravar-so-a-conexao' }, { dorme: 300 },
  { toca: 'Gravar só a conexão e encerrar' }, { chega: 'T09', momento: '33-momento-gravando-so-a-conexao' },
  esc, { fica: 'T09', ms: 300 }, { chega: 'T16', momento: '03-momento-encerrando-sem-homologar', ms: 6000 },

  // ── T10 · no fluxo, o ônibus do herói não calibra nada (decisão 59): o Nada a calibrar, e o voltar
  //    é o Voltar ao menu · os quadros do caminhão coletor (00, 01, 05, 08, 09) são consultas, paradas,
  //    como os estados da coluna: o voltar não faz nada (o palco não oferece um percurso de calibração,
  //    e o semear que não para não se alcança no fluxo) ──
  { abre: '?tela=T10' },
  { ve: 'Nada a calibrar' },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T10' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  ...['05-momento-hodometro-digitado', '01-momento-hodometro-semeado', '08-momento-horimetro', '09-momento-calibracao-completa'].flatMap((m) => [
    { abre: `?tela=T10&momento=${m}` },
    { ve: 'KNB-5H39' },
    esc,
    { fica: 'T10', ms: 300 },
  ]),

  // ── T11 · pelo endereço, o par do herói, que confere: lido, o Voltar ao menu · na folha Outras
  //    ações, fecha (lei 20), e de novo, o Voltar ao menu · no fluxo, o par que diverge (a 00): conferindo,
  //    nada; lido, o voltar faz o Apenas registrar o diagnóstico, a saída da conferência (decisão 64) ·
  //    a 00 pela coluna é consulta, parada: o voltar não faz nada ──
  { abre: '?tela=T11' },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T11' },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  { toca: 'Outras ações' },
  { ve: 'Apenas registrar o diagnóstico' },
  esc,
  { naoVe: 'Apenas registrar o diagnóstico' },
  { fica: 'T11', ms: 500 },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T04' }, { chega: 'T04' }, { executa: DIVERGENTE }, { chega: 'T11' },
  esc, { fica: 'T11', ms: 300 }, { ve: 'NÃO BATE COM O CADASTRO', ms: 5000 }, esc, { chega: 'T04' },
  { abre: '?tela=T11&estado=00-tela' },
  { ve: 'NÃO BATE COM O CADASTRO' },
  esc,
  { fica: 'T11', ms: 500 },

  // ── T12 · na lista, o Voltar ao menu; no detalhe, o Voltar às instalações ──
  { abre: '?tela=T12' },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T12&momento=01-momento-detalhe-da-instalacao' },
  esc,
  { chega: 'T12', momento: null },
  esc,
  { chega: 'T04' },

  // ── T13 · nas seções e no registrado (aguardando autoteste), o Voltar ao menu; no item, o Voltar ao checklist ──
  { abre: '?tela=T13' },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T13&momento=02-momento-b-montagem-aberta' },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T13&momento=07-momento-responder-item' },
  esc,
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  esc,
  { chega: 'T04' },
  // o problema fotografado (15, decisão 39) também é o nível do item — com o que aconteceu escrito, o voltar
  // pergunta antes (a 51, decisão 64): no diálogo, o voltar faz o Continuar no item; o Descartar volta ao checklist
  { abre: '?tela=T13&momento=15-momento-problema-fotografado' },
  esc,
  { chega: 'T13', momento: '51-momento-descartar-a-ressalva' }, { ve: 'Descartar a ressalva?' },
  esc, { chega: 'T13', momento: '15-momento-problema-fotografado' },
  esc, { chega: 'T13', momento: '51-momento-descartar-a-ressalva' },
  { toca: 'Descartar' }, { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  esc,
  { chega: 'T04' },
  // a estrutura nova (decisão 34): a E resolvida e o registrado fazem o Voltar ao menu (o checklist registrado, aguardando autoteste); o sem localização é da coluna, parado
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T13&momento=11-momento-aguardando-autoteste' },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T13&estado=14-estado-aguardando-autoteste-sem-localizacao' },
  esc,
  { fica: 'T13', ms: 500 },
  { chega: 'T13', estado: '14-estado-aguardando-autoteste-sem-localizacao' },

  // ── T14 · o Ir para o checklist; no ciclo concluído, o Voltar ao menu ──
  { abre: '?tela=T14' },
  esc,
  { chega: 'T13' },
  { abre: '?tela=T14&momento=05-momento-ciclo-concluido' },
  esc,
  { chega: 'T04' },

  // ── T15 · o Voltar ao menu; num estado da coluna, parado; com o painel aberto, o Esc é dele ──
  { abre: '?tela=T15' },
  esc,
  { chega: 'T04' },
  { abre: '?tela=T15&estado=01-estado-sem-erro' },
  esc,
  { fica: 'T15', ms: 500 },
  { chega: 'T15', estado: '01-estado-sem-erro' },
  { abre: '?tela=T15&painel=1' },
  esc,
  { fica: 'T15', ms: 500 },
  esc,
  { chega: 'T04' },

  // ── T16 · no encerramento e no autoteste, nada; encerrada, o Voltar ao menu ──
  { abre: '?tela=T16' },
  esc,
  { fica: 'T16', ms: 500 },
  { chega: 'T16', momento: null },
  { chega: 'T16', momento: '07-momento-autoteste-correndo' },
  esc,
  { fica: 'T16', ms: 1500 },
  { chega: 'T16', momento: '02-momento-instalacao-homologada' },
  esc,
  { chega: 'T04' },
  { ve: 'Sem sessão de configuração' },
  { abre: '?tela=T16&momento=03-momento-encerrando-sem-homologar' },
  esc,
  { fica: 'T16', ms: 500 },
  { chega: 'T16', momento: '03-momento-encerrando-sem-homologar' },
  { chega: 'T16', momento: '04-momento-encerrada-sem-homologar' },
  esc,
  { chega: 'T04' },
  // o descartar da sessão interrompida pergunta antes (decisão 64, a 11): o voltar fecha o diálogo e volta à 06,
  // sem escolher pelo técnico
  { abre: '?tela=T16&momento=11-momento-descartar-a-instalacao' },
  { ve: 'Descartar a instalação?' },
  esc,
  { naoVe: 'Descartar a instalação?' },
  { chega: 'T16', momento: null },
]
