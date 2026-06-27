import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../config/db.js'

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

async function buildUserPayload(userId) {
  const [userRows] = await pool.query(
    `SELECT id, name, email, phone, farm_owner_title, created_at FROM users WHERE id = ?`,
    [userId]
  )
  const user = userRows[0]
  if (!user) return null

  const [fieldRows] = await pool.query(
    `SELECT id, field_name, location_label, latitude, longitude, is_active,
            last_moisture, last_ph, last_nitrogen, last_rainfall_label, last_synced_at
     FROM fields WHERE user_id = ? ORDER BY is_active DESC, id ASC`,
    [userId]
  )

  const fields = []
  for (const field of fieldRows) {
    const [historyRows] = await pool.query(
      `SELECT id, season_label, date_range, recommended_crop, recommended_icon,
              match_score, planted_crop, outcome, yield_note, note
       FROM field_history WHERE field_id = ? ORDER BY id DESC`,
      [field.id]
    )

    const [latestRunRows] = await pool.query(
      `SELECT id, moisture, ph, nitrogen, rainfall_label, model_confidence, result_json, created_at
       FROM recommendation_runs WHERE field_id = ? ORDER BY id DESC LIMIT 1`,
      [field.id]
    )

    fields.push({ ...field, history: historyRows, latestRun: latestRunRows[0] || null })
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    farmOwnerTitle: user.farm_owner_title,
    createdAt: user.created_at,
    fields,
  }
}

export async function signup(req, res) {
  const { name, email, password, phone = null, fieldName, locationLabel } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email, and password are required.' })
  }

  const conn = await pool.getConnection()
  try {
    const [existing] = await conn.query('SELECT id FROM users WHERE email = ?', [email])
    if (existing.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    await conn.beginTransaction()

    const [userResult] = await conn.query(
      `INSERT INTO users (name, email, password_hash, phone, farm_owner_title)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, passwordHash, phone, null]
    )
    const userId = userResult.insertId

    await conn.query(
      `INSERT INTO fields
         (user_id, field_name, location_label, latitude, longitude, is_active,
          last_moisture, last_ph, last_nitrogen, last_rainfall_label, last_synced_at)
       VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?)`,
      [userId, fieldName || 'Field 01', locationLabel || null, null, null, null, null, null, null, null]
    )

    await conn.commit()

    const token = signToken(userId)
    const payload = await buildUserPayload(userId)
    return res.status(201).json({ token, user: payload })
  } catch (err) {
    await conn.rollback()
    console.error('Signup failed:', err)
    return res.status(500).json({ error: 'Could not create account.' })
  } finally {
    conn.release()
  }
}

export async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required.' })
  }

  try {
    const [rows] = await pool.query('SELECT id, password_hash FROM users WHERE email = ?', [email])
    const user = rows[0]
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' })

    const matches = await bcrypt.compare(password, user.password_hash)
    if (!matches) return res.status(401).json({ error: 'Invalid email or password.' })

    const token = signToken(user.id)
    const payload = await buildUserPayload(user.id)
    return res.json({ token, user: payload })
  } catch (err) {
    console.error('Login failed:', err)
    return res.status(500).json({ error: 'Could not log in.' })
  }
}

export async function me(req, res) {
  try {
    const payload = await buildUserPayload(req.userId)
    if (!payload) return res.status(404).json({ error: 'User not found.' })
    return res.json({ user: payload })
  } catch (err) {
    console.error('Fetching profile failed:', err)
    return res.status(500).json({ error: 'Could not load profile.' })
  }
}