import React, { ReactNode } from 'react'
import PlaylistIconSVG from '../svg/PlaylistIconSVG'
import SearchIconSVG from '../svg/SearchIconSVG'
import SoundIconSVG from './../svg/SoundIconSVG'

interface Props {
    icon: 'playlist' | 'search' | 'sound'
    label: string
    active: boolean
    onClick?: () => void
}

const iconStyle = 'w-8 h-8'

const pickIcon = (iconName: string, active: boolean): ReactNode => {
    switch (iconName) {
        case 'search':
            return <SearchIconSVG className={iconStyle} />
        case 'sound':
            return <SoundIconSVG className={iconStyle} />
        default:
            return <PlaylistIconSVG className={iconStyle} />
    }
}

const BottomNavBarItem = ({ icon, label, active, onClick }: Props) => {
    let iconSvg = pickIcon(icon, active)

    return (
        <div
            className={`flex flex-col items-center ${
                !active && 'opacity-60'
            } hover:opacity-100 select-none cursor-pointer`}
            onClick={onClick}
        >
            {iconSvg}
            <p>{label}</p>
        </div>
    )
}

export default BottomNavBarItem
