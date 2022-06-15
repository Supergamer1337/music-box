import { getDiscordUserGuilds } from './guildService.js'

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
    try {
        return await checkGuildPermissions(access_token, guildId)
    } catch (error: any) {
        if (error?.rateLimited) {
            return new Promise(async (resolve, reject) => {
                setTimeout(async () => {
                    try {
                        return resolve(
                            await checkGuildPermissions(access_token, guildId)
                        )
                    } catch (error) {
                        reject(error)
                    }
                }, error.retryAfter * 1000)
            })
        }

        throw error
    }
}

const checkGuildPermissions = async (access_token: string, guildId: string) => {
    const guild = (await getDiscordUserGuilds(access_token)).find(
        (guild) => guild.id === guildId
    )

    if (guild?.owner) {
        return true
    } else {
        return false
    }
}
