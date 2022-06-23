import React from 'react'
import { PlaylistInfo } from '../types/Playlist'
import Image from 'next/image'
import YtVideo from './../types/YtVideo.d'
import AddIconSVG from '../svg/AddIconSVG'
import LoadingSpinnerSVG from '../svg/LoadingSpinnerSVG'
import Tooltip from './Tooltip'
import CheckMarkIconSVG from '../svg/CheckMarkIconSVG'
import useSongAdderRemover from './../hooks/useSongAdderRemover'

interface Props {
    playlist: PlaylistInfo
    video: YtVideo
}

const AddToPlaylistItem = ({ playlist, video }: Props) => {
    const { videoExists, isLoading, isError, error, mutate } =
        useSongAdderRemover(video, playlist.id)

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
                message={error ? error : 'No error was provided'}
                onActive
                active={isError}
                error
            >
                <div
                    onClick={() => {
                        if (isLoading) return
                        mutate()
                    }}
                >
                    {/* Using display hidden instead of ternary operator, 
                    or the UseOutsideDetection function in search box will 
                    think it is clicked outside and close the menu. */}
                    <LoadingSpinnerSVG
                        className={`${
                            !isLoading ? 'hidden' : ''
                        } w-8 h-8 animate-spin cursor-pointer hover:opacity-75`}
                    />
                    <CheckMarkIconSVG
                        className={`${
                            !videoExists || isLoading ? 'hidden' : ''
                        } w-8 h-8 cursor-pointer hover:opacity-75`}
                    />
                    <AddIconSVG
                        className={`${
                            videoExists || isLoading ? 'hidden' : ''
                        } w-8 h-8 hover:opacity-75 cursor-pointer transition-all ${
                            isError ? 'rotate-45' : ''
                        }`}
                    />
                </div>
            </Tooltip>
        </div>
    )
}

export default AddToPlaylistItem
