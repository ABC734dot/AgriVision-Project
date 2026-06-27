// import { outcomeMeta } from '../data/history.js'
import './HistoryEntry.css'

// Static display labels/colors for each outcome value the backend can
// return for a history entry (field_history.outcome ENUM in MySQL).
const outcomeMeta = {
  matched: { label: 'Matched prediction', tone: 'neutral' },
  outperformed: { label: 'Outperformed prediction', tone: 'good' },
  underperformed: { label: 'Underperformed prediction', tone: 'warn' },
}

export default function HistoryEntry({ entry, isLast }) {

  const meta = outcomeMeta[entry.outcome] || { label: 'Outcome pending', tone: 'neutral' }

  return (
    <div className="history-entry">
      <div className="history-rail">
        <span className="history-dot" data-tone={meta.tone} />
        {!isLast && <span className="history-line" />}
      </div>

      <div className="history-card">
        <div className="history-card-head">
          <div>
            <span className="history-season">{entry.season}</span>
            <span className="history-dates">{entry.dateRange}</span>
          </div>
          <span className={`outcome-badge tone-${meta.tone}`}>{meta.label}</span>
        </div>

        <div className="history-compare">
          <div className="compare-block">
            <span className="compare-label">Recommended</span>
            <div className="compare-crop">
              <span className="crop-emoji">{entry.recommendedIcon}</span>
              {entry.recommended}
            </div>
            <span className="compare-sub">{entry.matchScore}% match score</span>
          </div>

          <div className="compare-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>

          <div className="compare-block">
            <span className="compare-label">Actually planted</span>
            <div className="compare-crop">{entry.planted}</div>
            <span className="compare-sub">{entry.yieldNote}</span>
          </div>
        </div>

        <p className="history-note">{entry.note}</p>
      </div>
    </div>
  )
}