declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string | undefined
            BACKEND_PORT: number | undefined
        }
    }
}

export {}
