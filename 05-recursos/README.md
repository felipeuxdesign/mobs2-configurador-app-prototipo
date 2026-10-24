# Os recursos

| O quê | Onde | Como usar |
|---|---|---|
| **a marca** | `marca/logo-mobs2.svg` | o arquivo do login · importe como arquivo do projeto, nunca por endereço de fora · o lima dela é o `--lima`, `#AAEF00` · se chegar outra versão do arquivo, confira a cor antes de trocar |
| **a fonte** | Barlow 400, 500, 600, 700 · `fontes/`, com a licença `fontes/OFL-Barlow.txt` ao lado | as referências já usam estes arquivos · no protótipo, os mesmos arquivos, lidos daqui e empacotados no build · nunca pelo Google |
| **a fonte da barra de status** | Google Sans 500, recortada só com os números e os dois-pontos · `fontes/GoogleSans-hora.woff` (3,7 KB), com a licença `fontes/OFL-GoogleSans.txt` ao lado | só na hora da barra, que é do sistema (decisão 43, lei 22) · as referências a levam embutida; o protótipo lê este arquivo e o empacota no build · nunca da internet |
| **o GIF do README** | `readme/caminho-do-heroi.gif` | o caminho do herói do login à cadeia gravada e à CAN lida, e o fim da visita, com a instalação homologada, gravado do protótipo rodando: `GRAVA=prints/tmp/gravacao GRAVA_JANELA=1280x900 node scripts/caminho.mjs readme` e `python3 scripts/gif.py prints/tmp/gravacao ../../05-recursos/readme/caminho-do-heroi.gif --vel 1.4 --desde 1.6`, da pasta `06-prototipo/app` · grave de novo quando o caminho mudar |
| **as telas do README** | `readme/telas.png` e `readme/temas.png` | as referências lado a lado, em 2× (o PNG da pasta, sem reduzir), com o canto de 32, o contorno de 1 em `#3A3350` por fora e a sombra `0 24 48` a 35%, 40 entre as telas, no fundo transparente (as medidas em 1×; no arquivo, o dobro) · o claro vem da amostra de `03-design-system/claro-amostras/` · gere de novo com `python3 scripts/readme-telas.py`, da pasta `06-prototipo/app` |
| **a imagem de capa** | `readme/previa-social.png` | 1280 × 640, a prévia do repositório quando o link é compartilhado: o nome, a linha do projeto e as telas do README no `--fundo-pagina`, com a Barlow · no GitHub, em Settings → General → Social preview |
| **o cenário do sistema** | `sistema/` · a barra de status, a navegação por gestos e o teclado numérico, no escuro e no claro | não são do app: são cenário (lei 22) · o `LEIA-ME` de lá diz a medida de cada um e onde ele entra |
| **os ícones** | o jogo de 48 SVGs em `03-design-system/icones/` | o desenho exato de cada um, com a cor do token e o traço da lei 14 · ícone novo nasce primeiro no jogo |

Os números sempre em `font-variant-numeric: tabular-nums`.
