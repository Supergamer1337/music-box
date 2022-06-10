import React from 'react'

interface Props {
    className?: string
}

const PlaylistIconSVG = ({ className }: Props) => {
    return (
        <div className={className}>
            <svg
                viewBox="0 0 42 42"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M24.5 17.5H5.25V21H24.5V17.5ZM24.5 10.5H5.25V14H24.5V10.5ZM31.5 24.5V17.5H28V24.5H21V28H28V35H31.5V28H38.5V24.5H31.5ZM5.25 28H17.5V24.5H5.25V28Z" />
            </svg>
        </div>
    )
}

export default PlaylistIconSVG
