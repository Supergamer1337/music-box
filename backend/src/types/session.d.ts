import { RESTPostOAuth2AccessTokenResult } from 'discord-api-types/v10'

declare module 'express-session' {
    interface SessionData {
        discordTokenData: RESTPostOAuth2AccessTokenResult
    }
}

export {}
