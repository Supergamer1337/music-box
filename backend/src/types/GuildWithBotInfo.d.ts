import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10'

export default interface GuildWithBotInfo
    extends RESTAPIPartialCurrentUserGuild {
    botInServer: boolean
}
