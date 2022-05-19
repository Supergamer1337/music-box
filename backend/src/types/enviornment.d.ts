declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string | undefined
            BACKEND_PORT: number | undefined
            NODE_ENV: 'development' | 'production' | undefined
            OAUTH_CLIENT_ID: number | undefined
        }
    }
}

export {}
