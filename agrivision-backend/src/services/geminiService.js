import { GoogleGenAI } from '@google/genai'

const apiKey = process.env.GEMINI_API_KEY
const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

let client = null
function getClient() {
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set in the environment.')
  if (!client) client = new GoogleGenAI({ apiKey })
  return client
}

function buildPrompt({ location, moisture, ph, nitrogen, rainfallLabel }) {
  return `You are an agronomy assistant for a crop-recommendation app called AgriVision.

Given the following field conditions, recommend 4 crops ranked by suitability.

Field location: ${location || 'Not specified'}
Soil moisture: ${moisture != null ? `${moisture}%` : 'Unknown'}
Soil pH: ${ph != null ? ph : 'Unknown'}
Nitrogen (N): ${nitrogen != null ? `${nitrogen} ppm` : 'Unknown'}
Rainfall forecast (next 30 days): ${rainfallLabel || 'Unknown'}

Respond with ONLY valid JSON (no markdown fences, no commentary, no leading/trailing text) in exactly this shape:

{
  "modelConfidence": <number 0-100, your overall confidence in this ranking>,
  "estimatedYieldUpliftPercent": <number, estimated % yield improvement vs. a naive/default crop choice for this region>,
  "crops": [
    {
      "name": "<crop name>",
      "icon": "<single emoji representing the crop>",
      "tag": "<short 3-6 word tag, e.g. 'Best soil + climate match'>",
      "score": <integer 0-100, match score>,
      "soil": "<one short sentence on soil fit>",
      "climate": "<one short sentence on climate/rainfall fit>",
      "market": "<one short sentence on market/demand signal for this crop and region>"
    }
  ]
}

Rules:
- Return exactly 4 crops, ordered from highest "score" to lowest.
- Scores should be realistic and distinct (not all the same number).
- Keep "soil", "climate", and "market" each under 90 characters.
- Pick crops genuinely appropriate for the given location's typical agriculture, when location is known.
- Output raw JSON only — it will be parsed directly with JSON.parse().`
}

function extractJson(text) {
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim()
  return JSON.parse(cleaned)
}

export async function getCropRecommendation(fieldReadings) {
  const ai = getClient()
  const prompt = buildPrompt(fieldReadings)

  const response = await ai.models.generateContent({ model: modelName, contents: prompt })
  const text = response.text

  let parsed
  try {
    parsed = extractJson(text)
  } catch (err) {
    console.error('Failed to parse Gemini response as JSON:', text)
    throw new Error('Gemini returned a response that could not be parsed as JSON.')
  }

  if (!Array.isArray(parsed.crops) || parsed.crops.length === 0) {
    throw new Error('Gemini response did not include a valid "crops" array.')
  }

  parsed.crops = parsed.crops.map((c) => ({
    name: String(c.name ?? 'Unknown crop'),
    icon: String(c.icon ?? '🌱'),
    tag: String(c.tag ?? ''),
    score: Math.max(0, Math.min(100, Number(c.score) || 0)),
    soil: String(c.soil ?? ''),
    climate: String(c.climate ?? ''),
    market: String(c.market ?? ''),
  }))

  parsed.modelConfidence = Math.max(0, Math.min(100, Number(parsed.modelConfidence) || 0))
  parsed.estimatedYieldUpliftPercent = Number(parsed.estimatedYieldUpliftPercent) || 0

  return parsed
}