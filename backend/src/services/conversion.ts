import { Playlist } from '@prisma/client'
import { RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v10'
import GuildWithBotInfo from '../types/GuildWithBotInfo.d'
import MusicBot from './MusicBot.js'

/**
 * Converts a playlist (with songs as count) to an easier to use format for responding to a client.
 *
 * @param playlists The playlists to convert.
 * @returns The converted playlists.
 */
export const playlistsToResponsePlaylists = (
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
            botInServer: MusicBot.getSharedInstance().isInServer(guild.id)
        } as unknown as GuildWithBotInfo
    })
    return mappedGuilds
}
