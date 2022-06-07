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
 * Handles a request error.
 * @param errorResponse The error response.
 * @throws Formatted error message.
 */
export const handleRequestError = async (errorResponse: any) => {
    throw new Error(
        `${errorResponse.status} ${
            errorResponse.statusText
        }. ${await errorResponse.text()}`
    )
}
