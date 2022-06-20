import { NextIncomingMessage } from 'next/dist/server/request-meta'
import {
    clientBackendGetRequest,
    serverBackendGetRequest
} from './requestService'
import GuildListObject from '../types/GuildListObject'
import { APIGuild } from 'discord-api-types/v10'

/**
 * Gets the user's Discord guilds, as the Next.js server.
 * @param req The Next.js request object.
 * @returns The user's Discord guilds.
 * @throws An error if the request failed.
 */
export const serverGetGuilds = async (req: NextIncomingMessage) => {
    const guilds = await serverBackendGetRequest(req, '/api/v1/guilds')

    return handleGuildsRequest(guilds)
}

/**
 * Gets the user's Discord guilds, as the client.
 * @returns The user's Discord guilds.
 * @throws An error if the request failed.
 */
export const clientGetGuilds = async () => {
    const guilds = await clientBackendGetRequest('/api/v1/guilds')

    return handleGuildsRequest(guilds)
}

/**
 * Gets guild data from Discord for the given guild ID, as the Next.js server.
 * @param req The Next.js request object.
 * @returns The guild data.
 * @throws An error if the request failed.
 */
export const serverGetGuildData = async (
    req: NextIncomingMessage,
    guildId: string
) => {
    const guild = await serverBackendGetRequest(
        req,
        `/api/v1/guilds/${guildId}`
    )

    if (!guild.ok) {
        throw new Error('Failed to get server')
    }

    return (await guild.json()) as APIGuild
}

export const clientGetGuildData = async (guildId: string) => {
    const guild = await clientBackendGetRequest(`/api/v1/guilds/${guildId}`)

    if (!guild.ok) {
        throw new Error('Failed to get server')
    }

    return (await guild.json()) as APIGuild
}

/**
 * Handles the guilds request response.
 * @param guilds The guilds request response.
 * @returns The guilds.
 * @throws An error if the request failed.
 */
const handleGuildsRequest = async (guilds: Response) => {
    if (!guilds.ok) {
        throw new Error('Failed to get servers')
    }

    return (await guilds.json()).guilds as GuildListObject[]
}
