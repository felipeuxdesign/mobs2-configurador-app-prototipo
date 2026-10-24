# Monta o GIF do README a partir de uma gravação do caminho.mjs (GRAVA=<pasta>).
# Os quadros do screencast chegam só quando a página muda, cada um com a hora dele: aqui
# eles viram um filme de ritmo fixo (cada instante mostra o último quadro que chegou),
# recortado no celular com a moldura, acelerado e com uma paleta só pro filme inteiro.
# A paleta começa pelas cores do tokens.css, exatas (o lima, o roxo, o vermelho, os fundos
# e as tintas arroxeadas), e o resto sai do filme, com cada cor contando pela raiz cúbica de
# quantas vezes aparece: pela contagem pura, os fundos escuros levavam a paleta inteira, e o
# lima do texto e do veredito, que ocupa pouco, saía cinza (medido contra a gravação: o erro
# nos pixels de cor caiu de 36 pra 5, e no filme inteiro, de 5,7 pra 3,2).
#
# Uso (da pasta app): python3 scripts/gif.py <pasta-da-gravação> <saída.gif> [--fps 12] [--vel 1.5] [--larg 330] [--desde 1.6]
import json, sys, os, re
from PIL import Image, ImageStat

args = sys.argv[1:]
def opcao(nome, padrao):
    if nome in args: i = args.index(nome); v = args[i + 1]; del args[i:i + 2]; return type(padrao)(v)
    return padrao
FPS = opcao('--fps', 12); VEL = opcao('--vel', 1.5); LARG = opcao('--larg', 330); FOLGA = opcao('--folga', 24); DESDE = opcao('--desde', 0.0)
pasta, saida = args[0], args[1]
ind = json.load(open(os.path.join(pasta, 'indice.json')))
q = ind['quadros']; c = ind['celular']; ext = ind.get('formato', 'jpg')
# O screencast pode sair em pixels físicos (2× no fotógrafo), enquanto o
# retângulo do celular vem em pixels CSS. Converte o recorte para a imagem.
primeiro = Image.open(os.path.join(pasta, f"q{q[0]['n']:05d}.{ext}"))
janela = ind.get('janela', primeiro.size)
# o recorte: o celular com a moldura, e uma folga em volta, no fundo do palco · a escala sai do
# tamanho de CADA quadro (o primeiro quadro pode sair menor, com a janela ainda se
# ajustando, e a escala dele cortava o pé do celular em todos os outros)
def caixa_de(im):
    ex = im.width / janela[0]; ey = im.height / janela[1]
    return (max(0, int((c['left'] - FOLGA) * ex)), max(0, int((c['top'] - FOLGA) * ey)),
            int((c['right'] + FOLGA) * ex), int((c['bottom'] + FOLGA) * ey))
# o filme começa no primeiro quadro com o app desenhado: antes dele, o palco ainda sem o
# celular (a capa do GIF no GitHub é o primeiro quadro, e ele tem de ser o login)
def desenhado(n):
    im = Image.open(os.path.join(pasta, f'q{n:05d}.{ext}')).convert('L'); im = im.crop(caixa_de(im))
    return ImageStat.Stat(im).stddev[0] > 15
while len(q) > 1 and not desenhado(q[0]['n']): q = q[1:]
# e, com --desde, alguns segundos depois: a fonte e a marca ainda carregando não entram
q = [x for x in q if x['t'] >= q[0]['t'] + DESDE] or q
t0, t1 = q[0]['t'], q[-1]['t']
passo = VEL / FPS            # segundos de gravação por quadro do GIF
quadros, k, t = [], 0, t0
while t <= t1:
    while k + 1 < len(q) and q[k + 1]['t'] <= t: k += 1
    quadros.append(q[k]['n']); t += passo
# quadros repetidos viram um quadro só, mais longo
filme = []
for n in quadros:
    if filme and filme[-1][0] == n: filme[-1][1] += 1
    else: filme.append([n, 1])
def abre(n):
    im = Image.open(os.path.join(pasta, f'q{n:05d}.{ext}')).convert('RGB'); im = im.crop(caixa_de(im))
    alt = round(im.height * LARG / im.width)
    return im.resize((LARG, alt), Image.LANCZOS)
imgs = [abre(n) for n, _ in filme]
# uma paleta só pro filme inteiro: as cores do app não tremem de um quadro pro outro
TOKENS = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../03-design-system/tokens.css')
fixas = list(dict.fromkeys(tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
                           for h in re.findall(r'#([0-9A-Fa-f]{6})\b', open(TOKENS).read())))
caixas = {}   # a cor de cada caixinha de 5 bits por canal: quantas vezes, e a soma, pra média
for im in imgs:
    for n, (r, g, b) in im.getcolors(im.width * im.height):
        k = (r >> 3, g >> 3, b >> 3); v = caixas.get(k)
        if v: v[0] += n; v[1] += r * n; v[2] += g * n; v[3] += b * n
        else: caixas[k] = [n, r * n, g * n, b * n]
pontos = []
for n, r, g, b in caixas.values(): pontos += [(r // n, g // n, b // n)] * max(1, round(n ** (1 / 3)))
amostra = Image.new('RGB', (len(pontos), 1)); amostra.putdata(pontos)
livres = 256 - len(fixas)
do_filme = amostra.quantize(colors=livres, method=Image.MEDIANCUT).getpalette()[:3 * livres]
cores = fixas + [tuple(do_filme[i:i + 3]) for i in range(0, len(do_filme), 3)]
paleta = Image.new('P', (1, 1)); paleta.putpalette([x for cor in cores for x in cor])
pals = [im.quantize(palette=paleta, dither=Image.NONE) for im in imgs]
dur = [round(1000 * v / FPS) for _, v in filme]
dur[-1] += 1500   # o último quadro fica um pouco antes de o GIF recomeçar
pals[0].save(saida, save_all=True, append_images=pals[1:], duration=dur, loop=0, optimize=True, disposal=1)
tam = os.path.getsize(saida) / 1e6
print(f'{saida}: {len(pals)} quadros, {sum(dur) / 1000:.1f} s, {pals[0].width}×{pals[0].height}, {tam:.1f} MB')
