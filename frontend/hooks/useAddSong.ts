import { useMutation } from 'react-query'
import { addNewSong } from '../services/songService'
import YtVideo from './../types/YtVideo.d'

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
