import prisma from './prisma.js'
import { YouTubeVideo } from 'youtube-search-no-limit'

/**
 * Adds a song to a playlist.
 *
 * @param playlistId The ID of the playlist.
 * @param video The video to add.
 * @returns The added song.
 * @throws An error if the song could not be added to database.
 */
export const addNewSong = async (playlistId: string, video: YouTubeVideo) => {
    const song = prisma.song.create({
        data: {
            title: video.title,
            youtubeId: video.id,
            youtubeUrl: video.url,
            thumbnail: video.thumbnails[0].url,
            duration: video.duration,
            durationText: video.durationText,
            playlist: {
                connect: {
                    id: playlistId
                }
            }
        }
    })

    return song
}

/**
 * Gets all songs in the specified playlist.
 *
 * @param playlistId The ID of the playlist.
 * @returns The songs in the playlist.
 */
export const getSongsInPlaylist = async (playlistId: string) => {
    return await prisma.song.findMany({
        where: {
            playlist: {
                id: playlistId
            }
        }
    })
}

/**
 * Checks if a song is in a playlist.
 *
 * @param playlistId The ID of the playlist.
 * @param youtubeId The youtube ID of the song.
 * @returns True if the song is in the playlist, false otherwise.
 * @throws An error if the song could not be checked.
 */
export const getSongByPlaylistAndYoutubeId = async (
    playlistId: string,
    youtubeId: string
) => {
    return await prisma.song.findFirst({
        where: {
            AND: [{ playlist: { id: playlistId } }, { youtubeId }]
        }
    })
}

/**
 * Removes a song from a playlist.
 *
 * @param id The ID of the song.
 */
export const removeSongFromPlaylist = async (id: string) => {
    await prisma.song.delete({
        where: {
            id
        }
    })
}
