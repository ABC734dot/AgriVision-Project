import { useTranslation } from 'react-i18next'
import './HistorySummary.css'

export default function HistorySummary({ entries }) {
  const { t } = useTranslation()

  const total = entries.length
  const matched = entries.filter((e) => e.outcome !== 'underperformed').length
  const accuracy = total > 0 ? Math.round((matched / total) * 100) : 0

  const bestEntry = entries.reduce((best, e) => {
    if (e.outcome === 'outperformed' && (!best || (e.matchScore ?? 0) > (best.matchScore ?? 0))) {
      return e
    }
    return best
  }, null)
  const bestOutcomeLabel = bestEntry?.season || entries[0]?.season || '—'

  return (
    <div className="history-summary">
      <div className="summary-card">
        <div className="s-label">{t('history.seasonsTracked')}</div>
        <div className="s-value">{total}</div>
      </div>
      <div className="summary-card">
        <div className="s-label">{t('history.accuracy')}</div>
        <div className="s-value crop">{accuracy}%</div>
      </div>
      <div className="summary-card">
        <div className="s-label">{t('history.bestOutcome')}</div>
        <div className="s-value amber">{bestOutcomeLabel}</div>
      </div>
    </div>
  )
}