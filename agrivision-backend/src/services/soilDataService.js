import fetch from 'node-fetch'

const OPEN_METEO_BASE_URL =
  process.env.OPEN_METEO_BASE_URL || 'https://api.open-meteo.com/v1/forecast'
const SOILGRIDS_BASE_URL =
  process.env.SOILGRIDS_BASE_URL || 'https://rest.isric.org/soilgrids/v2.0/properties/query'

function classifyRainfall(totalMm) {
  if (totalMm == null || Number.isNaN(totalMm)) return null
  if (totalMm < 50) return 'Low (under 50mm)'
  if (totalMm <= 150) return 'Moderate (50–150mm)'
  return 'High (over 150mm)'
}

async function fetchWeatherAndMoisture(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly: 'soil_moisture_0_to_1cm',
    daily: 'precipitation_sum',
    forecast_days: '16',
    timezone: 'auto',
  })

  const res = await fetch(`${OPEN_METEO_BASE_URL}?${params.toString()}`)
  if (!res.ok) throw new Error(`Open-Meteo request failed: ${res.status}`)
  const data = await res.json()

  const moistureSeries = data?.hourly?.soil_moisture_0_to_1cm || []
  const moistureFraction = moistureSeries.find((v) => v != null) ?? null
  const moisturePercent = moistureFraction != null ? Math.round(moistureFraction * 100) : null

  const dailyPrecip = data?.daily?.precipitation_sum || []
  const sum16Day = dailyPrecip.reduce((acc, v) => acc + (v || 0), 0)
  const projected30Day = Math.round((sum16Day / 16) * 30)

  return {
    moisturePercent,
    rainfallMm30d: projected30Day,
    rainfallLabel: classifyRainfall(projected30Day),
  }
}

async function fetchSoilProperties(latitude, longitude) {
  const params = new URLSearchParams({ lon: String(longitude), lat: String(latitude) })
  params.append('property', 'phh2o')
  params.append('property', 'nitrogen')
  params.append('depth', '0-5cm')
  params.append('value', 'mean')

  const res = await fetch(`${SOILGRIDS_BASE_URL}?${params.toString()}`)
  if (!res.ok) throw new Error(`SoilGrids request failed: ${res.status}`)
  const data = await res.json()

  const layers = data?.properties?.layers || []
  const phLayer = layers.find((l) => l.name === 'phh2o')
  const nLayer = layers.find((l) => l.name === 'nitrogen')

  const phRaw = phLayer?.depths?.[0]?.values?.mean ?? null
  const nRaw = nLayer?.depths?.[0]?.values?.mean ?? null

  const ph = phRaw != null ? Number((phRaw / 10).toFixed(1)) : null
  const nitrogenPpm = nRaw != null ? Math.round(nRaw / 10) : null

  return { ph, nitrogenPpm }
}

export async function getFieldReadings(latitude, longitude) {
  const [weatherResult, soilResult] = await Promise.allSettled([
    fetchWeatherAndMoisture(latitude, longitude),
    fetchSoilProperties(latitude, longitude),
  ])

  const weather = weatherResult.status === 'fulfilled' ? weatherResult.value : {}
  const soil = soilResult.status === 'fulfilled' ? soilResult.value : {}

  if (weatherResult.status === 'rejected') console.error('Weather/moisture fetch failed:', weatherResult.reason)
  if (soilResult.status === 'rejected') console.error('SoilGrids fetch failed:', soilResult.reason)

  return {
    moisture: weather.moisturePercent ?? null,
    ph: soil.ph ?? null,
    nitrogen: soil.nitrogenPpm ?? null,
    rainfallLabel: weather.rainfallLabel ?? null,
    rainfallMm30d: weather.rainfallMm30d ?? null,
    sources: {
      moisture: 'Open-Meteo (soil_moisture_0_to_1cm, live model)',
      rainfall: 'Open-Meteo (16-day forecast, projected to 30d)',
      soilChemistry: 'ISRIC SoilGrids v2.0 (modeled, 250m resolution — not live sensor data)',
    },
  }
}