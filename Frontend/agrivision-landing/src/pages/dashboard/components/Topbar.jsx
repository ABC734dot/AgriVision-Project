import { useTranslation } from 'react-i18next'
import './Topbar.css'

export default function Topbar({ name = 'Tanish', eyebrow, title, subtitle }) {
  const { t } = useTranslation()

  return (
    <div className="topbar">
      <div>
        <span className="greeting">{eyebrow || t('topbar.greeting')}</span>
        <h1>{title || `${t('topbar.welcomeBack')} ${name}`}</h1>
        <p className="sub">{subtitle || t('topbar.subtitle')}</p>
      </div>
      <div className="season-badge">
        <span className="dot" /> {t('topbar.liveFeed')}
      </div>
    </div>
  )
}