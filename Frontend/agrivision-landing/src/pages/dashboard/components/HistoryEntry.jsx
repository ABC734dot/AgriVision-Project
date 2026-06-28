// import { outcomeMeta } from '../data/history.js'
import { useTranslation } from 'react-i18next'
import './HistoryEntry.css'

export default function HistoryEntry({ entry, isLast }) {

  const { t } = useTranslation()

// Static display labels/colors for each outcome value the backend can
// return for a history entry (field_history.outcome ENUM in MySQL).
const outcomeMeta = {
    matched: { label: t('history.outcomeMatched'), tone: 'neutral' },
    outperformed: { label: t('history.outcomeOutperformed'), tone: 'good' },
    underperformed: { label: t('history.outcomeUnderperformed'), tone: 'warn' },
  }

  const meta = outcomeMeta[entry.outcome] || { label: t('history.outcomeMatched'), tone: 'neutral' }

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
            <span className="compare-label">{t('history.recommended')}</span>
            <div className="compare-crop">
              <span className="crop-emoji">{entry.recommendedIcon}</span>
              {entry.recommended}
            </div>
            <span className="compare-sub">{entry.matchScore}{t('history.matchScoreSuffix')}</span>
          </div>

          <div className="compare-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>

          <div className="compare-block">
            <span className="compare-label">{t('history.actuallyPlanted')}</span>
            <div className="compare-crop">{entry.planted}</div>
            <span className="compare-sub">{entry.yieldNote}</span>
          </div>
        </div>

        <p className="history-note">{entry.note}</p>
      </div>
    </div>
  )
}