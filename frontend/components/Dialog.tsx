import React, { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactPortal from './ReactPortal'

interface Props {
    children: ReactNode
    active: boolean
    hideFunction: () => void
}

export const dialogWrapperId = 'dialogBox'

const Dialog = ({ children, active, hideFunction }: Props) => {
    return (
        <ReactPortal wrapperId={dialogWrapperId}>
            <AnimatePresence>
                {active && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: '-100px', x: '-50%' }}
                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, y: '-100px', x: '-50%' }}
                            className="fixed inline-block w-fit bg-primaryBg p-4 z-[201] top-28 left-[50%] translate-x-[-50%] rounded-md"
                        >
                            {children}
                        </motion.div>
                        <motion.div
                            onClick={hideFunction}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className={`fixed top-0 left-0 z-[200] w-full h-[100vh] bg-black`}
                        />
                    </>
                )}
            </AnimatePresence>
        </ReactPortal>
    )
}

export default Dialog
