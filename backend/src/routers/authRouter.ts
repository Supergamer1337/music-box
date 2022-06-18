import { Router } from 'express'
import isAuthenticated from './../middleware/isAuthenticated.js'
import {
    getDiscordUserData,
    requestAccessToken
} from '../services/authService.js'
import { isString } from '../services/validationService.js'
import { handleEndpointError } from './../services/requestService'

const authRouter = Router()

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

authRouter.get('/me', isAuthenticated, async (req, res) => {
    try {
        const discordUser = await getDiscordUserData(
            // @ts-expect-error Taken care of by the authentication middleware
            req.session.discordTokenData.access_token
        )

        res.status(200).json(discordUser)
    } catch (error) {
        handleEndpointError(eror, res, 'Failed to get Discord user data.')
    }
})

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
