import fetch from 'node-fetch'

export const getAccessTokenFromDiscord = async (code: string) => {
    // @ts-ignore
    const requestData = new URLSearchParams({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.BACKEND_ADDRESS}/api/v1/auth/`
    })

    console.log(requestData.toString())

    const request = await fetch('https://discordapp.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestData.toString()
    })

    return await request.json()
}
