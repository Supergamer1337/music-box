import { Router } from 'express'
import isAuthenticated from './../middleware/isAuthenticated.js'
import { getDiscordUserData, requestAccessToken } from '../services/auth.js'
import { handleEndpointError } from '../services/request.js'
import { validateRequest } from 'zod-express-middleware'
import { z } from 'zod'
import { websocket } from './../services/websocket.js'

const authRouter = Router()

// Handle /api/v1/auth/ by getting Discord auth token and redirecting to frontend
authRouter.get(
    '/',
    validateRequest({
        query: z.object({
            code: z.string()
        })
    }),
    async (req, res) => {
        try {
            const { code } = req.query

            const accessTokenData = await requestAccessToken(code)

            req.session.discordTokenData = accessTokenData

            res.redirect(process.env.FRONTEND_ADDRESS)
        } catch (error) {
            handleEndpointError(
                error,
                res,
                'Failed to get Discord authentication token.'
            )
        }
    }
)

// Handle /api/v1/auth/me by sending the Discord user data
authRouter.get('/me', isAuthenticated, async (req, res) => {
    try {
        const discordUser = await getDiscordUserData(
            req.session.discordTokenData.access_token
        )

        res.status(200).json(discordUser)
    } catch (error) {
        handleEndpointError(error, res, 'Failed to get Discord user data.')
    }
})

// Handle /api/v1/auth/logout by clearing the session
authRouter.post('/logout', isAuthenticated, async (req, res) => {
    const sessionId = req.session.id

    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to destroy session:', err)
            // @ts-ignore Force it
            req.session.discordTokenData = undefined
        }

        websocket.to(sessionId).disconnectSockets()

        res.status(200).json({
            message: 'Successfully logged out!'
        })
    })
})

export default authRouter
