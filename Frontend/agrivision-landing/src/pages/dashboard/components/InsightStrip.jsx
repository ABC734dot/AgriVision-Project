import { useTranslation } from 'react-i18next'
import './InsightStrip.css'

export default function InsightStrip({ hasRun, topCrop, confidence, yieldUplift }) {
  const { t } = useTranslation()

  return (
    <div className="insight-strip">
      <div className="insight-card">
        <div className="i-label">{t('insightStrip.confidenceLabel')}</div>
        <div className="i-value crop">{hasRun ? `${confidence}%` : '—'}</div>
        <div className="i-delta">{t('insightStrip.confidenceDelta')}</div>
      </div>
      <div className="insight-card">
        <div className="i-label">{t('insightStrip.topMatchLabel')}</div>
        <div className="i-value">{hasRun ? topCrop.name : '—'}</div>
        <div className="i-delta">
          {hasRun ? `${topCrop.score}${t('recommendation.matchSuffix')}` : t('insightStrip.topMatchEmpty')}
        </div>
      </div>
      <div className="insight-card">
        <div className="i-label">{t('insightStrip.yieldLabel')}</div>
        <div className="i-value amber">{hasRun ? `+${yieldUplift}%` : '—'}</div>
        <div className="i-delta">{t('insightStrip.yieldDelta')}</div>
      </div>
      <div className="insight-card">
        <div className="i-label">{t('insightStrip.syncLabel')}</div>
        <div className="i-value">14m</div>
        <div className="i-delta">{t('insightStrip.syncDelta')}</div>
      </div>
    </div>
  )
}