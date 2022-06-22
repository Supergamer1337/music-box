import { motion } from 'framer-motion'
import { useState } from 'react'
import useCreatePlaylist from '../hooks/useCreatePlaylist'
import Button from './Button'

interface Props {
    cancel: () => void
    onCreation: () => void
}

const CreatePlaylistForm = ({ cancel, onCreation }: Props) => {
    const [playlistName, setPlaylistName] = useState('')
    const { createPlaylist, creatingPlaylist, playlistCreationError } =
        useCreatePlaylist(playlistName, onCreation)

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                createPlaylist()
            }}
            className="w-[80vw]"
        >
            <p className="text-center">Give your playlist a name.</p>
            <input
                type="text"
                className="w-11/12 mx-auto block bg-emptyBg mt-2 rounded-md py-1 px-2 outline-none outline-0 focus:outline-2 outline-accent"
                placeholder="Playlist Name..."
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
            />

            <div className="flex gap-4 justify-center flex-wrap mt-4">
                <Button
                    type="button"
                    variant="secondary"
                    label="Cancel"
                    onClick={cancel}
                />
                <Button
                    variant="primary"
                    label="Create"
                    type="submit"
                    disabled={!playlistName || creatingPlaylist ? true : false}
                />
            </div>
            {playlistCreationError && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-2 text-center bg-red-700 rounded-md mt-5 overflow-hidden"
                >
                    {playlistCreationError}
                </motion.p>
            )}
        </form>
    )
}

export default CreatePlaylistForm
