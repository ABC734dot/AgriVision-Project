import { pool } from '../config/db.js'
import { getFieldReadings } from '../services/soilDataService.js'
import { getCropRecommendation } from '../services/geminiService.js'
async function getOwnedField(fieldId, userId) {
  const [rows] = await pool.query('SELECT * FROM fields WHERE id = ? AND user_id = ?', [fieldId, userId])
  return rows[0] || null
}

export async function fetchLiveReadings(req, res) {
  const { fieldId } = req.params
  const { lat, lng } = req.query

  if (!lat || !lng) return res.status(400).json({ error: 'lat and lng query params are required.' })

  const field = await getOwnedField(fieldId, req.userId)
  if (!field) return res.status(404).json({ error: 'Field not found.' })

  try {
    const readings = await getFieldReadings(Number(lat), Number(lng))

    await pool.query(
      `UPDATE fields
       SET latitude = ?, longitude = ?, last_moisture = ?, last_ph = ?,
           last_nitrogen = ?, last_rainfall_label = ?, last_synced_at = NOW()
       WHERE id = ?`,
      [lat, lng, readings.moisture, readings.ph, readings.nitrogen, readings.rainfallLabel, fieldId]
    )

    return res.json({ readings })
  } catch (err) {
    console.error('Fetching live readings failed:', err)
    return res.status(502).json({ error: 'Could not fetch live soil/weather data.' })
  }
}

export async function runRecommendation(req, res) {
  const { fieldId } = req.params
  const { location, moisture, ph, nitrogen, rainfallLabel } = req.body

  const field = await getOwnedField(fieldId, req.userId)
  if (!field) return res.status(404).json({ error: 'Field not found.' })

  try {
    const recommendation = await getCropRecommendation({ location, moisture, ph, nitrogen, rainfallLabel })

    await pool.query(
      `INSERT INTO recommendation_runs
         (field_id, moisture, ph, nitrogen, rainfall_label, model_confidence, result_json)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        fieldId,
        moisture ?? null,
        ph ?? null,
        nitrogen ?? null,
        rainfallLabel ?? null,
        recommendation.modelConfidence,
        JSON.stringify(recommendation),
      ]
    )

    await pool.query(
      `UPDATE fields
       SET location_label = COALESCE(?, location_label),
           last_moisture = ?,
           last_ph = ?,
           last_nitrogen = ?,
           last_rainfall_label = ?,
           last_synced_at = NOW()
       WHERE id = ?`,
      [location || null, moisture ?? null, ph ?? null, nitrogen ?? null, rainfallLabel ?? null, fieldId]
    )

    return res.json({ recommendation })
  } catch (err) {
    console.error('Recommendation run failed:', err)
    return res.status(502).json({ error: 'Could not generate a recommendation right now.' })
  }
}

export async function addHistoryEntry(req, res) {
  const { fieldId } = req.params
  const {
    seasonLabel, dateRange = null, recommendedCrop = null, recommendedIcon = null,
    matchScore = null, plantedCrop = null, outcome = null, yieldNote = null, note = null,
  } = req.body

  if (!seasonLabel) return res.status(400).json({ error: 'seasonLabel is required.' })

  const field = await getOwnedField(fieldId, req.userId)
  if (!field) return res.status(404).json({ error: 'Field not found.' })

  try {
    const [result] = await pool.query(
      `INSERT INTO field_history
         (field_id, season_label, date_range, recommended_crop, recommended_icon,
          match_score, planted_crop, outcome, yield_note, note)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fieldId, seasonLabel, dateRange, recommendedCrop, recommendedIcon,
       matchScore, plantedCrop, outcome, yieldNote, note]
    )
    return res.status(201).json({ id: result.insertId })
  } catch (err) {
    console.error('Adding history entry failed:', err)
    return res.status(500).json({ error: 'Could not save history entry.' })
  }
}

export async function listHistory(req, res) {
  const { fieldId } = req.params

  const field = await getOwnedField(fieldId, req.userId)
  if (!field) return res.status(404).json({ error: 'Field not found.' })

  const [rows] = await pool.query(
    `SELECT id, season_label AS season, date_range AS dateRange,
            recommended_crop AS recommended, recommended_icon AS recommendedIcon,
            CAST(match_score AS DOUBLE) AS matchScore, planted_crop AS planted, outcome,
            yield_note AS yieldNote, note
     FROM field_history WHERE field_id = ? ORDER BY id DESC`,
    [fieldId]
  )

  return res.json({ history: rows })
}