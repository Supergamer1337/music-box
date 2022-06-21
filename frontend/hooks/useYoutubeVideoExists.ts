import { useQuery } from 'react-query'
import { checkYtVideoExistsInPlaylist } from '../services/songService'

const useYoutubeVideoExists = (playlistId: string, videoId: string) => {
    const {
        data: youtubeVideoExists,
        isLoading: loadingYoutubeVideoExists,
        isError: youtubeVideoExistsError,
        refetch: refetchYoutubeVideoExists
    } = useQuery(['youtubeVideoExistsIn', playlistId, videoId], async () =>
        checkYtVideoExistsInPlaylist(playlistId, videoId)
    )

    return {
        youtubeVideoExists,
        loadingYoutubeVideoExists,
        youtubeVideoExistsError,
        refetchYoutubeVideoExists
    }
}

export default useYoutubeVideoExists
