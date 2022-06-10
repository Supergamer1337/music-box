import React, { useEffect, useState } from 'react'
import Overlay from './Overlay'
import YtVideo from './../../backend/src/types/YtVideo.d'
import { ytSearch } from './../services/searchService'

interface Props {}

const MobileSearchComponent = ({}: Props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState<YtVideo[]>([])

    const handleSearch = async (
        searchTerm: string,
        setSearchResults: typeof setResults
    ) => {
        console.log('Handling search')
        if (!searchTerm) return

        try {
            const results = await ytSearch(searchTerm)
            console.log(results)
            setSearchResults(results)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleSearch(searchTerm, setResults)
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
                <div className="bg-primaryBg p-2 rounded-b-md">
                    {results &&
                        results.map((video) => (
                            <div key={video.id}>{video.title}</div>
                        ))}
                </div>
            </div>

            <Overlay active={searchTerm ? true : false} />
        </main>
    )
}

export default MobileSearchComponent
