import React from 'react'
import BackArrowIconSVG from '../svg/BackArrowIconSVG'
import Button from './Button'

interface Props {
    hideFunction: () => void
}

const AddToPlaylist = ({ hideFunction }: Props) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-primaryBg z-[101]">
            <div className="p-4 flex">
                <BackArrowIconSVG
                    onClick={hideFunction}
                    className="w-7 h-7 hover:opacity-75 transition-opacity cursor-pointer"
                />
                <h2 className="text-xl font-bold absolute left-[50%] translate-x-[-50%] inline-block w-fit">
                    Add To Playlist
                </h2>
            </div>
            <div className="text-center mt-4">
                <Button label="New Playlist" />
            </div>

            <input
                type="text"
                className="w-4/5 block mx-auto mt-10 bg-emptyBg rounded-md py-1 px-2 outline-none outline-0 focus:outline-2 outline-accent"
                placeholder="Filter Playlists..."
            />
        </div>
    )
}

export default AddToPlaylist
