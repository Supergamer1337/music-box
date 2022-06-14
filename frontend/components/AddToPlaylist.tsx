import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import BackArrowIconSVG from '../svg/BackArrowIconSVG'
import Button from './Button'
import Dialog from './Dialog'

interface Props {
    hideFunction: () => void
}

const AddToPlaylist = ({ hideFunction }: Props) => {
    const [showDialog, setShowDialog] = useState(false)
    const [playlistName, setPlaylistName] = useState('')

    return (
        <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ bounce: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-primaryBg z-[101]"
        >
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
                <Button
                    label="New Playlist"
                    onClick={() => setShowDialog(true)}
                />
            </div>

            <input
                type="text"
                className="w-4/5 block mx-auto mt-10 bg-emptyBg rounded-md py-1 px-2 outline-none outline-0 focus:outline-2 outline-accent"
                placeholder="Filter Playlists..."
            />

            <Dialog
                active={showDialog}
                hideFunction={() => setShowDialog(false)}
            >
                <div className="w-[80vw]">
                    <p className="text-center">Give your playlist a name.</p>
                    <input
                        type="text"
                        className="w-11/12 mx-auto block bg-emptyBg mt-2 rounded-md py-1 px-2 outline-none outline-0 focus:outline-2 outline-accent"
                        placeholder="Playlist Name..."
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                    <div className="flex gap-4 justify-center flex-wrap mt-4">
                        <Button
                            type="secondary"
                            label="Cancel"
                            onClick={() => setShowDialog(false)}
                        />
                        <Button
                            type="primary"
                            label="Create"
                            disabled={!playlistName ? true : false}
                        />
                    </div>
                </div>
            </Dialog>
        </motion.div>
    )
}

export default AddToPlaylist
