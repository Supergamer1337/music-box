import { Router } from 'express'
import { userServersAddBotInfo as userGuildsAddBotInfo } from '../services/conversion.js'
import { getDiscordGuild, getDiscordUserGuilds } from '../services/guild.js'
import { handleEndpointError } from '../services/request.js'
import { validateRequest } from 'zod-express-middleware'
import { z } from 'zod'
import hasGuildPermissions from './../middleware/hasGuildPermissions.js'

const guildRouter = Router()

guildRouter.get('/', async (req, res) => {
    try {
        let userGuilds = await getDiscordUserGuilds(
            req.session.discordTokenData.access_token
        )

        const mappedGuilds = userGuildsAddBotInfo(userGuilds)

        res.status(200).json({ guilds: mappedGuilds })
    } catch (error) {
        handleEndpointError(
            error,
            res,
            'An error occurred while retrieving servers.'
        )
    }
})

guildRouter.get(
    '/:guildId',
    validateRequest({
        params: z.object({
            guildId: z.string()
        })
    }),
    hasGuildPermissions,
    async (req, res) => {
        try {
            const guildId = req.params.guildId

            const guild = await getDiscordGuild(guildId)

            res.status(200).json(guild)
        } catch (error) {
            handleEndpointError(
                error,
                res,
                'An error occurred while retrieving server.'
            )
        }
    }
)

export default guildRouter
