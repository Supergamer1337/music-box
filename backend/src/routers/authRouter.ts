import { Router } from 'express'
import isAuthenticated from './../middleware/isAuthenticated.js'
import {
    getDiscordUserData,
    requestAccessToken
} from '../services/authService.js'

const authRouter = Router()

authRouter.get('/', async (req, res) => {
    const { code } = req.query

    if (!code || typeof code !== 'string') {
        return res
            .status(400)
            .send('Missing Discord authorization code in query string')
    }

    try {
        const accessTokenData = await requestAccessToken(code)

        req.session.discordTokenData = accessTokenData

        res.redirect(process.env.FRONTEND_ADDRESS)
    } catch (error) {
        console.log(error)

        res.status(500).json({
            error: 'Failed to get Discord authentication token'
        })
    }
})

authRouter.get('/me', isAuthenticated, async (req, res) => {
    try {
        const discordUser = await getDiscordUserData(
            // @ts-expect-error Taken care of by the authentication middleware
            req.session.discordTokenData.access_token
        )

        res.status(200).json({
            id: discordUser.id,
            username: discordUser.username,
            discriminator: discordUser.discriminator,
            avatar: discordUser.avatar
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            error: 'Failed to get Discord user'
        })
    }
})

authRouter.get('/is-authenticated', isAuthenticated, (_, res) => {
    res.status(200).json({
        success: 'You are authenticated!'
    })
})

export default authRouter
