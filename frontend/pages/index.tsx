import type { GetServerSideProps, NextPage } from 'next'
import { serverGetUserData } from './../services/authenticationService'
import BackendUserData from '../types/BackendUserData'
import { dehydrate, QueryClient } from 'react-query'
import useUser from '../hooks/useUser'

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

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const Home: NextPage = () => {
    const user = useUser()

    return (
        <div className="min-h-[100vh] bg-primaryBg">
            <h1 className="text-xl font-semibold text-center pt-10">
                Your Serverlist
            </h1>
            <p>{`${user.username}`}</p>
        </div>
    )
}

export default Home
