import { config } from 'dotenv'
import express from 'express'
import MusicBot from './services/MusicBot.js'
import playbackRouter from './routers/playbackRouter.js'
import authRouter from './routers/authRouter.js'
import cors from 'cors'

// Load environment variables
config()

// Start the application
MusicBot.getSharedInstance().startBot()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(cors())
}

app.use(express.json())
app.use('/api/v1/', playbackRouter)
app.use('/api/v1/auth', authRouter)

if (!process.env.BACKEND_PORT) throw new Error('No backend port defined!')
app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Backend is listening on port ${process.env.BACKEND_PORT}`)
})
