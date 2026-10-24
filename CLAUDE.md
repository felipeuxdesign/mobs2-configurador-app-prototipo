# Guia para agentes de IA

Vale pra qualquer agente que trabalhe nesta pasta. O método está explicado no [`PROCESSO.md`](PROCESSO.md).

Você está num projeto cujo design já foi decidido, medido e aprovado. **Seu trabalho é construir o que está descrito — não redesenhar.** Se algo parecer errado, você mede, prova e propõe; nunca corrige por conta.

## O método

1. **Estude antes de construir.** Leia a pasta inteira na ordem do [`GUIA-DE-LEITURA.md`](GUIA-DE-LEITURA.md) (o caminho de quem constrói o protótipo). Abra cada referência de tela antes de tocar no código dela.
2. **Meça antes de afirmar.** Contagem, medida e cor saem das referências e do mock — nunca da memória.
3. **Apresente o plano e espere a aprovação.** Antes de construir: o levantamento do que existe, o que contradiz a premissa, as divergências, as decisões numeradas com a opção que você adotaria, e o que não faz sentido.
4. **Diferença com nome, nunca silenciosa.** Se a realidade impede a especificação, faça o possível e registre a diferença e o motivo na ficha da tela, numa nota *no protótipo*.
5. **Documentação segue o código.** Se o código muda uma regra, a documentação muda junto, no mesmo ciclo.
6. **Mesma entrada, mesma saída.** Zero `Math.random`, zero `Date.now`, zero `new Date()`. O relógio do produto é 14:30, congelado.

## O que é norma

- **O comportamento** de cada tela, momento e estado: `02-telas/*/tela.md` e `estados.md`
- **Os textos**, exatamente como estão: `02-telas/*/textos.md`
- **As medidas, as cores e os tamanhos**: `03-design-system/tokens.css` — nenhum valor solto no código
- **As leis visuais e de produto**: `03-design-system/leis.md`
- **O movimento**: `03-design-system/movimento.md` e `02-telas/*/animacao.md`
- **O dado**: `04-dados/mocks.js`, com a checagem de cobertura aprovando

## Os proibidos

- inventar número, contagem ou texto que não esteja no mock ou nas referências
- cor, tamanho ou espaço fora dos tokens
- **hover** de qualquer tipo — o app é de toque; o que responde é o **pressionado**
- foco de teclado desenhado no app — o leitor de tela do sistema desenha o dele
- animar a entrada de tela, contar de zero ao abrir, animar em loop, mover o layout
- **o dado ao vivo não é loop**: o sinal que muda de verdade troca o número no lugar a cada leitura, sem transição — é o dado chegando, não animação (os sinais da CAN, na T07)
- remontar uma tela num estado — **o estado muda o conteúdo, nunca o desenho**
- lima fora de veredito, de escolhido e do texto do botão primário
- mencionar tecnologia, protocolo ou código pro técnico — ele lê negócio · a exceção é a APN, que ele precisa conferir (decisão 51)

## Os números desta versão

15 telas · 129 momentos · 86 estados · 110 histórias de usuário · 318 tokens · 117 peças no design system · 9 folhas · dois temas (o escuro, padrão; o claro, neutro frio, escolha do técnico) · 69 casos no mock.
