import { APIUser } from 'discord-api-types/v10'

declare global {
    namespace Express {
        export interface Request {
            // user: APIUser
        }
    }
}
