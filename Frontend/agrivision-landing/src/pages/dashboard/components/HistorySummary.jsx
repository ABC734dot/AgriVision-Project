import './HistorySummary.css'

export default function HistorySummary({ entries }) {
  const total = entries.length
  const matched = entries.filter((e) => e.outcome !== 'underperformed').length
  const accuracy = Math.round((matched / total) * 100)

  return (
    <div className="history-summary">
      <div className="summary-card">
        <div className="s-label">Seasons tracked</div>
        <div className="s-value">{total}</div>
      </div>
      <div className="summary-card">
        <div className="s-label">Recommendation accuracy</div>
        <div className="s-value crop">{accuracy}%</div>
      </div>
      <div className="summary-card">
        <div className="s-label">Best outcome</div>
        <div className="s-value amber">Rabi 2025</div>
      </div>
    </div>
  )
}