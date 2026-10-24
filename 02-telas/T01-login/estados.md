# T01 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | nenhuma sessão · usuário r.vieira preenchido |
| `01-estado-usuario-ou-senha-incorretos` | estado | Entrar com senha de menos de 8 caracteres · a senha é apagada e o cursor vai pra ela; o usuário fica | `credenciais` |
| `02-momento-recuperar-escolher-canal` | momento | `Esqueci a senha` · a primeira etapa, com o telefone fora do formato: *Faltam 2 números.* e o botão desligado | `recuperacao.digitado` |
| `03-momento-recuperar-digitar-codigo` | momento | `Enviar o código`, com o dado no formato | `credenciais.recuperacao` |
| `04-momento-nao-recebi-o-codigo` | momento | `Não recebi o código` | derivado do fluxo |
| `05-momento-codigo-errado` | momento | digitar um código diferente de 482913 | `credenciais.recuperacao` |
| `06-estado-codigo-expirado` | estado | o código passa de 10 minutos | `recuperacao.limites.validadeMin` |
| `07-estado-tentativas-esgotadas` | estado | o terceiro código errado | `recuperacao.limites.tentativas` |
| `08-momento-recuperar-nova-senha` | momento | o código certo | derivado do fluxo |
| `09-momento-senha-alterada` | momento | a nova senha cumpre os seis requisitos | derivado do fluxo |
| `10-momento-senha-visivel` | momento | tocar no olho — a senha aparece por extenso e o olho vira o riscado | `credenciais.senha` |
| `11-momento-nao-recebi-reenvio-liberado` | momento | os 60 s do reenvio zeram | `recuperacao.limites.reenvioSeg` |
| `12-momento-codigo-reenviado` | momento | tocar em *Reenviar o código* | `recuperacao.limites` |
| `13-momento-codigo-no-e-mail` | momento | o código de novo, pro e-mail: o *Usar outro dado*, o e-mail como canal e o `Enviar o código` | `recuperacao.digitado` |
| `14-estado-login-sem-conexao` | estado | `Entrar` sem internet | `sem-conexao-no-login` |
| `15-estado-primeiro-acesso` | estado | nenhum usuário lembrado — o app acabou de ser instalado, ou o técnico não marcou Lembrar | `primeiro-acesso` |
| `16-estado-usuario-lembrado` | estado | o técnico marcou Lembrar meu usuário num login anterior | `usuario-lembrado` |
| `17-estado-teto-de-envios` | estado | pedir um código depois dos 3 envios da hora | `teto-de-envios` |
| `18-estado-outro-usuario-no-aparelho` | estado | entrar com um usuário diferente do da sessão anterior | `outro-usuario` |
| `19-momento-entrando` | momento | tocar em `Entrar` · 1,2s antes do menu | derivado do fluxo |
| `20-momento-telefone-no-formato-certo` | momento | o telefone completo: o botão liga | `recuperacao.digitado` |
| `21-momento-o-e-mail-como-canal` | momento | o e-mail escolhido como canal: sem o seletor de país | `recuperacao.digitado` |
| `22-momento-o-seletor-de-pais` | momento | tocar no país: o seletor, com busca, o Brasil (+55) já escolhido | `ddis` |
| `23-momento-folha-nao-recebi-no-teto` | momento | `Não recebi o código` no teto dos envios da hora (a 17): a folha diz por que as duas saídas esperam, e elas ficam apagadas, com a hora em que liberam | `teto-de-envios` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.

No protótipo: a `17` abre pela coluna e pelo endereço, montada pelo caso `teto-de-envios` (os 3 envios da hora e a hora em que libera), parada e sem toque; no fluxo, o teto chega pelo reenvio da `12` ou da `13`, quando a espera zera, e pedir o código de novo no teto traz o que já foi — a URL diz o momento do código (`03`, `12` ou `13`), e a linha, o teto. A `18` abre pela coluna e pelo endereço, montada pelo caso `outro-usuario`: é a T02 com o diálogo por cima, parada e sem toque; no fluxo, chega-se a ela saindo da conta e entrando com outro usuário, e a URL diz a T02, onde o diálogo mora. O detalhe está no `tela.md` · Como o protótipo constrói.
