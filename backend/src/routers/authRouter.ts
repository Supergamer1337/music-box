import { Router } from 'express'
import { requestAccessToken } from '../services/authService.js'
import DiscordTokenData from './../types/DiscordTokenData.d'

const authRouter = Router()

authRouter.get('/', async (req, res) => {
    const { code } = req.query

    if (!code || typeof code !== 'string') {
        return res
            .status(400)
            .send('Missing Discord authorization code in query string')
    }

    try {
        const accessTokenData = (await requestAccessToken(
            code
        )) as DiscordTokenData

        req.session.discordTokenData = accessTokenData

        console.log(accessTokenData)

        res.redirect(process.env.FRONTEND_ADDRESS)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default authRouter
