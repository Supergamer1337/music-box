import React from 'react'
import { PlaylistInfo } from '../types/Playlist'
import Image from 'next/image'
import YtVideo from './../types/YtVideo.d'
import AddIconSVG from '../svg/AddIconSVG'

interface Props {
    playlist: PlaylistInfo
    videoToAdd: YtVideo
}

const AddToPlaylistItem = ({ playlist, videoToAdd }: Props) => {
    return (
        <div className="grid grid-cols-[min-content,auto,min-content] items-center w-4/5 mx-auto bg-secondaryBg p-2 rounded-md gap-2">
            <div className=" bg-blue-600 min-w-16 min-h-16 w-16 h-16 relative rounded-md select-none">
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
            <AddIconSVG className="w-8 h-8 hover:opacity-75 cursor-pointer" />
        </div>
    )
}

export default AddToPlaylistItem
