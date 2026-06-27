import { app } from './app.js'
import cors from 'cors'
import { testConnection } from './config/db.js'

app.use(cors({
  origin: 'http://localhost:5173/', // Change if your React port is different
  credentials: true
}));

// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173'],
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }))

// // This handles preflight OPTIONS requests
// app.options('*', cors())

const PORT = process.env.PORT || 5001

// app.use(cors({ origin: 'http://localhost:5173/' }))

async function start() {
  try {
    await testConnection()
    console.log('✓ Connected to MySQL.')
  } catch (err) {
    console.error('✗ Could not connect to MySQL. Check your .env DB_* values.')
    console.error(err.message)
    process.exit(1)
  }

  app.listen(PORT, () => console.log(`AgriVision backend running on http://localhost:${PORT}`))
}

start()