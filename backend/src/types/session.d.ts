import DiscordTokenData from './DiscordTokenData.d'

declare module 'express-session' {
    interface SessionData {
        discordTokenData?: DiscordTokenData
    }
}

export {}
