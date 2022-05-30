import type { GetServerSideProps, NextPage } from 'next'
import { serverGetUserData } from './../services/authenticationService'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import useUser from '../hooks/useUser'
import { clientGetGuilds, serverGetGuilds } from './../services/guildsService'
import Profile from '../components/Profile'
import GuildListItem from '../components/GuildListItem'

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

const Home: NextPage = () => {
    const user = useUser()
    const { data, error } = useQuery('guilds', clientGetGuilds, {
        staleTime: 1000 * 60 * 30
    })

    return (
        <>
            <div className="flex flex-col items-end">
                <Profile user={user} />

                <h1 className="text-xl font-semibold text-center w-full">
                    Your Serverlist
                </h1>
            </div>

            <ul className="flex flex-col mx-4 gap-2">
                {data?.map((guild) => (
                    <GuildListItem key={guild.id} guild={guild} />
                ))}
            </ul>
        </>
    )
}

export default Home
