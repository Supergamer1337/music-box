import React, { useState } from 'react'
import BackendUserData from './../types/BackendUserData.d'
import Image from 'next/image'
import LogoutSVG from '../svg/LogoutSVG'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
    user: BackendUserData
}

const textVariants = {
    hover: {
        x: '0.1rem'
    }
}

const Profile = ({ user }: Props) => {
    const [showMenu, setShowMenu] = useState(false)

    const handleClick = () => {
        setShowMenu(!showMenu)
    }

    return (
        <div className="relative">
            <div
                className="relative w-16 h-16 cursor-pointer rounded-md"
                onClick={handleClick}
            >
                <Image
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    alt={`${user.username}'s avatar`}
                    layout="fill"
                    placeholder="empty"
                    objectFit="cover"
                    sizes="100%"
                />
            </div>

            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        initial={{ opacity: 0, top: '120%' }}
                        animate={{ opacity: 1, top: '100%' }}
                        exit={{ opacity: 0 }}
                        className="absolute bg-emptyBg p-2 z-20 right-0 mr-4 min-w-[15rem] w-fit rounded-md"
                    >
                        <h4 className="text-center text-lg font-semibold">
                            <div></div>
                            {user.username}
                        </h4>
                        <hr className="opacity-25 mx-2" />
                        <div className="flex items-center gap-1 p-2 mt-1 rounded cursor-pointer hover:bg-accent">
                            <LogoutSVG opacity="0.75" />
                            <p className="text-base font-medium">Logout</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Profile
