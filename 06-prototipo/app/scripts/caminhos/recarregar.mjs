// Recarregar a página recomeça do login, no computador também (palco.md,
// O celular, nos dois jeitos): o endereço continua acompanhando a navegação — é ele que se
// copia pra mandar uma tela —, mas a página recarregada abre a T01. Um link aberto de novo
// ainda abre a tela, o estado ou o painel dele. E o palco não pede senha.
export default [
  // um link direto abre a tela dele, sem porta de senha na frente
  { abre: '?tela=T07' },
  { chega: 'T07' },
  { recarrega: true },
  { chega: 'T01' },
  // um estado aberto pelo endereço, e recarregado: o login, sem o estado
  { abre: '?tela=T05&estado=16-estado-bluetooth-desligado' },
  { chega: 'T05', estado: '16-estado-bluetooth-desligado' },
  { recarrega: true },
  { chega: 'T01', estado: null },
  // andando no app: o endereço acompanha, e o recarregar volta ao login
  { toca: 'Entrar' },
  { chega: 'T02' },
  { ve: 'Pra qual empresa hoje?' },   // o herói, com as três empresas (decisão 56)
  { recarrega: true },
  { chega: 'T01' },
  // o mesmo endereço aberto de novo, como um link: abre a tela dele
  { abre: '?tela=T02' },
  { chega: 'T02' },
  { ve: 'Pra qual empresa hoje?' },   // a tela pelo endereço: a 00, as três empresas, nada escolhido (a semente da T02)
  { desligado: 'Escolha uma empresa' },
]
