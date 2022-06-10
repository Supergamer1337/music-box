import React, { useEffect, useState } from 'react'
import Overlay from './Overlay'
import YtVideo from './../../backend/src/types/YtVideo.d'
import { ytSearch } from './../services/searchService'
import YtSearchResultItem from './YtSearchResultItem'
import { AnimatePresence, motion } from 'framer-motion'
import { useQuery } from 'react-query'
import LoadingSpinnerSVG from '../svg/LoadingSpinnerSVG'

interface Props {}

const MobileSearchComponent = ({}: Props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchTimer, setSearchTimer] = useState<
        ReturnType<typeof setTimeout> | undefined
    >(undefined)

    const {
        data: searchResults,
        isLoading,
        error,
        refetch
    } = useQuery<YtVideo[]>(
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

    return (
        <main>
            <div className="relative z-[101] w-10/12 mx-auto">
                <input
                    type="text"
                    className={`block w-full mt-4 p-2 rounded-md text-lg  outline-none border-0 border-discordBorder transition-all duration-300 ${
                        searchTerm
                            ? 'bg-primaryBg border-b-2 rounded-b-none'
                            : 'bg-emptyBg'
                    }`}
                    placeholder="Search Youtube... (or paste url)"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AnimatePresence>
                    {searchTerm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-primaryBg p-2 rounded-b-md flex flex-col gap-2"
                        >
                            {!searchResults && (
                                <LoadingSpinnerSVG className="animate-spin w-12 h-12 mx-auto my-2" />
                            )}
                            {searchResults &&
                                searchResults.map((video) => (
                                    <YtSearchResultItem
                                        key={video.id}
                                        video={video}
                                    />
                                ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Overlay active={searchTerm ? true : false} />
        </main>
    )
}

export default MobileSearchComponent
