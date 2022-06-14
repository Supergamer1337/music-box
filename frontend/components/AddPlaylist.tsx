import React from 'react'
import BackArrowIconSVG from './../svg/BackArrowIconSVG'

interface Props {
    hideFunction: () => void
}

const AddPlaylist = ({ hideFunction }: Props) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-primaryBg z-[101]">
            <div className="p-4 flex">
                <BackArrowIconSVG
                    onClick={hideFunction}
                    className="w-8 h-8 hover:opacity-75 transition-opacity cursor-pointer"
                />
                <h2 className="text-xl font-bold absolute left-[50%] translate-x-[-50%] inline-block w-fit">
                    Add To Playlist
                </h2>
            </div>
        </div>
    )
}

export default AddPlaylist
