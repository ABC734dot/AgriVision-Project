import { Router } from 'express'
import { fetchLiveReadings, runRecommendation, addHistoryEntry, listHistory } from '../controllers/fieldsController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.get('/:fieldId/readings', fetchLiveReadings)
router.post('/:fieldId/recommendation', runRecommendation)
router.get('/:fieldId/history', listHistory)
router.post('/:fieldId/history', addHistoryEntry)

export default router