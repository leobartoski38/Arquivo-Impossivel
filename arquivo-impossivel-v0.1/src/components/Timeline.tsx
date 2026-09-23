import type { TimelineEvent } from '../cases/types'

export function Timeline({ events, investigatedLines, contradictionFound }: {
  events: TimelineEvent[]
  investigatedLines: string[]
  contradictionFound: boolean
}) {
  const visible = events.filter((event) => !event.hiddenUntil || investigatedLines.includes(event.hiddenUntil))
  return (
    <section className={`timeline-panel ${contradictionFound ? 'timeline-alert' : ''}`}>
      <div className="section-heading">
        <span>LINHA DO TEMPO</span>
        {contradictionFound && <strong>CONTRADIÇÃO ATIVA</strong>}
      </div>
      <div className="timeline-track">
        {visible.map((event) => (
          <div className={`timeline-event tone-${event.tone ?? 'neutral'}`} key={event.id}>
            <time>{event.time}</time>
            <i />
            <strong>{event.label}</strong>
            <small>{event.detail}</small>
          </div>
        ))}
      </div>
    </section>
  )
}
