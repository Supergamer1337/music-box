import type YtVideo from '../types/YtVideo.d'
import prisma from './prismaService.js'

/**
 * Adds a song to a playlist.
 *
 * @param playlistId The ID of the playlist.
 * @param video The video to add.
 * @returns The added song.
 * @throws An error if the song could not be added to database.
 */
export const addNewSong = async (playlistId: string, video: YtVideo) => {
    const [song] = await prisma.$transaction([
        prisma.song.create({
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
        }),
        prisma.playlist.update({
            where: {
                id: playlistId
            },
            data: {
                nrOfSongs: {
                    increment: 1
                }
            }
        })
    ])

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
