import DiscordTokenData from './discord/DiscordTokenData'

declare module 'express-session' {
    interface SessionData {
        discordTokenData?: DiscordTokenData
    }
}

export {}
