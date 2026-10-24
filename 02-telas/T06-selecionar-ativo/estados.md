# T06 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | sessão M2C-0417 · os 24 ônibus do pacote da empresa |
| `01-momento-confirmar-o-veiculo` | momento | tocar num ônibus | `ativos` |
| `04-estado-fora-do-pacote` | estado | o ônibus é de outra empresa: está no cadastro do M2, fora do pacote | `ativo-fora-pacote` |
| `06-estado-conflito-de-pinos-sem-saida` | estado | pinos ocupados, sem saída | `conflito-pinos-sem-saida` |
| `08-momento-busca-sem-resultado` | momento | digitar na busca uma placa que não existe | derivado do fluxo |
| `09-momento-busca-esconde-a-escolha` | momento | com um ativo escolhido, digitar uma busca que esconde ele | derivado do fluxo |
| `10-estado-modulo-em-outro-ativo` | estado | o módulo já está vinculado a outro ativo | `modulo-em-outro-ativo` |
| `11-estado-modulo-ja-deste-ativo` | estado | o módulo já é deste ativo — manutenção | `modulo-ja-deste-ativo` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

- **no protótipo** (medido com `node scripts/tela.mjs compara T06 <ref>`): o `01`, o `04`, o `06`, a `08`, a `09`, o `10` e o `11` estão em **0% contra o HTML**. Diferença conhecida da referência: o `00` (0,41%) — a lista do pacote tem os 24 ônibus da Viação e rola, e a sexta linha, o RVM-1E54, aparece cortada embaixo, no traço do rodapé; a referência desenha só as cinco primeiras, com o cartão fechado depois da quinta (a régua dos textos acusa as outras dezenove como *sobra*). Contra o PNG, o `11` dá 4,16%: no PNG, o *vez.* da frase do aviso desce pra segunda linha; no HTML, no mesmo Chrome do app, a frase cabe numa linha (261 px de texto numa caixa de 264) — é a rasterização do gerador, e o desenho segue o HTML. O `10` e o `11` são quadros da confirmação, como o `04` a `06`: o aviso fica entre o título e o escolhido, e o escolhido desce em relação ao `01` (`animacao.md`)
