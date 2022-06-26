import React from 'react'
import TextField from './TextField'
import usePlaylists from './../hooks/usePlaylists'
import LoadingSpinnerSVG from '../svg/LoadingSpinnerSVG'
import ErrorDiv from './ErrorDiv'
import PlaylistItem from './PlaylistItem'

interface Props {
    chosenSection: string
}

const PlaylistsComponent = ({ chosenSection }: Props) => {
    const { playlists, loadingPlaylists, playlistsError } = usePlaylists()

    return (
        <div className={chosenSection === 'playlists' ? '' : 'hidden'}>
            <TextField fieldSize="section" placeholder="Search playlists..." />

            {loadingPlaylists ? (
                <div className="block mx-auto mt-8 text-center">
                    <LoadingSpinnerSVG className="block mx-auto w-16 h-16 animate-spin" />
                    <h3 className="mt-2 text-lg font-medium">
                        Loading the playlists.
                    </h3>
                </div>
            ) : playlistsError ? (
                <ErrorDiv size="large">{playlistsError}</ErrorDiv>
            ) : (
                <div className="flex flex-col gap-4 w-10/12 mx-auto mb-24">
                    {playlists?.map((playlist) => (
                        <PlaylistItem key={playlist.id} playlist={playlist} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default PlaylistsComponent
