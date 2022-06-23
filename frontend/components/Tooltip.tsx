import { AnimatePresence, motion } from 'framer-motion'
import React, { MouseEventHandler, TouchEventHandler, useState } from 'react'

type Props = {
    children: React.ReactNode
    message: string
    onTouch?: TouchEventHandler<HTMLDivElement>
    onActive?: boolean
    active?: boolean
    error?: boolean
}

const Tooltip = ({
    children,
    message,
    onTouch = () => {},
    onActive = false,
    active = false,
    error = false
}: Props) => {
    const [display, setDisplay] = useState(false)

    const clickedTooltip: TouchEventHandler<HTMLDivElement> = (e) => {
        if (onActive) return
        setDisplay(!display)
        onTouch(e)
    }

    const skipMouseEmulation: TouchEventHandler<HTMLDivElement> = (e) => {
        if (onActive) return
        e.preventDefault()
    }

    const showTooltip = async () => {
        if (onActive) return
        setDisplay(true)
    }

    const hideTooltip = async () => {
        if (onActive) return
        setDisplay(false)
    }

    return (
        <div className="relative flex items-center">
            <AnimatePresence>
                {(onActive && active) || display ? (
                    <motion.div
                        className={`flex items-center shadow-lg`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.2 }}
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
                    </motion.div>
                ) : (
                    ''
                )}
            </AnimatePresence>

            <div
                onTouchStart={clickedTooltip}
                onTouchEnd={skipMouseEmulation}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
            >
                {children}
            </div>
        </div>
    )
}

export default Tooltip
