import type { GetServerSideProps, NextPage } from 'next'
import { serverGetUserData } from './../services/authenticationService'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import useUser from '../hooks/useUser'
import { clientGetGuilds, serverGetGuilds } from './../services/guildsService'
import Profile from '../components/Profile'
import GuildListItem from '../components/GuildListItem'
import GuildListObject from '../types/GuildListObject'
import { useState } from 'react'
import Header from '../components/Header'
import { MINUTE } from '../constants/time'

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
    await queryClient.prefetchQuery('guilds', () => serverGetGuilds(req))

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const sortGuilds = (a: GuildListObject, b: GuildListObject) => {
    if (a.botInServer && !b.botInServer) {
        return -1
    } else if (!a.botInServer && b.botInServer) {
        return 1
    } else {
        return 0
    }
}

const Home: NextPage = () => {
    const user = useUser()
    const { data, error } = useQuery('guilds', clientGetGuilds, {
        staleTime: 1 * MINUTE
    })

    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="grid grid-cols-1 grid-rows-[auto,1fr] mb-4">
            <Header pageName="Your serverlist" user={user} />

            <input
                type="text"
                placeholder="Search for server..."
                className="block mx-auto bg-emptyBg my-4 p-2 rounded-md text-lg w-10/12 max-w-[40rem] outline-none outline-0 sm:bg-primaryBg focus:outline-2 outline-accent"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="w-[36rem] md:w-[40rem] max-w-full mx-auto">
                {error || !data ? (
                    <div className="text-center text-2xl mt-10 bg-red-600 mx-2 p-2 rounded-md">
                        Failed to retrieve servers. Please try again later.
                    </div>
                ) : (
                    <ul className="flex flex-col mx-4 sm:mx-0 sm:mr-1 gap-2">
                        {data
                            .sort(sortGuilds)
                            .filter((guild) => {
                                if (searchTerm === '') {
                                    return true
                                }

                                return guild.name
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            })
                            .map((guild) => (
                                <GuildListItem key={guild.id} guild={guild} />
                            ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Home
