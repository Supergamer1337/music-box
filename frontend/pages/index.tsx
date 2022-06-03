import type { GetServerSideProps, NextPage } from 'next'
import { serverGetUserData } from './../services/authenticationService'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import useUser from '../hooks/useUser'
import { clientGetGuilds, serverGetGuilds } from './../services/guildsService'
import Profile from '../components/Profile'
import GuildListItem from '../components/GuildListItem'
import BackendGuildData from './../types/BackendGuildData.d'
import { useState } from 'react'

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

const sortGuilds = (a: BackendGuildData, b: BackendGuildData) => {
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
        staleTime: 1000 * 60 * 5
    })

    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="grid grid-cols-1 grid-rows-[auto,1fr] max-h-[100vh]">
            <div>
                <div className=" bg-primaryBg">
                    <div className="container relative flex flex-col items-end mx-auto sm:flex-row-reverse sm:justify-start sm:items-center sm:p-1">
                        <Profile user={user} />

                        <h1 className="text-xl font-semibold text-center w-full sm:flex-[0,1,auto] sm:absolute sm:left-[50%] sm:translate-x-[-50%] sm:inline-block sm:w-fit">
                            Your Serverlist
                        </h1>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Search for server..."
                    className="block mx-auto bg-emptyBg my-4 p-2 rounded-md text-lg w-10/12 max-w-[40rem] outline-none sm:bg-primaryBg"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-y-auto w-[36rem] md:w-[40rem] max-w-full mx-auto mb-4">
                <ul className="flex flex-col mx-4 sm:mx-0 sm:mr-1 gap-2">
                    {data
                        ?.sort(sortGuilds)
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
            </div>
        </div>
    )
}

export default Home
