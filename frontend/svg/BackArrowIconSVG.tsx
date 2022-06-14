import React, { MouseEventHandler } from 'react'

interface Props {
    className?: string
    onClick?: MouseEventHandler<HTMLDivElement>
}

const BackArrowIconSVG = ({ className, onClick }: Props) => {
    return (
        <div onClick={onClick} className={className}>
            <svg
                viewBox="0 0 29 28"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M16.6699 26.1246L15.233 27.548C14.6246 28.1507 13.6408 28.1507 13.0388 27.548L0.456311 15.09C-0.152104 14.4873 -0.152104 13.5127 0.456311 12.9164L13.0388 0.452027C13.6472 -0.150676 14.6311 -0.150676 15.233 0.452027L16.6699 1.87543C17.2848 2.48454 17.2718 3.47836 16.644 4.07465L8.84466 11.4353H27.4466C28.3074 11.4353 29 12.1214 29 12.9741V15.0259C29 15.8786 28.3074 16.5647 27.4466 16.5647H8.84466L16.644 23.9253C17.2783 24.5216 17.2913 25.5155 16.6699 26.1246Z" />
            </svg>
        </div>
    )
}

export default BackArrowIconSVG
