import { useMutation } from 'react-query'
import { addNewSong, removeSongByYoutubeId } from './../services/songService'
import YtVideo from './../types/YtVideo.d'
import useYoutubeVideoExists from './useYoutubeVideoExists'

const useSongAdderRemover = (video: YtVideo, playlistId: string) => {
    const {
        youtubeVideoExists,
        loadingYoutubeVideoExists,
        youtubeVideoExistsError,
        youtubeVideoExistsIsError,
        refetchYoutubeVideoExists
    } = useYoutubeVideoExists(playlistId, video.id)

    const { isLoading, isError, error, mutate } = useMutation<void, string>(
        async () => {
            if (!youtubeVideoExists) return addNewSong(video, playlistId)
            return removeSongByYoutubeId(video.id, playlistId)
        },
        {
            onSuccess: () => refetchYoutubeVideoExists()
        }
    )

    return {
        videoExists: youtubeVideoExists,
        isLoading:
            isLoading ||
            loadingYoutubeVideoExists ||
            youtubeVideoExists === undefined,
        isError: isError || youtubeVideoExistsIsError,
        error: error || youtubeVideoExistsError,
        mutate
    }
}

export default useSongAdderRemover
