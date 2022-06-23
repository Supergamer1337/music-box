import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import PlayIconSVG from '../svg/PlayIconSVG'
import AddToPlaylistIconSVG from './../svg/AddToPlaylistIconSVG'
import YouTubeVideo from './../types/youtube/YoutubeVideo.d'

interface Props {
    video: YouTubeVideo
    addToPlaylist: (video: YouTubeVideo) => void
    highlightAdd?: boolean
}

const YtSearchResultItem = ({
    video,
    addToPlaylist,
    highlightAdd = false
}: Props) => {
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
                            onClick={() => addToPlaylist(video)}
                            className={`w-8 h-4 cursor-pointer hover:opacity-75 transition ${
                                highlightAdd ? 'fill-accent' : 'fill-white'
                            }`}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default YtSearchResultItem
