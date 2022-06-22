import { useQuery } from 'react-query'
import { checkYtVideoExistsInPlaylist } from '../services/songService'

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
