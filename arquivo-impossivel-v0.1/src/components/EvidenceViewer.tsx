import type { Evidence, Person } from '../cases/types'
import { CctvStill } from './CctvStill'

function DataTable({ rows }: { rows: Array<Record<string, string>> }) {
  const headers = Object.keys(rows[0] ?? {})
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>{headers.map((header) => <td key={header}>{row[header]}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function EvidenceViewer({ evidence, people }: { evidence?: Evidence; people: Person[] }) {
  if (!evidence) {
    return <div className="empty-state"><span>ARQUIVO</span><p>Selecione uma evidência para abrir.</p></div>
  }

  const person = evidence.personId ? people.find((item) => item.id === evidence.personId) : undefined

  return (
    <article className={`evidence-sheet evidence-${evidence.kind}`}>
      <header className="evidence-header">
        <div>
          <span className="eyebrow">{evidence.eyebrow}</span>
          <h2>{evidence.title}</h2>
          {evidence.subtitle && <p>{evidence.subtitle}</p>}
        </div>
        <span className="evidence-mark">AI/{evidence.id.toUpperCase().slice(0, 8)}</span>
      </header>

      {person && (
        <div className="statement-person">
          <div className="avatar">{person.initials}</div>
          <div><strong>{person.name}</strong><span>{person.role}</span></div>
        </div>
      )}

      {evidence.kind === 'cctv' && <CctvStill />}
      {evidence.quote && <blockquote>“{evidence.quote}”</blockquote>}
      {evidence.rows && <DataTable rows={evidence.rows} />}
      {evidence.body?.map((paragraph) => <p className="document-copy" key={paragraph}>{paragraph}</p>)}

      {evidence.id === 'access-log' && (
        <div className="observation">
          <span>OBSERVAÇÃO</span>
          <p>A identificação do crachá registra quem deveria possuir a credencial — não quem fisicamente a utilizou.</p>
        </div>
      )}
    </article>
  )
}
