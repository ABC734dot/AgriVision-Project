import { useTranslation } from 'react-i18next'
import './AboutSection.css'

export default function AboutSection() {
  const { t } = useTranslation()

  const stats = [
    { value: '1000+', label: t('about.stat1Label') },
    { value: '85%', label: t('about.stat2Label') },
    { value: '12', label: t('about.stat3Label') },
  ]

  const steps = [
    { num: '01', title: t('about.step1Title'), body: t('about.step1Body') },
    { num: '02', title: t('about.step2Title'), body: t('about.step2Body') },
    { num: '03', title: t('about.step3Title'), body: t('about.step3Body') },
  ]

  return (
    <section className="about-section" id="about">
      <div className="about-intro">
        <span className="section-label">{t('about.sectionLabel')}</span>
        <h2>
          {t('about.headingPrefix')} <em>{t('about.headingEm')}</em>
        </h2>
        <p className="about-mission">{t('about.mission')}</p>
      </div>

      <div className="about-stats">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="about-steps">
        {steps.map((step) => (
          <div className="step-card" key={step.num}>
            <span className="step-num">{step.num}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}