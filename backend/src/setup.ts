import { createClient } from 'redis'
import connectRedis from 'connect-redis'
import session from 'express-session'
import { Express } from 'express'

/**
 * Setup redis for sessions
 * @returns A RedisStore instance.
 * @throws An error if the redis client could not connect.
 */
const setupRedis = async () => {
    // Setup redis variables
    let RedisStore = connectRedis(session)
    const redisClient = createClient({
        legacyMode: true,
        url: process.env.REDIS_URL
    })

    try {
        await redisClient.connect()
    } catch (err) {
        console.error(
            'Failed to connect to Redis with the following error:',
            err
        )

        process.exit(1)
    }

    return new RedisStore({
        // @ts-ignore
        client: redisClient
    })
}

/**
 * Setup the session middleware
 * @param app The express app.
 */
export const setupSessions = async (app: Express) => {
    const redisStore = await setupRedis()

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            store: redisStore,
            resave: false,
            saveUninitialized: false
        })
    )
}