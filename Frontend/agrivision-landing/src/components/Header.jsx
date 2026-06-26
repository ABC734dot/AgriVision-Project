import { useEffect, useState } from 'react'
import BrandMark from './BrandMark.jsx'
import './Header.css'

export default function Header({ onProfileClick }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="brand">
        <BrandMark size={30} />
        AgriVision
      </div>

      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#stories">Farmer Stories</a></li>
          {/* <li><a href="#">How it Works</a></li> */}
          <li><a href="#about">About</a></li>
        </ul>

        <button className="profile-btn" aria-label="Account" onClick={onProfileClick}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#F2E8D5" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="8" r="3.4" />
            <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
          </svg>
        </button>

        <button className="menu-toggle" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
