import { Router } from 'express'
import { getDiscordUser, requestAccessToken } from '../services/authService.js'
import DiscordTokenData from '../types/discord/DiscordTokenData'

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

authRouter.get('/me', async (req, res) => {
    if (!req.session.discordTokenData) {
        return res.status(401).send('Not authenticated')
    }

    try {
        const discordUser = await getDiscordUser(
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

export default authRouter
