import { formDataPostRequest, getRequest } from './requestService.js'
import DiscordUserData from './../types/discord/DiscordUserData.d'

/**
 * Gets the user Discord access token data.
 * @param code The code from the Discord authorization URL.
 * @returns The user's Discord access token data.
 * @throws An error if the request failed.
 */
export const requestAccessToken = async (code: string) => {
    try {
        return await formDataPostRequest(
            'https://discordapp.com/api/oauth2/token',
            {
                client_id: process.env.OAUTH_CLIENT_ID,
                client_secret: process.env.OAUTH_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.BACKEND_ADDRESS + '/api/v1/auth/'
            }
        )
    } catch (errorResponse: any) {
        console.error(await errorResponse.json())

        throw 'Failed to get access token'
    }
}

export const getDiscordUser = async (accessToken: string) => {
    try {
        const discordUserData = await getRequest(
            'https://discordapp.com/api/users/@me',
            {
                Authorization: `Bearer ${accessToken}`
            }
        )

        return discordUserData as DiscordUserData
    } catch (err) {
        console.error(err)

        throw 'Failed to get Discord user'
    }
}
