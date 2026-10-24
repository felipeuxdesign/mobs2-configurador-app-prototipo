# Guia para construir o protótipo

Vale junto com o `CLAUDE.md` da raiz. Este guia é só do protótipo navegável.

## O que você está construindo

**O app inteiro, navegável, dentro de um palco.** O palco é a moldura de apresentação em volta do celular — pular de tela, abrir estados. O app é o que o técnico usaria. **São duas coisas separadas no código.**

## A stack

- **Vite + React 18, em JavaScript**
- CSS com as variáveis de `03-design-system/tokens.css` — nenhum valor solto
- a Barlow dos woff2 de `05-recursos/fontes/` pra fonte, os mesmos das referências, e as duas barras do sistema são os desenhos oficiais do Android, de `05-recursos/sistema/`, cenário fixo — a hora vem desenhada na barra (lei 22, decisão 43) · os ícones do jogo, em `03-design-system/icones/`, o SVG exato de cada um · **o `lucide-react` não entra**: ícone novo nasce primeiro no jogo (lei 14)
- nada de biblioteca de componentes de fora: **os componentes são os do design system**, construídos aqui

## A estrutura em `app/`

```
app/
  src/
    ds/        os componentes do design system — uma vez, usados em tudo
    telas/     uma pasta por tela, T01 a T16, montadas com os componentes
    estado/    o estado único do protótipo e as sementes
    palco/     o quadrado, o painel, a coluna, o celular
    dados/     a ponte com 04-dados/mocks.js
  public/      só o que o navegador precisa servir
```

## As regras de construção

1. **Componente primeiro.** Nenhuma tela desenha uma peça que existe em `03-design-system/componentes.md`
2. **O estado vem do caso do mock.** Um estado é o app montado com os dados daquele caso — nunca uma tela desenhada à parte
3. **Fidelidade medida.** Cada tela, momento e estado construído é fotografado em 360 × 800 e comparado com o PNG da referência. **Diferença é bug** — ou uma diferença conhecida, com nome e motivo na ficha da tela
4. **Nada de hover.** O que responde é o pressionado — no clique, como no toque. Dentro do celular, o cursor fica a seta normal; a mãozinha só nas peças do palco
5. **Nada de foco de teclado desenhado no app.** O palco pode ter o dele
6. **Nome em todo tocável**, pro leitor de tela
7. **Área de toque a 8px de qualquer outra.** Onde o desenho deixa menos, ela cresce só pro lado livre — o link do rodapé pra baixo, o avatar pra cima —, e o que se vê fica igual à referência
8. **O PNG é gabarito, nunca peça.** Nenhuma imagem de tela entra no protótipo — o celular sempre roda código
9. **Mesma entrada, mesma saída.** Relógio congelado em 14:30; os tempos dos processos são os de `03-design-system/movimento.md`
10. **O teclado nunca esconde o que importa.** Com o teclado aberto, a tela rola pra deixar o campo em foco e o botão principal acima dele, e o rodapé sobe junto. O campo do painel, na T10, abre o teclado numérico · na tela do código (T01/03), o teclado do aparelho é desenhado no computador e no print, como cenário do sistema, e as teclas funcionam; no celular de verdade, abre o do aparelho (decisão 62)
11. **Sempre em retrato.** O app não gira, nem com o celular deitado no painel do ônibus
12. **Permissão negada tem saída.** Se o Android não deixa perguntar de novo, o botão vira `Abrir as configurações` — nunca um botão que não faz nada

## Como você trabalha

Em ciclos, como descreve o [`PROCESSO.md`](../PROCESSO.md). **Todo ciclo começa com o plano**, com o que foi medido, e só constrói depois da aprovação. Ele termina com os prints comparados, `npm run checar` e a checagem de cobertura aprovando, e o `CHANGELOG.md` atualizado.
