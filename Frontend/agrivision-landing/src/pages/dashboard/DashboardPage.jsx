import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import FieldInputPanel from './components/FieldInputPanel.jsx'
import RecommendationPanel from './components/RecommendationPanel.jsx'
import InsightStrip from './components/InsightStrip.jsx'
import LogSeasonModal from './components/LogSeasonModal.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { api } from '../../api/client.js'
import './DashboardPage.css'

export default function DashboardPage() {
  const { user, updateActiveField, addHistoryEntryLocal } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [logSeasonOpen, setLogSeasonOpen] = useState(false)
  const [logSeasonSubmitting, setLogSeasonSubmitting] = useState(false)
  const [logSeasonError, setLogSeasonError] = useState('')

  const activeField = user?.fields?.find((f) => f.is_active) || user?.fields?.[0] || null

  const latestRun = activeField?.latestRun
  const storedRecommendation = latestRun?.result_json
    ? typeof latestRun.result_json === 'string'
      ? JSON.parse(latestRun.result_json)
      : latestRun.result_json
    : null

  const [recommendation, setRecommendation] = useState(storedRecommendation)
  const hasRun = Boolean(recommendation)

  const handleRun = async (values) => {
    if (!activeField) return
    setError('')
    setIsLoading(true)

    try {
      const { recommendation: result } = await api.runRecommendation(activeField.id, {
        location: values.location,
        moisture: values.moisture,
        ph: Number((values.ph / 10).toFixed(1)),
        nitrogen: values.nitrogen,
        rainfallLabel: values.rainfall,
      })

      setRecommendation(result)
      updateActiveField(activeField.id, {
        latestRun: { result_json: result, model_confidence: result.modelConfidence },
        location_label: values.location || activeField.location_label,
        last_moisture: values.moisture,
        last_ph: Number((values.ph / 10).toFixed(1)),
        last_nitrogen: values.nitrogen,
        last_rainfall_label: values.rainfall,
      })
    } catch (err) {
      setError(err.message || 'Could not generate a recommendation right now.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogSeasonSubmit = async (formValues) => {
    if (!activeField) return
    setLogSeasonError('')
    setLogSeasonSubmitting(true)

    try {
      const { id } = await api.addHistoryEntry(activeField.id, formValues)

      addHistoryEntryLocal(activeField.id, {
        id,
        season: formValues.seasonLabel,
        dateRange: formValues.dateRange,
        recommended: formValues.recommendedCrop,
        recommendedIcon: formValues.recommendedIcon,
        matchScore: formValues.matchScore,
        planted: formValues.plantedCrop,
        outcome: formValues.outcome,
        yieldNote: formValues.yieldNote,
        note: formValues.note,
      })

      setLogSeasonOpen(false)
    } catch (err) {
      setLogSeasonError(err.message || 'Could not save this season right now.')
    } finally {
      setLogSeasonSubmitting(false)
    }
  }

  const initialValues = activeField
    ? {
        location: activeField.location_label || undefined,
        moisture: activeField.last_moisture ?? undefined,
        ph: activeField.last_ph ?? undefined,
        nitrogen: activeField.last_nitrogen ?? undefined,
        rainfallLabel: activeField.last_rainfall_label ?? undefined,
      }
    : undefined

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Topbar name={user?.name} />

        {error && <div className="dashboard-error">{error}</div>}

        <div className="work-grid">
          <FieldInputPanel
            onRun={handleRun}
            isLoading={isLoading}
            hasRun={hasRun}
            initialValues={initialValues}
          />
          <RecommendationPanel
            results={recommendation?.crops || []}
            hasRun={hasRun}
            onLogSeasonClick={() => setLogSeasonOpen(true)}
          />
        </div>

        <InsightStrip
          hasRun={hasRun}
          topCrop={recommendation?.crops?.[0]}
          confidence={recommendation?.modelConfidence}
          yieldUplift={recommendation?.estimatedYieldUpliftPercent}
        />
      </main>

      <LogSeasonModal
        isOpen={logSeasonOpen}
        onClose={() => setLogSeasonOpen(false)}
        onSubmit={handleLogSeasonSubmit}
        topCrop={recommendation?.crops?.[0]}
        submitting={logSeasonSubmitting}
        error={logSeasonError}
      />
    </div>
  )
}