import React, { createRef, useState } from 'react'
import Image from 'next/image'
import LogoutSVG from '../svg/LogoutSVG'
import { AnimatePresence, motion } from 'framer-motion'
import { logout } from '../services/authenticationService'
import useOutsideDetection from '../hooks/useOutsideDetection'
import { APIUser } from 'discord-api-types/v10'

type Props = {
    user: APIUser
}

const Profile = ({ user }: Props) => {
    const [showMenu, setShowMenu] = useState(false)
    let menuRef = createRef<HTMLDivElement>()
    useOutsideDetection(menuRef, () => {
        setShowMenu(false)
    })

    return (
        <div className="relative inline-block sm:w-fit" ref={menuRef}>
            <div
                className="flex items-center gap-2 cursor-pointer rounded-md sm:hover:bg-emptyBg sm:p-1"
                onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(!showMenu)
                }}
            >
                <h4 className="hidden select-none font-medium sm:block">
                    {user.username}
                </h4>
                <div className="relative w-16 h-16 sm:w-12 sm:h-12 rounded-full m-1 overflow-hidden">
                    <Image
                        src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                        alt={`${user.username}'s avatar`}
                        layout="fill"
                        placeholder="empty"
                        objectFit="cover"
                        sizes="100%"
                    />
                </div>
            </div>

            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        initial={{ opacity: 0, top: '120%' }}
                        animate={{ opacity: 1, top: '100%' }}
                        exit={{ opacity: 0 }}
                        className="absolute bg-emptyBg p-2 z-[200] right-0 mr-4 min-w-[15rem] w-fit rounded-md shadow-lg border-discordBorder border-[1px] sm:bg-primaryBg sm:mt-2 sm:p-1"
                    >
                        <h4 className="text-center text-lg font-semibold sm:hidden">
                            <div></div>
                            {user.username}
                        </h4>
                        <hr className="opacity-25 mx-2 sm:hidden" />
                        <div
                            onClick={logout}
                            className="flex items-center gap-1 p-2 mt-1 rounded cursor-pointer hover:bg-accent sm:mt-0"
                        >
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
