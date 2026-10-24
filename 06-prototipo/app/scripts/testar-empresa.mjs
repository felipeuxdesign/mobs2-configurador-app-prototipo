// A prova da escolha da empresa (decisão 56; logica.md · O contexto é a empresa):
// o contexto é a empresa, e o app não tem unidade nem garagem. Os dois mundos —
// o do herói, com as três empresas dele (M.empresas), e o de uma empresa só (o caso
// uma-empresa) —, a escolhida ao abrir, a URL de cada quadro e o que cada toque faz,
// no node, nas mesmas funções que a tela usa (src/telas/T02/empresas.js e
// src/dados/empresas.js), com os textos do textos.md da T02:
//  · o herói: a 00, as três empresas, nada escolhido, o primário apagado (Escolha uma
//    empresa) → a escolhida, o 01, e o primário acende com o Sincronizar → o Sincronizar
//    grava a empresa no contexto, sem pacote, e a T03 baixa o dela
//  · uma empresa só: a T02 nem desenha — o app segue direto pra T03, com o pacote da única
// O roteiro scripts/caminhos/empresa.mjs anda o caminho do herói no app.
// Uso: node scripts/testar-empresa.mjs → exit 0 aprovado / 1 reprovado.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
// o texto, como está no textos.md da tela (entre crases, na seção da referência)
const textos = (t) => readFileSync(resolve(raiz, '02-telas', readdirSync(resolve(raiz, '02-telas')).find((d) => d.startsWith(t + '-')), 'textos.md'), 'utf8')
const secao = (t, ref) => { const md = textos(t); const i = md.indexOf('## `' + ref + '`'); if (i < 0) return []; const f = md.indexOf('\n## ', i + 1); return [...md.slice(i, f < 0 ? undefined : f).matchAll(/`([^`]*)`/g)].map((m) => m[1]).slice(1) }
globalThis.window = {}   // o mock escreve window.M2CF_MOCKS (a ponte de src/dados/mock.js)
const { M } = await import(resolve(app, 'src/dados/mock.js'))
const E = await import(resolve(app, 'src/telas/T02/empresas.js'))
const D = await import(resolve(app, 'src/dados/empresas.js'))
const { TX } = await import(resolve(app, 'src/telas/T02/textos.js'))
const { RECEITAS } = await import(resolve(app, 'src/estado/receitas.js'))
const { SEMENTES } = await import(resolve(app, 'src/estado/sementes.js'))

let falhas = 0
const chk = (n, ok, d) => { console.log((ok ? 'OK     ' : 'FALHA  ') + n + (d ? ' — ' + d : '')); if (!ok) falhas++ }
const { HEROI, UMA_EMPRESA, ESCOLHIDA } = E
const vazio = { empresaId: null, pacote: null, mundo: null }   // o contexto do estado único ao nascer (estado.jsx)
const T00 = secao('T02', '00-tela')
const T01 = secao('T02', ESCOLHIDA)

// ── os mundos: o do herói tem as três empresas do mock; o do caso, uma ──
chk('o herói tem três empresas (M.empresas), e a dele, a Viação Atlântico Sul (M.empresa), está entre elas',
  E.empresasDo(HEROI) === M.empresas && M.empresas.length === 3 && M.empresas.some((e) => e.id === M.empresa.id && e.nome === M.empresa.nome) && E.variasEmpresas(HEROI))
chk('o caso uma-empresa tem uma empresa só, a do herói, com o pacote dela, e não tem a troca',
  E.empresasDo(UMA_EMPRESA) === M.casos['uma-empresa'].empresas && E.empresasDo(UMA_EMPRESA).length === 1 && E.empresasDo(UMA_EMPRESA)[0].id === M.empresa.id &&
  D.pacoteDaEmpresa(E.empresasDo(UMA_EMPRESA)[0].id)?.id === 'pac-emp-01' && !E.variasEmpresas(UMA_EMPRESA))
chk('o mundo vem do contexto: sem ele, o do herói', D.mundoDo(vazio) === HEROI && D.mundoDo(null) === HEROI && D.mundoDo({ ...vazio, mundo: UMA_EMPRESA }) === UMA_EMPRESA)
chk('o código da T02 não lê unidade, garagem, UC nem UO, nem o caso da lista longa',
  ['src/telas/T02/empresas.js', 'src/telas/T02/index.jsx', 'src/dados/empresas.js'].every((f) => !/uoId|M\.uos|M\.ucs|garagens\.js|lista-longa/.test(readFileSync(resolve(app, f), 'utf8'))))
chk('o caso lista-longa-garagens saiu do mock, e não há caso varias-empresas', !M.casos['lista-longa-garagens'] && !M.casos['varias-empresas'])

// ── a 00: as três empresas, cada uma com a idade do pacote e os ativos, como o textos.md ──
const linhas = E.linhasDasEmpresas(HEROI, null)
const daLinha = linhas.flatMap((l) => [l.nome, l.detalhe, l.valor])
chk('a 00: o rótulo, o título, as três linhas e o primário, na ordem do textos.md',
  JSON.stringify([E.rotuloDasEmpresas(HEROI), TX.titulo, ...daLinha, E.primarioDe(null).texto]) === JSON.stringify(T00),
  JSON.stringify(daLinha))
chk('a 00: nada escolhido, e o primário apagado e desabilitado', linhas.every((l) => !l.escolhida) && E.primarioDe(null).desabilitado === true && E.primarioDe(null).texto === 'Escolha uma empresa')
chk('a linha lê o pacote da empresa: de ontem com a hora, de 4 dias com a hora, e o vencido com a idade e que venceu (decisão 64)',
  linhas.map((l) => l.detalhe).join(' · ') === 'pacote de ontem, 07:10 · pacote de 4 dias, 06:55 · pacote de 8 dias, vencido')
chk('os ativos da linha são os que o pacote traz (24 · 34 · 18)', linhas.map((l) => l.valor).join(' · ') === '24 ativos · 34 ativos · 18 ativos')

// ── a escolhida ao abrir ──
chk('pelo Entrar, pelo pulo do palco e pelo endereço da tela (o contexto sem empresa): nada escolhido, a 00', E.escolhidaAoAbrir(null, vazio) === null && E.escolhidaAoAbrir(undefined, {}) === null)
chk('pelo endereço do 01: a Viação, a empresa do contexto do mock', E.escolhidaAoAbrir(ESCOLHIDA, vazio) === M.contextoAtivo.empresaId && M.contextoAtivo.empresaId === 'emp-01')
chk('o Trocar de empresa da T03 (o vencido e a falha de rede com ele, a 04 e a 05) volta com a atual marcada (a empresa do contexto)', E.escolhidaAoAbrir(null, { ...vazio, empresaId: 'emp-03' }) === 'emp-03')
chk('a semente da T02 é o contexto sem empresa: a 00', !SEMENTES.T02.contexto || !SEMENTES.T02.contexto.empresaId)

// ── os toques ──
const v = E.escolher(null, 'emp-01')
chk('tocar numa empresa a escolhe: o 01, e o primário acende com o Sincronizar', v === 'emp-01' && E.momentoDe(v) === ESCOLHIDA && E.primarioDe(v).texto === 'Sincronizar' && !E.primarioDe(v).desabilitado)
const c = E.escolher(v, 'emp-02')
chk('tocar noutra troca a marca, e o texto do primário não muda', c === 'emp-02' && E.primarioDe(c).texto === E.primarioDe(v).texto && E.momentoDe(c) === ESCOLHIDA)
chk('tocar de novo não desmarca', E.escolher(c, 'emp-02') === 'emp-02')
chk('a de pacote vencido também se escolhe', E.escolher(c, 'emp-03') === 'emp-03' && E.primarioDe('emp-03').texto === 'Sincronizar')
chk('o 01 com a escolhida: a marca na linha dela, e só nela', E.linhasDasEmpresas(HEROI, 'emp-01').map((l) => l.escolhida).join(',') === 'true,false,false')
chk('o 01: os textos do textos.md, com o Sincronizar no lugar do Escolha uma empresa',
  JSON.stringify([E.rotuloDasEmpresas(HEROI), TX.titulo, ...E.linhasDasEmpresas(HEROI, 'emp-01').flatMap((l) => [l.nome, l.detalhe, l.valor]), E.primarioDe('emp-01').texto]) === JSON.stringify(T01))
const ctx = E.contextoDoSincronizar({ ...vazio, pacote: { id: 'pac-emp-02' } }, 'emp-01')
chk('o Sincronizar grava a empresa no contexto, sem pacote — a T03 baixa o dela', ctx.empresaId === 'emp-01' && ctx.pacote === null && ctx.mundo === null)
chk('o pacote da escolhida é o que a empresa aponta', ['emp-01', 'emp-02', 'emp-03'].map((id) => D.pacoteDaEmpresa(id).id).join(',') === 'pac-emp-01,pac-emp-02,pac-emp-03')
chk('o voltar do Android não faz nada na T02: a tela não tem saída desenhada', E.voltarDaTela === null)

// ── uma empresa só: o app pula a T02 ──
chk('com várias empresas, a tela fica', E.pulo(HEROI, vazio) === null)
const p = E.pulo(UMA_EMPRESA, { ...vazio, mundo: UMA_EMPRESA })
chk('com uma empresa só, o Entrar segue direto pra T03, com a única no contexto e o mundo junto',
  p?.tela === 'T03' && p.contexto.empresaId === M.empresa.id && p.contexto.pacote === null && p.contexto.mundo === UMA_EMPRESA, JSON.stringify(p))
chk('a tela pula antes de desenhar, e nunca num estado parado', /useLayoutEffect\(\(\) => \{\s*if \(!destino\) return/.test(readFileSync(resolve(app, 'src/telas/T02/index.jsx'), 'utf8')) && readFileSync(resolve(app, 'src/telas/T02/index.jsx'), 'utf8').includes('parado ? null : pulo(mundo, app.contexto)'))

// ── as receitas: a T02 não tem estado; a T01/18 monta as empresas atrás do diálogo ──
chk('a T02 não tem receita de estado (as duas referências são a tela e um momento)', !Object.keys(RECEITAS).some((k) => k.startsWith('T02/')))
chk('a T01/18 nasce do caso outro-usuario, com as empresas e os pacotes', RECEITAS['T01/18-estado-outro-usuario-no-aparelho']?.casos?.includes('outro-usuario') && RECEITAS['T01/18-estado-outro-usuario-no-aparelho']?.dados?.includes('empresas'))

console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
