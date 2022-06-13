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
