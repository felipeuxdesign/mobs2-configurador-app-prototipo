# Os ícones

O app tem **48 ícones**, e cada um é um desenho exato, guardado aqui como SVG. **O ícone é este desenho**, nunca o parecido de uma biblioteca: 44 são desenhos próprios do app e 4 vêm do Lucide, já copiados pra cá. Três deles, as setas das linhas, são desenhados numa grade de 20, e não de 24; e quatro (`energia`, `lua`, `email` e `camera-sem-permissao`) estão nas folhas do design system, sem tela que os use ainda.

- **a cor vem do token**: o SVG usa `currentColor`, e o componente pinta com o token do papel (o veredito, a marca, a tinta) · assim o mesmo desenho serve no escuro e no claro
- **o traço segue a lei 14**: 2,2 nos glifos de estado, 1,8 nas ferramentas do menu e nas folhas · o tamanho é o da referência de cada lugar, listado abaixo
- **o fio que separa um risco** (o olho riscado, o Bluetooth desligado, a câmera sem permissão, a rede) usa `var(--poco)`, a cor do fundo onde o ícone mora
- **ícone novo**: desenha-se primeiro aqui, numa piloto aprovada, e só depois ele entra no código · o Lucide pode ser o ponto de partida, nunca o atalho

| ícone | origem | aparece em | tamanho | traço |
|---|---|---|---|---|
| `confere` | desenho próprio | T03/02, T07/00, T07/01, T07/02, T07/03, T07/04 e mais 86 | 16px, 18px, 19px, 14px, 20px, 15px, 17px | 2.2 |
| `aguardando` | desenho próprio | T07/02, T07/03, T07/06, T07/10, T07/11, T09/05 e mais 33 | 16px, 18px, 20px, 19px, 14px | 2.2 |
| `falhou` | desenho próprio | T01/01, T07/02, T07/03, T07/04, T07/05, T07/08 e mais 25 | 16px, 15px, 18px, 19px, 14px, 22px, 20px | 2.2 |
| `vazio` | desenho próprio | T03/00, T03/01, T09/00, T13/00, T13/01, T13/02 e mais 24 | 18px, 16px, 19px, 17px, 20px | 2.2 |
| `info` | desenho próprio | T06/10, T06/11, T07/00, T07/01, T07/02, T07/03 e mais 18 | 16px | 2.2 |
| `modulo` | desenho próprio | T04/00, T04/01, T04/02, T04/03, T04/04, T04/05 e mais 11 | 18px, 20px | 1.8 |
| `fila-de-saida` | desenho próprio | T04/00, T04/01, T04/02, T04/03, T04/04, T04/05 e mais 11 | 18px | 1.8 |
| `ultimas-instalacoes` | Lucide · history | T04/00, T04/01, T04/02, T04/03, T04/04, T04/05 e mais 10 | 18px | 1.8 |
| `fechar` | desenho próprio | T01/04, T01/11, T01/22, T04/05, T04/07, T04/08 e mais 8 | 20px | 2.2 |
| `ativo` | desenho próprio | T04/00, T04/02, T04/03, T04/04, T04/06, T04/09 e mais 6 | 18px, 22px | 1.8 |
| `diagnostico` | desenho próprio | T04/00, T04/02, T04/03, T04/04, T04/06, T04/09 e mais 6 | 18px | 1.8 |
| `configurar` | desenho próprio | T04/00, T04/03, T04/04, T04/06, T04/09, T04/10 e mais 5 | 18px | 1.8 |
| `calibracao` | desenho próprio | T04/00, T04/03, T04/04, T04/06, T04/09, T04/10 e mais 5 | 18px | 1.8 |
| `ferramenta` | Lucide · wrench | T04/00, T04/03, T04/04, T04/06, T04/09, T04/10 e mais 5 | 18px | 1.8 |
| `checklist` | desenho próprio | T04/00, T04/03, T04/04, T04/06, T04/09, T04/10 e mais 5 | 18px | 1.8 |
| `busca` | desenho próprio | T02/02, T02/03, T02/04, T06/00, T06/08, T06/09 | 18px | 1.8 |
| `foto` | desenho próprio | T13/07, T13/08, T13/17, T13/18, T13/19, T13/20 | 46px | 1.8 |
| `olho` | desenho próprio | T01/00, T01/01, T01/14, T01/15, T01/16, T01/19 | 20px | 1.8 |
| `rota` | Lucide · route | T13/05, T13/39, T13/40, T13/41, T13/42 | 16px | 1.8 |
| `pausa` | desenho próprio | T03/03, T09/03, T16/04, T16/06 | 16px, 19px | 2.2 |
| `sem-rede` | desenho próprio | T03/01, T09/02, T09/03, T12/03 | 16px, 20px | 2.2 |
| `nao-se-aplica` | desenho próprio | T16/02, T16/05, T16/07 | 19px | 2.2 |
| `horario` | desenho próprio | T11/05, T12/05, T13/43 | 16px | 2.2, 2 |
| `abrir-lista` | desenho próprio | T01/02, T01/20, T01/22 | 14px | 2 |
| `falhou-no-texto` | desenho próprio | T11/00, T11/03, T11/06 | 16px | 2.2 |
| `camera` | Lucide · camera | T13/02, T13/12 | 16px | 1.8 |
| `escolhido` | desenho próprio | T01/22, T13/15 | 20px, 18px | 2.2 |
| `reenviar` | desenho próprio | T01/04, T01/11 | 18px | 1.8 |
| `outro-canal` | desenho próprio | T01/04, T01/11 | 18px | 1.8 |
| `requisito-cumprido` | desenho próprio | T01/08, T01/09 | 16px, 15px | 2.2 |
| `requisito-pendente` | desenho próprio | T01/08, T01/09 | 16px | 2.2 |
| `bluetooth-desligado` | desenho próprio | T05/16, T05/17 | 22px | 1.8 |
| `enviar` | desenho próprio | T15/01 | 20px | 2.2 |
| `modulo-na-folha` | desenho próprio | T04/10 | 22px | 1.8 |
| `seguir` | desenho próprio | T01/11 | 16px | 2.2 |
| `olho-riscado` | desenho próprio | T01/10 | 20px | 1.8 |
| `fechar-a-folha` | desenho próprio | T01/16 | 18px | 2 |
| `busca-de-pais` | desenho próprio | T01/22 | 16px | 2 |
| `sem-rede-no-login` | desenho próprio | T01/14 | 16px | 2.2 |
| `refazer` | desenho próprio | T11/03 | 18px | 1.8 |
| `documento` | desenho próprio | T11/03 | 18px | 1.8 |
| `seta-seguir` | desenho próprio, na grade de 20 | a seta › das linhas que abrem: T11/03, T13/00 a T13/42 e mais | 16px, na caixa de 20 | 2.2 |
| `seta-fechar` | desenho próprio, na grade de 20 | a seta ˄ da seção aberta do checklist: T13/01 a T13/42 | 16px | 2.2 |
| `seta-abrir` | desenho próprio, na grade de 20 | a seta ˅ que abre a empresa e a lista: T04/00 a T04/16 e mais | 14px | 2.2 |
| `energia` | desenho próprio | as folhas 3 e 5, a energia que é com o técnico · nenhuma tela ainda | 20px | 2.2 |
| `lua` | desenho próprio | a folha 3, o módulo em repouso · nenhuma tela ainda | 20px | 2.2 |
| `email` | desenho próprio | as folhas 2 e 6, mandar pro e-mail · nenhuma tela ainda | 18px | 1.8 |
| `camera-sem-permissao` | desenho próprio: a `camera` com o risco do jogo | a câmera sem permissão · nenhuma tela ainda | 16px | 1.8 |

## Os pares parecidos

Seis desenhos têm uma segunda versão: `sem-rede` e `sem-rede-no-login`, `fechar` e `fechar-a-folha`, `busca` e `busca-de-pais`, `modulo` e `modulo-na-folha`, `falhou` e `falhou-no-texto`, `escolhido` e `requisito-cumprido`. **Cada um vale no lugar dele**, como está nas referências. Unificar é uma decisão de desenho, ainda em aberto.

A folha `folha-de-icones.png` mostra os 48, no poço, no escuro e no claro. O `sem-rede` tem o ponto da antena em `currentColor`: ele segue a cor do ícone, o vermelho na T03/01 e o cinza nas outras.
