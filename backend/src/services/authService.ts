import {
    APIUser,
    RESTGetAPIOAuth2CurrentAuthorizationResult,
    RESTPostOAuth2AccessTokenResult
} from 'discord-api-types/v10'
import { formDataPostRequest, getRequest } from './requestService.js'

/**
 * Gets the user Discord access token data.
 * @param code The code from the Discord authorization URL.
 * @returns The user's Discord access token data.
 * @throws An error if the request failed.
 */
export const requestAccessToken = async (code: string) => {
    try {
        return (await formDataPostRequest(
            'https://discord.com/api/v10/oauth2/token',
            {
                client_id: process.env.OAUTH_CLIENT_ID,
                client_secret: process.env.OAUTH_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.BACKEND_ADDRESS + '/api/v1/auth/'
            }
        )) as RESTPostOAuth2AccessTokenResult
    } catch (errorResponse: any) {
        throw new Error(
            `${errorResponse.status} ${
                errorResponse.statusText
            }. ${await errorResponse.text()}`
        )
    }
}

/**
 * Gets the user's Discord user data.
 * @param accessToken The user's Discord access token.
 * @returns The user's Discord user data.
 */
export const getDiscordUserData = async (accessToken: string) => {
    try {
        return (await getRequest('https://discord.com/api/v10/users/@me', {
            Authorization: `Bearer ${accessToken}`
        })) as APIUser
    } catch (errorResponse: any) {
        throw new Error(
            `${errorResponse.status} ${
                errorResponse.statusText
            }. ${await errorResponse.json()}`
        )
    }
}

/**
 * Checks if the user's Discord access token is valid.
 * @param discordTokenData The user's Discord access token data.
 * @returns Whether the user's Discord access token is valid.
 * @throws An error if the request failed.
 */
export const discordTokenValid = async (accessToken: string) => {
    try {
        const authorizationData = (await getRequest(
            'https://discord.com/api/v10/oauth2/@me',
            {
                Authorization: `Bearer ${accessToken}`
            }
        )) as RESTGetAPIOAuth2CurrentAuthorizationResult

        return authorizationData.expires > new Date().toISOString()
    } catch (errorResponse: any) {
        throw new Error(
            `${errorResponse.status} ${
                errorResponse.statusText
            }. ${await errorResponse.text()}`
        )
    }
}
