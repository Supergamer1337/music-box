import { Router } from 'express'
import {
    isString,
    validGuildPermissions
} from './../services/validationService.js'
import {
    createPlaylist,
    getGuildPlaylists,
    getPlaylist
} from './../services/playlistService.js'
import type YtVideo from '../types/YtVideo.d'
import { addNewSong } from './../services/songService.js'

const playlistRouter = Router()

// Handles GET requests to /api/v1/playlists/guild/:guildId
playlistRouter.get('/guild/:guildId', async (req, res) => {
    const guildId = req.params.guildId
    try {
        if (
            !(await validGuildPermissions(
                // @ts-expect-error Fixed by middleware
                req.session.discordTokenData?.access_token,
                guildId
            ))
        )
            return res
                .status(403)
                .send('You do not have permission to access this guild.')

        let playlists = await getGuildPlaylists(guildId)

        // @ts-expect-error Mapped for response
        playlists = playlists.map((playlist) => {
            return {
                ...playlist,
                guildId: undefined
            }
        })

        res.status(200).json({ playlists })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: 'Error occurred while fetching playlists.'
        })
    }
})

// Handle POST requests to /api/v1/playlists/create
playlistRouter.post('/create', async (req, res) => {
    const { name, guildId } = req.body

    // Check if name and guildId were provided
    if (!name || !guildId)
        return res.status(400).json({
            error: 'Missing name and guildId fields.'
        })

    // Check that name and guildId are valid strings
    if (typeof name !== 'string' || typeof guildId !== 'string')
        return res.status(400).json({
            error: 'Name and guildId must be strings.'
        })

    try {
        // Check that the user has the correct rights for the guild
        if (
            !(await validGuildPermissions(
                // @ts-expect-error Fixed by middleware
                req.session.discordTokenData.access_token,
                guildId
            ))
        )
            return res.status(403).json({
                error: 'You do not have the correct rights for this guild.'
            })

        // Create the playlist
        const playlist = await createPlaylist(name, guildId)

        res.status(200).json({ playlist })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: 'Failed to create playlist'
        })
    }
})

playlistRouter.post('/:playlistId/add-song', async (req, res) => {
    try {
        const { playlistId } = req.query

        const playlist = await getPlaylist(playlistId as string)

        if (!playlistId)
            return res
                .status(404)
                .json({ error: 'That playlist does not exist.' })

        if (
            !validGuildPermissions(
                // @ts-expect-error Taken care of by middleware.
                req.session.discordTokenData.access_token,
                // @ts-expect-error Taken care of by above if statement.
                playlist.guildId
            )
        )
            return res.status(403).json({
                error: 'You do not have permission to add songs to this playlist.'
            })

        const video = req.body.video as YtVideo
        if (!video) return res.status(400).json({ error: 'No video provided.' })
        if (!video.id || !isString(video.id))
            return res
                .status(400)
                .json({ error: 'Video id must exist and be of type string.' })
        if (!video.title || !isString(video.title))
            return res.status(400).json({
                error: 'Video title must exist and be of type string.'
            })
        if (!video.thumbnail || !isString(video.thumbnail))
            return res.status(400).json({
                error: 'Video thumbnail must exist and be of type string.'
            })
        if (!video.duration || !Number.isInteger(video.duration))
            return res.status(400).json({
                error: 'Video duration must exist and be of type int.'
            })

        const song = await addNewSong(playlistId as string, video)

        return res.status(200).json({ song })
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: 'Failed to add song.' })
    }
})

export default playlistRouter
