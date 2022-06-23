import React from 'react'

type Props = {
    className: string
}

const RoundCheckMarkIconSVG = ({ className = '' }: Props) => {
    return (
        <div className={className}>
            <svg
                fill="currentColorFill"
                viewBox="0 0 35 35"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M17.5 2.91669C14.6157 2.91669 11.7961 3.77198 9.39793 5.37442C6.99971 6.97686 5.13053 9.25446 4.02675 11.9192C2.92298 14.584 2.63418 17.5162 3.19688 20.3451C3.75958 23.174 5.14851 25.7725 7.18802 27.812C9.22754 29.8515 11.826 31.2404 14.6549 31.8031C17.4838 32.3658 20.416 32.077 23.0808 30.9733C25.7456 29.8695 28.0232 28.0003 29.6256 25.6021C31.228 23.2039 32.0833 20.3843 32.0833 17.5C32.0833 15.5849 31.7061 13.6886 30.9732 11.9192C30.2404 10.1499 29.1662 8.54223 27.812 7.18805C26.4578 5.83386 24.8501 4.75966 23.0808 4.02678C21.3115 3.2939 19.4151 2.91669 17.5 2.91669ZM23.7708 14.0146L17.1062 22.7646C16.9704 22.9411 16.7959 23.0841 16.5962 23.1827C16.3965 23.2813 16.1769 23.3328 15.9542 23.3334C15.7327 23.3345 15.5138 23.2853 15.3142 23.1892C15.1145 23.0932 14.9394 22.953 14.8021 22.7792L11.2437 18.2438C11.126 18.0925 11.0391 17.9195 10.9882 17.7346C10.9373 17.5498 10.9233 17.3567 10.947 17.1664C10.9707 16.9762 11.0316 16.7924 11.1263 16.6257C11.221 16.459 11.3477 16.3126 11.499 16.1948C11.8045 15.9569 12.192 15.8502 12.5763 15.8981C12.7666 15.9218 12.9503 15.9827 13.117 16.0774C13.2837 16.1721 13.4301 16.2987 13.5479 16.45L15.925 19.4834L21.4375 12.1917C21.5543 12.0385 21.7002 11.9098 21.8667 11.8129C22.0333 11.7161 22.2173 11.653 22.4082 11.6273C22.5992 11.6016 22.7933 11.6137 22.9796 11.663C23.1658 11.7123 23.3405 11.7978 23.4937 11.9146C23.647 12.0314 23.7757 12.1773 23.8725 12.3438C23.9693 12.5104 24.0324 12.6944 24.0582 12.8853C24.0839 13.0763 24.0717 13.2704 24.0224 13.4567C23.9732 13.6429 23.8876 13.8176 23.7708 13.9709V14.0146Z" />
            </svg>
        </div>
    )
}

export default RoundCheckMarkIconSVG
