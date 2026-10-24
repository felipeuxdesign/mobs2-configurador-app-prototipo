# Publicar

## O caminho

1. **Validar local:** `npm run dev` — é onde se valida cada ciclo
2. **Validar a versão de produção, ainda local:** `npm run build` e `npm run preview`. É essa que vai pro ar, e às vezes o que funciona no modo de desenvolvimento quebra no build
3. **Subir pra Vercel:** o repositório está conectado à Vercel. Nesta entrega, o push aprovado em `main` atualiza o link oficial. Para revisar um ciclo antes disso, valide localmente ou use uma prévia de branch disponível no projeto da Vercel; não conte com um endereço novo só por trocar o nome do ciclo

## Tudo viaja dentro do build

Na Vercel não tem servidor nem pasta do lado. Então:

- a fonte de `05-recursos/fontes/`, empacotada no build · os ícones do jogo (`03-design-system/icones/`), lidos no build · a logo como arquivo do projeto
- o mock importado no build · **nenhuma chamada pra fora**
- nenhuma imagem de tela — o celular sempre roda código

## O link tem que funcionar pra quem recebe

- abre no computador e no celular — no celular, o modo janela estreita
- os endereços diretos, como `?tela=T07&estado=02-estado-serial-nao-cadastrado`, abrem certo
- a etiqueta com a data e o ciclo aparece no canto do palco

## Na Vercel

O repositório é a pasta inteira — os documentos andam junto com o código. O projeto da Vercel constrói **só a `app/`**:

| Configuração | Valor |
|---|---|
| Root Directory | `06-prototipo/app` |
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Include files outside the Root Directory in the Build Step | **ligado** |

O último item é obrigatório: o protótipo lê o mock de `04-dados/` e a marca de `05-recursos/`, fora da `app/`. Com ele desligado, o build não acha o mock e quebra. **Os arquivos continuam onde estão** — nunca copie o mock pra dentro da `app/`, senão passam a existir dois e um deles mente.

## A configuração

O app é uma página só: os lugares moram na URL, então a Vercel serve o `index.html` pra tudo. Um `vercel.json` com a regra de reescrever qualquer caminho pro `index.html` garante isso.
