import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

// A app lê o mock (04-dados), os tokens (03-design-system), a fonte e a marca
// (05-recursos) de fora da própria pasta — os arquivos continuam onde estão
// (publicar.md). O fs.allow libera a raiz do repositório para o servidor de dev.
// A régua escreve em prints/ (as fotos e os perfis do Chrome): o servidor não olha
// essa pasta, senão cada .html que o Chrome grava no perfil recarrega o app no meio
// do caminho.
const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = resolve(aqui, '../..')

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true, fs: { allow: [raiz] }, watch: { ignored: ['**/prints/**'] } },
  preview: { port: 4173, strictPort: true },
})
