export type EvidenceKind = 'document' | 'access-log' | 'statement' | 'cctv'

export interface Person {
  id: string
  name: string
  role: string
  summary: string
  initials: string
}

export interface TimelineEvent {
  id: string
  time: string
  label: string
  detail: string
  tone?: 'neutral' | 'question' | 'conflict'
  hiddenUntil?: string
}

export interface Evidence {
  id: string
  kind: EvidenceKind
  eyebrow: string
  title: string
  subtitle?: string
  body?: string[]
  rows?: Array<Record<string, string>>
  quote?: string
  personId?: string
  locked?: boolean
}

export interface InvestigationLine {
  id: string
  title: string
  description: string
  resultTitle: string
  resultBody: string
  decisive?: boolean
}

export interface CaseDefinition {
  id: string
  number: string
  title: string
  kicker: string
  summary: string
  incidentTime: string
  amount: string
  people: Person[]
  evidence: Evidence[]
  initialEvidenceIds: string[]
  timeline: TimelineEvent[]
  investigationLines: InvestigationLine[]
}
