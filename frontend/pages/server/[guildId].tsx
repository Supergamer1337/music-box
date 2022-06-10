import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import { serverGetUserData } from '../../services/authenticationService'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import useUser from './../../hooks/useUser'
import {
    clientGetGuildData,
    serverGetGuildData
} from '../../services/guildsService'
import { MINUTE } from '../../constants/time'
import BottomNavBar from '../../components/BottomNavBar'
import MobileSearchComponent from '../../components/MobileSearchComponent'

export const getServerSideProps: GetServerSideProps = async ({
    req,
    params
}) => {
    const queryClient = new QueryClient()

    const user = await serverGetUserData(req)

    if (!user) {
        return {
            redirect: {
                destination: '/authenticate',
                permanent: false
            }
        }
    }

    await queryClient.prefetchQuery('user', () => user)
    await queryClient.prefetchQuery('guildData', () =>
        //@ts-expect-error Has to be a string
        serverGetGuildData(req, params.guildId)
    )

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const GuildPage: NextPage = () => {
    const router = useRouter()
    const user = useUser()
    const { guildId } = router.query
    const { data: guildData, error } = useQuery(
        'guildData',
        () => clientGetGuildData(guildId as string),
        {
            staleTime: 1 * MINUTE
        }
    )

    return (
        <>
            <Header
                user={user}
                pageName="Search Songs"
                guildName={error ? 'Unknown server' : guildData?.name}
            />

            <div>
                <MobileSearchComponent />
            </div>

            <BottomNavBar />
        </>
    )
}

export default GuildPage
