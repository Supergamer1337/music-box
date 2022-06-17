import prisma from './prismaService.js'

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
    return await prisma.playlist.findMany({
        where: {
            guildId
        },
        orderBy: {
            name: 'asc'
        }
    })
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
