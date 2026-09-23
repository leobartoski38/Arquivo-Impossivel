import { useMemo, useState } from 'react'
import type { CaseDefinition, InvestigationLine } from '../cases/types'

export function useCaseProgress(caseData: CaseDefinition) {
  const [openedEvidence, setOpenedEvidence] = useState<string[]>(caseData.initialEvidenceIds)
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(caseData.initialEvidenceIds[0])
  const [investigatedLines, setInvestigatedLines] = useState<string[]>([])
  const [activeResult, setActiveResult] = useState<InvestigationLine | null>(null)
  const [contradictionFound, setContradictionFound] = useState(false)

  const visibleEvidence = useMemo(
    () => caseData.evidence.filter((item) => openedEvidence.includes(item.id)),
    [caseData.evidence, openedEvidence],
  )

  function openEvidence(id: string) {
    if (openedEvidence.includes(id)) setSelectedEvidenceId(id)
  }

  function investigate(line: InvestigationLine) {
    setInvestigatedLines((current) => current.includes(line.id) ? current : [...current, line.id])
    setActiveResult(line)

    if (line.id === 'marta-exit') {
      setOpenedEvidence((current) => current.includes('cctv-marta-exit') ? current : [...current, 'cctv-marta-exit'])
      setSelectedEvidenceId('cctv-marta-exit')
      window.setTimeout(() => setContradictionFound(true), 500)
    }
  }

  return {
    visibleEvidence,
    selectedEvidenceId,
    investigatedLines,
    activeResult,
    contradictionFound,
    openEvidence,
    investigate,
    clearResult: () => setActiveResult(null),
  }
}
