import React, { useState } from 'react'
import Image from 'next/image'
import PlayIconSVG from '../svg/PlayIconSVG'
import AddToPlaylistIconSVG from './../svg/AddToPlaylistIconSVG'
import AddToPlaylist from './AddToPlaylist'
import { AnimatePresence } from 'framer-motion'
import YouTubeVideo from './../types/youtube/YoutubeVideo.d'

interface Props {
    video: YouTubeVideo
}

const YtSearchResultItem = ({ video }: Props) => {
    const [showAddPlaylist, setShowAddPlaylist] = useState(false)

    return (
        <>
            <div className="bg-secondaryBg grid grid-flow-col grid-cols-[min-content,auto] p-2 gap-2 rounded-md border-[1px] border-discordBorder">
                <div className="w-24 h-24 relative block">
                    <Image
                        src={video.thumbnails[0].url}
                        alt={`${video.title}'s Thumbnail`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                    <p className="absolute bg-emptyBg bottom-1 right-1 px-[4px] pt-[2px] text-sm rounded-md border-[1px] border-discordBorder">
                        {video.durationText}
                    </p>
                </div>
                <div className="grid grid-flow-row grid-rows-[max-content,min-content]">
                    <p className="line-clamp-2 h-[3rem] font-semibold">
                        {video.title}
                    </p>
                    <div className="flex flex-row gap-4 items-center mt-3">
                        <PlayIconSVG className="w-5 h-5 cursor-pointer hover:opacity-75 transition-opacity" />
                        <AddToPlaylistIconSVG
                            onClick={() => setShowAddPlaylist(true)}
                            className="w-8 h-4 cursor-pointer hover:opacity-75 transition-opacity"
                        />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showAddPlaylist && (
                    <AddToPlaylist
                        hideFunction={() => setShowAddPlaylist(false)}
                        video={video}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default YtSearchResultItem
