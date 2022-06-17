import * as yt from 'youtube-search-without-api-key'
import type { search as ytSearch } from 'youtube-search-without-api-key'
import YtVideo from './../types/YtVideo.d'

/**
 * Search for videos on youtube.
 *
 * @param searchTerm The search term.
 * @param nrResults The number of results to return.
 * @returns The videos found.
 * @throws Error if the search failed.
 */
export const searchForYoutubeVideos = async (
    searchTerm: string,
    nrResults: number
) => {
    const ytSearchResult = await (
        await yt.search(searchTerm)
    ).slice(0, nrResults)
    const videos = ytSearchToYtVideos(ytSearchResult)
    return videos
}

/**
 * Convert a youtube search result to a list of YtVideos.
 *
 * @param ytSearchResult The youtube search result.
 * @returns The list of videos.
 */
const ytSearchToYtVideos = (
    ytSearchResult: Awaited<ReturnType<typeof ytSearch>>
) => {
    const videos = ytSearchResult.map((ytResult) => {
        return {
            id: ytResult.id.videoId,
            title: ytResult.title,
            url: ytResult.url,
            thumbnail: ytResult.snippet.thumbnails.url,
            duration: parseYtDuration(ytResult.duration_raw)
        } as YtVideo
    })
    return videos
}

/**
 * Convert a youtube string duration to number of seconds.
 *
 * @param duration The duration given by youtube.
 * @returns The duration in seconds.
 */
const parseYtDuration = (duration: string): number => {
    const durationParts = duration.split(':')
    const durationSeconds = durationParts.reduce((acc, part) => {
        return acc * 60 + parseInt(part)
    }, 0)
    return durationSeconds
}
