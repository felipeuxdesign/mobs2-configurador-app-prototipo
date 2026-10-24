# T03 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | empresa Viação Atlântico Sul · pacote pac-emp-01 |
| `01-estado-falha-de-rede` | estado | a rede cai no meio do download, com o pacote do aparelho valendo (o de ontem, da Viação Atlântico Sul) · `Continuar com o pacote de ontem` segue com ele | `sync-falha-rede-pacote-valido` |
| `02-momento-concluido` | momento | o download termina | `pacotes` |
| `03-estado-pacote-de-4-dias` | estado | o pacote tem entre 3 e 7 dias · a Transportes Capibaribe | `pacotes · pac-emp-02` |
| `04-estado-pacote-vencido` | estado | o pacote passou de 7 dias · a Expresso Caruaruense | `pacotes · pac-emp-03` |
| `05-estado-falha-de-rede-sem-pacote-valido` | estado | a rede cai no meio do download, e o pacote do aparelho venceu (a Expresso Caruaruense, 8 dias) · `Trocar de empresa` volta à T02 | `sync-falha-rede` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
