import { RequestHandler } from 'express'
import { getPlaylist } from '../services/playlist.js'
import { validGuildPermissions } from '../services/validation.js'
import { handleEndpointError } from './../services/request.js'

/**
 * Checks if the current request playlist exists and the user has the correct permissions.
 *
 * @param req The request.
 * @param res The response.
 * @param next The next middleware.
 */
const hasPlaylistPermissions: RequestHandler = async (req, res, next) => {
    try {
        const { playlistId } = req.params

        const playlist = await getPlaylist(playlistId as string)

        if (!playlistId)
            return res
                .status(404)
                .json({ error: 'That playlist does not exist.' })

        if (
            !validGuildPermissions(
                req.session.discordTokenData.access_token,
                // @ts-expect-error Taken care of by above if statement.
                playlist.guildId
            )
        )
            return res.status(403).json({
                error: 'You do not have permission to add songs to this playlist.'
            })

        next()
    } catch (error) {
        handleEndpointError(
            error,
            res,
            'Internal server error occurred while checking playlist permissions.'
        )
    }
}

export default hasPlaylistPermissions
