import { getDiscordUserGuilds } from './guild.js'
import { z } from 'zod'

/**
 * Validates that the given user has the correct rights for the given guild.
 *
 * @param access_token The user's Discord access token.
 * @param guildId The guild ID.
 * @returns True if the user has the correct rights for the given guild, false otherwise.
 * @throws An error if the request failed.
 */
export const validGuildPermissions = async (
    access_token: string,
    guildId: string
): Promise<boolean> => {
    const guilds = await getDiscordUserGuilds(access_token)
    const guild = guilds.find((g) => g.id === guildId)

    if (guild?.owner) {
        return true
    } else {
        return false
    }
}

/**
 * Returns a zod schema for a youtube video.
 *
 * @returns A zod schema for a youtube video.
 */
export const validZodYtVideo = () => {
    return z.object({
        id: z.string(),
        title: z.string(),
        thumbnails: z
            .array(
                z.object({
                    url: z.string()
                })
            )
            .min(1),
        duration: z.number().int(),
        durationText: z.string(),
        url: z.string().url()
    })
}
