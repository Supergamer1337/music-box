import Image from 'next/image'
import useWebsocket from '../hooks/useWebsocket'
import PlayIconSVG from '../svg/PlayIconSVG'
import ShuffleIconSVG from '../svg/ShuffleIconSVG'
import { PlaylistInfo } from '../types/Playlist'
import ThreeDotIconSVG from './../svg/ThreeDotIconSVG'
import Tooltip from './Tooltip'

interface Props {
    playlist: PlaylistInfo
}

const PlaylistItem = ({ playlist }: Props) => {
    const socket = useWebsocket()

    const playPlaylist = () => {
        if (!socket?.connected) return
        socket.emit('play-playlist', playlist.id)
    }

    return (
        <div className="bg-secondaryBg p-2 rounded-md border-discordBorder border-[1px] flex gap-2">
            <div className=" bg-accent min-w-[5rem] min-h-[5rem] relative rounded-md select-none">
                <Image
                    src={playlist.thumbnail || '/images/missing-playlist.png'}
                    alt={`${playlist.name}'s Thumbnail`}
                    layout="fill"
                    objectFit="fill"
                    className="rounded-md"
                />
            </div>

            <div className="flex flex-col flex-grow">
                <div className="grid items-center grid-cols-[auto,max-content] grid-rows-1 gap-1">
                    <Tooltip direction="top" message={playlist.name}>
                        <h4 className="min-w-full text-lg font-semibold select-none line-clamp-1">
                            {playlist.name}
                        </h4>
                    </Tooltip>

                    <p className="font-light select-none">
                        {playlist.nrOfSongs > 0
                            ? `${playlist.nrOfSongs} song${
                                  playlist.nrOfSongs > 1 ? 's' : ''
                              }`
                            : 'No songs'}
                    </p>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <PlayIconSVG
                                onClick={playPlaylist}
                                className="w-6 transition-opacity cursor-pointer hover:opacity-75 "
                            />
                            <ShuffleIconSVG className="w-6 transition-opacity cursor-pointer hover:opacity-75 fill-white" />
                        </div>
                        <ThreeDotIconSVG className="w-6 transition-opacity cursor-pointer hover:opacity-75 fill-white" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistItem
