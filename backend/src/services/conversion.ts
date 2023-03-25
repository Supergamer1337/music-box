import { Playlist } from '@prisma/client'
import { RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v10'
import GuildWithBotInfo from '../types/GuildWithBotInfo.d'
import { botIsInServer } from './musicBot.js'

/**
 * Converts playlists (with songs as count) to an easier to use format.
 *
 * @param playlists The playlists to convert.
 * @returns The converted playlists.
 */
export const playlistsSongCountConversion = (
    playlists: Array<Playlist & { _count: { songs: number } }>
): Array<Playlist & { nrOfSongs: number }> => {
    return playlists.map((playlist) => {
        return {
            ...playlist,
            nrOfSongs: playlist._count.songs,
            _count: undefined
        }
    })
}

/**
 * Converts a list of user guilds to a list of user guilds with bot info.
 *
 * @param guilds List of user guilds
 * @returns List of user guilds with bot info
 */
export const userServersAddBotInfo = (
    guilds: RESTGetAPICurrentUserGuildsResult
): GuildWithBotInfo[] => {
    const mappedGuilds = guilds.map((guild) => {
        return {
            ...guild,
            botInServer: botIsInServer(guild.id)
        } as unknown as GuildWithBotInfo
    })
    return mappedGuilds
}
