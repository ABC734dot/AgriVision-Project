import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './LoginModal.css'

export default function LoginModal({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { login, signup } = useAuth()

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

  useEffect(() => {
    if (!isOpen) {
      setError('')
      setSubmitting(false)
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      if (isSignup) {
        await signup({ name, email, password })
      } else {
        await login(email, password)
      }
      onClose()
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="login-card">
        <button className="login-close" aria-label="Close login" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        <span className="login-eyebrow">Welcome back</span>
        <h2>{isSignup ? 'Plant your first season' : 'Log in to your field'}</h2>
        <p className="sub">
          {isSignup
            ? 'Tell us about your land and we\u2019ll take it from here.'
            : 'Pick up where your last season\u2019s data left off.'}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="signupName">Name</label>
              <input
                type="text"
                id="signupName"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              type="email"
              id="loginEmail"
              placeholder="you@farmmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPass">Password</label>
            <input
              type="password"
              id="loginPass"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-submit" disabled={submitting}>
            {submitting
              ? isSignup ? 'Creating account…' : 'Logging in…'
              : isSignup ? 'Create account' : 'Log in'}
          </button>
        </form>

        <p className="login-switch">
          {isSignup ? 'Already have an account? ' : 'New here? '}
          
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setError('')
              setIsSignup((v) => !v)
            }}
          >
            {isSignup ? 'Log in' : 'Create an account'}
          </a>
        </p>
      </div>
    </div>
  )
}