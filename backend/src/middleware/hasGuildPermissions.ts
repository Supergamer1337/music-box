import { RequestHandler } from 'express'
import { validGuildPermissions } from '../services/validationService.js'
import MusicBot from '../services/MusicBot.js'

/**
 * Checks if the current requested guild exists and the user has the correct permissions.
 *
 * @param req The request.
 * @param res The response.
 * @param next The next middleware.
 */
const hasGuildPermissions: RequestHandler = async (req, res, next) => {
    const guildId = req.params.guildId || req.body.guildId

    if (!MusicBot.getSharedInstance().isInServer(guildId))
        return res.status(404).json({
            error: 'Music bot is not in that server.'
        })

    if (
        !(await validGuildPermissions(
            // @ts-expect-error Fixed by middleware
            req.session.discordTokenData?.access_token,
            guildId
        ))
    )
        return res
            .status(403)
            .json({ error: 'You do not have permission to access this guild.' })

    next()
}

export default hasGuildPermissions
