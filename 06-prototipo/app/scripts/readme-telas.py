# As imagens de telas do README: as referências lado a lado, em 2× (o PNG da pasta, 720 × 1600,
# sem reduzir), com o canto de 32, o contorno de 1 em #3A3350 por fora e a sombra 0 24 48 a 35%,
# 40 entre as telas e a margem que a sombra pede, no fundo transparente. As medidas estão em 1×;
# no arquivo, o dobro. Da pasta 06-prototipo/app: python3 scripts/readme-telas.py (precisa do Pillow).
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

RAIZ = Path(__file__).resolve().parents[3]
TELAS = RAIZ / '02-telas'
SAIDA = RAIZ / '05-recursos' / 'readme'
X = 2                                    # o arquivo é em 2×
L, A = 360 * X, 800 * X                  # a tela, do tamanho do PNG
RAIO, CONTORNO, VAO = 32 * X, 1 * X, 40 * X
COR_CONTORNO = (0x3A, 0x33, 0x50, 255)
SOMBRA_Y, SOMBRA_BLUR, SOMBRA_OPACIDADE = 24 * X, 48 * X, 0.35
LADO, CIMA, BAIXO = 48 * X, 24 * X, 72 * X   # a margem que a sombra pede
SS = 4                                   # a amostragem que alisa o canto
FOLGA = 3 * SOMBRA_BLUR                  # o desfoque corre fora da folha e é cortado depois


def recorte(largura, altura, raio):
    # o retângulo de canto redondo, desenhado SS vezes maior e reduzido pela média: o canto sai liso
    m = Image.new('L', (largura * SS, altura * SS), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, largura * SS - 1, altura * SS - 1), raio * SS, fill=255)
    return m.reduce(SS)


def tela(caminho):
    # a tela com o canto de 32, sobre o contorno de 1 por fora (o contorno tem o canto de 33)
    im = Image.open(caminho).convert('RGBA')
    assert im.size == (L, A), f'{caminho.name}: {im.size}, esperado {(L, A)}'
    im.putalpha(recorte(L, A, RAIO))
    fora = (L + 2 * CONTORNO, A + 2 * CONTORNO)
    peca = Image.new('RGBA', fora, COR_CONTORNO)
    peca.putalpha(recorte(*fora, RAIO + CONTORNO))
    peca.alpha_composite(im, (CONTORNO, CONTORNO))
    return peca


def sombra(folha, pos, forma):
    # a sombra do CSS: a forma da peça, descida de 24 e desfocada (o desfoque de 48 é o gaussiano de 24)
    x, y = pos
    largura, altura = folha.size
    m = Image.new('L', (largura + 2 * FOLGA, altura + 2 * FOLGA), 0)
    m.paste(forma, (x + FOLGA, y + SOMBRA_Y + FOLGA))
    m = m.filter(ImageFilter.GaussianBlur(SOMBRA_BLUR / 2))
    m = m.point(lambda v: int(v * SOMBRA_OPACIDADE)).crop((FOLGA, FOLGA, FOLGA + largura, FOLGA + altura))
    camada = Image.new('RGBA', folha.size, (0, 0, 0, 0))
    camada.putalpha(m)
    folha.alpha_composite(camada)


def tira(caminhos, nome):
    n = len(caminhos)
    folha = Image.new('RGBA', (2 * LADO + n * L + (n - 1) * VAO, CIMA + A + BAIXO), (0, 0, 0, 0))
    for i, c in enumerate(caminhos):
        # cada tela pinta a sua sombra e depois a si, na ordem, como no navegador
        peca = tela(c)
        pos = (LADO + i * (L + VAO) - CONTORNO, CIMA - CONTORNO)
        sombra(folha, pos, peca.getchannel('A'))
        folha.alpha_composite(peca, pos)
    folha.save(SAIDA / nome, optimize=True)
    print(nome, folha.size)


diagnostico = TELAS / 'T07-diagnostico-do-modulo/referencias/png/00-tela.png'
tira([diagnostico,
      TELAS / 'T07-diagnostico-do-modulo/referencias/png/02-estado-serial-nao-cadastrado.png',
      TELAS / 'T09-configurar-modulo/referencias/png/04-momento-cadeia-concluida.png',
      TELAS / 'T16-sessao/referencias/png/02-momento-instalacao-homologada.png'], 'telas.png')
tira([diagnostico, RAIZ / '03-design-system/claro-amostras/T07-00-o-diagnostico.png'], 'temas.png')
