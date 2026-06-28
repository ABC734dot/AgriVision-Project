import { useTranslation } from 'react-i18next'
import './TurnSection.css'

export default function TurnSection({ onTurnClick, onLoginClick }) {
  const { t } = useTranslation()

  return (
    <section className="turn-section" id="turnSection">
      <div className="turn-rows" />
      <div className="turn-content">
        <span className="section-label">{t('turnSection.sectionLabel')}</span>
        <h2>
          {t('turnSection.headingPrefix')} <em>{t('turnSection.headingEm')}</em> {t('turnSection.headingSuffix')}
        </h2>
        <p>{t('turnSection.body')}</p>
        <button className="turn-btn" onClick={onTurnClick}>
          {t('turnSection.cta')}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
        <p className="turn-footnote">
          {t('turnSection.footnote')}{' '}
          
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onLoginClick()
            }}
          >
            {t('turnSection.footnoteLink')}
          </a>
        </p>
      </div>
    </section>
  )
}