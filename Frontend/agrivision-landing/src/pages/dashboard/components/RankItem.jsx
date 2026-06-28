import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './RankItem.css'

export default function RankItem({ crop, index, animate }) {
  const { t } = useTranslation()

  const [expanded, setExpanded] = useState(false)
  const isTop = index === 0

  return (
    <div className={`rank-item ${isTop ? 'top' : ''} ${expanded ? 'expanded' : ''}`}>
      <div className="rank-item-head" onClick={() => setExpanded((v) => !v)}>
        <span className="rank-num">{index + 1}</span>
        <span className="rank-crop-icon">{crop.icon}</span>
        <div className="rank-main">
          <div className="crop-name">{crop.name}</div>
          <div className="crop-tag">{crop.tag}</div>
        </div>
        <div className="rank-bar-wrap">
          <div className="rank-bar-track">
            <div
              className="rank-bar-fill"
              style={{ width: animate ? `${crop.score}%` : '0%' }}
            />
          </div>
          <div className="rank-bar-label">{crop.score}{t('recommendation.matchSuffix')}</div>
        </div>
        <div className="chev-toggle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="rank-detail">
        <div className="rank-detail-inner">
          <div className="reason-card">
            <div className="r-label">{t('recommendation.soilFit')}</div>
            <div className="r-value good">{crop.soil}</div>
          </div>
          <div className="reason-card">
            <div className="r-label">{t('recommendation.climateFit')}</div>
            <div className="r-value good">{crop.climate}</div>
          </div>
          <div className="reason-card">
            <div className="r-label">{t('recommendation.marketSignal')}</div>
            <div className="r-value">{crop.market}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
