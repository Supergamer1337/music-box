import React, { useState } from 'react'
import Overlay from './Overlay'

interface Props {}

const MobileSearchComponent = ({}: Props) => {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <main>
            <input
                type="text"
                className={`relative block mx-auto my-4 p-2 rounded-md text-lg w-10/12 z-[101] outline-none border-0 border-discordBorder transition-all duration-300 ${
                    searchTerm
                        ? 'bg-primaryBg border-b-2 rounded-b-none'
                        : 'bg-emptyBg'
                }`}
                placeholder="Search Youtube... (or paste url)"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Overlay active={searchTerm ? true : false} />
        </main>
    )
}

export default MobileSearchComponent
