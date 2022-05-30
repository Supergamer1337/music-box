import { NextIncomingMessage } from 'next/dist/server/request-meta'
import {
    clientBackendGetRequest,
    serverBackendGetRequest
} from './requestService'
import BackendGuildData from './../types/BackendGuildData.d'

export const serverGetGuilds = async (req: NextIncomingMessage) => {
    const guilds = await serverBackendGetRequest(req, '/api/v1/guilds')

    return handleGuildRequest(guilds)
}

export const clientGetGuilds = async () => {
    const guilds = await clientBackendGetRequest('/api/v1/guilds')

    return handleGuildRequest(guilds)
}

const handleGuildRequest = async (servers: Response) => {
    if (!servers.ok) {
        throw new Error('Failed to get servers')
    }

    return (await servers.json()) as BackendGuildData[]
}
