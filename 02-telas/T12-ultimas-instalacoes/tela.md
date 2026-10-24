# T12 · Últimas instalações

Ver o que foi instalado nesta empresa e o que cada instalação provou.

| | |
|---|---|
| **Elemento-assinatura** | a trilha de evidência de cada instalação, etapa por etapa |
| **Chrome** | faixa quando há sessão |
| **Semente no protótipo** | empresa Viação Atlântico Sul · as 13 instalações dos ativos dela |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 4 — ver `estados.md` |

- no protótipo · a semente: empresa Viação Atlântico Sul · as 13 instalações · sessão M2C-0417 + RKT-8H42 (a 00 desenha a sessão aberta)

## O que se toca

- o detalhe mostra **o que o servidor recebeu**: posicionamento e eventos, cada um com o veredito e o porquê numa linha · a viagem não é mais critério (decisão 54) · o traço é *indisponível*
  - **no protótipo**: a seção *O QUE O SERVIDOR RECEBEU* entra antes de *A INSTALAÇÃO*, as duas com o rótulo a 6 do cartão, e cada critério é a assertiva da sessão na variante *recebimento* (58, o porquê embaixo, o veredito à direita). O porquê sai do dado: `3 posições em 1 min 12 s` (posições e `emSeg`), `o teste chegou em 24 s` (`recebidoAosSeg`), e no indisponível e no pendente o `motivo` do caso, com *· confere por 24 h* no pendente · o relógio é *pendente*, e o app confere de novo por 24 h — nunca reprova por rede (a `05`). Sem a linha da viagem (decisão 54). O recebimento não é etapa: *A INSTALAÇÃO* tem as seis da i-01, ou as três que o resumo sustenta nas outras (Configuração, Checklist, Autoteste)
  - **o status geral sai dos critérios**: com um indisponível ou pendente, o cabeçalho diz *aguardando validação*, em `--tinta-secundaria`; sem eles, o estado da instalação
  - **a instalação sem `recebimento`** — as outras doze do mock, que o técnico abre tocando na lista — leva o veredito da regra dos critérios do mock (`criteriosRegra.porEstado`, com a exceção da i-09) e fica sem o porquê, porque o mock não tem o número dela: a PCX-9A17 no fluxo tem os critérios conformes; a RVM-1E54, da falha reconhecida, os critérios *ausente*, com o xis — com a viagem fora (decisão 54), os critérios são dois, e a regra do mock se confere na checagem de cobertura. Os vereditos sem referência (*ausente*, *fora do parâmetro*, *incompleta*, *atrasado*) são o valor do mock, como vem; *atrasado* leva o relógio. Padrão do protótipo
  - **o quando de ontem** tem texto (T12/04 e 05): embaixo da placa, *M2C-0312 · ontem, 16:05*. As de mais de um dia seguem com a linha de baixo da lista
  - **T12/04 e 05:** a i-02 tem no mock as `etapas`, com os números que a referência desenha, e o detalhe da PCX-9A17 mostra as seis linhas e *Rafael Vieira*, como a referência
- os números vêm de `instalacoes[].recebimento`: o evento em 24 s é o do ciclo de testes
- o resumo da instalação: *Diagnóstico 8 de 8*, *Configuração 6 passos*, a calibração, *Ciclo de testes 4 de 4*, *Checklist 27 de 27* e o autoteste com os três contadores
  - **no protótipo:** o detalhe confere dois critérios, o posicionamento e os eventos. A i-01 lê as etapas dela: o *Diagnóstico 8 de 8* (as linhas do diagnóstico do módulo que contam), a *Configuração 6 passos* (os seis blocos da cadeia, a limpeza contada como passo), a calibração *nada a calibrar* (`calibracao.nadaACalibrar`, o ônibus do herói), o *Ciclo de testes 4 de 4*, o *Checklist 27 de 27* e o *Autoteste* com os três contadores embaixo do nome — *5 aprovadas · 1 não se aplica · 1 pendente*, sem valor à direita, nunca *8 de 8* (a linha do porquê, como o que o servidor recebeu: a variante `recebimento` da linha de checagem). As outras leem o resumo do mock: *6 passos*, *27 de 27* e os contadores escritos no resumo; a i-05, que falhou, com a assertiva embaixo, como a causa · o roteiro `app/scripts/caminhos/recebido.mjs` confere tudo isso
