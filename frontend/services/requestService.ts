import { NextIncomingMessage } from 'next/dist/server/request-meta'

/**
 * Makes a get request to the specified backend endpoint, as the Next.js server.
 * @param req The Next.js request object.
 * @param endpoint The endpoint to request.
 * @param headers The headers to send with the request.
 * @returns The response object.
 */
export const serverBackendGetRequest = async (
    req: NextIncomingMessage,
    endpoint: string,
    param: string = '',
    query: string = '',
    headers?: HeadersInit
) => {
    return await fetch(
        `${process.env.BACKEND_ADDRESS}${endpoint}${
            param ? encodeURIComponent(param) : ''
        }${query ? `?${query}}` : ''}`,
        {
            method: 'GET',
            headers: {
                ...headers,
                // @ts-ignore
                Cookie: req.headers.cookie
            }
        }
    )
}

/**
 * Makes a get request to the specified backend endpoint, as the client.
 * @param endpoint The endpoint to request.
 * @param headers The headers to send with the request.
 * @returns The response object.
 */
export const clientBackendGetRequest = async (
    endpoint: string,
    param: string = '',
    query: string = '',
    headers = {}
) => {
    return await fetch(
        `${process.env.BACKEND_ADDRESS}${endpoint}${
            param ? encodeURIComponent(param) : ''
        }${query ? `?${query}}` : ''}`,
        {
            method: 'GET',
            credentials: 'include',
            headers
        }
    )
}

/**
 * Makes a post request to the specified backend endpoint, as the client server.
 * @param endpoint The endpoint to request.
 * @param headers The headers to send with the request.
 * @returns The response object.
 */
export const clientBackendPostRequest = async (
    endpoint: string,
    headers = {}
) => {
    return await fetch(`${process.env.BACKEND_ADDRESS}${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers
    })
}
