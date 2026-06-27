import { useState } from 'react'
import './FieldInputPanel.css'

export default function FieldInputPanel({ onRun, isLoading, hasRun, initialValues }) {
  const [moisture, setMoisture] = useState(initialValues?.moisture ?? 38)
  const [ph, setPh] = useState(initialValues?.ph != null ? Math.round(initialValues.ph * 10) : 64)
  const [nitrogen, setNitrogen] = useState(initialValues?.nitrogen ?? 62)
  const [rainfall, setRainfall] = useState(initialValues?.rainfallLabel ?? 'Moderate (50–150mm)')
  const [location, setLocation] = useState(initialValues?.location ?? 'Ludhiana, Punjab, India')

  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState('')

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation isn\u2019t supported in this browser.')
      return
    }

    setLocating(true)
    setLocationError('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          // Reverse geocode coordinates into a readable place name.
          // Swap this endpoint for Google's Geocoding API if you have a key:
          // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_KEY`
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await res.json()
          const addr = data.address || {}
          const place = [
            addr.city || addr.town || addr.village || addr.county,
            addr.state,
            addr.country,
          ]
            .filter(Boolean)
            .join(', ')
          setLocation(place || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
        } catch {
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
        } finally {
          setLocating(false)
        }
      },
      () => {
        setLocating(false)
        setLocationError('Couldn\u2019t access your location. Check browser permissions.')
      }
    )
  }

  const handleRunClick = () => {
    onRun({ location, moisture, ph, nitrogen, rainfall })
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Your field</h2>
        <span className="step-tag">STEP 1 / 2</span>
      </div>

      <div className="auto-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5l3 2" />
        </svg>
        Soil sensor values are pulled in automatically. Adjust any reading if
        your manual test differs.
      </div>

      <div className="field-row">
        <label>Field location</label>
        <div className="location-input-wrap">
          <input
            type="text"
            className="text-input location-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State, Country"
          />
          <button
            type="button"
            className={`location-pin-btn ${locating ? 'locating' : ''}`}
            onClick={handleUseCurrentLocation}
            disabled={locating}
            aria-label="Use current location"
            title="Use current location"
          >
            {locating ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M21 12a9 9 0 11-9-9" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-7.1-7-12a7 7 0 1114 0c0 4.9-7 12-7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            )}
          </button>
        </div>
        {locationError && <div className="location-error">{locationError}</div>}
      </div>

      <div className="field-row">
        <label>
          Soil moisture <span className="unit">%</span>
        </label>
        <input
          type="range"
          min="10"
          max="80"
          value={moisture}
          onChange={(e) => setMoisture(Number(e.target.value))}
        />
        <div className="range-readout">
          <span>Dry</span>
          <span className="live">{moisture}%</span>
          <span>Saturated</span>
        </div>
      </div>

      <div className="field-row">
        <label>
          Soil pH <span className="unit">0–14</span>
        </label>
        <input
          type="range"
          min="40"
          max="90"
          value={ph}
          onChange={(e) => setPh(Number(e.target.value))}
        />
        <div className="range-readout">
          <span>Acidic</span>
          <span className="live">{(ph / 10).toFixed(1)}</span>
          <span>Alkaline</span>
        </div>
      </div>

      <div className="field-row">
        <label>
          Nitrogen (N) <span className="unit">ppm</span>
        </label>
        <input
          type="range"
          min="20"
          max="100"
          value={nitrogen}
          onChange={(e) => setNitrogen(Number(e.target.value))}
        />
        <div className="range-readout">
          <span>Low</span>
          <span className="live">{nitrogen} ppm</span>
          <span>High</span>
        </div>
      </div>

      <div className="field-row">
        <label>Rainfall forecast <span className="unit">mm, next 30d</span></label>
        <select value={rainfall} onChange={(e) => setRainfall(e.target.value)}>
          <option>Low (under 50mm)</option>
          <option>Moderate (50–150mm)</option>
          <option>High (over 150mm)</option>
        </select>
      </div>

      <button
        className={`run-btn ${isLoading ? 'loading' : ''}`}
        onClick={handleRunClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M21 12a9 9 0 11-9-9" />
            </svg>
            Reading your field…
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
            </svg>
            {hasRun ? 'Re-run recommendation' : 'Run recommendation'}
          </>
        )}
      </button>
    </div>
  )
}