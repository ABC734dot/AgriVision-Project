import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import FieldInputPanel from './components/FieldInputPanel.jsx'
import RecommendationPanel from './components/RecommendationPanel.jsx'
import InsightStrip from './components/InsightStrip.jsx'
import { cropRecommendations } from './data/crops.js'
import './DashboardPage.css'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  const handleRun = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setHasRun(true)
    }, 1300)
  }

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Topbar name="Tanish" />

        <div className="work-grid">
          <FieldInputPanel onRun={handleRun} isLoading={isLoading} hasRun={hasRun} />
          <RecommendationPanel results={cropRecommendations} hasRun={hasRun} />
        </div>

        <InsightStrip hasRun={hasRun} topCrop={cropRecommendations[0]} />
      </main>
    </div>
  )
}
