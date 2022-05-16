import { Client, Intents } from 'discord.js'

export default class MusicBot {
    private static botInstance: MusicBot | undefined

    private musicBot: Client

    constructor() {
        this.musicBot = new Client({ intents: [Intents.FLAGS.GUILDS] })
    }

    public static getSharedInstance() {
        if (!this.botInstance) {
            this.botInstance = new MusicBot()
            return this.botInstance
        } else {
            return this.botInstance
        }
    }

    public startBot() {
        this.musicBot.on('ready', () => {
            if (!this.musicBot.user)
                return console.error('Client user is undefined')
            console.log(
                'Bot is authenticated as' + this.musicBot.user.tag + '!'
            )
        })

        this.musicBot.login(process.env.BOT_TOKEN)
    }
}