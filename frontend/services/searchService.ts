import YtVideo from '../types/YtVideo'
import { clientBackendGetRequest } from './requestService'

/**
 * Searches Youtube for videos matching the query string.
 * @param query The query string to search for.
 * @returns An array of the backend default length of videos matching the query.
 * @throws An error if the request fails.
 */
export const ytSearch = async (query: string) => {
    const response = await clientBackendGetRequest(
        `/api/v1/search/yt?query=${query}`
    )

    if (!response.ok) {
        throw new Error('Failed to retrieve search results :(')
    }

    return (await response.json()).videos as YtVideo[]
}
