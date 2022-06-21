import { useMutation } from 'react-query'
import { removeSongByYoutubeId } from '../services/songService'

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
