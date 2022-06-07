import { NextIncomingMessage } from 'next/dist/server/request-meta'
import {
    clientBackendGetRequest,
    clientBackendPostRequest,
    serverBackendGetRequest
} from './requestService'
import router from 'next/router'
import { APIUser } from 'discord-api-types/v10'

/**
 * Gets the user data from the backend, if the user is logged in. As the Next.js server.
 * @param req The Next.js request object.
 * @returns The user data, or undefined if the user is not logged in.
 */
export const serverGetUserData = async (req: NextIncomingMessage) => {
    if (!req.headers.cookie) {
        return false
    }

    const userData = await serverBackendGetRequest(req, '/api/v1/auth/me')

    if (!userData.ok) {
        return undefined
    }

    return (await userData.json()) as APIUser
}

/**
 * Gets the user data from the backend, if the user is logged in. As the client.
 * @returns The user data, or undefined if the user is not logged in.
 * @throws If the user is not logged in.
 */
export const clientGetUserData = async () => {
    const user = await clientBackendGetRequest('/api/v1/auth/me')

    if (!user.ok) {
        throw new Error('User not authenticated')
    }

    return (await user.json()) as APIUser
}

/**
 * Logs the user out, and redirects them to the authentication page.
 * @throws Throws an error if the backend response was an error.
 */
export const logout = async () => {
    const response = await clientBackendPostRequest('/api/v1/auth/logout')

    if (!response.ok) {
        throw new Error('Failed to logout!')
    }

    router.push('/authenticate')
}