- tocar numa instalação → o detalhe
  - no protótipo: o detalhe é a 01. A i-01, a do herói, e a i-02, a PCX-9A17 de ontem, mostram as seis etapas; as outras abrem o mesmo detalhe só com as linhas que o resumo delas sustenta, Configuração, Checklist e Autoteste. O nome do técnico aparece nas instalações que têm a história inteira, a i-01 e a i-02: o resumo das outras não diz quem instalou. Embaixo da placa, o detalhe diz o módulo e o quando — *hoje, 11:47* ou *ontem, 16:05* — e, com a história inteira, quem instalou (*M2C-0312 · ontem, 16:05 · Rafael Vieira*, a i-02); mais antigas, ele repete a linha de baixo da lista (*M2C-0362 · há 9 dias*): o *quando* do detalhe só tem texto pra hoje e ontem. O 01 aberto pelo endereço mostra a mais nova da empresa, a i-01
  - **no protótipo · quem instalou**: o nome é o do dado — a i-01 é do herói do mock (`tecnico`, *Rafael Vieira*) —, nunca o de quem está logado: com outro usuário no aparelho (T01/18) o detalhe da RKT-8H42 segue dizendo *M2C-0417 · hoje, 11:47 · Rafael Vieira*. O roteiro `outro-usuario.mjs` prova com o m.souza. Padrão do protótipo; a alternativa é o mock ganhar quem instalou em cada instalação, conferido pela checagem de cobertura
- `Voltar às instalações`
  - no protótipo: → a lista (a 00)
- `Voltar ao menu`
  - no protótipo: → T04 · `ENCERRAR`, antes de homologar: a sessão abortada da T16; depois, o encerramento
    - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar antes de terminar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela · o `Encerrar mesmo assim` roda os 4 passos da T16
- o voltar do Android (no computador, o Esc) faz o mesmo que a saída do rodapé: no detalhe, volta às instalações; na lista, ao menu

**A lista.** As instalações dos ativos da empresa do contexto, das mais novas às mais velhas (*13 nesta empresa*, e a lista rola entre a faixa e o rodapé), em quatro grupos pela idade: até `hoje` dias é HOJE, até `ontem` é ONTEM, até `esteMesAte` é ESTE MÊS, e acima é MAIS DE UM MÊS — o corte nomeado do mock (`criteriosRegra.gruposIdade`), e não o calendário. Grupo sem instalação não aparece. Em HOJE e ONTEM a linha de baixo diz o módulo e a hora; nos outros, o módulo e há quantos dias. O veredito é o estado da instalação, com o glifo pela natureza: *aprovada*, *aguardando validação*, *falha reconhecida* e *reprovada* · a *aprovada após reprocessamento* diz só *aprovada* na lista, com o check (o nome inteiro empurraria a placa pra duas linhas), e o nome inteiro fica no cabeçalho do detalhe. A ressalva, que combina com qualquer estado, não aparece: o veredito é o estado, e nenhuma referência nem texto desenha a ressalva. A empresa sem instalação mostra o vazio declarado no lugar dos grupos (a 02); sem rede, o aviso da consulta anterior entra em cima da lista (a 03).
  - no protótipo: a lista são as instalações dos ativos do pacote da empresa (`app/src/telas/T12/dados.js` · `daEmpresa`): na Viação, as 13 do mock, e nas duas empresas espelho, as mesmas (diferença conhecida: o mock não tem a frota nem as instalações delas). O veredito da lista sai de `TX.veredito`, e o do cabeçalho do detalhe, de `TX.naCabeca`, que dá à reprocessada o nome inteiro (*aprovada após reprocessamento*, sem referência). O vazio (a 02) é o caso `instalacoes-vazia`, a consulta da empresa que volta sem nenhum id, sem sessão
  - no protótipo · diferença conhecida da referência: no detalhe (a 01, a 04 e a 05), os três contadores do autoteste embaixo do nome ficam em `--tinta-secundaria`, a tinta do porquê da linha de checagem (a variante `recebimento`); as referências os desenham em `--tinta-apagada` — 0,13% contra o HTML nas três

