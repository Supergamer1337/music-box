import type { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10'

export default interface GuildListObject
    extends RESTAPIPartialCurrentUserGuild {
    botInServer: boolean
}
