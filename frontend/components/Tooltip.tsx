import { AnimatePresence, motion } from 'framer-motion'
import React, { TouchEventHandler, useMemo, useState } from 'react'

type Props = {
    children: React.ReactNode
    message: string
    onTouch?: TouchEventHandler<HTMLDivElement>
    onActive?: boolean
    active?: boolean
    error?: boolean
    direction: 'top' | 'bottom' | 'left' | 'right'
}

const inverseDirection = (direction: 'top' | 'bottom' | 'left' | 'right') => {
    switch (direction) {
        case 'top':
            return 'bottom'
        case 'bottom':
            return 'top'
        case 'left':
            return 'right'
        case 'right':
            return 'left'
    }
}

const setAnimationDirectionValues = (
    direction: 'top' | 'bottom' | 'left' | 'right'
) => {
    let animationDirectionValues = { x: 0, y: 0 }

    if (direction == 'left') animationDirectionValues.x = -5

    if (direction == 'right') animationDirectionValues.x = 5

    if (direction == 'top') animationDirectionValues.y = -5

    if (direction == 'bottom') animationDirectionValues.y = 5

    return animationDirectionValues
}

const Tooltip = ({
    children,
    message,
    direction,
    onTouch = () => {},
    onActive = false,
    active = false,
    error = false
}: Props) => {
    const [display, setDisplay] = useState(false)

    const directionValues = useMemo(() => {
        return setAnimationDirectionValues(direction)
    }, [direction])

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
        <div
            className={`relative flex ${
                direction == 'top' || direction == 'bottom' ? 'flex-col' : ''
            } items-center`}
        >
            <AnimatePresence>
                {(onActive && active) || display ? (
                    <motion.div
                        className={`flex ${
                            direction == 'top' || direction == 'bottom'
                                ? 'flex-col'
                                : ''
                        } items-center shadow-lg`}
                        initial={{
                            opacity: 0,
                            ...directionValues
                        }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{
                            opacity: 0,
                            ...directionValues
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <div
                            style={{
                                [inverseDirection(direction)]:
                                    'calc(100% + 0.2rem)'
                            }}
                            className={`absolute ${
                                error ? 'bg-red-700' : 'bg-accent'
                            } p-2 w-max rounded-md shadow-lg`}
                        >
                            <p className="text-white">{message}</p>
                        </div>
                        <div
                            style={{
                                [inverseDirection(direction)]:
                                    'calc(100% - 0.05rem)'
                            }}
                            className={`absolute rotate-45 ${
                                error ? 'bg-red-700' : 'bg-accent'
                            } w-2 h-2 shadow-lg z-10`}
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
                className="self-start"
            >
                {children}
            </div>
        </div>
    )
}

export default Tooltip
