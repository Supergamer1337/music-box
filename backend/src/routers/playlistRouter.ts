import { Router } from 'express'
import { isString, validYtVideo } from '../services/validation.js'
import {
    createPlaylist,
    getExtendedPlaylist,
    getGuildPlaylists
} from '../services/playlist.js'
import type YtVideo from '../types/YtVideo.d'
import {
    addNewSong,
    getSongByPlaylistAndYoutubeId,
    removeSongFromPlaylist
} from '../services/song.js'
import { handleEndpointError } from '../services/request.js'
import hasGuildPermissions from '../middleware/hasGuildPermissions.js'
import { playlistsSongCountConversion } from './../services/conversion.js'
import hasPlaylistPermissions from './../middleware/hasPlaylistPermissions.js'

const playlistRouter = Router()

// Handles GET requests to /api/v1/playlists/guild/:guildId, which returns all playlists of the given guild.
playlistRouter.get('/guild/:guildId', hasGuildPermissions, async (req, res) => {
    const guildId = req.params.guildId
    try {
        const playlists = await getGuildPlaylists(guildId)

        res.status(200).json({ playlists })
    } catch (error) {
        handleEndpointError(
            error,
            res,
            'Error occurred while fetching playlists.'
        )
    }
})

// Handle POST requests to /api/v1/playlists/create, which creates a new playlist.
playlistRouter.post('/create', hasGuildPermissions, async (req, res) => {
    try {
        const { name, guildId } = req.body

        // Check if name and guildId were provided
        if (!name || !guildId)
            return res.status(400).json({
                error: 'Missing name and guildId fields.'
            })

        // Check that name and guildId are valid strings
        if (!isString(name) || !isString(guildId))
            return res.status(400).json({
                error: 'Name and guildId must be strings.'
            })

        // Create the playlist
        const playlist = await createPlaylist(name, guildId)

        res.status(200).json({ playlist })
    } catch (error) {
        handleEndpointError(error, res, 'Failed to create playlist.')
    }
})

// Handles POST requests to /api/v1/playlists/:playlistId/add-song, and adds a song to the specified playlist
playlistRouter.post('/:playlistId/add-song', async (req, res) => {
    try {
        const { playlistId } = req.params

        const video = req.body.video as YtVideo

        const errors = validYtVideo(video)
        if (errors.length > 0) return res.status(400).json({ errors })

        const existingSong = await getSongByPlaylistAndYoutubeId(
            playlistId,
            video.id
        )

        if (existingSong)
            return res.status(200).json({
                song: existingSong
            })

        const newSong = await addNewSong(playlistId as string, video)

        return res.status(200).json({ song: newSong })
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: 'Failed to add song.' })
    }
})

// Handles DELETE requests to /api/v1/playlists/:playlistId/ytId/:youtubeId, and removes a song from the specified playlist
playlistRouter.delete(
    '/:playlistId/ytId/:youtubeId',
    hasPlaylistPermissions,
    async (req, res) => {
        try {
            const { playlistId, youtubeId } = req.params

            const playlist = await getExtendedPlaylist(playlistId as string)

            // @ts-expect-error - Has been checked in hasPlaylistPermissions
            for (const song of playlist.songs) {
                if (song.youtubeId === youtubeId) {
                    removeSongFromPlaylist(song.id)
                    return res.status(200).json({ message: 'Song removed.' })
                }
            }

            return res
                .status(404)
                .json({ error: 'That song does not exist in this playlist.' })
        } catch (error) {
            console.error(error)

            res.status(500).json({ error: 'Failed to delete song.' })
        }
    }
)

// Handles GET requests to /api/v1/playlists/:playlistId/ytId/:ytId, and returns whether or not the specified song exists in the playlist
playlistRouter.get(
    '/:playlistId/ytId/:youtubeId',
    hasPlaylistPermissions,
    async (req, res) => {
        try {
            const { playlistId, youtubeId } = req.params

            const playlist = await getExtendedPlaylist(playlistId as string)

            // @ts-expect-error - Has been checked in hasPlaylistPermissions
            for (const song of playlist.songs) {
                if (song.youtubeId === youtubeId) {
                    return res.status(200).json({ exists: true })
                }
            }

            return res.status(200).json({ exists: false })
        } catch (error) {
            console.error(error)

            res.status(500).json({ error: 'Failed to check if song exists.' })
        }
    }
)

export default playlistRouter
