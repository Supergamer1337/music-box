/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BACKEND_ADDRESS: process.env.BACKEND_ADDRESS,
        REDIRECT_ADDRESS: process.env.REDIRECT_ADDRESS
    },
    images: {
        domains: ['cdn.discordapp.com', 'i.ytimg.com']
    }
}

module.exports = nextConfig
