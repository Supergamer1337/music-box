import { Router } from 'express'
import { getDiscordUserGuilds } from './../services/guildService.js'
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
                id: guild.id,
                name: guild.name,
                icon: guild.icon,
                owner: guild.owner,
                features: guild.features,
                permissions: guild.permissions,
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

export default guildRouter
