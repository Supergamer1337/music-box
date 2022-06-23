import { useMutation } from 'react-query'
import { addNewPlaylist } from '../services/playlistService'
import { useRouter } from 'next/router'
import { PlaylistInfo } from '../types/Playlist'

/**
 * Hook to add a new playlist.
 *
 * @param playlistName The name of the playlist to add.
 * @param onSuccess Callback to execute when the playlist is added successfully.
 * @returns An object with the following properties:
 * - creatingPlaylist: Whether the playlist is being created.
 * - createPlaylist: A function to create the playlist.
 * - playlistCreationError: The error message if the playlist creation fails.
 */
const useCreatePlaylist = (playlistName: string, onSuccess: () => void) => {
    const router = useRouter()
    const { guildId } = router.query

    const {
        mutate: createPlaylist,
        isLoading: creatingPlaylist,
        error: playlistCreationError
    } = useMutation<PlaylistInfo, string>(
        () => addNewPlaylist(playlistName, guildId as string),
        {
            onSuccess
        }
    )

    return {
        createPlaylist,
        creatingPlaylist,
        playlistCreationError
    }
}

export default useCreatePlaylist
