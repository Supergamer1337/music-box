import React, { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Header from '../../components/Header'
import { serverGetUserData } from '../../services/authenticationService'
import { dehydrate, QueryClient } from 'react-query'
import { serverGetGuildData } from '../../services/guildsService'
import BottomNavBar from '../../components/BottomNavBar'
import SearchComponent from '../../components/SearchComponent'
import PlaylistsComponent from '../../components/PlaylistsComponent'
import useWebsocket from '../../hooks/useWebsocket'
import { useRouter } from 'next/router'

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
        //@ts-expect-error Params has to be a string
        serverGetGuildData(req, params.guildId)
    )

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const GuildPage: NextPage = () => {
    useWebsocket()

    const [chosenSection, setChosenSection] = useState('playlists')
    return (
        <>
            <Header pageName="Saved Playlists" />

            <div>
                <PlaylistsComponent chosenSection={chosenSection} />
                <SearchComponent chosenSection={chosenSection} />
            </div>

            <BottomNavBar
                chosenSection={chosenSection}
                setChosenSection={setChosenSection}
            />
        </>
    )
}

export default GuildPage
