import router from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { clientGetUserData } from '../services/authenticationService'
import BackendUserData from '../types/BackendUserData'

export default function useUser() {
    const { data, error } = useQuery<BackendUserData, Error>(
        'user',
        clientGetUserData
    )

    useEffect(() => {
        if (error) {
            router.push('/authenticate')
        }
    }, [error])

    return data as BackendUserData
}
