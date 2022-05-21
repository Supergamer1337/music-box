import { NextIncomingMessage } from 'next/dist/server/request-meta'

/**
 * Checks if the user is authenticated.
 * @param req The request object.
 * @returns True if the user is authenticated, false otherwise.
 */
export const isAuthenticated = async (req: NextIncomingMessage) => {
    if (!req.headers.cookie) {
        return false
    }

    const isAuthenticated = await fetch(
        `${process.env.BACKEND_ADDRESS}/api/v1/auth/is-authenticated`,
        {
            method: 'GET',
            headers: {
                Cookie: req.headers.cookie
            }
        }
    )

    if (!isAuthenticated.ok) {
        return false
    }

    return true
}
