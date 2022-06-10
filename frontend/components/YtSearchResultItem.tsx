import React from 'react'
import YtVideo from '../types/YtVideo'
import Image from 'next/image'

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
            <div>
                <p className="line-clamp-2 max-h-[3rem]">{video.title}</p>
            </div>
        </div>
    )
}

export default YtSearchResultItem
