import { config } from 'dotenv'
import express from 'express'
import MusicBot from './services/MusicBot.js'
import playbackRouter from './routers/playbackRouter.js'
import authRouter from './routers/authRouter.js'
import cors from 'cors'
import session from 'express-session'
import { createClient } from 'redis'
import connectRedis from 'connect-redis'

// Load environment variables
config()

// Setup redis variables
let RedisStore = connectRedis(session)
const redisClient = createClient({
    url: process.env.REDIS_URL
})

redisClient.on('connected', () => {
    console.log('Redis client connected')
})

try {
    console.log('Connecting to Redis...')
    // Connect to Redis
    await redisClient.connect()
} catch (err) {
    console.error(err)
}

// Start the application
await MusicBot.getSharedInstance().startBot()

const app = express()

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        // store: new RedisStore({
        //     // @ts-expect-error It is simply wrong
        //     client: redisClient
        // }),
        resave: false,
        saveUninitialized: false
    })
)

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
