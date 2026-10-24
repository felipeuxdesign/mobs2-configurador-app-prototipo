// O arrastado nunca é reenviado sozinho: o fluxo das cercas inteiro, vivo.
// Nenhuma entrada viva do palco leva à manutenção (os exemplos dela são consultas paradas),
// então o roteiro semeia o que a T06 gravaria num vínculo de manutenção (etapas.ativo.modo) e segue só
// com toques: a folha de confirmação, o envio, a pergunta pelos dependentes, o Deixar para depois, o
// Finalizar travado no checklist, e o reenvio do que ficou, até o Finalizar voltar. Decisão 64: pelo menu,
// a manutenção começa sem nada escolhido (a 28), e o toque marca o bloco; e um toque não vale por dois —
// o toque duplo no Reenviar as cercas abre a folha, e o segundo toque não confirma o primário dela, que
// nasceu embaixo do dedo (a 13 · o primário que nasce de um toque, 300 ms), também com reduzir movimento ·
// e o Reenviar tudo, menos a conexão da T11 abre a 30 também num vínculo de manutenção.
const FOLHA_SOBE = [{ prop: 'transform', ms: 200, em: 'ds-folha' }]
const FOLHA_DESCE = [{ prop: 'transform', ms: 150, em: 'ds-folha' }, { prop: 'opacity', ms: 150, em: 'ds-veu' }]
const SURGE = [{ prop: 'opacity', ms: 150, em: 't09-pergunta-surge' }]
// o primário da folha nasce onde estava o do rodapé: o ponto do dedo (o centro do Reenviar as cercas da 08,
// atrás do véu) cai dentro do Reenviar as cercas da folha
const SOB_O_DEDO = `
  const bs = [...document.querySelectorAll('.t09 button')].filter((b) => b.textContent.trim() === 'Reenviar as cercas')
  const folha = bs.find((b) => b.closest('.ds-folha')), pe = bs.find((b) => b.closest('.t09-pe'))
  if (!folha || !pe) return 'faltou um dos dois primários: ' + bs.length
  const p = pe.getBoundingClientRect(), f = folha.getBoundingClientRect()
  const x = p.left + p.width / 2, y = p.top + p.height / 2
  return (x >= f.left && x <= f.right && y >= f.top && y <= f.bottom) || 'o dedo em ' + [x, y] + ', o primário da folha em ' + [f.left, f.top, f.right, f.bottom]`
const ACENDE = [{ prop: 'opacity', ms: 150, em: 't09-pergunta-acende' }]
// o vínculo de manutenção que a T06 grava, num módulo já configurado — a cadeia gravada (estado/estado.jsx: o despachar do provedor, achado pela árvore do React)
const MANUTENCAO = `
  const el = document.querySelector('.t04'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value; const e = estado.etapas
  despachar({ tipo: 'mesclar', parcial: { etapas: { ...e, ativo: { ...(e.ativo ?? {}), modo: 'manutencao' }, cadeia: { confirmados: 6 } } } })
  despachar({ tipo: 'ir', tela: 'T09' })
  return true`

