import { playlistsSongCountConversion } from './conversion.js'
import prisma from './prisma.js'

/**
 * Creates a new playlist.
 *
 * @param name The name of the playlist.
 * @param guildId The ID of the guild the playlist should be created for.
 * @returns The created playlist.
 * @throws An error if the playlist could not be created.
 */
export const createPlaylist = async (name: string, guildId: string) => {
    return await prisma.playlist.create({
        data: {
            name,
            guildId
        }
    })
}

/**
 * Gets all playlists for a guild.
 *
 * @param guildId The ID of the guild.
 * @returns The playlists for the guild.
 * @throws An error if the playlists could not be fetched.
 */
export const getGuildPlaylists = async (guildId: string) => {
    const playlists = await prisma.playlist.findMany({
        where: {
            guildId
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            _count: {
                select: {
                    songs: true
                }
            }
        }
    })

    return playlistsSongCountConversion(playlists)
}

/**
 * Gets a playlist by ID.
 *
 * @param id The ID of the playlist.
 * @returns The playlist, or null if it could not be found.
 */
export const getPlaylist = async (id: string) => {
    return await prisma.playlist.findUnique({
        where: {
            id
        }
    })
}

/**
 * Gets a playlist by ID, including all songs.
 *
 * @param id The ID of the playlist.
 * @returns The playlist, or null if it could not be found.
 */
export const getExtendedPlaylist = async (id: string) => {
    return await prisma.playlist.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            guildId: true,
            createdAt: true,
            updatedAt: true,
            songs: {
                select: {
                    id: true,
                    title: true,
                    youtubeId: true,
                    youtubeUrl: true,
                    thumbnail: true,
                    duration: true,
                    durationText: true,
                    playlistPos: true
                },
                orderBy: {
                    playlistPos: 'asc'
                }
            }
        }
    })
}
