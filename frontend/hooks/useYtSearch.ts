import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ytSearch } from '../services/searchService'
import YtVideo from '../types/YtVideo'

/**
 * Hook to search YouTube for videos.
 *
 * @param searchTerm The search term to search for.
 * @returns An object with the following properties:
 * - searchResults: The search results.
 * - searchError: The error message if the search is erroring.
 */
const useYtSearch = (searchTerm: string) => {
    const [searchTimer, setSearchTimer] = useState<
        ReturnType<typeof setTimeout> | undefined
    >(undefined)

    const {
        data: searchResults,
        error: searchError,
        refetch
    } = useQuery<YtVideo[], string>(
        ['ytSearch', searchTerm],
        () => ytSearch(searchTerm),
        {
            enabled: false
        }
    )

    useEffect(() => {
        if (searchTerm === '') return // Prevents initial fetch
        if (searchTimer) {
            clearTimeout(searchTimer)
        }
        setSearchTimer(setTimeout(() => refetch(), 250))
    }, [searchTerm])

    return {
        searchResults,
        searchError
    }
}

export default useYtSearch
