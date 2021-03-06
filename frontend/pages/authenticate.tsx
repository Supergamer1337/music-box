import type { NextPage } from 'next'
import AuthenticateWithDiscord from '../components/AuthenticateWithDiscord'

const Authenticate: NextPage = () => {
    return (
        <div className="h-[100vh] w-[100vw] sm:flex sm:items-center sm:justify-center">
            <div className="sm:min-h-fit sm:max-h-min sm:min-w-fit sm:max-w-min bg-primaryBg pt-12 sm:pt-8 sm:pb-24 sm:px-52 sm:rounded-3xl">
                <div className="flex flex-col items-center">
                    <h2 className="text-lg">Welcome to</h2>
                    <h1 className="text-3xl">GM's Music Box</h1>
                </div>
                <AuthenticateWithDiscord className="m-auto mt-24" />
            </div>
        </div>
    )
}

export default Authenticate
