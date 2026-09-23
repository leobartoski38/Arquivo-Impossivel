import type { InvestigationLine } from '../cases/types'

export function InvestigationPanel({ lines, investigated, onInvestigate }: {
  lines: InvestigationLine[]
  investigated: string[]
  onInvestigate: (line: InvestigationLine) => void
}) {
  return (
    <section className="investigation-panel">
      <div className="section-heading"><span>LINHAS DE INVESTIGAÇÃO</span><small>Escolha o que verificar</small></div>
      <div className="investigation-grid">
        {lines.map((line) => {
          const seen = investigated.includes(line.id)
          return (
            <button className={`investigation-card ${seen ? 'seen' : ''}`} key={line.id} onClick={() => onInvestigate(line)}>
              <span className="investigation-index">{seen ? 'REVISITAR' : 'INVESTIGAR'}</span>
              <strong>{line.title}</strong>
              <p>{line.description}</p>
              <span className="arrow">↗</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
