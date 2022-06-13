import { config } from 'dotenv'
import express from 'express'
import MusicBot from './services/MusicBot.js'
import cors from 'cors'
import { setupRoutes, setupSessions } from './setup.js'

// Load environment variables
config()

// Start the application
await MusicBot.getSharedInstance().startBot()

const app = express()

// Setup sessions for app
await setupSessions(app)

if (process.env.NODE_ENV === 'development') {
    app.use(
        cors({ credentials: true, origin: `${process.env.FRONTEND_ADDRESS}` })
    )
}

app.use(express.json())

setupRoutes(app)

if (!process.env.BACKEND_PORT) throw new Error('No backend port defined!')
app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Backend is listening on port ${process.env.BACKEND_PORT}`)
})
