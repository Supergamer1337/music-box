import { motion } from 'framer-motion'
import React, { useState } from 'react'
import BackArrowIconSVG from '../svg/BackArrowIconSVG'
import Button from './Button'
import Dialog from './Dialog'
import LoadingSpinnerSVG from './../svg/LoadingSpinnerSVG'
import AddToPlaylistItem from './AddToPlaylistItem'
import usePlaylists from './../hooks/usePlaylists'
import CreatePlaylistForm from './CreatePlaylistForm'
import TextField from './TextField'
import ErrorDiv from './ErrorDiv'
import YouTubeVideo from './../types/youtube/YoutubeVideo.d'

interface Props {
    hideFunction: () => void
    video: YouTubeVideo
}

const AddToPlaylist = ({ hideFunction, video }: Props) => {
    const [showDialog, setShowDialog] = useState(false)
    const [playlistSearchTerm, setPlaylistSearchTerm] = useState('')
    const { playlists, loadingPlaylists, playlistsError, refetchPlaylists } =
        usePlaylists()

    return (
        <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ bounce: 0 }}
            className="fixed top-0 left-0 w-full h-[100vh] sm:w-[30rem] bg-primaryBg z-[101] overflow-y-auto pb-4"
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

            <TextField
                className="!bg-emptyBg"
                fieldSize="section"
                placeholder="Filter Playlists..."
                value={playlistSearchTerm}
                onChange={(e) => setPlaylistSearchTerm(e.target.value)}
            />

            {loadingPlaylists && (
                <div>
                    <LoadingSpinnerSVG className=" w-12 h-12 mx-auto mt-4 animate-spin" />
                    <p className="text-lg text-center">Loading playlists...</p>
                </div>
            )}

            {playlistsError && (
                <ErrorDiv size="large">{playlistsError}</ErrorDiv>
            )}

            <div className="flex flex-col gap-2 mt-4">
                {!loadingPlaylists &&
                    !playlistsError &&
                    (playlists && playlists.length > 0 ? (
                        playlists
                            ?.filter((playlist) =>
                                playlist.name
                                    .toLowerCase()
                                    .includes(playlistSearchTerm.toLowerCase())
                            )
                            .map((playlist) => (
                                <AddToPlaylistItem
                                    key={playlist.id}
                                    playlist={playlist}
                                    video={video}
                                />
                            ))
                    ) : (
                        <>
                            <p className="text-lg px-2 mt-4 text-center">
                                No playlists exists for this server...
                            </p>
                            <p className="text-lg px-2 text-center">
                                Add one above.
                            </p>
                        </>
                    ))}
            </div>

            <Dialog
                active={showDialog}
                hideFunction={() => setShowDialog(false)}
            >
                <CreatePlaylistForm
                    cancel={() => setShowDialog(false)}
                    onCreation={async () => {
                        await refetchPlaylists()
                        setShowDialog(false)
                    }}
                />
            </Dialog>
        </motion.div>
    )
}

export default AddToPlaylist
