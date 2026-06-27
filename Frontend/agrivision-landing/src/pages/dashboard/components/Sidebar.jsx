import { Link, useLocation, useNavigate } from 'react-router-dom'
import BrandMark from '../../../components/BrandMark.jsx'
import { useAuth } from '../../../context/AuthContext.jsx'
import './Sidebar.css'

export default function Sidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const activeField = user?.fields?.find((f) => f.is_active) || user?.fields?.[0] || null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <Link to="/" className="brand">
        <BrandMark size={26} />
        AgriVision
      </Link>

      <span className="nav-section-label">Overview</span>
      <ul className="nav-list">
        <li>
          <Link to="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            Recommendation
          </Link>
        </li>
        <li>
          <Link to="/dashboard/history" className={pathname === '/dashboard/history' ? 'active' : ''}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12l2-2 4 4 8-8 4 4" />
            </svg>
            Field history
          </Link>
        </li>
      </ul>

      <div className="field-switcher">
        <div className="field-switcher-label">Active field</div>
        <div className="field-pill">
          <span className="dot" />
          <div className="meta">
            <div className="name">{activeField?.field_name || 'No field yet'}</div>
            <div className="loc">{activeField?.location_label || 'Location not set'}</div>
          </div>
          <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 9l4 4 4-4" />
          </svg>
        </div>
        <div className="profile-row">
          <div className="profile-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="#F2E8D5" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="8" r="3.4" />
              <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
            </svg>
          </div>
          <div>
            <div className="pname">{user?.name || 'Guest'}</div>
            <div className="prole">{user?.farmOwnerTitle || 'Farm owner'}</div>
          </div>
          <button className="logout-btn" onClick={handleLogout} aria-label="Log out" title="Log out">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}