import { NextIncomingMessage } from 'next/dist/server/request-meta'
import DiscordUserData from './../types/DiscordUserData.d'

/**
 * Gets the user data from the backend, if the user is logged in.
 * @param req The request object.
 * @returns The user data, or undefined if the user is not logged in.
 */
export const serverSideGetUserData = async (req: NextIncomingMessage) => {
    if (!req.headers.cookie) {
        return false
    }

    const userData = await fetch(
        `${process.env.BACKEND_ADDRESS}/api/v1/auth/me`,
        {
            method: 'GET',
            headers: {
                Cookie: req.headers.cookie
            }
        }
    )

    if (!userData.ok) {
        return undefined
    }

    return (await userData.json()) as DiscordUserData
}
