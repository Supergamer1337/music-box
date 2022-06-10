import React from 'react'

interface Props {
    fill: string
    opacity: number
}

const PlaylistIconSVG = ({ fill = 'white', opacity = 1.0 }: Props) => {
    return (
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M23.8333 30.2371C23.8333 33.7828 26.7172 36.6666 30.2628 36.6666C33.8085 36.6666 36.6923 33.7828 36.6923 30.2371C36.6923 29.9126 36.6428 29.6009 36.5952 29.2893H36.6667V10.9999H40.3333V7.33325H34.8333C34.3471 7.33325 33.8808 7.52641 33.537 7.87022C33.1932 8.21404 33 8.68036 33 9.16659V24.4438C32.1464 24.0307 31.2111 23.8139 30.2628 23.8094C28.5584 23.8109 26.9241 24.4885 25.7188 25.6935C24.5134 26.8986 23.8353 28.5326 23.8333 30.2371ZM3.66667 9.16659H29.3333V12.8333H3.66667V9.16659Z"
                fill={fill}
                fillOpacity={opacity}
            />
            <path
                d="M3.66667 16.5H29.3333V20.1667H3.66667V16.5ZM3.66667 23.8333H20.1667V27.5H3.66667V23.8333ZM3.66667 31.1667H20.1667V34.8333H3.66667V31.1667Z"
                fill={fill}
                fillOpacity={opacity}
            />
        </svg>
    )
}

export default PlaylistIconSVG
