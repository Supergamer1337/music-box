import { Client, Intents } from 'discord.js'
import { getExtendedPlaylist } from './playlist.js'

export default class MusicBot {
    private static botInstance: MusicBot | undefined

    private musicBot: Client

    private constructor() {
        this.musicBot = new Client({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]
        })
    }

    /**
     * Gets the bot instance, creating it if it doesn't exist.
     *
     * @returns The bot instance.
     */
    public static getSharedInstance() {
        if (!this.botInstance) {
            this.botInstance = new MusicBot()
            return this.botInstance
        } else {
            return this.botInstance
        }
    }

    /**
     * Starts the music bot and connects it to the Discord API.
     */
    public async startBot() {
        this.musicBot.on('ready', () => {
            if (!this.musicBot.user) throw new Error('No user tag defined!')
            console.log(`Bot authenticated as ${this.musicBot.user.tag}`)
        })

        await this.musicBot.login(process.env.BOT_TOKEN)
    }

    /**
     * Plays the given playlist in the specified guild.
     *
     * @param guildId Guild ID
     * @param playlistId Playlist to play
     */
    public async playPlaylist(playlistId: string, guildId: string) {
        const guild = this.musicBot.guilds.cache.get(guildId)
        if (!guild) throw new Error('Bot is not part of guild!')

        const playlist = await getExtendedPlaylist(playlistId)
        if (!playlist) throw new Error('That playlist does not exist.')
    }

    /**
     * Checks if the bot is in the specified guild
     * @param id Guild ID
     * @returns true if the bot is in the guild, false otherwise
     */
    public isInServer(id: string) {
        return this.musicBot.guilds.cache.has(id)
    }
}
