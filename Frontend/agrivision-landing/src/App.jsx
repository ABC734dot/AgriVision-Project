import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing/LandingPage.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import FieldHistoryPage from './pages/dashboard/FieldHistoryPage.jsx'
import LoginModal from './components/LoginModal.jsx'
import './App.css'

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false)

  const openLogin = () => setLoginOpen(true)
  const closeLogin = () => setLoginOpen(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage onLoginClick={openLogin} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/history" element={<FieldHistoryPage />} />
      </Routes>

      {/* Mounted at the router root so it can navigate to /dashboard on submit,
          regardless of which page it was opened from. */}
      <LoginModal isOpen={loginOpen} onClose={closeLogin} />
    </BrowserRouter>
  )
}
