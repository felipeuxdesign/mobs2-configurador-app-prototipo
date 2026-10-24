// T13 · o movimento do checklist (02-telas/T13-checklist/animacao.md):
//   · a seção abre (T13·1): o cartão cresce no lugar, as de baixo descem por transform, a
//     seta gira, e os itens esmaecem junto, em 200 — não é troca de quadro;
//   · o nível do item: abrir o item, passar ao próximo depois do Usar foto e voltar às
//     seções trocam o desenho inteiro — o conteúdo esmaece em 150, como entre telas; o rodapé nasce
//     com o quadro, e o texto do primário não esmaece de novo por dentro;
//   · a foto no quadro (decisão 63): o Tirar foto não troca o quadro — a foto e o registro esmaecem
//     em 150 dentro dele, no lugar da imagem ao vivo, o primário e o link trocam o texto no lugar, e nada
//     mais se mexe; o Tirar de novo faz o contrário;
//   · a barra do checklist (T13·2): na volta às seções, parte do que tinha quando o item
//     abriu e avança em 300 até o novo; sem nada novo, não anda; no Finalizar, completa;
//   · o check das fotos tiradas (T13·4): entra com a troca da volta, sem esmaecer de novo;
//   · a caixa do não conforme: marcar, ela desliza pro lugar novo em 150 e o campo esmaece
//     embaixo dela; o quadrado surge; desmarcar faz o mesmo ao contrário;
//   · o registro do problema (T13·4): a foto do problema e o registro esmaecem dentro do quadro,
//     como a foto da Montagem; a caixa e o campo ficam onde estão (a 08 e a 15 têm o quadro do mesmo
//     tamanho); a frase do que enquadrar, embaixo do título (decisão 60), troca no lugar, direto;
//   · o botão diz o que falta: o texto novo esmaece no lugar, o roxo troca direto; o
//     Fotografar o problema que desabilita no toque não mostra o roxo;
//   · o veredito (T13·5): no Finalizar, esmaece em 150 no lugar, a barra completa e o texto do
//     primário troca no lugar;
//   · o Encerrar antes de terminar? nasce e some em 150 com o véu (a peça);
//   · a ciência (T13·6) só se alcança num estado da coluna, parado: a prova é o espécime
//     mov-check-ciencia (mov-check).
//   · a Seção D lida bloco a bloco (a 38): ao entrar no checklist, ela
//     enche no ritmo do diagnóstico, e a barra avança com o que é lido — é o processo; acabou, nada anda;
//   · a resposta se refaz (decisão 64): o Testar de novo — a resposta e o que aconteceu saem esmaecendo em
//     150, o bip toca de novo, e a pergunta entra no lugar; o não ouvi que passa a contar (42 → 50) troca
//     no lugar, esmaecendo;
//   · o Descartar a ressalva? (a 51): o voltar com o que aconteceu escrito pergunta; o diálogo nasce e some
//     em 150, com o véu; o Continuar no item fica no item, e o Descartar volta ao checklist, com a troca;
//   · um toque não vale por dois (decisão 64): o Encerrar sessão nasce no lugar do Finalizar instalação e
//     só responde 300 ms depois — o toque duplo no Finalizar não encerra a sessão, também com reduzir.
// A tela abre parada pela URL, em cada momento e estado, e no print. Com reduzir, nada anda.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em, ms = 150) => ({ prop: 'opacity', ms, em, curva: C })
const desliza = (em, ms = 150) => ({ prop: 'transform', ms, em, curva: C })
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const MIOLO = esmaece('tela-miolo')
const SECAO = [esmaece('ds-secao-ck-corpo', 200), desliza('ds-secao-ck', 200), desliza('ds-icone', 200)]
const FECHA = [desliza('ds-secao-ck', 200), desliza('ds-icone', 200)]
const BARRA = desliza('ds-barra-ck', 300)
const TEXTO = esmaece('ds-primario-texto')                 // o texto do primário que troca no lugar
const TEXTO_NASCE = { prop: 'opacity', em: 'ds-primario-texto-nasce' }
const SEM_ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]
const MARCA = [esmaece('ds-quadrado-cheio'), desliza('ds-quadrado-cheio')]
const CHECKBOX_SOLTA = { prop: 'opacity', ms: 100, em: 'ds-checkbox', curva: C }   // o pressionado do checkbox solta em 100, como a linha
const DESMARCA = [esmaece('ds-quadrado'), desliza('ds-quadrado')]
const CAIXA = desliza('t13-nao-conforme')
const CAMPO = esmaece('ds-campo-texto')
const CAMPO_SAI = esmaece('ds-justificativa-sai')
const FOTO = esmaece('ds-visor-camada')                     // a foto e o registro, no quadro (decisão 63)
const LINK = esmaece('ds-link-texto-nasce')                 // o texto do link que troca com o primário
const SAI = esmaece('ds-reorganiza-sai')                    // o que sai, por cima, esmaecendo
const VEREDITO = esmaece('ds-veredito-ck')
const DIALOGO = { prop: 'opacity', ms: 150, em: 'ds-dialogo', curva: C }
const M02 = '02-momento-b-montagem-aberta'
const M07 = '07-momento-responder-item'
const M08 = '08-momento-nao-conforme-com-justificativa'
const M15 = '15-momento-problema-fotografado'
const MOMENTOS = [
  '01-momento-a-identificacao-aberta', M02, '03-momento-c-hardware-aberta', '04-momento-d-configuracao-aberta',
  '05-momento-e-teste-dinamico-aberta', '06-momento-f-servidor-aberta', M07, M08, '11-momento-aguardando-autoteste',
  '12-momento-b-com-ressalva', '13-momento-e-resolvida', M15,
  '17-momento-foto-do-lado-de-cima', '18-momento-foto-do-chicote', '19-momento-foto-do-leitor', '20-momento-foto-do-painel',
  '44-momento-foto-do-modulo-tirada', '45-momento-foto-do-lado-de-cima-tirada', '46-momento-foto-do-chicote-tirada',
  '47-momento-foto-do-leitor-tirada', '48-momento-foto-do-painel-tirada',
  '41-momento-bip-ouvido', '42-momento-bip-nao-ouvido', '50-momento-bip-nao-ouvido-com-o-que-aconteceu', '51-momento-descartar-a-ressalva',
]
const ESTADOS = ['09-estado-item-reprovado', '10-estado-finalizar-com-a-secao-f-falhando', '14-estado-aguardando-autoteste-sem-localizacao', '16-estado-secao-c-com-item-reprovado', '49-estado-secao-f-falhando']
const M40 = '40-momento-bip-esperando-resposta'
const M50 = '50-momento-bip-nao-ouvido-com-o-que-aconteceu'
const M51 = '51-momento-descartar-a-ressalva'
const BIP_SAI = [esmaece('ds-item-ck-resposta'), esmaece('ds-item-ck-embaixo')]   // a resposta e o que aconteceu, saindo
const RESPOSTA_NASCE = esmaece('ds-item-ck-resposta-nasce')
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
// os quadros que abrem com a lista rolada, como a referência (a 04, 05, 06, 13, 41, 42 e 50; a 49 e a 10, até o
// fim): o indicador de rolagem aparece com a rolagem, fica os 900 da --rolagem-espera e some em 300, como em
// toda rolagem — a segunda olhada espera ele sumir
const ROLADOS = ['04-momento-d-configuracao-aberta', '05-momento-e-teste-dinamico-aberta', '06-momento-f-servidor-aberta',
  '13-momento-e-resolvida', '41-momento-bip-ouvido', '42-momento-bip-nao-ouvido', '50-momento-bip-nao-ouvido-com-o-que-aconteceu',
  '10-estado-finalizar-com-a-secao-f-falhando', '49-estado-secao-f-falhando']
