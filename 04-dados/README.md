# Os dados

`mocks.js` é **o contrato de dado** do protótipo. Toda tela mostra só o que ele tem, e todo estado nasce de um caso ou de um dado dele. Os casos, e as referências que cada um monta, estão em [casos.md](casos.md).

| | |
|---|---|
| [`mocks.js`](mocks.js) | os dados de exemplo: a empresa, os ativos, os módulos, os modelos, o pacote, a fila, o checklist e os **69 casos**, cada um uma condição do mundo |
| [`casos.md`](casos.md) | cada caso e as referências e receitas que ele monta |
| [`checar-cobertura.js`](checar-cobertura.js) | a checagem que recomputa as âncoras do mock e confere as fichas contra as referências |
| [`fotos/`](fotos/) | as fotos de exemplo da Montagem e do problema, desenhadas (o protótipo não tem câmera) |

## As regras

- **Nenhum número inventado.** Se uma tela precisa de um valor que o mock não tem, isso é um achado da checagem de cobertura — nunca um número digitado no componente
- **Mesma entrada, mesma saída.** Zero `Math.random`, zero `Date.now`, zero `new Date()`. O dia é `DIA_NOMINAL` e a hora é `HORA_NOMINAL`, 14:30
- **Nenhuma cor no dado.** Cor é do design system
- **O herói do protótipo:** Rafael Vieira · empresa Viação Atlântico Sul · módulo M2C-0417 · ônibus RKT-8H42

## A checagem de cobertura

```
node 04-dados/checar-cobertura.js
```

Recomputa as âncoras do mock e prova que ele não mente. **Roda em toda mudança no mock.** Se não aprovar, a mudança não entra.

## Como o app lê

O mock define `window.M2CF_MOCKS`. No protótipo, importe como módulo e **não copie valores dele pra dentro dos componentes** — leia na hora de montar a tela.
