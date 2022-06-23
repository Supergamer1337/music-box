import { useMutation } from 'react-query'
import { addNewSong } from '../services/songService'
import YtVideo from './../types/YtVideo.d'

/**
 * Hook to add a new song to the playlist.
 *
 * @param video The video to add to the playlist.
 * @param playlistId The playlist to add the video to.
 * @param onSuccess Callback to execute when the song is added successfully.
 * @returns An object with the following properties:
 * - addingSong: Whether the song is being added.
 * - addSong: A function to add the song.
 * - errorAddingSong: If adding the song is erroring.
 * - resetAddSong: A function to reset the add song state.
 * - addedSong: Whether the song was added.
 */
const useAddSong = (
    video: YtVideo,
    playlistId: string,
    onSuccess?: () => void
) => {
    const {
        isSuccess: addedSong,
        isLoading: addingSong,
        isError: errorAddingSong,
        mutate: addSong,
        reset: resetAddSong
    } = useMutation(() => addNewSong(video, playlistId), {
        onSuccess
    })

    return {
        addedSong,
        addingSong,
        errorAddingSong,
        addSong,
        resetAddSong
    }
}

export default useAddSong
