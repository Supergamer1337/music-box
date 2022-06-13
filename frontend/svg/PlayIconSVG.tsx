import React from 'react'

interface Props {
    className?: string
}

const PlayIconSVG = ({ className }: Props) => {
    return (
        <div className={className}>
            <svg
                viewBox="0 0 22 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M1.5625 23.2501C1.31386 23.2501 1.0754 23.1513 0.899588 22.9755C0.723772 22.7997 0.625 22.5612 0.625 22.3126V1.68758C0.625028 1.52467 0.667507 1.36458 0.74825 1.22309C0.828993 1.0816 0.945214 0.963587 1.08546 0.880691C1.2257 0.797795 1.38512 0.752874 1.54801 0.750356C1.7109 0.747839 1.87164 0.787811 2.01437 0.866334L20.7644 11.1788C20.9114 11.2598 21.0339 11.3787 21.1193 11.5231C21.2047 11.6676 21.2497 11.8323 21.2497 12.0001C21.2497 12.1679 21.2047 12.3326 21.1193 12.4771C21.0339 12.6215 20.9114 12.7404 20.7644 12.8213L2.01437 23.1338C1.87595 23.21 1.72051 23.25 1.5625 23.2501Z" />
            </svg>
        </div>
    )
}

export default PlayIconSVG