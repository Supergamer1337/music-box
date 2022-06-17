import React, { MouseEventHandler } from 'react'

interface Props {
    className?: string
    onClick?: MouseEventHandler<HTMLDivElement>
}

const AddIconSVG = ({ className, onClick }: Props) => {
    return (
        <div onClick={onClick} className={className}>
            <svg
                viewBox="0 0 30 30"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M30 15C30 16.2757 28.9666 17.3084 27.6923 17.3084H17.3077V27.693C17.3077 28.9688 16.2743 30 15 30C13.7257 30 12.6923 28.9688 12.6923 27.693V17.3084H2.30769C1.03341 17.3084 0 16.2757 0 15C0 13.7243 1.03341 12.693 2.30769 12.693H12.6923V2.30841C12.6923 1.03269 13.7257 0 15 0C16.2743 0 17.3077 1.03269 17.3077 2.30841V12.693H27.6923C28.9687 12.6923 30 13.7236 30 15Z" />
            </svg>
        </div>
    )
}

export default AddIconSVG
