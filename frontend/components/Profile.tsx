import React from 'react'
import BackendUserData from './../types/BackendUserData.d'
import Image from 'next/image'

type Props = {
    user: BackendUserData
}

const Profile = ({ user }: Props) => {
    return (
        <div className="relative w-16 h-16">
            <Image
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt={`${user.username}'s avatar`}
                layout="fill"
                placeholder="empty"
                objectFit="cover"
                sizes="100%"
            />
        </div>
    )
}

export default Profile
