import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import StoryCard from './StoryCard.jsx'
import './Rail.css'

export default function Rail({ fieldNumber, title, stories }) {

  const { t } = useTranslation()

  const railRef = useRef(null)

  const scrollBy = (amount) => {
    railRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="row-block">
      <div className="row-block-head">
        <h3>
          <span className="field-num">{t('fieldRows.rowLabel')} {fieldNumber}</span>
          {title}
        </h3>
        <div className="row-nav">
          <button aria-label="Scroll left" onClick={() => scrollBy(-620)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button aria-label="Scroll right" onClick={() => scrollBy(620)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="rail" ref={railRef}>
        {stories.map((story, i) => (
          <StoryCard story={story} key={i} />
        ))}
      </div>
    </div>
  )
}
