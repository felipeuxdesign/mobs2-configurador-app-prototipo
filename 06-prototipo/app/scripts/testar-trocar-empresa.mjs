// A prova da folha Trocar de empresa, no topo do menu (T04/07, 08, 09 e 21, decisões 56 e
// 64; logica.md · O contexto é a empresa). O nome da empresa na tira de contexto abre a
// folha com as empresas do técnico, cada uma com o pacote e os ativos, a atual marcada e o
// primário apagado; o toque marca outra empresa, e o Sincronizar troca (R-14); com uma
// empresa só (o caso uma-empresa), o nome fica sem a seta e não é botão. O que o toque faz
// se prova aqui, no node, nas mesmas funções que a tela usa (src/telas/T04/dados.js), com os
// textos do textos.md da T04: sem sessão, o Sincronizar vai direto à T03 da marcada; com a
// sessão aberta, o diálogo de trocar (o 09), que diz pra qual empresa, e depois dos 4 passos
// da T16, a T03 dela; com uma evidência subindo (o 08), as outras esperam o envio terminar,
// sem toque, e o primário também. A de pacote vencido se escolhe. E o resto do menu que o
// toque decide e o mundo do herói não alcança sozinho: o sair que sempre pergunta (06, 17 e
// 20), o módulo que perde o link e reconecta (03 e 18) e o checklist registrado (19).
// O roteiro scripts/caminhos/empresa.mjs anda a folha no app, e o sair.mjs, o sair.
// Uso: node scripts/testar-trocar-empresa.mjs → exit 0 aprovado / 1 reprovado.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
globalThis.window = {}   // o mock escreve window.M2CF_MOCKS (a ponte de src/dados/mock.js)
const { M } = await import(resolve(app, 'src/dados/mock.js'))
const T04 = await import(resolve(app, 'src/telas/T04/dados.js'))
const D = await import(resolve(app, 'src/dados/empresas.js'))
const md = readFileSync(resolve(raiz, '02-telas/T04-menu/textos.md'), 'utf8')
const secao = (ref) => { const i = md.indexOf('## `' + ref + '`'); const f = md.indexOf('\n## ', i + 1); return i < 0 ? [] : [...md.slice(i, f < 0 ? undefined : f).matchAll(/`([^`]*)`/g)].map((m) => m[1]).slice(1) }
const tela = readFileSync(resolve(app, 'src/telas/T04/index.jsx'), 'utf8')

let falhas = 0
const chk = (n, ok, d) => { console.log((ok ? 'OK     ' : 'FALHA  ') + n + (d ? ' — ' + d : '')); if (!ok) falhas++ }
const heroi = { moduloSerial: 'M2C-0417', ativoId: 'a-01' }
const doHeroi = { empresaId: 'emp-01', pacote: null, mundo: null }
const deUma = { empresaId: 'emp-01', pacote: null, mundo: D.UMA_EMPRESA }

// ── quem vê a troca: o nome no topo, com a seta, só com mais de uma empresa ──
chk('o herói tem mais de uma empresa (M.empresas), e o caso uma-empresa, uma só', M.empresas.length > 1 && M.casos['uma-empresa'].empresas.length === 1, `${M.empresas.length} e ${M.casos['uma-empresa'].empresas.length}`)
chk('no mundo do herói, o nome no topo abre a folha', T04.tiraTroca(doHeroi) === true && T04.tiraTroca({}) === true && T04.tiraTroca(null) === true)
chk('com uma empresa só, o nome fica sem a seta e não é botão: a folha não abre', T04.tiraTroca(deUma) === false)
chk('a tela passa o toque à tira só quando a troca existe', tela.includes('aoTrocarEmpresa={troca ? () => abrir(\'empresa\') : undefined}'))
chk('a tira, sem o toque, desenha o nome sem a seta e sem botão (a peça)', (() => { const t = readFileSync(resolve(app, 'src/ds/chrome/TiraDeContexto.jsx'), 'utf8'); return t.includes('{aoTrocarEmpresa ? (') && t.includes('<span className="ds-tira-contexto-empresa">') })())
chk('a tira diz a empresa do contexto; sem ela, a do contexto do mock (a Viação)', T04.empresaDoMenu(doHeroi).nome === 'Viação Atlântico Sul' && T04.empresaDoMenu({}).id === M.contextoAtivo.empresaId &&
  T04.empresaDoMenu({ empresaId: 'emp-02' }).nome === 'Transportes Capibaribe')
chk('o leitor ouve o que o nome faz e qual é a empresa: Trocar de empresa — Viação Atlântico Sul', tela.includes('rotuloEmpresa={`Trocar de empresa — ${empresa.nome}`}'))

// ── a folha 07: as três, com o pacote e os ativos, e a atual marcada ──
const lista = T04.empresasDaFolha(doHeroi)
const T07 = secao('07-momento-folha-trocar-de-empresa')
chk('a 07: as três empresas, cada uma com a idade do pacote e os ativos, na ordem do textos.md, e o primário embaixo',
  JSON.stringify(lista.flatMap((e) => [e.nome, e.pacote, 'ATIVOS', String(e.ativos)])) === JSON.stringify(T07.slice(T07.indexOf('Viação Atlântico Sul'), -1)) &&
  T07.at(-1) === 'Escolha outra empresa' && T07[0] === 'Menu',
  lista.map((e) => `${e.nome} · ${e.pacote} · ${e.ativos}`).join(' / '))
chk('a 07: o título e a frase da folha', T07.includes('Trocar de empresa') && T07.includes('Trocar recarrega os ativos e o pacote desta empresa.') &&
  tela.includes('titulo="Trocar de empresa"') && tela.includes("'Trocar recarrega os ativos e o pacote desta empresa.'"))
chk('a atual marcada; as outras livres, também a de pacote vencido (ela se escolhe)', lista.map((e) => T04.estadoDaLinha(e, 'emp-01', 0)).join(',') === 'atual,disponivel,disponivel')
chk('a vencida diz a idade e que venceu (decisão 64: a mesma idade da T02, *pacote de 8 dias, vencido*)', lista[2].pacote === 'carregado há 8 dias, vencido' && lista[0].pacote === 'carregado ontem, 07:10' && lista[1].pacote === 'carregado há 4 dias')

// ── a folha marca (R-14, decisão 64): o toque marca, e o primário embaixo da lista troca ──
const p07 = T04.primarioDaFolha({ marcadaId: 'emp-01', atualId: 'emp-01', subindo: 0 })
chk('a 07: com a atual marcada, o primário apagado diz Escolha outra empresa', p07.desabilitado === true && p07.texto === 'Escolha outra empresa' && T07.at(-1) === p07.texto)
const marcada = T04.marcar('emp-01', 'emp-02', 0)
const T21 = secao('21-momento-folha-trocar-de-empresa-outra-marcada')
const p21 = T04.primarioDaFolha({ marcadaId: marcada, atualId: 'emp-01', subindo: 0 })
chk('a 21: tocar noutra empresa só marca, e o primário acende com Sincronizar, como o textos.md',
  marcada === 'emp-02' && p21.desabilitado === false && p21.texto === 'Sincronizar' && T21.at(-1) === 'Sincronizar' &&
  lista.map((e) => T04.estadoDaLinha(e, marcada, 0)).join(',') === 'disponivel,atual,disponivel')
chk('a URL segue a marca: a 07 com a atual, a 21 com outra', T04.momentoDaFolha('emp-01', 'emp-01') === T04.REF.empresa && T04.momentoDaFolha('emp-02', 'emp-01') === T04.REF.outraMarcada)
chk('tocar de novo na atual devolve a marca a ela, e o primário apaga', T04.marcar('emp-02', 'emp-01', 0) === 'emp-01' &&
  T04.primarioDaFolha({ marcadaId: 'emp-01', atualId: 'emp-01', subindo: 0 }).desabilitado === true)
chk('a tela marca no toque da linha e troca no primário', tela.includes('aoTocar={estadoLinha === \'disponivel\' ? () => marcarEmpresa(e.id) : undefined}') &&
  tela.includes('<Primario desabilitado={pf.desabilitado} aoTocar={sincronizar} trocaTexto>{pf.texto}</Primario>'))
chk('com uma empresa só, a folha teria só ela (mas não abre)', T04.empresasDaFolha(deUma).length === 1)

// ── o 08: com uma evidência subindo, as outras esperam o envio terminar ──
const T08 = secao('08-estado-folha-trocar-de-empresa-envio-em-andamento')
chk('o 08: a atual marcada, e as outras duas esperam, sem toque', lista.map((e) => T04.estadoDaLinha(e, 'emp-01', 1)).join(',') === 'atual,espera,espera')
chk('o 08: o aviso e o que as outras esperam, como o textos.md', ['UMA EVIDÊNCIA ESTÁ SUBINDO', 'Troque de empresa quando a fila terminar.', 'espera o envio terminar'].every((t) => T08.includes(t)) &&
  tela.includes('titulo="UMA EVIDÊNCIA ESTÁ SUBINDO" frase="Troque de empresa quando a fila terminar."') && tela.includes("'espera o envio terminar'"))
const p08 = T04.primarioDaFolha({ marcadaId: 'emp-01', atualId: 'emp-01', subindo: 1 })
chk('o 08: o primário diz o mesmo, apagado: Espera o envio terminar, e o toque não marca', p08.desabilitado === true && p08.texto === 'Espera o envio terminar' && T08.at(-1) === p08.texto &&
  T04.marcar('emp-01', 'emp-02', 1) === 'emp-01')
chk('o 08 lê a evidência subindo da fila do mock (o f-04)', T04.enviando(M.filaSaida) === 1)
chk('a linha que espera não se toca (a peça a desabilita)', readFileSync(resolve(app, 'src/ds/linhas/LinhaEmpresa.jsx'), 'utf8').includes('desabilitado={espera}'))

// ── o toque: sem sessão, direto; com a sessão, o diálogo, os 4 passos, e a T03 da escolhida ──
const semSessao = T04.depoisDoTrocar(null, { empresaId: 'emp-02' }, doHeroi)
chk('sem a sessão, escolher outra empresa vai direto à T03 dela, sem confirmação',
  semSessao.vai?.tela === 'T03' && semSessao.vai.contexto.empresaId === 'emp-02' && semSessao.vai.contexto.pacote === null && !semSessao.confirma, JSON.stringify(semSessao))
const comSessao = T04.depoisDoTrocar(heroi, { empresaId: 'emp-03' }, doHeroi)
chk('com a sessão aberta, o diálogo de trocar (o 09) pede a confirmação', comSessao.confirma?.empresaId === 'emp-03' && !comSessao.vai)
const destino = T04.destinoDaTroca(comSessao.confirma, { ...doHeroi, mundo: D.UMA_EMPRESA })
chk('depois dos 4 passos, a T03 da escolhida, sem pacote, com o mundo de antes no contexto',
  destino.tela === 'T03' && destino.contexto.empresaId === 'emp-03' && destino.contexto.pacote === null && destino.contexto.mundo === D.UMA_EMPRESA, JSON.stringify(destino))
chk('a de pacote vencido se escolhe na folha: a T03/04 diz o que fazer', T04.destinoDaTroca({ empresaId: 'emp-03' }).tela === 'T03')
const T09 = secao('09-estado-folha-trocar-de-empresa-com-modulo-conectado')
chk('o 09: o título diz pra qual empresa (decisão 64), e a frase, o que fica no módulo, o primário e o Cancelar, como o textos.md',
  [T04.tituloDoTrocar('Transportes Capibaribe'), 'é encerrada antes da troca, sem terminar a instalação.', 'O que já foi enviado fica no módulo.', 'Encerrar a sessão e trocar', 'Cancelar'].every((t) => T09.includes(t)) &&
  T04.tituloDoTrocar('Transportes Capibaribe') === 'Trocar pra Transportes Capibaribe?' &&
  tela.includes('<Dialogo titulo={tituloDoTrocar(nome)} primario="Encerrar a sessão e trocar"') && tela.includes('é encerrada antes da troca, sem terminar a instalação.') && tela.includes('O que já foi enviado fica no módulo.'))
chk('a troca leva o contexto de agora e passa pelo encerramento sem homologar da T16 — ou pelo completo, com o checklist registrado',
  tela.includes('depoisDoTrocar(sessao, alvo, mundo.contexto)') && tela.includes('(reg ? encerrarCompletoE : encerrarE)(destinoDaTroca(alvo, mundo.contexto))'))
chk('as referências da folha e do diálogo no REF da tela, sem a 14', T04.REF.empresa === '07-momento-folha-trocar-de-empresa' && T04.REF.envio === '08-estado-folha-trocar-de-empresa-envio-em-andamento' &&
  T04.REF.trocar === '09-estado-folha-trocar-de-empresa-com-modulo-conectado' && !Object.values(T04.REF).some((r) => r.startsWith('14-')))

// ── o contador da Fila de saída: o que não chegou da fila do aparelho ──
const unico = { fila: [], reenviados: [] }
chk('o contador do cartão conta o que não chegou da fila do aparelho, a que a T15 mostra: 2 (o f-10 e o f-02)', T04.pendentesDoAparelho(unico) === 2)
chk('ele não depende da empresa: trocar de empresa não muda o número', T04.pendentesDoAparelho({ ...unico, contexto: { empresaId: 'emp-02' } }) === 2)
chk('o que a sessão cria entra na conta; o reenviado continua não chegado', T04.pendentesDoAparelho({ fila: [{ id: 's-1', estado: 'na-fila', ativoId: 'a-01' }], reenviados: ['f-10'] }) === 3)

// ── o sair da conta pergunta sempre, e conta a fila do aparelho, o número do cartão (decisão 64) ──
const frasesEm = (fs) => fs.flatMap((f) => (f.texto ? [f.texto] : [f.antes, f.destaque, f.depois].filter(Boolean).map((t) => t.trim())))
const sessaoHeroi = { moduloSerial: 'M2C-0417', ativoId: 'a-01' }
const pend = T04.pendentesDoAparelho(unico)
const T06 = secao('06-momento-folha-conta-sair-com-sessao-aberta'), T17 = secao('17-momento-folha-conta-sair-sem-pendencia'), T20 = secao('20-momento-folha-conta-sair-com-checklist-registrado')
const meio = (t) => t.slice(t.indexOf('Sair da conta') + 1, t.lastIndexOf('Cancelar') - 1)
chk('a 06: com a sessão e a fila, o diálogo conta o mesmo do cartão (2), diz sem terminar a instalação e que entrar de novo precisa de rede, como o textos.md',
  T04.momentoDoSair({ sessao: sessaoHeroi, pendentes: pend, registrado: false }) === T04.REF.sair &&
  JSON.stringify(frasesEm(T04.frasesDoSair({ sessao: sessaoHeroi, pendentes: pend, registrado: false }))) === JSON.stringify(meio(T06)) &&
  T04.primarioDoSair(sessaoHeroi) === 'Encerrar a sessão e sair' && T06.at(-2) === 'Encerrar a sessão e sair', frasesEm(T04.frasesDoSair({ sessao: sessaoHeroi, pendentes: pend })).join(' | '))
chk('a 17: sem sessão e sem fila, o diálogo pergunta também, com Sair da conta e Cancelar, como o textos.md',
  T04.momentoDoSair({ sessao: null, pendentes: 0, registrado: false }) === T04.REF.sairSemPendencia &&
  JSON.stringify(frasesEm(T04.frasesDoSair({ sessao: null, pendentes: 0, registrado: false }))) === JSON.stringify(meio(T17)) &&
  T04.primarioDoSair(null) === 'Sair da conta' && T17.at(-2) === 'Sair da conta' && T04.depoisDoSair({ sessao: null }) === 'sai')
chk('a 20: com o checklist registrado, a sessão encerra inteira, com o reinício e o autoteste, antes do login, como o textos.md',
  T04.momentoDoSair({ sessao: sessaoHeroi, pendentes: pend, registrado: true }) === T04.REF.sairRegistrado &&
  JSON.stringify(frasesEm(T04.frasesDoSair({ sessao: sessaoHeroi, pendentes: pend, registrado: true }))) === JSON.stringify(meio(T20)) &&
  T04.depoisDoSair({ sessao: sessaoHeroi, registrado: true }) === 'completo' && T04.depoisDoSair({ sessao: sessaoHeroi, registrado: false }) === 'abortado')
chk('sem sessão e com fila, a 06 sem a frase da sessão, e o primário só sai',
  JSON.stringify(frasesEm(T04.frasesDoSair({ sessao: null, pendentes: pend, registrado: false }))) === JSON.stringify(['2', 'itens ainda não chegaram ao servidor. Eles ficam no aparelho e continuam subindo.', 'Pra entrar de novo, o login precisa de rede.']) &&
  T04.momentoDoSair({ sessao: null, pendentes: pend, registrado: false }) === T04.REF.sair)
chk('a tela pede o diálogo de sair sempre, e lê dele as frases e o primário', tela.includes('const pedirSaida = () => abrir(\'sair\')') && tela.includes('frasesDoSair({ sessao, pendentes: pendentesFila, registrado: reg })'))

// ── o módulo que perde o link (a 03) e o toque que reconecta (a 18) ──
const perdida = { ...sessaoHeroi, saude: 'falha' }
const c03 = T04.cartaoDoModulo({ sessao: perdida }), c18 = T04.cartaoDoModulo({ sessao: perdida, reconectando: true })
const T03x = secao('03-estado-faixa-modulo-com-falha'), T18 = secao('18-momento-reconectando-ao-modulo')
chk('a 03: o cartão do módulo é o próximo passo, toque para reconectar, com o lima de escolha, e o toque reconecta',
  c03.estado === 'decide' && c03.valor === 'toque para reconectar' && c03.toque === 'reconectar' && c03.poco === 34 && T03x.includes(c03.valor))
chk('a 18: tocado, reconectando…, sem o lima e sem toque', c18.estado === 'disponivel' && c18.valor === 'reconectando…' && c18.toque === null && T18.includes(c18.valor))
chk('com o link perdido, as ferramentas que precisam do módulo esperam por ele, espera módulo (como o textos.md da 03 e da 18)',
  [{ soModulo: true }, {}].every((f) => !T04.ferramentaLiberada(f, perdida) && T04.causaDaFerramenta(f, perdida) === 'espera módulo') &&
  T03x.filter((t) => t === 'espera módulo').length === 5 && T18.filter((t) => t === 'espera módulo').length === 5)
chk('com a sessão de pé, o cartão diz o serial e abre a folha do módulo; sem sessão, toque para procurar',
  T04.cartaoDoModulo({ sessao: sessaoHeroi }).toque === 'folha' && T04.cartaoDoModulo({ sessao: sessaoHeroi }).valor === 'M2C-0417' &&
  T04.cartaoDoModulo({ sessao: null }).valor === 'toque para procurar')

// ── o checklist registrado (a 19): o cartão do Finalizar com checklist diz o próximo passo ──
const T19 = secao('19-momento-checklist-registrado')
chk('a 19: registrado · falta encerrar a sessão, embaixo do nome, como o textos.md',
  T04.registrado({ checklist: { homologada: true } }) && !T04.registrado({ checklist: null }) &&
  T19[T19.indexOf('Finalizar com checklist') + 1] === T04.CAUSA_REGISTRADO && T04.CAUSA_REGISTRADO === 'registrado · falta encerrar a sessão')

// ── o título Menu escondido, em todas as telas do menu ──
chk('o h1 Menu não fica inerte atrás do véu: existe pro leitor com folha ou diálogo por cima ou não',
  tela.includes('<h1 className="t04-titulo">Menu</h1>') && !/<h1 className="t04-titulo"[^>]*inert/.test(tela))

console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
