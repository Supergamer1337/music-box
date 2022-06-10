import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
    active: boolean
}

const Overlay = ({ active }: Props) => {
    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    className={`absolute top-0 z-[100] w-[100vw] h-[100vh] bg-black`}
                />
            )}
        </AnimatePresence>
    )
}

export default Overlay
