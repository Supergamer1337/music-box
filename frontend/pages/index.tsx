import type { GetServerSideProps, NextPage } from 'next'
import {
    clientGetUserData,
    serverSideGetUserData
} from './../services/authenticationService'
import BackendUserData from '../types/BackendUserData'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import router from 'next/router'
import { useEffect } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const queryClient = new QueryClient()

    const user = await serverSideGetUserData(req)
    if (!user) {
        return {
            redirect: {
                destination: '/authenticate',
                permanent: false
            }
        }
    }

    await queryClient.prefetchQuery('user', () => user)

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const Home: NextPage = () => {
    const { data, error } = useQuery<BackendUserData, Error>(
        'user',
        clientGetUserData,
        { cacheTime: 1000 }
    )

    useEffect(() => {
        if (error) {
            router.push('/authenticate')
        }
    }, [error])

    return (
        <div className="min-h-[100vh] bg-primaryBg">
            <h1 className="text-xl font-semibold text-center pt-10">
                Your Serverlist
            </h1>
            <p>{`${data?.username}`}</p>
        </div>
    )
}

export default Home
