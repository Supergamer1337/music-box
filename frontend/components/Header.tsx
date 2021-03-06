import Link from 'next/link'
import React from 'react'
import Profile from './Profile'
import useGuildData from './../hooks/useGuildData'

type Props = {
    pageName: string
    guildName?: string
}

const Header = ({ pageName }: Props) => {
    const guildData = useGuildData()

    return (
        <div className=" bg-primaryBg">
            <div className="container relative flex flex-col items-end mx-auto sm:flex-row-reverse sm:justify-start sm:items-center sm:p-1">
                <div className="flex justify-between w-full items-center">
                    <Link href="/">
                        <h2 className="ml-2 text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
                            {guildData ? guildData.name : ''}
                        </h2>
                    </Link>

                    <Profile />
                </div>

                <h1 className="text-xl font-semibold text-center w-full sm:flex-[0,1,auto] sm:absolute sm:left-[50%] sm:translate-x-[-50%] sm:inline-block sm:w-fit">
                    {pageName}
                </h1>
            </div>
        </div>
    )
}

export default Header
