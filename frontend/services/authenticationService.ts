import { NextIncomingMessage } from 'next/dist/server/request-meta'
import BackendUserData from '../types/BackendUserData'
import {
    clientBackendGetRequest,
    serverBackendGetRequest
} from './requestService'

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

    return (await userData.json()) as BackendUserData
}

/**
 * Gets the user data from the backend, if the user is logged in. As the client.
 * @returns The user data, or undefined if the user is not logged in.
 */
export const clientGetUserData = async () => {
    const user = await clientBackendGetRequest('/api/v1/auth/me')

    if (!user.ok) {
        throw new Error('User not authenticated')
    }

    return (await user.json()) as BackendUserData
}
