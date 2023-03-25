import { Client, Intents } from 'discord.js'
import { getExtendedPlaylist } from './playlist.js'

let botInstance: Client | undefined

/**
 * Starts the bot and authenticates it with Discord.
 */
export const initializeBot = async () => {
    botInstance = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]
    })

    botInstance.on('ready', () => {
        if (!botInstance?.user) throw new Error('No user tag defined!')
        console.log(`Bot authenticated as ${botInstance.user.tag}`)
    })

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
