const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'

function getToken() {
  return localStorage.getItem('agrivision_token')
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`)
  }

  return data
}

export const api = {
  signup: (payload) => request('/auth/signup', { method: 'POST', body: payload, auth: false }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload, auth: false }),
  me: () => request('/auth/me'),
  fetchLiveReadings: (fieldId, lat, lng) => request(`/fields/${fieldId}/readings?lat=${lat}&lng=${lng}`),
  runRecommendation: (fieldId, payload) => request(`/fields/${fieldId}/recommendation`, { method: 'POST', body: payload }),
  listHistory: (fieldId) => request(`/fields/${fieldId}/history`),
  addHistoryEntry: (fieldId, payload) => request(`/fields/${fieldId}/history`, { method: 'POST', body: payload }),
}

export function setToken(token) {
  localStorage.setItem('agrivision_token', token)
}

export function clearToken() {
  localStorage.removeItem('agrivision_token')
}

export function hasToken() {
  return Boolean(getToken())
}