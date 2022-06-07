import { RESTGetAPICurrentUserGuildsResult } from '.pnpm/discord-api-types@0.30.0/node_modules/discord-api-types/v10'
import { getRequest, handleRequestError } from './requestService.js'

export const getDiscordUserGuilds = async (access_token: string) => {
    try {
        return (await getRequest(
            'https://discord.com/api/v10/users/@me/guilds',
            {
                Authorization: `Bearer ${access_token}`
            }
        )) as RESTGetAPICurrentUserGuildsResult
    } catch (errorResponse: any) {
        return handleRequestError(errorResponse, 'getDiscordUserGuilds')
    }
}

export const getDiscordGuild = async (
    guildId: string,
    access_token: string
) => {
    try {
        return await getRequest(
            'https://discord.com/api/v10/guilds/' + guildId,
            {
                Authorization: `Bearer ${access_token}`
            }
        )
    } catch (errorResponse: any) {
        return handleRequestError(errorResponse, 'getDiscordGuild')
    }
}
