import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getPlaylists } from '../services/playlistService'
import { PlaylistInfo } from '../types/Playlist'

const usePlaylists = () => {
    const router = useRouter()
    const { guildId } = router.query

    const {
        data: playlists,
        isLoading: loadingPlaylists,
        error: playlistsError,
        refetch: refetchPlaylists
    } = useQuery<PlaylistInfo[], string>(
        ['playlists', router.query.guildId],
        () => getPlaylists(guildId as string)
    )

    return {
        playlists,
        loadingPlaylists,
        playlistsError,
        refetchPlaylists
    }
}

export default usePlaylists
