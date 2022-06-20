import { RequestHandler } from 'express'
import { discordTokenValid, getDiscordUserData } from '../services/auth.js'
import { handleEndpointError } from '../services/request.js'

/**
 * Checks if the current request is authenticated.
 *
 * @param req The request.
 * @param res The response.
 * @param next The next middleware.
 */
const isAuthenticated: RequestHandler = async (req, res, next) => {
    if (!req.session.discordTokenData) {
        return res.status(401).json({ error: 'You are not authenticated' })
    }

    try {
        if (
            await discordTokenValid(req.session.discordTokenData.access_token)
        ) {
            try {
                // const user = await getDiscordUserData(
                //     req.session.discordTokenData.access_token
                // )
                // req.user = user
                next()
            } catch (error) {
                return handleEndpointError(
                    error,
                    res,
                    'Failed to get user data from Discord.'
                )
            }
        } else {
            return res.status(401).json({ error: 'You are not authenticated' })
        }
    } catch (error) {
        return handleEndpointError(
            error,
            res,
            'Internal server error occurred while checking validity of Discord token.'
        )
    }
}

export default isAuthenticated
