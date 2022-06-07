import router from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { clientGetUserData } from '../services/authenticationService'
import { APIUser } from 'discord-api-types/v10'

export default function useUser() {
    const { data, error } = useQuery<APIUser, Error>('user', clientGetUserData)

    useEffect(() => {
        if (error) {
            router.push('/authenticate')
        }
    }, [error])

    return data as APIUser
}
