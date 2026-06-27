import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import HistorySummary from './components/HistorySummary.jsx'
import HistoryEntry from './components/HistoryEntry.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import './DashboardPage.css'
import './FieldHistoryPage.css'

export default function FieldHistoryPage() {
  const { user } = useAuth()

  const activeField = user?.fields?.find((f) => f.is_active) || user?.fields?.[0] || null
  const history = activeField?.history || []

  const fieldLabel = activeField
    ? `${activeField.field_name}${activeField.location_label ? ' · ' + activeField.location_label : ''}`
    : 'No field yet'

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Topbar
          name={user?.name}
          eyebrow={fieldLabel}
          title="Field history"
          subtitle="Every season this field has run through AgriVision, and how it turned out."
        />

        {history.length === 0 ? (
          <div className="history-empty">
            No seasons recorded yet for this field. Once you log a season's
            outcome, it will show up here.
          </div>
        ) : (
          <>
            <HistorySummary entries={history} />

            <div className="history-timeline">
              {history.map((entry, i) => (
                <HistoryEntry
                  entry={entry}
                  key={entry.id}
                  isLast={i === history.length - 1}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}