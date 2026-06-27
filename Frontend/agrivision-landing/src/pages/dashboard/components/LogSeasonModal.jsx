import { useEffect, useState } from 'react'
import './LogSeasonModal.css'

const OUTCOME_OPTIONS = [
  { value: 'matched', label: 'Matched the prediction' },
  { value: 'outperformed', label: 'Outperformed the prediction' },
  { value: 'underperformed', label: 'Underperformed the prediction' },
]

/**
 * topCrop: the #1 ranked crop from the current recommendation, used to
 * pre-fill "recommended" + "planted" with a sensible default the farmer
 * can override if they planted something else.
 */
export default function LogSeasonModal({ isOpen, onClose, onSubmit, topCrop, submitting, error }) {
  const [seasonLabel, setSeasonLabel] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [plantedCrop, setPlantedCrop] = useState('')
  const [outcome, setOutcome] = useState('matched')
  const [yieldNote, setYieldNote] = useState('')
  const [note, setNote] = useState('')

  // Re-seed the form defaults every time the modal opens, using
  // whatever the current top recommendation is at that moment.
  useEffect(() => {
    if (isOpen) {
      setSeasonLabel('')
      setDateRange('')
      setPlantedCrop(topCrop?.name || '')
      setOutcome('matched')
      setYieldNote('')
      setNote('')
    }
  }, [isOpen, topCrop])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      seasonLabel,
      dateRange,
      recommendedCrop: topCrop?.name || null,
      recommendedIcon: topCrop?.icon || null,
      matchScore: topCrop?.score ?? null,
      plantedCrop,
      outcome,
      yieldNote,
      note,
    })
  }

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="log-season-card">
        <button className="log-season-close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        <span className="log-season-eyebrow">Season record</span>
        <h2>Log this season's outcome</h2>
        <p className="sub">
          Capture what you actually planted and how it turned out, so your
          field history stays accurate.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-row-split">
            <div className="form-group">
              <label htmlFor="seasonLabel">Season</label>
              <input
                type="text"
                id="seasonLabel"
                placeholder="e.g. Rabi 2026"
                value={seasonLabel}
                onChange={(e) => setSeasonLabel(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateRange">Date range</label>
              <input
                type="text"
                id="dateRange"
                placeholder="e.g. Nov 2025 – Mar 2026"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              />
            </div>
          </div>

          {topCrop && (
            <div className="recommended-note">
              AgriVision recommended <strong>{topCrop.name}</strong> ({topCrop.score}% match) for this run.
            </div>
          )}

          <div className="form-group">
            <label htmlFor="plantedCrop">What did you actually plant?</label>
            <input
              type="text"
              id="plantedCrop"
              placeholder="e.g. Wheat"
              value={plantedCrop}
              onChange={(e) => setPlantedCrop(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="outcome">How did it turn out?</label>
            <select id="outcome" value={outcome} onChange={(e) => setOutcome(e.target.value)}>
              {OUTCOME_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="yieldNote">Yield note</label>
            <input
              type="text"
              id="yieldNote"
              placeholder="e.g. Yield up 18% vs. last season"
              value={yieldNote}
              onChange={(e) => setYieldNote(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="note">Notes</label>
            <textarea
              id="note"
              placeholder="Anything worth remembering for next season..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>

          {error && <div className="log-season-error">{error}</div>}

          <button type="submit" className="log-season-submit" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save to field history'}
          </button>
        </form>
      </div>
    </div>
  )
}