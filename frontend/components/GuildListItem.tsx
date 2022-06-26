import React from 'react'
import GuildListObject from '../types/GuildListObject'
import Image from 'next/image'
import RoundCheckMarkIconSVG from '../svg/RoundCheckMarkIconSVG'
import Tooltip from './Tooltip'
import Link from 'next/link'

type Props = {
    guild: GuildListObject
}

const GuildListItem = ({ guild }: Props) => {
    return (
        <Link href={guild.botInServer ? `/server/${guild.id}` : '/#'}>
            <li
                className="bg-secondaryBg sm:bg-primaryBg p-2 rounded-md border-discordBorder border-[1px] grid grid-cols-[min-content,auto,min-content] w-full gap-2 items-center 
                        transition-colors hover:bg-primaryBg sm:hover:bg-secondaryBg cursor-pointer"
            >
                <div className="w-12 h-12 relative">
                    <Image
                        src={
                            guild.icon
                                ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                                : '/images/missing-server.jpg'
                        }
                        alt={`${guild.name}'s Icon`}
                        layout="fill"
                        objectFit="fill"
                        className="rounded-full"
                    />
                </div>
                <div className="flex flex-col justify-center text-left overflow-hidden">
                    <h4 className="text-lg font-medium leading-5 overflow-hidden text-ellipsis whitespace-nowrap">
                        {guild.name}
                    </h4>
                    {guild.owner && <p className="text-sm font-light">Owner</p>}
                </div>
                <Tooltip
                    message={
                        guild.botInServer
                            ? 'Bot in server!'
                            : 'Bot not in server...'
                    }
                    direction="left"
                >
                    <div className="w-10 h-10">
                        <RoundCheckMarkIconSVG
                            className={
                                guild.botInServer
                                    ? 'fill-teal-500'
                                    : 'fill-emptyBg'
                            }
                        />
                    </div>
                </Tooltip>
            </li>
        </Link>
    )
}

export default GuildListItem