export default [
  { abre: '?tela=T04' },
  { chega: 'T04' },
  { executa: MANUTENCAO },
  { chega: 'T09', momento: '28-momento-manutencao-pelo-menu-nada-escolhido' },
  { ve: 'Reenvie um bloco por vez. A limpeza apaga só o que você escolher.' },
  { desligado: 'Escolha um bloco' },
  { marca: 'Cercas' },
  { chega: 'T09', momento: '08-momento-manutencao-escolher-o-bloco' },
  // ── a folha de confirmação (13): a consequência, antes de enviar · o Cancelar só fecha ──
  { toca: 'Reenviar as cercas', anima: FOLHA_SOBE },
  { chega: 'T09', momento: '13-momento-manutencao-folha-de-confirmacao' },
  { ve: 'Reenviar as cercas apaga os cartões gravados no módulo.' },
  { ve: 'Os cartões voltam pela plataforma web.' },
  { naoToca: 'ENCERRAR' },
  { dorme: 300 },
  { toca: 'Cancelar', anima: FOLHA_DESCE },
  { naoVe: 'Reenviar as cercas apaga os cartões gravados no módulo.' },
  { chega: 'T09', momento: '08-momento-manutencao-escolher-o-bloco' },
  // ── um toque não vale por dois: o toque duplo abre a folha, e o segundo toque não a confirma ──
  { toqueDuplo: 'Reenviar as cercas' },
  { chega: 'T09', momento: '13-momento-manutencao-folha-de-confirmacao' },
  { fica: 'T09', ms: 500 },
  { ve: 'Reenviar as cercas apaga os cartões gravados no módulo.' },
  { naoVe: 'Reenviando só as cercas.' },
  { toca: 'Cancelar', anima: FOLHA_DESCE },
  { chega: 'T09', momento: '08-momento-manutencao-escolher-o-bloco' },
  // e com reduzir movimento, o mesmo: a espera não é movimento · sem a folha subindo, o segundo toque cai em
  // cheio no primário dela, que nasceu embaixo do dedo — e não confirma
  { reduzir: true },
  { toqueDuplo: 'Reenviar as cercas' },
  { chega: 'T09', momento: '13-momento-manutencao-folha-de-confirmacao' },
  { executa: SOB_O_DEDO },
  { fica: 'T09', ms: 500 },
  { naoVe: 'Reenviando só as cercas.' },
  { toca: 'Cancelar' },
  { chega: 'T09', momento: '08-momento-manutencao-escolher-o-bloco' },
  { reduzir: false },
  // ── o envio (09): o mesmo toque duplo, com o segundo toque depois dos 300 ms, confirma — só as cercas, e quem
  // precisa ser reenviado depois ──
  { toqueDuplo: 'Reenviar as cercas', intervalo: 500 },
  { chega: 'T09', momento: '09-momento-manutencao-reenviando' },
  { ve: 'Reenviando só as cercas.' },
  { ve: 'Leitor e Eventos precisam ser reenviados depois. Você confirma em seguida.' },
  { naoVe: 'ficam como estão' },
  // ── conferiu (10): o check, e a pergunta pelos dependentes surge embaixo, um por vez ──
  { chega: 'T09', momento: '10-momento-manutencao-concluida', ms: 8000 },
  { ve: 'Cercas conferem. Dois blocos dependem delas.' },
  { anima: SURGE },
  { ve: '1 · Leitor' },
  { ve: 'usa os cartões que as cercas apagaram' },
  { ve: 'usam as cercas e o leitor · libera depois do leitor' },
  { desligado: 'Reenviar os eventos' },
  // ── Deixar para depois (19): o link vira *fica para depois* no lugar, o Reenviar do leitor
  // continua do lado, e o Reenviar dos eventos acende no lugar ──
  { toca: 'Deixar para depois: Leitor', anima: ACENDE },
  { ve: 'fica para depois' },
  { naoVe: 'libera depois do leitor' },
  { naoToca: 'Deixar para depois: Leitor' },
  // ── o técnico muda de ideia: Reenviar o leitor envia só o leitor (09), e a pergunta volta com ele
  // *confere · reenviado* (20) — as ações dão lugar ao check, e os eventos seguem acesos ──
  { toca: 'Reenviar o leitor' },
  { chega: 'T09', momento: '09-momento-manutencao-reenviando' },
  { ve: 'Reenviando só o leitor.' },
  { chega: 'T09', momento: '20-momento-manutencao-leitor-confere-eventos-liberados', ms: 8000 },
  { anima: ACENDE },
  { ve: 'Cercas conferem. Dois blocos dependem delas.' },
  { ve: 'confere\n· reenviado' },
  { naoToca: 'Reenviar o leitor' },
  { toca: 'Deixar para depois: Eventos' },
  { ve: 'fica para depois' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  { toca: 'Entendi' },                                   // o aviso do acesso vencendo, na primeira chegada ao menu
  // ── o checklist: a Seção D com o revisar em seguida, e o Finalizar travado com a causa ──
  { toca: 'Finalizar com checklist' },
  { chega: 'T13' },
  { ve: 'Falta reenviar os eventos.', ms: 8000 },
  { desligado: 'Finalizar instalação' },
  { toca: 'D · Configuração' },
  { ve: 'revisar em seguida' },
  { ve: 'roda ao encerrar' },
  // ── o Reenviar dos eventos, pela Seção D: a lista com o que falta (16); o leitor, que tem dependente,
  // ainda abre a folha dele (18) antes de enviar ──
  { toca: 'Reenviar: Eventos' },
  { chega: 'T09', momento: '08-momento-manutencao-escolher-o-bloco' },
  { ve: 'Falta reenviar os eventos.' },
  { toca: 'Leitor' },
  { toca: 'Reenviar o leitor', anima: FOLHA_SOBE },
  { chega: 'T09', momento: '18-momento-manutencao-folha-do-leitor' },
  { ve: 'Reenviar o leitor pede reenviar os eventos depois.' },
  { dorme: 300 },
  { toca: 'Cancelar', anima: FOLHA_DESCE },
  { toca: 'Eventos' },
  // os eventos não têm dependente: sem folha
  { toca: 'Reenviar os eventos' },
  { chega: 'T09', momento: '09-momento-manutencao-reenviando' },
  { ve: 'Reenviando só os eventos.' },
  { ve: 'Eventos conferem.', ms: 8000 },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  // ── nada falta: o Finalizar volta a ser decidido pelo resto do checklist ──
  { toca: 'Finalizar com checklist' },
  { chega: 'T13' },
  { naoVe: 'Falta reenviar', ms: 8000 },
  { toca: 'D · Configuração' },
  { naoVe: 'revisar em seguida' },
  // ── o Reenviar tudo, menos a conexão da T11 abre a 30 também num vínculo de manutenção: é a cadeia sem a
  // Conexão, não um bloco · concluída, a manutenção volta a abrir na lista, sem nada escolhido ──
  { abre: '?tela=T04' },
  { chega: 'T04' },
  { executa: MANUTENCAO },
  { chega: 'T09', momento: '28-momento-manutencao-pelo-menu-nada-escolhido' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  { toca: 'Entendi' },
  { toca: 'Conferir configuração' },
  { chega: 'T11' },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  { toca: 'Outras ações' },
  { toca: 'Reenviar tudo, menos a conexão' },
  { chega: 'T09', momento: '30-momento-o-que-vai-ser-gravado-menos-a-conexao' },
  { toca: 'Gravar no módulo' },
  { ve: 'CONFERIDO NO MÓDULO\n5 passos', ms: 14000 },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  { toca: 'Configurar módulo' },
  { chega: 'T09', momento: '28-momento-manutencao-pelo-menu-nada-escolhido' },
]
