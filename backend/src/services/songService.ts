import type YtVideo from '../types/YtVideo.d'
import prisma from './prismaService'

/**
 * Adds a song to a playlist.
 *
 * @param playlistId The ID of the playlist.
 * @param video The video to add.
 * @returns The added song.
 * @throws An error if the song could not be added to database.
 */
export const addNewSong = async (playlistId: string, video: YtVideo) => {
    return await prisma.song.create({
        data: {
            title: video.title,
            youtubeId: video.id,
            youtubeUrl: video.url,
            thumbnail: video.thumbnail,
            duration: video.duration,
            playlist: {
                connect: {
                    id: playlistId
                }
            }
        }
    })
}
