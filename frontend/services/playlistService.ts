import {
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
export const addNewPlaylist = async (name: string) => {
    const response = await clientBackendPostRequest('/api/v1/playlist/create', {
        name
    })

    if (!response.ok) {
        return handleInvalidRequest(
            response,
            'Failed to create playlist. Please try again later.'
        )
    }

    return (await response.json()) as PlaylistInfo
}
