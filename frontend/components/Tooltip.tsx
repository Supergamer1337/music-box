import React, { createRef, useState } from 'react'

type Props = {
    children: React.ReactNode
    message: string
}

const Tooltip = ({ children, message }: Props) => {
    const [display, setDisplay] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const tooltipRef = createRef<HTMLDivElement>()
    let hidingTimer: ReturnType<typeof setTimeout> | undefined = undefined

    const showTooltip = async () => {
        if (hidingTimer) {
            clearTimeout(hidingTimer)
            hidingTimer = undefined
            // This prevents the tooltip from being hidden if the opacity was set to 0
            setIsVisible(true)
        } else {
            setDisplay(true)
            setTimeout(() => setIsVisible(true), 1) // FIX: This is a hack to make sure the tooltip fades in.
        }
    }

    const hideTooltip = async () => {
        if (!tooltipRef.current) return
        setIsVisible(false)

        hidingTimer = setTimeout(() => {
            hidingTimer = undefined
            setDisplay(false)
        }, 200)
    }

    return (
        <div className="relative flex items-center">
            {display && (
                <div
                    ref={tooltipRef}
                    className={`flex items-center transition-opacity duration-200 shadow-lg ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className="absolute bg-accent right-[calc(100%+0.2rem)] p-2 w-max rounded-md z-10">
                        <p className="text-white">{message}</p>
                    </div>
                    <div className="absolute right-[calc(100%-0.05rem)] rotate-45 bg-accent w-2 h-2" />
                </div>
            )}

            <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
                {children}
            </div>
        </div>
    )
}

export default Tooltip
