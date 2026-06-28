import { useTranslation } from 'react-i18next'
import ScanReadout from './ScanReadout.jsx'
import './Hero.css'

export default function Hero({ onTurnClick, onWatchStoriesClick }) {

  const { t } = useTranslation()


  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-drone-shot-of-a-green-field-2633/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="hero-content">
        <span className="hero-eyebrow">
          <span className="dot" /> {t('hero.eyebrow')}
        </span>
        <h1>
          {t('hero.headlinePrefix')} <em>{t('hero.headlineEm')}</em> {t('hero.headlineSuffix')}
        </h1>
        <p className="lede">{t('hero.lede')}</p>

        <div className="cta-row">
          <button className="cta-primary" onClick={onTurnClick}>
            {t('hero.ctaPrimary')}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
          <div className="cta-secondary" onClick={onWatchStoriesClick}>
            <span className="play-circle">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {t('hero.ctaSecondary')}
          </div>
        </div>
      </div>

      <ScanReadout />

      <div className="scroll-cue">
        <span className="line" /> {t('hero.scrollCue')}
      </div>
    </section>
  )
}
