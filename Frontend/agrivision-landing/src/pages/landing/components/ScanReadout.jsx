import { useEffect, useState } from 'react'
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
        Soil scan · Field 04
      </span>
      <div className="scan-row"><span>Moisture</span><span>{reading.moisture}</span></div>
      <div className="scan-row"><span>Nitrogen (N)</span><span>{reading.nitrogen}</span></div>
      <div className="scan-row"><span>pH level</span><span>{reading.ph}</span></div>
      <div className="scan-row"><span>Best match</span><span>{reading.crop}</span></div>
    </div>
  )
}
