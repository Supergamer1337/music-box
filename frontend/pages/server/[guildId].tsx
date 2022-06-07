import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import { serverGetUserData } from '../../services/authenticationService'
import { dehydrate, QueryClient } from 'react-query'
import useUser from './../../hooks/useUser'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
    await queryClient.prefetchQuery('guildData', () => serverGetGuildData(req))

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

    return (
        <>
            <Header
                user={user}
                pageName="Saved Playlists"
                guildName="Dark Souls: The New Age"
            />
        </>
    )
}

export default GuildPage
