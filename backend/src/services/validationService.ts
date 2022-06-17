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
        // Hack: This should be fixed using caching or a better error handling mechanism in the future.
        // If checking the guild permissions fails, check if it was because of a rate limit.
        if (error?.rateLimited) {
            // If it was rate limited, wait for the rate limit to expire and try again.
            return new Promise(async (resolve, reject) => {
                setTimeout(async () => {
                    try {
                        const hasPermission = await validGuildPermissions(
                            access_token,
                            guildId
                        )
                        resolve(hasPermission)
                    } catch (error) {
                        reject(error)
                    }
                }, error.retryAfter * 1000)
            })
        } else {
            // If it wasn't rate limited, throw the error.
            throw error
        }
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

/**
 * Checks if the given value is a string.
 *
 * @param value The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export const isString = (value: any): boolean => {
    if (typeof value === 'string') {
        return true
    }
    return false
}
