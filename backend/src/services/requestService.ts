import fetch from 'node-fetch'

/**
 * General request function.
 * @param url The URL to request.
 * @param method The HTTP method to use.
 * @param data The data to send.
 * @param headers The headers to send.
 * @returns The response data.
 * @throws The response if the request failed.
 */
const request = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data: string | undefined,
    headers: Record<string, string> = {
        'Content-Type': 'application/json'
    }
) => {
    const response = await fetch(url, {
        method,
        headers,
        body: data
    })

    if (!response.ok) {
        throw response
    }

    if (response.headers.get('content-type') === 'application/json') {
        return await response.json()
    } else {
        return await response.text()
    }
}

/**
 * Form data POST request.
 * @param url The URL to request.
 * @param data The data to send.
 * @param headers The headers to send. If specified, the Content-Type header will be overwritten.
 * @returns The response data.
 * @throws The response if the request failed.
 */
export const formDataPostRequest = async (
    url: string,
    data: Record<string, any>,
    headers: Record<string, string> = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
) => {
    const requestData = new URLSearchParams(data)

    return await request(url, 'POST', requestData.toString(), headers)
}

/**
 * A GET request.
 * @param url The URL to request.
 * @param headers The headers to send.
 * @returns The response data.
 */
export const getRequest = async (
    url: string,
    headers: Record<string, string>
) => {
    return await request(url, 'GET', undefined, headers)
}

/**
 * Makes a request to the specified Discord API endpoint.
 * @param endpoint The Discord API endpoint to request.
 * @param headers The headers to send.
 * @param accessToken The Discord access token to use.
 * @returns The response data.
 */
export const discordGetRequest = async (
    endpoint: string,
    accessToken: string,
    headers?: Record<string, string>
) => {
    return await request(
        `https://discord.com/api/v10${endpoint}`,
        'GET',
        undefined,
        {
            Authorization: `Bearer ${accessToken}`,
            ...headers
        }
    )
}

/**
 * Handles a request error.
 * @param errorResponse The error response.
 * @param functionName The name of the function that caused the error.
 * @throws Formatted error message.
 */
export const handleRequestError = async (
    errorResponse: any,
    functionName: string
) => {
    console.error('Request error occurred in function:', functionName)
    throw new Error(
        `${errorResponse.status} ${
            errorResponse.statusText
        }. ${await errorResponse.text()}`
    )
}
