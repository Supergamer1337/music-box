import React, { MouseEventHandler } from 'react'

interface Props {
    className?: string
    onClick?: MouseEventHandler<HTMLDivElement>
}

const CheckMarkIconSVG = ({ className, onClick }: Props) => {
    return (
        <div onClick={onClick} className={className}>
            <svg
                viewBox="0 0 512 382"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M173.898 374.306L7.49775 207.906C-2.49925 197.909 -2.49925 181.7 7.49775 171.702L43.7007 135.498C53.6977 125.5 69.9077 125.5 79.9047 135.498L192 247.592L432.095 7.49775C442.092 -2.49925 458.302 -2.49925 468.299 7.49775L504.502 43.7018C514.499 53.6988 514.499 69.9077 504.502 79.9057L210.102 374.307C200.104 384.304 183.895 384.304 173.898 374.306Z" />
            </svg>
        </div>
    )
}

export default CheckMarkIconSVG
