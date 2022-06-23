import React, { useState } from 'react'
import Overlay from './Overlay'
import YtSearchResultItem from './YtSearchResultItem'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingSpinnerSVG from '../svg/LoadingSpinnerSVG'
import useOutsideDetection from '../hooks/useOutsideDetection'
import useYtSearch from './../hooks/useYtSearch'
import TextField from './TextField'

interface Props {}

const SearchComponent = ({}: Props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchBoxClicked, setSearchBoxClicked] = useState(false)
    const searchRef = useOutsideDetection<HTMLDivElement>(() => {
        setSearchBoxClicked(false)
    })

    const { searchResults, searchError } = useYtSearch(searchTerm)

    return (
        <div>
            <div className="relative z-[101] w-10/12 mx-auto" ref={searchRef}>
                <TextField
                    type="text"
                    size="section"
                    className={`!w-full !outline-none !mt-4 !mb-0 border-0 border-discordBorder transition-all duration-300 ${
                        searchTerm &&
                        searchBoxClicked &&
                        '!bg-primaryBg border-b-2 rounded-b-none'
                    }`}
                    placeholder="Search Youtube... (or paste url)"
                    onFocus={() => setSearchBoxClicked(true)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AnimatePresence>
                    {searchTerm && searchBoxClicked && (
                        <motion.div
                            key="searchResults"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-primaryBg p-2 rounded-b-md flex flex-col gap-2"
                        >
                            {!searchResults && !searchError ? (
                                <LoadingSpinnerSVG className="animate-spin w-12 h-12 mx-auto my-2" />
                            ) : searchError ? (
                                !searchResults && (
                                    <div className="text-center bg-red-600 mx-4 rounded-md">
                                        {searchError}
                                    </div>
                                )
                            ) : (
                                searchResults &&
                                searchResults.map((video) => (
                                    <YtSearchResultItem
                                        key={video.id}
                                        video={video}
                                    />
                                ))
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {searchBoxClicked && searchTerm !== '' && <Overlay />}
            </AnimatePresence>
        </div>
    )
}

export default SearchComponent
