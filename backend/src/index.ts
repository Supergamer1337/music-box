import { config } from 'dotenv'
import express from 'express'
import MusicBot from './services/MusicBot.js'
import playbackRouter from './routers/playbackRouter.js'

// Load environment variables
config()

// Start the application
MusicBot.getSharedInstance().startBot()

const app = express()

app.use(express.json())
app.use(playbackRouter)

if (!process.env.BACKEND_PORT) throw new Error('No backend port defined!')
app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Backend is listening on port ${process.env.BACKEND_PORT}`)
})
