# As convenções do design system

O que vale pra toda peça em `src/ds/`. Vem das leis (`03-design-system/leis.md`).

## Onde mora

- **Primitivos** em `src/ds/primitivos/`: `Poco`, `Glifo`, `Icone`, `Desenho` (o SVG exato do jogo de ícones, `03-design-system/icones`; o riscado vem no desenho, com o fio do vão na cor do fundo onde o ícone mora), `Quadrado` e `Led` (marcadores), `Tocavel`, `Primario`, `SoIcone`, `Link`, `Checkbox`. Importe de `src/ds/index.js`.
- **Cada família** em `src/ds/<familia>/`: um `.jsx` e um `.css` por peça, e um `index.js` da família. Classes com prefixo `ds-`.
- **Os espécimes da vitrine** em `src/vitrine/especimes/f<folha>-<familia>.jsx`, exportando `especimes = [{ id, folha, rotulo, legenda, chrome?, render }]`. O `rotulo` é o texto exato do rótulo do espécime na folha. `chrome: true` quando a moldura da folha tem recheio 0. `nome`, opcional: o nome que a vitrine mostra no lugar do `rotulo`, quando o `componentes.md` já renomeou a peça e a folha ainda não (hoje nenhum espécime precisa: a folha 4 já rotula a *linha de empresa* como o `componentes.md`, lei 18 e decisão 56); a bancada segue achando a moldura pelo `rotulo`.

## O CSS

- **Só tokens.** Todo tamanho, cor e tempo vem de `var(--…)` de `03-design-system/tokens.css` (há `calc()` com tokens). Nenhum hex, nenhum px solto. Se falta um token, ele entra **com o papel escrito** (nunca pelo valor) e com quem usa, num `tokens-propostos.css` na pasta de quem pede (a família em `src/ds/<família>/`, ou a tela em `src/telas/Tnn/`), importado por ela; depois ele passa pro `tokens.css` e o arquivo sai. Antes de criar, procure no `tokens.css` um token com o mesmo papel: mesmo valor e mesmo papel é o mesmo nome. (Os 96 das famílias moram no bloco *as peças das oito folhas* do `tokens.css`.)
- **Medida por dentro** (`box-sizing` já é global). **Números tabulares** (já na base).
- **Sem hover. Sem foco desenhado.** O que responde é o pressionado, com `:active` — por `Tocavel` (camada `--elevado`), `Primario` (roxo pressionado e escala), `Link` (duas camadas). Pra fotografar o pressionado parado, a classe `ds-forca-toque`.
- **Só transform e opacity se movem.** Cor não anima: duas camadas, e a de cima entra por opacity. Tempos: `--mov-rapido` 150 · `--mov-padrao` 200 · `--mov-lento` 300 · `--mov-solta` 100, curva `--mov-curva`. O reduzir movimento zera os tempos sozinho.
- **O marcador de escolha é um só, o `Quadrado`** (decisão 29): vazado de 11 no desmarcado, lima de 11 no marcado, que surge por opacidade e escala. Quem escolhe — o `Checkbox`, as linhas de escolha, a coluna do palco — põe o `Quadrado` num `Poco`: 24 no checkbox e na coluna, 30 na linha de lista. Nenhum poço de escolha fica vazio.
- **Glifo sempre pelo `Glifo`** (o desenho do jogo de ícones, com o nome pro leitor de tela), dentro de um `Poco` do tamanho da linha: 38 → 24, 44 → 30, 50 → 32. **Ícone pelo `Icone`**.
- **Ícone riscado pelo desenho do jogo** (lei 21): o olho riscado e o Bluetooth desligado são SVGs do jogo, o ícone inteiro com o risco por cima e o fio do vão pintado na cor do fundo onde ele mora (`--fundo-do-icone`, o poço por padrão; o campo e o vazio da busca dizem o deles) · **nunca o lucide-react**, que não entra no app
- **Folha fecha dos quatro jeitos** (lei 20): o X, o toque fora e o arraste moram na `Folha` e chamam o `aoFechar` dela, que tem de fechar a folha; o voltar do Android é da tela que a abriu (`useVoltar`, com o mesmo fechar).

## A peça

- **Recebe o dado por props** — texto, número, estado. Nenhum texto das telas escrito dentro da peça: quem monta a tela passa o texto do `textos.md`.
- **Todo tocável tem nome** pro leitor de tela (o texto visível ou `rotulo`).
- **O estado muda o conteúdo** (Lei 3): as variantes da peça mudam o que ela diz, não o lugar das coisas.

## A bancada

Com `npm run dev` rodando: `node scripts/especime.mjs compara <folha> "<rótulo>" <id>`. Ela renderiza o espécime da folha e o da vitrine no mesmo Chrome, a 1×, e dá a diferença em %. Antes da foto, a moldura da folha vai pro pixel inteiro (a posição fracionária dela rasterizava o texto meio pixel deslocado), e a vitrine mede depois das fontes. `node scripts/especime.mjs todos` roda todos, folha a folha, e grava `prints/especimes/relatorio.json`. **A meta é 0%.** O glifo é o desenho do jogo de ícones, o mesmo das referências das telas; onde a folha desenha um glifo que o jogo não tem (o relógio e as últimas instalações da folha 3), a diferença fica só no glifo, e isso se confirma olhando o `prints/especimes/<id>-diff.png`.
