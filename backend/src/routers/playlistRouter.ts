import { Router } from 'express'
import { validZodYtVideo } from '../services/validation.js'
import {
    createPlaylist,
    getExtendedPlaylist,
    getGuildPlaylists
} from '../services/playlist.js'
import {
    addNewSong,
    getSongByPlaylistAndYoutubeId,
    removeSongFromPlaylist
} from '../services/song.js'
import { handleEndpointError } from '../services/request.js'
import hasGuildPermissions from '../middleware/hasGuildPermissions.js'
import hasPlaylistPermissions from './../middleware/hasPlaylistPermissions.js'
import { YouTubeVideo } from 'youtube-search-no-limit'
import { validateRequest } from 'zod-express-middleware'
import { z } from 'zod'

const playlistRouter = Router()

// Handles GET requests to /api/v1/playlists/guild/:guildId, which returns all playlists of the given guild.
playlistRouter.get(
    '/guild/:guildId',
    validateRequest({
        params: z.object({
            guildId: z.string()
        })
    }),
    hasGuildPermissions,
    async (req, res) => {
        try {
            const guildId = req.params.guildId
            const playlists = await getGuildPlaylists(guildId)

            res.status(200).json({ playlists })
        } catch (error) {
            handleEndpointError(
                error,
                res,
                'Error occurred while fetching playlists.'
            )
        }
    }
)

// Handle POST requests to /api/v1/playlists/create, which creates a new playlist.
playlistRouter.post(
    '/create',
    validateRequest({
        body: z.object({
            name: z.string(),
            guildId: z.string()
        })
    }),
    hasGuildPermissions,
    async (req, res) => {
        try {
            const { name, guildId } = req.body

            // Create the playlist
            const playlist = await createPlaylist(name, guildId)

            res.status(200).json({ playlist })
        } catch (error) {
            handleEndpointError(error, res, 'Failed to create playlist.')
        }
    }
)

// Handles POST requests to /api/v1/playlists/:playlistId/add-song, and adds a song to the specified playlist
playlistRouter.post(
    '/:playlistId/add-song',
    validateRequest({
        params: z.object({
            playlistId: z.string().uuid()
        }),
        body: z.object({
            video: validZodYtVideo()
        })
    }),
    async (req, res) => {
        try {
            const { playlistId } = req.params

            const video = req.body.video as YouTubeVideo

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
            handleEndpointError(error, res, 'Failed to add song.')
        }
    }
)

// Handles DELETE requests to /api/v1/playlists/:playlistId/ytId/:youtubeId, and removes a song from the specified playlist
playlistRouter.delete(
    '/:playlistId/ytId/:youtubeId',
    validateRequest({
        params: z.object({
            playlistId: z.string().uuid(),
            youtubeId: z.string().min(11).max(11)
        })
    }),
    hasPlaylistPermissions,
    async (req, res) => {
        try {
            const { playlistId, youtubeId } = req.params

            const playlist = await getExtendedPlaylist(playlistId)

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
            handleEndpointError(error, res, 'Failed to delete song.')
        }
    }
)

// Handles GET requests to /api/v1/playlists/:playlistId/ytId/:ytId, and returns whether or not the specified song exists in the playlist
playlistRouter.get(
    '/:playlistId/ytId/:youtubeId',
    validateRequest({
        params: z.object({
            playlistId: z.string().uuid(),
            youtubeId: z.string().min(11).max(11)
        })
    }),
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
            handleEndpointError(error, res, 'Failed to check if song exists.')
        }
    }
)

export default playlistRouter