**No protótipo · a folga antes do rodapé**: o último grupo da lista não guarda 16 de margem embaixo — somados ao recheio do miolo, seriam folga dupla. Na rolagem 0 nada muda; na 03, que rola, o fim da lista fica a 16 do rodapé. As referências desenham assim a 00 e a 03, e as duas ficam em 0,04% do HTML.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- faixa · sem ação
- o topo do menu inteiro
- uma ação
- não se aplica
- assertiva da sessão
- linha de conferência
- aviso
- vazio declarado
- linha do histórico
- a lista de empresas
- encerrando
- reiniciando
- sem homologar
- com contador
- linha de opção
- linha de ônibus
- lista com contagem
- item feito
- item com ressalva

## No protótipo · as peças que o código usa

Medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e, onde as duas diferem, vale esta, a medida.

Medido nas referências: as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- linha tocável · normal e pressionada (o toque da linha do histórico)
- barra do sistema
- faixa · sessão aberta
- faixa · sem sessão
- uma ação
- com contador
- linha do histórico
- assertiva da sessão
- aviso
- vazio declarado
- os glifos de estado
- os poços
- os marcadores

Ficam fora as que nenhuma referência desenha e o código não usa (faixa · sem ação, linha de conferência, a lista de empresas, encerrando, pede o corte, sem homologar, linha de opção, linha de ônibus, lista com contagem), e está a faixa · sessão aberta, que a 00, a 01 e a 03 desenham. O com contador de falha nenhuma referência desenha, mas o código usa: é o cabeçalho do detalhe de uma instalação reprovada ou com a falha reconhecida, o veredito em vermelho, em 700 — a i-06, da empresa do herói, abre nele. As variantes nomeadas ficam declaradas na peça: a linha do histórico com o veredito pela natureza do estado (o que espera em `--tinta`, a falha em `--vermelho`) e com a linha de baixo em 12 quando diz há quantos dias; o contador neutro forte, em 700, no veredito do detalhe; a assertiva da sessão com o valor longo em duas linhas. Peça só da tela: o grupo por idade, o rótulo em cima do cartão (`app/src/telas/T12/pecas.jsx`), e a linha módulo · quando · técnico embaixo do cabeçalho do detalhe. Pela folha 6, o *com contador neutro* e o *com contador de falha* são uma peça só, o *com contador*: o *de falha* desta nota é ele em falha.

## Histórias de usuário

- **HU-T12-1** — Vejo por ativo: última intervenção, posicionamento, eventos e status geral
- **HU-T12-2** — A janela de posicionamento é derivada do pacote (`3 × intervalo + 2 min`), não fixa
- **HU-T12-3** — Os 10 min aparecem como teto de espera, não como critério
- **HU-T12-4** — Critério sem parâmetro declarado fica indisponível com motivo
- **HU-T12-5** — Offline mostro o último resultado conhecido com a data da consulta
- **HU-T12-6** — Falha por rede vira pendente com re-checagem por 24 h, não reprovação imediata

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## O resumo da instalação

- **os números**: o diagnóstico em 8 de 8, a configuração em *6 passos* (o requisito conta a limpeza como passo), a calibração *nada a calibrar* (o ônibus), o ciclo em 4 de 4, o checklist em 27 de 27
- **o autoteste com os três contadores**, embaixo do nome: *5 aprovadas · 1 não se aplica · 1 pendente* · nunca *8 de 8*
