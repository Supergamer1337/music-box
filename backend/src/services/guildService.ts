import { getRequest } from './requestService.js'
import DiscordGuildData from './../types/discord/DiscordGuildData.d'

export const getDiscordUserGuilds = async (access_token: string) => {
    try {
        return (await getRequest(
            'https://discordapp.com/api/users/@me/guilds',
            {
                Authorization: `Bearer ${access_token}`
            }
        )) as DiscordGuildData[]
    } catch (errorRequest: any) {
        throw new Error(
            `${errorRequest.status} ${
                errorRequest.statusText
            }. ${errorRequest.json()}`
        )
    }
}
