// O avatar da conta: as iniciais num cartão redondo — o fundo e a borda de cartão,
// que inverte sozinho no claro (o círculo só no LED e no avatar, tokens.css · --raio). Dois tamanhos: 'tira' (32, na tira de
// contexto do menu) e 'conta' (52, no cartão da folha da conta). Mudo pro
// leitor: quem leva o nome é o botão ou o texto ao lado.
import './Avatar.css'

export function Avatar({ iniciais, tam = 'tira' }) {
  return <span aria-hidden="true" className={`ds-avatar ds-avatar-${tam}`}>{iniciais}</span>
}
