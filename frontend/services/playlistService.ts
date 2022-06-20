import {
    clientBackendGetRequest,
    clientBackendPostRequest,
    handleInvalidRequest
} from './requestService'
import { PlaylistInfo } from './../types/Playlist.d'

/**
 * Creates a new playlist with the given name.
 *
 * @param name The name of the playlist.
 * @returns The created playlist.
 * @throws An error if the request failed.
 */
export const addNewPlaylist = async (name: string, guildId: string) => {
    console.log(name, guildId)
    const response = await clientBackendPostRequest(
        '/api/v1/playlists/create',
        {
            name,
            guildId
        }
    )

    if (!response.ok) {
        return handleInvalidRequest(
            response,
            'Failed to create playlist. Please try again later.'
        )
    }

    return (await response.json()) as PlaylistInfo
}

/**
 * Gets the playlists for the given guild.
 *
 * @param guildId The id of the guild.
 * @returns The playlists for the guild.
 * @throws An error if the request failed.
 */
export const getPlaylists = async (guildId: string) => {
    const response = await clientBackendGetRequest(
        `/api/v1/playlists/guild/${guildId}`
    )

    if (!response.ok) {
        return handleInvalidRequest(
            response,
            'Failed to get playlists. Please try again later.'
        )
    }

    return (await response.json()).playlists as PlaylistInfo[]
}
