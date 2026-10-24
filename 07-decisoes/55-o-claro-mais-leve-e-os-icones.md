# 55 · O claro mais leve, e os ícones são os nossos

**O contexto.** No app rodando, o claro estava pesado: o cinza do poço pintava todas as superfícies rebaixadas, não só os quadradinhos. Nos prints, ele ocupava um quarto da fila de saída, a faixa do topo do menu virava uma barra cinza, e o painel do pacote, os campos e a busca pesavam. O andamento (a etapa atual, o "agora" na régua) virou preto na conversão do escuro. E o caminhão do ativo apareceu diferente da referência: o app usava o caminhão do Lucide, porque a lei 14 mandava usar o Lucide, e o caminhão é um desenho nosso. Medindo, 37 dos 41 ícones das referências são desenhos nossos.

**A decisão.**
- **o rebaixado grande ganhou token próprio**, `--fundo-rebaixado`, leve no claro (`#F2F3F6`), com as bordas suaves: campo (de qualquer largura), painel, bloco de aviso, faixa do topo, busca e área da foto · **o poço fica só pro quadradinho**: o do ícone, o check, o trilho e o marcador · é ele que dá a personalidade do claro
- **o botão sobe um degrau em relação ao que está embaixo**: em cima do rebaixado, `--fundo-botao-no-rebaixado`, branco no claro
- **o andamento tem cor própria**, `--andamento`, o roxo da marca no claro · **dentro de uma barra em alerta**, `--andamento-alerta`, o vermelho escuro
- **a barra de status acompanha a superfície de baixo**
- **no claro, só cores mais macias**: o texto apagado em `#686B78`, a borda do botão secundário no tom do contorno do cartão (`#E2E3E8`), o contorno do interruptor desligado em `#B5B7C2`
- **nenhum token novo muda o escuro**: cada um nasce, no escuro, com o valor que o escuro já usava
- **o ícone é o desenho do jogo de ícones**, os 41 SVGs em `03-design-system/icones/`, e o `lucide-react` sai do app

**O que foi descartado.** O poço mais claro em todo lugar (o quadradinho perde o fundo e a personalidade) · o rebaixado ainda mais claro, `#F5F6F8` (o campo do login quase some, 1,01:1 contra a página) · os cinzas das bordas e das divisórias mais leves (a tela fica lavada) · sombra nos cartões (o claro deixa de ser só cores) · o grafite arroxeado no andamento (fica apagado) · manter o Lucide e só corrigir o caminhão (os outros 36 desenhos continuariam trocados, só que de um jeito difícil de ver).

**A consequência.** Oito tokens novos e três valores do claro mudam · as leis R-20 a R-24, e a lei 14 reescrita · a folha do tema refeita (hoje a folha 9), com a seção das superfícies do claro · 26 amostras do claro pra conferência · o jogo de 41 ícones · no app, os ícones mudam nos dois temas; o resto do escuro não muda nada.
