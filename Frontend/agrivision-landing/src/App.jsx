import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing/LandingPage.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import FieldHistoryPage from './pages/dashboard/FieldHistoryPage.jsx'
import LoginModal from './components/LoginModal.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './App.css'

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false)

  const openLogin = () => setLoginOpen(true)
  const closeLogin = () => setLoginOpen(false)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage onLoginClick={openLogin} />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/history"
            element={
              <RequireAuth>
                <FieldHistoryPage />
              </RequireAuth>
            }
          />
        </Routes>

        <LoginModal isOpen={loginOpen} onClose={closeLogin} />
      </BrowserRouter>
    </AuthProvider>
  )
}