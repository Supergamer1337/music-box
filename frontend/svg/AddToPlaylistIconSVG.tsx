import React, { MouseEventHandler } from 'react'

interface Props {
    className?: string
    onClick?: MouseEventHandler<HTMLDivElement>
}

const AddToPlaylistIconSVG = ({ className, onClick }: Props) => {
    return (
        <div onClick={onClick} className={className}>
            <svg
                viewBox="0 0 34 25"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M19.5 7.5H0.25V11H19.5V7.5ZM19.5 0.5H0.25V4H19.5V0.5ZM26.5 14.5V7.5H23V14.5H16V18H23V25H26.5V18H33.5V14.5H26.5ZM0.25 18H12.5V14.5H0.25V18Z" />
            </svg>
        </div>
    )
}

export default AddToPlaylistIconSVG
