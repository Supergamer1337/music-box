import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { addNewSong, removeSongByYoutubeId } from './../services/songService'
import YouTubeVideo from './../types/youtube/YoutubeVideo.d'
import useYoutubeVideoExists from './useYoutubeVideoExists'

/**
 * Hook to toggle between adding or removing a song from a playlist.
 *
 * @param video The video to add or remove from the playlist.
 * @param playlistId The playlist to add or remove the video from.
 * @returns An object with the following properties:
 * - videoExists: Whether the video exists in the playlist.
 * - isLoading: Whether the song status is being updated.
 * - isError: Whether the song status is erroring.
 * - error: The error message if the song status is erroring.
 * - mutate: A function to add or remove the song.
 */
const useSongAdderRemover = (video: YouTubeVideo, playlistId: string) => {
    const queryClient = useQueryClient()
    const router = useRouter()

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
            onSuccess: async () => {
                await refetchYoutubeVideoExists()
                queryClient.invalidateQueries([
                    'playlists',
                    router.query.guildId
                ])
            }
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
