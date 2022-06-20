import { Client, Intents } from 'discord.js'

export default class MusicBot {
    private static botInstance: MusicBot | undefined

    private musicBot: Client

    private constructor() {
        this.musicBot = new Client({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]
        })
    }

    public static getSharedInstance() {
        if (!this.botInstance) {
            this.botInstance = new MusicBot()
            return this.botInstance
        } else {
            return this.botInstance
        }
    }

    public async startBot() {
        this.musicBot.on('ready', () => {
            if (!this.musicBot.user) throw new Error('No user tag defined!')
            console.log(`Bot authenticated as ${this.musicBot.user.tag}`)
        })

        await this.musicBot.login(process.env.BOT_TOKEN)
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
