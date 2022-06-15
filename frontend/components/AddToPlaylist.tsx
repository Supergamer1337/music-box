import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import BackArrowIconSVG from '../svg/BackArrowIconSVG'
import Button from './Button'
import Dialog from './Dialog'
import { useMutation, useQuery } from 'react-query'
import { addNewPlaylist, getPlaylists } from './../services/playlistService'
import { PlaylistInfo } from './../types/Playlist.d'
import { useRouter } from 'next/router'
import LoadingSpinnerSVG from './../svg/LoadingSpinnerSVG'

interface Props {
    hideFunction: () => void
}

const AddToPlaylist = ({ hideFunction }: Props) => {
    const [showDialog, setShowDialog] = useState(false)
    const [playlistName, setPlaylistName] = useState('')
    const router = useRouter()
    const {
        mutate,
        isLoading: isLoadingPlaylistCreation,
        isError: isErrorPlaylistCreation,
        error: errorPlaylistCreation
    } = useMutation<PlaylistInfo, string>(
        () => addNewPlaylist(playlistName, router.query.guildId as string),
        {
            onSuccess(_, __, ___) {
                refetchPlaylists()
                setShowDialog(false)
                setPlaylistName('')
            }
        }
    )
    const {
        data: playlists,
        isLoading: isLoadingPlaylists,
        isError: isErrorPlaylists,
        error: errorPlaylists,
        refetch: refetchPlaylists
    } = useQuery<PlaylistInfo[], string>(
        ['playlists', router.query.guildId],
        () => getPlaylists(router.query.guildId as string)
    )

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

            {isLoadingPlaylists && (
                <div>
                    <LoadingSpinnerSVG className=" w-12 h-12 mx-auto mt-4 animate-spin" />
                    <p className="text-lg text-center">Loading playlists...</p>
                </div>
            )}

            {isErrorPlaylists && (
                <p className="p-2 text-center bg-red-700 rounded-md mt-5 text-lg mx-4">
                    Could not fetch playlists... Please try again later.
                </p>
            )}

            {playlists && playlists.length > 0 ? (
                <p>Found playlists!</p>
            ) : (
                <>
                    <p className="text-lg px-2 mt-4 text-center">
                        No playlists exists for this server...
                    </p>
                    <p className="text-lg px-2 text-center">Add one above.</p>
                </>
            )}

            <Dialog
                active={showDialog}
                hideFunction={() => setShowDialog(false)}
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        mutate()
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
                            type="secondary"
                            label="Cancel"
                            onClick={() => setShowDialog(false)}
                        />
                        <Button
                            type="primary"
                            label="Create"
                            inputType="submit"
                            disabled={
                                !playlistName || isLoadingPlaylistCreation
                                    ? true
                                    : false
                            }
                        />
                    </div>
                    {isErrorPlaylistCreation ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-2 text-center bg-red-700 rounded-md mt-5 overflow-hidden"
                        >
                            {errorPlaylistCreation}
                        </motion.p>
                    ) : (
                        ''
                    )}
                </form>
            </Dialog>
        </motion.div>
    )
}

export default AddToPlaylist
