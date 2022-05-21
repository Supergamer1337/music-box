import { Router } from 'express'
import { getDiscordUserGuilds } from './../services/guildService.js'

const guildRouter = Router()

guildRouter.get('/', async (req, res) => {
    try {
        const userGuilds = await getDiscordUserGuilds(
            // @ts-expect-error Taken care of by middleware
            req.session.discordTokenData.access_token
        )

        res.status(200).json(userGuilds)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: 'An error occurred while retrieving servers.'
        })
    }
})

export default guildRouter
