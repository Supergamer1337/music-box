import { Router } from 'express'
import {
    getDiscordGuild,
    getDiscordUserGuilds
} from './../services/guildService.js'
import MusicBot from './../services/MusicBot.js'

const guildRouter = Router()

guildRouter.get('/', async (req, res) => {
    try {
        let userGuilds = await getDiscordUserGuilds(
            // @ts-expect-error Taken care of by middleware
            req.session.discordTokenData.access_token
        )

        const musicBot = MusicBot.getSharedInstance()

        userGuilds = userGuilds.map((guild) => {
            return {
                ...guild,
                botInServer: musicBot.isInServer(guild.id)
            }
        })

        res.status(200).json(userGuilds)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: 'An error occurred while retrieving servers.'
        })
    }
})

guildRouter.get('/:guildId', async (req, res) => {
    try {
        const guildId = req.params.guildId

        const guild = await getDiscordGuild(guildId)

        res.status(200).json(guild)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: 'An error occurred while retrieving server.'
        })
    }
})

export default guildRouter
