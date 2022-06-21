import React, { useState } from 'react'
import { PlaylistInfo } from '../types/Playlist'
import Image from 'next/image'
import YtVideo from './../types/YtVideo.d'
import AddIconSVG from '../svg/AddIconSVG'
import LoadingSpinnerSVG from '../svg/LoadingSpinnerSVG'
import Tooltip from './Tooltip'
import CheckMarkIconSVG from '../svg/CheckMarkIconSVG'
import useYoutubeVideoExists from '../hooks/useYoutubeVideoExists'
import useAddSong from './../hooks/useAddSong'
import useRemoveSong from './../hooks/useRemoveSong'

interface Props {
    playlist: PlaylistInfo
    video: YtVideo
}

const AddToPlaylistItem = ({ playlist, video }: Props) => {
    const {
        youtubeVideoExists,
        loadingYoutubeVideoExists,
        youtubeVideoExistsError,
        refetchYoutubeVideoExists
    } = useYoutubeVideoExists(playlist.id, video.id)
    const { addSong, addedSong, addingSong, errorAddingSong, resetAddSong } =
        useAddSong(video, playlist.id, () => {
            resetRemoveSong()
            refetchYoutubeVideoExists()
        })
    const {
        removedSong,
        removingSong,
        errorRemovingSong,
        removeSong,
        resetRemoveSong
    } = useRemoveSong(video.id, playlist.id, () => {
        resetAddSong()
        refetchYoutubeVideoExists()
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
                    errorRemovingSong
                        ? 'Failed to delete song. Try again later.'
                        : 'Failed to add song. Try again later.'
                }
                onActive
                active={errorAddingSong || errorRemovingSong}
                error
            >
                <div
                    onClick={() => {
                        if (
                            addedSong ||
                            youtubeVideoExists ||
                            youtubeVideoExistsError ||
                            errorAddingSong
                        )
                            return removeSong()
                        if (
                            removedSong ||
                            !youtubeVideoExists ||
                            errorRemovingSong
                        )
                            return addSong()
                    }}
                >
                    {/* Using display hidden instead of ternary operator, 
                    or the UseOutsideDetection function in search box will 
                    think it is clicked outside and close the menu. */}
                    <LoadingSpinnerSVG
                        className={`${
                            !loadingYoutubeVideoExists &&
                            !addingSong &&
                            !removingSong
                                ? 'hidden'
                                : ''
                        } w-8 h-8 animate-spin cursor-pointer hover:opacity-75`}
                    />
                    <CheckMarkIconSVG
                        className={`${
                            addingSong ||
                            removingSong ||
                            removedSong ||
                            errorRemovingSong ||
                            (!youtubeVideoExists && !addedSong)
                                ? 'hidden'
                                : ''
                        } w-8 h-8 cursor-pointer hover:opacity-75`}
                    />
                    <AddIconSVG
                        className={`${
                            (addingSong ||
                                addedSong ||
                                loadingYoutubeVideoExists ||
                                (youtubeVideoExists && !removedSong)) &&
                            !errorAddingSong
                                ? 'hidden'
                                : ''
                        } w-8 h-8 hover:opacity-75 cursor-pointer transition-all ${
                            errorAddingSong ||
                            youtubeVideoExistsError ||
                            errorRemovingSong
                                ? 'rotate-45'
                                : ''
                        }`}
                    />
                </div>
            </Tooltip>
        </div>
    )
}

export default AddToPlaylistItem
