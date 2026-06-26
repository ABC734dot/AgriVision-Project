import './InsightStrip.css'

export default function InsightStrip({ hasRun, topCrop }) {
  return (
    <div className="insight-strip">
      <div className="insight-card">
        <div className="i-label">Model confidence</div>
        <div className="i-value crop">{hasRun ? '94%' : '—'}</div>
        <div className="i-delta">Based on 4,800 similar fields</div>
      </div>
      <div className="insight-card">
        <div className="i-label">Top match</div>
        <div className="i-value">{hasRun ? topCrop.name : '—'}</div>
        <div className="i-delta">
          {hasRun ? `${topCrop.score}% predicted match score` : 'Run a recommendation to see results'}
        </div>
      </div>
      <div className="insight-card">
        <div className="i-label">Est. yield uplift</div>
        <div className="i-value amber">{hasRun ? '+18%' : '—'}</div>
        <div className="i-delta">Vs. last season&apos;s crop choice</div>
      </div>
      <div className="insight-card">
        <div className="i-label">Next sensor sync</div>
        <div className="i-value">14m</div>
        <div className="i-delta">Soil probe · Field 04</div>
      </div>
    </div>
  )
}
