import { RESTPostOAuth2AccessTokenResult } from 'discord-api-types/v10'
import type { Session } from 'express-session'

declare module 'http' {
    interface IncomingMessage {
        session: Session & {
            discordTokenData: RESTPostOAuth2AccessTokenResult
        }
    }
}

export {}
