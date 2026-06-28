import { useTranslation } from 'react-i18next'
import Rail from './Rail.jsx'
import { featuredStories, regionStories } from '../data/stories.js'
import './FieldRows.css'

export default function FieldRows() {
  const { t } = useTranslation()

  return (
    <section className="field-rows" id="stories">
      <div className="field-rows-intro">
        <span className="section-label">{t('fieldRows.sectionLabel')}</span>
        <h2>{t('fieldRows.heading')}</h2>
      </div>

      <Rail fieldNumber="01" title={t('fieldRows.row1Title')} stories={featuredStories} />
      <Rail fieldNumber="02" title={t('fieldRows.row2Title')} stories={regionStories} />
    </section>
  )
}