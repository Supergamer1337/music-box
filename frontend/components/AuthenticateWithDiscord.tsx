import React from 'react'
import DiscordSVG from './../svg/DiscordSVG'
import { useRouter } from 'next/router'

type Props = {
    className?: string
}

const AuthenticateWithDiscord = ({ className = '' }: Props) => {
    const router = useRouter()

    return (
        <div
            className={`flex items-center w-fit bg-accent py-2 px-4 rounded shadow-md cursor-pointer hover:shadow-lg transition-shadow ${className}`}
            onClick={() => {
                // @ts-ignore
                router.push(process.env.REDIRECT_ADDRESS)
            }}
        >
            <DiscordSVG />
            <p className="font-semibold text-lg h-fit w-fit ml-4 select-none">
                Authenticate
            </p>
        </div>
    )
}

export default AuthenticateWithDiscord
