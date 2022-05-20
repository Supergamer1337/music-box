import { Router } from 'express'
import { getAccessTokenFromDiscord } from '../services/authService.js'

const authRouter = Router()

authRouter.get('/', async (req, res) => {
    const { code } = req.query

    if (!code) {
        res.status(400).send(
            'Missing Discord authorization code in query string'
        )
    }

    const accessTokenData = await getAccessTokenFromDiscord(code as string)

    console.log(accessTokenData)

    // @ts-ignore
    res.redirect(process.env.FRONTEND_ADDRESS)
})

export default authRouter
