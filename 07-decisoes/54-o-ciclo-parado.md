# 54 · O ciclo de testes é parado, e o servidor não confere viagem

**O contexto.** Os requisitos definem o ciclo com a ignição ligada e o veículo parado: a rotação, as entradas, o cartão e o evento de teste. A velocidade, só com tacógrafo digital. E no servidor, ficam o posicionamento e o evento — a viagem sai.

**A decisão.** O **Ciclo de testes** tem seis passos: ignição ligada, rotação, ré, porta, cartão do motorista e ignição desligada. **A velocidade só entra quando o modelo tem tacógrafo digital** — o herói não tem. O servidor confere **o posicionamento e os eventos**. No checklist, a Seção E segue os seis passos, e a A perde o chassi. Na fila, a foto de calibração vira o checklist.

**O que foi descartado.** Manter o movimento detectado — exigiria rodar com o ônibus · manter a viagem — sem deslocamento, não há viagem pra conferir.

**A consequência.** A T14 vira *Ciclo de testes*, com as sete referências em seis passos · a T12 sem a viagem · a T13 com 31 itens: a A com 3, a E com 6 · no mock, `tacografoDigital` nos modelos, o `CICLO` e os critérios sem viagem, e o caso `motor-desligado-no-ciclo`.
