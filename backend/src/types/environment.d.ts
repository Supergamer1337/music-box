declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string
            BACKEND_PORT: number
            NODE_ENV: 'development' | 'production'
            OAUTH_CLIENT_ID: string
            OAUTH_CLIENT_SECRET: string
            FRONTEND_ADDRESS: string
            BACKEND_ADDRESS: string
            REDIS_URL: string
            SESSION_SECRET: string
        }
    }
}

export {}
