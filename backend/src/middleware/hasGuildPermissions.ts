import { RequestHandler } from 'express'
import { botIsInServer } from '../services/musicBot.js'
import { handleEndpointError } from '../services/request.js'
import { validGuildPermissions } from '../services/validation.js'

/**
 * Checks if the current requested guild exists and the user has the correct permissions.
 *
 * @param req The request.
 * @param res The response.
 * @param next The next middleware.
 */
const hasGuildPermissions: RequestHandler = async (req, res, next) => {
    try {
        const guildId = req.params.guildId || req.body.guildId

        if (!botIsInServer(guildId))
            return res.status(404).json({
                error: 'Music bot is not in that server.'
            })

        if (
            !(await validGuildPermissions(
                req.session.discordTokenData?.access_token,
                guildId
            ))
        )
            return res.status(403).json({
                error: 'You do not have permission to access this guild.'
            })

        next()
    } catch (error) {
        handleEndpointError(
            error,
            res,
            'Internal server error occurred while checking guild permissions.'
        )
    }
}

export default hasGuildPermissions
