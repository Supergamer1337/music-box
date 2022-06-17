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
    headers = {}
) => {
    return await fetch(`${process.env.BACKEND_ADDRESS}${endpoint}`, {
        method: 'GET',
        credentials: 'include',
        headers
    })
}

/**
 * Makes a post request to the specified backend endpoint, as the client.
 * @param endpoint The endpoint to request.
 * @param headers The headers to send with the request.
 * @returns The response object.
 */
export const clientBackendPostRequest = async (
    endpoint: string,
    body?: Record<string, any>,
    headers: Record<string, string> = {}
) => {
    return await fetch(`${process.env.BACKEND_ADDRESS}${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

/**
 * Makes a DELETE request to the specified backend endpoint, as the client.
 * @param endpoint
 * @param headers
 * @returns The response object.
 */
export const clientBackendDeleteRequest = async (
    endpoint: string,
    headers: Record<string, string> = {}
) => {
    return await fetch(`${process.env.BACKEND_ADDRESS}${endpoint}`, {
        method: 'DELETE',
        credentials: 'include',
        headers
    })
}

/**
 * Logs the error of the given response, and throws an error with the specified message.
 *
 * @param response The response object.
 * @param errorMessage The message to throw.
 * @throws The specified error message.
 */
export const handleInvalidRequest = async (
    response: Response,
    errorMessage: string
) => {
    console.error(
        `Status: ${response.status}, ${
            response.statusText
        } with body:\n ${await response.text()}`
    )
    throw errorMessage
}
