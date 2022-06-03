import React from 'react'
import BackendGuildData from './../types/BackendGuildData.d'
import Image from 'next/image'
import CheckMarkIconSVG from '../svg/CheckMarkIconSVG'
import Tooltip from './Tooltip'

type Props = {
    guild: BackendGuildData
}

const GuildListItem = ({ guild }: Props) => {
    return (
        <li className="bg-secondaryBg p-2 rounded-md border-discordBorder border-[1px] grid grid-cols-[min-content,auto,min-content] gap-2 items-center">
            <div className="w-12 h-12 relative">
                <Image
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
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
            <Tooltip message="Bot not in server!">
                <div className="w-10 h-10">
                    <CheckMarkIconSVG />
                </div>
            </Tooltip>
        </li>
    )
}

export default GuildListItem
