import usePlaylists from '../hooks/usePlaylists'
import LoadingSpinnerSVG from '../svg/LoadingSpinnerSVG'
import ErrorDiv from './ErrorDiv'
import PlaylistItem from './PlaylistItem'
import TextField from './TextField'

interface Props {
    chosenSection: string
}

const Playlists = ({ chosenSection }: Props) => {
    const { playlists, loadingPlaylists, playlistsError } = usePlaylists()

    return (
        <div className={chosenSection === 'playlists' ? '' : 'hidden'}>
            <TextField fieldSize="section" placeholder="Search playlists..." />

            {loadingPlaylists ? (
                <div className="block mx-auto mt-8 text-center">
                    <LoadingSpinnerSVG className="block w-16 h-16 mx-auto animate-spin" />
                    <h3 className="mt-2 text-lg font-medium">
                        Loading the playlists.
                    </h3>
                </div>
            ) : playlistsError ? (
                <ErrorDiv size="large">{playlistsError}</ErrorDiv>
            ) : (
                <div className="flex flex-col w-10/12 gap-4 mx-auto mb-24">
                    {playlists?.map((playlist) => (
                        <PlaylistItem key={playlist.id} playlist={playlist} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Playlists
