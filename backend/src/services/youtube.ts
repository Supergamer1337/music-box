import { search as ytSearch, YouTubeVideo } from 'youtube-search-no-limit'

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
): Promise<YouTubeVideo[]> => {
    const results = await ytSearch(searchTerm, nrResults)
    return results
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
