import { useMemo, useState } from 'react'
import { case000 } from './cases/case000'
import type { Person } from './cases/types'
import { useCaseProgress } from './engine/useCaseProgress'
import { EvidenceViewer } from './components/EvidenceViewer'
import { InvestigationPanel } from './components/InvestigationPanel'
import { Timeline } from './components/Timeline'

type MobileTab = 'arquivo' | 'pessoas' | 'tempo'

function Opening({ onOpen }: { onOpen: () => void }) {
  return (
    <main className="opening-shell">
      <div className="opening-grid" />
      <section className="opening-card">
        <div className="brand-lockup"><span className="brand-symbol">AI</span><span>ARQUIVO IMPOSSÍVEL</span></div>
        <span className="eyebrow">CASO {case000.number} // ACESSO LIBERADO</span>
        <h1>{case000.title}</h1>
        <p className="opening-summary">{case000.summary}</p>
        <div className="case-facts">
          <div><span>VALOR</span><strong>{case000.amount}</strong></div>
          <div><span>DESCOBERTO</span><strong>{case000.incidentTime}</strong></div>
          <div><span>PESSOAS</span><strong>{case000.people.length}</strong></div>
        </div>
        <button className="primary-action" onClick={onOpen}>Abrir arquivo <span>→</span></button>
        <p className="opening-note">Leia os registros, cruze horários e escolha o que investigar. O sistema não informa quem merece sua suspeita.</p>
      </section>
    </main>
  )
}

function PeoplePanel({ people, active, onSelect }: { people: Person[]; active?: string; onSelect: (id: string) => void }) {
  return (
    <div className="people-list">
      {people.map((person) => (
        <button key={person.id} className={active === person.id ? 'person-row active' : 'person-row'} onClick={() => onSelect(person.id)}>
          <div className="avatar compact">{person.initials}</div>
          <div><strong>{person.name}</strong><span>{person.role}</span></div>
        </button>
      ))}
    </div>
  )
}

function App() {
  const [started, setStarted] = useState(false)
  const [mobileTab, setMobileTab] = useState<MobileTab>('arquivo')
  const [selectedPerson, setSelectedPerson] = useState<string>()
  const progress = useCaseProgress(case000)

  const selectedEvidence = useMemo(
    () => progress.visibleEvidence.find((item) => item.id === progress.selectedEvidenceId),
    [progress.visibleEvidence, progress.selectedEvidenceId],
  )
  const selectedPersonData = case000.people.find((person) => person.id === selectedPerson)

  if (!started) return <Opening onOpen={() => setStarted(true)} />

  return (
    <main className="workspace">
      <header className="topbar">
        <div className="brand-lockup"><span className="brand-symbol">AI</span><span>ARQUIVO IMPOSSÍVEL</span></div>
        <div className="case-id"><span>CASO {case000.number}</span><strong>{case000.title}</strong></div>
        <span className="status-dot"><i /> investigação ativa</span>
      </header>

      <nav className="mobile-tabs" aria-label="Navegação do caso">
        {(['arquivo', 'pessoas', 'tempo'] as MobileTab[]).map((tab) => (
          <button key={tab} className={mobileTab === tab ? 'active' : ''} onClick={() => setMobileTab(tab)}>{tab}</button>
        ))}
      </nav>

      <div className="workspace-grid">
        <aside className={`side-panel ${mobileTab === 'pessoas' ? 'mobile-visible' : ''}`}>
          <div className="side-section">
            <span className="side-label">PESSOAS</span>
            <PeoplePanel people={case000.people} active={selectedPerson} onSelect={(id) => { setSelectedPerson(id); setMobileTab('pessoas') }} />
          </div>
          <div className="side-section evidence-nav">
            <span className="side-label">ARQUIVOS</span>
            {progress.visibleEvidence.map((item) => (
              <button key={item.id} className={item.id === progress.selectedEvidenceId ? 'evidence-link active' : 'evidence-link'} onClick={() => { progress.openEvidence(item.id); setSelectedPerson(undefined); setMobileTab('arquivo') }}>
                <i>{item.kind === 'cctv' ? '◉' : item.kind === 'access-log' ? '⌁' : item.kind === 'statement' ? '“' : '□'}</i>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className={`main-stage ${mobileTab === 'arquivo' ? 'mobile-visible' : ''}`}>
          <div className="mobile-evidence-list" aria-label="Arquivos disponíveis">
            {progress.visibleEvidence.map((item) => (
              <button key={item.id} className={item.id === progress.selectedEvidenceId && !selectedPerson ? 'active' : ''} onClick={() => { progress.openEvidence(item.id); setSelectedPerson(undefined) }}>
                {item.kind === 'cctv' ? '◉' : item.kind === 'access-log' ? '⌁' : item.kind === 'statement' ? '“' : '□'} {item.title}
              </button>
            ))}
          </div>
          <div className="stage-meta"><span>{case000.kicker}</span><span>{progress.visibleEvidence.length.toString().padStart(2, '0')} arquivos disponíveis</span></div>
          {selectedPersonData ? (
            <article className="person-profile">
              <div className="avatar large">{selectedPersonData.initials}</div>
              <span className="eyebrow">PESSOA DE INTERESSE</span>
              <h2>{selectedPersonData.name}</h2>
              <strong>{selectedPersonData.role}</strong>
              <p>{selectedPersonData.summary}</p>
              {selectedPersonData.id === 'marta' && (
                <button className="text-action" onClick={() => { progress.openEvidence('marta-statement'); setSelectedPerson(undefined); setMobileTab('arquivo') }}>Abrir depoimento inicial →</button>
              )}
            </article>
          ) : (
            <EvidenceViewer evidence={selectedEvidence} people={case000.people} />
          )}
        </section>

        <aside className={`right-panel ${mobileTab === 'tempo' ? 'mobile-visible' : ''}`}>
          <Timeline events={case000.timeline} investigatedLines={progress.investigatedLines} contradictionFound={progress.contradictionFound} />
        </aside>
      </div>

      <InvestigationPanel lines={case000.investigationLines} investigated={progress.investigatedLines} onInvestigate={(line) => { progress.investigate(line); setSelectedPerson(undefined); setMobileTab('arquivo') }} />

      {progress.activeResult && (
        <div className="result-toast" role="status">
          <div><span>{progress.activeResult.decisive ? 'NOVA EVIDÊNCIA' : 'RESULTADO DA CONSULTA'}</span><strong>{progress.activeResult.resultTitle}</strong><p>{progress.activeResult.resultBody}</p></div>
          <button aria-label="Fechar" onClick={progress.clearResult}>×</button>
        </div>
      )}

      {progress.contradictionFound && (
        <section className="slice-ending">
          <span className="eyebrow">CONTRADIÇÃO CONFIRMADA</span>
          <div className="contradiction-times">
            <div><time>18:35</time><span>Marta deixa o prédio</span></div>
            <i>12 min</i>
            <div><time>18:47</time><span>O crachá de Marta abre o financeiro</span></div>
          </div>
          <h2>Então quem estava com o crachá?</h2>
          <p>Fim do vertical slice v0.1 — A Contradição.</p>
        </section>
      )}
    </main>
  )
}

export default App
