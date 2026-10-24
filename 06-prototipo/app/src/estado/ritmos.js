// Os ritmos dos processos do protótipo — espelho da tabela de
// 03-design-system/movimento.md (linhas 30–39). Não são tokens: com
// reduzir movimento, o processo segue no mesmo ritmo (movimento.md:47).
// Processo sem ritmo declarado entra aqui só depois de declarado em
// movimento.md.
export const RITMOS = {
  diagnosticoLinhaMs: 600,   // diagnóstico · cada linha (T07): as nove do módulo depois da conexão, e os seis sinais da CAN no Ler de novo
  // cadeia (T09) · cada etapa 2 s: 1,2 s gravando e 0,8 s conferindo (a releitura) · a Limpeza, 1,2 s,
  // um comando só, sem conferir · a Conexão, 1,2 s gravando e 1,2 s esperando o servidor, com o tempo
  // dele contando 10 vezes mais rápido (até 12 s) · a cadeia inteira, uns 12 s (1,2 + 4 × 2 + 2,4) ·
  // a barra da etapa anda em passos de 100 ms (o passo do processo), na gravação e de novo na releitura
  cadeiaPassoMs: 100,
  cadeiaGravandoMs: 1200,
  cadeiaConferindoMs: 800,
  cadeiaServidorMs: 1200,
  cadeiaServidorFator: 10,
  conferenciaLinhaMs: 400,   // conferência da T11 · cada linha
  encerramentoPassoMs: 600,  // encerramento · cada passo
  autotesteAssertivaMs: 400, // autoteste · cada assertiva
  cicloPassoMs: 3000,        // ciclo dinâmico · cada passo do veículo: o passo k acende a k × 3 s do disparo (+9, +12 e +15 s · T14·1)
  cicloPassosNaEntrada: 2,   // ciclo dinâmico · os passos que a semente já traz feitos antes do disparo (T14·1)
  filaDrenagemMs: 3000,      // ciclo dinâmico · a fila do módulo drena antes do disparo, 3 s no total
  prazoFator: 4,             // prazo do evento · 1 s real vale 4 s de prazo
  sincronizacaoTotalMs: 4000, // sincronização do pacote · 4 s no total
  cronometroCodigoMs: 1000,   // cronômetro do código (T01) · 1 s real vale 1 s de prazo e de reenvio (T01·1)
  semearGravandoMs: 1000,     // semear da calibração (T10) · Gravando no módulo… (T10 animacao.md)
  semearRelendoMs: 1000,      // semear da calibração (T10) · Relendo…, e aí o tambor rola e a tela vira o semeado ou o não confere
  bipMs: 1000,                // o Testar bip do checklist (T13/39): o buzzer toca por cerca de 1 s (o pulso de exemplo, até a bancada)
  relerModuloMs: 1000,        // o detalhe do item reprovado (T13) · Relendo o módulo…, o mesmo tempo do Relendo… da T10, e aí a tela fica positiva
  // busca da T05 · a busca de novo (o Procurar de novo): o quadro da busca da
  // T05/00 fica na tela 1,2 s, e a lista volta. O número sai do animacao.md da T05 e do
  // movimento.md: 400 ms passaria sem o técnico ver que buscou
  buscaMs: 1200,
  // a CAN ao vivo da T07: uma leitura nova a cada 1 s, o número troca no lugar
  canAoVivoMs: 1000,
  // a atualização do firmware da T07/06: o quadro dos 62% fica 1 s, e o diagnóstico relê
  // (movimento.md · Como o processo se move) · o ritmo é dela, não o da cadeia
  firmwareAtualizacaoMs: 1000,
  // o Entrar do login · a espera da resposta do servidor: no
  // protótipo, um tempo fixo, sem relógio. O primário diz Entrando…, desabilitado, como o
  // Gravando no módulo… da T10: abaixo de 1 s o texto só pisca; 1,2 s é o bastante pra
  // ver que o login não vai direto
  entrarEsperaMs: 1200,
  // o primário que nasce de um toque (movimento.md · Por cima da tela, decisão 64): o texto novo no
  // mesmo botão, ou o primário da folha que o toque abriu, só responde depois disto — o tempo do
  // toque duplo do Android. Não é movimento: vale também com reduzir movimento
  toqueDuploMs: 300,
}
