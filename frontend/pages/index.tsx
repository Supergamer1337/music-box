import type { GetServerSideProps, NextPage } from 'next'
import { serverGetUserData } from './../services/authenticationService'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import useUser from '../hooks/useUser'
import { clientGetGuilds, serverGetGuilds } from './../services/guildsService'

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
    const { data, error } = useQuery('guilds', clientGetGuilds)

    return (
        <div>
            <h1 className="text-xl font-semibold text-center pt-10">
                Your Serverlist
            </h1>
        </div>
    )
}

export default Home
