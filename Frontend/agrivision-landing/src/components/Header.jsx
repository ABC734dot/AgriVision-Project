import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import BrandMark from './BrandMark.jsx'
import LanguagePicker from './LanguagePicker.jsx'
import './Header.css'

export default function Header({ onProfileClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="brand">
        <BrandMark size={30} />
        AgriVision
      </div>

      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="#hero">{t('header.home')}</a></li>
          <li><a href="#stories">{t('header.farmerStories')}</a></li>
          <li><a href="#about">{t('header.about')}</a></li>
        </ul>

        <LanguagePicker />

        <button className="profile-btn" aria-label="Account" onClick={onProfileClick}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#F2E8D5" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="8" r="3.4" />
            <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
          </svg>
        </button>

        <button
          className="menu-toggle"
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            <li><a href="#hero" onClick={closeMobileMenu}>{t('header.home')}</a></li>
            <li><a href="#stories" onClick={closeMobileMenu}>{t('header.farmerStories')}</a></li>
            <li><a href="#about" onClick={closeMobileMenu}>{t('header.about')}</a></li>
          </ul>
        </div>
      )}
    </header>
  )
}