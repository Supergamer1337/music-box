import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getPlaylists } from '../services/playlistService'
import { PlaylistInfo } from '../types/Playlist'

/**
 * Hook to get the guild's playlists.
 *
 * @returns An object with the following properties:
 * - playlists: The guild's playlists.
 * - loadingPlaylists: Whether the playlists are being loaded.
 * - playlistsError: The error message if the playlists are not loaded.
 * - refetchPlaylists: A function to refetch the playlists.
 */
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
