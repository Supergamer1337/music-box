import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
    zIndex?: number
    hideFunction?: () => void
}

const Overlay = ({ zIndex = 100, hideFunction = () => {} }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={hideFunction}
            className={`absolute top-0 z-[${zIndex}] w-[100vw] h-[100vh] bg-black`}
        />
    )
}

export default Overlay
