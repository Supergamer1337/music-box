import React from 'react'
import BottomNavBarItem from './BottomNavBarItem'

interface Props {
    chosenSection: string
    setChosenSection: (section: string) => void
}

const BottomNavBar = ({ chosenSection, setChosenSection }: Props) => {
    return (
        <div className="flex justify-around bg-secondaryBg py-2 fixed bottom-0 w-full items-center text-center sm:hidden">
            <BottomNavBarItem
                icon="playlist"
                label="Playlists"
                active={chosenSection === 'playlists'}
                onClick={() => setChosenSection('playlists')}
            />
            <BottomNavBarItem
                icon="search"
                label="Search"
                active={chosenSection === 'search'}
                onClick={() => setChosenSection('search')}
            />
            <BottomNavBarItem
                icon="sound"
                label="Sound"
                active={chosenSection === 'sound'}
            />
        </div>
    )
}

export default BottomNavBar
