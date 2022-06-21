import { useMutation } from 'react-query'
import { addNewPlaylist } from '../services/playlistService'
import { useRouter } from 'next/router'
import { PlaylistInfo } from '../types/Playlist'

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
