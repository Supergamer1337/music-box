import { useQuery } from 'react-query'
import { checkYtVideoExistsInPlaylist } from '../services/songService'

/**
 * Hook to check if a video exists in a playlist.
 *
 * @param playlistId The playlist to check the video in.
 * @param videoId The youtube video id to check.
 * @returns An object with the following properties:
 * - youtubeVideoExists: Whether the video exists in the playlist.
 * - loadingYoutubeVideoExists: Whether the video exists in the playlist is loading.
 * - youtubeVideoExistsError: The error message if the video exists in the playlist is erroring.
 * - youtubeVideoExistsIsError: Whether the video exists in the playlist is erroring.
 * - refetchYoutubeVideoExists: A function to refetch the video exists in the playlist.
 */
const useYoutubeVideoExists = (playlistId: string, videoId: string) => {
    const {
        data: youtubeVideoExists,
        isLoading: loadingYoutubeVideoExists,
        isError: youtubeVideoExistsIsError,
        error: youtubeVideoExistsError,
        refetch: refetchYoutubeVideoExists
    } = useQuery<boolean, string>(
        ['youtubeVideoExistsIn', playlistId, videoId],
        () => checkYtVideoExistsInPlaylist(playlistId, videoId)
    )

    return {
        youtubeVideoExists,
        loadingYoutubeVideoExists,
        youtubeVideoExistsIsError,
        youtubeVideoExistsError,
        refetchYoutubeVideoExists
    }
}

export default useYoutubeVideoExists
