import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { clientGetUserData } from '../services/authenticationService'
import { APIUser } from 'discord-api-types/v10'
import { logout } from './../services/authenticationService'

export default function useUser() {
    const { data, error } = useQuery<APIUser, Error>('user', clientGetUserData)

    useEffect(() => {
        if (error) {
            logout()
        }
    }, [error])

    return data as APIUser
}
