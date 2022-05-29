import type { GetServerSideProps, NextPage } from 'next'
import { serverSideGetUserData } from './../services/authenticationService'
import BackendUserData from '../types/BackendUserData'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const userData = await serverSideGetUserData(req)
    if (!userData) {
        return {
            redirect: {
                destination: '/authenticate',
                permanent: false
            }
        }
    }

    return {
        props: {
            user: userData
        }
    }
}

interface Props {
    user: BackendUserData
}

const Home: NextPage<Props> = ({ user }) => {
    return (
        <div className="min-h-[100vh] bg-primaryBg">
            <h1 className="text-xl font-semibold text-center pt-10">
                Your Serverlist
            </h1>
            <p>{user.username}</p>
        </div>
    )
}

export default Home