const PARADA_ROLADA = [{ quieto: true }, { dorme: 1400 }, { quieto: true }]
const parada = (ref) => (ROLADOS.includes(ref) ? PARADA_ROLADA : PARADA)
// a D lida bloco a bloco ao entrar (a 38): um a cada 600 ms, e depois a tela fica parada
const D_LIDA = [{ ve: 'lendo do módulo' }, { naoVe: 'lendo do módulo', ms: 9000 }, { dorme: 400 }]

export default [
  // ── abre parada: pela URL, em cada momento e em cada estado, e no print ──
  { abre: '?tela=T13' },
  ...D_LIDA,
  ...PARADA,
  ...MOMENTOS.flatMap((m) => [{ abre: `?tela=T13&momento=${m}` }, ...parada(m)]),
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T13&estado=${e}` }, ...parada(e)]),
  { abre: '?tela=T13&print=1' },
  ...PARADA,
  ...MOMENTOS.flatMap((m) => [{ abre: `?tela=T13&momento=${m}&print=1` }, ...parada(m)]),
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T13&estado=${e}&print=1` }, ...parada(e)]),

  // ── a seção abre no lugar: não é troca de quadro (T13·1) ──
  { abre: '?tela=T13' },
  ...D_LIDA,
  { quieto: true },
  { toca: 'B · Montagem', anima: SECAO, naoAnima: [MIOLO] },
  { chega: 'T13', momento: M02 },
  { dorme: 300 },
  { quieto: true },
  // tocar de novo fecha: o mesmo ao contrário — a seta volta e as de baixo sobem, em 200; os
  // itens saem com o cartão, que já tem o tamanho novo e corta o que passa da borda
  { toca: 'B · Montagem', anima: FECHA, naoAnima: [MIOLO, esmaece('ds-secao-ck-corpo', 200)] },
  { chega: 'T13', momento: null },
  { dorme: 300 },
  { quieto: true },

  // ── o nível do item: abrir, a foto no quadro, o próximo depois do Usar foto ──
  // (do 13, com o ciclo feito: no fim das fotos, o Finalizar acende)
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { toca: 'B · Montagem', anima: SECAO, naoAnima: [MIOLO] },
  { chega: 'T13', momento: M02 },
  { dorme: 300 },
  { toca: 'Módulo', anima: TROCA, naoAnima: [BARRA] },
  { chega: 'T13', momento: M07 },
  { ve: 'Módulo fixado e posicionado' },
  // o 13 abre rolado, como a referência: o item abre no topo, e o indicador de rolagem
  // fica os 900 da --rolagem-espera e some em 300, como em toda rolagem
  { dorme: 1400 },
  { quieto: true },
  // o Tirar foto não troca o quadro: a foto e o registro esmaecem dentro dele, o primário e o link
  // trocam o texto no lugar, e nada mais se mexe (o quadro fica do mesmo tamanho)
  { marcaLugar: true },
  { toca: 'Tirar foto', anima: [FOTO, TEXTO, LINK], naoAnima: [MIOLO, CAIXA] },
  { chega: 'T13', momento: '44-momento-foto-do-modulo-tirada' },
  { dorme: 250 },
  { mesmoLugar: true },
  { quieto: true },
  // o Tirar de novo: o contrário — a foto e o registro saem esmaecendo, e a câmera ao vivo volta
  { toca: 'Tirar de novo', anima: [FOTO, TEXTO, LINK], naoAnima: [MIOLO, CAIXA] },
  { chega: 'T13', momento: M07 },
  { dorme: 250 },
  { mesmoLugar: true },
  { quieto: true },
  { toca: 'Tirar foto', anima: [FOTO], naoAnima: [MIOLO] },
  { dorme: 250 },
  // o Usar foto: o próximo item, pela troca; o texto não esmaece de novo por dentro
  { toca: 'Usar foto', anima: TROCA, naoAnima: [TEXTO_NASCE] },
  { ve: 'Lado de cima do módulo livre' },
  { dorme: 250 },
  { quieto: true },

  // ── o não conforme: a caixa desliza, o campo esmaece embaixo dela, o quadrado surge ──
  // no item da vez, o Lado de cima (o 17), o não conforme não tem referência (o 08 e o 15 são do Módulo): a URL sai do momento ·
  // a frase embaixo do título troca no lugar, direto (a do lado de cima, de duas linhas, vira o Enquadre o problema)
  { toca: 'Não está conforme', anima: [...MARCA, CAIXA, CAMPO, TEXTO, CHECKBOX_SOLTA], naoAnima: [MIOLO] },
  { chega: 'T13', momento: null },
  { ve: 'Enquadre o problema' },
  { dorme: 250 },
  { quieto: true },
  // desmarcar: o mesmo ao contrário — a caixa desce, o campo de antes esmaece por cima
  { toca: 'Não está conforme', anima: [...DESMARCA, CAIXA, CAMPO_SAI, TEXTO, CHECKBOX_SOLTA], naoAnima: [MIOLO] },
  { chega: 'T13', momento: '17-momento-foto-do-lado-de-cima' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Não está conforme', anima: [CAIXA, CAMPO, TEXTO] },
  { chega: 'T13', momento: null },
  { dorme: 250 },
  // sem o texto, o Fotografar o problema vira o Conte o que aconteceu, apagado: sem o roxo;
  // a foto do problema e o registro esmaecem dentro do quadro, e a caixa e o campo não se mexem
  { digita: '', em: 'O QUE ACONTECEU' },
  { dorme: 250 },
  { toca: 'Fotografar o problema', anima: [FOTO, TEXTO, LINK], naoAnima: [...SEM_ROXO, MIOLO, CAIXA, SAI] },
  { chega: 'T13', momento: null },
  { desligado: 'Conte o que aconteceu' },
  { dorme: 250 },
  { quieto: true },
  // o texto chega: o Salvar com ressalva, com o texto novo no lugar
  { digita: 'Suporte trincado; fixei com abraçadeira até a troca.', em: 'O QUE ACONTECEU' },
  { anima: [TEXTO] },
  { ve: 'Salvar com ressalva' },
  { dorme: 250 },
  // desmarcar com a foto guardada (15 → 07): a foto do problema sai esmaecendo do quadro, o campo sai por
  // cima, e a caixa desliza pro lugar da 07
  { toca: 'Não está conforme', anima: [FOTO, CAMPO_SAI, CAIXA, TEXTO] },
  { chega: 'T13', momento: '17-momento-foto-do-lado-de-cima' },
  { dorme: 250 },
  // e marcar de novo (07 → 15): a foto do problema esmaece no quadro, o campo embaixo da caixa
  { toca: 'Não está conforme', anima: [FOTO, CAMPO, CAIXA, TEXTO] },
  { chega: 'T13', momento: null },
  { dorme: 250 },
  { quieto: true },
  // Salvar com ressalva: o próximo item, pela troca; o texto não esmaece de novo por dentro
  { toca: 'Salvar com ressalva', anima: TROCA, naoAnima: [TEXTO_NASCE, CAIXA] },
  { chega: 'T13', momento: '18-momento-foto-do-chicote' },
  { ve: 'Chicote e emendas protegidos' },
  { dorme: 250 },
  { toca: 'Tirar foto', anima: [FOTO], naoAnima: [MIOLO] },
  { dorme: 250 },
  { toca: 'Usar foto', anima: TROCA },
  { ve: 'Leitor posicionado' },
  { dorme: 250 },
  // o último (o Leitor — o ônibus não calibra, e o Painel não entra): a volta às seções, e a
  // barra avança do que tinha quando o item abriu
  { toca: 'Tirar foto', anima: [FOTO], naoAnima: [MIOLO] },
  { dorme: 250 },
  { toca: 'Usar foto', anima: [...TROCA, BARRA], naoAnima: [esmaece('ds-glifo')] },   // o check entra com a troca
  { chega: 'T13', momento: '12-momento-b-com-ressalva' },
  { ve: '4 de 4' },
  { dorme: 400 },
  { quieto: true },
  // ── o Finalizar (T13·5): o veredito esmaece no lugar, a barra completa, o texto do primário troca;
  // a B aberta fecha (as de baixo dela sobem, a peça) ──
  { toca: 'Finalizar instalação', anima: [VEREDITO, BARRA, TEXTO, ...FECHA], naoAnima: [MIOLO] },
  { chega: 'T13', momento: '11-momento-aguardando-autoteste' },
  { ve: 'Checklist registrado' },   // a homologação é da T16
  { dorme: 400 },
  { quieto: true },
  // com as seções fechadas: o espaço do veredito abre direto, e nenhuma seção desliza (a lista não mede o lugar de cada seção fora dela)
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { toca: 'B · Montagem' },
  { dorme: 300 },
  { toca: 'Módulo' },
  { dorme: 250 },
  ...[1, 2, 3, 4].flatMap(() => [{ toca: 'Tirar foto' }, { dorme: 250 }, { toca: 'Usar foto' }, { dorme: 250 }]),
  { chega: 'T13', momento: M02 },
  { ve: '4 de 4' },
  { dorme: 400 },
  { toca: 'B · Montagem', anima: FECHA },
  { chega: 'T13', momento: null },
  { dorme: 300 },
  { toca: 'Finalizar instalação', anima: [VEREDITO, BARRA, TEXTO], naoAnima: [MIOLO, { prop: 'transform', em: 'ds-secao-ck' }, { prop: 'transform', em: 'ds-icone' }] },
  { chega: 'T13', momento: '11-momento-aguardando-autoteste' },
  { dorme: 400 },
  { quieto: true },

  // ── a volta sem nada novo: a troca, e a barra não anda; o voltar do Android faz o mesmo, e com a
  //    foto no quadro ele a descarta (decisão 63): o item não conta, e a barra não anda ──
  { abre: `?tela=T13&momento=${M02}` },
  { toca: 'Módulo', anima: TROCA },
  { chega: 'T13', momento: M07 },
  { dorme: 250 },
  { toca: 'Voltar ao checklist', anima: TROCA, naoAnima: [BARRA] },
  { chega: 'T13', momento: M02 },
  { dorme: 250 },
  { toca: 'Módulo', anima: TROCA },
  { dorme: 250 },
  { toca: 'Tirar foto', anima: [FOTO], naoAnima: [MIOLO] },
  { dorme: 250 },
  { tecla: 'Escape' },
  { anima: TROCA, naoAnima: [BARRA] },
  { chega: 'T13', momento: M02 },
  { ve: 'você fotografa 4 itens' },
  { dorme: 400 },
  { quieto: true },

  // ── a resposta se refaz (decisão 64): o Testar de novo, a pergunta que volta, e o não ouvi que conta ──
  { abre: `?tela=T13&momento=${M50}` },
  ...PARADA_ROLADA,
  { toca: 'Testar de novo', anima: BIP_SAI, naoAnima: [MIOLO] },
  { chega: 'T13', momento: '39-momento-bip-tocando' },
  { ve: 'Tocando…' },
  { chega: 'T13', momento: M40, entre: [700, 1600] },   // o buzzer, ~1 s
  { ve: 'Faltam 9 itens obrigatórios' },   // o bip que contava desceu do placar
  { toca: 'Não ouvi', naoAnima: [MIOLO] },
  { chega: 'T13', momento: '42-momento-bip-nao-ouvido' },
  { ve: 'Faltam 9 itens obrigatórios' },   // o não ouvi sem o que aconteceu ainda não conta
  { digita: 'O leitor acende, mas o bip não toca.', em: 'O QUE ACONTECEU' },
  { anima: [RESPOSTA_NASCE] },
  { chega: 'T13', momento: M50 },
  { ve: 'não ouvi · com ressalva' },
  { ve: 'Faltam 8 itens obrigatórios' },
  { dorme: 300 },
  { quieto: true },

  // ── o Descartar a ressalva? (a 51): o voltar com o que aconteceu escrito pergunta antes ──
  { abre: `?tela=T13&momento=${M15}` },
  ...PARADA,
  { tecla: 'Escape' },
  { anima: [DIALOGO], naoAnima: [MIOLO] },
  { chega: 'T13', momento: M51 },
  { ve: 'Descartar a ressalva?' },
  { dorme: 250 },
  { toca: 'Continuar no item', anima: [DIALOGO], naoAnima: [MIOLO] },
  { chega: 'T13', momento: M15 },
  { naoVe: 'Descartar a ressalva?' },
  { dorme: 250 },
  { tecla: 'Escape' },
  { chega: 'T13', momento: M51 },
  { dorme: 250 },
  { toca: 'Descartar', anima: [DIALOGO, ...TROCA] },
  { chega: 'T13', momento: M02 },
  { ve: 'você fotografa 4 itens' },   // o item voltou a ficar por fazer
  { dorme: 400 },
  { quieto: true },

  // ── um toque não vale por dois (decisão 64): o toque duplo no Finalizar instalação não encerra a sessão;
  // o Encerrar sessão que nasce no lugar responde depois de 300 ms ──
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { toca: 'B · Montagem' },
  { dorme: 300 },
  { toca: 'Módulo' },
  { dorme: 250 },
  ...[1, 2, 3, 4].flatMap(() => [{ toca: 'Tirar foto' }, { dorme: 250 }, { toca: 'Usar foto' }, { dorme: 250 }]),
  { toca: 'B · Montagem' },
  { dorme: 400 },
  { toqueDuplo: 'Finalizar instalação' },
  { chega: 'T13', momento: '11-momento-aguardando-autoteste' },
  { fica: 'T13', ms: 800 },
  { toca: 'Encerrar sessão' },
  { chega: 'T16' },
  { abre: `?tela=T13&momento=${M02}` },
  ...PARADA,

  // ── o Encerrar antes de terminar? (decisão 36): nasce e some em 150, com o véu ──
  { toca: 'ENCERRAR', anima: [DIALOGO] },
  { ve: 'Encerrar antes de terminar?' },
  { dorme: 250 },
  { toca: 'Continuar a instalação', anima: [DIALOGO], naoAnima: [MIOLO] },
  { naoVe: 'Encerrar antes de terminar?' },
  { dorme: 250 },
  { quieto: true },

  // ── com reduzir movimento: nada anda ──
  { reduzir: true },
  { abre: `?tela=T13&momento=${M02}` },
  { quieto: true },
  { toca: 'Módulo' },
  { quieto: true },
  { toca: 'Não está conforme' },
  { quieto: true },
  { toca: 'Fotografar o problema' },
  { quieto: true },
  { toca: 'Não está conforme' },
  { quieto: true },
  { toca: 'Tirar foto' },
  { quieto: true },
  { toca: 'Tirar de novo' },
  { quieto: true },
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: M02 },
  { quieto: true },
  { toca: 'B · Montagem' },
  { quieto: true },
  { toca: 'B · Montagem' },
  { quieto: true },
  // o Finalizar, direto: o veredito, a barra e o texto do primário
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { toca: 'B · Montagem' },
  { toca: 'Módulo' },
  ...[1, 2, 3, 4].flatMap(() => [{ toca: 'Tirar foto' }, { toca: 'Usar foto' }]),   // as quatro da B (sem o Painel)
  { chega: 'T13', momento: M02 },
  { toca: 'Finalizar instalação' },
  { quieto: true },
  { chega: 'T13', momento: '11-momento-aguardando-autoteste' },
  // o toque duplo não é movimento (decisão 64): com reduzir, o Encerrar sessão que nasce também espera os 300 ms
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { toca: 'B · Montagem' },
  { toca: 'Módulo' },
  ...[1, 2, 3, 4].flatMap(() => [{ toca: 'Tirar foto' }, { toca: 'Usar foto' }]),
  { toca: 'B · Montagem' },
  { dorme: 400 },
  { toqueDuplo: 'Finalizar instalação' },
  { chega: 'T13', momento: '11-momento-aguardando-autoteste' },
  { fica: 'T13', ms: 800 },
  { toca: 'Encerrar sessão' },
  { chega: 'T16' },
  // o Testar de novo e o Descartar, direto
  { abre: `?tela=T13&momento=${M50}` },
  { toca: 'Testar de novo' },
  { chega: 'T13', momento: M40 },
  { quieto: true },
  { abre: `?tela=T13&momento=${M15}` },
  { tecla: 'Escape' },
  { chega: 'T13', momento: M51 },
  { quieto: true },
  { toca: 'Descartar' },
  { chega: 'T13', momento: M02 },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna e a volta ao fluxo abrem parados ──
  { abre: `?tela=T13&momento=${M02}` },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Finalizar com a Seção F falhando' },
  { chega: 'T13', estado: ESTADOS[1] },
  ...PARADA,
  { palco: 'Alimentação reprovada' },   // o nome curto da coluna
  { chega: 'T13', estado: ESTADOS[0] },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T13', estado: null },
  ...PARADA,
]
