import {
    RESTGetAPICurrentUserGuildsResult,
    RESTGetAPIGuildResult
} from 'discord-api-types/v10'
import {
    cachedDiscordGetRequest,
    getRequest,
    handleRequestError
} from './request.js'

/**
 * Gets the user's Discord guilds.
 * @param accessToken The user's Discord access token.
 * @returns The user's Discord guilds.
 * @throws An error if the request failed.
 */
export const getDiscordUserGuilds = async (accessToken: string) => {
    try {
        return await cachedDiscordGetRequest<RESTGetAPICurrentUserGuildsResult>(
            accessToken,
            '/users/@me/guilds',
            accessToken,
            { staleTime: 5000 }
        )
    } catch (errorResponse: any) {
        throw await handleRequestError(errorResponse, 'getDiscordUserGuilds')
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
        return (await getRequest(
            'https://discord.com/api/v10/guilds/' + guildId,
            {
                Authorization: `Bot ${process.env.BOT_TOKEN}`
            }
        )) as RESTGetAPIGuildResult
    } catch (errorResponse: any) {
        throw await handleRequestError(errorResponse, 'getDiscordGuild')
    }
}
