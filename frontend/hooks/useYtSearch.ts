import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ytSearch } from '../services/searchService'
import YtVideo from '../types/YtVideo'

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
