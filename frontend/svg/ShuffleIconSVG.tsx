import React from 'react'

interface Props {
    className?: string
}

const ShuffleIconSVG = ({ className }: Props) => {
    return (
        <div className={className}>
            <svg
                viewBox="0 0 27 28"
                fill="currentColorFill"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_110_414)">
                    <path d="M22.1548 15.6953C21.3729 14.8685 20.0826 15.4533 20.0826 16.6234V19.25H17.6021L8.17614 5.95002C7.86608 5.51252 7.37514 5.25002 6.8532 5.25002H1.8922C0.978026 5.25002 0.238525 6.03205 0.238525 7.00002C0.238525 7.96799 0.978026 8.75002 1.8922 8.75002H6.02637L15.4523 22.05C15.7624 22.493 16.2533 22.75 16.7752 22.75H20.081V25.3717C20.081 26.5415 21.4174 27.1283 22.1993 26.3014L26.2869 21.9275C26.772 21.4142 26.772 20.5828 26.2869 20.0698L22.1548 15.6953ZM17.6021 8.75002H20.081V11.3767C20.081 12.5464 21.4179 13.1316 22.1533 12.3047L26.2409 7.9308C26.726 7.41723 26.7259 6.58604 26.2409 6.07307L22.1532 1.69916C21.3713 0.872289 20.035 1.45903 20.035 2.62885V5.25002H16.7752C16.2554 5.25002 15.7644 5.50979 15.4528 5.95057L13.3645 8.89768L15.3851 11.8125L17.6021 8.75002ZM6.02637 19.25H1.8922C0.978026 19.25 0.238525 20.0326 0.238525 21C0.238525 21.9674 0.978026 22.75 1.8922 22.75H6.8532C7.37308 22.75 7.86401 22.4903 8.17562 22.0495L10.2634 19.1035L8.19681 16.1875L6.02637 19.25Z" />
                </g>
                <defs>
                    <clipPath id="clip0_110_414">
                        <rect
                            width="26.4587"
                            height="28"
                            transform="translate(0.238525)"
                        />
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}

export default ShuffleIconSVG
