import React from 'react'
import YtVideo from '../types/YtVideo'
import Image from 'next/image'
import PlayIconSVG from '../svg/PlayIconSVG'
import AddToPlaylistIconSVG from './../svg/AddToPlaylistIconSVG'

interface Props {
    video: YtVideo
}

const YtSearchResultItem = ({ video }: Props) => {
    return (
        <div className="bg-secondaryBg grid grid-flow-col grid-cols-[min-content,auto] p-2 gap-2 rounded-md border-[1px] border-discordBorder">
            <div className="w-24 h-24 relative block">
                <Image
                    src={video.thumbnail}
                    alt={`${video.title}'s Thumbnail`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
                <p className="absolute bg-emptyBg bottom-1 right-1 p-1 text-sm rounded-md">
                    {video.duration}
                </p>
            </div>
            <div className="grid grid-flow-row grid-rows-[max-content,min-content]">
                <p className="line-clamp-2 h-[3rem] font-semibold">
                    {video.title}
                </p>
                <div className="flex flex-row gap-4 items-center mt-3">
                    <PlayIconSVG className="w-5 h-5 cursor-pointer hover:opacity-75 transition-opacity" />
                    <AddToPlaylistIconSVG className="w-8 h-4 cursor-pointer hover:opacity-75 transition-opacity" />
                </div>
            </div>
        </div>
    )
}

export default YtSearchResultItem
