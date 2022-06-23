import { useMutation } from 'react-query'
import { removeSongByYoutubeId } from '../services/songService'

/**
 * Hook to remove a song from a playlist.
 *
 * @param videoId The youtube video id of the song to remove.
 * @param playlistId The playlist id to remove the song from.
 * @param onSuccess Callback to execute when the song is removed successfully.
 * @returns An object with the following properties:
 * - removingSong: Whether the song is being removed.
 * - removeSong: A function to remove the song.
 * - errorRemovingSong: If removing the song is erroring.
 * - resetRemoveSong: A function to reset the remove song state.
 * - removedSong: Whether the song was removed.
 */
const useRemoveSong = (
    videoId: string,
    playlistId: string,
    onSuccess?: () => void
) => {
    const {
        isSuccess: removedSong,
        isLoading: removingSong,
        isError: errorRemovingSong,
        mutate: removeSong,
        reset: resetRemoveSong
    } = useMutation(() => removeSongByYoutubeId(videoId, playlistId), {
        onSuccess
    })

    return {
        removedSong,
        removingSong,
        errorRemovingSong,
        removeSong,
        resetRemoveSong
    }
}

export default useRemoveSong
