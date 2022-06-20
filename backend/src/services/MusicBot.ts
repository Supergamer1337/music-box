import { Client, Intents } from 'discord.js'
import {
    DiscordGatewayAdapterCreator,
    joinVoiceChannel
} from '@discordjs/voice'
import { playLocalFile } from './playerService.js'
import path from 'path'
import { RESTGetAPICurrentUserGuildsResult } from '.pnpm/discord-api-types@0.30.0/node_modules/discord-api-types/v10'
import GuildWithBotInfo from './../types/GuildWithBotInfo.d'

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

    public playAudioInVC(channelId: string, guildId: string) {
        const adapterCreator = this.musicBot.guilds.cache.get(guildId)
            ?.voiceAdapterCreator as DiscordGatewayAdapterCreator

        if (!adapterCreator)
            throw new Error('No voice adapter creator defined!')

        if (adapterCreator) {
            const voiceConnection = joinVoiceChannel({
                channelId,
                guildId,
                adapterCreator: adapterCreator
            })

            const player = playLocalFile(
                path.join(path.dirname(''), '/resources/test.mp3')
            )

            const subscription = voiceConnection.subscribe(player)

            player.unpause()
        }
    }

    /**
     * Checks if the bot is in the specified guild
     * @param id Guild ID
     * @returns true if the bot is in the guild, false otherwise
     */
    public isInServer(id: string) {
        return this.musicBot.guilds.cache.has(id)
    }

    /**
     * Converts a list of user guilds to a list of user guilds with bot info.
     *
     * @param guilds List of user guilds
     * @returns List of user guilds with bot info
     */
    public isInServers(
        guilds: RESTGetAPICurrentUserGuildsResult
    ): GuildWithBotInfo[] {
        const mappedGuilds = guilds.map((guild) => {
            return {
                ...guild,
                botInServer: this.isInServer(guild.id)
            } as unknown as GuildWithBotInfo
        })
        return mappedGuilds
    }
}
