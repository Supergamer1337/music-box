import type { GetServerSideProps, NextPage } from 'next'
import { isAuthenticated } from './../services/authenticationService'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    if (!(await isAuthenticated(req))) {
        return {
            redirect: {
                destination: '/authenticate',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

const Home: NextPage = () => {
    return <div>You are home.</div>
}

export default Home
