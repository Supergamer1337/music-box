import React, { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
    children: ReactNode
    active: boolean
    hideFunction: () => void
}

const Dialog = ({ children, active, hideFunction }: Props) => {
    return (
        <AnimatePresence>
            {active && (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: '-100px', x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: '-100px', x: '-50%' }}
                        className="fixed inline-block w-fit bg-primaryBg p-4 z-[101] top-28 left-[50%] translate-x-[-50%] rounded-md"
                    >
                        {children}
                    </motion.div>
                    <motion.div
                        onClick={hideFunction}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className={`absolute top-0 z-[100] w-[100vw] h-[100vh] bg-black`}
                    />
                </>
            )}
        </AnimatePresence>
    )
}

export default Dialog
