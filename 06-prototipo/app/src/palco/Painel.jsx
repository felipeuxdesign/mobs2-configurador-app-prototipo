// O painel (palco.md, decisão 25, quadro 04): em duas partes — o caminho, na
// ordem do fluxo, e as consultas —, e no pé a data da última atualização (tocar
// na T01 zera o estado e abre o login) · em cima
// dela, a linha Modo claro, que troca só o celular de tema — o mesmo estado do
// interruptor da folha da Conta (estado/tema.js), lembrado no aparelho.
// Desliza da esquerda por cima de tudo; fecha no X, tocando fora ou com Esc.
// No modo estreito ele leva também o Voltar ao fluxo, no topo.
import { useEffect } from 'react'
import { Xis, Volta, Sol } from './icones.jsx'
import { Interruptor } from '../ds/index.js'
import { useTema, definirTema } from '../estado/tema.js'
import { NOMES, CAMINHO, CONSULTAS } from './telas.js'
import { atualizadoEm } from './versao.js'

function Linha({ id, aberta, aoIr }) {
  return (
    <button type="button" className={`painel-linha ${aberta ? 'painel-linha-aberta' : ''}`} aria-current={aberta ? 'page' : undefined} onClick={() => aoIr(id)}>
      <span className="painel-codigo">{id}</span><span className="painel-nome">{NOMES[id]}</span>
    </button>
  )
}

export function Painel({ aberto, tela, aoIr, aoFechar, estreito, numEstado, aoVoltar }) {
  const { tema } = useTema()
  useEffect(() => {
    if (!aberto) return
    // o Esc do painel vem antes do Esc do app (a captura) e para aí: com o painel e uma folha
    // abertos ao mesmo tempo, um Esc fecha só o painel, que está por cima
    const esc = (e) => { if (e.key === 'Escape') { e.stopImmediatePropagation(); aoFechar() } }
    window.addEventListener('keydown', esc, true); return () => window.removeEventListener('keydown', esc, true)
  }, [aberto, aoFechar])
  return (
    <>
      <div className={`painel-fora ${aberto ? 'painel-fora-aberto' : ''}`} onClick={aoFechar} aria-hidden="true" />
      <nav className={`painel ${aberto ? 'painel-aberto' : ''}`} aria-label="Telas do protótipo" aria-hidden={!aberto} inert={aberto ? undefined : ''}>
        <div className="painel-cabeca">
          <span className="painel-titulo"><span className="palco-rotulo">PROTÓTIPO</span><span className="painel-telas">Telas</span></span>
          <button type="button" className="painel-x" aria-label="Fechar" onClick={aoFechar}><Xis className="palco-icone-16" /></button>
        </div>
        {/* a linha de baixo do cabeçalho é o topo do corpo: o cabeçalho tem os seus 68 por dentro, como o quadro desenha */}
        <div className="painel-corpo">
          {estreito && numEstado && (
            <button type="button" className="coluna-voltar painel-voltar" onClick={aoVoltar}><Volta className="palco-icone-14" />Voltar ao fluxo</button>
          )}
          <div className="painel-lista">
            <div className="painel-parte">O CAMINHO</div>
            {CAMINHO.map((id) => <Linha key={id} id={id} aberta={id === tela} aoIr={aoIr} />)}
            <div className="painel-parte">AS CONSULTAS</div>
            {CONSULTAS.map((id) => <Linha key={id} id={id} aberta={id === tela} aoIr={aoIr} />)}
          </div>
        </div>
        <div className="painel-pe">
          <Interruptor solto className="painel-modo-claro" rotulo="Modo claro" ligado={tema === 'claro'}
            icone={<Sol className="palco-icone-16 painel-sol" />}
            aoTrocar={(l) => definirTema(l ? 'claro' : 'escuro')} />
          <span className="painel-etiqueta">Atualizado em {atualizadoEm()}</span>
        </div>
      </nav>
    </>
  )
}
