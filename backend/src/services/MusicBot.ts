import { Player, QueueRepeatMode, Track } from 'discord-player'
import { Client } from 'discord.js'
import { getExtendedPlaylist } from './playlist.js'

let botInstance: Client | undefined
let player: Player | undefined
/**
 * Starts the bot and authenticates it with Discord.
 */
export const initializeBot = async () => {
    botInstance = new Client({
        intents: ['GuildVoiceStates', 'Guilds']
    })

    botInstance.on('ready', () => {
        if (!botInstance?.user) throw new Error('No user tag defined!')
        console.log(`Bot authenticated as ${botInstance.user.tag}`)
    })

    player = new Player(botInstance)

    await botInstance.login(process.env.BOT_TOKEN)
}

/**
 * Plays the given playlist in the specified guild.
 *
 * @param guildId Guild ID
 * @param playlistId Playlist to play
 */
export const playPlaylist = async (playlistId: string, guildId: string) => {
    if (!botInstance) return

    const guild = botInstance.guilds.cache.get(guildId)
    if (!guild) throw new Error('Bot is not part of guild!')

    const playlist = await getExtendedPlaylist(playlistId)
    if (!playlist) throw new Error('That playlist does not exist.')

    const search = (
        await Promise.all(
            playlist.songs.map((s) => player?.search(s.youtubeUrl))
        )
    ).filter((s) => s !== undefined)

    const songs = search
        .map((s) => s?.tracks[0])
        .filter((s) => s !== undefined) as Track[]

    const channels = await guild.channels.fetch()
    const keys = channels
        .filter((c) => c?.isVoiceBased() && c?.joinable)
        .entries()

    keys.next()
    keys.next()
    const channel = keys.next().value[1]

    if (!channel) throw new Error('No voice channel found!')

    const something = await player?.play(channel.id, songs[0].url, {
        nodeOptions: {
            repeatMode: QueueRepeatMode.QUEUE
        }
    })

    for (let i = 1; i < songs.length; i++) {
        something?.queue.tracks.add(songs[i])
    }
}
/**
 * Checks if the bot is in the specified guild
 * @param id Guild ID
 * @returns true if the bot is in the guild, false otherwise
 */
export const botIsInServer = (id: string) => {
    if (!botInstance) return false
    return botInstance.guilds.cache.has(id)
}
