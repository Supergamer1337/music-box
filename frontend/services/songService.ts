import Song from '../types/Song'
import YtVideo from '../types/YtVideo'
import { clientBackendPostRequest } from './requestService'

export const addNewSong = async (
    video: YtVideo,
    playlistId: string
): Promise<void> => {
    const response = await clientBackendPostRequest(
        `/api/v1/playlists/${playlistId}/add-song`,
        { video }
    )

    if (!response.ok) {
        throw new Error('Failed to add song')
    }
}

/**
 * Converts a time in seconds to a string in the YouTube format.
 *
 * @param duration The duration in seconds.
 * @returns The duration in the YouTube format.
 */
export const parseDuration = (duration: number): string => {
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration - hours * 3600) / 60)
    const seconds = duration - hours * 3600 - minutes * 60

    return `${hours > 0 ? formatHours(hours) : ''}${
        minutes > 0 || hours > 0 ? formatMinutes(minutes, hours) : '0:'
    }${formatSeconds(seconds)}`
}

/**
 * Formats the hours to a string in the format H
 *
 * @param hours The hours.
 * @returns The hours in the format H.
 */
const formatHours = (hours: number): string => {
    return `${hours}:`
}

/**
 * Formats the minutes to a string in the format M
 *
 * @param minutes The minutes.
 * @param hours The hours.
 * @returns The minutes in the format M.
 */
const formatMinutes = (minutes: number, hours: number): string => {
    if (hours > 0) {
        return `${minutes < 10 ? '0' + minutes : minutes}:`
    } else {
        return `${minutes}:`
    }
}

/**
 * Formats the seconds to a string in the format S
 *
 * @param seconds The seconds.
 * @param minutes The minutes.
 * @param hours The hours.
 * @returns The seconds in the format S.
 */
const formatSeconds = (seconds: number): string => {
    return `${seconds < 10 ? '0' + seconds : seconds}`
}
