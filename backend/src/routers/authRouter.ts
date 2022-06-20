import { Router } from 'express'
import isAuthenticated from './../middleware/isAuthenticated.js'
import { getDiscordUserData, requestAccessToken } from '../services/auth.js'
import { isString } from '../services/validation.js'
import { handleEndpointError } from '../services/request.js'

const authRouter = Router()

// Handle /api/v1/auth/ by getting Discord auth token and redirecting to frontend
authRouter.get('/', async (req, res) => {
    const { code } = req.query as { code?: string }

    if (!code || !isString(code)) {
        return res
            .status(400)
            .send('Missing Discord authorization code in query string')
    }

    try {
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
})

// Handle /api/v1/auth/me by sending the Discord user data
authRouter.get('/me', isAuthenticated, async (req, res) => {
    try {
        const discordUser = await getDiscordUserData(
            // @ts-expect-error Taken care of by the authentication middleware
            req.session.discordTokenData.access_token
        )

        res.status(200).json(discordUser)
    } catch (error) {
        handleEndpointError(error, res, 'Failed to get Discord user data.')
    }
})

// Handle /api/v1/auth/logout by clearing the session
authRouter.post('/logout', isAuthenticated, async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to destroy session:', err)
            req.session.discordTokenData = undefined
        }

        res.status(200).json({
            message: 'Successfully logged out!'
        })
    })
})

export default authRouter
