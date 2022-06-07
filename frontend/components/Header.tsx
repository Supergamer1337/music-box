import React from 'react'
import BackendUserData from '../types/BackendUserData'
import Profile from './Profile'

type Props = {
    user: BackendUserData
    pageName: string
    guildName?: string
}

const Header = ({ user, pageName, guildName }: Props) => {
    return (
        <div className=" bg-primaryBg">
            <div className="container relative flex flex-col items-end mx-auto sm:flex-row-reverse sm:justify-start sm:items-center sm:p-1">
                <Profile user={user} />

                <h1 className="text-xl font-semibold text-center w-full sm:flex-[0,1,auto] sm:absolute sm:left-[50%] sm:translate-x-[-50%] sm:inline-block sm:w-fit">
                    {pageName}
                </h1>
            </div>
        </div>
    )
}

export default Header
