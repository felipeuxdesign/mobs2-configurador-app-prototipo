// O Modo claro no pé da sidebar do palco: troca só o celular de tema — nunca o palco nem a
// moldura do aparelho —, é o mesmo estado do interruptor da folha da Conta (ligou num, o outro mostra
// ligado) e fica lembrado: recarregar volta com a escolha. O palco é sempre escuro, então lá a bolinha
// ligada é a lima do --texto-primario do escuro; dentro do celular claro, a mesma peça tem a bolinha branca.
const APP = (tema) => `const a = document.querySelector('.app'); return (a.dataset.tema ?? 'escuro') === '${tema}' ? true : 'o app está no ' + (a.dataset.tema ?? 'escuro')`
const PALCO_ESCURO = `
  const p = document.querySelector('.palco'), m = document.querySelector('.celular')
  if (p.closest('[data-tema]') || m.closest('[data-tema]')) return 'o palco ou a moldura entrou no tema'
  const fundo = getComputedStyle(document.body).backgroundColor, pe = getComputedStyle(document.querySelector('.painel')).backgroundColor
  const escuro = (c) => c.match(/[0-9]+/g).slice(0, 3).every((n) => +n < 60)
  return escuro(fundo) && escuro(pe) ? true : 'o palco mudou de cor: ' + fundo + ' · ' + pe`
const NO_PALCO = (ligado) => `const s = [...document.querySelectorAll('.painel [role=switch]')][0]; if (!s) return 'sem o interruptor no pé do painel'
  if (s.getAttribute('aria-checked') !== '${ligado}') return 'o interruptor do palco está ' + s.getAttribute('aria-checked')
  const b = getComputedStyle(s.querySelector('.ds-interruptor-bolinha'), '::before')
  return ${ligado} ? (b.backgroundColor === 'rgb(170, 239, 0)' && b.opacity === '1' ? true : 'a bolinha ligada do palco devia ser lima: ' + b.backgroundColor) : true`
const NA_CONTA = (ligado) => `const s = document.querySelector('.app [role=switch]'); if (!s) return 'sem o interruptor na Conta'
  if (s.getAttribute('aria-checked') !== '${ligado}') return 'o interruptor da Conta está ' + s.getAttribute('aria-checked')
  const b = getComputedStyle(s.querySelector('.ds-interruptor-bolinha'), '::before')
  return ${ligado} ? (b.backgroundColor === 'rgb(255, 255, 255)' ? true : 'a bolinha ligada no celular claro devia ser branca: ' + b.backgroundColor) : true`

export default [
  { abre: '?tela=T04' },
  { chega: 'T04' },
  { toca: 'Entendi' },                                   // o aviso do acesso vencendo, na primeira chegada ao menu
  { executa: APP('escuro') },
  // liga no palco: só o celular troca
  { palco: 'Telas do protótipo' },
  { dorme: 400 },                                        // o painel desliza da esquerda: o dedo espera ele parar
  { palco: 'Modo claro' },
  { dorme: 400 },                                        // a bolinha desliza e acende (200), o app troca a cor (300)
  { executa: APP('claro') },
  { executa: NO_PALCO(true) },
  { executa: PALCO_ESCURO },
  { tecla: 'Escape' },
  // confere na Conta: ligado, com a bolinha branca no celular claro
  { toca: 'Conta — Rafael Vieira' },
  { dorme: 300 },
  { executa: NA_CONTA(true) },
  // desliga na Conta, e o palco mostra desligado
  { toca: 'Modo claro' },
  { executa: APP('escuro') },
  { tecla: 'Escape' },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },                                        // o painel desliza da esquerda: o dedo espera ele parar
  { executa: NO_PALCO(false) },
  // liga no palco de novo, e recarrega: a escolha volta, no app e no palco
  { palco: 'Modo claro' },
  { dorme: 400 },                                        // a bolinha desliza e acende (200), o app troca a cor (300)
  { executa: APP('claro') },
  { recarrega: true },
  { chega: 'T01' },
  { executa: APP('claro') },
  { executa: PALCO_ESCURO },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },                                        // o painel desliza da esquerda: o dedo espera ele parar
  { executa: NO_PALCO(true) },
  // o roteiro devolve o aparelho como achou
  { executa: `localStorage.removeItem('mobs2-configurador.tema'); return true` },
]
