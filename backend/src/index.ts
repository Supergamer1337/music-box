import { config } from 'dotenv'
import MusicBot from './models/discord/MusicBot.js'
import Express from 'express'

// Load environment variables
config()

// Start the application
MusicBot.getSharedInstance().startBot()

const app = Express()

if (!process.env.BACKEND_PORT) throw new Error('No backend port defined!')
app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Backend is listening on port ${process.env.BACKEND_PORT}`)
})
