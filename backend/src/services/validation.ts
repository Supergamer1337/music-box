import { getDiscordUserGuilds } from './guild.js'
import { YouTubeVideo } from 'youtube-search-no-limit'

/**
 * Validates that the given user has the correct rights for the given guild.
 *
 * @param access_token The user's Discord access token.
 * @param guildId The guild ID.
 * @returns True if the user has the correct rights for the given guild, false otherwise.
 * @throws An error if the request failed.
 */
export const validGuildPermissions = async (
    access_token: string,
    guildId: string
): Promise<boolean> => {
    const guilds = await getDiscordUserGuilds(access_token)
    const guild = guilds.find((g) => g.id === guildId)

    if (guild?.owner) {
        return true
    } else {
        return false
    }
}

/**
 * Checks if the given value is a string.
 *
 * @param value The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export const isString = (value: any): boolean => {
    if (typeof value === 'string') {
        return true
    }
    return false
}

/**
 * Checks if the given youtube video is valid.
 *
 * @param video The video to check.
 * @returns An array of errors if the video is invalid, an empty array otherwise.
 */
export const validYtVideo = (video: Partial<YouTubeVideo>): string[] => {
    const errors = []
    if (video) {
        if (!video.id || !isString(video.id))
            errors.push('Video id must exist and be of type string.')
        if (!video.title || !isString(video.title))
            errors.push('Video title must exist and be of type string.')
        if (
            !video.thumbnails ||
            !video.thumbnails[0].url ||
            !isString(video.thumbnails[0].url)
        )
            errors.push(
                'Video thumbnails array must contain at least one thumbnail with a valid url.'
            )
        if (!video.duration || !Number.isInteger(video.duration))
            errors.push('Video duration must exist and be of type int.')
        if (!video.durationText || !isString(video.durationText))
            errors.push('Video duration text must exist and be of type string.')
        if (!video.url || !isString(video.url))
            errors.push('Video url must exist and be of type string.')
    } else {
        errors.push('No video provided')
    }

    return errors
}
