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
    return (
        <>
            <div>You are home.</div>
            <button
                onClick={async () => {
                    const guilds = await fetch(
                        `${process.env.BACKEND_ADDRESS}/api/v1/guilds`,
                        {
                            method: 'GET',
                            credentials: 'include'
                        }
                    )
                    console.log(guilds)
                    console.log(await guilds.json())
                }}
            >
                Get Guild info
            </button>
        </>
    )
}

export default Home
