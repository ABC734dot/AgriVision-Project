import { useTranslation } from 'react-i18next'
import RankItem from './RankItem.jsx'
import './RecommendationPanel.css'

export default function RecommendationPanel({ results, hasRun, onLogSeasonClick }) {
  const { t } = useTranslation()

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>{t('recommendation.title')}</h2>
        <span className="step-tag">{t('recommendation.step')}</span>
      </div>

      {!hasRun && (
        <div className="result-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 2v6M12 16v6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2" />
          </svg>
          <p>{t('recommendation.emptyState')}</p>
        </div>
      )}

      {hasRun && (
        <>
          <div className="rank-list show">
            {results.map((crop, i) => (
              <RankItem crop={crop} index={i} animate={hasRun} key={crop.name} />
            ))}
          </div>

          <button className="log-season-trigger" onClick={onLogSeasonClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Log this season's outcome
          </button>
        </>
      )}
    </div>
  )
}