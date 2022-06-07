import { RESTGetAPICurrentUserGuildsResult } from '.pnpm/discord-api-types@0.30.0/node_modules/discord-api-types/v10'
import { getRequest, handleRequestError } from './requestService.js'

/**
 * Gets the user's Discord guilds.
 * @param accessToken The user's Discord access token.
 * @returns The user's Discord guilds.
 * @throws An error if the request failed.
 */
export const getDiscordUserGuilds = async (accessToken: string) => {
    try {
        return (await getRequest(
            'https://discord.com/api/v10/users/@me/guilds',
            {
                Authorization: `Bearer ${accessToken}`
            }
        )) as RESTGetAPICurrentUserGuildsResult
    } catch (errorResponse: any) {
        return handleRequestError(errorResponse, 'getDiscordUserGuilds')
    }
}

/**
 * Gets guild data from Discord for the given guild ID.
 * @param guildId The guild ID.
 * @returns The guild data.
 * @throws An error if the request failed.
 */
export const getDiscordGuild = async (guildId: string) => {
    try {
        return await getRequest(
            'https://discord.com/api/v10/guilds/' + guildId,
            {
                Authorization: `Bot ${process.env.BOT_TOKEN}`
            }
        )
    } catch (errorResponse: any) {
        return handleRequestError(errorResponse, 'getDiscordGuild')
    }
}
