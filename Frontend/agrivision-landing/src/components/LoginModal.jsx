import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginModal.css'

export default function LoginModal({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(false)
  const navigate = useNavigate()

  // Close on Escape key
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
    onClose()
    navigate('/dashboard')
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
          <div className="form-group">
            <label htmlFor="loginPhone">Phone</label>
            <input type="tel" id="loginPhone" pattern="[0-9]{10}" 
       maxlength="10" placeholder="94xxxxxxxx" required />
          </div>
          <div className="form-group">
            <label htmlFor="loginPass">Password</label>
            <input type="password" id="loginPass" placeholder="••••••••" required />
          </div>
          <button type="submit" className="login-submit">
            {isSignup ? 'Create account' : 'Log in'}
          </button>
        </form>

        <p className="login-switch">
          {isSignup ? 'Already have an account? ' : 'New here? '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
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
