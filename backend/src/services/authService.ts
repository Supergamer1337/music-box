import { formDataPostRequest } from './requestService.js'

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
