import type { GetServerSideProps, NextPage } from 'next'
import { serverGetUserData } from './../services/authenticationService'
import { dehydrate, QueryClient } from 'react-query'
import { serverGetGuilds } from './../services/guildsService'
import GuildListItem from '../components/GuildListItem'
import GuildListObject from '../types/GuildListObject'
import { useState } from 'react'
import Header from '../components/Header'
import useGuilds from './../hooks/useGuilds'
import TextField from '../components/TextField'

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
    if (a.botInServer && !b.botInServer) return -1
    if (!a.botInServer && b.botInServer) return 1
    if (a.owner && !b.owner) return -1
    if (!a.owner && b.owner) return 1
    return 0
}

const filterGuild = (guild: GuildListObject, searchTerm: string) => {
    if (searchTerm === '') {
        return true
    }

    return guild.name.toLowerCase().includes(searchTerm.toLowerCase())
}

const Home: NextPage = () => {
    const guilds = useGuilds()
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="grid grid-cols-1 grid-rows-[auto,1fr] mb-4">
            <Header pageName="Your serverlist" />

            <TextField
                type="text"
                placeholder="Search for server..."
                size="section"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="w-[36rem] md:w-[40rem] max-w-full mx-auto">
                {!guilds ? (
                    <div className="text-center text-2xl mt-10 bg-red-600 mx-2 p-2 rounded-md">
                        Failed to retrieve servers. Please try again later.
                    </div>
                ) : (
                    <ul className="flex flex-col mx-4 sm:mx-0 gap-2">
                        {guilds
                            .filter((guild) => filterGuild(guild, searchTerm))
                            .sort(sortGuilds)
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
