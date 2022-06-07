import { NextIncomingMessage } from 'next/dist/server/request-meta'
import {
    clientBackendGetRequest,
    serverBackendGetRequest
} from './requestService'
import GuildListObject from '../types/GuildListObject'
import { APIGuild } from 'discord-api-types/v10'

export const serverGetGuilds = async (req: NextIncomingMessage) => {
    const guilds = await serverBackendGetRequest(req, '/api/v1/guilds')

    return handleGuildRequest(guilds)
}

export const clientGetGuilds = async () => {
    const guilds = await clientBackendGetRequest('/api/v1/guilds')

    return handleGuildRequest(guilds)
}

export const serverGetGuildData = async (req: NextIncomingMessage) => {
    const guild = await serverBackendGetRequest(req, '/api/v1/guilds/:id')

    if (!guild.ok) {
        throw new Error('Failed to get server')
    }

    return (await guild.json()) as APIGuild
}

const handleGuildRequest = async (servers: Response) => {
    if (!servers.ok) {
        throw new Error('Failed to get servers')
    }

    return (await servers.json()) as GuildListObject[]
}
