import React, { createRef, useEffect, useState } from 'react'

type Props = {
    children: React.ReactNode
    message: string
    onActive?: boolean
    active?: boolean
    error?: boolean
}

const Tooltip = ({
    children,
    message,
    onActive = false,
    active = false,
    error = false
}: Props) => {
    const [display, setDisplay] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const tooltipRef = createRef<HTMLDivElement>()
    let hidingTimer: ReturnType<typeof setTimeout> | undefined = undefined

    const showTooltip = async () => {
        if (onActive) return
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
        if (onActive) return
        if (!tooltipRef.current) return
        setIsVisible(false)

        hidingTimer = setTimeout(() => {
            hidingTimer = undefined
            setDisplay(false)
        }, 200)
    }

    return (
        <div className="relative flex items-center">
            {(onActive && active) || display ? (
                <div
                    ref={tooltipRef}
                    className={`flex items-center transition-opacity duration-200 shadow-lg ${
                        isVisible || (onActive && active)
                            ? 'opacity-100'
                            : 'opacity-0'
                    }`}
                >
                    <div
                        className={`absolute ${
                            error ? 'bg-red-700' : 'bg-accent'
                        } right-[calc(100%+0.2rem)] p-2 w-max rounded-md z-10 shadow-lg`}
                    >
                        <p className="text-white">{message}</p>
                    </div>
                    <div
                        className={`absolute right-[calc(100%-0.05rem)] rotate-45 ${
                            error ? 'bg-red-700' : 'bg-accent'
                        } w-2 h-2 shadow-lg`}
                    />
                </div>
            ) : (
                ''
            )}

            <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
                {children}
            </div>
        </div>
    )
}

export default Tooltip
