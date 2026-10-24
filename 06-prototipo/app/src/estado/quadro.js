// O modo print (?print=1) fotografa o app pra comparar com a referência.
// Nele, todo processo que anda sozinho (a sincronização, o cronômetro, a
// pré-checagem…) para no quadro que a referência desenha: a tela abre já no
// quadro, e nenhum relógio anda. Fora do print, os processos correm no ritmo
// de ritmos.js.
export const EM_QUADRO = new URLSearchParams(window.location.search).get('print') === '1'
