import {
    clientBackendDeleteRequest,
    clientBackendGetRequest,
    clientBackendPostRequest,
    handleInvalidRequest
} from './requestService'
import YouTubeVideo from './../types/youtube/YoutubeVideo.d'

/**
 * Add a video to a playlist.
 *
 * @param video The video to add.
 * @param playlistId The ID of the playlist to add the video to.
 */
export const addNewSong = async (
    video: YouTubeVideo,
    playlistId: string
): Promise<void> => {
    const response = await clientBackendPostRequest(
        `/api/v1/playlists/${playlistId}/add-song`,
        { video }
    )

    if (!response.ok)
        return handleInvalidRequest(response, 'Could not add song...')
}

/**
 * Removes a song from a playlist, by Youtube ID.
 *
 * @param youtubeId The Youtube ID of the song to remove.
 * @param playlistId The ID of the playlist to remove the song from.
 * @throws An error if the request fails.
 */
export const removeSongByYoutubeId = async (
    youtubeId: string,
    playlistId: string
): Promise<void> => {
    const response = await clientBackendDeleteRequest(
        `/api/v1/playlists/${playlistId}/ytId/${youtubeId}`
    )

    if (!response.ok)
        return handleInvalidRequest(response, 'Could not remove song...')
}

/**
 * Checks if the video exists in a playlist.
 *
 * @param playlistId The ID of the playlist.
 * @param videoId The ID of the video.
 * @returns Whether or not the video exists in the playlist.
 * @throws Error if the request fails.
 */
export const checkYtVideoExistsInPlaylist = async (
    playlistId: string,
    videoId: string
): Promise<boolean> => {
    const response = await clientBackendGetRequest(
        `/api/v1/playlists/${playlistId}/ytId/${videoId}`
    )

    if (!response.ok)
        return handleInvalidRequest(
            response,
            'Failed to check if video exists in playlist.'
        )

    return (await response.json()).exists
}
