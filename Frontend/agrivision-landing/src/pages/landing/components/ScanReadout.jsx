import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './ScanReadout.css'

const CROPS = ['Maize', 'Wheat', 'Soybean', 'Sugarcane', 'Millet', 'Cotton']

function randomReading() {
  return {
    moisture: (32 + Math.random() * 14).toFixed(0) + '%',
    nitrogen: (50 + Math.random() * 25).toFixed(0) + ' ppm',
    ph: (5.8 + Math.random() * 1.2).toFixed(1),
    crop: CROPS[Math.floor(Math.random() * CROPS.length)],
  }
}

export default function ScanReadout() {

  const { t } = useTranslation()
  const [reading, setReading] = useState(randomReading)

  useEffect(() => {
    const interval = setInterval(() => setReading(randomReading()), 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="scan-readout">
      <span className="scan-title">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="#E8A33D">
          <circle cx="12" cy="12" r="10" />
        </svg>
        {t('scanReadout.title')}
      </span>
      <div className="scan-row"><span>{t('scanReadout.moisture')}</span><span>{reading.moisture}</span></div>
      <div className="scan-row"><span>{t('scanReadout.nitrogen')}</span><span>{reading.nitrogen}</span></div>
      <div className="scan-row"><span>{t('scanReadout.ph')}</span><span>{reading.ph}</span></div>
      <div className="scan-row"><span>{t('scanReadout.bestMatch')}</span><span>{reading.crop}</span></div>
    </div>
  )
}
