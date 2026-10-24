// O glifo de estado (folha 3). A cor carrega a natureza: lima é veredito,
// vermelho é falha, cinza é fato. O desenho é o do jogo de ícones (Desenho.jsx), com o traço do token por classe. O nome pro leitor de tela é a
// legenda da folha 3. 'traco' e 'agora' não são ícones: são marcas.
import { Desenho } from './Desenho.jsx'
import { useVez } from './vez.js'
import './Glifo.css'

// T16: os glifos que as telas desenham e a folha 3 não tem. Ficam
// fora de ESTADOS, que é a linha de glifos da folha (o espécime f3 a percorre).
// · 'traco-circulo' — o não se aplica da assertiva da sessão: o círculo com o
//   traço, apagado (T16/02 e 05, Faixa de contadores e Pontos de cerca). O nome
//   é o do traço da folha 3: 'não se aplica'.
// · 'sem-conexao' — lei 21: o Wi-Fi inteiro com o Risco, no
//   aviso SEM CONEXÃO do login (T01/14), cinza. O 'sem-sinal' e o
//   'sem-sinal-neutro' da folha 3 usam o mesmo riscado(Wifi):
//   a lei 21 proíbe a versão -off, e as referências deles (T03/01, T05/14, T09/02
//   e 03, T12/03, folhas 3 e 4) desenham o Wi-Fi inteiro com o risco por cima —
//   só sem o fio escuro (diferença conhecida da referência).
// · 'info' (T11/04): o i no círculo da linha de condição
//   embaixo do título, cinza, na pré-condição (Precondicao) — a versão que não se
//   lê. Sem nome (null): a frase ao lado já diz tudo, e o glifo fica mudo pro
//   leitor (aria-hidden), em vez de um nome que nenhuma legenda da folha 3 dá.
// · os pares do jogo: o mesmo glifo com o desenho que a referência daquele
//   lugar usa — 'xis-texto' (o xis das linhas da divergência, T11/00, 03 e 06), 'horario' (o
//   relógio do revisar em seguida, T11/05, T12/05 e T13/43) e os do requisito da senha nova
//   (T01/08 e 09: o círculo e o check dele)
const FORA_DA_FOLHA = {
  'traco-circulo':  { desenho: 'nao-se-aplica', cor: 'marca',     nome: 'não se aplica' },
  'sem-conexao':    { desenho: 'sem-rede-no-login', cor: 'secundaria', nome: 'sem conexão' },
  info:             { desenho: 'info',        cor: 'secundaria', nome: null },
  'xis-texto':      { desenho: 'falhou-no-texto', cor: 'vermelho', nome: 'falha' },
  horario:          { desenho: 'horario',     cor: 'secundaria', nome: 'em andamento' },
  'requisito-falta': { desenho: 'requisito-pendente', cor: 'marca', nome: 'ainda não' },
}

export const ESTADOS = {
  ok:               { desenho: 'confere',     cor: 'lima',      nome: 'aprovado' },
  'ok-cinza':       { desenho: 'confere',     cor: 'secundaria', nome: 'feito' },
  xis:              { desenho: 'falhou',      cor: 'vermelho',  nome: 'falha' },
  traco:            { marca: 'traco',                        nome: 'não se aplica' },
  espera:           { desenho: 'vazio',       cor: 'marca',     nome: 'ainda não' },
  'sem-sinal':      { desenho: 'sem-rede',    cor: 'vermelho',  nome: 'o link caiu' },
  'sem-sinal-neutro': { desenho: 'sem-rede',  cor: 'secundaria', nome: 'sem conexão' },
  energia:          { desenho: 'energia',     cor: 'lima',      nome: 'é com você' },
  pausa:            { desenho: 'pausa',       cor: 'secundaria', nome: 'parou' },
  relogio:          { desenho: 'aguardando',  cor: 'secundaria', nome: 'em andamento' },
  lua:              { desenho: 'lua',         cor: 'secundaria', nome: 'em repouso' },
  agora:            { marca: 'agora',                        nome: 'o passo que corre' },
}

// o tamanho do glifo vem do poço: --glifo-<poço> (a linha de tamanhos da folha 3)
// O check que nasce no poço · `esmaece`: o glifo que troca
// depois de a peça montar nasce de novo e esmaece em --mov-rapido (o novo entra
// por opacity; o de antes sai de uma vez). Ao abrir, parado. `chave`: o que conta
// como troca, quando não é só o estado (o 'lendo' da linha, o veredito que espera);
// sem ela, o estado. Quem liga: a LinhaChecagem, a LinhaContagem, o Trilho e o Aviso.
// `fino`: o traço de 2 que a referência daquele lugar usa (o relógio do critério pendente, T12/05)
export function Glifo({ estado = 'ok', poco = 24, nome, className = '', esmaece = false, chave, fino = false }) {
  const troca = useVez(chave ?? estado)
  const nasce = esmaece && troca.vez > 0 ? ' ds-glifo-nasce' : ''
  const vez = esmaece ? troca.vez : undefined
  const e = ESTADOS[estado] ?? FORA_DA_FOLHA[estado]
  const rotulo = nome ?? e.nome
  if (e.marca) return <span key={vez} role="img" aria-label={rotulo} className={`ds-glifo-marca ds-glifo-${e.marca} ${className}${nasce}`} />
  const { desenho } = e
  // o glifo sem nome é só desenho: mudo pro leitor (o 'info')
  const papel = rotulo == null ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-label': rotulo }
  return (
    <span key={vez} {...papel} className={`ds-glifo ds-glifo-cor-${e.cor} ds-glifo-${poco}${fino ? ' ds-glifo-fino' : ''} ${className}${nasce}`}>
      <Desenho nome={desenho} />
    </span>
  )
}
