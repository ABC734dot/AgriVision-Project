import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import HistorySummary from './components/HistorySummary.jsx'
import HistoryEntry from './components/HistoryEntry.jsx'
import { fieldHistory } from './data/history.js'
import './DashboardPage.css'
import './FieldHistoryPage.css'

export default function FieldHistoryPage() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Topbar
          name="Tanish"
          eyebrow="Field 04 · North Plot"
          title="Field history"
          subtitle="Every season this field has run through AgriVision, and how it turned out."
        />

        <HistorySummary entries={fieldHistory} />

        <div className="history-timeline">
          {fieldHistory.map((entry, i) => (
            <HistoryEntry
              entry={entry}
              key={entry.id}
              isLast={i === fieldHistory.length - 1}
            />
          ))}
        </div>
      </main>
    </div>
  )
}