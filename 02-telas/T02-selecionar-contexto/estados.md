# T02 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela: as empresas do técnico, nada escolhido · com uma empresa só, o app pula esta tela e vai direto pro sincronizar | `empresas` |
| `01-momento-escolhida` | momento | tocar numa empresa da lista · ou voltar pelo `Trocar de empresa` do pacote vencido (T03/04), com a atual marcada | `empresas` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
