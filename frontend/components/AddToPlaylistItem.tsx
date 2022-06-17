import React from 'react'
import { PlaylistInfo } from '../types/Playlist'
import Image from 'next/image'
import YtVideo from './../types/YtVideo.d'
import AddIconSVG from '../svg/AddIconSVG'
import { useMutation, useQuery } from 'react-query'
import {
    addNewSong,
    checkYtVideoExistsInPlaylist,
    removeSongByYoutubeId
} from './../services/songService'
import LoadingSpinnerSVG from '../svg/LoadingSpinnerSVG'
import Tooltip from './Tooltip'
import CheckMarkIconSVG from '../svg/CheckMarkIconSVG'
interface Props {
    playlist: PlaylistInfo
    videoToAdd: YtVideo
}

const AddToPlaylistItem = ({ playlist, videoToAdd }: Props) => {
    const {
        data: youtubeVideoExists,
        isLoading: youtubeVideoExistsLoading,
        isError: youtubeVideoExistsError,
        refetch: youtubeVideoExistsRefetch
    } = useQuery(
        ['youtubeVideoExistsIn', playlist.id, videoToAdd.id],
        async () => checkYtVideoExistsInPlaylist(playlist.id, videoToAdd.id)
    )
    const {
        isSuccess: addIsSuccess,
        isLoading: addIsLoading,
        isError: addIsError,
        mutate: addMutate,
        reset: addReset
    } = useMutation(() => addNewSong(videoToAdd, playlist.id), {
        onSuccess: () => {
            deleteReset()
            youtubeVideoExistsRefetch()
        }
    })
    const {
        isSuccess: deleteIsSuccess,
        isLoading: deleteIsLoading,
        isError: deleteIsError,
        mutate: deleteMutate,
        reset: deleteReset
    } = useMutation(() => removeSongByYoutubeId(videoToAdd.id, playlist.id), {
        onSuccess: () => {
            addReset()
            youtubeVideoExistsRefetch()
        }
    })

    return (
        <div className="grid grid-cols-[min-content,auto,min-content] items-center w-4/5 mx-auto bg-secondaryBg p-2 rounded-md gap-2">
            <div className=" bg-accent min-w-16 min-h-16 w-16 h-16 relative rounded-md select-none">
                <Image
                    src={playlist.thumbnail || '/images/missing-playlist.png'}
                    alt={`${playlist.name}'s Thumbnail`}
                    layout="fill"
                    objectFit="fill"
                    className="rounded-md"
                />
            </div>
            <p title={playlist.name} className="text-lg truncate">
                {playlist.name}
            </p>
            <Tooltip
                message={
                    deleteIsError
                        ? 'Failed to delete song. Try again later.'
                        : 'Failed to add song. Try again later.'
                }
                onActive
                active={addIsError || deleteIsError}
                error
            >
                {/* Using display hidden instead of ternary operator, 
                or the UseOutsideDetection function in search box will 
                think it is clicked outside and close the menu. */}
                <LoadingSpinnerSVG
                    className={`${
                        !youtubeVideoExistsLoading &&
                        !addIsLoading &&
                        !deleteIsLoading
                            ? 'hidden'
                            : ''
                    } w-8 h-8 animate-spin cursor-pointer hover:opacity-75`}
                />
                <AddIconSVG
                    onClick={() => {
                        if (deleteIsError) return deleteMutate()
                        addMutate()
                    }}
                    className={`${
                        (addIsLoading ||
                            addIsSuccess ||
                            youtubeVideoExistsLoading ||
                            (youtubeVideoExists && !deleteIsSuccess)) &&
                        !deleteIsError
                            ? 'hidden'
                            : ''
                    } w-8 h-8 hover:opacity-75 cursor-pointer transition-all ${
                        addIsError || youtubeVideoExistsError || deleteIsError
                            ? 'rotate-45'
                            : ''
                    }`}
                />
                <CheckMarkIconSVG
                    onClick={() => deleteMutate()}
                    className={`${
                        addIsLoading ||
                        deleteIsLoading ||
                        deleteIsSuccess ||
                        deleteIsError ||
                        (!youtubeVideoExists && !addIsSuccess)
                            ? 'hidden'
                            : ''
                    } w-8 h-8 cursor-pointer hover:opacity-75`}
                />
            </Tooltip>
        </div>
    )
}

export default AddToPlaylistItem
