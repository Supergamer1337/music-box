import { clientBackendGetRequest, handleInvalidRequest } from './requestService'
import YouTubeVideo from './../types/youtube/YoutubeVideo.d'

/**
 * Searches Youtube for videos matching the query string.
 *
 * @param query The query string to search for.
 * @returns An array of the backend default length of videos matching the query.
 * @throws An error if the request fails.
 */
export const ytSearch = async (query: string) => {
    const response = await clientBackendGetRequest(
        `/api/v1/search/yt?query=${encodeURIComponent(query)}`
    )

    if (!response.ok)
        return handleInvalidRequest(
            response,
            'Failed to retrieve search results.'
        )

    return (await response.json()).videos as YouTubeVideo[]
}
