import { createContext, useContext, useEffect, useState } from 'react'
import { api, setToken, clearToken, hasToken } from '../api/client.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function restoreSession() {
      if (!hasToken()) {
        setLoading(false)
        return
      }
      try {
        const { user } = await api.me()
        setUser(user)
      } catch {
        clearToken()
      } finally {
        setLoading(false)
      }
    }
    restoreSession()
  }, [])

  const login = async (email, password) => {
    const { token, user } = await api.login({ email, password })
    setToken(token)
    setUser(user)
    return user
  }

  const signup = async (signupPayload) => {
    const { token, user } = await api.signup(signupPayload)
    setToken(token)
    setUser(user)
    return user
  }

  const logout = () => {
    clearToken()
    setUser(null)
  }

  const updateActiveField = (fieldId, patch) => {
    setUser((prev) => {
      if (!prev) return prev
      return { ...prev, fields: prev.fields.map((f) => (f.id === fieldId ? { ...f, ...patch } : f)) }
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateActiveField }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider.')
  return ctx
}