import React, { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactPortal from './ReactPortal'
import Overlay from './Overlay'

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
                        <Overlay zIndex={200} hideFunction={hideFunction} />
                    </>
                )}
            </AnimatePresence>
        </ReactPortal>
    )
}

export default Dialog
