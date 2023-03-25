import { AnimatePresence } from 'framer-motion'
import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import BottomNavBar from '../../components/BottomNavBar'
import ErrorMessage from '../../components/ErrorMessage'
import Header from '../../components/Header'
import Playlists from '../../components/Playlists'
import SearchComponent from '../../components/SearchComponent'
import useWebsocket from '../../hooks/useWebsocket'
import { serverGetUserData } from '../../services/authenticationService'
import { serverGetGuildData } from '../../services/guildsService'

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
    const [socketError, setSocketError] = useState('')
    const [chosenSection, setChosenSection] = useState('playlists')
    const socket = useWebsocket()

    socket?.on('error', (error: string) => {
        if (socketError !== '') return
        setSocketError(error)
        setTimeout(() => {
            setSocketError('')
        }, 5000)
    })

    return (
        <>
            <Header pageName="Saved Playlists" />

            <div>
                <Playlists chosenSection={chosenSection} />
                <SearchComponent chosenSection={chosenSection} />
            </div>

            <AnimatePresence>
                {socketError != '' ? (
                    <ErrorMessage message={socketError} />
                ) : null}
            </AnimatePresence>

            <BottomNavBar
                chosenSection={chosenSection}
                setChosenSection={setChosenSection}
            />
        </>
    )
}

export default GuildPage
