import React from 'react'
import BottomNavBarItem from './BottomNavBarItem'

interface Props {}

const BottomNavBar = ({}: Props) => {
    return (
        <div className="flex justify-around bg-secondaryBg py-2 fixed bottom-0 w-full items-center text-center sm:hidden">
            <BottomNavBarItem
                icon="playlist"
                label="Playlists"
                active={false}
            />
            <BottomNavBarItem icon="search" label="Search" active={true} />
            <BottomNavBarItem icon="sound" label="Sound" active={false} />
        </div>
    )
}

export default BottomNavBar
