declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string | undefined
            BACKEND_PORT: number | undefined
            NODE_ENV: 'development' | 'production' | undefined
            OAUTH_CLIENT_ID: string | undefined
            OAUTH_CLIENT_SECRET: string | undefined
            FRONTEND_ADDRESS: string | undefined
            BACKEND_ADDRESS: string | undefined
        }
    }
}

export {}
